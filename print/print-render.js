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
        summary.textContent = (data && data.professionalSummary) || '';
        return summary;
    }

    function buildCareerSection(career){
        var sec = el('section','pr-career');
        career.forEach(function(job){
            var j = el('div','pr-job');
            var h = el('div','pr-job-h');
            var t = el('div','pr-job-title'); t.textContent = job.title + ' — ' + job.company; h.appendChild(t);
            var d = el('div','pr-job-date'); d.textContent = job.date; h.appendChild(d);
            j.appendChild(h);
            var desc = el('p','pr-job-desc'); desc.textContent = job.description; j.appendChild(desc);
            if(job.achievements && job.achievements.length){
                var ul = el('ul','pr-achs'); job.achievements.forEach(function(a){ var li = el('li'); li.textContent = a; ul.appendChild(li); }); j.appendChild(ul);
            }
            sec.appendChild(j);
        });
        return sec;
    }

    function buildPersonal(personal){
        var sec = el('section','pr-personal');
        var h = el('h3'); h.textContent = 'Personal Interests'; sec.appendChild(h);
        var wrap = el('div','pr-tags'); personal.forEach(function(t){ var s = el('span','pr-tag'); s.textContent = t; wrap.appendChild(s); });
        sec.appendChild(wrap);
        return sec;
    }

    function buildSidebar(tech){
        var aside = el('aside','pl-side');
        // inner container holds content offset from the separator
        var inner = el('div','pl-side-inner');
        // overall sidebar title
        var sideTitle = el('h3','tech-summary-title'); sideTitle.textContent = 'Tech Summary'; inner.appendChild(sideTitle);
    // allow roles to be supplied either via the legacy window.TECH_ROLES or the centralized RESUME_DATA.techRoles
    var rolesMap = window.TECH_ROLES || (window.RESUME_DATA && window.RESUME_DATA.techRoles) || {};

    tech.forEach(function(cat){
            var c = el('div','side-cat');
            var h = el('h4'); h.textContent = cat.title; c.appendChild(h);
                var ul = el('ul'); cat.tags.forEach(function(t){
                    var li = el('li');
                    var b = el('span','manual-bullet'); b.textContent = '\u2022';
                    var txt = el('span','manual-text'); txt.textContent = t;
                    li.appendChild(b);
                    li.appendChild(txt);

                    // If a roles map exists on the window, and has an entry for this tag, render it.
                    // The role element will be styled to appear italicized and preceded by a separator when it can sit on the same line.
                    if(rolesMap && rolesMap[t]){
                            var roleWrap = el('span','tech-role-wrap');
                            // separator text uses non-breaking spaces around the hyphen to help keep it with the role when possible
                            var sep = el('span','tech-role-sep'); sep.textContent = '  -  ';
                            var role = el('span','tech-role'); role.textContent = rolesMap[t];
                            roleWrap.appendChild(sep);
                            roleWrap.appendChild(role);
                            // append role to the list item; li is positioned relative so inline absolute positioning won't expand column width
                            li.appendChild(roleWrap);
                        }

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
        var side = buildSidebar(data.technologySummary || []);

    main.appendChild(buildCareerSection(data.career || []));

    columns.appendChild(main);
    // insert a real DOM separator so the vertical bar prints reliably across browsers
    var sep = el('div','pl-sep');
    columns.appendChild(sep);
    columns.appendChild(side);

        layout.appendChild(columns);

        // Personal interests should use full page width below the columns
        if(data && data.personalInterests && data.personalInterests.length){
            layout.appendChild(buildPersonal(data.personalInterests));
        }

        container.appendChild(layout);
        // After layout is attached to DOM, adjust any role elements that wrapped to the next line.
        // When a role wraps, we remove the separator and display the role on its own indented line.
        setTimeout(function(){
            try{
                var side = container.querySelector('.pl-side');
                if(side){
                    var items = side.querySelectorAll('.side-cat li');
                    items.forEach(function(li){
                        var txt = li.querySelector('.manual-text');
                        var roleWrap = li.querySelector('.tech-role-wrap');
                        if(txt && roleWrap){
                                    var txtRect = txt.getBoundingClientRect();
                                    var roleRect = roleWrap.getBoundingClientRect();
                                    // If the top of the role is lower than the top of the text, it wrapped to the next line.
                                    if(roleRect.top > txtRect.top + 1){
                                        var sep = roleWrap.querySelector('.tech-role-sep');
                                        if(sep) sep.textContent = '';
                                        roleWrap.classList.add('tech-role-wrapped');
                                    } else {
                                        // If role sits on the same line, mark it inline so CSS can absolutely position it
                                        roleWrap.classList.add('tech-role-inline');
                                    }
                                }
                    });
                }
            }catch(e){ /* ignore measurement errors */ }
        }, 0);
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
