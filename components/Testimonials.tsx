'use client';

import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    background: 'Ehemals Marketing Managerin',
    clients: 8,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    quote:
      'Ich war skeptisch, meinen Konzernjob zu kündigen. Marcs Ausbildung hat mir alles gegeben, was ich brauchte. Heute habe ich 8 Creator-Kunden und 45.000 € Jahresumsatz. Das Matching-System ist Gold wert.',
    result: '45.000 € Jahresumsatz',
    before: 'Marketing im Konzern',
    after: 'Eigenes Growth-Partner-Business',
  },
  {
    name: 'Marcus Rodriguez',
    background: 'Ehemals Freelancer',
    clients: 12,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote:
      'Die Arbeit mit Marc hat mein Freelance-Geschäft transformiert. Von schwankenden 3K-Monaten zu 68.000 € Jahresumsatz als Growth Partner. Die Ausbildung und das Matching haben den Unterschied gemacht.',
    result: '68.000 € Jahresumsatz',
    before: '3K/Monat freelance',
    after: '68K Growth Partner',
  },
  {
    name: 'Emma Thompson',
    background: 'Ehemals Vertriebsmitarbeiterin',
    clients: 6,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote:
      'Der Lifestyle-Creator-Launch hat alle Erwartungen übertroffen. 28K in der ersten Woche! Marcs Team hat alles übernommen — Sales Pages, E-Mail-Sequenzen, alles. Allein hätte ich das nie geschafft.',
    result: '32.000 € Jahresumsatz',
    before: 'Vertriebs-Provision',
    after: 'Planbares Operator-Einkommen',
  },
  {
    name: 'David Kim',
    background: 'Ehemals Berater',
    clients: 15,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote:
      'Als Berater hätte ich nie gedacht, dass ich Gaming-Creatoren helfe, Produkte zu launchen. Marc hat mich überzeugt — mit einem 55K-Launch beim ersten Kunden. Die Marketing-Automation-Trainings sind unschlagbar.',
    result: '89.000 € Jahresumsatz',
    before: 'Stunden-Beratung',
    after: 'High-Ticket Operator-Services',
  },
  {
    name: 'Alex Rivera',
    background: 'Ehemals Ingenieur',
    clients: 10,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    quote:
      'Der KI-Kurs-Launch war der Gamechanger. 31K im ersten Monat mit minimalem Aufwand. Marcs System macht die Arbeit — ich liefere nur den Mehrwert.',
    result: '58.000 € Jahresumsatz',
    before: 'Ingenieurs-Gehalt',
    after: 'Passives Operator-Einkommen',
  },
  {
    name: 'Ryan Mitchell',
    background: 'Ehemals Fotograf',
    clients: 9,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    quote:
      'Der Foto-Kurs-Launch war unglaublich — 38K im ersten Monat. Marcs Team hat so überzeugende Sales-Copy und Marketing-Materialien gebaut. Klare Empfehlung.',
    result: '52.000 € Jahresumsatz',
    before: 'Foto-Aufträge',
    after: 'Digital-Produkt-Operator',
  },
];

const AGGREGATE_STATS = [
  { value: '344.000 €', label: 'Gesamt-Umsatz', sub: 'Aus 6 Operators oben' },
  { value: '57.000 €', label: 'Ø Umsatz', sub: 'Pro Operator' },
  { value: '90 %', label: 'Vermittlung', sub: 'Match-Erfolgsquote' },
  { value: '35 %', label: 'Ø Beteiligung', sub: 'Operator-Profit-Share' },
];

export default function Testimonials() {
  return (
    <section id="stories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            Echte Ergebnisse
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Was unsere{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Growth Partners
            </span>{' '}
            verdienen
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Vom Marketing Manager zur 45K-Operatorin. Vom Freelancer zum 68K-Operator.
            Echte Menschen, dokumentierte Zahlen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="text-lg font-bold text-black">{t.name}</h4>
                  <p className="text-gray-600 text-sm">{t.background}</p>
                  <p className="text-accent font-semibold text-sm">{t.clients} Creator-Kunden</p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic flex-grow">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Ergebnis:</span>
                  <span className="text-accent font-bold text-lg">{t.result}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Vorher: {t.before}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-gray-700 font-semibold">{t.after}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border-2 border-accent/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {AGGREGATE_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-black text-accent mb-2">{s.value}</div>
                <div className="text-black font-bold text-sm">{s.label}</div>
                <div className="text-gray-600 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
