L('er-modell','daten','ER-Modell & relationales Schema','نمذجة البيانات (ER-Modell) وتحويلها إلى جداول علائقية','Kern','Entitätstypen, Schlüssel (PK/FK/Kandidatenschlüssel), Kardinalitäten (1:1, 1:n, n:m) und rekursive Beziehungen ableiten.',[
 S('1. Entität, Schlüsselarten & Referenzielle Integrität im Datenbankentwurf',
   `<p>In fast jeder AP2 (Teil 1 und Teil 2) bildet die Datenmodellierung das Fundament der Datenbankaufgaben (<b>2021W–2025W</b>):</p>
   <table>
     <thead><tr><th>Begriff</th><th>Definition &amp; Prüfungsbedeutung</th><th>Konkretes Beispiel</th></tr></thead>
     <tbody>
       <tr><td><b>Entitätstyp vs. Entität</b></td><td>• <b>Entitätstyp:</b> Klasse gleichartiger Objekte (im ER-Diagramm ein <b>Rechteck</b>, in SQL eine <b>Tabelle</b>).<br>• <b>Entität:</b> Konkrete Einzelinstanz (in SQL eine <b>Zeile / Datensatz / Tupel</b>).</td><td>Entitätstyp <code>Kunde</code> vs. der konkrete Kunde <i>„Max Mustermann (ID 104)“</i>.</td></tr>
       <tr><td><b>Kandidatenschlüssel (Schlüsselkandidat)</b></td><td>Jedes Attribut (oder minimale Attributkombination), das einen Datensatz fachlich eindeutig identifiziert.</td><td>In <code>Mitarbeiter</code>: <code>PersonalNr</code>, <code>SozialversicherungsNr</code> oder <code>SteuerID</code>.</td></tr>
       <tr><td><b>Primärschlüssel (Primary Key – PK)</b></td><td>Der ausgewählte Hauptschlüssel: zwingend <b>eindeutig (<code>UNIQUE</code>)</b> und <b>niemals leer (<code>NOT NULL</code>)</b>. Im ER-/Tabellenmodell <u>unterstrichen</u>!</td><td><u><code>KundenID</code></u> (künstlicher Surrogatschlüssel) oder <u><code>BestellNr, PosNr</code></u> (zusammengesetzter PK).</td></tr>
       <tr><td><b>Fremdschlüssel (Foreign Key – FK)</b></td><td>Attribut in einer abhängigen Tabelle, das auf den Primärschlüssel einer Elterntabelle verweist.</td><td><code>Bestellung.kunde_id</code> verweist auf <code>Kunde.id</code>.</td></tr>
       <tr><td><b>Referenzielle Integrität</b></td><td>Die Datenbank garantiert, dass kein Fremdschlüsselwert auf einen <b>nicht existierenden</b> Primärschlüssel zeigt!</td><td>Keine Bestellung für <code>kunde_id = 999</code> speicherbar, wenn Kunde 999 nicht existiert.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 المصطلحات الخمسة الأساسية في نمذجة قواعد البيانات:</b></p>
   <ul>
     <li><b>نوع الكيان (Entitätstyp):</b> الجدول ككل (مثل <code>Kunde</code>)، بينما <b>الكيان (Entität / Tupel)</b> هو صف واحد محدد داخل الجدول.</li>
     <li><b>المفتاح الأساسي (Primärschlüssel - PK):</b> فريد (<code>UNIQUE</code>) ولا يقبل القيمة الفارغة (<code>NOT NULL</code>) ويُوضع تحته خط دائماً.</li>
     <li><b>التكامل المرجعي (Referenzielle Integrität):</b> ضمان أن كل مفتاح أجنبي (<code>FK</code>) يشير إلى مفتاح أساسي (<code>PK</code>) موجود فعلياً في الجدول الأب.</li>
   </ul>`),
 S('2. Transformationsregeln: 1:1, 1:n, n:m & Rekursive Beziehung in Tabellen überführen',
   `<p>So überführst du jede Beziehung aus dem ER-Diagramm fehlerfrei in das relationale Tabellenmodell (<b>Relationenschema</b>):</p>
   <table>
     <thead><tr><th>Kardinalität</th><th>Goldene Überführungsregel in Tabellen</th><th>Wo stehen die Fremdschlüssel?</th></tr></thead>
     <tbody>
       <tr><td><b><code>1 : n</code></b><br>(z. B. 1 Kunde hat n Bestellungen)</td><td><b>Keine</b> eigene Zwischentabelle nötig! Der Primärschlüssel der <b><code>1</code>-Seite</b> wandert als Fremdschlüssel in die Tabelle der <b><code>n</code>-Seite</b>.</td><td>In der <b><code>n</code>-Tabelle</b>: <code>Bestellung(<u>id</u>, <i>kunde_id</i> FK NOT NULL, datum)</code>.</td></tr>
       <tr><td><b><code>n : m</code></b><br>(z. B. Bestellung enthält m Artikel, Artikel in n Bestellungen)</td><td>Erfordert <b>zwingend eine eigene Zwischentabelle (Beziehungstabelle)</b>! Beide Primärschlüssel werden dort zu Fremdschlüsseln und bilden zusammen den zusammengesetzten PK.</td><td>In der <b>Zwischentabelle</b> inkl. Beziehungsattributen:<br><code>Position(<u><i>bestell_id</i></u>, <u><i>artikel_id</i></u>, menge, einzelpreis)</code>.</td></tr>
       <tr><td><b><code>1 : 1</code></b><br>(z. B. Mitarbeiter hat 1 Dienstwagen)</td><td>PK der einen Seite wird als <b><code>FK + UNIQUE</code></b> in die andere Tabelle aufgenommen (bei Pflichtbeziehung auf deren Seite mit <code>NOT NULL</code>).</td><td><code>Dienstwagen(<u>id</u>, kennzeichen, <i>mitarbeiter_id</i> FK UNIQUE)</code>.</td></tr>
       <tr><td><b>Rekursive Beziehung (Selbstreferenz)</b><br>(z. B. Mitarbeiter leitet/vertritt Mitarbeiter – 2024W, 2025S, 2025W!)</td><td>Bei <code>1:n</code> zeigt ein Fremdschlüssel in <b>derselben Tabelle</b> auf den eigenen Primärschlüssel!</td><td><code>Mitarbeiter(<u>id</u>, name, <i>vorgesetzter_id</i> FK NULL)</code>.</td></tr>
     </tbody>
   </table>`+C('Kunde(id PK, name)\nBestellung(id PK, kunde_id FK NOT NULL, datum)\nArtikel(id PK, bezeichnung, aktueller_preis)\nPosition(bestellung_id PK/FK, artikel_id PK/FK, menge, kaufpreis)'),
   `<p><b>🔴 قواعد تحويل علاقات ER إلى جداول (Relationenschema):</b></p>
   <ul>
     <li><b>علاقة <code>1:n</code>:</b> المفتاح الأساسي لطرف الـ <b><code>1</code></b> ينتقل كمفتاح أجنبي (<code>FK</code>) إلى جدول طرف الـ <b><code>n</code></b>.</li>
     <li><b>علاقة <code>n:m</code>:</b> ننشئ <b>جدولاً وسيطاً جديداً</b> يضم مفتاحي الجدولين معاً، وتوضع فيه أي صفة تابعة للعلاقة مثل الكمية (<code>menge</code>).</li>
     <li><b>علاقة ذاتية (Rekursive Beziehung 1:n):</b> عمود مفتاح أجنبي داخل نفس الجدول يشير إلى المفتاح الأساسي لنفس الجدول (مثل <code>vorgesetzter_id</code>).</li>
   </ul>`)
 ],[['Entität','كائن مميز في مجال العمل'],['Fremdschlüssel','مرجع إلى سجل في جدول'],['Referenzielle Integrität','سلامة الروابط بين السجلات'],['Zwischentabelle','جدول وسيط لكسر علاقة n:m إلى علاقتي 1:n']],
 [Q('Ein Kurs hat viele Teilnehmer, ein Teilnehmer besucht viele Kurse. Wo gehört das Anmeldedatum hin?','In eine Beziehungstabelle Anmeldung(teilnehmer_id, kurs_id, anmeldedatum). Die Kombination identifiziert bei einmaliger Teilnahme die Zuordnung. Das Datum gehört zur Anmeldung, nicht allein zum Kurs/Teilnehmer.','الصفة تتبع العلاقة المحددة بين شخص ودورة.'),Q('Wie erzwingst du, dass jede Bestellung genau einen existierenden Kunden besitzt?','kunde_id als Fremdschlüssel auf Kunde(id) und NOT NULL definieren. Der Fremdschlüssel allein verbietet nicht in jeder SQL-Definition NULL.','FK يتحقق من المرجع، وNOT NULL يجعل وجوده إلزاميًا.')],['1:n und n:m umsetzen','Optionalität mit Constraints abbilden','Beziehungsattribute richtig zuordnen'],['ordnung','sql']);
L('normalisierung','daten','Normalisierung: 1NF bis 3NF','التطبيع من الشكل الأول إلى الثالث (1NF – 2NF – 3NF)','Kern','Redundanzen und Anomalien erkennen und Tabellen über funktionale Abhängigkeiten bis in die 3NF zerlegen.',[
 S('1. Die 3 Datenbank-Anomalien & Funktionale Abhängigkeit (X → Y)',
   `<p>In <b>2022S, 2023W, 2024S und 2025S</b> fragte die IHK vor der eigentlichen Normalisierung oft: <i>„Erläutern Sie am vorliegenden Tabellenbeispiel zwei Anomalien, die durch <b>Redundanz</b> entstehen.“</i></p>
   <table>
     <thead><tr><th>Anomalie-Art</th><th>Was passiert konkret?</th><th>Prüfungsreifes Beispiel an einer unnormalisierten Rechnungstabelle</th></tr></thead>
     <tbody>
       <tr><td><b>1. Änderungsanomalie (Update Anomaly)</b></td><td>Ein mehrfach (redundant) gespeicherter Wert wird nur in einigen Zeilen geändert, in anderen vergessen $\\rightarrow$ <b>Inkonsistenter Datenbestand!</b></td><td>Kunde Müller zieht um; seine Adresse wird in Rechnung 101 geändert, bleibt aber in Rechnung 102 auf der alten Straße stehen.</td></tr>
       <tr><td><b>2. Einfügeanomalie (Insertion Anomaly)</b></td><td>Ein neues Stammobjekt kann noch nicht gespeichert werden, weil der Primärschlüssel der Gesamttabelle noch fehlt (<code>NOT NULL</code>-Verstoß).</td><td>Ein neuer Artikel oder neuer Kunde kann erst angelegt werden, wenn bereits mindestens eine Bestellung (<code>BestellNr</code>) existiert.</td></tr>
       <tr><td><b>3. Löschanomalie (Deletion Anomaly)</b></td><td>Beim Löschen eines Bewegungsdatensatzes gehen ungewollt auch die letzten Stammdaten eines Objekts mit verloren!</td><td>Wird die einzige Bestellung eines Kunden storniert und gelöscht, sind damit auch Name und Anschrift des Kunden komplett verloren.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 الشذوذات الثلاثة (Anomalien) التي تسببها التكرارات (Redundanzen):</b></p>
   <ul>
     <li><b>شذوذ التعديل (Änderungsanomalie):</b> تعديل عنوان العميل في سطر ونسيانه في سطر آخر فيؤدي لتضارب البيانات (Inkonsistenz).</li>
     <li><b>شذوذ الإدراج (Einfügeanomalie):</b> عدم القدرة على إضافة منتج جديد أو عميل جديد إلا إذا وُجد رقم طلب (<code>BestellNr</code>).</li>
     <li><b>شذوذ الحذف (Löschanomalie):</b> حذف آخر طلب للعميل يؤدي لضياع بيانات العميل الأساسية نفسها عن طريق الخطأ.</li>
   </ul>`),
 S('2. Schritt-für-Schritt-Kochrezept: Von 0NF über 1NF und 2NF bis zur 3NF',
   `<p>Merke dir die exakten Definitionen und Prüfschritte für <b>1NF, 2NF und 3NF</b>:</p>
   <table>
     <thead><tr><th>Normalform</th><th>Gesetzmäßige Bedingung</th><th>Was musst du konkret tun?</th></tr></thead>
     <tbody>
       <tr><td><b>1. Normalform (1NF)</b></td><td>Jedes Attribut enthält nur <b>atomare (unteilbare) Einzelwerte</b>; es gibt <b>keine Wiederholungsgruppen</b> (wie <code>Artikel1, Artikel2</code> oder Listen in einer Zelle).</td><td>Kombi-Felder wie <code>PLZ_Ort</code> oder <code>VorUndNachname</code> in Einzelspalten (<code>PLZ</code>, <code>Ort</code>) trennen; Wiederholungsgruppen in eigene Zeilen mit zusammengesetztem PK überführen.</td></tr>
       <tr><td><b>2. Normalform (2NF)</b></td><td>1NF ist erfüllt <b>UND</b> jedes Nichtschlüsselattribut hängt <b>vollfunktional vom GESAMTEN Primärschlüssel</b> ab (nicht nur von einem Teil des zusammengesetzten Schlüssels!).<br><i>Hinweis: Hat eine Tabelle nur 1 Spalte als PK, ist sie in 1NF automatisch auch in 2NF!</i></td><td>Prüfe bei zusammengesetztem PK <code>(<u>BestellNr</u>, <u>ArtikelNr</u>)</code>: Hängt <code>Artikelname</code> nur von <code>ArtikelNr</code> ab? Hängt <code>Bestelldatum</code> nur von <code>BestellNr</code> ab? $\\rightarrow$ In eigene Tabellen <code>Artikel</code> und <code>Bestellung</code> auslagern! Nur was von <b>beiden</b> abhängt (<code>Menge</code>), bleibt in <code>Position</code>.</td></tr>
       <tr><td><b>3. Normalform (3NF)</b></td><td>2NF ist erfüllt <b>UND</b> kein Nichtschlüsselattribut hängt <b>transitiv (indirekt über ein anderes Nichtschlüsselattribut)</b> vom Primärschlüssel ab (<code>PK → A → B</code>).</td><td>Prüfe in jeder 2NF-Tabelle: Bestimmt ein Nichtschlüsselattribut ein anderes? Beispiel in <code>Bestellung(<u>BestellNr</u>, KundenNr, Kundenname)</code>: <code>BestellNr → KundenNr → Kundenname</code> $\\rightarrow$ <code>Kunde(<u>KundenNr</u>, Kundenname)</code> auslagern! In <code>Bestellung</code> bleibt nur <code><i>KundenNr</i> (FK)</code>.</td></tr>
     </tbody>
   </table>`+C('0NF/1NF: Position(BestellNr, Bestelldatum, KundenNr, Kundenname, PLZ, Ort, ArtikelNr, Artikelname, Menge)\n\n2NF (Teilabhaengigkeiten von BestellNr bzw. ArtikelNr getrennt):\n  Bestellung(BestellNr PK, Bestelldatum, KundenNr, Kundenname, PLZ, Ort)\n  Artikel(ArtikelNr PK, Artikelname)\n  Position(BestellNr PK/FK, ArtikelNr PK/FK, Menge)\n\n3NF (Transitive Abhaengigkeiten KundenNr -> Kundenname, PLZ -> Ort getrennt):\n  Ort(PLZ PK, Ort)\n  Kunde(KundenNr PK, Kundenname, PLZ FK)\n  Bestellung(BestellNr PK, Bestelldatum, KundenNr FK)\n  Artikel(ArtikelNr PK, Artikelname)\n  Position(BestellNr PK/FK, ArtikelNr PK/FK, Menge)'),
   `<p><b>🔴 الوصفة الذهبية للوصول إلى 3NF في الامتحان بدون أي خطأ:</b></p>
   <ol>
     <li><b>1NF (الذرية):</b> افصل أي عمود مركب (مثل <code>PLZ_Ort</code> إلى <code>PLZ</code> و <code>Ort</code>) وأزل المجموعات المتكررة.</li>
     <li><b>2NF (إزالة الاعتماد الجزئي):</b> انظر إلى الجداول ذات المفتاح المركب <code>(<u>BestellNr</u>, <u>ArtikelNr</u>)</code>؛ أي عمود يعتمد على نصف المفتاح فقط يخرج إلى جدول مستقل!</li>
     <li><b>3NF (إزالة الاعتماد المتعدي Transitiv):</b> انظر داخل كل جدول؛ إذا كان عمود غير مفتاحي يحدد عموداً آخر غير مفتاحي (مثل <code>KundenNr → Kundenname</code> أو <code>PLZ → Ort</code>)، افصله في جدول مستقل واترك المفتاح الأجنبي <code>FK</code> مكانه!</li>
   </ol>`)
 ],[['Funktionale Abhängigkeit','اعتماد تحدده قواعد المجال'],['Änderungsanomalie','تضارب بسبب تحديث التكرار جزئيًا'],['Verlustfreie Zerlegung','تفكيك يسمح بإعادة بناء المعلومات'],['Transitive Abhängigkeit','اعتماد غير مباشر عبر عمود غير مفتاحي (يرفع في 3NF)']],
 [Q('In Position(BestellNr, ArtikelNr, Artikelname, Menge) ist (BestellNr,ArtikelNr) Schlüssel und ArtikelNr bestimmt Artikelname. Welche Normalform ist verletzt?','2NF: Artikelname hängt nur vom Schlüsselteil ArtikelNr ab. Artikel(ArtikelNr,Artikelname) auslagern; Position behält BestellNr,ArtikelNr,Menge. Voraussetzung: atomare Werte, also 1NF erfüllt.','اذكر الاعتماد الجزئي المحدد، لا عبارة «فيه تكرار» فقط.'),Q('Warum ist Kundenname in Bestellung(BestellNr,KundenNr,Kundenname) problematisch?','BestellNr → KundenNr → Kundenname: transitive Abhängigkeit. Kundenname in Kunde speichern und per FK referenzieren; so vermeidet man inkonsistente Namensänderungen.','المرحلة الثالثة تزيل هذه السلسلة عندما لا يكون العميل مفتاحًا للطلب.')],['Alle drei Anomalien am Beispiel erklären','Teilweise von transitiver Abhängigkeit unterscheiden','3NF mit PK/FK entwerfen'],['ordnung','sql']);
L('sql-select','daten','SQL: SELECT, WHERE, NULL & Sortierung','الاستعلام في SQL: التصفية (WHERE)، القيم الفارغة (NULL) والترتيب','Kern','SELECT, DISTINCT, WHERE (BETWEEN, IN, LIKE), IS NULL, COALESCE und die logische Ausführungsreihenfolge.',[
 S('1. SELECT-Operatoren (DISTINCT, BETWEEN, IN, LIKE) & Klammerung bei AND / OR',
   `<p>Grundlegende und kombinierte <b>Filterabfragen</b> in SQL (gemäß <b>IHK-Belegsatz</b>):</p>
   <table>
     <thead><tr><th>Klausel / Operator</th><th>SQL-Syntax</th><th>Wichtige Prüfungsregel</th></tr></thead>
     <tbody>
       <tr><td><b>Duplikate entfernen</b></td><td><code>SELECT DISTINCT ort FROM Kunde;</code></td><td>Ohne <code>DISTINCT</code> werden alle Zeilen (inkl. Duplikate) ausgegeben.</td></tr>
       <tr><td><b>Bereichsprüfung (<code>BETWEEN</code>)</b></td><td><code>WHERE preis BETWEEN 10 AND 50</code></td><td><b>Inklusiv beider Grenzen!</b> Entspricht exakt <code>preis &gt;= 10 AND preis &lt;= 50</code> (funktioniert auch für Datumswerte wie <code>BETWEEN '2025-01-01' AND '2025-12-31'</code>).</td></tr>
       <tr><td><b>Mengenprüfung (<code>IN</code>)</b></td><td><code>WHERE status IN ('offen', 'in_pruefung')</code></td><td>Kürzer und sicherer als mehrere <code>OR</code>-Verknüpfungen.</td></tr>
       <tr><td><b>Mustersuche (<code>LIKE</code>)</b></td><td>• <code>LIKE 'A%'</code> (beginnt mit A)<br>• <code>LIKE '%str%'</code> (enthält str)<br>• <code>LIKE 'M_ier'</code> (genau 1 beliebiges Zeichen an <code>_</code>)</td><td>• <code>%</code> = <b>0, 1 oder beliebig viele</b> Zeichen.<br>• <code>_</code> = <b>genau 1</b> einzelnes Zeichen!</td></tr>
       <tr><td><b>Vorrangregel: <code>AND</code> bindet stärker als <code>OR</code>!</b></td><td><code>WHERE aktiv = 1 AND (rabatt &gt; 10 OR umsatz &gt; 5000)</code></td><td><b>⚠️ Falle:</b> Ohne Klammern um das <code>OR</code> würde <code>umsatz &gt; 5000</code> auch inaktive Kunden liefern!</td></tr>
     </tbody>
   </table>`+C("SELECT id, name, preis\nFROM Artikel\nWHERE preis >= 20 AND (kategorie = 'Buch' OR kategorie = 'Spiel')\nORDER BY preis DESC, name ASC;"),
   `<p><b>🔴 قواعد الفلترة في SQL (WHERE):</b></p>
   <ul>
     <li>المعامل <code>BETWEEN a AND b</code> يشمل الحدين <code>a</code> و <code>b</code> معاً (<code>&gt;= a AND &lt;= b</code>).</li>
     <li>في <code>LIKE</code>: الرمز <code>%</code> يطابق أي عدد من الحروف (حتى صفر حرف)، بينما <code>_</code> يطابق حرفاً واحداً بالضبط.</li>
     <li><b>انتبه للأقواس:</b> <code>AND</code> أقوى من <code>OR</code>، لذا ضع شروط <code>OR</code> دائماً داخل أقواس <code>(...)</code>!</li>
   </ul>`),
 S('2. Dreiwertige Logik bei NULL (IS NULL / COALESCE) & Ausführungsreihenfolge',
   `<p>In SQL steht <code>NULL</code> für „unbekannt / kein Wert vorhanden“ – <b>nicht</b> für <code>0</code> und <b>nicht</b> für einen Leerstring <code>''</code>!</p>
   <table>
     <thead><tr><th>Thema</th><th>Falsch in der Prüfung (0 Punkte)</th><th>Richtig in der Prüfung (Volle Punktzahl)</th></tr></thead>
     <tbody>
       <tr><td><b>Auf <code>NULL</code> prüfen</b></td><td><code>WHERE telefon = NULL</code> oder <code>&lt;&gt; NULL</code> (liefert <code>UNKNOWN</code>, also 0 Zeilen!)</td><td><code>WHERE telefon <b>IS NULL</b></code> bzw. <code>WHERE telefon <b>IS NOT NULL</b></code></td></tr>
       <tr><td><b><code>NULL</code> durch Ersatzwert ersetzen</b></td><td>Rechnung <code>preis + rabatt</code> (wird <code>NULL</code>, falls <code>rabatt</code> <code>NULL</code> ist!)</td><td><code>COALESCE(rabatt, 0)</code> liefert den ersten Nicht-NULL-Wert.</td></tr>
       <tr><td><b>Logische Ausführungsreihenfolge einer SQL-Abfrage</b></td><td>Spalten-Alias aus <code>SELECT</code> bereits im <code>WHERE</code> benutzen (Fehler!)</td><td><b>1. <code>FROM / JOIN</code></b> $\\rightarrow$ <b>2. <code>WHERE</code></b> $\\rightarrow$ <b>3. <code>GROUP BY</code></b> $\\rightarrow$ <b>4. <code>HAVING</code></b> $\\rightarrow$ <b>5. <code>SELECT</code></b> $\\rightarrow$ <b>6. <code>DISTINCT</code></b> $\\rightarrow$ <b>7. <code>ORDER BY</code></b> $\\rightarrow$ <b>8. <code>LIMIT</code></b>.<br>Deshalb kennt erst <code>ORDER BY</code> sicher jeden <code>SELECT</code>-Alias!</td></tr>
     </tbody>
   </table>`,
   `<p><b>⚠️ فخ NULL وترتيب تنفيذ أوامر SQL:</b></p>
   <ul>
     <li>لا تكتب أبداً <code>= NULL</code> في SQL؛ استخدم دائماً <code>IS NULL</code> أو <code>IS NOT NULL</code>، واستخدم <code>COALESCE(spalte, 0)</code> لتحويل القيمة الفارغة إلى صفر في الحسابات.</li>
     <li><b>ترتيب التنفيذ الفعلي داخل محرك SQL:</b> يبدأ بـ <code>FROM/JOIN</code> ثم <code>WHERE</code> ثم <code>GROUP BY</code> ثم <code>HAVING</code> ثم <code>SELECT</code> وأخيراً <code>ORDER BY</code>. لهذا السبب لا يمكنك استخدام الاسم المستعار (Alias) المعرّف في <code>SELECT</code> داخل جملة <code>WHERE</code>!</li>
   </ul>`)
 ],[['Projektion','اختيار أعمدة'],['Selektion','اختيار صفوف'],['NULL','قيمة غير معروفة أو غير موجودة'],['COALESCE','إرجاع أول قيمة غير فارغة (NULL)']],
 [Q('Liefere Namen aller aktiven Kunden ohne hinterlegte Telefonnummer, alphabetisch sortiert. Tabelle Kunde(name,aktiv,telefon).','SELECT name FROM Kunde WHERE aktiv = TRUE AND telefon IS NULL ORDER BY name ASC; Falls aktiv im Belegsatz als Zahl kodiert ist, die vorgegebene Kodierung verwenden.','استخدم IS NULL؛ وليس telefon = NULL.'),Q('Was findet LIKE \'A_%\'?','Zeichenketten, die mit A beginnen und danach mindestens ein weiteres Zeichen enthalten. _ steht für genau ein Zeichen, % für beliebig viele einschließlich null Zeichen.','A وحدها لا تطابق هذا النمط.')],['SELECT mit Bedingungen schreiben','NULL korrekt prüfen','ORDER BY und LIKE sicher anwenden'],['sql']);
L('sql-joins','daten','SQL: JOINs & Ergebnismengen','ربط الجداول في SQL (INNER / LEFT / SELF JOIN)','Kern','INNER JOIN vs. LEFT JOIN, die ON-vs.-WHERE-Falle, fehlende Datensätze (IS NULL) und Self-Joins.',[
 S('1. Alle JOIN-Typen im Überblick (INNER, LEFT, RIGHT, SELF JOIN)',
   `<p>Nahezu jede SQL-Aufgabe in <b>Teil 1 und Teil 2</b> erfordert das Verknüpfen von 2 bis 4 Tabellen:</p>
   <table>
     <thead><tr><th>JOIN-Art</th><th>Welche Zeilen bleiben im Ergebnis?</th><th>Wann in der Prüfung nutzen?</th></tr></thead>
     <tbody>
       <tr><td><b><code>INNER JOIN</code></b> (oder kurz <code>JOIN</code>)</td><td>Nur Datensätze, die in <b>beiden</b> Tabellen einen passenden Partner haben (Schnittmenge).</td><td>Standard, wenn z. B. nur Bestellungen mit existierendem Kunden und deren Positionen gesucht sind.</td></tr>
       <tr><td><b><code>LEFT [OUTER] JOIN</code></b></td><td><b>ALLE Zeilen der linken Tabelle</b> bleiben erhalten! Hat eine linke Zeile keinen Partner rechts, werden die rechten Spalten mit <code>NULL</code> aufgefüllt.</td><td>Immer wenn im Aufgabentext steht: <i>„Geben Sie <b>alle</b> Kunden/Kurse/Artikel aus – <b>auch solche ohne</b> Bestellung/Teilnehmer (mit 0)“</i>!</td></tr>
       <tr><td><b><code>LEFT JOIN ... WHERE rechts.id IS NULL</code> (Anti-Join)</b></td><td>Liefert gezielt nur diejenigen linken Datensätze, die <b>keinen einzigen</b> Treffer in der rechten Tabelle haben.</td><td>Klassiker: <i>„Finden Sie alle Kunden, die noch <b>nie</b> bestellt haben“</i> oder <i>„Artikel, die nie verkauft wurden“</i>.</td></tr>
       <tr><td><b><code>SELF JOIN</code></b> (Tabelle mit sich selbst)</td><td>Dieselbe Tabelle wird mit <b>zwei verschiedenen Aliasen</b> (z. B. <code>Mitarbeiter m</code> und <code>Mitarbeiter v</code>) gejoint.</td><td>Rekursive Beziehungen (Mitarbeiter + Name seines Vorgesetzten: <code>ON m.vorgesetzter_id = v.id</code> – geprüft in <b>2024W &amp; 2025S</b>!).</td></tr>
     </tbody>
   </table>`+C('SELECT k.id, k.name, b.id AS bestellnr\nFROM Kunde k\nLEFT JOIN Bestellung b ON b.kunde_id = k.id;'),
   `<p><b>🔴 متى تستخدم INNER JOIN ومتى تستخدم LEFT JOIN في الامتحان؟</b></p>
   <ul>
     <li>إذا طلب السؤال «جميع العملاء حتى الذين ليس لديهم طلبات» (أو يريد ظهور العدد <code>0</code> أمامهم) $\\rightarrow$ استخدم <b><code>LEFT JOIN</code></b>.</li>
     <li>إذا طلب السؤال «العملاء الذين لم يطلبوا أبداً» $\\rightarrow$ استخدم <b><code>LEFT JOIN</code></b> مع <b><code>WHERE b.id IS NULL</code></b>.</li>
     <li>إذا كانت العلاقة ذاتية في نفس الجدول (موظف ومديره) $\\rightarrow$ اربط الجدول بنفسه باستخدام اسمين مستعارين مختلفين (<code>FROM Mitarbeiter m LEFT JOIN Mitarbeiter chef ON m.chef_id = chef.id</code>).</li>
   </ul>`),
 S('2. Die berühmteste IHK-SQL-Falle: Bedingung im ON vs. im WHERE beim LEFT JOIN',
   `<p><b>Warum verliert ein </b><code>LEFT JOIN</code> plötzlich alle Kunden ohne Bestellung, wenn man einen Filter auf die rechte Tabelle in das <code>WHERE</code> schreibt?</p>
   <ul>
     <li><b>Fall A – Filter steht im <code>WHERE</code> (FALSCH für „alle Kunden“):</b><br>
     Bei einem Kunden ohne Bestellung setzt der <code>LEFT JOIN</code> alle Spalten von <code>Bestellung</code> auf <code>NULL</code>. Prüft danach <code>WHERE b.status = 'bezahlt'</code> oder <code>WHERE YEAR(b.datum) = 2025</code>, ergibt der Vergleich mit <code>NULL</code> den Wert <code>UNKNOWN</code> – und <b><code>WHERE</code> wirft den Kunden komplett aus dem Ergebnis</b> (der <code>LEFT JOIN</code> degradiert zum <code>INNER JOIN</code>)!</li>
     <li><b>Fall B – Filter auf die rechte Tabelle steht direkt im <code>ON</code> (RICHTIG):</b><br>
     Schreibt man <code>LEFT JOIN Bestellung b ON b.kunde_id = k.id AND b.status = 'bezahlt'</code>, werden nur bezahlte Bestellungen angehängt, aber Kunden ohne bezahlte Bestellung <b>bleiben mit <code>NULL</code> (bzw. <code>0</code> bei <code>COUNT(b.id)</code>) im Ergebnis erhalten</b>!</li>
   </ul>`+C("-- Alle Kunden finden, die noch NIE bestellt haben:\nSELECT k.id, k.name\nFROM Kunde k\nLEFT JOIN Bestellung b ON b.kunde_id = k.id\nWHERE b.id IS NULL;"),
   `<p><b>⚠️ أخطر فخ في استعلامات LEFT JOIN (تكرر في 2023S و 2024W و 2025W):</b></p>
   <ul>
     <li>عند استخدام <code>LEFT JOIN</code> للاحتفاظ بجميع صفوف الجدول الأيسر، فإن أي شرط يخص الجدول الأيمن (مثل <code>AND YEAR(b.datum) = 2025</code> أو <code>AND b.status = 'bezahlt'</code>) يجب وضعه <b>داخل جملة <code>ON</code></b> وليس في <code>WHERE</code>! لأن وضعه في <code>WHERE</code> سيحذف الصفوف التي قيمتها <code>NULL</code> ويحوّل الاستعلام إلى <code>INNER JOIN</code>!</li>
   </ul>`)
 ],[['Inner Join','الصفوف ذات تطابق في الجانبين'],['Left Outer Join','كل الصفوف اليسرى مع المطابق يمينًا'],['Kartesisches Produkt','كل تركيب ممكن بين الصفوف'],['Self-Join','ربط الجدول بنفسه عبر اسمين مستعارين']],
 [Q('Kunde 1 hat zwei Bestellungen, Kunde 2 keine. Wie viele Zeilen liefert INNER JOIN, wie viele LEFT JOIN?','INNER: 2 Zeilen, beide für Kunde 1. LEFT: 3 Zeilen; zusätzlich Kunde 2 mit NULL bei den Bestellspalten.','النتيجة ليست عدد العملاء، بل عدد التركيبات المطابقة مع الصفوف المحفوظة.'),Q('Warum entfernt WHERE b.status = \'offen\' nach LEFT JOIN Kunden ohne Bestellung?','Bei fehlender Bestellung ist b.status NULL; der Vergleich wird UNKNOWN und von WHERE ausgeschlossen. Bedingung in ON setzen, wenn alle Kunden erhalten bleiben sollen.','الفارق بين ON وWHERE يؤثر في OUTER JOIN على من يبقى في النتيجة.')],['LEFT JOIN anhand gewünschter Vollständigkeit wählen','Fehlende Beziehungen abfragen','ON-/WHERE-Falle erklären'],['sql']);
L('sql-gruppen','daten','SQL: Aggregate, GROUP BY & HAVING','التجميع في SQL (COUNT / SUM / AVG / GROUP BY / HAVING)','Kern','COUNT(*) vs. COUNT(spalte), GROUP BY-Vollständigkeit, WHERE vs. HAVING und Umsätze ohne Doppelzählung.',[
 S('1. Aggregatfunktionen, NULL-Verhalten & die GROUP-BY-Goldregel',
   `<p>Auswertungs- und Statistikabfragen mit <code>GROUP BY</code> und <code>HAVING</code> bringen in jeder AP2 zwischen <b>8 und 15 Punkten</b>:</p>
   <table>
     <thead><tr><th>Funktion / Klausel</th><th>Wie geht sie mit <code>NULL</code> um?</th><th>Wichtigste Prüfungsregel</th></tr></thead>
     <tbody>
       <tr><td><b><code>COUNT(*)</code></b></td><td>Zählt <b>alle Ergebniszeilen</b> der Gruppe – <b>inklusive Zeilen mit <code>NULL</code>!</b></td><td><b>⚠️ Falle bei <code>LEFT JOIN</code>:</b> Ein Kunde ohne Bestellung hat im <code>LEFT JOIN</code> 1 Zeile (mit <code>NULL</code> rechts). <code>COUNT(*)</code> liefert für ihn fälschlich <b><code>1</code> statt <code>0</code></b>!</td></tr>
       <tr><td><b><code>COUNT(spalte)</code></b></td><td>Zählt <b>nur Nicht-NULL-Werte</b> in dieser Spalte!</td><td>Nach <code>LEFT JOIN</code> immer die rechte PK-Spalte zählen: <code>COUNT(b.id)</code> liefert bei fehlender Bestellung exakt <b><code>0</code></b>!</td></tr>
       <tr><td><b><code>COUNT(DISTINCT spalte)</code></b></td><td>Zählt nur <b>unterschiedliche</b> Nicht-NULL-Werte.</td><td>Wichtig, wenn gefragt ist: <i>„An wie vielen <b>verschiedenen</b> Tagen/Kunden...“</i></td></tr>
       <tr><td><b><code>SUM(x)</code>, <code>AVG(x)</code>, <code>MIN(x)</code>, <code>MAX(x)</code></b></td><td>Ignorieren <code>NULL</code>-Werte komplett! (Bei <code>10, 20, NULL</code> rechnet <code>AVG</code>: <code>(10+20)/2 = 15</code>, nicht <code>/3</code>!).</td><td>Falls alle Werte einer Gruppe <code>NULL</code> sind, liefern <code>SUM</code> und <code>AVG</code> selbst <code>NULL</code> $\\rightarrow$ mit <code>COALESCE(SUM(...), 0)</code> absichern!</td></tr>
       <tr><td><b><code>GROUP BY</code>-Goldregel</b></td><td>Jede Spalte im <code>SELECT</code>, die <b>nicht</b> in einer Aggregatfunktion steht, <b>muss</b> im <code>GROUP BY</code> aufgeführt werden!</td><td>Immer nach <code>id, name</code> gruppieren (nicht nur nach <code>name</code>, da zwei Kunden gleich heißen können!).</td></tr>
     </tbody>
   </table>`+C('SELECT k.id, k.name, COUNT(b.id) AS anzahl\nFROM Kunde k LEFT JOIN Bestellung b ON b.kunde_id = k.id\nGROUP BY k.id, k.name\nHAVING COUNT(b.id) >= 3\nORDER BY anzahl DESC;'),
   `<p><b>🔴 القواعد الذهبية للتجميع في SQL:</b></p>
   <ul>
     <li><b>الفرق بين <code>COUNT(*)</code> و <code>COUNT(b.id)</code>:</b> بعد <code>LEFT JOIN</code> استخدم دائماً <b><code>COUNT(b.id)</code></b> حتى يظهر الرقم <code>0</code> أمام العميل الذي ليس لديه طلبات!</li>
     <li><b>قاعدة <code>GROUP BY</code>:</b> كل عمود تكتبه في <code>SELECT</code> خارج دوال التجميع يجب أن تكتبه في <code>GROUP BY</code>.</li>
   </ul>`),
 S('2. WHERE vs. HAVING & Umsatzberechnung über Bestellpositionen',
   `<p><b>Merksatz zur Unterscheidung von </b><code>WHERE</code> und <code>HAVING</code>:</p>
   <table>
     <thead><tr><th>Merkmal</th><th><code>WHERE</code></th><th><code>HAVING</code></th></tr></thead>
     <tbody>
       <tr><td><b>Zeitpunkt der Filterung</b></td><td>Filtert <b>einzelne Zeilen VOR</b> dem <code>GROUP BY</code>.</td><td>Filtert <b>fertige Gruppen NACH</b> dem <code>GROUP BY</code>.</td></tr>
       <tr><td><b>Aggregatfunktionen erlaubt?</b></td><td><b>NEIN!</b> <code>WHERE SUM(umsatz) &gt; 1000</code> ist ein Syntaxfehler!</td><td><b>JA!</b> <code>HAVING SUM(p.menge * p.einzelpreis) &gt; 1000</code>.</td></tr>
     </tbody>
   </table>
   <ul>
     <li><b>Umsatzformel in Positionstabellen:</b> Der Umsatz einer Position ist <code>p.menge * p.einzelpreis</code> (ggf. <code>* (1 - p.rabatt / 100.0)</code>). Der Gesamtumsatz pro Kunde/Monat ist daher <code>SUM(p.menge * p.einzelpreis)</code> – <b>nicht</b> <code>SUM(p.menge) * p.einzelpreis</code>!</li>
   </ul>`,
   `<p><b>🔴 متى نستخدم WHERE ومتى نستخدم HAVING؟</b></p>
   <ul>
     <li><b><code>WHERE</code>:</b> يصفّي الصفوف الفردية <b>قبل</b> التجميع (ولا يقبل دوال تجميع مثل <code>SUM</code> أو <code>COUNT</code> بداخله أبداً).</li>
     <li><b><code>HAVING</code>:</b> يصفّي المجموعات <b>بعد</b> التجميع على أساس نتيجة الدالة التجميعية (مثال: <code>HAVING COUNT(b.id) &gt;= 3</code> أو <code>HAVING SUM(betrag) &gt; 1000</code>).</li>
   </ul>`)
 ],[['Gruppierung','جمع صفوف حسب مفتاح'],['Aggregatfunktion','دالة تلخّص مجموعة'],['HAVING','شرط على نتيجة التجميع']],
 [Q('Bestellung(kunde_id,betrag,status): Gesamtbetrag bezahlter Bestellungen je Kunde, nur Summen über 1000 €.','SELECT kunde_id, SUM(betrag) AS summe FROM Bestellung WHERE status = \'bezahlt\' GROUP BY kunde_id HAVING SUM(betrag) > 1000;','حالة الدفع قبل التجميع؛ شرط المجموع بعده.'),Q('Eine Gruppe hat Werte 10, 20, NULL. Nenne COUNT(*), COUNT(wert), AVG(wert).','COUNT(*) = 3; COUNT(wert) = 2; AVG(wert) = 15. NULL wird für AVG nicht als 0 gerechnet.','القسمة على 2 لا على 3، لأن القيمة الثالثة غير معروفة.')],['WHERE und HAVING kombinieren','COUNT(*) von COUNT(spalte) unterscheiden','Doppelzählungen bei JOINs erkennen'],['sql']);
L('sql-subqueries','daten','SQL: Unterabfragen, EXISTS & Mengen','الاستعلامات الفرعية (Subqueries)، EXISTS ودمج النتائج (UNION)','Kern','Skalare vs. mehrzeilige Unterabfragen, EXISTS / NOT EXISTS, UNION vs. UNION ALL, CASE WHEN und Views.',[
 S('1. Skalare Unterabfrage, IN vs. EXISTS & warum NOT IN bei NULL gefährlich ist',
   `<p>Wenn in einer SQL-Aufgabe ein Vergleich mit einem erst zu berechnenden Wert gefordert ist (z. B. <i>„Alle Artikel, die teurer als der Durchschnittspreis sind“</i> – <b>2022S, 2024S, 2025W</b>), brauchst du eine <b>Unterabfrage (Subquery)</b>:</p>
   <table>
     <thead><tr><th>Art der Unterabfrage</th><th>Rückgabe &amp; Operatoren</th><th>Prüfungsbeispiel</th></tr></thead>
     <tbody>
       <tr><td><b>1. Skalare Unterabfrage (1 Zeile, 1 Spalte)</b></td><td>Liefert <b>genau 1 Einzelwert</b>; Vergleich mit <code>=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>.</td><td><code>WHERE preis &gt; (SELECT AVG(preis) FROM Artikel)</code></td></tr>
       <tr><td><b>2. Spalten-/Mengen-Unterabfrage (n Zeilen, 1 Spalte)</b></td><td>Liefert eine Liste von Werten; Vergleich mit <b><code>IN (...)</code></b>, <code>ANY</code> oder <code>ALL</code> (niemals mit bloßem <code>=</code>!).</td><td><code>WHERE kunde_id IN (SELECT kunde_id FROM Bestellung WHERE jahr = 2025)</code></td></tr>
       <tr><td><b>3. Korrelierte Unterabfrage mit <code>EXISTS</code> / <code>NOT EXISTS</code></b></td><td>Bezieht sich auf die aktuelle Zeile der äußeren Abfrage und prüft nur auf <code>TRUE/FALSE</code>.</td><td><code>WHERE NOT EXISTS (SELECT 1 FROM Bestellung b WHERE b.kunde_id = k.id)</code></td></tr>
     </tbody>
   </table>
   <p><b>⚠️ Die <code>NOT IN</code>-Falle bei <code>NULL</code>:</b> Enthält die Ergebnismenge einer Unterabfrage auch nur einen einzigen <code>NULL</code>-Wert, liefert <code>WHERE id NOT IN (1, 2, NULL)</code> für jede andere Zeile <code>UNKNOWN</code> – also <b>0 Ergebniszeilen</b>! Nutze daher für „existiert nicht“ immer <code>LEFT JOIN ... WHERE ... IS NULL</code> oder <code>NOT EXISTS</code>.</p>`+C('SELECT a.id, a.preis FROM Artikel a\nWHERE a.preis > (SELECT AVG(preis) FROM Artikel);\n\nSELECT k.id, k.name FROM Kunde k\nWHERE NOT EXISTS (\n  SELECT 1 FROM Bestellung b WHERE b.kunde_id = k.id\n);'),
   `<p><b>🔴 متى تستخدم Subquery في الامتحان؟</b></p>
   <ul>
     <li>إذا طلب السؤال مقارنة كل صف بالمتوسط العام أو بأكبر قيمة (مثل: «المنتجات التي سعرها أعلى من متوسط الأسعار»)، لا يمكنك كتابة <code>WHERE preis &gt; AVG(preis)</code> مباشرة، بل يجب كتابة استعلام فرعي بين قوسين: <code>WHERE preis &gt; (SELECT AVG(preis) FROM Artikel)</code>!</li>
     <li><b>فخ <code>NOT IN</code> مع <code>NULL</code>:</b> إذا أعاد الاستعلام الفرعي قيمة <code>NULL</code> واحدة، فإن <code>NOT IN</code> يعيد نتيجة فارغة تماماً؛ لذلك يفضّل دائماً استخدام <code>NOT EXISTS</code> أو <code>LEFT JOIN ... IS NULL</code>.</li>
   </ul>`),
 S('2. UNION vs. UNION ALL, CASE WHEN & Datenbank-Views (Sichten)',
   `<p>Weitere prüfungsrelevante SQL-Bausteine laut <b>IHK-Belegsatz</b>:</p>
   <table>
     <thead><tr><th>Baustein</th><th>Syntax &amp; Funktionsweise</th><th>Typischer Prüfungsnutzen</th></tr></thead>
     <tbody>
       <tr><td><b><code>UNION</code> vs. <code>UNION ALL</code></b></td><td>Hängt die Ergebniszeilen zweier Abfragen <b>untereinander</b> (Anzahl und Datentypen der Spalten müssen übereinstimmen!).<br>• <b><code>UNION</code>:</b> Entfernt Duplikate.<br>• <b><code>UNION ALL</code>:</b> Behält Duplikate (schneller!).</td><td>Nicht mit <code>JOIN</code> verwechseln: <code>JOIN</code> hängt Spalten <i>nebeneinander</i>, <code>UNION</code> hängt Zeilen <i>untereinander</i>!</td></tr>
       <tr><td><b><code>CASE WHEN ... THEN ... ELSE ... END</code></b></td><td>Fallunterscheidung (<code>if / else</code>) mitten im <code>SELECT</code> oder <code>SUM(...)</code>.</td><td>Preiskategorien ausgeben oder bedingte Summen bilden (2023W, 2025S).</td></tr>
       <tr><td><b><code>VIEW</code> (Sicht)</b></td><td><code>CREATE VIEW v_akt_kunden AS SELECT ...</code><br>Virtuelle Tabelle (speichert nur die Abfragedefinition, keine doppelten Nutzdaten).</td><td><b>3 Vorteile für Teil 1:</b> 1. Vereinfachung komplexer Abfragen, 2. <b>Datenschutz / Zugriffsschutz</b> (sensible Spalten wie Gehalt ausblenden und Nutzern nur Leserecht auf die View geben), 3. Unabhängigkeit bei Umbau der Basistabellen.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 نقاط هامة جداً لأسئلة النظرية والعملي في SQL:</b></p>
   <ul>
     <li><b>الفرق بين <code>JOIN</code> و <code>UNION</code>:</b> الـ <code>JOIN</code> يربط أعمدة جدولين <b>جنباً إلى جنب</b>، بينما <code>UNION</code> يدمج صفوف استعلامين <b>تحت بعضهما البعض</b> (مع حذف التكرار في <code>UNION</code> والإبقاء عليه في <code>UNION ALL</code>).</li>
     <li><b>فوائد الـ <code>View</code> (العرض المنطقي):</b> لا يخزن نسخة مكررة من البيانات، بل يحفظ الاستعلام فقط، ويُستخدم لتبسيط الاستعلامات المعقدة وحماية الخصوصية (إخفاء أعمدة الرواتب مثلاً عن بعض الموظفين).</li>
   </ul>`)
 ],[['Unterabfrage','استعلام داخل استعلام'],['Korrelation','اعتماد على الصف الخارجي'],['Sicht / View','جدول منطقي مبني على استعلام']],
 [Q('Finde Kunden, die mindestens eine Bestellung über 500 € haben, ohne doppelte Kundeneinträge.','SELECT k.id, k.name FROM Kunde k WHERE EXISTS (SELECT 1 FROM Bestellung b WHERE b.kunde_id=k.id AND b.betrag>500);','وجود طلب واحد أو عشرة يظل يعطي العميل مرة واحدة.'),Q('Warum ist UNION ALL häufig schneller als UNION?','UNION ALL muss Duplikate nicht eliminieren. Es ist nur richtig, wenn doppelte Zeilen erhalten bleiben dürfen bzw. benötigt werden.','الأسرع ليس الأفضل إذا كان المطلوب إزالة التكرار.')],['Skalare von mehrzeiliger Unterabfrage unterscheiden','EXISTS korrelieren','UNION von JOIN trennen'],['sql']);
L('sql-schreiben','daten','SQL: DDL, DML, Rechte & Constraints','إنشاء الجداول وتعديل البيانات والصلاحيات (DDL / DML / DCL)','Kern','CREATE/ALTER/DROP, INSERT/UPDATE/DELETE, Constraints, ON DELETE CASCADE vs. RESTRICT und Indizes.',[
 S('1. SQL-Sprachgruppen (DDL, DML, DCL, TCL) & Integritäts-Constraints',
   `<p>In <b>Teil 1 und Teil 2</b> musst du Tabellen mit allen Constraints anlegen (<code>CREATE TABLE</code>) und die SQL-Befehlsgruppen zuordnen:</p>
   <table>
     <thead><tr><th>Kategorie</th><th>Befehle</th><th>Zweck</th></tr></thead>
     <tbody>
       <tr><td><b>DDL (Data Definition Language)</b></td><td><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code></td><td>Struktur von Tabellen, Views und Indizes definieren oder ändern.</td></tr>
       <tr><td><b>DML (Data Manipulation Language)</b></td><td><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> (oft inkl. <code>SELECT / DQL</code>)</td><td>Datensätze (Zeilen) innerhalb der Tabellen einfügen, ändern, löschen, abfragen.</td></tr>
       <tr><td><b>DCL (Data Control Language)</b></td><td><code>GRANT</code> (Recht erteilen), <code>REVOKE</code> (Recht entziehen)</td><td>Zugriffsrechte und Rollen verwalten.</td></tr>
       <tr><td><b>TCL (Transaction Control Language)</b></td><td><code>BEGIN / START TRANSACTION</code>, <code>COMMIT</code>, <code>ROLLBACK</code></td><td>Transaktionen steuern (alles oder nichts).</td></tr>
     </tbody>
   </table>
   <ul>
     <li><b>Die 5 wichtigsten Spalten-/Tabellen-Constraints:</b> <code>PRIMARY KEY</code>, <code>FOREIGN KEY ... REFERENCES ...</code>, <code>UNIQUE</code> (eindeutig, z. B. E-Mail), <code>NOT NULL</code> (Pflichtfeld), <code>CHECK (menge &gt; 0)</code> (Wertebereichsprüfung).</li>
   </ul>`+C('CREATE TABLE Position (\n  bestellung_id INTEGER NOT NULL,\n  artikel_id    INTEGER NOT NULL,\n  menge         INTEGER NOT NULL CHECK (menge > 0),\n  einzelpreis   DECIMAL(10,2) NOT NULL,\n  PRIMARY KEY (bestellung_id, artikel_id),\n  FOREIGN KEY (bestellung_id) REFERENCES Bestellung(id) ON DELETE CASCADE,\n  FOREIGN KEY (artikel_id)    REFERENCES Artikel(id)    ON DELETE RESTRICT\n);'),
   `<p><b>🔴 تصنيف أوامر SQL والقيود الخمسة:</b></p>
   <ul>
     <li><b>DDL (بنية الجداول):</b> <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>.</li>
     <li><b>DML (محتوى البيانات):</b> <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>.</li>
     <li><b>DCL (الصلاحيات):</b> <code>GRANT</code> (منح صلاحية), <code>REVOKE</code> (سحب صلاحية).</li>
   </ul>`),
 S('2. Sicheres UPDATE/DELETE, Löschregeln (CASCADE vs. RESTRICT) & Datenbank-Indizes',
   `<p>Drei Dauerbrenner aus den schriftlichen Prüfungen (<b>2022W, 2023W, 2024S, 2025S</b>):</p>
   <table>
     <thead><tr><th>Thema</th><th>Prüfungswissen auf den Punkt</th></tr></thead>
     <tbody>
       <tr><td><b><code>UPDATE</code> / <code>DELETE</code> niemals ohne <code>WHERE</code>!</b></td><td>Ein <code>DELETE FROM Bestellung;</code> oder <code>UPDATE Artikel SET preis = 10;</code> <b>ohne <code>WHERE</code></b> löscht bzw. überschreibt <b>alle Zeilen der gesamten Tabelle</b>!</td></tr>
       <tr><td><b>Was passiert beim Löschen eines Eltern-Datensatzes (Referenzielle Integrität)?</b></td><td>• <b><code>ON DELETE RESTRICT</code> / <code>NO ACTION</code> (Standard):</b> Das Löschen eines Kunden wird <b>verhindert</b>, solange noch Bestellungen/Rechnungen zu ihm existieren (wichtig für Aufbewahrungspflichten!).<br>• <b><code>ON DELETE CASCADE</code>:</b> Wird eine Bestellung gelöscht, werden alle zugehörigen Bestellpositionen automatisch mitgelöscht.<br>• <b><code>ON DELETE SET NULL</code>:</b> Der Fremdschlüssel im Kind-Datensatz wird auf <code>NULL</code> gesetzt.</td></tr>
       <tr><td><b>Vor- und Nachteile eines Datenbank-Index (<code>CREATE INDEX</code>)</b></td><td>• <b>Vorteile:</b> Beschleunigt Suchabfragen (<code>WHERE</code>), Verknüpfungen (<code>JOIN</code>) und Sortierungen (<code>ORDER BY</code>) drastisch (z. B. über B-Baum in $O(\\log n)$ statt Full Table Scan $O(n)$).<br>• <b>Nachteile:</b> Benötigt <b>zusätzlichen Speicherplatz</b> und <b>verlangsamt Schreiboperationen (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>)</b>, da der Index bei jeder Datenänderung mitaktualisiert werden muss!</td></tr>
     </tbody>
   </table>`+C("UPDATE Artikel SET preis = preis * 1.05 WHERE kategorie = 'Buch';\nGRANT SELECT ON Artikel TO rolle_auswertung;\nREVOKE UPDATE, DELETE ON Artikel FROM rolle_auswertung;"),
   `<p><b>🔴 سؤال نظري يتكرر كثيراً: ما هي مزايا وعيوب الفهرس (Index) في قواعد البيانات؟</b></p>
   <ul>
     <li><b>المزايا:</b> تسريع عمليات البحث (<code>WHERE</code>) والربط (<code>JOIN</code>) والفرز (<code>ORDER BY</code>) بشكل كبير (بدل قراءة الجدول كاملاً Full Table Scan).</li>
     <li><b>العيوب:</b> يستهلك <b>مساحة تخزين إضافية</b>، و<b>يبطئ عمليات الكتابة والتعديل (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>)</b> لأن الفهرس يجب تحديثه مع كل تغيير!</li>
   </ul>`)
 ],[['Constraint','قاعدة سلامة مفروضة في القاعدة'],['DDL / DML / DCL','بنية / محتوى / صلاحيات'],['Index','بنية فهرسة لتسريع الوصول']],
 [Q('Schreibe eine Änderung: alle offenen Aufträge des Kunden 7 werden storniert.','UPDATE Auftrag SET status = \'storniert\' WHERE kunde_id = 7 AND status = \'offen\'; Vorher SELECT mit derselben WHERE-Bedingung zur Kontrolle.','الشرطان معًا يمنعان تغيير طلبات عملاء آخرين أو طلبات مكتملة.'),Q('Nenne Nutzen und Kosten eines Index auf einer häufig gesuchten Kundennummer.','Schnellerer geeigneter Such-/Join-Zugriff; zusätzlicher Speicher und Pflege bei INSERT/UPDATE/DELETE. Ein Index garantiert nicht für jede Abfrage einen Geschwindigkeitsgewinn.','اربطه باستخدام فعلي ولا تقترح فهرسة كل عمود بلا تمييز.')],['Tabelle mit PK/FK/CHECK anlegen','UPDATE/DELETE sicher einschränken','Rechte und Indexfolgen erklären'],['sql']);
L('transaktion-nosql','daten','Transaktionen, Parallelität & NoSQL','المعاملات (ACID)، التزامن وقواعد بيانات NoSQL','Wichtig','ACID-Prinzipien, Lost Update / Dirty Read, Pessimistic vs. Optimistic Locking und SQL vs. NoSQL-Modelle.',[
 S('1. Die 4 ACID-Eigenschaften & Nebenläufigkeitsprobleme (Lost Update / Dirty Read)',
   `<p>Eine <b>Transaktion</b> fasst mehrere Datenbankoperationen (z. B. Geld vom Konto A abbuchen UND auf Konto B gutschreiben) zu einer logischen Einheit zusammen (geprüft in <b>2021W, 2023W, 2025S</b>):</p>
   <table>
     <thead><tr><th>ACID-Buchstabe</th><th>Begriff (DE / EN)</th><th>Erklärung für die Prüfung</th></tr></thead>
     <tbody>
       <tr><td><b>A</b></td><td><b>Atomarität (Atomicity)</b></td><td><b>„Alles oder nichts“:</b> Entweder werden alle Befehle der Transaktion vollständig ausgeführt (<code>COMMIT</code>) oder bei einem Fehler restlos rückgängig gemacht (<code>ROLLBACK</code>).</td></tr>
       <tr><td><b>C</b></td><td><b>Konsistenz (Consistency)</b></td><td>Die Transaktion überführt die Datenbank von einem widerspruchsfreien (gültigen) Zustand in einen anderen gültigen Zustand (alle Constraints wie PK, FK, CHECK sind eingehalten).</td></tr>
       <tr><td><b>I</b></td><td><b>Isolation</b></td><td>Gleichzeitig (parallel) ablaufende Transaktionen beeinflussen sich nicht unzulässig gegenseitig; Zwischenzustände sind nach außen unsichtbar.</td></tr>
       <tr><td><b>D</b></td><td><b>Dauerhaftigkeit (Durability)</b></td><td>Nach erfolgreichem <code>COMMIT</code> sind die Änderungen dauerhaft gespeichert – auch wenn unmittelbar danach der Strom ausfällt (z. B. durch Write-Ahead-Log).</td></tr>
     </tbody>
   </table>
   <ul>
     <li><b>Lost Update (Verlorenes Update):</b> Zwei Transaktionen lesen denselben Lagerbestand (10), ziehen je 1 ab und schreiben beide 9 zurück (statt 8).</li>
     <li><b>Gegenmaßnahmen:</b> <b>Pessimistisches Sperren (Locking, <code>SELECT ... FOR UPDATE</code>)</b> oder <b>Optimistisches Sperren</b> über eine Versionsnummer/Zeitstempelspalte (<code>WHERE id = 5 AND version = 3</code>).</li>
   </ul>`,
   `<p><b>🔴 خصائص المعاملات الأربع (ACID) — احفظها بالترتيب:</b></p>
   <ul>
     <li><b>A – Atomarität (الذرية):</b> الكل أو لا شيء (<code>COMMIT</code> عند النجاح الكامل، أو <code>ROLLBACK</code> للتراجع الكامل عند أي خطأ).</li>
     <li><b>C – Konsistenz (الاتساق):</b> بقاء البيانات متوافقة مع جميع قيود السلامة (<code>Constraints</code>).</li>
     <li><b>I – Isolation (العزل):</b> عدم تداخل المعاملات المتزامنة (ومنع مشكلة <code>Lost Update</code>).</li>
     <li><b>D – Dauerhaftigkeit (الديمومة):</b> بقاء التعديلات محفوظة بشكل دائم بعد <code>COMMIT</code> حتى لو انطفأ الخادم.</li>
   </ul>`),
 S('2. Relationale Datenbanken (SQL) vs. die 4 NoSQL-Datenbanktypen + ORM / ETL',
   `<p>Wann wählt man eine relationale SQL-Datenbank und wann welches <b>NoSQL</b>-Modell (<b>2023W, 2024W</b>)?</p>
   <table>
     <thead><tr><th>Datenbanktyp</th><th>Struktur &amp; Beispiele</th><th>Typischer Anwendungsfall</th></tr></thead>
     <tbody>
       <tr><td><b>Relational (RDBMS / SQL)</b></td><td>Feste Tabellen, Zeilen, Spalten, Fremdschlüssel, ACID (PostgreSQL, MySQL, MariaDB)</td><td>Strukturierte Geschäftsdaten (Aufträge, Buchhaltung, ERP) mit komplexen JOINs und hoher Konsistenzanforderung.</td></tr>
       <tr><td><b>Dokumentenorientiert (NoSQL)</b></td><td>Hierarchische JSON-/BSON-Dokumente mit flexiblem Schema (MongoDB, CouchDB)</td><td>Produktkataloge mit unterschiedlichen Attributen je Kategorie, Content-Management, schnelle Objekt-Serialisierung.</td></tr>
       <tr><td><b>Key-Value-Store (NoSQL)</b></td><td>Einfache Schlüssel-Wert-Paare, oft im RAM (Redis, DynamoDB)</td><td>Extrem schneller <b>Session-Store</b>, Caching, Warenkorb.</td></tr>
       <tr><td><b>Spaltenorientiert / Wide-Column &amp; Zeitreihen</b></td><td>Spaltenfamilien / Zeitstempel-Messwerte (Cassandra, InfluxDB)</td><td>IoT-Sensordaten, Telemetrie, große Log-Mengen.</td></tr>
       <tr><td><b>Graphdatenbank (NoSQL)</b></td><td>Knoten (Nodes) und Kanten (Edges) mit Eigenschaften (Neo4j)</td><td>Soziale Netzwerke, Routen-/Pfadsuche, Empfehlungssysteme, komplexe Abhängigkeitsnetze.</td></tr>
     </tbody>
   </table>
   <p><b>ORM (Object-Relational Mapping, z. B. Hibernate / Entity Framework):</b> Bildet Klassen automatisch auf SQL-Tabellen ab. <b>Vorteil:</b> Weniger Boilerplate-SQL, objektorientiertes Arbeiten. <b>Risiko:</b> Verdeckte Performance-Probleme wie das <b>N+1-Select-Problem</b> bei Lazy Loading! <b>ETL-Prozess (Data Warehouse):</b> <b>E</b>xtract (aus Quellsystemen lesen) $\\rightarrow$ <b>T</b>ransform (bereinigen, vereinheitlichen, Dubletten entfernen) $\\rightarrow$ <b>L</b>oad (ins Zielsystem laden).</p>`,
   `<p><b>🔴 مقارنة أنواع قواعد البيانات و ORM و ETL:</b></p>
   <ul>
     <li><b>قواعد بيانات الوثائق (Dokumenten-DB مثل MongoDB):</b> تخزن كائنات <code>JSON</code> مرنة البنية.</li>
     <li><b>قواعد بيانات المفتاح والقيمة (Key-Value مثل Redis):</b> مثالية للتخزين المؤقت السريع (Caching) والجلسات (Sessions).</li>
     <li><b>قواعد البيانات الرسومية (Graph-DB مثل Neo4j):</b> مثالية للشبكات الاجتماعية والبحث عن المسارات والعلاقات المعقدة.</li>
     <li><b>مراحل ETL:</b> استخراج (<code>Extract</code>) $\\rightarrow$ تحويل وتنظيف وتوحيد الصيغ (<code>Transform</code>) $\\rightarrow$ تحميل (<code>Load</code>).</li>
   </ul>`)
 ],[['Atomarität','تنفيذ كامل أو تراجع كامل'],['Verlorenes Update','كتابة تمحو تعديلًا متزامنًا'],['Optimistische Sperre','فحص إصدار قبل قبول التعديل'],['ETL (Extract, Transform, Load)','استخراج وتحويل وتحميل البيانات إلى مستودع البيانات']],
 [Q('A und B lesen Lagerbestand 10. Beide buchen unabhängig 1 ab und schreiben 9. Was ist falsch und wie verhinderst du es?','Lost Update: korrekt wäre 8. Atomare bedingte Aktualisierung/Transaktion mit geeigneter Sperre oder Versionsprüfung verwenden; bei Konflikt wiederholen.','المشكلة ليست خطأ طرح، بل تداخل قراءة وكتابة.'),Q('Wähle ein Modell für vielfältige Beziehungen zwischen Personen und Projekten mit Pfadsuche.','Eine Graphdatenbank ist eine plausible Option, weil Knoten/Kanten und Traversierung zentrale Zugriffsmuster sind. Beziehungen/Transaktionen und vorhandenes Know-how trotzdem vergleichen.','الاختيار مبرر بنمط السؤال، لا بأن NoSQL أفضل مطلقًا.')],['ACID am Buchungsbeispiel erklären','Lost Update erkennen','Relational/Dokument/Key-Value/Graph begründet vergleichen'],['sql','ordnung']);
L('testarten','qualitaet','Teststufen, Verfahren & Testkonzept','مستويات الاختبار، طرقه (Black/White-Box) وخطة الاختبار','Kern','Komponenten-/Integrations-/System-/Abnahmetest, Statisch vs. Dynamisch, Black-Box vs. White-Box und Last/Stress.',[
 S('1. Die 4 Teststufen (V-Modell) & Statische vs. Dynamische Testverfahren',
   `<p>In <b>Teil 1 und Teil 2 (2021W–2025W)</b> musst du Tests nach <b>Teststufe (WAS wird getestet?)</b> und <b>Testverfahren (WIE wird getestet?)</b> sauber einordnen:</p>
   <table>
     <thead><tr><th>Teststufe (von klein nach groß)</th><th>Testgegenstand (Was wird geprüft?)</th><th>Wer führt ihn typischerweise durch?</th></tr></thead>
     <tbody>
       <tr><td><b>1. Komponententest (Unit-Test / Modultest)</b></td><td>Einzelne Methode oder Klasse <b>isoliert</b> von externen Systemen (Datenbank/Netzwerk werden durch Mocks/Stubs ersetzt).</td><td>Entwickler (automatisiert im Build)</td></tr>
       <tr><td><b>2. Integrationstest</b></td><td>Das <b>Zusammenspiel mehrerer Komponenten</b> oder die Anbindung an echte Schnittstellen (z. B. Service + echte Testdatenbank oder REST-API).</td><td>Entwickler / Testteam</td></tr>
       <tr><td><b>3. Systemtest</b></td><td>Das <b>vollständig integrierte Gesamtsystem</b> in einer produktionsnahen Umgebung gegen alle funktionalen und nicht-funktionalen Anforderungen (Pflichtenheft).</td><td>Unabhängiges Testteam / QA</td></tr>
       <tr><td><b>4. Abnahmetest (Acceptance Test / UAT)</b></td><td>Prüfung aus Sicht des <b>Auftraggebers/Kunden</b> anhand der Akzeptanzkriterien (Lastenheft) zur offiziellen Freigabe und Bezahlung.</td><td>Auftraggeber / Endanwender</td></tr>
     </tbody>
   </table>
   <h3>Statische vs. Dynamische Verfahren &amp; Spezielle Testarten</h3>
   <ul>
     <li><b>Statische Tests (OHNE Code-Ausführung):</b> Code-Review (Vier-Augen-Prinzip), Walkthrough, formale Inspektion, statische Codeanalyse (Linter, SonarQube) und Compiler-Typprüfung.</li>
     <li><b>Dynamische Tests (MIT Code-Ausführung):</b>
       <ul>
         <li><b>Black-Box-Test (spezifikationsbasiert):</b> Prüft Eingabe $\\rightarrow$ Ausgabe anhand der Anforderungen, <b>ohne</b> den inneren Quellcode zu kennen (z. B. Äquivalenzklassen, Grenzwertanalyse).</li>
         <li><b>White-Box-Test (strukturbasiert / Glass-Box):</b> Leitet Testfälle direkt aus der <b>inneren Code-Struktur</b> (Verzweigungen, Pfade) ab (z. B. Anweisungs-/Zweigüberdeckung).</li>
       </ul>
     </li>
     <li><b>Regressionstest:</b> Wiederholung bestehender Tests nach einer Codeänderung/Bugfix, um sicherzustellen, dass bisher funktionierende Features keine neuen Fehler (Seiteneffekte) aufweisen.</li>
     <li><b>Lasttest vs. Stresstest:</b> <b>Lasttest</b> prüft das Verhalten unter erwarteter/vertraglicher Maximallast; <b>Stresstest</b> belastet das System gezielt <b>über</b> die Auslegungsgrenze hinaus, um Bruchpunkt und geordnetes Fehlerverhalten (Failover/Recovery) zu prüfen.</li>
   </ul>`,
   `<p><b>🔴 جدول التمييز بين مستويات وطرق الاختبار في الامتحان:</b></p>
   <ul>
     <li><b>المستويات الأربعة (Teststufen):</b> <code>Unit-Test</code> (وحدة معزولة) $\\rightarrow$ <code>Integrationstest</code> (تفاعل عدة وحدات أو قاعدة بيانات) $\\rightarrow$ <code>Systemtest</code> (النظام الكامل) $\\rightarrow$ <code>Abnahmetest</code> (اختبار القبول من طرف العميل).</li>
     <li><b>الاختبار الساكن (Statisch):</b> فحص الكود <b>بدون تشغيله</b> (مثل المراجعة <code>Review</code> والتحليل الساكن).</li>
     <li><b>الاختبار الديناميكي (Dynamisch):</b> بتشغيل البرنامج، وينقسم إلى <b><code>Black-Box</code></b> (يعتمد على المواصفات المدخلات/المخرجات دون رؤية الكود) و <b><code>White-Box</code></b> (يعتمد على بنية الكود الداخلية ومسارات الشروط).</li>
   </ul>`),
 S('2. Aufbau eines vollständigen Testfalls & reproduzierbaren Fehlerberichts',
   `<p>Wenn du in der Prüfung eine <b>Testfall-Tabelle</b> ausfüllen musst, gehören zu jedem Testfall zwingend diese 4 Spalten:</p>
   <ol>
     <li><b>Testfall-ID &amp; Bezeichnung / Prüfzweck</b> (z. B. <code>TF-01: Rabattgrenze exakt bei 100 € prüfen</code>)</li>
     <li><b>Vorbedingung (Precondition):</b> Welcher Zustand muss vorab herrschen (z. B. <i>„Kunde ist eingeloggt, Warenkorb ist leer“</i>)?</li>
     <li><b>Konkrete Eingabedaten / Aktion:</b> Exakte Testwerte angeben (z. B. <code>Bestellwert = 100,00 €, Kundentyp = 'Neukunde'</code>) – niemals nur schreiben <i>„gültigen Wert eingeben“</i>!</li>
     <li><b>Erwartetes Ergebnis (Soll-Ergebnis):</b> Exakter Rückgabewert oder Systemreaktion (z. B. <code>Rabatt = 5,00 €, Endpreis = 95,00 €</code>).</li>
   </ol>
   <p><b>Merksatz von Dijkstra:</b> <i>„Tests können nur die <b>Anwesenheit</b> von Fehlern zeigen, niemals aber deren vollständige Abwesenheit beweisen!“</i></p>`,
   `<p><b>🔴 كيف تكتب حالة اختبار (Testfall) كاملة الدرجة في الامتحان؟</b></p>
   <ul>
     <li>لا تكتب في خانة المدخلات كلاماً عاماً مثل «رقم موجب»، بل اكتب <b>قيمة رقمية محددة</b> (مثل <code>Menge = 10</code>) واكتب أمامها <b>النتيجة المتوقعة الدقيقة (Soll-Ergebnis)</b> (مثل <code>Rabatt = 0 %</code>) مع <b>الشرط المسبق (Vorbedingung)</b>.</li>
   </ul>`)
 ],[['Teststufe','نطاق التكامل المختبَر'],['Regressionstest','فحص عدم تضرر سلوك سابق'],['Soll-Ergebnis','النتيجة المتوقعة'],['Black-Box / White-Box','اختبار حسب المواصفات الخارجية / اختبار حسب بنية الكود الداخلية']],
 [Q('Ein Rechnungsservice und eine echte Testdatenbank werden gemeinsam geprüft. Welche Teststufe ist naheliegend?','Integrationstest: Zusammenarbeit mit Speicherung und Transaktionsverhalten. Ein isolierter Rechentest mit Fake-Datenbank wäre eher ein Komponententest.','وجود أكثر من مكوّن متفاعل يغيّر هدف الاختبار.'),Q('Nenne vier Bestandteile eines reproduzierbaren Fehlerberichts.','Version/Umgebung, Vorbedingungen/Testdaten, konkrete Schritte, erwartetes und tatsächliches Ergebnis (ggf. Log/Fehler-ID).','الجواب الواضح القابل للتنفيذ أهم من عبارات مطوّلة عامة.')],['Teststufen und Black/White Box trennen','Testfall vollständig formulieren','Last-/Stress-/Regressionstest zuordnen']);
L('testfaelle','qualitaet','Grenzwerte, Äquivalenzklassen & Coverage','تحليل القيم الحدية، فئات التكافؤ ونسب التغطية (C0 / C1)','Kern','Äquivalenzklassenbildung (gÄK/uÄK), 3-Wert-Grenzwertanalyse, Entscheidungstabellen und Coverage (C0/C1).',[
 S('1. Äquivalenzklassenbildung (gÄK / uÄK) & Grenzwertanalyse (BVA) nach Rezept',
   `<p>In fast jeder AP2 (z. B. <b>2022S, 2023S, 2024S, 2025S, 2025W</b>) musst du für eine Preis-, Alters- oder Rabattstaffel <b>Äquivalenzklassen</b> und <b>Grenzwerte</b> bestimmen:</p>
   <table>
     <thead><tr><th>Methode (Black-Box)</th><th>Vorgehensweise Schritt für Schritt</th><th>Beispiel: „Gültiges Alter für Azubi-Tarif: 15 bis einschließlich 27 Jahre“</th></tr></thead>
     <tbody>
       <tr><td><b>1. Äquivalenzklassen (ÄK) bilden</b></td><td>Eingabebereich in Teilmengen zerlegen, innerhalb derer sich das Programm gleich verhält. Immer <b>gültige (gÄK)</b> UND <b>ungültige Äquivalenzklassen (uÄK)</b> aufstellen!</td><td>• <b>uÄK 1 (zu jung):</b> $\\text{Alter} &lt; 15$ (Repräsentant: <code>12</code>)<br>• <b>gÄK 1 (gültig):</b> $15 \\le \\text{Alter} \\le 27$ (Repräsentant: <code>20</code>)<br>• <b>uÄK 2 (zu alt):</b> $\\text{Alter} &gt; 27$ (Repräsentant: <code>35</code>)<br>• <b>uÄK 3 (ungültiger Typ/negativ):</b> $\\text{Alter} &lt; 0$ oder Text <code>"abc"</code></td></tr>
       <tr><td><b>2. Grenzwertanalyse (Boundary Value Analysis)</b></td><td>Die meisten Programmierfehler passieren exakt an den Bereichsgrenzen (<code>&lt;</code> statt <code>&lt;=</code>). Deshalb testet man an jeder Grenze den <b>Grenzwert selbst sowie den direkten Nachbarn links und rechts</b>!</td><td>• Untere Grenze (15): <b><code>14</code></b> (ungültig), <b><code>15</code></b> (gültig), <b><code>16</code></b> (gültig)<br>• Obere Grenze (27): <b><code>26</code></b> (gültig), <b><code>27</code></b> (gültig), <b><code>28</code></b> (ungültig)</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 وصفة استخراج فئات التكافؤ (Äquivalenzklassen) والقيم الحدية (Grenzwerte):</b></p>
   <ol>
     <li>قسّم المدخلات إلى <b>فئات صالحة (gültige ÄK)</b> و<b>فئات غير صالحة (ungültige ÄK: أصغر من الحد الأدنى، أكبر من الحد الأقصى، أو سالب/نص غير صالح)</b>.</li>
     <li>عند كل حد (مثلاً <code>10</code>)، اختبر دائماً <b>القيمة الحدية نفسها وما قبلها وما بعدها مباشرة</b>: <code>9, 10, 11</code> (أو <code>9.99, 10.00, 10.01</code> للمبالغ المالية)!</li>
   </ol>`),
 S('2. White-Box-Coverage: Anweisungs- (C0) vs. Zweig- (C1) vs. Bedingungsüberdeckung',
   `<p>So berechnest und unterscheidest du die drei Überdeckungsmetriken im <b>White-Box</b>-Test (<b>2022W, 2024S, 2025S</b>):</p>
   <table>
     <thead><tr><th>Metrik</th><th>Formel &amp; Anforderung</th><th>Reicht 1 Testfall bei <code>if (a &gt; 0) { x = 1; }</code> für 100 %?</th></tr></thead>
     <tbody>
       <tr><td><b>Anweisungsüberdeckung ($C_0$ – Statement Coverage)</b></td><td>$$\\frac{\\text{Ausgeführte Anweisungen}}{\\text{Gesamtzahl aller Anweisungen}} \\times 100\\,\\%$$</td><td><b>Ja!</b> Mit <code>a = 5</code> wird die <code>if</code>-Zeile und <code>x = 1;</code> ausgeführt ($100\\,\\%\\ C_0$). Dass der leere <code>false</code>-Zweig nie getestet wurde, merkt $C_0$ nicht!</td></tr>
       <tr><td><b>Zweigüberdeckung ($C_1$ – Branch Coverage)</b></td><td>$$\\frac{\\text{Durchlaufene Kontrollflusskanten (Zweige)}}{\\text{Gesamtzahl aller Kanten (True + False)}} \\times 100\\,\\%$$</td><td><b>Nein!</b> Für $100\\,\\%\\ C_1$ muss jede Bedingung mindestens einmal zu <code>TRUE</code> (z. B. <code>a = 5</code>) <b>und</b> mindestens einmal zu <code>FALSE</code> (z. B. <code>a = -1</code>) ausgewertet werden! ($C_1$ schließt $C_0$ immer mit ein).</td></tr>
       <tr><td><b>Einfache / Mehrfach-Bedingungsüberdeckung</b></td><td>Jede <b>atomare Teilbedingung</b> innerhalb eines zusammengesetzten Ausdrucks (<code>A UND B</code>) muss einmal <code>wahr</code> und einmal <code>falsch</code> werden.</td><td>Wichtig bei <b>Short-Circuit-Evaluation (Kurzschlussauswertung)</b>: Ist bei <code>A && B</code> schon <code>A</code> falsch, wird <code>B</code> gar nicht mehr geprüft!</td></tr>
     </tbody>
   </table>`+C('wenn alter >= 18 UND hatTicket == wahr:\n  einlass()\nsonst:\n  ablehnen()'),
   `<p><b>⚠️ الفرق الحاسم بين تغطية الأوامر ($C_0$) وتغطية الفروع ($C_1$):</b></p>
   <ul>
     <li>في جملة <code>if</code> بدون <code>else</code>، يكفي اختبار واحد يحقق الشرط (<code>True</code>) للوصول إلى <b>100% تغطية أوامر ($C_0$)</b>، لكنه لا يكفي لتغطية الفروع (<b>$C_1$</b>) لأننا لم نختبر ماذا يحدث عندما يكون الشرط خاطئاً (<code>False</code>)!</li>
   </ul>`)
 ],[['Äquivalenzklasse','مجموعة إدخالات بسلوك متوقع متشابه'],['Grenzwertanalyse','اختبار قرب حدود القبول'],['Zweigüberdeckung','تنفيذ كل مخرج قرار']],
 [Q('Rabatt gilt nur für Menge > 10. Nenne minimale Grenztests mit erwarteter Wirkung.','9: kein Rabatt; 10: kein Rabatt; 11: Rabatt. Zusätzlich ungültige Mengen (z. B. negativ) nach Spezifikation behandeln.','القيمة 10 تكشف إدخالها بالخطأ في الخصم.'),Q('8 von 10 Anweisungen wurden ausgeführt. Coverage? Beweist 100 % Fehlerfreiheit?','80 % Anweisungsüberdeckung. Auch 100 % beweist keine Fehlerfreiheit: fehlende Anforderungen, falsche Erwartungen und nicht geprüfte Eingabekombinationen bleiben möglich.','اقسم المنفَّذ على الإجمالي؛ لا تخلط مع نسبة نجاح الاختبارات.')],['Gültige/ungültige Klassen bilden','Grenztests mit Soll-Ergebnis angeben','Coverage-Metriken unterscheiden']);
L('unit-debug','qualitaet','Unit-Tests, TDD & Debugging','اختبار الوحدات (AAA / Mocks)، التطوير الموجه بالاختبار (TDD) وتتبع الأخطاء','Kern','Arrange-Act-Assert, Test Doubles (Dummy/Stub/Mock/Fake), TDD-Zyklus und systematisches Debugging.',[
 S('1. Aufbau eines Unit-Tests (Arrange–Act–Assert) & Test Doubles (Stub vs. Mock vs. Fake)',
   `<p>In <b>Teil 1 und Teil 2 (2023S, 2024W, 2025S)</b> musst du Unit-Tests entwerfen und erklären, wie Abhängigkeiten (wie Datenbanken oder Webservices) isoliert werden:</p>
   <table>
     <thead><tr><th>Konzept / Begriff</th><th>Aufgabe im Unit-Test</th><th>Prüfungsbeispiel</th></tr></thead>
     <tbody>
       <tr><td><b>AAA-Muster (Arrange – Act – Assert)</b></td><td>1. <b>Arrange (Vorbereiten):</b> Testobjekte und Testdaten initialisieren.<br>2. <b>Act (Ausführen):</b> Die zu testende Methode genau einmal aufrufen.<br>3. <b>Assert (Prüfen):</b> Soll-Ergebnis mit Ist-Ergebnis vergleichen (<code>assertEquals(soll, ist)</code>).</td><td>Siehe Code-Block unten.</td></tr>
       <tr><td><b>Stub (Stummel)</b></td><td>Liefert auf Methodenaufrufe <b>fest vorgegebene (hartcodierte) Rückgabewerte</b> zurück, damit der Test unabhängig läuft.</td><td><code>SteuerServiceStub</code> gibt für jeden Aufruf fest <code>0.19</code> zurück.</td></tr>
       <tr><td><b>Mock (Attrappe mit Verhaltensprüfung)</b></td><td>Zeichnet Aufrufe auf und <b>prüft, ob und mit welchen Parametern</b> eine Abhängigkeit aufgerufen wurde (Interaktionsprüfung!).</td><td>Prüft: <i>„Wurde <code>mailService.sendeMahnung(kundeId)</code> genau 1-mal aufgerufen?“</i></td></tr>
       <tr><td><b>Fake</b></td><td>Leichtgewichtige, funktionierende Ersatzimplementierung nur für Tests.</td><td>In-Memory-Liste statt echter SQL-Datenbank.</td></tr>
     </tbody>
   </table>`+C('// Unit-Test nach dem AAA-Muster (Arrange - Act - Assert)\n@Test\nfunktion testBerechneBrutto_StandardSteuersatz():\n  // 1. Arrange (Vorbereiten)\n  rechner = neuer PreisRechner()\n  netto = 100.00\n\n  // 2. Act (Ausführen)\n  istBrutto = rechner.berechneBrutto(netto, 19.0)\n\n  // 3. Assert (Prüfen: Soll == Ist)\n  assertEquals(119.00, istBrutto)'),
   `<p><b>🔴 هيكل اختبار الوحدة (AAA) والفرق بين Stub و Mock:</b></p>
   <ul>
     <li>كل اختبار وحدة يتكون من 3 خطوات: <b><code>Arrange</code></b> (تجهيز الكائن والبيانات) $\\rightarrow$ <b><code>Act</code></b> (استدعاء الدالة المراد اختبارها) $\\rightarrow$ <b><code>Assert</code></b> (مقارنة النتيجة المتوقعة <code>Soll</code> مع الفعلية <code>Ist</code>).</li>
     <li><b>الفرق بين <code>Stub</code> و <code>Mock</code>:</b> الـ <code>Stub</code> يعيد قيمة جاهزة ثابتة لتتمكن الدالة من إكمال عملها، بينما الـ <code>Mock</code> يراقب التفاعل ويتحقق مما إذا تم استدعاء الدالة الخارجية بالمعاملات الصحيحة وعدد المرات المطلوب.</li>
   </ul>`),
 S('2. Fehleranalyse mit dem Debugger (Breakpoints, Step Into/Over/Out) & Refactoring',
   `<p>Werkzeuge und Vorgehen bei der <b>Fehlersuche</b> und <b>Codepflege</b>:</p>
   <ul>
     <li><b>Debugger-Steuerung in der IDE:</b>
       <ul>
         <li><b>Breakpoint (Haltepunkt):</b> Pausiert die Programmausführung gezielt vor einer bestimmten Codezeile, um Variablenwerte im Speicher und den <b>Call Stack (Aufrufstapel)</b> zu inspizieren.</li>
         <li><b>Step Over:</b> Führt die aktuelle Zeile aus; enthält sie einen Methodenaufruf, wird die Methode komplett ausgeführt, ohne hineinzuspringen.</li>
         <li><b>Step Into:</b> Springt <b>in</b> die aufgerufene Methode hinein, um deren innere Schritte Zeile für Zeile zu verfolgen.</li>
         <li><b>Step Out:</b> Führt den Rest der aktuellen Methode bis zum <code>return</code> aus und hält wieder beim Aufrufer an.</li>
       </ul>
     </li>
     <li><b>Refactoring:</b> Verbesserung der <b>inneren Code-Struktur</b> (Lesbarkeit, Wartbarkeit, Entfernen von Code Smells / Duplikaten), <b>ohne das beobachtbare äußere Verhalten zu verändern</b> – abgesichert durch grüne Unit-Tests!</li>
   </ul>`,
   `<p><b>🔴 أوامر المصحح (Debugger) وإعادة الهيكلة (Refactoring):</b></p>
   <ul>
     <li><b><code>Step Into</code>:</b> الدخول إلى تفاصيل الدالة المستدعاة سطراً بسطر. | <b><code>Step Over</code>:</b> تنفيذ الدالة المستدعاة كخطوة واحدة دون الدخول لتفاصيلها. | <b><code>Step Out</code>:</b> إكمال الدالة الحالية والعودة إلى السطر الذي استدعاها.</li>
     <li><b><code>Refactoring</code>:</b> تحسين البنية الداخلية للكود (تنظيفه وإزالة التكرار) <b>دون تغيير سلوكه الخارجي</b>، مع التأكد من نجاح جميع اختبارات الوحدات بعد التعديل.</li>
   </ul>`)
 ],[['Assertion','تحقق صريح من النتيجة'],['Test Double','بديل مضبوط لاعتماد خارجي'],['Refactoring','تحسين البنية دون تغيير السلوك']],
 [Q('Ein Test hängt von der aktuellen Uhrzeit ab und scheitert nur nachts. Wie verbesserst du ihn?','Zeit als Abhängigkeit übergeben oder eine kontrollierte Test-Uhr verwenden; feste Zeitpunkte einschließlich Tageswechsel testen. So ist das Ergebnis reproduzierbar.','تحكّم في الزمن بدل الاعتماد على ساعة الجهاز.'),Q('Nach einer Fehlerkorrektur verschwindet ein früherer Fehler. Was ergänzt du?','Einen automatisierten Regressionstest mit dem reproduzierenden Eingabefall und der korrekten Erwartung. Bestehende relevante Tests erneut ausführen.','الهدف حفظ المعرفة عن الخطأ ضمن اختبار يمكن تكراره.')],['Arrange/Act/Assert formulieren','Mock von echter Integration unterscheiden','Fehleranalyse in nachvollziehbaren Schritten erklären']);
L('git-tools','qualitaet','Git, CI/CD, Qualität & Kennzahlen','إدارة الإصدارات (Git)، التكامل المستمر (CI/CD) وحلقة PDCA','Wichtig','Git-Workflow (add/commit/push/pull/merge), CI vs. Continuous Delivery vs. Deployment und PDCA-Zyklus.',[
 S('1. Git-Versionsverwaltung: Die 4 Bereiche, Befehle & Merge-Konflikte lösen',
   `<p>Versionsverwaltung mit <b>Git</b> gehört zum Pflichtwissen in <b>Teil 1 (2022S, 2023W, 2025W)</b>:</p>
   <table>
     <thead><tr><th>Git-Befehl</th><th>Datenfluss (Von wo nach wo?)</th><th>Wichtige Prüfungsabgrenzung</th></tr></thead>
     <tbody>
       <tr><td><b><code>git add</code></b></td><td>Working Directory $\\rightarrow$ <b>Staging Area (Index)</b></td><td>Wählt Änderungen für den nächsten Snapshot aus.</td></tr>
       <tr><td><b><code>git commit</code></b></td><td>Staging Area $\\rightarrow$ <b>Lokales Repository</b></td><td>Speichert einen festen Versionsstand mit Hash und Commit-Message <b>nur lokal auf dem eigenen Rechner</b>!</td></tr>
       <tr><td><b><code>git push</code></b></td><td>Lokales Repository $\\rightarrow$ <b>Remote Repository</b> (GitLab/GitHub)</td><td>Überträgt die lokalen Commits auf den zentralen Server für das Team.</td></tr>
       <tr><td><b><code>git fetch</code> vs. <code>git pull</code></b></td><td>Remote $\\rightarrow$ Lokal</td><td>• <b><code>fetch</code>:</b> Lädt neue Remote-Stände nur herunter, ohne deinen Arbeitsstand zu verändern.<br>• <b><code>pull</code>:</b> <code>fetch</code> + automatisches <code>merge</code> (bzw. <code>rebase</code>) in deinen aktuellen Branch!</td></tr>
       <tr><td><b><code>git branch</code> / <code>git merge</code></b></td><td>Parallele Entwicklungslinien</td><td>Ein <b>Merge-Konflikt</b> entsteht, wenn zwei Branches <b>dieselbe Zeile in derselben Datei</b> unterschiedlich geändert haben; muss manuell aufgelöst, getestet und committet werden.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 أوامر Git الأساسية وترتيب انتقال الملفات:</b></p>
   <ul>
     <li>مجلد العمل (<code>Working Tree</code>) $\\xrightarrow{\\text{git add}}$ منطقة التجهيز (<code>Staging Area</code>) $\\xrightarrow{\\text{git commit}}$ المستودع المحلي (<code>Lokales Repo</code>) $\\xrightarrow{\\text{git push}}$ المستودع البعيد (<code>Remote Repo</code>).</li>
     <li><b>الفرق بين <code>git fetch</code> و <code>git pull</code>:</b> الأمر <code>fetch</code> يجلب التحديثات من الخادم دون دمجها في ملفاتك الحالية، بينما <code>pull</code> يجلبها ويدمجها فوراً (<code>fetch + merge</code>).</li>
   </ul>`),
 S('2. CI / Continuous Delivery / Continuous Deployment & PDCA-Qualitätszyklus',
   `<p>Automatisierung in modernen <b>Release-Pipelines</b> und kontinuierliche Verbesserung:</p>
   <table>
     <thead><tr><th>Stufe / Methode</th><th>Was passiert konkret?</th><th>Unterschied zur nächsten Stufe</th></tr></thead>
     <tbody>
       <tr><td><b>Continuous Integration (CI)</b></td><td>Entwickler mergen ihren Code mehrmals täglich in den Hauptbranch; jeder Push triggert automatisch <b>Build, Linter und Unit-/Integrationstests</b>.</td><td>Deckt Integrationsfehler sofort innerhalb von Minuten auf.</td></tr>
       <tr><td><b>Continuous Delivery (CD)</b></td><td>Erweitert CI: Jede Änderung wird automatisch bis in eine Staging-Umgebung paketiert und ist <b>jederzeit auslieferungsbereit</b>.</td><td>Der finale Gang in die <b>Produktivumgebung (Production)</b> erfolgt noch per <b>manuellem Freigabe-Klick</b>!</td></tr>
       <tr><td><b>Continuous Deployment</b></td><td>Jeder Commit, der alle automatisierten Pipeline-Tests besteht, wird <b>vollautomatisch ohne manuellen Eingriff</b> direkt in Produktion ausgerollt.</td><td>Keine manuelle Freigabe vor Live-Gang mehr nötig.</td></tr>
       <tr><td><b>PDCA-Zyklus (Deming-Kreis / KVP)</b></td><td>1. <b>Plan:</b> Problem analysieren &amp; messbares Ziel planen.<br>2. <b>Do:</b> Maßnahme im Kleinen umsetzen.<br>3. <b>Check:</b> Soll/Ist-Ergebnis anhand von Kennzahlen prüfen.<br>4. <b>Act:</b> Bei Erfolg als Standard etablieren, sonst nachbessern.</td><td>Basis für Qualitätsmanagement (ISO 9001) und IT-Sicherheitsmanagement (BSI / ISO 27001).</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 الفرق بين Continuous Delivery و Continuous Deployment:</b></p>
   <ul>
     <li>في <b><code>Continuous Delivery</code></b> تصبح النسخة جاهزة للنشر تلقائياً بعد نجاح الاختبارات، لكن <b>النشر النهائي على خادم الإنتاج (Production) يتطلب موافقة/ضغطة زر يدوية</b>.</li>
     <li>في <b><code>Continuous Deployment</code></b> يتم النشر إلى خادم الإنتاج الفعلي <b>تلقائياً بالكامل بدون أي تدخل بشري</b> بمجرد نجاح جميع اختبارات الـ Pipeline.</li>
   </ul>`)
 ],[['Commit','نسخة تغيير محلية موثقة'],['Merge-Konflikt','تعديلات تحتاج توفيقًا يدويًا'],['KVP / PDCA','تحسين مستمر بقياس ومراجعة']],
 [Q('Was ist der Unterschied zwischen commit und push?','Commit speichert einen lokalen Versionsstand mit Historie; push überträgt lokale Commits zum Remote-Repository. Ein erfolgreicher Commit allein teilt die Änderung noch nicht mit dem Team.','محلي مقابل نقل إلى المستودع البعيد.'),Q('Ziel: höchstens 2 % fehlerhafte Vorgänge. Gemessen 15 Fehler bei 500 Vorgängen. Bewertung?','15/500 × 100 = 3 %. Ziel um 1 Prozentpunkt überschritten (relativ 50 % über der Zielquote). Ursache analysieren und Maßnahme erneut messen.','نقطة مئوية واحدة لا تعني زيادة نسبية 1%.')],['Git-Datenfluss erklären','Delivery von Deployment trennen','Qualitätskennzahl korrekt auswerten']);
L('sicherheitsrisiken','sicherheit','Schutzziele, Risikoanalyse & TOM','أهداف الأمان والمخاطر والإجراءات','Kern','Bedrohung → Schaden → passende Maßnahme → Wirksamkeitsprüfung.',[
 S('CIA-Triade, erweiterte Schutzziele und Schutzbedarfsfeststellung (BSI)',
   `<p>In IHK-Prüfungen darfst du ein Sicherheitsziel nie nur mit dem Namen nennen – begründe immer: <b>Welche Bedrohung trifft auf welche Schwachstelle und welcher konkrete Schaden entsteht bei Verletzung des Schutzziels?</b></p>
   <table>
     <thead><tr><th>Schutzziel</th><th>Definition &amp; Bedeutung</th><th>Typischer Angriff / Verstoß</th><th>Konkrete Gegenmaßnahme (TOM)</th></tr></thead>
     <tbody>
       <tr><td><b>Vertraulichkeit (Confidentiality)</b></td><td>Daten dürfen nur von autorisierten Personen/Systemen gelesen werden.</td><td>Abhören unverschlüsselter Verbindungen (Sniffing), unbefugter DB-Zugriff, Phishing</td><td>TLS-Transportverschlüsselung, AES-Datenbankverschlüsselung, Rollen-/Rechtekonzept (RBAC)</td></tr>
       <tr><td><b>Integrität (Integrity)</b></td><td>Daten und Systeme dürfen nicht unbemerkt oder unbefugt verändert/manipuliert werden.</td><td>Man-in-the-Middle-Manipulation von Überweisungsbeträgen, SQL-Injection</td><td>Kryptografische Hashes (SHA-256), Digitale Signaturen, Schreibschutz, Audit-Logs</td></tr>
       <tr><td><b>Verfügbarkeit (Availability)</b></td><td>Systeme und Daten müssen innerhalb vereinbarter Zeiten nutzbar sein.</td><td>DDoS-Angriff, Serverausfall, Ransomware-Verschlüsselung</td><td>Redundanz (Cluster/RAID), Load Balancer, Offline-Backups (3-2-1), USV, DDoS-Filter</td></tr>
       <tr><td><b>Authentizität (Echtheit)</b></td><td>Echtheit und Glaubwürdigkeit der Identität eines Kommunikationspartners oder Ursprungs.</td><td>E-Mail-Spoofing, gefälschte Server-Webseite</td><td>Zertifikate (X.509/PKI), Multi-Faktor-Authentisierung (MFA), Digitale Signatur</td></tr>
       <tr><td><b>Verbindlichkeit / Nichtabstreitbarkeit (Non-Repudiation)</b></td><td>Handlungen können im Nachhinein nicht geleugnet werden.</td><td>Kunde bestreitet eine abgeschlossene Online-Transaktion</td><td>Digitale Signatur mit privatem Schlüssel, revisionssichere Transaktionsprotokolle</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 أهداف الأمان الأساسية والفرعية (CIA + Authentizität + Verbindlichkeit):</b></p>
   <ul>
     <li><b><code>Vertraulichkeit</code> (السرية):</b> منع القراءة غير المصرح بها (التشفير + الصلاحيات).</li>
     <li><b><code>Integrität</code> (السلامة):</b> منع التعديل أو التلاعب بالبيانات دون اكتشافه (التجزئة Hash + التوقيع الرقمي).</li>
     <li><b><code>Verfügbarkeit</code> (التوافر):</b> ضمان عمل النظام وقت الحاجة (النسخ الاحتياطي، التعددية Redundanz، الحماية من DDoS).</li>
     <li><b>⚠️ فخ امتحاني شائع:</b> النسخ الاحتياطي (Backup) يحمي <b>التوافر (Verfügbarkeit)</b> لكنه <b>لا يحمي السرية (Vertraulichkeit)</b>! بل قد يضعف السرية إذا لم تكن النسخة الاحتياطية نفسها مشفرة.</li>
   </ul>`),
 S('Technische und organisatorische Maßnahmen (TOM): Zutritt, Zugang, Zugriff',
   `<p>Nach <b>DSGVO</b> Art. 32 und <b>BSI</b>-Grundschutz werden Sicherheitsmaßnahmen nach Kontrollebenen getrennt:</p>
   <table>
     <thead><tr><th>Kontrollebene</th><th>Worum geht es? (Eselsbrücke)</th><th>Typische Maßnahmen</th></tr></thead>
     <tbody>
       <tr><td><b>1. Zutrittskontrolle</b></td><td><b>Physischer Raum</b> („Mit den Füßen eintreten“)</td><td>Chipkarte/Transponder zum Serverraum, Sicherheitsschloss, Videoüberwachung, Besucherausweis</td></tr>
       <tr><td><b>2. Zugangskontrolle</b></td><td><b>Systemanmeldung</b> („Account / Login am System“)</td><td>Benutzername + starkes Passwort, 2FA/MFA, automatische Bildschirmsperre, SSH-Keys</td></tr>
       <tr><td><b>3. Zugriffskontrolle</b></td><td><b>Berechtigung auf Daten/Funktionen</b> („Was darf der eingeloggte User lesen/ändern?“)</td><td>Rollenbasiertes Berechtigungskonzept (RBAC), <b>Least Privilege</b> (Minimalprinzip), <b>Need-to-know</b>, Funktionstrennung</td></tr>
       <tr><td><b>4. Weitergabe- &amp; Eingabekontrolle</b></td><td><b>Transport &amp; Nachvollziehbarkeit</b></td><td>VPN/TLS beim Versand, Wer-hat-wann-was-geändert-Logging (Audit-Log)</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 التفريق الحاسم في الامتحان بين <code>Zutritt</code> و <code>Zugang</code> و <code>Zugriff</code>:</b></p>
   <ul>
     <li><b><code>Zutritt</code> (الدخول المكاني):</b> باب غرفة الخوادم، البطاقة المغناطيسية للمبنى.</li>
     <li><b><code>Zugang</code> (الدخول للنظام):</b> شاشة تسجيل الدخول، كلمة المرور، المصادقة الثنائية (MFA).</li>
     <li><b><code>Zugriff</code> (الوصول للبيانات والصلاحيات):</b> صلاحية القراءة/الكتابة على جدول الرواتب بعد تسجيل الدخول (مبدأ <b>Least Privilege</b>: أقل صلاحية لازمة لأداء العمل).</li>
   </ul>`)
 ],[['Vertraulichkeit','سرية المعلومات'],['Integrität','سلامة البيانات من التغيير غير المسموح'],['Zutritt/Zugang/Zugriff','مكان / نظام / بيانات']],
 [Q('Ordne zu: Serverraum-Schloss, MFA-Anmeldung, Leserecht auf Personalakte.','Zutrittskontrolle; Zugangskontrolle; Zugriffskontrolle. Alle drei schützen unterschiedliche Ebenen.','تمييز المستويات أهم من حفظ أدوات كثيرة.'),Q('Nenne zwei Maßnahmen gegen Ransomware mit unterschiedlicher Wirkung.','Patchen/Schulung/MFA reduzieren Eintrittswege; getrennte, unveränderliche bzw. offline gesicherte Backups und erprobter Restore begrenzen Wiederherstellungsfolgen.','اذكر الوقاية ثم تقليل الضرر؛ النسخ وحدها لا تمنع الإصابة.')],['Schutzziele am Schaden erklären','TOM einem konkreten Risiko zuordnen','Wirksamkeitsprüfung nennen'],['ordnung','owasp']);
L('kryptografie','sicherheit','Verschlüsselung, Hashes & Signaturen','التشفير والتجزئة والتوقيع','Kern','Die Verfahren nach Zweck und Schlüsselgebrauch unterscheiden.',[
 S('Symmetrische, asymmetrische und hybride Verschlüsselung im Vergleich',
   `<p>Verschlüsselungsverfahren dienen dem Schutzziel <b>Vertraulichkeit</b>:</p>
   <table>
     <thead><tr><th>Verfahren</th><th>Schlüsselprinzip</th><th>Vorteile (+) / Nachteile (−)</th><th>Typische Algorithmen &amp; Einsatz</th></tr></thead>
     <tbody>
       <tr><td><b>Symmetrisch</b></td><td><b>Ein einziger gemeinsamer geheimer Schlüssel</b> für Ver- und Entschlüsselung</td><td>+ Extrem schnell, ideal für große Datenmengen<br>− <b>Schlüsselaustauschproblem</b> (Wie kommt der Schlüssel sicher zum Empfänger?)</td><td><b>AES</b> (128/256 Bit), ChaCha20; Festplattenverschlüsselung (BitLocker), DB-/Backup-Verschlüsselung</td></tr>
       <tr><td><b>Asymmetrisch</b></td><td><b>Schlüsselpaar:</b><br>• <b>Public Key</b> (öffentlich): zum <b>Verschlüsseln</b><br>• <b>Private Key</b> (geheim beim Empfänger): zum <b>Entschlüsseln</b></td><td>+ Kein geheimer Schlüsselaustausch nötig<br>− Rechenintensiv und langsam für große Nutzdaten</td><td><b>RSA</b>, Elliptische Kurven (ECC/ECDH); Zertifikate, PGP/S-MIME</td></tr>
       <tr><td><b>Hybrid (Prüfungsfavorit!)</b></td><td>Asymmetrisches Verfahren tauscht/vereinbart einen zufälligen <b>symmetrischen Sitzungsschlüssel (Session Key)</b>; Nutzdaten werden danach <b>symmetrisch (z. B. AES)</b> übertragen</td><td>+ Verbindet sicheren Schlüsselaustausch (asymmetrisch) mit hoher Geschwindigkeit (symmetrisch)</td><td><b>TLS / HTTPS</b>, SSH, OpenPGP</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 لماذا نستخدم التشفير الهجين (Hybride Verschlüsselung) مثل TLS/HTTPS؟</b></p>
   <ul>
     <li>التشفير المتماثل (<b>AES</b>) سريع جداً للبيانات الكبيرة ولكنه يعاني من مشكلة تبادل المفتاح السري.</li>
     <li>التشفير غير المتماثل (<b>RSA / ECDHE</b>) يحل مشكلة تبادل المفتاح عبر زوج مفاتيح (عام/خاص) ولكنه بطيء حسابياً.</li>
     <li><b>الحل الهجين:</b> يتم الاتفاق على مفتاح جلسة عشوائي (<b>Session Key</b>) بطريقة غير متماثلة في البداية، ثم تُشفّر جميع البيانات المتبادلة بسرعة عالية باستخدام هذا المفتاح المتماثل.</li>
   </ul>`),
 S('Kryptografischer Hash, Passwort-Speicherung (Salt) und Digitale Signatur',
   `<p><b>⚠️ Streng trennen: Verschlüsselung vs. Hash vs. Digitale Signatur!</b></p>
   <table>
     <thead><tr><th>Konzept</th><th>Funktionsweise &amp; Richtung</th><th>Schutzziel</th><th>Wichtige Prüfungsdetails</th></tr></thead>
     <tbody>
       <tr><td><b>Kryptografischer Hash (SHA-256, SHA-3)</b></td><td>Einwegfunktion: Beliebige Datenmenge → Prüfsumme fester Länge (keine Umkehrung/Entschlüsselung möglich!).</td><td><b>Integrität</b> (Manipulationserkennung)</td><td>Kollisionsresistenz; kleinste Änderung der Eingabe ändert den Hash komplett (Lawineneffekt).</td></tr>
       <tr><td><b>Passwort-Hashing + Salt (Argon2, bcrypt)</b></td><td>Vor dem Hashen wird jedem Passwort eine <b>individuelle Zufallszeichenfolge (Salt)</b> angehängt; absichtlich rechenlangsame Hashfunktion.</td><td>Schutz gespeicherter Passwörter bei DB-Leak</td><td>Verhindert <b>Rainbow-Table-Angriffe</b> und erkennt nicht, wenn zwei Nutzer dasselbe Passwort gewählt haben.</td></tr>
       <tr><td><b>Digitale Signatur</b></td><td>1. Sender bildet Hash der Nachricht und verschlüsselt den Hash mit <b>seinem eigenen Private Key</b> (= Signatur).<br>2. Empfänger entschlüsselt Signatur mit dem <b>Public Key des Senders</b> und vergleicht den Hash.</td><td><b>Integrität + Authentizität + Verbindlichkeit</b> (KEINE Vertraulichkeit!)</td><td><b>⚠️ Umgekehrte Schlüsselrolle zur Verschlüsselung!</b> Die Nachricht selbst bleibt im Klartext lesbar, wenn sie nicht zusätzlich verschlüsselt wird.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 أخطر فخين في أسئلة التشفير:</b></p>
   <ul>
     <li><b>الفخ الأول (التوقيع الرقمي Digitale Signatur):</b> في التوقيع الرقمي يستخدم المرسل <b>مفتاحه الخاص (Private Key)</b> للتوقيع، ويتحقق المستلم باستخدام <b>المفتاح العام للمرسل (Public Key)</b>. التوقيع الرقمي يثبت الهوية وعدم التلاعب، لكنه <b>لا يخفي محتوى الرسالة (لا يحقق السرية Vertraulichkeit)!</b></li>
     <li><b>الفخ الثاني (Salt):</b> الـ <code>Salt</code> ليس تشفيراً قابلاً للعكس، بل قيمة عشوائية فريدة لكل مستخدم تُدمج مع كلمة المرور قبل حساب الـ Hash لمنع هجمات الجداول الجاهزة (Rainbow Tables).</li>
   </ul>`)
 ],[['Verschlüsselung','إخفاء قابل للعكس بمفتاح'],['Hashwert','بصمة غير قابلة للعكس عمليًا'],['Digitale Signatur','إثبات سلامة وأصالة بتوقيع']],
 [Q('Ein 2-GB-Export soll vertraulich an einen Partner gehen. Warum hybrid?','Daten effizient symmetrisch verschlüsseln; Sitzungsschlüssel sicher vereinbaren/übertragen und Empfänger authentisieren. Reine asymmetrische Verschlüsselung großer Nutzdaten wäre unpraktisch.','اكتب دور كل جزء بدل عبارة «أكثر أمانًا» فقط.'),Q('Schützt eine Signatur die Vertraulichkeit des Rechnungsinhalts?','Nein. Sie ermöglicht Integritäts-/Authentizitätsprüfung. Für Vertraulichkeit ist zusätzliche Verschlüsselung bzw. ein geschützter Übertragungsweg nötig.','التوقيع يثبت سلامة الوثيقة؛ لا يمنع قراءتها.')],['Verfahren und Schlüssel zuordnen','Hash von Verschlüsselung trennen','TLS und Zertifikate sinnvoll erklären'],['owasp','ordnung']);
L('web-security','sicherheit','Sichere Anwendungen: Injection, XSS & Zugriff','حماية تطبيقات الويب','Kern','Nicht nur Eingaben prüfen, sondern Grenzen konsequent absichern.',[
 S('OWASP Top-Schwachstellen: SQL-Injection, XSS und CSRF im Vergleich',
   `<p>In fast jeder AP2-Prüfung wird ein <b>verwundbarer Codeausschnitt</b> gezeigt, den du analysieren und absichern musst:</p>
   <table>
     <thead><tr><th>Angriff</th><th>Ursache / Mechanismus</th><th>Konkreter Schaden</th><th>Primäre technische Gegenmaßnahme</th></tr></thead>
     <tbody>
       <tr><td><b>SQL-Injection (SQLi)</b></td><td>Benutzereingabe wird per String-Verkettung direkt in einen SQL-Befehl eingebaut (Daten werden als ausführbarer Code interpretiert).</td><td>Umgehung des Logins (<code>' OR '1'='1</code>), Auslesen, Ändern oder Löschen der gesamten Datenbank.</td><td><b>Prepared Statements (Parametrisierte Abfragen)</b> – trennen SQL-Befehlsstruktur und Nutzdaten strikt!</td></tr>
       <tr><td><b>Cross-Site Scripting (XSS)</b></td><td>Ungeprüfte Nutzereingabe (z. B. Kommentar/Name mit <code>&lt;script&gt;...</code>) wird im Browser anderer Nutzer als aktiver HTML/JS-Code gerendert.</td><td>Diebstahl von Session-Tokens, Ausführen beliebiger Aktionen im Kontext des Opfers.</td><td><b>Kontextgerechtes Output-Encoding / Escaping</b> (z. B. <code>&lt;</code> → <code>&amp;lt;</code>), <code>textContent</code> statt <code>innerHTML</code>, Content Security Policy (CSP), <code>HttpOnly</code>-Cookies.</td></tr>
       <tr><td><b>Cross-Site Request Forgery (CSRF)</b></td><td>Fremde Webseite löst im Browser eines bereits eingeloggten Nutzers unbemerkt einen Request (z. B. Passwortänderung/Überweisung) aus, wobei der Browser das Session-Cookie automatisch mitsendet.</td><td>Ungewollte zustandsändernde Aktionen im Namen des eingeloggten Opfers.</td><td><b>Anti-CSRF-Token</b> (unvorhersehbares Token pro Session/Formular), <code>SameSite=Strict/Lax</code> für Cookies.</td></tr>
     </tbody>
   </table>`+
   C(`// ❌ VERWUNDBAR gegen SQL-Injection:
String sql = "SELECT * FROM Benutzer WHERE email = '" + eingabeEmail + "'";

// ✅ SICHER durch Prepared Statement (Parametrisierung):
PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Benutzer WHERE email = ?");
stmt.setString(1, eingabeEmail);`),
   `<p><b>🔴 مقارنة امتحانية حاسمة بين الثغرات الثلاث:</b></p>
   <ul>
     <li><b><code>SQL-Injection</code>:</b> تهاجم <b>قاعدة البيانات</b> بسبب دمج النص مباشرة في الاستعلام. الحل الجذري الوحيد في الامتحان هو <b><code>Prepared Statements / Parametrisierte Abfragen</code></b>.</li>
     <li><b><code>XSS</code>:</b> تهاجم <b>متصفح المستخدم الضحية</b> عبر حقن كود JavaScript. الحل: <b>Output-Encoding / Escaping</b> عند العرض + خاصية <code>HttpOnly</code> للكوكيز.</li>
     <li><b><code>CSRF</code>:</b> تستغل جلسة مستخدم مسجل دخوله لتنفيذ طلب نيابة عنه. الحل: <b>Anti-CSRF-Token</b> + <code>SameSite</code>.</li>
   </ul>`),
 S('Authentifizierung vs. Autorisierung, IDOR (Broken Access Control) & sichere Sessions',
   `<ul>
     <li><b>Authentifizierung (Authentication):</b> „<i>Wer bist du?</i>“ – Überprüfung der Identität (z. B. Login mit Passwort + MFA, Zertifikat).</li>
     <li><b>Autorisierung (Authorization):</b> „<i>Was darfst du tun?</i>“ – Prüfung der Zugriffsrechte für die angeforderte Aktion oder Ressource.</li>
     <li><b>Broken Object Level Authorization / IDOR (Insecure Direct Object Reference):</b> Ein eingeloggter Nutzer ändert in der URL <code>/api/rechnungen/105</code> auf <code>/api/rechnungen/106</code>. Prüft der Server nur „Ist der Nutzer eingeloggt?“, aber nicht „Gehört Rechnung 106 wirklich diesem Nutzer?“, liegt eine kritische Autorisierungslücke vor!</li>
     <li><b>Sichere Session-Cookies:</b>
       <ul>
         <li><code>Secure</code>: Cookie wird ausschließlich über verschlüsseltes HTTPS übertragen.</li>
         <li><code>HttpOnly</code>: Kein Zugriff auf das Cookie über <code>document.cookie</code> in JavaScript (Schutz bei XSS).</li>
         <li><code>SameSite=Lax/Strict</code>: Schutz gegen automatisches Mitsenden bei Cross-Site-Requests (CSRF).</li>
       </ul>
     </li>
   </ul>`,
   `<p><b>🔴 فخ الصلاحيات (IDOR / Broken Access Control):</b></p>
   <ul>
     <li>إخفاء زر في الواجهة الأمامية (Frontend) أو الاعتماد على التحقق بالـ JavaScript فقط <b>لا يُعد حماية إطلاقاً</b>، لأن المهاجم يستطيع إرسال الطلب مباشرة عبر <code>curl</code> أو Postman.</li>
     <li>يجب على الخادم (<b>Serverseitig</b>) في كل طلب التحقق من: 1) الهوية (<b>Authentifizierung</b>)، و 2) ملكية المورد أو صلاحية الدور (<b>Objektbezogene Autorisierung</b>).</li>
   </ul>`)
 ],[['Authentifizierung','إثبات الهوية'],['Autorisierung','تحديد المسموح للهوية'],['Parametrisierung','فصل قيم الإدخال عن بنية SQL']],
 [Q('Warum ist "SELECT * FROM Nutzer WHERE name = \'" + eingabe + "\'" problematisch?','Die Eingabe wird Teil der SQL-Syntax. Parametrisiertes Statement mit gebundenem Wert verwenden; zusätzlich minimale DB-Rechte und passende Validierung.','الفصل البنيوي بين الكود والقيمة هو الحماية الأساسية.'),Q('Nutzer 7 ruft /rechnung/900 auf; Rechnung 900 gehört Nutzer 8. Welche Prüfung fehlt?','Objektbezogene Autorisierung: der Server muss prüfen, ob Nutzer 7 diese Rechnung lesen darf. Nur eine gültige Anmeldung zu prüfen reicht nicht.','المشكلة Broken Access Control وليست بالضرورة كسر كلمة مرور.')],['Injection und XSS verschieden verhindern','Autorisierung serverseitig prüfen','Session-/Abhängigkeitsschutz begründen'],['owasp']);
L('datenschutz','sicherheit','DSGVO, Rechtsgrundlagen & Datenrechte','حماية البيانات وفق DSGVO','Kern','Personenbezug, Zweck und Schutzmaßnahmen im Fall beurteilen.',[
 S('Personenbezogene Daten, Grundsätze (Art. 5 DSGVO) und Rechtsgrundlagen (Art. 6 DSGVO)',
   `<p>Die DSGVO gilt für jede Verarbeitung <b>personenbezogener Daten</b> (alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen – z. B. Name, E-Mail, Kundennummer, IP-Adresse, Standortdaten; <b>nicht</b> reine Firmendaten einer GmbH ohne Personenbezug).</p>
   <table>
     <thead><tr><th>Grundsatz (Art. 5 DSGVO)</th><th>Bedeutung für die Softwareentwicklung</th></tr></thead>
     <tbody>
       <tr><td><b>Verbot mit Erlaubnisvorbehalt (Rechtmäßigkeit)</b></td><td>Jede Verarbeitung personenbezogener Daten ist <b>verboten</b>, sofern sie nicht durch ein Gesetz (z. B. Vertragserfüllung, gesetzliche Pflicht) oder eine wirksame <b>Einwilligung</b> ausdrücklich erlaubt ist (Art. 6 DSGVO).</td></tr>
       <tr><td><b>Zweckbindung</b></td><td>Daten dürfen nur für festgelegte, eindeutige und legitime Zwecke erhoben und nicht zweckfremd weiterverarbeitet werden.</td></tr>
       <tr><td><b>Datenminimierung (Datensparsamkeit)</b></td><td>Nur diejenigen Felder als Pflichtfeld erheben, die für den konkreten Zweck zwingend erforderlich sind (z. B. kein Pflichtfeld „Geburtsdatum“ für einen einfachen Newsletter).</td></tr>
       <tr><td><b>Speicherbegrenzung</b></td><td>Daten löschen oder anonymisieren, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungsfristen mehr bestehen.</td></tr>
       <tr><td><b>Integrität und Vertraulichkeit</b></td><td>Angemessene TOM (Verschlüsselung, Zugriffskontrolle) zum Schutz der Daten.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 المبدأ الذهبي في DSGVO (Verbot mit Erlaubnisvorbehalt):</b></p>
   <ul>
     <li>كل معالجة للبيانات الشخصية <b>ممنوعة مبدئياً</b> إلا إذا استندت إلى أساس قانوني من المادة 6 (<b>Art. 6 DSGVO</b>):
       <ol>
         <li>تنفيذ عقد (<b>Vertragserfüllung</b>) مثل عنوان الشحن لتوصيل طلب.</li>
         <li>التزام قانوني (<b>Rechtliche Verpflichtung</b>) مثل حفظ الفواتير للضرائب.</li>
         <li>مصلحة مشروعة (<b>Berechtigtes Interesse</b>) بشرط عدم طغيان حقوق الشخص المعني.</li>
         <li>موافقة صريحة وطوعية وقابلة للسحب (<b>Einwilligung</b>) مثل النشرة الإعلانية الاختيارية.</li>
       </ol>
     </li>
   </ul>`),
 S('Betroffenenrechte, Rollen, Pseudonymisierung vs. Anonymisierung & Meldepflicht',
   `<table>
     <thead><tr><th>Begriff / Regel</th><th>Prüfungsrelevante Abgrenzung</th></tr></thead>
     <tbody>
       <tr><td><b>Betroffenenrechte (Art. 15–21)</b></td><td>Recht auf <b>Auskunft</b> (Art. 15), <b>Berichtigung</b> (Art. 16), <b>Löschung / „Recht auf Vergessenwerden“</b> (Art. 17), <b>Einschränkung der Verarbeitung</b> (Art. 18), <b>Datenübertragbarkeit</b> (Art. 20), <b>Widerspruch</b> (Art. 21).<br><b>⚠️ Ausnahme bei Löschung:</b> Gesetzliche Aufbewahrungsfristen (z. B. 10 Jahre für Rechnungen nach HGB/AO) gehen vor! Statt Löschen wird die Verarbeitung für andere Zwecke <b>eingeschränkt (gesperrt)</b>.</td></tr>
       <tr><td><b>Pseudonymisierung vs. Anonymisierung</b></td><td>• <b>Pseudonymisierung:</b> Name wird durch Kennung/ID ersetzt, aber eine Zuordnungstabelle existiert noch → <b>weiterhin personenbezogene Daten (DSGVO gilt!)</b>.<br>• <b>Anonymisierung:</b> Personenbezug wird unwiderruflich entfernt → <b>keine personenbezogenen Daten mehr (DSGVO gilt nicht mehr)</b>, ideal für Test-/Statistikdaten!</td></tr>
       <tr><td><b>Privacy by Design &amp; Privacy by Default (Art. 25)</b></td><td>• <b>By Design:</b> Datenschutz technisch von Anfang an in die Architektur einbauen.<br>• <b>By Default:</b> Werkseinstellungen sind datenschutzfreundlich (z. B. Tracking-Checkbox standardmäßig <b>nicht</b> angehakt = <b>Opt-in</b> statt Opt-out).</td></tr>
       <tr><td><b>Verantwortlicher vs. Auftragsverarbeiter (AVV)</b></td><td>Der <b>Verantwortliche</b> entscheidet über Zwecke und Mittel; ein externer Cloud-/Hosting-Dienstleister verarbeitet weisungsgebunden als <b>Auftragsverarbeiter</b> (erfordert <b>Auftragsverarbeitungsvertrag – AVV</b> nach Art. 28).</td></tr>
       <tr><td><b>Datenpanne (Art. 33)</b></td><td>Bei Verletzung des Schutzes personenbezogener Daten mit Risiko: Meldung an die Aufsichtsbehörde unverzüglich, möglichst <b>innerhalb von 72 Stunden</b> nach Bekanntwerden.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 أشهر 3 أسئلة امتحانية في DSGVO:</b></p>
   <ul>
     <li><b>طلب حذف بيانات عميل لديه فواتير (Löschanspruch vs. Aufbewahrungspflicht):</b> لا يجوز حذف الفواتير قبل انتهاء مدة الحفظ القانونية الضريبية، بل نحذف البيانات غير اللازمة (كالحساب التسويقي) ونقيّد معالجة الفواتير (<b>Einschränkung der Verarbeitung</b>).</li>
     <li><b>الفرق بين <code>Pseudonymisierung</code> و <code>Anonymisierung</code>:</b> استبدال الاسم برقم مع بقاء إمكانية إعادة الربط هو <b>Pseudonymisierung</b> وتبقى البيانات خاضعة لـ DSGVO. أما لبيئة الاختبار (Testumgebung) فيجب استخدام بيانات وهمية (Synthetische Daten) أو <b>Anonymisierung</b> كامل.</li>
     <li><b>مدة التبليغ عن تسرب البيانات:</b> خلال <b>72 ساعة</b> للسلطة الرقابية.</li>
   </ul>`)
 ],[['Verantwortlicher','الجهة التي تحدد الغرض والوسائل'],['Auftragsverarbeitung','معالجة لحساب جهة أخرى'],['Pseudonymisierung','استبدال الهوية مع إمكانية إعادة الربط']],
 [Q('Eine Rechnung muss gesetzlich aufbewahrt werden. Darf ein Löschwunsch immer sofort erfüllt werden?','Nein. Gesetzliche Aufbewahrungspflichten können einer Löschung entgegenstehen; die weitere Verwendung auf erforderliche Zwecke begrenzen und den Betroffenen sachgerecht informieren.','وضّح تعارض الحق مع الاستثناء بدل رفض جميع حقوق الشخص.'),Q('Namen werden durch Kundennummern ersetzt, die Zuordnungstabelle bleibt vorhanden. Anonymisiert?','Nein, pseudonymisiert. Personenbezug bleibt über die Zuordnung herstellbar; Datenschutzregeln gelten weiterhin.','المعيار إمكانية تحديد الشخص، لا غياب اسمه عن جدول واحد.')],['Rechtsgrundlage fallbezogen bestimmen','Anonym von pseudonym unterscheiden','Datensparsame Lösung entwerfen'],['dsgvo']);
L('http-api','systeme','HTTP, REST, APIs & Webgrundlagen','بروتوكول الويب وتصميم الواجهات','Kern','Anwendungsdaten zuverlässig zwischen Systemen austauschen.',[
 S('HTTP-Methoden, Idempotenz und Statuscodes im Überblick',
   `<p>Ein HTTP-Request besteht aus <b>Request-Line</b> (Methode + URI + HTTP-Version), <b>Headern</b> (z. B. <code>Host</code>, <code>Content-Type</code>, <code>Authorization</code>) und optionalem <b>Body</b>.</p>
   <table>
     <thead><tr><th>HTTP-Methode</th><th>Fachlicher Zweck in REST</th><th>Safe (ändert keinen Zustand)?</th><th>Idempotent (mehrfacher Aufruf hat denselben Zielzustand)?</th><th>Typischer Erfolgs-Statuscode</th></tr></thead>
     <tbody>
       <tr><td><code>GET</code></td><td>Ressource(n) abrufen/lesen</td><td>Ja</td><td>Ja</td><td><code>200 OK</code></td></tr>
       <tr><td><code>POST</code></td><td>Neue Ressource erzeugen / Berechnung anstoßen</td><td>Nein</td><td><b>Nein!</b> (Mehrfachaufruf legt ggf. Duplikate an)</td><td><code>201 Created</code> (mit <code>Location</code>-Header)</td></tr>
       <tr><td><code>PUT</code></td><td>Ressource unter bekannter URI <b>vollständig ersetzen</b></td><td>Nein</td><td><b>Ja</b></td><td><code>200 OK</code> oder <code>204 No Content</code></td></tr>
       <tr><td><code>PATCH</code></td><td>Ressource <b>teilweise aktualisieren</b> (einzelne Felder)</td><td>Nein</td><td>Nicht zwingend (oft ja)</td><td><code>200 OK</code> oder <code>204 No Content</code></td></tr>
       <tr><td><code>DELETE</code></td><td>Ressource löschen</td><td>Nein</td><td><b>Ja</b> (Zielzustand „gelöscht“ bleibt gleich)</td><td><code>204 No Content</code> oder <code>200 OK</code></td></tr>
     </tbody>
   </table>
   <table>
     <thead><tr><th>Statuscode-Klasse</th><th>Wichtigste Codes für die Prüfung</th></tr></thead>
     <tbody>
       <tr><td><b>2xx (Erfolg)</b></td><td><code>200 OK</code> (Standarderfolg), <code>201 Created</code> (Ressource angelegt), <code>204 No Content</code> (Erfolg ohne Response-Body, z. B. nach DELETE)</td></tr>
       <tr><td><b>3xx (Umleitung / Cache)</b></td><td><code>301 Moved Permanently</code>, <code>304 Not Modified</code></td></tr>
       <tr><td><b>4xx (Client-Fehler)</b></td><td><code>400 Bad Request</code> (Syntax-/Validierungsfehler), <code>401 Unauthorized</code> (nicht angemeldet / Token fehlt oder ungültig), <code>403 Forbidden</code> (angemeldet, aber keine Berechtigung!), <code>404 Not Found</code>, <code>409 Conflict</code>, <code>429 Too Many Requests</code></td></tr>
       <tr><td><b>5xx (Server-Fehler)</b></td><td><code>500 Internal Server Error</code> (ungefangene Exception), <code>502 Bad Gateway</code>, <code>503 Service Unavailable</code>, <code>504 Gateway Timeout</code></td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 أهم الفروق الامتحانية في HTTP و REST:</b></p>
   <ul>
     <li><b>الفرق بين <code>401 Unauthorized</code> و <code>403 Forbidden</code>:</b> الرمز <code>401</code> يعني «أنت غير مسجل الدخول أو التوكن غير صالح (مشكلة Authentifizierung)»، أما <code>403</code> فيعني «عرفنا هويتك ولكن لا تملك صلاحية الوصول لهذا المورد (مشكلة Autorisierung)».</li>
     <li><b>معنى <code>Idempotent</code>:</b> تكرار إرسال نفس الطلب عدة مرات يؤدي إلى نفس الحالة النهائية على الخادم (مثل <code>GET</code>, <code>PUT</code>, <code>DELETE</code>)، بينما <code>POST</code> غير Idempotent ولذلك إعادة إرسال طلب دفع عند انقطاع الشبكة قد يؤدي إلى سحب المبلغ مرتين ما لم نستخدم <b>Idempotency-Key</b>!</li>
     <li><b><code>Content-Length</code>:</b> يقيس حجم الـ Body بـ <b>البايت (Bytes)</b> وليس عدد الأحرف (في UTF-8 الحرف العربي أو الألماني الخاص مثل <code>ä/ö/ü</code> يأخذ 2 بايت).</li>
   </ul>`),
 S('REST-Architekturprinzipien, Schnittstellendesign und Alternativen (SOAP, GraphQL, Webhook)',
   `<ul>
     <li><b>REST-Prinzipien:</b>
       <ul>
         <li><b>Ressourcenorientierte URIs (Nomen statt Verben):</b> z. B. <code>GET /api/v1/kunden/42/bestellungen</code> statt <code>/getKundenBestellungen?id=42</code>.</li>
         <li><b>Zustandslosigkeit (Stateless):</b> Jede Anfrage enthält alle zur Verarbeitung nötigen Informationen (z. B. Bearer-Token im Header); der Server speichert keinen impliziten Client-Sitzungskontext zwischen zwei Requests.</li>
         <li><b>Repräsentationen:</b> Austausch meist als <code>application/json</code> oder <code>application/xml</code>.</li>
       </ul>
     </li>
     <li><b>Webhook vs. Polling:</b> Statt dass der Client ständig nachfragt (Polling), sendet der Server bei Eintritt eines Ereignisses aktiv einen HTTP-POST-Call an eine registrierte Callback-URL (Webhook).</li>
     <li><b>SOAP:</b> Streng standardisiertes XML-Protokoll mit formaler Schnittstellenbeschreibung (<b>WSDL</b>) und Schema (<b>XSD</b>).</li>
   </ul>`,
   `<p><b>🔴 معنى Zustandslosigkeit (Stateless) في REST:</b></p>
   <ul>
     <li>لا يعني عدم وجود قاعدة بيانات! بل يعني أن الخادم لا يحتفظ بحالة الجلسة في ذاكرته بين طلبين، بل يجب أن يحمل كل طلب (Request) جميع المعلومات اللازمة لتنفيذه وتحديد الصلاحية (مثل JWT Token في الـ Header).</li>
   </ul>`)
 ],[['Endpunkt','عنوان مورد/عملية في واجهة'],['Idempotenz','ثبات الأثر المقصود عند التكرار'],['Statuscode','رمز نتيجة الطلب']],
 [Q('Ein UTF-8-Text hat 20 Zeichen, davon mehrere arabische. Ist Content-Length automatisch 20?','Nein. Content-Length zählt Bytes der übertragenen Repräsentation; UTF-8-Zeichen können mehrere Bytes benötigen.','لا تفترض عدد الحروف يساوي حجم النقل.'),Q('Warum kann ein automatischer Retry bei einer Zahlung gefährlich sein?','Der erste Request könnte erfolgreich gewesen sein, obwohl die Antwort verloren ging. Wiederholung kann doppelt belasten. Idempotenzschlüssel und nachvollziehbarer Transaktionsstatus begrenzen das Risiko.','الفشل في استلام الرد لا يثبت فشل التنفيذ.')],['HTTP-Methode und Statuscode wählen','REST-Stateless erklären','API-Fehler und Wiederholungen planen'],['mdn','ordnung']);
L('netz-grundlagen','systeme','Netzwerke: Schichten, Ethernet, MAC & Dienste','طبقات الشبكات والعنونة والخدمات','Wichtig','Die Netzwerkstrecke einer Anwendung verstehen und Fehler eingrenzen.',[
 S('ISO/OSI-7-Schichtenmodell vs. TCP/IP-Modell mit Protokollen und Kopplungselementen',
   `<table>
     <thead><tr><th>OSI-Schicht</th><th>Name (DE / EN)</th><th>Einheit (PDU)</th><th>Typische Protokolle / Standards</th><th>Kopplungselemente / Geräte</th></tr></thead>
     <tbody>
       <tr><td><b>7</b></td><td>Anwendung (Application)</td><td>Daten</td><td>HTTP(S), DNS, DHCP, SMTP, IMAP, SSH, FTP</td><td>Application Firewall, Reverse Proxy, Gateway</td></tr>
       <tr><td><b>6</b></td><td>Darstellung (Presentation)</td><td>Daten</td><td>TLS/SSL, UTF-8, JSON, MIME</td><td>–</td></tr>
       <tr><td><b>5</b></td><td>Sitzung (Session)</td><td>Daten</td><td>NetBIOS, RPC</td><td>–</td></tr>
       <tr><td><b>4</b></td><td>Transport (Transport)</td><td><b>Segment</b> (TCP) / <b>Datagramm</b> (UDP)</td><td><b>TCP</b> (verbindungsorientiert, zuverlässig), <b>UDP</b> (verbindungslos, schnell)</td><td>Layer-4-Load-Balancer, Stateful Firewall (Ports)</td></tr>
       <tr><td><b>3</b></td><td>Vermittlung (Network)</td><td><b>Paket</b> (Packet)</td><td><b>IPv4, IPv6</b>, ICMP (ping), IPsec</td><td><b>Router</b>, Layer-3-Switch (arbeitet mit <b>IP-Adressen</b>)</td></tr>
       <tr><td><b>2</b></td><td>Sicherung (Data Link)</td><td><b>Frame</b> (Rahmen)</td><td>Ethernet (IEEE 802.3), WLAN (802.11), VLAN (802.1Q), ARP</td><td><b>Switch</b>, Bridge (arbeitet mit <b>MAC-Adressen</b>)</td></tr>
       <tr><td><b>1</b></td><td>Bitübertragung (Physical)</td><td><b>Bits</b></td><td>Kupferkabel (Twisted Pair Cat 6/7), Glasfaser (LWL), Funk</td><td>Hub, Repeater, Medienkonverter</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 جدول الطبقات السبعة (OSI) وأجهزة الشبكة (سؤال كلاسيكي في الجزء الأول):</b></p>
   <ul>
     <li><b>الطبقة 2 (Sicherungsschicht):</b> يعمل فيها الـ <b>Switch</b> باستخدام عناوين <b>MAC-Adresse</b>، وتسمى وحدة البيانات <b>Frame</b>.</li>
     <li><b>الطبقة 3 (Vermittlungsschicht):</b> يعمل فيها الـ <b>Router</b> لربط الشبكات المختلفة باستخدام عناوين <b>IP-Adresse</b>، وتسمى وحدة البيانات <b>Paket</b>.</li>
     <li><b>الطبقة 4 (Transportschicht):</b> يعمل فيها <b>TCP</b> (موثوق، يضمن الترتيب وإعادة الإرسال) و <b>UDP</b> (سريع بدون اتصال، للبث والألعاب و DNS) باستخدام أرقام المنافذ (<b>Ports</b>).</li>
   </ul>`),
 S('MAC-Adresse, Ethernet-Frame, wichtige Netzwerkdienste und Standard-Ports',
   `<table>
     <thead><tr><th>Begriff / Dienst</th><th>Aufgabe &amp; Prüfungsfakten</th><th>Standard-Port / Format</th></tr></thead>
     <tbody>
       <tr><td><b>MAC-Adresse</b></td><td>Hardware-/Schnittstellenadresse auf Schicht 2: <b>48 Bit = 6 Byte</b>, hexadezimal notiert (z. B. <code>00:1A:2B:3C:4D:5E</code>); erste 24 Bit = Herstellerkennung (OUI).</td><td>Schicht 2 (Data Link)</td></tr>
       <tr><td><b>Ethernet-II-Frame</b></td><td>Ziel-MAC (6 B) + Quell-MAC (6 B) + EtherType (2 B) + Nutzdaten/Payload (<b>46–1500 Byte MTU</b>) + FCS/CRC (4 B) = <b>64 bis 1518 Byte</b> (mit 802.1Q-VLAN-Tag +4 B = 1522 B; auf dem Kabel zusätzlich 7 B Präambel + 1 B SFD).</td><td>Schicht 2</td></tr>
       <tr><td><b>DNS (Domain Name System)</b></td><td>Löst Hostnamen (z. B. <code>api.firma.de</code>) in IP-Adressen auf (A-Record → IPv4, AAAA-Record → IPv6).</td><td>Port <b>53</b> (UDP/TCP)</td></tr>
       <tr><td><b>DHCP</b></td><td>Weist Clients automatisch IP-Adresse, Subnetzmaske, Standardgateway und DNS-Server zu (DORA: Discover, Offer, Request, Acknowledge).</td><td>UDP Port <b>67 / 68</b></td></tr>
       <tr><td><b>ARP / NDP</b></td><td>Ermittelt im lokalen Subnetz zur bekannten IPv4-Adresse die zugehörige MAC-Adresse (bei IPv6: Neighbor Discovery Protocol statt ARP).</td><td>Schicht 2/3</td></tr>
       <tr><td><b>HTTP / HTTPS / SSH / Mail</b></td><td>Web unverschlüsselt / Web TLS-verschlüsselt / Fernwartung / E-Mail-Versand &amp; -Abruf</td><td>HTTP: <b>80</b>, HTTPS: <b>443</b>, SSH: <b>22</b>, SMTP: <b>25/587</b>, IMAP: <b>143/993</b></td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 منهجية تشخيص أعطال الشبكة في الامتحان:</b></p>
   <ul>
     <li>إذا كان الخادم يستجيب عبر عنوان الـ IP (مثلاً <code>ping 10.0.0.5</code> أو فتح الـ IP) ولكنه <b>لا يعمل عبر الاسم</b> (<code>app.intern.de</code>)، فالمشكلة في <b>DNS (حل الأسماء Namensauflösung)</b>.</li>
     <li>إذا كان الجهاز يعمل داخل نفس الشبكة المحلية (LAN) ولكنه لا يصل إلى شبكات أخرى أو الإنترنت، فافحص <b>Standardgateway (الراوتر)</b> أو قواعد الـ <b>Firewall</b>.</li>
   </ul>`)
 ],[['MAC-Adresse','عنوان واجهة على طبقة الوصلة'],['Standardgateway','بوابة الخروج لشبكات أخرى'],['Namensauflösung','تحويل اسم إلى عنوان']],
 [Q('Wie viele Byte hat eine MAC-Adresse, und wo arbeiten Router und Switch hauptsächlich?','MAC: 6 Byte. Router auf OSI 3; klassischer Ethernet-Switch auf OSI 2. Multifunktionsgeräte können zusätzliche Funktionen übernehmen.','ميّز الوظيفة الأساسية عن جمع عدة وظائف في جهاز واحد.'),Q('Eine Website ist per IP erreichbar, per Name nicht. Welcher Dienst ist zuerst zu prüfen?','DNS/Namensauflösung: verwendeten DNS-Server, Antwort/Einträge und lokalen Cache prüfen. Anwendungsspezifische Host-/TLS-Effekte bei Tests mit IP beachten.','القرينة توجّه إلى DNS، لكنها لا تعني أن كل اختبار IP مطابق لاختبار الاسم.')],['OSI-Protokolle und Geräte zuordnen','MAC/Ethernet-Größen kennen','DNS/DHCP/ARP unterscheiden'],['ordnung','katalog']);
L('ip-subnetze','systeme','IPv4/IPv6, Subnetting & Datenraten','تقسيم الشبكات وحساب النقل','Wichtig','Kleine Netz- und Übertragungsaufgaben sicher rechnen.',[
 S('IPv4-Subnetting und CIDR-Schnellrechen-Tabelle (/24 bis /30)',
   `<p>Eine IPv4-Adresse besteht aus <b>32 Bit = 4 Oktetten à 8 Bit</b>. Die Präfixlänge <code>/p</code> gibt an, wie viele Bits für den <b>Netzanteil</b> reserviert sind; übrig bleiben <code>h = 32 − p</code> Bits für den <b>Hostanteil</b>.</p>
   <ul>
     <li><b>Gesamtzahl Adressen pro Subnetz (Blockgröße):</b> <code>2^h = 2^(32−p)</code></li>
     <li><b>Nutzbare Hosts pro Subnetz:</b> <code>2^h − 2</code> (Abzug für <b>Netzwerkadresse</b> = erste Adresse mit allen Hostbits 0, und <b>Broadcast-Adresse</b> = letzte Adresse mit allen Hostbits 1).</li>
   </ul>
   <table>
     <thead><tr><th>CIDR</th><th>Subnetzmaske</th><th>Hostbits (h)</th><th>Blockgröße (2^h)</th><th>Nutzbare Hosts (2^h − 2)</th><th>Netzstarts im letzten Oktett</th></tr></thead>
     <tbody>
       <tr><td><code>/24</code></td><td><code>255.255.255.0</code></td><td>8</td><td>256</td><td><b>254</b></td><td>0</td></tr>
       <tr><td><code>/25</code></td><td><code>255.255.255.128</code></td><td>7</td><td>128</td><td><b>126</b></td><td>0, 128</td></tr>
       <tr><td><code>/26</code></td><td><code>255.255.255.192</code></td><td>6</td><td>64</td><td><b>62</b></td><td>0, 64, 128, 192</td></tr>
       <tr><td><code>/27</code></td><td><code>255.255.255.224</code></td><td>5</td><td>32</td><td><b>30</b></td><td>0, 32, 64, 96, 128, 160, 192, 224</td></tr>
       <tr><td><code>/28</code></td><td><code>255.255.255.240</code></td><td>4</td><td>16</td><td><b>14</b></td><td>0, 16, 32, 48, 64, ...</td></tr>
       <tr><td><code>/29</code></td><td><code>255.255.255.248</code></td><td>3</td><td>8</td><td><b>6</b></td><td>0, 8, 16, 24, ...</td></tr>
       <tr><td><code>/30</code></td><td><code>255.255.255.252</code></td><td>2</td><td>4</td><td><b>2</b></td><td>0, 4, 8, 12, ... (Point-to-Point)</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 وصفة حل سؤال Subnetting في 30 ثانية (مثال <code>192.168.10.77/26</code>):</b></p>
   <ol>
     <li>حساب البتات المتبقية للمضيفين: <code>h = 32 - 26 = 6</code> بتات.</li>
     <li>حجم الكتلة (Blockgröße): <code>2^6 = 64</code>، وقناع الشبكة: <code>255.255.255.(256 - 64) = 255.255.255.192</code>.</li>
     <li>مضاعفات الـ 64 هي: <code>0, 64, 128, 192</code>. الرقم <code>77</code> يقع في الكتلة <b>64 إلى 127</b>.</li>
     <li>إذن: <b>عنوان الشبكة (Netz-ID)</b> = <code>192.168.10.64</code>، و<b>عنوان البث (Broadcast)</b> = <code>192.168.10.127</code>، و<b>العناوين الصالحة للأجهزة (Hosts)</b> = <code>.65</code> إلى <code>.126</code> (عددها <code>64 - 2 = 62</code>).</li>
   </ol>`),
 S('IPv6-Aufbau & Datenübertragungszeit berechnen (Bit vs. Byte, MB vs. MiB)',
   `<table>
     <thead><tr><th>Thema</th><th>Regeln &amp; Formeln für die Prüfung</th></tr></thead>
     <tbody>
       <tr><td><b>IPv6-Grundlagen</b></td><td>• <b>128 Bit</b> (8 Blöcke à 16 Bit = 4 Hex-Ziffern, getrennt durch Doppelpunkte, z. B. <code>2001:0db8:0000:0000:0000:0000:0000:0001</code>).<br>• <b>Kürzungsregeln:</b> 1) Führende Nullen pro Block weglassen (<code>0db8</code> → <code>db8</code>). 2) Eine zusammenhängende Folge von Null-Blöcken darf <b>einmalig</b> durch <code>::</code> ersetzt werden (<code>2001:db8::1</code>).<br>• <b>Wichtige Adressen:</b> Loopback <code>::1/128</code>, Link-Local <code>fe80::/10</code>, Global Unicast <code>2000::/3</code>; Standard-Subnetzpräfix <code>/64</code>. Kein Broadcast (stattdessen Multicast <code>ff00::/8</code>).</td></tr>
       <tr><td><b>Übertragungszeit berechnen</b></td><td>$$\text{Zeit } t = \frac{\text{Datenmenge in Bit}}{\text{Übertragungsrate in Bit/s}}$$<br><b>⚠️ Umrechnung:</b> <code>1 Byte = 8 Bit</code>.<br>• Dezimalpräfixe (SI, typisch bei Leitungsraten): <code>1 KB = 10^3 Byte</code>, <code>1 MB = 10^6 Byte</code>, <code>1 Mbit/s = 10^6 Bit/s</code>.<br>• Binärpräfixe (IEC): <code>1 KiB = 1.024 Byte = 2^{10} Byte</code>, <code>1 MiB = 1.024 KiB = 2^{20} Byte</code>, <code>1 GiB = 2^{30} Byte</code>.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 انتبه عند حساب زمن نقل الملفات (Übertragungsdauer):</b></p>
   <ul>
     <li>حجم الملف يُعطى غالباً بـ <b>البايت (MB / MiB)</b> بينما سرعة الخط تُعطى بـ <b>البت في الثانية (Mbit/s)</b>!</li>
     <li>لذلك يجب أولاً <b>الضرب في 8</b> لتحويل البايت إلى بت، ثم القسمة على سرعة النقل الصافية (Nettodatenrate).</li>
   </ul>`)
 ],[['Subnetzmaske','تحديد جزء الشبكة من العنوان'],['Broadcast','إرسال لكل المضيفين في نطاق IPv4'],['Nutzdatenrate','معدل البيانات المفيدة فعليًا']],
 [Q('Bestimme Netz, Broadcast und nutzbaren Bereich für 192.168.10.77/26.','Netz 192.168.10.64; Broadcast .127; Hosts .65–.126, insgesamt 62. Maske 255.255.255.192.','الحجم 64 عنوانًا، والرقم 77 يقع في ثاني كتلة.'),Q('Ein Backup von 600 MB wird mit netto 40 Mbit/s übertragen. Dauer?','600 × 8 / 40 = 120 Sekunden = 2 Minuten (dezimal definierte MB; netto ohne zusätzliche Verluste).','إذا كانت القيمة Bruttorate بدل netto فاعتبر الناتج حدًا نظريًا أدنى للزمن.')],['/24 bis /28 mit Grenzen rechnen','Bit/Byte und MB/MiB trennen','IPv6-Grundaufbau erläutern'],['ordnung','katalog']);
L('netz-konzepte','systeme','VLAN, VPN, Proxy & sichere Infrastruktur','تقسيم الشبكة والاتصال الآمن','Basis','Konzepte anhand des Anwendungsfalls vergleichen.',[
 S('Netzwerksegmentierung und sichere Infrastruktur: VLAN, VPN, Proxy und DMZ',
   `<table>
     <thead><tr><th>Konzept</th><th>Technische Funktionsweise</th><th>Sicherheits- &amp; Architekturnutzen</th><th>Häufiges Missverständnis (Falle!)</th></tr></thead>
     <tbody>
       <tr><td><b>VLAN (Virtual LAN, IEEE 802.1Q)</b></td><td>Logische Trennung einer physischen Switch-Infrastruktur in mehrere getrennte Broadcast-Domänen.</td><td>Trennt z. B. Büro-, Gäste-, IoT- und Servernetz; Verkehr zwischen VLANs muss über Router/Firewall gefiltert werden.</td><td><b>⚠️ VLAN verschlüsselt keine Daten!</b> Es ist eine logische Trennung auf Schicht 2.</td></tr>
       <tr><td><b>VPN (Virtual Private Network)</b></td><td>Verschlüsselter und authentisierter Tunnel über ein unsicheres Netz (Internet), z. B. per IPsec oder WireGuard/TLS.</td><td>Verbindet Homeoffice-Clients (End-to-Site) oder Standorte (Site-to-Site) sicher mit dem Firmennetz.</td><td>Ein VPN schützt den Transportweg, ersetzt aber keine Rechteprüfung (Zero Trust) im Zielnetz.</td></tr>
       <tr><td><b>Forward Proxy vs. Reverse Proxy</b></td><td>• <b>Forward Proxy:</b> Steht vor den <b>Clients</b> Richtung Internet (Filterung, Caching).<br>• <b>Reverse Proxy:</b> Steht vor den <b>eigenen Backend-Servern</b>.</td><td>Reverse Proxy übernimmt <b>TLS-Terminierung, Load Balancing, WAF-Schutz und Routing</b>; interne Anwendungsserver bleiben von außen unsichtbar.</td><td>Wird TLS am Reverse Proxy beendet, sollte auch die interne Strecke bei sensiblen Daten geschützt werden.</td></tr>
       <tr><td><b>DMZ (Demilitarisierte Zone)</b></td><td>Durch Firewalls isoliertes Zwischensegment (Perimeter-Netz) zwischen Internet und internem LAN.</td><td>Öffentlich erreichbare Dienste (Webserver/Reverse Proxy) stehen in der DMZ; die <b>Datenbank steht geschützt im internen Netz</b> und ist nie direkt aus dem Internet erreichbar!</td><td>Wird der Webserver in der DMZ kompromittiert, blockiert die innere Firewall den direkten Durchgriff ins gesamte LAN.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 التصميم المعماري الآمن لتطبيق ويب مع قاعدة بيانات (سؤال متكرر جداً):</b></p>
   <ul>
     <li>يوضع الـ <b>Reverse Proxy / Webserver</b> في منطقة معزولة (<b>DMZ</b>) خلف جدار الحماية الخارجي (يُسمح فقط بالمنفذ <code>443 HTTPS</code> من الإنترنت).</li>
     <li>توضع <b>خوادم التطبيقات وقاعدة البيانات (Datenbank)</b> في الشبكة الداخلية المحمية خلف جدار حماية ثانٍ، بحيث لا يُسمح بالاتصال بقاعدة البيانات إلا من خادم التطبيق المحدد وعلى المنفذ المخصص فقط!</li>
   </ul>`),
 S('Netzzugang, Verkabelung und Funktechnologien im Praxiseinsatz',
   `<ul>
     <li><b>Strukturierte Verkabelung:</b> Primärbereich (Campus/Gebäude untereinander, meist <b>Glasfaser/LWL</b> wegen hoher Reichweite, Bandbreite und Unempfindlichkeit gegen elektromagnetische Störungen), Sekundärbereich (Steigleitungen zwischen Etagen), Tertiärbereich (Etagenverteiler zur Anschlussdose, meist <b>Kupfer Twisted Pair</b>).</li>
     <li><b>WLAN-Sicherheit:</b> WPA2-Enterprise / WPA3 (nicht WEP oder offenes WLAN), eigenes <b>Gäste-VLAN</b> ohne Zugriff auf interne Firmenserver.</li>
     <li><b>Zentrale Authentisierung:</b> <b>RADIUS</b> (IEEE 802.1X) für zentralen Netzwerkzugang; <b>Kerberos / Active Directory</b> für ticketbasierte Single-Sign-On-Domänenanmeldung.</li>
   </ul>`,
   `<p><b>🔴 متى نختار الألياف الضوئية (Glasfaser / LWL) بدل النحاس (Kupfer)؟</b></p>
   <ul>
     <li>للمسافات الطويلة (أكثر من 100 متر، مثلاً ربط مبنيين)، وللسرعات العالية جداً، وفي البيئات الصناعية التي تحتوي على <b>تداخل كهرومغناطيسي عالٍ (EMV-Störungen)</b>، وللعزل الكهربائي (Galvanische Trennung).</li>
   </ul>`)
 ],[['VLAN','تقسيم منطقي لشبكة الوصلة'],['Reverse Proxy','وسيط أمام الخوادم'],['DMZ','منطقة معزولة للخدمات الخارجية']],
 [Q('Ein öffentliches Webfrontend braucht Zugriff auf eine interne Datenbank. Nenne ein sinnvolles Sicherheitskonzept.','Frontend/Reverse Proxy in geeignetem Segment; nur notwendige Verbindungen zur Anwendung/Datenbank freigeben, keine öffentliche DB-Freigabe, Rollen/Rechte und Protokollierung vorsehen.','ارسم المسار الضروري فقط؛ لا تفتح قاعدة البيانات للجميع.'),Q('Ist VLAN gleich Verschlüsselung?','Nein. VLAN trennt logische Netze/Broadcast-Domänen; Schutz der Inhalte benötigt je nach Bedrohung zusätzliche Verschlüsselung und Filterregeln.','الفصل والتحكم والتشفير أدوات مختلفة.')],['VLAN/VPN/Proxy unterscheiden','Netzkonzept anhand Nutzen wählen','Anwendungszugriff über Netzgrenzen beschreiben'],['ordnung','katalog']);
L('speicher-cloud','systeme','Speicher, RAID, Backup & Cloud','التخزين والنسخ الاحتياطي والسحابة','Wichtig','Verfügbarkeit und Wiederherstellbarkeit getrennt planen.',[
 S('Speicherarchitekturen (DAS, NAS, SAN) und RAID-Level (0, 1, 5, 6, 10) mit Kapazitätsformeln',
   `<p><b>⚠️ Goldene Prüfungsregel: RAID erhöht die Verfügbarkeit bei Festplattenausfall, ersetzt aber NIEMALS ein Backup!</b> (Versehentliches Löschen, fehlerhaftes SQL-UPDATE oder Ransomware wird sofort auf alle Platten gespiegelt!)</p>
   <table>
     <thead><tr><th>RAID-Level</th><th>Mindestanzahl Platten (n)</th><th>Prinzip</th><th>Nutzbare Kapazität (bei gleicher Plattengröße C)</th><th>Ausfalltoleranz</th></tr></thead>
     <tbody>
       <tr><td><b>RAID 0</b></td><td>2</td><td>Striping (Aufteilung ohne Redundanz)</td><td><code>n × C</code> (100 %)</td><td><b>0 Platten!</b> (Fällt 1 Platte aus, sind alle Daten verloren)</td></tr>
       <tr><td><b>RAID 1</b></td><td>2</td><td>Mirroring (Spiegelung)</td><td><code>1 × C</code> (bzw. <code>n/2 × C</code>; 50 %)</td><td>1 Platte (bei 2-Platten-Spiegel)</td></tr>
       <tr><td><b>RAID 5</b></td><td>3</td><td>Striping mit verteilter einfacher Parität</td><td><code>(n − 1) × C</code></td><td><b>1 Platte</b> darf ausfallen</td></tr>
       <tr><td><b>RAID 6</b></td><td>4</td><td>Striping mit zweifacher verteilter Parität</td><td><code>(n − 2) × C</code></td><td><b>2 Platten</b> dürfen gleichzeitig ausfallen</td></tr>
       <tr><td><b>RAID 10 (1+0)</b></td><td>4 (gerade Zahl)</td><td>Spiegelpaare (RAID 1), über die gestriped wird (RAID 0)</td><td><code>(n / 2) × C</code> (50 %)</td><td>Mindestens <b>1 Platte sicher</b>; bis zu 1 Platte <b>pro Spiegelpaar</b> (fallen beide Platten desselben Spiegelpaars aus → Datenverlust!)</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 قوانين حساب RAID في الامتحان (بفرض سعة القرص الواحد <code>C</code> وعدد الأقراص <code>n</code>):</b></p>
   <ul>
     <li><b>RAID 0:</b> السعة = <code>n × C</code> | التحمل = <b>صفر</b> (أسرع أداء لكن ليس نظام أمان!).</li>
     <li><b>RAID 1:</b> السعة = <code>C</code> (قرصين متطابقين) | التحمل = قرص واحد.</li>
     <li><b>RAID 5:</b> السعة = <code>(n - 1) × C</code> | التحمل = قرص واحد (الحد الأدنى 3 أقراص).</li>
     <li><b>RAID 6:</b> السعة = <code>(n - 2) × C</code> | التحمل = قرصان (الحد الأدنى 4 أقراص).</li>
     <li><b>RAID 10:</b> السعة = <code>(n / 2) × C</code> | التحمل = قرص واحد مضمون، أو عدة أقراص بشرط ألا يتعطل قرصان من نفس زوج المرآة (Spiegelpaar).</li>
   </ul>`),
 S('Backup-Strategien (Voll, Inkrementell, Differenziell) sowie RPO & RTO',
   `<table>
     <thead><tr><th>Backup-Art</th><th>Was wird gesichert?</th><th>Backup-Dauer &amp; Speicherplatz</th><th>Was wird für den Restore benötigt?</th></tr></thead>
     <tbody>
       <tr><td><b>Vollsicherung (Full Backup)</b></td><td>Der gesamte ausgewählte Datenbestand</td><td>Langsam / höchster Speicherbedarf</td><td>Nur die <b>letzte Vollsicherung</b> (schnellster Restore!)</td></tr>
       <tr><td><b>Inkrementelles Backup</b></td><td>Nur Änderungen <b>seit der jeweils letzten Sicherung</b> (egal ob Voll oder Inkrementell)</td><td>Am schnellsten / geringster Speicherbedarf</td><td>Letzte Vollsicherung + <b>ALLE inkrementellen Sicherungen seitdem in lückenloser Reihenfolge</b> (fehlt ein Glied der Kette, schlägt der Rest fehl!)</td></tr>
       <tr><td><b>Differenzielles Backup</b></td><td>Alle Änderungen <b>seit der letzten Vollsicherung</b></td><td>Wächst von Tag zu Tag an</td><td>Letzte Vollsicherung + <b>NUR die allerletzte differenzielle Sicherung</b></td></tr>
     </tbody>
   </table>
   <ul>
     <li><b>3-2-1-Backup-Regel:</b> Mindestens <b>3 Kopien</b> der Daten auf <b>2 unterschiedlichen Medientypen</b>, davon <b>1 Kopie extern/offline (Air-Gapped / Immutable)</b> gegen Brand und Ransomware.</li>
     <li><b>RPO (Recovery Point Objective):</b> <i>„Wie viel Datenverlust (in Zeit gemessen) ist im Katastrophenfall maximal akzeptabel?“</i> → Bestimmt das <b>Backup-Intervall</b> (z. B. RPO = 1 Stunde → mindestens stündliche Sicherung / Transaktionslogs).</li>
     <li><b>RTO (Recovery Time Objective):</b> <i>„Wie lange darf es nach einem Ausfall maximal dauern, bis das System wieder betriebsbereit ist?“</i> → Bestimmt die <b>Wiederherstellungsgeschwindigkeit / Redundanz</b>.</li>
   </ul>`,
   `<p><b>🔴 المقارنة الأشهر في الامتحان: Inkrementell مقابل Differenziell، و RPO مقابل RTO:</b></p>
   <ul>
     <li>إذا عملنا <b>Vollbackup</b> يوم الأحد، ثم نسخاً يومية من الإثنين للجمعة، وتعطل النظام يوم الخميس مساءً:
       <ul>
         <li>في <b>Inkrementell</b> نحتاج لاستعادة: <b>الأحد + الإثنين + الثلاثاء + الأربعاء + الخميس</b> (السلسلة كاملة!).</li>
         <li>في <b>Differenziell</b> نحتاج لاستعادة: <b>الأحد + الخميس فقط!</b></li>
       </ul>
     </li>
     <li><b><code>RPO</code></b> يحدد أقصى <b>فقد للبيانات زمنياً</b> (يرجع للخلف نحو آخر نسخة)، بينما <b><code>RTO</code></b> يحدد أقصى <b>زمن مسموح لاستعادة الخدمة</b> (يمتد للأمام حتى يعود النظام للعمل).</li>
   </ul>`),
 S('Cloud-Servicemodelle (IaaS, PaaS, SaaS) und Virtualisierung (VM vs. Container)',
   `<table>
     <thead><tr><th>Modell</th><th>Was stellt der Anbieter bereit?</th><th>Was verantwortet der Kunde selbst?</th><th>Typisches Beispiel</th></tr></thead>
     <tbody>
       <tr><td><b>IaaS (Infrastructure as a Service)</b></td><td>Rechenleistung, Speicher, Netzwerk, Virtualisierung</td><td>Betriebssystem, Laufzeitumgebung, Middleware, eigene Anwendung, Daten &amp; Zugriffsrechte</td><td>AWS EC2, Azure Virtual Machines</td></tr>
       <tr><td><b>PaaS (Platform as a Service)</b></td><td>Zusätzlich Betriebssystem, Datenbank-/Laufzeitumgebung</td><td>Eigene Anwendung/Code, Daten &amp; Benutzerberechtigungen</td><td>Managed DB, Heroku, Google App Engine</td></tr>
       <tr><td><b>SaaS (Software as a Service)</b></td><td>Komplette fertige Anwendung im Browser/Client</td><td>Konfiguration, Benutzer-/Rechteverwaltung und rechtmäßige Datennutzung (DSGVO!)</td><td>Microsoft 365, Salesforce, GitHub</td></tr>
     </tbody>
   </table>
   <ul>
     <li><b>Virtuelle Maschine (VM) vs. Container (z. B. Docker):</b> Eine <b>VM</b> virtualisiert komplette Hardware und bringt ein eigenes vollständiges Gast-Betriebssystem (Guest OS) mit (höherer Ressourcenbedarf, stärkere Isolation). Ein <b>Container</b> nutzt den Kernel des Host-Betriebssystems gemeinsam und kapselt nur die Anwendung samt ihren Bibliotheken (leichtgewichtig, startet in Sekunden).</li>
   </ul>`,
   `<p><b>🔴 الفرق بين VM و Container، ونموذج المسؤولية المشتركة (Shared Responsibility):</b></p>
   <ul>
     <li>حتى عند استخدام <b>SaaS</b> يبقى العميل هو المسؤول قانونياً (<b>Verantwortlicher</b>) عن صحة البيانات وصلاحيات الموظفين وعقد معالجة البيانات (AVV).</li>
   </ul>`)
 ],[['RPO','أقصى فقد بيانات مقبول زمنيًا'],['RTO','هدف زمن استعادة الخدمة'],['Inkrementell','تغييرات منذ آخر نسخة']],
 [Q('5 Platten à 2 TB in RAID 5: nutzbare Kapazität und Ausfalltoleranz?','(5−1)×2 TB = 8 TB nominal; eine Platte darf ausfallen. Kein Ersatz für Backup; reale Formatierungs-/Systemkapazität kann geringer sein.','اطرح قرصًا مكافئًا واحدًا للـparity، لا نصف الأقراص.'),Q('Vollbackup Sonntag, täglich inkrementell. Was brauchst du für Donnerstagabend?','Vollbackup Sonntag und alle nötigen inkrementellen Sicherungen Montag bis Donnerstag in Reihenfolge. Zusätzlich ggf. Transaktionslogs gemäß Sicherungskonzept.','لا تكفي نسخة الخميس وحدها في السلسلة التزايدية.')],['RAID-Kapazität und Grenzen erklären','Restore-Ketten bestimmen','Cloud-Verantwortung und RPO/RTO unterscheiden'],['ordnung','katalog']);
L('betrieb-monitoring','systeme','Verfügbarkeit, Monitoring & Störungsanalyse','التوافر والمراقبة ومعالجة الأعطال','Wichtig','Kennzahlen in konkrete Betriebsmaßnahmen übersetzen.',[
 S('Verfügbarkeitsberechnung: MTBF, MTTR, Serien- und Parallelschaltung',
   `<p>Die <b>Verfügbarkeit (Availability $A$)</b> gibt das Verhältnis von funktionierender Betriebszeit zur Gesamtbetrachtungszeit an:</p>
   <table>
     <thead><tr><th>Größe / Schaltung</th><th>Formel</th><th>Wichtige Hinweise für Rechenaufgaben</th></tr></thead>
     <tbody>
       <tr><td><b>Einzelverfügbarkeit $A$</b></td><td>$$A = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}}$$</td><td><b>MTBF</b> = Mean Time Between Failures (mittlere Betriebszeit); <b>MTTR</b> = Mean Time To Repair (mittlere Wiederherstellungszeit).</td></tr>
       <tr><td><b>Maximal zulässige Ausfallzeit (Downtime)</b></td><td>$$\text{Ausfallzeit} = \text{Gesamtzeit} \times (1 - A)$$</td><td>Beispiel: $99{,}9\,\%$ im Jahr ($365 \times 24 = 8.760\text{ h}$) $\Rightarrow 8.760 \times 0{,}001 = 8{,}76\text{ h} = 525{,}6\text{ Min.}$</td></tr>
       <tr><td><b>Reihenschaltung (Seriell)</b><br><i>Alle Komponenten werden zwingend benötigt</i></td><td>$$A_{\text{gesamt}} = A_1 \times A_2 \times \dots \times A_n$$</td><td>Gesamtverfügbarkeit ist immer <b>kleiner</b> als die schwächste Einzelkomponente (Single Point of Failure)!</td></tr>
       <tr><td><b>Parallelschaltung (Redundant)</b><br><i>Mindestens 1 Komponente reicht für den Betrieb</i></td><td>$$A_{\text{gesamt}} = 1 - (1 - A_1) \times (1 - A_2)$$</td><td>Gesamtverfügbarkeit steigt deutlich (gilt nur bei <b>echter Unabhängigkeit</b> ohne gemeinsame Strom-/Netz-Single-Points!).</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 قوانين حساب التوافر (Verfügbarkeit) في الامتحان:</b></p>
   <ul>
     <li><b>الربط المتسلسل (Reihenschaltung):</b> إذا كان النظام يحتاج الخادم <b>و</b> قاعدة البيانات معاً ليعمل: نضرب النسبتين <code>A_ges = A1 × A2</code> (الناتج يقل!).</li>
     <li><b>الربط المتوازي (Parallelschaltung / Redundanz):</b> إذا كان لدينا خادمان متوازيان يكفي عمل أحدهما: نضرب احتمالات التعطل ونطرحها من 1: <code>A_ges = 1 - ((1 - A1) × (1 - A2))</code> (الناتج يرتفع!).</li>
     <li><b>حساب وقت التعطل المسموح (Downtime):</b> عند توافر <code>99.9%</code> تكون نسبة التعطل المسموحة هي <code>0.1% = 0.001</code> (وليس 0.9%!).</li>
   </ul>`),
 S('Monitoring, SLA, USV und Störungsbehandlung (Incident vs. Problem Management)',
   `<table>
     <thead><tr><th>Begriff</th><th>Bedeutung im IT-Betrieb</th></tr></thead>
     <tbody>
       <tr><td><b>SLA (Service Level Agreement)</b></td><td>Vertraglich vereinbarte Dienstgüte zwischen Dienstleister und Kunde (z. B. garantierte Verfügbarkeit 99,9 %, maximale Reaktionszeit 30 Min., inkl. Vertragsstrafen).</td></tr>
       <tr><td><b>SNMP &amp; S.M.A.R.T.</b></td><td><b>SNMP</b> überwacht Netzwerkgeräte/Server zentral über Metriken und Traps; <b>S.M.A.R.T.</b> liefert Frühwarndaten von Festplatten/SSDs vor einem drohenden Ausfall.</td></tr>
       <tr><td><b>USV (Unterbrechungsfreie Stromversorgung)</b></td><td>Überbrückt kurzzeitige Stromausfälle und Spannungsspitzen per Akku, damit Server kontrolliert heruntergefahren werden oder ein Notstromaggregat anläuft.</td></tr>
       <tr><td><b>Incident Management vs. Problem Management (ITIL)</b></td><td>• <b>Incident Management:</b> Störung so schnell wie möglich beheben / Dienst für den Nutzer wiederherstellen (auch per Workaround/Rollback).<br>• <b>Problem Management:</b> Tieferliegende <b>Grundursache (Root Cause)</b> analysieren und dauerhaft beseitigen, damit der Incident nicht erneut auftritt.</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 الفرق بين Incident Management و Problem Management (وفق ITIL):</b></p>
   <ul>
     <li><b><code>Incident Management</code>:</b> الهدف هو <b>إعادة الخدمة للعمل بأسرع وقت ممكن</b> (حتى لو بحل مؤقت Workaround أو التراجع عن التحديث Rollback).</li>
     <li><b><code>Problem Management</code>:</b> الهدف هو البحث عن <b>السبب الجذري (Root Cause)</b> وإصلاحه نهائياً لمنع تكرار العطل مستقبلاً.</li>
   </ul>`)
 ],[['MTBF / MTTR','متوسط التشغيل بين الأعطال / زمن الإصلاح'],['SLA','اتفاق أهداف مستوى الخدمة'],['Schwellwert','حد يطلق تنبيهًا']],
 [Q('99,9 % Verfügbarkeit in 30 Tagen (24 h täglich): zulässige Ausfallzeit?','30×24 = 720 h; 720×0,001 = 0,72 h = 43,2 Minuten. Ein vereinbartes SLA kann eigene Messfenster/Ausnahmen definieren.','نسبة التعطل 0.1%، وليست 0.9%.'),Q('Nach einem Release steigt die Fehlerquote. Welche ersten Maßnahmen sind sinnvoll?','Zeitlichen Zusammenhang/Logs prüfen, betroffene Version und Funktionen eingrenzen, sicheren Rollback oder Fix nach Betriebsverfahren wählen, Nutzerwirkung/Monitoring prüfen und Ursache dokumentieren.','إعادة التشغيل العشوائي قد تمحو أدلة أو تخفي السبب؛ افحص أثر التغيير أولًا.')],['Ausfallzeit mit Einheiten rechnen','Unabhängigkeitsannahmen erkennen','Monitoringbefund mit Maßnahme verbinden'],['ordnung','katalog']);

L('sql-migration','daten','SQL-Transfer: Migration & mehrstufige Berichte','ترحيل البيانات وتقارير متعددة المراحل','Kern','Abfragen zusammensetzen und bestehende Daten sicher umstellen.',[
 S('Mehrstufige Berichte: Aggregation über einer gruppierten Zwischenmenge (Derived Table)',
   `<p>Wenn eine Aufgabe nach dem <b>„Durchschnitt der Bestellanzahlen je Kunde“</b> oder dem <b>„höchsten Monatsumsatz“</b> fragt, braucht man zwei Aggregationsstufen: Erst pro Gruppe zählen/summieren, dann über diese Zwischenmenge aggregieren:</p>`+
   C(`-- Durchschnittliche Anzahl Bestellungen pro Kunde (inkl. Kunden mit 0 Bestellungen!):
SELECT AVG(CAST(x.anzahl AS DECIMAL(12,2))) AS durchschnitt_bestellungen
FROM (
    SELECT k.id, COUNT(b.id) AS anzahl
    FROM Kunde k
    LEFT JOIN Bestellung b ON b.kunde_id = k.id
    GROUP BY k.id
) AS x;`),
   `<p><b>🔴 لماذا نحتاج استعلاماً فرعياً في <code>FROM</code> (Derived Table) هنا؟</b></p>
   <ul>
     <li>لأننا نريد أولاً حساب عدد الطلبات لكل عميل على حدة (بما فيهم من لديه <code>0</code> طلب عبر <code>LEFT JOIN</code> و <code>COUNT(b.id)</code>)، ثم في الخطوة الخارجية نحسب المتوسط الحسابي <code>AVG(...)</code> لهذه الأعداد.</li>
   </ul>`),
 S('Sichere Datenbank-Migration in der Praxis: 4-Schritte-Rezept für neue Pflichtspalten',
   `<p>Auf einer produktiven Tabelle mit bestehenden Datensätzen scheitert ein direktes <code>ALTER TABLE ... ADD COLUMN status VARCHAR(20) NOT NULL</code> ohne Defaultwert sofort, weil alle Altzeilen zunächst <code>NULL</code> hätten. Deshalb erfolgt die <b>Migration</b> kontrolliert in 4 Schritten:</p>`+
   C(`-- 1. Spalte zunächst optional (nullable) anlegen:
ALTER TABLE Kunde ADD COLUMN status VARCHAR(20);

-- 2. Bestehende Datensätze fachlich korrekt befüllen (Backfill):
UPDATE Kunde SET status = 'aktiv' WHERE status IS NULL;

-- 3. Kontrollabfrage: Gibt es noch NULL-Werte? (Muss 0 liefern!)
SELECT COUNT(*) FROM Kunde WHERE status IS NULL;

-- 4. Erst jetzt Constraint aktivieren und ggf. Fremdschlüssel-Index anlegen:
ALTER TABLE Kunde ALTER COLUMN status SET NOT NULL;
CREATE INDEX idx_bestellung_kunde ON Bestellung(kunde_id);`),
   `<p><b>🔴 خطوات ترحيل قاعدة البيانات بأمان (Datenmigration):</b></p>
   <ol>
     <li>إضافة العمود الجديد بدون قيد <code>NOT NULL</code> أولاً.</li>
     <li>تعبئة البيانات القديمة بقيم صحيحة منطقياً (<b>Backfill</b> عبر <code>UPDATE</code>).</li>
     <li>التحقق من عدم بقاء أي قيم <code>NULL</code> أو قيم تخرق القواعد.</li>
     <li>تفعيل القيد <code>SET NOT NULL</code> أو المفتاح الأجنبي بعد التأكد من سلامة جميع الصفوف.</li>
   </ol>`)
 ],[['Datenmigration','نقل/تعديل بنية البيانات ومحتواها'],['Backfill','استكمال قيم البيانات القديمة'],['Abgeleitete Tabelle','نتيجة وسيطة تُستخدم كجدول']],
 [Q('Zwei Kunden haben 0 und 4 Bestellungen. Wie groß ist die mittlere Bestellanzahl inklusive Kunden ohne Bestellungen?','(0+4)/2 = 2. Die Zwischenabfrage muss beide Kunden erhalten (LEFT JOIN, COUNT der rechten ID). Werden Nullkunden ausgeschlossen, wäre das Ergebnis fälschlich 4 für diese Fragestellung.','حدّد مجتمع المتوسط قبل الحساب.'),Q('Warum kann ALTER ... SET NOT NULL auf einer bestehenden Spalte scheitern?','Vorhandene NULL-Werte verletzen die neue Regel. Zuerst fachlich valide Daten nachpflegen/bereinigen und prüfen, dann Constraint aktivieren; DBMS-Syntax beachten.','لا تملأ القيم بأي نص فقط لإسكات القيد.')],['AVG über gruppierte Zwischenmenge schreiben','Backfill vor NOT NULL planen','SQL-Dialekt kennzeichnen'],['sql']);
L('algo-buchung','code','Algorithmus-Transfer: Buchungen & Best Fit','مسألة حجوزات بحلقات متداخلة','Kern','Objektlisten, Zeitintervalle und Auswahl in einer Lösung verbinden.',[
 S('Fachliche Spezifikation: Zeitintervall-Kollision und Best-Fit-Auswahl',
   `<p><b>In großen Teil-2-Algorithmenaufgaben (z</b>. B. Raumbuchung, Fahrzeugdisposition, Maschinenbelegung) müssen drei Teilprobleme sauber kombiniert werden:</p>
   <table>
     <thead><tr><th>Teilproblem</th><th>Exakte Bedingung im Code</th><th>Typischer Denkfehler</th></tr></thead>
     <tbody>
       <tr><td><b>1. Kapazitätsprüfung</b></td><td><code>r.kapazitaet &gt;= wunsch.personen</code></td><td>Zu kleine Räume gar nicht erst auf Buchungskonflikte prüfen (spart Laufzeit).</td></tr>
       <tr><td><b>2. Intervall-Überlappung</b><br>(Halboffene Intervalle <code>[start, ende)</code>)</td><td><code>b.raumId == r.id UND b.start &lt; wunsch.ende UND wunsch.start &lt; b.ende</code></td><td><b>⚠️ Nahtloser Anschluss</b> (Buchung 1 endet 10:00, Wunsch startet 10:00) ist <b>kein Konflikt</b>, daher echtes <code>&lt;</code> statt <code>&lt;=</code>!</td></tr>
       <tr><td><b>3. Best-Fit mit Tie-Break</b></td><td>Kleinste passende Kapazität gewinnt; bei gleicher Kapazität entscheidet die kleinere <code>r.id</code>.</td><td>Einen Raum schon nach der ersten konfliktfreien Buchung als „frei“ zurückgeben, statt <b>alle</b> Buchungen dieses Raums zu prüfen!</td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 القواعد الثلاث لحل مسألة الحجوزات (Raumbuchung / Best Fit):</b></p>
   <ul>
     <li><b>شرط تداخل فترتين زمنيتين:</b> يتقاطع الحجز <code>b</code> مع الطلب <code>w</code> إذا وفقط إذا كان: <code>b.start &lt; w.ende UND w.start &lt; b.ende</code>.</li>
     <li><b>فخ الحلقة الداخلية:</b> لا يجوز اعتبار الغرفة متاحة بمجرد فحص أول حجز وعدم وجود تعارض! بل يجب فحص <b>جميع حجوزات تلك الغرفة</b>؛ وجود تعارض واحد فقط يكفي لاستبعادها فوراً (<code>konflikt = wahr; abbrechen</code>).</li>
   </ul>`),
 S('Vollständiger, prüfungsreifer Pseudocode',
   `<p>Beachte, dass das Flag <code>konflikt</code> <b>innerhalb der äußeren Raum-Schleife</b> für jeden Raum neu auf <code>falsch</code> zurückgesetzt wird:</p>`+
   C(`funktion findeRaum(raeume, buchungen, w):
  wenn w.start >= w.ende ODER w.personen <= 0:
    Fehler "Ungültiger Buchungswunsch"
  bester = null
  für r in raeume:
    wenn r.kapazitaet >= w.personen:
      konflikt = falsch
      für b in buchungen:
        wenn b.raumId == r.id UND b.start < w.ende UND w.start < b.ende:
          konflikt = wahr
          abbrechen  // beendet nur die innere Buchungs-Schleife
      wenn NICHT konflikt:
        wenn bester == null ODER r.kapazitaet < bester.kapazitaet
           ODER (r.kapazitaet == bester.kapazitaet UND r.id < bester.id):
          bester = r
  rückgabe bester`),
   `<p><b>🔴 نقاط الدرجات الكاملة في الكود:</b></p>
   <ul>
     <li>يتم تصفير <code>konflikt = falsch</code> <b>داخل حلقة الغرف</b> قبل بدء حلقة الحجوزات.</li>
     <li>يتم تحديث <code>bester</code> فقط <b>بعد انتهاء حلقة الحجوزات كاملة</b> والتأكد من أن <code>NICHT konflikt</code> صحيح.</li>
   </ul>`),
 S('Systematische Testfälle für die volle Punktzahl',
   `<table>
     <thead><tr><th>Testfall-Kategorie</th><th>Eingabe-Szenario</th><th>Erwartetes Ergebnis</th></tr></thead>
     <tbody>
       <tr><td><b>Normalfall (Best Fit)</b></td><td>Freie Räume mit Kapazität 20, 12, 30 für 10 Personen</td><td>Raum mit Kapazität 12 (kleinster passender Raum)</td></tr>
       <tr><td><b>Gleichstand (Tie-Break)</b></td><td>Zwei freie Räume mit Kapazität 20 (ID 5 und ID 2)</td><td>Raum mit ID 2 (kleinere ID bei gleicher Kapazität)</td></tr>
       <tr><td><b>Grenzfall Zeit (Nahtloser Anschluss)</b></td><td>Buchung 08:00–10:00, Wunsch 10:00–12:00</td><td>Kein Konflikt → Raum ist wählbar</td></tr>
       <tr><td><b>Konflikt erst im letzten Listenelement</b></td><td>Raum hat 1. Buchung ohne Konflikt, 2. Buchung mit Überlappung</td><td>Raum wird ausgeschlossen (deckt verfrühtes <code>return</code> auf!)</td></tr>
       <tr><td><b>Negativ-/Randfall</b></td><td>Alle passenden Räume belegt oder Raumliste leer</td><td><code>null</code></td></tr>
     </tbody>
   </table>`,
   `<p><b>🔴 لماذا نختبر حالة وجود التعارض في آخر عنصر من القائمة؟</b></p>
   <ul>
     <li>لكشف الخطأ البرمجي الشهير الذي يُرجع الغرفة كمتاحة من أول دورة في الحلقة الداخلية قبل فحص بقية الحجوزات.</li>
   </ul>`)
 ],[['Best Fit','اختيار أصغر مورد يفي بالحاجة'],['Überlappung','تداخل فترتين'],['Schleifenabbruch','إنهاء حلقة محددة مبكرًا']],
 [Q('Freie Räume: (ID 2, Kapazität 20), (ID 1, Kapazität 20), (ID 3, Kapazität 12). Gesucht 10 Plätze. Ergebnis? Und wenn Raum 3 belegt ist?','Ohne Konflikt Raum 3 (12 Plätze). Ist Raum 3 blockiert, Raum 1: kleinste ausreichende Kapazität 20, bei Gleichstand kleinste ID.','اختَر حسب ترتيب المعايير المعلن، لا حسب أول عنصر في القائمة.'),Q('Ein Raum hat zwei Buchungen: erste ohne Konflikt, zweite mit Konflikt. Darf nach der ersten ein freier Raum zurückgegeben werden?','Nein. Eine nicht kollidierende Buchung beweist nicht Konfliktfreiheit aller Buchungen. Erst wenn keine relevante Buchung kollidiert, ist der Raum frei.','هذه من أكثر أخطاء المنطق في الحلقات المتداخلة شيوعًا.')],['Vollständigen Best-Fit-Algorithmus erklären','Innere/äußere Schleife korrekt steuern','Zeitgrenzen und leere Listen testen'],['ordnung','lokal']);
