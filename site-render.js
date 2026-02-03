/*
  site-render.js
  Clean renderer: build the resume DOM entirely from window.RESUME_DATA.
*/
/*
  site-render.js
  Clean renderer: build the resume DOM entirely from window.RESUME_DATA.
*/
(function () {
  'use strict';

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }

  function setTitle() {
    if (window.RESUME_DATA && window.RESUME_DATA.header && window.RESUME_DATA.header.name) {
      var title = window.RESUME_DATA.header.name;
      if (window.RESUME_DATA.header.title) title += ' - ' + window.RESUME_DATA.header.title;
      document.title = title;
    }
  }

  function renderHeader(data) {
    var header = el('header', 'header');
    var hc = el('div', 'header-content');
    var left = el('div', 'header-left');
    left.appendChild(el('h1', 'name', (data.header && data.header.name) || ''));
    if (data.header && data.header.email) {
      var contact = el('div', 'contact-info');
      var item = el('div', 'contact-item');
      var icon = document.createElement('i');
      icon.className = 'fas fa-envelope';
      var a = el('a', '', data.header.email);
      a.href = 'mailto:' + data.header.email;
      item.appendChild(icon);
      item.appendChild(a);
      contact.appendChild(item);
      left.appendChild(contact);
    }
    hc.appendChild(left);
    var right = el('div', 'header-right');
    right.id = 'print-header-tech';
    hc.appendChild(right);
    header.appendChild(hc);
    return header;
  }

  function renderSection(title) {
    var s = el('section', 'section');
    s.appendChild(el('h2', 'section-title', title || ''));
    s.appendChild(el('div', 'section-content'));
    return { section: s, content: s.querySelector('.section-content') };
  }

  function renderProfessionalSummary(data) {
    var ps = data.professionalSummary || {};
    var block = renderSection(ps.titleText || 'Professional Summary');
    block.content.appendChild(el('p', 'summary-text', typeof ps === 'string' ? ps : ps.text || ''));
    return block.section;
  }

  function renderTechSummary(data) {
    var ts = data.technologySummary || {};
    var block = renderSection(ts.titleText || 'Technology Summary');
    var grid = el('div', 'tech-grid');
    var categories = Array.isArray(ts) ? ts : ts.categories || [];
    categories.forEach(function (cat) {
      var c = el('div', 'tech-category');
      c.appendChild(el('h3', '', cat.title || cat.name || ''));
      var tags = el('div', 'tech-tags');
      (cat.tags || []).forEach(function (t) {
        var tagText = typeof t === 'string' ? t : (t && t.name) || '';
        tags.appendChild(el('span', 'tech-tag', tagText));
      });
      c.appendChild(tags);
      grid.appendChild(c);
    });
    block.content.appendChild(grid);
    return block.section;
  }

  function renderCareer(data) {
    var career = data.career || {};
    var block = renderSection(career.titleText || 'Career History');
    var container = el('div', 'section-content');
    (career.items || []).forEach(function (item) {
      var job = el('div', 'job');
      var header = el('div', 'job-header');
      var jc = el('div', 'job-title-company');
      jc.appendChild(el('h3', 'job-title', item.title || ''));
      jc.appendChild(el('h4', 'company', item.company || ''));
      header.appendChild(jc);
      header.appendChild(el('div', 'job-date', item.date || ''));
      job.appendChild(header);
      var content = el('div', 'job-content');
      content.appendChild(el('p', 'job-description', item.description || ''));

      if (item.tech_stack && item.tech_stack.length) {
        var tswrap = el('div', 'tech-stack');
        tswrap.appendChild(el('h5', '', 'Tech Stack:'));
        var ul = el('ul', 'tech-details');
        item.tech_stack.forEach(function (t) { ul.appendChild(el('li', '', t)); });
        tswrap.appendChild(ul);
        content.appendChild(tswrap);
      }

      var ach = el('ul', 'achievements');
      (item.achievements || []).forEach(function (a) {
        var li = el('li');
        if (typeof a === 'string') li.textContent = a;
        else if (a && typeof a === 'object') {
          if (a.label) li.appendChild(el('strong', '', a.label + ':  '));
          li.appendChild(document.createTextNode(a.text || ''));
        }
        ach.appendChild(li);
      });
      content.appendChild(ach);
      if (item.exitExplanation) content.appendChild(el('p', 'exit-explanation', item.exitExplanation));
      job.appendChild(content);
      container.appendChild(job);
    });
    // replace default content with generated container
    block.section.removeChild(block.section.querySelector('.section-content'));
    block.section.appendChild(container);
    return block.section;
  }

  function renderPersonalInterests(data) {
    var pi = data.personalInterests || {};
    var block = renderSection(pi.titleText || 'Personal Interests');
    var content = el('div', 'section-content');
    if (pi.intro) content.appendChild(el('p', 'job-description', pi.intro));
    var grid = el('div', 'tech-grid');
    var cat = el('div', 'tech-category');
    cat.appendChild(el('h3', 'company', 'Hobbies'));
    var tags = el('div', 'tech-tags');
    (pi.items || []).forEach(function (i) { tags.appendChild(el('span', 'tech-tag', i)); });
    cat.appendChild(tags);
    grid.appendChild(cat);
    content.appendChild(grid);
    block.section.appendChild(content);
    return block.section;
  }

  function renderRoot(data) {
    var root = document.getElementById('resume-root');
    if (!root) root = document.body;
    root.innerHTML = '';
    var container = el('div', 'container');
    container.appendChild(renderHeader(data));
    container.appendChild(renderProfessionalSummary(data));
    container.appendChild(renderTechSummary(data));
    container.appendChild(renderCareer(data));
    container.appendChild(renderPersonalInterests(data));
    root.appendChild(container);
  }

  function bootstrap() {
    if (!window.RESUME_DATA) return;
    setTitle();
    renderRoot(window.RESUME_DATA);
    // expose helpers for print renderer
    window.getResumeData = function () { return window.RESUME_DATA; };
    window.renderPrintInto = function (container/*, data */) {
      container.innerHTML = '';
      var clone = document.getElementById('resume-root') ? document.getElementById('resume-root').cloneNode(true) : document.body.cloneNode(true);
      var btns = clone.querySelectorAll('.print-btn');
      btns.forEach(function (b) { if (b.parentNode) b.parentNode.removeChild(b); });
      container.appendChild(clone);
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootstrap); else bootstrap();

}());
