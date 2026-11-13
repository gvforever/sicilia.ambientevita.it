const COAST = '70,112 93,91 108,112 156,99 174,101 222,109 295,94 344,81 385,80 375,90 349,133 329,178 342,212 349,232 333,280 305,276 263,254 245,232 213,227 178,206 128,178 79,159 63,140';
const CITIES: [string, number, number][] = [
  ['Palermo', 156, 104], ['Trapani', 74, 116], ['Agrigento', 178, 200], ['Caltanissetta', 222, 178], ['Enna', 252, 165],
  ['Catania', 320, 176], ['Messina', 366, 96], ['Ragusa', 292, 248], ['Siracusa', 340, 230],
];
const ISLANDS: [string, number, number, number][] = [
  ['Favignana', 53, 123, 3.5], ['Levanzo', 55, 113, 2], ['Marettimo', 27, 118, 2.5], ['Ustica', 138, 25, 3],
  ['Alicudi', 255, 46, 2], ['Filicudi', 276, 42, 2.4], ['Salina', 305, 43, 3.2], ['Lipari', 315, 55, 3.8],
  ['Vulcano', 316, 66, 3], ['Panarea', 327, 33, 1.6], ['Stromboli', 341, 15, 3], ['Linosa', 106, 386, 2.4],
  ['Lampedusa', 80, 431, 4.5], ['Lampione', 52, 425, 1.2],
];

export default function SicilyMap({ title }: { title: string }) {
  return (
    <svg className="map" viewBox="0 0 400 450" role="img" aria-label={title}>
      <polygon className="land" points={COAST} />
      {ISLANDS.map(([n, x, y, r]) => (
        <g key={n}><circle className="isl" cx={x} cy={y} r={r} /><text x={x + r + 3} y={y + 2.5}>{n}</text></g>
      ))}
      <g className="pant">
        <ellipse className="isl" cx="15" cy="269" rx="6" ry="4.5" />
        <circle className="pulse" cx="15" cy="269" r="6" />
        <text x="8" y="285" style={{ fontWeight: 700 }}>Pantelleria</text>
      </g>
      {CITIES.map(([n, x, y]) => (
        <g key={n} className="city"><circle cx={x} cy={y} r="2.6" /><text x={x + 4} y={y + 2.5}>{n}</text></g>
      ))}
      <text className="group" x="270" y="8">Isole Eolie</text>
      <text className="group" x="10" y="104">Isole Egadi</text>
      <text className="group" x="60" y="405">Isole Pelagie</text>
    </svg>
  );
}
