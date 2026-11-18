/**
 * cv.mjs
 * Post-build step: write the CV as PDF (English and French) into dist/docs/.
 * Built from the site data (js/cv-content.js), so it always matches the site
 * and the current study level. Fails the build if a CV overflows one page.
 */

import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { buildCv } from "../js/cv-content.js";

const ACCENT = "#c8602a";
const INK = "#1a1814";
const MUTED = "#6b6760";
const RULE = "#d9d5cc";
const M = 48; // page margin
const W = 595.28 - 2 * M; // content width (A4)

const out = new URL("../dist/docs/", import.meta.url);
mkdirSync(out, { recursive: true });

function render(lang) {
  return new Promise((resolve, reject) => {
    const cv = buildCv(lang);
    const doc = new PDFDocument({
      size: "A4",
      margin: M,
      info: { Title: `${cv.name} - CV`, Author: cv.name, Subject: cv.role },
    });
    let pages = 1;
    doc.on("pageAdded", () => pages++);
    const file = new URL(`monami-jerome-cv-${lang}.pdf`, out);
    const stream = createWriteStream(file);
    doc.pipe(stream);

    const heading = (text) => {
      doc.moveDown(0.9);
      doc.font("Helvetica-Bold").fontSize(9).fillColor(ACCENT).text(text.toUpperCase(), M, doc.y, { characterSpacing: 1 });
      const y = doc.y + 2;
      doc.moveTo(M, y).lineTo(M + W, y).lineWidth(0.5).strokeColor(RULE).stroke();
      doc.y = y + 7;
    };

    const row = (left, right, sub) => {
      const y = doc.y;
      doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(left, M, y, { width: W - 130 });
      const afterLeft = doc.y;
      doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(right, M, y, { width: W, align: "right" });
      doc.y = Math.max(afterLeft, doc.y);
      if (sub) doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(sub, M, doc.y, { width: W });
      doc.moveDown(0.5);
    };

    // Header
    doc.font("Helvetica-Bold").fontSize(26).fillColor(INK).text(cv.name, M, M);
    doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text(cv.role, M, doc.y + 1);
    doc.moveDown(0.5);

    // Contact line (links are real PDF links)
    let x = M, y = doc.y;
    doc.font("Helvetica").fontSize(8.5);
    cv.contact.forEach((c, i) => {
      const w = doc.widthOfString(c.text);
      const sep = i < cv.contact.length - 1 ? "   |   " : "";
      if (x + w > M + W) { x = M; y += 12; }
      doc.fillColor(c.url ? ACCENT : MUTED).text(c.text, x, y, { lineBreak: false, link: c.url, underline: false });
      x += w;
      if (sep) { doc.fillColor(RULE).text(sep, x, y, { lineBreak: false }); x += doc.widthOfString(sep); }
    });
    doc.y = y + 14;

    // Profile
    doc.moveDown(0.6);
    doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(cv.profile, M, doc.y, { width: W, lineGap: 2 });

    // Education
    heading(cv.headings.education);
    cv.education.forEach((e) => row(e.title, e.when, e.detail));

    // Projects
    heading(cv.headings.projects);
    cv.projects.forEach((p) => {
      row(p.status ? `${p.title} (${p.status})` : p.title, p.tags);
      doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(p.text, M, doc.y - 3, { width: W, lineGap: 1.5 });
      doc.font("Helvetica").fontSize(8.5).fillColor(ACCENT).text(p.link.text, M, doc.y + 1, { link: p.link.url, underline: false });
      doc.moveDown(0.7);
    });

    // Skills
    heading(cv.headings.skills);
    cv.skills.forEach((s) => {
      doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK).text(`${s.label}:  `, M, doc.y, { continued: true, width: W });
      doc.font("Helvetica").fillColor(INK).text(s.items);
      doc.moveDown(0.25);
    });

    doc.end();
    stream.on("finish", () => (pages > 1 ? reject(new Error(`CV (${lang}) overflows one page (${pages} pages)`)) : resolve(file)));
    stream.on("error", reject);
  });
}

for (const lang of ["en", "fr"]) await render(lang);
console.log("cv: dist/docs/monami-jerome-cv-en.pdf, dist/docs/monami-jerome-cv-fr.pdf");
