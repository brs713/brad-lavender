// Render the TECH_DATA into the hidden header container only when printing
(function(){
    function buildTechNode(item) {
        var cat = document.createElement('div');
        cat.className = 'tech-category';
        var h3 = document.createElement('h3');
        h3.textContent = item.title;
        cat.appendChild(h3);
        var tagsWrap = document.createElement('div');
        tagsWrap.className = 'tech-tags';
        item.tags.forEach(function(tag){
            var s = document.createElement('span');
            s.className = 'tech-tag';
            s.textContent = tag;
            tagsWrap.appendChild(s);
        });
        cat.appendChild(tagsWrap);
        return cat;
    }

    function renderPrintHeader() {
        var container = document.getElementById('print-header-tech');
        if(!container || !window.TECH_DATA) return;
        // clear
        container.innerHTML = '';
        window.TECH_DATA.forEach(function(item){
            container.appendChild(buildTechNode(item));
        });
        container.style.display = '';
    }

    function clearPrintHeader() {
        var container = document.getElementById('print-header-tech');
        if(!container) return;
        container.style.display = 'none';
        container.innerHTML = '';
    }

    // Bind for browsers that support beforeprint/afterprint
    if ('onbeforeprint' in window) {
        window.onbeforeprint = renderPrintHeader;
        window.onafterprint = clearPrintHeader;
    } else {
        // Fallback: use matchMedia
        var mql = window.matchMedia && window.matchMedia('print');
        if (mql && mql.addListener) {
            mql.addListener(function(m){
                if(m.matches) renderPrintHeader(); else clearPrintHeader();
            });
        }
    }

    // Also render just before window.print() if triggered via script
    // (some browsers don't fire beforeprint reliably)
    var origPrint = window.print;
    window.print = function(){
        try{ renderPrintHeader(); }catch(e){}
        setTimeout(function(){ origPrint.call(window); }, 20);
    };

    // Render now on DOMContentLoaded so print preview sees content even if beforeprint isn't fired immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderPrintHeader);
    } else {
        try{ renderPrintHeader(); }catch(e){}
    }
})();
