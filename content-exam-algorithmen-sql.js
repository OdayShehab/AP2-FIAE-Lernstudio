/* Priority 1 Upgrade: Teil 2 — Algorithmen, Datenstrukturen, SQL-Praxis & IHK-Belegsatz (2021W–2025W + AkA Katalog 2. Auflage) */
(() => {
  const add = (id, sections, questions = [], terms = [], check = []) => {
    const l = COURSE.lessons.find(x => x.id === id);
    if (!l) return;
    if (sections && sections.length) l.sections.push(...sections);
    if (questions && questions.length) l.questions.push(...questions);
    if (terms && terms.length) l.terms.push(...terms);
    if (check && check.length) l.check.push(...check);
  };

  // =========================================================================
  // 1. NEUE KERN-LEKTION: 2D-Arrays, Matrizen & Gruppenwechsel (Kontrollbruch)
  // =========================================================================
  L(
    'algo-2d-gruppenwechsel',
    'code',
    '2D-Arrays, Matrizen & Gruppenwechsel-Algorithmen',
    'المصفوفات ثنائية الأبعاد وخوارزمية كسر المجموعة (Gruppenwechsel)',
    'Kern',
    'Die zwei häufigsten 25-Punkte-Algorithmen aus Teil 2 sicher schreiben, verfolgen und debuggen.',
    [
      S(
        'Mehrdimensionale Arrays (2D-Arrays) sicher indizieren',
        `<p>In den IHK-Prüfungen (z. B. <b>Sommer 2023</b> Besucherzähler und <b>Sommer 2022</b> Jahresverbrauch) werden Messwerte fast immer in einem <b>zweidimensionalen Array</b> <code>daten[zeile][spalte]</code> gespeichert. Die erste Klammer wählt die äußere Dimension (z. B. Tag oder Vertragsnummer), die zweite Klammer die innere Dimension (z. B. Stunde oder Monat).</p>
        <ul>
          <li><b>Index-Verschiebung (Offset) beachten:</b> Wenn Tage von <code>1..365</code> nummeriert sind und Öffnungszeiten von <code>9..18 Uhr</code> laufen, das Array aber bei <code>0</code> beginnt, lautet der Zugriff zwingend: <code>visitors[day - 1][hour - 9]</code>.</li>
          <li><b>Zeilensumme / Durchschnitt pro Zeile:</b> Äußere Schleife über die Zeilen, <code>summe = 0</code> <i>vor</i> der inneren Schleife initialisieren, innere Schleife summiert alle Spalten.</li>
          <li><b>Differenzen benachbarter Spalten:</b> Wenn Zählerstände pro Monat gespeichert sind (Index <code>0</code> = Januar bis Index <code>12</code> = Januar Folgejahr), ist der Monatsverbrauch im Monat <code>m</code> genau: <code>verbrauch[vn][m + 1] - verbrauch[vn][m]</code>.</li>
        </ul>` +
        C(
`// Muster 1: Durchschnitt pro Stunde über 365 Tage (analog Sommer 2023)
// visitors[365][10] -> Zeile: Tag (0..364), Spalte: Stunde (0..9 entspricht 9..18 Uhr)
funktion avgVisitorsPerHour(hour: Integer, visitors: Integer[][]): Integer
  summe = 0
  spalte = hour - 9
  für tag = 0 bis 364:
    summe = summe + visitors[tag][spalte]
  rückgabe rundeAufGanzzahl(summe / 365.0)

// Muster 2: Jahresstatistik aus Zählerständen + Maximum suchen (analog Sommer 2022)
// verbrauch[anzahlVertraege][13] -> Spalte 0..12 sind Zählerstände am Monatsanfang
funktion erstelleJahresstatistik(verbrauch: Integer[][]): Integer[]
  monatsSummen = neues Integer[12] mit 0 initialisiert
  für vn = 0 bis verbrauch.length - 1:
    für m = 0 bis 11:
      differenz = verbrauch[vn][m + 1] - verbrauch[vn][m]
      monatsSummen[m] = monatsSummen[m] + differenz
  rückgabe monatsSummen`
        ) +
        `<p><b>IHK-Prüfer-Schlüsselbegriffe:</b> <i>Nullbasierte Indizierung (0-based Indexing), Offset-Umrechnung, äußere/innere Schleife, ArrayIndexOutOfBoundsException vermeiden (bei <code>m + 1</code> läuft die Schleife nur bis <code>length - 2</code>!).</i></p>`,
        `<p><b>1. الفهم المبسط من الصفر:</b> تخيل المصفوفة ثنائية الأبعاد <code>array[row][col]</code> كجدول Excel: القوس الأول هو <b>رقم السطر</b> (مثلاً اليوم أو رقم العقد)، والقوس الثاني هو <b>رقم العمود</b> (مثلاً الساعة أو الشهر).</p>
        <p><b>2. خطوات الحل على الورقة (خوارزمية الحل):</b></p>
        <ol>
          <li><b>احسب الإزاحة (Offset):</b> إذا كان السؤال يقول إن اليوم يبدأ من <code>1</code> والساعة تبدأ من <code>9</code> صباحاً، بينما المصفوفة تبدأ من <code>0</code>، فاطرح البداية فوراً: <code>visitors[day - 1][hour - 9]</code>.</li>
          <li><b>حدد مكان تصفير المجموع (<code>summe = 0</code>):</b> إذا أردت مجموع كل سطر على حدة، ضع <code>summe = 0</code> <b>داخل</b> الحلقة الخارجية وقبل الحلقة الداخلية. أما إذا أردت المجموع الكلي لكل الجدول، ضعها خارج الحلقتين.</li>
          <li><b>انتبه لحدود <code>m + 1</code>:</b> عندما تطرح قراءة الشهر التالي من الشهر الحالي <code>v[vn][m+1] - v[vn][m]</code> وعندك 13 قراءة (من 0 إلى 12)، فإن حلقة الأشهر يجب أن تتوقف عند <code>11</code> حتى لا يصل <code>m + 1</code> إلى <code>13</code> ويسبب خطأ خروج عن حدود المصفوفة!</li>
        </ol>
        <p><b>3. فخ الامتحان الشائع:</b> الخلط بين ترتيب الأقواس <code>visitors[hour][day]</code> بدلاً من <code>visitors[day][hour]</code>، أو القسمة الصحيحة <code>summe / 365</code> دون تحويلها إلى عدد عشري قبل التقريب.</p>`
      ),
      S(
        'Der Gruppenwechsel-Algorithmus (Kontrollbruch) & der „Letzte-Gruppe-Bug“',
        `<p>Ein absoluter Klassiker der IHK-Prüfung (z. B. <b>Sommer 2023 Teil 2 Aufgabe 3 — 25 Punkte</b>) ist der <b>Gruppenwechsel (Control Break)</b>: Eine nach einem Gruppenschlüssel (z. B. <code>Monat</code> oder <code>Abteilung</code>) sortierte Liste wird durchlaufen. Solange sich der Schlüssel nicht ändert, werden Werte aufaddiert. Sobald ein neuer Schlüssel auftaucht (<code>aktuellerMonat != element.Monat</code>), wird die Statistik der bisherigen Gruppe ausgegeben und die Zähler werden für die neue Gruppe zurückgesetzt.</p>
        <p><b>Die berühmte IHK-Falle (Fehleranalyse in der Prüfung):</b> Wenn die Ausgabe <i>nur</i> innerhalb der Schleife beim Wechsel des Schlüssels steht, wird die <b>allerletzte Gruppe</b> (z. B. Februar oder Dezember) <b>niemals ausgegeben</b>, weil nach dem letzten Element kein Gruppenwechsel mehr stattfindet!</p>` +
        C(
`// Gruppenwechsel mit korrekter Behandlung der letzten Gruppe (analog Sommer 2023)
funktion printTicketData(tdList: TicketData[])
  wenn tdList.length == 0: rückgabe
  monat = tdList[0].Monat
  anzahlTage = 0
  summeKaeufe = 0
  maxKaeufe = 0

  für jedes td in tdList:
    wenn monat != td.Monat:
      // Gruppenwechsel erkannt -> bisherige Gruppe ausgeben!
      ausgabe(monat, runde(summeKaeufe / anzahlTage), maxKaeufe)
      // Zähler für den neuen Monat zurücksetzen
      monat = td.Monat
      anzahlTage = 0
      summeKaeufe = 0
      maxKaeufe = 0

    // Aktuellen Datensatz in die laufende Gruppe einrechnen
    anzahlTage = anzahlTage + 1
    summeKaeufe = summeKaeufe + td.Kaeufe
    wenn td.Kaeufe > maxKaeufe:
      maxKaeufe = td.Kaeufe

  // WICHTIG (Prüfungs-Bugfix!): Nach Schleifenende MUSS die letzte Gruppe ausgegeben werden!
  ausgabe(monat, runde(summeKaeufe / anzahlTage), maxKaeufe)`
        ) +
        `<p><b>Trace-Tabelle (Schreibtischtest) am Beispiel Jan (15, 25) und Feb (22, 18):</b></p>
        <table class="term-table">
          <thead><tr><th>Schritt / Element</th><th>monat</th><th>anzahlTage</th><th>summeKaeufe</th><th>maxKaeufe</th><th>Ausgabe</th></tr></thead>
          <tbody>
            <tr><td>1. Jan (15)</td><td>1</td><td>1</td><td>15</td><td>15</td><td>—</td></tr>
            <tr><td>2. Jan (25)</td><td>1</td><td>2</td><td>40</td><td>25</td><td>—</td></tr>
            <tr><td>3. Feb (22) [Wechsel!]</td><td>2</td><td>1</td><td>22</td><td>22</td><td><code>1 | Ø 20 | Max 25</code> (vor Reset!)</td></tr>
            <tr><td>4. Feb (18)</td><td>2</td><td>2</td><td>40</td><td>22</td><td>—</td></tr>
            <tr><td>Nach Schleife</td><td>2</td><td>2</td><td>40</td><td>22</td><td><code>2 | Ø 20 | Max 22</code> (Nachlauf!)</td></tr>
          </tbody>
        </table>`,
        `<p><b>1. الفهم المبسط من الصفر:</b> خوارزمية <b>كسر المجموعة (Gruppenwechsel)</b> تُستخدم عندما تكون البيانات مرتبة مسبقاً (مثلاً فواتير شهر يناير ثم فبراير). نجمع أرقام يناير طالما الشهر هو <code>1</code>. أول ما نرى سطراً شهره <code>2</code>، نطبع ملخص يناير، نصفّر العدادات، ونبدأ بجمع فبراير.</p>
        <p><b>2. خطوات الحل على الورقة عند تتبع الكود (Trace-Tabelle):</b></p>
        <ol>
          <li>راقب متى يتحقق الشرط <code>monat != td.Monat</code>: عندها تُطبع القيم القديمة قبل التصفير، ثم يُحدَّث الشهر وتُصفَّر المتغيرات، <b>ثم</b> يُضاف العنصر الجديد في نفس الدورة!</li>
          <li>إذا سألك الامتحان: <i>«لماذا لم يطبع البرنامج شهر فبراير؟ وكيف تصلح الخطأ؟»</i> فالجواب الفوري هو: لأن الطباعة موجودة فقط داخل شرط تغير الشهر، وبعد انتهاء الحلقة لا يوجد شهر جديد ليُطلق الشرط. <b>الإصلاح:</b> إضافة سطر الطباعة مرة أخيرة <b>بعد إغلاق الحلقة</b> (أو استخدام حلقة <code>do-while</code> مع فحص نهاية القائمة).</li>
        </ol>`
      )
    ],
    [
      ['2D-Array / Matrix', 'مصفوفة ثنائية الأبعاد (صفوف وأعمدة)'],
      ['Index-Offset', 'إزاحة الفهرس (تحويل رقم واقعي إلى فهرس يبدأ من 0)'],
      ['Gruppenwechsel / Kontrollbruch', 'كسر المجموعة عند تغير مفتاح الترتيب'],
      ['Schreibtischtest / Trace-Tabelle', 'جدول تتبع قيم المتغيرات خطوة بخطوة']
    ],
    [
      Q(
        'Ein Kino speichert Besucherzahlen in saalBelegung[7][4] für 7 Wochentage (1=Montag bis 7=Sonntag) und 4 Vorstellungen (1 bis 4). Schreibe eine Funktion, die den Wochentag (1..7) mit den meisten Gesamtbesuchern zurückgibt.',
        `funktion besterWochentag(saalBelegung: Integer[][]): Integer
  besterTag = 1
  maxBesucher = -1
  für tagIndex = 0 bis 6:
    tagesSumme = 0
    für vorstellung = 0 bis 3:
      tagesSumme = tagesSumme + saalBelegung[tagIndex][vorstellung]
    wenn tagesSumme > maxBesucher:
      maxBesucher = tagesSumme
      besterTag = tagIndex + 1
  rückgabe besterTag`,
        'انتبه لتصفير tagesSumme داخل الحلقة الخارجية، وإرجاع tagIndex + 1 لأن المطلوب رقم اليوم من 1 إلى 7 وليس الفهرس من 0 إلى 6.',
        6
      ),
      Q(
        'Beim Gruppenwechsel-Algorithmus wird im if-Block (wenn monat != td.Monat) ein else-Zweig für das Aufaddieren von summeKaeufe verwendet. Welcher logische Fehler entsteht dadurch beim ersten Datensatz eines neuen Monats?',
        'Durch das else wird der erste Datensatz des neuen Monats nur zum Zurücksetzen genutzt, aber seine eigenen Käufe und der Tag werden übersprungen (nicht mitgezählt)! Das Aufaddieren darf NICHT im else-Zweig stehen, sondern muss nach dem if-Block für jeden Datensatz ausgeführt werden.',
        'هذا فخ امتحاني خطير جداً: إذا وضعت الجمع داخل else، فإن أول سطر من الشهر الجديد سيُصفّر العدادات ولن يُجمع! يجب أن يتم الجمع بعد انتهاء if في كل دورة.',
        6
      )
    ],
    [
      '2D-Array mit Offset (z. B. tag-1, stunde-9) fehlerfrei indizieren',
      'Zeilen- und Spaltensummen in verschachtelten Schleifen berechnen',
      'Gruppenwechsel-Algorithmus mit Nachlauf für die letzte Gruppe schreiben'
    ]
  );

  // =========================================================================
  // 2. NEUE KERN-LEKTION: Generics-Sortierung, Greedy-Routen & Rekursion
  // =========================================================================
  L(
    'algo-generics-greedy-rekursion',
    'code',
    'Generics-Sortierung, Greedy-Suche & Rekursion',
    'الترتيب العام (Generics Comparator) والبحث الجشع والاستدعاء الذاتي',
    'Kern',
    'Originalgetreue Algorithmus-Muster aus 2022W, 2023W, 2024S und 2024W meistern.',
    [
      S(
        'Generischer BubbleSort mit Comparator-Funktion (Function<T>)',
        `<p>In <b>Winter 2022/23</b> (25 Punkte) und nahezu identisch in <b>Sommer 2024</b> (Teil 2 Aufgabe 2) verlangte die IHK eine <b>generische Sortierfunktion</b> <code>sort(liste: List&lt;T&gt;, f: Function&lt;T&gt;)</code>. Statt fest mit <code>&gt;</code> zu vergleichen, wird eine Vergleichsfunktion <code>f(a, b)</code> übergeben, die angibt, welches Objekt größer ist:</p>
        <ul>
          <li><code>f(a, b) &gt; 0</code> (oder <code>1</code>): <code>a</code> ist größer als <code>b</code> $\\rightarrow$ Elemente müssen beim aufsteigenden Sortieren <b>getauscht</b> werden!</li>
          <li><code>f(a, b) == 0</code>: Beide Elemente sind gleich.</li>
          <li><code>f(a, b) &lt; 0</code> (oder <code>-1</code>): <code>a</code> ist kleiner als <code>b</code> $\\rightarrow$ richtige Reihenfolge.</li>
        </ul>
        <p><b>Mehrstufiger Vergleich (z. B. erst nach Abteilung, bei Gleichheit nach Nachname):</b> Wenn das Hauptkriterium gleich ist, darf noch nicht <code>0</code> zurückgegeben werden, sondern es muss das Zweitkriterium geprüft werden!</p>` +
        C(
`// 1. Generischer BubbleSort mit Callback/Comparator f (analog 2022W & 2024S)
funktion sort<T>(liste: List<T>, f: Function<T>)
  n = liste.size()
  für i = 0 bis n - 2:
    für j = 0 bis n - 2 - i:
      // Aufruf der übergebenen Vergleichsfunktion statt direktem '>'
      wenn f(liste.get(j), liste.get(j + 1)) > 0:
        temp = liste.get(j)
        liste.set(j, liste.get(j + 1))
        liste.set(j + 1, temp)

// 2. Mehrstufige Vergleichsfunktion für Mitarbeiter (erst Abteilung, dann Name)
funktion vergleicheMitarbeiter(a: Mitarbeiter, b: Mitarbeiter): Integer
  cmpAbt = vergleicheString(a.abteilung, b.abteilung)
  wenn cmpAbt != 0:
    rückgabe cmpAbt
  rückgabe vergleicheString(a.name, b.name)`
        ) +
        `<p><b>IHK-Prüfer-Schlüsselbegriffe:</b> <i>Typparameter <code>&lt;T&gt;</code> (Generics), Callback / Funktionszeiger / Comparator-Interface, Dreieckstausch (<code>temp</code>), stabile Sortierung.</i></p>`,
        `<p><b>1. الفهم المبسط من الصفر:</b> لماذا نستخدم <code>Generics &lt;T&gt;</code> ودالة مقارنة <code>f(a, b)</code>؟ حتى لا نكتب دالة ترتيب خاصة بالموظفين ودالة ثانية للمنتجات ودالة ثالثة للفواتير! نكتب خوارزمية BubbleSort مرة واحدة فقط للنوع العام <code>T</code>، ونمرر لها دالة صغيرة <code>f</code> تخبرها كيف تقارن عنصرين.</p>
        <p><b>2. خطوات الحل على الورقة:</b></p>
        <ol>
          <li>استبدل الشرط التقليدي <code>arr[j] &gt; arr[j+1]</code> بالشرط <code>f(liste.get(j), liste.get(j+1)) &gt; 0</code>.</li>
          <li>لا تنسَ التبديل الثلاثي باستخدام متغير مؤقت <code>temp</code> عبر دوال القائمة <code>get()</code> و <code>set()</code>.</li>
          <li>عند كتابة دالة المقارنة <code>vergleiche(a, b)</code> لأكثر من حقل (مثلاً القسم ثم الاسم): قارن القسم أولاً؛ إذا كانت النتيجة لا تساوي صفراً أرجعها فوراً، وإلا قارن الاسم.</li>
        </ol>`
      ),
      S(
        'Greedy / Nearest-Neighbor-Algorithmus auf Objektlisten (Winter 2023/24)',
        `<p>In <b>Winter 2023/24</b> (25 Punkte) musste eine Drohnen-Flugroute berechnet werden: Gegeben ist ein Array von Wegpunkten <code>geoPositions</code>, wobei Index <code>0</code> der Startpunkt ist. Gesucht ist jeweils der noch nicht besuchte Punkt mit der <b>kleinsten Distanz</b> zum aktuellen Punkt; am Ende kehrt die Drohne zum Startpunkt zurück.</p>` +
        C(
`// Greedy Nearest-Neighbor Routenberechnung (analog Winter 2023/24)
funktion calculateFlight(geoPositions: GeoPos[]): List<GeoPos>
  route = neue List<GeoPos>()
  remaining = neue List<GeoPos>(geoPositions) // Kopie als Arbeitsliste
  
  startPos = remaining.removeAt(0)
  route.add(startPos)
  currentPos = startPos

  solange remaining.size() > 0:
    bestIndex = 0
    minDist = currentPos.distance(remaining.get(0))

    für i = 1 bis remaining.size() - 1:
      d = currentPos.distance(remaining.get(i))
      wenn d < minDist:
        minDist = d
        bestIndex = i

    // Nächsten Punkt übernehmen und aus den unbesuchten Punkten entfernen
    currentPos = remaining.removeAt(bestIndex)
    route.add(currentPos)

  // Rückflug zum Startpunkt am Ende anfügen
  route.add(startPos)
  rückgabe route`
        ) +
        `<p><b>Wichtiger Prüfungsaspekt:</b> Warum wird ein Element nach dem Besuch aus <code>remaining</code> entfernt (oder mit einem Boolean-Array <code>besucht[]</code> markiert)? Damit der Algorithmus nicht in einer Endlosschleife zwischen den zwei nächstgelegenen Punkten hin- und herspringt!</p>`,
        `<p><b>1. الفهم المبسط من الصفر:</b> خوارزمية <b>أقرب جار (Nearest Neighbor)</b> تبدأ من نقطة الانطلاق، وفي كل خطوة تبحث في النقاط المتبقية عن النقطة صاحبة أصغر مسافة <code>minDist</code>، تنتقل إليها وتحذفها من قائمة النقاط المتبقية حتى تنتهي كل النقاط، ثم تضيف نقطة البداية في النهاية للعودة.</p>
        <p><b>2. خطوات الحل على الورقة:</b></p>
        <ol>
          <li>افترض دائماً أن العنصر رقم <code>0</code> في القائمة المتبقية هو الأقرب مبدئياً (<code>bestIndex = 0</code>، <code>minDist = current.distance(remaining.get(0))</code>).</li>
          <li>ابحث في باقي العناصر من <code>i = 1</code>؛ كلما وجدت مسافة أصغر حدّث <code>minDist</code> واحفظ الفهرس <code>bestIndex = i</code>.</li>
          <li>بعد انتهاء حلقة <code>for</code> الداخلية، اسحب العنصر الأفضل بـ <code>removeAt(bestIndex)</code> وأضفه إلى المسار <code>route</code> واجعله هو <code>currentPos</code> الجديد.</li>
        </ol>`
      ),
      S(
        'Rekursion verfolgen, Bugfixing & Umwandlung Rekursiv ↔ Iterativ',
        `<p>In <b>Winter 2022/23 Teil 2 Aufgabe 2 (25 Punkte)</b> wurde ein rekursiver Algorithmus zur Umrechnung einer Dezimalzahl in eine Binärzahl geprüft. Dabei musste ein klassischer Logikfehler gefunden werden:</p>
        <ul>
          <li>Bei der Binärumrechnung mittels <code>zahl % 2</code> (Modulo 2) entsteht zuerst das <b>niederwertigste Bit (LSB, ganz rechts)</b> und zuletzt das <b>höchstwertige Bit (MSB, ganz links)</b>.</li>
          <li>Steht <code>Ausgabe(rest)</code> <b>vor</b> dem rekursiven Aufruf <code>umrechnen(zahl / 2)</code>, werden die Bits in <b>umgekehrter (falscher!) Reihenfolge</b> ausgegeben.</li>
          <li>Steht <code>Ausgabe(rest)</code> <b>nach</b> dem rekursiven Aufruf, wartet die Ausgabe auf dem Call-Stack und gibt die Bits beim Aufrollen der Rekursion in der <b>richtigen Reihenfolge</b> aus!</li>
        </ul>` +
        C(
`// 1. Rekursive Dezimal-zu-Binär-Umwandlung (KORREKTE Reihenfolge)
funktion dezZuBinaerRekursiv(zahl: Integer)
  wenn zahl > 0:
    rest = zahl % 2
    dezZuBinaerRekursiv(zahl / 2) // Ganzzahldivision! Erst absteigen...
    ausgabe(rest)                 // ...dann beim Rückweg ausgeben!

// 2. Iterative Umwandlung (Speichern im String oder Stack, damit Reihenfolge stimmt)
funktion dezZuBinaerIterativ(zahl: Integer): String
  wenn zahl == 0: rückgabe "0"
  ergebnis = ""
  solange zahl > 0:
    rest = zahl % 2
    ergebnis = toString(rest) + ergebnis // Vorne anhängen!
    zahl = zahl / 2                      // Ganzzahldivision
  rückgabe ergebnis`
        ),
        `<p><b>1. الفهم المبسط من الصفر:</b> عند قسمة العدد <code>13</code> على <code>2</code>: البواقي على التوالي هي <code>1</code> ثم <code>0</code> ثم <code>1</code> ثم <code>1</code>، والعدد الثنائي الصحيح يُقرأ من آخر باقٍ إلى أول باقٍ أي <code>1101</code>.</p>
        <p><b>2. الفخ الامتحاني في الاستدعاء الذاتي (Rekursion):</b></p>
        <ul>
          <li>إذا طبعنا الباقي <b>قبل</b> استدعاء الدالة لنفسها، سيطبع <code>1011</code> (بالمقلوب!).</li>
          <li>إذا وضعنا أمر الطباعة <b>بعد</b> الاستدعاء الذاتي <code>dezZuBinaerRekursiv(zahl / 2)</code>، فإن كل استدعاء ينتظر على المكدس (Call-Stack) حتى نصل إلى الصفر، ثم تُطبع البواقي من الأخير إلى الأول <code>1101</code> بشكل صحيح تماماً.</li>
          <li>عند تحويلها إلى حلقة تكرارية (<code>while</code>)، نلصق كل باقٍ جديد <b>في يسار النص</b> (<code>rest + ergebnis</code>) وليس في يمينه.</li>
        </ul>`
      )
    ],
    [
      ['Generics <T>', 'الأنواع العامة (كتابة الكود ليعمل مع أي نوع بيانات)'],
      ['Comparator / Callback', 'دالة مقارنة تُمرر كمعامل لتحديد ترتيب عنصرين'],
      ['Greedy-Algorithmus', 'خوارزمية جشعة تختار أفضل خيار محلي في كل خطوة'],
      ['Rekursionsanker / Abbruchbedingung', 'شرط التوقف الذي يمنع الاستدعاء اللانهائي (StackOverflow)']
    ],
    [
      Q(
        'Verfolge dezZuBinaerRekursiv(6) Schritt für Schritt. Welche Aufrufe liegen auf dem Stack und was wird in welcher Reihenfolge ausgegeben?',
        `1. Aufruf(6): rest = 6 % 2 = 0 -> ruft Aufruf(3) auf (Ausgabe(0) wartet)
2. Aufruf(3): rest = 3 % 2 = 1 -> ruft Aufruf(1) auf (Ausgabe(1) wartet)
3. Aufruf(1): rest = 1 % 2 = 1 -> ruft Aufruf(0) auf (Ausgabe(1) wartet)
4. Aufruf(0): Bedingung zahl > 0 ist falsch -> kehrt zurück.
Rückweg vom Stack:
- Aufruf(1) gibt 1 aus
- Aufruf(3) gibt 1 aus
- Aufruf(6) gibt 0 aus
Gesamtausgabe: 110 (korrekt für Dezimal 6).`,
        'تتبع الاستدعاء الذاتي على الورقة يتطلب كتابة قيم المتغيرات عند النزول، ثم كتابة المخرجات بالترتيب العكسي عند العودة من شرط التوقف.',
        6
      ),
      Q(
        'Gegeben ist ein Array zeiten[] mit aufsteigenden Zeitstempeln (analog Winter 2024/25). Schreibe eine Funktion, die die größte Zeitdifferenz (in Minuten) zwischen zwei direkt aufeinanderfolgenden Einträgen berechnet.',
        `funktion maxZeitluecke(zeiten: DateTime[]): Integer
  wenn zeiten.length < 2: rückgabe 0
  maxDiff = 0
  für i = 1 bis zeiten.length - 1:
    diff = diffInMinuten(zeiten[i - 1], zeiten[i])
    wenn diff > maxDiff:
      maxDiff = diff
  rückgabe maxDiff`,
        'عند مقارنة كل عنصر بالعنصر الذي قبله (zeiten[i] مع zeiten[i-1])، ابدأ الحلقة دائماً من i = 1 حتى لا تحاول قراءة zeiten[-1]!',
        5
      )
    ],
    [
      'BubbleSort mit generischer Vergleichsfunktion f(a,b) ergänzen',
      'Greedy-Routensuche mit Entfernung besuchter Knoten nachvollziehen',
      'Rekursive Funktion mit Call-Stack-Reihenfolge in iterative while-Schleife umwandeln'
    ]
  );

  // =========================================================================
  // 3. NEUE KERN-LEKTION: Verkettete Listen, Binärbäume (BST), Binäre Suche & Big-O
  //    (Offizieller Prüfungskatalog / LF 11a — Erwartete Zukunftsthemen!)
  // =========================================================================
  L(
    'datenstrukturen-baeume-listen',
    'code',
    'Verkettete Listen, Binärbäume, Binäre Suche & Big-O',
    'القوائم المترابطة والأشجار الثنائية والبحث الثنائي وتعقيد الخوارزميات',
    'Kern',
    'Katalogthemen für kommende Prüfungen: Zeigerstrukturen, Baumtraversierung, Binary Search und Laufzeitklassen.',
    [
      S(
        'Verkettete Liste (Linked List) vs. Array: Zeiger verstehen',
        `<p>Im offiziellen IHK-Prüfungskatalog (LF 11a) stehen <b>dynamische Datenstrukturen</b> wie einfach und doppelt verkettete Listen sowie Bäume. Während ein Array im Speicher zusammenhängend liegt (Indexzugriff in <code>O(1)</code>, aber Einfügen/Löschen in der Mitte kostet <code>O(n)</code> durch Verschieben), besteht eine <b>verkettete Liste</b> aus einzelnen <b>Knoten (Nodes)</b>:</p>
        <ul>
          <li><b>Einfach verkettete Liste (Singly Linked List):</b> Jeder Knoten speichert seinen <code>wert</code> (Nutzdaten) und eine Referenz <code>next</code> (oder <code>naechster</code>) auf den nächsten Knoten. Das Ende zeigt auf <code>null</code>.</li>
          <li><b>Doppelt verkettete Liste (Doubly Linked List):</b> Jeder Knoten hat zusätzlich einen Zeiger <code>prev</code> (<code>vorgaenger</code>), sodass man in beide Richtungen navigieren kann.</li>
          <li><b>Goldene Regel beim Einfügen eines Knotens <code>neu</code> nach Knoten <code>aktuell</code>:</b> Zuerst <code>neu.next = aktuell.next</code> setzen, <b>erst danach</b> <code>aktuell.next = neu</code>! Wer zuerst <code>aktuell.next = neu</code> setzt, verliert die Referenz auf den Rest der Liste (Speicherleck / Datenverlust)!</li>
        </ul>` +
        C(
`// Knoten-Klasse und Einfügen in eine einfach verkettete Liste
klasse Knoten
  wert: Integer
  next: Knoten // null am Listenende

funktion fuegeEinNach(aktuell: Knoten, neuerWert: Integer)
  neu = neuer Knoten(neuerWert)
  // 1. ZUERST den neuen Knoten mit dem Rest der Liste verbinden!
  neu.next = aktuell.next
  // 2. ERST DANACH den Vorgänger auf den neuen Knoten richten!
  aktuell.next = neu`
        ),
        `<p><b>1. الفهم المبسط من الصفر:</b> القائمة المترابطة (Linked List) تشبه عربات القطار؛ كل عربة (<code>Knoten</code>) تحمل بضاعة (<code>wert</code>) وخطافاً يشير إلى العربة التالية (<code>next</code>). الوصول للعربة رقم 5 يتطلب المرور على العربات 1 ثم 2 ثم 3 ثم 4 بالتسلسل <code>O(n)</code>.</p>
        <p><b>2. الفخ القاتل في الامتحان عند إدراج عقدة جديدة:</b> إذا أردت ربط عربة جديدة <code>neu</code> بعد العربة <code>aktuell</code>، يجب <b>أولاً</b> أن تربط خطاف العربة الجديدة بالعربة التي كانت بعد <code>aktuell</code> (أي <code>neu.next = aktuell.next</code>)، <b>ثم ثانياً</b> تربط <code>aktuell.next = neu</code>. لو عكست الترتيب لضاع باقي القطار للأبد!</p>`
      ),
      S(
        'Binärer Suchbaum (Binary Search Tree — BST) & Traversierung',
        `<p>Ein <b>Binärbaum</b> besteht aus Knoten mit höchstens zwei Kindern (<code>links</code> und <code>rechts</code>). Bei einem <b>Binären Suchbaum (BST)</b> gilt für jeden Knoten die Suchbaum-Eigenschaft:</p>
        <ul>
          <li>Alle Werte im <b>linken Teilbaum</b> sind <b>kleiner</b> als der Knotenwert (<code>wert &lt; knoten.wert</code>).</li>
          <li>Alle Werte im <b>rechten Teilbaum</b> sind <b>größer</b> als der Knotenwert (<code>wert &gt; knoten.wert</code>).</li>
        </ul>
        <p><b>Die 3 Traversierungsarten (Durchlauf-Reihenfolgen — sehr beliebte Prüfungsfrage!):</b></p>
        <ol>
          <li><b>Preorder (Wurzel – Links – Rechts):</b> Knoten sofort verarbeiten, dann links, dann rechts (gut zum Kopieren eines Baums).</li>
          <li><b>Inorder (Links – Wurzel – Rechts):</b> Erst links, dann Knoten, dann rechts $\\rightarrow$ <b>liefert bei einem binären Suchbaum alle Werte exakt AUFSTEIGEND SORTIERT!</b></li>
          <li><b>Postorder (Links – Rechts – Wurzel):</b> Erst beide Kinder, zuletzt die Wurzel (z. B. zum Löschen von Teilbäumen oder Auswerten von Rechenbäumen).</li>
        </ol>` +
        C(
`// Rekursive Suche und Inorder-Ausgabe im Binären Suchbaum (BST)
funktion sucheImBST(knoten: BaumKnoten, ziel: Integer): BaumKnoten
  wenn knoten == null ODER knoten.wert == ziel:
    rückgabe knoten
  wenn ziel < knoten.wert:
    rückgabe sucheImBST(knoten.links, ziel)
  sonst:
    rückgabe sucheImBST(knoten.rechts, ziel)

// Inorder-Traversierung (gibt einen BST aufsteigend sortiert aus!)
funktion inorder(knoten: BaumKnoten)
  wenn knoten != null:
    inorder(knoten.links)
    ausgabe(knoten.wert)
    inorder(knoten.rechts)`
        ),
        `<p><b>1. الفهم المبسط من الصفر:</b> الشجرة الثنائية للبحث (BST) تضع الأعداد الأصغر على اليسار والأكبر على اليمين. بفضل ذلك، في كل خطوة بحث نستبعد نصف الشجرة تقريباً فتكون السرعة <code>O(log n)</code> إذا كانت الشجرة متوازنة.</p>
        <p><b>2. كيف تحفظ طرق المرور الثلاث (Traversierung) للامتحان؟</b> راقب موقع كلمة <b>Wurzel (الجذر)</b>:</p>
        <ul>
          <li><b>Pre-order (الجذر أولاً):</b> جذر $\\leftarrow$ يسار $\\leftarrow$ يمين.</li>
          <li><b>In-order (الجذر في الوسط):</b> يسار $\\leftarrow$ جذر $\\leftarrow$ يمين (<b>مهم جداً:</b> في شجرة البحث الثنائية تطبع الأرقام <b>مرتبة تصاعدياً</b>!).</li>
          <li><b>Post-order (الجذر أخيراً):</b> يسار $\\leftarrow$ يمين $\\leftarrow$ جذر.</li>
        </ul>`
      ),
      S(
        'Lineare Suche vs. Binäre Suche (Binary Search) & Laufzeitkomplexität (Big-O)',
        `<p>Die <b>binäre Suche</b> sucht ein Element in einem <b>bereits sortierten Array</b> durch fortgesetztes Halbieren des Suchintervalls (<code>links</code>, <code>rechts</code>, <code>mitte</code>). Bei $1.000.000$ Elementen benötigt die lineare Suche im Worst Case $1.000.000$ Vergleiche, die binäre Suche dagegen höchstens $\\lceil \\log_2(1.000.000) \\rceil = 20$ Vergleiche!</p>` +
        C(
`// Iterative Binäre Suche auf einem aufsteigend sortierten Array
funktion binaereSuche(arr: Integer[], ziel: Integer): Integer
  links = 0
  rechts = arr.length - 1

  solange links <= rechts:
    mitte = (links + rechts) / 2 // Ganzzahldivision
    wenn arr[mitte] == ziel:
      rückgabe mitte             // Gefunden! Index zurückgeben
    wenn arr[mitte] < ziel:
      links = mitte + 1          // Ziel liegt in der rechten Hälfte
    sonst:
      rechts = mitte - 1         // Ziel liegt in der linken Hälfte

  rückgabe -1                    // Nicht enthalten`
        ) +
        `<table class="term-table">
          <thead><tr><th>Laufzeitklasse</th><th>Bezeichnung</th><th>Typisches Prüfungsbeispiel</th></tr></thead>
          <tbody>
            <tr><td><code>O(1)</code></td><td>Konstant</td><td>Array-Zugriff per Index <code>arr[5]</code>, Hash-Map-Zugriff (Average Case), <code>push/pop</code> beim Stack</td></tr>
            <tr><td><code>O(log n)</code></td><td>Logarithmisch</td><td><b>Binäre Suche</b> im sortierten Array, Suche im balancierten Binärbaum ( Problemgröße halbiert sich pro Schritt)</td></tr>
            <tr><td><code>O(n)</code></td><td>Linear</td><td><b>Lineare Suche</b>, 1x Schleife über Liste (Maximum, Summe, Gruppenwechsel)</td></tr>
            <tr><td><code>O(n log n)</code></td><td>Log-Linear</td><td>Effiziente Sortierverfahren: <b>QuickSort</b> (Average Case), <b>MergeSort</b></td></tr>
            <tr><td><code>O(n²)</code></td><td>Quadratisch</td><td>Verschachtelte Doppelschleife über <code>n</code> Elemente: <b>BubbleSort, SelectionSort, InsertionSort</b></td></tr>
          </tbody>
        </table>`,
        `<p><b>1. الفهم المبسط من الصفر:</b> البحث الثنائي (<code>Binary Search</code>) يشبه فتح قاموس من المنتصف: إذا كانت الكلمة التي نبحث عنها أكبر من كلمة المنتصف نترك النصف الأيسر بالكامل (<code>links = mitte + 1</code>)، وإذا كانت أصغر نترك النصف الأيمن (<code>rechts = mitte - 1</code>).</p>
        <p><b>2. شرط إلزامي يسأل عنه المصحح دائماً:</b> البحث الثنائي <b>لا يعمل إلا إذا كانت المصفوفة مرتبة مسبقاً (sortiert)!</b> إذا لم تكن مرتبة، يجب إما ترتيبها أولاً أو استخدام البحث الخطي <code>O(n)</code>.</p>`
      )
    ],
    [
      ['Verkettete Liste (Linked List)', 'قائمة مترابطة تتكون من عقد ومؤشرات'],
      ['Binärer Suchbaum (BST)', 'شجرة ثنائية القيم الأصغر يسارها والأكبر يمينها'],
      ['Inorder-Traversierung', 'مرور (يسار - جذر - يمين) يعطي قيماً مرتبة تصاعدياً'],
      ['Binäre Suche (Binary Search)', 'بحث ثنائي بتنصيف المجال في مصفوفة مرتبة O(log n)']
    ],
    [
      Q(
        'In einen leeren Binären Suchbaum (BST) werden nacheinander die Zahlen 50, 30, 70, 20, 40, 60, 80 eingefügt. Gib die Ausgabe für (a) Preorder, (b) Inorder und (c) Postorder an.',
        `Baumstruktur: Wurzel 50; links 30 (mit Kindern 20 und 40); rechts 70 (mit Kindern 60 und 80).
(a) Preorder (Wurzel-Links-Rechts): 50, 30, 20, 40, 70, 60, 80
(b) Inorder (Links-Wurzel-Rechts): 20, 30, 40, 50, 60, 70, 80 (exakt aufsteigend sortiert!)
(c) Postorder (Links-Rechts-Wurzel): 20, 40, 30, 60, 80, 70, 50`,
        'تذكر دائماً أن Inorder في شجرة البحث الثنائية يعطيك الأرقام مرتبة من الأصغر إلى الأكبر؛ هذه أسرع طريقة للتحقق من صحة حلك في الامتحان!',
        6
      ),
      Q(
        'Warum liefert binaereSuche auf dem Array [12, 5, 19, 8, 25] für das Ziel 8 unter Umständen -1, obwohl 8 im Array enthalten ist?',
        'Weil das Array unsortiert ist! Die binäre Suche prüft zuerst das mittlere Element (19). Da 8 < 19 ist, sucht sie nur noch in der linken Hälfte [12, 5] weiter und verwirft die rechte Hälfte, in der die 8 auf Index 3 liegt. Voraussetzung für Binary Search ist eine sortierte Datenstruktur.',
        'مثال عملي ممتاز يثبت للمصحح لماذا تفشل خوارزمية البحث الثنائي على مصفوفة غير مرتبة.',
        5
      )
    ],
    [
      'Knoten in verkettete Liste ohne Referenzverlust einfügen',
      'Preorder, Inorder und Postorder an einem Binärbaum bestimmen',
      'Binäre Suche in Pseudocode schreiben und O(log n) begründen'
    ]
  );

  // =========================================================================
  // 4. NEUE KERN-LEKTION: IHK-Belegsatz Meisterkurs & Fortgeschrittenes SQL
  // =========================================================================
  L(
    'sql-belegsatz-profi',
    'daten',
    'IHK-Belegsatz SQL, Archivierung, Trigger, Prozeduren & ODBC',
    'إتقان ملحق SQL الرسمي والأرشفة والـ Trigger والإجراءات المخزنة وODBC',
    'Kern',
    'Alle SQL-Befehle aus dem offiziellen IHK-Belegsatz (Stand 2024-10-07) und den Prüfungen 2021W–2025W.',
    [
      S(
        'Den offiziellen IHK-Belegsatz (SQL-Syntax) in der Prüfung optimal nutzen',
        `<p>In jeder schriftlichen AP2 erhältst du einen <b>5-seitigen Belegsatz</b> (Seiten 2–3: UML-Notation; Seiten 4–5: SQL-Syntax). Viele Prüflinge verlieren Punkte, weil sie Funktionen frei erfinden, statt die <b>exakte Syntax aus dem Belegsatz</b> zu verwenden:</p>
        <table class="term-table">
          <thead><tr><th>Kategorie im Belegsatz</th><th>Exakte IHK-Syntax (Seiten 4–5)</th><th>Prüfungseinsatz & Fallstricke</th></tr></thead>
          <tbody>
            <tr><td><b>Datumsfunktionen</b></td><td><code>NOW()</code>, <code>YEAR(d)</code>, <code>MONTH(d)</code>, <code>DAY(d)</code>, <code>HOUR(d)</code>, <code>MINUTE(d)</code>, <code>WEEKDAY(d)</code></td><td><b>Achtung bei <code>WEEKDAY(d)</code>:</b> Laut Belegsatz ist <code>Montag = 0</code> (also Sonntag = 6)! (Geprüft in <b>Sommer 2023</b>).</td></tr>
            <tr><td><b>Datumsdifferenz & Addition</b></td><td><code>DATEDIFF(Datumsteil, Anfangsdatum, Enddatum)</code><br><code>DATEADD(Datumsteil, Intervall, Datum)</code></td><td>Mögliche Datumsteile: <code>DAY, MONTH, YEAR, HOUR, MINUTE</code>. Beispiel aus <b>Winter 2024/25</b>: <code>DATEDIFF(MINUTE, startzeit, endzeit)</code>.</td></tr>
            <tr><td><b>Zeichenketten</b></td><td><code>LEFT(str, anzahl)</code>, <code>RIGHT(str, anzahl)</code>, <code>LIKE '%...'</code></td><td>Für Teilstrings am Anfang/Ende direkt <code>LEFT</code> oder <code>RIGHT</code> aus dem Belegsatz nutzen!</td></tr>
            <tr><td><b>Statistik & Mathe</b></td><td><code>AVG</code>, <code>COUNT</code>, <code>SUM</code>, <code>MIN</code>, <code>MAX</code>, <code>STDDEV(spalte)</code>, <code>VARIANCE(spalte)</code>, <code>CORR(s1, s2)</code></td><td><code>CORR</code> liefert Korrelation zwischen 2 Merkmalen (<code>1</code> = 100% korreliert, <code>0</code> = kein Zusammenhang).</td></tr>
            <tr><td><b>Benutzer & Rechte (DCL)</b></td><td><code>CREATE USER name IDENTIFIED BY 'pass';</code><br><code>GRANT recht ON db.tabelle TO name [WITH GRANT OPTION];</code><br><code>REVOKE recht ON db.tabelle FROM name;</code></td><td>Geprüft in <b>Sommer 2023</b>! <code>WITH GRANT OPTION</code> erlaubt dem Empfänger, das Recht an Dritte weiterzugeben.</td></tr>
            <tr><td><b>Tabellenstruktur (DDL)</b></td><td><code>ALTER TABLE tab ADD COLUMN spalte TYP;</code><br><code>ALTER TABLE tab DROP COLUMN spalte;</code><br><code>ALTER TABLE tab MODIFY COLUMN spalte TYP;</code></td><td>Steht komplett auf Seite 4 des Belegsatzes — in der Prüfung direkt abschreiben!</td></tr>
          </tbody>
        </table>`,
        `<p><b>1. كنز مخفي في قاعة الامتحان (ملحق الـ Belegsatz):</b> في الامتحان يُسلمونك كتيباً صغيراً من 5 صفحات اسمه <code>Belegsatz</code>. الصفحتان 4 و5 تحتويان على جدول جاهز بكل أوامر <b>SQL</b> المعتمدة! لا تحاول اختراع أسماء دوال من ذاكرتك، بل افتح الصفحة 5 وانقل اسم الدالة كما هو مكتوب بالضبط.</p>
        <p><b>2. أهم ثلاث ملاحظات في Belegsatz الـ IHK:</b></p>
        <ul>
          <li>دالة <code>WEEKDAY(DatumZeit)</code> تعتبر <b>يوم الاثنين = 0</b> (الثلاثاء = 1 ... الأحد = 6). جاء عليها سؤال في <b>صيف 2023</b>!</li>
          <li>دالة <code>DATEDIFF(Datumsteil, Anfangsdatum, Enddatum)</code> تأخذ 3 معاملات: الوحدة أولاً (مثل <code>MINUTE</code> أو <code>DAY</code>)، ثم تاريخ البداية، ثم تاريخ النهاية (جاءت في <b>شتاء 2024</b>).</li>
          <li>إنشاء مستخدم وإعطاؤه صلاحيات (<code>CREATE USER ... IDENTIFIED BY '...'</code> و <code>GRANT ... ON ... TO ...</code>) مكتوبة حرفياً في بداية الصفحة 5!</li>
        </ul>`
      ),
      S(
        'Daten-Archivierung per SQL & UPDATE mit JOIN (2022W, 2023W, 2024S)',
        `<p>In <b>Winter 2022/23</b> (10 Punkte) und <b>Sommer 2024</b> (8 Punkte) mussten alte Datensätze aus einer produktiven Tabelle in eine Archivtabelle verschoben werden. Dafür brauchst du immer <b>zwei Schritte</b> (am besten innerhalb einer Transaktion): 1. Kopieren der alten Sätze in die Archivtabelle, 2. Löschen derselben Sätze aus der Originaltabelle.</p>` +
        C(
`-- Fall A: Archivtabelle existiert bereits (Standard lt. IHK-Belegsatz Seite 5)
INSERT INTO Bestellungen_Archiv (id, kunde_id, bestelldatum, betrag)
SELECT id, kunde_id, bestelldatum, betrag
FROM Bestellungen
WHERE YEAR(bestelldatum) < YEAR(NOW()) - 1;

-- Danach aus der Originaltabelle löschen (gleiche WHERE-Bedingung!):
DELETE FROM Bestellungen
WHERE YEAR(bestelldatum) < YEAR(NOW()) - 1;

-- Fall B: UPDATE mit Tabellenverknüpfung / Subquery (analog Winter 2023/24)
-- Alle Preise von Artikeln des Herstellers 'SolarTech' um 10 % erhöhen:
UPDATE Artikel
SET preis = preis * 1.10
WHERE hersteller_id IN (
  SELECT id FROM Hersteller WHERE name = 'SolarTech'
);`
        ),
        `<p><b>خطوات حل سؤال الأرشفة (Archivierung) في الامتحان (8 إلى 10 نقاط مضمونة):</b></p>
        <ol>
          <li><b>الخطوة الأولى (النسخ):</b> استخدم <code>INSERT INTO ArchivTabelle (spalten...) SELECT spalten... FROM OriginalTabelle WHERE ...</code> (لاحظ أنه لا توجد كلمة <code>VALUES</code> عندما ننسخ عبر <code>SELECT</code>!).</li>
          <li><b>الخطوة الثانية (الحذف):</b> استخدم <code>DELETE FROM OriginalTabelle WHERE ...</code> مع <b>نفس شرط الـ WHERE تماماً</b> حتى لا تحذف بيانات لم تُنسخ!</li>
        </ol>`
      ),
      S(
        'Stored Procedures vs. Trigger (Sommer 2022) & ODBC / ORM (Katalog 2025)',
        `<p>In <b>Sommer 2022 Teil 2 Aufgabe 4 (4 Punkte)</b> wurde der Unterschied zwischen <b>Stored Procedures</b> und <b>Triggern</b> abgefragt; im neuen <b>Prüfungskatalog (2. Auflage ab Sommer 2025)</b> steht zudem explizit <b>ODBC</b> für den Datenbankzugriff:</p>
        <table class="term-table">
          <thead><tr><th>Konzept</th><th>Definition & Funktionsweise</th><th>Typischer Anwendungsfall</th></tr></thead>
          <tbody>
            <tr><td><b>Stored Procedure (Gespeicherte Prozedur)</b></td><td>Auf dem Datenbankserver gespeichertes Programm (SQL-Ablauf mit Parametern), das <b>explizit aufgerufen</b> werden muss (z. B. <code>CALL berechneMonatsabschluss(2025, 11)</code>).</td><td>Komplexe Geschäftslogik, Batch-Läufe, geringerer Netzwerkverkehr, zentrale Rechtevergabe.</td></tr>
            <tr><td><b>Trigger (Auslöser)</b></td><td>Auf dem DB-Server gespeicherte Prozedur, die <b>automatisch (implizit)</b> durch ein Ereignis (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>) vor (<code>BEFORE</code>) oder nach (<code>AFTER</code>) der Änderung ausgelöst wird.</td><td>Automatische Audit-Logs / Historisierung, komplexe Konsistenzprüfungen.</td></tr>
            <tr><td><b>ODBC / JDBC</b></td><td>Standardisierte, herstellerunabhängige Programmierschnittstelle (API) für den Datenbankzugriff über einen Treiber-Manager und DB-spezifischen Treiber.</td><td>Anwendung kann SQL-Abfragen senden, ohne an einen bestimmten DB-Hersteller (MySQL, PostgreSQL, MS SQL) fest im Quellcode gebunden zu sein.</td></tr>
            <tr><td><b>ORM (Object-Relational Mapping)</b></td><td>Framework (z. B. Hibernate, Entity Framework), das Klassen und Objekte automatisch auf relationale Tabellen und Zeilen abbildet.</td><td>Vermeidet repetitives CRUD-SQL im Code, löst den <i>Object-Relational Impedance Mismatch</i>.</td></tr>
          </tbody>
        </table>`,
        `<p><b>الفرق الجوهري للمصحح بين Stored Procedure و Trigger:</b></p>
        <ul>
          <li><b>Stored Procedure:</b> تُستدعى <b>يدوياً وبشكل صريح (explizit)</b> من البرنامج أو المستخدم وقت الحاجة، وتقبل معاملات إدخال وإخراج.</li>
          <li><b>Trigger:</b> يعمل <b>تلقائياً (implizit / ereignisgesteuert)</b> في الخلفية فور حدوث <code>INSERT</code> أو <code>UPDATE</code> أو <code>DELETE</code> على الجدول المراقب دون أن يستدعيه المبرمج بنفسه.</li>
          <li><b>ODBC (جديد ومهم في كتالوج 2025):</b> واجهة قياسية تسمح لبرنامجك بالاتصال بأي قاعدة بيانات علائقية عبر تبديل المشغّل (<code>Driver</code>) فقط دون إعادة كتابة كود الاتصال.</li>
        </ul>`
      )
    ],
    [
      ['Stored Procedure', 'إجراء مخزن في قاعدة البيانات يُستدعى صراحةً'],
      ['Trigger', 'مُطلِق يعمل تلقائياً عند حدوث INSERT أو UPDATE أو DELETE'],
      ['ODBC (Open Database Connectivity)', 'واجهة قياسية مستقلة عن الشركة المصنعة للاتصال بقواعد البيانات'],
      ['WITH GRANT OPTION', 'صلاحية تسمح للمستخدم بمنح نفس الصلاحية لمستخدمين آخرين']
    ],
    [
      Q(
        'Schreibe mit der exakten Syntax des IHK-Belegsatzes: 1) Einen Datenbankbenutzer "report_user" mit Passwort "Geheim!25" anlegen. 2) Ihm das Leserecht (SELECT) auf die Tabelle "umsatz" in der Datenbank "shop" geben, ohne dass er das Recht weitergeben darf.',
        `CREATE USER report_user IDENTIFIED BY 'Geheim!25';
GRANT SELECT ON shop.umsatz TO report_user;`,
        'موجود حرفياً في الصفحة 5 من الملحق الرسمي Belegsatz! لو طلب السماح له بنقل الصلاحية لغيره نضيف WITH GRANT OPTION في النهاية.',
        4
      ),
      Q(
        'In der Tabelle "wartung" gibt es die Spalten "id", "geraet_id", "startzeit" (DATETIME) und "endzeit" (DATETIME). Schreibe eine SQL-Abfrage (mit Belegsatz-Syntax), die für jede geraet_id die gesamte Wartungsdauer in Minuten für das Jahr 2025 berechnet, aber nur Geräte anzeigt, deren Gesamtdauer über 120 Minuten liegt.',
        `SELECT geraet_id, SUM(DATEDIFF(MINUTE, startzeit, endzeit)) AS gesamtdauer_minuten
FROM wartung
WHERE YEAR(startzeit) = 2025
GROUP BY geraet_id
HAVING SUM(DATEDIFF(MINUTE, startzeit, endzeit)) > 120;`,
        'لاحظ كيف جمعنا بين YEAR(startzeit) في الـ WHERE (لتصفية الأسطر قبل التجميع)، و DATEDIFF(MINUTE, ...) داخل SUM، ثم HAVING لتصفية المجموعات بعد جمعها.',
        6
      )
    ],
    [
      'Datumsfunktionen (DATEDIFF, WEEKDAY, YEAR) laut IHK-Belegsatz einsetzen',
      'Archivierung mit INSERT INTO ... SELECT und DELETE schreiben',
      'Stored Procedure, Trigger, ODBC und ORM präzise abgrenzen'
    ]
  );

  // =========================================================================
  // 5. VERTIEFUNGEN BESTEHENDER LEKTIONEN (Chen-ER, NoSQL-JSON, HTTP-Code)
  // =========================================================================
  add(
    'er-modell',
    [
      S(
        'Original IHK-Prüfungsstil: Chen-Notation mit rekursiven Beziehungen & Beziehungsattributen',
        `<p>In <b>Sommer 2025</b> (16 Punkte), <b>Sommer 2024</b> (10 Punkte), <b>Winter 2023/24</b> (14 Punkte) und <b>Winter 2022/23</b> (12 Punkte) verlangte die IHK ausdrücklich das Zeichnen eines <b>ER-Diagramms nach Chen-Notation</b> (oder das Ergänzen von Kardinalitäten und Attributen):</p>
        <ul>
          <li><b>Rechteck (Kasten):</b> Entitätstyp (Substantiv im Singular, z. B. <code>Mitarbeiter</code>, <code>Projekt</code>).</li>
          <li><b>Raute (Diamant):</b> Beziehungstyp (Verb, z. B. <code>arbeitet_an</code>, <code>leitet</code>, <code>vertritt</code>).</li>
          <li><b>Ellipse (Oval):</b> Attribut (Eigenschaft). Das <b>Primärschlüssel-Attribut wird unterstrichen</b> (z. B. <u><code>PersonalNr</code></u>). Fremdschlüssel werden im konzeptionellen Chen-ER-Diagramm <b>NICHT</b> als Ellipsen eingezeichnet — sie entstehen erst beim Überführen ins relationale Tabellenmodell!</li>
          <li><b>Attribute an Beziehungen (Rauten):</b> Wenn eine Eigenschaft vom Zusammenspiel zweier Entitäten abhängt (z. B. <code>Stundenanzahl</code> bei <code>Mitarbeiter</code> <code>n:m</code> <code>Projekt</code>, oder <code>Vertretung_von</code> / <code>Vertretung_bis</code>), hängt das Oval <b>direkt an der Raute</b>!</li>
          <li><b>Rekursive Beziehung (Selbstbeziehung):</b> Eine Entität steht mit sich selbst in Beziehung (z. B. <code>Mitarbeiter</code> —Raute <code>vertritt</code>— <code>Mitarbeiter</code> oder <code>Kategorie</code> hat <code>Oberkategorie</code>). Beide Linien führen von derselben Entität zur selben Raute; die Kardinalitäten (z. B. <code>1</code> und <code>n</code> oder <code>n</code> und <code>m</code>) und Rollennamen werden an die beiden Linien geschrieben.</li>
        </ul>`,
        `<p><b>1. انتبه: فرق حاسم بين رسم ER-Diagramm (Chen) ورسم الجداول (Tabellenmodell)!</b></p>
        <p>في الامتحانات الرسمية (مثل صيف 2025 وشتاء 2023)، عندما يطلب منك رسم <b>ER-Diagramm</b> ويعطيك في السؤال مستطيلاً ومعيناً وشكلًا بيضاوياً كمثال، فيجب أن تلتزم بـ <b>تدوين Chen</b>:</p>
        <ol>
          <li><b>المستطيلات:</b> للكيانات (<code>Entitätstypen</code>) فقط.</li>
          <li><b>المعينات (Rauten):</b> للعلاقات بين الكيانات مع كتابة التعددية (<code>1:1</code>, <code>1:n</code>, <code>n:m</code>) على الخطوط.</li>
          <li><b>الأشكال البيضاوية (Ovale):</b> للخصائص (<code>Attribute</code>)، وضع <b>خطاً تحت المفتاح الأساسي</b> فقط. <b>تحذير مهم:</b> لا تكتب المفاتيح الأجنبية (<code>FK</code>) كأشكال بيضاوية في مخطط Chen! لأن العلاقات مرسومة أصلاً كمعينات.</li>
          <li><b>العلاقة العودية (Rekursive Beziehung):</b> إذا قال النص «الموظف ينوب عن موظف آخر لفترة من تاريخ البداية إلى تاريخ النهاية» (كما في <b>شتاء 2022</b> و<b>شتاء 2023</b>)، ارسم معيناً اسمه <code>vertritt</code> يخرج منه خطان كلاهما يتصلان بنفس مستطيل <code>Mitarbeiter</code>، وعلّق الشكلين البيضاويين <code>Startdatum</code> و<code>Enddatum</code> <b>بالمعين نفسه</b>!</li>
        </ol>`
      )
    ],
    [
      Q(
        'Ein Mitarbeiter kann mehrere andere Mitarbeiter vertreten und selbst von mehreren Mitarbeitern vertreten werden. Zu jeder Vertretung werden Startdatum und Enddatum gespeichert. Beschreibe exakt, wie du dies im Chen-ER-Diagramm zeichnest und wie viele Tabellen im relationalen Modell entstehen.',
        `Im Chen-ER-Diagramm:
1. Ein Rechteck "Mitarbeiter" mit Ellipsen "<u>MitarbeiterID</u>" und "Name".
2. Eine Raute "vertritt", die über zwei Linien (Rollen: "Vertreter" und "Vertretener") mit demselben Rechteck "Mitarbeiter" verbunden ist (rekursive Beziehung, Kardinalität n : m).
3. Zwei Ellipsen "Startdatum" und "Enddatum", die direkt an der Raute "vertritt" hängen.
Im relationalen Modell entstehen 2 Tabellen:
- Mitarbeiter(PK MitarbeiterID, Name)
- Vertretung(PK/FK VertreterID, PK/FK VertretenerID, PK Startdatum, Enddatum)`,
        'سؤال تكرر كثيراً في الامتحانات! لأن العلاقة n:m، فإن تاريخ البداية والنهاية يُعلّقان بالمعين في رسم Chen، ويتحول المعين إلى جدول وسيط في النموذج العلائقي.',
        6
      )
    ]
  );

  add(
    'transaktion-nosql',
    [
      S(
        'Prüfungsklassiker Winter 2023/24 (17 Punkte!): Relationales Modell ↔ NoSQL / JSON konvertieren',
        `<p>In <b>Winter 2023/24 Teil 1 Aufgabe 3 (17 Punkte)</b> mussten Prüflinge zunächst die Begriffe zwischen relationalen Datenbanken und dokumentenorientierten NoSQL-Datenbanken (wie MongoDB) zuordnen und anschließend eine <code>1:n</code>-Beziehung (<code>Weingut</code> 1:n <code>Verkaufsstelle</code>) in zwei verschiedene JSON-Strukturen überführen:</p>
        <table class="term-table">
          <thead><tr><th>Relationale Datenbank (SQL)</th><th>Dokumentenorientierte NoSQL-DB (z. B. MongoDB)</th></tr></thead>
          <tbody>
            <tr><td>Datenbank (Database)</td><td>Datenbank (Database)</td></tr>
            <tr><td><b>Tabelle (Table / Relation)</b></td><td><b>Collection</b></td></tr>
            <tr><td><b>Datensatz / Zeile (Row / Record / Tupel)</b></td><td><b>Document (JSON / BSON-Dokument)</b></td></tr>
            <tr><td><b>Spalte / Attribut (Column)</b></td><td><b>Field / Key-Value-Paar (Schlüssel-Wert-Paar)</b></td></tr>
            <tr><td>Tabellenverknüpfung (JOIN)</td><td>Einbettung (<b>Embedding</b> / geschachteltes Array) oder Referenzierung (<b>Linking</b>)</td></tr>
          </tbody>
        </table>` +
        C(
`// Variante 1: Eingebettetes JSON-Dokument (Embedding / Denormalisiert)
// Vorteil: Ein Weingut samt allen Verkaufsstellen wird mit EINEM Lesezugriff ohne Join geladen!
{
  "weingut_id": 101,
  "name": "Weingut Sonnenschein",
  "region": "Pfalz",
  "verkaufsstellen": [
    { "vst_id": 1, "ort": "Mainz", "strasse": "Markt 5" },
    { "vst_id": 2, "ort": "Worms", "strasse": "Rheinstr. 12" }
  ]
}

// Variante 2: Normalisiertes JSON mit Fremdschlüssel-Referenz (Linking)
// Vorteil: Keine Redundanz, wenn eine Verkaufsstelle unabhängig aktualisiert oder von mehreren geteilt wird.
{
  "vst_id": 1,
  "ort": "Mainz",
  "strasse": "Markt 5",
  "weingut_id": 101
}`
        ),
        `<p><b>1. احفظ جدول المقابلة عن ظهر قلب (جاء عليه 4 نقاط مباشرة في شتاء 2023):</b></p>
        <ul>
          <li><code>Table</code> (جدول) $\\leftrightarrow$ <code>Collection</code></li>
          <li><code>Row / Record</code> (سطر/سجل) $\\leftrightarrow$ <code>Document</code></li>
          <li><code>Column</code> (عمود/حقل) $\\leftrightarrow$ <code>Field / Key-Value-Pair</code></li>
        </ul>
        <p><b>2. كيف تحول جدولين بينهما علاقة <code>1:n</code> إلى JSON في الامتحان؟</b></p>
        <ul>
          <li><b>الطريقة الأولى (مدمجة / Embedded):</b> تضع كائن الأب (مثلاً <code>Weingut</code>) وبداخله مصفوفة <code>"verkaufsstellen": [ {...}, {...} ]</code> تحتوي كائنات الأبناء.</li>
          <li><b>الطريقة الثانية (مرجعية / Normalized):</b> تفصل كل كائن في وثيقة مستقلة وتضع حقل المفتاح الأجنبي <code>"weingut_id": 101</code> داخل وثيقة الابن.</li>
        </ul>`
      )
    ],
    [
      Q(
        'Gegeben sind die Tabellen Kurs(kurs_id=10, titel="SQL-Profi") und Termin(termin_id=1, datum="2025-05-10", raum="B2", kurs_id=10) sowie (termin_id=2, datum="2025-05-11", raum="B2", kurs_id=10). Stelle den Kurs mit seinen Terminen als EIN eingebettetes JSON-Dokument dar.',
        `{
  "kurs_id": 10,
  "titel": "SQL-Profi",
  "termine": [
    { "termin_id": 1, "datum": "2025-05-10", "raum": "B2" },
    { "termin_id": 2, "datum": "2025-05-11", "raum": "B2" }
  ]
}`,
        'في التمثيل المدمج (Embedded JSON) نحول علاقة 1:n إلى مصفوفة JSON باستخدام الأقواس المربعة [ ] داخل الكائن الرئيسي، ولا نحتاج لتكرار "kurs_id": 10 داخل كل موعد.',
        5
      )
    ]
  );

  add(
    'dateien-api',
    [
      S(
        'HTTP-Request & HTTP-Response im Programmcode aufbauen (Winter 2024/25 — 25 Punkte)',
        `<p>In <b>Winter 2024/25 Teil 2 Aufgabe 2</b> musste eine Methode implementiert werden, die einen HTTP-Request auswertet, eine Datei liest und ein <code>HttpResponse</code>-Objekt samt Statuscode, <code>Content-Type</code> und <code>Content-Length</code> korrekt zurückgibt:</p>
        <ul>
          <li><b>Aufbau einer HTTP-Response:</b> 1. Statuszeile (z. B. <code>HTTP/1.1 200 OK</code> oder <code>404 Not Found</code>), 2. Header-Felder (z. B. <code>Content-Type: text/html; charset=utf-8</code>, <code>Content-Length: 1024</code>), 3. Leerzeile (<code>\\r\\n</code>), 4. Message Body (Nutzdaten).</li>
          <li><b>Typische MIME-Types (<code>Content-Type</code>):</b> <code>text/html</code>, <code>application/json</code>, <code>application/xml</code>, <code>text/csv</code>, <code>image/png</code>, <code>application/pdf</code>.</li>
        </ul>` +
        C(
`// HTTP-Response im Code aufbauen (analog Winter 2024/25)
funktion erzeugeDateiResponse(pfad: String): HttpResponse
  wenn NICHT dateiExistiert(pfad):
     rückgabe neuer HttpResponse(404, "Not Found", "text/plain", "Datei nicht gefunden")

  inhalt = leseDateiBytes(pfad)
  mimeType = "application/octet-stream"
  wenn endetMit(pfad, ".html"): mimeType = "text/html"
  sonst wenn endetMit(pfad, ".json"): mimeType = "application/json"
  sonst wenn endetMit(pfad, ".jpg"): mimeType = "image/jpeg"

  res = neuer HttpResponse(200, "OK")
  res.setHeader("Content-Type", mimeType)
  res.setHeader("Content-Length", toString(inhalt.length))
  res.setBody(inhalt)
  rückgabe res`
        ),
        `<p><b>كيف يُسأل عن HTTP برمجياً في الامتحان؟</b> في شتاء 2024 طُلب كتابة دالة تفحص مسار الملف المطلوب: إذا لم يكن موجوداً تُرجع كود <code>404</code>، وإذا كان موجوداً تحدد نوع الملف <code>Content-Type</code> (مثل <code>text/html</code> أو <code>application/json</code>)، وتحسب حجم المحتوى بالبايت لتضعه في ترويسة <code>Content-Length</code>، ثم تضع المحتوى في الـ <code>Body</code> مع الكود <code>200 OK</code>.</p>`
      )
    ]
  );
})();
