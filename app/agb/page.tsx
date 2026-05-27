import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDictionary } from '@/dictionaries';

export default function AGBPage() {
  const dict = getDictionary('de');
  return (
    <main className="min-h-screen bg-white">
      <Header dict={dict.nav} locale="de" />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-black text-black mb-8">Allgemeine Geschäftsbedingungen</h1>

            <div className="bg-accent/10 rounded-lg p-6 mb-8 border border-accent/20">
              <p className="text-gray-700 font-semibold">
                <strong>Stand:</strong> März 2025<br />
                <strong>Anbieter:</strong> TGN Media LLC<br />
                <strong>Anschrift:</strong> 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801, United States of America<br />
                <strong>E-Mail:</strong>{' '}
                <a href="mailto:info@tgn-media.com" className="text-accent hover:text-accent-dark">
                  info@tgn-media.com
                </a>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Anwendungsbereich, Vertragspartner</h2>
            <p className="text-gray-700 mb-4">
              1.1. Die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB) gelten für alle, auch
              künftige, Geschäftsbeziehungen zwischen dem Vertragspartner (nachfolgend „Kunde") und der
            </p>
            <p className="text-gray-700 mb-4">
              <strong>TGN Media LLC</strong> (nachfolgend „wir/uns"),<br />
              1309 Coffeen Avenue STE 1200<br />
              Sheridan, Wyoming 82801<br />
              United States of America
            </p>
            <p className="text-gray-700 mb-4">
              1.2. Diese AGB gelten nur gegenüber Unternehmern i.S.d. § 14 BGB. Als Unternehmer gilt
              hiernach auch, wer die Leistungen im Zuge der Aufnahme einer gewerblichen oder
              selbständigen beruflichen Tätigkeit beauftragt. Wir schließen keine Verträge mit
              Verbrauchern im Sinne des § 13 BGB ab. Der Kunde versichert bei Vertragsschluss als
              Unternehmer gemäß § 14 BGB bzw. Kaufmann im Sinne des Handelsgesetzbuchs (HGB) zu handeln.
            </p>
            <p className="text-gray-700 mb-4">
              1.3. Diese AGB gelten ausschließlich. Entgegenstehende oder von diesen AGB abweichende
              Bedingungen des Kunden werden nicht anerkannt, es sei denn, wir haben ausdrücklich
              schriftlich ihrer Geltung zugestimmt.
            </p>
            <p className="text-gray-700 mb-4">
              1.4. Im Einzelfall getroffene, individuelle Vereinbarungen (einschließlich Nebenabreden,
              Ergänzungen und Änderungen) haben Vorrang vor diesen AGB. Gleiches gilt für abweichende
              Vereinbarung hinsichtlich der zwischen den Parteien geschlossenen Verträge. Derartige
              abweichenden individuelle Vereinbarungen bedürfen jedoch in jedem Fall der Schriftform.
            </p>
            <p className="text-gray-700 mb-6">1.5. Die Vertragssprache ist Deutsch.</p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Vertragsgegenstand, Vertragsschluss</h2>
            <p className="text-gray-700 mb-4">
              2.1. Der Vertragsschluss erfolgt nur gegenüber Unternehmern im Sinne dieser AGB (vgl.
              Ziffer 1.2.).
            </p>
            <p className="text-gray-700 mb-4">
              2.2. Wir erbringen für den Kunde verschiedene onlinebasierte Beratungsdienstleistungen
              in Bezug auf Werbemaßnahmen, Umsatzsteigerung, Verkaufsoptimierung sowie weitere
              Onlinemarketingdienstleistungen, insbesondere im Bereich Kundenabschlüsse/Closing.
              Soweit nicht ausdrücklich und schriftlich anders vereinbart, schulden wir dabei nicht
              die Erbringung eines Werkes. Ein Anspruch auf Erreichen eines konkreten Erfolgs besteht
              demnach grundsätzlich nicht.
            </p>
            <p className="text-gray-700 mb-4">
              2.3. Verträge werden fernmündlich über Ablefy geschlossen. Ein Vertrag kommt dann
              zustande, wenn der Kunde unser Vertragsangebot durch Bestellung über den Button „Jetzt
              kaufen!" oder in sonstiger Weise akzeptiert bzw. bestätigt. Eine Bestätigung kann auch
              in Textform erfolgen.
            </p>
            <p className="text-gray-700 mb-4">
              2.4. In Bezug auf die von uns zu erbringenden Dienstleistungen steht uns gegenüber dem
              Kunden ein Leistungsbestimmungsrecht nach § 315 BGB zu.
            </p>
            <p className="text-gray-700 mb-4">
              2.5. Sofern ein wirtschaftlicher Zweck im Sinne der Generierung eines Nettoumsatzes
              (sog. „Return on Invest") vereinbart wird, handelt es sich dabei nicht um einen
              unmittelbar durch die Tätigkeit herbeizuführenden Erfolg im Sinne eines Werkes nach
              § 631 ff. BGB, sondern um den erhofften wirtschaftlichen Erfolg.
            </p>
            <p className="text-gray-700 mb-6">
              2.6. Wir werden die vereinbarten Dienstleistungen gemäß unserem Angebot mit der
              erforderlichen Sorgfalt durchführen. Wir sind gleichfalls dazu berechtigt, uns zur
              Vertragsdurchführung der Hilfe Dritter zu bedienen.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Preise und Bezahlung</h2>
            <p className="text-gray-700 mb-4">
              3.1. Unsere Preise sind verbindlich und verstehen sich jeweils netto zuzüglich
              gesetzlicher Umsatzsteuer. Zahlungen haben in Euro (€) zu erfolgen.
            </p>
            <p className="text-gray-700 mb-4">
              3.2. Die Vergütung unserer Dienste ist grundsätzlich nach Vertragsschluss und
              Rechnungsstellung sofort zur Zahlung fällig. Der Kunde ist daher im Hinblick auf seine
              Zahlungsverpflichtung vorleistungspflichtig. Wurde Vorauskasse per Banküberweisung
              vereinbart, ist die Zahlung sofort nach Vertragsabschluss fällig, sofern die Parteien
              keinen späteren Fälligkeitstermin ausdrücklich vereinbart haben.
            </p>
            <p className="text-gray-700 mb-4">
              3.3. Für die Zahlung maßgebend ist das Datum der Wertstellung auf unserem Konto.
              Zahlungen werden entgegen den §§ 366, 367 BGB zunächst auf die jeweils älteste
              Hauptforderung angerechnet. Im Einzelfall können andere Zahlungsbedingungen vereinbart
              werden.
            </p>
            <p className="text-gray-700 mb-4">
              3.4. Der Zugang zu unserem Mitgliederbereich mit entsprechenden Videoinhalten wird von
              einem vorherigen Zahlungseingang abhängig gemacht. Sobald der Kunde die fällige
              Zahlung/Anzahlung geleistet hat, erhält dieser ab diesem Zeitpunkt einen Anspruch auf
              Freischaltung/Zugang.
            </p>
            <p className="text-gray-700 mb-4">
              3.5. Wir sind verpflichtet, dem Kunde eine ordnungsgemäße Rechnung auszustellen. Diese
              wird als PDF-Dokument versandt wird.
            </p>
            <p className="text-gray-700 mb-4">
              3.6. Alle gerichtlichen und außergerichtlichen Kosten im Zusammenhang mit der
              Eintreibung von Forderungen, die uns aufgrund der nicht fristgerechten Zahlung des
              Kunden entstehen, einschließlich der Gebühren der von uns für die Eintreibung der
              Forderung eingeschalteten Dritten, gehen zu Lasten des Kunden.
            </p>
            <p className="text-gray-700 mb-4">
              3.7. Sofern die Zahlung als SEPA-Lastschrift vereinbart wurde, verpflichtet sich der
              Kunde, für den Fall, dass die vereinbarte Lastschrift nicht von seinem Konto eingezogen
              werden konnte und eine Rückbuchung erfolgt, den geschuldeten Betrag binnen drei
              Werktagen nach Rückbuchung an uns zu überweisen und die durch die Rückbuchung
              veranlassten Kosten durch das Kreditinstitut zu übernehmen.
            </p>
            <p className="text-gray-700 mb-6">
              3.8. Für die Zahlungsabwicklung nutzen wir den Dienst „Ablefy". Wir verweisen insofern
              auf Datenschutzerklärung von Ablefy unter{' '}
              <a
                href="https://myablefy.com/privacy"
                className="text-accent hover:text-accent-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://myablefy.com/privacy
              </a>
              . Vor Abschluss der Bestellung gibt der Kunde durch Ankreuzen eines entsprechenden
              Kästchens sein Einverständnis zu den AGB von Ablefy. Sofern die Zahlungsabwicklung über
              nachgeschaltete Finanzdienstleister erfolgt, gelten die jeweiligen AGB dieser
              Dienstleister (bspw. Paypal, Klarna Bank AB, SEPA, Google Pay, American Express, Visa,
              Mastercard, Maestro, iDeal, Przelewy24).
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Vertragslaufzeit, Kündigung</h2>
            <p className="text-gray-700 mb-4">
              4.1. Der Vertrag hat die im Vertragstext aufgeführte Mindestlaufzeit. Ist im
              Vertragstext keine Mindestlaufzeit angegeben, beträgt diese grundsätzlich 12 Monate.
            </p>
            <p className="text-gray-700 mb-4">
              4.2. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
            </p>
            <p className="text-gray-700 mb-4">
              4.3. Das außerordentlicher Kündigungsgrund liegt insbesondere dann vor, wenn sich der
              Kunde mit der fälligen Vergütung in Verzug befindet und auch nach Mahnung durch uns
              samt Setzung einer angemessenen Frist die Vergütung bis zum Ablauf der Frist nicht
              zahlt oder sich für zwei aufeinander folgende Abrechnungszeiträume mit der Entrichtung
              der geschuldeten Vergütung in Verzug befindet.
            </p>
            <p className="text-gray-700 mb-6">
              4.4. Kündigungen bedürfen zu ihrer Wirksamkeit der Schriftform.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Mitwirkung des Kunden, Verzug</h2>
            <p className="text-gray-700 mb-4">
              5.1. Der Kunde hat die ihm obliegenden Mitwirkungshandlungen vollständig und
              fristgemäß zu erbringen. Unterlässt der Kunde eine Mitwirkungshandlung und verhindert
              damit die Leistungserbringung oder den Erfolgseintritt, bleibt unser Vergütungsanspruch
              unberührt. Gleiches gilt, sofern wir aufgrund fehlender Mitwirkungshandlungen des
              Kunden oder sonstigen Hinderungsgründen, welche aus der Sphäre des Kunden stammen daran
              gehindert sind, die vereinbarten Dienstleistungen zu erbringen.
            </p>
            <p className="text-gray-700 mb-4">
              5.2. Insbesondere ist der Kunde verpflichtet, auf die Kommunikation mit uns einzugehen
              und die von uns erarbeiteten und vorgegebenen Strategien umzusetzen.
            </p>
            <p className="text-gray-700 mb-4">
              5.3. Die Fristen für unsere Leistungserbringungen beginnen nicht, bevor nicht der
              fällig gestellte Rechnungsbetrag bei uns eingegangen ist und vereinbarungsgemäß die für
              die Leistungserbringung notwendigen Daten bei uns vollständig vorliegen und die Gründe
              hierfür aus der Sphäre des Kunden stammen.
            </p>
            <p className="text-gray-700 mb-4">
              5.4. Sofern der Kunde mit fälligen Zahlungen in Verzug ist, behalten wir uns vor,
              unsere Leistungen bis zum Ausgleich des offenen Betrages zu verweigern bzw. nicht
              auszuführen.
            </p>
            <p className="text-gray-700 mb-6">
              5.5. Ist der Kunde im Fall der Ratenzahlung mit mindestens drei fälligen Zahlungen in
              Verzug, ist die gesamte restliche Vergütung bis zum nächsten ordentlichen
              Beendigungstermin fällig. Wir sind zudem berechtigt, die Leistungen einzustellen und
              den Vertrag außerordentlich zu kündigen.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Gewährleistung, Verjährung</h2>
            <p className="text-gray-700 mb-4">
              6.1. Die Gewährleistung bestimmt sich vorbehaltlich folgender Regelungen nach den
              gesetzlichen Vorschriften.
            </p>
            <p className="text-gray-700 mb-4">
              6.2. Eine Garantie besteht nur, wenn diese ausdrücklich abgegeben wurde. Der Kunde ist
              verpflichtet, seinen vertraglichen Mitwirkungspflichten nachzukommen. Verhindert der
              Kunde die Leistungserbringung oder den Erfolgseintritt im Sinne von Ziffer 5.1 dieser
              Vereinbarung, so ist dieser nicht berechtigt, sich auf die Garantie zu berufen.
            </p>
            <p className="text-gray-700 mb-4">
              6.3. Der Kunde sichert zu, dass diesem bewusst ist, dass ein Erfolg von durch unsere
              Betreuung oder der von uns angebotenen Produkte nicht garantiert werden kann, da dies
              im Einflussbereich Dritter liegt.
            </p>
            <p className="text-gray-700 mb-4">
              6.4. Der Kunde sichert zu, dass diesem bewusst ist, dass Drittanbieter wie
              beispielsweise Google oder Facebook entsprechende Richtlinien vorhalten, nach denen
              diese jederzeit berechtigt sind, einzelne Werbekampagnen aus ihren Angeboten zu
              entfernen. Wir übernehmen demnach keine Gewährleistung für derartige durch
              Drittunternehmen veranlasste Vorgänge.
            </p>
            <p className="text-gray-700 mb-4">
              6.5. Wir sind bemüht, die digitalen Angebote, insbesondere bestellte und zum Download
              bereitgestellte visuelle Medien, möglichst ununterbrochen verfügbar zu halten. Durch
              Wartungs- und Reparaturarbeiten sowie System-Aktualisierungen oder auch technische
              Störungen, die außerhalb unseres Einflussbereichs liegen, kann die Verfügbarkeit
              möglicherweise eingeschränkt sein. Eine Gewährleistung für die jederzeitige
              Verfügbarkeit wird nicht übernommen.
            </p>
            <p className="text-gray-700 mb-6">
              6.6. Der Kunde hat unsere Leistungen unverzüglich zu prüfen und etwaige Mängel
              unverzüglich (spätestens nach 7 Werktagen) in Text- oder Schriftform zu rügen. Die
              Rügefrist beginnt bei offenen Mängeln mit der Übermittlung, bei verdeckten Mängeln mit
              ihrer Entdeckung. Unterlässt der Kunde die rechtzeitige, detailliert gefasste
              Mängelrüge in Text- oder Schriftform, so gilt die Leistung als genehmigt. Spätere
              Beanstandungen sind irrelevant.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Haftung</h2>
            <p className="text-gray-700 mb-4">
              7.1. Wir haften dem Kunde aus allen vertraglichen, vertragsähnlichen und gesetzlichen,
              auch deliktischen Ansprüchen auf Schadens- und Aufwendungsersatz wie folgt:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>bei Vorsatz oder grober Fahrlässigkeit,</li>
              <li>bei vorsätzlicher oder fahrlässiger Verletzung des Lebens, des Körpers oder der Gesundheit,</li>
              <li>aufgrund eines Garantieversprechens, soweit diesbezüglich nichts anderes geregelt ist,</li>
              <li>aufgrund zwingender Haftung wie etwa nach dem Produkthaftungsgesetz.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              7.2. Verletzten wir fahrlässig eine wesentliche Vertragspflicht, ist die Haftung auf
              den vertragstypischen, vorhersehbaren Schaden begrenzt, sofern nicht gemäß
              vorstehender Ziffer unbeschränkt gehaftet wird. Wesentliche Vertragspflichten sind
              Pflichten, die der Vertrag uns nach seinem Inhalt zur Erreichung des Vertragszwecks
              auferlegt, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst
              ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.
            </p>
            <p className="text-gray-700 mb-4">
              7.3. Eine über die Ziffern 7.1. und 7.2. hinausgehende Haftung ist ausgeschlossen.
            </p>
            <p className="text-gray-700 mb-4">
              7.4. Vorstehende Haftungsregelungen gelten auch im Hinblick auf die Haftung unserer
              Erfüllungsgehilfen und gesetzlichen Vertreter.
            </p>
            <p className="text-gray-700 mb-6">
              7.5. Der Kunde ist für die Rechtskonformität etwaiger Werbekampagnen- und Umsetzungen
              (Werbeanzeigen, Direct-Mail, Internetauftritte, Impressum, Datenschutzerklärungen,
              Bilder, Videos etc.) ausschließlich selbst verantwortlich. Eine Haftung unsererseits
              ist hierfür – ausgenommen Ziffer 7.1. und 7.2. – ausgeschlossen.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. Aufrechnung, Zurückbehaltung, Abtretung</h2>
            <p className="text-gray-700 mb-4">
              8.1. Wir sind berechtigt, die Ansprüche und Forderungen aus unserer Geschäftsverbindung
              abzutreten. Sofern eine solche Forderungsabtretung durch uns wahrgenommen wird, wird
              der Kunde aufgefordert an den Abtretungsempfänger zu zahlen. Eine leistungsbefreiende
              Zahlung erfolgt dann mit Eingang der Zahlung beim Abtretungsempfänger.
            </p>
            <p className="text-gray-700 mb-6">
              8.2. Der Kunde hat nur ein Aufrechnungsrecht mit von uns unbestrittenen oder
              rechtskräftig festgestellten Gegenansprüchen.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">9. Referenznennung</h2>
            <p className="text-gray-700 mb-6">
              Wir sind vorbehaltlich des jederzeit möglichen, schriftlichen Widerrufs des Kunden dazu
              berechtigt, auf eigenen Werbeträgern und insbesondere auf unserem Internetauftritt mit
              Namen (bzw. Firmennamen), Firmenlogo und den Ergebnissen der Zusammenarbeit zu werben.
              Wir sind insofern berechtigt, auf den Kunden hinzuweisen und ihn als Kunden aufzuführen
              (Referenzhinweis).
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">10. Geistiges Eigentum</h2>
            <p className="text-gray-700 mb-4">
              10.1. Die von uns erstellten Arbeits- und Leistungsergebnisse sind urheberrechtlich
              geschützt. Wir behalten uns sämtliche Rechte in Bezug auf das gewerbliche und geistige
              Eigentum an den zur Verfügung gestellten Materialien vor. Es ist dem Kunde nicht
              gestattet, die zur Verfügung gestellten Materialien oder Teile daraus für andere als
              die vertraglich vorgesehenen Zwecke zu nutzen oder an Dritte weiterzugeben (dies gilt
              auch für verbundene Unternehmen). Insbesondere ist es dem Kunde nicht erlaubt, die
              Materialien selbst anzubieten, zu vertreiben oder außerhalb des vereinbarten
              Vertragszweckes zu nutzen.
            </p>
            <p className="text-gray-700 mb-4">
              10.2. Im Falle einer vertragswidrigen Verwendung i.S.d. Abs. 10.1. sind wir berechtigt,
              das Vertragsverhältnis mit sofortiger Wirkung zu kündigen und sämtliche Zugangs-,
              Nutzungs- und Teilnahmerechte des Kunden auf die von uns zur Verfügung gestellten
              digitalen Inhalte zu entziehen.
            </p>
            <p className="text-gray-700 mb-4">
              10.3. Der Kunde verpflichtet sich, im Falle der Zuwiderhandlung gegen Abs. 10.1. zur
              Zahlung einer angemessenen und durch uns im Einzelfall zu bestimmenden, im Streitfall
              durch das zuständige Gericht zu überprüfenden Vertragsstrafe. Die Geltendmachung eines
              darüberhinausgehenden Schadens ist nicht ausgeschlossen.
            </p>
            <p className="text-gray-700 mb-4">
              10.4. Die Einräumung entsprechender Nutzungsrechte steht zudem unter der Bedingung der
              vollständigen Vergütungszahlung.
            </p>
            <p className="text-gray-700 mb-4">
              10.5. Der Kunde hat dafür zu sorgen, dass seine Zugangsdaten und die ihm überlassenen
              digitalen Inhalte vor unberechtigter Nutzung durch Dritte geschützt sind. Der Kunde
              verpflichtet sich, uns umgehend darüber zu informieren, wenn er davon ausgehen kann,
              dass unberechtigte Dritte seine Zugangsdaten missbräuchlich erlangt haben und/oder
              missbräuchlich verwenden.
            </p>
            <p className="text-gray-700 mb-6">
              10.6. Wir sind insbesondere berechtigt, technische Vorkehrungen zu treffen, durch die
              eine missbräuchliche oder dem Vertragszweck widersprechende Verwendung festgestellt,
              verhindert oder verfolgt werden kann.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">11. Vertraulichkeitsvereinbarung</h2>
            <p className="text-gray-700 mb-4">
              11.1. Die Parteien verpflichten sich strengstes Stillschweigen über sämtliche ihnen im
              Zusammenhang mit dem Abschluss und der Ausführung dieses Vertrages zur Kenntnis
              gelangten vertraulichen Informationen über die andere Partei zu bewahren und diese
              Informationen weder an Dritte weiterzugeben noch sonst wie entgegen den Interessen der
              jeweils anderen Partei zu verwerten. Ausnahme hiervon stellt die Einbeziehung Dritter
              zur in Anspruchnahme der durch uns geschuldeten Leistungen dar.
            </p>
            <p className="text-gray-700 mb-4">
              11.2. Von dieser Verpflichtung ausgenommen sind solche vertraulichen Informationen,
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                die dem Empfänger bei Abschluss des Vertrags nachweislich bereits bekannt waren oder
                danach von dritter Seite bekannt werden, ohne dass dadurch eine
                Vertraulichkeitsvereinbarung, gesetzliche Vorschriften oder behördliche Anordnungen
                verletzt werden;
              </li>
              <li>
                die bei Abschluss des Vertrags öffentlich bekannt sind oder danach öffentlich
                bekannt gemacht werden, soweit dies nicht auf einer Verletzung des Vertrags beruht;
              </li>
              <li>
                die aufgrund gesetzlicher Verpflichtungen oder auf Anordnung eines Gerichtes oder
                einer Behörde offengelegt werden müssen. Soweit zulässig und möglich, wird der zur
                Offenlegung verpflichtete Empfänger die andere Partei vorab unterrichten und ihr
                Gelegenheit geben, gegen die Offenlegung vorzugehen.
              </li>
            </ul>
            <p className="text-gray-700 mb-6">
              11.3. Die Parteien werden nur solchen Beratern Zugang zu vertraulichen Informationen
              gewähren, die dem Berufsgeheimnis unterliegen oder denen zuvor den
              Geheimhaltungsverpflichtungen des Nutzungsvertrages oder der Provisionsabreden
              entsprechende Verpflichtungen auferlegt worden sind. Des Weiteren werden die Parteien
              nur denjenigen Mitarbeitern die vertraulichen Informationen offenlegen, die diese für
              die Durchführung des Vertrags kennen müssen, und diese Mitarbeiter auch für die Zeit
              nach ihrem Ausscheiden in arbeitsrechtlich zulässigem Umfang zur Geheimhaltung
              verpflichten.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">12. Schlussbestimmungen</h2>
            <p className="text-gray-700 mb-4">
              12.1. Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
              UN-Kaufrechtes.
            </p>
            <p className="text-gray-700 mb-4">
              12.2. Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist der Sitz des Kunden.
            </p>
            <p className="text-gray-700 mb-4">
              12.3. Wir sind darüber hinaus berechtigt, an unserem Sitz zu klagen, sofern der der
              Kunde Kaufmann, juristische Person des öffentlichen Rechts, öffentlich-rechtliches
              Sondervermögen oder im Inland ohne Gerichtsstand ist.
            </p>
            <p className="text-gray-700 mb-4">12.4. Erfüllungsort ist unser Sitz.</p>
            <p className="text-gray-700 mb-6">
              12.5. Sollten sich einzelne Bestimmungen dieser allgemeinen Geschäftsbedingungen oder
              geschlossener Verträge als unwirksam oder undurchführbar erweisen, so berührt dies
              nicht die Wirksamkeit der übrigen Bestimmungen. Unwirksame Bestimmungen werden durch
              Regelungen ersetzt, deren wirtschaftlicher Erfolg dem mit der unwirksamen Klausel
              Beabsichtigten soweit wie möglich entspricht.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-black mb-2">Kontakt</h3>
              <p className="text-gray-700">
                Bei Fragen zu diesen AGB erreichst du uns unter{' '}
                <a href="mailto:info@tgn-media.com" className="text-accent hover:text-accent-dark">
                  info@tgn-media.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer dict={dict.footer} locale="de" />
    </main>
  );
}
