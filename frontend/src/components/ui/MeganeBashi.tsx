export default function MeganeBashi() {
  return (
    <svg width="100%" viewBox="0 0 680 200" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>眼鏡橋アニメーション</title>
      <desc>長崎の眼鏡橋をモチーフにした時計回り無限ループアニメーション</desc>
      <defs>
        <style>{`
          .arch1 { fill: none; stroke: #2D7D6F; stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 400; stroke-dashoffset: 400; animation: drawStroke 7s ease infinite; }
          .arch2 { fill: none; stroke: #2D7D6F; stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 400; stroke-dashoffset: 400; animation: drawStroke 7s 0.3s ease infinite; }
          .refl2 { fill: none; stroke: #D4537E; stroke-width: 1.5; stroke-linecap: round; stroke-dasharray: 400; stroke-dashoffset: 400; opacity: 0; animation: drawRefl 7s 0.6s ease infinite; }
          .refl1 { fill: none; stroke: #D4537E; stroke-width: 1.5; stroke-linecap: round; stroke-dasharray: 400; stroke-dashoffset: 400; opacity: 0; animation: drawRefl 7s 0.9s ease infinite; }
          .base { opacity: 0; animation: fadeInOut 7s ease infinite; }
          .dot-anchor { opacity: 0; animation: dotPulse 7s ease infinite; }
          .dot-anchor-mid { opacity: 0; animation: dotPulse 7s 0.3s ease infinite; }
          .dot-anchor-right { opacity: 0; animation: dotPulse 7s 0.6s ease infinite; }
          @keyframes drawStroke {
            0%   { stroke-dashoffset: 400; opacity: 1; }
            20%  { stroke-dashoffset: 0;   opacity: 1; }
            70%  { stroke-dashoffset: 0;   opacity: 1; }
            85%  { stroke-dashoffset: 0;   opacity: 0; }
            100% { stroke-dashoffset: 400; opacity: 0; }
          }
          @keyframes drawRefl {
            0%   { stroke-dashoffset: 400; opacity: 0; }
            20%  { stroke-dashoffset: 0;   opacity: 0.45; }
            70%  { stroke-dashoffset: 0;   opacity: 0.45; }
            85%  { stroke-dashoffset: 0;   opacity: 0; }
            100% { stroke-dashoffset: 400; opacity: 0; }
          }
          @keyframes fadeInOut {
            0%   { opacity: 0; }
            5%   { opacity: 0.35; }
            70%  { opacity: 0.35; }
            85%  { opacity: 0; }
            100% { opacity: 0; }
          }
          @keyframes dotPulse {
            0%   { opacity: 0; }
            10%  { opacity: 1; }
            70%  { opacity: 1; }
            85%  { opacity: 0; }
            100% { opacity: 0; }
          }
        `}</style>
      </defs>

      <line className="base" x1="180" y1="100" x2="500" y2="100" stroke="#2D7D6F" strokeWidth="1"/>
      <line className="base" x1="180" y1="108" x2="500" y2="108" stroke="#2D7D6F" strokeWidth="0.6"/>

      <path className="arch1" d="M220 100 Q280 28 340 100"/>
      <path className="arch2" d="M340 100 Q400 28 460 100"/>

      <path className="refl2" d="M460 108 Q400 180 340 108"/>
      <path className="refl1" d="M340 108 Q280 180 220 108"/>

      <circle className="dot-anchor"       cx="220" cy="100" r="4" fill="#2D7D6F"/>
      <circle className="dot-anchor-mid"   cx="340" cy="100" r="4" fill="#D4537E"/>
      <circle className="dot-anchor-right" cx="460" cy="100" r="4" fill="#2D7D6F"/>
    </svg>
  );
}