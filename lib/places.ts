import { Lang } from '@/lib/i18n';
import { IMG } from '@/lib/images';

type Place = { image: string; gps: [number, number]; name: Record<Lang, string>; lead: Record<Lang, string>; body: Record<Lang, string[]>; facts: Record<Lang, [string, string][]> };

export const PLACES: Record<string, Place> = {
  'lago-di-venere': {
    image: IMG.venere, gps: [36.818, 11.994],
    name: { it: 'Lago Specchio di Venere', fr: 'Lac Specchio di Venere', en: 'Lake Specchio di Venere', de: 'Venussee (Specchio di Venere)' },
    lead: { it: 'Un lago nel cratere di un antico vulcano, tra acque calde e fanghi naturali.', fr: 'Un lac dans le cratère d’un ancien volcan, entre eaux chaudes et boues naturelles.', en: 'A lake in the crater of an ancient volcano, with warm waters and natural mud.', de: 'Ein See im Krater eines alten Vulkans, mit warmem Wasser und natürlichem Schlamm.' },
    body: {
      it: ['Lo Specchio di Venere si trova nel nord dell’isola, in contrada Bugeber, all’interno del Parco Nazionale Isola di Pantelleria. È un lago naturale nato in un cratere spento, alimentato dalle piogge e da sorgenti termali.', 'Sulla riva meridionale sgorgano acque calde e sulfuree; i visitatori si coprono del fango argilloso del fondale. La leggenda vuole che Venere vi specchiasse la propria bellezza, da cui il nome.', 'In primavera e in autunno il lago è una sosta per molti uccelli migratori. Si raccomanda di rispettare le sponde e la vegetazione del parco.'],
      fr: ['Le Specchio di Venere se trouve au nord de l’île, dans le quartier de Bugeber, au sein du Parc national de l’île de Pantelleria. C’est un lac naturel né dans un cratère éteint, alimenté par les pluies et des sources thermales.', 'Sur la rive sud jaillissent des eaux chaudes et soufrées ; les visiteurs se couvrent de la boue argileuse du fond. La légende veut que Vénus y ait admiré son reflet, d’où son nom de « miroir de Vénus ».', 'Au printemps et en automne, le lac accueille de nombreux oiseaux migrateurs. Merci de respecter les rives et la végétation du parc.'],
      en: ['The Specchio di Venere lies in the north of the island, in the Bugeber area, inside the Pantelleria Island National Park. It is a natural lake in an extinct crater, fed by rain and hot springs.', 'Warm, sulphurous water rises along the southern shore, and visitors coat themselves in the clay mud of the lake bed. Legend has it that Venus admired her reflection here, hence the name “Venus’ mirror”.', 'In spring and autumn the lake is a stopover for many migratory birds. Please respect the shores and the park’s vegetation.'],
      de: ['Der Specchio di Venere liegt im Norden der Insel, im Ortsteil Bugeber, im Nationalpark Isola di Pantelleria. Er ist ein natürlicher See in einem erloschenen Krater, gespeist von Regen und heißen Quellen.', 'Am Südufer treten warme, schwefelhaltige Quellen aus; Besucher reiben sich mit dem Tonschlamm des Seebodens ein. Der Legende nach betrachtete Venus hier ihr Spiegelbild – daher der Name „Spiegel der Venus“.', 'Im Frühling und Herbst rasten hier viele Zugvögel. Bitte Ufer und Vegetation des Parks schonen.'],
    },
    facts: {
      it: [['Tipo', 'Lago vulcanico'], ['Profondità massima', 'circa 12 m'], ['Acque termali', 'fino a circa 50 °C'], ['Area protetta', 'Parco Nazionale Isola di Pantelleria']],
      fr: [['Type', 'Lac volcanique'], ['Profondeur max.', 'environ 12 m'], ['Eaux thermales', 'jusqu’à environ 50 °C'], ['Zone protégée', 'Parc national de l’île de Pantelleria']],
      en: [['Type', 'Volcanic lake'], ['Max depth', 'about 12 m'], ['Hot springs', 'up to about 50 °C'], ['Protected area', 'Pantelleria Island National Park']],
      de: [['Typ', 'Vulkansee'], ['Max. Tiefe', 'etwa 12 m'], ['Thermalquellen', 'bis etwa 50 °C'], ['Schutzgebiet', 'Nationalpark Isola di Pantelleria']],
    },
  },
  'arco-dell-elefante': {
    image: IMG.elefante, gps: [36.824, 12.043],
    name: { it: 'Arco dell’Elefante', fr: 'Arc de l’Éléphant', en: 'Elephant Arch', de: 'Elefantenbogen' },
    lead: { it: 'Il simbolo dell’isola: un elefante di lava che beve nel mare.', fr: 'Le symbole de l’île : un éléphant de lave qui boit dans la mer.', en: 'The island’s symbol: a lava elephant drinking from the sea.', de: 'Das Wahrzeichen der Insel: ein Elefant aus Lava, der aus dem Meer trinkt.' },
    body: {
      it: ['L’Arco dell’Elefante si trova sulla costa orientale, oltre Cala Levante, vicino a Tracino. È un promontorio di lava grigia modellato dal vento e dal mare: la sua sagoma ricorda un elefante che immerge la proboscide nell’acqua, formando un grande arco.', 'È uno dei luoghi più visitati e fotografati di Pantelleria. Si ammira bene dalla strada costiera; dal bivio di Tracino si scende lungo via Arco dell’Elefante.', 'La vicina Cala Levante è riparata dal maestrale: quando il vento soffia da nord-ovest il mare qui è spesso calmo.'],
      fr: ['L’Arc de l’Éléphant se trouve sur la côte est, après Cala Levante, près de Tracino. C’est un promontoire de lave grise sculpté par le vent et la mer : sa silhouette évoque un éléphant qui plonge sa trompe dans l’eau en formant une grande arche.', 'C’est l’un des lieux les plus visités et photographiés de Pantelleria. On l’admire bien depuis la route côtière ; depuis l’embranchement de Tracino, on descend par la via Arco dell’Elefante.', 'Toute proche, Cala Levante est abritée du mistral : quand le vent souffle du nord-ouest, la mer y est souvent calme.'],
      en: ['The Elephant Arch is on the east coast, beyond Cala Levante, near Tracino. It is a headland of grey lava shaped by wind and sea: its outline recalls an elephant dipping its trunk into the water to form a great arch.', 'It is one of the most visited and photographed spots on Pantelleria. It is best seen from the coastal road; from the Tracino turn-off, follow Via Arco dell’Elefante down.', 'Nearby Cala Levante is sheltered from the mistral: when the wind blows from the north-west, the sea here is often calm.'],
      de: ['Der Elefantenbogen liegt an der Ostküste, hinter Cala Levante, nahe Tracino. Es ist ein Vorgebirge aus grauer Lava, von Wind und Meer geformt: Seine Silhouette erinnert an einen Elefanten, der seinen Rüssel ins Wasser taucht und so einen großen Bogen bildet.', 'Er gehört zu den meistbesuchten und meistfotografierten Orten Pantellerias. Gut zu sehen von der Küstenstraße; ab der Abzweigung Tracino geht es die Via Arco dell’Elefante hinunter.', 'Die nahe Cala Levante ist vor dem Mistral geschützt: Weht der Wind aus Nordwest, ist das Meer hier oft ruhig.'],
    },
    facts: {
      it: [['Tipo', 'Arco naturale di lava'], ['Zona', 'Costa est, Tracino'], ['Accesso', 'Via Arco dell’Elefante'], ['Da vedere', 'Cala Levante']],
      fr: [['Type', 'Arche naturelle de lave'], ['Secteur', 'Côte est, Tracino'], ['Accès', 'Via Arco dell’Elefante'], ['À voir', 'Cala Levante']],
      en: [['Type', 'Natural lava arch'], ['Area', 'East coast, Tracino'], ['Access', 'Via Arco dell’Elefante'], ['Nearby', 'Cala Levante']],
      de: [['Typ', 'Natürlicher Lavabogen'], ['Gebiet', 'Ostküste, Tracino'], ['Zugang', 'Via Arco dell’Elefante'], ['In der Nähe', 'Cala Levante']],
    },
  },
  'coste-di-pantelleria': {
    image: IMG.mare, gps: [36.785, 11.992],
    name: { it: 'Le coste di Pantelleria', fr: 'Les côtes de Pantelleria', en: 'The coasts of Pantelleria', de: 'Die Küsten Pantellerias' },
    lead: { it: 'Niente sabbia: scogli neri, cale e acque limpidissime.', fr: 'Pas de sable : des rochers noirs, des criques et une eau limpide.', en: 'No sand: black rocks, coves and crystal-clear water.', de: 'Kein Sand: schwarze Felsen, Buchten und glasklares Wasser.' },
    body: {
      it: ['Pantelleria è un’isola vulcanica a metà strada tra la Sicilia e la Tunisia. Le sue coste sono fatte di lava nera: si scende in mare dagli scogli, in piccole cale amate da nuotatori e sub.', 'Tra i luoghi più noti: Cala Gadir con le sue vasche di acqua termale, Cala Cinque Denti, Balata dei Turchi, Cala Tramontana e Cala Levante, Nikà e il Bue Marino. Il giro dell’isola in barca, vento permettendo, è il modo migliore per scoprirle.', 'Una strada perimetrale fa il giro dell’isola e collega i villaggi, i dammusi e i punti panoramici sul mare.'],
      fr: ['Pantelleria est une île volcanique à mi-chemin entre la Sicile et la Tunisie. Ses côtes sont faites de lave noire : on entre dans l’eau depuis les rochers, dans de petites criques appréciées des nageurs et des plongeurs.', 'Parmi les lieux les plus connus : Cala Gadir et ses bassins d’eau thermale, Cala Cinque Denti, Balata dei Turchi, Cala Tramontana et Cala Levante, Nikà et le Bue Marino. Le tour de l’île en bateau, si le vent le permet, est la meilleure façon de les découvrir.', 'Une route fait le tour de l’île et relie les villages, les dammusi et les belvédères sur la mer.'],
      en: ['Pantelleria is a volcanic island halfway between Sicily and Tunisia. Its coasts are made of black lava: you enter the sea from the rocks, in small coves loved by swimmers and divers.', 'Among the best-known spots: Cala Gadir with its hot-spring pools, Cala Cinque Denti, Balata dei Turchi, Cala Tramontana and Cala Levante, Nikà and Bue Marino. A boat trip round the island, wind permitting, is the best way to discover them.', 'A ring road circles the island, linking villages, dammusi and sea viewpoints.'],
      de: ['Pantelleria ist eine Vulkaninsel auf halbem Weg zwischen Sizilien und Tunesien. Ihre Küsten bestehen aus schwarzer Lava: Man steigt von den Felsen ins Meer, in kleine Buchten, die Schwimmer und Taucher lieben.', 'Zu den bekanntesten Orten gehören Cala Gadir mit ihren Thermalbecken, Cala Cinque Denti, Balata dei Turchi, Cala Tramontana und Cala Levante, Nikà und Bue Marino. Eine Bootsfahrt um die Insel – wenn der Wind es zulässt – ist der beste Weg, sie zu entdecken.', 'Eine Ringstraße umrundet die Insel und verbindet Dörfer, Dammusi und Aussichtspunkte.'],
    },
    facts: {
      it: [['Superficie', 'circa 83 km²'], ['Vetta', 'Montagna Grande'], ['Distanza dalla Tunisia', 'circa 65-70 km'], ['Area protetta', 'Parco Nazionale Isola di Pantelleria']],
      fr: [['Superficie', 'environ 83 km²'], ['Sommet', 'Montagna Grande'], ['Distance de la Tunisie', 'environ 65 à 70 km'], ['Zone protégée', 'Parc national de l’île de Pantelleria']],
      en: [['Area', 'about 83 km²'], ['Highest peak', 'Montagna Grande'], ['Distance from Tunisia', 'about 65-70 km'], ['Protected area', 'Pantelleria Island National Park']],
      de: [['Fläche', 'etwa 83 km²'], ['Höchster Gipfel', 'Montagna Grande'], ['Entfernung nach Tunesien', 'etwa 65–70 km'], ['Schutzgebiet', 'Nationalpark Isola di Pantelleria']],
    },
  },
};

export const PLACE_TXT = {
  gps: { it: 'Posizione GPS approssimativa', fr: 'Position GPS approximative', en: 'Approximate GPS position', de: 'Ungefähre GPS-Position' },
  map: { it: 'Apri sulla mappa', fr: 'Ouvrir sur la carte', en: 'Open on the map', de: 'Auf der Karte öffnen' },
  back: { it: '← Torna alla home', fr: '← Retour à l’accueil', en: '← Back to home', de: '← Zur Startseite' },
  credit: { it: 'Foto: Wikimedia Commons', fr: 'Photo : Wikimedia Commons', en: 'Photo: Wikimedia Commons', de: 'Foto: Wikimedia Commons' },
};
