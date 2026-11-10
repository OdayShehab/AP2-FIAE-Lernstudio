/* Priority 3 — WiSo Komplett-Enzyklopädie (Alle 9 IHK-Prüfungen 2021W–2025W + 15 tödliche Fallen + 30 Prognosen + BWL/ITIL/Ergonomie) */
(function () {
  function QMC(q, options, correct, a, ar, points = 4) {
    return { q, options, correct, a, ar, points };
  }

  function addSec(id, sections, questions, terms) {
    const lesson = COURSE.lessons.find(x => x.id === id);
    if (!lesson) return;
    if (sections && sections.length) lesson.sections.push(...sections);
    if (questions && questions.length) lesson.questions.push(...questions);
    if (terms && terms.length) lesson.terms.push(...terms);
  }

  /* ==========================================================================
   * 1. NEUE KERN-LEKTION: WiSo-Prüfungssystem, 15 tödliche Fallen & Gerichtsbarkeiten
   * ========================================================================== */
  L('wiso-system-fallen-gerichte', 'wiso',
    'WiSo-Masterplan: 15 Prüfungsfallen, Gerichtsbarkeiten & Zeugniscodes',
    'الخطة الشاملة لـ WiSo: أشهر 15 فخاً، المحاكم الـ 5، وشفرات شهادة الخبرة',
    'Kern',
    'Bewertungssystem (Teil- vs. Globalbewertung), die 15 häufigsten IHK-Fallen aus 2021W–2025W, 5 Gerichtsbarkeiten und Geheimcodes im Arbeitszeugnis (Note 1–6).',
    [
      S('Das IHK-WiSo-Prüfungssystem & die 4 Fragetypen meistern',
        `<p>Der Prüfungsteil 3 (<b>Wirtschafts- und Sozialkunde – WiSo</b>) dauert <b>60 Minuten</b>, umfasst ca. <b>30 maschinell ausgewertete Aufgaben</b> (~3,33 Punkte pro Aufgabe) und zählt <b>10 %</b> zur Gesamtnote der AP2. Achtung bei der Sperrklausel: In der AP2 darf kein Teil mit „ungenügend“ (&lt; 30 Punkte) abgeschlossen werden und mindestens drei Bereiche müssen ≥ 50 Punkte erreichen!</p>
        <table>
          <thead><tr><th>Fragetyp im WiSo-Bogen</th><th>Wie wird bewertet?</th><th>Prüfungstaktik</th></tr></thead>
          <tbody>
            <tr><td><b>1. Klassisches Multiple-Choice (1 aus 5)</b></td><td>Genau 1 Kennziffer (1–5) eintragen.</td><td>Ausschlussverfahren: Achte auf absolute Signalwörter wie <i>„immer“, „ausschließlich“, „nie“, „jederzeit“</i> — diese sind fast immer falsch!</td></tr>
            <tr><td><b>2. Mehrfachauswahl (z. B. 2 aus 6 oder 3 aus 7)</b></td><td><b>Teilbewertung!</b> Jede richtige Ziffer gibt Teilpunkte.</td><td>Nie ein Kästchen leer lassen! Selbst wenn du nur 1 von 2 sicher weißt, sichert dir das die halbe Punktzahl.</td></tr>
            <tr><td><b>3. Zuordnung &amp; Reihenfolge <code>[1;4]</code></b></td><td>Kombination aus Kategorie und Aussage bzw. chronologische Kästchen. Bei manchen Reihenfolgen gilt <b>Globalbewertung</b> (alles oder nichts).</td><td>Beginne bei Reihenfolgen (z. B. Tarifkonflikt oder Mahnverfahren) immer mit dem eindeutig ersten und letzten Schritt.</td></tr>
            <tr><td><b>4. Rechenkästchen (Zahlenwert / Datum)</b></td><td>Exakter Wert (oft auf 2 Nachkommastellen kaufmännisch gerundet) oder Datum <code>TT.MM.JJJJ</code>.</td><td>Einheit im Kopf prüfen (€, %, Stück, Datum). Bei § 622 BGB exakt zwischen AN-Kündigung (Abs. 1) und AG-Kündigung (Abs. 2) trennen!</td></tr>
          </tbody>
        </table>`,
        `<p>يتكون امتحان <b>WiSo</b> من نحو <b>30 سؤالاً في 60 دقيقة</b> (تُصحح آلياً وتمثل 10% من علامة AP2 الكلية). انتبه لنظام التقييم:</p>
        <ul>
          <li><b>التقييم الجزئي (Teilbewertung):</b> في أسئلة الاختيار المتعدد (مثل اختر إجابتين من 6) أو المطابقة، كل رقم صحيح تكتبه يمنحك جزءاً من العلامة حتى لو أخطأت في الرقم الثاني.</li>
          <li><b>التقييم الكلي (Globalbewertung):</b> في بعض أسئلة الترتيب التسلسلي، يجب أن يكون التسلسل كاملاً صحيحاً.</li>
          <li><b>تكتيك ذهبي:</b> احذر الكلمات المطلقة في الخيارات الخاطئة مثل: (<code>immer</code> دائماً، <code>ausschließlich</code> حصرياً، <code>jederzeit</code> في أي وقت، <code>ohne Ausnahme</code> بلا استثناء).</li>
        </ul>`),

      S('Die 15 tödlichsten IHK-Fallen (2021W–2025W) auf einen Blick',
        `<p><b>Diese 15 Fallen wurden in den 9 Originalprüfungen (Winter 2021/22 bis Winter 2025/26) gezielt eingebaut, um unaufmerksame Prüflinge Punkte zu kosten:</b></p>
        <table>
          <thead><tr><th>Nr.</th><th>Die typische IHK-Falle</th><th>Die einzig richtige Prüfungsregel</th></tr></thead>
          <tbody>
            <tr><td><b>01</b></td><td>„Die GmbH haftet maximal mit 25.000 €.“ (2021W, 2024W, 2025S)</td><td><b>Falsch!</b> 25.000 € ist nur das Mindeststammkapital bei Gründung. Die GmbH haftet mit ihrem <b>gesamten Gesellschafts-/Betriebsvermögen</b>.</td></tr>
            <tr><td><b>02</b></td><td>„Über der Beitragsbemessungsgrenze (BBG) ist man versicherungsfrei.“ (2022S, 2023W)</td><td><b>Falsch!</b> Das ist die <b>Versicherungspflichtgrenze (JAEG)</b>. Die BBG deckelt nur den Betrag, bis zu dem Beiträge berechnet werden.</td></tr>
            <tr><td><b>03</b></td><td>Arbeitnehmeranteil bei Sozialversicherung nochmals durch 2 teilen (2024W, 2025S)</td><td>Ist in der Aufgabe bereits der <b>AN-Anteil</b> angegeben, wird er <b>nicht</b> halbiert! Nur den Gesamtbeitragssatz teilt man durch 2.</td></tr>
            <tr><td><b>04</b></td><td>Unfallversicherung (UV) vom Bruttolohn des AN abziehen (2021W, 2024S)</td><td>Die gesetzliche UV (Berufsgenossenschaft) zahlt zu <b>100 % der Arbeitgeber allein</b>!</td></tr>
            <tr><td><b>05</b></td><td>„Azubis über 25 dürfen die JAV nicht wählen.“ (2024W, 2025W)</td><td><b>Veraltet!</b> Wahlberechtigt zur JAV sind <b>alle Auszubildenden ohne Altersgrenze</b> (auch mit 29 Jahren) sowie jugendliche AN unter 18 (§ 61 BetrVG).</td></tr>
            <tr><td><b>06</b></td><td>„Ohne Zustimmung des Betriebsrats ist eine Kündigung unwirksam.“ (2021W, 2023S)</td><td>Erforderlich ist die <b>Anhörung (§ 102 BetrVG)</b> vor jeder Kündigung, aber der BR hat bei regulären AN <b>kein Veto-Recht</b> (Widerspruch eröffnet nur Weiterbeschäftigungsanspruch im Prozess).</td></tr>
            <tr><td><b>07</b></td><td>Bei Eigenkündigung des AN die Dienstjahre nach § 622 Abs. 2 BGB anwenden (2024S, 2025S)</td><td>Die gestaffelten Fristen nach Dienstjahren (1 bis 7 Monate zum Monatsende) gelten gesetzlich <b>nur für die Kündigung durch den Arbeitgeber</b>! Für AN gilt Abs. 1: 4 Wochen (28 Tage) zum 15. oder Monatsende.</td></tr>
            <tr><td><b>08</b></td><td>Probezeit im Ausbildungsvertrag = 6 Monate (2021W, 2023W)</td><td>Im Ausbildungsvertrag (§ 20 BBiG) zwingend <b>1 bis maximal 4 Monate</b>! Bis zu 6 Monate gilt nur im regulären Arbeitsvertrag (§ 622 Abs. 3 BGB).</td></tr>
            <tr><td><b>09</b></td><td>Ü45-Mitarbeiter oder leitende Angestellte genießen besonderen Kündigungsschutz (2021W)</td><td><b>Falsch!</b> Besonderen Kündigungsschutz haben nur: Schwangere/Mütter, Elternzeit, Schwerbehinderte (GdB ≥ 50), Azubis nach Probezeit, BR-/JAV-Mitglieder, Datenschutzbeauftragte.</td></tr>
            <tr><td><b>10</b></td><td>Grundlohn für Überstunden/Nachtstunden doppelt addieren (2024S)</td><td>Sind 10 Nachtstunden bereits in „170 Gesamtstunden“ enthalten, wird für diese 10 Stunden <b>nur noch der Zuschlag</b> (z. B. 25 %) addiert!</td></tr>
            <tr><td><b>11</b></td><td>Stabsstelle im Organigramm hat Weisungsbefugnis (2021W, 2023S)</td><td>Eine <b>Stabsstelle</b> berät und bereitet Entscheidungen vor, hat aber <b>keine Weisungsbefugnis</b> gegenüber den unterstellten Linienstellen.</td></tr>
            <tr><td><b>12</b></td><td>Bei Mangel sofort vom Kaufvertrag zurücktreten (2023W, 2025W)</td><td>Es gilt der <b>Vorrang der Nacherfüllung (§ 439 BGB)</b> (Reparatur/Nachbesserung oder Ersatzlieferung). Rücktritt/Minderung erst auf Stufe 2!</td></tr>
            <tr><td><b>13</b></td><td>Softwareentwicklung in Wirtschaftssektoren immer dem Tertiärsektor zuordnen (2022S)</td><td>In der IHK-Klassifikation (2022S Q27) wurde die <b>Erstellung/Produktion von Software</b> dem <b>sekundären Sektor</b> (Gütererzeugung) und erst die reine IT-Beratung/Schulung dem <b>tertiären Sektor</b> zugeordnet!</td></tr>
            <tr><td><b>14</b></td><td>Prokurist darf Betriebsgrundstücke verkaufen oder Bilanz unterschreiben (2023S)</td><td><b>Nein!</b> Grundstücksverkauf/-belastung (ohne Sondervollmacht), Handelsregisteranmeldungen, Bilanzunterschrift und Prokuraerteilung sind für Prokuristen verboten (§ 49 HGB).</td></tr>
            <tr><td><b>15</b></td><td>Rot-rundes Sicherheitszeichen = Brandschutz (2022S, 2025W)</td><td>Rot + <b>Kreis</b> = <b>Verbotszeichen</b>. Rot + <b>Quadrat/Rechteck</b> = <b>Brandschutzzeichen</b>!</td></tr>
          </tbody>
        </table>`,
        `<p>هذا الجدول يلخص <b>أخطر 15 فخاً امتحانياً (⚠️ فخ امتحاني)</b> تكررت فعلياً في امتحانات IHK من شتاء 2021 إلى شتاء 2025. مراجعة هذا الجدول ليلة الامتحان تحميك من خسارة 15 إلى 25 درجة مجانية!</p>`),

      S('Gerichtsbarkeiten in Deutschland & Geheimcodes im Arbeitszeugnis (Note 1–6)',
        `<p>Zwei klassische Zuordnungsthemen aus den Prüfungen (z. B. <b>2022W Q21</b> zu Gerichtsbarkeiten und <b>2024W Q11</b> zum Arbeitszeugnis):</p>
        <h3>1. Die 5 Gerichtsbarkeiten – Wer ist wofür zuständig?</h3>
        <table>
          <thead><tr><th>Gerichtsbarkeit (Erste Instanz)</th><th>Typische Streitfälle in der WiSo-Prüfung</th></tr></thead>
          <tbody>
            <tr><td><b>Arbeitsgericht</b></td><td>Kündigungsschutzklage (3-Wochen-Frist!), Streit um Lohn/Gehalt, Urlaubsanspruch, Abmahnung, Berichtigung des Arbeitszeugnisses, Streit um Betriebsrat.</td></tr>
            <tr><td><b>Sozialgericht</b></td><td>Streit mit gesetzlichen Sozialversicherungen: Krankenkasse verweigert Krankengeld, Berufsgenossenschaft lehnt Anerkennung eines Arbeits-/Wegeunfalls ab, Streit um ALG I oder Rente.</td></tr>
            <tr><td><b>Ordentliche Gerichtsbarkeit (Amtsgericht / Landgericht)</b></td><td>Zivilrechtliche Streitigkeiten zwischen Unternehmen und Kunden/Lieferanten (z. B. Kaufpreis, Schadensersatz, Mängel, Mietstreit), Mahnverfahren sowie Strafsachen.</td></tr>
            <tr><td><b>Verwaltungsgericht</b></td><td>Streit zwischen Bürger/Unternehmen und einer Behörde des öffentlichen Rechts (z. B. Baugenehmigung verweigert, Gewerbeuntersagung, Polizei-/Ordnungsrecht).</td></tr>
            <tr><td><b>Finanzgericht</b></td><td>Streit mit dem <b>Finanzamt</b> über Einkommensteuer-, Körperschaftsteuer-, Gewerbesteuer- oder Umsatzsteuerbescheide (nach erfolglosem Einspruch).</td></tr>
          </tbody>
        </table>
        <h3>2. Einfaches vs. Qualifiziertes Arbeitszeugnis &amp; die Zeugnissprache (Note 1–6)</h3>
        <ul>
          <li><b>Einfaches Arbeitszeugnis:</b> Enthält nur Personalien sowie <b>Art und Dauer</b> der Beschäftigung (keine Bewertung).</li>
          <li><b>Qualifiziertes Arbeitszeugnis:</b> Enthält zusätzlich eine Beurteilung von <b>Leistung und Verhalten</b> (nur auf Verlangen des Arbeitnehmers!).</li>
          <li><b>Zwei Grundsätze der Zeugniserstellung:</b> <b>Wahrheitspflicht</b> (Tatsachen müssen stimmen) und <b>Wohlwollensgebot</b> (darf das berufliche Fortkommen nicht unnötig erschweren – daher bildeten sich Standardformulierungen heraus):</li>
        </ul>
        <table>
          <thead><tr><th>Schulnote</th><th>Bedeutung</th><th>Klassische Zeugnisformulierung („Zufriedenheitsskala“)</th></tr></thead>
          <tbody>
            <tr><td><b>Note 1</b></td><td>Sehr gut</td><td>„Er/Sie erledigte die Aufgaben <b>stets zu unserer vollsten Zufriedenheit</b>.“</td></tr>
            <tr><td><b>Note 2</b></td><td>Gut</td><td>„... <b>stets zu unserer vollen Zufriedenheit</b>.“ (oder „zu unserer vollsten Zufriedenheit“ ohne „stets“)</td></tr>
            <tr><td><b>Note 3</b></td><td>Befriedigend</td><td>„... <b>zu unserer vollen Zufriedenheit</b>.“ (oder „stets zu unserer Zufriedenheit“)</td></tr>
            <tr><td><b>Note 4</b></td><td>Ausreichend</td><td>„... <b>zu unserer Zufriedenheit</b>.“ (weder „stets“ noch „vollen“)</td></tr>
            <tr><td><b>Note 5</b></td><td>Mangelhaft</td><td>„... <b>im Großen und Ganzen zu unserer Zufriedenheit</b>.“</td></tr>
            <tr><td><b>Note 6</b></td><td>Ungenügend</td><td>„Er/Sie <b>hat sich bemüht</b>, den Anforderungen gerecht zu werden.“</td></tr>
          </tbody>
        </table>`,
        `<p><b>🔴 امتحان سابق (2022W Q21 &amp; 2024W Q11):</b></p>
        <ul>
          <li><b>المحاكم الخمس (Gerichtsbarkeiten):</b> نزاع مع صاحب العمل حول الفصل أو الراتب أو شهادة الخبرة $\\rightarrow$ <code>Arbeitsgericht</code>. نزاع مع صندوق التأمين الصحي أو تأمين الحوادث (BG) أو مكتب العمل $\\rightarrow$ <code>Sozialgericht</code>. نزاع تجاري مع عميل أو مورد $\\rightarrow$ <code>Amts-/Landgericht</code>. نزاع حول الضرائب مع Finanzamt $\\rightarrow$ <code>Finanzgericht</code>.</li>
          <li><b>شفرات شهادة الخبرة (Zeugnissprache):</b> كلمة السر هي اجتماع كلمتي <code>stets</code> (دائماً) و <code>vollsten</code> (أكمل وجه):
            <br>1 = <code>stets + vollsten</code> | 2 = <code>stets + vollen</code> | 3 = <code>vollen</code> (بدون stets) | 4 = <code>Zufriedenheit</code> فقط | 5 = <code>im Großen und Ganzen</code> | 6 = <code>hat sich bemüht</code> (حاول جهده = راسب!).</li>
        </ul>`)
    ],
    [
      ['Teilbewertung', 'تقييم جزئي (كل إجابة صحيحة تعطي جزءاً من الدرجة)'],
      ['Arbeitsgericht', 'محكمة العمل (النزاعات بين الموظف وصاحب العمل)'],
      ['Sozialgericht', 'المحكمة الاجتماعية (النزاعات مع التأمينات الاجتماعية)'],
      ['Qualifiziertes Arbeitszeugnis', 'شهادة خبرة مفصلة تتضمن تقييم الأداء والسلوك'],
      ['Wohlwollensgebot', 'مبدأ حسن النية في صياغة شهادة الخبرة']
    ],
    [
      QMC(
        'Welches Gericht ist zuständig, wenn die Berufsgenossenschaft (BG) nach einem Sturz auf dem Arbeitsweg die Anerkennung als Wegeunfall verweigert? (1 aus 5)',
        [
          '1. Arbeitsgericht',
          '2. Sozialgericht',
          '3. Verwaltungsgericht',
          '4. Amtsgericht (Zivilgericht)',
          '5. Finanzgericht'
        ],
        [1],
        'Richtig ist 2 (Sozialgericht). Streitigkeiten mit Trägern der gesetzlichen Sozialversicherung (Krankenkasse, Rentenversicherung, Bundesagentur für Arbeit, Berufsgenossenschaft) gehören vor das Sozialgericht. Das Arbeitsgericht ist nur für Streitigkeiten zwischen Arbeitnehmer und Arbeitgeber zuständig.',
        'النزاع هنا ليس مع صاحب العمل، بل مع هيئة التأمين ضد الحوادث (Berufsgenossenschaft)، وهي إحدى الركائز الخمس للتأمين الاجتماعي، لذا تختص به المحكمة الاجتماعية (Sozialgericht).',
        4
      ),
      QMC(
        'In einem qualifizierten Arbeitszeugnis steht der Satz: „Herr Müller hat die ihm übertragenen Aufgaben stets zu unserer vollen Zufriedenheit erledigt.“ Welcher Schulnote entspricht diese Formulierung? (1 aus 5)',
        [
          '1. Note 1 (sehr gut)',
          '2. Note 2 (gut)',
          '3. Note 3 (befriedigend)',
          '4. Note 4 (ausreichend)',
          '5. Note 5 (mangelhaft)'
        ],
        [1],
        'Richtig ist 2 (Note 2 – gut). „Stets zu unserer vollsten Zufriedenheit“ = Note 1; „stets zu unserer vollen Zufriedenheit“ = Note 2; „zu unserer vollen Zufriedenheit“ = Note 3; „zu unserer Zufriedenheit“ = Note 4.',
        'وجود stets مع vollen يعطي الدرجة الثانية (جيد). أما الدرجة الأولى فتتطلب صيغة التفضيل القصوى vollsten مع stets.',
        4
      ),
      QMC(
        'Welche ZWEI Personen genießen in Deutschland einen gesetzlichen besonderen Kündigungsschutz? (2 aus 6)',
        [
          '1. Ein 52-jähriger Abteilungsleiter (leitender Angestellter)',
          '2. Ein schwerbehinderter Softwareentwickler mit einem Grad der Behinderung (GdB) von 50',
          '3. Ein lediger Fachinformatiker nach 3 Jahren Betriebszugehörigkeit',
          '4. Ein Mitglied der Jugend- und Auszubildendenvertretung (JAV)',
          '5. Ein freiberuflicher IT-Berater mit Werkvertrag',
          '6. Ein Auszubildender im 2. Monat der Probezeit'
        ],
        [1, 3],
        'Richtig sind 2 und 4. Schwerbehinderte ab GdB 50 (§ 168 SGB IX, Zustimmung des Integrationsamts nötig) und Mitglieder von Betriebsrat/JAV (§ 15 KSchG) genießen besonderen Kündigungsschutz. Leitende Angestellte, Ü45-Mitarbeiter oder Azubis während der Probezeit haben keinen besonderen Kündigungsschutz.',
        'الحماية الخاصة من الفصل تشمل ذوي الإعاقة الشديدة (GdB >= 50) وأعضاء Betriebsrat/JAV والحوامل والمتدربين بعد انتهاء فترة التجربة. أما كبار الموظفين أو من تجاوز 45 عاماً فليس لهم حماية خاصة.',
        4
      )
    ],
    [
      'Ich kenne alle 15 klassischen IHK-WiSo-Fallen und falle auf keine davon herein',
      'Ich ordne Rechtsstreitigkeiten sicher den 5 Gerichtsbarkeiten zu',
      'Ich übersetze die Zeugnisformulierungen sicher in die Schulnoten 1 bis 6'
    ],
    ['bbig', 'bgb', 'lokal']
  );

  /* ==========================================================================
   * 2. VERTIEFUNGEN ZU AUSBILDUNG, ARBEITSZEIT, KÜNDIGUNG, BETRIEBSRAT & SOZIALVERSICHERUNG
   * ========================================================================== */
  addSec('ausbildung', [
    S('Ausbildungsordnung vs. Ausbildungsplan & Nichtige Vereinbarungen (§ 12 BBiG)',
      `<p>In <b>2022S, 2023S, 2024S, 2025S und 2025W</b> prüfte die IHK detailliert die Rechtsgrundlagen der Berufsausbildung:</p>
      <table>
        <thead><tr><th>Dokument / Begriff</th><th>Wer erlässt / erstellt es?</th><th>Rechtscharakter &amp; Inhalt</th></tr></thead>
        <tbody>
          <tr><td><b>Ausbildungsordnung (§ 4 BBiG)</b></td><td>Bundesministerium (BMWi/BMBF) per Rechtsverordnung</td><td>Bundesweit verbindlich für die betriebliche Ausbildung. <b>5 Mindestinhalte (§ 5 BBiG):</b> 1. Berufsbezeichnung, 2. Ausbildungsdauer (i. d. R. 3 Jahre), 3. Berufsbild (Fertigkeiten/Kenntnisse), 4. <b>Ausbildungsrahmenplan</b> (sachliche &amp; zeitliche Gliederung), 5. Prüfungsanforderungen.</td></tr>
          <tr><td><b>Betrieblicher Ausbildungsplan</b></td><td>Der <b>Ausbildungsbetrieb</b> (auf Basis des Ausbildungsrahmenplans)</td><td>Individuelle Umsetzung für den konkreten Azubi (Abteilungsdurchlauf). Muss Bestandteil des Ausbildungsvertrags sein (§ 11 BBiG)!</td></tr>
          <tr><td><b>Rahmenlehrplan</b></td><td>Kultusministerkonferenz (KMK) der Bundesländer</td><td>Gilt für die <b>Berufsschule</b> (Lernfelder 1–12), zeitlich abgestimmt auf den Ausbildungsrahmenplan.</td></tr>
        </tbody>
      </table>
      <h3>Persönliche und fachliche Eignung des Ausbilders (§§ 28–30 BBiG, 2023W Q4)</h3>
      <ul>
        <li><b>Persönliche Eignung:</b> Besitzt <i>nicht</i>, wer Kinder/Jugendliche nicht beschäftigen darf oder wiederholt/schwer gegen das BBiG verstoßen hat.</li>
        <li><b>Fachliche Eignung:</b> Setzt sich zusammen aus <b>beruflicher Eignung</b> (Abschluss in einer dem Ausbildungsberuf entsprechenden Fachrichtung + angemessene Berufspraxis) UND <b>berufs- und arbeitspädagogischer Eignung</b> (Nachweis durch die <b>AEVO-Prüfung / Ausbildereignungsprüfung</b> bei der IHK).</li>
      </ul>
      <h3>Nichtige Vereinbarungen im Ausbildungsvertrag (§ 12 BBiG – 2023S, 2025S)</h3>
      <p>Folgende Klauseln im Ausbildungsvertrag sind <b>gesetzlich nichtig (unwirksam)</b>:</p>
      <ul>
        <li>Verpflichtung des Azubis, nach der Ausbildung im Betrieb zu bleiben (Ausnahme: separate Vereinbarung innerhalb der <b>letzten 6 Monate</b> der Ausbildung).</li>
        <li>Verbot, nach der Ausbildung in derselben Branche zu arbeiten (Wettbewerbsverbot).</li>
        <li>Verpflichtung des Azubis zur Zahlung einer Entschädigung/Gebühr für die Ausbildung oder von <b>Vertragsstrafen</b>.</li>
        <li>Ausschluss oder Beschränkung von Schadensersatzansprüchen.</li>
      </ul>`,
      `<p><b>🔴 امتحان سابق (2023S, 2023W, 2025S, 2025W):</b></p>
      <ul>
        <li>احفظ محتويات <b>Ausbildungsordnung</b> الخمسة: اسم المهنة، مدة التدريب (3 سنوات)، المهارات، الإطار الزمني والموضوعي (Ausbildungsrahmenplan)، ومتطلبات الامتحان.</li>
        <li><b>أهلية المدرب (Ausbilder):</b> تتطلب شهادة مهنية + خبرة عملية + شهادة التأهيل التربوي <b>AEVO</b>.</li>
        <li><b>الشروط الباطلة (§ 12 BBiG):</b> أي غرامة جزائية (Vertragsstrafe) على المتدرب أو دفع رسوم للتدريب أو إلزامه بالبقاء في الشركة بعد التخرج (إلا إذا وُقّع اتفاق مستقل في <b>آخر 6 أشهر</b> من التدريب) هو شرط باطل قانوناً!</li>
      </ul>`)
  ], [
    QMC(
      'Welche Vereinbarung im Berufsausbildungsvertrag ist nach § 12 BBiG rechtswirksam? (1 aus 5)',
      [
        '1. Der Auszubildende zahlt bei vorzeitigem Abbruch eine Vertragsstrafe von 1.500 €.',
        '2. Der Auszubildende verpflichtet sich bereits bei Vertragsabschluss, nach der Prüfung 2 Jahre im Betrieb zu bleiben.',
        '3. Drei Monate vor Ende der Ausbildung vereinbaren Betrieb und Auszubildender schriftlich die Übernahme in ein unbefristetes Arbeitsverhältnis nach bestandener Prüfung.',
        '4. Der Auszubildende kauft die für die betriebliche Ausbildung notwendigen Werkzeuge auf eigene Kosten.',
        '5. Schadensersatzansprüche des Auszubildenden gegen den Betrieb werden pauschal ausgeschlossen.'
      ],
      [2],
      'Richtig ist 3. Eine Weiterbeschäftigungsvereinbarung ist nach § 12 Abs. 1 Satz 2 BBiG wirksam, wenn sie innerhalb der letzten 6 Monate des Berufsausbildungsverhältnisses geschlossen wird. Vertragsstrafen, Lehrgeld, eigene Werkzeugkosten und pauschaler Haftungsausschluss sind nichtig.',
      'الإجابة 3 صحيحة لأن الاتفاق على العمل بعد التخرج تم خلال الأشهر الستة الأخيرة من التدريب (هنا قبل 3 أشهر من النهاية). أما الغرامات الجزائية أو إلزام المتدرب منذ بداية العقد بالبقاء فهي شروط باطلة.',
      4
    )
  ]);

  addSec('arbeitszeit', [
    S('Direktvergleich: JArbSchG (Jugendliche < 18) vs. ArbZG / BUrlG (Erwachsene ≥ 18)',
      `<p>Fast jede WiSo-Prüfung stellt eine Vergleichsfrage zwischen minderjährigen und volljährigen Beschäftigten (<b>2022S, 2023W, 2024S, 2025S, 2025W</b>):</p>
      <table>
        <thead><tr><th>Kriterium</th><th>Jugendliche (&lt; 18 Jahre, JArbSchG)</th><th>Erwachsene (≥ 18 Jahre, ArbZG / BUrlG)</th></tr></thead>
        <tbody>
          <tr><td><b>Reguläre Tages-/Wochenzeit</b></td><td>Max. <b>8 Std./Tag</b> (8,5 Std., wenn an anderen Tagen derselben Woche verkürzt) und max. <b>40 Std./Woche</b> an <b>max. 5 Tagen</b>.</td><td>Max. <b>8 Std./Werktag</b> (bis zu <b>10 Std.</b> möglich, wenn innerhalb von 6 Monaten / 24 Wochen der Schnitt von 8 Std. gehalten wird; 6 Werktage = max. 48 Std.).</td></tr>
          <tr><td><b>Ruhepausen (im Voraus feststehend)</b></td><td>• <b>&gt; 4,5 bis 6 Std.</b> Arbeit: mind. <b>30 Min.</b><br>• <b>&gt; 6 Std.</b> Arbeit: mind. <b>60 Min.</b><br>Max. 4,5 Std. ohne Pause; jeder Pausenblock mind. 15 Min.</td><td>• <b>&gt; 6 bis 9 Std.</b> Arbeit: mind. <b>30 Min.</b><br>• <b>&gt; 9 Std.</b> Arbeit: mind. <b>45 Min.</b><br>Max. 6 Std. ohne Pause; jeder Pausenblock mind. 15 Min.</td></tr>
          <tr><td><b>Tägliche Ruhezeit / Freizeit</b></td><td>Mind. <b>12 Stunden</b> ununterbrochene Freizeit zwischen zwei Arbeitstagen (§ 13 JArbSchG).</td><td>Mind. <b>11 Stunden</b> ununterbrochene Ruhezeit zwischen zwei Arbeitstagen (§ 5 ArbZG).</td></tr>
          <tr><td><b>Nachtruhe</b></td><td>Beschäftigung grundsätzlich nur zwischen <b>06:00 und 20:00 Uhr</b> (§ 14 JArbSchG).</td><td>Nachtarbeit (23:00–06:00 Uhr) erlaubt mit Ausgleich (Freizeit oder angemessener Zuschlag).</td></tr>
          <tr><td><b>Gesetzlicher Mindesturlaub</b></td><td>Nach Alter am <b>01. Januar des Jahres</b>:<br>• noch nicht 16 J.: mind. <b>30 Werktage</b> (25 AT)<br>• noch nicht 17 J.: mind. <b>27 Werktage</b><br>• noch nicht 18 J.: mind. <b>25 Werktage</b></td><td>Mind. <b>24 Werktage</b> (6-Tage-Woche) = <b>20 Arbeitstage</b> (5-Tage-Woche) nach § 3 BUrlG. Voller Anspruch nach 6 Monaten Wartezeit (§ 4 BUrlG).</td></tr>
          <tr><td><b>Freistellung vor Abschlussprüfung</b></td><td>Am Arbeitstag <b>unmittelbar vor der schriftlichen Abschlussprüfung</b> bezahlte Freistellung (seit BBiG-Reform 2020 auch für volljährige Azubis nach § 15 Abs. 1 Nr. 5 BBiG!).</td><td>Für volljährige Azubis gilt § 15 BBiG identisch: Freistellung für Berufsschule, Prüfungen und den Arbeitstag unmittelbar vor der schriftlichen AP!</td></tr>
        </tbody>
      </table>`,
      `<p><b>⚠️ فخ امتحاني متكرر جداً:</b></p>
      <ul>
        <li>منذ تعديل قانون التدريب المهني (BBiG 2020)، أصبح <b>جميع المتدربين (حتى البالغين فوق 18 سنة)</b> يتمتعون بحق الإعفاء المدفوع الأجر في يوم العمل السابق مباشرة للامتحان الكتابي النهائي، وكذلك عدم العمل قبل المدرسة المهنية إذا كانت تبدأ قبل الساعة 9:00 صباحاً، واحتساب يوم مدرسة واحد أسبوعياً يضم أكثر من 5 حصص (كل حصة 45 دقيقة) كيوم عمل كامل!</li>
      </ul>`)
  ]);

  addSec('kuendigung', [
    S('Das exakte Rezept zur Datumsberechnung nach § 622 BGB (TT.MM.JJJJ)',
      `<p>In <b>2022S, 2024S, 2025S und 2025W</b> verlangte die IHK die taggenaue Berechnung des letztmöglichen Zugangsdatums oder des Beendigungstermins einer Kündigung:</p>
      <table>
        <thead><tr><th>Wer kündigt?</th><th>Gesetzliche Frist (§ 622 BGB)</th><th>Rechenrezept für die Prüfung</th></tr></thead>
        <tbody>
          <tr><td><b>1. In der Arbeits-Probezeit (max. 6 Monate)</b></td><td><b>2 Wochen</b> zu jedem beliebigen Tag (§ 622 Abs. 3 BGB). <i>(Aber: Ausbildungsprobezeit 1–4 Monate = <b>jederzeit ohne Frist</b> nach § 22 BBiG!)</i></td><td>Zugangstag + 14 Tage.</td></tr>
          <tr><td><b>2. Arbeitnehmer kündigt (oder AG bei &lt; 2 Jahren)</b></td><td><b>4 Wochen (= 28 Kalendertage!) zum 15. oder zum Ende eines Kalendermonats</b> (§ 622 Abs. 1 BGB).</td><td>• Willst du zum <b>31.08.</b> (31 Tage) kündigen: <code>31 − 28 = 03.08.</code> (spätester Zugang).<br>• Willst du zum <b>30.06.</b> (30 Tage) kündigen: <code>30 − 28 = 02.06.</code> (spätester Zugang).<br>• Willst du zum <b>15.05.</b> kündigen: 28 Tage rückwärts ab 15.05. (15 Tage im Mai + 13 Tage im April $\\rightarrow$ <code>30 − 13 = 17.04.</code>).</td></tr>
          <tr><td><b>3. Arbeitgeber kündigt ab 2 Jahren Betriebszugehörigkeit (§ 622 Abs. 2 BGB)</b></td><td>• ab <b>2 J.</b>: 1 Monat zum Monatsende<br>• ab <b>5 J.</b>: 2 Monate zum Monatsende<br>• ab <b>8 J.</b>: 3 Monate zum Monatsende<br>• ab <b>10 J.</b>: 4 Monate zum Monatsende<br>• ab <b>12 J.</b>: 5 Monate zum Monatsende<br>• ab <b>15 J.</b>: 6 Monate zum Monatsende<br>• ab <b>20 J.</b>: 7 Monate zum Monatsende</td><td>Achtung: Ab 2 Jahren gilt bei AG-Kündigung <b>nur noch „zum Ende eines Kalendermonats“</b> (der 15. entfällt!).<br>Beispiel: 6 Jahre Betriebszugehörigkeit $\\rightarrow$ 2 Monate zum Monatsende. Geht die Kündigung am 10.05. zu, endet der Vertrag am <b>31.07.</b>!</td></tr>
        </tbody>
      </table>`,
      `<p><b>🔴 وصفة حساب التواريخ في الامتحان (§ 622 BGB):</b></p>
      <ol>
        <li><b>من الذي يفصل؟</b> إذا كان <b>الموظف (Arbeitnehmer)</b> هو الذي يستقيل (مهما كانت سنوات خدمته، ما لم ينص العقد على غير ذلك)، فالمهلة هي <b>4 أسابيع (28 يوماً بالضبط)</b> إلى يوم 15 أو نهاية الشهر.</li>
        <li><b>قاعدة الطرح السريع لـ 28 يوماً لنهاية الشهر:</b>
          <ul>
            <li>شهر من <b>31 يوماً</b> (مثل مارس، مايو، يوليو، أغسطس، أكتوبر، ديسمبر): آخر يوم لوصول الاستقالة هو <code>31 - 28 = يوم 03</code> من نفس الشهر!</li>
            <li>شهر من <b>30 يوماً</b> (مثل أبريل، يونيو، سبتمبر، نوفمبر): آخر يوم لوصول الاستقالة هو <code>30 - 28 = يوم 02</code> من نفس الشهر!</li>
          </ul>
        </li>
        <li>إذا كان <b>صاحب العمل (Arbeitgeber)</b> هو الذي يفصل موظفاً خدم سنتين فأكثر، نستخدم جدول الأشهر الكاملة (2 سنوات=شهر، 5=شهران، 8=3 أشهر، 10=4 أشهر، 12=5 أشهر، 15=6 أشهر، 20=7 أشهر) وتكون النهاية <b>دائماً لنهاية الشهر فقط</b>!</li>
      </ol>`)
  ], [
    QMC(
      'Ein Softwareentwickler (seit 6 Jahren im Unternehmen, Standard-Arbeitsvertrag nach § 622 BGB) möchte selbst zum 31.08.2026 kündigen. Bis zu welchem Datum muss seine schriftliche Kündigung dem Arbeitgeber spätestens zugehen? (1 aus 5)',
      [
        '1. 30.06.2026',
        '2. 31.07.2026',
        '3. 01.08.2026',
        '4. 03.08.2026',
        '5. 15.08.2026'
      ],
      [3],
      'Richtig ist 4 (03.08.2026). Da der Arbeitnehmer selbst kündigt, gilt § 622 Abs. 1 BGB: 4 Wochen (28 Kalendertage) zum 15. oder zum Monatsende. Die verlängerte Frist von 2 Monaten (ab 5 Jahren nach Abs. 2) gilt gesetzlich nur für Kündigungen durch den Arbeitgeber! Rechnung für den August (31 Tage): 31 − 28 = 03.08.2026.',
      'فخ كلاسيكي! بما أن الموظف هو الذي يستقيل بنفسه، لا ننظر إلى سنوات خدمته الـ 6، بل نطبق الفقرة الأولى: 4 أسابيع (28 يوماً) لنهاية الشهر. وبما أن شهر أغسطس 31 يوماً: 31 - 28 = 03.08.2026.',
      5
    )
  ]);

  addSec('mitbestimmung', [
    S('Wahlberechtigte exakt zählen (§ 7–9 BetrVG) & der 8-Stufen-Tarifkonflikt',
      `<p>In <b>2022S, 2023W, 2024W und 2025S</b> gab die IHK eine Personaltabelle eines Betriebs vor und fragte: <i>„Wie viele Personen sind bei der Betriebsratswahl wahlberechtigt (aktiv) und wie viele wählbar (passiv)?“</i></p>
      <table>
        <thead><tr><th>Personengruppe im Betrieb</th><th>Aktiv wahlberechtigt (§ 7 BetrVG: ab 16 J.)?</th><th>Passiv wählbar (§ 8 BetrVG: ab 18 J. + ≥ 6 Mon. im Betrieb)?</th></tr></thead>
        <tbody>
          <tr><td>Vollzeit- und Teilzeit-Arbeitnehmer (≥ 18 J., ≥ 6 Mon. dabei)</td><td><b>Ja</b></td><td><b>Ja</b></td></tr>
          <tr><td>Arbeitnehmer / Azubis mit <b>16 oder 17 Jahren</b></td><td><b>Ja</b> (Wahlalter seit 2021 auf 16 gesenkt!)</td><td><b>Nein</b> (wählbar erst ab 18 J.)</td></tr>
          <tr><td>Volljährige neue Mitarbeiter (&lt; 6 Monate im Betrieb)</td><td><b>Ja</b> (ab dem 1. Arbeitstag!)</td><td><b>Nein</b> (noch keine 6 Monate Betriebszugehörigkeit)</td></tr>
          <tr><td>Volljährige Auszubildende (≥ 6 Monate im Betrieb)</td><td><b>Ja</b></td><td><b>Ja</b> (Azubis zählen im BetrVG als Arbeitnehmer!)</td></tr>
          <tr><td><b>Leiharbeitnehmer</b> (&gt; 3 Monate im Betrieb eingesetzt)</td><td><b>Ja</b> (aktiv wahlberechtigt im Entleihbetrieb!)</td><td><b>Nein</b> (nicht passiv wählbar im Entleihbetrieb!)</td></tr>
          <tr><td><b>Geschäftsführer, Vorstand, leitende Angestellte (§ 5 Abs. 3 BetrVG)</b></td><td><b>Nein!</b></td><td><b>Nein!</b></td></tr>
        </tbody>
      </table>
      <h3>Reihenfolge beim Tarifkonflikt (beliebte Zuordnungsaufgabe in 2021W, 2023S, 2025W)</h3>
      <ol>
        <li><b>Kündigung des bestehenden Tarifvertrags</b> (Ende der Laufzeit &amp; Ende der <b>Friedenspflicht</b>)</li>
        <li><b>Tarifverhandlungen</b> zwischen Gewerkschaft und Arbeitgeberverband (bzw. einzelnem Arbeitgeber beim Haustarif)</li>
        <li><b>Erklärung des Scheiterns</b> der Tarifverhandlungen</li>
        <li><b>Schlichtungsverfahren</b> durch eine neutrale Schlichtungskommission</li>
        <li><b>Scheitern der Schlichtung</b></li>
        <li><b>1. Urabstimmung</b> unter den Gewerkschaftsmitgliedern (mind. <b>75 % Zustimmung</b> für Streik erforderlich!)</li>
        <li><b>Streik</b> (durch Gewerkschaft organisiert; Gewerkschaft zahlt <i>Streikgeld</i> an Mitglieder) und ggf. <b>Aussperrung</b> durch Arbeitgeber</li>
        <li>Neuer Kompromiss $\\rightarrow$ <b>2. Urabstimmung</b> (mind. <b>25 % Zustimmung</b> zur Annahme genügt) $\\rightarrow$ <b>Abschluss des neuen Tarifvertrags</b> (neue Friedenspflicht beginnt).</li>
      </ol>`,
      `<p><b>🔴 معادلة عدّ الناخبين في Betriebsrat (سؤال حسابي متكرر):</b></p>
      <ul>
        <li><b>من يصوّت (Aktiv wahlberechtigt):</b> كل موظف أو متدرب عمره $\\ge 16$ سنة (حتى لو بدأ اليوم!) + عمال الإعارة (Leiharbeiter) إذا زادت مدة عملهم عن 3 أشهر. <b>استبعد فوراً:</b> المديرين التنفيذيين (Geschäftsführer) والمديرين القياديين (leitende Angestellte).</li>
        <li><b>من يترشح (Passiv wählbar):</b> من كان عمره $\\ge 18$ سنة + مضى على عمله في الشركة $\\ge 6$ أشهر (ولا يحق لعمال الإعارة الترشح).</li>
        <li><b>خطوات النزاع النقابي الـ 8:</b> احفظ نسبتي التصويت جيداً: <b>75%</b> لبدء الإضراب (1. Urabstimmung)، و <b>25%</b> لقبول الاتفاق وإنهاء الإضراب (2. Urabstimmung).</li>
      </ul>`)
  ], [
    QMC(
      'Ein IT-Betrieb hat folgende Belegschaft: 2 Geschäftsführer, 3 leitende Angestellte, 40 volljährige Entwickler (alle > 1 Jahr im Betrieb), 4 neue volljährige Entwickler (seit 2 Monaten im Betrieb), 3 Auszubildende (17 Jahre alt, seit 8 Monaten im Betrieb) und 2 Leiharbeitnehmer (seit 5 Monaten eingesetzt). Wie viele Personen sind für den Betriebsrat aktiv wahlberechtigt und wie viele passiv wählbar? (1 aus 5)',
      [
        '1. Aktiv wahlberechtigt: 54 | Passiv wählbar: 47',
        '2. Aktiv wahlberechtigt: 49 | Passiv wählbar: 40',
        '3. Aktiv wahlberechtigt: 47 | Passiv wählbar: 43',
        '4. Aktiv wahlberechtigt: 49 | Passiv wählbar: 44',
        '5. Aktiv wahlberechtigt: 44 | Passiv wählbar: 40'
      ],
      [1],
      'Richtig ist 2 (Aktiv: 49 | Passiv: 40). Rechnung Aktiv (ab 16 J., ohne Geschäftsführer und leitende Angestellte): 40 (Entwickler) + 4 (neue Entwickler) + 3 (17-jährige Azubis) + 2 (Leiharbeiter > 3 Mon.) = 49. Rechnung Passiv (ab 18 J., >= 6 Monate im Betrieb, keine Leiharbeiter): nur die 40 volljährigen Entwickler (> 1 Jahr) erfüllen alle Bedingungen = 40.',
      'حساب المصوتين (Aktiv): نجمع 40 (مطورين قدامى) + 4 (مطورين جدد) + 3 (متدربين عمرهم 17 سنة لأن التصويت يبدأ من 16) + 2 (عمال إعارة لأكثر من 3 أشهر) = 49 شخصاً (نستبعد المديرين الـ 2 والقياديين الـ 3). أما المترشحون (Passiv): يشترط عمر 18 + أقدمية 6 أشهر + ليس عامل إعارة = 40 شخصاً فقط.',
      5
    )
  ]);

  addSec('lohn-netto', [
    S('Die 6 Lohnsteuerklassen (I bis VI) & Nominal- vs. Realeinkommen',
      `<p>In <b>2022S, 2023W und 2025S</b> wurden die Lohnsteuerklassen sowie der Unterschied zwischen Nominal- und Realeinkommen abgefragt:</p>
      <table>
        <thead><tr><th>Steuerklasse</th><th>Für wen gilt sie?</th><th>Merksatz für die Prüfung</th></tr></thead>
        <tbody>
          <tr><td><b>Klasse I</b></td><td>Ledige, Geschiedene, dauernd getrennt Lebende (ohne Kinder im Haushalt)</td><td>Standardklasse für Berufseinsteiger nach der Ausbildung.</td></tr>
          <tr><td><b>Klasse II</b></td><td><b>Alleinerziehende</b> mit mindestens einem Kind im eigenen Haushalt</td><td>Enthält den Entlastungsbetrag für Alleinerziehende.</td></tr>
          <tr><td><b>Klasse III</b></td><td>Verheiratete / Eingetragene Lebenspartner (Besserverdienender, wenn Partner Klasse V wählt) oder Verwitwete im Jahr nach dem Tod des Partners</td><td>Geringster laufender Lohnsteuerabzug (Kombination <b>III / V</b> bei großem Gehaltsunterschied).</td></tr>
          <tr><td><b>Klasse IV</b></td><td>Verheiratete (Standardkombination <b>IV / IV</b>, auch mit Faktorverfahren)</td><td>Empfohlen, wenn beide Partner ähnlich viel verdienen.</td></tr>
          <tr><td><b>Klasse V</b></td><td>Verheiratete (Geringverdienender Partner, wenn der andere Klasse III hat)</td><td>Höherer laufender Abzug als in Klasse IV.</td></tr>
          <tr><td><b>Klasse VI</b></td><td>Für das <b>zweite und jedes weitere Dienstverhältnis</b> (Nebenjob über Minijob-Grenze)</td><td>Höchster Abzug, da hier keine Grundfreibeträge mehr berücksichtigt werden!</td></tr>
        </tbody>
      </table>
      <h3>Nominallohn vs. Reallohn (Kaufkraft – 2023W, 2025W)</h3>
      <ul>
        <li><b>Nominallohn (-einkommen):</b> Der Geldbetrag in Euro, der auf dem Gehaltszettel steht.</li>
        <li><b>Reallohn (-einkommen):</b> Gibt die tatsächliche <b>Kaufkraft</b> an (also wie viele Güter man sich vom Nominallohn leisten kann).</li>
        <li><b>Faustformel:</b> $\\text{Reallohnänderung (\\%)} \\approx \\text{Nominallohnänderung (\\%)} - \\text{Inflationsrate (\\%)}$. Steigt dein Gehalt um 3 %, die Inflation aber um 5 %, sinkt dein Reallohn (Kaufkraftverlust)!</li>
      </ul>`,
      `<p><b>🔴 جدول الفئات الضريبية الست (Steuerklassen I–VI):</b></p>
      <ul>
        <li><b>I:</b> أعزب أو مطلق بلا أطفال. | <b>II:</b> عائل وحيد (Alleinerziehend) لديه طفل في المنزل.</li>
        <li><b>III / V:</b> متزوجان بينهما فرق كبير في الراتب (الأعلى دخلاً يأخذ III والأقل يأخذ V).</li>
        <li><b>IV / IV:</b> متزوجان متقاربان في الدخل. | <b>VI:</b> للوظيفة الثانية (العمل الإضافي الخاضع للضريبة) وفيها أعلى خصم ضريبي.</li>
        <li><b>الراتب الاسمي مقابل الحقيقي:</b> <code>Nominallohn</code> هو الرقم باليورو، بينما <code>Reallohn</code> هو القوة الشرائية بعد طرح التضخم (Inflation).</li>
      </ul>`)
  ]);

  /* ==========================================================================
   * 3. NEUE KERN-LEKTION: Rechtsformen, Handelsregister, Prokura & GmbH-Gewinnverteilung
   * ========================================================================== */
  L('wiso-rechtsformen-prokura-register', 'wiso',
    'Rechtsformen-Matrix, Handelsregister, Prokura & Gewinnverteilung',
    'مقارنة الشركات، السجل التجاري، التوكيل التجاري (Prokura) وتوزيع أرباح GmbH',
    'Kern',
    'Vollständige Vergleichstabelle (e. K., GbR, OHG, KG, GmbH, UG, AG), HRA vs. HRB, Ist-/Kann-/Formkaufmann, Prokura vs. Handlungsvollmacht und Rechenrezept zur Gewinnverteilung.',
    [
      S('Die große Rechtsformen-Vergleichstabelle (2021W–2025W)',
        `<p><b>In fast jeder WiSo-Prüfung gibt es 1–2 Aufgaben zur Wahl der Rechtsform, Haftung oder Geschäftsführung:</b></p>
        <table>
          <thead><tr><th>Rechtsform</th><th>Mindestpersonenzahl</th><th>Mindestkapital</th><th>Haftung für Gesellschaftsschulden</th><th>Leitung / Vertretung</th><th>Register</th></tr></thead>
          <tbody>
            <tr><td><b>Einzelunternehmer (e. K.)</b></td><td>1 Person</td><td>0 €</td><td><b>Unbeschränkt</b> mit Betriebs- <b>und Privatvermögen</b></td><td>Inhaber allein</td><td>HRA</td></tr>
            <tr><td><b>GbR</b> (Gesellschaft bürgerlichen Rechts)</td><td>mind. 2</td><td>0 €</td><td>Gesellschafter haften <b>unbeschränkt, persönlich und gesamtschuldnerisch</b> (Privatvermögen!)</td><td>Gemeinschaftlich durch alle Gesellschafter (sofern nichts anderes vereinbart)</td><td>Kein HR (optional Gesellschaftsregister als eGbR)</td></tr>
            <tr><td><b>OHG</b> (Offene Handelsgesellschaft)</td><td>mind. 2</td><td>0 €</td><td>Alle Gesellschafter <b>unbeschränkt, unmittelbar und gesamtschuldnerisch</b> (Privatvermögen!)</td><td>Einzelgeschäftsführung / Einzelvertretung jedes Gesellschafters</td><td>HRA</td></tr>
            <tr><td><b>KG</b> (Kommanditgesellschaft)</td><td>mind. 2 (1 Komplementär + 1 Kommanditist)</td><td>Kein fester Mindestbetrag (feste Kommanditeinlage)</td><td>• <b>Komplementär (Vollhafter):</b> unbeschränkt inkl. Privatvermögen<br>• <b>Kommanditist (Teilhafter):</b> beschränkt auf seine <b>Haftsumme/Einlage</b> (sobald eingezahlt, keine Privathaftung!)</td><td>Nur der <b>Komplementär</b> führt die Geschäfte und vertritt die KG (Kommanditist hat Kontrollrecht)</td><td>HRA</td></tr>
            <tr><td><b>GmbH</b> (Gesellschaft mit beschränkter Haftung)</td><td>mind. 1</td><td><b>25.000 € Stammkapital</b> (bei Gründung mind. 12.500 € einzahlen)</td><td>Die GmbH haftet mit ihrem <b>gesamten Gesellschaftsvermögen</b> (keine persönliche Haftung der Gesellschafter mit Privatvermögen!)</td><td><b>Organe:</b> 1. Geschäftsführung (Leitung), 2. Gesellschafterversammlung (oberstes Beschlussorgan), 3. Aufsichtsrat (erst ab &gt; 500 AN Pflicht)</td><td><b>HRB</b> (konstitutiv!)</td></tr>
            <tr><td><b>UG (haftungsbeschränkt)</b></td><td>mind. 1</td><td><b>ab 1 €</b> Stammkapital (25 % des Jahresgewinns müssen in Rücklage fließen bis 25.000 € erreicht sind)</td><td>Gesellschaft haftet mit ihrem gesamten Gesellschaftsvermögen (wie GmbH)</td><td>Geschäftsführer + Gesellschafterversammlung</td><td><b>HRB</b> (konstitutiv!)</td></tr>
            <tr><td><b>AG</b> (Aktiengesellschaft)</td><td>mind. 1</td><td><b>50.000 € Grundkapital</b> (zerlegt in Aktien)</td><td>Die AG haftet mit ihrem gesamten Gesellschaftsvermögen (Aktionäre haften nur mit ihrer Einlage/Aktie)</td><td><b>3 Pflichtorgane:</b> 1. <b>Vorstand</b> (leitet weisungsfrei), 2. <b>Aufsichtsrat</b> (bestellt &amp; überwacht Vorstand), 3. <b>Hauptversammlung</b> (Aktionäre)</td><td><b>HRB</b> (konstitutiv!)</td></tr>
          </tbody>
        </table>`,
        `<p><b>🔴 أهم المقارنات التي ترد في كل امتحان WiSo:</b></p>
        <ul>
          <li><b>في شركة التوصية البسيطة (KG):</b> الشريك المتضامن <code>Komplementär</code> يدير الشركة ومسؤوليته غير محدودة (تشمل أمواله الخاصة)، بينما الشريك الموصي <code>Kommanditist</code> تقتصر مسؤوليته على حصته المسجلة (Einlage) ولا يدير الشركة.</li>
          <li><b>في GmbH مقابل AG:</b> رأس مال GmbH يسمى <code>Stammkapital</code> (الحد الأدنى 25.000 €) ويديرها <code>Geschäftsführer</code>. أما رأس مال AG فيسمى <code>Grundkapital</code> (الحد الأدنى 50.000 €) ويديرها <code>Vorstand</code> ويراقبه <code>Aufsichtsrat</code> (مجلس الإشراف إلزامي دائماً في AG، بينما في GmbH يصبح إلزامياً فقط إذا زاد عدد الموظفين عن 500).</li>
        </ul>`),

      S('Handelsregister (HRA vs. HRB), Kaufmannsarten & Prokura vs. Handlungsvollmacht',
        `<p>Das <b>Handelsregister</b> wird elektronisch beim <b>Amtsgericht</b> geführt und ist öffentlich einsehbar:</p>
        <ul>
          <li><b>Abteilung A (HRA):</b> Einzelkaufleute (<code>e. K.</code>) und Personenhandelsgesellschaften (<code>OHG</code>, <code>KG</code>). Eintragung wirkt bei Istkaufleuten <b>deklaratorisch</b> (rechtsbekundend – das Handelsgewerbe existiert schon vorher).</li>
          <li><b>Abteilung B (HRB):</b> Kapitalgesellschaften (<code>GmbH</code>, <code>UG</code>, <code>AG</code>). Die Eintragung wirkt <b>konstitutiv</b> (rechtsbegründend – erst mit der HRB-Eintragung entsteht die GmbH/AG als juristische Person mit Haftungsbeschränkung!).</li>
          <li><b>Istkaufmann (§ 1 HGB):</b> Jeder Gewerbebetrieb, der nach Art und Umfang einen in kaufmännischer Weise eingerichteten Geschäftsbetrieb erfordert.</li>
          <li><b>Kannkaufmann (§ 2 HGB):</b> Kleingewerbetreibende oder Land-/Forstwirte, die sich freiwillig ins Handelsregister eintragen lassen.</li>
          <li><b>Formkaufmann (§ 6 HGB):</b> Kapitalgesellschaften (GmbH, AG, UG) sind kraft ihrer Rechtsform immer Kaufleute.</li>
        </ul>
        <h3>Prokura (ppa., §§ 48–53 HGB) vs. Handlungsvollmacht (i. V. / i. A., § 54 HGB)</h3>
        <table>
          <thead><tr><th>Merkmal</th><th>Prokura (Unterschrift: <code>ppa.</code>)</th><th>Handlungsvollmacht (Unterschrift: <code>i. V.</code> / <code>i. A.</code>)</th></tr></thead>
          <tbody>
            <tr><td><b>Wer darf sie erteilen?</b></td><td>Nur ein <b>Kaufmann</b> (Inhaber oder gesetzlicher Vertreter wie GmbH-Geschäftsführer), <b>ausdrücklich</b>.</td><td>Jeder Kaufmann, Geschäftsführer <b>oder auch ein Prokurist</b> (auch formlos/konkludent möglich).</td></tr>
            <tr><td><b>Handelsregister?</b></td><td><b>Ja, Pflicht</b> zur Eintragung ins Handelsregister!</td><td><b>Nein</b>, wird <b>nicht</b> ins Handelsregister eingetragen.</td></tr>
            <tr><td><b>Umfang der Vollmacht</b></td><td>Ermächtigt zu <b>allen Arten von gerichtlichen und außergerichtlichen Geschäften</b>, die der Betrieb *irgendeines* Handelsgewerbes mit sich bringt (z. B. Personal einstellen/kündigen, Kredite aufnehmen, Prozesse führen).</td><td>Erstreckt sich nur auf Geschäfte, die der Betrieb eines *derartigen* Handelsgewerbes <b>gewöhnlich</b> mit sich bringt (Art-, Gattungs- oder Einzelhandlungsvollmacht).</td></tr>
            <tr><td><b>Was ist gesetzlich VERBOTEN?</b></td><td>• Grundstücke <b>verkaufen oder belasten</b> (ohne Sonderbefugnis; <i>Grundstücke kaufen ist erlaubt!</i>)<br>• Bilanz &amp; Steuererklärung unterschreiben<br>• Handelsregisteranmeldungen / Prokura erteilen<br>• Firma auflösen oder verkaufen / Insolvenz anmelden</td><td>Alles, was dem Prokuristen verboten ist, <b>plus</b> (ohne Sondervollmacht):<br>• <b>Darlehen/Kredite aufnehmen</b><br>• Wechselverbindlichkeiten eingehen<br>• <b>Prozesse vor Gericht führen</b></td></tr>
          </tbody>
        </table>`,
        `<p><b>⚠️ فخ امتحاني شهير (2023S &amp; 2025S):</b></p>
        <ul>
          <li>الوكيل المفوض (<b>Prokurist</b>) يوقّع بـ <code>ppa.</code> ويُسجل في السجل التجاري، ويحق له توظيف وفصل الموظفين، أخذ القروض البنكية، تمثيل الشركة أمام المحاكم، بل و<b>شراء العقارات</b>! لكن يحظر عليه قانوناً: <b>بيع أو رهن العقارات</b> (إلا بتفويض خاص)، توقيع الميزانية السنوية، منح Prokura لغيره، أو بيع/إغلاق الشركة.</li>
          <li>أما صاحب التوكيل العادي (<b>Handlungsbevollmächtigter</b>) فيوقّع بـ <code>i. V.</code> ولا يُسجل في السجل التجاري، ولا يحق له أخذ قروض أو الترافع أمام المحاكم إلا بإذن خاص.</li>
        </ul>`),

      S('Rechenrezept: GmbH-Gewinnverteilung nach § 29 GmbHG (2024S, 2025W)',
        `<p>Wenn der Gesellschaftsvertrag nichts anderes regelt, wird der ausschüttungsfähige Gewinn einer GmbH nach dem <b>Verhältnis der Geschäftsanteile (Stammeinlagen)</b> verteilt (§ 29 Abs. 3 GmbHG) – <b>nicht</b> nach Köpfen!</p>
        ${C('Rechenbeispiel (Typ IHK-Rechenkästchen):\nStammkapital der IT-GmbH = 50.000 €\n- Gesellschafterin A hält 30.000 € (60 %)\n- Gesellschafter B hält 12.500 € (25 %)\n- Gesellschafter C hält  7.500 € (15 %)\n\nJahresüberschuss = 120.000 €.\nLaut Beschluss werden 20 % in die Gewinnrücklage eingestellt, der Rest ausgeschüttet.\n1. Ausschüttungsbetrag = 120.000 € * 0,80 = 96.000 €\n2. Gewinnanteil für B = 96.000 € * (12.500 / 50.000) = 96.000 € * 0,25 = 24.000 €')}
        <p><b>Merke für KG/OHG:</b> Bei der OHG (§ 121 HGB) erhält jeder Gesellschafter zunächst bis zu 4 % Verzinsung auf seinen Kapitalanteil, der Rest wird nach Köpfen verteilt (sofern vertraglich nicht anders geregelt). Bei der GmbH zählt dagegen standardmäßig <b>100 % das Verhältnis der Geschäftsanteile</b>!</p>`,
        `<p><b>🔴 وصفة حساب توزيع أرباح GmbH (§ 29 GmbHG):</b></p>
        <ol>
          <li>اطرح أولاً أي مبلغ يقرر الشركاء تحويله إلى الاحتياطي (Gewinnrücklage).</li>
          <li>اقسم حصة الشريك في رأس المال على إجمالي رأس المال (Stammkapital) لتحصل على نسبته المئوية.</li>
          <li>اضرب الربح القابل للتوزيع في نسبة الشريك. (انتبه: في GmbH لا يُقسم الربح بالتساوي على عدد الأشخاص إلا إذا تساوت حصصهم!).</li>
        </ol>`)
    ],
    [
      ['Komplementär / Kommanditist', 'شريك متضامن (مسؤولية كاملة) / شريك موصٍ (مسؤولية محدودة بحصته) في KG'],
      ['Konstitutiv / Deklaratorisch', 'منشئ للحق القانوني (مثل تسجيل GmbH) / كاشف ومعلن للحق (مثل تسجيل e.K.)'],
      ['Prokura (ppa.)', 'توكيل تجاري واسع يُسجل في السجل التجاري (§ 49 HGB)'],
      ['Handlungsvollmacht (i. V.)', 'توكيل تجاري للأعمال المعتادة لا يُسجل في السجل التجاري (§ 54 HGB)']
    ],
    [
      QMC(
        'Welche ZWEI Rechtsgeschäfte darf ein Einzelprokurist (ppa.) einer IT-Systemhaus GmbH OHNE zusätzliche Sondervollmacht rechtswirksam abschließen? (2 aus 6)',
        [
          '1. Einen Bankkredit über 150.000 € für neue Server aufnehmen',
          '2. Ein unbebautes Betriebsgrundstück der GmbH verkaufen',
          '3. Den Jahresabschluss (Bilanz und GuV) verbindlich unterzeichnen',
          '4. Ein Nachbargrundstück für den Bau eines neuen Rechenzentrums kaufen',
          '5. Einem Abteilungsleiter ebenfalls Prokura erteilen',
          '6. Die Auflösung der GmbH beim Handelsregister anmelden'
        ],
        [0, 3],
        'Richtig sind 1 und 4. Ein Prokurist darf Kredite aufnehmen, Personal einstellen/entlassen und sogar Grundstücke KAUFEN. Verboten sind ihm nach § 49 Abs. 2 HGB nur die Veräußerung (Verkauf) und Belastung von Grundstücken sowie Grundlagengeschäfte (Bilanz unterschreiben, Prokura erteilen, HR-Anmeldungen, Firmenauflösung).',
        'يحق لحامل Prokura أخذ القروض البنكية (1) وشراء العقارات للشركة (4). أما بيع العقارات أو رهنها (2) وتوقيع الميزانية (3) ومنح Prokura لغيره (5) وإغلاق الشركة (6) فكلها محظورة عليه قانوناً.',
        5
      ),
      QMC(
        'An einer Software-GmbH (Stammkapital 80.000 €) sind drei Gesellschafter beteiligt: Anna mit 40.000 €, Ben mit 24.000 € und Clara mit 16.000 €. Vom Jahresgewinn in Höhe von 150.000 € werden 30.000 € in die Gewinnrücklage eingestellt, der Rest wird nach dem gesetzlichen Maßstab (§ 29 GmbHG) ausgeschüttet. Welchen Betrag erhält Ben? (1 aus 5)',
        [
          '1. 30.000,00 €',
          '2. 36.000,00 €',
          '3. 40.000,00 €',
          '4. 45.000,00 €',
          '5. 50.000,00 €'
        ],
        [1],
        'Richtig ist 2 (36.000,00 €). Ausschüttungsfähiger Gewinn = 150.000 € − 30.000 € = 120.000 €. Bens Anteil am Stammkapital = 24.000 € / 80.000 € = 0,30 (30 %). Bens Gewinnanteil = 120.000 € * 0,30 = 36.000,00 €.',
        'الربح القابل للتوزيع = 150.000 - 30.000 = 120.000 يورو. نسبة حصة بن في رأس المال = 24.000 / 80.000 = 30%. نصيب بن من الأرباح = 120.000 * 30% = 36.000 يورو.',
        4
      )
    ],
    [
      'Ich unterscheide e. K., GbR, OHG, KG, GmbH, UG und AG nach Haftung, Kapital und Leitung',
      'Ich trenne HRA (deklaratorisch) und HRB (konstitutiv) sowie Prokura und Handlungsvollmacht',
      'Ich berechne die GmbH-Gewinnverteilung fehlerfrei nach Geschäftsanteilen'
    ],
    ['bgb', 'lokal']
  );

  /* ==========================================================================
   * 4. NEUE KERN-LEKTION: Sicherheitszeichen (ASR A1.3), Umweltzeichen, Markt, BWL & ITIL
   * ========================================================================== */
  L('wiso-sicherheit-umwelt-bwl', 'wiso',
    'Sicherheitszeichen (ASR A1.3), Umweltzeichen, BWL-Matrizen & ITIL',
    'رموز السلامة (ASR A1.3)، علامات البيئة، مصفوفات الإدارة (BCG/SWOT) و ITIL',
    'Kern',
    'Sicherheitszeichen auch im Schwarz-Weiß-Druck erkennen, Brandbekämpfung, Blauer Engel vs. Grüner Punkt vs. CE/GS, BCG-Portfolio-Matrix, Bezugskalkulation und ITIL/Ergonomie.',
    [
      S('Sicherheitszeichen nach ASR A1.3 (inkl. Schwarz-Weiß-Trick!) & Brandfall',
        `<p>In <b>2022S, 2023W, 2024W und 2025W</b> wurden Sicherheitszeichen abgefragt – oft in Schwarz-Weiß gedruckt! Deshalb musst du <b>Geometrische Form + Rand + Hintergrund + Farbe</b> kennen:</p>
        <table>
          <thead><tr><th>Zeichenart (ASR A1.3)</th><th>Geometrische Form</th><th>Farbe (in Farbe)</th><th>Erkennung im Schwarz-Weiß-Druck</th><th>Typische Beispiele</th></tr></thead>
          <tbody>
            <tr><td><b>1. Verbotszeichen</b></td><td><b>Kreis mit Schrägbalken</b> (von links oben nach rechts unten)</td><td>Roter Rand, weißer Grund, schwarzes Piktogramm</td><td>Runder Kreis, heller Hintergrund, <b>durchgestrichenes</b> Symbol</td><td>Rauchen verboten, Zutritt für Unbefugte verboten, <b>Mit Wasser löschen verboten</b></td></tr>
            <tr><td><b>2. Gebotszeichen</b></td><td><b>Kreis (ohne Balken)</b></td><td><b>Blauer</b> Grund, weißes Piktogramm</td><td>Runder Kreis, <b>dunkler/schwarzer Hintergrund</b> mit weißem Symbol!</td><td>Augenschutz tragen, Gehörschutz tragen, Sicherheitsschuhe benutzen</td></tr>
            <tr><td><b>3. Warnzeichen</b></td><td><b>Gleichseitiges Dreieck</b> (Spitze nach oben)</td><td><b>Gelber</b> Grund, schwarzer Rand, schwarzes Piktogramm</td><td><b>Dreieck</b> mit dunklem Rand und dunklem Symbol auf hellem Grund</td><td>Warnung vor elektrischer Spannung (Blitz), Laserstrahl, feuergefährlichen Stoffen</td></tr>
            <tr><td><b>4. Rettungszeichen</b></td><td><b>Quadrat oder Rechteck</b></td><td><b>Grüner</b> Grund, weißes Piktogramm</td><td>Viereck mit <b>Flucht-/Erste-Hilfe-Symbol</b> (Kreuz, laufende Person, Sammelstelle)</td><td>Notausgang / Fluchtweg, Erste Hilfe, Sammelstelle, Automatisierter Externer Defibrillator (AED)</td></tr>
            <tr><td><b>5. Brandschutzzeichen</b></td><td><b>Quadrat oder Rechteck</b></td><td><b>Roter</b> Grund, weißes Piktogramm (mit Flamme an der Seite)</td><td>Viereck mit <b>Feuerlöscher / Schlauch / Brandmelder</b> und kleinem Flammensymbol</td><td>Feuerlöscher, Wandhydrant, Brandmelder</td></tr>
          </tbody>
        </table>
        <h3>Verhalten im Brandfall &amp; Löschregeln (2022W, 2024S, 2025S)</h3>
        <ul>
          <li><b>Reihenfolge:</b> 1. Ruhe bewahren &amp; Brand melden (Notruf <b>112</b> / Handfeuermelder), 2. In Sicherheit bringen (Gefährdete warnen/mitnehmen, <b>Fenster und Türen schließen – KEINE Fenster zur Belüftung öffnen, da Sauerstoff das Feuer anfacht!</b>, <b>keinen Aufzug benutzen</b>, zum Sammelplatz gehen), 3. Löschversuch nur ohne Eigengefährdung.</li>
          <li><b>Richtig löschen:</b> In Windrichtung löschen; Flächenbrände <b>von vorn nach hinten</b> und <b>von unten nach oben</b> löschen; <b>Ausnahme: Tropf- und Fließbrände immer von OBEN nach UNTEN löschen!</b> Mehreren Feuerlöschern gleichzeitig einsetzen statt nacheinander; Glutnester überwachen.</li>
        </ul>`,
        `<p><b>🔴 حيلة распознавание رموز السلامة باللونين الأبيض والأسود في ورقة الامتحان:</b></p>
        <ul>
          <li><b>دائرة بخلفية بيضاء وخط مائل:</b> منع (<code>Verbotszeichen</code> - أحمر).</li>
          <li><b>دائرة بخلفية داكنة/سوداء ورمز أبيض:</b> إلزام/أمر (<code>Gebotszeichen</code> - أزرق).</li>
          <li><b>مثلث متساوي الأضلاع:</b> تحذير (<code>Warnzeichen</code> - أصفر).</li>
          <li><b>مربع/مستطيل:</b> انظر للرمز بالداخل؛ إذا كان مخرج طوارئ أو صليب إسعاف أو نقطة تجمع فهو إنقاذ (<code>Rettungszeichen</code> - أخضر)، وإذا كان طفاية حريق أو خرطوم مع شعلة لهب فهو مكافحة حريق (<code>Brandschutzzeichen</code> - أحمر).</li>
          <li><b>⚠️ فخ الحريق (2024S):</b> إياك وفتح النوافذ لتهوية الدخان أثناء الحريق لأن الأكسجين يغذي النار! وتُطفأ الحرائق العادية من الأسفل للأعلى، <b>باستثناء الحرائق السائلة المتساقطة (Tropf-/Fließbrände) فتُطفأ من الأعلى للأسفل!</b></li>
        </ul>`),

      S('Umwelt- und Prüfzeichen, Umweltprinzipien & Kreislaufwirtschaft',
        `<p>Häufige Verwechslungsfallen bei Siegeln und Umweltbegriffen (<b>2022S, 2023S, 2024W, 2025W</b>):</p>
        <table>
          <thead><tr><th>Zeichen / Begriff</th><th>Wahre Bedeutung in der Prüfung</th></tr></thead>
          <tbody>
            <tr><td><b>Blauer Engel</b></td><td>Offizielles <b>Umweltzeichen der Bundesregierung</b> für Produkte/Dienstleistungen, die umweltfreundlicher (z. B. energieeffizienter, schadstoffärmer) als vergleichbare Standardprodukte sind.</td></tr>
            <tr><td><b>Der Grüne Punkt</b></td><td><b>Kein Umweltsiegel für Recyclingfähigkeit!</b> Zeigt nur an, dass der Hersteller ein Lizenzentgelt an ein <b>duales Entsorgungssystem</b> (Verpackungsentsorgung) gezahlt hat.</td></tr>
            <tr><td><b>Möbiusband (3 Pfeile im Dreieck)</b></td><td>Kennzeichnet, dass das Produkt/Material <b>recycelbar</b> ist bzw. (mit %-Zahl in der Mitte) aus recyceltem Material besteht.</td></tr>
            <tr><td><b>CE-Kennzeichnung</b></td><td><b>Kein Qualitätssiegel einer unabhängigen Prüfstelle!</b> Eigenerklärung des Herstellers, dass das Produkt den geltenden EU-Richtlinien entspricht (Reisepass für den EU-Binnenmarkt).</td></tr>
            <tr><td><b>GS-Zeichen („Geprüfte Sicherheit“)</b></td><td>Freiwilliges Sicherheitssiegel, vergeben durch eine <b>unabhängige zugelassene Prüfstelle</b> (z. B. TÜV, DEKRA) nach dem Produktsicherheitsgesetz.</td></tr>
          </tbody>
        </table>
        <h3>Die 4 Prinzipien der Umweltpolitik (2023W)</h3>
        <ul>
          <li><b>1. Vorsorgeprinzip:</b> Umweltschäden von vornherein vermeiden, bevor sie entstehen (z. B. Grenzwerte, Umweltverträglichkeitsprüfung).</li>
          <li><b>2. Verursacherprinzip:</b> Wer die Umwelt belastet, trägt die Kosten für Vermeidung/Beseitigung (z. B. CO₂-Abgabe, Abwassergebühr).</li>
          <li><b>3. Kooperationsprinzip:</b> Staat, Wirtschaft und Gesellschaft arbeiten freiwillig zusammen (z. B. Selbstverpflichtungen).</li>
          <li><b>4. Gemeinlastprinzip:</b> Wenn der Verursacher nicht feststellbar ist oder akute Not besteht, zahlt die Allgemeinheit aus Steuermitteln (Altlastensanierung).</li>
        </ul>`,
        `<p><b>⚠️ فخ العلامات البيئية والأوروبية:</b></p>
        <ul>
          <li><code>Der Grüne Punkt</code> لا يعني أن المنتج صديق للبيئة أو قابل لإعادة التدوير، بل يعني فقط أن المصنّع دفع رسوم التخلص من التغليف! العلامة البيئية الحكومية الرسمية هي <code>Blauer Engel</code>، وعلامة القابلية للتدوير هي <code>Möbiusband</code> (المثلث ذو الأسهم الثلاثة).</li>
          <li>علامة <code>CE</code> هي تصريح ذاتي من المصنّع بمطابقة معايير الاتحاد الأوروبي وليست شهادة فحص مستقلة، بينما علامة <code>GS (Geprüfte Sicherheit)</code> تصدر عن جهة فحص مستقلة مثل TÜV.</li>
        </ul>`),

      S('BWL-Klassiker: BCG-Portfolio-Matrix, Bezugskalkulation, ITIL & Ergonomie (ISO 9241)',
        `<p>Diese BWL- und IT-Management-Themen verbinden <b>Teil 1 (Planen eines Softwareproduktes)</b> und <b>Teil 3 (WiSo)</b>:</p>
        <h3>1. Die BCG-Portfolio-Matrix (Marktwachstum vs. Relativer Marktanteil – 2023S, 2025S)</h3>
        <table>
          <thead><tr><th>Kategorie</th><th>Relativer Marktanteil</th><th>Marktwachstum</th><th>Normstrategie</th></tr></thead>
          <tbody>
            <tr><td><b>Question Marks (Nachwuchsprodukte)</b></td><td>Niedrig</td><td><b>Hoch</b></td><td><b>Selektionsstrategie:</b> Entweder massiv investieren (um zum Star zu werden) oder rechtzeitig aufgeben. Benötigen viel Liquidität!</td></tr>
            <tr><td><b>Stars (Sterne)</b></td><td><b>Hoch</b></td><td><b>Hoch</b></td><td><b>Investitionsstrategie:</b> Marktführerschaft im wachsenden Markt verteidigen und ausbauen.</td></tr>
            <tr><td><b>Cash Cows (Melkkühe)</b></td><td><b>Hoch</b></td><td>Niedrig</td><td><b>Abschöpfungsstrategie:</b> Hohe Gewinne/Cashflows „melken“, um damit Question Marks und Stars zu finanzieren; nur noch Erhaltungsinvestitionen.</td></tr>
            <tr><td><b>Poor Dogs (Arme Hunde)</b></td><td>Niedrig</td><td>Niedrig</td><td><b>Desinvestitionsstrategie:</b> Vom Markt nehmen / einstellen, sobald kein positiver Deckungsbeitrag mehr erzielt wird.</td></tr>
          </tbody>
        </table>
        <h3>2. Schema der Bezugskalkulation (Handelskalkulation im Einkauf)</h3>
        ${C('  Listeneinkaufspreis (netto, ohne USt!)\n- Liefererrabatt (in % vom Listeneinkaufspreis)\n------------------------------------------------\n= Zieleinkaufspreis\n- Liefererskonto (in % vom Zieleinkaufspreis!)\n------------------------------------------------\n= Bareinkaufspreis\n+ Bezugskosten (Fracht, Verpackung, Transportversicherung netto)\n------------------------------------------------\n= Bezugspreis (Einstandspreis)')}
        <h3>3. ITIL Service Management &amp; Software-Ergonomie (DIN EN ISO 9241-110 / BFSG)</h3>
        <ul>
          <li><b>ITIL – Incident Management vs. Problem Management:</b>
            <ul>
              <li><b>Incident Management:</b> Ziel ist die <b>schnellstmögliche Wiederherstellung</b> des normalen Servicebetriebs (ggf. per <i>Workaround</i>) innerhalb der im <b>SLA (Service Level Agreement)</b> vereinbarten Reaktions- und Wiederherstellungszeit.</li>
              <li><b>Problem Management:</b> Sucht nach der <b>tiefgründigen Ursache (Root Cause)</b> wiederkehrender Incidents, dokumentiert sie in der <i>Known Error Database (KEDB)</i> und beseitigt den Fehler dauerhaft.</li>
            </ul>
          </li>
          <li><b>DIN EN ISO 9241-11 (Gebrauchstauglichkeit / Usability):</b> 3 Kriterien: <b>Effektivität</b> (Genauigkeit/Vollständigkeit der Zielerreichung), <b>Effizienz</b> (Aufwand im Verhältnis zum Ergebnis) und <b>Zufriedenstellung</b>.</li>
          <li><b>DIN EN ISO 9241-110 (7 Grundsätze der Dialoggestaltung):</b> 1. Aufgabenangemessenheit, 2. Selbstbeschreibungsfähigkeit, 3. Erwartungskonformität, 4. Erlernbarkeit, 5. Steuerbarkeit, 6. <b>Fehlertoleranz</b> (bzw. Robustheit gegen Benutzungsfehler), 7. Individualisierbarkeit (bzw. Benutzerbindung).</li>
          <li><b>Barrierefreiheit (WCAG / BFSG ab Juni 2025):</b> 4 Prinzipien (<b>POUR</b>): <b>Wahrnehmbar</b> (Alternativtexte für Bilder, Kontraste, Untertitel), <b>Bedienbar</b> (komplett per Tastatur steuerbar!), <b>Verständlich</b> (klare Sprache, konsistente Navigation), <b>Robust</b> (semantisches HTML, Screenreader-Kompatibilität via ARIA).</li>
        </ul>`,
        `<p><b>🔮 توقعات قوية جداً للامتحان القادم (Teil 1 &amp; WiSo):</b></p>
        <ul>
          <li><b>مصفوفة BCG:</b> احفظ المربعات الأربعة: <code>Question Marks</code> (نمو سوق عالٍ، حصة سوقية منخفضة $\\rightarrow$ استراتيجية انتقائية)، <code>Stars</code> (نمو عالٍ، حصة عالية $\\rightarrow$ استثمار)، <code>Cash Cows</code> (نمو منخفض، حصة عالية $\\rightarrow$ جني الأرباح لتمويل المنتجات الأخرى)، <code>Poor Dogs</code> (نمو منخفض، حصة منخفضة $\\rightarrow$ سحب من السوق Desinvestition).</li>
          <li><b>الفرق بين Incident و Problem في ITIL:</b> الـ <code>Incident Management</code> يهتم بإعادة الخدمة للعمل بأسرع وقت ممكن (حتى بحل مؤقت Workaround) للالتزام بـ SLA، بينما <code>Problem Management</code> يبحث عن السبب الجذري (Root Cause) لمنع تكرار العطل مستقبلاً.</li>
          <li><b>سهولة الوصول (Barrierefreiheit - قانون BFSG الساري منذ صيف 2025):</b> احفظ المبادئ الأربعة: قابل للإدراك (نصوص بديلة للصور وتباين ألوان)، قابل للتشغيل (يعمل بالكامل عبر لوحة المفاتيح بدون فأرة)، مفهوم، ومتين تقنياً (متوافق مع قارئات الشاشة Screenreader).</li>
        </ul>`)
    ],
    [
      ['ASR A1.3', 'القواعد التقنية لرموز السلامة والصحة في أماكن العمل'],
      ['BCG-Matrix', 'مصفوفة بوسطن الاستشارية (Question Marks, Stars, Cash Cows, Poor Dogs)'],
      ['Bezugspreis (Einstandspreis)', 'سعر التكلفة الصافي بعد طرح الخصم التجاري وخصم الدفع النقدي وإضافة تكاليف الشحن'],
      ['Incident vs. Problem Management', 'استعادة الخدمة سريعاً مقابل إزالة السبب الجذري للعطل (ITIL)'],
      ['DIN EN ISO 9241-110', 'المبادئ السبعة لتصميم واجهات الحوار التفاعلية (Usability)']
    ],
    [
      QMC(
        'Ein Softwareprodukt Ihres Unternehmens hat bereits den höchsten relativen Marktanteil im Marktsegment, allerdings wächst der Gesamtmarkt kaum noch (niedriges Marktwachstum). Wie wird dieses Produkt in der BCG-Portfolio-Matrix eingeordnet und welche Strategie ist typisch? (1 aus 5)',
        [
          '1. Question Mark – Selektionsstrategie',
          '2. Star – Investitionsstrategie',
          '3. Cash Cow – Abschöpfungsstrategie',
          '4. Poor Dog – Desinvestitionsstrategie',
          '5. Cash Cow – Liquidationsstrategie'
        ],
        [2],
        'Richtig ist 3 (Cash Cow – Abschöpfungsstrategie). Hoher relativer Marktanteil bei niedrigem Marktwachstum kennzeichnet eine Cash Cow: Sie erwirtschaftet hohe Überschüsse (Cashflow), die abgeschöpft werden, um Question Marks und Stars zu finanzieren.',
        'حصة سوقية عالية مع نمو سوقي منخفض = بقرة حلوب (Cash Cow)، والاستراتيجية المناسبة لها هي جني الأرباح (Abschöpfungsstrategie) لتمويل المنتجات الناشئة.',
        4
      ),
      QMC(
        'Auf einer schwarz-weiß gedruckten Prüfungsseite sehen Sie ein rundes Sicherheitszeichen mit dunklem (schwarzem) Hintergrund und einer weißen Schutzbrille in der Mitte (ohne Schrägbalken). Um welche Zeichenart handelt es sich nach ASR A1.3 und welche Farbe hat der Hintergrund im Original? (1 aus 5)',
        [
          '1. Verbotszeichen – roter Hintergrund',
          '2. Warnzeichen – gelber Hintergrund',
          '3. Gebotszeichen – blauer Hintergrund',
          '4. Rettungszeichen – grüner Hintergrund',
          '5. Brandschutzzeichen – roter Hintergrund'
        ],
        [2],
        'Richtig ist 3 (Gebotszeichen – blauer Hintergrund). Ein runder Kreis ohne Schrägbalken mit dunklem Hintergrund und weißem Piktogramm ist immer ein Gebotszeichen (Originalfarbe: Blau, „Augenschutz benutzen“).',
        'دائرة بدون خط مائل وبخلفية داكنة ورمز أبيض هي دائماً علامة إلزام/أمر (Gebotszeichen) ولونها الأصلي أزرق (ارتدِ نظارات الوقاية).',
        4
      ),
      QMC(
        'Ein IT-Systemhaus kauft 10 Server zum Listeneinkaufspreis von insgesamt 20.000,00 € (netto). Der Lieferant gewährt 15 % Liefererrabatt und bei Zahlung innerhalb von 10 Tagen 2 % Liefererskonto. Für den versicherten Speditionsversand fallen 160,00 € (netto) Bezugskosten an. Das Systemhaus zahlt innerhalb von 7 Tagen. Wie hoch ist der Bezugspreis (Einstandspreis netto)? (1 aus 5)',
        [
          '1. 16.600,00 €',
          '2. 16.760,00 €',
          '3. 16.820,00 €',
          '4. 16.816,80 €',
          '5. 17.160,00 €'
        ],
        [2],
        'Richtig ist 3 (16.820,00 €).\nRechnung:\nListeneinkaufspreis = 20.000,00 €\n− 15 % Rabatt (3.000,00 €) = Zieleinkaufspreis 17.000,00 €\n− 2 % Skonto auf 17.000 € (340,00 €) = Bareinkaufspreis 16.660,00 €\n+ Bezugskosten 160,00 € = Bezugspreis 16.820,00 €.',
        'الحساب خطوة بخطوة: 20.000 - 15% خصم تجاري (3.000) = 17.000 يورو (Zieleinkaufspreis). ثم نطرح 2% خصم دفع نقدي من الـ 17.000 (أي 340 يورو) = 16.660 يورو (Bareinkaufspreis). ثم نضيف تكاليف الشحن 160 يورو = 16.820,00 يورو.',
        5
      )
    ],
    [
      'Ich erkenne alle 5 Sicherheitszeichen-Kategorien nach ASR A1.3 auch im Schwarz-Weiß-Druck',
      'Ich unterscheide Blauer Engel, Grüner Punkt, Möbiusband, CE und GS sicher',
      'Ich beherrsche die BCG-Matrix, die Bezugskalkulation, ITIL (Incident vs. Problem) und ISO 9241-110'
    ],
    ['arbeit', 'katalog', 'lokal']
  );
}());

