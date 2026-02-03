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
    var careerSection = document.querySelectorAll('.section');
    // Find the Career section title in the page and update it if data provides a titleText
    var careerData = window.RESUME_DATA && window.RESUME_DATA.career;
    var titleText = null;
    if(Array.isArray(careerData)) titleText = null; // legacy array has no titleText
    else if(careerData && careerData.titleText) titleText = careerData.titleText;
    if(titleText){
      // find the section whose h2 text currently contains 'Career' (best-effort) and update it
      var sections = document.querySelectorAll('section');
      sections.forEach(function(sec){
        var h2 = sec.querySelector('.section-title');
        if(h2 && /career/i.test(h2.textContent)) h2.textContent = titleText;
      });
    }
  }

  function fillPersonalInterests(){
    var data = window.RESUME_DATA || {};
    var personal = data.personalInterests;
    var container = document.querySelector('.personal-interests .section-content');
    if(!container) return;
    var titleEl = document.querySelector('.personal-interests .section-title');
    if(personal){
      if(typeof personal === 'object' && Array.isArray(personal.items)){
        if(titleEl && personal.titleText) titleEl.textContent = personal.titleText;
        if(personal.intro){ var p = container.querySelector('.job-description'); if(p) p.textContent = personal.intro; }
        var wrap = container.querySelector('.tech-grid .tech-category .tech-tags');
        if(!wrap){ // fallback: find any tech-tags container
          wrap = container.querySelector('.tech-grid .tech-tags');
        }
        if(wrap){ wrap.innerHTML = ''; personal.items.forEach(function(t){ var s=document.createElement('span'); s.className='tech-tag'; s.textContent=t; wrap.appendChild(s); }); }
      }
    }
  }

  function renderAchievements(container, achievements){
    if(!container) return;
    container.innerHTML = '';
    (achievements||[]).forEach(function(a){
      var li = document.createElement('li');
      if(typeof a === 'string'){
        li.textContent = a;
      } else if(a && typeof a === 'object'){
        if(a.label){ var strong = document.createElement('strong'); strong.textContent = a.label + ':  '; li.appendChild(strong); }
        var txt = document.createTextNode(a.text || ''); li.appendChild(txt);
      }
      container.appendChild(li);
    });
  }

  function injectAchievements(){
    var career = window.RESUME_DATA && window.RESUME_DATA.career && window.RESUME_DATA.career.items ? window.RESUME_DATA.career.items : (Array.isArray(window.RESUME_DATA.career) ? window.RESUME_DATA.career : []);
    var jobEls = document.querySelectorAll('.job');
    jobEls.forEach(function(el, idx){
      var achUl = el.querySelector('.achievements');
      var dataAch = (career[idx] && career[idx].achievements) || [];
      renderAchievements(achUl, dataAch);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ fillHeader(); fillTechSummary(); fillCareer(); fillPersonalInterests(); injectAchievements(); }); else { fillHeader(); fillTechSummary(); fillCareer(); fillPersonalInterests(); injectAchievements(); }
})();
