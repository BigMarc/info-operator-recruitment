// Single source of truth for all translatable content in the site.
// Both dictionaries/de.ts and dictionaries/en.ts MUST satisfy this interface.
// TypeScript enforces parity: missing a key in one locale = build error.

export type Locale = 'de' | 'en';

export interface MetaDict {
  title: string;
  description: string;
}

export interface NavDict {
  methode: string;
  stories: string;
  faq: string;
  cta: string;
  switchTo: string;
}

export interface HeroStatDict {
  value: string;
  label: string;
  sub: string;
  highlight?: boolean;
}

export interface HeroDict {
  tag: string;
  headlineLine1: string;
  headlineLine2Pre: string;
  headlineAccent: string;
  headlineLine3: string;
  sub: string;
  guaranteeBarBefore: string;
  guaranteeAmount: string;
  guaranteeBarMiddle: string;
  guaranteeDays: string;
  guaranteeBarAfter: string;
  videoTitle: string;
  videoSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: HeroStatDict[];
}

export interface ProblemCardDict {
  icon: string;
  title: string;
  body: string;
}

export interface ProblemDict {
  tag: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  sub: string;
  cards: ProblemCardDict[];
}

export interface ReframeDict {
  tag: string;
  headlineLine1: string;
  headlineLine2Pre: string;
  headlineAccent: string;
  headlineLine2Post: string;
  paragraphs: string[];
  beliefOldLabel: string;
  beliefOldQuote: string;
  beliefNewLabel: string;
  beliefNewQuote: string;
}

export interface MethodStatDict {
  value: string;
  label: string;
  sub: string;
}

export interface MethodStepDict {
  num: number;
  title: string;
  body: string;
}

export interface MethodDict {
  tag: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  body1: string;
  body2: string;
  avatarStripText: string;
  stats: MethodStatDict[];
  steps: MethodStepDict[];
}

export interface CredentialDict {
  icon: string;
  title: string;
  body: string;
}

export interface TrainerDict {
  headlineBefore: string;
  headlineAccent: string;
  sub: string;
  name: string;
  intro: string;
  credentials: CredentialDict[];
  quote: string;
  quoteAttribution: string;
  cta: string;
}

export interface TestimonialDict {
  name: string;
  background: string;
  clients: number;
  avatar: string;
  quote: string;
  result: string;
  before: string;
  after: string;
}

export interface AggregateStatDict {
  value: string;
  label: string;
  sub: string;
}

export interface TestimonialsDict {
  tag: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  sub: string;
  items: TestimonialDict[];
  clientsLabel: string;
  resultLabel: string;
  beforeLabel: string;
  aggregate: AggregateStatDict[];
}

export interface LadderStepDict {
  num: number;
  title: string;
  body: string;
  price: string;
  cta: string;
  href: string;
}

export interface LadderDict {
  tag: string;
  headlineAccent: string;
  headlineRest: string;
  priceLabel: string;
  steps: LadderStepDict[];
  ctaPrimary: string;
}

export interface GuaranteeDict {
  headlineAccent: string;
  headlineRest: string;
  guarantee: {
    icon: string;
    title: string;
    body: string;
    footer: string;
  };
  scarcity: {
    icon: string;
    titleAccent: string;
    titleRest: string;
    body: string;
    footer: string;
  };
  cta: string;
}

export interface FAQItemDict {
  q: string;
  a: string;
}

export interface FAQDict {
  tag: string;
  headlineBefore: string;
  headlineAccent: string;
  sub: string;
  items: FAQItemDict[];
}

export interface CalendarBenefitDict {
  num: number;
  title: string;
  body: string;
}

export interface CalendarDict {
  headlineLine1: string;
  headlineLine2Accent: string;
  sub: string;
  benefitsHeading: string;
  benefits: CalendarBenefitDict[];
  scarcityHeading: string;
  scarcityBody: string;
  emailFallback: string;
}

export interface FooterDict {
  tagline: string;
  linksHeading: string;
  legalHeading: string;
  linkMethode: string;
  linkStories: string;
  linkFAQ: string;
  linkV4: string;
  linkPrivacy: string;
  linkTerms: string;
  linkDisclosure: string;
  companyHeading: string;
  guaranteeHeading: string;
  guaranteeBody: string;
  copyright: string;
}

export interface V4StepDict {
  num: number;
  title: string;
  body: string;
}

export interface V4Dict {
  badge: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  sub1: string;
  highlightAmount: string;
  sub2: string;
  highlight2: string;
  sub3: string;
  ctaPrimary: string;
  secureBoxTitle: string;
  secureBoxBody: string;
  unlockedHeadlineBefore: string;
  unlockedHeadlineAccent: string;
  unlockedHeadlineAfter: string;
  videoTitle: string;
  videoSub: string;
  steps: V4StepDict[];
  unlockedCTA: string;
  footerDisclaimers: string[];
}

export interface SuccessNextStepDict {
  num: number;
  title: string;
  body: string;
}

export interface SuccessDict {
  badge: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  intro: string;
  nextStepsTag: string;
  nextStepsHeading: string;
  steps: SuccessNextStepDict[];
  ctaHeadlineLine1: string;
  ctaHeadlineLine2Accent: string;
  ctaSub: string;
  ctaScarcity: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaGuaranteeNote: string;
  backToHome: string;
}

export interface LegalDict {
  privacy: {
    title: string;
    bodyMarkdown: string;
  };
  terms: {
    title: string;
    bodyMarkdown: string;
  };
  disclosure: {
    title: string;
    bodyMarkdown: string;
  };
}

export interface Dictionary {
  meta: MetaDict;
  nav: NavDict;
  hero: HeroDict;
  problem: ProblemDict;
  reframe: ReframeDict;
  method: MethodDict;
  trainer: TrainerDict;
  testimonials: TestimonialsDict;
  ladder: LadderDict;
  guarantee: GuaranteeDict;
  faq: FAQDict;
  calendar: CalendarDict;
  footer: FooterDict;
  v4: V4Dict;
  success: SuccessDict;
  legal: LegalDict;
}
