/* Renderer: populate index.html from window.RESUME_DATA */
(function(){
  function safeText(node, text){ if(!node) return; node.textContent = text || ''; }

  function fillHeader(){
    if(!window.RESUME_DATA) return;
    safeText(document.querySelector('.name'), window.RESUME_DATA.header && window.RESUME_DATA.header.name);
    var emailEl = document.querySelector('.contact-item a');
    if(emailEl){ if(window.RESUME_DATA.header && window.RESUME_DATA.header.email){ emailEl.textContent = window.RESUME_DATA.header.email; emailEl.href = 'mailto:'+window.RESUME_DATA.header.email; } else { emailEl.textContent=''; emailEl.removeAttribute('href'); } }
    // section title for professional summary (first .section)
    var psTitle = document.querySelector('section.section:nth-of-type(1) .section-title'); if(psTitle) safeText(psTitle, (window.RESUME_DATA.titles && window.RESUME_DATA.titles.professionalSummary) || 'Professional Summary');
    safeText(document.querySelector('.summary-text'), window.RESUME_DATA.professionalSummary);
  }

  function fillTechSummary(){
    var techSectionTitle = document.querySelector('section.section:nth-of-type(2) .section-title'); if(techSectionTitle) safeText(techSectionTitle, (window.RESUME_DATA.titles && window.RESUME_DATA.titles.technologySummary) || 'Technology Summary');
    var grid = document.querySelector('.tech-grid'); if(!grid) return; grid.innerHTML='';
    (window.RESUME_DATA.technologySummary||[]).forEach(function(cat){
      var div = document.createElement('div'); div.className='tech-category';
      var h = document.createElement('h3'); h.textContent = cat.title || ''; div.appendChild(h);
      var tags = document.createElement('div'); tags.className='tech-tags';
      (cat.tags||[]).forEach(function(t){
        var name = (typeof t === 'string') ? t : (t.name || '');
        var role = (typeof t === 'string') ? null : (t.role || null);
        var s = document.createElement('span'); s.className='tech-tag'; s.textContent = role ? (name + ' ('+role+')') : name;
        tags.appendChild(s);
      });
      div.appendChild(tags);
      grid.appendChild(div);
    });
  }

  function fillCareer(){
    var careerTitle = document.querySelector('section.section:nth-of-type(3) .section-title'); if(careerTitle) safeText(careerTitle, (window.RESUME_DATA.titles && window.RESUME_DATA.titles.careerHistory) || 'Career History');
    var careerContainer = document.querySelector('section.section:nth-of-type(3) .section-content'); if(!careerContainer) return; careerContainer.innerHTML='';
    (window.RESUME_DATA.career||[]).forEach(function(job){
      var jobDiv = document.createElement('div'); jobDiv.className='job';
      var header = document.createElement('div'); header.className='job-header';
      var tc = document.createElement('div'); tc.className='job-title-company';
      var t = document.createElement('h3'); t.className='job-title'; t.textContent = job.title || ''; tc.appendChild(t);
      var c = document.createElement('h4'); c.className='company'; c.textContent = job.company || ''; tc.appendChild(c);
      header.appendChild(tc);
      var d = document.createElement('div'); d.className='job-date'; d.textContent = job.date || ''; header.appendChild(d);
      jobDiv.appendChild(header);

      var content = document.createElement('div'); content.className='job-content';
      var desc = document.createElement('p'); desc.className='job-description'; desc.textContent = job.description || ''; content.appendChild(desc);

      if(job.tech_stack && job.tech_stack.length){
        var ts = document.createElement('div'); ts.className='tech-stack';
        var h5 = document.createElement('h5'); h5.textContent = (window.RESUME_DATA.labels && window.RESUME_DATA.labels.techStack) || 'Tech Stack:'; ts.appendChild(h5);
        var ul = document.createElement('ul'); ul.className='tech-details'; job.tech_stack.forEach(function(x){ var li=document.createElement('li'); li.textContent=x; ul.appendChild(li); }); ts.appendChild(ul);
        content.appendChild(ts);
      }

      if(job.achievements && job.achievements.length){ var ul=document.createElement('ul'); ul.className='achievements'; job.achievements.forEach(function(a){ var li=document.createElement('li'); li.textContent=a; ul.appendChild(li); }); content.appendChild(ul); }

      jobDiv.appendChild(content);
      careerContainer.appendChild(jobDiv);
    });
  }

  function fillPersonal(){
    var per = document.querySelector('section.personal-interests .section-title'); if(per) safeText(per, (window.RESUME_DATA.titles && window.RESUME_DATA.titles.personalInterests) || 'Personal Interests');
    var grid = document.querySelector('section.personal-interests .tech-grid'); if(!grid) return; grid.innerHTML='';
    var cat = document.createElement('div'); cat.className='tech-category'; var h = document.createElement('h3'); h.className='company'; h.textContent='Hobbies'; cat.appendChild(h);
    var tags = document.createElement('div'); tags.className='tech-tags'; (window.RESUME_DATA.personalInterests||[]).forEach(function(t){ var s=document.createElement('span'); s.className='tech-tag'; s.textContent=t; tags.appendChild(s); }); cat.appendChild(tags); grid.appendChild(cat);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ fillHeader(); fillTechSummary(); fillCareer(); fillPersonal(); }); else { fillHeader(); fillTechSummary(); fillCareer(); fillPersonal(); }

})();
(function(){
  // Populate existing index.html containers from RESUME_DATA
  function fillHeader(){
    if(!window.RESUME_DATA) return;
    var name = document.querySelector('.name'); if(name) name.textContent = window.RESUME_DATA.header.name;
    var email = document.querySelector('.contact-item a'); if(email) email.textContent = window.RESUME_DATA.header.email; if(email) email.href = 'mailto:'+window.RESUME_DATA.header.email;
    var summary = document.querySelector('.section .summary-text'); if(summary) summary.textContent = window.RESUME_DATA.professionalSummary;
  }

  function fillTechSummary(){
    var grid = document.querySelector('.section .tech-grid'); if(!grid) return;
    grid.innerHTML = '';
    (window.RESUME_DATA.technologySummary||[]).forEach(function(cat){
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
