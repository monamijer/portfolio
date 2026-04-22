import { PROFILE } from './data.js';

const API = 'http://localhost:4000/api'; // → update to your VPS URL in production

/* ══════════════════════════════════════════════════════════════
   SESSION  (sessionStorage — wiped when tab closes)
══════════════════════════════════════════════════════════════ */
const session = {
  set: (t, k1, k2) => {
    sessionStorage.setItem('nx_t', t);
    sessionStorage.setItem('nx_1', k1);
    sessionStorage.setItem('nx_2', k2);
  },
  get: () => ({
    token: sessionStorage.getItem('nx_t'),
    key1:  sessionStorage.getItem('nx_1'),
    key2:  sessionStorage.getItem('nx_2'),
  }),
  clear: () => ['nx_t','nx_1','nx_2'].forEach(k => sessionStorage.removeItem(k)),
  ok: () => {
    const { token, key1, key2 } = session.get();
    return !!(token && key1 && key2);
  },
};

/* ══════════════════════════════════════════════════════════════
   API CLIENT
══════════════════════════════════════════════════════════════ */
async function api(method, path, body = null) {
  const { token, key1, key2 } = session.get();
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Key1': key1,
      'X-Key2': key2,
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error || `HTTP ${res.status}`);
  }
  return res.json();
}

/* ══════════════════════════════════════════════════════════════
   VIEW EXPORTS  (consumed by router.js + main.js)
══════════════════════════════════════════════════════════════ */
export const vaultView = () => session.ok() ? dashHTML() : loginHTML();

export function initVault() {
  document.getElementById('vaultLoginForm') ? bootLogin() : bootDash();
}

/* ══════════════════════════════════════════════════════════════
   LOGIN
══════════════════════════════════════════════════════════════ */
function loginHTML() {
  return /* html */`
  <div class="vault-shell">
    <div class="vault-login-card">
      <div class="vault-logo">
        <span class="vault-icon">⬡</span>
        <h1>NEXUS</h1>
        <p>Personal Intelligence System</p>
      </div>
      <form id="vaultLoginForm" autocomplete="off">
        <div class="vault-field">
          <label>Master Password</label>
          <input type="password" id="vPass" placeholder="••••••••••••" required autofocus />
        </div>
        <div class="vault-field">
          <label>Key 1 <span class="vault-key-hint">AES layer</span></label>
          <input type="password" id="vK1" placeholder="64-char hex" required />
        </div>
        <div class="vault-field">
          <label>Key 2 <span class="vault-key-hint">Obfuscation layer</span></label>
          <input type="password" id="vK2" placeholder="64-char hex" required />
        </div>
        <button type="submit" class="vault-btn-primary" id="vSubmit">Unlock Vault</button>
        <p class="vault-error" id="vErr"></p>
      </form>
    </div>
  </div>`;
}

function bootLogin() {
  document.getElementById('vaultLoginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('vSubmit');
    btn.disabled = true;
    btn.textContent = 'Unlocking…';
    try {
      const res = await fetch(`${API}/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password: document.getElementById('vPass').value }),
      });
      const { token } = await res.json();
      if (!token) throw new Error('Wrong password');
      session.set(token, document.getElementById('vK1').value, document.getElementById('vK2').value);
      document.getElementById('app').innerHTML = dashHTML();
      bootDash();
    } catch (err) {
      document.getElementById('vErr').textContent = err.message;
      btn.disabled = false;
      btn.textContent = 'Unlock Vault';
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   DASHBOARD SHELL
══════════════════════════════════════════════════════════════ */
const NAV = [
  { id:'overview',  icon:'◈',  label:'Overview'  },
  { id:'journal',   icon:'📓', label:'Journal'   },
  { id:'people',    icon:'👥', label:'People'    },
  { id:'self',      icon:'🪞', label:'Self'      },
  { id:'vocation',  icon:'🌱', label:'Vocation'  },
  { id:'tech',      icon:'⚙️', label:'Tech & Tools' },
  { id:'knowledge', icon:'📚', label:'Knowledge' },
  { id:'strategy',  icon:'♟',  label:'Strategy'  },
  { id:'figures',   icon:'✨', label:'Figures'   },
  { id:'culture',   icon:'🎬', label:'Culture'   },
  { id:'parcours',  icon:'🗺', label:'Parcours'  },
  { id:'health',    icon:'💊', label:'Health'    },
  { id:'quiz',      icon:'⚡', label:'Quiz Mode' },
];

function dashHTML() {
  return /* html */`
  <div class="vault-shell vault-dash">
    <nav class="vault-sidebar">
      <div class="vault-brand"><span class="vault-icon">⬡</span> NEXUS</div>
      <ul class="vault-nav" role="list">
        ${NAV.map(({ id, icon, label }) => `
          <li><button class="vault-nav-btn" data-s="${id}" role="tab" aria-selected="false">
            <span>${icon}</span><span>${label}</span>
          </button></li>`).join('')}
      </ul>
      <button class="vault-logout" id="vLogout">⏻ Lock Vault</button>
    </nav>
    <main class="vault-content" id="vContent" aria-live="polite"></main>
  </div>`;
}

function bootDash() {
  loadSection('overview');

  document.querySelectorAll('.vault-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vault-nav-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      loadSection(btn.dataset.s);
    });
  });

  document.querySelector('[data-s="overview"]')?.classList.add('active');
  document.getElementById('vLogout')?.addEventListener('click', () => {
    session.clear();
    location.hash = '#/';
  });
}

const content = html => { const el = document.getElementById('vContent'); if (el) el.innerHTML = html; };
const loading = t => content(`<div class="vault-loading">Loading ${t}…</div>`);
const vError  = m => content(`<p class="vault-error" style="padding:2rem">${m}</p>`);

function loadSection(id) {
  const fn = SECTIONS[id];
  if (fn) fn();
}

/* ══════════════════════════════════════════════════════════════
   OVERVIEW
══════════════════════════════════════════════════════════════ */
async function overviewSection() {
  loading('overview');
  try {
    const [stats, streak, weak] = await Promise.all([
      api('GET', '/dashboard'),
      api('GET', '/journal/streak'),
      api('GET', '/quiz/weak-spots').catch(() => ({ weakSpots: [] })),
    ]);

    const statCards = [
      { label:'Journal entries',  value:stats.counts.journal,    icon:'📓' },
      { label:'People known',     value:stats.counts.people,     icon:'👥' },
      { label:'Books read',       value:stats.counts.books,      icon:'📚' },
      { label:'Knowledge notes',  value:stats.counts.knowledge,  icon:'🧠' },
      { label:'Strategies',       value:stats.counts.strategies, icon:'♟' },
      { label:'Inspiring figures',value:stats.counts.figures,    icon:'✨' },
    ];

    content(/* html */`
      <div class="vault-section">
        <h2 class="vault-section-title">Overview</h2>

        <div class="streak-banner">
          <span class="streak-num">${streak.streak}</span>
          <div>
            <strong>Day Streak 🔥</strong>
            <p>${streak.total} total journal entries</p>
          </div>
          <button class="vault-btn-primary"
            style="margin-left:auto;width:auto;padding:.5rem 1.2rem"
            onclick="document.querySelector('[data-s=journal]').click()">
            Write today →
          </button>
        </div>

        <div class="vault-stats-grid">
          ${statCards.map(({ label, value, icon }) => `
            <div class="stat-card">
              <span class="stat-icon">${icon}</span>
              <span class="stat-value">${value}</span>
              <span class="stat-label">${label}</span>
            </div>`).join('')}
        </div>

        ${stats.recentMood?.length ? `
        <div class="vault-chart-wrap">
          <h3>Last 7 days — Mood <span style="color:#c8602a">█</span> Energy <span style="color:#3a5a40">█</span></h3>
          <div class="mood-chart">
            ${stats.recentMood.map(d => `
              <div class="mood-bar-wrap" title="${d.date}">
                <div class="mood-bar" style="--h:${(d.mood||0)*10}%"></div>
                <div class="mood-bar energy" style="--h:${(d.energy||0)*10}%"></div>
                <span class="mood-label">${String(d.date).slice(5)}</span>
              </div>`).join('')}
          </div>
          <p style="font-size:.7rem;color:#444;margin-top:.5rem">Avg mood: ${stats.avgMood} · Avg energy: ${stats.avgEnergy}</p>
        </div>` : ''}

        ${weak.weakSpots?.length ? `
        <div class="vault-chart-wrap" style="margin-top:1.5rem">
          <h3>⚡ Quiz Weak Spots</h3>
          ${weak.weakSpots.map(w => `
            <div style="display:flex;justify-content:space-between;font-size:.8rem;padding:.4rem 0;border-bottom:1px solid #1a1a1a">
              <span>${w.domain}</span>
              <span style="color:#e05050">${w.low_scores}/${w.attempts} low</span>
            </div>`).join('')}
        </div>` : ''}

        <div class="vault-quick-actions">
          <button class="vault-btn-ghost" onclick="document.querySelector('[data-s=quiz]').click()">⚡ Start Quiz</button>
          <button class="vault-btn-ghost" onclick="document.querySelector('[data-s=journal]').click()">📓 Journal</button>
          <button class="vault-btn-ghost" onclick="document.querySelector('[data-s=people]').click()">👥 People</button>
          <button class="vault-btn-ghost" onclick="document.querySelector('[data-s=strategy]').click()">♟ Strategy</button>
        </div>
      </div>`);
  } catch (err) { vError(err.message); }
}

/* ══════════════════════════════════════════════════════════════
   JOURNAL
══════════════════════════════════════════════════════════════ */
async function journalSection() {
  loading('journal');
  try {
    const [today, { data: logs }, { streak }] = await Promise.all([
      api('GET', '/journal/today'),
      api('GET', '/journal?limit=30'),
      api('GET', '/journal/streak'),
    ]);
    const t = today || {};

    content(/* html */`
      <div class="vault-section">
        <div class="vault-section-header">
          <h2>Journal <span style="font-size:.8rem;color:#555;font-weight:400">${streak} day streak</span></h2>
        </div>

        <div class="vault-journal-today">
          <h3 style="font-size:.9rem;color:#666;margin-bottom:1rem">
            ${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
          </h3>

          <div class="vault-field">
            <label>Today's Entry *</label>
            <textarea id="jBody" rows="7" placeholder="What happened today? What are you thinking about?">${t.body||''}</textarea>
          </div>

          <div class="vault-row-2">
            <div class="vault-field">
              <label>Mood (1–10)</label>
              <input type="number" id="jMood" min="1" max="10" value="${t.mood||''}" />
            </div>
            <div class="vault-field">
              <label>Energy (1–10)</label>
              <input type="number" id="jEnergy" min="1" max="10" value="${t.energy||''}" />
            </div>
          </div>

          <div class="vault-field">
            <label>Gratitude — 3 things</label>
            <textarea id="jGratitude" rows="2" placeholder="I am grateful for…">${t.gratitude||''}</textarea>
          </div>
          <div class="vault-field">
            <label>Tomorrow's Intention</label>
            <textarea id="jTomorrow" rows="2" placeholder="What matters most tomorrow?">${t.tomorrow_intent||''}</textarea>
          </div>

          <div style="display:flex;align-items:center;gap:1rem">
            <button class="vault-btn-primary" style="width:auto;padding:.6rem 1.5rem" id="jSave">Save Entry</button>
            <p class="vault-error" id="jErr" style="margin:0"></p>
          </div>
        </div>

        <!-- Past entries -->
        <h3 style="margin-top:2.5rem;font-size:.9rem;letter-spacing:.1em;text-transform:uppercase;color:#444">
          Past Entries
        </h3>
        <div class="vault-list" style="margin-top:.8rem">
          ${logs.map(l => `
            <div class="vault-card">
              <div class="vault-card-preview">
                <strong>${String(l.log_date).slice(0,10)}</strong>
                ${l.mood   ? `<span style="color:#c8602a;margin-left:.5rem">mood ${l.mood}/10</span>` : ''}
                ${l.energy ? `<span style="color:#3a5a40;margin-left:.5rem">energy ${l.energy}/10</span>` : ''}
              </div>
            </div>`).join('') || '<p class="vault-empty">No entries yet. Start writing!</p>'}
        </div>
      </div>`);

    document.getElementById('jSave').addEventListener('click', async () => {
      const btn = document.getElementById('jSave');
      btn.disabled = true; btn.textContent = 'Saving…';
      try {
        await api('POST', '/journal/today', {
          body:            document.getElementById('jBody').value,
          mood:            document.getElementById('jMood').value    || null,
          energy:          document.getElementById('jEnergy').value  || null,
          gratitude:       document.getElementById('jGratitude').value,
          tomorrow_intent: document.getElementById('jTomorrow').value,
        });
        btn.textContent = '✓ Saved!';
        setTimeout(() => { btn.disabled = false; btn.textContent = 'Save Entry'; }, 2000);
      } catch (err) {
        document.getElementById('jErr').textContent = err.message;
        btn.disabled = false; btn.textContent = 'Save Entry';
      }
    });

  } catch (err) { vError(err.message); }
}

/* ══════════════════════════════════════════════════════════════
   PEOPLE
══════════════════════════════════════════════════════════════ */
const personFields = [
  { key:'codename',    type:'text',   label:'Codename',   required:true },
  { key:'real_name',   type:'text',   label:'Real Name' },
  { key:'occupation',  type:'text',   label:'Occupation' },
  { key:'nationality', type:'text',   label:'Nationality' },
  { key:'gender',      type:'select', label:'Gender', options:['unknown','M','F','other'] },
  { key:'birth_date',  type:'date',   label:'Birth Date' },
  { key:'status',      type:'select', label:'Status', options:['alive','deceased','lost_contact','unknown'] },
];
const traitFields = [
  { key:'trait',       type:'text',     label:'Trait observed', required:true },
  { key:'evidence',    type:'textarea', label:'Evidence' },
  { key:'reliability', type:'number',   label:'Reliability (1–10)', min:1, max:10 },
  { key:'observed_at', type:'date',     label:'Observed at' },
];

async function peopleSection() {
  loading('people');
  try {
    const [{ data }, { counts, byRole }] = await Promise.all([
      api('GET', '/people?limit=100'),
      api('GET', '/people/stats/overview'),
    ]);

    content(/* html */`
      <div class="vault-section">
        <div class="vault-section-header">
          <h2>People
            <span style="font-size:.8rem;color:#555;font-weight:400">
              ${counts.total} known · ${counts.alive} alive
            </span>
          </h2>
          <button class="vault-btn-primary" style="width:auto;padding:.5rem 1rem" id="pAddBtn">+ Add Person</button>
        </div>

        <input type="text" id="pSearch" class="vault-search" placeholder="Search by name, occupation…" />

        <div class="role-pills" id="rolePills">
          <button class="role-pill active" data-role="">All (${counts.total})</button>
          ${byRole.map(r => `<button class="role-pill" data-role="${r.role}">${r.role} (${r.count})</button>`).join('')}
        </div>

        <div id="pForm" class="vault-form-wrap hidden">
          ${buildForm(personFields)}
          <div class="vault-form-actions" style="grid-column:1/-1">
            <button class="vault-btn-primary" style="width:auto" id="pSave">Save</button>
            <button class="vault-btn-ghost" id="pCancel">Cancel</button>
            <p class="vault-error" id="pErr"></p>
          </div>
        </div>

        <div class="people-grid" id="pList">
          ${data.map(personCard).join('') || '<p class="vault-empty">No people yet.</p>'}
        </div>

        <div id="pProfile" class="hidden"></div>
      </div>`);

    wirePeople(data);
  } catch (err) { vError(err.message); }
}

function personCard(p) {
  return /* html */`
    <div class="person-card">
      <div class="person-avatar">${(p.codename||'?')[0].toUpperCase()}</div>
      <div class="person-info">
        <strong>${p.codename||'—'}</strong>
        <span>${p.occupation||''}</span>
      </div>
      <div class="person-actions">
        <button class="vault-icon-btn p-view" data-id="${p.id}" title="View">👁</button>
        <button class="vault-icon-btn p-edit" data-id="${p.id}" title="Edit">✏️</button>
        <button class="vault-icon-btn p-del"  data-id="${p.id}" title="Delete">🗑</button>
      </div>
    </div>`;
}

function wirePeople(init) {
  let editId = null;
  let all    = [...init];
  const form   = document.getElementById('pForm');
  const list   = document.getElementById('pList');
  const profile= document.getElementById('pProfile');

  document.getElementById('pAddBtn').onclick = () => {
    editId = null;
    form.innerHTML = buildForm(personFields) + formActions('pSave','pCancel','pErr');
    form.classList.remove('hidden');
    wireFormButtons();
  };

  document.getElementById('pSearch').addEventListener('input', async e => {
    const q = e.target.value.trim();
    if (!q) { list.innerHTML = all.map(personCard).join(''); return; }
    try {
      const { data } = await api('GET', `/people/search?q=${encodeURIComponent(q)}`);
      list.innerHTML = data.map(personCard).join('') || '<p class="vault-empty">No results.</p>';
    } catch {}
  });

  document.getElementById('rolePills').addEventListener('click', async e => {
    if (!e.target.classList.contains('role-pill')) return;
    document.querySelectorAll('.role-pill').forEach(p => p.classList.remove('active'));
    e.target.classList.add('active');
    const role = e.target.dataset.role;
    if (!role) { list.innerHTML = all.map(personCard).join(''); return; }
    try {
      const { data } = await api('GET', `/people/role/${role}`);
      list.innerHTML = data.map(personCard).join('') || '<p class="vault-empty">None in this role.</p>';
    } catch {}
  });

  list.addEventListener('click', async e => {
    const id = e.target.dataset.id; if (!id) return;
    if (e.target.classList.contains('p-del')) {
      if (!confirm('Delete this person and all related data?')) return;
      try { await api('DELETE', `/people/${id}`); e.target.closest('.person-card').remove(); }
      catch (err) { alert(err.message); }
    }
    if (e.target.classList.contains('p-edit')) {
      try {
        const row = await api('GET', `/people/${id}`);
        form.innerHTML = buildForm(personFields, row) + formActions('pSave','pCancel','pErr');
        editId = id;
        form.classList.remove('hidden');
        wireFormButtons();
        form.scrollIntoView({ behavior:'smooth' });
      } catch (err) { alert(err.message); }
    }
    if (e.target.classList.contains('p-view')) {
      showProfile(id);
    }
  });

  function wireFormButtons() {
    document.getElementById('pCancel').onclick = () => { form.classList.add('hidden'); editId = null; };
    document.getElementById('pSave').onclick   = async () => {
      try {
        const body = collectForm(form);
        if (editId) await api('PUT', `/people/${editId}`, body);
        else        await api('POST', '/people', body);
        form.classList.add('hidden');
        const { data } = await api('GET', '/people?limit=100');
        all = data; list.innerHTML = data.map(personCard).join('');
      } catch (err) { document.getElementById('pErr').textContent = err.message; }
    };
  }

  async function showProfile(id) {
    profile.innerHTML = '<div class="vault-loading">Loading profile…</div>';
    profile.classList.remove('hidden');
    try {
      const d = await api('GET', `/people/${id}/full`);
      const p = d.person;
      profile.innerHTML = /* html */`
        <div class="person-profile">
          <button class="vault-btn-ghost" id="pClose">← Back to list</button>

          <div class="profile-header">
            <div class="profile-avatar">${(p.codename||'?')[0].toUpperCase()}</div>
            <div>
              <h2>${p.codename}</h2>
              ${p.real_name ? `<p style="color:#666">${p.real_name}</p>` : ''}
              <p style="color:#555;font-size:.8rem">${[p.occupation,p.nationality,p.status].filter(Boolean).join(' · ')}</p>
            </div>
          </div>

          ${d.relationship ? `
          <div class="profile-section">
            <h4>Relationship</h4>
            <div class="profile-kv">
              <span>Role</span><span>${d.relationship.role}${d.relationship.sub_role ? ` · ${d.relationship.sub_role}` : ''}</span>
              <span>Trust</span><span>${scoreBar(d.relationship.trust_level)}</span>
              <span>Influence</span><span>${scoreBar(d.relationship.influence_level)}</span>
            </div>
            ${d.relationship.strategic_value ? `
            <div class="profile-block">
              <strong>Strategic Value (Sun Tzu)</strong>
              <p>${d.relationship.strategic_value}</p>
            </div>` : ''}
          </div>` : ''}

          <div class="profile-section">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <h4>Character Traits (${d.traits.length})</h4>
              <button class="vault-btn-ghost" style="padding:.3rem .7rem" id="addTrait">+ Trait</button>
            </div>
            <div id="traitForm" class="hidden" style="margin-top:1rem">
              ${buildForm(traitFields)}
              <button class="vault-btn-primary" style="width:auto;margin-top:.5rem" id="saveTrait">Save</button>
            </div>
            ${d.traits.map(t => `
              <div class="trait-row">
                <span class="trait-dot"></span>
                <div>
                  <strong>${t.trait}</strong>
                  ${t.evidence ? `<p style="font-size:.8rem;color:#666;margin-top:2px">${t.evidence}</p>` : ''}
                </div>
              </div>`).join('') || '<p class="vault-empty" style="padding:.5rem 0">None recorded.</p>'}
          </div>

          ${d.interactions.length ? `
          <div class="profile-section">
            <h4>Key Interactions</h4>
            ${d.interactions.slice(0,5).map(i => `
              <div class="interaction-row">
                <span style="font-size:.7rem;color:#555">${String(i.happened_at).slice(0,10)}</span>
                <p>${i.summary}</p>
                ${i.lesson ? `<p style="color:#666;font-size:.8rem;font-style:italic">→ ${i.lesson}</p>` : ''}
              </div>`).join('')}
          </div>` : ''}

          ${d.romantic ? `
          <div class="profile-section">
            <h4>💔 Romantic History</h4>
            <div class="profile-kv">
              <span>Type</span><span>${d.romantic.category}</span>
              ${d.romantic.started_at ? `<span>From</span><span>${String(d.romantic.started_at).slice(0,10)}</span>` : ''}
              ${d.romantic.ended_at   ? `<span>To</span>  <span>${String(d.romantic.ended_at).slice(0,10)}</span>`   : ''}
            </div>
            ${d.romantic.lesson ? `<div class="profile-block"><strong>Lesson</strong><p>${d.romantic.lesson}</p></div>` : ''}
          </div>` : ''}
        </div>`;

      document.getElementById('pClose').onclick = () => profile.classList.add('hidden');

      document.getElementById('addTrait').addEventListener('click', () => {
        document.getElementById('traitForm').classList.toggle('hidden');
      });
      document.getElementById('saveTrait').addEventListener('click', async () => {
        const body = { ...collectForm(document.getElementById('traitForm')), person_id: id };
        try { await api('POST', '/traits', body); showProfile(id); }
        catch (err) { alert(err.message); }
      });

    } catch (err) { profile.innerHTML = `<p class="vault-error">${err.message}</p>`; }
  }
}

/* ══════════════════════════════════════════════════════════════
   QUIZ MODE
══════════════════════════════════════════════════════════════ */
async function quizSection() {
  content(/* html */`
    <div class="vault-section">
      <div class="vault-section-header">
        <h2>⚡ Quiz Mode</h2>
      </div>
      <p style="font-size:.8rem;color:#555;margin-bottom:1.5rem">
        The system interrogates your memory. Rate your recall honestly — Sun Tzu: know thyself first.
      </p>

      <div id="quizDomains" style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.5rem">
        ${['Any','books','knowledge','films','figures','quotes','strategy','people','self','memories'].map((d,i) =>
          `<button class="role-pill${i===0?' active':''}" data-d="${d==='Any'?'random':d}">${d}</button>`
        ).join('')}
      </div>

      <div id="quizCard" class="quiz-card">
        <p class="vault-empty">Click "Next Question" to begin your session.</p>
      </div>

      <button class="vault-btn-primary" style="margin-top:1.5rem;width:auto;padding:.7rem 2rem" id="qNext">
        Next Question →
      </button>
    </div>`);

  let currentQ    = null;
  let activeDomain = 'random';

  document.getElementById('quizDomains').addEventListener('click', e => {
    if (!e.target.classList.contains('role-pill')) return;
    document.querySelectorAll('#quizDomains .role-pill').forEach(p => p.classList.remove('active'));
    e.target.classList.add('active');
    activeDomain = e.target.dataset.d;
  });

  document.getElementById('qNext').addEventListener('click', async () => {
    const card = document.getElementById('quizCard');
    card.innerHTML = '<div class="vault-loading">Fetching question…</div>';
    try {
      const path = activeDomain === 'random' ? '/quiz/random' : `/quiz/domain/${activeDomain}`;
      currentQ   = await api('GET', path);

      if (currentQ.message) {
        card.innerHTML = `<p class="vault-empty">${currentQ.message}</p>`;
        return;
      }

      card.innerHTML = /* html */`
        <div class="quiz-question">
          <span class="quiz-domain-tag">${currentQ.domain}</span>
          <h3>${currentQ.question}</h3>
          ${currentQ.hint ? `<p class="quiz-hint">💡 ${String(currentQ.hint).slice(0,150)}</p>` : ''}
        </div>
        <div id="qRevealWrap" style="margin-top:1.5rem">
          <button class="vault-btn-ghost" id="qReveal">Reveal Answer</button>
        </div>`;

      document.getElementById('qReveal').addEventListener('click', () => {
        document.getElementById('qRevealWrap').innerHTML = /* html */`
          <div class="quiz-answer">
            <h4>Answer</h4>
            <p>${currentQ.answer}</p>
          </div>
          <div class="quiz-score-wrap">
            <p>How well did you recall it?</p>
            <div class="quiz-scores">
              ${[1,2,3,4,5].map(s => `
                <button class="quiz-score-btn" data-score="${s}">
                  ${ ['😶','😕','🙂','😊','🤩'][s-1] }
                  <br><span>${['Forgot','Vague','Partial','Good','Perfect'][s-1]}</span>
                </button>`).join('')}
            </div>
          </div>`;

        document.querySelectorAll('.quiz-score-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            document.querySelectorAll('.quiz-score-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            await api('POST', '/quiz/answer', {
              source_table: currentQ.source_table,
              record_id:    currentQ.record_id,
              self_score:   btn.dataset.score,
            }).catch(() => {});
          });
        });
      });

    } catch (err) { card.innerHTML = `<p class="vault-error">${err.message}</p>`; }
  });
}

/* ══════════════════════════════════════════════════════════════
   GENERIC CRUD SECTIONS
══════════════════════════════════════════════════════════════ */
const CRUD_DEFS = {
  self:      { title:'Self & Identity',    path:'/identity',       fields: [
    { key:'field_key',   type:'text',     label:'Field',    required:true },
    { key:'field_value', type:'textarea', label:'Value',    required:true },
    { key:'category',    type:'select',   label:'Category', options:['values','beliefs','personality','physical','spiritual','other'] },
  ]},
  vocation:  { title:'Vocation & Purpose', path:'/vocation',       fields: [
    { key:'title',          type:'text',     label:'Title',    required:true },
    { key:'description',    type:'textarea', label:'Description' },
    { key:'domain',         type:'text',     label:'Domain' },
    { key:'progress_notes', type:'textarea', label:'Progress notes' },
    { key:'is_primary',     type:'checkbox', label:'Primary vocation' },
  ]},
  tech:      { title:'Tech & Tools',       path:'/tech-tools',     fields: [
    { key:'name',           type:'text',     label:'Tool / OS',    required:true },
    { key:'category',       type:'select',   label:'Category', options:['os','editor','language','framework','devops','other'] },
    { key:'proficiency',    type:'number',   label:'Proficiency (1–10)', min:1, max:10 },
    { key:'first_used',     type:'date',     label:'First used' },
    { key:'reason_adopted', type:'textarea', label:'Why adopted' },
    { key:'notes',          type:'textarea', label:'Notes / Config tips' },
    { key:'is_favorite',    type:'checkbox', label:'Favorite' },
  ]},
  knowledge: { title:'Knowledge Base',     path:'/knowledge',      fields: [
    { key:'title',      type:'text',     label:'Title',   required:true },
    { key:'domain',     type:'text',     label:'Domain' },
    { key:'body',       type:'textarea', label:'Content', required:true },
    { key:'source',     type:'text',     label:'Source' },
    { key:'confidence', type:'number',   label:'Confidence (1–10)', min:1, max:10 },
  ]},
  strategy:  { title:'Strategy',           path:'/strategies',     fields: [
    { key:'title',    type:'text',     label:'Title',    required:true },
    { key:'context',  type:'textarea', label:'Context',  required:true },
    { key:'approach', type:'textarea', label:'Approach', required:true },
    { key:'outcome',  type:'textarea', label:'Outcome' },
    { key:'status',   type:'select',   label:'Status',   options:['planning','active','completed','failed'] },
    { key:'lesson',   type:'textarea', label:'Lesson' },
  ]},
  figures:   { title:'Inspiring Figures',  path:'/figures',        fields: [
    { key:'name',            type:'text',     label:'Name',          required:true },
    { key:'domain',          type:'text',     label:'Domain' },
    { key:'era',             type:'text',     label:'Era / Period' },
    { key:'why_inspiring',   type:'textarea', label:'Why inspiring', required:true },
    { key:'key_lessons',     type:'textarea', label:'Key lessons' },
    { key:'key_quotes',      type:'textarea', label:'Key quotes' },
    { key:'applied_in_life', type:'textarea', label:'Applied in life' },
  ]},
  culture:   { title:'Books & Films',      path:'/books',          fields: [
    { key:'title',       type:'text',     label:'Title',  required:true },
    { key:'author',      type:'text',     label:'Author' },
    { key:'genre',       type:'text',     label:'Genre' },
    { key:'read_at',     type:'date',     label:'Read at' },
    { key:'rating',      type:'number',   label:'Rating (1–10)', min:1, max:10 },
    { key:'summary',     type:'textarea', label:'Your summary' },
    { key:'key_lessons', type:'textarea', label:'Key lessons' },
    { key:'applied',     type:'textarea', label:'Applied how?' },
  ]},
  parcours:  { title:'Parcours',           path:'/education',      fields: [
    { key:'institution',  type:'text',     label:'Institution', required:true },
    { key:'type',         type:'select',   label:'Type', options:['primary','secondary','university','online','self','other'] },
    { key:'degree',       type:'text',     label:'Degree' },
    { key:'field',        type:'text',     label:'Field' },
    { key:'started_at',   type:'date',     label:'Start' },
    { key:'ended_at',     type:'date',     label:'End' },
    { key:'key_memories', type:'textarea', label:'Key memories' },
  ]},
  health:    { title:'Health',             path:'/health',         fields: [
    { key:'record_date', type:'date',     label:'Date',     required:true },
    { key:'category',    type:'select',   label:'Category', options:['physical','mental','spiritual','other'] },
    { key:'title',       type:'text',     label:'Title',    required:true },
    { key:'description', type:'textarea', label:'Description' },
    { key:'severity',    type:'number',   label:'Severity (1–10)', min:1, max:10 },
    { key:'resolution',  type:'textarea', label:'Resolution' },
  ]},
};

async function genericSection(id) {
  const cfg = CRUD_DEFS[id]; if (!cfg) return;
  loading(cfg.title);
  try {
    const { data } = await api('GET', `${cfg.path}?limit=50`);
    content(/* html */`
      <div class="vault-section">
        <div class="vault-section-header">
          <h2>${cfg.title}</h2>
          <button class="vault-btn-primary" style="width:auto;padding:.5rem 1rem" id="gAdd">+ Add</button>
        </div>
        <div id="gForm" class="vault-form-wrap hidden">
          ${buildForm(cfg.fields)}
          <div class="vault-form-actions" style="grid-column:1/-1">
            <button class="vault-btn-primary" style="width:auto" id="gSave">Save</button>
            <button class="vault-btn-ghost" id="gCancel">Cancel</button>
            <p class="vault-error" id="gErr"></p>
          </div>
        </div>
        <div class="vault-list" id="gList">
          ${data.map(r => genericCard(r, cfg.fields)).join('') || '<p class="vault-empty">No entries yet.</p>'}
        </div>
      </div>`);
    wireGeneric(cfg.path, cfg.fields);
  } catch (err) { vError(err.message); }
}

function genericCard(row, fields) {
  const v1 = row[fields[0].key] || '—';
  const v2 = fields[1] ? String(row[fields[1].key]||'').slice(0,60) : '';
  return /* html */`
    <div class="vault-card">
      <div class="vault-card-preview">
        <strong>${v1}</strong>${v2 ? ` · ${v2}` : ''}
      </div>
      <div class="vault-card-actions">
        <button class="vault-icon-btn g-edit" data-id="${row.id}">✏️</button>
        <button class="vault-icon-btn g-del"  data-id="${row.id}">🗑</button>
      </div>
    </div>`;
}

function wireGeneric(path, fields) {
  let editId = null;
  const form = document.getElementById('gForm');
  const list = document.getElementById('gList');

  document.getElementById('gAdd').onclick = () => {
    editId = null;
    resetForm(form, fields);
    form.classList.remove('hidden');
  };

  const cancelBtn = () => document.getElementById('gCancel');
  const saveBtn   = () => document.getElementById('gSave');
  const errEl     = () => document.getElementById('gErr');

  form.addEventListener('click', async e => {
    if (e.target.id === 'gCancel') { form.classList.add('hidden'); editId = null; }
    if (e.target.id === 'gSave') {
      try {
        const body = collectForm(form);
        if (editId) await api('PUT', `${path}/${editId}`, body);
        else        await api('POST', path, body);
        form.classList.add('hidden'); editId = null;
        const { data } = await api('GET', `${path}?limit=50`);
        list.innerHTML  = data.map(r => genericCard(r, fields)).join('') || '<p class="vault-empty">No entries yet.</p>';
      } catch (err) { const e = document.getElementById('gErr'); if (e) e.textContent = err.message; }
    }
  });

  list.addEventListener('click', async e => {
    const id = e.target.dataset.id; if (!id) return;
    if (e.target.classList.contains('g-del')) {
      if (!confirm('Delete?')) return;
      try { await api('DELETE', `${path}/${id}`); e.target.closest('.vault-card').remove(); }
      catch (err) { alert(err.message); }
    }
    if (e.target.classList.contains('g-edit')) {
      try {
        const row = await api('GET', `${path}/${id}`);
        resetForm(form, fields, row);
        editId = id;
        form.classList.remove('hidden');
        form.scrollIntoView({ behavior:'smooth' });
      } catch (err) { alert(err.message); }
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   SECTION REGISTRY
══════════════════════════════════════════════════════════════ */
const SECTIONS = {
  overview: overviewSection,
  journal:  journalSection,
  people:   peopleSection,
  quiz:     quizSection,
  ...Object.fromEntries(
    Object.keys(CRUD_DEFS).map(k => [k, () => genericSection(k)])
  ),
};

/* ══════════════════════════════════════════════════════════════
   FORM HELPERS
══════════════════════════════════════════════════════════════ */
function buildForm(fields, data = {}) {
  return fields.map(f => {
    const v = data[f.key] ?? '';
    if (f.type === 'textarea') return `
      <div class="vault-field" style="${String(v).length > 50 ? 'grid-column:1/-1' : ''}">
        <label>${f.label}${f.required?' *':''}</label>
        <textarea name="${f.key}" rows="3"${f.required?' required':''}>${v}</textarea>
      </div>`;
    if (f.type === 'select') return `
      <div class="vault-field">
        <label>${f.label}</label>
        <select name="${f.key}">${(f.options||[]).map(o => `<option${o===v?' selected':''}>${o}</option>`).join('')}</select>
      </div>`;
    if (f.type === 'checkbox') return `
      <div class="vault-field vault-field-check">
        <label><input type="checkbox" name="${f.key}"${v?' checked':''}> ${f.label}</label>
      </div>`;
    return `
      <div class="vault-field">
        <label>${f.label}${f.required?' *':''}</label>
        <input type="${f.type}" name="${f.key}" value="${v}"
          ${f.min!=null?`min="${f.min}"`:''}${f.max!=null?`max="${f.max}"`:''}
          ${f.required?'required':''}>
      </div>`;
  }).join('');
}

function resetForm(form, fields, data = {}) {
  // Preserve the action buttons if they're inside the form
  form.innerHTML = buildForm(fields, data);
  form.innerHTML += `
    <div class="vault-form-actions" style="grid-column:1/-1">
      <button class="vault-btn-primary" style="width:auto" id="gSave">Save</button>
      <button class="vault-btn-ghost" id="gCancel">Cancel</button>
      <p class="vault-error" id="gErr"></p>
    </div>`;
}

function collectForm(container) {
  const out = {};
  container.querySelectorAll('input,textarea,select').forEach(el => {
    if (!el.name) return;
    out[el.name] = el.type === 'checkbox' ? (el.checked ? 1 : 0) : el.value;
  });
  return out;
}

function formActions(saveId, cancelId, errId) {
  return `
    <div class="vault-form-actions" style="grid-column:1/-1">
      <button class="vault-btn-primary" style="width:auto" id="${saveId}">Save</button>
      <button class="vault-btn-ghost" id="${cancelId}">Cancel</button>
      <p class="vault-error" id="${errId}"></p>
    </div>`;
}

function scoreBar(val) {
  if (!val) return '—';
  return `<span style="font-family:monospace;color:#c8602a">${'█'.repeat(val)}</span>` +
         `<span style="color:#222">${'░'.repeat(10-val)}</span> ${val}/10`;
}
