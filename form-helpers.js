/* form-helpers.js — GAIA Code
   1. Auto-formatage téléphone français (0X XX XX XX XX)
   2. Suggestions e-mail françaises en temps réel
*/
(function(){
  'use strict';

  /* ── 1. FORMATAGE TÉLÉPHONE ── */
  function formatPhone(val){
    var d=val.replace(/\D/g,'').slice(0,10);
    var out='';
    for(var i=0;i<d.length;i++){
      if(i>0&&i%2===0) out+=' ';
      out+=d[i];
    }
    return out;
  }

  function initPhoneInputs(){
    document.querySelectorAll('input[type="tel"]').forEach(function(inp){
      inp.addEventListener('input',function(e){
        var start=inp.selectionStart;
        var oldLen=inp.value.length;
        inp.value=formatPhone(inp.value);
        var diff=inp.value.length-oldLen;
        inp.setSelectionRange(start+diff,start+diff);
      });
      inp.addEventListener('keydown',function(e){
        if(e.key==='Backspace'&&inp.selectionStart===inp.selectionEnd){
          var pos=inp.selectionStart;
          if(pos>0&&inp.value[pos-1]===' '){
            e.preventDefault();
            inp.value=inp.value.slice(0,pos-2)+inp.value.slice(pos);
            inp.setSelectionRange(pos-2,pos-2);
          }
        }
      });
    });
  }

  /* ── 2. SUGGESTIONS E-MAIL ── */
  var FR_DOMAINS=[
    'gmail.com','outlook.fr','orange.fr','yahoo.fr',
    'free.fr','laposte.net','sfr.fr','bouyguestelecom.fr',
    'hotmail.fr','icloud.com','outlook.com','yahoo.com',
    'live.fr','wanadoo.fr','numericable.fr'
  ];

  var style=document.createElement('style');
  style.textContent=[
    '.fh-sugg{position:absolute;z-index:9999;background:#1a1a1e;border:1px solid #444;border-radius:6px;',
    'box-shadow:0 6px 20px rgba(0,0,0,.5);width:100%;max-height:220px;overflow-y:auto;margin-top:2px;}',
    '.fh-sugg-item{padding:10px 14px;font-size:13px;color:#eee;cursor:pointer;transition:background .15s;}',
    '.fh-sugg-item:hover,.fh-sugg-item.fh-active{background:rgba(255,107,0,.18);color:#fff;}',
    '.fh-sugg-item span.fh-bold{color:#FF6B00;font-weight:700;}',
    '.fh-wrap{position:relative;}'
  ].join('');
  document.head.appendChild(style);

  function buildSuggestions(inputEl){
    /* Wrap dans un div relatif si pas déjà fait */
    var parent=inputEl.parentNode;
    if(!parent.classList.contains('fh-wrap')){
      var wrap=document.createElement('div');
      wrap.className='fh-wrap';
      parent.insertBefore(wrap,inputEl);
      wrap.appendChild(inputEl);
      inputEl.style.width='100%';
      parent=wrap;
    }

    var box=document.createElement('div');
    box.className='fh-sugg';
    box.style.display='none';
    parent.appendChild(box);

    var activeIdx=-1;
    var currentItems=[];

    function show(items){
      currentItems=items;
      activeIdx=-1;
      box.innerHTML='';
      if(!items.length){box.style.display='none';return;}
      items.forEach(function(s,i){
        var li=document.createElement('div');
        li.className='fh-sugg-item';
        var atIdx=s.indexOf('@');
        var local=s.slice(0,atIdx+1);
        var domain=s.slice(atIdx+1);
        li.innerHTML='<span class="fh-bold">'+escHtml(local)+'</span>'+escHtml(domain);
        li.addEventListener('mousedown',function(e){
          e.preventDefault();
          inputEl.value=s;
          box.style.display='none';
          inputEl.dispatchEvent(new Event('input',{bubbles:true}));
        });
        box.appendChild(li);
      });
      box.style.display='block';
    }

    function escHtml(s){
      return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function setActive(idx){
      var els=box.querySelectorAll('.fh-sugg-item');
      els.forEach(function(el){el.classList.remove('fh-active');});
      if(idx>=0&&idx<els.length) els[idx].classList.add('fh-active');
    }

    inputEl.addEventListener('input',function(){
      var val=inputEl.value;
      var at=val.indexOf('@');
      if(at<0){box.style.display='none';return;}
      var local=val.slice(0,at+1);
      var typed=val.slice(at+1).toLowerCase();
      var matches=FR_DOMAINS
        .filter(function(d){return d.startsWith(typed);})
        .map(function(d){return local+d;});
      show(matches);
    });

    inputEl.addEventListener('keydown',function(e){
      if(box.style.display==='none') return;
      if(e.key==='ArrowDown'){e.preventDefault();activeIdx=Math.min(activeIdx+1,currentItems.length-1);setActive(activeIdx);}
      else if(e.key==='ArrowUp'){e.preventDefault();activeIdx=Math.max(activeIdx-1,0);setActive(activeIdx);}
      else if(e.key==='Enter'||e.key==='Tab'){
        if(activeIdx>=0&&currentItems[activeIdx]){
          if(e.key==='Enter') e.preventDefault();
          inputEl.value=currentItems[activeIdx];
          box.style.display='none';
        }
      } else if(e.key==='Escape'){box.style.display='none';}
    });

    inputEl.addEventListener('blur',function(){
      setTimeout(function(){box.style.display='none';},150);
    });
  }

  function initEmailInputs(){
    document.querySelectorAll('input[type="email"]').forEach(function(inp){
      inp.setAttribute('autocomplete','off');
      buildSuggestions(inp);
    });
  }

  /* ── INIT ── */
  function init(){
    initPhoneInputs();
    initEmailInputs();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else {
    init();
  }
})();
