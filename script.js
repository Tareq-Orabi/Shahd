// ================= CONFIG & STATE =================
const CONFIG = {
    PARTICLES: {
        COUNT: 20,
        COLORS: ['#8B0000', '#A52A2A', '#DC143C']
    },
    ANIMATIONS: {
        TYPEWRITER_SPEED: 50,
        FADE_DURATION: 300
    },
    LETTER_TEXT: `شهد الجميلة،

أريد أن أقول لكِ: لا شبيه لكِ، لا مثيل، ولا بديل.
أنتِ كزهرةٍ تتفتح لأول مرة، تحمل في طياتها دهشة الجمال ونقاء البدايات. كالمطر حين يعانق الأرض العطشى، فيمنحها حياةً جديدة، وكنسمةٍ رقيقة تهب بلطف فتبعث في الروح سكينة وطمأنينة.

تشبهين الأمل الذي يضيء اللحظة الأخيرة قبل اليأس، وتشبهين الأغاني الهادئة التي تلامس أعماق القلب برقة، وتشبهين الورد في رقته وعطره، بل أنتِ الجمال نفسه في أصفى صوره.

ولأن الأرواح تتآلف حين تجد ما يشبهها، ولأن القلوب إذا التقت بصدق امتلأت العيون سكينة واطمأن القلب، فلم يعد له من الدنيا مطلب سوى القرب. وبين كل الأشياء التي تذكّرني بكِ، تظلين دائمًا الأجمل، والأرقى، والأقرب إلى القلب.

وأنا هنا،
أكون كتفيكِ حين تثقل الهموم كاهلكِ،
وأكون وطنكِ الذي لا ينكركِ إن شعرتِ يومًا بالضياع،
وأكون ظلكِ حين تشتد شمس الحزن، لا لأحجب النور، بل لأخفف وطأته.

أن أكون صديقكِ يعني أن يصلني صوت قلبكِ حتى دون أن تنطقي،
وأن يدي ستحاول دائمًا أن تمسك بكِ قبل أن تتعثري،
وإن حدث وسقطتِ، ستكون أول يد تمتدّ لكِ لتنهضي من جديد.

أن أكون صديقكِ يعني أن سعادتكِ هدف، وضحكتكِ مكافأة،
وأن أشارككِ فرحكِ كما أشارككِ حزنكِ؛
فالفرح يكبر حين نتقاسمه، والحزن يصغر حين لا نحمله وحدنا.

ولو كان بوسعي أن أمنحكِ شيئًا في هذه الحياة،
لمنحتكِ القدرة على رؤية نفسكِ بعينيّ،
حينها فقط ستدركين كم أنتِ شخصٌ استثنائي بالنسبة لي،
وكيف أن وجودكِ كصديقة… نعمة حقيقية. 🤍`
};

const BOUQUET_MESSAGES = [
    { emoji: "✨", text: "لجمالك الذي يخطف الأنفاس دون أن يحاول" },
    { emoji: "🤍", text: "لقلبك اللطيف الذي يترك أثره في كل من يقترب" },
    { emoji: "😊", text: "لابتسامتك التي تجعل الأيام أخفّ وأجمل" },
    { emoji: "💗", text: "لروحك المليئة بالحياة التي تنير المكان" },
    { emoji: "🫶", text: "لرقّتك وحضورك الجميل في كل تفصيلة" },
    { emoji: "💫", text: "ولأنكِ ببساطة… شيء جميل يستحق كل هذا" }
];

// ================= UTILITY FUNCTIONS =================
const utils = {
    $(selector) {
        return document.querySelector(selector);
    },

    $$(selector) {
        return document.querySelectorAll(selector);
    },

    show(element, display = 'flex') {
        element.classList.remove('hidden');
        element.style.display = display;
        requestAnimationFrame(() => {
            element.classList.add('visible');
        });
    },

    hide(element) {
        element.classList.remove('visible');
        setTimeout(() => {
            element.classList.add('hidden');
            element.style.display = 'none';
        }, CONFIG.ANIMATIONS.FADE_DURATION);
    },

    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }
};

// ================= FLOATING HEARTS SYSTEM =================
class FloatingHearts {
    constructor(containerSelector) {
        this.container = utils.$(containerSelector);
        if (!this.container) return;

        this.hearts = [];
        this.init();
    }

    init() {
        setInterval(() => this.createHeart(), 2000);
    }

    createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: ${utils.random(0, 100)}%;
            font-size: ${utils.random(20, 40)}px;
            opacity: ${utils.random(0.3, 0.7)};
            animation: floatUp ${utils.random(8, 12)}s linear forwards;
            pointer-events: none;
            z-index: 1;
        `;

        this.container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 12000);
    }
}

// ================= MODAL MANAGER =================
class ModalManager {
    constructor() {
        this.activeModal = null;
        this.previousFocus = null;
        this.init();
    }

    init() {
        // Open modal on card click
        utils.$$('[data-modal]').forEach(card => {
            card.addEventListener('click', (e) => {
                const modalId = e.currentTarget.dataset.modal;
                this.open(modalId);
            });

            // Keyboard support
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const modalId = e.currentTarget.dataset.modal;
                    this.open(modalId);
                }
            });
        });

        // Close modal buttons
        utils.$$('[data-close]').forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close();
            }
        });
    }

    open(modalId) {
        const modal = utils.$(`#${modalId}`);
        if (!modal) return;

        this.previousFocus = document.activeElement;
        this.activeModal = modal;

        utils.show(modal, 'flex');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
            if (firstFocusable) firstFocusable.focus();
        }, 100);

        utils.trapFocus(modal);
        this.handleModalContent(modalId);
    }

    close() {
        if (!this.activeModal) return;

        // تنظيف الـ Typewriter عند الإغلاق
        if (this.typewriterTimeout) {
            clearTimeout(this.typewriterTimeout);
        }

        utils.hide(this.activeModal);
        document.body.style.overflow = '';

        if (this.activeModal.id === 'modal-song') {
            const video = this.activeModal.querySelector('video');
            if (video) video.pause();
        }

        if (this.previousFocus) this.previousFocus.focus();
        this.activeModal = null;
    }

    handleModalContent(modalId) {
        switch (modalId) {
            case 'modal-bouquet':
                this.renderBouquet();
                break;
            case 'modal-letter':
                this.typewriterEffect();
                break;
            case 'modal-gallery':
                this.initGallery();
                break;
        }
    }

    renderBouquet() {
        const container = utils.$('#bouquet-messages');
        if (!container) return;

        container.innerHTML = '';

        BOUQUET_MESSAGES.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'message-card';
            card.setAttribute('role', 'listitem');

            card.innerHTML = `
                <div class="message-emoji">${item.emoji}</div>
                <p class="message-text">${item.text}</p>
            `;

            container.appendChild(card);
        });
    }

    typewriterEffect() {
        const element = utils.$('#typewriter-text');
        if (!element) return;

        // إلغاء أي عملية كتابة سابقة إذا كانت تعمل
        if (this.typewriterTimeout) {
            clearTimeout(this.typewriterTimeout);
        }

        element.textContent = '';
        const text = CONFIG.LETTER_TEXT;
        let index = 0;

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                this.typewriterTimeout = setTimeout(type, CONFIG.ANIMATIONS.TYPEWRITER_SPEED);
            }
        };

        type();
    }

    initGallery() {
        const photos = utils.$$('.polaroid-item');
        photos.forEach(photo => {
            const img = photo.querySelector('.polaroid-img');
            if (img) {
                photo.addEventListener('click', () => {
                    this.showFullscreen(img.src, img.alt);
                });

                photo.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.showFullscreen(img.src, img.alt);
                    }
                });
            }
        });
    }

    showFullscreen(src, alt) {
        const viewer = utils.$('#fullscreen-viewer');
        const img = utils.$('#fullscreen-image');

        if (!viewer || !img) return;

        img.src = src;
        img.alt = alt;

        utils.show(viewer, 'flex');

        const closeBtn = viewer.querySelector('.fullscreen-close');
        const close = () => {
            utils.hide(viewer);
        };

        closeBtn.addEventListener('click', close);
        viewer.addEventListener('click', (e) => {
            if (e.target === viewer) close();
        });

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                close();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
}

// ================= APP INITIALIZATION =================
class App {
    constructor() {
        this.floatingHearts = null;
        this.modalManager = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Initialize floating hearts
        this.floatingHearts = new FloatingHearts('.floating-hearts');

        // Initialize modal manager
        this.modalManager = new ModalManager();

        // Landing page enter button
        const enterBtn = utils.$('#enter-btn');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => this.enterDashboard());
        }

        // Preload images
        this.preloadImages();
    }

    enterDashboard() {
        const landing = utils.$('#landing-page');
        const dashboard = utils.$('#dashboard');

        if (landing && dashboard) {
            utils.hide(landing);
            setTimeout(() => {
                utils.show(dashboard, 'block');
            }, CONFIG.ANIMATIONS.FADE_DURATION);
        }
    }

    preloadImages() {
        const images = [
            'images/IMG_5262.jpg',
            'images/IMG_5266.jpg',
            'images/IMG_5294.jpg',
            'images/IMG_5295.jpg',
            'images/IMG_5296.jpg',
            'images/IMG_5298.jpg'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// ================= FLOATING HEARTS ANIMATION (CSS) =================
// Add keyframe for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================= START APP =================
const app = new App();

// Expose for debugging
if (typeof window !== 'undefined') {
    window.app = app;
}