export type Ev = {
  id: string; date: string; time: string; city: string; venue: string; title: string;
  price: number; quota: number; extra: string; vip?: { silver: number; gold: number };
};

export const EVENTS: Ev[] = [
  // 2027
  { id: '2027-01', date: '2027-01-24', time: '11:00', city: 'Palermo', venue: 'Antico Caffè Spinnato, Via Principe di Belmonte', title: 'Brunch di inizio anno: il nuovo slancio 2027', price: 25, quota: 10, extra: 'brunch' },
  { id: '2027-02', date: '2027-02-20', time: '17:30', city: 'Catania', venue: 'Monastero dei Benedettini', title: 'Visita guidata e aperitivo: architettura e ambiente', price: 30, quota: 10, extra: 'visita guidata e aperitivo' },
  { id: '2027-03', date: '2027-03-21', time: '10:30', city: 'Agrigento', venue: 'Museo Archeologico Regionale Pietro Griffo', title: 'Primavera nella Valle: paesaggio e archeologia', price: 30, quota: 10, extra: 'ingresso e caffè' },
  { id: '2027-04', date: '2027-04-17', time: '18:30', city: 'Siracusa', venue: 'Museo Archeologico Regionale Paolo Orsi', title: 'Il Mediterraneo dei Greci: incontro e cocktail', price: 30, quota: 10, extra: 'cocktail' },
  { id: '2027-05', date: '2027-05-15', time: '11:00', city: 'Trapani', venue: 'Museo Regionale Agostino Pepoli', title: 'Saline, mare e tradizioni', price: 25, quota: 10, extra: 'brunch' },
  { id: '2027-06', date: '2027-06-12', time: '18:00', city: 'Pantelleria (TP)', venue: 'Castello di Pantelleria', title: 'Pantelleria e il Mediterraneo: 27 anni dopo', price: 25, quota: 10, extra: 'aperitivo con zibibbo' },
  { id: '2027-07', date: '2027-07-17', time: '20:30', city: 'Palermo', venue: 'Villa Igiea, Rocco Forte Hotels', title: 'Gran Gala VIP d’estate di AmbienteVita Sicilia', price: 200, quota: 100, extra: 'cena di gala', vip: { silver: 200, gold: 300 } },
  { id: '2027-08', date: '2027-08-21', time: '19:00', city: 'Messina', venue: 'Museo Regionale di Messina (MuMe)', title: 'Lo Stretto: natura e storia', price: 30, quota: 10, extra: 'visita e aperitivo' },
  { id: '2027-09', date: '2027-09-18', time: '17:00', city: 'Ragusa', venue: 'Giardino Ibleo, Ragusa Ibla', title: 'Passeggiata botanica e merenda iblea', price: 25, quota: 10, extra: 'merenda' },
  { id: '2027-10', date: '2027-10-16', time: '18:00', city: 'Enna', venue: 'Castello di Lombardia', title: 'Il cuore della Sicilia: tramonto al castello', price: 30, quota: 10, extra: 'aperitivo' },
  { id: '2027-11', date: '2027-11-13', time: '17:30', city: 'Caltanissetta', venue: 'Museo Archeologico Regionale di Caltanissetta', title: 'Terre dell’interno: agricoltura e memoria', price: 25, quota: 10, extra: 'degustazione' },
  { id: '2027-12', date: '2027-12-11', time: '19:30', city: 'Catania', venue: 'Castello Ursino', title: 'Cena degli auguri dei soci', price: 50, quota: 10, extra: 'cena' },
  // 2028
  { id: '2028-01', date: '2028-01-22', time: '11:00', city: 'Siracusa', venue: 'Castello Maniace, Ortigia', title: 'Brunch in Ortigia: bilancio e progetti', price: 25, quota: 10, extra: 'brunch' },
  { id: '2028-02', date: '2028-02-19', time: '18:00', city: 'Palermo', venue: 'Museo Archeologico Regionale Antonino Salinas', title: 'Archeologia e paesaggio: serata con aperitivo', price: 30, quota: 10, extra: 'aperitivo' },
  { id: '2028-03', date: '2028-03-18', time: '10:30', city: 'Enna', venue: 'Museo Archeologico di Palazzo Varisano', title: 'I boschi della Sicilia interna', price: 25, quota: 10, extra: 'colazione' },
  { id: '2028-04', date: '2028-04-15', time: '17:30', city: 'Trapani', venue: 'Museo Regionale Agostino Pepoli', title: 'Isole Egadi: tutela del mare', price: 30, quota: 10, extra: 'aperitivo' },
  { id: '2028-05', date: '2028-05-20', time: '18:00', city: 'Messina', venue: 'Museo Regionale di Messina (MuMe)', title: 'Le Eolie, patrimonio vivente', price: 30, quota: 10, extra: 'cocktail' },
  { id: '2028-06', date: '2028-06-17', time: '18:00', city: 'Pantelleria (TP)', venue: 'Castello di Pantelleria', title: 'La giornata dell’asino pantesco', price: 25, quota: 10, extra: 'aperitivo' },
  { id: '2028-07', date: '2028-07-22', time: '20:30', city: 'Siracusa', venue: 'Grand Hotel Villa Politi', title: 'Gran Gala VIP d’estate di AmbienteVita Sicilia', price: 200, quota: 100, extra: 'cena di gala', vip: { silver: 200, gold: 300 } },
  { id: '2028-08', date: '2028-08-19', time: '19:00', city: 'Agrigento', venue: 'Museo Archeologico Regionale Pietro Griffo', title: 'Notte d’estate nella Valle', price: 50, quota: 10, extra: 'cena' },
  { id: '2028-09', date: '2028-09-16', time: '17:00', city: 'Ragusa', venue: 'Giardino Ibleo, Ragusa Ibla', title: 'Vendemmia e muretti a secco', price: 25, quota: 10, extra: 'degustazione' },
  { id: '2028-10', date: '2028-10-14', time: '17:30', city: 'Caltanissetta', venue: 'Museo Archeologico Regionale di Caltanissetta', title: 'Zolfo, miniere e territorio', price: 25, quota: 10, extra: 'merenda' },
  { id: '2028-11', date: '2028-11-18', time: '18:00', city: 'Catania', venue: 'Monastero dei Benedettini', title: 'Etna, vulcano e agricoltura', price: 30, quota: 10, extra: 'aperitivo' },
  { id: '2028-12', date: '2028-12-09', time: '19:30', city: 'Palermo', venue: 'Antico Caffè Spinnato, Via Principe di Belmonte', title: 'Cena degli auguri dei soci', price: 50, quota: 10, extra: 'cena' },
];

export const EV_TXT = {
  nav: { it: 'Eventi', fr: 'Événements', en: 'Events', de: 'Veranstaltungen' },
  title: { it: 'Eventi 2027 – 2028', fr: 'Événements 2027 – 2028', en: 'Events 2027 – 2028', de: 'Veranstaltungen 2027 – 2028' },
  lead: {
    it: 'Un appuntamento al mese in tutte le province. Ogni quota di partecipazione include l’iscrizione annuale all’associazione (10 €).',
    fr: 'Un rendez-vous par mois dans toutes les provinces. Chaque participation inclut l’adhésion annuelle à l’association (10 €).',
    en: 'One event a month across every province. Each ticket includes the annual membership fee (€10).',
    de: 'Eine Veranstaltung pro Monat in allen Provinzen. Jeder Beitrag enthält die Jahresmitgliedschaft (10 €).',
  },
  includes: { it: 'di cui quota associativa', fr: 'dont cotisation', en: 'incl. membership', de: 'davon Mitgliedsbeitrag' },
  book: { it: 'Prenota', fr: 'Réserver', en: 'Book', de: 'Buchen' },
  vip: {
    it: 'Silver 200 € (100 € socio sostenitore + cena) · Gold 300 € (200 € socio Gold + cena)',
    fr: 'Silver 200 € (100 € membre bienfaiteur + dîner) · Gold 300 € (200 € membre Gold + dîner)',
    en: 'Silver €200 (€100 supporting member + dinner) · Gold €300 (€200 Gold member + dinner)',
    de: 'Silver 200 € (100 € Fördermitglied + Dinner) · Gold 300 € (200 € Gold-Mitglied + Dinner)',
  },
};
