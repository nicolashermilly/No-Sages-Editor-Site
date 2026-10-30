(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var sibs=e.target.parentElement.querySelectorAll(':scope > .reveal');var i=[].indexOf.call(sibs,e.target);e.target.style.transitionDelay=(reduce?0:Math.max(0,i)*70)+'ms';e.target.classList.add('vis');io.unobserve(e.target);}});},{threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  function fmt(el,v){var sep=el.getAttribute('data-sep');var suf=el.getAttribute('data-suffix')||'';return (sep?v.toLocaleString('fr-FR'):v)+suf;}
  function run(el){var t=parseFloat(el.getAttribute('data-count'))||0;if(reduce){el.textContent=fmt(el,t);return;}var s=null,d=1300;function st(ts){if(!s)s=ts;var p=Math.min((ts-s)/d,1),e=1-Math.pow(1-p,3);el.textContent=fmt(el,Math.round(t*e));if(p<1)requestAnimationFrame(st);}requestAnimationFrame(st);}
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);cio.unobserve(e.target);}});},{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});
  var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
  if(reduce)return;
  document.querySelectorAll('.live').forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');});});
})();