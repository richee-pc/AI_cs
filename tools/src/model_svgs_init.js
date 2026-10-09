(function(){ if(!window.MODEL_SVG) return;
  var st = document.createElement('style'); st.textContent = window.MODEL_SVG_CSS; document.head.appendChild(st);
  var d = document.createElement('div'); d.innerHTML = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><marker id="mvArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--muted)"/></marker></defs></svg>';
  document.body.appendChild(d.firstChild); })();
