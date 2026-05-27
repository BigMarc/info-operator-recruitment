'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    q: 'Für wen ist die Growth Partner Ausbildung geeignet?',
    a: 'Für Menschen mit beruflicher Vorerfahrung (Marketing, Vertrieb, Beratung, Freelancing, Engineering), die ein zweites Standbein oder eine vollständige Selbstständigkeit aufbauen wollen — ohne eigene Kundenakquise. Vorerfahrung in Marketing hilft, ist aber kein Muss. Das System ist so aufgebaut, dass du in 4–6 Wochen die Kernfähigkeiten lernst.',
  },
  {
    q: 'Wie funktioniert das Creator-Matching genau?',
    a: 'Nach Abschluss deiner Ausbildung stellen wir dir Content Creator aus unserem Netzwerk vor, die bereits eine Audience aufgebaut haben, aber noch kein Produkt-Backend besitzen. Du führst Erstgespräche, prüfst Passung in beide Richtungen, und arbeitest dann auf Revenue-Share-Basis (20–50 % je nach Setup).',
  },
  {
    q: 'Wie viel Zeit muss ich pro Woche investieren?',
    a: 'Während der 4–6-wöchigen Ausbildung rechne mit 8–12 Stunden pro Woche. Nach der Ausbildung skaliert der Aufwand mit deiner Kundenanzahl: 1 Creator-Kunde = etwa 10–15 Std/Woche; 3 Kunden = grob ein Vollzeitäquivalent.',
  },
  {
    q: 'Brauche ich Vorerfahrung in Marketing oder Verkauf?',
    a: 'Nein — aber strukturiertes Denken hilft. Die Methode bringt dir alle Schritte bei: Offer-Creation, Funnels, Automation, Launch-Mechanik, Closing. Über die Hälfte unserer aktiven Growth Partners hatte vorher keine Marketing-Rolle.',
  },
  {
    q: 'Was kostet das Programm — und warum steht der Preis nicht hier?',
    a: 'Den Preis besprechen wir im Strategie-Call, weil er von deinem Setup abhängt (z. B. Zahlweise, Coaching-Tier, ob du sofort startest oder eine spätere Kohorte). Die 5K-Garantie deckt dein Risiko vollständig: verdienst du in 90 Tagen nicht mindestens 5.000 € mit deinem ersten Kunden, erhältst du 100 % zurück.',
  },
  {
    q: 'Wie schnell sind erste Einnahmen realistisch?',
    a: 'Die durchschnittliche Zeit vom Programmstart bis zum ersten zahlenden Creator-Kunden liegt bei ca. 90 Tagen. Schnellere Partner schaffen es in 30–45 Tagen; langsamere brauchen 4–5 Monate. Das hängt von deiner Umsetzungsgeschwindigkeit ab.',
  },
  {
    q: 'Ist das Modell wirklich ortsunabhängig?',
    a: 'Ja. Die gesamte Arbeit läuft remote: Calls mit Creatoren per Zoom, Funnel-Aufbau in Web-Tools (z. B. ClickFunnels, ActiveCampaign), Launch-Koordination per Slack/Notion. Mehrere unserer Growth Partners arbeiten aus Bali, Lissabon und Mexico City.',
  },
  {
    q: 'Was passiert, wenn ich nach 90 Tagen keinen Kunden habe?',
    a: 'Greift die 5.000-€-in-90-Tagen-Garantie — du bekommst 100 % deiner Ausbildungsgebühr zurück. Bedingung: nachweisbare Umsetzung der im Programm vermittelten Schritte (Modul-Abschlüsse, Outreach-Logs). Wir haben den Anspruch, dass jeder Partner mindestens diesen Schwellwert erreicht; alle bisherigen Garantie-Fälle wurden ohne Diskussion ausgezahlt.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Häufige{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Fragen
            </span>
          </h2>
          <p className="text-xl text-gray-700">
            Alle wichtigen Fragen & Antworten auf einen Blick.
          </p>
        </motion.div>

        <div className="space-y-4">
          {QUESTIONS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="bg-white rounded-2xl border-2 border-accent/10 shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-accent/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  <span className="text-lg md:text-xl font-bold text-black">{item.q}</span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center text-xl font-bold transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-700 leading-relaxed">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
