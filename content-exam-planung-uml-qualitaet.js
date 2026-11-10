/* Priority 2 Upgrade: Teil 1 & Übergreifende Themen — UML, Design Patterns in Code, XML/DTD/XSD/RegEx, ISO 25010, TDD, Kerberos, OAuth 2.0, NAS/SAN, Excel & Bildspeicher (2021W–2025W + AkA Katalog 2. Auflage) */
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
  // 1. NEUE KERN-LEKTION: Design Patterns in UML & Code (Observer, Factory, Kategorien)
  // =========================================================================
  L(
    'design-patterns-praxis',
    'uml',
    'Design Patterns in UML & Code: Observer, Factory & SOLID',
    'أنماط التصميم عملياً بالـ UML والكود (Observer, Factory, Strategy) ومبادئ SOLID',
    'Kern',
    'Die großen 18- bis 30-Punkte-Aufgaben aus Sommer 2022, Sommer 2023 und Winter 2024/25 sicher beherrschen.',
    [
      S(
        'Die 3 Kategorien der GoF-Entwurfsmuster (Prüfungsfrage Winter 2024/25)',
        `<p>In <b>Winter 2024/25 Teil 1 Aufgabe 4bb</b> verlangte die IHK die exakte Einteilung von Entwurfsmustern (Design Patterns) in die drei klassischen Kategorien:</p>
        <table class="term-table">
          <thead><tr><th>Kategorie</th><th>Zweck (Prüfer-Schlüsselwörter)</th><th>Wichtigste Vertreter für die AP2</th></tr></thead>
          <tbody>
            <tr><td><b>1. Erzeugungsmuster</b><br>(Creational Patterns)</td><td>Entkoppeln die <b>Objekterzeugung</b> (Instanziierung) von der konkreten Klasse; verbergen das direkte <code>new</code>.</td><td><b>Factory Method</b> (Fabrikmethode), <b>Abstract Factory</b>, <b>Singleton</b>, <b>Builder</b> (Erbauer)</td></tr>
            <tr><td><b>2. Strukturmuster</b><br>(Structural Patterns)</td><td>Regeln die <b>Zusammensetzung von Klassen und Objekten</b> zu größeren Strukturen und passen Schnittstellen an.</td><td><b>Adapter</b> (Wrapper), <b>Facade</b> (Fassade), <b>Decorator</b> (Dekorierer), <b>Composite</b> (Kompositum), <b>Proxy</b></td></tr>
            <tr><td><b>3. Verhaltensmuster</b><br>(Behavioral Patterns)</td><td>Regeln die <b>Algorithmik, Kommunikation und Zuständigkeitsverteilung</b> zwischen zusammenarbeitenden Objekten.</td><td><b>Observer</b> (Beobachter), <b>Strategy</b> (Strategie), <b>Command</b> (Befehl), <b>State</b> (Zustand), <b>Iterator</b></td></tr>
          </tbody>
        </table>`,
        `<p><b>🔴 [امتحان سابق - شتاء 2024/25 الجزء 1 سؤال 4bb]:</b> يُطلب تصنيف أنماط التصميم إلى 3 مجموعات رئيسية:</p>
        <ol>
          <li><b>أنماط الإنشاء (<code>Erzeugungsmuster</code>):</b> مسؤولة عن <b>كيف يُنشأ الكائن</b> دون ربط الكود بـ <code>new</code> مباشرة (مثل <code>Singleton</code>, <code>Factory Method</code>, <code>Builder</code>).</li>
          <li><b>أنماط الهيكلة (<code>Strukturmuster</code>):</b> مسؤولة عن <b>تركيب الأصناف وتكييف الواجهات</b> (مثل <code>Adapter</code> لترجمة واجهة قديمة، <code>Facade</code> لتبسيط نظام معقد، <code>Decorator</code> لإضافة ميزات).</li>
          <li><b>أنماط السلوك (<code>Verhaltensmuster</code>):</b> مسؤولة عن <b>التواصل وتوزيع الخوارزميات</b> بين الكائنات (مثل <code>Observer</code> للإشعار التلقائي، <code>Strategy</code> لتبديل الخوارزميات).</li>
        </ol>`
      ),
      S(
        'Observer-Pattern (Beobachter-Muster) in UML, Code & Sequenzdiagramm (Sommer 2022 — 30 Punkte!)',
        `<p>In <b>Sommer 2022 Teil 1 Aufgabe 3 (30 Punkte!)</b> drehte sich eine komplette Großaufgabe um das <b>Observer-Pattern</b>: Wenn sich der Zustand eines beobachteten Objekts (<code>Subject</code> / <code>ObservedSubject</code>, z. B. eine Ladestation oder Aktie) ändert, sollen alle registrierten Beobachter (<code>Observer</code>, z. B. Abrechnungssystem, Anzeige-App) automatisch benachrichtigt werden, ohne dass das Subject die konkreten Klassen der Beobachter fest einprogrammiert hat (<b>Lose Kopplung</b>).</p>
        <ul>
          <li><b>Subject / ObservedSubject (Abstrakte Klasse oder Interface):</b> Hält eine Liste <code>observerList: List&lt;Observer&gt;</code> und bietet die Methoden <code>registerObserver(o: Observer)</code> (auch <code>attach</code>), <code>unregisterObserver(o: Observer)</code> (<code>detach</code>) und <code>notifyObservers()</code>.</li>
          <li><b>Observer (Interface):</b> Definiert die Methode <code>update()</code> (oder <code>update(neuerZustand)</code>).</li>
          <li><b>Ablauf in <code>notifyObservers()</code>:</b> Eine <code>foreach</code>-Schleife ruft für jeden gespeicherten <code>Observer o</code> in der Liste <code>o.update()</code> auf!</li>
        </ul>` +
        C(
`// Komplettes Observer-Muster in Code (analog Sommer 2022 — 30 Punkte)
interface Observer
  + update(): void

abstrakte klasse ObservedSubject
  - observers: List<Observer> = neue List<Observer>()

  + registerObserver(o: Observer): void
    observers.add(o)

  + unregisterObserver(o: Observer): void
    observers.remove(o)

  # notifyObservers(): void
    für jeden obs in observers:
      obs.update()

klasse Ladestation erweitert ObservedSubject
  - status: String
  + setStatus(neuerStatus: String): void
    this.status = neuerStatus
    this.notifyObservers() // Automatische Benachrichtigung aller Beobachter!
  + getStatus(): String
    rückgabe this.status`
        ),
        `<p><b>🔴 [امتحان سابق - صيف 2022 الجزء 1 سؤال 3 (30 نقطة كاملة!)]:</b> جاء سؤال ضخم يطلب رسم مخطط أصناف UML، ومخطط تتابع <code>Sequenzdiagramm</code>، وكتابة كود لنمط المراقب <b>Observer Pattern</b>:</p>
        <ol>
          <li><b>الفكرة ببساطة:</b> بدلاً من أن يسأل التطبيق محطة الشحن كل ثانية «هل تغيرت حالتك؟» (Polling)، تسجل الشاشات نفسها لدى محطة الشحن عبر <code>registerObserver(o)</code>. وعندما تتغير حالة المحطة تستدعي الدالة <code>notifyObservers()</code> التي تمر بحلقة <code>for</code> على جميع المسجلين وتنادي <code>o.update()</code>.</li>
          <li><b>كيف ترسم الـ Sequenzdiagramm للـ Observer؟</b>
            <ul>
              <li>أولاً: الكائن المراقِب يرسل رسالة <code>registerObserver(this)</code> إلى الـ <code>Subject</code>.</li>
              <li>ثانياً: عند حدوث تغيير، يستدعي الـ <code>Subject</code> دالته الذاتية <code>notifyObservers()</code>، وداخل إطار <b><code>loop [für alle Observer]</code></b> يرسل رسالة <code>update()</code> إلى كل <code>Observer</code>، فيقوم الـ <code>Observer</code> باستدعاء <code>getStatus()</code> لجلب البيانات الجديدة (Pull-Prinzip).</li>
            </ul>
          </li>
        </ol>`
      ),
      S(
        'Factory-Pattern (Fabrikmethode) in UML & Code (Sommer 2023 — 18 Punkte!) + Clean Code / SOLID',
        `<p>In <b>Sommer 2023 Teil 1 Aufgabe 2 (18 Punkte)</b> musste das <b>Factory-Pattern</b> für verschiedene Besuchertypen (<code>StandardBesucher</code>, <code>VIPBesucher</code>, <code>KindBesucher</code>) modelliert und programmiert werden. Statt im Client-Code überall <code>new VIPBesucher()</code> zu verteilen, kapselt eine Fabrik-Methode <code>createBesucher(typ: String): Besucher</code> die Entscheidung und gibt den gemeinsamen Obertyp <code>Besucher</code> zurück.</p>` +
        C(
`// Factory-Muster (analog Sommer 2023 Teil 1 Aufgabe 2)
abstrakte klasse Besucher
  # eintrittspreis: Decimal
  + abstrakt berechnePreis(): Decimal

klasse BesucherFactory
  + {static} createBesucher(typ: String): Besucher
    wenn typ == "VIP":
      rückgabe neuer VIPBesucher()
    sonst wenn typ == "Kind":
      rückgabe neuer KindBesucher()
    sonst wenn typ == "Standard":
      rückgabe neuer StandardBesucher()
    sonst:
      wirf IllegalArgumentException("Unbekannter Besuchertyp: " + typ)`
        ) +
        `<p><b>🔮 [متوقع بقوة للامتحان القادم — كتالوج AkA 2025/2026: SOLID & Clean Code]:</b></p>
        <ul>
          <li><b>S — Single Responsibility Principle (SRP):</b> Jede Klasse hat nur <i>einen einzigen Grund zur Änderung</i> (z. B. Fachberechnung von Datenbank-SQL und PDF-Druck trennen).</li>
          <li><b>O — Open-Closed Principle (OCP):</b> Offen für Erweiterungen (neue Unterklassen/Strategien), geschlossen für Änderungen am bestehenden, getesteten Kerncode.</li>
          <li><b>L — Liskov Substitution Principle (LSP):</b> Jede Unterklasse muss sich überall dort exakt vertragskonform verhalten, wo die Oberklasse erwartet wird.</li>
          <li><b>I — Interface Segregation Principle (ISP):</b> Viele kleine, spezifische Interfaces statt eines riesigen „Gott-Interfaces“.</li>
          <li><b>D — Dependency Inversion Principle (DIP):</b> High-Level-Geschäftslogik hängt nur von <b>Abstraktionen (Interfaces)</b> ab, niemals direkt von konkreten Low-Level-Klassen.</li>
        </ul>`,
        `<p><b>🔴 [امتحان سابق - صيف 2023 الجزء 1 سؤال 2 (18 نقطة)]:</b> كيف تكتب كود ومخطط <b>Factory Pattern</b> في الامتحان؟</p>
        <ul>
          <li>في مخطط UML: ترسم صنفاً مجرداً أو واجهة <code>Besucher</code> ترث منها الأصناف الفرعية (سهم بخط متصل ورأس مثلث فارغ)، وترسم صنف المصنع <code>BesucherFactory</code> يحتوي دالة <code>+ createBesucher(typ: String): Besucher</code>.</li>
          <li>في الكود: الدالة تفحص النص الممرر <code>typ</code> وتُنشئ الكائن المناسب بـ <code>new</code> وتُرجعه من نوع الأب <code>Besucher</code>، وإذا كان النوع غير معروف ترمي استثناءً أو ترجع <code>null</code> حسب نص السؤال.</li>
        </ul>`
      )
    ],
    [
      ['Erzeugungsmuster (Creational)', 'أنماط الإنشاء (Factory, Singleton, Builder)'],
      ['Strukturmuster (Structural)', 'أنماط الهيكلة (Adapter, Facade, Decorator, Proxy)'],
      ['Verhaltensmuster (Behavioral)', 'أنماط السلوك (Observer, Strategy, Command, State)'],
      ['Observer-Pattern (Beobachter)', 'نمط المراقب: إشعار تلقائي لجميع المراقبين المسجلين عند تغير الحالة']
    ],
    [
      Q(
        'Ordne die folgenden 6 Design Patterns den drei Kategorien (Erzeugungsmuster, Strukturmuster, Verhaltensmuster) zu: Singleton, Observer, Adapter, Factory Method, Strategy, Facade.',
        `- Erzeugungsmuster: Singleton, Factory Method
- Strukturmuster: Adapter, Facade
- Verhaltensmuster: Observer, Strategy`,
        'جاء هذا التصنيف مباشرة في امتحان شتاء 2024/25! احفظ كل مجموعة مع مثالين أو ثلاثة عليها.',
        4
      ),
      Q(
        'Eine Wetterstation misst Temperaturwerte. Sobald sich die Temperatur ändert, sollen ein SmartphoneDisplay und ein Warnsystem automatisch aktualisiert werden, ohne dass die Wetterstation deren konkrete Klassen kennt. 1) Welches Entwurfsmuster passt? 2) Welche drei Methoden benötigt die Basisklasse der Wetterstation?',
        `1) Observer-Pattern (Beobachter-Muster).
2) Die Basisklasse (ObservedSubject) benötigt:
- registerObserver(o: Observer) / attach(o: Observer) zum Anmelden
- unregisterObserver(o: Observer) / detach(o: Observer) zum Abmelden
- notifyObservers() zum Benachrichtigen aller registrierten Observer über deren update()-Methode.`,
        'احفظ أسماء الدوال الثلاث القياسية في نمط Observer لأنها تتكرر بنفس الأسماء في نماذج حلول الـ IHK.',
        6
      )
    ],
    [
      'Design Patterns in Erzeugungs-, Struktur- und Verhaltensmuster einteilen',
      'Observer-Pattern als Klassendiagramm, Sequenzdiagramm und Code darstellen',
      'Factory-Pattern und SOLID-Prinzipien an einem Codebeispiel begründen'
    ]
  );

  // =========================================================================
  // 2. NEUE KERN-LEKTION: XML (Wohlgeformt vs. Gültig), DTD, XSD & RegEx
  // =========================================================================
  L(
    'xml-dtd-xsd-regex',
    'daten',
    'XML Wohlgeformtheit vs. Gültigkeit, DTD, XSD & RegEx',
    'قواعد XML (Wohlgeformt مقابل Gültig) وفحص أخطاء DTD وXSD والتعابير النمطية RegEx',
    'Kern',
    'Die 13-Punkte-XML/DTD-Fehlersuche aus Winter 2022/23 und RegEx-Validierung aus dem Prüfungskatalog.',
    [
      S(
        'XML-Prüfungsklassiker (Winter 2022/23 — 13 Punkte!): Wohlgeformt (well-formed) vs. Gültig (valid)',
        `<p>In <b>Winter 2022/23 Teil 1 Aufgabe 3c (13 Punkte)</b> und <b>Sommer 2025</b> wurden XML-Dokumente samt Schema/DTD geprüft. Die IHK unterscheidet dabei strikt zwischen zwei Stufen:</p>
        <table class="term-table">
          <thead><tr><th>Stufe</th><th>Definition (IHK-Prüfer-Schlüsselwörter)</th><th>Typische Fehler im XML-Prüfungstext</th></tr></thead>
          <tbody>
            <tr><td><b>1. Wohlgeformt</b><br>(well-formed)</td><td>Das XML-Dokument hält die <b>allgemeinen syntaktischen Grundregeln von XML</b> ein (ohne DTD/XSD prüfbar).</td><td>
              • Fehlendes schließendes Tag oder vergessenem Schrägstrich <code>&lt;preis&gt;19.99&lt;preis&gt;</code><br>
              • Falsche Verschachtelung (Überlappung): <code>&lt;a&gt;&lt;b&gt;Text&lt;/a&gt;&lt;/b&gt;</code><br>
              • Groß-/Kleinschreibung stimmt nicht überein: <code>&lt;Name&gt;...&lt;/name&gt;</code><br>
              • Mehr als <b>genau ein</b> Wurzelelement (Root-Element)<br>
              • Attributwert nicht in Anführungszeichen: <code>id=101</code> statt <code>id="101"</code>
            </td></tr>
            <tr><td><b>2. Gültig / Valide</b><br>(valid)</td><td>Das XML-Dokument ist <b>wohlgeformt UND</b> entspricht zusätzlich allen Struktur-, Reihenfolge-, Häufigkeits- und Typvorgaben einer zugeordneten <b>DTD</b> oder <b>XSD</b>.</td><td>
              • Ein Element kommt vor, das in der DTD/XSD gar nicht erlaubt ist<br>
              • Pflichtelement oder Pflichtattribut (<code>#REQUIRED</code>) fehlt<br>
              • Reihenfolge der Kindelemente weicht von der DTD-Sequenz ab<br>
              • Datenwert verletzt den XSD-Datentyp (z. B. Text <code>"abc"</code> in <code>xs:integer</code>)
            </td></tr>
          </tbody>
        </table>
        <p><b>⚠️ Wichtige Logikregel für die Prüfung:</b> Ein Dokument, das <i>nicht wohlgeformt</i> ist, kann <b>niemals gültig (valide)</b> sein! Aber ein wohlgeformtes Dokument kann trotzdem <i>ungültig</i> sein, wenn es gegen die DTD/XSD verstößt.</p>`,
        `<p><b>🔴 [امتحان سابق - شتاء 2022/23 الجزء 1 سؤال 3c (13 نقطة كاملة!)]:</b> أعطاهم ملف XML مع ملف DTD وطلب استخراج 6 أخطاء وتحديد رقم السطر وتصنيف كل خطأ: هل هو خطأ <b>Wohlgeformtheit</b> أم خطأ <b>Gültigkeit</b>؟</p>
        <ol>
          <li><b>حَسَن الصياغة (<code>Wohlgeformt</code>):</b> يلتزم بقواعد لغة XML الأساسية نفسها: يوجد عنصر جذر واحد فقط (Root)، كل وسم مفتوح له وسم إغلاق يطابقه بالحروف الكبيرة والصغيرة <code>&lt;Tag&gt;...&lt;/Tag&gt;</code>، لا يوجد تقاطع في التداخل، وقيم الخصائص داخل علامتي تنصيص <code>"..."</code>.</li>
          <li><b>صالح/مُتحقق (<code>Gültig / Valide</code>):</b> هو ملف <code>wohlgeformt</code> <b>وبالإضافة إلى ذلك</b> يطابق تماماً الشروط المكتوبة في ملف الـ <b>DTD</b> أو الـ <b>XSD</b> (ترتيب العناصر، عدد مرات التكرار، أسماء العناصر المسموحة، وأنواع البيانات).</li>
        </ol>`
      ),
      S(
        'DTD (Document Type Definition) & XSD (XML Schema) lesen und Fehler finden',
        `<p>Damit du in der Prüfung (wie in <b>Winter 2022/23</b>) eine DTD oder XSD sofort lesen kannst, musst du die Quantifizierer und Schlüsselwörter kennen:</p>` +
        C(
`<!-- 1. DTD-Syntax lesen (analog Winter 2022/23) -->
<!ELEMENT buchhaltung (rechnung+)>                 <!-- + : mindestens 1-mal (1..n) -->
<!ELEMENT rechnung (kunde, position+, rabatt?)>    <!-- , : feste Reihenfolge! ? : optional (0..1) -->
<!ATTLIST rechnung
          nr ID #REQUIRED                          <!-- #REQUIRED : Pflichtattribut -->
          waehrung CDATA "EUR"                     <!-- Standardwert "EUR" -->
          status (offen|bezahlt|storniert) #IMPLIED> <!-- #IMPLIED : optionales Attribut -->
<!ELEMENT kunde (#PCDATA)>                         <!-- #PCDATA : normaler Textinhalt -->
<!-- Weitere DTD-Symbole: * = beliebig oft (0..n), | = Auswahl (ODER), EMPTY = leeres Element -->

<!-- 2. XSD-Syntax lesen (XML Schema Definition — unterstützt echte Datentypen!) -->
<xs:element name="rechnung">
  <xs:complexType>
    <xs:sequence> <!-- feste Reihenfolge -->
      <xs:element name="kunde" type="xs:string" minOccurs="1" maxOccurs="1"/>
      <xs:element name="betrag" type="xs:decimal"/>
      <xs:element name="datum" type="xs:date" minOccurs="0"/> <!-- optional -->
    </xs:sequence>
    <xs:attribute name="nr" type="xs:integer" use="required"/>
  </xs:complexType>
</xs:element>`
        ) +
        `<p><b>Vorteile von XSD gegenüber DTD (beliebte Theoriefrage):</b> 1. XSD ist selbst in gültiger XML-Syntax geschrieben, 2. XSD unterstützt präzise Datentypen (<code>xs:integer</code>, <code>xs:decimal</code>, <code>xs:date</code> statt nur Text <code>#PCDATA</code>), 3. XSD erlaubt exakte Häufigkeiten (z. B. <code>minOccurs="2" maxOccurs="5"</code>) und Namespaces.</p>`,
        `<p><b>كيف تقرأ رموز DTD و XSD في 30 ثانية؟</b></p>
        <ul>
          <li>في <b>DTD</b>: الرمز <code>?</code> يعني اختياري (0 أو 1)، الرمز <code>+</code> يعني واحد على الأقل (1 أو أكثر)، الرمز <code>*</code> يعني صفر أو أكثر، الفاصلة <code>(a, b, c)</code> تعني <b>ترتيب إجباري</b>، والخط العمودي <code>(a | b)</code> يعني اختيار أحدهما، و<code>#REQUIRED</code> تعني خاصية إجبارية، و<code>#IMPLIED</code> تعني خاصية اختيارية.</li>
          <li>في <b>XSD</b>: الافتراضي لـ <code>minOccurs</code> و<code>maxOccurs</code> هو <code>1</code>! فإذا لم يُكتب شيء فالعنصر إجباري مرة واحدة فقط. أما <code>maxOccurs="unbounded"</code> فتعني بلا حد أقصى.</li>
        </ul>`
      ),
      S(
        '🔮 Reguläre Ausdrücke (RegEx) für Eingabevalidierung (Katalogthema Teil 1 & Teil 2)',
        `<p>Im Prüfungskatalog stehen <b>Reguläre Ausdrücke (Regular Expressions)</b> zur Prüfung von Benutzereingaben (z. B. Postleitzahl, Artikelnummer, Datum, E-Mail oder Passwort-Regeln, auch in XSD via <code>&lt;xs:pattern value="..."/&gt;</code>):</p>
        <table class="term-table">
          <thead><tr><th>RegEx-Baustein</th><th>Bedeutung</th><th>Prüfungsbeispiel</th></tr></thead>
          <tbody>
            <tr><td><code>^</code> und <code>$</code></td><td>Anfang (<code>^</code>) und Ende (<code>$</code>) der Zeichenkette</td><td><code>^[0-9]{5}$</code> $\\rightarrow$ exakt 5 Ziffern (deutsche PLZ)</td></tr>
            <tr><td><code>[0-9]</code> oder <code>\\d</code></td><td>Eine einzelne Ziffer von 0 bis 9</td><td><code>^DE[0-9]{2}$</code> $\\rightarrow$ z. B. <code>DE45</code></td></tr>
            <tr><td><code>[a-zA-Z]</code>, <code>[A-ZÄÖÜ]</code></td><td>Ein Buchstabe aus dem angegebenen Bereich</td><td><code>^[A-Z]{2}-[0-9]{4}$</code> $\\rightarrow$ z. B. <code>AB-1234</code></td></tr>
            <tr><td><code>?</code>, <code>+</code>, <code>*</code></td><td><code>?</code> = 0 oder 1, <code>+</code> = mind. 1, <code>*</code> = 0 bis beliebig viele</td><td><code>^[a-z]+@[a-z]+\\.[a-z]{2,4}$</code></td></tr>
            <tr><td><code>{n}</code>, <code>{n,m}</code></td><td>Exakt <code>n</code>-mal bzw. zwischen <code>n</code> und <code>m</code>-mal</td><td><code>^[A-Za-z0-9]{8,20}$</code> $\\rightarrow$ 8 bis 20 Zeichen</td></tr>
            <tr><td><code>\\.</code> (Backslash)</td><td>Maskiert Sonderzeichen (Punkt steht sonst für „jedes beliebige Zeichen“)</td><td><code>\\.pdf$</code> $\\rightarrow$ endet auf <code>.pdf</code></td></tr>
          </tbody>
        </table>`,
        `<p><b>🔮 [متوقع للامتحان القادم — التعابير النمطية RegEx]:</b> قد يُعطيك في الامتحان تعبيراً نمطياً مثل <code>^[A-Z]{2}[0-9]{3,5}$</code> ويسألك أي النصوص يقبلها، أو يطلب منك كتابة RegEx لرمز بريدي ألماني أو رقم موظف:</p>
        <ul>
          <li><code>[A-Z]{2}</code> = حرفان كبيران بالضبط.</li>
          <li><code>[0-9]{3,5}</code> = من 3 إلى 5 أرقام.</li>
          <li><code>^</code> في البداية و<code>$</code> في النهاية يضمنان ألا يحتوي النص على أي حروف إضافية قبل أو بعد النمط.</li>
        </ul>`
      )
    ],
    [
      ['Wohlgeformtheit (well-formed)', 'سلامة الصياغة الأساسية لملف XML (الأقواس، التداخل، جذر واحد)'],
      ['Gültigkeit (valid)', 'مطابقة ملف XML لقواعد الـ DTD أو الـ XSD المرفقة'],
      ['DTD (Document Type Definition)', 'تعريف بنية XML باستخدام ELEMENT و ATTLIST'],
      ['Regulärer Ausdruck (RegEx)', 'نمط نصي للتحقق من صيغ المدخلات (مثل البريد والرمز البريدي)']
    ],
    [
      Q(
        'Gegeben ist die DTD: <!ELEMENT artikel (name, preis)> <!ELEMENT name (#PCDATA)> <!ELEMENT preis (#PCDATA)> <!ATTLIST artikel id ID #REQUIRED>. Prüfe die zwei XML-Ausschnitte und klassifiziere den jeweiligen Fehler als "nicht wohlgeformt" oder "wohlgeformt, aber ungültig":\n(a) <artikel id="A1"><name>Maus<name><preis>19.99</preis></artikel>\n(b) <artikel><preis>19.99</preis><name>Maus</name></artikel>',
        `(a) Nicht wohlgeformt (und damit auch nicht gültig): Beim zweiten <name> fehlt der Schrägstrich für das schließende Tag (muss </name> heißen).
(b) Wohlgeformt, aber ungültig (nicht valide gegen die DTD) aus zwei Gründen: 1. Das Pflichtattribut id (#REQUIRED) im Element <artikel> fehlt. 2. Die vorgeschriebene Reihenfolge (name, preis) wurde vertauscht.`,
        'هذا يطابق تماماً أسلوب التصحيح في شتاء 2022/23! انتبه للتفريق الدقيق بين خطأ إغلاق الوسم (Wohlgeformtheit) وخطأ الترتيب أو نقص خاصية إجبارية (Gültigkeit).',
        6
      ),
      Q(
        'Entwirf einen regulären Ausdruck (RegEx) für eine Personalnummer, die mit "PN-" beginnt, gefolgt von genau einem Großbuchstaben (A-Z) und anschließend 4 bis 6 Ziffern.',
        `^PN-[A-Z][0-9]{4,6}$`,
        'ابدأ بـ ^ ثم النص الثابت PN- ثم [A-Z] لحرف كبير واحد، ثم [0-9]{4,6} للأرقام من 4 إلى 6، وأغلق بـ $.',
        4
      )
    ],
    [
      'XML-Fehler sicher in Wohlgeformtheit vs. Gültigkeit einteilen',
      'DTD- und XSD-Definitionen lesen und Vorteile von XSD nennen',
      'Reguläre Ausdrücke (RegEx) lesen und für einfache Formularregeln erstellen'
    ]
  );

  // =========================================================================
  // 3. NEUE KERN-LEKTION: ISO/IEC 25010, TDD, F.I.R.S.T., INVEST & Kontrollflussgraph
  // =========================================================================
  L(
    'qualitaet-iso25010-tdd',
    'qualitaet',
    'ISO/IEC 25010, TDD, F.I.R.S.T., INVEST & Kontrollflussgraphen',
    'معيار الجودة ISO 25010 والتطوير القائم على الاختبار TDD ومبادئ FIRST وINVEST ومخطط التدفق',
    'Kern',
    'Alle neuen Qualitätsthemen aus der 2. Auflage des AkA-Prüfungskatalogs (ab Sommer 2025) plus White-Box-Pfadtests.',
    [
      S(
        '🔮 ISO/IEC 25010: Die 8 Qualitätsmerkmale von Softwareprodukten (Neuer AkA-Katalog 2025)',
        `<p>In der <b>2. Auflage des AkA-Prüfungskatalogs (gültig ab Sommer 2025)</b> ist die Norm <b>ISO/IEC 25010</b> (Nachfolger von ISO 9126) explizit verankert. In der Prüfung musst du Kundenanforderungen einem der <b>8 Produktqualitätsmerkmale</b> zuordnen oder zu einem Merkmal eine messbare Anforderung formulieren:</p>
        <table class="term-table">
          <thead><tr><th>Nr.</th><th>Qualitätsmerkmal (ISO/IEC 25010)</th><th>Teilmerkmale & typisches Prüfungsbeispiel</th></tr></thead>
          <tbody>
            <tr><td>1</td><td><b>Funktionale Eignung</b><br>(Functional Suitability)</td><td>Vollständigkeit, Korrektheit, Angemessenheit (z. B. <i>„Rabatt und MwSt. werden auf den Cent genau berechnet“</i>).</td></tr>
            <tr><td>2</td><td><b>Leistungseffizienz</b><br>(Performance Efficiency)</td><td>Zeitverhalten, Ressourcenverbrauch, Kapazität (z. B. <i>„Antwortzeit &lt; 500 ms bei 1.000 gleichzeitigen Zugriffen“</i>).</td></tr>
            <tr><td>3</td><td><b>Kompatibilität</b><br>(Compatibility)</td><td>Koexistenz, <b>Interoperabilität</b> (z. B. <i>„Datenaustausch mit dem SAP-System über REST-JSON-Schnittstelle“</i>).</td></tr>
            <tr><td>4</td><td><b>Benutzbarkeit / Gebrauchstauglichkeit</b><br>(Usability / Interaction Capability)</td><td>Erlernbarkeit, Bedienbarkeit, Schutz vor Benutzerfehlern, Ästhetik, <b>Barrierefreiheit</b>.</td></tr>
            <tr><td>5</td><td><b>Zuverlässigkeit</b><br>(Reliability)</td><td>Reife, <b>Verfügbarkeit</b> (z. B. 99,9 %), <b>Fehlertoleranz</b>, <b>Wiederherstellbarkeit</b> nach Absturz.</td></tr>
            <tr><td>6</td><td><b>IT-Sicherheit</b><br>(Security)</td><td>Vertraulichkeit, Integrität, Nichtabstreitbarkeit, Zurechenbarkeit, Authentizität.</td></tr>
            <tr><td>7</td><td><b>Wartbarkeit / Änderbarkeit</b><br>(Maintainability)</td><td>Modularität, Wiederverwendbarkeit, Analysierbarkeit, Modifizierbarkeit, <b>Testbarkeit</b>.</td></tr>
            <tr><td>8</td><td><b>Übertragbarkeit</b><br>(Portability)</td><td>Anpassbarkeit, Installierbarkeit, Austauschbarkeit (z. B. <i>„Läuft unter Windows, Linux und im Docker-Container“</i>).</td></tr>
          </tbody>
        </table>`,
        `<p><b>🔮 [موضوع جديد ومؤكد في كتالوج AkA المحدث 2025/2026 — معيار ISO/IEC 25010]:</b></p>
        <p>هذا المعيار يحدد <b>الخصائص الثماني لجودة البرمجيات</b>. كيف يأتي السؤال في الامتحان؟ يُعطيك جدولاً فيه جمل من دفتر الشروط (<code>Lastenheft</code>) ويطلب منك كتابة اسم معيار الجودة الموافق لكل جملة:</p>
        <ul>
          <li>سرعة الاستجابة واستهلاك الرام $\\leftarrow$ <b>Leistungseffizienz</b>.</li>
          <li>تبادل البيانات مع نظام آخر بسهولة $\\leftarrow$ <b>Kompatibilität (Interoperabilität)</b>.</li>
          <li>نسبة التوافر 99.9% واسترجاع البيانات بعد انقطاع الكهرباء $\\leftarrow$ <b>Zuverlässigkeit</b>.</li>
          <li>سهولة تعديل الكود واختباره وتقسيمه لوحدات $\\leftarrow$ <b>Wartbarkeit</b>.</li>
          <li>تشغيل البرنامج على أنظمة تشغيل متعددة $\\leftarrow$ <b>Übertragbarkeit (Portabilität)</b>.</li>
        </ul>`
      ),
      S(
        'TDD (Test-Driven Development), F.I.R.S.T.-Prinzipien (Sommer 2022) & INVEST (Winter 2023/24)',
        `<p>Im neuen Prüfungskatalog steht explizit <b>TDD (Testgetriebene Entwicklung)</b>. Zusammen mit den in <b>Sommer 2022</b> geprüften <b>F.I.R.S.T.-Regeln</b> für gute Unit-Tests und den in <b>Winter 2023/24</b> geprüften <b>INVEST-Kriterien</b> für User Stories bilden sie das Dreieck moderner agiler Qualitätssicherung:</p>
        <ul>
          <li><b>TDD-Zyklus (Red – Green – Refactor):</b>
            <ol>
              <li><b>Red:</b> Zuerst einen automatisierten Unit-Test für die neue Anforderung schreiben, bevor der Produktionscode existiert $\\rightarrow$ Test schlägt fehl (rot).</li>
              <li><b>Green:</b> Nur so viel minimalen Produktionscode schreiben, bis der Test erfolgreich durchläuft (grün).</li>
              <li><b>Refactor:</b> Den Code bereinigen (Duplikate entfernen, Struktur/Namen verbessern), während die Tests grün bleiben!</li>
            </ol>
          </li>
          <li><b>🔴 F.I.R.S.T.-Prinzipien für Unit-Tests (Sommer 2022 Teil 2 Aufgabe 2ab — 4 Punkte):</b>
            <ul>
              <li><b>F — Fast (Schnell):</b> Tests müssen in Millisekunden laufen, damit sie ständig ausgeführt werden.</li>
              <li><b>I — Independent / Isolated (Unabhängig):</b> Kein Test darf vom Ergebnis oder der Reihenfolge eines anderen Tests abhängen.</li>
              <li><b>R — Repeatable (Wiederholbar):</b> Liefert in jeder Umgebung und zu jeder Zeit dasselbe deterministische Ergebnis (keine Abhängigkeit von echter Uhrzeit/Zufall/externer DB $\\rightarrow$ Mocks nutzen!).</li>
              <li><b>S — Self-Validating (Selbstprüfend):</b> Liefert automatisch Pass/Fail (<code>assertEquals</code>) ohne manuelles Durchlesen von Konsolenausgaben.</li>
              <li><b>T — Timely / Thorough (Rechtzeitig / Gründlich):</b> Direkt mit (oder bei TDD <i>vor</i>) dem Produktionscode geschrieben, deckt Grenzwerte ab.</li>
            </ul>
          </li>
          <li><b>🔴 INVEST-Kriterien für gute User Stories (Winter 2023/24 Teil 1 Aufgabe 2ac — 3 Punkte):</b>
            <b>I</b>ndependent (unabhängig), <b>N</b>egotiable (verhandelbar), <b>V</b>aluable (wertstiftend für den Nutzer/Kunden), <b>E</b>stimable (schätzbar), <b>S</b>mall (klein genug für einen Sprint), <b>T</b>estable (überprüfbar durch Akzeptanzkriterien).</li>
        </ul>`,
        `<p><b>احفظ هذه المبادئ الثلاثة لأنها تأتي كأسئلة نقاط سريعة ومضمونة:</b></p>
        <ol>
          <li><b>دورة TDD (Red $\\rightarrow$ Green $\\rightarrow$ Refactor):</b> نكتب الاختبار <b>قبل</b> كتابة كود الوظيفة! يفشل أولاً (أحمر)، ثم نكتب أبسط كود لينجح الاختبار (أخضر)، ثم نحسّن نظافة الكود (Refactor) مع بقاء الاختبار أخضر.</li>
          <li><b>مبادئ F.I.R.S.T. لاختبارات الوحدة (جاءت في صيف 2022):</b> <code>Fast</code> (سريع)، <code>Independent</code> (مستقل لا يعتمد على ترتيب التنفيذ)، <code>Repeatable</code> (قابل للتكرار بنفس النتيجة دائماً)، <code>Self-Validating</code> (يتحقق تلقائياً عبر Assert)، <code>Timely</code> (يُكتب في الوقت المناسب).</li>
          <li><b>معايير INVEST لقصص المستخدم User Stories (جاءت في شتاء 2023/24):</b> <code>Independent</code>, <code>Negotiable</code>, <code>Valuable</code>, <code>Estimable</code>, <code>Small</code>, <code>Testable</code>.</li>
        </ol>`
      ),
      S(
        'Kontrollflussgraph (CFG) & White-Box-Pfadüberdeckung (Sommer 2024 — 5 Punkte)',
        `<p>In <b>Sommer 2024 Teil 2 Aufgabe 3c</b> sowie <b>Winter 2025/26</b> wurde ein Programmcode in Blöcke/Knoten (z. B. Bedingungen <code>B1, B2, B3</code> und Anweisungen <code>A1, A2, A3</code>) zerlegt. Gesucht waren alle unabhängigen Pfade durch den Kontrollflussgraphen sowie konkrete Testdaten:</p>
        <ul>
          <li><b>Anweisungsüberdeckung (C0 — Statement Coverage):</b> Jede Anweisung (jeder Knoten <code>A1..An</code>) wird mindestens einmal ausgeführt. (Schwächstes Kriterium: erkennt fehlende <code>else</code>-Zweige nicht!).</li>
          <li><b>Zweigüberdeckung (C1 — Branch Coverage):</b>ede Kante (jeder <code>true</code>- und <code>false</code>-Ausgang jeder Bedingung, auch leere <code>else</code>-Kanten!) wird mindestens einmal durchlaufen.</li>
          <li><b>Pfadüberdeckung (C2 — Path Coverage):</b> Jede mögliche Kombination von Teilpfaden vom Start bis zum Ende wird getestet.</li>
        </ul>` +
        C(
`// Beispiel (analog Sommer 2024 Teil 2 Aufgabe 3c):
// B1: wenn (bestellwert >= 100)
//       A1: versand = 0
//     sonst:
//       A2: versand = 5
// B2: wenn (express == true)
//       A3: versand = versand + 10
// A4: rückgabe versand

// Alle 4 möglichen Pfade für 100% Pfadüberdeckung (2 * 2 = 4 Pfade):
// Pfad 1 (B1=wahr,   B2=wahr):   B1 -> A1 -> B2 -> A3 -> A4  (Testfall: 120 €, express=true  -> 10 €)
// Pfad 2 (B1=wahr,   B2=falsch): B1 -> A1 -> B2 -> A4        (Testfall: 120 €, express=false ->  0 €)
// Pfad 3 (B1=falsch, B2=wahr):   B1 -> A2 -> B2 -> A3 -> A4  (Testfall:  50 €, express=true  -> 15 €)
// Pfad 4 (B1=falsch, B2=falsch): B1 -> A2 -> B2 -> A4        (Testfall:  50 €, express=false ->  5 €)`
        ),
        `<p><b>🔴 [امتحان سابق - صيف 2024 الجزء 2 سؤال 3c]:</b> كيف تستخرج جميع المسارات (<code>Pfade</code>) في سؤال <b>Kontrollflussgraph</b>؟</p>
        <ul>
          <li>إذا كان لديك شرطان متتاليان مستقلان (<code>B1</code> ثم <code>B2</code>)، فعدد المسارات الكلية لتغطية المسارات (<code>Pfadüberdeckung</code>) هو $2 \\times 2 = 4$ مسارات: (صح/صح، صح/خطأ، خطأ/صح، خطأ/خطأ).</li>
          <li>أما لتغطية الفروع (<code>Zweigüberdeckung C1</code>) لنفس المثال، فيكفي اختباران اثنان فقط: مثلاً المسار 1 (صح/صح) والمسار 4 (خطأ/خطأ) لأنهما يمران بكل فرع من الفروع الأربعة مرة واحدة على الأقل!</li>
        </ul>`
      )
    ],
    [
      ['ISO/IEC 25010', 'المعيار الدولي لجودة البرمجيات (8 خصائص رئيسية)'],
      ['TDD (Test-Driven Development)', 'التطوير القائم على الاختبار: كتابة الاختبار قبل الكود (Red-Green-Refactor)'],
      ['F.I.R.S.T.-Prinzipien', 'خصائص اختبارات الوحدة الجيدة (Fast, Independent, Repeatable, Self-Validating, Timely)'],
      ['Kontrollflussgraph (CFG)', 'مخطط تدفق التحكم لتمثيل الشروط والمسارات في اختبارات الصندوق الأبيض']
    ],
    [
      Q(
        'Im Codebeispiel (B1: bestellwert >= 100 mit A1/A2, danach B2: express == true mit A3, kein else bei B2, Abschluss A4): Wie viele Testfälle benötigt man minimal für (a) 100 % Anweisungsüberdeckung (C0), (b) 100 % Zweigüberdeckung (C1) und (c) 100 % Pfadüberdeckung?',
        `(a) 100 % Anweisungsüberdeckung (C0): 2 Testfälle (z. B. Pfad 1: B1->A1->B2->A3->A4 und Pfad 4: B1->A2->B2->A4, damit A1, A2, A3 und A4 alle erreicht werden).
(b) 100 % Zweigüberdeckung (C1): Ebenfalls 2 Testfälle (Pfad 1 testet B1=true und B2=true; Pfad 4 testet B1=false und die leere else-Kante B2=false).
(c) 100 % Pfadüberdeckung: Alle 4 Pfade (4 Testfälle), da beide Ausgänge von B1 mit beiden Ausgängen von B2 kombiniert werden müssen.`,
        'تمييز عدد الاختبارات اللازمة لـ C0 و C1 وتغطية المسارات هو سؤال كلاسيكي يتكرر باستمرار.',
        6
      ),
      Q(
        'Ordne die drei Anforderungen den passenden Qualitätsmerkmalen nach ISO/IEC 25010 zu:\n1) "Die Software muss nach einem Stromausfall innerhalb von 2 Minuten wieder betriebsbereit sein."\n2) "Ein neuer Zahlungsdienstleister soll sich ohne Änderung bestehender Klassen innerhalb von 4 Stunden einbinden lassen."\n3) "Das System muss Rechnungsdaten im ZUGFeRD-Format mit dem Steuerbüro austauschen können."',
        `1) Zuverlässigkeit (Untermerkmal: Wiederherstellbarkeit / Verfügbarkeit)
2) Wartbarkeit / Änderbarkeit (Untermerkmal: Erweiterbarkeit / Modularität)
3) Kompatibilität (Untermerkmal: Interoperabilität)`,
        'ربط الجملة العملية بالاسم الرسمي من معيار ISO/IEC 25010 يعطيك العلامة الكاملة فوراً.',
        5
      )
    ],
    [
      'Alle 8 Qualitätsmerkmale der ISO/IEC 25010 zuordnen',
      'TDD (Red-Green-Refactor), F.I.R.S.T. und INVEST erklären',
      'Kontrollflussgraph zeichnen und Pfade für C0, C1 und Pfadüberdeckung ableiten'
    ]
  );

  // =========================================================================
  // 4. NEUE KERN-LEKTION: Kerberos, OAuth 2.0, NAS vs. SAN, Excel & Bildspeicher
  // =========================================================================
  L(
    'auth-kerberos-oauth-storage',
    'sicherheit',
    'Kerberos, OAuth 2.0, NAS vs. SAN, Excel & Bildspeicher',
    'بروتوكول Kerberos وتدفق OAuth 2.0 ومقارنة NAS/SAN وصيغ Excel وحساب حجم الصور',
    'Kern',
    'Neue Katalogthemen (Kerberos, SSO, NAS/SAN) und die Punktebringer aus 2021W, 2022S, 2023S und 2023W.',
    [
      S(
        '🔮 Kerberos & Single Sign-On (SSO) vs. OAuth 2.0 Authorization Code Flow (Sommer 2022 & Katalog 2025)',
        `<p>Im aktualisierten <b>AkA-Prüfungskatalog (2. Auflage ab Sommer 2025)</b> steht explizit <b>Kerberos</b> und <b>Single Sign-On (SSO)</b>; in <b>Sommer 2022 Teil 1 Aufgabe 4b</b> wurde der <b>OAuth 2.0 Ablauf</b> als Sequenzdiagramm geprüft:</p>
        <table class="term-table">
          <thead><tr><th>Protokoll / Konzept</th><th>Rollen & Komponenten</th><th>Ablauf Schritt für Schritt (Prüfungsantworten)</th></tr></thead>
          <tbody>
            <tr><td><b>Kerberos (v5)</b><br>(Netzwerk-Authentifizierung & SSO, z. B. Active Directory)</td><td>
              • <b>Client (User)</b><br>
              • <b>KDC (Key Distribution Center)</b> bestehend aus:<br>
              &nbsp;&nbsp;1. <b>AS</b> (Authentication Server)<br>
              &nbsp;&nbsp;2. <b>TGS</b> (Ticket Granting Server)<br>
              • <b>Ziel-Server (Dienst/Fileserver)</b>
            </td><td>
              1. Client meldet sich beim <b>AS</b> an $\\rightarrow$ erhält verschlüsseltes <b>TGT (Ticket Granting Ticket)</b> + Sitzungsschlüssel.<br>
              2. Will der Client auf einen Dienst zugreifen, sendet er das <b>TGT</b> an den <b>TGS</b> (ohne Passwort neu einzugeben = <b>SSO!</b>).<br>
              3. <b>TGS</b> prüft TGT und stellt ein <b>Service-Ticket (ST)</b> für den Ziel-Server aus.<br>
              4. Client legt das <b>Service-Ticket</b> beim Ziel-Server vor und erhält Zugriff.<br>
              <i>Wichtig:</i> Arbeitet mit symmetrischer Verschlüsselung und <b>Zeitstempeln</b> (Schutz gegen Replay-Angriffe $\\rightarrow$ synchrone Systemuhren per NTP nötig!).
            </td></tr>
            <tr><td><b>OAuth 2.0</b><br>(Autorisierungs-Framework — Sommer 2022)</td><td>
              1. <b>Resource Owner</b> (Nutzer)<br>
              2. <b>Client</b> (Drittanbieter-App)<br>
              3. <b>Authorization Server</b><br>
              4. <b>Resource Server</b> (API)
            </td><td>
              1. <b>Authorization Request:</b> Client leitet Resource Owner zum Authorization Server.<br>
              2. <b>Authorization Grant (Auth. Code):</b> Nutzer stimmt zu; Client erhält kurzlebigen <code>Authorization Code</code>.<br>
              3. <b>Access Token Request & Response:</b> Client tauscht <code>Auth. Code</code> (+ Client Secret) beim Authorization Server gegen ein <b><code>Access Token</code></b> (und optional <code>Refresh Token</code>).<br>
              4. <b>Protected Resource:</b> Client ruft mit dem <code>Access Token</code> im Header (<code>Authorization: Bearer ...</code>) die Daten vom Resource Server ab.
            </td></tr>
          </tbody>
        </table>`,
        `<p><b>🔮 [مهم جداً للامتحان القادم — Kerberos (كتالوج 2025) + OAuth 2.0 (صيف 2022)]:</b></p>
        <ol>
          <li><b>كيف يعمل Kerberos في 3 خطوات (Single Sign-On)؟</b>
            <ul>
              <li>المستخدم يثبت هويته مرة واحدة عند خادم المصادقة <b>AS</b> (جزء من مركز توزيع المفاتيح <b>KDC</b>)، فيحصل على تذكرة رئيسية اسمها <b>TGT (Ticket Granting Ticket)</b>.</li>
              <li>عندما يريد فتح ملفات أو طابعة، يرسل الـ <b>TGT</b> إلى خادم منح التذاكر <b>TGS</b> فيعطيه تذكرة خدمة <b>Service Ticket</b> دون طلب كلمة المرور مرة أخرى!</li>
              <li>يقدم <b>Service Ticket</b> للخادم الهدف فيسمح له بالدخول. (يعتمد على التشفير المتناظر والطوابع الزمنية <code>Timestamps</code> لمنع هجمات إعادة الإرسال <code>Replay Attacks</code>).</li>
            </ul>
          </li>
          <li><b>كيف تكمل مخطط OAuth 2.0 (كما جاء في صيف 2022)؟</b> احفظ الترتيب الرباعي: 1) طلب تفويض <code>Authorization Request</code> $\\leftarrow$ 2) استلام كود مؤقت <code>Authorization Code</code> $\\leftarrow$ 3) تبديل الكود بـ <code>Access Token</code> من الـ Authorization Server $\\leftarrow$ 4) إرسال الـ <code>Access Token</code> إلى الـ Resource Server لجلب البيانات المحمية.</li>
        </ol>`
      ),
      S(
        '🔮 Speicherarchitekturen: DAS vs. NAS vs. SAN (AkA-Katalog 2. Auflage) & Bildspeicher-Rechnung (Winter 2023/24)',
        `<p>Im neuen Prüfungskatalog stehen explizit <b>NAS (Network Attached Storage)</b> und <b>SAN (Storage Area Network)</b>; in <b>Winter 2023/24 Teil 2 Aufgabe 3b (7 Punkte)</b> musste der Speicherbedarf unkomprimierter Kamerabilder in <b>GiB</b> berechnet werden:</p>
        <table class="term-table">
          <thead><tr><th>Speicherlösung</th><th>Zugriffsebene & Dateisystem</th><th>Typische Protokolle & Einsatz</th></tr></thead>
          <tbody>
            <tr><td><b>DAS</b><br>(Direct Attached Storage)</td><td><b>Blockebene</b>, direkt am einzelnen Server angeschlossen (kein Netzwerk).</td><td>SATA, SAS, NVMe, USB. Nur für diesen einen Host direkt nutzbar.</td></tr>
            <tr><td><b>NAS</b><br>(Network Attached Storage)</td><td><b>Dateiebene (File-Level)!</b> Das NAS verwaltet das Dateisystem selbst; Clients greifen über das normale LAN auf freigegebene Ordner zu.</td><td><b>SMB / CIFS</b> (Windows), <b>NFS</b> (Linux), AFP. Ideal für gemeinsame Dokumentenablagen im Büro.</td></tr>
            <tr><td><b>SAN</b><br>(Storage Area Network)</td><td><b>Blockebene (Block-Level)!</b> Hochgeschwindigkeits-Speichernetzwerk; der Server sieht das SAN-Volume wie eine lokale Festplatte und formatiert das Dateisystem selbst.</td><td><b>Fibre Channel (FC)</b>, <b>iSCSI</b>, FCoE. Ideal für große Datenbankserver und Virtualisierungs-Cluster (VMware/Hyper-V) mit extrem niedriger Latenz.</td></tr>
          </tbody>
        </table>
        <p><b>🔴 Rechenrezept Bild-/Speicherbedarf (Winter 2023/24 Teil 2 Aufgabe 3b — 7 Punkte):</b></p>
        <p>Aufgabe aus 2023W: Eine Kamera liefert Bilder mit <code>20 Megapixeln</code> (20.000.000 Pixel) und <code>8 Bit Farbtiefe je Farbkanal</code> bei <code>3 Farbkanälen (RGB)</code>. Pro Woche fallen <code>200 Bilder</code> in <code>52 Wochen</code> an. Berechne den Speicherbedarf in <b>GiB</b> (auf 2 Nachkommastellen):</p>` +
        C(
`1. Speicher pro Bild in Bit  = 20.000.000 Pixel * 8 Bit * 3 Kanäle = 480.000.000 Bit
2. Speicher pro Bild in Byte = 480.000.000 / 8 = 60.000.000 Byte (60 MB)
3. Gesamtbytes pro Jahr      = 60.000.000 Byte * 200 * 52 = 624.000.000.000 Byte
4. Umrechnung in GiB (÷ 1024³):
   624.000.000.000 / (1024 * 1024 * 1024) = 581,15 GiB
   (Achtung: Wäre nach GB gefragt, teilt man durch 1000³ = 624,00 GB!)`
        ),
        `<p><b>1. الفرق الحاسم في الامتحان بين NAS و SAN:</b></p>
        <ul>
          <li><b>NAS (Network Attached Storage):</b> يعمل على <b>مستوى الملفات (Dateiebene / File-Level)</b> عبر بروتوكولات <code>SMB</code> أو <code>NFS</code>؛ نظام الملفات موجود داخل جهاز الـ NAS نفسه.</li>
          <li><b>SAN (Storage Area Network):</b> يعمل على <b>مستوى الكتل (Blockebene / Block-Level)</b> عبر <code>Fibre Channel</code> أو <code>iSCSI</code>؛ يظهر للخادم وكأنه قرص صلب محلي فائق السرعة (ممتاز لقواعد البيانات الضخمة والـ Virtualisierung).</li>
        </ul>
        <p><b>2. قانون حساب حجم الصور (شتاء 2023/24 — 7 نقاط):</b> اضرب عدد البكسلات $\\times$ عمق اللون بالبت $\\times$ عدد القنوات اللونية (<code>3</code> لـ RGB)، ثم <b>اقسم على 8</b> للتحويل من Bit إلى Byte، ثم اقسم على $1024^3$ للتحويل إلى <code>GiB</code> (أو $1000^3$ للتحويل إلى <code>GB</code>).</p>`
      ),
      S(
        '🔴 Tabellenkalkulation / Excel-Formeln (Sommer 2023 — 15 Punkte!) & Compiler vs. Interpreter (Winter 2021/22)',
        `<p>In <b>Sommer 2023 Teil 1 Aufgabe 3 (über 15 Punkte!)</b> mussten exakte Tabellenkalkulationsformeln mit <code>SVERWEIS</code> (<code>VLOOKUP</code>), <code>WENN</code> (<code>IF</code>) und relativen/absoluten Zellbezügen geschrieben werden:</p>` +
        C(
`// 1. SVERWEIS / VLOOKUP (analog Sommer 2023):
// Syntax: =SVERWEIS(Suchkriterium; Matrix; Spaltenindex; [Bereich_Verweis])
// Wichtig: Matrix mit ABSOLUTEM Zellbezug ($B$3:$D$17) fixieren, damit sie beim Herunterziehen nicht verrutscht!
//          4. Parameter auf FALSCH (0) setzen für exakte Übereinstimmung!
=SVERWEIS(C3; Wetterdaten!$B$3:$D$17; 3; FALSCH)

// 2. Bedingte Berechnung mit WENN / IF (analog Sommer 2023):
// Wenn Wochentag <= 5 (Mo-Fr), dann 10 % Rabatt (* 0,9), sonst voller Preis (* 1):
=WENN(WOCHENTAG(C3)<=5; D3*0,9; D3)`
        ) +
        `<p><b>🔴 Compiler vs. Interpreter (Winter 2021/22 Teil 1 Aufgabe 1):</b></p>
        <ul>
          <li><b>Compiler (Übersetzer, z. B. C, C++, Go, Rust):</b> Übersetzt den gesamten Quellcode <b>vor der Ausführung</b> einmalig in plattformspezifischen Maschinencode (Binärdatei). <i>Vorteil:</i> Sehr schnelle Ausführung, Syntaxfehler werden schon beim Kompilieren erkannt, Quellcode muss nicht ausgeliefert werden. <i>Nachteil:</i> Plattformabhängiges Kompilat.</li>
          <li><b>Interpreter (z. B. klassisches Python, JavaScript, PHP):</b> Liest, analysiert und führt den Quellcode <b>zur Laufzeit Zeile für Zeile / Anweisung für Anweisung</b> aus. <i>Vorteil:</i> Plattformunabhängig (solange Interpreter vorhanden), sofortiger Start ohne Kompilierphase. <i>Nachteil:</i> Langsamere Ausführung, Quellcode liegt vor.</li>
          <li><b>Hybrid / Bytecode + JIT-Compiler (z. B. Java JVM, C# .NET CLR):</b> Compiler übersetzt Quellcode in plattformunabhängigen <b>Bytecode / Intermediate Language</b>; zur Laufzeit führt die VM ihn aus und übersetzt häufig genutzte Teile per <b>JIT (Just-In-Time-Compiler)</b> in nativen Maschinencode.</li>
        </ul>`,
        `<p><b>1. كيف تضمن علامة سؤال Excel (صيف 2023)؟</b></p>
        <ul>
          <li>في دالة <code>SVERWEIS(قيمة_البحث; جدول_البحث; رقم_العمود; FALSCH)</code>: ثبّت حدود جدول البحث دائماً بعلامة الدولار <code>$B$3:$D$17</code> (مرجع مطلق <code>Absoluter Bezug</code>) حتى لا يتحرك الجدول عند سحب المعادلة للأسفل!</li>
          <li>المعامل الرابع <code>FALSCH</code> (أو <code>0</code>) يعني البحث عن تطابق تام (Exakte Übereinstimmung).</li>
        </ul>
        <p><b>2. الفرق بين Compiler و Interpreter (شتاء 2021/22):</b> المترجم (<code>Compiler</code>) يترجم كامل الكود مسبقاً إلى لغة الآلة قبل التشغيل (سريع جداً، يكشف الأخطاء مبكراً)، بينما المفسر (<code>Interpreter</code>) يقرأ وينفذ الكود سطراً بسطر وقت التشغيل (مستقل عن النظام لكنه أبطأ).</p>`
      )
    ],
    [
      ['Kerberos (KDC / AS / TGS)', 'بروتوكول مصادقة شبكي يعتمد على التذاكر (TGT / Service Ticket) لتسجيل الدخول الموحد SSO'],
      ['NAS vs. SAN', 'NAS تخزين شبكي على مستوى الملفات (SMB/NFS)؛ SAN شبكة تخزين على مستوى الكتل (iSCSI/FC)'],
      ['Absoluter Zellbezug ($A$1)', 'مرجع خلية مطلق في الجداول الحسابية لا يتغير عند نسخ المعادلة'],
      ['Compiler vs. Interpreter', 'المترجم يحول كامل الكود مسبقاً للغة الآلة؛ المفسر ينفذ الكود سطراً بسطر وقت التشغيل']
    ],
    [
      Q(
        'Ein Überwachungssystem speichert täglich 500 unkomprimierte Bilder. Jedes Bild hat eine Auflösung von 4.000 × 3.000 Pixeln, 3 Farbkanäle (RGB) und 8 Bit pro Farbkanal. Berechne den Speicherbedarf für 30 Tage in GiB (auf 2 Nachkommastellen gerundet).',
        `1. Pixel pro Bild = 4.000 * 3.000 = 12.000.000 Pixel
2. Byte pro Pixel = (3 * 8 Bit) / 8 = 3 Byte
3. Byte pro Bild = 12.000.000 * 3 = 36.000.000 Byte
4. Gesamtbytes für 30 Tage = 36.000.000 * 500 * 30 = 540.000.000.000 Byte
5. In GiB: 540.000.000.000 / 1024³ = 502,91 GiB`,
        'احفظ الاختصار السريع: 3 قنوات × 8 بت = 24 بت = 3 بايت لكل بكسل مباشرة!',
        6
      ),
      Q(
        'Erkläre den technischen Hauptunterschied zwischen NAS und SAN hinsichtlich Zugriffsebene, Dateisystemverwaltung und typischen Protokollen.',
        `- NAS (Network Attached Storage) arbeitet auf Dateiebene (File-Level). Das NAS verwaltet das Dateisystem selbst und stellt Dateien über das normale LAN per SMB/CIFS oder NFS bereit.
- SAN (Storage Area Network) arbeitet auf Blockebene (Block-Level). Das Speichernetzwerk (über Fibre Channel oder iSCSI) stellt rohe Speicherblöcke (LUNs) bereit; das Dateisystem wird vom angeschlossenen Server selbst verwaltet.`,
        'المقارنة بين Dateiebene (في NAS) و Blockebene (في SAN) مع ذكر بروتوكول لكل منهما هي الجواب النموذجي الكامل.',
        5
      )
    ],
    [
      'Kerberos-Ablauf (AS, TGT, TGS, Service-Ticket) und OAuth 2.0 erklären',
      'NAS (Dateiebene) und SAN (Blockebene) unterscheiden',
      'Bildspeicher in GiB sowie Excel-Formeln (SVERWEIS, WENN, $A$1) berechnen'
    ]
  );
})();

