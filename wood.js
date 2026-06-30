/* Le Smart'elier — wood texture SVG inline */
(function(){
  var svg=`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>
    <defs>
      <filter id='noise'>
        <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0.3'/>
        <feBlend in='SourceGraphic' mode='multiply'/>
      </filter>
      <linearGradient id='g1' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#5C3310'/>
        <stop offset='20%' stop-color='#7A4520'/>
        <stop offset='40%' stop-color='#6B3A18'/>
        <stop offset='60%' stop-color='#8B5228'/>
        <stop offset='80%' stop-color='#7A4520'/>
        <stop offset='100%' stop-color='#5C3310'/>
      </linearGradient>
    </defs>
    <rect width='800' height='400' fill='url(#g1)'/>
    <!-- grain lines -->
    <g stroke='rgba(30,10,0,0.18)' stroke-width='1' fill='none'>
      <path d='M0,35 Q200,30 400,38 Q600,46 800,35'/>
      <path d='M0,72 Q200,68 400,75 Q600,82 800,72'/>
      <path d='M0,108 Q200,104 400,111 Q600,118 800,108'/>
      <path d='M0,145 Q200,140 400,148 Q600,155 800,145'/>
      <path d='M0,182 Q200,177 400,185 Q600,192 800,182'/>
      <path d='M0,218 Q200,213 400,221 Q600,228 800,218'/>
      <path d='M0,255 Q200,250 400,258 Q600,265 800,255'/>
      <path d='M0,292 Q200,287 400,295 Q600,302 800,292'/>
      <path d='M0,328 Q200,323 400,331 Q600,338 800,328'/>
      <path d='M0,365 Q200,360 400,368 Q600,375 800,365'/>
    </g>
    <!-- lighter grain highlights -->
    <g stroke='rgba(200,140,80,0.12)' stroke-width='0.7' fill='none'>
      <path d='M0,18 Q200,14 400,20 Q600,26 800,18'/>
      <path d='M0,55 Q200,51 400,57 Q600,63 800,55'/>
      <path d='M0,90 Q200,86 400,92 Q600,98 800,90'/>
      <path d='M0,127 Q200,123 400,129 Q600,135 800,127'/>
      <path d='M0,163 Q200,159 400,165 Q600,171 800,163'/>
      <path d='M0,200 Q200,196 400,202 Q600,208 800,200'/>
      <path d='M0,237 Q200,233 400,239 Q600,245 800,237'/>
      <path d='M0,273 Q200,269 400,275 Q600,281 800,273'/>
      <path d='M0,310 Q200,306 400,312 Q600,318 800,310'/>
      <path d='M0,346 Q200,342 400,348 Q600,354 800,346'/>
      <path d='M0,382 Q200,378 400,384 Q600,390 800,382'/>
    </g>
    <!-- knot -->
    <ellipse cx='320' cy='210' rx='28' ry='18' stroke='rgba(20,8,2,0.3)' stroke-width='2' fill='rgba(60,25,8,0.25)'/>
    <ellipse cx='320' cy='210' rx='16' ry='10' stroke='rgba(20,8,2,0.2)' stroke-width='1.5' fill='rgba(40,15,5,0.2)'/>
    <ellipse cx='322' cy='212' rx='7' ry='5' fill='rgba(20,8,2,0.18)'/>
    <!-- noise overlay rect -->
    <rect width='800' height='400' filter='url(#noise)' opacity='0.18'/>
    <!-- subtle vignette -->
    <radialGradient id='vig' cx='50%' cy='50%' r='70%'>
      <stop offset='0%' stop-color='transparent'/>
      <stop offset='100%' stop-color='rgba(15,5,0,0.35)'/>
    </radialGradient>
    <rect width='800' height='400' fill='url(#vig)'/>
  </svg>`;
  var uri='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  document.documentElement.style.setProperty('--wood-texture','url('+uri+')');
  /* also expose as global for backward compat */
  window.WOOD_URI=uri;
})();
