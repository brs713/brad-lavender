// Resume Website Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for any internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll for job items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe job items for animation
    const jobItems = document.querySelectorAll('.job');
    jobItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add hover effect for tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });

    // Add print functionality
    const addPrintButton = () => {
        var attempts = 0;
        var maxAttempts = 20;
        var interval = 100; // ms
        var tryAppend = function(){
            attempts++;
            const header = document.querySelector('.header-content');
            if(!header){
                if(attempts < maxAttempts) return setTimeout(tryAppend, interval);
                return; // give up quietly
            }
            const printBtn = document.createElement('button');
            var label = (window.RESUME_DATA && window.RESUME_DATA.ui && window.RESUME_DATA.ui.printButtonLabel) || 'Print Resume';
            printBtn.innerHTML = '<i class="fas fa-print"></i> ' + label;
            printBtn.className = 'print-btn';
        printBtn.style.cssText = `
            background: rgba(255,255,255,0.2);
            color: white;
            border: 2px solid rgba(255,255,255,0.3);
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 1rem;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        printBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.3)';
            this.style.transform = 'translateY(-2px)';
        });
        
        printBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.2)';
            this.style.transform = 'translateY(0)';
        });
        
        printBtn.addEventListener('click', function() {
            // Inject print DOM and stylesheet, then call print (no iframe)
            var cleanup = function(){
                try{ window.removeEventListener('afterprint', afterPrint); }catch(e){}
                var tmp = document.getElementById('print-temp'); if(tmp) tmp.parentNode.removeChild(tmp);
                var css = document.getElementById('print-css-temp'); if(css) css.parentNode.removeChild(css);
            };

            var afterPrint = function(){ cleanup(); };

            var doPrint = function(){
                // create container (insert at top so it prints first)
                var container = document.getElementById('print-root');
                if(!container){ container = document.createElement('div'); container.id = 'print-root'; document.body.insertBefore(container, document.body.firstChild); }
                // ensure print css is loaded (media=print)
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'print/print.css';
                // set to 'all' immediately to force the browser to load and apply rules so print preview picks them up.
                // The print DOM is hidden on-screen via @media screen in styles.css, so this won't flash visible content.
                link.media = 'all';
                link.id = 'print-css-temp';
                document.head.appendChild(link);

                // helper to detect stylesheet applied (works in many browsers)
                var cssLoaded = function(cb){
                    // onload is supported in modern browsers for <link>
                    var done = false;
                    link.onload = function(){ if(done) return; done = true; cb(); };
                    // fallback: poll for stylesheet rules (may throw on cross-origin; here same-origin)
                    var attempts = 0;
                    var poll = setInterval(function(){
                        attempts++;
                        try{
                            if(link.sheet && link.sheet.cssRules && link.sheet.cssRules.length){ clearInterval(poll); if(done) return; done = true; cb(); }
                        }catch(e){ /* ignore - access not ready yet */ }
                        if(attempts > 50){ clearInterval(poll); if(done) return; done = true; cb(); }
                    }, 50);
                    // extra safety: if neither fires, call cb after 2s
                    setTimeout(function(){ if(done) return; done = true; try{ if(link.sheet && !link.sheet.cssRules){ /* nothing */ } }catch(e){} cb(); }, 2000);
                };

                // render into container using print renderer, but wait until CSS is applied
                cssLoaded(function(){
                    // We already set media='all' above to force application. Remember original target media so we can restore.
                    var originalMedia = 'print';

                    var runRender = function(){
                        try{
                            if(window.renderPrintInto){
                                window.renderPrintInto(container, window.RESUME_DATA);
                                afterRender();
                            } else {
                                // load print-render.js dynamically then render
                                var s = document.createElement('script'); s.src = 'print/print-render.js';
                                s.onload = function(){ try{ window.renderPrintInto(container, window.RESUME_DATA); }catch(e){ console.error(e); } finally{ afterRender(); } };
                                document.body.appendChild(s);
                            }
                        }catch(err){ console.error('Render failed', err); afterRender(); }
                    };

                    var afterRender = function(){
                        // restore media back to print after a short delay so the link stays print-only for subsequent operations
                        setTimeout(function(){ try{ link.media = originalMedia; }catch(e){} }, 400);
                        try{ window.addEventListener('afterprint', afterPrint); }catch(e){}
                        // give the renderer a moment then call print
                        setTimeout(function(){ window.print(); }, 160);
                        // fallback cleanup
                        setTimeout(cleanup, 5000);
                    };

                    runRender();
                });
            };

            doPrint();
        });
        
            header.appendChild(printBtn);
            }; // end tryAppend
            tryAppend();
        }; // end addPrintButton

    addPrintButton();

    // Add dynamic year to current position
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentPositionDate = document.querySelector('.job-date');
    if (currentPositionDate && currentPositionDate.textContent.includes('Present')) {
        currentPositionDate.textContent = currentPositionDate.textContent.replace('Present', currentYear);
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'p':
                    e.preventDefault();
                    window.print();
                    break;
            }
        }
    });

    console.log('Brad Lavender Resume Website Loaded Successfully! 🚀');
});
