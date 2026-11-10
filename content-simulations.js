/* 9 Vollständige Prüfungssimulationen (Codex #1, #3, #4): Je 3 Modelle für Teil 1 (90 Min), Teil 2 (90 Min) und WiSo (60 Min) */
(() => {
  'use strict';
  if (!window.COURSE) window.COURSE = {};
  const C = window.C || (t => '<pre><code>' + String(t).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') + '</code></pre>');

  window.COURSE.simulations = [
    // =========================================================================
    // TEIL 1 · MODELL A (DIAGNOSE): Von Grund auf planen, modellieren & testen
    // =========================================================================
    {
      id: 't1-a',
      part: 'Teil 1',
      stage: 'Modell A · Diagnose (Von Grund auf entwerfen)',
      stageAr: 'النموذج A · تشخيصي (بناء الحل من الصفر)',
      title: 'Teil 1 · Modell A: Anforderungen, Netzplan, UML & Black-Box-Tests',
      titleAr: 'القسم الكتابي الأول (نموذج A): هندسة المتطلبات، مخطط الشبكة، UML، واختبارات Black-Box',
      durationMin: 90,
      totalPoints: 100,
      desc: 'Klassische Entwurfsaufgaben unter 90 Minuten Zeitlimit: Anforderungen SMART spezifizieren, Netzplan komplett durchrechnen, Use-Case & Sequenzdiagramm entwerfen sowie Äquivalenzklassen/Grenzwerte ableiten.',
      ar: 'محاكاة تشخيصية كاملة (90 دقيقة · 100 نقطة) تقيس قدرتك على صياغة المتطلبات وحساب مخطط الشبكة ورسم UML واستخراج حالات الاختبار من الصفر.',
      tasks: [
        {
          id: 't1-a-1',
          title: 'Handlungsaufgabe 1: Anforderungen klassifizieren & SMART formulieren',
          points: 25,
          type: 'free',
          lessonId: 'anforderungen',
          taskDe: `<p>Ein Logistikunternehmen beauftragt eine neue Retouren-Webanwendung. Im Erstgespräch fallen folgende Aussagen:</p>
          <ol>
            <li>„Lagermitarbeiter müssen Retouren per Barcode-Scan erfassen und als <i>geprüft</i> oder <i>defekt</i> buchen können.“</li>
            <li>„Die Maske muss extrem schnell reagieren und absolut ausfallsicher sein.“</li>
            <li>„Das System muss zwingend die bestehende PostgreSQL-16-Datenbank nutzen und bis zum 01.11. produktiv gehen.“</li>
          </ol>
          <p><b>Teilaufgaben:</b></p>
          <ul>
            <li><b>a) (9 P.)</b> Ordne die Aussagen 1–3 den Kategorien <b>Funktionale Anforderung</b>, <b>Nicht-funktionale Qualitätsanforderung (ISO 25010)</b> und <b>Randbedingung (Constraint)</b> zu und begründe kurz.</li>
            <li><b>b) (10 P.)</b> Formuliere Aussage 2 in <b>zwei getrennte, messbare (SMART) Anforderungen</b> (Antwortzeit + Verfügbarkeit) um.</li>
            <li><b>c) (6 P.)</b> Grenze <b>Lastenheft</b> und <b>Pflichtenheft</b> nach Autor, Leitfrage und Vertragsrolle voneinander ab.</li>
          </ul>`,
          taskAr: `<p>صنّف العبارات الثلاث إلى <b>متطلب وظيفي</b> و<b>متطلب جودة غير وظيفي</b> و<b>قيد خارجي</b>، ثم أعد صياغة العبارة الثانية لتصبح <b>قابلة للقياس والاختبار (SMART)</b>، وفرّق بين <b>Lastenheft</b> و<b>Pflichtenheft</b>.</p>`,
          rubric: [
            [9, 'Aussage 1 = Funktional (WAS), Aussage 2 = Nicht-funktional/Qualität (WIE GUT), Aussage 3 = Technische/zeitliche Randbedingung', 'تصنيف العبارات الثلاث بشكل صحيح مع التبرير'],
            [5, 'SMART-Antwortzeit: z. B. „95 % aller Barcode-Scans werden bei 100 gleichzeitigen Nutzern in ≤ 0,8 Sekunden verarbeitet.“', 'صياغة متطلب سرعة الاستجابة برقم وظروف قياس محددة'],
            [5, 'SMART-Verfügbarkeit: z. B. „Die Anwendung erreicht im Kernbetrieb (Mo–Sa 06–22 Uhr) eine Verfügbarkeit von mindestens 99,5 % pro Monat.“', 'صياغة متطلب التوافرية بنسبة مئوية ونافذة قياس زمنية'],
            [6, 'Lastenheft = Auftraggeber (WAS/WOZU, Ausschreibungsbasis) vs. Pflichtenheft = Auftragnehmer (WIE/WOMIT, verbindliche Umsetzung)', 'المقارنة الدقيقة بين Lastenheft وPflichtenheft']
          ],
          solutionDe: `<p><b>a) Klassifikation:</b></p>
          <ul>
            <li><b>Aussage 1 — Funktionale Anforderung:</b> Beschreibt eine fachliche Systemfunktion (Eingabe per Scan → Statusbuchung).</li>
            <li><b>Aussage 2 — Nicht-funktionale Qualitätsanforderung (ISO 25010):</b> Betrifft <b>Leistungseffizienz (Zeitverhalten)</b> und <b>Zuverlässigkeit (Verfügbarkeit)</b>, ist aber noch unpräzise.</li>
            <li><b>Aussage 3 — Randbedingung (Constraint):</b> Feste technische (PostgreSQL 16) und terminliche (01.11.) Vorgabe.</li>
          </ul>
          <p><b>b) Messbare SMART-Umformulierung:</b></p>
          <ul>
            <li><b>Zeitverhalten:</b> „Nach dem Barcode-Scan muss die Artikelmaske bei bis zu <b>150 gleichzeitigen Nutzern</b> in <b>95 % der Fälle innerhalb von ≤ 1,0 Sekunden</b> geladen sein.“</li>
            <li><b>Verfügbarkeit:</b> „Das System muss während der Betriebszeiten (Mo–Sa, 06:00–22:00 Uhr) eine <b>Verfügbarkeit von mindestens 99,8 %</b> pro Kalendermonat aufweisen (max. ca. 50 Min. Ausfall/Monat).“</li>
          </ul>
          <p><b>c) Lastenheft vs. Pflichtenheft:</b> Das <b>Lastenheft</b> erstellt der <b>Auftraggeber</b> (Gesamtheit der Forderungen: <i>WAS und WOZU?</i>). Das <b>Pflichtenheft</b> erstellt der <b>Auftragnehmer</b> (konkrete technische Realisierungsvorgaben: <i>WIE und WOMIT?</i>); es wird nach Freigabe Vertragsbestandteil.</p>`,
          solutionAr: `<p><b>القاعدة الذهبية:</b> أي متطلب غير وظيفي في الامتحان يجب أن يحتوي على <b>رقم + وحدة قياس + شرط الحمل (Load)</b>. لا تكتب أبداً «سريع» دون تحديد ثوانٍ، ولا «آمن ضد الأعطال» دون تحديد نسبة توافرية مثل <b>99,8%</b>.</p>`
        },
        {
          id: 't1-a-2',
          title: 'Handlungsaufgabe 2: Netzplan komplett berechnen & Verzögerung prüfen',
          points: 25,
          type: 'free',
          lessonId: 'planung-rechnen',
          taskDe: `<p>Für die Einführung des Retouren-Moduls gilt folgender Vorgangsplan (Start bei Tag 0):</p>
          <table>
            <thead><tr><th>Vorgang</th><th>Beschreibung</th><th>Dauer (Tage)</th><th>Unmittelbare Vorgänger</th></tr></thead>
            <tbody>
              <tr><td><b>A</b></td><td>Schnittstelle spezifizieren</td><td>3</td><td>—</td></tr>
              <tr><td><b>B</b></td><td>Datenbankschema &amp; Migration</td><td>5</td><td>A</td></tr>
              <tr><td><b>C</b></td><td>Scanner-Dialoge erstellen</td><td>3</td><td>A</td></tr>
              <tr><td><b>D</b></td><td>Backend-Service implementieren</td><td>4</td><td>B</td></tr>
              <tr><td><b>E</b></td><td>Testdaten &amp; Scanner-Mock</td><td>2</td><td>C</td></tr>
              <tr><td><b>F</b></td><td>Integrationstest &amp; Rollout</td><td>3</td><td>D, E</td></tr>
            </tbody>
          </table>
          <ul>
            <li><b>a) (15 P.)</b> Berechne für alle Vorgänge A–F: <b>FAZ, FEZ, SAZ, SEZ, Gesamtpuffer (GP)</b> und <b>Freien Puffer (FP)</b>.</li>
            <li><b>b) (5 P.)</b> Gib die <b>Gesamtdauer</b> und den <b>Kritischen Pfad</b> an.</li>
            <li><b>c) (5 P.)</b> Vorgang <b>C</b> verzögert sich um <b>5 Tage</b> (statt 3 dauert er 8 Tage). Wie wirkt sich das auf das Projektende aus? Begründe mit dem Puffer!</li>
          </ul>`,
          taskAr: `<p>احسب جدول مخطط الشبكة <b>Netzplan</b> للأعمال من A إلى F (<b>FAZ, FEZ, SAZ, SEZ, GP, FP</b>)، وحدد <b>المسار الحرج</b>، ثم احسب أثر تأخر النشاط <b>C</b> لمدة 5 أيام إضافية.</p>`,
          rubric: [
            [8, 'Vorwärtsrechnung (FAZ/FEZ) für A–F komplett richtig (Projektdauer = 15 Tage)', 'حساب البداية والنهاية المبكرة FAZ/FEZ بشكل صحيح (مدة المشروع 15 يوماً)'],
            [7, 'Rückwärtsrechnung (SAZ/SEZ) sowie GP und FP für alle Vorgänge korrekt (C und E haben GP = 4)', 'حساب البداية والنهاية المتأخرة SAZ/SEZ وفترة السماح GP/FP'],
            [5, 'Kritischer Pfad A → B → D → F und Gesamtdauer 15 Tage benannt', 'تحديد المسار الحرج A → B → D → F والمدة الكلية 15 يوماً'],
            [5, 'Verzögerung C (+5 Tage) minus Gesamtpuffer (4 Tage) = Projektende verschiebt sich um genau 1 Tag auf 16 Tage', 'حساب أثر التأخر: 5 أيام تأخير ناقص 4 أيام سماح = تأخر المشروع يوماً واحداً (16 يوماً)']
          ],
          solutionDe: `<table>
            <thead><tr><th>Vorgang</th><th>Dauer</th><th>FAZ</th><th>FEZ</th><th>SAZ</th><th>SEZ</th><th>GP</th><th>FP</th></tr></thead>
            <tbody>
              <tr><td><b>A</b></td><td>3</td><td>0</td><td>3</td><td>0</td><td>3</td><td><b>0</b></td><td>0</td></tr>
              <tr><td><b>B</b></td><td>5</td><td>3</td><td>8</td><td>3</td><td>8</td><td><b>0</b></td><td>0</td></tr>
              <tr><td><b>C</b></td><td>3</td><td>3</td><td>6</td><td>7</td><td>10</td><td><b>4</b></td><td>0</td></tr>
              <tr><td><b>D</b></td><td>4</td><td>8</td><td>12</td><td>8</td><td>12</td><td><b>0</b></td><td>0</td></tr>
              <tr><td><b>E</b></td><td>2</td><td>6</td><td>8</td><td>10</td><td>12</td><td><b>4</b></td><td>4</td></tr>
              <tr><td><b>F</b></td><td>3</td><td>12</td><td>15</td><td>12</td><td>15</td><td><b>0</b></td><td>0</td></tr>
            </tbody>
          </table>
          <p><b>b) Gesamtdauer &amp; Kritischer Pfad:</b> Gesamtdauer = <b>15 Tage</b>. Kritischer Pfad: <b>A → B → D → F</b> (alle mit <code>GP = 0</code>).</p>
          <p><b>c) Auswirkung der Verzögerung von C (+5 Tage):</b> Der Zweig C → E hat einen <b>Gesamtpuffer von 4 Tagen</b>. Wenn C um 5 Tage länger dauert, werden 4 Tage durch den Puffer aufgefangen; der 5. Tag überschreitet den Puffer (C endet bei 11, E endet bei 13 &gt; 12). Das Projektende verschiebt sich um <b>genau 1 Tag auf 16 Tage</b>.</p>`,
          solutionAr: `<p><b>انتبه للفرق بين GP وFP في الفرع C → E:</b> النشاط <b>C</b> يملك سماحاً كلياً <b>GP = 4</b> لكن سماحه الحر <b>FP = 0</b> لأن النشاط E يبدأ مباشرة بعده عند اليوم 6؛ بينما النشاط <b>E</b> يملك <b>GP = 4</b> و<b>FP = 4</b> لأن النشاط F لا يبدأ إلا في اليوم 12 بسبب انتظاره للنشاط D.</p>`
        },
        {
          id: 't1-a-3',
          title: 'Handlungsaufgabe 3: UML Use-Case & Sequenzdiagramm entwerfen',
          points: 25,
          type: 'free',
          lessonId: 'sequenz-zustand',
          taskDe: `<p>Für die Retourenabwicklung gilt:</p>
          <ul>
            <li>Der <b>Lagermitarbeiter</b> kann den Anwendungsfall <b>„Retoure erfassen“</b> ausführen. Dabei wird <i>immer zwingend</i> <b>„Bestellnummer validieren“</b> ausgeführt.</li>
            <li>Nur wenn der Artikel einen Wert <b>über 500 €</b> hat, wird <i>optional</i> der Fall <b>„Teamleiter-Freigabe anfordern“</b> ausgelöst, an dem auch der Akteur <b>Teamleiter</b> beteiligt ist.</li>
            <li>Im technischen Ablauf (Sequenzdiagramm) ruft die <code>RetourenUI</code> für jede gescannte Position in einer Schleife <code>pruefePosition(code)</code> am <code>RetourenService</code> auf. Dieser fragt <code>holeArtikel(code)</code> am <code>ArtikelRepo</code> ab. Ist der Artikel gültig, speichert er die Position, sonst gibt er eine Fehlermeldung zurück.</li>
          </ul>
          <p><b>Teilaufgaben:</b></p>
          <ul>
            <li><b>a) (12 P.)</b> Beschreibe/skizziere das <b>Use-Case-Diagramm</b> exakt (Systemgrenze, Akteure, Use Cases, Pfeilrichtungen von <code>«include»</code> und <code>«extend»</code> + Bedingung).</li>
            <li><b>b) (13 P.)</b> Entwirf das <b>Sequenzdiagramm</b> (Lebenslinien, <code>loop</code>-Fragment, <code>alt</code>-Fragment mit Bedingungen <code>[gültig]</code> / <code>[sonst]</code> und Rückgaben).</li>
          </ul>`,
          taskAr: `<p>حدّد عناصر وعلاقات <b>Use-Case-Diagramm</b> مع اتجاه أسهم <code>«include»</code> و<code>«extend»</code>، ثم صمّم <b>Sequenzdiagramm</b> باستخدام إطار التكرار <code>loop</code> وإطار التفرع الشرطي <code>alt</code>.</p>`,
          rubric: [
            [6, 'Use Case: Systemgrenze + Akteure Lagermitarbeiter & Teamleiter außerhalb + 3 Use Cases innerhalb', 'تحديد حدود النظام والفاعلين وحالات الاستخدام الثلاث'],
            [6, 'Pfeilrichtungen: „Retoure erfassen“ --«include»--> „Bestellnummer validieren“; „Teamleiter-Freigabe anfordern“ --«extend» [Wert > 500 €]--> „Retoure erfassen“', 'صحة اتجاه سهم include نحو الجزء الإلزامي وسهم extend نحو الحالة الأساسية مع الشرط'],
            [7, 'Sequenzdiagramm: 3 Lebenslinien (RetourenUI, RetourenService, ArtikelRepo) + loop [für jede Position]', 'رسم خطوط الحياة الثلاثة وإطار التكرار loop'],
            [6, 'alt-Fragment mit [Artikel gültig] -> speicherePosition() + Bestätigung und [sonst] -> Fehlermeldung zurück an UI', 'رسم إطار alt بالشرطين المتكاملين ورسائل الرد المتقطعة']
          ],
          solutionDe: `<p><b>a) Use-Case-Struktur &amp; Pfeilrichtungen:</b></p>` +
          C(`Systemgrenze: [ Retourensystem ]
Akteure außerhalb: Lagermitarbeiter, Teamleiter
- Lagermitarbeiter --- (Retoure erfassen)
- (Retoure erfassen) - - «include» - -> (Bestellnummer validieren)   [Pfeil zum Pflichtteil!]
- (Teamleiter-Freigabe anfordern) - - «extend» [Wert > 500 €] - -> (Retoure erfassen)  [Pfeil zum Basisfall!]
- Teamleiter --- (Teamleiter-Freigabe anfordern)`) +
          `<p><b>b) Sequenzdiagramm (Text-/Strukturmodell):</b></p>` +
          C(`Lebenslinien: RetourenUI | RetourenService | ArtikelRepo
┌─ loop [für jede gescannte Position] ──────────────────────────────────────┐
│ RetourenUI ── pruefePosition(code) ──────────► RetourenService            │
│                                                RetourenService ── holeArtikel(code) ──► ArtikelRepo
│                                                RetourenService ◄─ - artikel / null - - ─ ArtikelRepo
│ ┌─ alt [artikel != null (gültig)] ──────────────────────────────────────┐ │
│ │ RetourenService ── speichereRetoure(artikel) ──► ArtikelRepo          │ │
│ │ RetourenUI ◄─ - - Status: OK - - - - - - - - - ─ RetourenService      │ │
│ ├─ [sonst (ungültig)] ──────────────────────────────────────────────────┤ │
│ │ RetourenUI ◄─ - - Fehler: Unbekannter Code - - ─ RetourenService      │ │
│ └───────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘`),
          solutionAr: `<p><b>احذر من أشهر خطأ في Teil 1:</b> سهم <code>«extend»</code> ينطلق <b>من الحالة الإضافية (Teamleiter-Freigabe) إلى الحالة الأساسية (Retoure erfassen)</b> مع كتابة الشرط <code>[Wert &gt; 500 €]</code>، بينما سهم <code>«include»</code> ينطلق من الحالة الأساسية إلى الجزء الإجباري.</p>`
        },
        {
          id: 't1-a-4',
          title: 'Handlungsaufgabe 4: Äquivalenzklassen & Grenzwertanalyse (Black-Box)',
          points: 25,
          type: 'free',
          lessonId: 'testfaelle',
          taskDe: `<p>Eine Funktion <code>berechneErstattung(tageSeitKauf: Integer, zustand: String): Integer</code> berechnet den Erstattungsprozentsatz einer Retoure:</p>
          <ul>
            <li>Rückgabe ist nur von <b>Tag 1 bis einschließlich Tag 30</b> möglich:
              <ul>
                <li>Tag <b>1 bis 14</b>: volle Erstattung (<b>100 %</b>), sofern <code>zustand == "neu"</code>; bei <code>zustand == "geoeffnet"</code> gibt es <b>80 %</b>.</li>
                <li>Tag <b>15 bis 30</b>: pauschal <b>50 %</b> Erstattung (für <code>"neu"</code> und <code>"geoeffnet"</code>).</li>
              </ul>
            </li>
            <li>Bei <code>tageSeitKauf &lt; 1</code> oder <code>&gt; 30</code> oder einem anderen Zustand (z. B. <code>"defekt"</code>) wirft die Funktion eine <code>InvalidReturnException</code> (bzw. liefert <code>-1</code>).</li>
          </ul>
          <p><b>Teilaufgaben:</b></p>
          <ul>
            <li><b>a) (12 P.)</b> Bestimme alle <b>gültigen und ungültigen Äquivalenzklassen (ÄK)</b> für <code>tageSeitKauf</code> und <code>zustand</code>.</li>
            <li><b>b) (13 P.)</b> Erstelle eine <b>Grenzwert-Testfalltabelle</b> mit mindestens <b>8 kritischen Testfällen</b> (Test-ID, Eingabe <code>tageSeitKauf</code>, Eingabe <code>zustand</code>, erwartetes Soll-Ergebnis, geprüfte Grenze/Klasse).</li>
          </ul>`,
          taskAr: `<p>استخرج جميع <b>فئات التكافؤ الصالحة وغير الصالحة (Äquivalenzklassen)</b> للمعاملين، ثم صمّم جدول <b>تحليل القيم الحدية (Grenzwertanalyse)</b> بـ 8 حالات اختبار حاسمة مع النتيجة المتوقعة لكل حالة.</p>`,
          rubric: [
            [6, 'Äquivalenzklassen für tageSeitKauf: uÄK1 (< 1), gÄK1 (1..14), gÄK2 (15..30), uÄK2 (> 30)', 'تحديد فئات التكافؤ الأربعة لعدد الأيام (صالحة وغير صالحة)'],
            [6, 'Äquivalenzklassen für zustand: gÄK3 ("neu"), gÄK4 ("geoeffnet"), uÄK3 (alle anderen wie "defekt", "", null)', 'تحديد فئات التكافؤ لحالة المنتج'],
            [8, 'Alle 6 exakten Grenzwerte für Tage getestet: 0, 1, 14, 15, 30, 31 mit korrektem Soll-Ergebnis', 'اختبار الحدود الستة للأيام (0، 1، 14، 15، 30، 31) مع النتيجة المتوقعة الصحيحة'],
            [5, 'Kombinationen mit zustand ("neu", "geoeffnet", "defekt") vollständig inkl. Vorbedingung/Sollwert angegeben', 'تغطية تراكيب حالة المنتج مع النتيجة المتوقعة لكل منها']
          ],
          solutionDe: `<p><b>a) Äquivalenzklassen (ÄK):</b></p>
          <ul>
            <li><b>Parameter <code>tageSeitKauf</code>:</b> <b>uÄK1:</b> <code>&le; 0</code> (ungültig) · <b>gÄK1:</b> <code>1..14</code> (gültig) · <b>gÄK2:</b> <code>15..30</code> (gültig) · <b>uÄK2:</b> <code>&ge; 31</code> (ungültig).</li>
            <li><b>Parameter <code>zustand</code>:</b> <b>gÄK3:</b> <code>"neu"</code> · <b>gÄK4:</b> <code>"geoeffnet"</code> · <b>uÄK3:</b> sonstige Werte (z. B. <code>"defekt"</code>, <code>""</code>).</li>
          </ul>
          <p><b>b) Grenzwert-Testfalltabelle:</b></p>
          <table>
            <thead><tr><th>ID</th><th>tageSeitKauf</th><th>zustand</th><th>Erwartetes Ergebnis (Soll)</th><th>Geprüfte Grenze / Klasse</th></tr></thead>
            <tbody>
              <tr><td><b>T1</b></td><td><code>0</code></td><td><code>"neu"</code></td><td><b>Exception / -1</b></td><td>Unterer ungültiger Grenzwert (uÄK1)</td></tr>
              <tr><td><b>T2</b></td><td><code>1</code></td><td><code>"neu"</code></td><td><b>100 %</b></td><td>Unterer gültiger Grenzwert (gÄK1 + gÄK3)</td></tr>
              <tr><td><b>T3</b></td><td><code>14</code></td><td><code>"neu"</code></td><td><b>100 %</b></td><td>Oberer Grenzwert gÄK1 mit "neu"</td></tr>
              <tr><td><b>T4</b></td><td><code>14</code></td><td><code>"geoeffnet"</code></td><td><b>80 %</b></td><td>Oberer Grenzwert gÄK1 mit "geoeffnet" (gÄK4)</td></tr>
              <tr><td><b>T5</b></td><td><code>15</code></td><td><code>"neu"</code></td><td><b>50 %</b></td><td>Unterer Grenzwert gÄK2 (Wechsel 14→15)</td></tr>
              <tr><td><b>T6</b></td><td><code>30</code></td><td><code>"geoeffnet"</code></td><td><b>50 %</b></td><td>Oberer gültiger Grenzwert gÄK2</td></tr>
              <tr><td><b>T7</b></td><td><code>31</code></td><td><code>"neu"</code></td><td><b>Exception / -1</b></td><td>Oberer ungültiger Grenzwert (uÄK2)</td></tr>
              <tr><td><b>T8</b></td><td><code>10</code></td><td><code>"defekt"</code></td><td><b>Exception / -1</b></td><td>Ungültiger Zustand trotz gültiger Tage (uÄK3)</td></tr>
            </tbody>
          </table>`,
          solutionAr: `<p><b>مفتاح العلامة الكاملة في جدول الاختبار:</b> عند كل نقطة تحول (<code>1</code> و<code>14/15</code> و<code>30</code>) اختبر دائماً القيمة على الحد والقيمة المجاورة لها مباشرة (<code>0, 1</code> و<code>14, 15</code> و<code>30, 31</code>)، واكتب النتيجة الرقمية المتوقعة بدقة.</p>`
        }
      ]
    },

    // =========================================================================
    // TEIL 1 · MODELL B (NACH WIEDERHOLUNG): Fehlersuche, Korrektur & Refactoring
    // =========================================================================
    {
      id: 't1-b',
      part: 'Teil 1',
      stage: 'Modell B · Nach Wiederholung (Fehlersuche & Refactoring)',
      stageAr: 'النموذج B · بعد المراجعة (اكتشاف الأخطاء وإعادة الهيكلة)',
      title: 'Teil 1 · Modell B: UML-Korrektur, Design Patterns, XML/DTD-Debug & Make-or-Buy',
      titleAr: 'القسم الكتابي الأول (نموذج B): تصحيح UML، أنماط التصميم GoF، تدقيق XML/DTD، وحساب Make-or-Buy',
      durationMin: 90,
      totalPoints: 100,
      desc: 'Gezielter Perspektivwechsel: Statt bei Null zu starten, musst du hier fehlerhafte UML-Entwürfe, starren Code, kaputtes XML und fehlerhafte Wirtschaftlichkeitsrechnungen analysieren und reparieren.',
      ar: 'نموذج يغير زاوية السؤال: بدلاً من الرسم من الصفر، يختبر قدرتك على اكتشاف الأخطاء في مخططات UML وملفات XML/DTD وإعادة هيكلة الكود بـDesign Patterns.',
      tasks: [
        {
          id: 't1-b-1',
          title: 'Handlungsaufgabe 1: 5 Fehler im UML-Klassendiagramm finden & korrigieren',
          points: 25,
          type: 'free',
          lessonId: 'klasse',
          taskDe: `<p>Ein Praktikant hat folgendes UML-Klassendiagramm für ein Kurssystem entworfen. Fachliche Regeln: Ein <code>Kurs</code> besteht aus mindestens einem <code>Modul</code> (ohne den Kurs existiert das Modul nicht). Ein <code>Teilnehmer</code> kann viele <code>Kurse</code> buchen; dabei werden <code>Anmeldedatum</code> und <code>BezahltStatus</code> gespeichert. <code>PDFZertifikat</code> und <code>HTMLZertifikat</code> implementieren das Interface <code>ZertifikatGenerator</code>.</p>
          <p><b>Fehlerhafter Entwurf des Praktikanten:</b></p>
          <ul>
            <li>Alle Attribute in <code>Kurs</code> und <code>Teilnehmer</code> sind mit <code>+</code> markiert, die Methoden mit <code>-</code>.</li>
            <li>Die ausgefüllte Kompositionsraute zwischen <code>Kurs</code> und <code>Modul</code> sitzt am Ende von <code>Modul</code> statt an <code>Kurs</code>; Multiplizität an <code>Modul</code> steht auf <code>0..1</code>.</li>
            <li><code>anmeldedatum: Date</code> steht als einzelnes Attribut direkt in der Klasse <code>Teilnehmer</code>.</li>
            <li>Zwischen <code>ZertifikatGenerator</code> und <code>PDFZertifikat</code> ist eine durchgezogene Linie mit ausgefüllter Raute gezeichnet.</li>
          </ul>
          <p><b>Aufgabe (25 P.):</b> Benenne alle <b>5 Modellierungsfehler</b> fachlich präzise und gib jeweils die <b>korrekte UML-2-Darstellung</b> an.</p>`,
          taskAr: `<p>استخرج <b>الأخطاء الخمسة</b> في مخطط الأصناف الموصوف أعلاه (الرؤية، موقع ماسة التركيب، التعددية، مكان حفظ تاريخ التسجيل، وعلاقة تحقيق الواجهة) وصحّح كلاً منها وفق معيار <b>UML 2</b>.</p>`,
          rubric: [
            [5, 'Fehler 1 (Kapselung/Sichtbarkeit): Attribute müssen privat (-) und öffentliche Methoden public (+) sein', 'تصحيح محددات الرؤية: الخصائص خاصة (-) والدوال العامة (+)'],
            [5, 'Fehler 2 (Kompositionsraute): Die ausgefüllte Raute muss am Ganzen (Kurs) sitzen, nicht am Teil (Modul)', 'تصحيح موقع الماسة المملوءة لتكون عند الكل (Kurs)'],
            [5, 'Fehler 3 (Multiplizität): Ein Kurs besteht aus mindestens einem Modul -> Multiplizität am Modul muss 1..* statt 0..1 lauten', 'تصحيح التعددية عند Modul لتصبح 1..* بدلاً من 0..1'],
            [5, 'Fehler 4 (Beziehungsattribut): anmeldedatum und bezahltStatus gehören in eine eigene Assoziationsklasse / Buchung-Klasse zwischen Teilnehmer und Kurs', 'نقل تاريخ التسجيل وحالة الدفع إلى صنف علاقة وسيط (Buchung / Anmeldung)'],
            [5, 'Fehler 5 (Interface-Realisierung): Gestrichelter Pfeil mit hohlem Dreieck von PDFZertifikat/HTMLZertifikat zum «interface» ZertifikatGenerator', 'تصحيح علاقة الواجهة إلى خط متقطع بمثلث فارغ يتجه نحو الواجهة']
          ],
          solutionDe: `<ol>
            <li><b>Sichtbarkeiten (Geheimnisprinzip / Kapselung):</b> Attribute müssen auf <code>-</code> (<code>private</code>) und Zugriffsmethoden auf <code>+</code> (<code>public</code>) gesetzt werden.</li>
            <li><b>Position der Kompositionsraute:</b> Die ausgefüllte schwarze Raute kennzeichnet das <b>Ganze</b> und muss daher zwingend auf der Seite der Klasse <code>Kurs</code> stehen (<code>Kurs ◆─── Modul</code>).</li>
            <li><b>Multiplizität am Teil:</b> Laut Regel hat jeder Kurs <i>mindestens ein</i> Modul → Multiplizität auf Modulseite lautet <b><code>1..*</code></b> (nicht <code>0..1</code>).</li>
            <li><b>Beziehungsattribute auslagern:</b> Da ein Teilnehmer mehrere Kurse bucht, würde ein einzelnes Attribut <code>anmeldedatum</code> im Teilnehmer überschrieben. Lösung: Eigene Beziehungsklasse <b><code>Anmeldung</code></b> (mit <code>- anmeldedatum: Date</code>, <code>- bezahlt: Boolean</code>) und jeweils <code>1</code> zu <code>0..*</code>.</li>
            <li><b>Interface-Realisierung:</b> Keine Komposition, sondern eine <b>gestrichelte Linie mit geschlossenem, hohlem Dreieck</b> von <code>PDFZertifikat</code> und <code>HTMLZertifikat</code> hin zum <code>«interface» ZertifikatGenerator</code>.</li>
          </ol>`,
          solutionAr: `<p><b>قاعدة ذهبية لتصحيح Klassendiagramm:</b> اسأل دائماً: 1) أين يجلس الكل؟ (هناك توضع الماسة)، 2) هل القيمة تخص الكائن وحده أم علاقته بكائن آخر؟ (توضع في صنف وسيط)، 3) هل العلاقة «يمتلك» أم «ينفّذ واجهة»؟</p>`
        },
        {
          id: 't1-b-2',
          title: 'Handlungsaufgabe 2: GoF-Pattern erkennen & Code auf Strategy refactoren',
          points: 25,
          type: 'free',
          lessonId: 'design-patterns-praxis',
          taskDe: `<p>In der Klasse <code>Bestellung</code> befindet sich folgender schwer wartbarer Code:</p>` +
          C(`klasse Bestellung:
  - betrag: Decimal
  + berechneGebuehr(zahlungsArt: String): Decimal
    wenn zahlungsArt == "KREDITKARTE":
      rückgabe betrag * 0.02 + 0.50
    sonst wenn zahlungsArt == "PAYPAL":
      rückgabe betrag * 0.03 + 0.35
    sonst wenn zahlungsArt == "RECHNUNG":
      rückgabe 1.50`) +
          `<ul>
            <li><b>a) (8 P.)</b> Welches SOLID-Prinzip wird hier verletzt, wenn ständig neue Zahlungsarten hinzukommen, und welches <b>GoF-Entwurfsmuster</b> löst das Problem?</li>
            <li><b>b) (12 P.)</b> Schreibe den Code im <b>Pseudocode</b> um: Definiere das Interface <code>ZahlungsStrategie</code>, zwei konkrete Strategien und die bereinigte Klasse <code>Bestellung</code>.</li>
            <li><b>c) (5 P.)</b> Wann würdest du stattdessen das <b>Observer-Pattern</b> einsetzen?</li>
          </ul>`,
          taskAr: `<p>حدد مبدأ <b>SOLID</b> المنتهك في الكود أعلاه ونمط التصميم <b>GoF</b> المناسب، ثم أعد كتابة الكود بالـ<b>Pseudocode</b> باستخدام الواجهة <code>ZahlungsStrategie</code>، ووضّح الفرق بينه وبين <b>Observer Pattern</b>.</p>`,
          rubric: [
            [8, 'Open-Closed-Prinzip (OCP) & Single-Responsibility-Prinzip verletzt; Lösung durch GoF Strategy Pattern (Verhaltensmuster)', 'تحديد انتهاك مبدأ Open-Closed واختيار نمط Strategy Pattern'],
            [6, 'Interface ZahlungsStrategie mit Methode + berechneGebuehr(betrag: Decimal): Decimal + 2 konkrete Klassen definiert', 'كتابة الواجهة وصنفين منفذين لها بشكل سليم'],
            [6, 'Klasse Bestellung hält Referenz auf ZahlungsStrategie und delegiert den Aufruf ohne if/else-Kette', 'تفويض الحساب داخل Bestellung عبر الواجهة بدون شروط if/else'],
            [5, 'Abgrenzung Observer: Observer benachrichtigt 1:n abhängige Beobachter automatisch bei Zustandsänderung; Strategy tauscht 1:1 einen Algorithmus aus', 'التفريق الدقيق بين Strategy (تبديل خوارزمية) وObserver (إشعار تلقائي عند تغير الحالة)']
          ],
          solutionDe: `<p><b>a) Prinzip &amp; Muster:</b> Verletzt wird das <b>Open-Closed-Prinzip (OCP)</b> (Klasse muss für jede neue Zahlungsart geändert werden). Das <b>Strategy Pattern (Strategiemuster)</b> kapselt die austauschbaren Berechnungsalgorithmen hinter einem gemeinsamen Interface.</p>` +
          C(`interface ZahlungsStrategie:
  + berechneGebuehr(betrag: Decimal): Decimal

klasse KreditkarteStrategie implementiert ZahlungsStrategie:
  + berechneGebuehr(betrag: Decimal): Decimal
    rückgabe betrag * 0.02 + 0.50

klasse PayPalStrategie implementiert ZahlungsStrategie:
  + berechneGebuehr(betrag: Decimal): Decimal
    rückgabe betrag * 0.03 + 0.35

klasse Bestellung:
  - betrag: Decimal
  - strategie: ZahlungsStrategie
  + konstruktor(betrag: Decimal, s: ZahlungsStrategie):
    this.betrag = betrag
    this.strategie = s
  + gesamtGebuehr(): Decimal
    rückgabe this.strategie.berechneGebuehr(this.betrag)`),
          solutionAr: `<p><b>الفرق الحاسم في الامتحان:</b> <b>Strategy</b> = عندي عدة طرق لحساب شيء واحد (شحن، ضريبة، دفع) وأمرر الطريقة كمعامل؛ <b>Observer</b> = عندي حدث يتغير (حرارة، حالة طلب) وأريد إبلاغ قائمة مشتركين <code>Liste&lt;Beobachter&gt;</code> تلقائياً.</p>`
        },
        {
          id: 't1-b-3',
          title: 'Handlungsaufgabe 3: XML / DTD Fehlersuche & RegEx-Validierung',
          points: 25,
          type: 'free',
          lessonId: 'xml-dtd-xsd-regex',
          taskDe: `<p>Gegeben sind folgende DTD und eine XML-Datei:</p>` +
          C(`<!-- DTD -->
<!ELEMENT rechnung (kunde, position+, gesamtbetrag)>
<!ATTLIST rechnung nr ID #REQUIRED waehrung CDATA "EUR">
<!ELEMENT kunde (name, email?)>
<!ELEMENT position (artikelnr, menge)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT email (#PCDATA)>
<!ELEMENT artikelnr (#PCDATA)>
<!ELEMENT menge (#PCDATA)>
<!ELEMENT gesamtbetrag (#PCDATA)>

<!-- Fehlerhafte XML-Datei -->
<rechnung>
  <kunde>
    <email>info@test.de</email>
    <name>Müller GmbH</name>
  </kunde>
  <gesamtbetrag>199.00</gesamtbetrag>
</rechnung>`) +
          `<ul>
            <li><b>a) (12 P.)</b> Finde <b>alle 3 Validierungsfehler</b> der XML-Datei gegenüber der DTD und begründe sie anhand der DTD-Symbole.</li>
            <li><b>b) (7 P.)</b> Die <code>artikelnr</code> muss immer aus <b>genau zwei Großbuchstaben</b>, einem <b>Bindestrich</b> und <b>4 bis 6 Ziffern</b> bestehen (z. B. <code>IT-4092</code>). Schreibe den passenden <b>Regulären Ausdruck (RegEx)</b>.</li>
            <li><b>c) (6 P.)</b> Warum garantiert eine erfolgreiche DTD/XSD-Validierung noch nicht, dass der <code>gesamtbetrag</code> rechnerisch stimmt?</li>
          </ul>`,
          taskAr: `<p>استخرج <b>أخطاء التحقق الثلاثة</b> في ملف XML مقارنةً بالـDTD، ثم اكتب <b>التعبير النمطي (RegEx)</b> لرقم المنتج (حرفان كبيران + شرطة + 4 إلى 6 أرقام)، ووضّح لماذا لا تكفي DTD لإثبات صحة المجموع المالي.</p>`,
          rubric: [
            [12, '3 DTD-Fehler erkannt: (1) Pflichtattribut nr (#REQUIRED) im Tag <rechnung> fehlt, (2) Reihenfolge in <kunde> vertauscht (email vor name statt name, email?), (3) Mindestens eine <position> fehlt (wegen position+)', 'اكتشاف الأخطاء الثلاثة: غياب خاصية nr الإلزامية، عكس ترتيب عناصر العميل، وغياب عنصر position+'],
            [7, 'RegEx exakt: ^[A-Z]{2}-[0-9]{4,6}$ (bzw. ^\\p{Lu}{2}-\\d{4,6}$)', 'كتابة التعبير النمطي بشكل صحيح مع رموز البداية والنهاية ^ و$'],
            [6, 'DTD/XSD prüfen Struktur, Reihenfolge und Datentypen, aber keine dynamische Geschäftslogik (Summenformel Σ menge × preis)', 'التفريق بين فحص البنية الشكلية وفحص صحة منطق الأعمال الحسابي']
          ],
          solutionDe: `<p><b>a) Die 3 Validierungsfehler gegen die DTD:</b></p>
          <ol>
            <li><b>Fehlendes Pflichtattribut:</b> Im Start-Tag <code>&lt;rechnung&gt;</code> fehlt das Attribut <code>nr</code>, das laut <code>nr ID #REQUIRED</code> zwingend vorgeschrieben ist.</li>
            <li><b>Falsche Elementreihenfolge in <code>&lt;kunde&gt;</code>:</b> Die DTD schreibt <code>(name, email?)</code> vor; im XML steht jedoch <code>&lt;email&gt;</code> vor <code>&lt;name&gt;</code>.</li>
            <li><b>Fehlendes Pflichtelement <code>&lt;position&gt;</code>:</b> Der Quantor <code>position+</code> verlangt <b>mindestens eine</b> Position (1..n); im XML sind 0 Positionen enthalten.</li>
          </ol>
          <p><b>b) Regulärer Ausdruck (RegEx):</b> <code>^[A-Z]{2}-[0-9]{4,6}$</code> (oder <code>^[A-Z]{2}-\\d{4,6}$</code>).</p>
          <p><b>c) Grenze der Schema-Validierung:</b> DTD/XSD prüfen nur die <b>formale Struktur, Kardinalitäten und Datentypen</b>. Ob der Wert in <code>&lt;gesamtbetrag&gt;</code> tatsächlich der Summe aller Positionen entspricht, muss die <b>fachliche Anwendungslogik</b> prüfen.</p>`,
          solutionAr: `<p><b>تذكّر رموز التكرار في DTD وRegEx:</b> الرمز <code>?</code> يعني (0 أو 1 اختياري)، الرمز <code>*</code> يعني (0 أو أكثر)، والرمز <code>+</code> يعني (<b>1 على الأقل</b> — غيابه خطأ فوري!).</p>`
        },
        {
          id: 't1-b-4',
          title: 'Handlungsaufgabe 4: Make-or-Buy berechnen & Nutzwertanalyse korrigieren',
          points: 25,
          type: 'free',
          lessonId: 'wirtschaftlichkeit',
          taskDe: `<p>Für das Retourensystem werden zwei Alternativen über 4 Jahre verglichen:</p>
          <ul>
            <li><b>Alternative 1 (Eigenentwicklung):</b> Einmalige Entwicklungskosten <b>48.000 €</b>, jährliche Betriebs- und Wartungskosten <b>6.000 € / Jahr</b>.</li>
            <li><b>Alternative 2 (Standard-Cloudlösung):</b> Einmalige Einrichtung <b>12.000 €</b>, jährliche Lizenz- und Supportgebühren <b>18.000 € / Jahr</b>.</li>
          </ul>
          <p><b>Teilaufgaben:</b></p>
          <ul>
            <li><b>a) (12 P.)</b> Stelle die beiden <b>Kostenfunktionen $K(t)$</b> auf, berechne den <b>Kritischen Zeitpunkt (Break-Even in Jahren)</b> und die <b>Gesamtkosten (TCO) nach 4 Jahren</b>.</li>
            <li><b>b) (7 P.)</b> In einer ergänzenden Nutzwertanalyse hat ein Teammitglied 4 Kriterien mit den Gewichten <code>30 %, 30 %, 25 %, 25 %</code> angelegt und ein Kriterium „Maximal 20.000 € Einrichtungskosten“ als Punkte-Kriterium (1–10 Punkte) aufgenommen. Welche <b>zwei methodischen Fehler</b> liegen vor?</li>
            <li><b>c) (6 P.)</b> Formuliere eine <b>prüfungsreife Entscheidungsempfehlung</b>, die Kosten und nicht-monetäre Risiken verbindet.</li>
          </ul>`,
          taskAr: `<p>اكتب دالتي التكلفة $K(t)$ واحسب <b>سنة التعادل بين التطوير والشراء</b> وإجمالي التكلفة بعد 4 سنوات، ثم اكتشف <b>الخطأين المنهجيين</b> في تحليل القيمة المنفعية <b>Nutzwertanalyse</b>.</p>`,
          rubric: [
            [6, 'Kostenfunktionen: K_Eigen(t) = 48.000 + 6.000t; K_Kauf(t) = 12.000 + 18.000t; Gleichsetzen -> 36.000 = 12.000t -> t = 3 Jahre', 'كتابة دالتي التكلفة وحساب نقطة التعادل t = 3 سنوات'],
            [6, 'Gesamtkosten nach 4 Jahren: Eigenentwicklung = 72.000 €, Kauflösung = 84.000 € (Eigenentwicklung spart 12.000 €)', 'حساب التكلفة الكلية بعد 4 سنوات: التطوير الذاتي 72.000 € والشراء 84.000 €'],
            [7, '2 Fehler in NWA: (1) Summe der Gewichte ist 110 % statt zwingend 100 %; (2) Harte Budget-/Muss-Grenze ist ein K.O.-Kriterium vorab bzw. Teil des monetären Kostenvergleichs, kein weiches Punktekriterium', 'اكتشاف خطأ مجموع الأوزان (110% بدل 100%) وخطأ وضع شرط ميزانية إلزامي كمعيار نقاط نسبي'],
            [6, 'Differenzierte Empfehlung mit Zahlenbeleg (ab Jahr 3 günstiger, 12.000 € Ersparnis nach 4 J.) + Hinweis auf Entwicklerkapazität/Terminrisiko', 'صياغة توصية متوازنة تجمع التوفير المالي مع شروط توفر المطورين والوقت']
          ],
          solutionDe: `<p><b>a) Kostenfunktionen &amp; Schnittpunkt:</b></p>
          <ul>
            <li>$K_{\\text{Eigen}}(t) = 48.000 + 6.000 \\cdot t$</li>
            <li>$K_{\\text{Kauf}}(t) = 12.000 + 18.000 \\cdot t$</li>
            <li><b>Gleichsetzen:</b> $48.000 + 6.000t = 12.000 + 18.000t \\Rightarrow 36.000 = 12.000t \\Rightarrow \\mathbf{t = 3\\text{ Jahre}}$ (bei je 66.000 €).</li>
            <li><b>Nach 4 Jahren:</b> Eigenentwicklung = <b>72.000 €</b>; Kauflösung = <b>84.000 €</b> (Eigenentwicklung ist um <b>12.000 € günstiger</b>).</li>
          </ul>
          <p><b>b) Zwei Fehler in der Nutzwertanalyse:</b></p>
          <ol>
            <li><b>Gewichtungssumme ≠ 100 %:</b> $30 + 30 + 25 + 25 = 110\\%$. Die Summe aller Gewichte muss zwingend <b>exakt 100 % (bzw. 1,0)</b> ergeben.</li>
            <li><b>K.O.-/Monetärkriterium falsch eingeordnet:</b> Eine harte Budgetobergrenze ist ein <b>Muss-/Ausschlusskriterium</b> vor der NWA; zudem führt das Einmischen der Kosten in die qualitative Nutzwertanalyse zu einer Doppelbewertung gegenüber dem Kostenvergleich.</li>
          </ol>
          <p><b>c) Empfehlung:</b> Bei einer geplanten Nutzungsdauer von <b>4 Jahren</b> ist die <b>Eigenentwicklung um 12.000 € günstiger</b> (Amortisation des Mehraufwands nach genau 3 Jahren) und bietet volle Anpassbarkeit. Sie ist zu empfehlen, sofern interne Entwicklerkapazitäten und der Zieltermin gesichert sind.</p>`,
          solutionAr: `<p><b>انتبه في أسئلة Nutzwertanalyse:</b> أول خطوة تقوم بها عندما يعطيك الامتحان جدول أوزان هي <b>جمع عمود النسب المئوية</b>؛ إذا لم يساوِ <b>100%</b> فهذا خطأ مضمون الدرجات!</p>`
        }
      ]
    },

    // =========================================================================
    // TEIL 1 · MODELL C (VOR DER PRÜFUNG): Neue Katalogthemen & Generalprobe
    // =========================================================================
    {
      id: 't1-c',
      part: 'Teil 1',
      stage: 'Modell C · Generalprobe (Neue Katalogthemen ab 2025)',
      stageAr: 'النموذج C · البروفة النهائية (موضوعات الكتالوج الجديد)',
      title: 'Teil 1 · Modell C: Zustandsdiagramm, ISO 25010 & TDD, Kerberos/Security & Subnetting/RAID',
      titleAr: 'القسم الكتابي الأول (نموذج C): مخطط الحالة، ISO 25010 وTDD، أمن Kerberos/SSO، والشبكات والتخزين',
      durationMin: 90,
      totalPoints: 100,
      desc: 'Generalprobe mit den wichtigsten Neuerungen der 2. Auflage des AkA-Prüfungskatalogs: Zustandsautomat mit Guards, ISO 25010 & White-Box C1, Kerberos/SSO/Kryptografie sowie Subnetting & RPO/RTO.',
      ar: 'نموذج ما قبل الامتحان يركّز على البنود المضافة حديثاً في كتالوج AkA (الطبعة الثانية) مع مسائل حسابية في الشبكات والتوافرية.',
      tasks: [
        {
          id: 't1-c-1',
          title: 'Handlungsaufgabe 1: UML-Zustandsdiagramm & Zustands-Testfälle',
          points: 25,
          type: 'free',
          lessonId: 'sequenz-zustand',
          taskDe: `<p>Ein Kundenauftrag durchläuft folgende Zustände:</p>
          <ul>
            <li>Nach dem Start befindet sich der Auftrag im Zustand <b><code>Angelegt</code></b> (beim Eintritt wird <code>setzeErstellDatum()</code> ausgeführt).</li>
            <li>Durch das Ereignis <code>pruefen</code> wechselt er nur dann nach <b><code>Reserviert</code></b>, wenn die Bedingung <code>[BonitaetOK UND BestandAusreichend]</code> erfüllt ist; als Übergangseffekt wird <code>reserviereWare()</code> ausgelöst. Ist die Bedingung falsch, wechselt er nach <b><code>Abgelehnt</code></b> (Endzustand).</li>
            <li>Aus <b><code>Reserviert</code></b> führt <code>bezahlen</code> nach <b><code>Bezahlt</code></b> und von dort <code>versenden</code> nach <b><code>Versendet</code></b> (Endzustand).</li>
            <li>Ein Storno (<code>stornieren</code>) ist <b>nur</b> aus <code>Angelegt</code> und <code>Reserviert</code> möglich (führt nach <code>Storniert</code>; aus <code>Reserviert</code> mit Effekt <code>gibWareFrei()</code>), <b>nicht</b> jedoch aus <code>Bezahlt</code>!</li>
          </ul>
          <p><b>Aufgaben:</b></p>
          <ul>
            <li><b>a) (15 P.)</b> Stelle alle Zustände und Transitionen im Format <code>Startzustand -- Ereignis [Guard] / Effekt --&gt; Zielzustand</code> sowie die <code>entry</code>-Aktion vollständig dar.</li>
            <li><b>b) (10 P.)</b> Formuliere <b>4 Testfälle</b> (inkl. Startzustand, Ereignis, Bedingung und Soll-Folgezustand), darunter mindestens einen <b>Negativtest für ein unzulässiges Ereignis</b>.</li>
          </ul>`,
          taskAr: `<p>مثّل <b>مخطط الحالة (Zustandsdiagramm)</b> بجميع حالاته وانتقالاته بصيغة <code>Ereignis [Guard] / Effekt</code> مع إجراء الدخول <code>entry</code>، ثم اكتب <b>4 حالات اختبار</b> تشمل اختبار انتقال غير مسموح.</p>`,
          rubric: [
            [8, 'Alle Zustände (Angelegt mit entry / setzeErstellDatum(), Reserviert, Bezahlt, Versendet, Abgelehnt, Storniert) inkl. Start/Ende korrekt', 'تحديد جميع الحالات ونقطة البداية والنهاية وإجراء entry'],
            [7, 'Alle Transitionen mit exakter Syntax Ereignis [Guard] / Effekt (insb. pruefen mit beiden Zweigen und stornieren mit gibWareFrei())', 'كتابة جميع الانتقالات بالصياغة القياسية مع الشروط والأثر'],
            [10, '4 vollständige Zustandstests (Positivpfad, falscher Guard -> Abgelehnt, Storno aus Reserviert, sowie Negativtest: stornieren im Zustand Bezahlt bleibt Bezahlt + Fehler)', 'كتابة 4 حالات اختبار تشمل حالة فشل الشرط وحالة منع الإلغاء بعد الدفع']
          ],
          solutionDe: `<p><b>a) Zustandsmodell &amp; Transitionen:</b></p>` +
          C(`[*] --> Angelegt (entry / setzeErstellDatum())
Angelegt -- pruefen [BonitaetOK && BestandAusreichend] / reserviereWare() --> Reserviert
Angelegt -- pruefen [!BonitaetOK || !BestandAusreichend] --> Abgelehnt --> [*]
Angelegt -- stornieren --> Storniert --> [*]
Reserviert -- bezahlen --> Bezahlt
Reserviert -- stornieren / gibWareFrei() --> Storniert --> [*]
Bezahlt -- versenden --> Versendet --> [*]`) +
          `<p><b>b) 4 Zustands-Testfälle:</b></p>
          <ol>
            <li><b>Positivtest Reservierung:</b> Zustand <code>Angelegt</code>, Ereignis <code>pruefen</code> mit <code>BonitaetOK=true, Bestand=true</code> → Wechsel nach <b><code>Reserviert</code></b>, Ware ist reserviert.</li>
            <li><b>Guard-Negativtest:</b> Zustand <code>Angelegt</code>, Ereignis <code>pruefen</code> mit <code>BonitaetOK=false</code> → Wechsel nach <b><code>Abgelehnt</code></b>, keine Reservierung.</li>
            <li><b>Storno mit Aufräumeffekt:</b> Zustand <code>Reserviert</code>, Ereignis <code>stornieren</code> → Wechsel nach <b><code>Storniert</code></b> und Aufruf von <code>gibWareFrei()</code>.</li>
            <li><b>Verbotenes Ereignis (Unzulässige Transition):</b> Zustand <b><code>Bezahlt</code></b>, Ereignis <code>stornieren</code> → <b>Kein Zustandswechsel</b> (bleibt <code>Bezahlt</code>) + definierte Fehlermeldung.</li>
          </ol>`,
          solutionAr: `<p><b>سر التميز في Zustandsdiagramm:</b> لا تكتفِ باختبار المسار السعيد؛ المصحح يبحث دائماً عن <b>اختبار حدث في حالة لا تسمح به</b> (مثل طلب <code>stornieren</code> والطلب في حالة <code>Bezahlt</code>) للتأكد أن الحالة لا تتغير.</p>`
        },
        {
          id: 't1-c-2',
          title: 'Handlungsaufgabe 2: ISO/IEC 25010, TDD & White-Box Zweigüberdeckung (C1)',
          points: 25,
          type: 'free',
          lessonId: 'qualitaet-iso25010-tdd',
          taskDe: `<p>Gegeben ist folgende Funktion zur Versandfreigabe:</p>` +
          C(`funktion pruefeExpress(gewichtKg: Float, istPremium: Boolean, plz: String): Boolean
  freigabe = falsch
  wenn gewichtKg <= 20.0 UND istPremium == wahr:
    freigabe = wahr
  wenn plz == "99999":   // Inselzuschlag-Sperrgebiet
    freigabe = falsch
  rückgabe freigabe`) +
          `<ul>
            <li><b>a) (8 P.)</b> Erkläre die drei Phasen von <b>TDD (Test-Driven Development)</b> und nenne zwei Vorteile gegenüber nachträglichem Testen.</li>
            <li><b>b) (9 P.)</b> Wie viele Testfälle benötigt man mindestens für <b>100 % Zweigüberdeckung ($C_1$)</b> der obigen Funktion? Gib die konkreten Testeingaben an und erkläre, warum <b>Anweisungsüberdeckung ($C_0$)</b> schwächer ist.</li>
            <li><b>c) (8 P.)</b> Ordne folgende Anforderungen den <b>ISO/IEC 25010</b> Hauptmerkmalen zu: (1) „Modularer Aufbau für schnellen Austausch des Zahlungsmoduls“, (2) „Bedienung auch nur per Tastatur möglich“, (3) „Wiederanlauf nach Absturz in 30 Sekunden“, (4) „Lauffähig unter Linux und Windows“.</li>
          </ul>`,
          taskAr: `<p>اشرح مراحل <b>TDD (Red-Green-Refactor)</b>، ثم حدد أقل عدد من الاختبارات لتحقيق <b>تغطية الفروع الكاملة 100% ($C_1$)</b> للكود أعلاه مع القيم، وصنّف المتطلبات الأربعة وفق <b>ISO/IEC 25010</b>.</p>`,
          rubric: [
            [8, 'TDD-Zyklus: 1. Red (fehlschlagenden Test zuerst schreiben), 2. Green (minimalen Code schreiben bis Test grün ist), 3. Refactor (Code bereinigen ohne Verhalten zu ändern) + 2 Vorteile', 'شرح مراحل TDD الثلاث (Red → Green → Refactor) مع ميزتين'],
            [9, 'Für 100 % Zweigüberdeckung (C1) reichen 2 Testfälle, die bei beiden if-Entscheidungen jeweils True- und False-Zweig durchlaufen: z. B. T1 (10.0, true, "99999") [if1=True, if2=True] und T2 (25.0, false, "10115") [if1=False, if2=False]', 'تحديد حالتي اختبار تحققان 100% تغطية فروع C1 وشرح قصور C0 عند غياب else'],
            [8, 'ISO 25010 Zuordnung: (1) Wartbarkeit/Modifizierbarkeit, (2) Benutzbarkeit, (3) Zuverlässigkeit/Wiederherstellbarkeit, (4) Übertragbarkeit/Anpassbarkeit', 'تصنيف المتطلبات الأربعة بشكل صحيح وفق معيار ISO/IEC 25010']
          ],
          solutionDe: `<p><b>a) TDD (Red – Green – Refactor):</b></p>
          <ol>
            <li><b>Red:</b> Zuerst einen automatisierten Unit-Test für die neue Anforderung schreiben, der noch fehlschlägt.</li>
            <li><b>Green:</b> Genau so viel Produktionscode schreiben, bis der Test erfolgreich durchläuft.</li>
            <li><b>Refactor:</b> Code-Duplikate entfernen und Struktur verbessern, während alle Tests grün bleiben. <i>Vorteile:</i> Hohe Testabdeckung ab Zeile 1 und testbares, lose gekoppeltes Design.</li>
          </ol>
          <p><b>b) White-Box Coverage ($C_0$ vs. $C_1$):</b> Da beide <code>wenn</code>-Blöcke <b>keinen <code>sonst</code>-Zweig</b> haben, würde für <b>100 % Anweisungsüberdeckung ($C_0$)</b> schon <b>ein einziger Test</b> reichen, der beide Bedingungen wahr macht: <code>(10.0, true, "99999")</code>! Für <b>100 % Zweigüberdeckung ($C_1$)</b> müssen jedoch an beiden Entscheidungen sowohl der <code>True</code>- als auch der <code>False</code>-Ausgang durchlaufen werden → <b>mindestens 2 Testfälle</b>:
          <br>• <b>Test 1:</b> <code>(10.0, true, "99999")</code> → 1. if = <code>True</code>, 2. if = <code>True</code> → Rückgabe <code>false</code>.
          <br>• <b>Test 2:</b> <code>(25.0, false, "10115")</code> → 1. if = <code>False</code>, 2. if = <code>False</code> → Rückgabe <code>false</code>.
          <br><i>Hinweis:</i> Selbst 100 % $C_1$ zeigt hier in beiden Tests nur Rückgabe <code>false</code>! Deshalb ist zusätzlich der fachliche Positivfall <code>(10.0, true, "10115") → true</code> nötig.</p>
          <p><b>c) ISO/IEC 25010:</b> (1) <b>Wartbarkeit (Maintainability)</b>, (2) <b>Benutzbarkeit (Usability)</b>, (3) <b>Zuverlässigkeit (Reliability)</b>, (4) <b>Übertragbarkeit (Portability)</b>.</p>`,
          solutionAr: `<p><b>ملاحظة ذهبية للامتحان:</b> عندما تحتوي دالة على جملة <code>if</code> بدون <code>else</code>، فإن <b>تغطية الأسطر ($C_0$)</b> قد تصل إلى 100% باختبار واحد فقط يدخل الـ<code>if</code>، بينما <b>تغطية الفروع ($C_1$)</b> تجبرك على اختبار حالة عدم دخول الـ<code>if</code> أيضاً!</p>`
        },
        {
          id: 't1-c-3',
          title: 'Handlungsaufgabe 3: Kerberos/SSO, Hybride Kryptografie, SQL-Injection & DSGVO',
          points: 25,
          type: 'free',
          lessonId: 'auth-kerberos-oauth-storage',
          taskDe: `<p>Sicherheitsaudit der neuen Unternehmensplattform:</p>
          <ul>
            <li><b>a) (7 P.)</b> Das Unternehmen führt <b>Single Sign-On (SSO) mit Kerberos</b> ein. Erkläre die Rolle von <b>AS (Authentication Server)</b>, <b>TGT (Ticket Granting Ticket)</b> und <b>TGS (Ticket Granting Server)</b> sowie das größte Sicherheitsrisiko von SSO.</li>
            <li><b>b) (6 P.)</b> PDF-Verträge sollen <b>vertraulich</b> und <b>fälschungssicher signiert</b> per E-Mail an Kunden übertragen werden. Welcher Schlüssel wird zum <b>Signieren</b> und welcher zum <b>Verschlüsseln</b> genutzt?</li>
            <li><b>c) (6 P.)</b> Im Code steht: <code>sql = "SELECT * FROM Benutzer WHERE name = '" + eingabe + "'"</code>. Zeige einen <b>SQL-Injection-Payload</b> und die sichere Lösung mit <b>Prepared Statements</b>.</li>
            <li><b>d) (6 P.)</b> Ein Kunde verlangt nach <b>Art. 17 DSGVO</b> die sofortige Löschung aller seiner Daten. Im System existiert noch eine bezahlte Rechnung vom letzten Monat. Wie muss das System reagieren?</li>
          </ul>`,
          taskAr: `<p>اشرح آلية عمل تذاكر <b>Kerberos (AS / TGT / TGS)</b> ومخاطر <b>SSO</b>، وحدد أي مفتاح يُستخدم في <b>التوقيع الرقمي</b> وأيهما في <b>التشفير</b>، ثم صحّح ثغرة <b>SQL-Injection</b>، ووضّح كيف نتعامل مع طلب حذف حساب عميل لديه فاتورة خاضعة لمدة الحفظ القانونية.</p>`,
          rubric: [
            [7, 'Kerberos: AS prüft Anmeldung und stellt TGT aus; mit TGT holt Client beim TGS ein Service-Ticket für den Zielserver. SSO-Risiko: Single Point of Attack/Failure (Abhilfe: MFA + redundantes KDC)', 'شرح دور AS وTGT وTGS في Kerberos وتحديد خطر نقطة الهجوم/الفشل الواحدة في SSO'],
            [6, 'Signieren = Privater Schlüssel des Absenders (Prüfung mit öffentlichem Schlüssel des Absenders); Verschlüsseln = Öffentlicher Schlüssel des Empfängers (bzw. hybrider Session-Key)', 'تحديد المفتاح الخاص للمرسل للتوقيع والمفتاح العام للمستلم للتشفير'],
            [6, 'SQLi-Payload z. B. \' OR \'1\'=\'1; Abhilfe durch Prepared Statement mit Platzhalter ? (Trennung von Befehl und Daten)', 'كتابة مثال حقن SQL والحل عبر Prepared Statements'],
            [6, 'DSGVO Art. 17 vs. gesetzliche Aufbewahrungspflicht (HGB/AO 8–10 Jahre): Werbe-/Profildaten löschen, Rechnungsdaten für normale Nutzung sperren (Einschränkung der Verarbeitung) und erst nach Fristablauf löschen', 'الفصل بين حذف بيانات الملف الشخصي والتسويق وبين الاحتفاظ الإلزامي بالفاتورة مع تقييد معالجتها']
          ],
          solutionDe: `<p><b>a) Kerberos &amp; SSO:</b> Der Client authentisiert sich einmalig beim <b>Authentication Server (AS)</b> und erhält ein verschlüsseltes <b>Ticket Granting Ticket (TGT)</b>. Will er auf einen Dateiserver/Webdienst zugreifen, sendet er das TGT an den <b>Ticket Granting Server (TGS)</b> und erhält ein kurzlebiges <b>Service-Ticket</b>, ohne dass das Passwort erneut über das Netz geht. <i>Hauptrisiko SSO:</i> <b>Single Point of Attack</b> (wird das Hauptkonto kompromittiert, stehen alle Dienste offen → zwingend <b>MFA</b> aktivieren!).</p>
          <p><b>b) Signatur vs. Verschlüsselung:</b></p>
          <ul>
            <li><b>Digitale Signatur (Integrität &amp; Authentizität):</b> Hash des Dokuments wird mit dem <b>privaten Schlüssel des Absenders</b> signiert (Empfänger prüft mit dem <b>öffentlichen Schlüssel des Absenders</b>).</li>
            <li><b>Verschlüsselung (Vertraulichkeit):</b> Erfolgt hybrid (Nutzdaten symmetrisch mit AES-Session-Key, Session-Key asymmetrisch mit dem <b>öffentlichen Schlüssel des Empfängers</b> verschlüsselt).</li>
          </ul>
          <p><b>c) SQL-Injection &amp; Fix:</b> Payload <code>admin' OR '1'='1</code> macht die WHERE-Bedingung immer wahr. <b>Lösung:</b> Parametrisierte Abfrage (Prepared Statement): <code>SELECT * FROM Benutzer WHERE name = ?</code>.</p>
          <p><b>d) DSGVO-Löschkonzept:</b> Nach <b>Art. 17 Abs. 3 DSGVO</b> entfällt die sofortige Löschpflicht, soweit eine <b>gesetzliche Aufbewahrungspflicht</b> (z. B. 8/10 Jahre für Buchungsbelege nach HGB/AO) besteht. Nicht mehr benötigte Profil-/Marketingdaten werden sofort gelöscht; die Rechnungsdaten werden für andere Zwecke <b>gesperrt (Einschränkung der Verarbeitung)</b> und nach Ablauf der gesetzlichen Frist automatisiert gelöscht.</p>`,
          solutionAr: `<p><b>قاعدة لا تُنسى في التشفير:</b> التوقيع = <b>مفتاحي الخاص أنا المرسل</b> (لأثبت أنني من وقّع). التشفير = <b>المفتاح العام للمستلم</b> (كي لا يفتح الرسالة أحد غيره).</p>`
        },
        {
          id: 't1-c-4',
          title: 'Handlungsaufgabe 4: IPv4-Subnetting (/27), RAID vs. Backup & SLA-Rechnung',
          points: 25,
          type: 'free',
          lessonId: 'ip-subnetze',
          taskDe: `<p>Die Infrastruktur der Anwendung ist wie folgt geplant:</p>
          <ul>
            <li>Das Backend-Subnetz nutzt die IP-Adresse <b><code>192.168.50.100/27</code></b>.</li>
            <li>Der Datenbankserver verfügt über <b>4 SSDs à 4 TB im RAID-10-Verbund</b> (Alternativvorschlag: <b>RAID 5</b>).</li>
            <li>Im SLA wird eine Verfügbarkeit von <b>99,9 % bezogen auf ein Jahr (365 Tage × 24 Stunden)</b> vereinbart; außerdem gilt <b>RPO = 15 Minuten</b> und <b>RTO = 2 Stunden</b>.</li>
          </ul>
          <p><b>Teilaufgaben:</b></p>
          <ul>
            <li><b>a) (9 P.)</b> Berechne für <code>192.168.50.100/27</code> die <b>Subnetzmaske</b>, <b>Netzadresse</b>, <b>Broadcast-Adresse</b>, den <b>nutzbaren Hostbereich</b> und die <b>Anzahl nutzbarer Hosts</b>.</li>
            <li><b>b) (8 P.)</b> Berechne die <b>nutzbare Nettokapazität</b> und <b>Ausfalltoleranz</b> für 4×4 TB in <b>RAID 10</b> vs. <b>RAID 5</b> und begründe, warum ein nächtliches Vollbackup um 02:00 Uhr das geforderte <b>RPO = 15 Min.</b> nicht erfüllt.</li>
            <li><b>c) (8 P.)</b> Berechne die <b>maximal zulässige Ausfallzeit pro Jahr</b> bei <b>99,9 % SLA</b> in Stunden und Minuten.</li>
          </ul>`,
          taskAr: `<p>احسب بيانات الشبكة الفرعية <code>192.168.50.100/27</code> (القناع، عنوان الشبكة، البث، مجال المضيفين وعددهم)، ثم قارن سعة <b>RAID 10</b> و<b>RAID 5</b> لـ4 أقراص سعة 4 TB ووضّح لماذا لا يكفي النسخ الليلي لتحقيق <b>RPO = 15 دقيقة</b>، واحسب زمن التوقف المسموح سنوياً عند توافرية <b>99,9%</b>.</p>`,
          rubric: [
            [9, '/27 -> 5 Hostbits (Blockgröße 32), Maske 255.255.255.224; 100 liegt im Block 96..127 -> Netz .96, Broadcast .127, Hosts .97 bis .126 (30 nutzbare Hosts)', 'حساب قناع الشبكة وعنوان الشبكة .96 والبث .127 ومجال المضيفين (30 جهازاً)'],
            [8, '4×4 TB: RAID 10 = 8 TB (1–2 Platten je nach Spiegelpaar), RAID 5 = (4-1)×4 = 12 TB (genau 1 Platte); RPO 15 Min. verlangt Transaktionslog-Backup mindestens alle 15 Min. statt nur 24h-Vollbackup', 'حساب سعة RAID 10 (8 TB) وRAID 5 (12 TB) وتفسير متطلب RPO = 15 دقيقة'],
            [8, 'SLA 99,9 % -> 0,1 % Ausfall von 8.760 Std./Jahr = 8,76 Stunden = 8 Std. 45 Min. 36 Sek. (525,6 Minuten)', 'حساب زمن التوقف المسموح سنوياً: 8,76 ساعة (525,6 دقيقة)']
          ],
          solutionDe: `<p><b>a) Subnetting <code>192.168.50.100/27</code>:</b></p>
          <ul>
            <li>Hostbits: $32 - 27 = 5 \\Rightarrow 2^5 = 32$ Adressen pro Subnetz, <b>30 nutzbare Hosts</b> ($32 - 2$).</li>
            <li><b>Subnetzmaske:</b> <code>255.255.255.224</code> ($256 - 32 = 224$).</li>
            <li>Blöcke: $0..31, 32..63, 64..95, \\mathbf{96..127}$ (hier liegt die <code>.100</code>!).</li>
            <li><b>Netzadresse:</b> <code>192.168.50.96</code> · <b>Erster Host:</b> <code>.97</code> · <b>Letzter Host:</b> <code>.126</code> · <b>Broadcast:</b> <code>192.168.50.127</code>.</li>
          </ul>
          <p><b>b) RAID 10 vs. RAID 5 &amp; RPO:</b></p>
          <ul>
            <li><b>RAID 10 (4×4 TB):</b> Kapazität = $(4 / 2) \\times 4 = \\mathbf{8\\text{ TB}}$ (Toleranz: 1 Platte sicher, bis zu 2 Platten aus verschiedenen Spiegelpaaren).</li>
            <li><b>RAID 5 (4×4 TB):</b> Kapazität = $(4 - 1) \\times 4 = \\mathbf{12\\text{ TB}}$ (Toleranz: genau 1 Platte).</li>
            <li><b>RPO = 15 Min.:</b> Ein tägliches Backup um 02:00 Uhr kann im schlimmsten Fall zu fast <b>24 Stunden Datenverlust</b> führen. Für RPO = 15 Min. müssen zusätzlich mindestens alle 15 Minuten <b>inkrementelle Backups bzw. Datenbank-Transaktionslogs (WAL)</b> extern gesichert werden.</li>
          </ul>
          <p><b>c) SLA 99,9 % im Jahr:</b> Gesamtzeit = $365 \\times 24 = 8.760\\text{ Stunden}$. Erlaubte Ausfallquote = $100\\% - 99,9\\% = 0,1\\% = 0,001$.<br>
          Max. Ausfallzeit = $8.760 \\times 0,001 = \\mathbf{8,76\\text{ Stunden}} = \\mathbf{525,6\\text{ Minuten}}$ (8 Std. 45 Min. 36 Sek.).</p>`,
          solutionAr: `<p><b>طريقة سريعة لحساب أي شبكة فرعية في الامتحان:</b> اطرح البادئة من 32 ($32 - 27 = 5$)، احسب حجم الكتلة $2^5 = 32$، ثم ضاعف الرقم 32 ($0, 32, 64, 96, 128$) لتعرف فوراً في أي كتلة يقع عنوان الـIP المعطى!</p>`
        }
      ]
    }
  ];
})();

(() => {
  'use strict';
  const C = window.C || (t => '<pre><code>' + String(t).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') + '</code></pre>');

  window.COURSE.simulations.push(
    // =========================================================================
    // TEIL 2 · MODELL A (DIAGNOSE): Algorithmen & SQL von Grund auf schreiben
    // =========================================================================
    {
      id: 't2-a',
      part: 'Teil 2',
      stage: 'Modell A · Diagnose (Lösungen von Grund auf schreiben)',
      stageAr: 'النموذج A · تشخيصي (كتابة الكود والاستعلامات من الصفر)',
      title: 'Teil 2 · Modell A: 2D-Array, Gruppenwechsel, SQL (LEFT JOIN) & Normalisierung',
      titleAr: 'القسم الكتابي الثاني (نموذج A): مصفوفة 2D، كسر المجموعات، استعلامات SQL، والتطبيع 3NF',
      durationMin: 90,
      totalPoints: 100,
      desc: 'Schreibe vollständigen Pseudocode und SQL-Abfragen von Grund auf unter 90 Minuten Zeitdruck. Jede Aufgabe zeigt dir exakt, welcher Schritt wie viele Teilpunkte bringt.',
      ar: 'محاكاة تشخيصية للقسم الكتابي الثاني (90 دقيقة · 100 نقطة): كتابة خوارزمية المصفوفة ثنائية الأبعاد وكسر المجموعات واستعلامات SQL والتطبيع من الصفر.',
      tasks: [
        {
          id: 't2-a-1',
          title: 'Handlungsaufgabe 1: 2D-Array mit Index-Offset auswerten (Pseudocode)',
          points: 25,
          type: 'free',
          lessonId: 'algo-2d-gruppenwechsel',
          taskDe: `<p>Ein Freizeitpark speichert die stündlichen Besucherzahlen eines Jahres (365 Tage) im zweidimensionalen Array <code>visitors[365][10]</code>. Die erste Dimension steht für den Tag (Tag <code>1..365</code> entspricht Index <code>0..364</code>), die zweite Dimension für die Öffnungsstunde von <b>9:00 bis 18:00 Uhr</b> (Stunde <code>9..18</code> entspricht Spaltenindex <code>0..9</code>).</p>
          <ul>
            <li><b>a) (12 P.)</b> Schreibe eine Funktion <code>avgPerHour(hour: Integer, visitors: Integer[][]): Integer</code>, die für eine übergebene Uhrzeit (<code>9..18</code>) den auf eine ganze Zahl gerundeten <b>Durchschnitt über alle 365 Tage</b> zurückgibt. Ungültige Uhrzeiten außerhalb <code>9..18</code> sollen <code>-1</code> liefern.</li>
            <li><b>b) (13 P.)</b> Schreibe eine Funktion <code>peakDay(visitors: Integer[][]): Integer</code>, die die <b>Tagesnummer (<code>1..365</code>, nicht den 0-Index!)</b> mit der höchsten Tagesgesamtsumme über alle 10 Stunden ermittelt und zurückgibt.</li>
          </ul>`,
          taskAr: `<p>اكتب بالـ<b>Pseudocode</b> دالة <code>avgPerHour</code> لحساب متوسط الزوار لساعة معينة (من 9 إلى 18) عبر 365 يوماً مع مراعاة <b>إزاحة الفهرس (Offset)</b>، ودالة <code>peakDay</code> لإرجاع <b>رقم اليوم (1..365)</b> الأعلى ازدحاماً.</p>`,
          rubric: [
            [4, 'Teil a: Gültigkeitsprüfung für hour (< 9 ODER > 18 -> Rückgabe -1) und korrekte Spaltenberechnung col = hour - 9', 'فحص صلاحية الساعة وحساب إزاحة العمود col = hour - 9'],
            [8, 'Teil a: Schleife über 0..364, korrekte Summierung visitors[tag][hour - 9] und Gleitkommadivision summe / 365.0 mit Rundung', 'حلقة الأيام من 0 إلى 364 وجمع القيم والقسمة العشرية على 365.0'],
            [7, 'Teil b: Äußere Schleife über Tage (0..364), tagSumme = 0 VOR der inneren Schleife (0..9) initialisiert', 'تصفير مجموع اليوم tagSumme داخل الحلقة الخارجية وقبل الحلقة الداخلية'],
            [6, 'Teil b: Vergleich tagSumme > maxSumme und Rückgabe von maxTagIndex + 1 (Umrechnung auf 1..365!)', 'مقارنة المجموع الأعلى وإرجاع رقم اليوم بإضافة 1 (maxTag + 1)']
          ],
          solutionDe: C(`// a) Durchschnitt pro Öffnungsstunde (9..18 Uhr)
funktion avgPerHour(hour: Integer, visitors: Integer[][]): Integer
  wenn hour < 9 ODER hour > 18:
    rückgabe -1
  col = hour - 9
  summe = 0
  für tag = 0 bis 364:
    summe = summe + visitors[tag][col]
  rückgabe rundeAufGanzzahl(summe / 365.0)

// b) Tag (1..365) mit der höchsten Tagesgesamtsumme
funktion peakDay(visitors: Integer[][]): Integer
  maxSumme = -1
  besterTag = 1
  für tag = 0 bis 364:
    tagSumme = 0   // WICHTIG: Vor jedem neuen Tag auf 0 setzen!
    für spalte = 0 bis 9:
      tagSumme = tagSumme + visitors[tag][spalte]
    wenn tagSumme > maxSumme:
      maxSumme = tagSumme
      besterTag = tag + 1   // Offset zurück auf 1..365!
  rückgabe besterTag`),
          solutionAr: `<p><b>أهم ثلاث نقاط يفتش عنها المصحح:</b> 1) طرح 9 من الساعة <code>hour - 9</code>، 2) وضع <code>tagSumme = 0</code> داخل الحلقة الخارجية قبل الداخلية، 3) إعادة <code>tag + 1</code> لأن السؤال طلب رقم اليوم من 1 إلى 365 وليس الفهرس!</p>`,
          altSolutionDe: `<b>Alternative Lösung für Teil b:</b> Statt <code>maxSumme = -1</code> kann vor der Schleife die Summe von Tag 0 als Startwert für <code>maxSumme</code> berechnet werden und die äußere Schleife ab <code>tag = 1 bis 364</code> laufen.`,
          edgeTestHtml: `<table><thead><tr><th>Eingabe / Fall</th><th>Index-Zugriff</th><th>Fehler bei falscher Logik ❌</th><th>Korrektes Verhalten ✅</th></tr></thead><tbody><tr><td><code>hour = 9</code>, <code>tag = 1</code></td><td><code>visitors[0][0]</code></td><td><code>visitors[1][9]</code> (falscher Tag &amp; letzte Spalte!)</td><td><b>Exakt 1. Tag, 1. Öffnungsstunde</b></td></tr><tr><td><code>tagSumme = 0</code> außerhalb der Schleifen</td><td>Tag 2 addiert Tag 1 mit</td><td>Immer Tag 365 gewinnt!</td><td><b>Jeder Tag wird isoliert summiert</b></td></tr></tbody></table>`
        },
        {
          id: 't2-a-2',
          title: 'Handlungsaufgabe 2: Gruppenwechsel-Algorithmus von Grund auf schreiben',
          points: 25,
          type: 'free',
          lessonId: 'algo-2d-gruppenwechsel',
          taskDe: `<p>Ein Array <code>buchungen</code> enthält Objekte vom Typ <code>Buchung(filialeNr: Integer, umsatz: Float)</code> und ist bereits <b>aufsteigend nach <code>filialeNr</code> sortiert</b>.</p>
          <p>Schreibe eine Funktion <code>druckeFilialBericht(buchungen: Buchung[])</code> im Pseudocode, die:</p>
          <ol>
            <li>bei einer leeren Liste sofort <code>"Keine Buchungen"</code> ausgibt und beendet,</li>
            <li>für jede Filiale die <b>Anzahl der Buchungen</b> und die <b>Filialsumme</b> berechnet und beim Wechsel der <code>filialeNr</code> ausgibt,</li>
            <li>auch die <b>allerletzte Filiale</b> korrekt ausgibt und am Ende die <b>Gesamtsumme über alle Filialen</b> druckt.</li>
          </ol>`,
          taskAr: `<p>اكتب دالة <code>druckeFilialBericht(buchungen)</code> بالـ<b>Pseudocode</b> لتنفيذ خوارزمية <b>كسر المجموعة (Gruppenwechsel)</b> على مصفوفة مرتبة حسب <code>filialeNr</code>، بحيث تطبع عدد الحركات ومجموع كل فرع (بما فيه <b>الفرع الأخير</b>) ثم المجموع الكلي.</p>`,
          rubric: [
            [4, 'Randfall leere Liste (buchungen.length == 0) vor dem Zugriff auf buchungen[0] geprüft', 'فحص القائمة الفارغة قبل الوصول للعنصر الأول'],
            [6, 'aktFiliale = buchungen[0].filialeNr sowie filialSumme = 0, anzahl = 0 und gesamtSumme = 0 korrekt initialisiert', 'تهيئة مفتاح الفرع الحالي والعدادات والمجموع الكلي'],
            [8, 'In der Schleife: Bei buchungen[i].filialeNr != aktFiliale erst alte Filiale ausgeben, zu gesamtSumme addieren und Zähler zurücksetzen, danach aktuelles Element einrechnen', 'معالجة تغير الفرع داخل الحلقة: طباعة الفرع السابق وتحديث المجموع الكلي وتصفير العدادات'],
            [7, 'Nach Schleifenende: Letzte Filiale ausgeben, zu gesamtSumme addieren und Gesamtsumme ausgeben', 'طباعة الفرع الأخير بعد انتهاء الحلقة وإضافته للمجموع الكلي']
          ],
          solutionDe: C(`funktion druckeFilialBericht(buchungen: Buchung[])
  wenn buchungen == null ODER buchungen.length == 0:
    ausgabe("Keine Buchungen")
    rückgabe

  aktFiliale = buchungen[0].filialeNr
  filialSumme = 0.0
  anzahl = 0
  gesamtSumme = 0.0

  für i = 0 bis buchungen.length - 1:
    wenn buchungen[i].filialeNr != aktFiliale:
      // Gruppenwechsel: bisherige Filiale abschließen
      ausgabe("Filiale " + aktFiliale + ": " + anzahl + " Buchungen, Summe = " + filialSumme)
      gesamtSumme = gesamtSumme + filialSumme
      // Reset für neue Filiale
      aktFiliale = buchungen[i].filialeNr
      filialSumme = 0.0
      anzahl = 0

    // Aktuellen Datensatz zur laufenden Gruppe addieren
    filialSumme = filialSumme + buchungen[i].umsatz
    anzahl = anzahl + 1

  // NACHLAUF: Allerletzte Filiale nach der Schleife ausgeben!
  ausgabe("Filiale " + aktFiliale + ": " + anzahl + " Buchungen, Summe = " + filialSumme)
  gesamtSumme = gesamtSumme + filialSumme
  ausgabe("Gesamtsumme aller Filialen: " + gesamtSumme)`),
          solutionAr: `<p><b>احذر من الخطأ القاتل (Letzte-Gruppe-Bug):</b> بعد انتهاء الحلقة <code>für</code>، لا يوجد عنصر جديد يغير رقم الفرع، لذلك يجب نسخ سطري طباعة الفرع وإضافته للمجموع الكلي <b>بعد نهاية الحلقة مباشرة</b>.</p>`,
          altSolutionDe: `<b>Alternative mit geschachtelten while-Schleifen (ohne Code-Duplikat nach der Schleife):</b><br>` +
          C(`i = 0; gesamtSumme = 0.0
solange i < buchungen.length:
  aktFiliale = buchungen[i].filialeNr; filialSumme = 0.0; anzahl = 0
  solange i < buchungen.length UND buchungen[i].filialeNr == aktFiliale:
    filialSumme = filialSumme + buchungen[i].umsatz
    anzahl = anzahl + 1; i = i + 1
  ausgabe("Filiale " + aktFiliale + ": " + anzahl + ", Summe = " + filialSumme)
  gesamtSumme = gesamtSumme + filialSumme
ausgabe("Gesamtsumme: " + gesamtSumme)`),
          edgeTestHtml: `<table><thead><tr><th>Testdaten <code>buchungen</code></th><th>Erwartete Ausgabe</th></tr></thead><tbody><tr><td><code>[(F1, 100), (F1, 50), (F2, 200)]</code></td><td><code>Filiale 1: 2 Buchungen, Summe = 150</code><br><code>Filiale 2: 1 Buchungen, Summe = 200</code><br><code>Gesamtsumme: 350</code></td></tr><tr><td><code>[]</code> (Leer)</td><td><code>Keine Buchungen</code> (kein Absturz bei <code>buchungen[0]</code>!)</td></tr></tbody></table>`
        },
        {
          id: 't2-a-3',
          title: 'Handlungsaufgabe 3: 4 SQL-Abfragen (LEFT JOIN mit ON-Filter, GROUP BY/HAVING, Subquery)',
          points: 30,
          type: 'free',
          lessonId: 'sql-joins',
          taskDe: `<p>Gegeben ist folgendes Datenbankschema eines Online-Händlers:</p>
          <ul>
            <li><code>Kunde(<u>KundeID</u>, Name, Stadt)</code></li>
            <li><code>Bestellung(<u>BestellID</u>, KundeID, Bestelldatum, Status)</code> — <i>Status: <code>'bezahlt'</code>, <code>'offen'</code>, <code>'storniert'</code></i></li>
            <li><code>Position(<u>BestellID, ArtikelID</u>, Menge, Einzelpreis)</code></li>
            <li><code>Artikel(<u>ArtikelID</u>, Bezeichnung, Listenpreis)</code></li>
          </ul>
          <p>Schreibe vier SQL-Abfragen (Standard-SQL gemäß IHK-Belegsatz):</p>
          <ol>
            <li><b>a) (10 P.)</b> Gib für <b>jeden Kunden</b> (<code>KundeID, Name</code>) die Anzahl seiner <b>bezahlten</b> Bestellungen im Jahr <code>2025</code> aus. Kunden ohne bezahlte Bestellung in 2025 <b>müssen mit <code>0</code> in der Liste erscheinen</b>!</li>
            <li><b>b) (8 P.)</b> Ermittle alle <code>BestellID</code>s und deren Gesamtumsatz (<code>SUM(Menge * Einzelpreis)</code>), deren Gesamtumsatz <b>mindestens 1.000 €</b> beträgt, absteigend sortiert nach Umsatz.</li>
            <li><b>c) (6 P.)</b> Gib alle Artikel (<code>ArtikelID, Bezeichnung, Listenpreis</code>) aus, deren <code>Listenpreis</code> <b>höher als der durchschnittliche Listenpreis aller Artikel</b> ist.</li>
            <li><b>d) (6 P.)</b> Gib alle Kunden (<code>KundeID, Name</code>) aus, die <b>noch niemals irgendeine Bestellung</b> aufgegeben haben.</li>
          </ol>`,
          taskAr: `<p>اكتب 4 استعلامات <b>SQL</b>: أ) جميع العملاء مع عدد طلباتهم المدفوعة في 2025 (بما فيهم من رصيده <code>0</code>)، ب) الطلبات التي يتجاوز مجموعها 1000 €، ج) المنتجات الأغلى من متوسط الأسعار، د) العملاء الذين لم يطلبوا أبداً.</p>`,
          rubric: [
            [10, 'Abfrage a: LEFT JOIN von Kunde auf Bestellung mit b.Status = \'bezahlt\' UND YEAR(b.Bestelldatum) = 2025 in der ON-Klausel (!) + COUNT(b.BestellID) + GROUP BY k.KundeID, k.Name', 'استعلام a: استخدام LEFT JOIN ووضع شرط الدفع والسنة داخل ON مع COUNT(b.BestellID)'],
            [8, 'Abfrage b: SELECT BestellID, SUM(Menge * Einzelpreis) FROM Position GROUP BY BestellID HAVING SUM(Menge * Einzelpreis) >= 1000 ORDER BY ... DESC', 'استعلام b: حساب مجموع السطر واستخدام GROUP BY مع HAVING >= 1000'],
            [6, 'Abfrage c: WHERE Listenpreis > (SELECT AVG(Listenpreis) FROM Artikel)', 'استعلام c: مقارنة السعر باستعلام فرعي يحسب AVG(Listenpreis)'],
            [6, 'Abfrage d: LEFT JOIN ... WHERE b.BestellID IS NULL (oder WHERE NOT EXISTS (...))', 'استعلام d: إيجاد العملاء بلا طلبات عبر LEFT JOIN ... IS NULL أو NOT EXISTS']
          ],
          solutionDe: C(`-- a) Alle Kunden inkl. 0 bezahlte Bestellungen im Jahr 2025 (Filter zwingend in ON!)
SELECT k.KundeID, k.Name, COUNT(b.BestellID) AS AnzahlBezahlt2025
FROM Kunde k
LEFT JOIN Bestellung b
  ON b.KundeID = k.KundeID
 AND b.Status = 'bezahlt'
 AND YEAR(b.Bestelldatum) = 2025
GROUP BY k.KundeID, k.Name;

-- b) Bestellungen mit mindestens 1.000 € Gesamtumsatz
SELECT BestellID, SUM(Menge * Einzelpreis) AS Gesamtumsatz
FROM Position
GROUP BY BestellID
HAVING SUM(Menge * Einzelpreis) >= 1000
ORDER BY Gesamtumsatz DESC;

-- c) Artikel über dem Durchschnittspreis
SELECT ArtikelID, Bezeichnung, Listenpreis
FROM Artikel
WHERE Listenpreis > (SELECT AVG(Listenpreis) FROM Artikel);

-- d) Kunden ohne jede Bestellung
SELECT k.KundeID, k.Name
FROM Kunde k
LEFT JOIN Bestellung b ON b.KundeID = k.KundeID
WHERE b.BestellID IS NULL;`),
          solutionAr: `<p><b>انتبه لأهم فخين في a وd:</b> في <b>a)</b> استخدمنا <code>COUNT(b.BestellID)</code> وليس <code>COUNT(*)</code> لأن <code>COUNT(*)</code> يعدّ السطر الفارغ الناتج عن <code>LEFT JOIN</code> كأنه <code>1</code>! وفي <b>a)</b> وضعنا شرط <code>Status = 'bezahlt'</code> داخل <code>ON</code> كي لا يحذف <code>WHERE</code> العملاء الذين ليس لديهم طلب مدفوع.</p>`,
          altSolutionDe: C(`-- Alternative zu a) mit korrelierter Subquery im SELECT:
SELECT k.KundeID, k.Name,
       (SELECT COUNT(*) FROM Bestellung b
        WHERE b.KundeID = k.KundeID AND b.Status = 'bezahlt' AND YEAR(b.Bestelldatum) = 2025) AS AnzahlBezahlt2025
FROM Kunde k;

-- Alternative zu d) mit NOT EXISTS:
SELECT k.KundeID, k.Name FROM Kunde k
WHERE NOT EXISTS (SELECT 1 FROM Bestellung b WHERE b.KundeID = k.KundeID);`),
          edgeTestHtml: `<table><thead><tr><th>Kunde</th><th>Bestellungen in DB</th><th><code>COUNT(*)</code> bei LEFT JOIN ❌</th><th><code>COUNT(b.BestellID)</code> mit Filter in <code>ON</code> ✅</th></tr></thead><tbody><tr><td>1 · Schmidt</td><td>Keine Bestellung (NULL)</td><td>Liefert fälschlich <b>1</b>!</td><td>Liefert korrekt <b>0</b>!</td></tr><tr><td>2 · Weber</td><td>Nur 1 stornierte Bestellung</td><td>Mit WHERE-Filter: <i>Kunde fehlt komplett!</i></td><td>Mit ON-Filter: <b>Weber · 0</b></td></tr></tbody></table>`
        },
        {
          id: 't2-a-4',
          title: 'Handlungsaufgabe 4: Datenbank-Normalisierung (1NF → 2NF → 3NF)',
          points: 20,
          type: 'free',
          lessonId: 'normalisierung',
          taskDe: `<p>Eine unnormalisierte Tabelle <code>ProjektStunden</code> speichert Buchungen von Mitarbeitern auf Kundenprojekten:</p>
          <p><code>ProjektStunden(<u>ProjektNr, MitarbeiterNr</u>, ProjektName, KundenNr, KundenName, KundenOrt, MitarbeiterName, Stundensatz, GebuchteStunden)</code></p>
          <p><b>Fachliche Abhängigkeiten:</b></p>
          <ul>
            <li>Jedes Projekt (<code>ProjektNr</code>) gehört genau einem Kunden (<code>KundenNr</code>).</li>
            <li><code>KundenNr</code> bestimmt <code>KundenName</code> und <code>KundenOrt</code>.</li>
            <li><code>MitarbeiterNr</code> bestimmt <code>MitarbeiterName</code> und dessen festen <code>Stundensatz</code>.</li>
            <li><code>GebuchteStunden</code> fällt je Kombination aus <code>(ProjektNr, MitarbeiterNr)</code> an.</li>
          </ul>
          <p><b>Aufgaben:</b></p>
          <ul>
            <li><b>a) (6 P.)</b> Begründe, warum die Tabelle gegen die <b>2. Normalform (2NF)</b> und gegen die <b>3. Normalform (3NF)</b> verstößt, und nenne eine konkrete <b>Löschanomalie</b>.</li>
            <li><b>b) (14 P.)</b> Überführe die Tabelle vollständig in die <b>3. Normalform (3NF)</b> und kennzeichne in jeder Zieltabelle eindeutig alle <b>Primärschlüssel (<code>PK</code>)</b> und <b>Fremdschlüssel (<code>FK</code>)</b>.</li>
          </ul>`,
          taskAr: `<p>اشرح سبب مخالفة الجدول أعلاه للـ<b>2NF</b> والـ<b>3NF</b> مع ذكر مثال على <b>شذوذ الحذف (Löschanomalie)</b>، ثم فكّك الجدول إلى <b>الصيغة النظامية الثالثة (3NF)</b> مع تمييز <b>PK</b> و<b>FK</b> في كل جدول.</p>`,
          rubric: [
            [6, '2NF-Verstoß: ProjektName/KundenNr hängen nur von ProjektNr ab, MitarbeiterName/Stundensatz nur von MitarbeiterNr (partielle Abhängigkeit vom Teilschlüssel). 3NF-Verstoß: KundenName/KundenOrt hängen über KundenNr transitiv von ProjektNr ab. Löschanomalie benannt', 'تفسير مخالفة 2NF (اعتماد جزئي) و3NF (اعتماد انتقالي عبر KundenNr) وذكر شذوذ الحذف'],
            [14, '4 saubere 3NF-Tabellen mit exakten PK/FK: Kunde(KundenNr PK, KundenName, KundenOrt), Projekt(ProjektNr PK, ProjektName, KundenNr FK), Mitarbeiter(MitarbeiterNr PK, MitarbeiterName, Stundensatz), Projektbuchung(ProjektNr PK/FK, MitarbeiterNr PK/FK, GebuchteStunden)', 'كتابة الجداول الأربعة في 3NF مع تحديد جميع المفاتيح الأساسية PK والأجنبية FK بدقة']
          ],
          solutionDe: `<p><b>a) Verstöße &amp; Löschanomalie:</b></p>
          <ul>
            <li><b>Verstoß gegen 2NF (Partielle Abhängigkeit):</b> Der Primärschlüssel ist zusammengesetzt aus <code>(ProjektNr, MitarbeiterNr)</code>. <code>ProjektName</code> und <code>KundenNr</code> hängen aber nur von <code>ProjektNr</code> ab; <code>MitarbeiterName</code> und <code>Stundensatz</code> nur von <code>MitarbeiterNr</code>.</li>
            <li><b>Verstoß gegen 3NF (Transitive Abhängigkeit):</b> <code>KundenName</code> und <code>KundenOrt</code> hängen vom Nicht-Schlüsselattribut <code>KundenNr</code> ab (<code>ProjektNr → KundenNr → KundenName</code>).</li>
            <li><b>Löschanomalie:</b> Wird die einzige Stundenbuchung eines neuen Projekts gelöscht, gehen gleichzeitig die Stammdaten des Projekts und ggf. des Kunden komplett verloren!</li>
          </ul>
          <p><b>b) Relationenschema in 3NF:</b></p>` +
          C(`Kunde(KundenNr PK, KundenName, KundenOrt)
Projekt(ProjektNr PK, ProjektName, KundenNr FK)
Mitarbeiter(MitarbeiterNr PK, MitarbeiterName, Stundensatz)
Projektbuchung(ProjektNr PK/FK, MitarbeiterNr PK/FK, GebuchteStunden)`),
          solutionAr: `<p><b>قاعدة التطبيع الذهبية:</b> في <b>2NF</b> نفصل كل ما يعتمد على جزء واحد من المفتاح المركب (جدول للمشاريع وجدول للموظفين ويبقى جدول الساعات المشتركة)، وفي <b>3NF</b> نفصل بيانات العميل لأنها تعتمد على <code>KundenNr</code> وليس على المشروع مباشرة.</p>`
        }
      ]
    },

    // =========================================================================
    // TEIL 2 · MODELL B (NACH WIEDERHOLUNG): Code-Tracing, Bugfixing & SQL-Debug
    // =========================================================================
    {
      id: 't2-b',
      part: 'Teil 2',
      stage: 'Modell B · Nach Wiederholung (Code-Tracing & Bugfixing)',
      stageAr: 'النموذج B · بعد المراجعة (تتبع الكود وإصلاح الأخطاء)',
      title: 'Teil 2 · Modell B: Trace-Tabelle & 3 Bugs, Verkettete Liste/BST, SQL-Fehler & Chen-ER',
      titleAr: 'القسم الكتابي الثاني (نموذج B): تتبع وإصلاح 3 أخطاء برمجية، المؤشرات والأشجار، تصحيح SQL، ومخطط Chen-ER',
      durationMin: 90,
      totalPoints: 100,
      desc: 'In diesem Modell schreibst du nicht einfach neu, sondern spürst wie in echten IHK-Prüfungen versteckte Logik-, Index-, Zeiger- und SQL-Fehler anhand von Testdaten auf und korrigierst sie.',
      ar: 'يدربك هذا النموذج على نمط الأسئلة الثاني في الامتحان: تتبع كود يحتوي على أخطاء مخفية (Trace-Tabelle) واكتشاف سبب فشل استعلامات SQL وإصلاحها.',
      tasks: [
        {
          id: 't2-b-1',
          title: 'Handlungsaufgabe 1: Fehlerhaften Gruppenwechsel-Code verfolgen & 3 Bugs beheben',
          points: 25,
          type: 'free',
          lessonId: 'algo-2d-gruppenwechsel',
          taskDe: `<p>Die folgende Funktion soll für ein nach <code>monat</code> sortiertes Array <code>daten</code> (Typ: <code>monat: Integer, umsatz: Integer</code>) je Monat den <b>genauen Durchschnittsumsatz (als Kommazahl)</b> ausgeben. Der Code enthält <b>3 klassische Bugs</b>:</p>` +
          C(`01 funktion monatsSchnittFehlerhaft(daten: Datensatz[])
02   aktMonat = daten[0].monat
03   summe = 0
04   anzahl = 0
05   für i = 0 bis daten.length:          // Bug 1?
06     wenn daten[i].monat != aktMonat:
07       schnitt = summe / anzahl         // Bug 2: Integer-Division (summe, anzahl sind Integer)
08       ausgabe("Monat " + aktMonat + ": " + schnitt)
09       aktMonat = daten[i].monat
10       summe = 0
11       anzahl = 0
12     summe = summe + daten[i].umsatz
13     anzahl = anzahl + 1
14   // Ende der Funktion                 // Bug 3?`) +
          `<ul>
            <li><b>a) (10 P.)</b> Führe für die Eingabe <code>[(Monat 1, 10), (Monat 1, 15), (Monat 2, 30)]</code> einen <b>Schreibtischtest (Trace-Tabelle)</b> für <code>i = 0, 1, 2, 3</code> durch und zeige, was passiert.</li>
            <li><b>b) (15 P.)</b> Benenne alle <b>3 Fehler (inkl. Zeilennummer)</b> und schreibe den <b>vollständig korrigierten Pseudocode</b> (inkl. Schutz gegen ein leeres Array).</li>
          </ul>`,
          taskAr: `<p>نفّذ <b>جدول تتبع (Trace-Tabelle)</b> للكود المعطوب أعلاه على البيانات <code>[(1, 10), (1, 15), (2, 30)]</code>، ثم استخرج <b>الأخطاء الثلاثة</b> مع أرقام الأسطر واكتب الكود المصحح بالكامل.</p>`,
          rubric: [
            [10, 'Trace-Tabelle zeigt: i=0 (M1, summe=10, anz=1), i=1 (M1, summe=25, anz=2), i=2 (Wechsel zu M2 -> Ausgabe M1 mit 25/2 = 12 statt 12.5, danach M2: summe=30, anz=1), i=3 (ArrayIndexOutOfBoundsException! Und M2 wurde nie ausgegeben!)', 'جدول التتبع يوضح ضياع الكسر العشري في الشهر 1، وعدم طباعة الشهر 2، وخطأ الخروج عن حدود المصفوفة عند i=3'],
            [5, 'Bug 1 (Zeile 05): Schleife läuft bis daten.length statt daten.length - 1 (Off-by-One) + Prüfung auf daten.length == 0 vor Zeile 02 fehlt', 'اكتشاف خطأ حدود الحلقة i <= daten.length وغياب فحص المصفوفة الفارغة'],
            [5, 'Bug 2 (Zeile 07): Ganzzahldivision summe / anzahl schneidet Nachkommastellen ab (25 / 2 = 12 statt 12,5) -> 1.0 * summe / anzahl', 'اكتشاف خطأ القسمة الصحيحة Integer-Division وتصحيحه إلى قسمة عشرية'],
            [5, 'Bug 3 (Zeile 14): Letzte-Gruppe-Bug! Nach der Schleife fehlt die Ausgabe für den letzten Monat (Monat 2)', 'اكتشاف خطأ إهمال المجموعة الأخيرة بعد انتهاء الحلقة وإصلاحه']
          ],
          solutionDe: `<p><b>a) Schreibtischtest (Trace-Tabelle):</b></p>
          <table>
            <thead><tr><th>Durchlauf <code>i</code></th><th><code>daten[i]</code></th><th><code>aktMonat</code></th><th><code>summe</code></th><th><code>anzahl</code></th><th>Ausgabe / Ereignis</th></tr></thead>
            <tbody>
              <tr><td><code>i = 0</code></td><td>(1, 10)</td><td>1</td><td>10</td><td>1</td><td>—</td></tr>
              <tr><td><code>i = 1</code></td><td>(1, 15)</td><td>1</td><td>25</td><td>2</td><td>—</td></tr>
              <tr><td><code>i = 2</code></td><td>(2, 30)</td><td>1 → 2</td><td>30</td><td>1</td><td><code>Monat 1: 12</code> (<b>Fehler:</b> 12 statt 12.5 wegen Integer-Division!)</td></tr>
              <tr><td><code>i = 3</code></td><td><i>existiert nicht!</i></td><td>2</td><td>30</td><td>1</td><td><b>Absturz: <code>IndexOutOfBounds</code> bei <code>daten[3]</code>!</b> (Und Monat 2 wurde nie ausgegeben!)</td></tr>
            </tbody>
          </table>
          <p><b>b) Korrigierter Pseudocode:</b></p>` +
          C(`funktion monatsSchnittKorrekt(daten: Datensatz[])
  wenn daten == null ODER daten.length == 0:
    rückgabe
  aktMonat = daten[0].monat
  summe = 0
  anzahl = 0
  für i = 0 bis daten.length - 1:     // Fix 1: length - 1
    wenn daten[i].monat != aktMonat:
      schnitt = (1.0 * summe) / anzahl // Fix 2: Gleitkommadivision
      ausgabe("Monat " + aktMonat + ": " + schnitt)
      aktMonat = daten[i].monat
      summe = 0
      anzahl = 0
    summe = summe + daten[i].umsatz
    anzahl = anzahl + 1

  // Fix 3: Letzte Gruppe nach der Schleife ausgeben!
  schnitt = (1.0 * summe) / anzahl
  ausgabe("Monat " + aktMonat + ": " + schnitt)`),
          solutionAr: `<p><b>هذه الأخطاء الثلاثة هي الأكثر تكراراً في أسئلة تتبع الكود (Teil 2):</b> 1) <code>bis length</code> بدلاً من <code>length - 1</code>، 2) قسمة عددين صحيحين <code>summe / anzahl</code> تضيع الفواصل، 3) نسيان طباعة المجموعة الأخيرة بعد الحلقة.</p>`,
          edgeTestHtml: `<table><thead><tr><th>Bug</th><th>Fehlerhafte Zeile</th><th>Korrektur</th></tr></thead><tbody><tr><td>1. Off-by-One</td><td><code>für i = 0 bis daten.length</code></td><td><b><code>für i = 0 bis daten.length - 1</code></b></td></tr><tr><td>2. Integer-Division</td><td><code>summe / anzahl</code> (25/2 = 12)</td><td><b><code>(1.0 * summe) / anzahl</code> (25.0/2 = 12.5)</b></td></tr><tr><td>3. Letzte-Gruppe-Bug</td><td>Keine Ausgabe nach Zeile 13</td><td><b>Ausgabe-Block nach der Schleife ergänzen</b></td></tr></tbody></table>`
        },
        {
          id: 't2-b-2',
          title: 'Handlungsaufgabe 2: Zeigerverlust in Verketteter Liste & Binärbaum (BST) debuggen',
          points: 25,
          type: 'free',
          lessonId: 'datenstrukturen-baeume-listen',
          taskDe: `<p><b>Teil 1 (Verkettete Liste):</b> Ein Entwickler möchte einen neuen Knoten <code>neu</code> am Anfang einer einfach verketteten Liste (<code>kopf</code>) einfügen und schreibt:</p>` +
          C(`funktion vorneEinfuegenFehlerhaft(kopf: Knoten, neu: Knoten): Knoten
  kopf = neu
  neu.naechster = kopf
  rückgabe kopf`) +
          `<p><b>Teil 2 (Binärer Suchbaum — BST):</b> Ein Binärer Suchbaum enthält die Wurzel <code>50</code>, links <code>30</code> (mit Kindern <code>20</code> und <code>40</code>) und rechts <code>70</code> (mit linkem Kind <code>60</code>).</p>
          <ul>
            <li><b>a) (10 P.)</b> Erkläre genau, welcher <b>Zeigerfehler</b> in <code>vorneEinfuegenFehlerhaft</code> passiert, was beim anschließenden Durchlaufen der Liste geschieht, und gib den <b>korrekten Code</b> an.</li>
            <li><b>b) (7 P.)</b> Gib für den beschriebenen Binären Suchbaum die exakte Ausgabereihenfolge bei <b>Inorder-Traversierung (L-W-R)</b> und bei <b>Preorder-Traversierung (W-L-R)</b> an.</li>
            <li><b>c) (8 P.)</b> Schreibe die Funktion <code>sucheBST(knoten: BSTKnoten, ziel: Integer): Boolean</code> im Pseudocode.</li>
          </ul>`,
          taskAr: `<p>اشرح خطأ <b>فقدان المؤشر (Zeigerverlust)</b> في دالة الإدراج في بداية القائمة المترابطة وصحّحها، ثم اكتب ناتج اجتياز شجرة البحث الثنائية <b>BST</b> بطريقتي <b>Inorder</b> و<b>Preorder</b>، واكتب دالة البحث في الشجرة.</p>`,
          rubric: [
            [10, 'Zeigerfehler erklärt: Durch kopf = neu wird die Referenz auf das bisherige erste Element überschrieben; neu.naechster = kopf lässt neu auf sich selbst zeigen (Endlosschleife + Restliste im Speicher verloren!). Korrektur: Erst neu.naechster = kopf, dann kopf = neu', 'شرح كيف تضيع بقية القائمة وتنشأ حلقة لا نهائية على العقدة نفسها وتصحيح ترتيب السطرين'],
            [7, 'Inorder (L-W-R): 20, 30, 40, 50, 60, 70 (aufsteigend sortiert!); Preorder (W-L-R): 50, 30, 20, 40, 70, 60', 'كتابة تسلسل Inorder المرتب تصاعدياً وتسلسل Preorder بشكل صحيح'],
            [8, 'sucheBST: Basisfall knoten == null -> false; knoten.wert == ziel -> true; ziel < knoten.wert -> suche links, sonst rechts', 'كتابة دالة البحث في BST مع شرط التوقف عند null والمقارنة يسار/يمين']
          ],
          solutionDe: `<p><b>a) Analyse des Zeigerverlusts (Pointer Bug):</b></p>
          <ul>
            <li>Durch Zeile <code>kopf = neu</code> geht der Zeiger auf das bisherige erste Listenelement <b>sofort verloren</b>.</li>
            <li>Anschließend setzt <code>neu.naechster = kopf</code> den Nachfolgerzeiger von <code>neu</code> <b>auf <code>neu</code> selbst</b> (Zyklus / Endlosschleife beim Durchlaufen!).</li>
            <li><b>Korrekte Reihenfolge:</b></li>
          </ul>` +
          C(`funktion vorneEinfuegenKorrekt(kopf: Knoten, neu: Knoten): Knoten
  neu.naechster = kopf   // 1. Alten Kopf als Nachfolger sichern!
  kopf = neu             // 2. Erst danach Kopfzeiger auf neu umbiegen!
  rückgabe kopf`) +
          `<p><b>b) Traversierungen des BST:</b></p>
          <ul>
            <li><b>Inorder (Links – Wurzel – Rechts):</b> <code>20, 30, 40, 50, 60, 70</code> (liefert bei einem BST <b>immer</b> die aufsteigend sortierte Folge!).</li>
            <li><b>Preorder (Wurzel – Links – Rechts):</b> <code>50, 30, 20, 40, 70, 60</code>.</li>
          </ul>
          <p><b>c) Suche im Binären Suchbaum:</b></p>` +
          C(`funktion sucheBST(knoten: BSTKnoten, ziel: Integer): Boolean
  solange knoten != null:
    wenn ziel == knoten.wert:
      rückgabe wahr
    sonst wenn ziel < knoten.wert:
      knoten = knoten.links
    sonst:
      knoten = knoten.rechts
  rückgabe falsch`),
          solutionAr: `<p><b>القاعدة الذهبية في القوائم المترابطة:</b> دائماً <b>اربط العقدة الجديدة بالقديمة أولاً (<code>neu.naechster = kopf</code>)</b> قبل أن تغيّر مؤشر الرأس <code>kopf</code>!</p>`
        },
        {
          id: 't2-b-3',
          title: 'Handlungsaufgabe 3: 3 fehlerhafte SQL-Abfragen anhand von Testdaten reparieren',
          points: 30,
          type: 'free',
          lessonId: 'sql-joins',
          taskDe: `<p>Gegeben sind folgende Beispieldaten:</p>
          <ul>
            <li><code>Kunde</code>: <code>(1, 'Ada')</code>, <code>(2, 'Bilal')</code></li>
            <li><code>Bestellung</code>: <code>(10, Kunde 1, Gesamtbetrag 100 €, Status 'bezahlt')</code>, <code>(11, Kunde 2, Gesamtbetrag 50 €, Status 'offen')</code></li>
            <li><code>Position</code> zu Bestellung 10: <code>(Pos 1: 40 €)</code>, <code>(Pos 2: 60 €)</code></li>
          </ul>
          <p>Analysiere und korrigiere folgende <b>3 fehlerhafte SQL-Abfragen</b>:</p>
          <ol>
            <li><b>Abfrage 1 (soll ALLE Kunden mit Anzahl bezahlter Bestellungen zeigen, Bilal also mit 0):</b><br>
            <code>SELECT k.Name, COUNT(*) FROM Kunde k LEFT JOIN Bestellung b ON b.KundeID = k.KundeID WHERE b.Status = 'bezahlt' GROUP BY k.KundeID, k.Name;</code><br>
            <b>(12 P.)</b> Welche zwei Fehler stecken hier drin, was liefert die Abfrage für Bilal, und wie lautet das korrekte SQL?</li>
            <li><b>Abfrage 2 (soll den Bestell-Gesamtbetrag von Ada summieren):</b><br>
            <code>SELECT k.Name, SUM(b.Gesamtbetrag) FROM Kunde k JOIN Bestellung b ON b.KundeID = k.KundeID JOIN Position p ON p.BestellID = b.BestellID GROUP BY k.KundeID, k.Name;</code><br>
            <b>(10 P.)</b> Welchen Euro-Betrag liefert diese Abfrage für Ada fälschlicherweise (statt 100 €) und warum? Wie korrigierst du sie?</li>
            <li><b>Abfrage 3 (soll Kunden finden, die in keiner Filiale aus einer Unterabfrage betreut werden):</b><br>
            <code>SELECT * FROM Kunde WHERE BetreuerID NOT IN (SELECT ChefID FROM Abteilung);</code><br>
            <b>(8 P.)</b> Was passiert, wenn in <code>Abteilung.ChefID</code> ein einziger <code>NULL</code>-Wert steht, und wie lautet die sichere Lösung?</li>
          </ol>`,
          taskAr: `<p>حلّل الأخطاء الثلاثة في استعلامات SQL أعلاه بالاعتماد على البيانات المعطاة: 1) لماذا يختفي Bilal ولماذا <code>COUNT(*)</code> خاطئة؟ 2) لماذا يتضاعف مبلغ Ada عند ربط جدول التفاصيل؟ 3) لماذا يُرجع <code>NOT IN</code> صفراً من الصفوف عند وجود <code>NULL</code>؟ ثم اكتب الاستعلامات المصححة.</p>`,
          rubric: [
            [12, 'Abfrage 1: (1) WHERE b.Status = \'bezahlt\' vernichtet die NULL-Zeile von Bilal aus dem LEFT JOIN -> muss in ON! (2) COUNT(*) zählt die NULL-Zeile als 1 -> muss COUNT(b.BestellID) lauten', 'تحديد الخطأين في الاستعلام الأول: نقل الشرط إلى ON واستبدال COUNT(*) بـCOUNT(b.BestellID)'],
            [10, 'Abfrage 2: Liefert für Ada 200 € statt 100 €, weil Bestellung 10 durch die 2 Positionen im JOIN verdoppelt wird und b.Gesamtbetrag zweimal addiert wird. Korrektur: Entweder Position-Join weglassen oder SUM(p.Positionsbetrag) summieren', 'تفسير تضاعف المجموع إلى 200 € بسبب تكرار رأس الطلب مع كل سطر تفصيلي وتصحيح الاستعلام'],
            [8, 'Abfrage 3: Sobald die Unterabfrage bei NOT IN ein NULL enthält, wird x <> NULL zu UNKNOWN und die gesamte Abfrage liefert 0 Zeilen! Korrektur: NOT EXISTS oder WHERE ChefID IS NOT NULL in der Subquery', 'تفسير مشكلة NULL مع NOT IN وكتابة الحل الآمن باستخدام NOT EXISTS']
          ],
          solutionDe: `<p><b>1. Korrektur zu Abfrage 1:</b></p>
          <ul>
            <li><b>Fehler A:</b> <code>WHERE b.Status = 'bezahlt'</code> filtert nach dem Join und löscht Bilal komplett aus dem Ergebnis.</li>
            <li><b>Fehler B:</b> Selbst mit Bedingung in <code>ON</code> würde <code>COUNT(*)</code> für Bilals leere Zeile <code>1</code> statt <code>0</code> zählen!</li>
          </ul>` +
          C(`SELECT k.Name, COUNT(b.BestellID) AS AnzahlBezahlt
FROM Kunde k
LEFT JOIN Bestellung b
  ON b.KundeID = k.KundeID AND b.Status = 'bezahlt'
GROUP BY k.KundeID, k.Name;`) +
          `<p><b>2. Korrektur zu Abfrage 2 (Fan-Trap / Doppelzählung):</b> Da Bestellung 10 zwei Positionen hat, erzeugt der Join <b>zwei Zeilen</b> für Bestellung 10. <code>SUM(b.Gesamtbetrag)</code> rechnet $100 + 100 = \\mathbf{200\\text{ €}}$ statt $100\\text{ €}$! <b>Lösung:</b> Entweder direkt auf <code>Bestellung</code> ohne Positions-Join summieren oder die Positionswerte <code>SUM(p.Menge * p.Einzelpreis)</code> addieren.</p>
          <p><b>3. Korrektur zu Abfrage 3 (NOT IN + NULL Falle):</b> Enthält die Unterabfrage <code>NULL</code>, ergibt <code>BetreuerID NOT IN (1, 2, NULL)</code> logisch <code>UNKNOWN</code> → es werden <b>0 Zeilen</b> zurückgegeben! <b>Lösung:</b></p>` +
          C(`SELECT k.* FROM Kunde k
WHERE NOT EXISTS (
  SELECT 1 FROM Abteilung a WHERE a.ChefID = k.BetreuerID
);`),
          solutionAr: `<p><b>ثلاثة فخاخ SQL امتحانية في تمرين واحد:</b> 1) <code>LEFT JOIN</code> + شرط في <code>ON</code> + <code>COUNT(b.id)</code>، 2) لا تجمع عموداً من جدول الرأس بعد ربطه بجدول التفاصيل، 3) استبدل <code>NOT IN</code> دائماً بـ<code>NOT EXISTS</code> لتجنب فخ <code>NULL</code>.</p>`,
          edgeTestHtml: `<table><thead><tr><th>Abfrage-Variante</th><th>Ergebnis für Ada</th><th>Ergebnis für Bilal</th></tr></thead><tbody><tr><td>Fehlerhaft 1 (<code>WHERE b.Status='bezahlt'</code>)</td><td>Ada · 1</td><td><i>Bilal fehlt komplett!</i> ❌</td></tr><tr><td>Halb-Korrektur (<code>ON ...</code> aber <code>COUNT(*)</code>)</td><td>Ada · 1</td><td>Bilal · <b>1</b> (falsch!) ❌</td></tr><tr><td>Korrekt (<code>ON ...</code> und <code>COUNT(b.BestellID)</code>)</td><td><b>Ada · 1</b> ✅</td><td><b>Bilal · 0</b> ✅</td></tr></tbody></table>`
        },
        {
          id: 't2-b-4',
          title: 'Handlungsaufgabe 4: Chen-ER-Diagramm prüfen & in Relationen überführen',
          points: 20,
          type: 'free',
          lessonId: 'er-modell',
          taskDe: `<p>In einem Krankenhaus-ER-Modell (<b>Chen-Notation</b>) gelten folgende Regeln:</p>
          <ol>
            <li>Ein <code>Arzt</code> (<code><u>ArztID</u>, Name</code>) kann mehrere andere Ärzte als Oberarzt anleiten; jeder Assistenzarzt hat höchstens einen anleitenden Oberarzt.</li>
            <li>Ein <code>Arzt</code> behandelt viele <code>Patienten</code> (<code><u>PatientID</u>, Name</code>), und ein <code>Patient</code> wird im Laufe seines Aufenthalts von mehreren <code>Ärzten</code> behandelt. Bei jeder Behandlung werden <code>Behandlungsdatum</code> und <code>Diagnose</code> erfasst.</li>
          </ol>
          <p><b>Aufgaben:</b></p>
          <ul>
            <li><b>a) (10 P.)</b> Ein Azubi hat das Attribut-Oval <code>Diagnose</code> an das Rechteck <code>Patient</code> gehängt und die Beziehung <code>leitet_an</code> zwischen zwei getrennten Rechtecken <code>Arzt_1</code> und <code>Arzt_2</code> gezeichnet. Korrigiere beide Fehler nach <b>Chen-Notation</b>!</li>
            <li><b>b) (10 P.)</b> Überführe das korrigierte Modell in das vollständige <b>Relationenschema (Tabellen mit <code>PK</code> und <code>FK</code>)</b>, sodass derselbe Arzt denselben Patienten auch an <b>mehreren verschiedenen Tagen</b> behandeln kann.</li>
          </ul>`,
          taskAr: `<p>صحّح الخطأين في مخطط <b>Chen-ER</b> (مكان ربط شكل البيضوي <code>Diagnose</code> وكيفية رسم العلاقة الذاتية <code>leitet_an</code> للطبيب)، ثم حوّل المخطط إلى <b>جداول علائقية (PK/FK)</b> تسمح بمعالجة نفس المريض من نفس الطبيب في تواريخ متعددة.</p>`,
          rubric: [
            [5, 'Chen-Korrektur 1: Diagnose und Behandlungsdatum sind Beziehungsattribute der m:n-Beziehung und müssen als Ovale direkt an der Raute „behandelt“ hängen', 'ربط صفتي التشخيص والتاريخ بالمعين (Raute) مباشرة كصفات علاقة'],
            [5, 'Chen-Korrektur 2: Nur EIN Entitätstyp-Rechteck „Arzt“ mit einer rekursiven Beziehungsraute „leitet_an“, die über zwei Linien (Rollen: 1 Oberarzt, n Assistenzärzte) mit demselben Rechteck verbunden ist', 'رسم العلاقة الذاتية بمستطيل واحد Arzt ومعين واحد يرتبط به بخطين (1 وn)'],
            [10, 'Relationenschema: Arzt(ArztID PK, Name, OberarztID FK), Patient(PatientID PK, Name), Behandlung(ArztID PK/FK, PatientID PK/FK, Behandlungsdatum PK, Diagnose) [oder BehandlungsID PK]', 'كتابة الجداول الثلاثة مع المفتاح الأجنبي الذاتي OberarztID وإدراج التاريخ ضمن المفتاح المركب لجدول العلاج']
          ],
          solutionDe: `<p><b>a) Korrektur der Chen-Notation:</b></p>
          <ul>
            <li><b>Beziehungsattribute an die Raute:</b> Da ein Patient mehrere Behandlungen mit unterschiedlichen Diagnosen erhält, dürfen <code>Diagnose</code> und <code>Behandlungsdatum</code> nicht am Rechteck <code>Patient</code> hängen, sondern müssen als <b>Ovale direkt an der m:n-Beziehungsraute <code>behandelt</code></b> angeschlossen werden.</li>
            <li><b>Rekursive Beziehung (Selbstbeziehung):</b> Es gibt nur <b>ein einziges Rechteck <code>Arzt</code></b>. Die Raute <code>leitet_an</code> wird über <b>zwei Verbindungslinien</b> mit demselben Rechteck <code>Arzt</code> verbunden (Kardinalität <code>1</code> an der Linie „Oberarzt“ und <code>n</code> an der Linie „Assistenzarzt“).</li>
          </ul>
          <p><b>b) Vollständiges Relationenschema:</b></p>` +
          C(`Arzt(ArztID PK, Name, OberarztID FK)   -- OberarztID verweist auf Arzt.ArztID (kann NULL sein)
Patient(PatientID PK, Name)
Behandlung(ArztID PK/FK, PatientID PK/FK, Behandlungsdatum PK, Diagnose)
-- Alternativ: Behandlung(BehandlungsID PK, ArztID FK, PatientID FK, Behandlungsdatum, Diagnose)`),
          solutionAr: `<p><b>انتبه للمفتاح الأساسي في جدول كسر العلاقة <code>Behandlung</code>:</b> لو جعلت المفتاح <code>(ArztID, PatientID)</code> فقط، فلن يستطيع الطبيب معالجة نفس المريض مرة ثانية في يوم آخر! لذلك نضيف <b><code>Behandlungsdatum</code> كجزء ثالث من المفتاح الأساسي المركب</b> (أو ننشئ <code>BehandlungsID PK</code> مستقل).</p>`
        }
      ]
    },

    // =========================================================================
    // TEIL 2 · MODELL C (VOR DER PRÜFUNG): Transfer, OOP, Binäre Suche & ACID
    // =========================================================================
    {
      id: 't2-c',
      part: 'Teil 2',
      stage: 'Modell C · Generalprobe (Anspruchsvoller Transfer)',
      stageAr: 'النموذج C · البروفة النهائية (تطبيق متقدم ودمج مهارات)',
      title: 'Teil 2 · Modell C: Binäre Suche & Sortieren, OOP Observer-Code, SQL-Archivierung & DDL',
      titleAr: 'القسم الكتابي الثاني (نموذج C): البحث الثنائي والترتيب، برمجة Observer، أرشفة SQL بمعاملة، وقيود DDL',
      durationMin: 90,
      totalPoints: 100,
      desc: 'Generalprobe auf höchstem IHK-Prüfungsniveau: Binäre Suche inkl. Trace-Tabelle, vollständige OOP-Implementierung im Pseudocode, SQL-Selbst-Join & Transaktions-Archivierung sowie DDL-Constraints.',
      ar: 'نموذج البروفة النهائية للقسم الثاني: يجمع البحث الثنائي مع جدول التتبع، والبرمجة الكائنية، واستعلامات الأرشفة داخل المعاملات، وقيود قواعد البيانات.',
      tasks: [
        {
          id: 't2-c-1',
          title: 'Handlungsaufgabe 1: Binäre Suche implementieren, verfolgen & Laufzeit vergleichen',
          points: 25,
          type: 'free',
          lessonId: 'suchen-sortieren',
          taskDe: `<p>Ein aufsteigend sortiertes Array <code>artikelPreise = [12, 18, 25, 34, 42, 56, 70]</code> (Indizes <code>0..6</code>) soll nach dem Zielwert <b><code>56</code></b> durchsucht werden.</p>
          <ul>
            <li><b>a) (12 P.)</b> Schreibe die Funktion <code>binaereSuche(arr: Integer[], ziel: Integer): Integer</code> im Pseudocode, die den gefundenen Index oder <code>-1</code> zurückgibt.</li>
            <li><b>b) (8 P.)</b> Fülle die <b>Trace-Tabelle</b> für die Suche nach <code>ziel = 56</code> im obigen Array aus (Spalten: <code>Schritt</code>, <code>links</code>, <code>rechts</code>, <code>mitte</code>, <code>arr[mitte]</code>).</li>
            <li><b>c) (5 P.)</b> Warum hat die Binäre Suche eine Laufzeit von $\\mathcal{O}(\\log n)$, und wann ist eine einfache lineare Suche $\\mathcal{O}(n)$ trotzdem schneller?</li>
          </ul>`,
          taskAr: `<p>اكتب دالة <b>البحث الثنائي (<code>binaereSuche</code>)</b> بالـ<b>Pseudocode</b>، ثم املأ <b>جدول التتبع (Trace-Tabelle)</b> للبحث عن القيمة <code>56</code> في المصفوفة المعطاة، وقارن تعقيد الوقت $\\mathcal{O}(\\log n)$ بالبحث الخطي $\\mathcal{O}(n)$.</p>`,
          rubric: [
            [12, 'Pseudocode: links = 0, rechts = arr.length - 1, solange links <= rechts, mitte = (links + rechts) DIV 2, Vergleich ==, < (links = mitte + 1), > (rechts = mitte - 1), Rückgabe -1 nach Schleife', 'كتابة كود البحث الثنائي كاملاً مع تحديث الحدود mitte + 1 وmitte - 1'],
            [8, 'Trace-Tabelle: 1. Schritt links=0, rechts=6, mitte=3 (Wert 34 < 56 -> links=4); 2. Schritt links=4, rechts=6, mitte=5 (Wert 56 == 56 -> Treffer Index 5!)', 'تتبع الدورتين بدقة حتى إيجاد العنصر في الفهرس 5'],
            [5, 'O(log n) da Suchraum in jedem Schritt halbiert wird; lineare Suche ist schneller, wenn das Array unsortiert ist und nur einmalig gesucht wird (Sortieraufwand O(n log n) bzw. O(n²) entfällt)', 'شرح سبب O(log n) ومتى يتفوق البحث الخطي على مصفوفة غير مرتبة']
          ],
          solutionDe: `<p><b>a) Pseudocode Binäre Suche:</b></p>` +
          C(`funktion binaereSuche(arr: Integer[], ziel: Integer): Integer
  links = 0
  rechts = arr.length - 1
  solange links <= rechts:
    mitte = (links + rechts) DIV 2   // Ganzzahldivision
    wenn arr[mitte] == ziel:
      rückgabe mitte
    sonst wenn arr[mitte] < ziel:
      links = mitte + 1
    sonst:
      rechts = mitte - 1
  rückgabe -1`) +
          `<p><b>b) Trace-Tabelle für <code>ziel = 56</code> in <code>[12, 18, 25, 34, 42, 56, 70]</code>:</b></p>
          <table>
            <thead><tr><th>Schritt</th><th><code>links</code></th><th><code>rechts</code></th><th><code>mitte</code></th><th><code>arr[mitte]</code></th><th>Entscheidung</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>0</td><td>6</td><td>3</td><td>34</td><td>$34 &lt; 56 \\Rightarrow \\text{links} = 3 + 1 = 4$</td></tr>
              <tr><td>2</td><td>4</td><td>6</td><td>5</td><td>56</td><td>$56 == 56 \\Rightarrow \\mathbf{\\text{Treffer! Rückgabe Index } 5}$</td></tr>
            </tbody>
          </table>
          <p><b>c) Komplexitätsvergleich:</b> Da jeder Vergleich den verbleibenden Suchbereich <b>halbiert</b>, benötigt die Binäre Suche maximal $\\lceil \\log_2(n) \\rceil$ Schritte ($\\mathcal{O}(\\log n)$). Ist eine Liste jedoch <b>unsortiert</b> und wird nur ein einziges Mal durchsucht, ist die lineare Suche ($\\mathcal{O}(n)$) schneller als erst für $\\mathcal{O}(n \\log n)$ zu sortieren.</p>`,
          solutionAr: `<p><b>انتبه في البحث الثنائي:</b> كتابة <code>links = mitte</code> بدلاً من <code>links = mitte + 1</code> تسبب <b>حلقة لا نهائية (Endlosschleife)</b> عندما يبقى عنصران فقط!</p>`
        },
        {
          id: 't2-c-2',
          title: 'Handlungsaufgabe 2: OOP & Observer-Pattern im Pseudocode implementieren',
          points: 25,
          type: 'free',
          lessonId: 'oop',
          taskDe: `<p>Ein Lagerbestandssystem (<code>LagerArtikel</code>) verwaltet die aktuelle <code>menge: Integer</code>. Sobald durch <code>entnehmen(anzahl: Integer)</code> der Bestand unter den <code>mindestBestand: Integer</code> fällt, sollen alle registrierten Dienste (z. B. <code>EinkaufsModul</code>, <code>SlackAlarm</code>) automatisch über das Interface <code>BestandsBeobachter</code> informiert werden.</p>
          <ul>
            <li><b>a) (8 P.)</b> Definiere das Interface <code>BestandsBeobachter</code> mit der Methode <code>warnung(artikelNr: Integer, restMenge: Integer): void</code> und eine konkrete Klasse <code>EinkaufsModul</code>.</li>
            <li><b>b) (17 P.)</b> Implementiere die Klasse <code>LagerArtikel</code> vollständig mit privater Beobachterliste, <code>registriere(b)</code>, <code>benachrichtigeAlle()</code> und <code>entnehmen(anzahl: Integer): Boolean</code> (wirft keinen negativen Bestand zu, sondern gibt bei unzureichendem Bestand <code>false</code> zurück!).</li>
          </ul>`,
          taskAr: `<p>نفّذ بالـ<b>Pseudocode</b> الكائني نمط المراقب <b>Observer Pattern</b> لنظام المخزون: اكتب الواجهة <code>BestandsBeobachter</code> وصنف <code>LagerArtikel</code> مع قائمة المراقبين ودالة السحب <code>entnehmen</code> التي ترفض السحب إذا كانت الكمية غير كافية وتطلق الإشعار التلقائي عند النزول تحت الحد الأدنى.</p>`,
          rubric: [
            [8, 'Interface BestandsBeobachter + implementierende Klasse EinkaufsModul sauber definiert', 'تعريف الواجهة BestandsBeobachter والصنف المنفذ لها'],
            [7, 'Klasse LagerArtikel: private Attribute (artikelNr, menge, mindestBestand, beobachterListe: Liste<BestandsBeobachter>) + registriere() + Schleife in benachrichtigeAlle()', 'كتابة خصائص الصنف ودالة التسجيل وحلقة التكرار في benachrichtigeAlle()'],
            [10, 'Methode entnehmen(anzahl): Prüft anzahl <= 0 oder anzahl > menge (-> false), zieht Anzahl ab, prüft menge < mindestBestand -> ruft benachrichtigeAlle() auf, gibt true zurück', 'كتابة منطق دالة السحب مع منع الرصيد السالب وإطلاق الإشعار عند النزول تحت الحد الأدنى']
          ],
          solutionDe: C(`interface BestandsBeobachter:
  + warnung(artikelNr: Integer, restMenge: Integer): void

klasse EinkaufsModul implementiert BestandsBeobachter:
  + warnung(artikelNr: Integer, restMenge: Integer): void
    ausgabe("Nachbestellung prüfen für Artikel " + artikelNr + " (Rest: " + restMenge + ")")

klasse LagerArtikel:
  - artikelNr: Integer
  - menge: Integer
  - mindestBestand: Integer
  - beobachter: Liste<BestandsBeobachter> = neue Liste()

  + konstruktor(nr: Integer, startMenge: Integer, min: Integer):
    this.artikelNr = nr
    this.menge = startMenge
    this.mindestBestand = min

  + registriere(b: BestandsBeobachter): void
    this.beobachter.hinzufuegen(b)

  + benachrichtigeAlle(): void
    für jeden b in this.beobachter:
      b.warnung(this.artikelNr, this.menge)

  + entnehmen(anzahl: Integer): Boolean
    wenn anzahl <= 0 ODER anzahl > this.menge:
      rückgabe falsch
    this.menge = this.menge - anzahl
    wenn this.menge < this.mindestBestand:
      this.benachrichtigeAlle()
    rückgabe wahr`),
          solutionAr: `<p><b>نقاط القوة في هذا الحل:</b> يجمع بين <b>حماية حالة الكائن (Kapselung — منع الرصيد السالب)</b> وبين <b>فك الارتباط (Lose Kopplung عبر الواجهة <code>BestandsBeobachter</code>)</b>.</p>`
        },
        {
          id: 't2-c-3',
          title: 'Handlungsaufgabe 3: SQL-Selbst-Join, ACID-Archivierung & Trigger vs. Prozedur',
          points: 30,
          type: 'free',
          lessonId: 'sql-belegsatz-profi',
          taskDe: `<p>Gegeben sind die Tabellen <code>Mitarbeiter(<u>PersNr</u>, Name, VorgesetzterNr)</code> und <code>Ticket(<u>TicketID</u>, PersNr, ErstelltAm, Status)</code> sowie eine baugleiche Tabelle <code>Ticket_Archiv</code>.</p>
          <ul>
            <li><b>a) (10 P.)</b> Schreibe eine SQL-Abfrage, die <b>alle Mitarbeiter</b> (<code>Name</code>) zusammen mit dem <b>Namen ihres direkten Vorgesetzten</b> ausgibt. Auch die Geschäftsführerin (die <code>VorgesetzterNr IS NULL</code> hat) muss im Ergebnis erscheinen!</li>
            <li><b>b) (12 P.)</b> Alle Tickets mit <code>Status = 'geschlossen'</code> und einem <code>ErstelltAm</code>-Datum vor dem <code>'2024-01-01'</code> sollen revisionssicher in <code>Ticket_Archiv</code> kopiert und aus <code>Ticket</code> gelöscht werden. Schreibe die vollständigen SQL-Befehle inkl. <b>Transaktionsklammer</b> und erkläre, welche <b>ACID-Eigenschaft</b> hier Datenverlust verhindert.</li>
            <li><b>c) (8 P.)</b> Grenze eine <b>Stored Procedure</b> von einem <b>Datenbank-Trigger</b> hinsichtlich Aufruf und typischem Einsatzzweck ab.</li>
          </ul>`,
          taskAr: `<p>اكتب استعلام <b>الربط الذاتي (Self-Join)</b> لإظهار كل موظف مع اسم مديره (بما فيهم المديرة العامة التي لا مدير لها)، ثم اكتب أوامر أرشفة وحذف التذاكر القديمة داخل <b>معاملة (Transaction)</b>، وفرّق بين <b>Stored Procedure</b> و<b>Trigger</b>.</p>`,
          rubric: [
            [10, 'Selbst-Join mit LEFT JOIN: SELECT m.Name AS Mitarbeiter, v.Name AS Vorgesetzter FROM Mitarbeiter m LEFT JOIN Mitarbeiter v ON m.VorgesetzterNr = v.PersNr;', 'كتابة الربط الذاتي باستخدام LEFT JOIN وأسماء مستعارة مختلفة m وv'],
            [12, 'START TRANSACTION / BEGIN; INSERT INTO Ticket_Archiv (...) SELECT ... FROM Ticket WHERE Status=\'geschlossen\' AND ErstelltAm < \'2024-01-01\'; DELETE FROM Ticket WHERE ...; COMMIT; + Atomarität (Atomicity: ganz oder gar nicht)', 'كتابة أوامر الأرشفة والحذف بنفس شرط WHERE داخل معاملة وشرح خاصية الذرية Atomicity'],
            [8, 'Stored Procedure wird explizit aufgerufen (CALL proc(), mit Parametern); Trigger wird automatisch durch ein DML-Ereignis (INSERT/UPDATE/DELETE) von der DB ausgelöst (z. B. Audit-Log)', 'التفريق الدقيق بين الإجراء المخزن (يُستدعى يدوياً) والـTrigger (يعمل تلقائياً عند حدث DML)']
          ],
          solutionDe: C(`-- a) Selbst-Join inkl. Geschäftsführung ohne Vorgesetzten (LEFT JOIN!)
SELECT m.Name AS Mitarbeiter, v.Name AS Vorgesetzter
FROM Mitarbeiter m
LEFT JOIN Mitarbeiter v ON m.VorgesetzterNr = v.PersNr;

-- b) Revisionssichere Archivierung in einer Transaktion
START TRANSACTION;

INSERT INTO Ticket_Archiv (TicketID, PersNr, ErstelltAm, Status)
SELECT TicketID, PersNr, ErstelltAm, Status
FROM Ticket
WHERE Status = 'geschlossen' AND ErstelltAm < '2024-01-01';

DELETE FROM Ticket
WHERE Status = 'geschlossen' AND ErstelltAm < '2024-01-01';

COMMIT;`),
          solutionAr: `<p><b>لماذا نستخدم LEFT JOIN في الربط الذاتي (a)؟</b> لو استخدمت <code>INNER JOIN</code> لاختفت المديرة العامة لأن <code>VorgesetzterNr</code> لديها <code>NULL</code>! ولماذا نضع الأرشفة في <b>Transaktion</b>؟ لتحقيق <b>الذرية (Atomicity)</b>: إما أن ينجح النسخ والحذف معاً أو يتم التراجع <code>ROLLBACK</code> عنهما معاً.</p>`
        },
        {
          id: 't2-c-4',
          title: 'Handlungsaufgabe 4: SQL DDL-Constraints & Relationale DB vs. NoSQL',
          points: 20,
          type: 'free',
          lessonId: 'sql-schreiben',
          taskDe: `<ul>
            <li><b>a) (12 P.)</b> Schreibe den vollständigen SQL-Befehl <code>CREATE TABLE Abonnement</code> mit folgenden Regeln:
              <ul>
                <li><code>AboID</code>: Ganzzahl, Primärschlüssel.</li>
                <li><code>KundeID</code>: Ganzzahl, Pflichtfeld, Fremdschlüssel auf <code>Kunde(KundeID)</code>; ein Kunde darf nicht gelöscht werden, solange ein Abonnement existiert.</li>
                <li><code>Monatspreis</code>: Dezimalzahl <code>DECIMAL(8,2)</code>, Pflichtfeld, darf <b>nicht negativ</b> sein.</li>
                <li><code>TarifCode</code>: Zeichenkette <code>VARCHAR(20)</code>, Pflichtfeld, Standardwert <code>'BASIS'</code>.</li>
              </ul>
            </li>
            <li><b>b) (8 P.)</b> Das Team überlegt, für <b>Finanzbuchungen</b> statt der relationalen Datenbank einen <b>Key-Value- bzw. Dokumentenspeicher (NoSQL)</b> ohne mehrzeilige ACID-Transaktionen zu nutzen, während für <b>kurzlebige Warenkorb-Sessions</b> ebenfalls ein Speicher gesucht wird. Beurteile beide Einsatzfälle fachlich.</li>
          </ul>`,
          taskAr: `<p>اكتب أمر <code>CREATE TABLE Abonnement</code> مع قيود <code>PRIMARY KEY</code> و<code>FOREIGN KEY ... ON DELETE RESTRICT</code> و<code>NOT NULL</code> و<code>CHECK</code> و<code>DEFAULT</code>، ثم قيّم متى نختار قاعدة بيانات علائقية <b>SQL (ACID)</b> ومتى نختار <b>NoSQL</b>.</p>`,
          rubric: [
            [12, 'CREATE TABLE Abonnement mit PRIMARY KEY, NOT NULL, DEFAULT \'BASIS\', CHECK (Monatspreis >= 0) und FOREIGN KEY (KundeID) REFERENCES Kunde(KundeID) ON DELETE RESTRICT', 'كتابة أمر إنشاء الجدول بجميع القيود الخمسة بشكل صحيح'],
            [8, 'Finanzbuchungen brauchen zwingend relationale Integrität und ACID-Transaktionen; für kurzlebige Sessions/Warenkörbe mit schnellem Schlüsselzugriff oder flexiblen Produktattributen ist ein Key-Value-/Dokumentenspeicher (NoSQL) ideal', 'تبرير اختيار قاعدة علائقية للمدفوعات المالية وNoSQL لجلسات سلة التسوق السريعة']
          ],
          solutionDe: C(`CREATE TABLE Abonnement (
  AboID INTEGER PRIMARY KEY,
  KundeID INTEGER NOT NULL,
  Monatspreis DECIMAL(8,2) NOT NULL CHECK (Monatspreis >= 0),
  TarifCode VARCHAR(20) NOT NULL DEFAULT 'BASIS',
  FOREIGN KEY (KundeID) REFERENCES Kunde(KundeID) ON DELETE RESTRICT
);`) +
          `<p><b>b) Relationale DB vs. NoSQL:</b> Für <b>Finanzbuchungen</b> sind strikte Schemaprüfung, <b>referenzielle Integrität</b> und <b>ACID-Transaktionen</b> unverzichtbar (relationale DB). Für <b>kurzlebige Benutzersitzungen (Session-Cache)</b> mit extrem schnellem Zugriff über die <code>SessionID</code> und automatischem Ablauf (TTL) eignet sich dagegen ein <b>Key-Value-Store (z. B. Redis)</b> hervorragend.</p>`,
          solutionAr: `<p><b>احفظ صياغة منع حذف الأب في SQL:</b> <code>ON DELETE RESTRICT</code> (أو <code>NO ACTION</code>) تمنع حذف العميل طالما يملك اشتراكاً فعالاً، بينما <code>ON DELETE CASCADE</code> تحذف اشتراكاته تلقائياً معه (خطير جداً في الفواتير المالية!).</p>`
        }
      ]
    }
  );
})();

(() => {
  'use strict';
  window.COURSE.simulations.push(
    // =========================================================================
    // WISO · MODELL A (DIAGNOSE): Alle 5 Aufgabentypen (MC, Order, Match, Calc, Table)
    // =========================================================================
    {
      id: 'wiso-a',
      part: 'WiSo',
      stage: 'Modell A · Diagnose (Alle 5 IHK-Aufgabentypen)',
      stageAr: 'النموذج A · تشخيصي (اختيار، ترتيب، مطابقة، حساب، وجداول)',
      title: 'WiSo · Modell A: Ausbildung, Kündigung, Rechtsformen, Kalkulation & Markttabelle',
      titleAr: 'قسم WiSo (نموذج A): التدريب، الفصل، الشركات، حسابات التسعير، وجدول توازن السوق',
      durationMin: 60,
      totalPoints: 100,
      desc: 'Echte WiSo-Vielfalt unter 60 Minuten Zeitlimit: Multiple-Choice, Reihenfolge-Aufgaben, Zuordnungs-Matrizen, Rechenkästchen und Tabellenauswertung.',
      ar: 'محاكاة كاملة لامتحان WiSo (60 دقيقة · 100 نقطة) تجمع الأنواع الخمسة للأسئلة: الاختيار، الترتيب الزمني، المطابقة، صناديق الحساب، وقراءة الجداول.',
      tasks: [
        {
          id: 'wiso-a-1',
          title: 'Aufgabe 1 (Multiple-Choice · 10 P.): Berufsausbildungsverhältnis nach BBiG',
          points: 10,
          type: 'mc',
          lessonId: 'ausbildung',
          taskDe: `<p>Welche <b>zwei Aussagen</b> zum Berufsausbildungsverhältnis nach dem <b>Berufsbildungsgesetz (BBiG)</b> sind rechtlich zutreffend? <i>(Wähle genau 2 Optionen)</i></p>`,
          taskAr: `<p>أي <b>عبارتين</b> مما يلي صحيحتان قانونياً حول عقد التدريب المهني وفق قانون <b>BBiG</b>؟</p>`,
          options: [
            '1. Die Probezeit im Ausbildungsverhältnis muss mindestens 1 Monat und darf höchstens 4 Monate betragen (§ 20 BBiG).',
            '2. Während der Probezeit gilt für beide Seiten eine Kündigungsfrist von 4 Wochen zum Monatsende.',
            '3. Nach Ablauf der Probezeit kann der Ausbildungsbetrieb ordentlich mit 4 Wochen Frist kündigen, wenn die Auftragslage sinkt.',
            '4. Für den Arbeitstag unmittelbar vor der schriftlichen Abschlussprüfung ist der Auszubildende unter Fortzahlung der Vergütung freizustellen (§ 15 BBiG).',
            '5. Vorgeschriebene Werkzeuge und Ausbildungsmittel muss der Auszubildende zur Hälfte selbst bezahlen.'
          ],
          correct: [0, 3],
          rubric: [
            [5, 'Aussage 1 gewählt: Ausbildungsprobezeit beträgt zwingend 1 bis 4 Monate (§ 20 BBiG)', 'اختيار العبارة 1: فترة التجربة في التدريب من شهر إلى 4 أشهر'],
            [5, 'Aussage 4 gewählt: Bezahlte Freistellung am Arbeitstag unmittelbar vor der schriftlichen Abschlussprüfung (§ 15 BBiG)', 'اختيار العبارة 4: الإعفاء المدفوع في يوم العمل السابق مباشرة للامتحان التحريري']
          ],
          solutionDe: `<p><b>Richtig sind 1 und 4:</b> Nach <b>§ 20 BBiG</b> dauert die Probezeit <b>1 bis 4 Monate</b> (währenddessen ist die Kündigung jederzeit <b>ohne Frist</b> möglich, daher ist 2 falsch). Nach der Probezeit kann der Betrieb nur noch <b>fristlos aus wichtigem Grund</b> kündigen (§ 22 BBiG, daher ist 3 falsch). Nach <b>§ 15 BBiG</b> besteht Anspruch auf bezahlte Freistellung am Tag vor der schriftlichen Prüfung. Ausbildungsmittel stellt der Betrieb kostenlos (§ 14 BBiG).</p>`,
          solutionAr: `<p><b>انتبه للفخ الدائم:</b> فترة التجربة للمتدرب هي <b>1 إلى 4 أشهر</b> (وليس 6 أشهر كالموظف العادي!)، وخلالها يكون الفصل <b>فوراً بدون مهلة</b>.</p>`
        },
        {
          id: 'wiso-a-2',
          title: 'Aufgabe 2 (Reihenfolge · 12 P.): Gerichtliches Mahnverfahren & Vollstreckung',
          points: 12,
          type: 'order',
          lessonId: 'vertraege',
          taskDe: `<p>Ein gewerblicher Kunde zahlt eine fällige Software-Rechnung trotz außergerichtlicher Mahnung nicht. Bringe die Schritte des <b>gerichtlichen Mahn- und Vollstreckungsverfahrens</b> in die <b>chronologisch richtige Reihenfolge (1 bis 5)</b>:</p>`,
          taskAr: `<p>رتّب خطوات <b>إجراءات المطالبة القضائية والتنفيذ الجبري (Gerichtliches Mahnverfahren)</b> ترتيباً زمنياً صحيحاً من 1 إلى 5:</p>`,
          steps: [
            '1. Eintritt des Zahlungsverzugs nach Fälligkeit / erfolgloser Mahnung',
            '2. Antrag auf Erlass eines gerichtlichen Mahnbescheids beim zentralen Mahngericht',
            '3. Zustellung des Mahnbescheids (Schuldner hat 2 Wochen Frist für Widerspruch)',
            '4. Antrag auf Erlass des Vollstreckungsbescheids (Vollstreckungstitel, 2 Wochen Einspruchsfrist)',
            '5. Beauftragung des Gerichtsvollziehers zur Zwangsvollstreckung (Pfändung)'
          ],
          rubric: [
            [6, 'Reihenfolge Zahlungsverzug -> Mahnbescheid beantragen -> Zustellung (2 Wochen Widerspruch) korrekt', 'ترتيب حدوث التأخر ثم طلب قرار الدفع القضائي وتبليغه'],
            [6, 'Reihenfolge Vollstreckungsbescheid (Titel) -> Zwangsvollstreckung durch Gerichtsvollzieher korrekt', 'ترتيب قرار التنفيذ ثم إجراءات الحجز عبر المحضر القضائي']
          ],
          solutionDe: `<p><b>Exakte Reihenfolge:</b> <b>1. Zahlungsverzug</b> → <b>2. Antrag Mahnbescheid</b> (hemmt die Verjährung!) → <b>3. Zustellung Mahnbescheid</b> (2 Wochen für <i>Widerspruch</i>) → <b>4. Vollstreckungsbescheid</b> (2 Wochen für <i>Einspruch</i>) → <b>5. Zwangsvollstreckung</b>.</p>`,
          solutionAr: `<p><b>احفظ الترتيب والكلمتين المفتاحيتين:</b> ضد الـ<b>Mahnbescheid</b> يقدم المدين اعتراضاً اسمه <b>Widerspruch</b>، وضد الـ<b>Vollstreckungsbescheid</b> يقدم طعناً اسمه <b>Einspruch</b>.</p>`
        },
        {
          id: 'wiso-a-3',
          title: 'Aufgabe 3 (Zuordnung · 15 P.): Rechtsformen nach Haftung & Mindestkapital',
          points: 15,
          type: 'match',
          lessonId: 'rechtsformen',
          taskDe: `<p>Ordne jeder <b>Rechtsform</b> die exakt passende <b>Haftungs- und Kapitalregel</b> zu:</p>`,
          taskAr: `<p>طابق كل <b>شكل قانوني للشركة (Rechtsform)</b> مع قاعدة <b>المسؤولية المالية والحد الأدنى لرأس المال</b> الخاصة به:</p>`,
          pairs: [
            ['Einzelunternehmen (e. K.)', 'Kein Mindestkapital; Inhaber haftet unbeschränkt mit Betriebs- und Privatvermögen'],
            ['OHG (Offene Handelsgesellschaft)', 'Mind. 2 Gesellschafter; alle haften unbeschränkt, unmittelbar und solidarisch (gesamtschuldnerisch)'],
            ['KG (Kommanditgesellschaft)', 'Mind. 1 Komplementär (Vollhafter, unbeschränkt) und mind. 1 Kommanditist (Teilhafter, nur bis zur Haftsumme)'],
            ['GmbH', 'Mindeststammkapital 25.000 € (mind. 12.500 € Einzahlung); Haftung auf das Gesellschaftsvermögen beschränkt'],
            ['AG (Aktiengesellschaft)', 'Mindestgrundkapital 50.000 € zerlegt in Aktien; Leitung durch Vorstand, Kontrolle durch Aufsichtsrat']
          ],
          rubric: [
            [9, 'Personengesellschaften (Einzelunternehmen, OHG, KG mit Komplementär/Kommanditist) richtig zugeordnet', 'مطابقة شركات الأشخاص (المؤسسة الفردية، OHG، وKG) بشكل صحيح'],
            [6, 'Kapitalgesellschaften (GmbH: 25.000 € Stammkapital; AG: 50.000 € Grundkapital) richtig zugeordnet', 'مطابقة شركات الأموال (GmbH بـ25.000 € وAG بـ50.000 €) بشكل صحيح']
          ],
          solutionDe: `<p><b>Prüfungs-Merkhilfe:</b> Bei <b>GmbH</b> heißt das Kapital <b>Stammkapital (mind. 25.000 €)</b>, bei der <b>AG</b> heißt es <b>Grundkapital (mind. 50.000 €)</b>. In der <b>KG</b> haftet der <b>Komplementär</b> voll mit Privatvermögen, der <b>Kommanditist</b> nur mit seiner Einlage.</p>`,
          solutionAr: `<p><b>لا تخلط أبداً بين شريكي KG:</b> الـ<b>Komplementär</b> يدير الشركة ومسؤوليته غير محدودة بأمواله الخاصة، بينما الـ<b>Kommanditist</b> يكتفي بالتمويل ومسؤوليته محدودة بحصته فقط.</p>`
        },
        {
          id: 'wiso-a-4',
          title: 'Aufgabe 4 (Rechenkästchen · 12 P.): Bezugskalkulation im Einkauf',
          points: 12,
          type: 'calc',
          lessonId: 'bwl-rechnen',
          taskDe: `<p>Ein Systemhaus beschafft Server-Komponenten zu folgenden Konditionen (alle Werte netto):</p>
          <ul>
            <li><b>Listeneinkaufspreis:</b> <code>8.000,00 €</code></li>
            <li><b>Liefererrabatt:</b> <code>15 %</code></li>
            <li><b>Liefererskonto:</b> <code>2 %</code></li>
            <li><b>Bezugskosten (Fracht &amp; Transportversicherung):</b> <code>136,00 €</code></li>
          </ul>
          <p>Berechne den <b>Bezugspreis (Einstandspreis)</b> in Euro:</p>`,
          taskAr: `<p>احسب <b>سعر الشراء النهائي (Bezugspreis)</b> باليورو: سعر القائمة <code>8.000 €</code>، خصم تجاري <code>15%</code>، خصم تعجيل الدفع <code>2%</code>، وتكاليف شحن <code>136 €</code>:</p>`,
          expected: '6800',
          unit: '€',
          acceptedAnswers: ['6800', '6800,00', '6.800', '6.800,00'],
          rubric: [
            [4, 'Zieleinkaufspreis = 8.000 € − 15 % (1.200 €) = 6.800,00 €', 'حساب السعر بعد الخصم التجاري Zieleinkaufspreis = 6.800 €'],
            [4, 'Bareinkaufspreis = 6.800 € − 2 % Skonto (136 €) = 6.664,00 € (Skonto vom Zielpreis, nicht vom Listenpreis!)', 'حساب السعر النقدي بطرح 2% Skonto من الـ6.800 € = 6.664 €'],
            [4, 'Bezugspreis = 6.664,00 € + 136,00 € Bezugskosten = 6.800,00 €', 'إضافة تكاليف الشحن 136 € للوصول إلى 6.800,00 €']
          ],
          solutionDe: `<p><b>Schrittweiser Rechenweg:</b></p>
          <ol>
            <li><b>Listeneinkaufspreis:</b> <code>8.000,00 €</code></li>
            <li>$-$ 15 % Liefererrabatt (<code>1.200,00 €</code>) = <b>Zieleinkaufspreis: <code>6.800,00 €</code></b></li>
            <li>$-$ 2 % Liefererskonto von 6.800 € (<code>136,00 €</code>) = <b>Bareinkaufspreis: <code>6.664,00 €</code></b></li>
            <li>$+$ Bezugskosten (<code>136,00 €</code>) = <b>Bezugspreis: <code>6.800,00 €</code></b></li>
          </ol>`,
          solutionAr: `<p><b>الفخ الأشهر في حسابات WiSo:</b> لا تجمع نسبتي Rabatt وSkonto ($15\\% + 2\\% = 17\\%$ خطأ!)؛ بل يُحسب <b>Skonto</b> دائماً من الـ<b>Zieleinkaufspreis</b> بعد طرح الـRabatt!</p>`
        },
        {
          id: 'wiso-a-5',
          title: 'Aufgabe 5 (Rechenkästchen · 12 P.): Sozialversicherungsbeitrag mit BBG',
          points: 12,
          type: 'calc',
          lessonId: 'sozialversicherung',
          taskDe: `<p>Eine Senior-Entwicklerin verdient monatlich <b>6.400,00 € brutto</b>. Für die gesetzliche Krankenversicherung gelten in dieser Aufgabe folgende vorgegebene Werte:</p>
          <ul>
            <li><b>Beitragsbemessungsgrenze (BBG):</b> <code>5.000,00 € / Monat</code></li>
            <li><b>Allgemeiner Beitragssatz:</b> <code>14,6 %</code> (hälftig getragen)</li>
            <li><b>Kassenindividueller Zusatzbeitrag:</b> <code>2,4 %</code> (ebenfalls hälftig getragen)</li>
          </ul>
          <p>Berechne den monatlichen <b>Arbeitnehmeranteil zur Krankenversicherung</b> in Euro:</p>`,
          taskAr: `<p>مطورة راتبها الإجمالي <code>6.400 €</code>، وسقف حساب الاشتراك <b>BBG</b> هو <code>5.000 €</code>، ونسبة التأمين الصحي العامة <code>14,6%</code> + الإضافية <code>2,4%</code> (تُدفع مناصفةً). احسب <b>حصة الموظفة الشهرية</b> باليورو:</p>`,
          expected: '425',
          unit: '€',
          acceptedAnswers: ['425', '425,00', '425.00'],
          rubric: [
            [4, 'Bemessungsgrundlage auf BBG gekappt: min(6.400 €, 5.000 €) = 5.000,00 €', 'تطبيق سقف الاشتراك BBG = 5.000 € بدلاً من الراتب الكامل'],
            [4, 'Arbeitnehmer-Prozentsatz: (14,6 % + 2,4 %) / 2 = 17,0 % / 2 = 8,5 %', 'حساب نسبة الموظفة (نصف الـ17% = 8,5%)'],
            [4, 'Monatsbeitrag AN = 5.000 € × 8,5 % = 425,00 €', 'حساب المبلغ النهائي: 5.000 × 0,085 = 425,00 €']
          ],
          solutionDe: `<p><b>Rechenweg:</b></p>
          <ol>
            <li>Da das Bruttogehalt (6.400 €) über der <b>Beitragsbemessungsgrenze (5.000 €)</b> liegt, werden maximal <b>5.000,00 €</b> verbeitragt.</li>
            <li>Gesamtbeitragssatz = $14,6\\% + 2,4\\% = 17,0\\%$. Davon trägt die Arbeitnehmerin die Hälfte: $\\mathbf{8,5\\%}$.</li>
            <li>Arbeitnehmerbeitrag = $5.000,00\\text{ €} \\times 0,085 = \\mathbf{425,00\\text{ €}}$.</li>
          </ol>`,
          solutionAr: `<p><b>قاعدة BBG الحاسمة:</b> أي يورو يتجاوز سقف <b>Beitragsbemessungsgrenze</b> يُعفى من حساب الاشتراك؛ لذلك نضرب النسبة في <b>5.000 €</b> وليس في 6.400 €!</p>`
        },
        {
          id: 'wiso-a-6',
          title: 'Aufgabe 6 (Tabellenauswertung · 15 P.): Marktpreisbildung & Gleichgewichtspreis',
          points: 15,
          type: 'table',
          lessonId: 'markt-konjunktur',
          taskDe: `<p>Für ein IT-Standardmodul wurden folgende Angebots- und Nachfragemengen je Preisstufe ermittelt:</p>
          <table>
            <thead><tr><th>Preis je Lizenz (€)</th><th>Angebotene Menge (Stück)</th><th>Nachgefragte Menge (Stück)</th></tr></thead>
            <tbody>
              <tr><td><b>20 €</b></td><td>1.000</td><td>4.200</td></tr>
              <tr><td><b>30 €</b></td><td>2.000</td><td>3.200</td></tr>
              <tr><td><b>40 €</b></td><td>2.600</td><td>2.600</td></tr>
              <tr><td><b>50 €</b></td><td>3.500</td><td>1.700</td></tr>
              <tr><td><b>60 €</b></td><td>4.400</td><td>900</td></tr>
            </tbody>
          </table>
          <p>Welche Aussage zur obigen Markttabelle ist <b>vollständig richtig</b>?</p>`,
          taskAr: `<p>اقرأ جدول العرض والطلب أعلاه وحدد العبارة الصحيحة حول <b>سعر التوازن (Gleichgewichtspreis)</b> وفائض العرض أو الطلب:</p>`,
          options: [
            '1. Der Gleichgewichtspreis liegt bei 40 € (Gleichgewichtsmenge 2.600 Stück); bei 50 € besteht ein Angebotsüberhang von 1.800 Stück (Käufermarkt).',
            '2. Der Gleichgewichtspreis liegt bei 30 €; bei 50 € besteht ein Nachfrageüberhang von 1.800 Stück (Verkäufermarkt).',
            '3. Der Gleichgewichtspreis liegt bei 40 €; bei 20 € besteht ein Angebotsüberhang von 3.200 Stück.',
            '4. Der höchste Gesamtumsatz am Markt wird bei einem Preis von 60 € erzielt (4.400 × 60 €).'
          ],
          correct: [0],
          rubric: [
            [8, 'Gleichgewichtspreis 40 € und Gleichgewichtsmenge 2.600 Stück (Angebot == Nachfrage) abgelesen', 'تحديد سعر التوازن 40 € وكمية التوازن 2.600 قطعة'],
            [7, 'Bei 50 €: Angebot (3.500) > Nachfrage (1.700) -> Angebotsüberhang von 1.800 Stück (Käufermarkt)', 'حساب فائض العرض عند سعر 50 € = 1.800 قطعة (سوق المشتري)']
          ],
          solutionDe: `<p><b>Richtig ist Option 1:</b></p>
          <ul>
            <li>Bei <b>40 €</b> stimmen Angebotsmenge (2.600) und Nachfragemenge (2.600) exakt überein → <b>Gleichgewichtspreis = 40 €</b>, größtes gehandeltes Umsatzvolumen ($2.600 \\times 40\\text{ €} = 104.000\\text{ €}$).</li>
            <li>Bei <b>50 €</b> werden 3.500 Stück angeboten, aber nur 1.700 Stück nachgefragt → <b>Angebotsüberhang von $3.500 - 1.700 = 1.800\\text{ Stück}$ (Käufermarkt)</b>. (Bei 60 € werden nur 900 Stück verkauft, da niemand mehr kauft als nachgefragt wird!).</li>
          </ul>`,
          solutionAr: `<p><b>قاعدة جدول السوق:</b> الكمية الفعلية المباعة عند أي سعر هي دائماً <b>الأصغر بين العرض والطلب</b> $\\min(\\text{Angebot}, \\text{Nachfrage})$، ويتحقق أكبر حجم تداول عند <b>سعر التوازن (40 €)</b>.</p>`
        },
        {
          id: 'wiso-a-7',
          title: 'Aufgabe 7 (Zuordnung · 12 P.): Die 5 Säulen der Sozialversicherung',
          points: 12,
          type: 'match',
          lessonId: 'sozialversicherung',
          taskDe: `<p>Ordne jedem <b>Zweig der gesetzlichen Sozialversicherung</b> seinen Träger und die Finanzierungsbesonderheit zu:</p>`,
          taskAr: `<p>طابق كل فرع من <b>فروع التأمين الاجتماعي الخمسة</b> مع الجهة المسؤولة عنه وقاعدة تمويله:</p>`,
          pairs: [
            ['Gesetzliche Unfallversicherung (UV)', 'Träger: Berufsgenossenschaften (BG); wird zu 100 % allein vom Arbeitgeber finanziert!'],
            ['Gesetzliche Rentenversicherung (RV)', 'Träger: Deutsche Rentenversicherung; Beitrag (18,6 %) wird je zur Hälfte (50/50) von AG und AN getragen'],
            ['Arbeitslosenversicherung (AV)', 'Träger: Bundesagentur für Arbeit; zahlt Arbeitslosengeld I (60 % bzw. 67 % mit Kind vom pauschalierten Netto)'],
            ['Soziale Pflegeversicherung (PV)', 'Träger: Pflegekassen (bei den Krankenkassen); Kinderlose ab 23 J. zahlen einen Beitragszuschlag allein']
          ],
          rubric: [
            [6, 'Unfallversicherung = Berufsgenossenschaft & 100 % Arbeitgeberfinanzierung korrekt zugeordnet', 'مطابقة تأمين الحوادث مع النقابة المهنية BG وتمويل 100% من صاحب العمل'],
            [6, 'Renten-, Arbeitslosen- und Pflegeversicherung (Kinderlosenzuschlag) korrekt zugeordnet', 'مطابقة تأمين التقاعد والبطالة والرعاية بشكل صحيح']
          ],
          solutionDe: `<p><b>Wichtigste Prüfungsfalle:</b> Die <b>gesetzliche Unfallversicherung</b> (Arbeits- und Wegeunfälle) wird über die <b>Berufsgenossenschaften</b> abgewickelt und zu <b>100 % vom Arbeitgeber</b> bezahlt!</p>`,
          solutionAr: `<p><b>تذكّر دائماً:</b> الموظف يدفع في 4 تأمينات فقط؛ أما <b>تأمين حوادث العمل والطريق (Unfallversicherung)</b> فيدفعه <b>صاحب العمل وحده بنسبة 100%</b>.</p>`
        },
        {
          id: 'wiso-a-8',
          title: 'Aufgabe 8 (Multiple-Choice · 12 P.): Kündigungsfristen (§ 622 BGB) & Prokura (§ 49 HGB)',
          points: 12,
          type: 'mc',
          lessonId: 'kuendigung',
          taskDe: `<p>Welche <b>zwei Aussagen</b> zu Kündigung und Vertretungsmacht im Unternehmen sind gesetzlich richtig? <i>(Wähle genau 2 Optionen)</i></p>`,
          taskAr: `<p>أي <b>عبارتين</b> مما يلي صحيحتان حول مهل الإنهاء (<b>§ 622 BGB</b>) والتفويض التجاري (<b>Prokura</b>)؟</p>`,
          options: [
            '1. Kündigt ein Arbeitnehmer nach 11 Jahren Betriebszugehörigkeit selbst (ohne Sonderregelung), gilt für ihn die Grundfrist von 4 Wochen (28 Tagen) zum 15. oder zum Monatsende (§ 622 Abs. 1 BGB).',
            '2. Eine fristlose Kündigung wegen Arbeitszeitbetrugs ist auch per WhatsApp oder E-Mail rechtswirksam, wenn sie sofort gelesen wird.',
            '3. Ein Prokurist (§ 49 HGB) darf ohne besondere Befugnis Softwareverträge abschließen und Entwickler einstellen, aber keine Betriebsgrundstücke verkaufen oder belasten.',
            '4. Ein Prokurist darf ohne Weiteres die Handelsregister-Löschung der Firma beantragen und die Jahresbilanz unterschreiben.',
            '5. Die verlängerten Kündigungsfristen nach Betriebszugehörigkeit (§ 622 Abs. 2 BGB) gelten nur für Kleinbetriebe unter 10 Mitarbeitern.'
          ],
          correct: [0, 2],
          rubric: [
            [6, 'Aussage 1 gewählt: Bei Eigenkündigung durch den Arbeitnehmer gilt gesetzlich die 4-Wochen-Grundfrist unabhängig von den Dienstjahren', 'اختيار العبارة 1: استقالة الموظف تخضع لمهلة 4 أسابيع (28 يوماً) بغض النظر عن سنوات خدمته'],
            [6, 'Aussage 3 gewählt: Prokura ermächtigt zu allen gerichtlichen/außergerichtlichen Handelsgeschäften außer Grundstücksverkauf/-belastung und höchstpersönlichen Kaufmannspflichten', 'اختيار العبارة 3: حدود صلاحيات المفوض التجاري Prokurist']
          ],
          solutionDe: `<p><b>Richtig sind 1 und 3:</b> Die Dienstjahres-Staffel (§ 622 Abs. 2 BGB) gilt gesetzlich <b>nur für Kündigungen durch den Arbeitgeber</b>! Jede Kündigung bedarf zwingend der <b>eigenhändigen Schriftform auf Papier (§ 623 BGB)</b>. Ein <b>Prokurist</b> darf fast alles, aber <b>keine Grundstücke veräußern/belasten</b> (ohne Sonderbefugnis) und keine Bilanz unterschreiben.</p>`,
          solutionAr: `<p><b>انتبه:</b> أي فصل أو استقالة عبر البريد الإلكتروني أو الفاكس أو واتساب <b>باطلة تماماً (§ 623 BGB)</b> لعدم وجود توقيع خطي حي على الورق!</p>`
        }
      ]
    },

    // =========================================================================
    // WISO · MODELL B (NACH WIEDERHOLUNG): Prüfungsfallen & Sonderfälle
    // =========================================================================
    {
      id: 'wiso-b',
      part: 'WiSo',
      stage: 'Modell B · Nach Wiederholung (Prüfungsfallen & Sonderfälle)',
      stageAr: 'النموذج B · بعد المراجعة (الفخاخ الامتحانية والحالات الخاصة)',
      title: 'WiSo · Modell B: Dienstplan-Prüfung, JAV, GmbH-Gewinn, Rückwärtskalkulation & GuV',
      titleAr: 'قسم WiSo (نموذج B): فحص جدول الدوام، انتخابات JAV، أرباح GmbH، الحساب العكسي، والمؤشرات المالية',
      durationMin: 60,
      totalPoints: 100,
      desc: 'Trainiert gezielt die häufigsten Stolpersteine aus den letzten Prüfungen: JArbSchG vs. ArbZG am Dienstplan, JAV-Altersfalle, GmbH-Gewinnanteil, Rückwärtskalkulation und Mängelrechte.',
      ar: 'يركز هذا النموذج على الفخاخ الدقيقة: مقارنة دوام القاصر والبالغ، فخ عمر المتدرب في JAV، توزيع أرباح GmbH، الحساب العكسي، وخطوات ضمان العيب.',
      tasks: [
        {
          id: 'wiso-b-1',
          title: 'Aufgabe 1 (Tabellenauswertung · 15 P.): Dienstplan nach JArbSchG vs. ArbZG prüfen',
          points: 15,
          type: 'table',
          lessonId: 'arbeitszeit',
          taskDe: `<p>Die Personalabteilung legt folgenden Dienstplan für Dienstag und Mittwoch vor:</p>
          <table>
            <thead><tr><th>Beschäftigter</th><th>Alter / Status</th><th>Dienstag (Anwesenheit)</th><th>Geplante Pause Di.</th><th>Arbeitsbeginn Mittwoch</th></tr></thead>
            <tbody>
              <tr><td><b>Lukas</b></td><td>17 Jahre (Azubi)</td><td>08:00 – 16:30 Uhr (8,5 Std.)</td><td>45 Minuten</td><td>07:30 Uhr</td></tr>
              <tr><td><b>Sarah</b></td><td>29 Jahre (Entwicklerin)</td><td>08:00 – 18:00 Uhr (10,0 Std.)</td><td>30 Minuten</td><td>06:00 Uhr</td></tr>
            </tbody>
          </table>
          <p>Welche rechtliche Beurteilung des Dienstplans ist <b>vollständig korrekt</b>?</p>`,
          taskAr: `<p>افحص جدول الدوام أعلاه لكل من <b>Lukas (قاصر 17 سنة — JArbSchG)</b> و<b>Sarah (بالغة 29 سنة — ArbZG)</b> وحدد التقييم القانوني الصحيح:</p>`,
          options: [
            '1. Bei Lukas (17 J., > 6 Std. Nettoarbeitszeit) fehlen 15 Min. Pause (mind. 60 Min. nach JArbSchG nötig); bei Sarah (9,5 Std. Arbeit) fehlen 15 Min. Pause (mind. 45 Min. bei > 9 Std. nach ArbZG nötig) UND ihre Ruhezeit bis 06:00 Uhr (12 Std.) ist zwar eingehalten, aber die Pause ist zu kurz.',
            '2. Beide Dienstpläne sind vollständig gesetzeskonform, da 45 Min. für Jugendliche und 30 Min. für Erwachsene immer ausreichen.',
            '3. Nur der Plan von Lukas ist rechtswidrig, weil Jugendliche maximal 6 Stunden täglich arbeiten dürfen; Sarahs Plan ist mit 30 Minuten Pause zulässig.',
            '4. Bei Sarah ist die Pause von 30 Minuten ausreichend, aber die Ruhezeit von 18:00 bis 06:00 Uhr (12 Stunden) verstößt gegen die 14-Stunden-Regel des ArbZG.'
          ],
          correct: [0],
          rubric: [
            [8, 'Lukas (17 J., JArbSchG): Bei > 6 Stunden Arbeitszeit sind zwingend mindestens 60 Minuten Ruhepause vorgeschrieben (45 Min. reichen nicht!)', 'تحديد مخالفة استراحة القاصر Lukas: يحتاج 60 دقيقة استراحة لأن عمله الصافي يتجاوز 6 ساعات'],
            [7, 'Sarah (29 J., ArbZG): 10 Std. minus 0,5 Std. = 9,5 Std. Nettoarbeitszeit (> 9 Std.) -> mindestens 45 Minuten Pause nötig! Ruhezeit 18:00–06:00 = 12 Std. (>= 11 Std. ist erfüllt)', 'تحديد مخالفة استراحة البالغة Sarah: عملها الصافي 9,5 ساعة (> 9 ساعات) فيتطلب 45 دقيقة استراحة على الأقل']
          ],
          solutionDe: `<p><b>Richtig ist Option 1:</b></p>
          <ul>
            <li><b>Lukas (17 J. → JArbSchG):</b> Anwesenheit 8,5 Std. minus 45 Min. = 7 Std. 45 Min. Arbeitszeit (&gt; 6 Std.). Für Jugendliche gilt ab <b>mehr als 6 Stunden Arbeitszeit zwingend 60 Minuten Pause</b>!</li>
            <li><b>Sarah (29 J. → ArbZG):</b> Anwesenheit 10 Std. minus 30 Min. = <b>9,5 Std. Nettoarbeitszeit (&gt; 9 Std.)</b>. Für Erwachsene gilt ab mehr als 9 Stunden Arbeitszeit <b>mindestens 45 Minuten Pause</b>! (Die Ruhezeit von 18:00 bis 06:00 Uhr beträgt 12 Stunden und erfüllt die Mindestruhezeit von 11 Stunden).</li>
          </ul>`,
          solutionAr: `<p><b>خطوات فحص أي جدول دوام في الامتحان:</b> 1) انظر للعمر (تحت 18 = <b>JArbSchG</b>، من 18 فأكثر = <b>ArbZG</b>)، 2) اطرح الاستراحة من وقت التواجد لتحصل على <b>صافي العمل</b>، 3) قارن الاستراحة بالحد القانوني، 4) احسب الساعات من نهاية الدوام لبداية اليوم التالي (للـArbZG على الأقل <b>11 ساعة</b>).</p>`
        },
        {
          id: 'wiso-b-2',
          title: 'Aufgabe 2 (Multiple-Choice · 10 P.): JAV-Wahl & Betriebsratswahl (BetrVG)',
          points: 10,
          type: 'mc',
          lessonId: 'mitbestimmung',
          taskDe: `<p>In einem Softwarehaus mit bestehendem Betriebsrat wird die <b>Jugend- und Auszubildendenvertretung (JAV)</b> gewählt. Welche <b>zwei Aussagen</b> zu Wahlrecht und Wählbarkeit nach <b>§§ 60, 61 BetrVG</b> sind zutreffend?</p>`,
          taskAr: `<p>أي <b>عبارتين</b> صحيحتان حول انتخابات <b>ممثلي الشباب والمتدربين (JAV)</b> وفق المادتين <b>§§ 60, 61 BetrVG</b>؟</p>`,
          options: [
            '1. Eine 28-jährige Auszubildende im 2. Lehrjahr ist bei der JAV-Wahl aktiv wahlberechtigt, da für Auszubildende keine Altersobergrenze mehr gilt.',
            '2. Auszubildende dürfen nur dann an der JAV-Wahl teilnehmen, wenn sie das 25. Lebensjahr noch nicht vollendet haben.',
            '3. Als JAV-Mitglied gewählt werden (passives Wahlrecht) können alle Arbeitnehmer des Betriebs, die das 25. Lebensjahr noch nicht vollendet haben, sowie alle Auszubildenden unabhängig vom Alter.',
            '4. Eine JAV kann in jedem Betrieb ab 3 Auszubildenden auch dann gegründet werden, wenn im Betrieb kein Betriebsrat existiert.',
            '5. Wer das 17. Lebensjahr vollendet hat, darf zwar die JAV wählen, aber noch nicht bei der Betriebsratswahl mitwählen.'
          ],
          correct: [0, 2],
          rubric: [
            [5, 'Aussage 1 richtig: Alle zur Berufsausbildung Beschäftigten sind unabhängig vom Alter aktiv wahlberechtigt', 'اختيار العبارة 1: جميع المتدربين يحق لهم التصويت في JAV مهما كان عمرهم'],
            [5, 'Aussage 3 richtig: Wählbar zur JAV sind alle Arbeitnehmer unter 25 Jahren sowie alle Auszubildenden (ohne Altersgrenze)', 'اختيار العبارة 3: شروط الترشح لعضوية JAV']
          ],
          solutionDe: `<p><b>Richtig sind 1 und 3:</b> Seit der Reform des BetrVG gilt für <b>Auszubildende weder beim aktiven noch beim passiven JAV-Wahlrecht eine Altersobergrenze</b>! Voraussetzung für eine JAV sind mindestens <b>5 Wahlberechtigte</b> UND ein <b>bestehender Betriebsrat</b>. Beim Betriebsrat darf man bereits ab <b>16 Jahren</b> aktiv mitwählen.</p>`,
          solutionAr: `<p><b>فخ التحديث القانوني المهم جداً:</b> أُلغي حد الـ25 سنة للمتدربين في <b>JAV</b>؛ أي متدرب (Azubi) عمره 28 أو 35 سنة يحق له التصويت والترشح في JAV!</p>`
        },
        {
          id: 'wiso-b-3',
          title: 'Aufgabe 3 (Rechenkästchen · 12 P.): GmbH-Gewinnverteilung nach § 29 GmbHG',
          points: 12,
          type: 'calc',
          lessonId: 'rechtsformen',
          taskDe: `<p>Die „CodeCraft GmbH“ hat ein <b>Stammkapital von 80.000,00 €</b>. Gesellschafterin Hanna hält einen <b>Geschäftsanteil von 20.000,00 €</b>. Am Jahresende beschließt die Gesellschafterversammlung, einen <b>Gewinn von 140.000,00 €</b> nach dem gesetzlichen Maßstab (§ 29 GmbHG) auszuschütten.</p>
          <p>Welchen <b>Gewinnanteil in Euro</b> erhält Hanna?</p>`,
          taskAr: `<p>شركة <b>GmbH</b> رأس مالها الأساسي <code>80.000 €</code>، وتملك الشريكة Hanna حصة قدرها <code>20.000 €</code>. قررت الشركة توزيع أرباح بقيمة <code>140.000 €</code> وفق القاعدة القانونية (<b>§ 29 GmbHG</b>). كم يورو تحصل Hanna؟</p>`,
          expected: '35000',
          unit: '€',
          acceptedAnswers: ['35000', '35000,00', '35.000', '35.000,00'],
          rubric: [
            [6, 'Kapitalanteil von Hanna = 20.000 € / 80.000 € = 0,25 (25 %)', 'حساب نسبة حصة الشريكة من رأس المال الأساسي = 25%'],
            [6, 'Gewinnausschüttung Hanna = 140.000 € × 25 % = 35.000,00 €', 'حساب نصيبها من الأرباح الموزعة: 140.000 × 0,25 = 35.000,00 €']
          ],
          solutionDe: `<p><b>Rechenweg nach § 29 Abs. 3 GmbHG:</b> Die Verteilung erfolgt im Verhältnis der <b>Geschäftsanteile zum Stammkapital</b> (nicht nach Köpfen!):<br>
          Anteil Hanna = $\\frac{20.000\\text{ €}}{80.000\\text{ €}} = 0,25 = 25\\%$.<br>
          Gewinnanteil = $140.000,00\\text{ €} \\times 0,25 = \\mathbf{35.000,00\\text{ €}}$.</p>`,
          solutionAr: `<p><b>تذكّر:</b> توزيع الأرباح في <b>GmbH</b> يتم حسب <b>نسبة الحصة من رأس المال الأساسي (Geschäftsanteil / Stammkapital)</b> وليس بالتساوي على عدد الشركاء!</p>`
        },
        {
          id: 'wiso-b-4',
          title: 'Aufgabe 4 (Rechenkästchen · 13 P.): Rückwärtskalkulation (Brutto → Barverkaufspreis)',
          points: 13,
          type: 'calc',
          lessonId: 'bwl-rechnen',
          taskDe: `<p>Eine Softwarelizenz wird am Markt zu einem <b>Bruttoverkaufspreis von 1.190,00 € (inkl. 19 % Umsatzsteuer)</b> angeboten. Kunden erhalten <b>10 % Kundenrabatt</b> und <b>2 % Kundenskonto</b>.</p>
          <p>Berechne im Wege der <b>Rückwärtskalkulation</b> den <b>Barverkaufspreis (netto)</b> in Euro:</p>`,
          taskAr: `<p>باستخدام <b>الحساب العكسي (Rückwärtskalkulation)</b>: إذا كان سعر البيع الإجمالي شاملاً ضريبة 19% هو <code>1.190 €</code>، ويحصل العميل على خصم <code>10% Rabatt</code> و<code>2% Skonto</code>، فكم يبلغ <b>سعر البيع النقدي الصافي (Barverkaufspreis)</b> باليورو؟</p>`,
          expected: '882',
          unit: '€',
          acceptedAnswers: ['882', '882,00', '882.00'],
          rubric: [
            [5, 'Listenverkaufspreis netto = 1.190,00 € / 1,19 = 1.000,00 € (Nicht 19 % von 1.190 abziehen!)', 'استخراج السعر الصافي بالقسمة على 1,19 = 1.000,00 €'],
            [4, 'Zielverkaufspreis = 1.000,00 € − 10 % Kundenrabatt (100 €) = 900,00 €', 'طرح خصم العميل 10% للوصول إلى 900,00 €'],
            [4, 'Barverkaufspreis = 900,00 € − 2 % Kundenskonto von 900 € (18 €) = 882,00 €', 'طرح خصم تعجيل الدفع 2% من الـ900 € = 882,00 €']
          ],
          solutionDe: `<p><b>Schrittweise Rückwärtsrechnung:</b></p>
          <ol>
            <li><b>Listenverkaufspreis (netto):</b> $1.190,00\\text{ €} \\div 1,19 = \\mathbf{1.000,00\\text{ €}}$</li>
            <li>$-$ 10 % Kundenrabatt (<code>100,00 €</code>) = <b>Zielverkaufspreis: <code>900,00 €</code></b></li>
            <li>$-$ 2 % Kundenskonto von 900 € (<code>18,00 €</code>) = <b>Barverkaufspreis: <code>882,00 €</code></b></li>
          </ol>`,
          solutionAr: `<p><b>احذر من الخطأ القاتل عند الانتقال من Brutto إلى Netto:</b> اقسم دائماً على <b><code>1,19</code></b> ($1.190 / 1,19 = 1.000\\text{ €}$) ولا تضرب أبداً في $0,81$!</p>`
        },
        {
          id: 'wiso-b-5',
          title: 'Aufgabe 5 (Tabellenauswertung · 14 P.): Wirtschaftlichkeit & Eigenkapitalrentabilität',
          points: 14,
          type: 'table',
          lessonId: 'bwl-rechnen',
          taskDe: `<p>Aus der Gewinn- und Verlustrechnung (GuV) sowie der Bilanz eines IT-Dienstleisters liegen folgende Jahreswerte vor:</p>
          <table>
            <thead><tr><th>Kennzahl / Position</th><th>Wert im Geschäftsjahr</th></tr></thead>
            <tbody>
              <tr><td><b>Erträge (Umsatzerlöse)</b></td><td><code>750.000 €</code></td></tr>
              <tr><td><b>Aufwendungen (Gesamtkosten)</b></td><td><code>600.000 €</code></td></tr>
              <tr><td><b>Eingesetztes Eigenkapital</b></td><td><code>500.000 €</code></td></tr>
              <tr><td><b>Fremdkapital</b></td><td><code>300.000 €</code></td></tr>
            </tbody>
          </table>
          <p>Welche Kombination aus <b>Jahresgewinn</b>, <b>Wirtschaftlichkeit</b> und <b>Eigenkapitalrentabilität</b> ist korrekt?</p>`,
          taskAr: `<p>من الجدول المالي أعلاه، اختر القيم الصحيحة لكل من <b>الربح (Gewinn)</b> و<b>الكفاءة الاقتصادية (Wirtschaftlichkeit)</b> و<b>ربحية رأس المال الخاص (Eigenkapitalrentabilität)</b>:</p>`,
          options: [
            '1. Gewinn = 150.000 € · Wirtschaftlichkeit = 1,25 · Eigenkapitalrentabilität = 30,0 %',
            '2. Gewinn = 150.000 € · Wirtschaftlichkeit = 0,80 · Eigenkapitalrentabilität = 18,75 %',
            '3. Gewinn = 250.000 € · Wirtschaftlichkeit = 1,25 · Eigenkapitalrentabilität = 20,0 %',
            '4. Gewinn = 150.000 € · Wirtschaftlichkeit = 1,50 · Eigenkapitalrentabilität = 30,0 %'
          ],
          correct: [0],
          rubric: [
            [4, 'Gewinn = Erträge − Aufwendungen = 750.000 € − 600.000 € = 150.000 €', 'حساب الربح: الإيرادات ناقص النفقات = 150.000 €'],
            [5, 'Wirtschaftlichkeit = Erträge / Aufwendungen = 750.000 / 600.000 = 1,25', 'حساب الكفاءة الاقتصادية: الإيرادات تقسيم النفقات = 1,25'],
            [5, 'Eigenkapitalrentabilität = (Gewinn / Eigenkapital) × 100 = (150.000 / 500.000) × 100 = 30,0 %', 'حساب ربحية رأس المال الخاص: (150.000 / 500.000) × 100 = 30%']
          ],
          solutionDe: `<p><b>Richtig ist Option 1:</b></p>
          <ul>
            <li><b>Gewinn</b> $= \\text{Ertrag} - \\text{Aufwand} = 750.000 - 600.000 = \\mathbf{150.000\\text{ €}}$</li>
            <li><b>Wirtschaftlichkeit</b> $= \\frac{\\text{Ertrag}}{\\text{Aufwand}} = \\frac{750.000}{600.000} = \\mathbf{1,25}$ (dimensionslose Kennzahl &gt; 1 = wirtschaftlich)</li>
            <li><b>Eigenkapitalrentabilität</b> $= \\frac{\\text{Gewinn}}{\\text{Eigenkapital}} \\times 100 = \\frac{150.000}{500.000} \\times 100 = \\mathbf{30,0\\%}$</li>
          </ul>`,
          solutionAr: `<p><b>تذكّر الفرق بين القانونين:</b> <b>الربح (Gewinn)</b> عملية طرح باليورو، و<b>الكفاءة (Wirtschaftlichkeit)</b> عملية قسمة بدون وحدة، و<b>الربحية (Rentabilität)</b> تقسم الربح على رأس المال وتضرب في 100%.</p>`
        },
        {
          id: 'wiso-b-6',
          title: 'Aufgabe 6 (Reihenfolge · 12 P.): Gesetzliche Reihenfolge bei Sachmangel (Kauf-/Werkvertrag)',
          points: 12,
          type: 'order',
          lessonId: 'vertraege',
          taskDe: `<p>Gelieferte Monitore weisen bei der Wareneingangsprüfung im Systemhaus Pixelfehler (Sachmangel) auf. Bringe das <b>gesetzliche Vorgehen bei Mängelansprüchen (BGB / HGB)</b> in die richtige Reihenfolge (1 bis 4):</p>`,
          taskAr: `<p>رتّب خطوات المطالبة القانونية بحقوق الضمان عند اكتشاف عيب في بضاعة مستلمة (<b>Vorrang der Nacherfüllung</b>) من 1 إلى 4:</p>`,
          steps: [
            '1. Ware unverzüglich nach Ablieferung untersuchen und den Sachmangel dokumentieren (§ 377 HGB beim Handelskauf)',
            '2. Unverzügliche Mängelrüge an den Lieferanten senden und Nacherfüllung (Reparatur oder Ersatzlieferung) mit angemessener Frist verlangen',
            '3. Abwarten des gesetzten Nacherfüllungszeitraums (Vorrang der Nacherfüllung vor Sekundärrechten)',
            '4. Nach erfolglosem Fristablauf (oder 2 fehlgeschlagenen Versuchen): Rücktritt vom Vertrag oder Kaufpreisminderung erklären'
          ],
          rubric: [
            [6, 'Untersuchung + Mängelrüge und vorrangiges Verlangen nach Nacherfüllung mit Fristsetzung an Position 1–3', 'وضع الفحص والإخطار وطلب الإصلاح/الاستبدال مع مهلة في المراتب الأولى'],
            [6, 'Sekundärrechte (Rücktritt / Minderung) erst nach erfolglosem Ablauf der Nacherfüllungsfrist an Position 4', 'وضع الحقوق الثانوية (الانسحاب أو تخفيض السعر) في المرتبة الأخيرة بعد فشل الإصلاح']
          ],
          solutionDe: `<p><b>Wichtigstes BGB-Prinzip (§§ 437, 439 BGB):</b> Es gilt der <b>Vorrang der Nacherfüllung</b> (Nachbesserung oder Ersatzlieferung). Erst wenn die angemessene Frist erfolglos verstreicht oder die Nacherfüllung fehlschlägt, darf der Käufer <b>zurücktreten oder den Preis mindern</b>!</p>`,
          solutionAr: `<p><b>قاعدة ذهبية في الامتحان:</b> لا يجوز للمشتري فسخ العقد فوراً أو خصم السعر من تلقاء نفسه قبل إعطاء البائع <b>فرصة ومهلة مناسبة للإصلاح أو الاستبدال (Nacherfüllung)</b>.</p>`
        },
        {
          id: 'wiso-b-7',
          title: 'Aufgabe 7 (Zuordnung · 12 P.): IT-Vertragsarten im BGB unterscheiden',
          points: 12,
          type: 'match',
          lessonId: 'vertraege',
          taskDe: `<p>Ordne jedem <b>IT-Praxisfall</b> den rechtlich passenden <b>Vertragstyp nach BGB</b> zu:</p>`,
          taskAr: `<p>طابق كل حالة عملية في قطاع تقنية المعلومات مع <b>نوع العقد القانوني</b> المناسب لها في قانون <b>BGB</b>:</p>`,
          pairs: [
            ['Werkvertrag (§ 631 BGB)', 'Entwicklung einer individuellen Schnittstelle nach Pflichtenheft: Geschuldet ist ein konkreter, abnahmefähiger Erfolg'],
            ['Dienstvertrag (§ 611 BGB)', 'Laufende IT-Sicherheitsberatung oder Schulung auf Stundenbasis: Geschuldet ist das fachgerechte Tätigwerden, kein garantierter Erfolg'],
            ['Kaufvertrag (§ 433 BGB)', 'Einmaliger Erwerb von 20 Laptops inkl. Eigentumsübertragung gegen Zahlung des Kaufpreises'],
            ['Mietvertrag (§ 535 BGB)', 'Zeitweise Überlassung von Server-Racks im Rechenzentrum gegen monatliche Gebühr (Instandhaltung beim Vermieter)']
          ],
          rubric: [
            [6, 'Werkvertrag (konkreter Erfolg + Abnahme) vs. Dienstvertrag (Tätigwerden/Bemühen) korrekt zugeordnet', 'التفريق الصحيح بين عقد العمل المنجز Werkvertrag وعقد الخدمة Dienstvertrag'],
            [6, 'Kaufvertrag (Eigentumsübertragung) und Mietvertrag (Gebrauchsüberlassung auf Zeit) korrekt zugeordnet', 'مطابقة عقد البيع وعقد الإيجار بشكل صحيح']
          ],
          solutionDe: `<p><b>Prüfungsklassiker:</b> Individualsoftware nach Pflichtenheft mit Abnahme = <b>Werkvertrag (Erfolg geschuldet)</b>. Beratung, Support oder Arbeitsvertrag = <b>Dienstvertrag (Tätigkeit geschuldet)</b>.</p>`,
          solutionAr: `<p><b>الفرق الجوهري:</b> في <b>Werkvertrag</b> لا يستحق المقاول أجره إلا بتسليم <b>نتيجة مكتملة ناجحة (Erfolg + Abnahme)</b>، بينما في <b>Dienstvertrag</b> يستحق الأجر مقابل <b>بذل الجهد والوقت</b>.</p>`
        },
        {
          id: 'wiso-b-8',
          title: 'Aufgabe 8 (Multiple-Choice · 12 P.): Kündigungsschutzgesetz (KSchG) & Sozialauswahl',
          points: 12,
          type: 'mc',
          lessonId: 'kuendigung',
          taskDe: `<p>Welche <b>zwei Aussagen</b> zum allgemeinen Kündigungsschutz nach dem <b>Kündigungsschutzgesetz (KSchG)</b> sind richtig?</p>`,
          taskAr: `<p>أي <b>عبارتين</b> صحيحتان حول الحماية العامة من الفصل وفق قانون <b>KSchG</b>؟</p>`,
          options: [
            '1. Das KSchG gilt für Arbeitnehmer, deren Arbeitsverhältnis im selben Betrieb länger als 6 Monate besteht, sofern der Betrieb regelmäßig mehr als 10 Arbeitnehmer (Vollzeitäquivalente, ohne Azubis) beschäftigt.',
            '2. Die vier gesetzlichen Kriterien der Sozialauswahl bei betriebsbedingter Kündigung sind: Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung (§ 1 Abs. 3 KSchG).',
            '3. Will ein Arbeitnehmer gegen eine unwirksame Kündigung vorgehen, hat er ab Zugang 6 Monate Zeit für die Kündigungsschutzklage beim Arbeitsgericht.',
            '4. Auszubildende zählen bei der Berechnung der Betriebsgröße nach § 23 KSchG als volle Arbeitskräfte (Faktor 1,0) mit.',
            '5. Bei einer betriebsbedingten Kündigung muss immer zuerst demjenigen Mitarbeiter gekündigt werden, der das höchste Gehalt bezieht.'
          ],
          correct: [0, 1],
          rubric: [
            [6, 'Aussage 1 gewählt: > 6 Monate Wartezeit und > 10 Vollzeitäquivalente (Azubis zählen nicht mit!)', 'اختيار العبارة 1: شرط أقدمية أكثر من 6 أشهر وأكثر من 10 موظفين بدوام كامل دون حساب المتدربين'],
            [6, 'Aussage 2 gewählt: Die 4 Sozialauswahl-Kriterien (Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten, Schwerbehinderung)', 'اختيار العبارة 2: المعايير الأربعة للاختيار الاجتماعي عند الفصل التشغيلي']
          ],
          solutionDe: `<p><b>Richtig sind 1 und 2:</b> Die Klagefrist beim Arbeitsgericht beträgt zwingend <b>3 Wochen ab Zugang der Kündigung (§ 4 KSchG)</b> — sonst gilt die Kündigung als wirksam! Azubis zählen bei den 10 Mitarbeitern nicht mit; Teilzeitkräfte bis 20 Std. mit <code>0,5</code>, bis 30 Std. mit <code>0,75</code>.</p>`,
          solutionAr: `<p><b>احفظ الرقم 3 أسابيع:</b> مهلة رفع دعوى الطعن في الفصل أمام محكمة العمل هي <b>3 أسابيع فقط من تاريخ استلام كتاب الفصل</b>!</p>`
        }
      ]
    },

    // =========================================================================
    // WISO · MODELL C (VOR DER PRÜFUNG): Generalprobe Komplett-Mix
    // =========================================================================
    {
      id: 'wiso-c',
      part: 'WiSo',
      stage: 'Modell C · Generalprobe (Komplett-Mix vor der Prüfung)',
      stageAr: 'النموذج C · البروفة النهائية (محاكاة شاملة قبل الامتحان)',
      title: 'WiSo · Modell C: Tarifstreik, Günstigkeitsprinzip, Lohnabrechnung, Break-Even & ISO 7010',
      titleAr: 'قسم WiSo (نموذج C): النزاع النقابي، هرم القوانين، كشف الراتب، نقطة التعادل، وعلامات السلامة',
      durationMin: 60,
      totalPoints: 100,
      desc: 'Abschlusssimulation vor dem Prüfungstag: Arbeitskampf-Ablauf, Normenpyramide, komplette Brutto-Netto-Rechnung, Break-Even-Point, Sicherheitszeichen und Konjunktur.',
      ar: 'البروفة الختامية لامتحان WiSo: تغطي خطوات الإضراب القانوني، مبدأ الأفضلية، حساب الراتب الصافي، نقطة التعادل، علامات السلامة، والدورة الاقتصادية.',
      tasks: [
        {
          id: 'wiso-c-1',
          title: 'Aufgabe 1 (Reihenfolge · 12 P.): Ablauf eines rechtmäßigen Tarifstreiks',
          points: 12,
          type: 'order',
          lessonId: 'tarifrecht',
          taskDe: `<p>Gewerkschaft und Arbeitgeberverband verhandeln über einen neuen Entgelttarifvertrag. Bringe die Phasen eines <b>rechtmäßigen Arbeitskampfes (Streik)</b> in die richtige chronologische Reihenfolge (1 bis 5):</p>`,
          taskAr: `<p>رتّب مراحل <b>النزاع الجماعي والإضراب القانوني (Arbeitskampf / Streik)</b> ترتيباً زمنياً صحيحاً من 1 إلى 5:</p>`,
          steps: [
            '1. Ablauf des alten Tarifvertrags (Ende der Friedenspflicht) und Aufnahme neuer Tarifverhandlungen',
            '2. Offizielles Scheitern der Tarifverhandlungen erklären und Schlichtungsverfahren durchführen',
            '3. Scheitern der Schlichtung und Durchführung der Urabstimmung unter den Gewerkschaftsmitgliedern (mind. 75 % Zustimmung)',
            '4. Durchführung des Streiks (Arbeitsniederlegung; Gewerkschaft zahlt Streikgeld an Mitglieder)',
            '5. Neue Verhandlungen, Einigung und Abschluss des neuen Tarifvertrags (Wiederbeginn der Friedenspflicht)'
          ],
          rubric: [
            [6, 'Ende Friedenspflicht -> Verhandlung -> Schlichtung -> Urabstimmung (75 %) in korrekter Folge', 'ترتيب انتهاء السلم الوظيفي ثم المفاوضات ثم الوساطة ثم التصويت العام 75%'],
            [6, 'Streik erst nach Urabstimmung -> Abschluss des neuen Tarifvertrags am Ende', 'وضع الإضراب بعد التصويت العام وتوقيع العقد الجديد في النهاية']
          ],
          solutionDe: `<p><b>Merksatz Arbeitskampf:</b> Während eines laufenden Tarifvertrags herrscht <b>Friedenspflicht</b>. Erst nach Scheitern von Verhandlung und <b>Schlichtung</b> sowie <b>75 % Zustimmung in der Urabstimmung</b> darf ein regulärer Erzwingungsstreik starten. Während des Streiks ruht die Lohnzahlungspflicht des Arbeitgebers; Gewerkschaftsmitglieder erhalten <b>Streikgeld</b> von ihrer Gewerkschaft.</p>`,
          solutionAr: `<p><b>احفظ نسبة التصويت على الإضراب (Urabstimmung):</b> يجب أن يوافق <b>75% على الأقل</b> من أعضاء النقابة المشاركين في التصويت قبل بدء الإضراب الشامل!</p>`
        },
        {
          id: 'wiso-c-2',
          title: 'Aufgabe 2 (Tabellenauswertung · 14 P.): Normenpyramide & Günstigkeitsprinzip',
          points: 14,
          type: 'table',
          lessonId: 'tarifrecht',
          taskDe: `<p>Für einen tarifgebundenen Entwickler (5-Tage-Woche) existieren auf verschiedenen Rechtsebenen folgende Regelungen zum Jahresurlaub:</p>
          <table>
            <thead><tr><th>Rechtsquelle / Ebene</th><th>Geregelter Urlaubsanspruch (5-Tage-Woche)</th></tr></thead>
            <tbody>
              <tr><td><b>1. Bundesurlaubsgesetz (BUrlG)</b></td><td>20 Arbeitstage (entspricht 24 Werktagen)</td></tr>
              <tr><td><b>2. Geltender Tarifvertrag (TV)</b></td><td>28 Arbeitstage (ohne Öffnungsklausel)</td></tr>
              <tr><td><b>3. Neue Betriebsvereinbarung (BV)</b></td><td>25 Arbeitstage</td></tr>
              <tr><td><b>4. Individueller Arbeitsvertrag (AV)</b></td><td>30 Arbeitstage</td></tr>
            </tbody>
          </table>
          <p>Welche Aussage beurteilt die Rechtslage nach <b>Rangprinzip, Günstigkeitsprinzip und Tarifvorrang (§ 77 Abs. 3 BetrVG)</b> korrekt?</p>`,
          taskAr: `<p>قارن مستويات القواعد القانونية الأربعة في الجدول أعلاه وحدد كم يوم إجازة يستحق المطور ولماذا وفق <b>مبدأ الأفضلية (Günstigkeitsprinzip)</b>:</p>`,
          options: [
            '1. Der Entwickler hat Anspruch auf 30 Arbeitstage aus seinem Arbeitsvertrag (Günstigkeitsprinzip); die Betriebsvereinbarung mit 25 Tagen ist unwirksam, da sie den Tarifvertrag (28 Tage) ohne Öffnungsklausel nicht unterschreiten darf.',
            '2. Es gelten 25 Arbeitstage aus der Betriebsvereinbarung, weil eine Betriebsvereinbarung immer den neuesten Stand im Betrieb abbildet.',
            '3. Es gelten zwingend 28 Arbeitstage aus dem Tarifvertrag, da ein Einzelarbeitsvertrag niemals mehr Urlaub als der Tarifvertrag gewähren darf.',
            '4. Es gelten die 20 Arbeitstage des Bundesurlaubsgesetzes, da Bundesgesetze immer Vorrang vor Verträgen haben.'
          ],
          correct: [0],
          rubric: [
            [7, 'Günstigkeitsprinzip erkannt: Der Einzelarbeitsvertrag (30 Tage) ist für den Arbeitnehmer günstiger als Tarifvertrag (28) und Gesetz (20) und gilt daher', 'تطبيق مبدأ الأفضلية: العقد الفردي (30 يوماً) أفضل للموظف فيسري لصالحه'],
            [7, 'Tarifvorrang (§ 77 Abs. 3 BetrVG) erkannt: Eine Betriebsvereinbarung (25 Tage) darf tarifliche Ansprüche ohne Öffnungsklausel nicht verschlechtern', 'تطبيق أولوية التعريفة: الاتفاق المؤسسي لا يجوز له إنقاص حقوق عقد التعريفة']
          ],
          solutionDe: `<p><b>Richtig ist Option 1:</b> In der <b>Normenpyramide</b> setzt jede höhere Ebene den <b>Mindeststandard</b> nach unten. Nach dem <b>Günstigkeitsprinzip</b> gilt jedoch eine rangniedrigere Regelung (hier der Arbeitsvertrag mit <b>30 Tagen</b>), wenn sie für den Arbeitnehmer <b>vorteilhafter</b> ist!</p>`,
          solutionAr: `<p><b>قاعدة هرم القوانين (Normenpyramide):</b> القانون الأعلى يضع <b>الحد الأدنى</b>، لكن أي اتفاق أدنى يمنح الموظف <b>ميزة أفضل (Günstigkeitsprinzip)</b> هو الذي يُطبّق!</p>`
        },
        {
          id: 'wiso-c-3',
          title: 'Aufgabe 3 (Rechenkästchen · 13 P.): Lohn- & Gehaltsabrechnung (Brutto → Netto)',
          points: 13,
          type: 'calc',
          lessonId: 'lohn-netto',
          taskDe: `<p>Ein Softwareentwickler arbeitet im Monat <b>160 reguläre Stunden zu je 20,00 €</b>. Zusätzlich leistet er <b>10 Überstunden</b>, die mit dem Grundstundenlohn plus einem <b>Überstundenzuschlag von 25 %</b> vergütet werden. Die Summe aller <b>Arbeitnehmer-Sozialversicherungsbeiträge beträgt 710,00 €</b>, die <b>Steuerabzüge (Lohn-/Kirchensteuer) betragen 440,00 €</b>.</p>
          <p>Berechne den monatlichen <b>Nettolohn</b> in Euro:</p>`,
          taskAr: `<p>يعمل مطور <code>160 ساعة</code> عادية بسعر <code>20 €</code> للساعة، بالإضافة إلى <code>10 ساعات إضافية</code> تُدفع بأجر الساعة مضافاً إليه <b>علاوة 25%</b>. إذا كان مجموع استقطاعات التأمين الاجتماعي للموظف <code>710 €</code> والضرائب <code>440 €</code>، فاحسب <b>الراتب الصافي (Nettolohn)</b> باليورو:</p>`,
          expected: '2300',
          unit: '€',
          acceptedAnswers: ['2300', '2300,00', '2.300', '2.300,00'],
          rubric: [
            [4, 'Grundlohn = 160 Std. × 20 € = 3.200,00 €', 'حساب الأجر الأساسي: 160 × 20 = 3.200 €'],
            [5, '10 zusätzliche Überstunden inkl. 25 % Zuschlag = 10 × 20 € × 1,25 = 250,00 € -> Bruttolohn = 3.450,00 €', 'حساب أجر الساعات الإضافية العشر مع علاوة 25% = 250 € ليصبح الإجمالي 3.450 €'],
            [4, 'Nettolohn = 3.450,00 € − 710,00 € (SV) − 440,00 € (Steuern) = 2.300,00 €', 'طرح التأمينات والضرائب للوصول إلى الصافي 2.300,00 €']
          ],
          solutionDe: `<p><b>Rechenweg:</b></p>
          <ol>
            <li>Regulärer Grundlohn: $160 \\times 20,00\\text{ €} = 3.200,00\\text{ €}$</li>
            <li>10 zusätzliche Überstunden (à $20\\text{ €} + 25\\% = 25,00\\text{ €}$): $10 \\times 25,00\\text{ €} = 250,00\\text{ €}$</li>
            <li><b>Bruttolohn:</b> $3.200,00 + 250,00 = \\mathbf{3.450,00\\text{ €}}$</li>
            <li><b>Nettolohn:</b> $3.450,00 - 710,00 - 440,00 = \\mathbf{2.300,00\\text{ €}}$</li>
          </ol>`,
          solutionAr: `<p><b>انتبه لصياغة سؤال الساعات الإضافية:</b> إذا قال السؤال «160 ساعة <i>من ضمنها (darin enthalten)</i> 10 ساعات إضافية» نضيف الـ25% فقط؛ أما هنا فقال «160 ساعة عادية <i>بالإضافة إلى (zusätzlich)</i> 10 ساعات إضافية» فنحسب أجر الساعة + العلاوة ($10 \\times 25\\text{ €} = 250\\text{ €}$).</p>`
        },
        {
          id: 'wiso-c-4',
          title: 'Aufgabe 4 (Rechenkästchen · 13 P.): Break-Even-Point (Gewinnschwelle)',
          points: 13,
          type: 'calc',
          lessonId: 'bwl-rechnen',
          taskDe: `<p>Für ein neues Hardware-Gateway fallen jährliche <b>Fixkosten ($K_f$) von 36.000,00 €</b> an. Die <b>variablen Stückkosten ($k_v$) betragen 35,00 €</b> je Gerät, der <b>Netto-Verkaufspreis ($p$) liegt bei 80,00 €</b> je Gerät.</p>
          <p>Ab welcher verkauften <b>Stückzahl ($x$)</b> erreicht das Produkt die <b>Gewinnschwelle (Break-Even-Point)</b>?</p>`,
          taskAr: `<p>تبلغ التكاليف الثابتة السنوية لمنتج <code>36.000 €</code>، والتكلفة المتغيرة للقطعة الواحدة <code>35 €</code>، وسعر بيع القطعة الصافي <code>80 €</code>. احسب <b>عدد القطع اللازم للوصول إلى نقطة التعادل (Break-Even-Point)</b>:</p>`,
          expected: '800',
          unit: 'Stück',
          acceptedAnswers: ['800', '800 Stück', '800 Stk'],
          rubric: [
            [6, 'Stückdeckungsbeitrag (db) = Preis − variable Stückkosten = 80 € − 35 € = 45,00 € / Stück', 'حساب هامش المساهمة للقطعة الواحدة: 80 − 35 = 45 €'],
            [7, 'Break-Even-Menge x = Fixkosten / db = 36.000 € / 45 € = 800 Stück', 'قسمة التكاليف الثابتة على هامش المساهمة: 36.000 / 45 = 800 قطعة']
          ],
          solutionDe: `<p><b>Rechenweg:</b></p>
          <ul>
            <li><b>Stückdeckungsbeitrag ($db$):</b> $p - k_v = 80,00\\text{ €} - 35,00\\text{ €} = \\mathbf{45,00\\text{ € je Stück}}$</li>
            <li><b>Break-Even-Menge ($x_{\\text{BEP}}$):</b> $\\frac{K_f}{db} = \\frac{36.000\\text{ €}}{45\\text{ €}} = \\mathbf{800\\text{ Stück}}$ (Erlös = Kosten = 64.000 €, Gewinn = 0 €).</li>
          </ul>`,
          solutionAr: `<p><b>معادلة نقطة التعادل السريعة:</b> $\\text{Break-Even} = \\frac{\\text{Fixkosten}}{\\text{Preis} - k_v} = \\frac{36.000}{80 - 35} = 800$ قطعة.</p>`
        },
        {
          id: 'wiso-c-5',
          title: 'Aufgabe 5 (Zuordnung · 12 P.): Sicherheitszeichen nach ISO 7010 im Betrieb',
          points: 12,
          type: 'match',
          lessonId: 'arbeitsschutz',
          taskDe: `<p>Ordne jeder <b>Kategorie von Sicherheitszeichen (ISO 7010 / ASR A1.3)</b> die geometrische Form und Farbkombination zu:</p>`,
          taskAr: `<p>طابق كل فئة من <b>علامات السلامة المهنية (ISO 7010)</b> مع شكلها الهندسي ولونها المميز:</p>`,
          pairs: [
            ['Verbotszeichen (z. B. Zutritt für Unbefugte verboten)', 'Runder Kreis mit weißem Grund, rotem Rand und rotem Querbalken'],
            ['Gebotszeichen (z. B. Augenschutz / Gehörschutz benutzen)', 'Runder blauer Kreis mit weißem Piktogramm (zwingende Handlungsvorschrift)'],
            ['Warnzeichen (z. B. Warnung vor elektrischer Spannung / Laserstrahl)', 'Gleichseitiges gelbes Dreieck mit schwarzem Rand und schwarzem Symbol'],
            ['Rettungszeichen (z. B. Notausgang / Erste Hilfe / Sammelstelle)', 'Grünes Quadrat oder Rechteck mit weißem Symbol']
          ],
          rubric: [
            [6, 'Verbotszeichen (Roter Kreis + Balken) und Gebotszeichen (Blauer Kreis) richtig zugeordnet', 'مطابقة علامات المنع (دائرة حمراء) وعلامات الإلزام (دائرة زرقاء)'],
            [6, 'Warnzeichen (Gelbes Dreieck) und Rettungszeichen (Grünes Rechteck) richtig zugeordnet', 'مطابقة علامات التحذير (مثلث أصفر) وعلامات الإنقاذ (مربع أخضر)']
          ],
          solutionDe: `<p><b>Eselsbrücke Formen &amp; Farben:</b> <b>Kreis</b> = Vorschrift (<b>Rot</b> = Verbot, <b>Blau</b> = Gebot). <b>Gelbes Dreieck</b> = Warnung. <b>Rechteck/Quadrat</b> = Information (<b>Grün</b> = Rettung, <b>Rot</b> = Brandschutz).</p>`,
          solutionAr: `<p><b>احفظها بالشكل واللون معاً:</b> الدائرة أمر (أحمر = ممنوع، أزرق = واجب)، المثلث الأصفر = تحذير خطر، والمربع الأخضر = مخرج طوارئ أو إسعاف.</p>`
        },
        {
          id: 'wiso-c-6',
          title: 'Aufgabe 6 (Zuordnung · 12 P.): Das Magische Viereck der Wirtschaftspolitik (StabG)',
          points: 12,
          type: 'match',
          lessonId: 'markt-konjunktur',
          taskDe: `<p>Ordne jedem der <b>4 Ziele des Magischen Vierecks (§ 1 Stabilitätsgesetz)</b> den passenden <b>Messindikator</b> zu:</p>`,
          taskAr: `<p>طابق كل هدف من الأهداف الأربعة في <b>المربع السحري للسياسة الاقتصادية (Magisches Viereck)</b> مع المؤشر الإحصائي الذي يقيسه:</p>`,
          pairs: [
            ['Stabiles Preisniveau (Geldwertstabilität)', 'Verbraucherpreisindex (VPI) / Inflationsrate (EZB-Zielwert: ca. 2 % mittelfristig)'],
            ['Hoher Beschäftigungsstand', 'Arbeitslosenquote (Verhältnis der registrierten Arbeitslosen zu allen Erwerbspersonen)'],
            ['Stetiges und angemessenes Wirtschaftswachstum', 'Reales Bruttoinlandsprodukt (BIP) — prozentuale Veränderung gegenüber dem Vorjahr'],
            ['Außenwirtschaftliches Gleichgewicht', 'Außenbeitrag / Leistungsbilanzsaldo (Verhältnis von Exporten und Importen)']
          ],
          rubric: [
            [6, 'Preisniveau -> VPI/Inflationsrate und Beschäftigung -> Arbeitslosenquote korrekt', 'ربط استقرار الأسعار بمؤشر التضخم والعمالة بمعدل البطالة'],
            [6, 'Wirtschaftswachstum -> Reales BIP und Außenwirtschaft -> Außenbeitrag/Exporte-Importe korrekt', 'ربط النمو بالناتج المحلي الإجمالي الحقيقي والتوازن الخارجي بالميزان التجاري']
          ],
          solutionDe: `<p><b>Warum heißt es „Magisches Viereck“?</b> Weil zwischen den vier Zielen <b>Zielkonflikte</b> bestehen (z. B. zwischen Vollbeschäftigung durch niedrige Zinsen und Preisniveaustabilität), sodass nie alle vier gleichzeitig perfekt erreicht werden.</p>`,
          solutionAr: `<p><b>سمّي بالمربع السحري</b> لأن تحقيق هدفين معاً قد يتعارض مع هدف ثالث (مثل خفض الفائدة لتنشيط التوظيف مما قد يرفع التضخم).</p>`
        },
        {
          id: 'wiso-c-7',
          title: 'Aufgabe 7 (Reihenfolge · 12 P.): Fünfstufige Abfallhierarchie nach KrWG',
          points: 12,
          type: 'order',
          lessonId: 'umwelt-ethik',
          taskDe: `<p>Ein Rechenzentrum mustert 80 Server und Notebooks aus. Bringe die <b>5 Stufen der gesetzlichen Abfallhierarchie (§ 6 Kreislaufwirtschaftsgesetz — KrWG)</b> von der <b>höchsten Priorität (1)</b> bis zur <b>niedrigsten Priorität (5)</b> in die richtige Reihenfolge:</p>`,
          taskAr: `<p>رتّب المراتب الخمس لـ<b>هرم معالجة النفايات البيئي (§ 6 KrWG)</b> من <b>الأولوية الأعلى (1)</b> إلى <b>الأولوية الأدنى (5)</b>:</p>`,
          steps: [
            '1. Vermeidung (Abfall gar nicht erst entstehen lassen, z. B. längere Nutzungsdauer / Aufrüstung)',
            '2. Vorbereitung zur Wiederverwendung (Prüfung, sichere Datenlöschung, Reinigung und Reparatur ganzer Geräte)',
            '3. Recycling (Stoffliche Verwertung: Zerlegung und Rückgewinnung von Rohstoffen wie Kupfer, Gold, Aluminium)',
            '4. Sonstige Verwertung (insbesondere energetische Verwertung / Verbrennung zur Energiegewinnung)',
            '5. Beseitigung (Deponierung / Endlagerung als allerletzter Ausweg)'
          ],
          rubric: [
            [6, 'Vermeidung (1) vor Vorbereitung zur Wiederverwendung (2) vor Recycling (3)', 'ترتيب المنع أولاً ثم إعادة الاستخدام ثانياً ثم إعادة التدوير ثالثاً'],
            [6, 'Sonstige/energetische Verwertung (4) vor Beseitigung/Deponie (5)', 'ترتيب الاستفادة الطاقية رابعاً والردم النهائي خامساً']
          ],
          solutionDe: `<p><b>Häufige Prüfungsfalle:</b> <b>Recycling ist erst Stufe 3!</b> Vor dem Schreddern zur Rohstoffgewinnung stehen immer <b>1. Vermeidung</b> und <b>2. Wiederverwendung (Re-Use nach zertifizierter Datenlöschung)</b>.</p>`,
          solutionAr: `<p><b>انتبه:</b> إعادة التدوير (<b>Recycling</b>) ليست المرتبة الأولى بل <b>المرتبة الثالثة</b> بعد المنع وإعادة الاستخدام!</p>`
        },
        {
          id: 'wiso-c-8',
          title: 'Aufgabe 8 (Multiple-Choice · 12 P.): Mutterschutz, Elternzeit & Unternehmenszusammenschlüsse',
          points: 12,
          type: 'mc',
          lessonId: 'urlaub-schutz',
          taskDe: `<p>Welche <b>zwei Aussagen</b> zu Mutterschutz/Elternzeit und Unternehmensverbindungen sind zutreffend?</p>`,
          taskAr: `<p>أي <b>عبارتين</b> صحيحتان حول <b>حماية الأمومة وإجازة الوالدين</b> وأشكال <b>اتحاد الشركات</b>؟</p>`,
          options: [
            '1. Die reguläre Mutterschutzfrist beginnt 6 Wochen vor dem berechneten Geburtstermin und endet im Normalfall 8 Wochen nach der Entbindung (12 Wochen bei Früh- oder Mehrlingsgeburten).',
            '2. Bei einem Konzern bleiben die zusammengeschlossenen Unternehmen rechtlich selbstständig, geben aber ihre wirtschaftliche Selbstständigkeit unter einer einheitlichen Leitung auf.',
            '3. Während der gesamten Elternzeit (bis zu 3 Jahre) zahlt der Arbeitgeber das reguläre Bruttogehalt zu 100 % weiter.',
            '4. Bei einer Fusion (Verschmelzung) behalten beide Unternehmen ihre eigene Rechtspersönlichkeit und ihren eigenen Handelsregistereintrag dauerhaft bei.',
            '5. Ein Kartell ist eine staatlich vorgeschriebene Pflichtversicherung für kleine Softwareunternehmen.'
          ],
          correct: [0, 1],
          rubric: [
            [6, 'Aussage 1 gewählt: Mutterschutzfrist 6 Wochen vor und 8 Wochen (bzw. 12 Wochen) nach der Geburt', 'اختيار العبارة 1: فترة حماية الأمومة 6 أسابيع قبل الولادة و8 (أو 12) أسبوعاً بعدها'],
            [6, 'Aussage 2 gewählt: Konzern = rechtlich selbstständig, wirtschaftlich unter einheitlicher Leitung (vs. Fusion = auch rechtliche Selbstständigkeit erlischt)', 'اختيار العبارة 2: في الـKonzern تحتفظ الشركات بشخصيتها القانونية وتخضع لإدارة اقتصادية موحدة']
          ],
          solutionDe: `<p><b>Richtig sind 1 und 2:</b> Während der <b>Elternzeit</b> ruht das Arbeitsverhältnis (keine Lohnzahlung durch AG, sondern staatliches <b>Elterngeld</b> i. d. R. 65–67 % für bis zu 12/14 Monate). Im <b>Konzern</b> bleibt die rechtliche Selbstständigkeit erhalten, die wirtschaftliche entfällt; bei der <b>Fusion (Trust)</b> erlischt auch die rechtliche Selbstständigkeit.</p>`,
          solutionAr: `<p><b>الفرق المهم جداً في اتحاد الشركات:</b><br>• <b>Kooperation / Kartell:</b> مستقلون قانونياً واقتصادياً (ما عدا مجال الاتفاق).<br>• <b>Konzern:</b> مستقلون قانونياً، تابعون اقتصادياً لإدارة موحدة.<br>• <b>Fusion (Verschmelzung):</b> يفقدون الاستقلال القانوني والاقتصادي معاً.</p>`
        }
      ]
    }
  );
})();
