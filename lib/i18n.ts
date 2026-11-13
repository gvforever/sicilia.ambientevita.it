export const LANGS = ['it', 'fr', 'en', 'de'] as const;
export type Lang = typeof LANGS[number];
export const FLAGS: Record<Lang, string> = { it: '🇮🇹', fr: '🇫🇷', en: '🇬🇧', de: '🇩🇪' };
export const isLang = (l: string): l is Lang => (LANGS as readonly string[]).includes(l);

const it = {
  nav: { home: 'Home', association: "L'associazione", asino: "L'asino di Pantelleria", convegno: 'Convegno 2000', archeologia: 'Archeologia', support: 'Sostienici' },
  tagline: "L'uomo al centro del sistema ambiente",
  home: {
    title: 'AmbienteVita Sicilia',
    lead: "Il ramo siciliano dell'associazione nazionale AmbienteVita è attivo e presente su tutto il territorio regionale.",
    presidentTitle: 'Il messaggio del presidente regionale',
    president: "«La nostra attività non si è mai fermata. Da Pantelleria a tutta la Sicilia, stiamo preparando un nuovo slancio per il 2027: nuovi progetti, nuove adesioni, la stessa passione per l'uomo e il suo ambiente.» — Giuseppe Sechi, presidente regionale, Pantelleria",
    provincesTitle: 'Presenti in tutte le province',
    provincesLead: "L'associazione si articola in più ambiti territoriali e opera in tutta la Sicilia.",
    cta: 'Diventa socio o fai una donazione',
  },
  form: {
    title: 'Sostieni AmbienteVita Sicilia',
    membership: 'Adesione', none: 'Nessuna adesione, solo donazione', ordinario: 'Socio ordinario — 10 € / anno', benemerito: 'Socio benemerito — 200 € / anno',
    donation: 'Donazione libera', noDonation: 'Nessuna', custom: 'Altro importo (€)',
    firstName: 'Nome', lastName: 'Cognome', email: 'E-mail', phone: 'Telefono', address: 'Indirizzo completo', taxCode: 'Codice fiscale',
    receipt: 'Desidero ricevere la ricevuta fiscale per la detrazione',
    privacy: 'Acconsento al trattamento dei dati personali (GDPR)',
    total: 'Totale', submit: 'Invia e procedi al pagamento', error: 'Compila i campi obbligatori e scegli un importo.',
  },
  bank: {
    title: 'Grazie per il tuo sostegno!',
    lead: 'Per completare, effettua un bonifico con questi dati:',
    holder: 'Intestatario', reason: 'Causale', amount: 'Importo',
    receipt: 'Scarica la ricevuta (PDF)',
    note: 'La ricevuta diventa valida a ricezione del bonifico.',
  },
  footer: { rights: 'Tutti i diritti riservati.', national: 'Sito nazionale' },
};

const fr: typeof it = {
  nav: { home: 'Accueil', association: "L'association", asino: "L'âne de Pantelleria", convegno: 'Conférence 2000', archeologia: 'Archéologie', support: 'Nous soutenir' },
  tagline: "L'homme au centre du système environnement",
  home: {
    title: 'AmbienteVita Sicilia',
    lead: "La branche sicilienne de l'association nationale AmbienteVita est active et présente sur tout le territoire régional.",
    presidentTitle: 'Le message du président régional',
    president: "« Notre activité ne s'est jamais arrêtée. De Pantelleria à toute la Sicile, nous préparons un nouvel élan pour 2027 : de nouveaux projets, de nouveaux membres, la même passion pour l'homme et son environnement. » — Giuseppe Sechi, président régional, Pantelleria",
    provincesTitle: 'Présents dans toutes les provinces',
    provincesLead: "L'association compte plusieurs découpages territoriaux et agit sur toute la Sicile.",
    cta: 'Devenir membre ou faire un don',
  },
  form: {
    title: 'Soutenir AmbienteVita Sicilia',
    membership: 'Adhésion', none: 'Pas d’adhésion, don seulement', ordinario: 'Membre simple — 10 € / an', benemerito: 'Membre bienfaiteur — 200 € / an',
    donation: 'Don libre', noDonation: 'Aucun', custom: 'Autre montant (€)',
    firstName: 'Prénom', lastName: 'Nom', email: 'E-mail', phone: 'Téléphone', address: 'Adresse complète', taxCode: 'Code fiscal',
    receipt: 'Je souhaite recevoir un reçu fiscal pour la déduction',
    privacy: 'J’accepte le traitement de mes données personnelles (RGPD)',
    total: 'Total', submit: 'Envoyer et passer au paiement', error: 'Remplissez les champs obligatoires et choisissez un montant.',
  },
  bank: {
    title: 'Merci pour votre soutien !',
    lead: 'Pour finaliser, effectuez un virement avec ces coordonnées :',
    holder: 'Titulaire', reason: 'Motif', amount: 'Montant',
    receipt: 'Télécharger le reçu (PDF)',
    note: 'Le reçu devient valable à réception du virement.',
  },
  footer: { rights: 'Tous droits réservés.', national: 'Site national' },
};

const en: typeof it = {
  nav: { home: 'Home', association: 'The association', asino: 'The Pantelleria donkey', convegno: '2000 Conference', archeologia: 'Archaeology', support: 'Support us' },
  tagline: 'Mankind at the heart of the environment',
  home: {
    title: 'AmbienteVita Sicilia',
    lead: 'The Sicilian branch of the national association AmbienteVita is active throughout the whole region.',
    presidentTitle: "The regional president's message",
    president: '“Our work has never stopped. From Pantelleria to all of Sicily, we are preparing a fresh start for 2027: new projects, new members, the same passion for people and their environment.” — Giuseppe Sechi, regional president, Pantelleria',
    provincesTitle: 'Present in every province',
    provincesLead: 'The association has several territorial divisions and works across all of Sicily.',
    cta: 'Become a member or donate',
  },
  form: {
    title: 'Support AmbienteVita Sicilia',
    membership: 'Membership', none: 'No membership, donation only', ordinario: 'Ordinary member — €10 / year', benemerito: 'Patron member — €200 / year',
    donation: 'Free donation', noDonation: 'None', custom: 'Other amount (€)',
    firstName: 'First name', lastName: 'Last name', email: 'Email', phone: 'Phone', address: 'Full address', taxCode: 'Tax code',
    receipt: 'I would like a tax receipt for deduction',
    privacy: 'I consent to the processing of my personal data (GDPR)',
    total: 'Total', submit: 'Send and continue to payment', error: 'Fill in the required fields and choose an amount.',
  },
  bank: {
    title: 'Thank you for your support!',
    lead: 'To complete, please make a bank transfer using these details:',
    holder: 'Account holder', reason: 'Reference', amount: 'Amount',
    receipt: 'Download the receipt (PDF)',
    note: 'The receipt becomes valid once the transfer is received.',
  },
  footer: { rights: 'All rights reserved.', national: 'National website' },
};

const de: typeof it = {
  nav: { home: 'Startseite', association: 'Der Verein', asino: 'Der Esel von Pantelleria', convegno: 'Tagung 2000', archeologia: 'Archäologie', support: 'Unterstützen' },
  tagline: 'Der Mensch im Mittelpunkt der Umwelt',
  home: {
    title: 'AmbienteVita Sicilia',
    lead: 'Der sizilianische Zweig des nationalen Vereins AmbienteVita ist in der ganzen Region aktiv.',
    presidentTitle: 'Die Botschaft des Regionalpräsidenten',
    president: '„Unsere Arbeit hat nie aufgehört. Von Pantelleria bis in ganz Sizilien bereiten wir einen neuen Aufbruch für 2027 vor: neue Projekte, neue Mitglieder, dieselbe Leidenschaft für den Menschen und seine Umwelt.“ — Giuseppe Sechi, Regionalpräsident, Pantelleria',
    provincesTitle: 'In allen Provinzen vertreten',
    provincesLead: 'Der Verein ist in mehrere Gebietseinheiten gegliedert und in ganz Sizilien tätig.',
    cta: 'Mitglied werden oder spenden',
  },
  form: {
    title: 'AmbienteVita Sicilia unterstützen',
    membership: 'Mitgliedschaft', none: 'Keine Mitgliedschaft, nur Spende', ordinario: 'Ordentliches Mitglied — 10 € / Jahr', benemerito: 'Fördermitglied — 200 € / Jahr',
    donation: 'Freie Spende', noDonation: 'Keine', custom: 'Anderer Betrag (€)',
    firstName: 'Vorname', lastName: 'Nachname', email: 'E-Mail', phone: 'Telefon', address: 'Vollständige Adresse', taxCode: 'Steuernummer',
    receipt: 'Ich möchte eine Spendenquittung für die Steuer',
    privacy: 'Ich stimme der Verarbeitung meiner Daten zu (DSGVO)',
    total: 'Summe', submit: 'Senden und zur Zahlung', error: 'Bitte Pflichtfelder ausfüllen und einen Betrag wählen.',
  },
  bank: {
    title: 'Danke für Ihre Unterstützung!',
    lead: 'Bitte überweisen Sie mit folgenden Daten:',
    holder: 'Kontoinhaber', reason: 'Verwendungszweck', amount: 'Betrag',
    receipt: 'Quittung herunterladen (PDF)',
    note: 'Die Quittung gilt ab Eingang der Überweisung.',
  },
  footer: { rights: 'Alle Rechte vorbehalten.', national: 'Nationale Website' },
};

export const dict = { it, fr, en, de };
export const t = (lang: Lang) => dict[lang];

export const PROVINCES = ['Agrigento', 'Caltanissetta', 'Catania', 'Enna', 'Messina', 'Palermo', 'Ragusa', 'Siracusa', 'Trapani (Pantelleria)'];

export const BANK = {
  holder: 'Associazione Siciliana di AmbienteVita — sicilia.ambientevita.it',
  iban: 'IT00 X000 0000 0000 0000 0000 000',
  bic: 'XXXXITXXXXX',
  bank: 'Banca di esempio — Pantelleria (TP)',
};
