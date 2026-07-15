document.addEventListener('DOMContentLoaded', () => {
    // Phase 1: Scroll interaction
    const navbar = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Phase 2: Live Workspace elements
    const promptInput = document.getElementById('promptInput');
    const descInput = document.getElementById('descInput');
    const previewContainer = document.getElementById('previewContainer');
    const charCounter = document.getElementById('charCounter');
    const platformButtons = document.querySelectorAll('.btn-platform');
    const publishBtn = document.getElementById('publishBtn');

    // Dynamic metrics elements
    const statReadability = document.getElementById('statReadability');
    const statReach = document.getElementById('statReach');
    const statEngagement = document.getElementById('statEngagement');

    let currentPlatform = 'x';

    const updatePreview = () => {
        const promptText = promptInput.value || "[Your prompt will appear here]";
        const descText = descInput.value || "This is where your post description, context, or explanation will go.";
        
        // Character counter
        const unifiedTextLength = (promptInput.value + descInput.value).length;
        charCounter.textContent = `${unifiedTextLength} characters`;

        // Calculate basic synthetic "insights" dynamically based on content length
        if (unifiedTextLength > 10) {
            statReadability.textContent = unifiedTextLength > 150 ? "B+" : "A+";
            statReach.textContent = `${(unifiedTextLength * 12).toLocaleString()}`;
            statEngagement.textContent = unifiedTextLength > 300 ? "Medium" : "High";
        } else {
            statReadability.textContent = "--";
            statReach.textContent = "0";
            statEngagement.textContent = "--";
        }

        // Render template based on selected network styling
        if (currentPlatform === 'x') {
            previewContainer.innerHTML = `
                <div class="preview-header">
                    <div class="preview-avatar"></div>
                    <div>
                        <div class="fw-bold text-white small">AI Creator <i class="bi bi-patch-check-fill text-primary"></i></div>
                        <div class="text-muted extra-small">@prompt_pulse</div>
                    </div>
                </div>
                <div class="preview-content text-white-50">
                    <p>${descText}</p>
                    <div class="prompt-block text-white">${promptText}</div>
                    <p class="text-primary mt-2 small">#ChatGPT #AIprompts</p>
                </div>
            `;
        } else if (currentPlatform === 'linkedin') {
            previewContainer.innerHTML = `
                <div class="preview-header">
                    <div class="preview-avatar"></div>
                    <div>
                        <div class="fw-bold text-white small">AI Creator</div>
                        <div class="text-muted extra-small">Prompts Specialist & Dev • 1st</div>
                    </div>
                </div>
                <div class="preview-content text-white-50">
                    <p class="mb-2">💡 Want to see magic? Try this prompt workflow:</p>
                    <p>${descText}</p>
                    <div class="prompt-block text-white">${promptText}</div>
                </div>
            `;
        } else if (currentPlatform === 'medium') {
            previewContainer.innerHTML = `
                <div class="preview-content">
                    <h5 class="fw-bold text-white">The Ultimate Workspace Hack</h5>
                    <p class="text-muted extra-small mb-3">Published in AI Frontiers • 3 min read</p>
                    <p class="text-white-50">${descText}</p>
                    <div class="prompt-block text-white">${promptText}</div>
                </div>
            `;
        }
    };

    // Event listeners for inputs
    promptInput.addEventListener('input', updatePreview);
    descInput.addEventListener('input', updatePreview);

    // Platform Selector Tabs
    platformButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            platformButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPlatform = btn.dataset.platform;
            updatePreview();
        });
    });

    // Mock publish interaction
    publishBtn.addEventListener('click', () => {
        if (!promptInput.value && !descInput.value) {
            alert("Please write something in your workspace first!");
            return;
        }
        publishBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Publishing...`;
        publishBtn.disabled = true;

        setTimeout(() => {
            publishBtn.innerHTML = `<i class="bi bi-check2-circle me-2"></i>Published!`;
            publishBtn.classList.replace('btn-primary', 'btn-success');
            
            setTimeout(() => {
                publishBtn.innerHTML = `<i class="bi bi-send-fill me-2"></i>Publish Post`;
                publishBtn.classList.replace('btn-success', 'btn-primary');
                publishBtn.disabled = false;
            }, 3000);
        }, 1500);
    });

    // Initialize layout
    updatePreview();
});
// Append this function block inside your existing document.addEventListener('DOMContentLoaded', () => { ... })
    
    // Dynamic Metric Counters Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 150; // Adjust this value to make counting faster or slower

    const startCounters = () => {
        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target');
                const text = counter.innerText;
                
                // Extract clean numerical digits for calculations
                const currentNum = parseFloat(text.replace(/,/g, ''));
                const increment = value / speed;

                if (currentNum < value) {
                    const nextVal = Math.ceil(currentNum + increment);
                    
                    // Re-apply correct formats
                    if (value >= 1000 && value % 1000 === 0) {
                        counter.innerText = nextVal.toLocaleString();
                    } else if (value < 100) {
                        counter.innerText = (currentNum + 0.1).toFixed(1) + "%";
                    } else {
                        counter.innerText = nextVal.toLocaleString();
                    }
                    setTimeout(animate, 10);
                } else {
                    // Lock final target formatting
                    if (value === 142800) {
                        counter.innerText = "142.8K";
                    } else if (value === 84) {
                        counter.innerText = "8.4%";
                    } else {
                        counter.innerText = value.toLocaleString();
                    }
                }
            };
            animate();
        });
    };

    // Intersection observer to animate stats when user scrolls to dashboard
    const analyticsSection = document.getElementById('analytics');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                startCounters();
                animated = true;
            }
        });
    }, { threshold: 0.3 });

    if (analyticsSection) {
        observer.observe(analyticsSection);
    }
    // Newsletter Submit Interaction
    const newsletterForm = document.getElementById('newsletterForm');
    const newsEmail = document.getElementById('newsEmail');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailValue = newsEmail.value;
            if (!emailValue) return;

            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span>`;
            submitBtn.disabled = true;

            setTimeout(() => {
                newsletterForm.innerHTML = `
                    <div class="text-success small fw-bold animate-pulse">
                        <i class="bi bi-check2-circle-fill me-2"></i> Welcome to PromptPulse! Check your inbox soon.
                    </div>`;
            }, 1500);
        });
    }
    // Phase 5: Smooth Scrollspy / Active Link Tracker
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    const trackScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for fixed navbar
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', trackScroll);

    // Dynamic Collapse on Mobile Link Click
    const navItems = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
    const menuToggle = document.getElementById('menu');
    const bsCollapse = menuToggle ? new bootstrap.Collapse(menuToggle, { toggle: false }) : null;

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (menuToggle && menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });