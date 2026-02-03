(function(){
  // Populate existing index.html containers from RESUME_DATA
  function fillHeader(){
    if(!window.RESUME_DATA) return;
    var name = document.querySelector('.name'); if(name) name.textContent = window.RESUME_DATA.header.name;
    var email = document.querySelector('.contact-item a'); if(email) email.textContent = window.RESUME_DATA.header.email; if(email) email.href = 'mailto:'+window.RESUME_DATA.header.email;
    var summary = document.querySelector('.section .summary-text');
    if(summary){
      // Support both legacy string and new object shape
      var ps = window.RESUME_DATA.professionalSummary;
      if(typeof ps === 'string') summary.textContent = ps;
      else if(ps && ps.text) summary.textContent = ps.text;
      else summary.textContent = '';
    }
  }

  function fillTechSummary(){
    var grid = document.querySelector('.section .tech-grid'); if(!grid) return;
    grid.innerHTML = '';
    // Support new object shape with titleText + categories, or legacy array.
    var tech = window.RESUME_DATA.technologySummary || [];
    var categories = [];
    if(Array.isArray(tech)) categories = tech; // legacy
    else if(tech && Array.isArray(tech.categories)) categories = tech.categories; // new

    categories.forEach(function(cat){
      var div = document.createElement('div'); div.className='tech-category';
      var h = document.createElement('h3'); h.textContent = cat.title; div.appendChild(h);
      var tags = document.createElement('div'); tags.className='tech-tags';
      (cat.tags||[]).forEach(function(t){ var s=document.createElement('span'); s.className='tech-tag'; s.textContent=t; tags.appendChild(s); });
      div.appendChild(tags);
      grid.appendChild(div);
    });
  }

  function fillCareer(){
    var careerSection = document.querySelector('.section .section-content');
    // We won't rebuild entire page to avoid breaking layout; only ensure existing career sections are present.
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ fillHeader(); fillTechSummary(); }); else { fillHeader(); fillTechSummary(); }
})();
