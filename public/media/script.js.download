// Tab Scroll + Zoom + Section Sync + Go To Top + Modal + Gallery Control
(function () {
    const menuTabs = document.getElementById('menu-tabs');
    const tabs = Array.from(menuTabs.children);
    const sections = document.querySelectorAll('.menu-section');

    let isDragging = false;
    let wasDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let scrollAnimationId = null;

    function init() {
        centerTab(tabs[0], false);
        setupEventListeners();
    }

    function setupEventListeners() {
        menuTabs.addEventListener('mousedown', handleDragStart);
        menuTabs.addEventListener('mousemove', handleDragMove);
        menuTabs.addEventListener('mouseup', handleDragEnd);
        menuTabs.addEventListener('mouseleave', handleDragEnd);
        menuTabs.addEventListener('click', handleTabClick);
        menuTabs.addEventListener('scroll', handleScroll);
    }

    function centerTab(tab, animate = true) {
        if (!tab || !tab.dataset.section) return;
        if (scrollAnimationId) cancelAnimationFrame(scrollAnimationId);

        const containerWidth = menuTabs.clientWidth;
        const tabWidth = tab.offsetWidth;
        const tabOffset = tab.offsetLeft;
        const currentScroll = menuTabs.scrollLeft;
        const maxScroll = menuTabs.scrollWidth - containerWidth;

        let targetScroll = tabOffset - (containerWidth / 2) + (tabWidth / 2);
        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

        if (animate) {
            const startTime = performance.now();
            const duration = 300;
            const distance = targetScroll - currentScroll;

            function animateScroll(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOutQuad(progress);
                menuTabs.scrollLeft = currentScroll + (distance * eased);

                if (progress < 1) {
                    scrollAnimationId = requestAnimationFrame(animateScroll);
                } else {
                    menuTabs.scrollLeft = targetScroll;
                    updateActiveTab();
                }
            }

            scrollAnimationId = requestAnimationFrame(animateScroll);
        } else {
            menuTabs.scrollLeft = targetScroll;
            updateActiveTab();
        }
    }

    function updateActiveTab() {
        const containerCenter = menuTabs.getBoundingClientRect().left + menuTabs.clientWidth / 2;

        let closestTab = null;
        let minDistance = Infinity;

        tabs.forEach(tab => {
            const rect = tab.getBoundingClientRect();
            const tabCenter = rect.left + rect.width / 2;
            const distance = Math.abs(containerCenter - tabCenter);
            tab.classList.remove('zoomed');

            if (distance < minDistance) {
                minDistance = distance;
                closestTab = tab;
            }
        });

        if (closestTab && closestTab.dataset.section) {
            closestTab.classList.add('zoomed');
            showSection(closestTab.dataset.section);
        }
    }

    function showSection(sectionId) {
        sections.forEach(sec => {
            sec.style.display = sec.id === sectionId ? 'block' : 'none';
        });
    }

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function handleDragStart(e) {
        isDragging = true;
        wasDragging = false;
        startX = e.pageX - menuTabs.offsetLeft;
        scrollLeft = menuTabs.scrollLeft;
        if (scrollAnimationId) cancelAnimationFrame(scrollAnimationId);
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        wasDragging = true;
        const x = e.pageX - menuTabs.offsetLeft;
        const walk = (x - startX) * 1.5;
        menuTabs.scrollLeft = scrollLeft - walk;
    }

    function handleDragEnd() {
        isDragging = false;
        if (wasDragging) setTimeout(updateActiveTab, 100);
    }

    function handleTabClick(e) {
        if (wasDragging) {
            wasDragging = false;
            return;
        }

        const clickedTab = e.target.closest('.tab-button');
        if (clickedTab && clickedTab.dataset.section) {
            centerTab(clickedTab);
        }
    }

    function handleScroll() {
        requestAnimationFrame(updateActiveTab);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// Scale Tabs Based on Scroll Center
(function () {
    const tabContainer = document.getElementById('menu-tabs');
    const buttons = tabContainer.querySelectorAll('button');

    function expoEase(x) {
        return x === 0 ? 0 : Math.pow(2, 8 * (x - 1));
    }

    function clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    function updateScale() {
        const containerRect = tabContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        buttons.forEach((btn) => {
            const btnRect = btn.getBoundingClientRect();
            const btnCenter = btnRect.left + btnRect.width / 2;
            const distance = Math.abs(containerCenter - btnCenter);
            const maxDistance = containerRect.width / 2;

            const t = clamp(1 - distance / maxDistance, 0, 1);
            const scale = clamp(1 + 0.25 * expoEase(t), 1, 1.25);
            const zIndex = Math.round(1 + t * 10);

            btn.style.transform = `scale(${scale})`;
            btn.style.zIndex = zIndex;
        });
    }

    tabContainer.addEventListener('scroll', () => requestAnimationFrame(updateScale));
    window.addEventListener('resize', updateScale);
    window.addEventListener('load', updateScale);
})();

// ---------- Go to Top Button Show/Hide ----------
document.addEventListener('DOMContentLoaded', function () {
    const upBtn = document.getElementById('up_btn');
    const scrollContainer = document.querySelector('.menu-content');

    function toggleUpButton(scrollTopValue) {
        if (scrollTopValue > 100) {
            upBtn.classList.add('show');
        } else {
            upBtn.classList.remove('show');
        }
    }

    toggleUpButton(scrollContainer ? scrollContainer.scrollTop : window.scrollY);

    window.addEventListener('scroll', function () {
        toggleUpButton(window.scrollY);
    });

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', function () {
            toggleUpButton(scrollContainer.scrollTop);
        });
    }
});


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fullscreen Overlay
function toggleOverlay() {
    const overlay = document.getElementById("fullscreenNav");
    overlay.classList.toggle("active");
}

// Gallery Hover & Lightbox
(function () {
    document.querySelectorAll('.slide-row').forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.querySelector('.slide-track').style.animationPlayState = 'paused';
        });
        row.addEventListener('mouseleave', () => {
            row.querySelector('.slide-track').style.animationPlayState = 'running';
        });
    });

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementById('closeModal');

    document.querySelectorAll('.slide-track img').forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('show');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
})();

// Section Observer (Tab Activation)
(function () {
    const sectionIds = Array.from(document.querySelectorAll('[data-section]')).map(btn => btn.dataset.section);
    const observerOptions = {
        root: document.querySelector('.menu-content'),
        threshold: 0.3,
        rootMargin: "0px 0px -60% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                document.querySelectorAll('#menu-tabs button').forEach(btn => {
                    if (btn.dataset.section === sectionId) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
})();
