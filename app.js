'use strict';
/* Ohne Framework, Build, Server oder fetch: index.html genügt. */
const $ = (s, root = document) => root.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const strip = s => String(s).replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ');
const KEY = 'fiae-lern-studio-v1';
let storageOK = true;
let state = {
    version: 1,
    theme: 'light',
    arabic: true,
    lessons: {},
    answers: {},
    ratings: {},
    causes: {},
    due: {},
    rubrics: {},
    simOrders: {},
    simMatches: {},
    simMc: {},
    simResults: {},
    last: null
};
try { const raw = localStorage.getItem(KEY); if (raw) state = validateState(JSON.parse(raw)); } catch { storageOK = false; }
let session = null;
let simTimer = { simId: null, remainingSec: 0, running: false, intervalId: null };

const lessons = COURSE.lessons.sort((a, b) => COURSE.modules.findIndex(m => m.id === a.module) - COURSE.modules.findIndex(m => m.id === b.module));
const modules = COURSE.modules;
const simulations = COURSE.simulations || [];
const katalogMatrix = COURSE.katalogMatrix || [];
const examIndex = COURSE.examIndex || [];
const exerciseMeta = COURSE.exerciseMeta || {};
const allQuestions = lessons.flatMap(l => l.questions.map((q, i) => ({ ...q, id: l.id + '-' + i, idx: i, lesson: l })));
const allSimTasks = simulations.flatMap(sim => sim.tasks.map((t, i) => ({ ...t, idx: i, sim, lesson: lessons.find(l => l.id === t.lessonId) || lessons[0] })));
const searchIndex = new Map(lessons.map(l => [l.id, normalize([l.title, l.ar, l.summary, ...l.terms.flat(), ...l.sections.map(s => s.title + ' ' + strip(s.de) + ' ' + strip(s.ar))].join(' '))]));

const ERROR_CAUSES = {
    verstaendnis: { labelDe: 'Verständnis / Operator', labelAr: 'فهم المطلوب / Operator', icon: '📖', tipDe: 'Operatoren (Nennen, Beschreiben, Begründen, Entwerfen) und geforderte Einheiten vor dem Schreiben markieren.', tipAr: 'اقرأ فعل السؤال (Nennen / Begründen / Entwerfen) بدقة وحدد الوحدات والمطلوب قبل البدء بالحل.' },
    logik: { labelDe: 'Logik / Syntax / Rechnung', labelAr: 'خطأ في المنطق أو الحساب', icon: '⚙️', tipDe: 'Erst das Grundgerüst (Formel, SQL-Klauseln, Schleifenbedingung) notieren und Zwischenschritte hinschreiben.', tipAr: 'اكتب هيكل الحل أو القانون أولاً (ترتيب جمل SQL أو شروط الحلقة) ولا تختصر خطوات الحساب.' },
    randfall: { labelDe: 'Randfall (Edge Case) vergessen', labelAr: 'نسيان حالة حدّية (Edge Case)', icon: '⚠️', tipDe: 'Checkliste vor Abgabe: NULL, 0, leere Liste [], exakt auf der Grenze, letzte Gruppe nach der Schleife!', tipAr: 'افحص دائماً الحالات الحدية: القيمة NULL، القسمة على 0، القائمة الفارغة، والطباعة بعد انتهاء الحلقة!' },
    zeit: { labelDe: 'Zeitdruck / Tempo', labelAr: 'ضيق الوقت', icon: '⏱️', tipDe: 'Faustregel: 1 Punkt ≈ 0,9 Minuten (Teil 1/2) bzw. 0,6 Minuten (WiSo). Erst sichere Teilpunkte holen!', tipAr: 'قاعدة الوقت: لكل نقطة أقل من دقيقة؛ اجمع النقاط الجزئية المضمونة أولاً ولا تتوقف طويلاً عند فرع واحد.' }
};

function normalize(s) {
    return String(s ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ـ/g, '');
}

function validateState(s) {
    if (!s || s.version !== 1 || typeof s.lessons !== 'object' || !s.lessons || Array.isArray(s.lessons)) throw Error('Ungültiges Sicherungsformat');
    const clean = {
        version: 1,
        theme: s.theme === 'dark' ? 'dark' : 'light',
        arabic: s.arabic !== false,
        lessons: {},
        answers: {},
        ratings: {},
        causes: {},
        due: {},
        rubrics: {},
        simOrders: {},
        simMatches: {},
        simMc: {},
        simResults: {},
        last: typeof s.last === 'string' ? s.last : null
    };
    for (const [id, v] of Object.entries(s.lessons)) {
        if (!v || typeof v !== 'object' || !COURSE.lessons.some(l => l.id === id)) continue;
        clean.lessons[id] = {
            status: ['new', 'learning', 'learned'].includes(v.status) ? v.status : 'new',
            notes: typeof v.notes === 'string' ? v.notes.slice(0, 30000) : '',
            checks: Array.isArray(v.checks) ? v.checks.filter(x => Number.isInteger(x) && x >= 0 && x < 100) : []
        };
    }
    for (const [id, v] of Object.entries(s.answers || {})) if (typeof v === 'string' && id.length < 120) clean.answers[id] = v.slice(0, 30000);
    for (const [id, v] of Object.entries(s.ratings || {})) if (['again', 'partial', 'good'].includes(v) && id.length < 120) clean.ratings[id] = v;
    for (const [id, v] of Object.entries(s.causes || {})) if (ERROR_CAUSES[v] && id.length < 120) clean.causes[id] = v;
    for (const [id, v] of Object.entries(s.due || {})) if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && id.length < 120) clean.due[id] = v;
    for (const [id, v] of Object.entries(s.rubrics || {})) if (Array.isArray(v) && id.length < 120) clean.rubrics[id] = v.filter(x => Number.isInteger(x) && x >= 0 && x < 50);
    for (const [id, v] of Object.entries(s.simOrders || {})) if (Array.isArray(v) && id.length < 120) clean.simOrders[id] = v.filter(x => Number.isInteger(x) && x >= 0 && x < 30);
    for (const [id, v] of Object.entries(s.simMatches || {})) if (v && typeof v === 'object' && !Array.isArray(v) && id.length < 120) clean.simMatches[id] = v;
    for (const [id, v] of Object.entries(s.simMc || {})) if (Array.isArray(v) && id.length < 120) clean.simMc[id] = v.filter(x => Number.isInteger(x) && x >= 0 && x < 30);
    for (const [id, v] of Object.entries(s.simResults || {})) {
        if (v && typeof v === 'object' && id.length < 60) {
            clean.simResults[id] = {
                score: Number(v.score) || 0,
                max: Number(v.max) || 100,
                date: typeof v.date === 'string' ? v.date.slice(0, 20) : '',
                durationSec: Number(v.durationSec) || 0
            };
        }
    }
    return clean;
}

function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch { storageOK = false; toast('Speichern nicht möglich. Bitte Fortschritt als JSON sichern.'); }
    updateReviewBadge();
}

function updateReviewBadge() {
    const el = $('#review-count');
    if (!el) return;
    const ids = new Set([
        ...Object.keys(state.causes || {}),
        ...Object.entries(state.ratings || {}).filter(([, v]) => v === 'again' || v === 'partial').map(([k]) => k)
    ]);
    el.textContent = ids.size ? String(ids.size) : '';
}

function addDaysISO(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
}

function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

/* Hebt Schlüsselbegriffe in einzeiligen/mehrzeiligen Lösungstexten automatisch fett hervor */
function formatSolutionDe(raw, lesson) {
    let html = esc(raw).replace(/\n/g, '<br>');
    // Struktur-Präfixe fett markieren
    html = html.replace(/(^|<br>)(\s*)([0-9]+\.|[a-d]\)|Richtig[^:]*:|Falsch[^:]*:|Rechenweg:|Formel:|Ergebnis:|Begründung:|Lösung:|Merksatz:|Wichtig:|Achtung:|Vorteil:|Nachteil:|Ursache:|Korrektur:|Tests?:|Schritt\s*[0-9]+:)/gi, '$1$2<b>$3</b>');
    // Zentrale Fachbegriffe fett hervorheben
    const terms = new Set([
        'LEFT JOIN', 'INNER JOIN', 'GROUP BY', 'HAVING', 'WHERE', 'ORDER BY', 'SELECT', 'INSERT INTO', 'DELETE FROM', 'UPDATE',
        'START TRANSACTION', 'COMMIT', 'ROLLBACK', 'COALESCE', 'COUNT', 'SUM', 'AVG', 'PRIMARY KEY', 'FOREIGN KEY', 'NOT EXISTS',
        '1NF', '2NF', '3NF', 'Primärschlüssel', 'Fremdschlüssel', 'PK', 'FK', 'NULL', 'ACID',
        'FAZ', 'FEZ', 'SAZ', 'SEZ', 'Gesamtpuffer', 'Freier Puffer', 'Kritischer Pfad', 'Lastenheft', 'Pflichtenheft', 'SMART',
        'Use-Case', ' «include»', '«extend»', 'Komposition', 'Aggregation', 'Interface', 'Observer', 'Strategy', 'Factory', 'Singleton',
        'Äquivalenzklassen', 'Grenzwertanalyse', 'Zweigüberdeckung', 'Anweisungsüberdeckung', 'TDD', 'ISO 25010',
        'Prepared Statements', 'SQL-Injection', 'XSS', 'CSRF', 'Asymmetrisch', 'Symmetrisch', 'Digitale Signatur', 'Hash', 'Salt', 'Kerberos', 'SSO',
        'RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10', 'NAS', 'SAN', 'DAS', 'RPO', 'RTO',
        'BBiG', 'ArbZG', 'JArbSchG', 'KSchG', 'BetrVG', 'BGB', 'GmbH', 'OHG', 'KG', 'Komplementär', 'Kommanditist', 'Prokura',
        'Beitragsbemessungsgrenze', 'BBG', 'Zieleinkaufspreis', 'Bareinkaufspreis', 'Bezugspreis', 'Skonto', 'Rabatt', 'Gleichgewichtspreis', 'Nacherfüllung'
    ]);
    if (lesson && Array.isArray(lesson.terms)) {
        for (const [de] of lesson.terms) {
            const cleanTerm = de.split('(')[0].split('/')[0].trim();
            if (cleanTerm.length >= 4) terms.add(cleanTerm);
        }
    }
    for (const t of terms) {
        const safe = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const rx = new RegExp(`(^|[^\\wÄÖÜäöüß</>])(${safe})(?=[^\\wÄÖÜäöüß</>]|$)`, 'g');
        html = html.replace(rx, '$1<b>$2</b>');
    }
    return html;
}

function formatSolutionAr(raw, lesson) {
    let html = esc(raw).replace(/\n/g, '<br>');
    html = html.replace(/(^|<br>)(\s*)([0-9]+\.|•|-|\* )?(\s*)([^:.،؛\n]{3,38}:)/g, '$1$2$3$4<b>$5</b>');
    const arTerms = new Set([
        'المفتاح الأساسي', 'المفتاح الأجنبي', 'المسار الحرج', 'فترة السماح', 'نقطة التعادل', 'سعر التوازن',
        'التشفير غير التماثلي', 'التشفير التماثلي', 'التوقيع الرقمي', 'فئات التكافؤ', 'القيم الحدية', 'تغطية الفروع',
        'إزاحة الفهرس', 'كسر المجموعات', 'المجموعة الأخيرة', 'القائمة الفارغة', 'القسمة على صفر',
        'فترة التجربة', 'صاحب العمل', 'الموظف', 'المتدرب', 'مجلس العاملين', 'سقف الاشتراك', 'إصلاح العيب',
        'الخصم التجاري', 'خصم تعجيل الدفع', 'سعر الشراء', 'الشريك المتضامن', 'الشريك الموصي',
        'LEFT JOIN', 'INNER JOIN', 'GROUP BY', 'HAVING', 'WHERE', 'ON', 'NULL', 'PK', 'FK', '1NF', '2NF', '3NF',
        'FAZ', 'FEZ', 'SAZ', 'SEZ', 'GP', 'FP', 'BBG', 'BBiG', 'KSchG', 'BetrVG', 'GmbH', 'KG', 'OHG', 'Skonto', 'Rabatt'
    ]);
    if (lesson && Array.isArray(lesson.terms)) {
        for (const [, ar] of lesson.terms) {
            const cleanAr = ar.split('(')[0].split('،')[0].split('/')[0].trim();
            if (cleanAr.length >= 4) arTerms.add(cleanAr);
        }
    }
    for (const t of arTerms) {
        const safe = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        html = html.replace(new RegExp(`(${safe})`, 'g'), '<b>$1</b>');
    }
    return html;
}

/* Erzeugt für jede Übung ein konkretes Teilpunkte-Schema (Rubric) */
function getRubricForExercise(q) {
    if (Array.isArray(q.rubric) && q.rubric.length) return q.rubric;
    const lid = q.lesson?.id;
    if (lid && exerciseMeta[lid]?.rubric) return exerciseMeta[lid].rubric;
    const pts = Number(q.points) || 6;
    const sentences = String(q.a || '').split(/(?:\.\s+|\n+|;\s+)/).map(s => s.trim()).filter(s => s.length > 8);
    if (sentences.length >= 3) {
        const p1 = Math.max(1, Math.floor(pts / 3));
        const p2 = Math.max(1, Math.floor((pts - p1) / 2));
        const p3 = Math.max(1, pts - p1 - p2);
        return [
            [p1 + ' P.', sentences[0], 'الخطوة الأولى: تحديد المفهوم أو المعادلة الأساسية بشكل صحيح'],
            [p2 + ' P.', sentences[1], 'الخطوة الثانية: تطبيق الشروط أو خطوات الحل الوسطى بدقة'],
            [p3 + ' P.', sentences.slice(2).join(' · ').slice(0, 160), 'الخطوة الثالثة: كتابة النتيجة النهائية مع الوحدة أو معالجة الحالات الحدية']
        ];
    }
    const half = Math.max(1, Math.floor(pts / 2));
    return [
        [half + ' P.', sentences[0] || 'Fachlich korrekter Lösungsansatz / Grundstruktur', 'بناء هيكل الحل الأساسي واختيار الطريقة الصحيحة'],
        [(pts - half) + ' P.', sentences[1] || 'Vollständiges Ergebnis mit korrekter Begründung / Einheit / Randfallprüfung', 'إكمال النتيجة النهائية مع التبرير أو فحص الحالات الحدية']
    ];
}

function getTwinExercise(qId, lessonObj) {
    if (!lessonObj) return null;
    const sameLesson = allQuestions.filter(x => x.lesson.id === lessonObj.id && x.id !== qId);
    if (sameLesson.length) return sameLesson[0];
    const sameModule = allQuestions.filter(x => x.lesson.module === lessonObj.module && x.id !== qId);
    return sameModule[0] || null;
}
function lessonState(id) { return state.lessons[id] || (state.lessons[id] = { status: 'new', notes: '', checks: [] }); }
function statusOf(id) { return state.lessons[id]?.status || 'new'; }
function statusName(s) { return { new: 'Noch offen', learning: 'In Arbeit', learned: 'Verstanden' }[s]; }
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => $('#toast').classList.remove('show'), 3500); }
function pct(list) { return list.length ? Math.round(list.filter(l => statusOf(l.id) === 'learned').length / list.length * 100) : 0; }
function moduleOf(id) { return modules.find(m => m.id === id); }
function badge(p) { return `<span class="badge ${p === 'Kern' ? 'focus' : p === 'Basis' ? 'neutral' : ''}">${esc(p)}</span>`; }
function header(eyebrow, title, desc, ar = '') { return `<div class="intro"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p>${ar ? `<p class="arabic" lang="ar">${ar}</p>` : ''}</div></div>`; }

function stats() {
    const simsDone = Object.keys(state.simResults || {}).length;
    return `<div class="stats">
        <div class="stat"><strong>${lessons.length}</strong><span>ausgearbeitete Lektionen</span></div>
        <div class="stat"><strong>${allQuestions.length}</strong><span>Übungen mit Teilpunkte-Rubrik</span></div>
        <div class="stat"><strong>${simsDone}<small> / ${simulations.length}</small></strong><span>Prüfungssimulationen absolviert</span></div>
        <div class="stat"><strong>${lessons.filter(l => statusOf(l.id) === 'learned').length}<small> / ${lessons.length}</small></strong><span>selbst als verstanden markiert</span></div>
    </div>`;
}

function moduleCard(m) {
    const list = lessons.filter(l => l.module === m.id);
    return `<a class="module-card" href="#module/${m.id}"><div class="card-icon"><span class="symbol">${m.icon}</span><span class="badge neutral">${list.length} Lektionen</span></div><h3>${m.title}</h3><p class="arabic" lang="ar">${m.ar}</p><p>${m.desc}</p><div class="card-meta"><span>${pct(list)} % verstanden</span><span>Themen öffnen ↗</span></div><div class="progress" aria-label="${pct(list)} Prozent verstanden"><i style="width:${pct(list)}%"></i></div></a>`;
}

function topicCard(l) {
    const refs = examIndex.filter(x => x.lessonId === l.id && x.type === 'ref').length;
    const progs = examIndex.filter(x => x.lessonId === l.id && x.type === 'prognose').length;
    return `<a class="topic-card" href="#lesson/${l.id}"><div>${badge(l.priority)} <span class="badge neutral">${statusName(statusOf(l.id))}</span>${refs ? ` <span class="badge neutral">📌 ${refs} Altprüfung</span>` : ''}${progs ? ` <span class="badge focus">🔮 Prognose</span>` : ''}</div><h3>${esc(l.title)}</h3><p class="arabic" lang="ar">${esc(l.ar)}</p><p>${esc(l.summary)}</p><div class="card-meta"><span>${esc(moduleOf(l.module).title)}</span><span>${l.questions.length} Übungen ↗</span></div></a>`;
}

function home() {
    const next = lessons.find(l => l.id === state.last && statusOf(l.id) !== 'learned') || lessons.find(l => statusOf(l.id) !== 'learned') || lessons[0];
    const weakCount = Object.values(state.ratings).filter(v => ['again', 'partial'].includes(v)).length + Object.keys(state.causes).length;
    return header('DEUTSCH LERNEN · AUF ARABISCH VERSTEHEN', 'Dein nächster Schritt zur AP2.', 'Ein klarer Lernweg für Anwendungsentwicklung: Erst verstehen, dann unter Zeitdruck in 9 Prüfungsmodellen messen und Fehlerursachen gezielt abstellen.') +
        `<section class="hero"><div><div class="eyebrow">NUR FIAE · SCHRIFTLICHE PRÜFUNG (3.0 EDITION)</div><h2>Wissen verbinden.<br>Unter Zeitdruck punkten.</h2><p>Planen eines Softwareproduktes · Algorithmen · WiSo</p><p class="arabic" lang="ar">ابدأ بالشرح الألماني والعربي (الكلمات المفتاحية <b>بخط غامق</b>)، ثم اختبر جاهزيتك في <b>9 نماذج محاكاة</b> وراقب <b>خريطة تغطية الكتالوج</b> و<b>قائمة أخطائك الشخصية</b>.</p><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px"><a class="button" href="#lesson/${next.id}">Weiterlernen <span>→</span></a><a class="button secondary" href="#simulator">⏱ 9 Prüfungssimulationen</a><a class="button secondary" href="#katalog">🗺 Katalog-Abdeckung</a></div></div><div class="hero-graphic"><div class="ring"><strong>${pct(lessons)} %</strong><span>DEIN LERNFORTSCHRITT</span></div></div></section>` + stats() +
        `<div class="coverage-grid">
            <div class="panel">
                <div class="eyebrow">NEU · CODEX-OPTIMIERUNGEN AKTIV</div>
                <h3>Training & Messung auf Prüfungsniveau</h3>
                <ul>
                    <li><b>9 Prüfungssimulationen (je 3 Modelle A/B/C):</b> Diagnose, Fehlersuche/Code-Tracing und Generalprobe vor der Prüfung (<a href="#simulator">Zum Simulator →</a>).</li>
                    <li><b>Prüfungskatalog-Matrix (ab Sommer 2025):</b> Unterscheidet transparent zwischen <i>Erklärt</i>, <i>Geübt</i> und <i>Prüfungsniveau</i> (<a href="#katalog">Zur Katalog-Map →</a>).</li>
                    <li><b>Persönliche Fehler-Checkliste:</b> Speichert <i>warum</i> Punkte fehlten (Verständnis, Logik, Randfall, Zeit) mit Wiedervorlage-Datum (<a href="#review">Fehlerdiagnose (${weakCount}) →</a>).</li>
                    <li><b>Prüfungsindex & Prognosen:</b> Filterbare Altprüfungs-Referenzen getrennt von begründeten Prognosen (<a href="#pruefungsindex">Zum Prüfungsindex →</a>).</li>
                </ul>
            </div>
            <div class="panel">
                <h3>Prüfungsformat & 3-Stufen-Plan</h3>
                <div class="metric-row"><span>Teil 1 · Softwareprodukt planen (Modelle A, B, C)</span><b>3 × 90 Min.</b></div>
                <div class="metric-row"><span>Teil 2 · Algorithmen & SQL (Modelle A, B, C)</span><b>3 × 90 Min.</b></div>
                <div class="metric-row"><span>WiSo · MC, Reihenfolge, Zuordnung, Rechnen, Tabelle</span><b>3 × 60 Min.</b></div>
                <p class="arabic" lang="ar" style="margin-top:12px">حل <b>النموذج A</b> للتشخيص، ثم راجع الدروس المرتبطة بأخطائك في قسم <b>Fehlerdiagnose</b>، ثم حل <b>النموذج B</b> (تصحيح الأخطاء) و<b>النموذج C</b> قبل الامتحان.</p>
                <a class="button secondary small" href="#simulator" style="margin-top:12px">Prüfungssimulation wählen →</a>
            </div>
        </div>` +
        `<div class="section-heading"><h2>Acht Bereiche. Ein Lernziel.</h2><a href="#topics">Alle Lektionen →</a></div><div class="grid">${modules.map(moduleCard).join('')}</div>` +
        (!storageOK ? '<div class="notice">Der Browser erlaubt aktuell keine dauerhafte Speicherung. Nutze „Fortschritt sichern“.</div>' : '');
}

function topics(moduleId = '', review = false) {
    const m = moduleOf(moduleId);
    let title = review ? 'Gezielt wiederholen.' : m ? m.title : 'Das ganze Wissen, klar sortiert.';
    return header(review ? 'DEINE WIEDERHOLUNG' : m ? 'THEMENBEREICH ' + m.icon : 'THEMENBIBLIOTHEK', title, review ? 'Offene Verständnisfragen, begonnene Lektionen und Aufgaben mit Wiederholungsbedarf.' : m ? m.desc : 'Suche auch nach arabischen Begriffen, SQL-Befehlen oder Stichwörtern aus dem Inhalt.', m ? m.ar : '') +
        `<div class="toolbar"><label class="search"><span class="sr-only">Themen durchsuchen</span><input id="topic-search" type="search" placeholder="Suchen: JOIN, Kündigung, تشفير …" aria-label="Themen durchsuchen"></label><select id="priority-filter" aria-label="Lernpriorität"><option value="">Alle Prioritäten</option><option>Kern</option><option>Wichtig</option><option>Basis</option></select><select id="status-filter" aria-label="Lernstatus"><option value="">Jeder Lernstand</option><option value="new">Noch offen</option><option value="learning">In Arbeit</option><option value="learned">Verstanden</option></select></div><div class="search-summary" id="search-summary" aria-live="polite"></div><div class="grid" id="topic-results" data-module="${moduleId}" data-review="${review}"></div>`;
}

function updateTopics() {
    const target = $('#topic-results'); if (!target) return;
    const query = normalize($('#topic-search').value).trim().split(/\s+/).filter(Boolean), priority = $('#priority-filter').value, status = $('#status-filter').value;
    const list = lessons.filter(l => (!target.dataset.module || l.module === target.dataset.module) && (!priority || l.priority === priority) && (!status || statusOf(l.id) === status) && query.every(q => searchIndex.get(l.id).includes(q)) && (target.dataset.review !== 'true' || statusOf(l.id) === 'learning' || l.questions.some((q, i) => ['again', 'partial'].includes(state.ratings[l.id + '-' + i]))));
    $('#search-summary').textContent = `${list.length} von ${target.dataset.module ? lessons.filter(l => l.module === target.dataset.module).length : lessons.length} Lektionen`;
    target.innerHTML = list.length ? list.map(topicCard).join('') : '<div class="empty">Keine passenden Lektionen. Filter ändern oder eine Übung als „Noch einmal“ bewerten.</div>';
}

function renderRubricAndMetaHTML(q, id, lessonObj) {
    const rubric = getRubricForExercise(q);
    const checkedSteps = state.rubrics[id] || [];
    const lid = lessonObj?.id || q.lessonId;
    const meta = (lid && exerciseMeta[lid]) || {};
    const altDe = q.altHintDe || meta.altHintDe || '';
    const altAr = q.altHintAr || meta.altHintAr || '';
    const edgeHtml = q.edgeCaseHtml || meta.edgeCaseHtml || '';
    const cause = state.causes[id] || '';
    const due = state.due[id] || '';
    const twin = getTwinExercise(id, lessonObj);

    const rubricRows = rubric.map((r, ri) => {
        const ptsLabel = typeof r[0] === 'number' ? r[0] + ' P.' : String(r[0]);
        const isChecked = checkedSteps.includes(ri);
        return `<label class="rubric-step"><input type="checkbox" data-rubric="${esc(id)}" data-step="${ri}" ${isChecked ? 'checked' : ''}><span class="rubric-pts">${esc(ptsLabel)}</span><span><b>Teilschritt ${ri + 1}:</b> ${r[1]}<br><span class="arabic small-text" lang="ar">${r[2] || ''}</span></span></label>`;
    }).join('');

    return `
        <div class="rubric-box">
            <h4>✅ Bewertungsschema & Teilpunkte-Checkliste · سلم تصحيح النقاط الجزئية</h4>
            ${rubricRows}
        </div>
        ${altDe ? `<div class="alt-solution-box"><p>${altDe}</p>${altAr ? `<p class="arabic" lang="ar">${altAr}</p>` : ''}</div>` : ''}
        ${edgeHtml ? `<div class="edge-box"><h4>🔬 Randfall-Test auf Beispieldaten · اختبار الحل على بيانات حدية</h4><div class="table-wrap">${edgeHtml}</div></div>` : ''}
        <div class="error-cause-bar">
            <p class="small-text"><b>Fehlerdiagnose (Codex #3):</b> Falls Punkte fehlten – <b>warum</b> ging hier etwas verloren? <span class="arabic" lang="ar">(حدد سبب خسارة النقاط ليتم جدولتها للمراجعة الذكية)</span></p>
            <div class="cause-buttons">
                ${Object.entries(ERROR_CAUSES).map(([key, c]) => `<button type="button" class="cause-btn ${cause === key ? 'active' : ''}" data-cause-id="${esc(id)}" data-cause="${key}">${c.icon} ${c.labelDe} · <span lang="ar">${c.labelAr}</span></button>`).join('')}
            </div>
            ${cause ? `<p class="small-text" style="margin-top:8px">💡 <b>Korrektur-Tipp:</b> ${ERROR_CAUSES[cause].tipDe} <span class="arabic" lang="ar">${ERROR_CAUSES[cause].tipAr}</span></p>` : ''}
            <div class="small-text muted" style="margin-top:8px;display:flex;gap:14px;flex-wrap:wrap;align-items:center">
                ${due ? `<span class="badge focus">📅 Wiedervorlage: ${esc(due)}</span>` : ''}
                ${lessonObj ? `<a href="#lesson/${lessonObj.id}">📖 Zugehörige Lektion: <b>${esc(lessonObj.title)}</b> →</a>` : ''}
                ${twin ? `<a href="#lesson/${twin.lesson.id}">🔁 Ähnliche Übung im selben Thema (${esc(twin.lesson.title)}) →</a>` : ''}
            </div>
        </div>`;
}

function exercise(q, id, index = '', lessonTitle = '') {
    const answer = state.answers[id] || '', rating = state.ratings[id], cause = state.causes[id];
    const lessonObj = q.lesson || lessons.find(l => id.startsWith(l.id + '-')) || null;
    const multi = Array.isArray(q.correct) && q.correct.length > 1;
    const mcBlock = Array.isArray(q.options) && q.options.length ? `<div class="mc-options" data-mc-group="${esc(id)}" data-mc-multi="${multi ? '1' : '0'}" data-mc-correct="${(q.correct || []).join(',')}"><p class="small-text muted" style="margin:0 0 6px">${multi ? `Mehrere Antworten möglich (${q.correct.length} richtige Optionen)` : 'Genau 1 richtige Option auswählen'}</p>${q.options.map((opt, oi) => `<button type="button" class="mc-opt" data-mc-opt="${oi}">${esc(opt)}</button>`).join('')}</div><div class="mc-actions"><button type="button" class="button secondary small" data-mc-check="${esc(id)}">Auswahl prüfen</button><span class="mc-feedback" id="mc-fb-${esc(id)}" aria-live="polite"></span></div>` : '';
    return `<article class="exercise" id="ex-${esc(id)}" data-q="${esc(id)}"><div>${badge(q.options ? 'MC-Übung' : 'Übung')} <span class="badge neutral">${q.points} Lernpunkte · Teilpunkte-Rubrik</span>${cause ? ` <span class="badge focus">${ERROR_CAUSES[cause].icon} ${ERROR_CAUSES[cause].labelDe}</span>` : ''}${lessonTitle ? ` <a class="badge neutral" href="#lesson/${lessonObj?.id || ''}">${esc(lessonTitle)}</a>` : ''}</div><h3 class="question">${index ? index + '. ' : ''}${esc(q.q)}</h3>${mcBlock}<label class="small-text muted" for="answer-${esc(id)}">Deine Antwort / Rechenweg · erst selbst versuchen (wird lokal gespeichert)</label><textarea id="answer-${esc(id)}" data-answer="${esc(id)}" placeholder="Antwort, Rechenweg, SQL oder Pseudocode …" spellcheck="false">${esc(answer)}</textarea><details><summary>Lösung, Teilpunkte-Schema & Fehlerdiagnose anzeigen</summary><div class="solution"><p>${formatSolutionDe(q.a, lessonObj)}</p><p class="arabic" lang="ar">${formatSolutionAr(q.ar, lessonObj)}</p>${renderRubricAndMetaHTML(q, id, lessonObj)}<div class="rating" aria-label="Eigene Lösung bewerten">${[['again', '↻ Noch einmal (+2 Tage)'], ['partial', '◑ Teilweise (+4 Tage)'], ['good', '✓ Sicher gelöst'], ['clear', 'Zurücksetzen']].map(([v, t]) => `<button data-rate="${esc(id)}" data-value="${v}" class="${rating === v ? 'selected' : ''}" aria-pressed="${rating === v}">${t}</button>`).join('')}</div></div></details></article>`;
}

function renderLessonExamCallouts(lessonId) {
    const refs = examIndex.filter(x => x.lessonId === lessonId && x.type === 'ref');
    const progs = examIndex.filter(x => x.lessonId === lessonId && x.type === 'prognose');
    if (!refs.length && !progs.length) return '';
    return `<section class="panel" id="exam-refs">
        <div class="callout-title">ALTPRÜFUNGS-REFERENZEN & PROGNOSEN (GETRENNT NACH CODEX #5)</div>
        <h2>Prüfungsrelevanz & dokumentierte Aufgaben</h2>
        ${refs.map(r => `<div class="ref-callout" style="margin-top:12px">
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:6px">
                <span class="badge neutral">📌 Belegte Altprüfung · ${esc(r.term)}</span>
                <span class="badge neutral">${esc(r.questionNo)}</span>
                ${r.simId ? `<a class="badge neutral" href="#sim/${esc(r.simId)}">⏱ In Simulation ${esc(r.simId.toUpperCase())} üben →</a>` : ''}
            </div>
            <h3>${esc(r.titleDe)}</h3>
            <p>${r.summaryDe}</p>
            <p class="arabic" lang="ar">${r.summaryAr}</p>
        </div>`).join('')}
        ${progs.map(p => `<div class="prognose-callout" style="margin-top:12px">
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:6px">
                <span class="prognose-badge">🔮 أتوقع ورود هذه المعلومة · Prüfungs-Prognose</span>
                <span class="badge neutral">${esc(p.questionNo)}</span>
                ${p.simId ? `<a class="badge neutral" href="#sim/${esc(p.simId)}">⏱ In Simulation ${esc(p.simId.toUpperCase())} üben →</a>` : ''}
            </div>
            <h3>${esc(p.titleDe)}</h3>
            <p>${p.summaryDe}</p>
            <p class="arabic" lang="ar">${p.summaryAr}</p>
        </div>`).join('')}
    </section>`;
}

function lesson(id) {
    const l = lessons.find(x => x.id === id); if (!l) return '<div class="empty">Lektion nicht gefunden. <a href="#topics">Alle Themen öffnen</a></div>';
    state.last = id; persist(); const ls = lessonState(id), idx = lessons.indexOf(l);
    const katItems = katalogMatrix.filter(k => k.lessons.includes(id));
    return `<div class="lesson-head"><div class="badges"><a class="badge neutral" href="#module/${l.module}">${moduleOf(l.module).title}</a>${badge(l.priority)}${katItems.map(k => `<a class="cov-badge ${k.level}" href="#katalog">${esc(k.code)} · ${k.level === 'pruefung' ? 'Prüfungsniveau' : k.level === 'geuebt' ? 'Geübt' : 'Erklärt'}</a>`).join('')}</div><h1>${esc(l.title)}</h1><p class="arabic" lang="ar">${esc(l.ar)}</p><p class="muted" style="margin-top:10px">${esc(l.summary)}</p><div class="lesson-tools"><label class="small-text" for="lesson-status">Mein Lernstand:</label><select id="lesson-status" data-id="${id}">${['new', 'learning', 'learned'].map(s => `<option value="${s}" ${ls.status === s ? 'selected' : ''}>${statusName(s)}</option>`).join('')}</select><a class="button secondary small" href="#exercises">Zu den Übungen ↓</a><button class="button secondary small" data-print>Drucken</button></div></div>
 <div class="reading-layout"><div class="lesson-content">
 ${l.sections.map((s, i) => `<section class="panel" id="section-${i}"><div class="callout-title">${String(i + 1).padStart(2, '0')} · VERSTEHEN</div><h2>${s.title}</h2><div lang="de">${s.de}</div>${diagramFor(l.id, i)}<div class="arabic" lang="ar">${s.ar}</div></section>`).join('')}
 ${renderLessonExamCallouts(l.id)}
 <section class="panel" id="terms"><h2>Fachbegriffe · المصطلحات</h2><table class="term-table"><thead><tr><th scope="col">DEUTSCH</th><th scope="col">العربية</th></tr></thead><tbody>${l.terms.map(([de, ar]) => `<tr><td><b>${esc(de)}</b></td><td lang="ar"><b>${esc(ar)}</b></td></tr>`).join('')}</tbody></table></section>
 <section id="exercises"><div class="section-heading"><h2>Jetzt selbst lösen.</h2><span class="muted small-text">Mit Teilpunkte-Schema, Randfall-Test & Fehlerursache</span></div>${l.questions.map((q, i) => exercise({ ...q, lesson: l }, l.id + '-' + i, i + 1)).join('')}</section>
 <section class="panel checklist" id="check"><h2>Kann ich das ohne Nachlesen?</h2>${l.check.map((c, i) => `<label><input type="checkbox" data-check="${id}" value="${i}" ${ls.checks.includes(i) ? 'checked' : ''}><span>${esc(c)}</span></label>`).join('')}<p class="small-text muted" style="margin-top:14px">Die Checkliste ersetzt keine Prüfung. Lernstand oben bewusst selbst wählen.</p></section>
 <section class="panel notes-panel" id="notes"><h2>Deine Notizen</h2><label for="lesson-notes" class="small-text muted">Offene Fragen, Eselsbrücken, eigene Beispiele · auch auf Arabisch möglich</label><textarea class="notes" id="lesson-notes" data-note="${id}" dir="auto">${esc(ls.notes)}</textarea><span class="saved-message" id="note-saved">Lokal im Browser gespeichert.</span></section>
 <p class="small-text muted">Grundlagen / Abgleich: ${l.sources.map(s => COURSE.sources.find(x => x[0] === s)).filter(Boolean).map(s => s[2] ? `<a href="${s[2]}" target="_blank" rel="noopener noreferrer">${esc(s[1])}</a>` : esc(s[1])).join(' · ')}. <a href="#sources">Recherche und Quellenhinweise</a></p>
 <div class="pager">${idx > 0 ? `<a class="button secondary" href="#lesson/${lessons[idx - 1].id}">← ${esc(lessons[idx - 1].title)}</a>` : '<span></span>'}${idx < lessons.length - 1 ? `<a class="button" href="#lesson/${lessons[idx + 1].id}">${esc(lessons[idx + 1].title)} →</a>` : '<a class="button" href="#simulator">Zu den Prüfungssimulationen →</a>'}</div>
 </div><aside class="lesson-toc"><strong>IN DIESER LEKTION</strong>${l.sections.map((s, i) => `<a href="#section-${i}" data-scroll="section-${i}">${esc(s.title)}</a>`).join('')}<a href="#exam-refs" data-scroll="exam-refs">Altprüfungen & Prognosen</a><a href="#terms" data-scroll="terms">Fachbegriffe</a><a href="#exercises" data-scroll="exercises">Übungen & Lösungen</a><a href="#check" data-scroll="check">Checkliste</a><a href="#notes" data-scroll="notes">Meine Notizen</a></aside></div>`;
}
// =========================================================================
// NEU: 9 PRÜFUNGSSIMULATIONEN (Codex #1, #3, #4)
// =========================================================================
function simulator() {
    const parts = [
        { key: 'Teil 1', title: 'Teil 1 · Planen eines Softwareproduktes (90 Min. · 100 P.)', ar: 'القسم الكتابي الأول (90 دقيقة · 100 نقطة): المتطلبات، الجدولة، UML، أنماط التصميم، الاختبارات، والأمن' },
        { key: 'Teil 2', title: 'Teil 2 · Entwicklung und Umsetzung von Algorithmen (90 Min. · 100 P.)', ar: 'القسم الكتابي الثاني (90 دقيقة · 100 نقطة): خوارزميات من الصفر (A)، تتبع وإصلاح أخطاء الكود (B)، ودمج SQL المتقدم (C)' },
        { key: 'WiSo', title: 'WiSo · Wirtschafts- und Sozialkunde (60 Min. · 100 P.)', ar: 'قسم WiSo (60 دقيقة · 100 نقطة): مزيج كامل من الاختيار المتعدد، الترتيب، المطابقة، الحساب، وقراءة الجداول' }
    ];
    return header('9 VOLLSTÄNDIGE PRÜFUNGSSIMULATIONEN · CODEX #1', 'Drei Modelle pro Prüfungsteil.', 'Modell A zur Diagnose (von Grund auf schreiben), Modell B nach der Wiederholung (Code-Tracing, Fehlersuche & Refactoring), Modell C als Generalprobe vor der Prüfung.', 'ثلاثة نماذج مختلفة لكل قسم كتابي: تشخيصي (A)، بعد المراجعة وتصحيح الأخطاء (B)، وقبل الامتحان النهائي (C).') +
        parts.map(p => {
            const list = simulations.filter(s => s.part === p.key);
            return `<div class="section-heading"><div><h2>${esc(p.title)}</h2><p class="arabic small-text" lang="ar">${p.ar}</p></div></div>
            <div class="grid">${list.map(s => {
                const res = state.simResults[s.id];
                const badgeClass = s.id.endsWith('-a') ? 'focus' : s.id.endsWith('-b') ? 'neutral' : 'focus';
                return `<article class="topic-card" style="display:flex;flex-direction:column;justify-content:space-between">
                    <div>
                        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
                            <span class="badge ${badgeClass}">${esc(s.stage)}</span>
                            <span class="badge neutral">⏱ ${s.durationMin} Min. · ${s.totalPoints} P.</span>
                            ${res ? `<span class="cov-badge ${res.score >= 67 ? 'pruefung' : res.score >= 50 ? 'geuebt' : 'erklaert'}">Letztes Ergebnis: ${res.score} / ${res.max} P. (${res.date})</span>` : ''}
                        </div>
                        <h3>${esc(s.title)}</h3>
                        <p class="arabic" lang="ar">${s.titleAr}</p>
                        <p>${esc(s.desc)}</p>
                        <p class="arabic small-text" lang="ar">${s.ar}</p>
                    </div>
                    <div style="margin-top:14px;display:flex;gap:10px;align-items:center;justify-content:space-between">
                        <span class="small-text muted">${s.tasks.length} Handlungs-/Prüfungsaufgaben</span>
                        <a class="button small" href="#sim/${esc(s.id)}">${res ? 'Erneut öffnen / Auswertung →' : 'Simulation starten →'}</a>
                    </div>
                </article>`;
            }).join('')}</div>`;
        }).join('');
}

function getInitialOrder(task) {
    if (Array.isArray(state.simOrders[task.id]) && state.simOrders[task.id].length === task.steps.length) {
        return state.simOrders[task.id];
    }
    // Deterministisch gemischte Startreihenfolge (nicht 0,1,2,3,4)
    const n = task.steps.length;
    const indices = Array.from({ length: n }, (_, i) => i);
    for (let i = 0; i < n - 1; i += 2) {
        const tmp = indices[i]; indices[i] = indices[i + 1]; indices[i + 1] = tmp;
    }
    if (n >= 3) { const first = indices.shift(); indices.push(first); }
    state.simOrders[task.id] = indices;
    return indices;
}

function computeTaskEarnedPoints(t) {
    const checked = state.rubrics[t.id] || [];
    if (Array.isArray(t.rubric) && t.rubric.length && checked.length) {
        return t.rubric.reduce((sum, r, idx) => sum + (checked.includes(idx) ? (Number(r[0]) || 0) : 0), 0);
    }
    if (t.type === 'mc' || t.type === 'table') {
        const sel = state.simMc[t.id] || [];
        const corr = t.correct || [];
        if (sel.length && sel.length === corr.length && corr.every(c => sel.includes(c))) return t.points;
    }
    if (t.type === 'order') {
        const ord = state.simOrders[t.id] || [];
        if (ord.length === t.steps.length && ord.every((v, i) => v === i)) return t.points;
    }
    if (t.type === 'match') {
        const m = state.simMatches[t.id] || {};
        const pairs = t.pairs || [];
        const rightCount = pairs.filter((_, idx) => Number(m[idx]) === idx).length;
        if (rightCount > 0) return Math.round((rightCount / pairs.length) * t.points);
    }
    if (t.type === 'calc') {
        const val = (state.answers[t.id] || '').trim().replace(/\s+/g, '');
        const acc = (t.acceptedAnswers || [t.expected]).map(x => String(x).trim().replace(/\s+/g, ''));
        if (val && acc.includes(val)) return t.points;
    }
    return 0;
}

function renderSimTaskWidget(t) {
    if (t.type === 'mc' || t.type === 'table') {
        const multi = Array.isArray(t.correct) && t.correct.length > 1;
        const sel = state.simMc[t.id] || [];
        return `<div class="mc-options" data-mc-group="${esc(t.id)}" data-mc-multi="${multi ? '1' : '0'}" data-mc-correct="${(t.correct || []).join(',')}">
            <p class="small-text muted" style="margin:0 0 6px">${multi ? `Wähle genau ${t.correct.length} richtige Aussagen:` : 'Wähle genau 1 richtige Aussage:'}</p>
            ${t.options.map((opt, oi) => `<button type="button" class="mc-opt ${sel.includes(oi) ? 'selected' : ''}" data-sim-mc="${esc(t.id)}" data-mc-opt="${oi}">${esc(opt)}</button>`).join('')}
        </div>
        <div class="mc-actions"><button type="button" class="button secondary small" data-mc-check="${esc(t.id)}">Auswahl prüfen</button><span class="mc-feedback" id="mc-fb-${esc(t.id)}" aria-live="polite"></span></div>`;
    }
    if (t.type === 'order') {
        const order = getInitialOrder(t);
        return `<div class="order-list" id="order-list-${esc(t.id)}">
            ${order.map((stepIdx, pos) => {
                const rawStep = t.steps[stepIdx].replace(/^\d+\.\s*/, '');
                return `<div class="order-item" data-step-idx="${stepIdx}">
                    <span class="order-pos">Schritt ${pos + 1}</span>
                    <span style="flex:1"><b>${esc(rawStep)}</b></span>
                    <div class="order-btns">
                        <button type="button" data-order-move="${esc(t.id)}" data-pos="${pos}" data-dir="-1" ${pos === 0 ? 'disabled' : ''} aria-label="Nach oben">↑</button>
                        <button type="button" data-order-move="${esc(t.id)}" data-pos="${pos}" data-dir="1" ${pos === order.length - 1 ? 'disabled' : ''} aria-label="Nach unten">↓</button>
                    </div>
                </div>`;
            }).join('')}
        </div>
        <div class="mc-actions"><button type="button" class="button secondary small" data-order-check="${esc(t.id)}">Reihenfolge prüfen</button><span class="mc-feedback" id="order-fb-${esc(t.id)}" aria-live="polite"></span></div>`;
    }
    if (t.type === 'match') {
        const saved = state.simMatches[t.id] || {};
        // Deterministisch versetzte Optionsliste für Dropdown
        const opts = t.pairs.map((p, idx) => ({ idx, text: p[1] })).sort((a, b) => a.text.localeCompare(b.text, 'de'));
        return `<div class="match-grid" id="match-grid-${esc(t.id)}">
            ${t.pairs.map((pair, li) => `<div class="match-row">
                <div class="match-left">${esc(pair[0])}</div>
                <select class="match-select" data-match-task="${esc(t.id)}" data-match-left="${li}" aria-label="Zuordnung für ${esc(pair[0])}">
                    <option value="">— Bitte passende Beschreibung wählen —</option>
                    ${opts.map(o => `<option value="${o.idx}" ${String(saved[li]) === String(o.idx) ? 'selected' : ''}>${esc(o.text)}</option>`).join('')}
                </select>
            </div>`).join('')}
        </div>
        <div class="mc-actions"><button type="button" class="button secondary small" data-match-check="${esc(t.id)}">Zuordnung prüfen</button><span class="mc-feedback" id="match-fb-${esc(t.id)}" aria-live="polite"></span></div>`;
    }
    if (t.type === 'calc') {
        const ans = state.answers[t.id] || '';
        return `<div class="calc-box">
            <label for="calc-${esc(t.id)}"><b>Rechenkästchen (Ergebnis):</b></label>
            <input type="text" id="calc-${esc(t.id)}" data-answer="${esc(t.id)}" value="${esc(ans)}" placeholder="z. B. ${esc(t.expected)}">
            <span class="badge neutral">${esc(t.unit || '')}</span>
            <button type="button" class="button secondary small" data-calc-check="${esc(t.id)}">Ergebnis prüfen</button>
            <span class="mc-feedback" id="calc-fb-${esc(t.id)}" aria-live="polite"></span>
        </div>
        <label class="small-text muted" for="answer-notes-${esc(t.id)}">Optionaler Nebenrechnungs-Notizblock:</label>
        <textarea id="answer-notes-${esc(t.id)}" data-answer="${esc(t.id)}-notes" placeholder="Dein Zwischenrechenweg …" style="min-height:75px">${esc(state.answers[t.id + '-notes'] || '')}</textarea>`;
    }
    // Standard: 'free' (Pseudocode, SQL, UML, Netzplan, Begründung)
    const answer = state.answers[t.id] || '';
    return `<label class="small-text muted" for="answer-${esc(t.id)}">Deine vollständige Prüfungsantwort (Pseudocode, SQL, Modell oder Berechnung):</label>
        <textarea id="answer-${esc(t.id)}" data-answer="${esc(t.id)}" placeholder="Schreibe hier deine Lösung wie in der echten Prüfung ohne Nachschlagen …" spellcheck="false" style="min-height:155px">${esc(answer)}</textarea>`;
}

function formatTimer(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function initSimTimer(sim) {
    if (simTimer.simId !== sim.id) {
        clearInterval(simTimer.intervalId);
        simTimer = { simId: sim.id, remainingSec: sim.durationMin * 60, running: false, intervalId: null };
    }
}

function simRunner(simId) {
    const sim = simulations.find(s => s.id === simId);
    if (!sim) return '<div class="empty">Simulation nicht gefunden. <a href="#simulator">Zur Übersicht →</a></div>';
    initSimTimer(sim);
    const totalEarned = sim.tasks.reduce((sum, t) => sum + computeTaskEarnedPoints(t), 0);
    const res = state.simResults[sim.id];

    return `<div class="lesson-head">
        <div class="badges"><a class="badge neutral" href="#simulator">← Alle 9 Simulationen</a><span class="badge focus">${esc(sim.part)}</span><span class="badge neutral">${esc(sim.stage)}</span></div>
        <h1>${esc(sim.title)}</h1>
        <p class="arabic" lang="ar">${sim.titleAr}</p>
        <p class="muted">${esc(sim.desc)}</p>
    </div>
    <div class="sim-timer-bar no-print">
        <div>
            <span class="small-text muted">PRÜFUNGSUHR (${sim.durationMin} MIN.)</span>
            <div class="sim-clock" id="sim-clock-display">${formatTimer(simTimer.remainingSec)}</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button type="button" class="button small" id="sim-timer-toggle">${simTimer.running ? '⏸ Pause' : '▶ Prüfungszeit starten'}</button>
            <button type="button" class="button secondary small" id="sim-timer-reset" data-min="${sim.durationMin}">↺ Reset (${sim.durationMin}:00)</button>
        </div>
        <div style="text-align:right">
            <span class="small-text muted">AKTUELLE TEILPUNKTE</span>
            <div><strong id="sim-live-score" style="font-size:1.3rem">${totalEarned}</strong> <span class="muted">/ ${sim.totalPoints} P.</span></div>
        </div>
    </div>
    ${res ? `<div class="panel" style="border-left:4px solid var(--accent)"><h3>📊 Gespeichertes Simulationsergebnis: ${res.score} / ${res.max} Punkte (${Math.round(res.score / res.max * 100)} %)</h3><p class="small-text muted">Zuletzt ausgewertet am ${esc(res.date)}. Alle Aufgaben mit Punktverlust oder markierter Fehlerursache findest du in deiner <a href="#review"><b>persönlichen Fehler-Checkliste (#review) →</b></a>.</p></div>` : ''}
    ${sim.tasks.map((t, idx) => {
        const lessonObj = lessons.find(l => l.id === t.lessonId) || null;
        const earned = computeTaskEarnedPoints(t);
        const cause = state.causes[t.id] || '';
        return `<article class="exercise" id="simtask-${esc(t.id)}">
            <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
                <div>
                    <span class="badge focus">Aufgabe ${idx + 1}</span>
                    <span class="badge neutral">${t.points} Punkte</span>
                    ${lessonObj ? `<a class="badge neutral" href="#lesson/${lessonObj.id}">Lektion: ${esc(lessonObj.title)}</a>` : ''}
                    ${cause ? `<span class="badge focus">${ERROR_CAUSES[cause].icon} ${ERROR_CAUSES[cause].labelDe}</span>` : ''}
                </div>
                <span class="badge neutral" id="task-pts-${esc(t.id)}">Erreicht: ${earned} / ${t.points} P.</span>
            </div>
            <h2 style="margin-top:10px">${esc(t.title)}</h2>
            <div lang="de">${t.taskDe}</div>
            ${t.taskAr ? `<div class="arabic" lang="ar">${t.taskAr}</div>` : ''}
            ${renderSimTaskWidget(t)}
            <details style="margin-top:14px">
                <summary>Musterlösung, Teilpunkte-Checkliste (${t.points} P.) & Fehlerursache öffnen</summary>
                <div class="solution">
                    <div lang="de">${t.solutionDe}</div>
                    ${t.solutionAr ? `<div class="arabic" lang="ar">${t.solutionAr}</div>` : ''}
                    ${renderRubricAndMetaHTML(t, t.id, lessonObj)}
                </div>
            </details>
        </article>`;
    }).join('')}
    <div class="panel no-print" style="text-align:center;padding:28px">
        <h2>Simulation abschließen & persönliche Checkliste erzeugen</h2>
        <p class="muted">Hake in den Lösungen oben deine erreichten Teilpunkte an und wähle bei Punktverlust die Fehlerursache. Klicke anschließend auf Auswerten:</p>
        <p class="arabic" lang="ar">بعد مقارنة إجابتك وتحديد النقاط الجزئية وسبب أي خطأ، اضغط الزر أدناه لحفظ النتيجة وتحويل الأخطاء إلى قائمة مراجعة شخصية.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:16px">
            <button type="button" class="button" data-finish-sim="${esc(sim.id)}">✅ Simulation jetzt auswerten & Checkliste speichern</button>
            <a class="button secondary" href="#review">📋 Persönliche Fehler-Checkliste öffnen →</a>
        </div>
    </div>`;
}

// =========================================================================
// NEU: PERSÖNLICHE FEHLERDIAGNOSE & WIEDERVORLAGE (Codex #3)
// =========================================================================
function reviewDashboard() {
    const causeCounts = { verstaendnis: 0, logik: 0, randfall: 0, zeit: 0 };
    for (const c of Object.values(state.causes)) if (causeCounts[c] !== undefined) causeCounts[c]++;

    const weakExercises = allQuestions.filter(q => ['again', 'partial'].includes(state.ratings[q.id]) || state.causes[q.id]);
    const weakSimTasks = allSimTasks.filter(t => ['again', 'partial'].includes(state.ratings[t.id]) || state.causes[t.id]);
    const totalWeak = weakExercises.length + weakSimTasks.length;

    return header('FEHLERDIAGNOSE & WIEDERVORLAGE · CODEX #3', 'Deine persönliche Fehler-Checkliste.', 'Jeder Punktverlust hat eine Ursache: Verständnis/Operator, Logik/Syntax, vergessener Randfall oder Zeitdruck. Hier siehst du deine Schwachstellen mit Wiedervorlage-Datum und Zwillingsaufgabe.', 'قائمة مراجعتك الشخصية: تصنف أخطاءك حسب سبب الخسارة (فهم المطلوب، منطق الحل، حالة حدية، أو ضيق الوقت) وتربط كل خطأ بدرس وتمرين مشابه.') +
        `<div class="stats">
            ${Object.entries(ERROR_CAUSES).map(([key, c]) => `<div class="stat"><strong>${c.icon} ${causeCounts[key]}</strong><span><b>${c.labelDe}</b><br><small class="arabic" lang="ar">${c.labelAr}</small></span></div>`).join('')}
        </div>
        <div class="toolbar">
            <select id="review-cause-filter" aria-label="Fehlerursache filtern">
                <option value="">Alle Fehlerursachen (${totalWeak})</option>
                ${Object.entries(ERROR_CAUSES).map(([k, c]) => `<option value="${k}">${c.icon} ${c.labelDe} (${c.labelAr})</option>`).join('')}
            </select>
            <select id="review-due-filter" aria-label="Fälligkeit filtern">
                <option value="">Alle Wiedervorlagen</option>
                <option value="due">🔥 Heute fällig oder überfällig</option>
            </select>
            <a class="button secondary small" href="#simulator">⏱ Neue Simulation starten</a>
        </div>
        <div id="review-items-container">${renderReviewItems('', '')}</div>
        <div class="section-heading" style="margin-top:34px"><h2>Lektionen mit Status „In Arbeit“</h2><a href="#topics">Alle Themen →</a></div>
        <div class="grid">${lessons.filter(l => statusOf(l.id) === 'learning').map(topicCard).join('') || '<div class="empty">Aktuell keine Lektion auf „In Arbeit“ gesetzt.</div>'}</div>`;
}

function renderReviewItems(causeFilter = '', dueFilter = '') {
    const today = todayISO();
    const items = [
        ...allSimTasks.filter(t => ['again', 'partial'].includes(state.ratings[t.id]) || state.causes[t.id]).map(t => ({
            id: t.id,
            isSim: true,
            title: `${t.sim.title} · ${t.title}`,
            points: t.points,
            lesson: t.lesson,
            cause: state.causes[t.id] || '',
            rating: state.ratings[t.id] || 'partial',
            due: state.due[t.id] || today,
            link: `#sim/${t.sim.id}`
        })),
        ...allQuestions.filter(q => ['again', 'partial'].includes(state.ratings[q.id]) || state.causes[q.id]).map(q => ({
            id: q.id,
            isSim: false,
            title: q.q,
            points: q.points,
            lesson: q.lesson,
            cause: state.causes[q.id] || '',
            rating: state.ratings[q.id] || 'partial',
            due: state.due[q.id] || today,
            link: `#lesson/${q.lesson.id}`
        }))
    ].filter(it => (!causeFilter || it.cause === causeFilter) && (dueFilter !== 'due' || it.due <= today));

    if (!items.length) {
        return `<div class="panel"><p><b>Keine offenen Fehlereinträge für diesen Filter.</b> Markiere in Übungen oder in einer der <a href="#simulator">9 Prüfungssimulationen</a> eine Aufgabe mit einer Fehlerursache (Verständnis, Logik, Randfall, Zeit) oder als „Noch einmal / Teilweise“, um sie hier automatisch einzuplanen.</p><p class="arabic" lang="ar">لا توجد أخطاء مسجلة حالياً تحت هذا الفلتر. عند حل أي تمرين أو محاكاة، اختر سبب الخطأ ليظهر هنا مع جدول مراجعة ذكي وتمرين مشابه.</p></div>`;
    }

    return items.map(it => {
        const cObj = ERROR_CAUSES[it.cause];
        const twin = getTwinExercise(it.id, it.lesson);
        const isDue = it.due <= today;
        return `<article class="panel" style="margin-bottom:14px;border-left:4px solid ${isDue ? 'var(--warn)' : 'var(--accent)'}">
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:space-between">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                    <span class="badge ${it.isSim ? 'focus' : 'neutral'}">${it.isSim ? '⏱ Simulations-Aufgabe' : '📝 Lektions-Übung'}</span>
                    ${cObj ? `<span class="badge focus">${cObj.icon} ${cObj.labelDe} · <span lang="ar">${cObj.labelAr}</span></span>` : '<span class="badge neutral">Ursache noch nicht gewählt</span>'}
                    <span class="cov-badge ${isDue ? 'erklaert' : 'geuebt'}">${isDue ? '🔥 Heute fällig' : '📅 Wiedervorlage'}: ${esc(it.due)}</span>
                </div>
                <button type="button" class="button secondary small" data-resolve-item="${esc(it.id)}">✓ Als behoben abhaken</button>
            </div>
            <h3 style="margin-top:10px">${esc(it.title)}</h3>
            ${cObj ? `<p class="small-text">💡 <b>Gegenmaßnahme:</b> ${cObj.tipDe}<br><span class="arabic" lang="ar">${cObj.tipAr}</span></p>` : ''}
            <div class="cause-buttons" style="margin-top:8px">
                ${Object.entries(ERROR_CAUSES).map(([k, c]) => `<button type="button" class="cause-btn ${it.cause === k ? 'active' : ''}" data-cause-id="${esc(it.id)}" data-cause="${k}">${c.icon} ${c.labelDe}</button>`).join('')}
            </div>
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:12px" class="small-text">
                <a class="button small" href="${it.link}">Aufgabe erneut lösen →</a>
                ${it.lesson ? `<a class="button secondary small" href="#lesson/${it.lesson.id}">📖 Lektion: ${esc(it.lesson.title)}</a>` : ''}
                ${twin ? `<a class="button secondary small" href="#lesson/${twin.lesson.id}">🔁 Ähnliche Übung trainieren (${esc(twin.lesson.title)})</a>` : ''}
            </div>
        </article>`;
    }).join('');
}

// =========================================================================
// NEU: PRÜFUNGSKATALOG-ABDECKUNGSMATRIX (Codex #2)
// =========================================================================
function katalogView() {
    const cPruef = katalogMatrix.filter(x => x.level === 'pruefung').length;
    const cGeuebt = katalogMatrix.filter(x => x.level === 'geuebt').length;
    const cErkl = katalogMatrix.filter(x => x.level === 'erklaert').length;
    return header('PRÜFUNGSKATALOG-ABDECKUNG · CODEX #2', 'Abgleich mit dem AkA-Katalog (ab Sommer 2025).', 'Jede Katalogposition ist mit Lektionen, Übungen, dem passenden Simulationsmodell und dokumentierten Altprüfungen verknüpft und ehrlich nach Trainingsstufe klassifiziert.', 'خريطة تغطية الكتالوج الرسمي (الطبعة الثانية منذ صيف 2025): تميّز بوضوح بين «مشروح فقط» و«عليه تدريب» و«عليه تدريب بمستوى الامتحان».') +
        `<div class="stats">
            <div class="stat"><strong>${katalogMatrix.length}</strong><span>Katalog-Kompetenzgruppen gesamt</span></div>
            <div class="stat"><strong>${cPruef}</strong><span><span class="cov-badge pruefung">Prüfungsniveau · تدريب بمستوى الامتحان</span></span></div>
            <div class="stat"><strong>${cGeuebt}</strong><span><span class="cov-badge geuebt">Geübt · عليه تدريب</span></span></div>
            <div class="stat"><strong>${cErkl}</strong><span><span class="cov-badge erklaert">Erklärt · مشروح فقط</span></span></div>
        </div>
        <div class="toolbar">
            <label class="search"><input type="search" id="kat-search" placeholder="Katalog durchsuchen: ISO 25010, LEFT JOIN, Netzplan, JAV …" aria-label="Katalog durchsuchen"></label>
            <select id="kat-part" aria-label="Prüfungsteil"><option value="">Alle Prüfungsteile</option><option value="Teil 1">Teil 1 · Planen eines Softwareproduktes</option><option value="Teil 2">Teil 2 · Algorithmen & SQL</option><option value="WiSo">WiSo · Wirtschafts- & Sozialkunde</option></select>
            <select id="kat-level" aria-label="Abdeckungsstufe"><option value="">Alle Trainingsstufen</option><option value="pruefung">Prüfungsniveau (عليه تدريب بمستوى الامتحان)</option><option value="geuebt">Geübt (عليه تدريب)</option><option value="erklaert">Erklärt (مشروح فقط)</option></select>
        </div>
        <div class="search-summary" id="kat-summary"></div>
        <div id="kat-results"></div>`;
}

function updateKatalog() {
    const box = $('#kat-results'); if (!box) return;
    const q = normalize($('#kat-search')?.value || '');
    const part = $('#kat-part')?.value || '';
    const level = $('#kat-level')?.value || '';
    const list = katalogMatrix.filter(item =>
        (!part || item.part === part) &&
        (!level || item.level === level) &&
        (!q || normalize(item.code + ' ' + item.titleDe + ' ' + strip(item.titleAr) + ' ' + strip(item.focusAr) + ' ' + (item.pastExams || []).join(' ')).includes(q))
    );
    const levelLabels = {
        pruefung: 'Prüfungsniveau · عليه تدريب بمستوى الامتحان',
        geuebt: 'Geübt · عليه تدريب',
        erklaert: 'Erklärt · مشروح فقط'
    };
    $('#kat-summary').textContent = `${list.length} von ${katalogMatrix.length} Katalogpositionen angezeigt`;
    box.innerHTML = list.map(item => {
        const linkedLessons = item.lessons.map(lid => lessons.find(l => l.id === lid)).filter(Boolean);
        const exCount = linkedLessons.reduce((s, l) => s + l.questions.length, 0);
        return `<article class="panel" style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                    <span class="badge focus">${esc(item.code)}</span>
                    <span class="badge neutral">${esc(item.part)}</span>
                    <span class="cov-badge ${item.level}">${levelLabels[item.level]}</span>
                </div>
                <span class="small-text muted">${exCount} Lektionsübungen + Simulation <b>${esc((item.simRef || '').toUpperCase())}</b></span>
            </div>
            <h3>${esc(item.titleDe)}</h3>
            <p class="arabic" lang="ar">${item.titleAr}</p>
            <p class="arabic small-text" lang="ar" style="margin-top:6px">💡 <b>تركيز الامتحان:</b> ${item.focusAr}</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;align-items:center">
                <span class="small-text muted">Lektionen:</span>
                ${linkedLessons.map(l => `<a class="badge neutral" href="#lesson/${l.id}">📖 ${esc(l.title)} (${statusName(statusOf(l.id))})</a>`).join('')}
                ${item.simRef ? `<a class="badge focus" href="#sim/${esc(item.simRef)}">⏱ Simulation ${esc(item.simRef.toUpperCase())} öffnen →</a>` : ''}
                ${(item.pastExams || []).map(pe => `<a class="badge neutral" href="#pruefungsindex">📌 ${esc(pe)}</a>`).join('')}
            </div>
        </article>`;
    }).join('') || '<div class="empty">Keine Katalogpositionen für diesen Filter gefunden.</div>';
}

// =========================================================================
// NEU: FILTERBARER PRÜFUNGSINDEX & PROGNOSEN (Codex #5)
// =========================================================================
function pruefungsIndexView() {
    const refsCount = examIndex.filter(x => x.type === 'ref').length;
    const progCount = examIndex.filter(x => x.type === 'prognose').length;
    const terms = [...new Set(examIndex.map(x => x.term))];
    return header('PRÜFUNGSINDEX & PROGNOSEN · CODEX #5', 'Belegte Altprüfungen vs. begründete Prognosen.', 'Filtere nach Prüfungszyklus, Prüfungsteil und Thema. Dokumentierte Altprüfungs-Referenzen sind optisch strikt von begründeten Prognosen („أتوقع ورود هذه المعلومة“) getrennt.', 'فهرس قابل للتصفية يفصل بصرياً بين الإحالات الامتحانية الموثقة (مع الدورة ورقم السؤال) وبين التوقعات القادمة («أتوقع ورود هذه المعلومة» مع سبب الترجيح).') +
        `<div class="stats">
            <div class="stat"><strong>📌 ${refsCount}</strong><span>Belegte Altprüfungs-Referenzen (2021–2026)</span></div>
            <div class="stat"><strong>🔮 ${progCount}</strong><span>Begründete Prüfungs-Prognosen („أتوقع ورود هذه المعلومة“)</span></div>
        </div>
        <div class="toolbar">
            <label class="search"><input type="search" id="idx-search" placeholder="Suchen: Winter 2025/26, LEFT JOIN, Gruppenwechsel, ISO 25010 …" aria-label="Prüfungsindex durchsuchen"></label>
            <select id="idx-type" aria-label="Eintragstyp">
                <option value="">Alle Einträge (Referenzen + Prognosen)</option>
                <option value="ref">📌 Nur belegte Altprüfungs-Referenzen (إحالات موثقة)</option>
                <option value="prognose">🔮 Nur Prüfungs-Prognosen (أتوقع ورود هذه المعلومة)</option>
            </select>
            <select id="idx-term" aria-label="Prüfungszyklus">
                <option value="">Alle Prüfungszyklen</option>
                ${terms.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('')}
            </select>
            <select id="idx-part" aria-label="Prüfungsteil">
                <option value="">Alle Teile</option>
                <option value="Teil 1">Teil 1</option>
                <option value="Teil 2">Teil 2</option>
                <option value="WiSo">WiSo</option>
            </select>
        </div>
        <div class="search-summary" id="idx-summary"></div>
        <div id="idx-results"></div>`;
}

function updatePruefungsIndex() {
    const box = $('#idx-results'); if (!box) return;
    const q = normalize($('#idx-search')?.value || '');
    const type = $('#idx-type')?.value || '';
    const term = $('#idx-term')?.value || '';
    const part = $('#idx-part')?.value || '';
    const list = examIndex.filter(x =>
        (!type || x.type === type) &&
        (!term || x.term === term) &&
        (!part || x.part === part) &&
        (!q || normalize(x.term + ' ' + x.part + ' ' + x.questionNo + ' ' + x.titleDe + ' ' + strip(x.titleAr) + ' ' + strip(x.summaryDe) + ' ' + strip(x.summaryAr)).includes(q))
    );
    $('#idx-summary').textContent = `${list.length} von ${examIndex.length} Einträgen angezeigt`;
    box.innerHTML = list.map(item => {
        const isProg = item.type === 'prognose';
        const lObj = lessons.find(l => l.id === item.lessonId);
        return `<article class="${isProg ? 'prognose-card' : 'ref-card'}" style="margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                    ${isProg
                        ? `<span class="prognose-badge">🔮 أتوقع ورود هذه المعلومة · Prognose</span>`
                        : `<span class="badge neutral">📌 Belegte Altprüfungs-Referenz · ${esc(item.term)}</span>`}
                    <span class="badge focus">${esc(item.part)}</span>
                    <span class="badge neutral">${esc(item.questionNo)}</span>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                    ${lObj ? `<a class="badge neutral" href="#lesson/${lObj.id}">📖 Lektion: ${esc(lObj.title)} →</a>` : ''}
                    ${item.simId ? `<a class="badge focus" href="#sim/${esc(item.simId)}">⏱ Simulation ${esc(item.simId.toUpperCase())} →</a>` : ''}
                </div>
            </div>
            <h3>${esc(item.titleDe)}</h3>
            <p class="arabic" lang="ar">${item.titleAr}</p>
            <p style="margin-top:8px">${item.summaryDe}</p>
            <p class="arabic" lang="ar" style="margin-top:8px">${item.summaryAr}</p>
        </article>`;
    }).join('') || '<div class="empty">Keine Einträge für diesen Filter gefunden.</div>';
}
function practice() {
    return header('AKTIV ABRUFEN STATT NUR LESEN', 'Dein Wissen im Einsatz.', 'Eigene Antworten schreiben, Lösung aufdecken, ehrlich bewerten. Für echte Prüfungsbedingungen mit 90/90/60 Minuten Uhr nutze die 9 Prüfungssimulationen.', 'الهدف اختبار قدرتك على الحل، لا حفظ نص الحل النموذجي كاملًا.') +
        `<div class="panel no-print"><h3>Eine Trainingsrunde zusammenstellen</h3><div class="toolbar"><select id="train-module" aria-label="Trainingsbereich"><option value="">Alle Bereiche gemischt</option>${modules.map(m => `<option value="${m.id}">${m.title}</option>`).join('')}</select><select id="train-count" aria-label="Anzahl Aufgaben"><option value="10">10 Aufgaben</option><option value="20">20 Aufgaben</option><option value="5">5 Aufgaben</option></select><button class="button" id="start-training">Runde starten →</button><button class="button secondary" id="train-weak">Nur Wiederholungsbedarf</button><a class="button secondary" href="#simulator">⏱ Zu den 9 Prüfungssimulationen →</a></div><p class="small-text muted">Eine Runde mischt Kurz- und Transferaufgaben. In den 9 Prüfungssimulationen findest du je 3 komplette Klausuren für Teil 1, Teil 2 und WiSo.</p></div><div class="mode-tabs"><button class="active" data-practice-tab="cases">Große Transferfälle</button><button data-practice-tab="all">Alle Einzelübungen (${allQuestions.length})</button></div><div id="practice-list">${casesHTML()}</div>`;
}
function shuffle(array) { const a = [...array]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }
function startTraining(weak = false) { const mod = $('#train-module').value; let pool = allQuestions.filter(q => (!mod || q.lesson.module === mod) && (!weak || ['again', 'partial'].includes(state.ratings[q.id]) || state.causes[q.id])); if (!pool.length) { toast('Keine passenden Aufgaben. Erst Aufgaben bearbeiten und bewerten.'); return; } session = { items: shuffle(pool).slice(0, Number($('#train-count').value)), index: 0, finished: false }; location.hash = 'training'; if (location.hash === '#training') render(); }
function training() {
    if (!session) return '<div class="empty">Keine aktive Runde. <a href="#practice">Training zusammenstellen →</a></div>';
    if (session.finished) { const ratings = session.items.map(q => state.ratings[q.id]), good = ratings.filter(x => x === 'good').length, part = ratings.filter(x => x === 'partial').length; return header('RUNDE ABGESCHLOSSEN', 'Gute Grundlage für die nächste Wiederholung.', 'Die Auswertung beruht auf deiner eigenen Einschätzung.') + `<div class="stats"><div class="stat"><strong>${good}</strong><span>Sicher gelöst</span></div><div class="stat"><strong>${part}</strong><span>Teilweise</span></div><div class="stat"><strong>${ratings.filter(x => x === 'again').length}</strong><span>Noch einmal</span></div><div class="stat"><strong>${ratings.filter(x => !x).length}</strong><span>Nicht bewertet</span></div></div><a class="button" href="#review">Fehlerdiagnose öffnen →</a> <a class="button secondary" href="#practice">Neue Runde</a>`; }
    const q = session.items[session.index]; return `<div class="training-head"><div><div class="eyebrow">TRAININGSRUNDE</div><strong>Aufgabe ${session.index + 1} von ${session.items.length}</strong></div><a class="button secondary small" href="#practice">Zur Übersicht</a></div><div class="training-progress"><i style="width:${(session.index + 1) / session.items.length * 100}%"></i></div>${exercise(q, q.id, session.index + 1, q.lesson.title)}<div class="pager"><button class="button secondary" id="previous-question" ${session.index === 0 ? 'disabled' : ''}>← Vorherige</button><button class="button" id="next-question">${session.index === session.items.length - 1 ? 'Runde abschließen' : 'Nächste Aufgabe →'}</button></div>`;
}
function glossary() { return header('DE / AR · DEIN NACHSCHLAGEWERK', 'Fachbegriffe verstehen.', 'Begriffe mit ihrem Lernkontext verbinden; arabische Erläuterungen stehen in den Lektionen.') + `<div class="toolbar"><label class="search"><input type="search" id="glossary-search" aria-label="Fachbegriff suchen" placeholder="Begriff suchen: Puffer, Autorisierung, مسؤولية …"></label></div><div class="glossary-grid" id="glossary-results"></div>`; }
function updateGlossary() { const q = normalize($('#glossary-search').value); const seen = new Set(); $('#glossary-results').innerHTML = lessons.flatMap(l => l.terms.map(([de, ar]) => ({ de, ar, l }))).filter(t => { if (seen.has(t.de)) return false; seen.add(t.de); return normalize(t.de + ' ' + t.ar).includes(q); }).sort((a, b) => a.de.localeCompare(b.de, 'de')).map(t => `<article class="glossary-item"><strong>${esc(t.de)}</strong><p class="arabic" lang="ar"><b>${esc(t.ar)}</b></p><a href="#lesson/${t.l.id}">Im Zusammenhang: ${esc(t.l.title)} →</a></article>`).join('') || '<div class="empty">Kein Begriff gefunden.</div>'; }
function formulas() {
    const rows = [
        ['Anteil / Veränderung', 'Anteil = Teil / Ganzes × 100 %; Änderung = (neu−alt) / alt × 100 %', 'Prozentpunkte sind die Differenz zweier Prozentwerte.'],
        ['Wirtschaftlichkeit', 'Ertrag / Aufwand', 'Gewinn dagegen = Ertrag−Aufwand.'], ['Produktivität', 'Outputmenge / Inputmenge', 'Einheit angeben, z. B. Vorgänge pro Stunde.'], ['Rentabilität', 'Gewinn / vorgegebenes Kapital × 100 %', 'Welche Kapitalbasis ist gemeint?'],
        ['Gesamtkosten', 'K(x) = Kf + kv × x', 'Fixkosten und variable Stückkosten trennen.'], ['Break-even', 'x = Kf / (Preis−kv)', 'Bei unteilbaren Einheiten für Kostendeckung aufrunden.'], ['Amortisation', 'Investition / jährlicher Netto-Rückfluss', 'Zusätzliche Jahreskosten vorher vom Nutzen abziehen.'], ['Nutzwert', 'Σ Gewicht × Bewertung', 'Gleiche Skala; Gewichte zusammen 100 %.'],
        ['Vorwärtsrechnung Netzplan', 'FAZ = max FEZ(Vorgänger); FEZ = FAZ + Dauer', 'Gesamtpuffer = SAZ−FAZ.'], ['Rückwärtsrechnung Netzplan', 'SEZ = min SAZ(Nachfolger); SAZ = SEZ−Dauer', 'Freier Puffer = min FAZ(Nachfolger)−FEZ.'],
        ['Übertragungszeit', 'Datenmenge [Byte] × 8 / Datenrate [Bit/s]', 'MB dezimal, MiB binär; Overhead beachten.'], ['IPv4-Hosts', '2^(32−Präfix)−2', 'Gängige Subnetze; /31 und /32 sind Sonderfälle.'], ['Verfügbarkeit', 'MTBF / (MTBF + MTTR)', 'Ausfallzeit = Gesamtzeit × (1−A).'], ['Parallelredundanz', '1−(1−A1)×(1−A2)', 'Nur unter passenden Unabhängigkeits-/Umschaltannahmen.'],
        ['RAID-Kapazität', 'RAID 5: (n−1)×s; RAID 6: (n−2)×s; RAID 10: n/2×s', 's = kleinste relevante Plattenkapazität; kein Backup.'],
        ['Bild-/Videospeicher', 'Breite × Höhe × (Farbtiefe_Bit / 8) × Anzahl', 'Durch 1024² für MiB, durch 1024³ für GiB (IEC binär).'],
        ['Sozialbeitrag', 'min(relevantes Brutto, BBG) × Arbeitnehmeranteil', 'Ein schon angegebener Arbeitnehmeranteil wird nicht halbiert.'],
        ['Netto aus Brutto', 'Brutto / (1+Steuersatz)', 'Bei 19 %: /1,19; nicht 19 % vom Brutto abziehen.'],
        ['Bezugskalkulation', 'Liste − Rabatt = Ziel; Ziel − Skonto = Bar; Bar + Bezugskosten = Bezugspreis', 'Skonto wird vom Zieleinkaufspreis berechnet, nicht vom Listenpreis!'],
        ['GmbH-Gewinnanteil', 'Ausschüttung × (eigener Geschäftsanteil / Stammkapital)', 'Standard nach § 29 GmbHG: nach Kapitalanteilen, nicht nach Köpfen.'],
        ['Kündigungsfrist § 622', 'AN: 28 Tage zum 15. oder Monatsende; AG ab 2 J.: 1–7 Monate zum Monatsende', 'Dienstjahres-Staffel (Abs. 2) gilt gesetzlich nur für AG-Kündigung!'],
        ['Testabdeckung', 'erreichte Einheiten / gesamte Einheiten × 100 %', 'Anweisung, Zweig und Bedingung sind unterschiedliche Einheiten.']
    ];
    return header('KURZREFERENZ', 'Formeln & Lösungsmuster.', 'Erst den passenden Ansatz wählen, dann mit Einheit rechnen und das Ergebnis auf Plausibilität prüfen.') + `<div class="panel table-wrap"><table class="term-table"><thead><tr><th>Thema</th><th>Formel</th><th>Achtung</th></tr></thead><tbody>${rows.map(r => `<tr><td><b>${esc(r[0])}</b></td><td><code>${esc(r[1])}</code></td><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div>
 <div class="panel"><h2>SQL-Grundgerüst</h2>${C("SELECT gruppenschluessel, SUM(wert) AS summe\nFROM Tabelle t\nJOIN Andere a ON a.id = t.fremd_id\nWHERE einzelne_zeilen_bedingung\nGROUP BY gruppenschluessel\nHAVING SUM(wert) > grenze\nORDER BY summe DESC;")}<p class="arabic" lang="ar"><b>اربط الجداول</b>، ثم <b>صفِّ الصفوف (WHERE)</b>، ثم <b>اجمعها (GROUP BY)</b>، ثم <b>صفِّ المجموعات (HAVING)</b>. لا تكتب كل بند إذا لم تحتج إليه في السؤال.</p></div>
 <div class="panel"><h2>Pseudocode-Grundgerüst</h2>${C('funktion verarbeite(eingaben):\n  wenn eingaben ungültig: definierten Fehler liefern\n  ergebnis = passende Initialisierung\n  für element in eingaben:\n    wenn element die Bedingung erfüllt:\n      ergebnis aktualisieren\n  rückgabe ergebnis')}<p><b>Prüfen:</b> leere Eingabe · <code>null</code> · genau am Grenzwert · nur negative Werte · Einheiten · Schleifenende · Rückgabetyp.</p></div>
 <div class="panel"><h2>Operatoren in Aufgaben</h2><table class="term-table"><tbody><tr><td><b>Nennen</b></td><td>Passende Fachbegriffe/Stichpunkte.</td></tr><tr><td><b>Beschreiben</b></td><td>Merkmale oder Ablauf verständlich darstellen.</td></tr><tr><td><b>Erklären / erläutern</b></td><td>Zusammenhang, Ursache oder Wirkung zeigen.</td></tr><tr><td><b>Begründen / beurteilen</b></td><td>Entscheidung + konkrete Kriterien + Fallbezug.</td></tr><tr><td><b>Berechnen</b></td><td>Ansatz, Einsetzen, Ergebnis, Einheit; geforderte Rundung.</td></tr><tr><td><b>Entwerfen / implementieren</b></td><td>Zusammenhängende funktionsfähige Logik/Modell statt Stichwortliste.</td></tr></tbody></table></div>`;
}
function sources() {
    return header('TRANSPARENT LERNEN', 'Quellen & Themenabdeckung.', 'Was geprüft wurde, worauf die Inhalte aufbauen und wie du sie sinnvoll ergänzen kannst.') +
        `<div class="panel"><h2>Für deine schriftliche FIAE-AP2</h2><p>Der Lernumfang wurde mit <b>FIAusbV</b>, <b>AkA-Informationen zur Katalogrevision ab Sommer 2025</b>, der verlinkten Themenübersicht und der lokalen strukturierten Katalogcheckliste abgeglichen (<a href="#katalog"><b>Zur interaktiven Prüfungskatalog-Abdeckung →</b></a>). Die Unterteilung „Kern/Wichtig/Basis“ ist eine Lernempfehlung.</p><p class="arabic" lang="ar">الموقع يغطي خريطة شاملة للموضوعات التي تم التحقق منها مع <b>خريطة تغطية الكتالوج</b> و<b>فهرس الامتحانات السابقة والتوقعات</b>.</p><p>Die AkA nennt für <b>PS/EUA jeweils 90 Minuten</b>, für <b>WiSo 60 Minuten</b>. WiSo kombiniert Multiple-Choice, Reihenfolge, Zuordnung, Rechenkästchen und Tabellenauswertung (<a href="#simulator"><b>Zu den 9 Prüfungssimulationen →</b></a>).</p></div>
 <div class="panel"><h2>Abgleich mit deinen Unterlagen</h2><ul><li><b>WiSo_AP2_Annotated_Study_Guide_AR_RTL.pdf:</b> alle 103 Seiten für Themenabdeckung ausgewertet; arabische Erklärungen neu formuliert.</li><li><b>FIAE Winter 2025/26, Sommer 2025 und Winter 2024/25:</b> Aufgaben und Lösungen zur Kalibrierung des Schwierigkeitsgrads analysiert (<a href="#pruefungsindex"><b>Zum Prüfungsindex →</b></a>).</li><li><b>Beispiele aus der Analyse:</b> Use Case, Sequenz-/Zustandsdiagramm, SQL, Normalisierung, Unit-/Zweigtests, XML, Verschlüsselung sowie Ethernet/MAC und kleine Netzwerkalgorithmen.</li></ul><p class="arabic" lang="ar">الشرح أطول من جواب الامتحان المقترح لأنه يبيّن السبب. لا تحفظ فقرة كاملة إذا كان السؤال يطلب نقطتين؛ اكتب النقاط الصحيحة المطلوبة مع حساب أو كود كامل عند طلبه.</p></div>
 <div class="panel"><h2>Abdeckung nach Lernbereich</h2><div class="table-wrap"><table class="term-table"><thead><tr><th>Bereich</th><th>Enthaltene Lernziele</th><th>Nachweis im Studio</th></tr></thead><tbody>${modules.map(m => `<tr><td><b>${esc(m.title)}</b></td><td>${lessons.filter(l => l.module === m.id).map(l => `<a href="#lesson/${l.id}">${esc(l.title)}</a>`).join(' · ')}</td><td>${lessons.filter(l => l.module === m.id).reduce((n, l) => n + l.questions.length, 0)} Übungen + Checklisten</td></tr>`).join('')}</tbody></table></div></div>
 <div class="panel source-list"><h2>Quellenverzeichnis</h2><ol>${COURSE.sources.map(s => `<li>${s[2] ? `<a href="${s[2]}" target="_blank" rel="noopener noreferrer">${s[1]}</a>` : `<b>${s[1]}</b>`}<p class="small-text muted">${s[3]}</p></li>`).join('')}</ol><h3>WiSo: direkte Rechts- und Fachquellen</h3><ul>${legalLinks.map(([name, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></li>`).join('')}</ul></div>
 <div class="notice"><b>Aktualität und historische Aufgaben</b><p>Rechtsstand der Recherche: 05.11.2026. Beitragssätze, Grenzen und Gesetze können sich ändern. Rechenübungen verwenden ausdrücklich vorgegebene Beispielwerte; bei Altprüfungen gilt die dort angegebene Datenlage.</p></div>
 <div class="panel"><h2>Offline & Datensicherung</h2><p>Alle Inhalte liegen in den lokalen Dateien; externe Links brauchen Internet. Notizen, Fehlerdiagnosen, Simulationsergebnisse und Lernstand werden in diesem Browser gespeichert. Exportiere regelmäßig eine JSON-Sicherung und importiere sie bei Bedarf.</p><p>Version ${COURSE.version} (Codex-Upgrade). Einfacher Aufbau: index.html, style.css, app.js und getrennte Inhaltsdateien; keine Bibliothek und kein Build-Schritt.</p></div>`;
}
const legalLinks = [['BBiG §11: Vertragsabfassung', 'https://www.gesetze-im-internet.de/bbig_2005/__11.html'], ['BBiG §15: Freistellung und Anrechnung', 'https://www.gesetze-im-internet.de/bbig_2005/__15.html'], ['BBiG §20: Ausbildungsprobezeit', 'https://www.gesetze-im-internet.de/bbig_2005/__20.html'], ['BBiG §22: Ausbildungskündigung', 'https://www.gesetze-im-internet.de/bbig_2005/__22.html'], ['BGB §622: Kündigungsfristen', 'https://www.gesetze-im-internet.de/bgb/__622.html'], ['BGB §623: Kündigungsform', 'https://www.gesetze-im-internet.de/bgb/__623.html'], ['KSchG §1: Gründe und Sozialauswahl', 'https://www.gesetze-im-internet.de/kschg/__1.html'], ['KSchG §23: Geltungsbereich', 'https://www.gesetze-im-internet.de/kschg/__23.html'], ['TzBfG §14: Befristung', 'https://www.gesetze-im-internet.de/tzbfg/__14.html'], ['ArbZG §§3–5: Arbeitszeit, Pausen, Ruhezeit', 'https://www.gesetze-im-internet.de/arbzg/'], ['JArbSchG: Jugend-Arbeitszeit und Urlaub', 'https://www.gesetze-im-internet.de/jarbschg/'], ['BUrlG: Mindesturlaub', 'https://www.gesetze-im-internet.de/burlg/'], ['BetrVG §8: Wählbarkeit Betriebsrat', 'https://www.gesetze-im-internet.de/betrvg/__8.html'], ['BetrVG §60: Errichtung JAV', 'https://www.gesetze-im-internet.de/betrvg/__60.html'], ['BetrVG §61: JAV-Wahl', 'https://www.gesetze-im-internet.de/betrvg/__61.html'], ['GmbHG §5: Stammkapital', 'https://www.gesetze-im-internet.de/gmbhg/__5.html'], ['HGB §49: Prokura', 'https://www.gesetze-im-internet.de/hgb/__49.html'], ['SGB VII §22: Sicherheitsbeauftragte', 'https://www.gesetze-im-internet.de/sgb_7/__22.html'], ['ASiG §11: Arbeitsschutzausschuss', 'https://www.gesetze-im-internet.de/asig/__11.html'], ['Arbeitsagentur: Arbeitslosengeld I', 'https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld/finanzielle-hilfen/arbeitslosengeld-anspruch-hoehe-dauer'], ['BMG: Krankenversicherungsbeiträge', 'https://www.bundesgesundheitsministerium.de/beitraege/seite'], ['BMAS: Rechengrößen 2026', 'https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/sozialversicherungs-rechengroessenverordnung-2026.html']];

function route() { const raw = location.hash.slice(1) || 'home'; return raw.split('/'); }
function render() {
    const [view, id] = route();
    if (view.startsWith('section-') || ['terms', 'exercises', 'check', 'notes', 'exam-refs'].includes(view)) return;
    const views = {
        home: home,
        topics: () => topics(),
        module: () => topics(id),
        review: reviewDashboard,
        lesson: () => lesson(id),
        simulator: simulator,
        sim: () => simRunner(id),
        katalog: katalogView,
        pruefungsindex: pruefungsIndexView,
        practice,
        training,
        glossary,
        formulas,
        sources
    };
    $('#main').innerHTML = (views[view] || home)();
    const labels = {
        home: 'Übersicht',
        topics: 'Alle Themen',
        module: moduleOf(id)?.title,
        review: 'Fehlerdiagnose & Checkliste',
        lesson: lessons.find(l => l.id === id)?.title,
        simulator: '9 Prüfungssimulationen',
        sim: simulations.find(s => s.id === id)?.title || 'Simulation',
        katalog: 'Prüfungskatalog-Abdeckung',
        pruefungsindex: 'Prüfungsindex & Prognosen',
        practice: 'Prüfungstraining',
        training: 'Trainingsrunde',
        glossary: 'Fachbegriffe',
        formulas: 'Formeln & Muster',
        sources: 'Quellen & Abdeckung'
    };
    $('#crumb').textContent = labels[view] || 'Übersicht';
    document.title = (labels[view] || 'Übersicht') + ' · FIAE Lernstudio';
    document.querySelectorAll('.sidebar nav a').forEach(a => {
        const href = a.getAttribute('href');
        const active = href === '#' + view + (id ? '/' + id : '') ||
            (view === 'sim' && href === '#simulator') ||
            (view === 'lesson' && href === '#module/' + lessons.find(l => l.id === id)?.module);
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    $('#sidebar').classList.remove('open');
    $('#menu').setAttribute('aria-expanded', 'false');
    if ($('#topic-results')) updateTopics();
    if ($('#glossary-results')) updateGlossary();
    if ($('#kat-results')) updateKatalog();
    if ($('#idx-results')) updatePruefungsIndex();
    window.scrollTo(0, 0);
}

function updateLiveSimScore() {
    const [view, simId] = route();
    if (view !== 'sim') return;
    const sim = simulations.find(s => s.id === simId);
    if (!sim) return;
    let total = 0;
    for (const t of sim.tasks) {
        const earned = computeTaskEarnedPoints(t);
        total += earned;
        const badgeEl = $('#task-pts-' + t.id);
        if (badgeEl) badgeEl.textContent = `Erreicht: ${earned} / ${t.points} P.`;
    }
    const liveEl = $('#sim-live-score');
    if (liveEl) liveEl.textContent = String(total);
}

function applyPreferences() { document.documentElement.dataset.theme = state.theme; document.body.classList.toggle('no-ar', !state.arabic); $('#language').setAttribute('aria-pressed', String(state.arabic)); $('#language').innerHTML = state.arabic ? 'DE <span>+ عربي</span>' : 'DE <span>nur Deutsch</span>'; $('#theme').setAttribute('aria-label', state.theme === 'dark' ? 'Hellen Modus aktivieren' : 'Dunklen Modus aktivieren'); updateReviewBadge(); }
$('#topic-count').textContent = lessons.length;
$('#module-nav').innerHTML = modules.map(m => `<a href="#module/${m.id}"><span>${m.icon}</span>${m.title}</a>`).join('');
$('#theme').addEventListener('click', () => { state.theme = state.theme === 'light' ? 'dark' : 'light'; applyPreferences(); persist(); });
$('#language').addEventListener('click', () => { state.arabic = !state.arabic; applyPreferences(); persist(); });
$('#menu').addEventListener('click', () => { const open = $('#sidebar').classList.toggle('open'); $('#menu').setAttribute('aria-expanded', String(open)); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { $('#sidebar').classList.remove('open'); $('#menu').setAttribute('aria-expanded', 'false'); } });

document.addEventListener('click', e => {
    const scroll = e.target.closest('[data-scroll],a[href="#exercises"]');
    if (scroll) { e.preventDefault(); $('#' + (scroll.dataset.scroll || 'exercises'))?.scrollIntoView({ behavior: 'smooth' }); return; }
    if (e.target.closest('[data-print]')) { window.print(); return; }

    // Selbstbewertung + automatische Wiedervorlage
    const rate = e.target.closest('[data-rate]');
    if (rate) {
        const qid = rate.dataset.rate, val = rate.dataset.value;
        if (val === 'clear') {
            delete state.ratings[qid];
            delete state.due[qid];
        } else {
            state.ratings[qid] = val;
            if (val === 'again') state.due[qid] = addDaysISO(2);
            else if (val === 'partial') state.due[qid] = addDaysISO(4);
            else delete state.due[qid];
        }
        persist();
        rate.parentElement.querySelectorAll('button').forEach(b => {
            const selected = b === rate && val !== 'clear';
            b.classList.toggle('selected', selected);
            b.setAttribute('aria-pressed', String(selected));
        });
        toast(val === 'clear' ? 'Bewertung zurückgesetzt.' : val === 'good' ? 'Als sicher gelöst gespeichert.' : `In Fehler-Checkliste geplant (Wiedervorlage: ${state.due[qid]}).`);
        return;
    }

    // Fehlerursache speichern (Codex #3)
    const causeBtn = e.target.closest('[data-cause-id]');
    if (causeBtn) {
        const id = causeBtn.dataset.causeId, cKey = causeBtn.dataset.cause;
        if (state.causes[id] === cKey) {
            delete state.causes[id];
        } else {
            state.causes[id] = cKey;
            if (!state.ratings[id] || state.ratings[id] === 'good') state.ratings[id] = 'partial';
            if (!state.due[id]) state.due[id] = addDaysISO(3);
        }
        persist();
        causeBtn.parentElement.querySelectorAll('.cause-btn').forEach(b => b.classList.toggle('active', b.dataset.cause === state.causes[id]));
        toast(state.causes[id] ? `Fehlerursache „${ERROR_CAUSES[cKey].labelDe}“ gespeichert & für Wiedervorlage geplant.` : 'Fehlerursache entfernt.');
        if ($('#review-items-container')) $('#review-items-container').innerHTML = renderReviewItems($('#review-cause-filter')?.value || '', $('#review-due-filter')?.value || '');
        return;
    }

    // Fehlereintrag in #review als behoben abhaken
    const resolveBtn = e.target.closest('[data-resolve-item]');
    if (resolveBtn) {
        const id = resolveBtn.dataset.resolveItem;
        state.ratings[id] = 'good';
        delete state.causes[id];
        delete state.due[id];
        persist();
        toast('Aufgabe als sicher behoben markiert!');
        render();
        return;
    }

    // Simulations-Uhr Steuerung
    if (e.target.id === 'sim-timer-toggle') {
        simTimer.running = !simTimer.running;
        e.target.textContent = simTimer.running ? '⏸ Pause' : '▶ Weiterlaufen lassen';
        clearInterval(simTimer.intervalId);
        if (simTimer.running) {
            simTimer.intervalId = setInterval(() => {
                if (simTimer.remainingSec > 0) {
                    simTimer.remainingSec--;
                    const disp = $('#sim-clock-display');
                    if (disp) {
                        disp.textContent = formatTimer(simTimer.remainingSec);
                        disp.classList.toggle('warn', simTimer.remainingSec <= 300);
                    }
                } else {
                    clearInterval(simTimer.intervalId);
                    simTimer.running = false;
                    toast('⏰ Prüfungszeit abgelaufen! Bitte jetzt Simulation auswerten.');
                }
            }, 1000);
        }
        return;
    }
    if (e.target.id === 'sim-timer-reset') {
        clearInterval(simTimer.intervalId);
        simTimer.running = false;
        simTimer.remainingSec = (Number(e.target.dataset.min) || 90) * 60;
        const disp = $('#sim-clock-display');
        if (disp) { disp.textContent = formatTimer(simTimer.remainingSec); disp.classList.remove('warn'); }
        const tog = $('#sim-timer-toggle');
        if (tog) tog.textContent = '▶ Prüfungszeit starten';
        return;
    }

    // Reihenfolge-Aufgabe (WiSo Order) verschieben & prüfen
    const moveBtn = e.target.closest('[data-order-move]');
    if (moveBtn) {
        const tid = moveBtn.dataset.orderMove, pos = Number(moveBtn.dataset.pos), dir = Number(moveBtn.dataset.dir);
        const task = allSimTasks.find(t => t.id === tid);
        if (!task) return;
        const ord = [...getInitialOrder(task)];
        const targetPos = pos + dir;
        if (targetPos < 0 || targetPos >= ord.length) return;
        [ord[pos], ord[targetPos]] = [ord[targetPos], ord[pos]];
        state.simOrders[tid] = ord;
        persist();
        const container = $('#order-list-' + tid);
        if (container) {
            const tmp = document.createElement('div');
            tmp.innerHTML = renderSimTaskWidget(task);
            const newOrderList = tmp.querySelector('.order-list');
            if (newOrderList) container.replaceWith(newOrderList);
        }
        updateLiveSimScore();
        return;
    }
    const orderCheck = e.target.closest('[data-order-check]');
    if (orderCheck) {
        const tid = orderCheck.dataset.orderCheck, task = allSimTasks.find(t => t.id === tid), fb = $('#order-fb-' + tid);
        if (!task) return;
        const ord = getInitialOrder(task);
        const rightCount = ord.filter((v, i) => v === i).length;
        const allRight = rightCount === task.steps.length;
        if (fb) {
            fb.textContent = allRight ? `✓ Perfekt! Alle ${task.steps.length} Schritte in der richtigen Reihenfolge (${task.points} P.).` : `✗ ${rightCount} von ${task.steps.length} Positionen stimmen. Prüfe die Reihenfolge oder öffne die Erklärung.`;
            fb.className = 'mc-feedback ' + (allRight ? 'ok' : 'err');
        }
        updateLiveSimScore();
        return;
    }

    // Zuordnungs-Aufgabe (WiSo Match) prüfen
    const matchCheck = e.target.closest('[data-match-check]');
    if (matchCheck) {
        const tid = matchCheck.dataset.matchCheck, task = allSimTasks.find(t => t.id === tid), fb = $('#match-fb-' + tid);
        if (!task) return;
        const m = state.simMatches[tid] || {};
        const rightCount = task.pairs.filter((_, idx) => Number(m[idx]) === idx).length;
        const allRight = rightCount === task.pairs.length;
        if (fb) {
            fb.textContent = allRight ? `✓ Alle ${task.pairs.length} Zuordnungen komplett richtig (${task.points} P.)!` : `◑ ${rightCount} von ${task.pairs.length} Zuordnungen richtig (${ computeTaskEarnedPoints(task) } P.).`;
            fb.className = 'mc-feedback ' + (allRight ? 'ok' : 'err');
        }
        updateLiveSimScore();
        return;
    }

    // Rechenkästchen (WiSo Calc) prüfen
    const calcCheck = e.target.closest('[data-calc-check]');
    if (calcCheck) {
        const tid = calcCheck.dataset.calcCheck, task = allSimTasks.find(t => t.id === tid), fb = $('#calc-fb-' + tid);
        if (!task) return;
        const val = (state.answers[tid] || '').trim().replace(/\s+/g, '');
        const acc = (task.acceptedAnswers || [task.expected]).map(x => String(x).trim().replace(/\s+/g, ''));
        const ok = Boolean(val && acc.includes(val));
        if (fb) {
            fb.textContent = ok ? `✓ Exakt richtig (${task.expected} ${task.unit || ''}) · ${task.points} P.!` : `✗ Noch nicht korrekt – prüfe deinen Rechenweg (Tipp: Rabatt/Skonto/BBG/Frist beachten).`;
            fb.className = 'mc-feedback ' + (ok ? 'ok' : 'err');
        }
        updateLiveSimScore();
        return;
    }

    // Ganze Simulation abschließen & persönliche Fehler-Checkliste erzeugen
    const finishSim = e.target.closest('[data-finish-sim]');
    if (finishSim) {
        const simId = finishSim.dataset.finishSim;
        const sim = simulations.find(s => s.id === simId);
        if (!sim) return;
        clearInterval(simTimer.intervalId);
        simTimer.running = false;
        let total = 0, weakAdded = 0;
        for (const t of sim.tasks) {
            const earned = computeTaskEarnedPoints(t);
            total += earned;
            if (earned < t.points * 0.8) {
                state.ratings[t.id] = earned === 0 ? 'again' : 'partial';
                if (!state.due[t.id]) state.due[t.id] = addDaysISO(earned === 0 ? 2 : 4);
                weakAdded++;
            } else {
                state.ratings[t.id] = 'good';
            }
        }
        state.simResults[simId] = {
            score: total,
            max: sim.totalPoints,
            date: todayISO(),
            durationSec: sim.durationMin * 60 - simTimer.remainingSec
        };
        persist();
        toast(`Simulation ausgewertet: ${total} / ${sim.totalPoints} P. (${weakAdded} Aufgaben auf deine Fehler-Checkliste gesetzt).`);
        render();
        return;
    }

    if (e.target.id === 'start-training') startTraining();
    if (e.target.id === 'train-weak') startTraining(true);
    if (e.target.id === 'next-question' && session) { if (session.index === session.items.length - 1) session.finished = true; else session.index++; render(); }
    if (e.target.id === 'previous-question' && session && session.index > 0) { session.index--; render(); }
    const tab = e.target.closest('[data-practice-tab]');
    if (tab) { document.querySelectorAll('[data-practice-tab]').forEach(b => b.classList.toggle('active', b === tab)); $('#practice-list').innerHTML = tab.dataset.practiceTab === 'all' ? allQuestions.map((q, i) => exercise(q, q.id, i + 1, q.lesson.title)).join('') : casesHTML(); }

    const mcOpt = e.target.closest('[data-mc-opt]');
    if (mcOpt) {
        const grp = mcOpt.parentElement;
        if (grp.dataset.mcMulti === '1') {
            mcOpt.classList.toggle('selected');
        } else {
            grp.querySelectorAll('.mc-opt').forEach(b => b.classList.toggle('selected', b === mcOpt));
        }
        const simTaskId = mcOpt.dataset.simMc;
        if (simTaskId) {
            const sel = [];
            grp.querySelectorAll('.mc-opt').forEach((b, idx) => { if (b.classList.contains('selected')) sel.push(idx); });
            state.simMc[simTaskId] = sel;
            persist();
            updateLiveSimScore();
        }
        return;
    }

    const mcCheck = e.target.closest('[data-mc-check]');
    if (mcCheck) {
        const qid = mcCheck.dataset.mcCheck, grp = document.querySelector(`[data-mc-group="${qid}"]`), fb = $('#mc-fb-' + qid);
        if (!grp) return;
        const corr = grp.dataset.mcCorrect.split(',').filter(Boolean).map(Number), sel = [];
        grp.querySelectorAll('.mc-opt').forEach((b, idx) => {
            b.classList.remove('correct', 'wrong');
            const isSel = b.classList.contains('selected'), isCorr = corr.includes(idx);
            if (isSel) sel.push(idx);
            if (isCorr) b.classList.add('correct'); else if (isSel) b.classList.add('wrong');
        });
        const allRight = sel.length === corr.length && corr.every(c => sel.includes(c));
        if (fb) {
            fb.textContent = allRight ? '✓ Vollständig richtig gelöst!' : sel.length ? '✗ Nicht ganz – vergleiche die grün markierten Optionen und öffne die Erklärung unten.' : 'Bitte zuerst mindestens eine Option auswählen.';
            fb.className = 'mc-feedback ' + (allRight ? 'ok' : 'err');
        }
        updateLiveSimScore();
        return;
    }
});

document.addEventListener('input', e => {
    if (e.target.id === 'topic-search') updateTopics();
    if (e.target.id === 'glossary-search') updateGlossary();
    if (e.target.id === 'kat-search') updateKatalog();
    if (e.target.id === 'idx-search') updatePruefungsIndex();
    if (e.target.dataset.answer) {
        state.answers[e.target.dataset.answer] = e.target.value;
        persist();
        updateLiveSimScore();
    }
    if (e.target.dataset.note) {
        lessonState(e.target.dataset.note).notes = e.target.value;
        persist();
        $('#note-saved').textContent = storageOK ? 'Notiz lokal gespeichert.' : 'Bitte Fortschritt als Datei sichern.';
    }
});

document.addEventListener('change', e => {
    if (['priority-filter', 'status-filter'].includes(e.target.id)) updateTopics();
    if (['kat-part', 'kat-level'].includes(e.target.id)) updateKatalog();
    if (['idx-type', 'idx-term', 'idx-part'].includes(e.target.id)) updatePruefungsIndex();
    if (['review-cause-filter', 'review-due-filter'].includes(e.target.id)) {
        const box = $('#review-items-container');
        if (box) box.innerHTML = renderReviewItems($('#review-cause-filter')?.value || '', $('#review-due-filter')?.value || '');
    }
    if (e.target.id === 'lesson-status') { lessonState(e.target.dataset.id).status = e.target.value; persist(); toast('Lernstand gespeichert.'); }
    if (e.target.dataset.check) { const ls = lessonState(e.target.dataset.check), i = Number(e.target.value); ls.checks = e.target.checked ? [...new Set([...ls.checks, i])] : ls.checks.filter(v => v !== i); persist(); }
    if (e.target.dataset.rubric) {
        const id = e.target.dataset.rubric, step = Number(e.target.dataset.step);
        const cur = state.rubrics[id] || [];
        state.rubrics[id] = e.target.checked ? [...new Set([...cur, step])] : cur.filter(x => x !== step);
        persist();
        updateLiveSimScore();
    }
    if (e.target.dataset.matchTask) {
        const tid = e.target.dataset.matchTask, left = e.target.dataset.matchLeft;
        if (!state.simMatches[tid]) state.simMatches[tid] = {};
        if (e.target.value === '') delete state.simMatches[tid][left];
        else state.simMatches[tid][left] = Number(e.target.value);
        persist();
        updateLiveSimScore();
    }
});

$('#export-progress').addEventListener('click', () => { const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'FIAE-Lernfortschritt-' + new Date().toISOString().slice(0, 10) + '.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast('JSON-Sicherung erstellt.'); });
$('#import-trigger').addEventListener('click', () => $('#import-progress').click());
$('#import-progress').addEventListener('change', async e => { const file = e.target.files[0]; if (!file) return; try { if (file.size > 5000000) throw Error('Datei zu groß'); const imported = validateState(JSON.parse(await file.text())); if (!confirm('Gesicherte Notizen und Lernstände übernehmen? Dein aktueller Stand wird durch diese Sicherung ersetzt.')) return; state = imported; persist(); applyPreferences(); render(); toast('Sicherung geladen.'); } catch { toast('Ungültige Sicherung. Bitte eine exportierte Lernstudio-JSON wählen.'); } finally { e.target.value = ''; } });
window.addEventListener('hashchange', render);

/* Kleine Diagramme sind direktes SVG, bleiben offline und skalierbar. */
function diagramFor(id, i) {
    const drawId = id === 'sequenz-zustand' && i === 1 ? 'zustand' : id === 'er-modell' && i === 4 ? 'chen' : id;
    if (i !== 0 && drawId !== 'zustand' && drawId !== 'chen') return '';
    const drawings = {
        klasse: `<rect x="30" y="35" width="155" height="130" rx="5"/><text x="107" y="61">Kunde</text><path d="M30 75H185 M30 113H185"/><text x="107" y="98">− id: Integer</text><text x="107" y="139">+ bestellen()</text><rect x="340" y="35" width="170" height="130" rx="5"/><text x="425" y="61">Bestellung</text><path d="M340 75H510 M340 113H510 M185 90H340"/><text x="425" y="98">− datum: Date</text><text x="425" y="139">+ summe(): Decimal</text><text x="202" y="77">1</text><text x="318" y="77">0..*</text><text x="265" y="116">erteilt</text>`,
        usecase: `<rect x="155" y="20" width="355" height="170" rx="4"/><text x="330" y="43">Webshop</text><circle cx="60" cy="63" r="12"/><path d="M60 75V117 M37 90H83 M60 117L40 145 M60 117L80 145 M83 90H175"/><text x="60" y="170">Kunde</text><ellipse cx="275" cy="85" rx="100" ry="25"/><text x="275" y="90">Bestellung abschließen</text><ellipse cx="355" cy="150" rx="95" ry="24"/><text x="355" y="155">Gesamtpreis berechnen</text><path d="M290 110L324 127" stroke-dasharray="5" marker-end="url(#arr)"/><text x="383" y="119">«include»</text>`,
        aktivitaet: `<circle cx="55" cy="95" r="9" fill="currentColor"/><path d="M66 95H100" marker-end="url(#arr)"/><rect x="105" y="72" width="110" height="45" rx="15"/><text x="160" y="99">Eingabe prüfen</text><path d="M215 95H255" marker-end="url(#arr)"/><path d="M255 95L280 70L305 95L280 120Z"/><path d="M305 95H350" marker-end="url(#arr)"/><text x="330" y="82">[gültig]</text><rect x="355" y="72" width="130" height="45" rx="15"/><text x="420" y="99">Daten speichern</text><path d="M280 120V170H415" marker-end="url(#arr)"/><text x="350" y="157">[ungültig]</text><rect x="420" y="151" width="95" height="36" rx="12"/><text x="467" y="175">Fehler zeigen</text>`,
        'sequenz-zustand': `<rect x="30" y="10" width="100" height="30"/><rect x="220" y="10" width="110" height="30"/><rect x="410" y="10" width="100" height="30"/><text x="80" y="30">UI</text><text x="275" y="30">Service</text><text x="460" y="30">Repository</text><path d="M80 40V300 M275 40V300 M460 40V300" stroke-dasharray="4"/><rect x="45" y="60" width="475" height="230"/><text x="164" y="80">loop [für jede Position]</text><path d="M80 110H267" marker-end="url(#arr)"/><text x="177" y="100">preis(artikelId)</text><rect x="235" y="135" width="265" height="100"/><text x="350" y="153">opt [nicht im Cache]</text><path d="M275 180H452" marker-end="url(#arr)"/><text x="367" y="170">finden(artikelId)</text><path d="M460 215H283" stroke-dasharray="5" marker-end="url(#arr)"/><text x="367" y="205">Artikel</text><path d="M275 265H88" stroke-dasharray="5" marker-end="url(#arr)"/><text x="175" y="255">Preis</text>`,
        zustand: `<circle cx="45" cy="25" r="8" fill="currentColor"/><path d="M45 33V70" marker-end="url(#arr)"/><rect x="15" y="80" width="140" height="95" rx="15"/><text x="85" y="105">Entwurf</text><path d="M15 115H155"/><text x="85" y="138">entry / Status zeigen</text><text x="85" y="160">do / Eingabe erlauben</text><rect x="205" y="80" width="140" height="95" rx="15"/><text x="275" y="105">InPrüfung</text><path d="M205 115H345"/><text x="275" y="142">do / prüfen</text><rect x="395" y="80" width="140" height="95" rx="15"/><text x="465" y="105">Freigegeben</text><path d="M395 115H535 M155 95H205 M345 95H395" marker-end="url(#arr)"/><text x="178" y="50" style="font-size:10px">einreichen [Summe &gt; 0]</text><path d="M178 55V85" stroke-dasharray="3"/><text x="382" y="30" style="font-size:10px">genehmigen / Zeit setzen</text><path d="M375 37V85" stroke-dasharray="3"/><path d="M275 175V210H85V180" marker-end="url(#arr)"/><text x="180" y="203">ablehnen</text>`,
        'er-modell': `<rect x="25" y="45" width="125" height="85" rx="4"/><text x="87" y="70">Kunde</text><text x="87" y="96">PK id</text><rect x="220" y="45" width="135" height="110" rx="4"/><text x="288" y="70">Bestellung</text><text x="288" y="96">PK id</text><text x="288" y="123">FK kunde_id</text><path d="M150 90H220 M355 90H415"/><text x="165" y="77">1</text><text x="203" y="77">n</text><rect x="415" y="45" width="125" height="145" rx="4"/><text x="477" y="70">Position</text><text x="477" y="100">PK/FK bestell_id</text><text x="477" y="128">PK/FK artikel_id</text><text x="477" y="158">menge</text><text x="373" y="77">1</text><text x="400" y="77">n</text>`,
        chen: `<rect x="30" y="85" width="110" height="44"/><text x="85" y="112">Mitarbeiter</text><ellipse cx="55" cy="30" rx="42" ry="18"/><text x="55" y="34" style="text-decoration:underline">PersNr</text><ellipse cx="145" cy="30" rx="40" ry="18"/><text x="145" y="34">Name</text><path d="M55 48L70 85 M145 48L105 85"/><path d="M220 107L275 77L330 107L275 137Z"/><text x="275" y="111">arbeitet_an</text><ellipse cx="275" cy="30" rx="52" ry="18"/><text x="275" y="34">Stundenzahl</text><path d="M275 48V77"/><rect x="410" y="85" width="110" height="44"/><text x="465" y="112">Projekt</text><ellipse cx="465" cy="30" rx="42" ry="18"/><text x="465" y="34" style="text-decoration:underline">ProjNr</text><path d="M465 48V85 M140 107H220 M330 107H410"/><text x="165" y="98">n</text><text x="385" y="98">m</text><path d="M50 129V180H75 M120 129V180H135"/><path d="M75 180L105 160L135 180L105 200Z"/><text x="105" y="184" style="font-size:10px">vertritt</text><text x="38" y="160" style="font-size:10px">1</text><text x="145" y="160" style="font-size:10px">n</text>`,
        'design-patterns-praxis': `<rect x="20" y="20" width="215" height="115" rx="4"/><text x="127" y="42">Subjekt</text><path d="M20 52H235 M20 82H235"/><text x="127" y="71">− liste: List&lt;Beobachter&gt;</text><text x="127" y="102">+ anmelden(b: Beobachter)</text><text x="127" y="122">+ benachrichtige()</text><rect x="320" y="20" width="210" height="85" rx="4"/><text x="425" y="38" style="font-size:10px">«interface»</text><text x="425" y="54">Beobachter</text><path d="M320 64H530"/><text x="425" y="88">+ aktualisiere()</text><path d="M235 55H312" marker-end="url(#arr)"/><text x="275" y="46">kennt *</text><rect x="320" y="135" width="210" height="70" rx="4"/><text x="425" y="158">KonkreterBeobachter</text><path d="M320 168H530"/><text x="425" y="191">+ aktualisiere()</text><path d="M425 135V105" stroke-dasharray="4" marker-end="url(#arr)"/>`,
        'datenstrukturen-baeume-listen': `<text x="120" y="24">Verkettete Liste (Kopf → null)</text><rect x="15" y="40" width="60" height="34"/><rect x="75" y="40" width="25" height="34"/><text x="45" y="61">10</text><text x="87" y="61">•</text><path d="M100 57H135" marker-end="url(#arr)"/><rect x="140" y="40" width="60" height="34"/><rect x="200" y="40" width="25" height="34"/><text x="170" y="61">25</text><text x="212" y="61">/</text><text x="120" y="112">Inorder (L-W-R): Sortiert!</text><text x="415" y="24">Binärer Suchbaum (BST)</text><circle cx="415" cy="58" r="18"/><text x="415" y="63">42</text><circle cx="350" cy="118" r="18"/><text x="350" y="123">23</text><circle cx="480" cy="118" r="18"/><text x="480" y="123">65</text><circle cx="315" cy="178" r="16"/><text x="315" y="183">11</text><circle cx="385" cy="178" r="16"/><text x="385" y="183">31</text><path d="M401 71L363 104 M429 71L467 104 M338 132L324 163 M362 132L376 163"/>`,
        organisation: `<rect x="180" y="15" width="160" height="36" rx="4"/><text x="260" y="38">Geschäftsführung</text><path d="M260 51V115 M260 75H360"/><rect x="360" y="57" width="155" height="36" rx="4" stroke-dasharray="4"/><text x="437" y="79">Stabsstelle (Recht/IT)</text><text x="437" y="106" style="font-size:10px">berät · keine Weisung!</text><path d="M100 115H420 M100 115V140 M260 115V140 M420 115V140"/><rect x="35" y="140" width="130" height="38" rx="4"/><text x="100" y="164">Entwicklung</text><rect x="195" y="140" width="130" height="38" rx="4"/><text x="260" y="164">Vertrieb</text><rect x="355" y="140" width="130" height="38" rx="4"/><text x="420" y="164">Service</text>`,
        'wiso-sicherheit-umwelt-bwl': `<circle cx="60" cy="80" r="34"/><path d="M36 56L84 104" stroke-width="3"/><text x="60" y="138">Verbot (Rot)</text><text x="60" y="154" style="font-size:10px">Kreis + Balken</text><circle cx="170" cy="80" r="34" fill="currentColor" fill-opacity="0.14"/><text x="170" y="85">!</text><text x="170" y="138">Gebot (Blau)</text><text x="170" y="154" style="font-size:10px">Kreis dunkel</text><path d="M280 44L318 112H242Z"/><text x="280" y="99">⚡</text><text x="280" y="138">Warnung (Gelb)</text><text x="280" y="154" style="font-size:10px">Dreieck</text><rect x="356" y="46" width="68" height="68" rx="4"/><path d="M390 62V98 M372 80H408" stroke-width="3"/><text x="390" y="138">Rettung (Grün)</text><text x="390" y="154" style="font-size:10px">Quadrat + Kreuz</text><rect x="456" y="46" width="68" height="68" rx="4"/><text x="490" y="86">🧯</text><text x="490" y="138">Brand (Rot)</text><text x="490" y="154" style="font-size:10px">Quadrat + Flamme</text>`
    };
    if (!drawings[drawId]) return '';
    return `<figure class="diagram"><svg viewBox="0 0 550 ${drawId === 'sequenz-zustand' ? 315 : drawId === 'zustand' ? 235 : 215}" role="img" aria-label="${drawId === 'sequenz-zustand' ? 'Sequenz: Schleife über Positionen, optionaler Repository-Aufruf bei fehlendem Cacheeintrag, Preisrückgabe' : drawId === 'zustand' ? 'Zustände Entwurf, InPrüfung, Freigegeben mit Ereignissen, Guard und entry/do' : 'Vereinfachtes Diagramm als Ergänzung zum erklärenden Text'}"><defs><marker id="arr-${drawId}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none"/></marker></defs><g stroke="currentColor" stroke-width="1.5" fill="none">${drawings[drawId].replaceAll('url(#arr)', 'url(#arr-' + drawId + ')')}</g></svg><figcaption>Vereinfachtes Beispiel · Beziehungen/Notation im jeweiligen Text erläutert.</figcaption></figure>`;
}

function casesHTML() { return `<p class="search-summary">Originale Transferfälle · mehrere Schritte · keine offiziellen Prüfungspunkte</p>${CASES.map((c, i) => `<article class="panel"><div class="eyebrow">TRANSFERFALL ${String(i + 1).padStart(2, '0')} · ${c.time} MINUTEN ALS ÜBUNGSZIEL</div><h2>${c.title}</h2><div>${c.task}</div><label class="small-text muted" for="case-${i}">Eigener Lösungsentwurf (lokal gespeichert)</label><textarea class="notes" id="case-${i}" data-answer="case-${i}" spellcheck="false">${esc(state.answers['case-' + i] || '')}</textarea><details><summary>Musterlösung, Kurzantwort & Selbstkontrolle</summary><div class="solution">${c.solution}<div class="arabic" lang="ar">${c.ar}</div></div></details></article>`).join('')}`; }
const CASES = [
    { title: '01 · Umsatzbericht mit Kunden ohne Umsatz', time: 20, task: `<p>Schema: Kunde(id,name), Bestellung(id,kunde_id,status), Position(bestellung_id,artikel_id,menge,einzelpreis). Jede Kombination (Bestellung,Artikel) kommt höchstens einmal vor.</p><ol><li>Erzeuge pro Kunde den Umsatz bezahlter Bestellungen. Kunden ohne bezahlten Umsatz müssen mit 0 erscheinen.</li><li>Erzeuge nur Kunden über 1.000 € Umsatz, absteigend sortiert.</li><li>Erkläre, warum WHERE b.status='bezahlt' nach einem LEFT JOIN Kunden entfernen kann.</li></ol>`, solution: `<h3>Vollständige SQL-Lösung</h3>${C("SELECT k.id, k.name,\n       COALESCE(SUM(p.menge * p.einzelpreis), 0) AS umsatz\nFROM Kunde k\nLEFT JOIN Bestellung b\n  ON b.kunde_id = k.id AND b.status = 'bezahlt'\nLEFT JOIN Position p ON p.bestellung_id = b.id\nGROUP BY k.id, k.name\nORDER BY umsatz DESC;")}<p>Für Teil 2 vor ORDER BY ergänzen:</p>${C('HAVING COALESCE(SUM(p.menge * p.einzelpreis), 0) > 1000')}<p><b>Kurzantwort Teil 3:</b> Bei fehlendem Treffer ist <code>b.status</code> <b>NULL</b>; der <b>WHERE-Vergleich</b> ist nicht TRUE und entfernt die Zeile. In <b>ON</b> beschränkt er nur die passenden rechten Datensätze.</p><h3>Selbstkontrolle</h3><ul><li>Alle Kunden durch <b>LEFT JOIN</b> erhalten?</li><li>Statusbedingung in <b>ON</b>?</li><li>Menge × Einzelpreis summiert und NULL durch 0 ersetzt?</li><li>Gruppierung korrekt und Umsatzgrenze in <b>HAVING</b>?</li></ul>`, ar: '<p>هذا سؤال يجمع عدة أخطاء شائعة. ابدأ بمن يجب أن يبقى في النتيجة (<b>LEFT JOIN</b>)، ثم اربط الطلبات المدفوعة فقط داخل <b>ON</b>، ثم أسطرها. لا تستخدم <b>INNER JOIN</b> إذا كنت تريد العملاء بلا مبيعات أيضًا.</p>' },
    { title: '02 · Auslastung berechnen und Grenzen testen', time: 20, task: `<p>Eine Liste enthält Räume mit id, kapazitaet und belegt. Gesucht sind IDs der Räume mit einer Auslastung <b>größer als 80 %</b>. Räume mit Kapazität ≤ 0 oder Belegung außerhalb 0..kapazitaet sind ungültig und werden in einer separaten Fehlerliste ausgegeben.</p><ol><li>Schreibe sprachunabhängigen Pseudocode; eine leere Eingabe ist zulässig.</li><li>Nenne Tests für exakt 80 %, über 80 %, Kapazität 0 und leere Liste.</li><li>Bestimme die Laufzeitkomplexität.</li></ol>`, solution: `${C('funktion pruefeRaeume(raeume):\n  hoch = leere Liste; fehler = leere Liste\n  für r in raeume:\n    wenn r.kapazitaet <= 0 ODER r.belegt < 0\n       ODER r.belegt > r.kapazitaet:\n      fehler.hinzufuegen(r.id)\n    sonst:\n      quote = r.belegt / r.kapazitaet  // reelle Division\n      wenn quote > 0.8:\n        hoch.hinzufuegen(r.id)\n  rückgabe (hoch, fehler)')}<p><b>Tests:</b> (Kapazität 10, belegt 8) → nicht hoch; (10,9) → hoch; (0,0) → Fehler; [] → zwei leere Listen. Ergänzend negative Belegung/Überbelegung. Laufzeit <b>O(n)</b>, Ausgabespeicher <b>O(n)</b> im Worst Case.</p><p><b>Selbstkontrolle:</b> Fehler vor Division geprüft? Striktes &gt;? Gleit-/Dezimaldivision statt Ganzzahlfehler? Beide Ergebnislisten zurückgegeben?</p>`, ar: '<p>المهم ليس كتابة صيغة لغة مثالية بل <b>صحة الترتيب</b>: تحقق أولًا من <b>القسمة على صفر</b>، ثم احسب، ثم قارن. عبارة <b>«أكبر من»</b> تستبعد 80% نفسها.</p>' },
    { title: '03 · Rechnungen normalisieren und validieren', time: 20, task: `<p>Eine Tabelle enthält (RechnungsNr, ProduktNr, Produktname, KundenNr, Kundenname, Menge). Schlüssel ist (RechnungsNr,ProduktNr). Annahmen: RechnungsNr bestimmt KundenNr; KundenNr bestimmt Kundenname; ProduktNr bestimmt Produktname.</p><ol><li>Nenne eine Änderungsanomalie.</li><li>Zerlege bis 3NF und kennzeichne PK/FK.</li><li>Der XML-Export erfüllt sein XSD; trotzdem ist die Summe falsch. Erkläre den Unterschied der Prüfungen.</li></ol>`, solution: `<p><b>Kurzantwort Anomalie:</b> Wird ein Kunde in mehreren Rechnungspositionen umbenannt, kann eine unvollständige Änderung widersprüchliche Namen erzeugen.</p>${C('Kunde(KundenNr PK, Kundenname)\nRechnung(RechnungsNr PK, KundenNr FK)\nProdukt(ProduktNr PK, Produktname)\nPosition(RechnungsNr PK/FK, ProduktNr PK/FK, Menge)')}<p>Produktname hängt nur von einem Teil des zusammengesetzten Schlüssels ab (<b>2NF-Verstoß</b>). Kundenname ist transitiv über KundenNr abhängig (<b>3NF-Verstoß</b>). <b>XSD</b> prüft vereinbarte Struktur/Typen; eine zusätzliche fachliche Regel muss Positions-/Rechnungssummen prüfen.</p><p><b>Selbstkontrolle:</b> Annahmen genutzt? Kein Beziehungsattribut Menge in Produkt verschoben? Verbindungen verlustfrei? <b>PK/FK</b> und nicht bloß Tabellennamen angegeben?</p>`, ar: '<p>لا تنقل أي عمود لأن اسمه «يشبه» عمودًا آخر. برّر كل نقل بـ<b>الاعتماد الوظيفي (2NF / 3NF)</b>، وافصل خطأ بنية الملف عن خطأ صحة محتواه التجاري.</p>' },
    { title: '04 · Zustände und Testfälle einer Freigabe', time: 18, task: `<p>Eine Rechnung startet in Entwurf. „einreichen“ führt nur bei Betrag &gt; 0 nach InPrüfung. „genehmigen“ führt von dort nach Freigegeben und setzt die Freigabezeit. „ablehnen“ führt zurück nach Entwurf. Nur Freigegeben darf durch „exportieren“ nach Exportiert wechseln.</p><ol><li>Zeichne Zustände, Start und Transitionen mit Ereignis [Guard] / Effekt.</li><li>Formuliere vier Tests, darunter eine ungültige Aktion.</li><li>Welche Unterschiede bestehen zu einem Aktivitätsdiagramm?</li></ol>`, solution: `${C('Start → Entwurf\nEntwurf -- einreichen [Betrag > 0] --> InPrüfung\nInPrüfung -- genehmigen / Freigabezeit setzen --> Freigegeben\nInPrüfung -- ablehnen --> Entwurf\nFreigegeben -- exportieren --> Exportiert')}<p><b>Tests:</b> Entwurf/Betrag 0/einreichen → bleibt Entwurf, Fehlermeldung gemäß Vertrag; positiver Betrag → InPrüfung; genehmigen → Freigegeben und Zeit gesetzt; exportieren im Entwurf → unzulässig, kein Zustandswechsel.</p><p><b>Kurzvergleich:</b> <b>Zustandsdiagramm</b>: Lebenszyklus eines Objekts und erlaubte Ereignisse. <b>Aktivitätsdiagramm</b>: Ablauf von Aktionen einschließlich Entscheidungen/Parallelität.</p>`, ar: '<p>المخطط ليس سلسلة أسهم عشوائية. كل فعل له <b>حالة بداية مسموحة وشروط (Guard) وأثر (Effekt)</b>. أضف اختبارًا لمحاولة ممنوعة لأن نجاح المسار العادي لا يثبت صحة حماية دورة الحياة.</p>' },
    { title: '05 · Anwendung im Netzwerk betreiben', time: 18, task: `<p>Ein Webdienst nutzt 192.168.40.90/27. Er muss aus dem Büronetz erreichbar sein; die Datenbank darf nicht öffentlich erreichbar sein. Ein Backup von 900 MB wird mit einer vorgegebenen Netto-Rate von 60 Mbit/s kopiert.</p><ol><li>Netz, Broadcast und Hostbereich?</li><li>Rollen von DNS, Router, Firewall und Reverse Proxy?</li><li>Theoretische Übertragungszeit? Warum ist RAID kein Backup?</li></ol>`, solution: `<p><b>/27 = 32er-Blöcke</b>. 90 liegt in 64..95: <b>Netz .64, Broadcast .95, Hosts .65..94 (30)</b>. <b>DNS</b> löst den Namen auf; <b>Router</b> vermittelt zwischen IP-Netzen; <b>Firewall</b> erlaubt nur nötige Verbindungen; <b>Reverse Proxy</b> nimmt Webanfragen vor dem Dienst an und kann sie weiterleiten/TLS terminieren.</p><p><b>Zeit = 900×8/60 = 120 s</b>. <b>RAID</b> schützt je Verfahren gegen bestimmte Plattenausfälle, nicht gegen versehentliches Löschen/Ransomware; getrennte Sicherung und Restore-Test nötig.</p>`, ar: '<p>هنا الشبكات مرتبطة بتشغيل التطبيق. يكفي حساب صحيح لـ<b>Subnetting (/27)</b> وفهم وظيفة كل عنصر؛ وتذكّر دائماً أن <b>RAID ليس نسخة احتياطية</b>.</p>' },
    { title: '06 · WiSo: Vertrag, Entgelt und Wirtschaftlichkeit', time: 22, task: `<ol><li>Ein 17-jähriger Azubi arbeitet netto 7 Stunden. Welche Mindestpause gilt grundsätzlich?</li><li>200 Stunden à 15 €, darin 8 Stunden mit 25 % Zuschlag. Brutto ohne weitere Posten?</li><li>Vorgegebene BBG 2.800 €, Arbeitnehmeranteil 9 %. Beitrag bei diesem Brutto?</li><li>Ertrag 48.000 €, Aufwand 40.000 €. Gewinn und Wirtschaftlichkeit?</li><li>Ein Arbeitgeber nennt die 25.000 € GmbH-Stammkapital „maximale Haftung der Firma“. Beurteile.</li></ol>`, solution: `<ol><li><b>60 Minuten</b> nach Jugend-Arbeitszeitregeln (<b>JArbSchG</b>) bei mehr als 6 Stunden.</li><li><b>200×15 + 8×15×0,25 = 3.030 €</b>.</li><li><b>min(3.030, 2.800)×0,09 = 252 €</b>; der Arbeitnehmeranteil wird nicht erneut halbiert.</li><li><b>Gewinn 8.000 €; Wirtschaftlichkeit 48.000/40.000 = 1,2</b>.</li><li><b>Falsch:</b> Gesellschaft haftet mit ihrem <b>gesamten Gesellschaftsvermögen</b>; Mindeststammkapital ist keine Höchstgrenze ihrer Schulden.</li></ol>`, ar: '<p>هذا يجمع فخاخ الفهم بدل حفظ الأرقام: <b>عمر الشخص (JArbSchG)</b>، أساس الزيادة، <b>سقف حساب الاشتراك (BBG)</b>، النسبة مقابل المبلغ، و<b>رأس المال مقابل المسؤولية</b>.</p>' },
    { title: '07 · Chen-ER-Modell & SQL-Archivierung (JOIN + DELETE)', time: 25, task: `<p>Ein IT-Schulungszentrum verwaltet <code>Trainer(TrainerID, Name, VertrittTrainerID)</code>, <code>Kurs(KursID, Titel, TrainerID)</code> und <code>Teilnahme(KursID, TeilnehmerID, Datum, Bestanden)</code>.</p><ol><li>Beschreibe, wie die 1:n-Vertretungsbeziehung zwischen Trainern und die m:n-Teilnahme in <b>Chen-Notation</b> gezeichnet werden (Rechtecke, Rauten, Ovale, Kardinalitäten).</li><li>Schreibe eine SQL-Abfrage (gemäß IHK-Belegsatz), die für das Jahr 2025 je Kurs den Titel und die Anzahl bestandener Teilnahmen (<code>Bestanden = 1</code>) ausgibt – auch für Kurse mit 0 bestandenen Teilnahmen!</li><li>Archiviere alle Teilnahmen vor dem <code>'2020-01-01'</code> in eine identisch aufgebaute Tabelle <code>Teilnahme_Archiv</code> und lösche sie anschließend aus <code>Teilnahme</code>. Warum sollten beide Befehle in einer Transaktion laufen?</li></ol>`, solution: `<p><b>1. Chen-ER:</b> Rechteck <code>Trainer</code> mit rekursiver Raute <code>vertritt</code> (zwei Linien zum selben Rechteck mit Rollen 1 und n). Zwischen Rechteck <code>Kurs</code> und Rechteck <code>Teilnehmer</code> steht die Raute <code>nimmt_teil</code> (m:n); die Ovale <code>Datum</code> und <code>Bestanden</code> hängen direkt an der Raute <code>nimmt_teil</code>!</p>${C("-- 2. Kurse inkl. 0 bestandene Teilnahmen im Jahr 2025\nSELECT k.KursID, k.Titel, COUNT(t.TeilnehmerID) AS AnzahlBestanden\nFROM Kurs k\nLEFT JOIN Teilnahme t\n  ON t.KursID = k.KursID\n AND YEAR(t.Datum) = 2025\n AND t.Bestanden = 1\nGROUP BY k.KursID, k.Titel;\n\n-- 3. Archivieren & Löschen in einer Transaktion\nSTART TRANSACTION;\nINSERT INTO Teilnahme_Archiv (KursID, TeilnehmerID, Datum, Bestanden)\nSELECT KursID, TeilnehmerID, Datum, Bestanden\nFROM Teilnahme\nWHERE Datum < '2020-01-01';\n\nDELETE FROM Teilnahme\nWHERE Datum < '2020-01-01';\nCOMMIT;")}<p><b>Transaktionsgrund:</b> <b>Atomarität (ACID)</b> verhindert Datenverlust oder Duplikate, falls nach dem INSERT ein Fehler vor dem DELETE auftritt.</p>`, ar: '<p>يجمع هذا التمرين بين رسم <b>Chen-ER</b> (بما فيه العلاقة الذاتية والخصائص على العلاقة m:n) وبين استعلام <b>LEFT JOIN</b> مع وضع شروط السنة والنجاح داخل <b>ON</b>، ثم الأرشفة والحذف داخل <b>معاملة واحدة (Transaction)</b>.</p>' },
    { title: '08 · 2D-Array & Gruppenwechsel im Pseudocode (Teil 2 Algorithmen)', time: 25, task: `<p>Ein zweidimensionales Array <code>buchungen[n][3]</code> ist bereits aufsteigend nach <code>AbteilungNr</code> (Spalte 0) sortiert. Spalte 1 enthält <code>MitarbeiterNr</code>, Spalte 2 die gebuchten <code>Stunden</code>. Schreibe eine Funktion <code>auswerten(buchungen)</code>, die je Abteilung jede Zeile ausgibt, am Ende jeder Abteilung die <code>Abteilungssumme</code> und ganz am Ende die <code>Gesamtsumme</code> aller Stunden ausgibt.</p>`, solution: `${C('funktion auswerten(buchungen):\n  n = buchungen.laenge\n  wenn n == 0:\n    ausgabe("Gesamtsumme: 0")\n    rückgabe\n\n  gesamtSumme = 0\n  abtSumme = 0\n  aktAbt = buchungen[0][0]\n  ausgabe("Abteilung: " + aktAbt)\n\n  für i = 0 bis n - 1:\n    wenn buchungen[i][0] != aktAbt:\n      ausgabe("Summe Abteilung " + aktAbt + ": " + abtSumme)\n      gesamtSumme = gesamtSumme + abtSumme\n      aktAbt = buchungen[i][0]\n      abtSumme = 0\n      ausgabe("Abteilung: " + aktAbt)\n\n    ausgabe("  MA " + buchungen[i][1] + ": " + buchungen[i][2] + " Std.")\n    abtSumme = abtSumme + buchungen[i][2]\n\n  // Nach der Schleife letzte Abteilung abschließen!\n  ausgabe("Summe Abteilung " + aktAbt + ": " + abtSumme)\n  gesamtSumme = gesamtSumme + abtSumme\n  ausgabe("Gesamtsumme: " + gesamtSumme)')}<p><b>Selbstkontrolle:</b> <b>Letzte Gruppe nach der Schleife</b> ausgegeben und zur Gesamtsumme addiert? Leeres Array abgefangen?</p>`, ar: '<p>أهم فخ في خوارزمية <b>كسر المجموعات (Gruppenwechsel)</b> هو نسيان طباعة <b>مجموع القسم الأخير بعد انتهاء الحلقة</b>! احرص دائماً على كتابة خطوة الإغلاق بعد نهاية الحلقة.</p>' },
    { title: '09 · Observer Pattern (Beobachter) entwerfen & implementieren', time: 20, task: `<p>Eine Wetterstation (<code>WetterDaten</code>) misst Temperaturwerte. Sobald sich die Temperatur ändert (<code>setTemperatur(t: Double)</code>), sollen beliebig viele Anzeigen (z. B. <code>SmartphoneAnzeige</code>, <code>WandDisplay</code>) automatisch benachrichtigt werden, ohne dass <code>WetterDaten</code> die konkreten Anzeigeklassen fest einprogrammiert kennt.</p><ol><li>Welches GoF-Entwurfsmuster löst dieses Problem und warum fördert es lose Kopplung (Open-Closed-Prinzip)?</li><li>Schreibe das Interface <code>Beobachter</code> sowie die Klasse <code>WetterDaten</code> mit Liste, <code>registriere(b)</code>, <code>benachrichtige()</code> und <code>setTemperatur(t)</code> im Pseudocode.</li></ol>`, solution: `<p><b>1. Muster:</b> <b>Observer Pattern (Beobachter-Muster</b>, Verhaltensmuster). <code>WetterDaten</code> kennt nur das Interface <code>Beobachter</code>; neue Anzeigen können zur Laufzeit registriert werden, ohne den Code von <code>WetterDaten</code> zu ändern (<b>Open-Closed Principle</b>).</p>${C('interface Beobachter:\n   + aktualisiere(temp: Double): void\n\nklasse WetterDaten:\n  - beobachterListe: Liste<Beobachter> = neue Liste()\n  - temperatur: Double\n\n  + registriere(b: Beobachter): void\n    beobachterListe.hinzufuegen(b)\n\n  + entferne(b: Beobachter): void\n    beobachterListe.entfernen(b)\n\n  + benachrichtige(): void\n    für jeden b in beobachterListe:\n      b.aktualisiere(this.temperatur)\n\n  + setTemperatur(t: Double): void\n    this.temperatur = t\n    this.benachrichtige()')}`, ar: '<p>تذكّر النقاط الحاسمة في <b>Observer Pattern</b>: قائمة المراقبين من نوع الواجهة <code>Liste&lt;Beobachter&gt;</code>، وحلقة التكرار في <code>benachrichtige()</code>، واستدعاء <code>benachrichtige()</code> تلقائياً داخل <code>setTemperatur(t)</code>.</p>' },
    { title: '10 · WiSo-Prüfungssimulation: Frist, Wahl, GmbH & Kalkulation', time: 20, task: `<ol><li>Ein Entwickler (seit 7 Jahren im Betrieb) will selbst zum <code>30.09.2026</code> kündigen (es gilt § 622 BGB). Bis zu welchem Datum (<code>TT.MM.JJJJ</code>) muss seine Kündigung spätestens beim Arbeitgeber eingehen?</li><li>Der Arbeitgeber kündigt seinerseits einem anderen Mitarbeiter (seit 9 Jahren im Betrieb) am <code>14.05.2026</code> ordentlich. Zu welchem Termin endet dessen Arbeitsverhältnis nach § 622 BGB?</li><li>Eine GmbH (Stammkapital 50.000 €; Gesellschafter X hält 15.000 €) schüttet 80.000 € Gewinn aus. Welchen Betrag erhält X?</li><li>Listeneinkaufspreis 10.000 € netto, 20 % Liefererrabatt, 3 % Skonto, 140 € Bezugskosten netto. Berechne den Bezugspreis.</li></ol>`, solution: `<ol><li><b>Eigenkündigung AN (§ 622 Abs. 1 BGB):</b> <b>4 Wochen (28 Tage)</b> zum Monatsende. September hat 30 Tage: <code>30 − 28 = 02.09.2026</code>. (Die 7 Dienstjahre zählen nur bei AG-Kündigung!).</li><li><b>AG-Kündigung (§ 622 Abs. 2 BGB):</b> Ab 8 Jahren Betriebszugehörigkeit gilt <b>3 Monate zum Monatsende</b>. Zugang 14.05.2026 → Ende am <b>31.08.2026</b>.</li><li><b>GmbH-Gewinnanteil:</b> Anteil X = <code>15.000 / 50.000 = 30 %</code>. Ausschüttung für X = <code>80.000 € × 0,30 = 24.000,00 €</code>.</li><li><b>Bezugskalkulation:</b> Ziel = <code>10.000 × 0,80 = 8.000 €</code>; Bar = <code>8.000 × 0,97 = 7.760 €</code>; Bezugspreis = <code>7.760 + 140 = 7.900,00 €</code>.</li></ol>`, ar: '<p>تمرين شامل يحاكي 4 صناديق حسابية (<b>Rechenkästchen</b>) في امتحان WiSo: انتبه للفرق بين <b>استقالة الموظف (28 يوماً)</b> و<b>فصل صاحب العمل</b> (بالأشهر الكاملة حسب سنوات الخدمة)، وحساب <b>حصة الشريك في GmbH</b>، وتسلسل خصم <b>Rabatt</b> ثم <b>Skonto</b> ثم إضافة تكاليف الشحن.</p>' }
];
applyPreferences(); render();
