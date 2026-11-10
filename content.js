/* Lerninhalte: bewusst einfache Daten + HTML, keine Abhängigkeiten. */
window.COURSE = {
 version:'1.0.0', date:'05.11.2026',
 modules:[
  {id:'planung',icon:'01',title:'Planung & Anforderungen',ar:'التخطيط وتحليل المتطلبات',desc:'Anforderungen, Methoden, Wirtschaftlichkeit und Kundengespräche.'},
  {id:'uml',icon:'02',title:'UML & Softwareentwurf',ar:'النمذجة وتصميم البرمجيات',desc:'Diagramme lesen, ergänzen und selbst entwerfen.'},
  {id:'code',icon:'03',title:'Algorithmen & Programmierung',ar:'الخوارزميات والبرمجة',desc:'Pseudocode, Datenstrukturen, OOP und nachvollziehbare Logik.'},
  {id:'daten',icon:'04',title:'Datenbanken & SQL',ar:'قواعد البيانات وSQL',desc:'Modellierung, Normalisierung und prüfungsnahe Abfragen.'},
  {id:'qualitaet',icon:'05',title:'Tests & Entwicklungswerkzeuge',ar:'الاختبارات وأدوات التطوير',desc:'Testfälle ableiten, Fehler finden und Qualität messen.'},
  {id:'sicherheit',icon:'06',title:'Security & Datenschutz',ar:'الأمان وحماية البيانات',desc:'Risiken begründen und passende Schutzmaßnahmen wählen.'},
  {id:'systeme',icon:'07',title:'Web, Netzwerke & Betrieb',ar:'الويب والشبكات وتشغيل الأنظمة',desc:'FIAE-Grundlagen mit Anwendungsbezug, inklusive Speicher und Cloud.'},
  {id:'wiso',icon:'08',title:'Wirtschafts- & Sozialkunde',ar:'الاقتصاد والقانون المهني',desc:'Rechte, Unternehmen, Sozialversicherung und Rechenaufgaben.'}
 ], lessons:[], sources:[
 ['ordnung','Ausbildungsordnung: PS / EUA / WiSo','https://www.gesetze-im-internet.de/fiausbv/','Rechtlicher Rahmen; §§ 13–15 beschreiben die schriftlichen Bereiche.'],
 ['aka','IHK-AkA: FIAE Prüfungsbereiche','https://www.ihk-aka.de/pruefungen/ap/berufe/detail/b1201','Aktuelle Übersicht über Prüfungsform und Dauer.'],
 ['katalog','AkA Prüfungsnews 09/24','https://www.ihk-aka.de/aktuelles/pruefungsnews/detail/202409','Überarbeiteter Katalog ab Sommer 2025; Änderungen der IT-Berufe.'],
 ['podcast','IT-Berufe-Podcast: Themenübersicht FIAE','https://it-berufe-podcast.de/vorbereitung-auf-die-ihk-abschlusspruefung-der-it-berufe/moegliche-themen-von-teil-2-der-gestreckten-abschlusspruefung-gap-fuer-fachinformatiker-anwendungsentwicklung/','Zusätzlicher Themenabgleich. Eigene Gruppierung und Empfehlungen des Autors; kein offizieller Katalog.'],
 ['sql','PostgreSQL: SQL-Tutorial','https://www.postgresql.org/docs/current/tutorial-sql.html','Technische Referenz. Beispiele im Lernstudio bleiben möglichst Standard-SQL.'],
 ['mdn','MDN: HTTP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview','Technischer Hintergrund zu Browser, Requests und Responses.'],
 ['wai','W3C: Web Accessibility','https://www.w3.org/WAI/fundamentals/accessibility-intro/','Barrierefreiheit und zugängliche Bedienoberflächen.'],
 ['owasp','OWASP: Top 10','https://owasp.org/projects/top-ten','Risiken für Webanwendungen; keine Rangnummern auswendig lernen.'],
 ['bbig','Berufsbildungsgesetz','https://www.gesetze-im-internet.de/bbig_2005/','Ausbildungsvertrag, Pflichten, Probezeit und Kündigung.'],
 ['arbeit','Arbeitszeitgesetz / Jugendarbeitsschutzgesetz','https://www.gesetze-im-internet.de/arbzg/','Arbeitszeit; zusätzliche Rechtslinks in den WiSo-Lektionen.'],
 ['bgb','Bürgerliches Gesetzbuch','https://www.gesetze-im-internet.de/bgb/','Verträge, AGB und Leistungsstörungen.'],
 ['dsgvo','DSGVO: EUR-Lex','https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de','Datenschutzprinzipien, Rechtsgrundlagen und Betroffenenrechte.'],
 ['lokal','Deine lokalen Unterlagen',null,'WiSo-Lernskript: 103 Seiten; FIAE-Aufgaben und Lösungen Winter 2025/26, Sommer 2025, Winter 2024/25. Aufgaben im Lernstudio sind neu formuliert.'],
 ['vault','Obsidian-Wissenssammlung / Katalog-Abgleich','https://gitlab.com/dev-public3/mnd-obsidian-docs','Lokale Themencheckliste und strukturierter Katalogexport als ergänzender Abgleich; nicht als amtlich verifizierte Vollständigkeitsgarantie.']
 ]
};
function S(title,de,ar){return {title,de,ar};}
function Q(q,a,ar,points=4){return {q,a,ar,points};}
function C(text){return '<pre><code>'+text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')+'</code></pre>';}
function L(id,module,title,ar,priority,summary,sections,terms,questions,check,sources=['ordnung','katalog']){
 COURSE.lessons.push({id,module,title,ar,priority,summary,sections,terms,questions,check,sources});
}
L('anforderungen','planung','Anforderungen & Spezifikation','المتطلبات والمواصفات (Lastenheft / Pflichtenheft)','Kern','Vom Kundenwunsch zu überprüfbaren Kriterien, Lasten-/Pflichtenheft, User Stories und MoSCoW.',[
 S('1. Funktionale Anforderung, Qualitätsanforderung (ISO 25010) & Randbedingung',
   `<p>In <b>Teil 1 (Planen eines Softwareproduktes)</b> verlangt die IHK regelmäßig (z. B. <b>2022S, 2023W, 2025S</b>), dass du Anforderungen aus einem Kundengespräch klassifizierst oder schwammige Wünsche messbar umformulierst:</p>
   <table>
     <thead><tr><th>Anforderungsart</th><th>Leitfrage</th><th>Unpräzises Negativbeispiel (0 P.)</th><th>Prüfungsreifes Beispiel (Volle Punktzahl)</th></tr></thead>
     <tbody>
       <tr><td><b>Funktionale Anforderung</b></td><td><b>WAS</b> soll das System tun? (Fachliche Funktion / Eingabe → Verarbeitung → Ausgabe)</td><td>„Rechnungsexport soll möglich sein.“</td><td>„Das System muss freigegebene Rechnungen auf Knopfdruck als XML-Datei nach Schema X exportieren.“</td></tr>
       <tr><td><b>Nicht-funktionale Anforderung (Qualitätsanforderung)</b></td><td><b>WIE GUT</b> soll das System arbeiten? (Performance, Sicherheit, Usability, Verfügbarkeit nach ISO 25010)</td><td>„Die Suche soll schnell und sicher sein.“</td><td>„95 % aller Suchanfragen müssen bei 200 gleichzeitigen Nutzern und 50.000 Datensätzen in <b>≤ 1,5 Sekunden</b> beantwortet werden (Zeitverhalten).“</td></tr>
       <tr><td><b>Randbedingung (Constraint)</b></td><td>Welche <b>festen Grenzen</b> sind vorgegeben? (Technik, Recht, Budget, Termin)</td><td>„Wir nehmen PostgreSQL.“</td><td>„Die Anwendung muss auf dem vorhandenen Linux-Server mit PostgreSQL 16 laufen und bis zum 30.09. produktiv gehen.“</td></tr>
     </tbody>
   </table>
   <ul>
     <li><b>4 Qualitätskriterien guter Anforderungen:</b> <b>Eindeutig</b> (kein Interpretationsspielraum), <b>widerspruchsfrei</b>, <b>realisierbar</b> und <b>testbar / messbar (SMART)</b>.</li>
   </ul>`,
   `<p><b>🔴 قاعدة الامتحان الذهبية (Teil 1):</b></p>
   <ul>
     <li><b>متطلب وظيفي (Funktional):</b> يصف <b>ماذا</b> يفعل النظام (مثال: تصدير الفاتورة بصيغة XML، إرسال بريد تأكيد).</li>
     <li><b>متطلب غير وظيفي / جودة (Nicht-funktional / Qualität):</b> يصف <b>كيف وبأي كفاءة</b> يعمل النظام (السرعة، الأمان، سهولة الاستخدام، التوافرية). <b>⚠️ فخ امتحاني:</b> لا تكتب في الامتحان عبارة عامة مثل <i>„Das System soll schnell sein“</i>؛ بل حوّلها دائماً إلى رقم قابل للقياس (زمن استجابة بالثواني + عدد المستخدمين المتزامنين + حجم البيانات).</li>
     <li><b>قيد (Randbedingung):</b> شرط خارجي مفروض مسبقاً (ميزانية محددة، موعد تسليم، لغة برمجة مفروضة، قانون DSGVO).</li>
   </ul>`),
 S('2. Lastenheft vs. Pflichtenheft (DIN 69901) & User Stories mit Akzeptanzkriterien',
   `<p>Die Abgrenzung zwischen <b>Lastenheft</b> und <b>Pflichtenheft</b> ist einer der häufigsten Klassiker in Teil 1 und WiSo (<b>2021W, 2023S, 2024W</b>):</p>
   <table>
     <thead><tr><th>Merkmal</th><th>Lastenheft (Kundensicht)</th><th>Pflichtenheft (Auftragnehmersicht)</th></tr></thead>
     <tbody>
       <tr><td><b>Wer erstellt es?</b></td><td>Der <b>Auftraggeber (Kunde)</b></td><td>Der <b>Auftragnehmer (IT-Dienstleister / Entwickler)</b></td></tr>
       <tr><td><b>Kernfrage</b></td><td><b>WAS</b> und <b>WOZU</b> soll etwas gelöst werden? (Gesamtheit der Forderungen)</td><td><b>WIE</b> und <b>WOMIT</b> werden die Anforderungen konkret technisch umgesetzt?</td></tr>
       <tr><td><b>Typischer Inhalt</b></td><td>Ist-Zustand, Zielsetzung, fachliche grobe Funktionen, Rahmenbedingungen, Budgetrahmen.</td><td>Soll-Konzept, Datenmodell (ER), UML-Diagramme, GUI-Mock-ups, Schnittstellenspezifikation, Testkriterien.</td></tr>
       <tr><td><b>Rechtliche Rolle</b></td><td>Grundlage für die Ausschreibung / Angebotseinholung.</td><td>Nach <b>Freigabe durch den Auftraggeber</b> verbindliche Vertragsgrundlage für die Abnahme (Werkvertrag!).</td></tr>
     </tbody>
   </table>
   <h3>User Stories &amp; MoSCoW-Priorisierung in agilen Projekten</h3>
   <ul>
     <li><b>User-Story-Schablone:</b> <code>„Als &lt;Rolle&gt; möchte ich &lt;Ziel/Funktion&gt;, um &lt;fachlicher Nutzen/Mehrwert&gt; zu erreichen.“</code></li>
     <li><b>Akzeptanzkriterien (Given–When–Then):</b> Präzisieren für jede User Story sowohl den Erfolgsfall als auch die Fehlerfälle (z. B. Pflichtfeld leer, fehlende Berechtigung).</li>
     <li><b>MoSCoW-Priorisierung:</b> <b>M</b>ust have (unverzichtbar für Release), <b>S</b>hould have (wichtig, aber Workaround möglich), <b>C</b>ould have (Nice-to-have bei freier Zeit), <b>W</b>on’t have (diesmal bewusst ausgeschlossen).</li>
   </ul>`,
   `<p><b>🔴 مقارنة لا يخلو منها امتحان (Lastenheft مقابل Pflichtenheft):</b></p>
   <ul>
     <li><b>كراسة الشروط (Lastenheft):</b> يكتبها <b>العميل (Auftraggeber)</b> وتجيب عن سؤال: <b>ماذا ولماذا (Was &amp; Wozu)؟</b></li>
     <li><b>كراسة المواصفات التنفيذية (Pflichtenheft):</b> يكتبها <b>المطور/الشركة المنفذة (Auftragnehmer)</b> وتجيب عن سؤال: <b>كيف وبماذا (Wie &amp; Womit)؟</b> وتصبح بعد اعتماد العميل المرجع القانوني لاختبار القبول النهائي (Abnahme).</li>
     <li><b>قصة المستخدم (User Story):</b> تتكون دائماً من 3 أركان: <b>الدور (Rolle) + الوظيفة (Funktion) + الفائدة (Nutzen)</b>، ولا تكتمل بدون <b>شروط القبول (Akzeptanzkriterien)</b>.</li>
   </ul>`)
 ],[['Anforderung','متطلب'],['Akzeptanzkriterium','شرط قبول قابل للتحقق'],['Randbedingung','قيد على الحل'],['Lastenheft / Pflichtenheft','كراسة شروط العميل (ماذا؟) / كراسة المواصفات التنفيذية (كيف؟)']],
 [Q('Formuliere „Die Suche soll schnell sein“ messbar und ordne die Anforderung ein.','Beispiel: 95 % der Suchanfragen antworten bei 100 parallelen Nutzern und 50.000 Datensätzen innerhalb von 1 s. Nicht-funktionale Leistungsanforderung; Messbedingungen sind festgelegt.','جواب مختصر كافٍ: معيار زمني + ظروف القياس + تصنيفها كمتطلب أداء، وليس وظيفة جديدة.'),Q('Ein Kunde verlangt eine neue Pflichtangabe im Export. Nenne drei sinnvolle Schritte vor der Umsetzung.','Anforderung und Akzeptanzkriterien klären; Auswirkungen auf Schema, Schnittstellen und bestehende Daten prüfen; Aufwand priorisieren und passende Tests/Abstimmung dokumentieren.','لا تكتفِ بكتابة الكود؛ افحص التوافق مع الأنظمة الأخرى والبيانات القديمة.')],['Funktion und Qualität unterscheiden','Eine unklare Anforderung messbar formulieren','Lastenheft und Pflichtenheft zuordnen']);
L('methoden','planung','Vorgehensmodelle, Scrum & Kanban','نماذج تطوير البرمجيات والعمل الرشيق (Scrum / Kanban)','Kern','Wasserfall, V-Modell, Spiralmodell, Scrum (Rollen, Events, Artefakte) und Kanban passend auswählen.',[
 S('1. Klassische vs. Iterative vs. Agile Vorgehensmodelle im Direktvergleich',
   `<p>In <b>2021W, 2022W, 2024S und 2025W</b> verlangte die IHK eine begründete Auswahl eines Vorgehensmodells anhand eines konkreten Projektszenarios:</p>
   <table>
     <thead><tr><th>Modell</th><th>Grundprinzip</th><th>Wann ideal einsetzen? (Vorteile)</th><th>Risiken / Nachteile</th></tr></thead>
     <tbody>
       <tr><td><b>Wasserfallmodell</b></td><td>Strikte, sequenzielle Phasen (Analyse → Entwurf → Implementierung → Test → Betrieb).</td><td>Anforderungen sind zu 100 % stabil, klar bekannt, kurze Projektdauer, feste behördliche Vorgaben.</td><td>Spätes Kundenfeedback; späteforderungsänderungen sind extrem teuer; lauffähige Software erst ganz am Ende.</td></tr>
       <tr><td><b>V-Modell (XT)</b></td><td>Erweitert den Wasserfall: Jeder Spezifikationsphase links steht direkt eine <b>Teststufe rechts</b> gegenüber (z. B. Fachkonzept ↔ Abnahmetest, Feinentwurf ↔ Komponententest).</td><td>Sicherheitskritische Systeme (Medizin, Luftfahrt, Behörden) mit hoher Nachweispflicht und Qualitätssicherung.</td><td>Hoher Dokumentationsaufwand; starr bei häufig wechselnden Kundenwünschen.</td></tr>
       <tr><td><b>Spiralmodell (Boehm)</b></td><td>Iteratives Modell in 4 Quadranten pro Windung: 1. Ziele/Alternativen, 2. <b>Risikoanalyse &amp; Prototyp</b>, 3. Entwicklung/Test, 4. Planung nächster Zyklus.</td><td>Große, innovative Projekte mit <b>hohen technischen oder finanziellen Risiken</b>.</td><td>Aufwendiges Risikomanagement; erfordert erfahrene Risikoanalysten.</td></tr>
       <tr><td><b>Agil (Scrum)</b></td><td>Iterativ-inkrementell in festen Zeitboxen (<b>Sprints</b> von 1–4 Wochen), an deren Ende immer ein nutzbares <b>Increment</b> steht.</td><td>Komplexe Produkte mit sich ändernden oder anfangs unklaren Kundenanforderungen (z. B. neues Kundenportal).</td><td>Erfordert hohe Verfügbarkeit des Kunden/Product Owners; kein festes Enddatum für einen starren Gesamtumfang.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 كيف تختار نموذج التطوير في الامتحان وتبرر إجابتك؟</b></p>
   <ul>
     <li><b>الشلال (Wasserfall):</b> اختره فقط عندما تكون المتطلبات ثابتة وواضحة بالكامل منذ البداية ولا يُتوقع تغييرها.</li>
     <li><b>نموذج V (V-Modell):</b> يربط كل مرحلة تخطيط على اليسار بمرحلة اختبار مقابلة لها على اليمين (ممتاز للأنظمة الحساسة التي تتطلب توثيقاً واختبارات صارمة).</li>
     <li><b>النموذج الحلزوني (Spiralmodell):</b> كلمة السر فيه هي <b>تحليل المخاطر (Risikoanalyse) وبناء النماذج الأولية (Prototypen)</b> في كل دورة.</li>
     <li><b>العمل الرشيق (Agil / Scrum):</b> اختره عندما تكون المتطلبات متغيرة أو يحتاج العميل لرؤية أجزاء قابلة للاستخدام (Increments) بسرعة لإعطاء تغذية راجعة (Feedback).</li>
   </ul>`),
 S('2. Scrum (3 Rollen, 5 Events, 3 Artefakte) & Kanban (WIP-Limits)',
   `<p>Nach dem offiziellen Scrum Guide (geprüft in <b>2022S, 2023W, 2025S</b>) besteht ein <b>Scrum Team</b> (typisch ≤ 10 Personen, keine Hierarchie) aus genau <b>3 Verantwortlichkeiten (Accountabilities)</b>, <b>5 Events</b> und <b>3 Artefakten</b>:</p>
   <table>
     <thead><tr><th>Scrum-Element</th><th>Bestandteile</th><th>Prüfungsrelevante Aufgabe &amp; Abgrenzung</th></tr></thead>
     <tbody>
       <tr><td><b>3 Rollen</b></td><td>• <b>Product Owner (PO)</b><br>• <b>Scrum Master (SM)</b><br>• <b>Developers</b></td><td>• <b>PO:</b> Maximiert den Produktwert, verwaltet und priorisiert allein das <b>Product Backlog</b> (Fachlichkeit: <i>WAS</i>).<br>• <b>SM:</b> Coacht das Team in Scrum, beseitigt Hindernisse (<i>Impediments</i>), moderiert.<br>• <b>Developers:</b> Schätzen den Aufwand, planen das <b>Sprint Backlog</b> und erstellen das nutzbare <b>Increment</b> (Technik: <i>WIE</i>).</td></tr>
       <tr><td><b>5 Events (Timeboxed)</b></td><td>1. <b>Sprint</b> (Container, ≤ 4 Wo.)<br>2. <b>Sprint Planning</b><br>3. <b>Daily Scrum</b> (max. 15 Min.)<br>4. <b>Sprint Review</b><br>5. <b>Sprint Retrospective</b></td><td>• <b>Planning:</b> Was schaffen wir im Sprint + Wie setzen wir es um → <i>Sprint Goal</i>.<br>• <b>Daily Scrum:</b> 15-Minuten-Abgleich der Developers für die nächsten 24h (kein Statusbericht an den Chef!).<br>• <b>Review:</b> Produktinkrement mit Stakeholdern prüfen (<b>Was</b> wurde gebaut?).<br>• <b>Retrospektive:</b> Zusammenarbeit, Prozess und Werkzeuge im Team verbessern (<b>Wie</b> haben wir gearbeitet?).</td></tr>
       <tr><td><b>3 Artefakte (+ Commitment)</b></td><td>1. <b>Product Backlog</b> (→ <i>Product Goal</i>)<br>2. <b>Sprint Backlog</b> (→ <i>Sprint Goal</i>)<br>3. <b>Increment</b> (→ <i>Definition of Done</i>)</td><td>Die <b>Definition of Done (DoD)</b> ist die verbindliche Qualitätscheckliste (z. B. Code-Review erledigt, Unit-Tests grün, Doku aktualisiert), die jedes Increment erfüllen muss!</td></tr>
     </tbody>
   </table>
   <p><b>Kanban im Vergleich:</b> Keine festen Sprints, sondern kontinuierlicher Fluss auf einem Board (z. B. <i>To Do → In Progress → Review → Done</i>). Das entscheidende Steuerungsinstrument ist das <b>WIP-Limit (Work in Progress Limit)</b>: Es begrenzt die maximale Anzahl gleichzeitig begonnener Aufgaben pro Spalte, deckt Engpässe (Bottlenecks) sofort auf und verhindert Multitasking-Reibungsverluste (<i>„Stop starting, start finishing!“</i>).</p>`,
   `<p><b>⚠️ أشهر فخاخ Scrum و Kanban في الامتحان:</b></p>
   <ul>
     <li><b>الفرق بين Sprint Review و Sprint Retrospektive:</b> الـ <code>Review</code> يفحص <b>المنتج (Produkt / Increment)</b> مع أصحاب المصلحة، بينما الـ <code>Retrospektive</code> تفحص <b>طريقة عمل الفريق والتعاون والأدوات</b> لتحسينها في السبرينت القادم.</li>
     <li><b>الفرق بين DoD و Akzeptanzkriterien:</b> شروط القبول تخص <b>User Story واحدة بعينها</b>، بينما <code>Definition of Done (DoD)</code> هي معيار الجودة العام الذي ينطبق على <b>كل</b> العمل في السبرينت.</li>
     <li><b>وظيفة WIP-Limit في Kanban:</b> تحديد الحد الأقصى للمهام الجارية في كل عمود لمنع تشتت المطورين وكشف نقاط الاختناق (Engpässe).</li>
   </ul>`)
 ],[['Vorgehensmodell','نموذج سير التطوير'],['Inkrement','جزء منتج قابل للاستخدام'],['Retrospektive','جلسة تحسين طريقة العمل'],['Definition of Done (DoD)','معيار الجودة الإلزامي لاكتمال أي جزء من المنتج'],['WIP-Limit','الحد الأقصى للمهام الجارية بالتوازي في Kanban']],
 [Q('Für ein neues Kundenportal ändern sich Anforderungen monatlich. Begründe eine geeignete Vorgehensweise.','Agil/inkrementell: kurze Lieferzyklen machen Anforderungen früh prüfbar; Kundenfeedback fließt in die nächste Priorisierung ein. Ein klarer Qualitätsstandard bleibt nötig.','اذكر الطريقة ثم سببين مرتبطين بتغيّر المتطلبات، لا شعارات عامة.'),Q('Was unterscheidet Sprint Review und Retrospektive?','Review: Produktincrement und weitere Produktrichtung mit Stakeholdern. Retrospektive: Zusammenarbeit, Werkzeuge und Arbeitsprozess im Scrum Team verbessern.','المنتج مقابل طريقة العمل؛ هذا هو الفرق الجوهري.')],['Ein Modell begründet wählen','Scrum-Verantwortungen und Ereignisse zuordnen','WIP-Limit erklären']);
L('planung-rechnen','planung','Aufwand, Netzplan & Risiken','تقدير الجهد، مخطط الشبكة (Netzplan) وإدارة المخاطر','Wichtig','Personenstunden vs. Dauer, Drei-Punkt-Schätzung, Netzplan (FAZ/FEZ/SAZ/SEZ/Puffer) und Risikomatrix.',[
 S('1. Aufwand vs. Dauer, Drei-Punkt-Schätzung (PERT) & Gantt vs. Netzplan',
   `<p>In <b>Teil 1 (2022S, 2023S, 2024W)</b> werden regelmäßig Rechenaufgaben zur Projektschätzung und Terminplanung gestellt:</p>
   <table>
     <thead><tr><th>Begriff / Methode</th><th>Formel &amp; Erklärung</th><th>Typische Prüfungsfalle</th></tr></thead>
     <tbody>
       <tr><td><b>Arbeitsaufwand (Effort) vs. Projektdauer (Duration)</b></td><td>• <b>Aufwand:</b> Arbeitsvolumen in <b>Personenstunden (PStd)</b> oder <b>Personentagen (PT)</b> (1 PT = üblicherweise 8 PStd).<br>• <b>Dauer:</b> Verstrichene Kalender-/Arbeitstage.<br>$\\text{Dauer} = \\frac{\\text{Aufwand in PT}}{\\text{Anzahl Mitarbeiter (bei 100 \\% Parallelisierbarkeit)}}$</td><td><b>Brooks’sches Gesetz:</b> 40 Personenstunden sind <b>nicht</b> durch 40 Personen in 1 Stunde erledigt (Abstimmungsaufwand, Einarbeitung, unteilbare Abhängigkeiten)!</td></tr>
       <tr><td><b>Drei-Punkt-Schätzung (PERT / Beta-Verteilung)</b></td><td>$$\\text{Schätzwert } E = \\frac{O + 4 \\cdot M + P}{6}$$<br>($O$ = optimistisch, $M$ = am wahrscheinlichsten / most likely, $P$ = pessimistisch)</td><td>Der wahrscheinliche Wert $M$ wird mit dem Faktor <b>4</b> gewichtet und die Summe durch <b>6</b> geteilt (nicht durch 3!).</td></tr>
       <tr><td><b>Gantt-Diagramm vs. Netzplan (DIN 69900)</b></td><td>• <b>Gantt (Balkenplan):</b> Zeigt Vorgänge proportional auf einer Zeitachse (Kalenderübersicht).<br>• <b>Netzplan:</b> Zeigt logische <b>Abhängigkeiten</b>, früheste/späteste Zeitpunkte und <b>Pufferzeiten</b>.</td><td>Ein Meilenstein ist im Projektplan ein <b>Prüfereignis mit der Dauer 0</b>!</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 قوانين التقدير والجدولة في الامتحان:</b></p>
   <ul>
     <li><b>الفرق بين الجهد (Aufwand) والمدة الزمنية (Dauer):</b> الجهد يُقاس بساعات أو أيام العمل البشرية (Personentage)، بينما المدة هي عدد الأيام التقويمية على أرض الواقع.</li>
     <li><b>معادلة النقاط الثلاث (Drei-Punkt-Schätzung):</b> احفظ الوزن 4 للقيمة الأرجح والقسمة على 6: $E = (O + 4M + P) / 6$.</li>
   </ul>`),
 S('2. Netzplan Schritt für Schritt berechnen (Kritischer Pfad & Puffer) + Risikosteuerung',
   `<p><b>Jeder Knoten im Vorgangsknoten-Netzplan hat 6 Felder</b>, die in zwei Durchläufen berechnet werden (<b>2022S, 2024S</b>):</p>
   <table>
     <thead><tr><th>Rechenschritt</th><th>Formel</th><th>Bedeutung</th></tr></thead>
     <tbody>
       <tr><td><b>1. Vorwärtsrechnung (von links nach rechts)</b></td><td>• Startknoten: $\\text{FAZ} = 0$<br>• $\\text{FEZ} = \\text{FAZ} + \\text{Dauer}$<br>• $\\text{FAZ}_{\\text{neu}} = \\max(\\text{alle } \\text{FEZ der Vorgänger})$</td><td>Bestimmt die <b>früheste</b> Lage jedes Vorgangs und die minimale Gesamtdauer. Bei mehreren Vorgängern bestimmt der <b>längste</b> Vorgänger den Start!</td></tr>
       <tr><td><b>2. Rückwärtsrechnung (von rechts nach links)</b></td><td>• Endknoten: $\\text{SEZ} = \\text{FEZ}_{\\text{Projektende}}$<br>• $\\text{SAZ} = \\text{SEZ} - \\text{Dauer}$<br>• $\\text{SEZ}_{\\text{alt}} = \\min(\\text{alle } \\text{SAZ der Nachfolger})$</td><td>Bestimmt, wann ein Vorgang <b>spätestens</b> enden/starten muss, ohne das Projektende zu verzögern. Bei mehreren Nachfolgern zählt das <b>Minimum</b>!</td></tr>
       <tr><td><b>3. Gesamtpuffer (GP)</b></td><td>$$\\text{GP} = \\text{SAZ} - \\text{FAZ} = \\text{SEZ} - \\text{FEZ}$$</td><td>Maximale Verzögerung, ohne das <b>Gesamtprojektende</b> zu gefährden.</td></tr>
       <tr><td><b>4. Freier Puffer (FP)</b></td><td>$$\\text{FP} = \\min(\\text{FAZ aller Nachfolger}) - \\text{eigenes FEZ}$$</td><td>Maximale Verzögerung, ohne auch nur den <b>frühesten Start des direkten Nachfolgers</b> zu verschieben.</td></tr>
       <tr><td><b>5. Kritischer Pfad</b></td><td>Kette aller Vorgänge vom Start zum Ende mit $\\text{GP} = 0$ und $\\text{FP} = 0$.</td><td>Jede Verzögerung auf dem kritischen Pfad verlängert sofort die gesamte Projektdauer!</td></tr>
     </tbody>
   </table>
   <h3>Risikomanagement im Projekt</h3>
   <ul>
     <li><b>Erwarteter monetärer Schaden (Risikowert):</b> $\\text{Risikowert} = \\text{Eintrittswahrscheinlichkeit (\\%)} \\times \\text{Schadenshöhe (€)}$.</li>
     <li><b>4 Strategien zur Risikobewältigung:</b> 1. <b>Vermeiden</b> (Ursache ausschließen), 2. <b>Vermindern / Reduzieren</b> (Wahrscheinlichkeit oder Schaden senken, z. B. durch Backup/Prototyp), 3. <b>Übertragen / Abwälzen</b> (Versicherung, Festpreis-Subunternehmer), 4. <b>Akzeptieren</b> (Restrisiko bewusst tragen).</li>
   </ul>`,
   `<p><b>🔴 وصفة حساب مخطط الشبكة (Netzplan) في دقيقتين:</b></p>
   <ol>
     <li><b>الحساب الأمامي (Vorwärts):</b> نبدأ بصفر، ونجمع المدة ($\text{FEZ} = \text{FAZ} + \text{Dauer}$)، وعند التقاء عدة أسهم نأخذ <b>الأكبر ($\max$)</b>.</li>
     <li><b>الحساب الخلفي (Rückwärts):</b> نطرح المدة ($\text{SAZ} = \text{SEZ} - \text{Dauer}$)، وعند الرجوع من عدة أسهم نأخذ <b>الأصغر ($\min$)</b>.</li>
     <li><b>السماح الكلي ($\text{GP} = \text{SAZ} - \text{FAZ}$):</b> المسار الذي يكون فيه $\text{GP} = 0$ هو <b>المسار الحرج (Kritischer Pfad)</b>.</li>
   </ol>`)
 ],[['Aufwand','الجهد البشري'],['Gesamtpuffer','السماح الكلي للتأخير'],['Eintrittswahrscheinlichkeit','احتمال وقوع الخطر'],['Kritischer Pfad','المسار الحرج (جميع مهامه بدون وقت سماح GP = 0)']],
 [Q('A dauert 3 Tage. Danach laufen B (4) und C (2) parallel. D (1) benötigt beide. Bestimme Mindestdauer und kritischen Pfad.','A → B → D: 3 + 4 + 1 = 8 Tage. A → C → D: 6 Tage. Kritischer Pfad A–B–D; C hat bei diesen Abhängigkeiten 2 Tage Gesamtpuffer.','نجمع المسار الأطول، ولا نجمع B وC لأنهما متوازيان.'),Q('Ein Ausfallrisiko hat 5 % Wahrscheinlichkeit und 40.000 € Schaden. Berechne den erwarteten monetären Schaden.','0,05 × 40.000 € = 2.000 €. Dies ist ein Erwartungswert, kein garantierter tatsächlicher Schaden. Weitere Folgen und Risikotoleranz berücksichtigen.','المتوسط الاحتمالي يساعد المقارنة، لكنه لا يعني أن الضرر الفعلي سيكون 2000 يورو.')],['Netzplan vorwärts/rückwärts rechnen','Risiko mit konkreter Maßnahme verknüpfen','Personenstunden von Tagen unterscheiden']);
L('wirtschaftlichkeit','planung','Wirtschaftlichkeit & Auswahlentscheidungen','الجدوى الاقتصادية والمفاضلة (Make-or-Buy / Nutzwertanalyse)','Wichtig','Kostenfunktionen, TCO, Amortisation und Nutzwertanalyse sauber berechnen und begründen.',[
 S('1. Kostenvergleich, Make-or-Buy (TCO) & Statische Amortisationsrechnung',
   `<p>In <b>Teil 1 (2021W, 2023S, 2024W, 2025W)</b> musst du wirtschaftliche Entscheidungen zwischen <b>Eigenentwicklung</b> (<i>Make</i>) und Fremdbezug/Kauf (<i>Buy</i>) rechnerisch und qualitativ begründen:</p>
   <table>
     <thead><tr><th>Rechnung / Konzept</th><th>Formel &amp; Rechenweg</th><th>Worauf Prüfer achten</th></tr></thead>
     <tbody>
       <tr><td><b>Kostenfunktion &amp; Kritische Menge / Zeit</b></td><td>$$K(x) = K_f + k_v \\cdot x$$<br>Schnittpunkt zweier Alternativen A und B:<br>$$K_A(x) = K_B(x) \\implies x_{\\text{krit}} = \\frac{K_{f,A} - K_{f,B}}{k_{v,B} - k_{v,A}}$$</td><td>Einheiten (€, €/Jahr, €/Stück) mitschreiben! Unterhalb von $x_{\\text{krit}}$ ist die Variante mit den <b>niedrigeren Fixkosten</b> günstiger, oberhalb die mit den <b>niedrigeren variablen Kosten</b>.</td></tr>
       <tr><td><b>Statische Amortisationsdauer (Payback Period)</b></td><td>$$\\text{Amortisationszeit (Jahre)} = \\frac{\\text{Anschaffungsinvestition (€)}}{\\text{Jährlicher Netto-Rückfluss (€/Jahr)}}$$<br>wobei: $\\text{Netto-Rückfluss} = \\text{Jährliche Einsparung} - \\text{zusätzliche laufende Jahreskosten}$</td><td><b>⚠️ Falle:</b> Vergiss niemals, die neuen laufenden Wartungs-/Lizenzkosten vorher von der jährlichen Einsparung abzuziehen!</td></tr>
       <tr><td><b>Total Cost of Ownership (TCO)</b></td><td>Gesamtkosten über die gesamte Nutzungsdauer: Anschaffung/Entwicklung + Installation/Migration + Schulung + laufender Betrieb/Support/Wartung + Ablösung.</td><td>Ein billiger Lizenzpreis kann durch hohe Schulungs-, Anpassungs- und Vendor-Lock-in-Kosten im TCO teurer sein!</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 قوانين المقارنة الاقتصادية في Teil 1:</b></p>
   <ul>
     <li><b>دالة التكلفة الكلية:</b> $K(x) = K_f + k_v \cdot x$. لإيجاد متى يتساوى تطوير البرنامج داخلياً (Make) مع شراء برنامج جاهز (Buy)، نساوي المعادلتين $K_A(t) = K_B(t)$.</li>
     <li><b>فترة استرداد رأس المال (Amortisationszeit):</b> نقسم تكلفة الاستثمار المبدئية على <b>صافي الوفر السنوي</b> (أي الوفر السنوي مطروحاً منه تكاليف الصيانة والتشغيل السنوية الجديدة).</li>
   </ul>`),
 S('2. Nutzwertanalyse (Scoring-Modell) & die 5 Dimensionen der Machbarkeit',
   `<p>Wenn qualitative Kriterien (z. B. Usability, Supportqualität, Erweiterbarkeit) verglichen werden, nutzt man die <b>Nutzwertanalyse (NWA)</b> (geprüft in <b>2022W, 2024S, 2025S</b>):</p>
   <ol>
     <li><b>K.O.- / Muss-Kriterien vorab prüfen:</b> Erfüllt ein Anbieter ein zwingendes Kriterium nicht (z. B. fehlende DSGVO-Konformität oder Budget überschritten), scheidet er <b>vor</b> der NWA aus!</li>
     <li><b>Kriterien &amp; Gewichtung festlegen:</b> Die Summe aller Gewichtungen muss exakt <b>100 % (bzw. 1,0)</b> ergeben.</li>
     <li><b>Punkte vergeben &amp; gewichten:</b> Für jede Alternative $\\text{Teilnutzwert} = \\text{Gewicht} \\times \\text{Punktzahl}$.</li>
     <li><b>Gesamtnutzwert summieren &amp; kritisch würdigen:</b> Die Alternative mit der höchsten Summe gewinnt qualitativ. <b>Grenze der NWA:</b> Auswahl und Gewichtung der Kriterien sowie Punktvergabe sind <b>subjektiv</b>!</li>
   </ol>
   <h3>Die 5 Dimensionen der Machbarkeitsanalyse (Feasibility Study)</h3>
   <ul>
     <li><b>1. Technische Machbarkeit:</b> Reichen Hardware, Schnittstellen und Know-how im Team?</li>
     <li><b>2. Wirtschaftliche Machbarkeit:</b> Stehen Kosten/Budget in einem sinnvollen Verhältnis zum Nutzen (ROI / Amortisation)?</li>
     <li><b>3. Zeitliche (terminliche) Machbarkeit:</b> Ist die Deadline mit den verfügbaren Ressourcen realistisch?</li>
     <li><b>4. Rechtliche Machbarkeit:</b> Sind DSGVO, Betriebsrat (§ 87 BetrVG), Lizenzrecht und Barrierefreiheit (BFSG) eingehalten?</li>
     <li><b>5. Organisatorische Machbarkeit:</b> Akzeptieren die Mitarbeiter/Stakeholder den neuen Prozess?</li>
   </ul>`,
   `<p><b>🔴 خطوات تحليل القيمة النفعية (Nutzwertanalyse) والجدوى (Machbarkeit):</b></p>
   <ul>
     <li>في <b>Nutzwertanalyse</b>: استبعد أولاً أي بديل يفشل في شرط إلزامي (Muss-Kriterium)، ثم اضرب وزن كل معيار في درجته واجمع النقاط. وإذا سألك الامتحان عن <b>عيب/حدود (Grenze/Nachteil)</b> هذه الطريقة فاكتب فوراً: <b>الذاتية في تحديد الأوزان وإعطاء النقاط (Subjektivität bei Gewichtung und Punktevergabe)</b>.</li>
     <li>احفظ أبعاد دراسة الجدوى الخمسة: <b>تقنية، اقتصادية، زمنية، قانونية، وتنظيمية</b>.</li>
   </ul>`)
 ],[['Amortisation','مدة استرداد الاستثمار'],['Nutzwertanalyse','مفاضلة متعددة المعايير'],['TCO','التكلفة الكلية طوال الاستخدام'],['Muss-Kriterium (K.O.-Kriterium)','شرط إلزامي يؤدي عدم توفره لاستبعاد البديل فوراً']],
 [Q('Eine Eigenentwicklung kostet 18.000 €. Sie spart 8.000 € jährlich, verursacht aber 2.000 € zusätzliche Jahreskosten. Amortisationszeit?','Netto-Rückfluss = 8.000 − 2.000 = 6.000 €/Jahr. 18.000 / 6.000 = 3 Jahre. Zinsen und zeitliche Zahlungsunterschiede sind in dieser statischen Rechnung unberücksichtigt.','ابدأ بالتوفير الصافي ثم اقسم الاستثمار عليه.'),Q('A erreicht bei Sicherheit 5 und Bedienbarkeit 3 Punkte, B jeweils 4. Gewichte 60 % / 40 %. Ergebnis?','A: 5×0,6 + 3×0,4 = 4,2. B: 4×0,6 + 4×0,4 = 4,0. A gewinnt bei diesen Gewichten; Muss-Anforderungen vorher prüfen.','الناتج مجموع النقاط الموزونة، وليس مجموع الدرجات الخام.')],['Kostenfunktionen und Schnittpunkt rechnen','Amortisation aus Netto-Rückfluss bestimmen','Nutzwertanalyse begründet interpretieren']);
L('kunden','planung','Kommunikation, Verträge & Dokumentation','التواصل مع العملاء، نموذج الجوانب الأربعة والتوثيق','Basis','Kundengespräche strukturieren, 4-Seiten-Modell (Schulz von Thun), Dokumentationsarten und Diagrammwahl.',[
 S('1. Kundengespräch, Fragetechniken & Vier-Seiten-Modell (Schulz von Thun)',
   `<p><b>Für Beratungs-</b>, Anforderungs- und Supportgespräche prüft die IHK Kommunikationsmodelle und Gesprächsführung (<b>2021W, 2023W</b>):</p>
   <table>
     <thead><tr><th>Konzept</th><th>Kerninhalt für die Prüfung</th><th>Praxisbeispiel im IT-Projekt</th></tr></thead>
     <tbody>
       <tr><td><b>Vier-Seiten-Modell (Schulz von Thun)</b></td><td>Jede Nachricht hat 4 Ebenen:<br>1. <b>Sachinhalt</b> (Daten, Fakten)<br>2. <b>Selbstoffenbarung</b> (Gefühl/Zustand des Senders)<br>3. <b>Beziehungsseite</b> (Wie steht der Sender zum Empfänger?)<br>4. <b>Appell</b> (Wunsch: Was soll der Empfänger tun?)</td><td>Kunde sagt: <i>„Schon wieder stürzt die Maske ab!“</i><br>• Sache: Maske stürzt ab.<br>• Selbstkundgabe: Ich bin frustriert/unter Zeitdruck.<br>• Beziehung: Ihr liefert schlechte Qualität.<br>• Appell: Behebt den Fehler sofort!</td></tr>
       <tr><td><b>Aktives Zuhören &amp; Fragetechniken</b></td><td>• <b>Offene Fragen (W-Fragen):</b> Zum Erkunden der Anforderungen am Gesprächsanfang.<br>• <b>Geschlossene Fragen:</b> Zur verbindlichen Bestätigung/Entscheidung.<br>• <b>Paraphrasieren:</b> Gehörtes in eigenen Worten zusammenfassen, um Missverständnisse auszuschließen.</td><td><i>„Habe ich Sie richtig verstanden, dass der CSV-Import fehlerhafte Zeilen überspringen und in ein separates Fehlerprotokoll schreiben soll?“</i></td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 نموذج الجوانب الأربعة للرسالة (Vier-Seiten-Modell):</b></p>
   <ul>
     <li>كل جملة يقولها العميل تحمل 4 أوجه: <b>المحتوى الموضوعي (Sachinhalt)</b>، <b>الكشف عن الذات (Selbstoffenbarung)</b>، <b>العلاقة (Beziehung)</b>، و<b>النداء/الطلب (Appell)</b>.</li>
     <li>لتجنب سوء الفهم مع العميل استخدم <b>الإنصات الفعال (Aktives Zuhören)</b> عبر إعادة صياغة المطلوب بكلماتك (Paraphrasieren) ثم توثيق ما تم الاتفاق عليه كتابياً (Gesprächsprotokoll).</li>
   </ul>`),
 S('2. Technische Dokumentationsarten & Auswahl des richtigen Diagrammtyps',
   `<p>Je nach Zielgruppe werden in der Softwareentwicklung drei Dokumentationsarten unterschieden (<b>2022S, 2024W</b>):</p>
   <table>
     <thead><tr><th>Dokumentationsart</th><th>Zielgruppe</th><th>Typische Inhalte</th></tr></thead>
     <tbody>
       <tr><td><b>Benutzerdokumentation (Anwenderhandbuch)</b></td><td>Endanwender / Sachbearbeiter</td><td>Aufgabenorientierte Schritt-für-Schritt-Anleitungen, Screenshots, Bedeutung von Fehlermeldungen, FAQ. (Keine Quellcode-Details!)</td></tr>
       <tr><td><b>Betriebs- / Systemdokumentation</b></td><td>Systemadministratoren / DevOps</td><td>Systemvoraussetzungen, Installations-/Deployment-Schritte, Konfigurationsdateien, Backup-/Restore-Prozedur, Monitoring.</td></tr>
       <tr><td><b>Entwickler- / Softwaredokumentation</b></td><td>Programmierer / Softwarearchitekten</td><td>Architekturübersicht, UML-Klassen-/Sequenzdiagramme, Datenbankschema (ER), API-Spezifikation (OpenAPI/Swagger), Code-Kommentare.</td></tr>
     </tbody>
   </table>
   <ul>
     <li><b>Diagrammtypen für Präsentationen:</b> <b>Säulen-/Balkendiagramm</b> = Vergleich einzelner Kategorien; <b>Liniendiagramm</b> = zeitlicher Verlauf / Trend; <b>Kreis-/Tortendiagramm</b> = prozentuale Anteile eines Ganzen (Summe = 100 %).</li>
   </ul>`,
   `<p><b>🔴 أنواع التوثيق الثلاثة حسب الفئة المستهدفة (Zielgruppe):</b></p>
   <ul>
     <li><b>توثيق المستخدم (Benutzerdokumentation):</b> للموظف العادي (يشرح خطوات الاستخدام وحل الأخطاء الشائعة).</li>
     <li><b>توثيق التشغيل (System-/Betriebsdokumentation):</b> لمدير النظام (التثبيت، الإعدادات، النسخ الاحتياطي والاستعادة).</li>
     <li><b>توثيق المطور (Entwicklerdokumentation):</b> للمبرمجين (المعمارية، مخططات UML، الجداول، وتوثيق API).</li>
   </ul>`)
 ],[['Aktives Zuhören','الإنصات مع التأكد من الفهم'],['Compliance','الالتزام بالقواعد'],['Zielgruppe','الفئة المستهدفة'],['Vier-Seiten-Modell','نموذج الجوانب الأربعة للرسالة (موضوعي، ذاتي، علاقة، نداء)']],
 [Q('Ein Kunde sagt „Das ist unbrauchbar“. Formuliere eine fachlich hilfreiche Reaktion.','„Welche Arbeitsschritte können Sie derzeit nicht erledigen? Können wir einen konkreten Fall gemeinsam durchgehen?“ Danach Ergebnis und gewünschtes Verhalten bestätigen.','لا تدخل في دفاع عام. حوّل الشكوى إلى حالة قابلة للفحص.'),Q('Welche drei Informationen braucht eine Anleitung zur Wiederherstellung einer Datenbank?','Voraussetzungen/Berechtigungen und passende Sicherung; genaue Restore-Schritte in richtiger Reihenfolge; Validierung des Ergebnisses und Vorgehen bei Fehlern.','قائمة الأوامر وحدها غير كافية دون شروط البداية والتحقق من نجاح الاستعادة.')],['Gespräch strukturieren','Dokumentationen nach Zielgruppe unterscheiden','Datenvisualisierung korrekt beschriften'],['ordnung','katalog','bgb']);
L('ux','planung','UI/UX, Ergonomie & Barrierefreiheit','تصميم الواجهات، سهولة الاستخدام (ISO 9241) والإتاحة (BFSG)','Kern','DIN EN ISO 9241-11 & 9241-110, Barrierefreiheit (WCAG / BFSG) und Mock-up-Entwurf für Teil 1.',[
 S('1. Gebrauchstauglichkeit (ISO 9241-11) & die 7 Grundsätze der Dialoggestaltung (ISO 9241-110)',
   `<p>In <b>Teil 1 (2022S, 2023W, 2025S)</b> musst du bestehende Masken anhand der <b>DIN EN ISO 9241-110</b> kritisieren oder ein eigenes <b>GUI-Mock-up / Wireframe</b> entwerfen:</p>
   <table>
     <thead><tr><th>Grundsatz (ISO 9241-110)</th><th>Erklärung</th><th>Konkretes UI-Beispiel (Prüfungsbegründung!)</th></tr></thead>
     <tbody>
       <tr><td><b>1. Aufgabenangemessenheit</b></td><td>Unterstützt die Erledigung der Fachaufgabe ohne unnötige Schritte.</td><td>PLZ-Eingabe füllt den Ort automatisch vor; nur fachlich benötigte Pflichtfelder abfragen.</td></tr>
       <tr><td><b>2. Selbstbeschreibungsfähigkeit</b></td><td>Jeder Dialogschritt ist durch Beschriftungen/Hinweise sofort verständlich.</td><td>Klare Labels über Eingabefeldern (nicht nur verschwindende Placeholder!), Einheiten angeben (z. B. <code>Gewicht in kg</code>).</td></tr>
       <tr><td><b>3. Erwartungskonformität</b></td><td>Verhält sich konsistent und entspricht den Konventionen der Nutzergruppe.</td><td>„Speichern“-Button immer unten rechts in gleicher Farbe; Disketten-/Papierkorb-Symbol wie gewohnt genutzt.</td></tr>
       <tr><td><b>4. Erlernbarkeit</b></td><td>unterstützt den Nutzer beim Einstieg und Entdecken von Funktionen.</td><td>Tooltips, Schritt-für-Schritt-Assistent (Wizard) wie <i>„Schritt 1 von 3“</i>.</td></tr>
       <tr><td><b>5. Steuerbarkeit</b></td><td>Der Nutzer bestimmt Tempo, Reihenfolge und Richtung des Dialogs.</td><td>„Zurück“- und „Abbrechen“-Button vorhanden; Ergebnisse frei sortier- und filterbar.</td></tr>
       <tr><td><b>6. Fehlertoleranz (Robustheit gegen Benutzungsfehler)</b></td><td>Fehler werden verhindert oder mit geringem Aufwand korrigierbar gemacht.</td><td>Sicherheitsabfrage vor dem Löschen, <b>Undo-Funktion</b>, präzise Fehlermeldung am betroffenen Feld (statt „Fehler 42“) unter Erhalt bereits eingegebener Daten!</td></tr>
       <tr><td><b>7. Individualisierbarkeit (Benutzerbindung)</b></td><td>Anpassbar an individuelle Bedürfnisse und Vorlieben.</td><td>Schriftgröße, Dark Mode, speicherbare Dashboard-Spalten oder Favoriten.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 المبادئ السبعة لتصميم الواجهات (DIN EN ISO 9241-110) — احفظها مع مثال لكل مبدأ:</b></p>
   <ol>
     <li><b>ملاءمة المهمة (Aufgabenangemessenheit):</b> إظهار الحقول اللازمة فقط والملء التلقائي للقيم الافتراضية.</li>
     <li><b>الوصف الذاتي (Selbstbeschreibungsfähigkeit):</b> عناوين واضحة للحقول والوحدات دون حاجة لدليل خارجي.</li>
     <li><b>مطابقة التوقعات (Erwartungskonformität):</b> ثبات أماكن الأزرار والأيقونات والاختصارات في كل النوافذ.</li>
     <li><b>قابلية التعلم (Erlernbarkeit):</b> تلميحات (Tooltips) أو معالج خطوات (Wizard).</li>
     <li><b>قابلية التحكم (Steuerbarkeit):</b> قدرة المستخدم على التراجع أو الإلغاء والتحكم في سرعة وترتيب الخطوات.</li>
     <li><b>تحمل الأخطاء (Fehlertoleranz):</b> تأكيد قبل الحذف، رسائل خطأ تشرح السبب وطريقة التصحيح بجانب الحقل مع عدم مسح البيانات الصحيحة التي أدخلها المستخدم.</li>
     <li><b>القابلية للتخصيص (Individualisierbarkeit):</b> تكبير الخط، الوضع الليلي، أو تخصيص القوائم.</li>
   </ol>`),
 S('2. Barrierefreiheit (WCAG / BFSG) & Checkliste für Mock-up-Zeichnungen in der Prüfung',
   `<p>Seit Inkrafttreten des <b>Barrierefreiheitsstärkungsgesetzes (BFSG)</b> ist Barrierefreiheit nach den <b>4 WCAG-Prinzipien (POUR)</b> ein hochaktuelles Prüfthema:</p>
   <ul>
     <li><b>1. Wahrnehmbar (Perceivable):</b> Ausreichender Farbkontrast, <b>Alternativtexte (<code>alt</code>-Attribut)</b> für Bilder/Icons, Status und Fehler <b>niemals nur durch Farbe</b> (Rot/Grün) kennzeichnen, sondern zusätzlich durch Text und Symbol (<code>!</code> / <code>✓</code>).</li>
     <li><b>2. Bedienbar (Operable):</b> Vollständige <b>Tastaturbedienbarkeit</b> (logische <code>Tab</code>-Reihenfolge, sichtbarer Fokusrahmen) ohne Mauszwang.</li>
     <li><b>3. Verständlich (Understandable):</b> Eindeutige Labels (mit <code>&lt;label for="..."&gt;</code> verknüpft), Pflichtfelder mit <code>*</code> und Legende markieren, konkrete Korrekturhinweise.</li>
     <li><b>4. Robust (Robust):</b> Semantisches HTML (<code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;button&gt;</code> statt <code>&lt;div&gt;</code>) und <code>ARIA</code>-Attribute für Screenreader.</li>
   </ul>
   <p><b>Checkliste, wenn du in Teil 1 ein Mock-up zeichnen musst:</b> 1. Fenstertitel/Überschrift, 2. Alle geforderten Eingabefelder mit sichtbarem Label + Einheit, 3. Auswahlfelder (Dropdown/Radio/Checkbox) erkennbar machen, 4. Pflichtfeldmarkierung (<code>* Pflichtfeld</code>), 5. Primärbutton (z. B. <i>Speichern</i>) UND Sekundärbutton (<i>Abbrechen / Zurück</i>), 6. Bereich für Status-/Fehlermeldung.</p>`,
   `<p><b>🔴 قائمة التحقق عند رسم واجهة (Mock-up) في الامتحان لتحصل على العلامة الكاملة:</b></p>
   <ul>
     <li>ضع عنواناً للنافذة، وتسمية واضحة (Label) فوق أو بجانب كل حقل مع الوحدة (مثل: <code>€</code> أو <code>Stück</code> أو <code>TT.MM.JJJJ</code>)، وعلامة النجمة <code>*</code> للحقول الإلزامية، وزر حفظ (Speichern) وزر إلغاء (Abbrechen).</li>
     <li><b>في أسئلة الإتاحة (Barrierefreiheit):</b> اذكر دائماً: عدم الاعتماد على اللون وحده في رسائل الخطأ (عمى الألوان)، إمكانية التحكم الكامل بلوحة المفاتيح (Tastaturbedienbarkeit)، والنصوص البديلة للصور لقارئات الشاشة (Screenreader).</li>
   </ul>`)
 ],[['Gebrauchstauglichkeit','قابلية الاستخدام'],['Fehlertoleranz','تحمل أخطاء المستخدم'],['Barrierefreiheit','إتاحة الاستخدام لذوي الاحتياجات المختلفة'],['Wireframe / Mock-up','تخطيط هيكلي للواجهة / نموذج مرئي للواجهة']],
 [Q('Ein Pflichtfeld wird nur durch einen roten Rahmen markiert. Nenne zwei Verbesserungen und begründe.','Textliche Fehlermeldung mit konkretem Korrekturhinweis; programmatisch zugeordnetes Label/Fehlertext. So ist die Information unabhängig von Farbwahrnehmung und für Screenreader nutzbar.','لا تذكر لونًا آخر فقط؛ أضف وسيلة دلالية ونصًا مفهومًا.'),Q('Wie unterscheidet sich ein Usability-Test von einem Funktionstest?','Usability-Test beobachtet, ob reale Zielgruppen Aufgaben verständlich und effizient lösen. Funktionstest prüft spezifiziertes Systemverhalten. Ein korrekt rechnendes Formular kann trotzdem schlecht bedienbar sein.','صحة الوظيفة لا تضمن أن المستخدم يعرف استخدامها.')],['Mock-up mit Erfolg-/Fehlerzuständen entwerfen','Ergonomie anhand eines Falls begründen','Tastatur, Label und Kontrast berücksichtigen'],['ordnung','wai']);
L('usecase','uml','Use-Case-Diagramme','مخططات حالات الاستخدام (UML Use-Case-Diagramm)','Kern','Akteure, Systemgrenze, «include», «extend», Generalisierung und Bedingung (Extension Point) fehlerfrei zeichnen.',[
 S('1. Elemente des Use-Case-Diagramms & fachliches Schneiden',
   `<p>In fast jeder AP2 Teil 1 (z. B. <b>2022S, 2023W, 2024W, 2025S</b>) musst du ein <b>UML-Anwendungsfalldiagramm (Use-Case-Diagramm)</b> zeichnen oder ergänzen (bis zu <b>25 Punkte</b>!):</p>
   <table>
     <thead><tr><th>Element</th><th>Darstellung in UML</th><th>Prüfungsregel &amp; typische Fehler</th></tr></thead>
     <tbody>
       <tr><td><b>Systemgrenze (System Boundary)</b></td><td>Großes <b>Rechteck</b> mit dem Systemnamen oben im Rahmen</td><td>Umschließt <b>alle</b> Use Cases. Akteure stehen <b>immer außerhalb</b> des Rechtecks!</td></tr>
       <tr><td><b>Akteur (Actor)</b></td><td>Strichmännchen oder Rechteck mit <code>«actor»</code></td><td>Repräsentiert eine <b>Rolle</b> (Mensch oder externes Fremdsystem wie Zahlungsdienst/Zeiterfassung). Eine interne Datenbank des Systems ist <b>kein</b> Akteur!</td></tr>
       <tr><td><b>Anwendungsfall (Use Case)</b></td><td><b>Ellipse (Oval)</b> mit kurzem <i>Substantiv + Verb</i> (z. B. <i>„Kunde anlegen“</i>)</td><td>Beschreibt ein abgeschlossenes fachliches Ziel mit Mehrwert – <b>keine</b> einzelnen GUI-Schritte wie „Passwortfeld anklicken“ und <b>keine</b> Reihenfolge/Ablauflogik!</td></tr>
       <tr><td><b>Assoziation</b></td><td>Durchgezogene Linie zwischen Akteur und Use Case</td><td>Zeigt: Dieser Akteur ist an diesem Anwendungsfall beteiligt.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 قواعد رسم Use-Case-Diagramm في الامتحان:</b></p>
   <ul>
     <li><b>حدود النظام (Systemgrenze):</b> مستطيل يحوي بداخله جميع حالات الاستخدام (الأشكال البيضاوية)، ويبقى الممثلون (Akteure) <b>خارج المستطيل دائماً</b>.</li>
     <li><b>الأنظمة الخارجية (Fremdsysteme):</b> إذا كان النظام يتواصل مع بوابة دفع خارجية أو نظام بريد خارجي، يُرسم هذا النظام الخارجي كممثل (Actor) خارج المستطيل. أما قاعدة بيانات النظام الداخلية فليست ممثلاً!</li>
   </ul>`),
 S('2. «include» vs. «extend» (Pfeilrichtung!) & Generalisierung (Vererbung)',
   `<p>Der häufigste Punktverlust in der Prüfung entsteht durch verwechselte <b>Pfeilrichtungen</b> bei <code>«include»</code> und <code>«extend»</code>:</p>
   <table>
     <thead><tr><th>Beziehung</th><th>Bedeutung</th><th>Pfeilart &amp; Pfeilrichtung (KRITISCH!)</th><th>Beispiel aus der Prüfung</th></tr></thead>
     <tbody>
       <tr><td><b><code>«include»</code> (Enthält-Beziehung)</b></td><td>Der Basis-Use-Case bindet den anderen Use Case <b>zwingend und jedes Mal</b> als Teilaufgabe mit ein.</td><td>Gestrichelter Pfeil <b>VOM Basis-Use-Case ZUM eingebundenen Pflicht-Use-Case</b>:<br><code>Basis - - «include» - -&gt; Pflichtteil</code></td><td><code>Bestellung aufgeben - -«include»-&gt; Bonität prüfen</code> (wird bei <i>jeder</i> Bestellung geprüft).</td></tr>
       <tr><td><b><code>«extend»</code> (Erweiterung)</b></td><td>Ein optionaler Use Case erweitert den Basis-Use-Case <b>nur unter einer bestimmten Bedingung (Condition / Extension Point)</b>.</td><td>Gestrichelter Pfeil <b>VOM optionalen Erweiterungs-Use-Case ZURÜCK ZUM Basis-Use-Case</b>:<br><code>Optional - - «extend» - -&gt; Basis</code></td><td><code>Gutschein einlösen - -«extend»-&gt; Bestellung aufgeben</code> mit Notiz <code>Condition: {Gutschein vorhanden}</code>.</td></tr>
       <tr><td><b>Generalisierung (Vererbung)</b></td><td>Der spezialisierte Akteur (oder Use Case) erbt alle Assoziationen des allgemeinen Elements und hat weitere eigene.</td><td>Durchgezogene Linie mit <b>nicht ausgefülltem (hohlem) Dreieck</b> in Richtung des <b>allgemeineren</b> Akteurs/Use Cases:<br><code>Speziell ──▷ Allgemein</code></td><td><code>Filialleiter ──▷ Mitarbeiter</code> (Filialleiter darf alles, was ein Mitarbeiter darf, plus „Rabatt freigeben“).</td></tr>
     </tbody>
   </table>`+C('Bestellung abschließen - -«include»- -> Gesamtpreis berechnen   (immer!)\nGutschein einlösen     - -«extend»- ->  Bestellung abschließen  (nur falls Bedingung erfüllt!)\nFilialleiter           ──────▷          Mitarbeiter             (erbt alle Use Cases)'),
   `<p><b>⚠️ احفظ اتجاه السهم في «include» و «extend» جيداً (أشهر فخ في Teil 1):</b></p>
   <ul>
     <li>في <b><code>«include»</code> (إلزامي دائماً):</b> السهم المتقطع يخرج <b>من الحالة الأساسية إلى الحالة الفرعية المضمّنة</b>.</li>
     <li>في <b><code>«extend»</code> (اختياري/مشروط):</b> السهم المتقطع يخرج <b>من الحالة الإضافية الاختيارية عائداً إلى الحالة الأساسية</b>! وإذا ذُكر شرط في السؤال (مثل: في حال تجاوز المبلغ 500 يورو)، ارسم مربع ملاحظة صغير (Note) مربوطاً بخط متقطع مع سهم الـ extend واكتب فيه: <code>Condition: {Betrag &gt; 500 €}</code> و <code>Extension Point</code>.</li>
   </ul>`)
 ],[['Akteur','دور خارجي يتفاعل مع النظام'],['Systemgrenze','حدود النظام'],['Erweiterung','سلوك إضافي بشرط'],['Extension Point / Condition','نقطة التمديد وشرط تفعيل علاقة extend']],
 [Q('Jede Bestellung berechnet den Gesamtpreis, nur manche lösen einen Gutschein ein. Welche Beziehungen passen?','Gesamtpreis berechnen wird inkludiert (include). Gutschein einlösen kann bei erfüllter Bedingung eine Erweiterung (extend) sein. Pfeile entsprechend vom Basisfall zum inkludierten Fall bzw. vom Erweiterungsfall zum Basisfall.','اذكر أيضًا اتجاه السهم؛ اختيار الاسم وحده لا يثبت فهم الرسم.'),Q('Ist eine Datenbank automatisch ein Akteur?','Nur wenn sie als externes System außerhalb der betrachteten Systemgrenze mit dem System interagiert. Eine interne Datenbank ist normalerweise ein Implementierungsdetail.','المعيار موقعها بالنسبة إلى حدود النظام، لا كونها برنامجًا.')],['include/extend samt Pfeilrichtung zeichnen','Akteur von interner Komponente trennen','Vor-/Nachbedingungen nennen']);
L('klasse','uml','Klassendiagramme & Beziehungen','مخططات الفئات والعلاقات (UML-Klassendiagramm)','Kern','Sichtbarkeiten, statisch/abstrakt, Multiplizitäten, Assoziation, Aggregation, Komposition und Vererbung.',[
 S('1. Klassenaufbau, Sichtbarkeiten, Statisch vs. Abstrakt & Multiplizitäten',
   `<p>Das <b>UML-Klassendiagramm</b> ist das wichtigste Strukturdiagramm in <b>Teil 1 und Teil 2</b> (in fast jeder Prüfung mit <b>15 bis 30 Punkten</b> vertreten):</p>
   <table>
     <thead><tr><th>Notationselement</th><th>Schreibweise im Klassenkasten</th><th>Bedeutung für Code &amp; Prüfung</th></tr></thead>
     <tbody>
       <tr><td><b>Sichtbarkeiten</b></td><td>• <code>-</code> <b>private</b><br>• <code>#</code> <b>protected</b><br>• <code>+</code> <b>public</b><br>• <code>~</code> <b>package</b></td><td>• <code>-</code> nur innerhalb derselben Klasse sichtbar (Geheimnisprinzip / Kapselung für Attribute!).<br>• <code>#</code> in derselben Klasse und in <b>Unterklassen (Subklassen)</b> sichtbar.<br>• <code>+</code> von überall aufrufbar.</td></tr>
       <tr><td><b>Attribut-Syntax</b></td><td><code>- preis: Decimal = 0.0</code></td><td><code>Sichtbarkeit Name : Datentyp [= Standardwert]</code></td></tr>
       <tr><td><b>Methoden-Syntax</b></td><td><code>+ berechneRabatt(prozent: Double): Decimal</code></td><td><code>Sichtbarkeit Name(Parametername: Typ) : Rückgabetyp</code> (oder <code>void</code>).</td></tr>
       <tr><td><b>Statisch (<code>static</code>)</b></td><td><u><code>+ anzahlInstanzen: Integer</code></u><br><u><code>+ getInstance(): Config</code></u></td><td><b>Unterstrichen!</b> Gehört zur Klasse selbst, nicht zum einzelnen Objekt (existiert nur einmal im Speicher).</td></tr>
       <tr><td><b>Abstrakt / Interface</b></td><td><i><code>Konto</code></i> oder <code>{abstract}</code><br><code>«interface» Zahlbar</code></td><td><i>Kursiv</i> oder mit <code>{abstract}</code> = kann <b>nicht direkt instanziiert</b> werden (kein <code>new Konto()</code>).</td></tr>
     </tbody>
   </table>
   <p><b>Multiplizitäten richtig herum lesen:</b> Steht zwischen <code>Kunde</code> und <code>Bestellung</code> bei Kunde eine <code>1</code> und bei Bestellung <code>0..*</code>, liest man von links nach rechts: <i>„Ein Kunde hat 0 bis beliebig viele Bestellungen“</i> und von rechts nach links: <i>„Jede Bestellung gehört zu genau 1 Kunden“</i>.</p>`,
   `<p><b>🔴 قواعد قراءة ورسم UML-Klassendiagramm في الامتحان:</b></p>
   <ul>
     <li><b>الرموز الأربعة للرؤية:</b> <code>-</code> خاص (private للخصائص)، <code>#</code> محمي (protected للوراثة)، <code>+</code> عام (public للدوال)، <code>~</code> على مستوى الحزمة.</li>
     <li><b>الخط تحت الاسم (<u>Unterstrichen</u>):</b> يعني أن الخاصية أو الدالة <code>static</code> (تابعة للفئة نفسها).</li>
     <li><b>التعددية (Multiplizität):</b> الرقم المكتوب عند طرف الكائن B يعبّر عن <b>كم كائناً من B يرتبط بكائن واحد من A</b>.</li>
   </ul>`),
 S('2. Alle 6 Beziehungsarten im Klassendiagramm (Raute vs. Dreieck!)',
   `<p>Verwechsle niemals die Raute (Teil-Ganzes) mit dem Dreieck (<b>Vererbung</b>/<b>Interface</b>) und beachte, an welchem Ende das Symbol sitzt:</p>
   <table>
     <thead><tr><th>Beziehungsart</th><th>UML-Pfeil / Symbol</th><th>Wo sitzt das Symbol?</th><th>Fachliche &amp; technische Bedeutung</th></tr></thead>
     <tbody>
       <tr><td><b>1. Gerichtete Assoziation</b></td><td><code>A ───────&gt; B</code></td><td>Offene Pfeilspitze bei <code>B</code></td><td><code>A</code> kennt <code>B</code> (<code>A</code> besitzt ein Attribut vom Typ <code>B</code> oder <code>List&lt;B&gt;</code>), <code>B</code> kennt <code>A</code> nicht.</td></tr>
       <tr><td><b>2. Aggregation (Schwaches Teil-Ganzes)</b></td><td><code>Ganzes ◇────── Teil</code></td><td><b>Leere (hohle) Raute</b> am <b>Ganzen</b>!</td><td>„Besteht-aus“-Beziehung, aber das <code>Teil</code> kann <b>auch ohne das Ganze weiterexistieren</b> und zu mehreren Ganzen gehören (z. B. <code>Team ◇── Mitarbeiter</code>).</td></tr>
       <tr><td><b>3. Komposition (Starkes Teil-Ganzes)</b></td><td><code>Ganzes ◆────── Teil</code></td><td><b>Ausgefüllte (schwarze) Raute</b> am <b>Ganzen</b>!</td><td><b>Existenzabhängigkeit!</b> Ein <code>Teil</code> gehört zu einem Zeitpunkt zu <b>maximal 1 Ganzen</b> (<code>1</code> oder <code>0..1</code> an der Raute!). Wird das Ganze gelöscht, werden seine Teile mitgelöscht (z. B. <code>Gebäude ◆── Raum</code>, <code>Bestellung ◆── Bestellposition</code>).</td></tr>
       <tr><td><b>4. Generalisierung (Vererbung / „ist-ein“)</b></td><td><code>Sub ──────▷ Super</code></td><td>Durchgezogene Linie + <b>hohles Dreieck</b> an der <b>Oberklasse</b>!</td><td><code>Sub</code> erbt alle nicht-privaten Attribute und Methoden von <code>Super</code> (z. B. <code>Girokonto ──▷ Konto</code>).</td></tr>
       <tr><td><b>5. Realisierung (Interface implementieren)</b></td><td><code>Klasse - - - -▷ Interface</code></td><td><b>Gestrichelte Linie</b> + <b>hohles Dreieck</b> am <b>Interface</b>!</td><td><code>Klasse</code> verpflichtet sich, alle Methoden des Interfaces zu implementieren.</td></tr>
       <tr><td><b>6. Abhängigkeit (Dependency / „benutzt kurz“)</b></td><td><code>A - - - - -&gt; B</code></td><td>Gestrichelte Linie + offene Pfeilspitze bei <code>B</code></td><td><code>A</code> nutzt <code>B</code> nur temporär (z. B. als Methodenparameter oder Rückgabetyp), speichert <code>B</code> aber nicht als Attribut.</td></tr>
     </tbody>
   </table>`,
   `<p><b>⚠️ جدول الحسم بين العلاقات الست في UML-Klassendiagramm (مهم جداً!):</b></p>
   <ul>
     <li><b>المعين الفارغ (<code>◇</code> Aggregation) مقابل المعين الأسود المملوء (<code>◆</code> Komposition):</b> كلاهما يوضع دائماً <b>عند الكل (Ganzes) وليس عند الجزء!</b> المعين الأسود (Komposition) يعني أن الجزء لا يعيش بدون الكل ويُحذف بحذفه (مثل سطر الفاتورة داخل الفاتورة، أو الغرفة داخل المبنى).</li>
     <li><b>خط متصل مع مثلث فارغ (<code>──▷</code>):</b> وراثة (Vererbung) ويشير دائماً إلى الفئة الأب (Oberklasse).</li>
     <li><b>خط متقطع مع مثلث فارغ (<code>- -▷</code>):</b> تطبيق واجهة (Interface-Realisierung) ويشير إلى الواجهة.</li>
   </ul>`)
 ],[['Multiplizität','عدد الكائنات الممكنة في العلاقة'],['Komposition','تركيب بملكية ودورة حياة مترابطة'],['Sichtbarkeit','مستوى الوصول'],['Aggregation','تجميع ضعيف (الجزء يمكن أن يستمر بالوجود مستقلاً عن الكل)']],
 [Q('Ein Kunde hat 0 bis viele Bestellungen, jede Bestellung genau einen Kunden. Gib die Multiplizitäten an.','Am Ende Kunde: 1. Am Ende Bestellung: 0..*. Die Zahl steht jeweils bei der Klasse, deren Anzahl aus Sicht der Gegenseite beschrieben wird.','تثبيت هذه القاعدة يمنع الخطأ الأكثر شيوعًا.'),Q('Bestellpositionen dürfen nicht ohne ihre Bestellung existieren. Welche Beziehung und wo steht die Raute?','Komposition; gefüllte Raute an Bestellung. Die Beziehung und die Multiplizitäten müssen die fachliche Regel widerspiegeln.','الماسة عند الكل Bestellung، لا عند الجزء.')],['Multiplizitäten in beide Richtungen lesen','Komposition und Vererbung trennen','Eine Klasse mit Attributen/Methoden zeichnen']);
L('aktivitaet','uml','Aktivitätsdiagramme, BPMN & EPK','مخططات النشاط والعمليات (Aktivitätsdiagramm / BPMN / EPK)','Kern','Start/Ende, Verzweigung [Guard], Merge, Fork/Join (Parallelität), Swimlanes und BPMN 2.0.',[
 S('1. UML-Aktivitätsdiagramm: Alle Symbole & der Unterschied zwischen Raute und Balken',
   `<p>In <b>2021W, 2022W, 2024S und 2025W</b> verlangte die IHK das Zeichnen oder Vervollständigen eines <b>UML-Aktivitätsdiagramms</b> (oft bis zu <b>25 Punkte</b>):</p>
   <table>
     <thead><tr><th>Knotentyp</th><th>Symbol</th><th>Eingänge → Ausgänge</th><th>Prüfungsregel &amp; typische Fehler</th></tr></thead>
     <tbody>
       <tr><td><b>Startknoten</b></td><td>Gefüllter schwarzer Kreis <code>●</code></td><td>0 → 1</td><td>Genau ein Startpunkt des Ablaufs.</td></tr>
       <tr><td><b>Aktion (Action)</b></td><td>Rechteck mit <b>abgerundeten Ecken</b></td><td>1 → 1</td><td>Enthält einen aktiven Arbeitsschritt (<i>Substantiv + Verb im Infinitiv</i>, z. B. <code>Rabatt berechnen</code>). Keine Bedingungen in Aktionskästen schreiben!</td></tr>
       <tr><td><b>Entscheidungsknoten (Decision)</b></td><td><b>Raute <code>◇</code></b></td><td>1 → ≥ 2</td><td><b>ODER-Verzweigung (XOR):</b> An <b>jedem</b> ausgehenden Pfeil muss ein <b>Guard in eckigen Klammern</b> stehen (z. B. <code>[Betrag &gt;= 100]</code> und <code>[Betrag &lt; 100]</code> bzw. <code>[sonst]</code>). Die Guards müssen disjunkt und vollständig sein!</td></tr>
       <tr><td><b>Zusammenführung (Merge)</b></td><td><b>Raute <code>◇</code></b></td><td>≥ 2 → 1</td><td>Führt alternative Pfade (oder einen Schleifen-Rücksprung!) wieder zusammen, <b>ohne</b> auf andere Pfade zu warten.</td></tr>
       <tr><td><b>Parallelisierung (Fork / Aufspaltung)</b></td><td>Dicker schwarzer <b>Balken</b></td><td>1 → ≥ 2</td><td><b>UND-Aufspaltung:</b> Startet alle ausgehenden Pfade <b>gleichzeitig (nebenläufig)</b>!</td></tr>
       <tr><td><b>Synchronisation (Join)</b></td><td>Dicker schwarzer <b>Balken</b></td><td>≥ 2 → 1</td><td><b>UND-Zusammenführung:</b> Wartet, bis <b>alle</b> eingehenden parallelen Pfade abgeschlossen sind, bevor es weitergeht!</td></tr>
       <tr><td><b>Aktivitätsende</b></td><td>Bullseye <code>◉</code> (Kreis mit gefülltem Punkt)</td><td>≥ 1 → 0</td><td>Beendet die <b>gesamte</b> Aktivität (im Gegensatz zum Flussende <code>⊗</code>, das nur einen einzelnen parallelen Zweig beendet).</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 أخطر خطأين في رسم UML-Aktivitätsdiagramm في الامتحان:</b></p>
   <ul>
     <li><b>الخلط بين المعين (Raute <code>◇</code>) والشريط الأسود العريض (Balken <code>▬</code>):</b> المعين يُستخدم <b>للشروط البديلة (إما هذا المسار أو ذاك)</b> ويجب كتابة الشرط بين قوسين مربعين <code>[Bedingung]</code> على كل سهم خارج منه، ثم يُغلق بمعين تجميع (Merge). أما الشريط الأسود فيُستخدم <b>للتوازي (تنفيذ مسارين معاً في نفس الوقت)</b> ويُغلق بشريط تزامن (Join) ينتظر اكتمال المسارين معاً!</li>
     <li><b>الرجوع في حلقة تكرار (Schleife):</b> لا ترجع بالسهم مباشرة إلى داخل نشاط (Aktion)، بل أرجعه إلى معين تجميع (Merge-Raute) قبل النشاط!</li>
   </ul>`),
 S('2. Swimlanes (Verantwortlichkeiten), BPMN 2.0 & EPK im Vergleich',
   `<p>Neben dem UML-Aktivitätsdiagramm ist seit dem <b>neuen Prüfungskatalog 2025/2026</b> auch <b>BPMN 2.0 (Business Process Model and Notation)</b> explizit prüfungsrelevant:</p>
   <table>
     <thead><tr><th>Merkmal</th><th>UML-Aktivitätsdiagramm</th><th>BPMN 2.0</th><th>EPK (Ereignisgesteuerte Prozesskette)</th></tr></thead>
     <tbody>
       <tr><td><b>Verantwortungsbereiche</b></td><td><b>Aktivitätsbereiche (Swimlanes / Partitionen)</b> unterteilen die Spalten nach Akteur/Abteilung.</td><td><b>Pools</b> (eigenständige Organisationen, z. B. Kunde vs. Webshop) und <b>Lanes</b> (Abteilungen innerhalb eines Pools).</td><td>Organisationseinheiten werden als Oval an die Funktion gehängt.</td></tr>
       <tr><td><b>Verbindungen zwischen Bereichen</b></td><td>Normale Kontrollfluss-Pfeile über Swimlane-Grenzen hinweg.</td><td>• Innerhalb eines Pools: <b>Sequenzfluss</b> (durchgezogener Pfeil).<br>• Zwischen zwei verschiedenen Pools: <b>Nachrichtenfluss</b> (<b>gestrichelter Pfeil</b> mit kleinem Kreis am Start)!</td><td>Kontrollfluss wechselt streng zwischen <b>Ereignis (Sechseck, passiv)</b> und <b>Funktion (abgerundetes Rechteck, aktiv)</b>.</td></tr>
       <tr><td><b>Gateways / Konnektoren</b></td><td>Raute (XOR) vs. Balken (AND).</td><td>Raute mit Symbol innen: <b><code>×</code> = XOR</b> (Exklusiv), <b><code>+</code> = AND</b> (Parallel), <b><code>○</code> = OR</b> (Inklusiv).</td><td>Kreise mit <code>XOR</code>, <code>∧</code> (AND) oder <code>∨</code> (OR).</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔮 توقع قوي للامتحان القادم (BPMN 2.0):</b></p>
   <ul>
     <li>احفظ رموز البوابات الثلاث داخل المعين في <b>BPMN 2.0</b>: علامة <b><code>×</code> (XOR)</b> تعني مساراً واحداً فقط، علامة <b><code>+</code> (AND)</b> تعني مسارات متوازية معاً، وعلامة الدائرة <b><code>○</code> (OR)</b> تعني مساراً واحداً أو أكثر.</li>
     <li>التواصل داخل نفس المؤسسة (Pool) يكون بسهم متصل (Sequenzfluss)، أما التواصل بين مؤسستين مختلفتين (مثلاً العميل والمتجر) فيكون <b>بسهم متقطع (Nachrichtenfluss)</b>!</li>
   </ul>`)
 ],[['Verzweigung','تفريع حسب شرط'],['Synchronisation','انتظار اكتمال المسارات المطلوبة'],['Swimlane','مسار يبيّن المسؤولية'],['Fork / Join','شريط تفريع متوازٍ / شريط مزامنة وانتظار المسارات المتوازية']],
 [Q('Nach Zahlungseingang werden Rechnung und Lagerbuchung parallel erstellt. Versand startet erst danach. Welche Knoten?','Fork vor den beiden Aktionen, Join danach, anschließend Versand. Der Join wartet auf beide erforderlichen parallelen Abläufe.','شريط فصل ثم شريط مزامنة؛ ليست حالتين بديلتين.'),Q('Ein Pfad nach einer Entscheidung ist [Alter ≥ 18], der andere [Alter < 18]. Warum ist ein Merge statt Join passend?','Die Pfade sind Alternativen. Nur einer läuft; ein Merge führt den gewählten Pfad weiter, ohne auf den anderen zu warten.','Join قد يسبب انتظارًا مستحيلًا إذا كان أحد الفرعين فقط قابلًا للتنفيذ.')],['Entscheidung von Fork unterscheiden','Guards vollständig angeben','BPMN-Nachrichtenfluss zuordnen']);
L('sequenz-zustand','uml','Sequenz- & Zustandsdiagramme','مخططات التتابع وحالات الكائن (Sequenz- & Zustandsdiagramm)','Kern','Lebenslinien, Aktivierungsbalken, Fragmente (loop/alt/opt) sowie Zustände und Transitionen.',[
 S('1. UML-Sequenzdiagramm: Lebenslinien, Nachrichten & Fragmente (loop, alt, opt)',
   `<p>Das <b>UML-Sequenzdiagramm</b> zeigt die <b>zeitliche Reihenfolge</b> von Methodenaufrufen zwischen Objekten (von oben nach unten; geprüft in <b>2022S, 2023S, 2024W, 2025S</b>):</p>
   <table>
     <thead><tr><th>Element</th><th>Darstellung</th><th>Prüfungsregel &amp; Stolpersteine</th></tr></thead>
     <tbody>
       <tr><td><b>Lebenslinie (Lifeline)</b></td><td>Kasten oben (<code>objektname : Klassenname</code>) + senkrechte gestrichelte Linie</td><td>Die Zeitachse läuft streng <b>von oben nach unten</b>.</td></tr>
       <tr><td><b>Aktivierungsbalken</b></td><td>Schmales Rechteck auf der Lebenslinie</td><td>Zeigt die Dauer an, in der das Objekt aktiv eine Methode ausführt.</td></tr>
       <tr><td><b>Synchrone Nachricht (Methodenaufruf)</b></td><td>Durchgezogener Pfeil mit <b>gefüllter Pfeilspitze</b> <code>──────▶</code></td><td>Der Aufrufer wartet, bis die aufgerufene Methode eine Antwort liefert. Beschriftung muss exakt dem Methodennamen im Klassendiagramm entsprechen!</td></tr>
       <tr><td><b>Antwortnachricht (Return)</b></td><td><b>Gestrichelter Pfeil</b> mit offener Spitze <code>&lt;- - - -</code></td><td>Liefert das Ergebnis am Ende des Aktivierungsbalkens zurück.</td></tr>
       <tr><td><b>Asynchrone Nachricht</b></td><td>Durchgezogener Pfeil mit <b>offener Pfeilspitze</b> <code>──────&gt;</code></td><td>Aufrufer wartet nicht auf Antwort (z. B. Event/Thread).</td></tr>
       <tr><td><b>Kombinierte Fragmente (Rahmen)</b></td><td>Rechteckrahmen mit Operator oben links:<br>• <b><code>loop [Bedingung]</code></b><br>• <b><code>opt [Bedingung]</code></b><br>• <b><code>alt [Bedingung 1] ... [sonst]</code></b></td><td>• <b><code>loop</code>:</b> Schleife (für jedes Element).<br>• <b><code>opt</code>:</b> Optionaler Block (einziges <code>if</code> ohne <code>else</code>).<br>• <b><code>alt</code>:</b> Verzweigung (<code>if / else</code>), unterteilt durch eine horizontale gestrichelte Linie!</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 قواعد رسم وقراءة UML-Sequenzdiagramm في الامتحان:</b></p>
   <ul>
     <li><b>نوع السهم:</b> استدعاء دالة ينتظر النتيجة (Synchron) = سهم متصل برأس مثلث مملوء <code>──▶</code>، والرد (Return) = سهم متقطع برأس مفتوح <code>&lt;- -</code>.</li>
     <li><b>الأطر المركبة (Fragmente):</b> التكرار = <code>loop</code>، الشرط الفردي بدون بديل = <code>opt</code>، والشرط ذو المسارين أو أكثر (if/else) = <code>alt</code> مفصولاً بخط أفقي متقطع.</li>
   </ul>`),
 S('2. UML-Zustandsdiagramm (Zustandsautomat): entry / do / exit & Transitionen',
   `<p>Während ein Aktivitätsdiagramm einen Prozess über mehrere Beteiligte zeigt, beschreibt das <b>Zustandsdiagramm</b> den <b>Lebenszyklus eines einzelnen Objekts</b> (z. B. einer <code>Bestellung</code> oder eines <code>Tickets</code> – geprüft in <b>2021W, 2023W, 2025W</b>):</p>
   <table>
     <thead><tr><th>Element</th><th>Syntax im Diagramm</th><th>Bedeutung</th></tr></thead>
     <tbody>
       <tr><td><b>Zustand (State)</b></td><td>Abgerundetes Rechteck mit Zustandsname oben (Substantiv/Adjektiv wie <code>InPrüfung</code>, <code>Freigegeben</code>)</td><td>Innere Aktivitäten im Zustand:<br>• <b><code>entry / Aktion</code>:</b> Wird <i>einmalig beim Betreten</i> des Zustands ausgeführt.<br>• <b><code>do / Aktivität</code>:</b> Läuft <i>während</i> das Objekt im Zustand verweilt.<br>• <b><code>exit / Aktion</code>:</b> Wird <i>einmalig beim Verlassen</i> ausgeführt.</td></tr>
       <tr><td><b>Zustandsübergang (Transition)</b></td><td>Pfeil zwischen zwei Zuständen mit:<br><b><code>Ereignis [Guard] / Effekt</code></b></td><td>• <b>Ereignis (Trigger):</b> Auslöser von außen (z. B. <code>bezahlen</code>).<br>• <b><code>[Guard]</code>:</b> Boolesche Wächterbedingung in eckigen Klammern (z. B. <code>[Betrag &gt;= Summe]</code>). Nur wenn wahr, feuert der Übergang!<br>• <b><code>/ Effekt</code>:</b> Aktion beim Übergang (z. B. <code>/ Quittung senden</code>).</td></tr>
     </tbody>
   </table>`+C('Neu ── bezahlen [Betrag >= offen] / Zahlung speichern ──▶ Bezahlt\nBezahlt ── versenden / Trackingnummer setzen ──▶ Versendet'),
   `<p><b>🔴 الصيغة الثلاثية على سهم الانتقال في Zustandsdiagramm:</b></p>
   <ul>
     <li>تُكتب دائماً بهذا الترتيب: <b><code>الحدث [الشرط] / الأثر</code> (<code>Ereignis [Bedingung] / Aktion</code>)</b>.</li>
     <li>داخل صندوق الحالة نفسه احفظ الفرق بين: <code>entry / ...</code> (عند الدخول للحالة)، و <code>do / ...</code> (أثناء البقاء فيها)، و <code>exit / ...</code> (عند مغادرتها).</li>
   </ul>`)
 ],[['Lebenslinie','خط حياة مشارك'],['Guard','شرط السماح بالانتقال'],['Zustandsübergang','انتقال بين حالتين'],['Fragment (loop/alt/opt)','إطار تحكم في مخطط التتابع (تكرار / بدائل / اختياري)']],
 [Q('Welche Sequenzfragmente brauchst du für jede Rechnungsposition und einen optionalen Rabatt?','loop für die Positionen; opt [Rabatt vorhanden] für den optionalen Rabatt. alt verwenden, wenn sich zwei oder mehr Abläufe gegenseitig ausschließen.','اختيار opt مناسب لوجود كتلة أو عدمها، لا لمسارين متناقضين.'),Q('Interpretiere: freigeben [PrüfungOK] / Freigabezeit setzen.','Beim Ereignis freigeben erfolgt der Übergang nur, wenn PrüfungOK gilt; dabei wird die Freigabezeit gesetzt. Ohne erfüllten Guard findet dieser Übergang nicht statt.','ثلاثة أجزاء: المحفّز، شرط المرور، والأثر الناتج.')],['loop/alt/opt passend einsetzen','Ereignis, Guard und Effekt trennen','entry/do/exit zuordnen']);
L('architektur','uml','Architektur, SOLID & Design Patterns','المعمارية، مبادئ SOLID وأنماط التصميم','Kern','Schichtenarchitektur, MVC/MVVM, Monolith vs. Microservices, Kohäsion/Kopplung, SOLID und GoF-Muster.',[
 S('1. Schichtenarchitektur (3-Tier), MVC vs. MVVM & Monolith vs. Microservices',
   `<p><b>Architekturentscheidungen und deren Begründung</b> sind ein Kernthema in <b>Teil 1 (2022W, 2023S, 2024S, 2025S)</b>:</p>
   <table>
     <thead><tr><th>Architekturmuster</th><th>Aufbau &amp; Zuständigkeit</th><th>Prüfungsvorteile &amp; Grenzen</th></tr></thead>
     <tbody>
       <tr><td><b>3-Schichten-Architektur (3-Tier)</b></td><td>1. <b>Präsentationsschicht (UI/Frontend)</b><br>2. <b>Fach-/Anwendungslogik (Business Logic / Service)</b><br>3. <b>Datenhaltungsschicht (Persistence / Repository / DB)</b></td><td><b>Vorteil:</b> Austauschbarkeit einzelner Schichten (z. B. Web-UI statt Desktop-UI ohne Änderung der Fachlogik), bessere Testbarkeit durch Mocking der Datenschicht.</td></tr>
       <tr><td><b>MVC (Model-View-Controller)</b></td><td>• <b>Model:</b> Daten &amp; Geschäftslogik<br>• <b>View:</b> Reine Darstellung<br>• <b>Controller:</b> Nimmt Benutzereingaben entgegen und steuert Model/View.</td><td>Trennung von Darstellung und Logik (<i>Separation of Concerns</i>); parallele Entwicklung von UI und Backend möglich.</td></tr>
       <tr><td><b>Monolith vs. Microservices</b></td><td>• <b>Monolith:</b> Eine einzige gemeinsam deploybare Anwendung.<br>• <b>Microservices:</b> Unabhängig deploybare Dienste je Fachdomäne mit eigener Datenhaltung, verbunden über REST/Messaging.</td><td>• <b>Monolith:</b> Einfaches Deployment, einfache lokale Transaktionen.<br>• <b>Microservices:</b> Unabhängige Skalierung &amp; Technologiewahl, aber hoher Aufwand für Netzwerk, Monitoring und verteilte Konsistenz!</td></tr>
     </tbody>
   </table>
   <ul>
     <li><b>Goldene Entwurfsregel:</b> <b>Hohe Kohäsion (High Cohesion)</b> (eine Klasse/Komponente erledigt genau eine fachlich zusammengehörige Aufgabe) + <b>Lose Kopplung (Low Coupling)</b> (wenige Abhängigkeiten nach außen, Kommunikation über Interfaces).</li>
   </ul>`,
   `<p><b>🔴 أهم مصطلحين معماريين يحبهما المصححون في IHK:</b></p>
   <ul>
     <li><b>تماسك داخلي عالٍ (Hohe Kohäsion):</b> كل وحدة برمجية تركز على مهمة واحدة مترابطة.</li>
     <li><b>اقتران خارجي ضعيف / فك الارتباط (Lose Kopplung / Entkopplung):</b> تقليل اعتماد الفئات على بعضها البعض عبر استخدام الواجهات (Interfaces)، مما يسهل الصيانة والاختبار (Unit-Tests).</li>
   </ul>`),
 S('2. Die 5 SOLID-Prinzipien & GoF-Entwurfsmuster-Auswahlmatrix',
   `<p>Wann wählt man welches Prinzip oder <b>Entwurfsmuster</b>?</p>
   <table>
     <thead><tr><th>SOLID / Muster</th><th>Kernaussage für die Prüfungsbegründung</th><th>Typischer Anwendungsfall</th></tr></thead>
     <tbody>
       <tr><td><b>S – Single Responsibility</b></td><td>Jede Klasse hat nur <b>eine einzige Verantwortlichkeit</b> (nur einen Grund zur Änderung).</td><td><code>Rechnung</code> berechnet Positionen; <code>RechnungPdfExporter</code> erzeugt das PDF; <code>RechnungRepository</code> speichert in der DB.</td></tr>
       <tr><td><b>O – Open-Closed Principle</b></td><td>Offen für Erweiterungen (neue Klassen), geschlossen für Änderungen am bestehenden Code.</td><td>Neue Versand- oder Zahlungsart hinzufügen, ohne bestehende <code>if/else</code>-Ketten zu ändern.</td></tr>
       <tr><td><b>D – Dependency Inversion</b></td><td>Fachlogik hängt von <b>Abstraktionen (Interfaces)</b> ab, nicht von konkreten Datenbank-/Mail-Klassen.</td><td>Ermöglicht im Unit-Test das Einspeisen eines <code>MockRepository</code> (Dependency Injection).</td></tr>
       <tr><td><b>Strategy (Verhaltensmuster)</b></td><td>Familie austauschbarer Algorithmen hinter einem gemeinsamen Interface kapseln.</td><td>Verschiedene Rabatt-, Sortier-, Steuer- oder Versandkostenberechnungen zur Laufzeit wechseln.</td></tr>
       <tr><td><b>Observer (Verhaltensmuster)</b></td><td>1:n-Abhängigkeit: Subjekt benachrichtigt alle registrierten Beobachter automatisch bei Zustandsänderung.</td><td>Sensorwerte/Aktienkurse/Bestellstatus aktualisieren automatisch mehrere Anzeigen/Services (2024S: 30 Punkte!).</td></tr>
       <tr><td><b>Factory Method (Erzeugungsmuster)</b></td><td>Objekterzeugung in eine Fabrikmethode auslagern, die den Interface-Typ zurückgibt.</td><td>Dokumente, Log-Handler oder Fahrzeugtypen abhängig von Konfiguration erzeugen (2023S: 18 Punkte!).</td></tr>
       <tr><td><b>Adapter (Strukturmuster)</b></td><td>Übersetzt die Schnittstelle einer vorhandenen (Legacy-/Drittanbieter-)Klasse in das vom Client erwartete Interface.</td><td>Altes XML-Zahlungsmodul an neues JSON-Zahlungsinterface anbinden.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 دليل اختيار نمط التصميم (Design Pattern) في الامتحان:</b></p>
   <ul>
     <li>خوارزميات متعددة قابلة للتبديل (طرق دفع، حساب شحن، خصومات) $\\rightarrow$ <b>Strategy Pattern</b>.</li>
     <li>إبلاغ عدة كائنات تلقائياً عند تغير حالة كائن (نشر/اشتراك) $\\rightarrow$ <b>Observer Pattern</b>.</li>
     <li>فصل عملية إنشاء الكائنات عن الكود المستدعي $\\rightarrow$ <b>Factory Pattern</b>.</li>
     <li>توصيل نظام قديم أو مكتبة خارجية بواجهة غير متوافقة $\\rightarrow$ <b>Adapter Pattern</b>.</li>
   </ul>`)
 ],[['Kopplung','درجة الاعتماد بين الوحدات'],['Kohäsion','تماسك مسؤوليات الوحدة'],['Entwurfsmuster','حل تصميمي متكرر'],['Dependency Injection','حقن الاعتمادية من الخارج عبر الواجهة']],
 [Q('Drei Versandpreis-Algorithmen sollen austauschbar sein. Entwirf die Grundidee.','Interface Versandstrategie mit berechne(preisDaten). Je Versandart eine Implementierung; der Auftrag erhält die Strategie als Abhängigkeit und delegiert die Berechnung. Strategy vermeidet eine wachsende Fallunterscheidung im Auftrag.','يكفي رسم/شرح الواجهة والتنفيذات والتفويض مع ربطه بمرونة الاستبدال.'),Q('Warum hilft ein Repository-Interface beim Unit-Test?','Fachlogik kann mit einem Fake/Mock statt echter Datenbank getestet werden; Tests werden gezielter und unabhängig von Datenbankverfügbarkeit. Integrationsprüfungen bleiben zusätzlich nötig.','لا يعني أن اختبار التكامل لم يعد مطلوبًا.')],['Schichten und MVC unterscheiden','Ein Muster an einem Problem begründen','SOLID mit praktischem Beispiel erläutern']);
L('grundlagen-code','code','Datentypen, Operatoren & Kontrollstrukturen','أنواع البيانات، المعاملات المنطقية وهياكل التحكم','Kern','Datentypen (Geld = Decimal/Cent!), Ganzzahldivision, Modulo, De Morgan und Schleifengrenzen.',[
 S('1. Datentypen, Ganzzahldivision vs. Modulo & De-Morgansche Gesetze',
   `<p>In <b>Teil 2 (Algorithmen)</b> kosten vermeidbare Datentyp- und Bedingungsfehler regelmäßig wertvolle Punkte:</p>
   <table>
     <thead><tr><th>Thema</th><th>Technische Regel</th><th>Prüfungsbeispiel &amp; Falle</th></tr></thead>
     <tbody>
       <tr><td><b>Geldbeträge speichern</b></td><td><b>Niemals <code>Float</code> / <code>Double</code></b> für Währungsbeträge nutzen (binäre Rundungsfehler: <code>0.1 + 0.2 = 0.30000000000000004</code>)! Stattdessen <b><code>Decimal</code> / <code>BigDecimal</code></b> oder <b><code>Integer</code> in Cent</b> verwenden.</td><td>In SQL immer <code>DECIMAL(10,2)</code>; im Pseudocode auf Cent-Basis oder explizite Rundung achten.</td></tr>
       <tr><td><b>Ganzzahldivision (<code>div</code> / <code>/</code>) vs. Rest (<code>mod</code> / <code>%</code>)</b></td><td>Bei zwei Ganzzahlen schneidet <code>17 / 5</code> die Nachkommastellen ab (<code>= 3</code>). Der Modulo-Operator <code>17 % 5</code> liefert den Rest (<code>= 2</code>).</td><td>Umrechnung von <code>135 Minuten</code>:<br>• Stunden = <code>ganzzahl(135 / 60) = 2</code><br>• Restminuten = <code>135 % 60 = 15</code><br>• Ringpuffer-Index = <code>(i + 1) % laenge</code>.</td></tr>
       <tr><td><b>Logische Operatoren &amp; De-Morgansche Regeln</b></td><td>• <code>AND (&&)</code>: beide wahr<br>• <code>OR (||)</code>: mindestens einer wahr<br>• <code>XOR (^)</code>: genau einer wahr<br>• <b>De Morgan:</b><br><code>!(A && B)  ⟺  !A || !B</code><br><code>!(A || B)  ⟺  !A && !B</code></td><td><b>⚠️ Falle:</b> „Ungültig, wenn Monat &lt; 1 <b>ODER</b> Monat &gt; 12“ (nicht UND, denn eine Zahl kann nicht gleichzeitig &lt; 1 und &gt; 12 sein!).</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 أساسيات حاسمة في كتابة الخوارزميات (Teil 2):</b></p>
   <ul>
     <li><b>المبالغ المالية:</b> لا تستخدم الأعداد العشرية العائمة (<code>Float/Double</code>) للمال بسبب أخطاء التقريب الثنائي، بل استخدم <code>Decimal</code> أو خزّن المبلغ بالسنت (<code>Integer</code>).</li>
     <li><b>القسمة الصحيحة وباقي القسمة (<code>/</code> و <code>%</code>):</b> تُستخدم في كل امتحانات الساعات والدقائق، إرجاع العملات النقدية، والالتفاف الدائري في المصفوفات (<code>(i + 1) % n</code>).</li>
     <li><b>قانون دي مورغان (De Morgan):</b> عند نفي شرط مركب، تنقلب <code>AND</code> إلى <code>OR</code> وتنقلب <code>OR</code> إلى <code>AND</code>.</li>
   </ul>`),
 S('2. Kontrollstrukturen, Schleifentypen & Off-by-One-Fehler vermeiden',
   `<p>Vergleich der drei <b>Schleifentypen</b> und Prüfung der <b>Randfälle</b> (<b>Edge Cases</b>):</p>
   <table>
     <thead><tr><th>Schleifentyp</th><th>Wann wird geprüft?</th><th>Mindestdurchläufe</th><th>Typischer Einsatz im Pseudocode</th></tr></thead>
     <tbody>
       <tr><td><b><code>für (for)</code>-Zählschleife</b></td><td>Vor jedem Durchlauf (kopfgesteuert)</td><td>0 (wenn Array leer ist)</td><td>Durchlauf über ein Array fester Länge: <code>für i = 0 bis a.laenge - 1</code>.</td></tr>
       <tr><td><b><code>solange (while)</code>-Schleife</b></td><td>Vor jedem Durchlauf (kopfgesteuert)</td><td>0</td><td>Unbekannte Anzahl von Schritten (z. B. Binäre Suche, verkettete Liste bis <code>knoten != null</code>, Dateilesen bis <code>EOF</code>).</td></tr>
       <tr><td><b><code>wiederhole ... solange (do-while)</code></b></td><td>Erst <b>nach</b> dem Durchlauf (fußgesteuert)</td><td><b>Mindestens 1 Mal!</b></td><td>Eingabeaufforderung oder ein Bubble-Sort-Durchlauf, der mindestens einmal prüfen soll.</td></tr>
     </tbody>
   </table>`+C('funktion summePositive(werte):\n  wenn werte == null ODER werte.laenge == 0:\n    rückgabe 0\n  summe = 0\n  für i = 0 bis werte.laenge - 1:\n    wenn werte[i] > 0:\n      summe = summe + werte[i]\n  rückgabe summe'),
   `<p><b>⚠️ قائمة فحص الحدود قبل تسليم أي خوارزمية:</b></p>
   <ul>
     <li>هل فحصت حالة القائمة الفارغة (<code>laenge == 0</code>) أو <code>null</code>؟</li>
     <li>هل تتوقف الحلقة عند <code>laenge - 1</code> (أو عند <code>laenge - 2</code> إذا كنت تقارن <code>a[i]</code> مع <code>a[i + 1]</code>)؟</li>
     <li>هل انتبهت لفرق <b>„größer als 80“ (<code>&gt; 80</code>)</b> مقابل <b>„mindestens 80 / ab 80“ (<code>&gt;= 80</code>)</b>؟</li>
   </ul>`)
 ],[['Ganzzahldivision','قسمة تعيد الجزء الصحيح'],['Abbruchbedingung','شرط إيقاف الحلقة'],['Rückgabewert','القيمة الناتجة من الدالة'],['Modulo (%)','باقي القسمة الصحيحة']],
 [Q('Was liefert der Pseudocode für [4, −2, 0, 7]? Gib die Zwischensummen an.','Start 0; nach 4: 4; nach −2: 4; nach 0: 4; nach 7: 11. Rückgabe 11.','فقط القيم الأكبر من الصفر تغيّر المجموع.'),Q('Eine Prozentquote muss größer als 80 sein. Welche drei Grenztests sind sinnvoll?','79, 80, 81 (bei ganzen Prozentwerten). Erwartung: falsch, falsch, wahr. Bei Dezimalwerten passend nahe am Grenzwert testen, z. B. 79,99 / 80 / 80,01.','حالة 80 نفسها تكشف خطأ >=، لذا لا تهملها.')],['Code mit Wertetabelle verfolgen','Grenzen und leere Eingaben prüfen','Bedingungen logisch umformen']);
L('datenstrukturen','code','Arrays, Listen, Stack, Queue & Map','هياكل البيانات الأساسية (Array / List / Stack / Queue / Set / Map)','Kern','Die passende Datenstruktur nach Zugriffsart, Reihenfolge (LIFO/FIFO) und Eindeutigkeit wählen.',[
 S('1. Vergleichstabelle aller Grunddatenstrukturen (Eigenschaften & Laufzeit)',
   `<p>In <b>Teil 1 und Teil 2</b> musst du Datenstrukturen anhand ihrer Eigenschaften auswählen und im Code einsetzen:</p>
   <table>
     <thead><tr><th>Datenstruktur</th><th>Ordnungsprinzip &amp; Duplikate</th><th>Stärke (Zugriff / Einfügen)</th><th>Typisches Prüfungsbeispiel</th></tr></thead>
     <tbody>
       <tr><td><b>Statisches Array (1D / 2D)</b></td><td>Feste Größe, 0-basierter Index <code>0..n-1</code>, Duplikate erlaubt</td><td>Direkter Indexzugriff <code>a[i]</code> in <b>$O(1)$</b>; Größe nachträglich nicht änderbar.</td><td>Messwerte pro Stunde, Sitzplatzmatrix im Kino, Schachbrett (<code>matrix[zeile][spalte]</code>).</td></tr>
       <tr><td><b>Dynamische Liste (<code>ArrayList</code> / <code>List&lt;T&gt;</code>)</b></td><td>Variable Größe, Indexzugriff, Duplikate erlaubt</td><td>Am Ende anfügen schnell ($O(1)$ amortisiert); Einfügen/Löschen in der Mitte verschiebt Elemente ($O(n)$).</td><td>Ergebnisliste gefilterter Kunden oder Bestellpositionen variabler Anzahl.</td></tr>
       <tr><td><b>Stack (Stapelspeicher)</b></td><td><b>LIFO (Last In – First Out)</b>: Das zuletzt abgelegte Element wird zuerst entnommen.</td><td><code>push(x)</code> (oben drauflegen), <code>pop()</code> (oberstes herunternehmen), <code>peek()</code> in $O(1)$.</td><td><b>Undo-Funktion (Rückgängig)</b>, Browser-Zurück-Historie, Klammerprüfung, Aufruf-Stack bei Rekursion.</td></tr>
       <tr><td><b>Queue (Warteschlange)</b></td><td><b>FIFO (First In – First Out)</b>: Wer zuerst kommt, wird zuerst bedient.</td><td><code>enqueue(x)</code> (hinten anstellen), <code>dequeue()</code> (vorne entnehmen) in $O(1)$.</td><td><b>Drucker-Warteschlange</b>, Ticket-/Auftrags-Abarbeitung, Breitensuche (BFS).</td></tr>
       <tr><td><b>Set (Menge, z. B. <code>HashSet</code>)</b></td><td><b>Keine Duplikate erlaubt!</b></td><td>Prüfung <code>enthält(x)</code> im Schnitt in $O(1)$; speichert jeden Wert höchstens einmal.</td><td>Eindeutige Kundennummern, E-Mail-Adressen oder bereits besuchte Knoten sammeln.</td></tr>
       <tr><td><b>Map / Dictionary (<code>HashMap&lt;K,V&gt;</code>)</b></td><td>Speichert <b>Schlüssel-Wert-Paare (Key → Value)</b>; Schlüssel sind eindeutig!</td><td>Suche/Aktualisierung über Schlüssel <code>map[key]</code> im Schnitt in $O(1)$.</td><td>Häufigkeitszähler pro Artikel-ID, Konfigurationswerte, schneller Cache über Kunden-ID.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 جدول اختيار هيكل البيانات في الامتحان:</b></p>
   <ul>
     <li><b><code>Stack (LIFO)</code>:</b> آخر عنصر يدخل هو أول عنصر يخرج (مثال: زر التراجع Undo أو سجل التصفح).</li>
     <li><b><code>Queue (FIFO)</code>:</b> أول عنصر يدخل هو أول عنصر يخرج (مثال: طابور الطباعة أو معالجة الطلبات بالترتيب).</li>
     <li><b><code>Set</code>:</b> مجموعة تمنع التكرار تلقائياً.</li>
     <li><b><code>Map / Dictionary</code>:</b> ربط مفتاح فريد بقيمة (Key-Value) للبحث السريع أو عدّ التكرارات.</li>
   </ul>`),
 S('2. Häufigkeitszählung mit Map, Entfernen in Schleifen & Referenz- vs. tiefe Kopie',
   `<p><b>Drei klassische Fallen aus Programmieraufgaben</b>:</p>
   <ol>
     <li><b>Zählen mit einer Map (Dictionary):</b> Bevor der Zähler für einen Schlüssel erhöht wird, muss geprüft werden, ob der Schlüssel bereits existiert (oder <code>getOrDefault(key, 0) + 1</code> genutzt werden).</li>
     <li><b>Löschen während einer Vorwärtsschleife:</b> Entfernt man beim Vorwärtslaufen (<code>i = 0 bis laenge - 1</code>) das Element an Index <code>i</code>, rückt das nächste Element auf Position <code>i</code> nach und wird im nächsten Schritt <b>übersprungen</b>! <b>Lösung:</b> Entweder <b>rückwärts iterieren</b> (<code>für i = liste.laenge - 1 abwärts bis 0</code>) oder eine <b>neue Ergebnisliste</b> aufbauen.</li>
     <li><b>Referenzkopie vs. Shallow Copy vs. Deep Copy:</b> <code>listeB = listeA</code> kopiert nur die Speicheradresse (Referenz) – Änderungen an <code>listeB</code> verändern auch <code>listeA</code>!</li>
   </ol>`+C('// Häufigkeit je Kunden-ID zählen\nanzahlMap = neue Map<Integer, Integer>()\nfür jede bestellung in bestellungen:\n  id = bestellung.kundenId\n  alt = anzahlMap.getOderStandard(id, 0)\n  anzahlMap.put(id, alt + 1)'),
   `<p><b>⚠️ فخ الحذف أثناء المرور على قائمة (List):</b></p>
   <ul>
     <li>إذا حذفت عنصراً من قائمة أثناء حلقة تصاعدية (<code>i = 0</code> إلى <code>n - 1</code>)، فإن العنصر الذي يليه ينزلق مكانه فيتم تخطيه! الحل الآمن دائماً هو: إما <b>المرور العكسي من النهاية للبداية</b>، أو <b>إنشاء قائمة جديدة</b> وإضافة العناصر المطلوبة إليها.</li>
   </ul>`)
 ],[['Stapel / LIFO','آخر داخل أول خارج'],['Warteschlange / FIFO','أول داخل أول خارج'],['Schlüssel-Wert-Paar','زوج مفتاح وقيمة'],['Referenzkopie / Tiefe Kopie','نسخ العنوان فقط / نسخ مستقل لكامل الكائنات']],
 [Q('Welche Struktur passt: Undo, Warteschlange für Druckjobs, eindeutige Kundennummern?','Undo: Stack. Druckjobs: Queue. Eindeutige Kundennummern: Set. Jeweils aufgrund von Rückwärtsreihenfolge, Eingangsreihenfolge bzw. Eindeutigkeit.','اذكر المبدأ مع الاسم لتكون الإجابة مبررة.'),Q('Ein Array hat 3 Zeilen und 5 Spalten. Welche Indexbereiche gelten bei Nullindexierung?','Zeilen 0..2, Spalten 0..4. 15 Elemente insgesamt; obere exklusive Grenzen 3 bzw. 5.','لا تستخدم ≤ 3 أو ≤ 5 في الحلقة؛ ستخرج خارج الحدود.')],['Datenstruktur begründet wählen','2D-Schleifen korrekt begrenzen','Map-Zähler implementieren']);
L('algo-muster','code','Prüfungsalgorithmen: Filtern, Gruppieren, Intervalle','أنماط الخوارزميات: التصفية، القيم القصوى، وتداخل الفترات الزمنية','Kern','Minimum/Maximum sicher initialisieren, Durchschnitte ohne Division durch 0 und Zeitintervall-Überlappung.',[
 S('1. Akkumulator, Minimum/Maximum-Initialisierung & sicherer Durchschnitt',
   `<p>Fast jede große Algorithmus-Aufgabe in <b>Teil 2</b> kombiniert mindestens zwei dieser Grundbausteine:</p>
   <table>
     <thead><tr><th>Baustein</th><th>Richtige Initialisierung</th><th>Tödlicher Prüfungsfehler</th></tr></thead>
     <tbody>
       <tr><td><b>Summe / Zähler</b></td><td><code>summe = 0</code>; <code>anzahl = 0</code></td><td>Bei Durchschnitt (Mittelwert) durch <code>werte.laenge</code> teilen, obwohl ungültige Zeilen ausgefiltert wurden! Immer durch <code>anzahlGueltig</code> teilen und vorher <code>wenn anzahlGueltig == 0</code> abfangen!</td></tr>
       <tr><td><b>Maximum / Minimum</b></td><td><b>Immer mit dem ersten gültigen Element initialisieren:</b><br><code>max = werte[0]</code>; <code>min = werte[0]</code></td><td><b>Niemals</b> <code>max = 0</code> (scheitert bei rein negativen Zahlen wie <code>[-12, -5, -8]</code>!) und <b>niemals</b> <code>min = 0</code> (bleibt bei positiven Preisen immer 0!).</td></tr>
       <tr><td><b>Filtern in neue Liste</b></td><td><code>ergebnis = neue Liste()</code></td><td>Berechnung und Filterbedingung vermischen. Erst Bedingung prüfen, dann <code>ergebnis.hinzufuegen(element)</code>.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 ثلاث قواعد ذهبية في خوارزميات التجميع والبحث عن أكبر/أصغر قيمة:</b></p>
   <ul>
     <li><b>تهيئة <code>min</code> و <code>max</code>:</b> ابدأ دائماً بأول عنصر في المصفوفة (<code>min = a[0]</code>, <code>max = a[0]</code>) وليس بالصفر أبداً!</li>
     <li><b>حساب المتوسط الحسابي (Durchschnitt):</b> افحص دائماً <code>wenn anzahl == 0</code> قبل القسمة لمنع القسمة على صفر (<code>Division by Zero</code>).</li>
   </ul>`),
 S('2. Zeitintervall-Überlappung (Buchungen/Termine) & CSV-/Log-Verarbeitung',
   `<p><b>In Raum-</b>, Fahrzeug- oder Terminbuchungsaufgaben (z. B. <b>2022W, 2024S</b>) muss geprüft werden, ob sich zwei halboffene Zeitintervalle <code>[startA, endeA)</code> und <code>[startB, endeB)</code> überschneiden:</p>
   <ul>
     <li><b>Die universelle Überlappungsformel:</b> Zwei Intervalle $A$ und $B$ überlappen sich <b>genau dann</b>, wenn:<br>
     <code>startA &lt; endeB  UND  startB &lt; endeA</code></li>
     <li><b>Nahtloser Anschluss:</b> Endet Buchung A um <code>10:00</code> und beginnt Buchung B um <code>10:00</code>, gilt <code>10:00 &lt; 10:00</code> = <code>falsch</code> $\\rightarrow$ <b>kein Konflikt!</b></li>
   </ul>`+C('funktion mittelwertPositive(werte):\n  summe = 0\n  anzahl = 0\n  für jeden wert in werte:\n    wenn wert > 0:\n      summe = summe + wert\n      anzahl = anzahl + 1\n  wenn anzahl == 0:\n    rückgabe null  // verhindert Division durch 0!\n  rückgabe summe / anzahl'),
   `<p><b>🔴 معادلة فحص تعارض الحجوزات والفترات الزمنية:</b></p>
   <ul>
     <li>تتقاطع الفترتان $A$ و $B$ إذا وفقط إذا كان: <b>بداية الأولى قبل نهاية الثانية، وبداية الثانية قبل نهاية الأولى</b> (<code>a.start &lt; b.ende UND b.start &lt; a.ende</code>).</li>
   </ul>`)
 ],[['Akkumulator','متغير تجميع'],['Intervall','مجال زمني أو عددي'],['Sonderfall','حالة خاصة تحتاج قرارًا']],
 [Q('Schreibe einen Algorithmus für den größten Wert einer nichtleeren Liste, auch wenn alle Werte negativ sind.','maximum = werte[0]; für i von 1 bis Länge−1: wenn werte[i] > maximum, setze maximum = werte[i]. Danach maximum zurückgeben. Für leere Listen Vertrag gesondert festlegen.','ابدأ بأول قيمة فعلية، لا بالصفر.'),Q('Überlappen [09:00,10:00) und [10:00,11:00)? Begründe mit Bedingung.','Nein. 09:00 < 11:00 ist wahr, aber 10:00 < 10:00 ist falsch. Beide Teilbedingungen müssen wahr sein.','المساواة عند نقطة التماس ليست تداخلًا بهذا التعريف.')],['Ein-/Ausgabe und Sonderfälle festlegen','Filtern und Aggregieren programmieren','Intervallgrenzen korrekt behandeln']);
L('suchen-sortieren','code','Suchen, Sortieren, Rekursion & Big O','خوارزميات البحث والترتيب، الاستدعاء الذاتي والتعقيد (Big-O)','Kern','Lineare vs. Binäre Suche, Bubble/Selection/Insertion Sort, Rekursion und Laufzeitkomplexität O(1) bis O(n²).',[
 S('1. Such- und Sortierverfahren im direkten Vergleich (Ablauf & Laufzeit)',
   `<p>In <b>Teil 2 (2022S, 2023S, 2023W, 2024S, 2025S)</b> musst du Sortier- oder Suchalgorithmen programmieren, korrigieren oder deren Zwischenschritte auf einem Beispiel-Array angeben:</p>
   <table>
     <thead><tr><th>Algorithmus</th><th>Grundprinzip in einem Satz</th><th>Best Case</th><th>Worst / Average Case</th><th>Stabil?</th></tr></thead>
     <tbody>
       <tr><td><b>Lineare Suche</b></td><td>Prüft jedes Element von Index <code>0</code> bis <code>n-1</code> nacheinander (funktioniert auch auf <b>unsortierten</b> Daten).</td><td>$O(1)$</td><td>$O(n)$</td><td>—</td></tr>
       <tr><td><b>Binäre Suche (Binary Search)</b></td><td>Setzt ein <b>sortiertes Array</b> voraus! Vergleicht mit dem mittleren Element und halbiert den Suchbereich in jedem Schritt.</td><td>$O(1)$</td><td><b>$O(\\log n)$</b></td><td>—</td></tr>
       <tr><td><b>Bubble Sort</b></td><td>Vergleicht benachbarte Elemente <code>a[i]</code> und <code>a[i+1]</code> und tauscht sie bei falscher Reihenfolge; das größte Element „blubbert“ pro Runde nach rechts.</td><td>$O(n)$ (mit <code>getauscht</code>-Flag)</td><td>$O(n^2)$</td><td><b>Ja</b> (bei Tausch nur für <code>&gt;</code>)</td></tr>
       <tr><td><b>Selection Sort</b></td><td>Sucht im unsortierten Restbereich den Index des <b>Minimums</b> und tauscht es an die erste Position des Restbereichs.</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>Nein (Standard)</td></tr>
       <tr><td><b>Insertion Sort</b></td><td>Nimmt das nächste Element und schiebt es nach links an die richtige Stelle innerhalb des bereits sortierten linken Teil-Arrays.</td><td>$O(n)$</td><td>$O(n^2)$</td><td><b>Ja</b></td></tr>
       <tr><td><b>QuickSort / MergeSort</b></td><td><i>Divide &amp; Conquer (Teile und Herrsche):</i> Zerlegt das Array rekursiv und fügt sortiert zusammen.</td><td>$O(n \\log n)$</td><td>$O(n \\log n)$ (QuickSort Worst: $O(n^2)$)</td><td>MergeSort: Ja</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 كيف تفرّق بين خوارزميات الترتيب الثلاث في الامتحان؟</b></p>
   <ul>
     <li><b>Bubble Sort:</b> يقارن كل عنصرين متجاورين (<code>a[i]</code> و <code>a[i+1]</code>) ويبدلهما، فينتقل أكبر عنصر إلى أقصى اليمين في نهاية كل جولة.</li>
     <li><b>Selection Sort:</b> يبحث عن أصغر عنصر (Minimum) في الجزء غير المرتب ثم يضعه في أول مكان على اليسار بعملية تبديل واحدة في كل جولة.</li>
     <li><b>Insertion Sort:</b> يسحب العنصر التالي ويدرجه في مكانه الصحيح داخل الجزء الأيسر المرتب (مثل ترتيب أوراق اللعب في اليد).</li>
     <li><b>الاستقرار (Stabilität):</b> خوارزمية الترتيب تكون <b>مستقرة (stabil)</b> إذا كانت تحافظ على الترتيب الأصلي للعناصر المتساوية في المفتاح (لذلك نستخدم <code>></code> وليس <code>>=</code> عند التبديل!).</li>
   </ul>`),
 S('2. Big-O-Laufzeitkomplexität bestimmen & Binäre Suche im Code',
   `<p>Faustregeln zur schnellen Bestimmung der <b>Zeitkomplexität (Big-O)</b> eines gegebenen Pseudocodes:</p>
   <ul>
     <li><b>$O(1)$ – Konstant:</b> Direkter Array-Zugriff <code>a[5]</code>, Rechnung ohne Schleife.</li>
     <li><b>$O(\\log n)$ – Logarithmisch:</b> Der Suchbereich wird in jedem Schleifendurchlauf <b>halbiert</b> (Binäre Suche, Suche im balancierten Binärbaum). Bei $n = 1.000$ maximal $\\approx 10$ Schritte!</li>
     <li><b>$O(n)$ – Linear:</b> Eine einzelne Schleife über $n$ Elemente (oder zwei <i>nacheinander</i> ausgeführte Schleifen: $n + n = 2n \\in O(n)$).</li>
     <li><b>$O(n^2)$ – Quadratisch:</b> Zwei <b>ineinander geschachtelte Schleifen</b>, die jeweils von $0$ bis $n$ laufen. Verdoppelt sich $n$, <b>vervierfacht</b> sich die Laufzeit!</li>
   </ul>`+C('funktion binaereSuche(a, gesucht):\n  links = 0\n  rechts = a.laenge - 1\n  solange links <= rechts:\n    mitte = links + ganzzahl((rechts - links) / 2)\n    wenn a[mitte] == gesucht:\n      rückgabe mitte\n    sonst wenn a[mitte] < gesucht:\n      links = mitte + 1\n    sonst:\n      rechts = mitte - 1\n  rückgabe -1'),
   `<p><b>🔴 قواعد حساب التعقيد الزمني (Big-O) في ثوانٍ:</b></p>
   <ul>
     <li>حلقتان متتاليتان (واحدة بعد الأخرى) تظلان <b>$O(n)$</b>، أما حلقتان متداخلتان (واحدة داخل الأخرى تمران على كامل $n$) فتصبحان <b>$O(n^2)$</b> (وعند مضاعفة حجم البيانات $n$ يتضاعف وقت التنفيذ **4 مرات**).</li>
   </ul>`)
 ],[['Laufzeitkomplexität','نمو كلفة التنفيذ مع حجم البيانات'],['Basisfall','حالة توقف الاستدعاء الذاتي'],['Stabilität','حفظ ترتيب العناصر المتساوية'],['Divide and Conquer','فرّق تسد (تقسيم المسألة إلى مسائل أصغر)']],
 [Q('Führe den ersten Schritt von Selection Sort auf [7,3,5,1] aus.','Minimum des gesamten Bereichs ist 1 an Index 3. Mit Index 0 tauschen: [1,3,5,7]. Danach beginnt die Suche im Restbereich bei Index 1.','هذه الدورة تثبّت أصغر عنصر في البداية؛ لا تنفّذ مقارنة جيران فقط.'),Q('Eine n-Schleife enthält eine weitere vollständige n-Schleife. Was passiert bei doppeltem n ungefähr?','O(n²); die Anzahl der inneren Grundoperationen wächst ungefähr auf das Vierfache. Konstante Faktoren und reale Hardware sind dabei abstrahiert.','التعقيد يصف نمط النمو لا الزمن المطلق.')],['Einen Such-/Sortierablauf nachvollziehen','Binäre Suche mit Grenzen formulieren','Basisfall und O-Notation erläutern']);
L('oop','code','OOP, Interfaces & Polymorphie','البرمجة الكائنية (OOP)، الواجهات وتعدد الأشكال','Kern','Kapselung, Vererbung vs. Komposition, Abstrakte Klasse vs. Interface, Polymorphie und Overriding vs. Overloading.',[
 S('1. Die 4 Grundpfeiler der OOP & Vererbung („ist-ein“) vs. Komposition („hat-ein“)',
   `<p>In <b>Teil 1 und Teil 2 (2021W–2025W)</b> prüft die IHK regelmäßig objektorientierte Konzepte anhand von UML und Code:</p>
   <table>
     <thead><tr><th>OOP-Grundpfeiler</th><th>Fachliche Erklärung für die Prüfung</th><th>Konkretes Code-Merkmal</th></tr></thead>
     <tbody>
       <tr><td><b>1. Datenkapselung (Encapsulation / Geheimnisprinzip)</b></td><td>Interne Attribute werden vor direktem Zugriff von außen geschützt (<code>private</code>), damit Geschäftsregeln (Invarianten) nicht umgangen werden können.</td><td>Attribute sind <code>private (-)</code>; Zugriff erfolgt kontrolliert über Methoden (Getter/Setter oder Fachmethoden wie <code>einzahlen(betrag)</code> mit Prüfung <code>betrag &gt; 0</code>).</td></tr>
       <tr><td><b>2. Vererbung (Inheritance)</b></td><td>Eine Unterklasse (Subklasse) übernimmt Attribute und Methoden einer Oberklasse (Superklasse) und spezialisiert diese (<b>„Ist-ein“-Beziehung</b>).</td><td><code>class Girokonto extends Konto</code>. Gemeinsamer Code steht nur einmal in der Oberklasse (vermeidet Redundanz).</td></tr>
       <tr><td><b>3. Polymorphie (Vielgestaltigkeit)</b></td><td>Objekte verschiedener Unterklassen können über eine Referenz des gemeinsamen Obertyps/Interfaces angesprochen werden, führen aber zur Laufzeit ihre <b>eigene überschriebene Methode</b> aus (dynamische Bindung).</td><td>Eine <code>List&lt;Zahlungsmittel&gt;</code> enthält <code>Kreditkarte</code> und <code>Lastschrift</code>; der Aufruf <code>z.bezahle()</code> führt automatisch die spezifische Logik aus!</td></tr>
       <tr><td><b>4. Abstraktion</b></td><td>Reduktion auf wesentliche Eigenschaften und Verträge (über Interfaces und abstrakte Klassen).</td><td>Der Aufrufer kennt nur das Interface <code>Druckbar</code>, nicht die internen Details von <code>Rechnung</code>.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 الركائز الأربع للبرمجة الكائنية (OOP):</b></p>
   <ul>
     <li><b>التغليف (Kapselung / Geheimnisprinzip):</b> جعل الخصائص <code>private</code> وحمايتها عبر دوال تتحقق من صحة القيم.</li>
     <li><b>الوراثة (Vererbung):</b> علاقة «هو نوع من» (<code>ist-ein</code>).</li>
     <li><b>تعدد الأشكال (Polymorphie):</b> استدعاء نفس الدالة عبر متغير من نوع الأب أو الواجهة، فينفذ كل كائن نسخته الخاصة أثناء التشغيل (Dynamische Bindung).</li>
   </ul>`),
 S('2. Abstrakte Klasse vs. Interface & Überschreiben (Overriding) vs. Überladen (Overloading)',
   `<p>Zwei der beliebtesten Theorie- und Codefragen in der AP2 (z. B. <b>2022W, 2023S, 2024S, 2025S</b>):</p>
   <table>
     <thead><tr><th>Vergleich</th><th>Variante A</th><th>Variante B</th></tr></thead>
     <tbody>
       <tr><td><b>Abstrakte Klasse vs. Interface</b></td><td><b>Abstrakte Klasse (<code>abstract class</code>):</b><br>• Kann <b>Zustand (Instanzattribute)</b>, Konstruktoren und fertige Methoden enthalten.<br>• Eine Klasse kann in Java/C# nur von <b>genau einer</b> Klasse erben (Einfachvererbung).<br>• Muss <i>nicht</i> zwingend eine abstrakte Methode enthalten, darf aber <b>nicht direkt instanziiert</b> werden.</td><td><b>Interface (<code>«interface»</code>):</b><br>• Definiert einen reinen <b>Vertrag (Methodensignaturen)</b> ohne Instanzattribute.<br>• Eine Klasse kann <b>beliebig viele Interfaces gleichzeitig</b> implementieren (<code>implements A, B</code>).<br>• Ideal für lose Kopplung und Design Patterns.</td></tr>
       <tr><td><b>Überschreiben (Overriding) vs. Überladen (Overloading)</b></td><td><b>Überschreiben (Overriding – Laufzeitpolymorphie):</b><br>• Findet zwischen <b>Oberklasse und Unterklasse</b> statt.<br>• <b>Exakt gleiche Signatur</b> (gleicher Methodenname, gleiche Parameterliste, kompatibler Rückgabetyp).<br>• Ersetzt das geerbte Verhalten in der Unterklasse.</td><td><b>Überladen (Overloading – Statische Polymorphie):</b><br>• Findet innerhalb <b>derselben Klasse</b> (oder Vererbungslinie) statt.<br>• <b>Gleicher Methodenname, aber UNTERSCHIEDLICHE Parameterliste</b> (Anzahl, Typ oder Reihenfolge der Parameter!).<br>• Nur ein anderer Rückgabetyp allein reicht zum Überladen <b>nicht</b> aus!</td></tr>
     </tbody>
   </table>`+C('klasse Konto:\n  # kontostand: Decimal\n  + Konto(start: Decimal)               // Konstruktor 1\n  + Konto()                             // Überladen (Overloading): andere Parameterliste!\n  + abheben(betrag: Decimal): Boolean   // wird in Girokonto überschrieben (Overriding)'),
   `<p><b>⚠️ مقارنة تتكرر باستمرار في الامتحان (Overriding مقابل Overloading):</b></p>
   <ul>
     <li><b>التجاوز / إعادة التعريف (Überschreiben / Overriding):</b> يكون في <b>الفئة الابنة (Unterklasse)</b> بنفس اسم الدالة ونفس المعاملات تماماً لتغيير سلوك الدالة الموروثة.</li>
     <li><b>التحميل الزائد (Überladen / Overloading):</b> وجود عدة دوال (أو عدة مشيدات Konstruktoren) <b>بنفس الاسم ولكن بمعاملات مختلفة (عدد أو نوع المعاملات)</b> داخل نفس الفئة! (ملاحظة هامة: تغيير نوع القيمة المرجعة وحده لا يكفي للـ Overloading).</li>
   </ul>`)
 ],[['Kapselung','حماية الحالة عبر واجهة مضبوطة'],['Überschreiben','إعادة تنفيذ عملية موروثة'],['Polymorphie','تنفيذ مختلف خلف عقد موحد'],['Überladen (Overloading)','نفس اسم الدالة مع اختلاف قائمة المعاملات']],
 [Q('Eine Liste enthält verschiedene Zahlungsverfahren mit der Methode zahle(). Wie wird eine if-Kette nach Typ vermieden?','Alle implementieren ein gemeinsames Interface. Die Schleife ruft zahlung.zahle() auf; dynamische Bindung wählt die konkrete Implementierung.','تعدد الأشكال يوزّع الاختلاف على التنفيذات بدل فحص نوع كل كائن.'),Q('Muss eine abstrakte Klasse mindestens eine abstrakte Methode enthalten?','Nein. Sie kann vollständig implementierte Methoden enthalten und trotzdem abstrakt sein, um direkte Instanziierung zu verhindern. Konkrete Unterklassen müssen verbleibende abstrakte Verträge erfüllen.','هذه نقطة قد تظهر مبسطة بشكل غير دقيق في بعض الحلول القديمة.')],['Klasse und Objekt unterscheiden','Interface und abstrakte Klasse vergleichen','Overriding von Overloading trennen']);
L('sprachen-cps','code','Sprachen, Datenformate, Regex & CPS','نماذج اللغات، صيغ البيانات (JSON/XML/CSV) والأنظمة الفيزيائية (CPS)','Wichtig','Programmierparadigmen, Bibliothek vs. Framework, JSON vs. XML vs. CSV, RegEx und Sensor-Aktor-Steuerung.',[
 S('1. Programmierparadigmen, Bibliothek vs. Framework & Datenformate (JSON, XML, CSV)',
   `<p>In <b>Teil 1 (2022S, 2023S, 2025S)</b> werden Sprachkonzepte und Austauschformate miteinander verglichen:</p>
   <table>
     <thead><tr><th>Konzept / Format</th><th>Wesentliche Merkmale</th><th>Wann bevorzugen? / Prüfungsfalle</th></tr></thead>
     <tbody>
       <tr><td><b>Imperativ / Objektorientiert vs. Deklarativ / Funktional</b></td><td>• <b>Imperativ/OOP:</b> Beschreibt Schritt für Schritt, <i>WIE</i> der Zustand verändert wird (Java, C#, Python).<br>• <b>Deklarativ:</b> Beschreibt, <i>WAS</i> als Ergebnis gewünscht ist (z. B. <b>SQL</b>, HTML, XSLT).<br>• <b>Funktional:</b> Reine Funktionen ohne Seiteneffekte, unveränderliche Daten (Immutability).</td><td>SQL ist das klassische Prüfungsbeispiel für eine <b>deklarative</b> Sprache!</td></tr>
       <tr><td><b>Bibliothek (Library) vs. Framework</b></td><td>• <b>Bibliothek:</b> <i>Dein Code</i> ruft bei Bedarf Funktionen der Bibliothek auf.<br>• <b>Framework:</b> <b>Inversion of Control (Hollywood-Prinzip: „Don’t call us, we’ll call you“)</b> – das Framework gibt den Kontrollfluss vor und ruft deinen Code auf.</td><td>Beliebte Abgrenzungsfrage in Teil 1!</td></tr>
       <tr><td><b>JSON vs. XML vs. CSV</b></td><td>• <b>JSON:</b> Schlank, leichtgewichtig (Objekte <code>{}</code>, Arrays <code>[]</code>), ideal für REST-APIs.<br>• <b>XML:</b> Hierarchisch mit Tags, Attributen, Namespaces und strenger Validierung über <b>XSD/DTD</b>.<br>• <b>CSV:</b> Flache Texttabelle (Trennzeichen, Encoding UTF-8, Maskierung beachten); <b>keine</b> tiefen Hierarchien darstellbar!</td><td><b>⚠️ Falle:</b> Auch wenn eine XML/JSON-Datei syntaktisch und laut Schema gültig ist, muss die <b>fachliche Plausibilität</b> (z. B. <code>Netto + MwSt == Brutto</code>) separat im Anwendungscode geprüft werden!</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 فروق جوهرية لأسئلة Teil 1:</b></p>
   <ul>
     <li><b>الفرق بين المكتبة (Bibliothek) وإطار العمل (Framework):</b> في المكتبة كودك هو الذي يستدعي دوال المكتبة متى شاء، بينما في الـ Framework ينعكس التحكم (<b>Inversion of Control</b>) فيقوم إطار العمل بإدارة التدفق واستدعاء كودك.</li>
     <li><b>مقارنة JSON و XML و CSV:</b> صيغة <code>CSV</code> مسطحة وبسيطة للجداول لكنها لا تدعم البيانات الهرمية المتداخلة، بينما <code>JSON</code> خفيفة وسريعة لواجهات REST، و <code>XML</code> ممتازة عند الحاجة للتحقق الصارم من البنية عبر <code>XSD</code>.</li>
   </ul>`),
 S('2. Reguläre Ausdrücke (RegEx) & Cyber-Physische Systeme (CPS: Sensor → Steuerung → Aktor)',
   `<p>Sowohl bei der Eingabevalidierung als auch in IoT-/CPS-Szenarien (z. B. Gewächshaus, Smart Home, Kühlhaus in <b>2022S, 2024W</b>) gelten klare Muster:</p>
   <ul>
     <li><b>Grenzen von RegEx:</b> Ein regulärer Ausdruck wie <code>^[0-9]{5}$</code> prüft nur das <b>syntaktische Format</b> (genau 5 Ziffern vom Zeilenanfang <code>^</code> bis Zeilenende <code>$</code>), aber <b>nicht die semantische Existenz</b> (ob diese Postleitzahl oder das Datum <code>31.02.2026</code> real existiert).</li>
     <li><b>Cyber-Physische Systeme (CPS) – Regelkreis:</b>
       <ol>
         <li><b>Sensor (Messglied):</b> Erfasst physikalische Größen (Temperatur, Luftfeuchtigkeit, Helligkeit) und liefert Rohwerte (oft über A/D-Wandler als Integer, z. B. <code>287</code> für <code>28,7 °C</code>).</li>
         <li><b>Steuerung / Verarbeitung (Controller):</b> Rechnet Einheiten um, filtert Ausreißer/Messfehler und vergleicht mit Schwellenwerten (inkl. <b>Hysterese</b>, z. B. Kühlung ein bei <code>&gt; 28 °C</code>, aus erst bei <code>&lt; 26 °C</code>, um ständiges Takten/Flattern an der Grenze zu verhindern!).</li>
         <li><b>Aktor (Stellglied):</b> Setzt das Steuersignal in eine physische Aktion um (Lüfter einschalten, Ventil öffnen, Alarmton auslösen).</li>
       </ol>
     </li>
     <li><b>Polling vs. Event-Driven / Interrupt:</b> Beim <b>Polling</b> fragt die Steuerung den Sensor aktiv in festen Zeitintervallen ab; beim <b>ereignisgesteuerten Verfahren (Push / Interrupt / MQTT)</b> meldet sich der Sensor selbstständig, sobald sich ein Wert ändert.</li>
   </ul>`,
   `<p><b>🔴 الأنظمة الفيزيائية السيبرانية (CPS / IoT) في الامتحان:</b></p>
   <ul>
     <li>تتكون دائماً من 3 عناصر: <b>الحساس (Sensor)</b> يقيس الظاهرة الفيزيائية $\\rightarrow$ <b>المتحكم (Steuerung)</b> يحلل ويقارن بالحدود $\\rightarrow$ <b>المشغّل (Aktor)</b> ينفذ الفعل الفيزيائي (تشغيل محرك، فتح صمام).</li>
     <li><b>فائدة Hysterese (نطاق التباطؤ):</b> جعل حد التشغيل أعلى من حد الإيقاف (مثلاً تشغيل التبريد عند $28^\circ\text{C}$ وإيقافه عند $26^\circ\text{C}$) لمنع اهتزاز وتلف الأجهزة بسبب التشغيل والإيقاف المتكرر عند الحد الفاصل!</li>
   </ul>`)
 ],[['Seiteneffekt','تغيير حالة خارج الدالة'],['Schema-Validierung','فحص البنية والأنواع'],['Aktor','عنصر ينفّذ تأثيرًا فيزيائيًا'],['Hysterese','فصل حد التشغيل عن حد الإيقاف لمنع التذبذب المستمر']],
 [Q('Eine XML-Rechnung besteht den XSD-Test, aber Netto + Steuer ist nicht Brutto. Was fehlt?','Fachliche/semantische Validierung der Betragsbeziehungen. XSD-Konformität prüft nicht automatisch jede Geschäftsregel.','صلاحية البنية لا تضمن صحة الحساب التجاري.'),Q('Ein Sensor liefert alle 2 s die Temperatur in Zehntelgrad. 287 wird empfangen. Temperatur und Abfrageart?','28,7 °C; regelmäßige Abfrage ist Polling, sofern der Client die Werte aktiv anfordert. Bei selbstständig gesendeten Meldungen wäre es ereignis-/pushbasiert.','حوّل الوحدة أولًا ثم طبّق عتبة القرار.')],['JSON/XML/CSV vergleichen','Regex-Grenzen erklären','Sensor–Verarbeitung–Aktor modellieren']);
