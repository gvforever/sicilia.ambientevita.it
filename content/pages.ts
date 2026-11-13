import { Lang } from '@/lib/i18n';
import { IMG } from '@/lib/images';
import { ASSOCIAZIONE_IT, ASINO_IT } from './testi-1';
import { CONVEGNO_IT } from './testi-2';
import { ARCHEOLOGIA_IT } from './testi-3';

// body : texte complet par langue ; une langue absente affiche l'italien (traductions à ajouter ensuite)
type Page = { title: Record<Lang, string>; intro: Record<Lang, string>; author: string; image: string; body: Partial<Record<Lang, string>> & { it: string } };

export const PAGES: Record<string, Page> = {
  associazione: {
    title: { it: 'Onde di lava dall’uomo coltivate', fr: 'Des vagues de lave cultivées par l’homme', en: 'Waves of lava cultivated by man', de: 'Vom Menschen bebaute Lavawellen' },
    intro: {
      it: 'Esempio atavico e pantesco di sviluppo eco-sostenibile.',
      fr: 'Un exemple ancestral et pantesque de développement durable.',
      en: 'An ancient Pantelleria example of sustainable development.',
      de: 'Ein uraltes Beispiel nachhaltiger Entwicklung aus Pantelleria.',
    },
    author: 'Giuseppe Gaetano Sechi — Segretario Provincia Trapani di Ambiente e/è Vita',
    image: IMG.mare,
    body: { it: ASSOCIAZIONE_IT },
  },
  asino: {
    title: { it: "L'asino di Pantelleria", fr: "L'âne de Pantelleria", en: 'The Pantelleria donkey', de: 'Der Esel von Pantelleria' },
    intro: {
      it: 'Velocità, passo sicuro e andatura ad ambio: storia e ricostituzione di una razza unica.',
      fr: 'Vitesse, pied sûr et amble naturel : histoire et reconstitution d’une race unique.',
      en: 'Speed, sure footing and a natural amble: the story and revival of a unique breed.',
      de: 'Schnelligkeit, Trittsicherheit und Passgang: Geschichte und Wiederaufbau einer einzigartigen Rasse.',
    },
    author: 'Tucci — G. Sechi',
    image: IMG.venere,
    body: { it: ASINO_IT },
  },
  convegno: {
    title: { it: 'Pantelleria e il Mediterraneo — 16 luglio 2000', fr: 'Pantelleria et la Méditerranée — 16 juillet 2000', en: 'Pantelleria and the Mediterranean — 16 July 2000', de: 'Pantelleria und das Mittelmeer — 16. Juli 2000' },
    intro: {
      it: 'Gli interventi di Joseph Brincat, Henri Bresc e Anthony Galt al convegno nel cortile del castello.',
      fr: 'Les interventions de Joseph Brincat, Henri Bresc et Anthony Galt dans la cour du château.',
      en: 'Talks by Joseph Brincat, Henri Bresc and Anthony Galt in the castle courtyard.',
      de: 'Vorträge von Joseph Brincat, Henri Bresc und Anthony Galt im Burghof.',
    },
    author: 'J. Brincat — H. Bresc — A. Galt',
    image: IMG.elefante,
    body: { it: CONVEGNO_IT },
  },
  archeologia: {
    title: { it: 'Le armi medievali della grotta del Gelfisèr', fr: 'Les armes médiévales de la grotte du Gelfisèr', en: 'The medieval weapons of the Gelfisèr cave', de: 'Die mittelalterlichen Waffen der Gelfisèr-Höhle' },
    intro: {
      it: 'Una spada della fine del XIII secolo e una cuspide di giavellotto ritrovate in una grotta del Gelfisèr.',
      fr: 'Une épée de la fin du XIIIe siècle et une pointe de javelot trouvées dans une grotte du Gelfisèr.',
      en: 'A late-13th-century sword and a javelin head found in a cave on the Gelfisèr.',
      de: 'Ein Schwert aus dem späten 13. Jahrhundert und eine Speerspitze aus einer Höhle am Gelfisèr.',
    },
    author: 'Mario Scalini — Andrea Vanni Desideri',
    image: IMG.elefante2,
    body: { it: ARCHEOLOGIA_IT },
  },
};
