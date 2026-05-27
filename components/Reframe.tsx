'use client';

import { motion } from 'framer-motion';

export default function Reframe() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="absolute top-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
              Die Wende
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Hör auf, dein Gehalt zu erhöhen.
              <br />
              Fang an, an{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                Umsatz beteiligt
              </span>{' '}
              zu sein.
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Die wohlhabendsten Menschen der Welt verdienen <strong className="text-white">kein Gehalt</strong>. Sie haben <strong className="text-accent">Beteiligung</strong>.
              </p>
              <p>
                Content Creator haben das, was Geld wert ist: <strong className="text-white">Aufmerksamkeit</strong>. Was ihnen fehlt — jemand, der diese Aufmerksamkeit in ein Produkt-Backend übersetzt: Offer, Funnel, Automation, Launch.
              </p>
              <p>
                Genau das macht ein <strong className="text-accent">Growth Partner</strong>. Du baust für sie. Du wirst nicht bezahlt wie ein Angestellter — du bekommst <strong className="text-white">20–50 % vom Umsatz</strong>, den du erzeugst.
              </p>
              <p>
                Ein guter Creator-Kunde = <strong className="text-accent">5.000–20.000 €</strong> pro Launch. Drei Kunden = ein Vollzeit-Einkommen. Ortsunabhängig. Ohne Boss. Ohne Decke.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-accent/40 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">❌</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Alte Überzeugung</span>
                </div>
                <p className="text-white text-lg italic leading-relaxed">
                  &ldquo;Mehr verdienen = besser bezahlt werden.&rdquo;
                </p>
              </div>
              <div className="border-t border-accent/30 pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Neue Überzeugung</span>
                </div>
                <p className="text-white text-lg italic leading-relaxed">
                  &ldquo;Mehr verdienen = an Umsatz beteiligt sein, den du erzeugst.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
