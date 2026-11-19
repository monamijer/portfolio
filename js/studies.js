/**
 * studies.js
 * Current studies, computed from the date so the level moves up on its own
 * each academic year (it starts in September). Pure module: no Vite APIs.
 *
 * To correct it, edit the anchor ("this academic year I am in <level>") or
 * the path of levels. After the last level, the last one is kept.
 */

export const STUDIES = {
  school: "Bujumbura International University",
  field: "Software Engineering",
  path: ["Bac 1", "Bac 2", "Bac 3", "Master 1", "Master 2"],
  anchor: { academicYear: 2026, level: "Bac 3" }, // academic year 2026–2027
};

export function studyStatus(now = new Date()) {
  const academicYear = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  const base = STUDIES.path.indexOf(STUDIES.anchor.level);
  const index = Math.min(
    Math.max(base + (academicYear - STUDIES.anchor.academicYear), 0),
    STUDIES.path.length - 1,
  );
  return {
    level: STUDIES.path[index],
    academicYear: `${academicYear}–${academicYear + 1}`,
    school: STUDIES.school,
    field: STUDIES.field,
  };
}
