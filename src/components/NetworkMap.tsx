const points = [
  [130, 170],
  [310, 95],
  [470, 200],
  [650, 100],
  [820, 225],
  [1020, 140],
  [1190, 300],
  [1040, 450],
  [820, 530],
  [620, 390],
  [430, 560],
  [240, 420],
  [100, 600],
  [590, 690],
  [1050, 680],
];
const edges = [
  [0, 1],
  [0, 11],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 9],
  [2, 11],
  [3, 4],
  [3, 5],
  [4, 5],
  [4, 7],
  [4, 9],
  [5, 6],
  [6, 7],
  [7, 8],
  [7, 14],
  [8, 9],
  [8, 13],
  [9, 10],
  [9, 11],
  [10, 11],
  [10, 12],
  [10, 13],
  [11, 12],
  [13, 14],
  [8, 14],
];
export function NetworkMap({
  stage = 'connected',
  labels = false,
}: {
  stage?: 'minimal' | 'growing' | 'connected' | 'intelligence' | 'complete';
  labels?: boolean;
}) {
  const count = stage === 'minimal' ? 4 : stage === 'growing' ? 9 : points.length;
  return (
    <div className={`network-map network-${stage}`} aria-hidden="true">
      <svg viewBox="0 0 1300 780" fill="none">
        <g className="map-streets">
          {Array.from({ length: 22 }, (_, i) => (
            <path
              key={i}
              d={`M ${i * 68 - 180} 0 L ${i * 48 + 140} 270 L ${i * 65 - 40} 780 M 0 ${i * 43} L 450 ${i * 42 - 120} L 1300 ${i * 33 + 30}`}
            />
          ))}
        </g>
        <path className="map-river" d="M 900 -20 C 510 160 1080 210 680 400 S 700 620 260 820" />
        <g className="network-lines">
          {edges
            .filter(([a, b]) => a < count && b < count)
            .map(([a, b], i) => (
              <path
                key={i}
                pathLength="1"
                d={`M ${points[a].join(' ')} L ${points[b].join(' ')}`}
              />
            ))}
        </g>
        {points.slice(0, count).map(([x, y], i) => (
          <g className="network-point" key={i}>
            <circle cx={x} cy={y} r={stage === 'minimal' ? 18 : 35} className="point-halo" />
            <circle cx={x} cy={y} r="6" className="point-core" />
            <circle cx={x} cy={y} r="12" className="point-ring" />
          </g>
        ))}
        {labels && (
          <g className="map-labels">
            {[
              ['Campinas', 310, 95],
              ['São Paulo', 620, 390],
              ['Santos', 1040, 450],
            ].map(([name, x, y]) => (
              <g key={name} transform={`translate(${Number(x) + 18} ${Number(y) - 36})`}>
                <rect width="124" height="38" rx="6" />
                <text x="14" y="25">
                  {name}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
