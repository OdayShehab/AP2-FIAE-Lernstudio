/* Katalog-Abdeckungsmatrix (AkA 2. Auflage ab Sommer 2025), Filterbarer Prüfungsindex & Prognosen, sowie Bewertungsschemata */
(() => {
  'use strict';
  if (!window.COURSE) window.COURSE = {};

  // =========================================================================
  // 1. PRÜFUNGSKATALOG-ABDECKUNGSMATRIX (Codex #2)
  //    Stufen: 'pruefung' (عليه تدريب بمستوى الامتحان) | 'geuebt' (عليه تدريب) | 'erklaert' (مشروح فقط)
  // =========================================================================
  window.COURSE.katalogMatrix = [
    // --- TEIL 1: Planen eines Softwareproduktes ---
    {
      code: 'T1-1.1', part: 'Teil 1', module: 'planung', level: 'pruefung',
      titleDe: 'Funktionale & nicht-funktionale Anforderungen (SMART) sowie Randbedingungen klassifizieren',
      titleAr: 'تصنيف <b>المتطلبات الوظيفية</b> و<b>غير الوظيفية (ISO 25010)</b> و<b>القيود</b> وصياغتها بشكل قابل للقياس (<b>SMART</b>)',
      lessons: ['anforderungen'], simRef: 't1-a', pastExams: ['Sommer 2022', 'Winter 2023/24', 'Sommer 2025'],
      focusAr: 'حوّل دائماً العبارات العائمة مثل «سريع وآمن» إلى <b>أرقام قابلة للاختبار</b> (زمن استجابة بالثواني + عدد المستخدمين).'
    },
    {
      code: 'T1-1.2', part: 'Teil 1', module: 'planung', level: 'pruefung',
      titleDe: 'Lastenheft vs. Pflichtenheft (DIN 69901) & User Stories mit Akzeptanzkriterien',
      titleAr: 'التفريق بين <b>كراسة الشروط (Lastenheft)</b> و<b>دفتر المواصفات (Pflichtenheft)</b> وكتابة <b>User Stories</b> مع <b>معايير القبول</b>',
      lessons: ['anforderungen'], simRef: 't1-a', pastExams: ['Winter 2021/22', 'Sommer 2023', 'Winter 2024/25'],
      focusAr: '<b>Lastenheft</b> يكتبه العميل (ماذا ولماذا WAS/WOZU)، بينما <b>Pflichtenheft</b> يكتبه المقاول (كيف وتقنياً WIE/WOMIT).'
    },
    {
      code: 'T1-1.3', part: 'Teil 1', module: 'planung', level: 'pruefung',
      titleDe: 'Vorgehensmodelle: Scrum, Kanban (WIP-Limit), V-Modell, Wasserfall & Spiralmodell',
      titleAr: 'نماذج تطوير البرمجيات: <b>Scrum</b> و<b>Kanban (WIP-Limit)</b> و<b>V-Modell</b> والنموذج الحلزوني <b>Spiralmodell</b>',
      lessons: ['methoden'], simRef: 't1-b', pastExams: ['Sommer 2022', 'Winter 2022/23', 'Sommer 2024'],
      focusAr: 'فرّق بدقة بين <b>Sprint Review</b> (فحص المنتج مع أصحاب المصلحة) و<b>Retrospektive</b> (تحسين طريقة عمل الفريق).'
    },
    {
      code: 'T1-1.4', part: 'Teil 1', module: 'planung', level: 'pruefung',
      titleDe: 'Netzplantechnik (FAZ, FEZ, SAZ, SEZ, Gesamtpuffer, Freier Puffer & Kritischer Pfad)',
      titleAr: 'مخطط الشبكة <b>Netzplan</b>: الحساب الأمامي والخلفي، <b>فترة السماح الكلية والحرة</b>، و<b>المسار الحرج</b>',
      lessons: ['planung-rechnen'], simRef: 't1-a', pastExams: ['Winter 2021/22', 'Sommer 2023', 'Winter 2024/25'],
      focusAr: 'عند التقاء مسارين في <b>الحساب الأمامي</b> خذ <b>الأكبر (max)</b>، وفي <b>الحساب الخلفي</b> خذ <b>الأصغر (min)</b>. المسار الحرج سماحه الكلي <code>0</code>.'
    },
    {
      code: 'T1-1.5', part: 'Teil 1', module: 'planung', level: 'pruefung',
      titleDe: 'Wirtschaftlichkeit: Make-or-Buy, Amortisation, TCO, Break-Even & Nutzwertanalyse',
      titleAr: 'الجدوى الاقتصادية: قرار <b>الشراء أو التطوير (Make-or-Buy)</b>، <b>نقطة التعادل</b>، و<b>تحليل القيمة المنفعية (Nutzwertanalyse)</b>',
      lessons: ['wirtschaftlichkeit'], simRef: 't1-b', pastExams: ['Sommer 2022', 'Winter 2023/24', 'Sommer 2025'],
      focusAr: 'في <b>Make-or-Buy</b> اجمع التكلفة التأسيسية + (التكلفة السنوية × عدد السنوات)، وتحقق في <b>Nutzwertanalyse</b> أن مجموع الأوزان يساوي <code>100%</code>.'
    },
    {
      code: 'T1-1.6', part: 'Teil 1', module: 'planung', level: 'geuebt',
      titleDe: 'Kundenkommunikation (4-Seiten-Modell, Aktives Zuhören) & Zielgruppengerechte Dokumentation',
      titleAr: 'التواصل مع العملاء (<b>نموذج الجوانب الأربعة</b> و<b>الاستماع الفعال</b>) وهيكلة التوثيق التقني ودليل المستخدم',
      lessons: ['kunden'], simRef: 't1-a', pastExams: ['Winter 2022/23'],
      focusAr: 'عند ورود شكوى عامة من العميل، ابدأ بـ<b>أسئلة التحديد وإعادة الصياغة</b> للوصول إلى حالة قابلة لإعادة الإنتاج دون طلب بيانات شخصية غير لازمة.'
    },
    {
      code: 'T1-1.7', part: 'Teil 1', module: 'planung', level: 'geuebt',
      titleDe: 'UI/UX-Entwurf (Mock-up, Usability-Kriterien nach ISO 9241-110 & Barrierefreiheit)',
      titleAr: 'تصميم واجهات المستخدم (<b>Mock-up</b>، معايير <b>قابلية الاستخدام ISO 9241</b>، و<b>إمكانية الوصول Barrierefreiheit</b>)',
      lessons: ['ux'], simRef: 't1-b', pastExams: ['Sommer 2023', 'Winter 2024/25'],
      focusAr: 'لا تكتفِ باللون وحده لتمييز الأخطاء؛ اربط الحقل بـ<b>نص خطأ صريح ورمز واضح</b> مع الحفاظ على القيم الصحيحة المدخلة.'
    },
    {
      code: 'T1-1.8', part: 'Teil 1', module: 'planung', level: 'geuebt',
      titleDe: 'KI-Einsatz in der Softwareentwicklung, SWOT-Analyse & Klassifikationsmetriken (Precision/Recall)',
      titleAr: 'توظيف <b>الذكاء الاصطناعي (KI)</b>، تحليل <b>SWOT</b>، ومقاييس التصنيف (<b>Precision</b> مقابل <b>Recall</b>)',
      lessons: ['trends'], simRef: 't1-c', pastExams: ['Sommer 2025', 'Winter 2025/26'],
      focusAr: '<b>Precision</b> تقسم الإيجابيات الصحيحة على كل ما أبلغت عنه الأداة، بينما <b>Recall</b> تقسمها على كل الأخطاء الموجودة فعلياً.'
    },

    // --- TEIL 1 & 2: UML & Softwareentwurf ---
    {
      code: 'T1-2.1', part: 'Teil 1', module: 'uml', level: 'pruefung',
      titleDe: 'UML-Anwendungsfalldiagramm (Use Case): Systemgrenze, Akteure, «include», «extend» & Generalisierung',
      titleAr: 'مخطط حالات الاستخدام <b>Use-Case-Diagramm</b>: <b>حدود النظام</b>، الفاعلون، وعلاقات <b>«include»</b> و<b>«extend»</b>',
      lessons: ['usecase'], simRef: 't1-a', pastExams: ['Sommer 2022', 'Sommer 2023', 'Winter 2024/25', 'Sommer 2025'],
      focusAr: 'سهم <b>«include»</b> يتجه نحو الجزء الإلزامي المشترك، بينما سهم <b>«extend»</b> يتجه من التوسعة الاختيارية نحو الحالة الأساسية مع <b>شرط التوسيع (Extension Point)</b>.'
    },
    {
      code: 'T1-2.2', part: 'Teil 1', module: 'uml', level: 'pruefung',
      titleDe: 'UML-Klassendiagramm: Sichtbarkeiten (+/-/#), Multiplizitäten, Aggregation, Komposition, Interface & Vererbung',
      titleAr: 'مخطط الأصناف <b>Klassendiagramm</b>: محددات الرؤية، <b>التعددية</b>، <b>التجميع والتركيب القوي</b>، والواجهات والوراثة',
      lessons: ['klasse'], simRef: 't1-b', pastExams: ['Winter 2021/22', 'Winter 2022/23', 'Sommer 2024', 'Winter 2025/26'],
      focusAr: '<b>الماسة (Raute)</b> توضع دائماً عند جهة <b>الكل (Ganzes)</b>، والمثلث الفارغ المتقطع يمثل <b>تحقيق الواجهة (Interface-Realisierung)</b>.'
    },
    {
      code: 'T1-2.3', part: 'Teil 1', module: 'uml', level: 'pruefung',
      titleDe: 'UML-Aktivitätsdiagramm (Fork/Join, Guards, Swimlanes) sowie BPMN & EPK-Prozessanalyse',
      titleAr: 'مخطط النشاط <b>Aktivitätsdiagramm</b> (التفرع والمزامنة <b>Fork/Join</b> والشروط) وتحليل العمليات في <b>BPMN</b> و<b>EPK</b>',
      lessons: ['aktivitaet'], simRef: 't1-a', pastExams: ['Sommer 2022', 'Winter 2023/24'],
      focusAr: 'كل مسار متوازٍ يخرج من <b>Fork</b> يجب أن ينتهي بشكل معرّف عند <b>Join</b>؛ احذر من ترك مسار خطأ يعلق المزامنة إلى الأبد.'
    },
    {
      code: 'T1-2.4', part: 'Teil 1', module: 'uml', level: 'pruefung',
      titleDe: 'UML-Sequenzdiagramm (alt, opt, loop, synchrone/asynchrone Nachrichten) & Zustandsdiagramm (entry/do/exit, Guards)',
      titleAr: 'مخطط التتابع <b>Sequenzdiagramm</b> (أطر <b>loop/alt/opt</b>) ومخطط الحالة <b>Zustandsdiagramm</b> (<b>entry/do/exit</b> وشروط الانتقال)',
      lessons: ['sequenz-zustand'], simRef: 't1-c', pastExams: ['Winter 2022/23', 'Sommer 2024', 'Sommer 2025', 'Winter 2025/26'],
      focusAr: 'في <b>Zustandsdiagramm</b> صيغة السهم هي <code>Ereignis [Guard] / Effekt</code>، ولا تنسَ اختبار المحاولات غير المسموحة في الحالة الحالية.'
    },
    {
      code: 'T1-2.5', part: 'Teil 1', module: 'uml', level: 'pruefung',
      titleDe: 'GoF-Entwurfsmuster (Observer, Strategy, Factory, Adapter, Singleton, MVC) & SOLID-Prinzipien',
      titleAr: 'أنماط التصميم <b>GoF Design Patterns</b> (<b>Observer</b>، <b>Strategy</b>، <b>Factory</b>، <b>Adapter</b>) ومبادئ <b>SOLID</b>',
      lessons: ['architektur', 'design-patterns-praxis'], simRef: 't1-b', pastExams: ['Sommer 2023', 'Winter 2023/24', 'Sommer 2025'],
      focusAr: '<b>Strategy</b> يبدّل خوارزمية الحساب وقت التشغيل، و<b>Observer</b> يبلّغ المشتركين تلقائياً عند تغير الحالة دون ارتباط وثيق.'
    },
    {
      code: 'T1-2.6', part: 'Teil 1', module: 'uml', level: 'pruefung',
      titleDe: 'XML / DTD / XSD-Validierung, JSON-Strukturen & Reguläre Ausdrücke (RegEx)',
      titleAr: 'التحقق من ملفات <b>XML</b> عبر <b>DTD / XSD</b>، صيغة <b>JSON</b>، و<b>التعابير النمطية (RegEx)</b>',
      lessons: ['xml-dtd-xsd-regex', 'sprachen-cps'], simRef: 't1-b', pastExams: ['Winter 2022/23', 'Sommer 2024'],
      focusAr: 'فرّق بين <b>سلامة البنية (Wohlgeformtheit)</b> و<b>مطابقة المخطط (Validität ضد DTD/XSD)</b> وبين صحة الحساب التجاري.'
    },
    {
      code: 'T1-2.7', part: 'Teil 1', module: 'uml', level: 'erklaert',
      titleDe: 'Strukturierte E-Rechnungsformate (XRechnung & ZUGFeRD) im technischen Import/Export',
      titleAr: 'صيغ <b>الفاتورة الإلكترونية المنظمة (XRechnung / ZUGFeRD)</b> والفرق بين ملف PDF العادي والبيانات المهيكلة',
      lessons: ['sprachen-cps'], simRef: 't1-b', pastExams: [],
      focusAr: 'بند مشروح للمقارنة التقنية: <b>XRechnung</b> تعتمد XML مهيكل، بينما <b>ZUGFeRD</b> تجمع عرض PDF البشري مع ملف XML مضمّن.'
    }
  ];

  // --- Fortsetzung Katalog-Matrix: TEIL 2, QUALITÄT, SECURITY, SYSTEME & WISO ---
  window.COURSE.katalogMatrix.push(
    {
      code: 'T2-3.1', part: 'Teil 2', module: 'code', level: 'pruefung',
      titleDe: '2D-Arrays / Matrizen mit Index-Offset & Schreibtischtest (Trace-Tabelle)',
      titleAr: 'المصفوفات ثنائية الأبعاد <b>2D-Arrays</b> مع <b>إزاحة الفهرس (Index-Offset)</b> وجدول تتبع المتغيرات <b>Trace-Tabelle</b>',
      lessons: ['algo-2d-gruppenwechsel', 'grundlagen-code'], simRef: 't2-a', pastExams: ['Sommer 2022', 'Sommer 2023', 'Winter 2024/25'],
      focusAr: 'انتبه دائماً للتحويل من الترقيم الواقعي إلى فهرس يبدأ من الصفر: <code>visitors[day - 1][hour - 9]</code> وحدود الحلقة عند استخدام <code>m + 1</code>.'
    },
    {
      code: 'T2-3.2', part: 'Teil 2', module: 'code', level: 'pruefung',
      titleDe: 'Gruppenwechsel-Algorithmus (Control Break) & Behebung des „Letzte-Gruppe-Bugs“',
      titleAr: 'خوارزمية <b>كسر المجموعة (Gruppenwechsel)</b> وإصلاح خطأ <b>عدم طباعة المجموعة الأخيرة</b> بعد الحلقة',
      lessons: ['algo-2d-gruppenwechsel', 'algo-muster'], simRef: 't2-b', pastExams: ['Sommer 2023', 'Winter 2024/25'],
      focusAr: 'لا تنسَ أبداً كتابة أمر إغلاق وطباعة <b>المجموعة الأخيرة بعد انتهاء الحلقة</b> لأن شرط تغير المفتاح لا يتحقق بعد آخر عنصر.'
    },
    {
      code: 'T2-3.3', part: 'Teil 2', module: 'code', level: 'pruefung',
      titleDe: 'Zeigerstrukturen: Einfach/doppelt verkettete Liste, Stack/Queue & Binärer Suchbaum (BST)',
      titleAr: 'هياكل المؤشرات: <b>القائمة المترابطة (Verkettete Liste)</b>، المكدس والرتل، و<b>شجرة البحث الثنائية (BST: Inorder/Preorder)</b>',
      lessons: ['datenstrukturen-baeume-listen', 'datenstrukturen'], simRef: 't2-b', pastExams: ['Winter 2023/24', 'Sommer 2025'],
      focusAr: 'عند الإدراج في قائمة مترابطة اربط <b>العقدة الجديدة أولاً (<code>neu.next = kopf</code>)</b> قبل تعديل الرأس؛ واجتياز <b>Inorder (L-W-R)</b> يعطي قيماً مرتبة تصاعدياً.'
    },
    {
      code: 'T2-3.4', part: 'Teil 2', module: 'code', level: 'pruefung',
      titleDe: 'Such- und Sortieralgorithmen (Binäre Suche, Bubble/Insertion/Selection Sort) & O-Notation',
      titleAr: 'خوارزميات البحث والترتيب (<b>البحث الثنائي Binary Search</b> و<b>Bubble/Insertion Sort</b>) وتعقيد الوقت <b>Big-O</b>',
      lessons: ['suchen-sortieren'], simRef: 't2-c', pastExams: ['Winter 2021/22', 'Sommer 2024', 'Winter 2025/26'],
      focusAr: '<b>البحث الثنائي</b> يشترط قائمة مرتبة مسبقاً ويعمل بزمن <code>O(log n)</code> مع تحديث الحدود بـ<code>mitte + 1</code> و<code>mitte - 1</code>.'
    },
    {
      code: 'T2-3.5', part: 'Teil 2', module: 'code', level: 'pruefung',
      titleDe: 'Objektorientierte Programmierung (Kapselung, Vererbung, Polymorphie, Interfaces & Exceptions)',
      titleAr: 'البرمجة الكائنية <b>OOP</b>: التغليف، الوراثة، <b>تعدد الأشكال (Polymorphie)</b>، الواجهات، ومعالجة الاستثناءات',
      lessons: ['oop', 'algo-buchung'], simRef: 't2-c', pastExams: ['Sommer 2023', 'Sommer 2024', 'Sommer 2025'],
      focusAr: 'فرّق بين <b>Überschreiben (Override)</b> في الصنف الفرعي بنفس التوقيع وبين <b>Überladen (Overload)</b> بمعاملات مختلفة.'
    },
    {
      code: 'T2-4.1', part: 'Teil 2', module: 'daten', level: 'pruefung',
      titleDe: 'ER-Modellierung (Chen-Notation & Krähenfuß), rekursive Beziehungen & m:n-Beziehungsattribute',
      titleAr: 'نمذجة قواعد البيانات <b>ER-Modell</b> (تمثيل <b>Chen</b> و<b>Krähenfuß</b>)، العلاقات الذاتية، وخصائص علاقة <b>m:n</b>',
      lessons: ['er-modell'], simRef: 't2-b', pastExams: ['Winter 2022/23', 'Sommer 2024', 'Winter 2025/26'],
      focusAr: 'في <b>Chen-Notation</b> تعلق الصفات المشتركة (مثل تاريخ المشاركة أو الدرجة) مباشرة بـ<b>المعين (Raute)</b> وتتحول لجدول وسيط.'
    },
    {
      code: 'T2-4.2', part: 'Teil 2', module: 'daten', level: 'pruefung',
      titleDe: 'Normalisierung (1NF, 2NF, 3NF), Funktionale Abhängigkeiten & Datenanomalien',
      titleAr: 'التطبيع <b>Normalisierung (1NF → 2NF → 3NF)</b>، الاعتماد الوظيفي الجزئي والانتقالي، وشذوذات التعديل والحذف',
      lessons: ['normalisierung'], simRef: 't2-a', pastExams: ['Winter 2021/22', 'Sommer 2023', 'Winter 2024/25'],
      focusAr: '<b>2NF</b> تفصل الأعمدة المعتمدة على جزء من مفتاح مركب، و<b>3NF</b> تفصل الأعمدة المعتمدة انتقالياً على عمود غير مفتاحي.'
    },
    {
      code: 'T2-4.3', part: 'Teil 2', module: 'daten', level: 'pruefung',
      titleDe: 'SQL-Abfragen nach IHK-Belegsatz: INNER/LEFT JOIN (Filter in ON vs. WHERE), GROUP BY, HAVING & COALESCE',
      titleAr: 'استعلامات <b>SQL</b>: الربط <b>LEFT JOIN</b> (وضع الشرط في <b>ON</b> بدل <b>WHERE</b>)، والتجميع <b>GROUP BY / HAVING</b>',
      lessons: ['sql-select', 'sql-joins', 'sql-gruppen', 'sql-belegsatz-profi'], simRef: 't2-a', pastExams: ['Sommer 2022', 'Sommer 2023', 'Sommer 2024', 'Sommer 2025', 'Winter 2025/26'],
      focusAr: 'إذا طلب السؤال «جميع العملاء حتى من ليس لديهم طلبات مدفوعة»، استخدم <b>LEFT JOIN</b> وضع شرط <code>status = \'bezahlt\'</code> داخل <b>ON</b> وليس في <b>WHERE</b>!'
    },
    {
      code: 'T2-4.4', part: 'Teil 2', module: 'daten', level: 'pruefung',
      titleDe: 'SQL-Unterabfragen (Subqueries, EXISTS/NOT EXISTS), DDL/DML, ACID-Transaktionen & Trigger/Views',
      titleAr: 'الاستعلامات الفرعية <b>Subqueries</b>، القيود <b>PRIMARY/FOREIGN KEY/CHECK</b>، معاملات <b>ACID</b>، و<b>Trigger / Stored Procedures</b>',
      lessons: ['sql-subqueries', 'sql-schreiben', 'transaktion-nosql', 'sql-migration'], simRef: 't2-c', pastExams: ['Sommer 2022', 'Winter 2023/24', 'Winter 2024/25'],
      focusAr: 'احذر من <code>NOT IN</code> عندما تحتوي القائمة الفرعية على <code>NULL</code> (استخدم <b>NOT EXISTS</b>)، ونفّذ الأرشفة والحذف داخل <b>Transaktion</b> واحدة.'
    },
    {
      code: 'T1-5.1', part: 'Teil 1', module: 'qualitaet', level: 'pruefung',
      titleDe: 'Teststufen (Unit, Integration, System, Abnahme), Black-Box (Äquivalenzklassen/Grenzwerte) & White-Box (C0/C1)',
      titleAr: 'مستويات الاختبار، تصميم اختبارات <b>Black-Box (فئات التكافؤ والقيم الحدية)</b> و<b>White-Box (تغطية الأسطر والفروع)</b>',
      lessons: ['testarten', 'testfaelle', 'unit-debug'], simRef: 't1-a', pastExams: ['Winter 2021/22', 'Sommer 2023', 'Sommer 2024', 'Sommer 2025'],
      focusAr: 'عند كل حد مثل <code>50 €</code> اختبر دائماً ثلاث قيم: <b>تحت الحد مباشرة (49,99)</b>، <b>على الحد (50,00)</b>، و<b>فوق الحد (50,01)</b>.'
    },
    {
      code: 'T1-5.2', part: 'Teil 1', module: 'qualitaet', level: 'pruefung',
      titleDe: 'ISO/IEC 25010 (8 Qualitätsmerkmale), Test-Driven Development (TDD) & CI/CD mit Git',
      titleAr: 'معيار الجودة <b>ISO/IEC 25010</b>، التطوير الموجه بالاختبار <b>TDD (Red-Green-Refactor)</b>، وأوامر <b>Git / CI-CD</b>',
      lessons: ['qualitaet-iso25010-tdd', 'git-tools'], simRef: 't1-c', pastExams: ['Winter 2024/25', 'Sommer 2025', 'Winter 2025/26'],
      focusAr: 'في <b>TDD</b> يُكتب الاختبار الفاشل أولاً (<b>Red</b>)، ثم أبسط كود ينجحه (<b>Green</b>)، ثم يُحسّن الكود (<b>Refactor</b>).'
    },
    {
      code: 'T1-6.1', part: 'Teil 1', module: 'sicherheit', level: 'pruefung',
      titleDe: 'Schutzziele (CIA), Kryptografie (Symmetrisch/Asymmetrisch/Hybrid), Digitale Signatur, Hash/Salt & TLS',
      titleAr: 'أهداف الحماية <b>CIA</b>، <b>التشفير الهجين</b>، <b>التوقيع الرقمي</b>، تجزئة كلمات المرور <b>Hash + Salt</b>، وبروتوكول <b>TLS</b>',
      lessons: ['sicherheitsrisiken', 'kryptografie'], simRef: 't1-c', pastExams: ['Sommer 2022', 'Winter 2023/24', 'Sommer 2025'],
      focusAr: '<b>التشفير</b> يُجرى بالمفتاح العام للمستلم، بينما <b>التوقيع الرقمي</b> يُجرى بالمفتاح الخاص للمرسل لإثبات الهوية وعدم التلاعب.'
    },
    {
      code: 'T1-6.2', part: 'Teil 1', module: 'sicherheit', level: 'pruefung',
      titleDe: 'Web-Security (SQL-Injection, XSS, CSRF, Broken Access Control), Kerberos/SSO, OAuth 2.0 & DSGVO',
      titleAr: 'أمن الويب (<b>SQL-Injection / Prepared Statements</b>، <b>XSS</b>، <b>CSRF</b>)، مصادقة <b>Kerberos / SSO</b>، ولائحة <b>DSGVO</b>',
      lessons: ['web-security', 'datenschutz', 'auth-kerberos-oauth-storage'], simRef: 't1-c', pastExams: ['Sommer 2023', 'Sommer 2024', 'Winter 2024/25', 'Winter 2025/26'],
      focusAr: 'الـ<b>Prepared Statements</b> تمنع <b>SQL-Injection</b> لأنها تفصل بنية الاستعلام عن البيانات، وفحص الصلاحية يجب أن يتم <b>على الخادم عند كل طلب</b>.'
    },
    {
      code: 'T1-7.1', part: 'Teil 1', module: 'systeme', level: 'pruefung',
      titleDe: 'REST/HTTP-APIs (Methoden, Statuscodes, Idempotenz), IPv4-Subnetting, DNS/ARP/DHCP, VLAN/VPN & Reverse Proxy',
      titleAr: 'واجهات <b>REST/HTTP</b>، تقسيم الشبكات <b>IPv4-Subnetting</b>، بروتوكولات <b>DNS/ARP</b>، و<b>VLAN / VPN / Reverse Proxy</b>',
      lessons: ['http-api', 'netz-grundlagen', 'ip-subnetze', 'netz-konzepte'], simRef: 't1-c', pastExams: ['Winter 2022/23', 'Sommer 2023', 'Winter 2024/25'],
      focusAr: 'في <b>Subnetting</b> عدد المضيفين القابلين للاستخدام هو <code>2^(32 - Präfix) - 2</code>، والـ<b>Reverse Proxy</b> يحمي الخوادم الخلفية وينهي اتصال TLS.'
    },
    {
      code: 'T1-7.2', part: 'Teil 1', module: 'systeme', level: 'pruefung',
      titleDe: 'Speicherarchitekturen (DAS, NAS, SAN), RAID (0, 1, 5, 6, 10), Backup-Strategien (RPO/RTO) & SLA-Verfügbarkeit',
      titleAr: 'أنظمة التخزين (<b>DAS / NAS / SAN</b>)، مصفوفات <b>RAID</b>، خطط النسخ الاحتياطي (<b>RPO / RTO</b>)، وحساب توافرية <b>SLA</b>',
      lessons: ['speicher-cloud', 'betrieb-monitoring', 'auth-kerberos-oauth-storage'], simRef: 't1-c', pastExams: ['Sommer 2022', 'Winter 2023/24', 'Sommer 2025'],
      focusAr: '<b>RAID</b> يرفع التوافرية عند تعطل قرص لكنه <b>ليس نسخة احتياطية (Kein Backup)</b> لأنه ينسخ الحذف الخاطئ والبرمجيات الخبيثة فوراً!'
    },

    // --- WISO: Wirtschafts- und Sozialkunde ---
    {
      code: 'WISO-1.1', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Berufsbildungsgesetz (BBiG): Ausbildungsvertrag, Pflichten, Probezeit (1–4 Monate), Freistellung & Kündigung',
      titleAr: 'قانون التدريب المهني <b>BBiG</b>: عقد التدريب، <b>فترة التجربة (1–4 أشهر)</b>، الإعفاء للمدرسة والامتحان، وشروط الإنهاء',
      lessons: ['ausbildung'], simRef: 'wiso-a', pastExams: ['Sommer 2022', 'Sommer 2023', 'Winter 2024/25', 'Sommer 2025'],
      focusAr: 'بعد انتهاء فترة التجربة لا يحق لصاحب العمل فصل المتدرب فصلاً عادياً؛ بل فقط <b>فصل فوري لسبب قاهر (Fristlos aus wichtigem Grund)</b>.'
    },
    {
      code: 'WISO-1.2', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Arbeitszeitgesetz (ArbZG) vs. Jugendarbeitsschutzgesetz (JArbSchG), Pausen, Ruhezeit, Urlaub & Mutterschutz',
      titleAr: 'مقارنة <b>قانون ساعات العمل للبالغين (ArbZG)</b> و<b>القاصرين (JArbSchG)</b>، الاستراحات، الإجازات، وحماية الأمومة',
      lessons: ['arbeitszeit', 'urlaub-schutz'], simRef: 'wiso-b', pastExams: ['Winter 2022/23', 'Sommer 2024', 'Winter 2025/26'],
      focusAr: 'للقاصر فوق 6 ساعات عمل استراحة <b>60 دقيقة</b>، وللبالغ من 6 إلى 9 ساعات <b>30 دقيقة</b> (وفوق 9 ساعات <b>45 دقيقة</b>) مع راحة ليلية <b>11 ساعة</b>.'
    },
    {
      code: 'WISO-1.3', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Kündigungsrecht (§ 622, § 623 BGB), Kündigungsschutzgesetz (KSchG: 4 Sozialkriterien) & Befristung (TzBfG)',
      titleAr: 'مهل الإنهاء <b>§ 622 BGB</b>، <b>الشكل الكتابي الورقي (§ 623 BGB)</b>، قانون الحماية من الفصل <b>KSchG</b>، والعقود المؤقتة',
      lessons: ['kuendigung'], simRef: 'wiso-a', pastExams: ['Sommer 2022', 'Sommer 2023', 'Winter 2023/24', 'Sommer 2025'],
      focusAr: 'سلّم سنوات الخدمة في <b>§ 622 Abs. 2 BGB</b> ينطبق فقط عندما يفصل <b>صاحب العمل</b> الموظف؛ أما استقالة الموظف نفسه فتبقى <b>4 أسابيع (28 يوماً)</b>!'
    },
    {
      code: 'WISO-1.4', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Betriebsverfassung (BetrVG): Betriebsrat- & JAV-Wahl (aktiv/passiv), Betriebsvereinbarung vs. Tarifvertrag & Streik',
      titleAr: 'انتخابات وصلاحيات <b>مجلس العاملين (Betriebsrat)</b> و<b>ممثلي الشباب والمتدربين (JAV)</b>، وعقد التعريفة والإضراب',
      lessons: ['mitbestimmung', 'tarifrecht', 'wiso-system-fallen-gerichte'], simRef: 'wiso-b', pastExams: ['Winter 2021/22', 'Sommer 2023', 'Winter 2024/25', 'Winter 2025/26'],
      focusAr: 'في <b>JAV</b> يحق لكل <b>متدرب (Azubi)</b> التصويت مهما كان عمره (حتى لو 29 سنة)، وللتصويت في <b>Betriebsrat</b> يبدأ السن من <b>16 سنة</b> (والترشح 18 سنة).'
    },
    {
      code: 'WISO-2.1', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Die 5 Säulen der Sozialversicherung, Beitragsbemessungsgrenze (BBG), JAEG, Umlageverfahren & Lohnabrechnung',
      titleAr: 'الفروع الخمسة لـ<b>التأمين الاجتماعي</b>، الحساب مع <b>سقف الاشتراكات (BBG)</b>، وكشف الراتب من <b>Brutto</b> إلى <b>Netto</b>',
      lessons: ['sozialversicherung', 'lohn-netto'], simRef: 'wiso-a', pastExams: ['Sommer 2022', 'Winter 2022/23', 'Sommer 2024', 'Sommer 2025'],
      focusAr: '<b>تأمين الحوادث (Unfallversicherung)</b> يدفعه صاحب العمل بنسبة <code>100%</code>؛ وعند تجاوز الراتب لسقف <b>BBG</b> يُحسب الاشتراك على قيمة السقف فقط.'
    },
    {
      code: 'WISO-2.2', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Rechtsformen (Einzelunternehmen, OHG, KG, GmbH, UG, AG), Gewinnverteilung (§ 29 GmbHG) & Vollmachten (Prokura)',
      titleAr: 'الأشكال القانونية للشركات (<b>GmbH / OHG / KG / AG</b>)، <b>توزيع أرباح GmbH</b>، والتفويض التجاري <b>Prokura</b>',
      lessons: ['rechtsformen'], simRef: 'wiso-a', pastExams: ['Winter 2021/22', 'Sommer 2023', 'Sommer 2024', 'Winter 2025/26'],
      focusAr: 'شركة <b>GmbH</b> مسؤولة عن ديونها بـ<b>كامل أموال الشركة (Gesellschaftsvermögen)</b> وليس فقط بحد الـ25.000 يورو، وتوزع الأرباح حسب <b>نسبة الحصص</b>.'
    },
    {
      code: 'WISO-2.3', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Vertragsrecht (Kauf-, Werk-, Dienstvertrag), Mängelrechte (Vorrang der Nacherfüllung), Mahnverfahren & AGB',
      titleAr: 'أنواع العقود (<b>عقد العمل المنجز Werkvertrag</b> مقابل <b>الخدمة Dienstvertrag</b>)، أولوية <b>إصلاح العيب (Nacherfüllung)</b>، والإخطار القضائي',
      lessons: ['vertraege'], simRef: 'wiso-b', pastExams: ['Sommer 2022', 'Winter 2023/24', 'Winter 2024/25'],
      focusAr: 'عند وجود عيب في برنامج أو جهاز، الحق الأول دائماً هو <b>Nacherfüllung (إصلاح أو استبدال ضمن مهلة)</b> قبل المطالبة بالانسحاب أو تخفيض السعر.'
    },
    {
      code: 'WISO-2.4', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Handelskalkulation (Vorwärts-, Rückwärts-, Differenzkalkulation), Break-Even, Rentabilität & Wirtschaftlichkeit',
      titleAr: 'حسابات التسعير (<b>Bezugskalkulation</b> والحساب العكسي)، <b>نقطة التعادل</b>، <b>الربحية (Rentabilität)</b>، و<b>الكفاءة الاقتصادية</b>',
      lessons: ['bwl-rechnen', 'bwl-rechnen'], simRef: 'wiso-c', pastExams: ['Sommer 2022', 'Sommer 2023', 'Winter 2024/25', 'Sommer 2025', 'Winter 2025/26'],
      focusAr: 'يُطرح <b>Rabatt</b> أولاً للوصول إلى <b>Zieleinkaufspreis</b>، ثم يُحسب <b>Skonto</b> من الـZieleinkaufspreis، ثم تُضاف <b>Bezugskosten</b>.'
    },
    {
      code: 'WISO-2.5', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Marktformen (Polypol, Oligopol, Monopol), Preisbildung (Gleichgewichtspreis), Konjunktur & Unternehmensverbindungen',
      titleAr: 'أشكال السوق، <b>سعر التوازن (Gleichgewichtspreis)</b> وفائض العرض/الطلب، الدورة الاقتصادية، واندماج الشركات',
      lessons: ['markt-konjunktur', 'organisation'], simRef: 'wiso-a', pastExams: ['Winter 2022/23', 'Sommer 2024', 'Sommer 2025'],
      focusAr: 'السعر فوق سعر التوازن يولد <b>فائض عرض (Angebotsüberhang = Käufermarkt)</b>، والسعر تحته يولد <b>فائض طلب (Nachfrageüberhang)</b>.'
    },
    {
      code: 'WISO-2.6', part: 'WiSo', module: 'wiso', level: 'pruefung',
      titleDe: 'Arbeitsschutz (TOP-Prinzip, Sicherheitszeichen ISO 7010, SiBe vs. FaSi/ASA) & Umweltschutz (Abfallhierarchie KrWG)',
      titleAr: 'السلامة المهنية (مبدأ <b>TOP</b>، <b>علامات السلامة ISO 7010</b>) وحماية البيئة (<b>الهرم الخماسي للنفايات KrWG</b>)',
      lessons: ['arbeitsschutz', 'umwelt-ethik', 'wiso-sicherheit-umwelt-bwl'], simRef: 'wiso-c', pastExams: ['Sommer 2023', 'Winter 2024/25', 'Winter 2025/26'],
      focusAr: 'علامة <b>الإلزام (Gebot)</b> دائرة زرقاء، و<b>التحذير (Warnung)</b> مثلث أصفر، و<b>الإنقاذ (Rettung)</b> مربع أخضر؛ ومفوض السلامة يُعيّن من <b>21 موظفاً</b>.'
    },
    {
      code: 'WISO-2.7', part: 'WiSo', module: 'wiso', level: 'erklaert',
      titleDe: 'Lebenslanges Lernen, Fortbildung vs. Umschulung & Europass-Dokumente im europäischen Arbeitsmarkt',
      titleAr: 'التعلم المستمر، الفرق بين <b>التطوير المهني (Weiterbildung)</b> و<b>إعادة التأهيل (Umschulung)</b>، ووثائق <b>Europass</b>',
      lessons: ['umwelt-ethik'], simRef: 'wiso-c', pastExams: ['Winter 2021/22'],
      focusAr: '<b>Weiterbildung</b> تعمّق مهاراتك في نفس مهنتك، بينما <b>Umschulung</b> تؤهلك لمهنة جديدة مختلفة.'
    },
    {
      code: 'WISO-2.8', part: 'WiSo', module: 'wiso', level: 'erklaert',
      titleDe: 'Detaillierte Bildschirmarbeitsplatz-Ergonomie (Abstände, Blickwinkel, Beleuchtungsstärke in Lux)',
      titleAr: 'تفاصيل <b>هندسة بيئة العمل المكتبية (Ergonomie)</b>: زاوية النظر، وضع الشاشة متعامدة مع النافذة، ومنع الانعكاس',
      lessons: ['arbeitsschutz', 'wiso-sicherheit-umwelt-bwl'], simRef: 'wiso-c', pastExams: ['Sommer 2022'],
      focusAr: 'توضع الشاشة <b>بشكل متعامد (90 درجة) مع النافذة</b> بحيث تكون الحافة العلوية للشاشة بمستوى العين أو أدنى قليلاً.'
    }
  );

  // =========================================================================
  // 2. FILTERBARER PRÜFUNGSINDEX & PROGNOSEN (Codex #5)
  //    type: 'ref' (Belegte Altprüfungs-Referenz) | 'prognose' (Erwartet mit Begründung)
  // =========================================================================
  window.COURSE.examIndex = [
    // --- BELEGTE ALTPRÜFUNGS-REFERENZEN ('ref') ---
    {
      id: 'ref-25w-t2-1', type: 'ref', term: 'Winter 2025/26', part: 'Teil 2', module: 'daten',
      questionNo: 'Teil 2 · Aufgabe 3 (SQL & ER-Modell · 25 P.)',
      titleDe: 'LEFT JOIN mit Bedingung in ON & Aggregation mit GROUP BY / HAVING',
      titleAr: 'ربط <b>LEFT JOIN</b> مع وضع شرط التصفية داخل <b>ON</b> والتجميع بـ<b>GROUP BY / HAVING</b>',
      summaryDe: 'Gefordert war eine Auswertung über alle Hauptdatensätze inklusive derjenigen mit <b>0 Treffern</b> in der Detailtabelle sowie eine anschließende Gruppenfilterung.',
      summaryAr: '<b>إحالة امتحانية موثقة (شتاء 2025/26):</b> طلب السؤال إظهار جميع السجلات الرئيسية حتى التي تملك <b>رصيداً صفرياً</b>؛ وضع الشرط في <code>WHERE</code> يحذف الصفوف الصفرية بينما وضعه في <code>ON</code> يحفظها.',
      lessonId: 'sql-joins', simId: 't2-a'
    },
    {
      id: 'ref-25w-t1-1', type: 'ref', term: 'Winter 2025/26', part: 'Teil 1', module: 'uml',
      questionNo: 'Teil 1 · Aufgabe 2 (UML-Klassendiagramm & Sequenz · 25 P.)',
      titleDe: 'Klassendiagramm mit Interface-Realisierung, Komposition & Sequenzdiagramm (alt/loop)',
      titleAr: 'مخطط الأصناف <b>Klassendiagramm</b> مع <b>تحقيق الواجهة</b> ومخطط التتابع <b>Sequenzdiagramm</b>',
      summaryDe: 'Modellierung einer geschichteten Anwendungslogik mit <b>Interface</b>, korrekten <b>Multiplizitäten</b> und Nachrichtenfluss über <code>loop</code>- und <code>alt</code>-Fragmente.',
      summaryAr: '<b>إحالة امتحانية موثقة (شتاء 2025/26):</b> ركّز المصحح على اتجاه سهم <b>Interface (مثلث فارغ متقطع)</b>، ووضع <b>الماسة المملوءة (Komposition)</b> عند الكل، وترتيب رسائل الرد في مخطط التتابع.',
      lessonId: 'sequenz-zustand', simId: 't1-a'
    },
    {
      id: 'ref-25w-wiso-1', type: 'ref', term: 'Winter 2025/26', part: 'WiSo', module: 'wiso',
      questionNo: 'WiSo · Aufgaben 12, 18 & 24 (Rechnen & Arbeitsrecht)',
      titleDe: 'Kündigungsfrist nach § 622 BGB, Bezugskalkulation & JAV/Betriebsratswahl',
      titleAr: 'حساب مهلة الإنهاء <b>§ 622 BGB</b>، تسعير الشراء <b>Bezugskalkulation</b>، وانتخابات <b>JAV / Betriebsrat</b>',
      summaryDe: 'Kombination aus Rechenkästchen zur <b>Bezugskalkulation (Rabatt vor Skonto)</b>, Fristberechnung bei <b>Arbeitgeberkündigung</b> und Zuordnung der Wahlrechte.',
      summaryAr: '<b>إحالة امتحانية موثقة (شتاء 2025/26):</b> تكرر فخ الخلط بين استقالة الموظف وفصل صاحب العمل، وفخ خصم <b>Skonto</b> من السعر بعد الخصم التجاري وليس من سعر القائمة.',
      lessonId: 'bwl-rechnen', simId: 'wiso-a'
    },
    {
      id: 'ref-25s-t1-1', type: 'ref', term: 'Sommer 2025', part: 'Teil 1', module: 'planung',
      questionNo: 'Teil 1 · Aufgabe 1 (Anforderungen & Wirtschaftlichkeit · 25 P.)',
      titleDe: 'Funktionale vs. Nicht-funktionale Anforderungen (ISO 25010) & Nutzwertanalyse',
      titleAr: 'تصنيف <b>المتطلبات الوظيفية وغير الوظيفية</b> ومقارنة البدائل بـ<b>Nutzwertanalyse</b>',
      summaryDe: 'Unpräzise Kundenwünsche mussten als <b>messbare Qualitätsanforderungen</b> umformuliert und in einer gewichteten <b>Nutzwertanalyse</b> ausgewertet werden.',
      summaryAr: '<b>إحالة امتحانية موثقة (صيف 2025):</b> أول امتحان وفق الكتالوج المحدث؛ طُلب تحويل متطلب أداء عائم إلى <b>معيار رقمي قابل للاختبار</b> مع تبرير اختيار البديل الفائز.',
      lessonId: 'anforderungen', simId: 't1-a'
    },
    {
      id: 'ref-25s-t2-1', type: 'ref', term: 'Sommer 2025', part: 'Teil 2', module: 'code',
      questionNo: 'Teil 2 · Aufgabe 1 & 2 (Algorithmen & Datenstrukturen · 50 P.)',
      titleDe: 'Mehrdimensionale Array-Auswertung, Objektlisten-Filterung & Schreibtischtest',
      titleAr: 'تحليل <b>المصفوفات ثنائية الأبعاد</b>، فلترة قوائم الكائنات، و<b>تتبع الكود (Trace-Tabelle)</b>',
      summaryDe: 'Implementierung einer Auswertungsfunktion im <b>Pseudocode</b> inklusive Randfallprüfung (leere Liste, Division durch 0) und Komplexitätsangabe.',
      summaryAr: '<b>إحالة امتحانية موثقة (صيف 2025):</b> خُصصت درجات جزئية صريحة لـ<b>تهيئة المتغيرات</b>، وفحص <b>القسمة على صفر</b> قبل الحساب، وإرجاع النتيجة النهائية بعد الحلقة.',
      lessonId: 'algo-2d-gruppenwechsel', simId: 't2-a'
    },
    {
      id: 'ref-24w-t1-1', type: 'ref', term: 'Winter 2024/25', part: 'Teil 1', module: 'planung',
      questionNo: 'Teil 1 · Aufgabe 3 (Netzplan & Pufferzeiten · 22 P.)',
      titleDe: 'Netzplan komplett durchrechnen (FAZ, FEZ, SAZ, SEZ, GP, FP) & Verzögerung bewerten',
      titleAr: 'حساب <b>مخطط الشبكة (Netzplan)</b> بالكامل وتقييم أثر تأخر أحد الأنشطة على المشروع',
      summaryDe: 'Vorwärts- und Rückwärtsrechnung an einem Projektnetzplan sowie Beurteilung, ob eine 2-tägige Verzögerung eines nicht-kritischen Vorgangs den Endtermin verschiebt.',
      summaryAr: '<b>إحالة امتحانية موثقة (شتاء 2024/25):</b> بعد حساب <b>السماح الكلي (Gesamtpuffer)</b>، سأل الامتحان: ماذا يحدث لو تأخر النشاط C يومين بينما سماحه يوم واحد فقط؟ (يتأخر المشروع يوماً واحداً).',
      lessonId: 'planung-rechnen', simId: 't1-a'
    },
    {
      id: 'ref-24w-t2-1', type: 'ref', term: 'Winter 2024/25', part: 'Teil 2', module: 'daten',
      questionNo: 'Teil 2 · Aufgabe 4 (Normalisierung 1NF–3NF · 20 P.)',
      titleDe: 'Tabellenzerlegung bis 3NF mit zusammengesetztem Schlüssel & PK/FK-Kennzeichnung',
      titleAr: 'تطبيع الجداول من <b>1NF إلى 3NF</b> مع تحديد <b>المفاتيح الأساسية والأجنبية (PK/FK)</b>',
      summaryDe: 'Auflösung partieller Abhängigkeiten (<b>2NF</b>) und transitiver Abhängigkeiten (<b>3NF</b>) einer Bestell-/Rechnungstabelle.',
      summaryAr: '<b>إحالة امتحانية موثقة (شتاء 2024/25):</b> خسارة النقاط الشائعة كانت بسبب <b>نسيان كتابة FK</b> بجانب المفتاح الأجنبي، أو نقل عمود الكمية <code>Menge</code> إلى جدول المنتجات بدلاً من جدول تفاصيل الطلب.',
      lessonId: 'normalisierung', simId: 't2-a'
    },
    {
      id: 'ref-24s-t1-1', type: 'ref', term: 'Sommer 2024', part: 'Teil 1', module: 'qualitaet',
      questionNo: 'Teil 1 · Aufgabe 4 (Black-Box & White-Box Tests · 25 P.)',
      titleDe: 'Äquivalenzklassen, Grenzwertanalyse & Zweigüberdeckung (C1) ableiten',
      titleAr: 'استخراج <b>فئات التكافؤ والقيم الحدية</b> وحساب <b>تغطية الفروع (Zweigüberdeckung C1)</b>',
      summaryDe: 'Für eine gestaffelte Rabattregel mussten gültige und ungültige <b>Äquivalenzklassen</b> sowie die exakten <b>Grenzwerte</b> tabellarisch bestimmt werden.',
      summaryAr: '<b>إحالة امتحانية موثقة (صيف 2024):</b> طُلب تحديد <b>المدخلات والنتيجة المتوقعة (Soll-Ergebnis)</b> لكل حد، مع التمييز بين قيمة غير صالحة (خطأ) وقيمة صالحة لا تحقق شرط الخصم.',
      lessonId: 'testfaelle', simId: 't1-a'
    },
    {
      id: 'ref-24s-t2-1', type: 'ref', term: 'Sommer 2024', part: 'Teil 2', module: 'code',
      questionNo: 'Teil 2 · Aufgabe 2 (Sortier- & Suchalgorithmus · 25 P.)',
      titleDe: 'Algorithmus-Trace & Binäre Suche / Sortierverfahren in Pseudocode',
      titleAr: 'تتبع خوارزمية ترتيب وبحث ثنائي <b>Binary Search</b> وكتابة <b>Pseudocode</b>',
      summaryDe: 'Verfolgung von Indizes in einer Schleife sowie Begründung der <b>Laufzeitkomplexität</b> im Worst Case.',
      summaryAr: '<b>إحالة امتحانية موثقة (صيف 2024):</b> ركّز السؤال على تتبع قيم الفهارس في كل دورة، وشرط التوقف الصحيح لمنع <b>ArrayIndexOutOfBounds</b> أو <b>Endlosschleife</b>.',
      lessonId: 'suchen-sortieren', simId: 't2-c'
    },
    {
      id: 'ref-23w-t1-1', type: 'ref', term: 'Winter 2023/24', part: 'Teil 1', module: 'sicherheit',
      questionNo: 'Teil 1 · Aufgabe 3 (IT-Security & Kryptografie · 25 P.)',
      titleDe: 'Symmetrische vs. asymmetrische Verschlüsselung, Digitale Signatur & SQL-Injection',
      titleAr: 'مقارنة <b>التشفير التماثلي وغير التماثلي</b>، <b>التوقيع الرقمي</b>، وسد ثغرة <b>SQL-Injection</b>',
      summaryDe: 'Erklärung, mit welchem Schlüssel verschlüsselt bzw. signiert wird, sowie Absicherung einer verwundbaren Datenbankabfrage mittels <b>Prepared Statements</b>.',
      summaryAr: '<b>إحالة امتحانية موثقة (شتاء 2023/24):</b> السؤال الكلاسيكي: <b>التوقيع الرقمي</b> يستخدم <b>المفتاح الخاص للمرسل</b> ثم يتحقق منه المستلم بالمفتاح العام للمرسل (يحقق السلامة والموثوقية وليس السرية!).',
      lessonId: 'kryptografie', simId: 't1-c'
    },
    {
      id: 'ref-23s-t2-1', type: 'ref', term: 'Sommer 2023', part: 'Teil 2', module: 'code',
      questionNo: 'Teil 2 · Aufgabe 1 & 3 (2D-Array & Gruppenwechsel · 50 P.)',
      titleDe: 'Besucherzähler im 2D-Array (Index-Offset) & Gruppenwechsel mit „Letzte-Gruppe-Bug“',
      titleAr: 'مصفوفة الزوار <b>2D-Array (إزاحة الفهرس)</b> وخوارزمية <b>Gruppenwechsel</b> مع خطأ المجموعة الأخيرة',
      summaryDe: 'In Aufgabe 1 mussten Stunden 9..18 auf Spalten 0..9 abgebildet werden (<code>hour - 9</code>). In Aufgabe 3 musste per Trace-Tabelle erklärt werden, warum der letzte Monat fehlt.',
      summaryAr: '<b>إحالة امتحانية موثقة (صيف 2023 - 50 نقطة!):</b> أهم سؤالين في تاريخ النظام الجديد: 1) إزاحة الفهرس <code>visitors[day-1][hour-9]</code>، 2) اكتشاف أن الطباعة داخل شرط تغير الشهر تتجاهل الشهر الأخير وإصلاحها بإضافة سطر طباعة بعد الحلقة.',
      lessonId: 'algo-2d-gruppenwechsel', simId: 't2-b'
    },
    {
      id: 'ref-23s-t1-1', type: 'ref', term: 'Sommer 2023', part: 'Teil 1', module: 'uml',
      questionNo: 'Teil 1 · Aufgabe 2 (Design Pattern & Klassendiagramm · 25 P.)',
      titleDe: 'Observer / Strategy Pattern im UML-Klassendiagramm & Pseudocode',
      titleAr: 'نمط التصميم <b>Observer / Strategy</b> في مخطط الأصناف والـ<b>Pseudocode</b>',
      summaryDe: 'Entwurf einer lose gekoppelten Architektur über ein <b>Interface</b>, sodass neue Implementierungen ohne Änderung der Hauptklasse ergänzt werden können (<b>Open-Closed-Prinzip</b>).',
      summaryAr: '<b>إحالة امتحانية موثقة (صيف 2023):</b> طُلب رسم العلاقة بين الصنف الرئيسي والواجهة، وكتابة دالة الإشعار أو الحساب بـ<b>Pseudocode</b> نظيف.',
      lessonId: 'design-patterns-praxis', simId: 't1-b'
    },
    {
      id: 'ref-22w-t1-1', type: 'ref', term: 'Winter 2022/23', part: 'Teil 1', module: 'uml',
      questionNo: 'Teil 1 · Aufgabe 4 (XML / DTD-Validierung · 13 P.)',
      titleDe: '4 Validierungsfehler in einer XML-Datei gegen eine gegebene DTD finden',
      titleAr: 'اكتشاف <b>4 أخطاء تحقق (Validierungsfehler)</b> في ملف <b>XML</b> بمقارنته مع <b>DTD</b>',
      summaryDe: 'Abgleich von Kardinalitäten (<code>+</code>, <code>*</code>, <code>?</code>), Elementreihenfolge, Pflichtattributen (<code>#REQUIRED</code>) und Wohlgeformtheit.',
      summaryAr: '<b>إحالة امتحانية موثقة (شتاء 2022/23 - 13 نقطة):</b> تضمنت الأخطاء: عنصر مفقود رمزه <code>+</code> (واحد على الأقل)، عكس ترتيب عنصرين، نسيان خاصية <code>#REQUIRED</code>، ووسم إغلاق متقاطع.',
      lessonId: 'xml-dtd-xsd-regex', simId: 't1-b'
    },
    {
      id: 'ref-22s-t2-1', type: 'ref', term: 'Sommer 2022', part: 'Teil 2', module: 'code',
      questionNo: 'Teil 2 · Aufgabe 2 & 4 (2D-Array Zählerstände & Stored Procedure vs. Trigger)',
      titleDe: 'Monatsverbrauch aus Zählerständen (m+1 minus m) & Datenbank-Trigger vs. Prozedur',
      titleAr: 'حساب الاستهلاك الشهري من <b>قراءات العداد المتتالية</b> ومقارنة <b>Trigger</b> بـ<b>Stored Procedure</b>',
      summaryDe: 'Berechnung von Differenzen benachbarter Spalten <code>verbrauch[vn][m+1] - verbrauch[vn][m]</code> ohne Array-Überlauf sowie Abgrenzung von DB-Triggern.',
      summaryAr: '<b>إحالة امتحانية موثقة (صيف 2022):</b> الفخ كان إيقاف الحلقة الداخلية عند <code>11</code> (وليس 12) لأن <code>m + 1</code> يصل إلى العمود <code>12</code>، وشرح أن <b>Trigger</b> ينطلق تلقائياً عند حدث DML.',
      lessonId: 'sql-belegsatz-profi', simId: 't2-c'
    },
    {
      id: 'ref-21w-wiso-1', type: 'ref', term: 'Winter 2021/22', part: 'WiSo', module: 'wiso',
      questionNo: 'WiSo · Aufgaben 5, 11, 21 & 28 (Komplett-Mix)',
      titleDe: 'Sozialversicherung (BBG), Rechtsformen (KG/GmbH), Tarifrecht & Marktpreisbildung',
      titleAr: 'التأمين الاجتماعي (<b>BBG</b>)، الأشكال القانونية (<b>KG/GmbH</b>)، عقد التعريفة، و<b>توازن السوق</b>',
      summaryDe: 'Bestimmung des Gleichgewichtspreises aus einer Markttabelle, Haftung von Komplementär vs. Kommanditist und Berechnung der Arbeitnehmerbeiträge.',
      summaryAr: '<b>إحالة امتحانية موثقة (شتاء 2021/22):</b> ركّزت على قراءة <b>سعر التوازن (Gleichgewichtspreis)</b> من الجدول، والتمييز بين الشريك المتضامن <b>Komplementär</b> والشريك الموصي <b>Kommanditist</b>.',
      lessonId: 'markt-konjunktur', simId: 'wiso-a'
    },

    // --- PRÜFUNGS-PROGNOSEN ('prognose') — VISUELL GETRENNT MIT BEGRÜNDUNG ---
    {
      id: 'prog-01', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'Teil 1', module: 'qualitaet',
      questionNo: 'AkA-Katalog 2. Auflage · Neuaufnahme Qualitätsmanagement',
      titleDe: 'ISO/IEC 25010: Die 8 Qualitätsmerkmale von Softwareprodukten zuordnen & messbar machen',
      titleAr: 'معيار <b>ISO/IEC 25010</b>: تصنيف خصائص جودة البرمجيات الثماني وصياغتها بشكل قابل للقياس',
      summaryDe: 'Fallbeispiele aus einem Pflichtenheft den Merkmalen <b>Funktionale Eignung, Leistungseffizienz, Kompatibilität, Benutzbarkeit, Zuverlässigkeit, Sicherheit, Wartbarkeit, Übertragbarkeit</b> zuordnen.',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> تمت إضافة معيار <b>ISO/IEC 25010</b> بالاسم الصريح في الطبعة الثانية من كتالوج AkA (الساري منذ صيف 2025) بدلاً من ISO 9126 القديم. احفظ الخصائص الثماني وكيف تكتب متطلباً رقمياً لكل منها.',
      lessonId: 'qualitaet-iso25010-tdd', simId: 't1-c'
    },
    {
      id: 'prog-02', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'Teil 1', module: 'qualitaet',
      questionNo: 'AkA-Katalog 2. Auflage · Neuaufnahme Entwicklungsprozesse',
      titleDe: 'Test-Driven Development (TDD): Red-Green-Refactor-Zyklus & Unit-Test (AAA-Pattern)',
      titleAr: 'التطوير الموجه بالاختبار <b>TDD (Red-Green-Refactor)</b> وهيكل اختبار الوحدة <b>Arrange-Act-Assert</b>',
      summaryDe: 'Ablauf von <b>TDD</b> erklären, fehlerhaften Unit-Test reparieren und begründen, warum Tests vor dem Produktionscode geschrieben werden.',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> بند <b>TDD (Testgetriebene Entwicklung)</b> أُدرج حديثاً في الكتالوج الرسمي لـTeil 1 ولم يُستهلك بعد في مسألة كاملة. ركّز على ترتيب <b>Red → Green → Refactor</b> وكتابة حالة حدية.',
      lessonId: 'qualitaet-iso25010-tdd', simId: 't1-c'
    },
    {
      id: 'prog-03', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'Teil 1', module: 'sicherheit',
      questionNo: 'AkA-Katalog 2. Auflage · Neuaufnahme Authentisierung',
      titleDe: 'Kerberos (AS, TGS, Tickets) & Single Sign-On (SSO) vs. OAuth 2.0 / OpenID Connect',
      titleAr: 'بروتوكول <b>Kerberos (التذاكر AS/TGS)</b> و<b>الدخول الموحد (SSO)</b> مقابل <b>OAuth 2.0</b>',
      summaryDe: 'Sequenz der Ticket-Ausstellung in <b>Kerberos</b> erklären sowie Sicherheitsvorteile und Risiken (Single Point of Attack/Failure) von <b>SSO</b> beurteilen.',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> أضافت AkA موضوعي <b>Kerberos</b> و<b>SSO</b> صراحةً إلى كتالوج FIAE الجديد. افهم وظيفة <b>TGT (Ticket Granting Ticket)</b> ولماذا نفرض <b>MFA</b> مع SSO.',
      lessonId: 'auth-kerberos-oauth-storage', simId: 't1-c'
    },
    {
      id: 'prog-04', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'Teil 1', module: 'systeme',
      questionNo: 'AkA-Katalog 2. Auflage · Neuaufnahme Speicherarchitekturen',
      titleDe: 'Speicherarchitekturen im Vergleich: DAS vs. NAS (Dateiebene) vs. SAN (Blockebene)',
      titleAr: 'مقارنة معماريات التخزين: <b>DAS</b> مقابل <b>NAS (ملفات SMB/NFS)</b> مقابل <b>SAN (كتل iSCSI/FC)</b>',
      summaryDe: 'Für ein Rechenzentrums-Szenario (Datenbank-Cluster vs. gemeinsames Büro-Netzlaufwerk) zwischen <b>NAS</b> und <b>SAN</b> entscheiden und mit RAID/Backup kombinieren.',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> التمييز بين <b>NAS (تخزين شبكي على مستوى الملفات)</b> و<b>SAN (تخزين فائق السرعة على مستوى الكتل Block-Level لقواعد البيانات)</b> بند جديد في الكتالوج ومثالي لأسئلة السيناريو في Teil 1.',
      lessonId: 'auth-kerberos-oauth-storage', simId: 't1-c'
    },
    {
      id: 'prog-05', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'Teil 2', module: 'code',
      questionNo: 'Hohe Rotations-Wahrscheinlichkeit · Teil 2 Algorithmen (25 P.)',
      titleDe: 'Verkettete Liste (Zeiger-Manipulation) oder Binärer Suchbaum (BST Inorder/Suche)',
      titleAr: 'تتبع أو إصلاح <b>قائمة مترابطة (Verkettete Liste)</b> أو <b>شجرة بحث ثنائية (BST)</b> في الـPseudocode',
      summaryDe: 'Einfügen/Entfernen eines Knotens ohne <b>Zeigerverlust</b> (Reihenfolge der Zuweisungen!) oder rekursive Traversierung eines <b>Binärbaums</b>.',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> ينص الكتالوج في LF 11a على هياكل البيانات الديناميكية؛ بعد تكرار المصفوفات في عدة دورات، يُعد سؤال <b>إصلاح خطأ المؤشر (Pointer Bug)</b> أو تتبع شجرة <b>BST</b> المرشح الأقوى للمفاجأة.',
      lessonId: 'datenstrukturen-baeume-listen', simId: 't2-b'
    },
    {
      id: 'prog-06', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'Teil 2', module: 'code',
      questionNo: 'Dauerbrenner-Kandidat · Teil 2 Algorithmen (25 P.)',
      titleDe: 'Zweistufiger Gruppenwechsel oder 2D-Array-Auswertung mit Fehlersuche (Bugfixing)',
      titleAr: 'خوارزمية <b>Gruppenwechsel</b> أو مصفوفة <b>2D-Array</b> مع جدول تتبع وإصلاح خطأ منطقي',
      summaryDe: 'Entweder von Grund auf schreiben oder in gegebenem Code den <b>Letzte-Gruppe-Bug</b> bzw. einen <b>Off-by-One-Indexfehler</b> per Schreibtischtest nachweisen.',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> خوارزميات التجميع وكسر المجموعات والمصفوفات ثنائية الأبعاد تشكل العمود الفقري لـTeil 2 في أكثر من 70% من الدورات؛ التدرب على <b>كتابتها وتصحيحها معاً</b> يضمن لك 25 نقطة.',
      lessonId: 'algo-2d-gruppenwechsel', simId: 't2-b'
    },
    {
      id: 'prog-07', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'Teil 2', module: 'daten',
      questionNo: 'Höchste Auftretenswahrscheinlichkeit · Teil 2 SQL (30 P.)',
      titleDe: 'SQL: LEFT JOIN mit Filter in ON, COALESCE, GROUP BY / HAVING & Transaktions-Archivierung',
      titleAr: 'استعلام <b>LEFT JOIN (الشرط في ON)</b> مع <b>COALESCE</b> و<b>GROUP BY / HAVING</b> وأرشفة البيانات بمعاملة',
      summaryDe: 'Berichtsabfrage, die auch Datensätze mit <b>Anzahl/Summe 0</b> erhält, kombiniert mit einer <code>INSERT INTO ... SELECT</code> / <code>DELETE</code>-Transaktion.',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> لا يخلو امتحان Teil 2 تقريباً من فخ <b>الاحتفاظ بالسجلات الصفرية عبر LEFT JOIN</b>؛ وضع شرط التصفية داخل <code>ON</code> بدلاً من <code>WHERE</code> هو الفارق بين العلامة الكاملة وخسارة نصف نقاط السؤال.',
      lessonId: 'sql-joins', simId: 't2-a'
    },
    {
      id: 'prog-08', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'Teil 1', module: 'uml',
      questionNo: 'AkA-Katalog & Rotation · Teil 1 Formate & Validierung',
      titleDe: 'Reguläre Ausdrücke (RegEx) für Eingabevalidierung & XML/XSD vs. JSON-Schema',
      titleAr: 'بناء أو قراءة <b>تعبير نمطي (RegEx)</b> للتحقق من المدخلات ومقارنة <b>XML/XSD</b> بـ<b>JSON</b>',
      summaryDe: 'Einen <b>RegEx</b> für Artikelnummern/Postleitzahlen/Passwortregeln lesen oder vervollständigen (<code>^</code>, <code>$</code>, <code>[0-9]{4}</code>, <code>+</code>, <code>?</code>).',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> بند <b>Reguläre Ausdrücke</b> موجود صراحةً في الكتالوج، وهو سؤال مثالي من 8 إلى 12 نقطة لفحص دقة المطور في التحقق من المدخلات (Input Validation).',
      lessonId: 'xml-dtd-xsd-regex', simId: 't1-b'
    },
    {
      id: 'prog-09', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'WiSo', module: 'wiso',
      questionNo: 'WiSo-Klassiker & Neue Rechtslage · Arbeitsrecht',
      titleDe: 'Kündigungsfrist § 622 BGB (Eigenkündigung vs. AG-Kündigung) & JAV-Wahlrecht ohne Azubi-Altersgrenze',
      titleAr: 'حساب تاريخ الإنهاء وفق <b>§ 622 BGB</b> وفخ أعمار الناخبين في <b>JAV (§ 60 BetrVG)</b>',
      summaryDe: 'Berechnung des exakten Zugangs- oder Enddatums bei Kündigung sowie Zuordnung der Wahlberechtigung für über 25-jährige Auszubildende.',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> تركز أسئلة WiSo الحديثة على الفخاخ القانونية الدقيقة: 1) سنوات الخدمة تطيل مهلة صاحب العمل فقط وليس استقالة الموظف، 2) إلغاء سقف 25 سنة للمتدربين في انتخابات <b>JAV</b>.',
      lessonId: 'kuendigung', simId: 'wiso-b'
    },
    {
      id: 'prog-10', type: 'prognose', term: 'Prognose nächste Prüfung', part: 'WiSo', module: 'wiso',
      questionNo: 'WiSo-Rechenkästchen · BWL & Sozialversicherung',
      titleDe: 'Bezugskalkulation / Rückwärtskalkulation, GmbH-Gewinnanteil (§ 29 GmbHG) & BBG-Kappung',
      titleAr: 'الحساب الأمامي والعكسي للأسعار، <b>توزيع أرباح GmbH</b>، وسقف اشتراك التأمين <b>BBG</b>',
      summaryDe: 'Vier typische WiSo-Rechenaufgaben: <b>Rabatt vor Skonto</b>, <b>Brutto / 1,19 = Netto</b>, Gewinn nach <b>Stammkapital-Anteil</b> und Beitrag nur bis zur <b>BBG</b>.',
      summaryAr: '<b>أتوقع ورود هذه المعلومة:</b> <b>سبب الترجيح:</b> الأسئلة الحسابية في WiSo تمنح نقاطاً مضمونة وسريعة، وهذه المعادلات الأربع تتناوب في كل دورة امتحانية تقريباً.',
      lessonId: 'bwl-rechnen', simId: 'wiso-a'
    }
  ];

  // =========================================================================
  // 3. BEWERTUNGSSCHEMATA, ALTERNATIVE LÖSUNGEN & RANDFALL-TESTS (Codex #4)
  // =========================================================================
  window.COURSE.exerciseMeta = {
    'sql-joins': {
      rubric: [
        ['2 P.', 'Richtige Basistabelle links gewählt und LEFT JOIN (bzw. INNER JOIN je nach Anforderung) korrekt angesetzt', 'اختيار الجدول الرئيسي على اليسار واستخدام <b>LEFT JOIN</b> للحفاظ على السجلات الصفرية'],
        ['2 P.', 'Verknüpfungsbedingung (PK = FK) und Filter auf die rechte Tabelle (z. B. status = \'bezahlt\') in ON statt WHERE platziert', 'كتابة شرط الربط وشرط تصفية الجدول الأيمن داخل <b>ON</b> وليس في <b>WHERE</b>'],
        ['2 P.', 'NULL-Werte bei Summen/Anzahlen korrekt behandelt (z. B. COUNT(rechte_pk) statt COUNT(*) bzw. COALESCE(SUM(...), 0))', 'معالجة القيم الفارغة بشكل صحيح عبر <b>COUNT(b.id)</b> أو <b>COALESCE(..., 0)</b>'],
        ['1 P.', 'GROUP BY und ORDER BY vollständig und syntaktisch sauber abgeschlossen', 'إكمال <b>GROUP BY</b> و<b>ORDER BY</b> بدون أخطاء صياغة']
      ],
      altHintDe: '<b>Alternative gültige Lösung (IHK-Korrekturhinweis):</b> Statt <code>LEFT JOIN ... GROUP BY</code> akzeptieren Prüfer bei reinen Summen-/Zählabfragen oft auch eine <b>korrelierte Unterabfrage im SELECT</b>: <code>SELECT k.id, k.name, (SELECT COALESCE(SUM(p.menge*p.preis),0) FROM Bestellung b JOIN Position p ON ... WHERE b.kunde_id = k.id AND b.status = \'bezahlt\') AS umsatz FROM Kunde k;</code>',
      altHintAr: '<b>حل بديل مقبول في تصحيح IHK:</b> بالإضافة إلى حل <b>LEFT JOIN + GROUP BY</b>، يقبل المصححون أيضاً استخدام <b>استعلام فرعي مترابط (Correlated Subquery) داخل SELECT</b> لحساب المجموع أو العدد لكل عميل مع <code>COALESCE(..., 0)</code>.',
      edgeCaseHtml: `<table><thead><tr><th>Test-Kunde in DB</th><th>Bestellungen</th><th>Ergebnis mit Filter in <code>WHERE</code> ❌</th><th>Ergebnis mit Filter in <code>ON</code> (LEFT JOIN) ✅</th></tr></thead><tbody><tr><td>1 · Ada</td><td>#10 (bezahlt, 200 €)</td><td>Ada · 200 €</td><td><b>Ada · 200 €</b></td></tr><tr><td>2 · Bilal</td><td>#12 (offen, 90 €)</td><td><i>Verschwindet komplett!</i> (NULL ≠ 'bezahlt')</td><td><b>Bilal · 0 € (bleibt erhalten!)</b></td></tr><tr><td>3 · Clara</td><td><i>Keine Bestellung</i></td><td><i>Verschwindet komplett!</i></td><td><b>Clara · 0 € (bleibt erhalten!)</b></td></tr></tbody></table>`
    },
    'sql-gruppen': {
      rubric: [
        ['2 P.', 'Einzelzeilen vor der Gruppierung mit WHERE korrekt gefiltert', 'تصفية الصفوف الفردية قبل التجميع باستخدام <b>WHERE</b>'],
        ['2 P.', 'Aggregatfunktion (SUM, COUNT, AVG) fachlich passend gewählt (z. B. SUM(menge * preis))', 'اختيار دالة التجميع الصحيحة مثل <b>SUM(menge * preis)</b>'],
        ['2 P.', 'Alle nicht-aggregierten SELECT-Spalten in GROUP BY aufgenommen', 'إدراج كافة أعمدة العرض غير المجمعة داخل <b>GROUP BY</b>'],
        ['1 P.', 'Gruppenbedingung nach der Aggregation mit HAVING (nicht WHERE!) formuliert', 'وضع شرط تصفية المجموعات داخل <b>HAVING</b> وليس <b>WHERE</b>']
      ],
      altHintDe: '<b>Alternative gültige Lösung:</b> Eine <code>HAVING</code>-Filterung kann alternativ über eine <b>abgeleitete Tabelle (Subquery im FROM)</b> oder eine <b>CTE (WITH ...)</b> gelöst werden, in der zuerst gruppiert und außen mit <code>WHERE gesamt >= 250</code> gefiltert wird.',
      altHintAr: '<b>حل بديل مقبول:</b> يمكن استبدال <b>HAVING</b> بوضع استعلام التجميع داخل جدول فرعي في <code>FROM (...) AS t</code> ثم التصفية خارجه بـ<code>WHERE t.gesamt >= 250</code>.',
      edgeCaseHtml: `<table><thead><tr><th>Kunde</th><th>Zeilen in DB</th><th><code>COUNT(*)</code></th><th><code>COUNT(betrag)</code></th><th><code>SUM(betrag)</code></th></tr></thead><tbody><tr><td>Kunde 8</td><td>(80 €) und (NULL)</td><td><b>2</b> (zählt alle Zeilen)</td><td><b>1</b> (ignoriert NULL)</td><td><b>80 €</b> (NULL wird ignoriert)</td></tr></tbody></table>`
    },
    'algo-2d-gruppenwechsel': {
      rubric: [
        ['2 P.', 'Randfall leere Eingabeliste (length == 0) vor dem ersten Zugriff [0] abgefangen', 'فحص <b>القائمة الفارغة (length == 0)</b> قبل قراءة العنصر الأول'],
        ['3 P.', 'Gruppenschlüssel und Zähler/Summen korrekt initialisiert und Index-Offset (z. B. tag-1, stunde-9) beachtet', 'تهيئة مفتاح المجموعة والعدادات ومراعاة <b>إزاحة الفهرس (Offset)</b>'],
        ['3 P.', 'Beim Gruppenwechsel (alt != neu) erst alte Gruppe ausgegeben und danach Zähler für neue Gruppe zurückgesetzt', 'عند <b>تغير المفتاح</b>: طباعة المجموعة السابقة أولاً ثم تصفير العدادات للمجموعة الجديدة'],
        ['2 P.', 'Letzte Gruppe NACH dem Ende der Schleife ausgegeben / zur Gesamtsumme addiert (Kein Letzte-Gruppe-Bug!)', 'طباعة وإغلاق <b>المجموعة الأخيرة بعد انتهاء الحلقة</b>']
      ],
      altHintDe: '<b>Alternative gültige Lösung:</b> Statt der Nachlauf-Ausgabe nach der Schleife akzeptiert die IHK auch eine Schleife bis <code>i = n</code> mit einer Bedingung <code>wenn i == n ODER buchungen[i].abt != aktAbt</code> oder eine verschachtelte <code>while (i < n)</code>-Schleife, deren innere Schleife jeweils eine Gruppe komplett abarbeitet.',
      altHintAr: '<b>حل بديل مقبول:</b> بدلاً من تكرار سطر الطباعة بعد الحلقة، يمكن استخدام <b>حلقتي while متداخلتين</b> بحيث تعالج الحلقة الداخلية عناصر المجموعة الواحدة حتى يتغير المفتاح ثم تطبع النتيجة في نهاية كل دورة خارجية.',
      edgeCaseHtml: `<table><thead><tr><th>Eingabedaten</th><th>Buggy Code (Ausgabe nur im <code>if</code>) ❌</th><th>Korrekter Code (mit Nachlauf nach Schleife) ✅</th></tr></thead><tbody><tr><td><code>[Jan:15, Jan:25, Feb:20]</code></td><td>Gibt nur <b>Jan (40)</b> aus — <b>Feb fehlt komplett!</b></td><td>Gibt <b>Jan (40)</b> UND <b>Feb (20)</b> aus</td></tr><tr><td><code>[]</code> (Leere Liste)</td><td><code>IndexOutOfBounds</code> bei <code>list[0]</code></td><td><b>Sicherer Abbruch / Gesamtsumme 0</b></td></tr></tbody></table>`
    },
    'datenstrukturen-baeume-listen': {
      rubric: [
        ['2 P.', 'Basisfall / leerer Zeiger (null) vor Dereferenzierung (knoten.wert / knoten.naechster) geprüft', 'فحص <b>المؤشر الفارغ (null)</b> قبل الوصول إلى خصائص العقدة'],
        ['3 P.', 'Reihenfolge der Zeigerzuweisungen beim Einfügen/Löschen korrekt (erst neuen Nachfolger sichern, dann Kopf/Vorgänger umbiegen)', 'ترتيب تعديل المؤشرات بشكل صحيح حتى <b>لا تضيع بقية القائمة (Zeigerverlust)</b>'],
        ['2 P.', 'Traversierungsreihenfolge (Inorder: Links → Wurzel → Rechts) bzw. Suchbedingung (< links, > rechts) exakt eingehalten', 'الالتزام بترتيب الاجتياز <b>Inorder (يسار ← جذر ← يمين)</b> أو شرط المقارنة']
      ],
      altHintDe: '<b>Alternative gültige Lösung:</b> Die Suche in einem <b>Binären Suchbaum (BST)</b> oder einer verketteten Liste kann sowohl <b>rekursiv</b> als auch <b>iterativ mit einer <code>while (aktuell != null)</code>-Schleife</b> (spart Call-Stack-Speicher!) voll bepunktet gelöst werden.',
      altHintAr: '<b>حل بديل مقبول:</b> البحث في شجرة البحث الثنائية <b>BST</b> يقبل الحل <b>العودي (Rekursiv)</b> أو الحل <b>التكراري بحلقة <code>while (aktuell != null)</code></b> وكلاهما ينال العلامة الكاملة.',
      edgeCaseHtml: `<table><thead><tr><th>Operation am Listenkopf</th><th>Falsche Reihenfolge ❌</th><th>Richtige Reihenfolge ✅</th></tr></thead><tbody><tr><td>Neuen Knoten <code>neu</code> vorn einfügen</td><td><code>kopf = neu; neu.next = kopf;</code> (Zeigt auf sich selbst, Restliste verloren!)</td><td><b><code>neu.next = kopf; kopf = neu;</code> (Liste bleibt vollständig verkettet!)</b></td></tr></tbody></table>`
    },
    'normalisierung': {
      rubric: [
        ['2 P.', '1NF hergestellt: Atomare Attributwerte, Wiederholungsgruppen aufgelöst und Primärschlüssel bestimmt', 'تحقيق <b>1NF</b>: قيم ذرية وتحديد المفتاح الأساسي'],
        ['3 P.', '2NF hergestellt: Alle Attribute, die nur von einem Teil des zusammengesetzten Schlüssels abhängen, in eigene Tabellen ausgelagert', 'تحقيق <b>2NF</b>: فصل الأعمدة المعتمدة جزئياً على المفتاح المركب'],
        ['3 P.', '3NF hergestellt: Transitive Abhängigkeiten zwischen Nicht-Schlüsselattributen in eigene Tabellen getrennt', 'تحقيق <b>3NF</b>: فصل الاعتماد الانتقالي بين الأعمدة غير المفتاحية'],
        ['2 P.', 'Alle Primärschlüssel (PK) und Fremdschlüssel (FK) in allen Zieltabellen eindeutig gekennzeichnet', 'تمييز جميع <b>المفاتيح الأساسية (PK) والأجنبية (FK)</b> بوضوح']
      ],
      altHintDe: '<b>Korrekturhinweis:</b> Ob du für eine m:n-Beziehungstabelle einen <b>zusammengesetzten Primärschlüssel</b> <code>(BestellNr PK/FK, ArtikelNr PK/FK)</code> oder einen <b>künstlichen Surrogatschlüssel</b> <code>(PositionsID PK, BestellNr FK, ArtikelNr FK)</code> wählst, ist beides richtig – solange bei Wiederholbarkeit (z. B. Ausleihe an verschiedenen Tagen) das Datum Teil des Schlüssels ist oder eine eigene ID genutzt wird.',
      altHintAr: '<b>ملاحظة تصحيحية:</b> يُقبل في جدول كسر العلاقة استخدام <b>مفتاح أساسي مركب (PK/FK)</b> أو <b>مفتاح اصطناعي مستقل (ID PK)</b> مع مفاتيح أجنبية، بشرط مراعاة إمكانية تكرار العلاقة عبر الزمن.'
    }
  };
})();
