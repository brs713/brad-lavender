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
        const header = document.querySelector('.header-content');
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Resume';
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
            window.print();
        });
        
        header.appendChild(printBtn);
    };

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
