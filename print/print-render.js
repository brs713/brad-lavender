// Print renderer: builds a two-column print layout with main content (left) and tech sidebar (right)
(function(){
    function el(tag, cls){ var e = document.createElement(tag); if(cls) e.className = cls; return e; }

    function buildHeader(data){
        // top header row: name (left) and contact (right)
        var h = el('header','pr-header');
        var left = el('div','pr-header-left');
        var name = el('h1','pr-name'); name.textContent = (data && data.header && data.header.name) || '';
        left.appendChild(name);
        var right = el('div','pr-header-right');
        var contact = el('div','pr-contact'); contact.textContent = (data && data.header && data.header.email) || '';
        right.appendChild(contact);
        h.appendChild(left);
        h.appendChild(right);
        return h;
    }

    function buildSummary(data){
        var summary = el('p','pr-summary');
        // professionalSummary may be a string (legacy) or an object with text + titleText
        var ps = (data && data.professionalSummary);
        if(typeof ps === 'string') summary.textContent = ps;
        else if(ps && ps.text) summary.textContent = ps.text;
        else summary.textContent = '';
        return summary;
    }

    function buildCareerSection(career){
        var sec = el('section','pr-career');
        career.forEach(function(job){
            var j = el('div','pr-job');
            var h = el('div','pr-job-h');
            var t = el('div','pr-job-title'); t.textContent = job.title + ' \u2014 ' + job.company; h.appendChild(t);
            var d = el('div','pr-job-date'); d.textContent = job.date; h.appendChild(d);
            j.appendChild(h);
            var desc = el('p','pr-job-desc'); desc.textContent = job.description; j.appendChild(desc);

            // Build achievements list but do NOT render any 'label' properties from the data.
            // Also avoid creating empty <ul> or <li> elements when there is no text.
            if(job.achievements && job.achievements.length){
                var ul = el('ul','pr-achs');
                job.achievements.forEach(function(a){
                    var text = '';
                    if(typeof a === 'string'){
                        text = a;
                    } else if(a && typeof a === 'object'){
                        // intentionally ignore a.label per print-only requirement; use only a.text
                        text = a.text || '';
                    }
                    if(text && String(text).trim()){
                        var li = el('li');
                        li.textContent = text;
                        ul.appendChild(li);
                    }
                });
                if(ul.children.length) j.appendChild(ul);
            }

            sec.appendChild(j);
        });
        return sec;
    }

    function buildPersonal(personal){
        var sec = el('section','pr-personal');
        var title = 'Personal Interests';
        var items = personal || [];
        var intro = '';
        if(personal && personal.titleText) title = personal.titleText;
        if(personal && Array.isArray(personal.items)) { items = personal.items; intro = personal.intro || ''; }
        var h = el('h3'); h.textContent = title; sec.appendChild(h);
        if(intro) sec.appendChild(el('p','pr-personal-intro')).textContent = intro;
        var wrap = el('div','pr-tags'); items.forEach(function(t){ var s = el('span','pr-tag'); s.textContent = t; wrap.appendChild(s); });
        sec.appendChild(wrap);
        return sec;
    }

    function buildSidebar(tech){
        var aside = el('aside','pl-side');
        // inner container holds content offset from the separator
        var inner = el('div','pl-side-inner');
        // overall sidebar title - prefer title from data when available
        var sideTitle = el('h3','tech-summary-title');
        var titleFromData = (window.RESUME_DATA && window.RESUME_DATA.technologySummary && window.RESUME_DATA.technologySummary.titleText) ||
                            (window.RESUME_DATA && window.RESUME_DATA.sectionTitles && window.RESUME_DATA.sectionTitles.technologySummary);
        sideTitle.textContent = titleFromData || 'Tech Summary'; inner.appendChild(sideTitle);

    // Render tech categories and tags. Per print requirement, do NOT include any role metadata for tags.
    (tech || []).forEach(function(cat){
            var c = el('div','side-cat');
            var h = el('h4'); h.textContent = cat.title || cat.name || ''; c.appendChild(h);
                var ul = el('ul'); cat.tags.forEach(function(t){
                    var li = el('li');
                    var b = el('span','manual-bullet'); b.textContent = '\u2022';
                    var txt = el('span','manual-text');
                    var tagName = '';
                    if(typeof t === 'string'){
                        tagName = t;
                    } else if(t && typeof t === 'object'){
                        tagName = t.name || '';
                    }
                    txt.textContent = tagName;
                    li.appendChild(b);
                    li.appendChild(txt);
                    ul.appendChild(li);
                });
            c.appendChild(ul);
            inner.appendChild(c);
        });
        aside.appendChild(inner);
        return aside;
    }

    function buildInto(container, data){
        container.innerHTML = '';
        var layout = el('div','print-layout');

        // Header spans full width
        layout.appendChild(buildHeader(data));
        // add summary under header
        layout.appendChild(buildSummary(data));

        var columns = el('div','pr-columns');
        var main = el('main','pl-main');
        // technologySummary may be an array (legacy) or an object with titleText + categories
        var tech = data && data.technologySummary;
        var techForSidebar = [];
        if(Array.isArray(tech)) techForSidebar = tech;
        else if(tech && Array.isArray(tech.categories)) techForSidebar = tech.categories;
        var side = buildSidebar(techForSidebar);

    // support career as legacy array or new object { titleText, items }
    var careerData = data && data.career;
    var careerForRender = [];
    if(Array.isArray(careerData)) careerForRender = careerData;
    else if(careerData && Array.isArray(careerData.items)) careerForRender = careerData.items;
    main.appendChild(buildCareerSection(careerForRender || []));

    columns.appendChild(main);
    // insert a real DOM separator so the vertical bar prints reliably across browsers
    var sep = el('div','pl-sep');
    columns.appendChild(sep);
    columns.appendChild(side);

        layout.appendChild(columns);

        // Personal interests should use full page width below the columns
        if(data){
            var personal = data.personalInterests || data.personalInterestsIntro || [];
            // If old shape (intro + array) exists, prefer new object
            if(data.personalInterests && Array.isArray(data.personalInterests)) personal = data.personalInterests;
            layout.appendChild(buildPersonal(personal));
        }

        container.appendChild(layout);
        // No role-specific layout adjustments required for the print output (roles are intentionally not rendered).
    }

    // expose function for embedding render into other pages
    window.renderPrintInto = function(container, data){
        buildInto(container, data || window.RESUME_DATA || {});
    };

    // Standalone behavior when loaded directly (print/print.html)
    if(document.getElementById('print-root')){
        if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ window.renderPrintInto(document.getElementById('print-root'), window.RESUME_DATA); });
        else window.renderPrintInto(document.getElementById('print-root'), window.RESUME_DATA);
    }
})();
