const W = (file: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=2000`;
export const IMG = {
  venere: W('Lago_di_venere._Pantelleria.jpg'),
  elefante: W('Pantelleria_Arco_dell%27Elefante.jpg'),
  venere2: W('Lago_di_Venere_-_Pantelleria,_Trapani,_Italia_-_12_Agosto_2016.jpg'),
  mare: W('Aria_di_mare.jpg'),
  elefante2: W('Arco_dell%27Elefante.jpg'),
};
export const HERO = [IMG.venere, IMG.elefante, IMG.venere2, IMG.mare];
