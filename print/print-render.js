// Print renderer: builds a two-column print layout with main content (left) and tech sidebar (right)
(function(){
    function el(tag, cls){ var e = document.createElement(tag); if(cls) e.className = cls; return e; }

    function buildHeader(left){
        var h = el('header','pr-header');
        var name = el('h1','pr-name'); name.textContent = left.header.name; h.appendChild(name);
        var contact = el('div','pr-contact'); contact.textContent = left.header.email; h.appendChild(contact);
        var summary = el('p','pr-summary'); summary.textContent = left.professionalSummary; h.appendChild(summary);
        return h;
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
        tech.forEach(function(cat){
            var c = el('div','side-cat');
            var h = el('h4'); h.textContent = cat.title; c.appendChild(h);
            var ul = el('ul'); cat.tags.forEach(function(t){ var li = el('li'); li.textContent = t; ul.appendChild(li); });
            c.appendChild(ul);
            aside.appendChild(c);
        });
        return aside;
    }

    function buildInto(container, data){
        container.innerHTML = '';
        var layout = el('div','print-layout');
        var main = el('main','pl-main');
        var side = buildSidebar(data.technologySummary || []);

        main.appendChild(buildHeader(data));
        main.appendChild(buildCareerSection(data.career || []));
        main.appendChild(buildPersonal(data.personalInterests || []));

        layout.appendChild(main);
        layout.appendChild(side);
        container.appendChild(layout);
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
