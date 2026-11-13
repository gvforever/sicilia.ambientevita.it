const W = (f: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=1200`;
export type Prov = { slug: string; name: string; title: string; text: string[]; photos: { src: string; alt: string }[] };

export const SICILIA = {
  title: 'La Sicilia, cuore del Mediterraneo',
  text: [
    'Con i suoi 25.700 km² la Sicilia è la più grande isola del Mediterraneo. Vulcani, montagne, pianure di grano e più di mille chilometri di costa ne fanno un concentrato unico di paesaggi.',
    'Greci, Romani, Arabi, Normanni e Spagnoli hanno lasciato templi, cattedrali, giardini e saperi agricoli. Ogni provincia custodisce una parte di questa storia.',
    'Intorno all’isola maggiore si trovano le isole minori: Eolie, Egadi, Pelagie, Ustica e Pantelleria. Ecosistemi preziosi e fragili, che AmbienteVita Sicilia vuole proteggere insieme a chi li abita.',
  ],
};

export const PROVS: Prov[] = [
  { slug: 'palermo', name: 'Palermo', title: 'Palermo, la capitale arabo-normanna', text: ['Capoluogo della regione, Palermo unisce il patrimonio UNESCO arabo-normanno ai mercati storici e al mare di Mondello.', 'Intorno, le Madonie, Capo Gallo e l’isola di Ustica offrono natura da proteggere a pochi chilometri dalla città.'], photos: [] },
  { slug: 'trapani', name: 'Trapani', title: 'Trapani, tra saline, Erice e isole', text: ['Trapani si allunga sul mare tra il porto, da cui partono i traghetti per le Egadi e Pantelleria, e le saline dei fenicotteri.', 'Sopra la città domina il Monte Erice, borgo medievale a 750 metri con una vista che arriva fino alle isole. Più a nord, la Riserva dello Zingaro.'], photos: [{ src: W('Erice.jpg'), alt: 'Monte Erice' }, { src: W('Porto di Trapani.jpg'), alt: 'Il porto di Trapani' }] },
  { slug: 'agrigento', name: 'Agrigento', title: 'Agrigento, la Valle dei Templi', text: ['La Valle dei Templi è uno dei siti greci meglio conservati al mondo.', 'Sulla costa, la Scala dei Turchi e la riserva di Torre Salsa; al largo, Lampedusa e Linosa.'], photos: [] },
  { slug: 'caltanissetta', name: 'Caltanissetta', title: 'Caltanissetta, il cuore minerario', text: ['Terra delle antiche miniere di zolfo, al centro dell’isola.', 'Verso il mare, il Biviere di Gela accoglie ogni anno migliaia di uccelli migratori.'], photos: [] },
  { slug: 'enna', name: 'Enna', title: 'Enna, il belvedere della Sicilia', text: ['Il capoluogo più alto d’Italia, a quasi mille metri.', 'Il lago di Pergusa e la villa romana del Casale di Piazza Armerina ne fanno una tappa unica.'], photos: [] },
  { slug: 'catania', name: 'Catania', title: 'Catania, ai piedi dell’Etna', text: ['Città barocca costruita con la pietra lavica, dominata dal vulcano attivo più alto d’Europa.', 'Le gole dell’Alcantara e i faraglioni di Aci Trezza completano il paesaggio.'], photos: [] },
  { slug: 'messina', name: 'Messina', title: 'Messina, lo Stretto e le Eolie', text: ['Porta della Sicilia sullo Stretto, Messina guarda verso la Calabria.', 'Dalla sua provincia si raggiungono le isole Eolie, i Nebrodi e la splendida Taormina.'], photos: [] },
  { slug: 'ragusa', name: 'Ragusa', title: 'Ragusa, il barocco degli Iblei', text: ['Ragusa Ibla, Modica e Scicli sono gioielli del barocco UNESCO.', 'Tra altopiani e muretti a secco scorrono cave profonde e fiumi intatti fino al mare.'], photos: [] },
  { slug: 'siracusa', name: 'Siracusa', title: 'Siracusa, la città di Archimede', text: ['Ortigia e il teatro greco raccontano una delle più grandi città dell’antichità.', 'A sud, la riserva di Vendicari e il canyon di Cavagrande, tesori naturali da difendere.'], photos: [] },
];

export const PANTELLERIA = {
  title: 'Pantelleria, dove tutto è cominciato',
  text: 'Isola vulcanica tra Sicilia e Africa, Pantelleria è la casa storica della nostra associazione: il lago di Venere, i dammusi, la vite ad alberello patrimonio UNESCO e l’asino pantesco salvato dall’estinzione.',
};
