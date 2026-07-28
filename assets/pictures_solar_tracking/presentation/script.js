// Presentation Logic

const fisTabTitles = {
    error: { ar: "المدخل الأول: الخطأ (Error)", en: "Input 1: Error" },
    derror: { ar: "المدخل الثاني: مشتقة الخطأ (dError)", en: "Input 2: Error Derivative (dError)" }
};

const fisPlotTitles = {
    error: { ar: "توابع انتماء متغير الخطأ [Error]", en: "Error Variable Membership Functions" },
    derror: { ar: "توابع انتماء متغير مشتقة الخطأ [dError]", en: "dError Variable Membership Functions" }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // Slide Navigation Elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const autoPlayBtn = document.getElementById('autoPlayBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const progressBar = document.getElementById('progressBar');
    const slideCounter = document.getElementById('slideCounter');
    
    // Sidebar Elements
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const navList = document.getElementById('navList');
    
    // State variables
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval = null;
    let isPlaying = false;
    const autoPlaySpeed = 6000; // 6 seconds per slide

    // ===== BILINGUAL DATA =====
    const slideTitlesAr = [
        "شريحة العنوان والترحيب",
        "المقدمة ودوافع المشروع",
        "مكونات النظام الأساسية",
        "مخطط التوصيلات الكهربائية",
        "بنية النظام ومسار الإشارة",
        "توابع الانتماء (FIS MFs)",
        "جدول القواعد الضبابية",
        "معاملات النظام النهائية",
        "المشكلات الفنية والحلول",
        "مقارنة الأداء (قبل وبعد)",
        "الخاتمة وشكر المستمعين"
    ];

    const slideTitlesEn = [
        "Title & Welcome Slide",
        "Introduction & Project Motivation",
        "Core System Components",
        "Circuit Connections Diagram",
        "System Architecture & Signal Path",
        "Membership Functions (FIS MFs)",
        "Fuzzy Rules Table",
        "Final System Parameters",
        "Technical Challenges & Solutions",
        "Performance Comparison (Before/After)",
        "Conclusion & Acknowledgements"
    ];

    const sidebarTitleAr = "محتويات العرض";
    const sidebarTitleEn = "Presentation Contents";

    const archHoverDefaultAr = "مرر الفأرة فوق أي كتلة أعلاه لرؤية وظيفتها الرياضية والعملية بالتفصيل.";
    const archHoverDefaultEn = "Hover over any block above to see its mathematical and functional details.";

    const ruleViewerDefaultAr = "مرر مؤشر الفأرة على إحدى خلايا الجدول لمشاهدة بناء القاعدة الفعلي وطريقة الاستدلال.";
    const ruleViewerDefaultEn = "Hover over any cell in the table to see the actual rule formulation and inference method.";

    const challengeLabelsAr = { title: "اسم المشكلة", type: "النوع", desc: "الظهور والسبب:", sol: "الحل المتبع:" };
    const challengeLabelsEn = { title: "Problem Name", type: "Type", desc: "Occurrence & Cause:", sol: "Solution Applied:" };

    const challengesDataEn = [
        {
            title: "Data Type Error in Simulink Derivative",
            type: "Simulink & Data Types",
            desc: "When building the mathematical model, a 'Data type mismatch' error appeared in the Derivative block. The Sum block outputs uint16 from analog sensor readings, while the Derivative block requires a double operand for mathematical derivation.",
            sol: "A Data Type Conversion (DTC) block was added to convert data types from uint16 to double immediately after the Sum block and before the signal enters the Derivative block."
        },
        {
            title: "Upload Failure to Arduino via COM Port",
            type: "Hardware & Connectivity",
            desc: "MATLAB failed to connect to the board, throwing 'Could not connect to specified Arduino board' despite successful compilation. This was due to incorrect COM port selection in model settings, or COM9 conflict with the 'build_fuzzy_tracker.m' script that rewrites the model and disrupts port connections.",
            sol: "We used the set_param function to set the connection port to the actual Arduino port, worked directly on the solar_new.slx file instead of the disruptive script, and verified connection via the arduino('COMx', 'Uno') function in MATLAB."
        },
        {
            title: "Continuous Servo Oscillation",
            type: "Signal Processing",
            desc: "The servo behavior was unstable, oscillating continuously even with a stationary light source. Caused by very high derivative sensitivity (small DT amplifies noise), unfiltered error signal output, and repeated writing to the servo at the same angle.",
            sol: "1. Added a low-pass filter (LPF α=0.15) to smooth the error. 2. Clamped the derivative range to [-10, 10]. 3. Raised the sample time to 0.25s. 4. Applied an angle tolerance (ANGLE_TOLERANCE=2°) so the servo only updates if the reading changes by more than 2 degrees."
        },
        {
            title: "Slow System Response to Movement",
            type: "Performance Tuning",
            desc: "The system responded very slowly and passively when moving the light. Caused by very high smoothing (ALPHA=0.05) giving a long time constant of approximately 9.5 seconds, combined with a long derivative sample time (DT=0.5s).",
            sol: "Raised the filtering coefficient ALPHA to 0.15 to reduce the time constant to approximately 3 seconds, and reduced the derivative time DT to 0.25s to double the response update speed."
        },
        {
            title: "Low Sensitivity to Distant Light Sources",
            type: "Calibration",
            desc: "The system showed no response or movement when the light source was more than 30cm away. Caused by the small default Gain value (180/1023 ≈ 0.176) which required a massive reading difference between sensors to produce movement.",
            sol: "Raised the Gain for LDR signal difference from 0.176 to 0.45 to enhance sensitivity to dim and distant lights."
        },
        {
            title: "Desynchronization Between Simulink and Arduino Code",
            type: "Code Generation",
            desc: "Different response and behavior of the actual system uploaded to Arduino compared to Simulink simulation despite using the same FIS algorithm, due to differences in gain, error direction, smoothing insertion, angle offsets, and rule orientation.",
            sol: "Performed precise harmonization including: unified gain (0.45), modified error formula, unified sample time (0.25s)."
        },
        {
            title: "RAM Overflow Due to Mamdani",
            type: "Memory Management",
            desc: "Arduino Uno froze or code build failed (Out of memory) when attempting to run a Mamdani-type fuzzy inference model. Arduino Uno has only 2KB of SRAM, while Mamdani requires large memory for Centroid Defuzzification and numerical integration arrays.",
            sol: "This problem was completely solved by switching to the Sugeno zero-order inference model, which features fixed outputs (Singletons) and Weighted Average calculation instead of Centroid, dramatically reducing memory usage with no loss in control accuracy."
        }
    ];

    // Initialize Presentation
    function init() {
        buildSidebarMenu();
        updateSlidePosition();
        setupEventListeners();
        setupArchitectureHovers();
        setupRulesHovers();
        setupChallenges();
    }

    // Build the Sidebar Menu Dynamically
    function buildSidebarMenu() {
        const titles = currentLang === 'ar' ? slideTitlesAr : slideTitlesEn;
        const sidebarH3 = document.querySelector('.sidebar-header h3');
        if (sidebarH3) sidebarH3.textContent = currentLang === 'ar' ? sidebarTitleAr : sidebarTitleEn;
        navList.innerHTML = '';
        titles.forEach((title, index) => {
            const li = document.createElement('li');
            li.classList.add('nav-list-item');
            if (index === currentSlide) li.classList.add('active');
            li.innerHTML = `<span class="english-text" style="color:var(--coral); font-size: 0.75rem; margin-left: 8px;">0${index + 1}</span> ${title}`;
            li.addEventListener('click', () => {
                goToSlide(index);
                toggleSidebar(false);
            });
            navList.appendChild(li);
        });
    }

    // Update Slide States & Progress indicators
    function updateSlidePosition() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update progress bar
        const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Update Counter
        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

        // Update Sidebar Active Class
        const menuItems = document.querySelectorAll('.nav-list-item');
        menuItems.forEach((item, index) => {
            if (index === currentSlide) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // MathJax typeset refresh for math rendering
        if (window.MathJax) {
            window.MathJax.typesetPromise();
        }
    }

    // Go to a specific slide
    function goToSlide(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        updateSlidePosition();
        if (isPlaying) {
            resetAutoPlay();
        }
    }

    // Slide navigation functions
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto Play Logic
    function toggleAutoPlay() {
        if (isPlaying) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    }

    function startAutoPlay() {
        isPlaying = true;
        autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        autoPlayBtn.style.background = 'var(--primary-red)';
        autoPlayInterval = setInterval(nextSlide, autoPlaySpeed);
    }

    function stopAutoPlay() {
        isPlaying = false;
        autoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        autoPlayBtn.style.background = '';
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, autoPlaySpeed);
    }

    // Sidebar Toggle
    function toggleSidebar(show) {
        if (show) {
            sidebar.classList.add('open');
        } else {
            sidebar.classList.remove('open');
        }
    }

    // Fullscreen Toggle
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            }).catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }

    // Event Listeners Configuration
    function setupEventListeners() {
        // Button actions
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        autoPlayBtn.addEventListener('click', toggleAutoPlay);
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        menuBtn.addEventListener('click', () => toggleSidebar(true));
        closeSidebar.addEventListener('click', () => toggleSidebar(false));

        // Keyboard actions
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'PageDown') {
                prevSlide(); // Right arrow goes to previous slide in RTL layout
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === ' ') {
                nextSlide(); // Left arrow or Space goes to next slide in RTL layout
            } else if (e.key === 'Home') {
                goToSlide(0);
            } else if (e.key === 'End') {
                goToSlide(totalSlides - 1);
            } else if (e.key === 'Escape') {
                toggleSidebar(false);
            }
        });

        // Close sidebar by clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains('open')) {
                toggleSidebar(false);
            }
        });
    }

    // Slide 4: Interactive Architecture Diagram Hovers
    function setupArchitectureHovers() {
        const blocks = document.querySelectorAll('.arch-block');
        const infoBox = document.getElementById('blockInfoBox');
        
        blocks.forEach(block => {
            block.addEventListener('mouseenter', () => {
                const infoText = currentLang === 'ar' ? block.getAttribute('data-info') : (block.getAttribute('data-info-en') || block.getAttribute('data-info'));
                infoBox.innerHTML = `
                    <i class="fas fa-info-circle text-coral"></i>
                    <strong>${block.querySelector('h4').textContent}:</strong> ${infoText}
                `;
                infoBox.classList.add('interactive-card');
                infoBox.style.borderColor = 'var(--coral)';
            });
            
            block.addEventListener('mouseleave', () => {
                const defaultText = currentLang === 'ar' ? archHoverDefaultAr : archHoverDefaultEn;
                infoBox.innerHTML = `
                    <i class="fas fa-info-circle text-coral"></i>
                    <span>${defaultText}</span>
                `;
                infoBox.classList.remove('interactive-card');
                infoBox.style.borderColor = '';
            });
        });
    }

    // Slide 6: Fuzzy Rules hover effect
    function setupRulesHovers() {
        const cells = document.querySelectorAll('.rule-cell');
        const ruleDisplay = document.getElementById('ruleTextDisplay');
        const ruleBox = document.getElementById('ruleViewer');
        
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', () => {
                const ruleFormula = cell.getAttribute('data-rule');
                const outVal = cell.getAttribute('data-output');
                
                ruleDisplay.innerHTML = `
                    <div style="margin-bottom: 5px;"><span class="badge">Rule Selected</span></div>
                    <div style="font-size: 1.05rem; color: #fff;">${ruleFormula}</div>
                    <div class="text-small text-muted mt-5">Defuzzified Singleton Output: <strong class="text-coral">${outVal}</strong></div>
                `;
                ruleBox.style.borderColor = 'var(--gold)';
                ruleBox.style.background = 'rgba(255, 215, 0, 0.05)';
            });
            
            cell.addEventListener('mouseleave', () => {
                const defaultText = currentLang === 'ar' ? ruleViewerDefaultAr : ruleViewerDefaultEn;
                ruleDisplay.innerHTML = defaultText;
                ruleBox.style.borderColor = 'var(--coral)';
                ruleBox.style.background = 'rgba(255, 77, 77, 0.04)';
            });
        });
    }

    // Slide 8: Challenges and Solutions Logic
    const challengesDataAr = [
        {
            title: "خطأ نوع البيانات في مشتقة Simulink",
            type: "Simulink & Data Types",
            desc: "عند بناء النموذج الرياضي، ظهر خطأ 'Data type mismatch' في كتلة Derivative. والسبب في ذلك أن كتلة Sum تخرج نوع بيانات uint16 من القراءات التناظرية لحساسات Analog Input، بينما تتطلب كتلة Derivative معامل من نوع double للقيام بالاشتقاق الرياضي.",
            sol: "تمت إضافة كتلة Data Type Conversion (DTC) لتحويل نوع البيانات من uint16 إلى double مباشرة بعد كتلة Sum وقبل إدخال الإشارة إلى كتلة Derivative."
        },
        {
            title: "فشل رفع الكود إلى لوحة Arduino عبر منفذ COM",
            type: "Deployment & Setup",
            desc: "فشل MATLAB في الاتصال باللوحة مخرجاً خطأ 'Could not connect to specified Arduino board' رغم نجاح التجميع. ويرجع ذلك إلى عدم تحديد منفذ الـ COM بشكل صحيح في إعدادات النموذج، أو تضارب COM9 مع دالة 'build_fuzzy_tracker.m' التي تعيد كتابة النموذج وتخرب منافذ الاتصال.",
            sol: "قمنا باستخدام دالة set_param لضبط منفذ الاتصال بالمنفذ الفعلي للأردوينو، واعتمدنا العمل مباشرة على ملف solar_new.slx بدلاً من السكريبت التخريبي، وتم التحقق من الاتصال عبر دالة arduino('COMx', 'Uno') في الماتلاب."
        },
        {
            title: "اهتزاز السيرفو المستمر (Servo Oscillation)",
            type: "Control & Mechanics",
            desc: "سلوك السيرفو غير مستقر ويهتز باستمرار حتى في حالة ثبات مصدر الضوء. وسببه حساسية المشتقة العالية جداً (DT صغير يضخم الضوضاء) وخروج إشارة الخطأ مباشرة دون أي تصفية، مع تكرار الكتابة للسيرفو عند نفس الزاوية.",
            sol: "1. قمنا بإدخال مرشح تمرير منخفض (LPF α=0.15) لتمليس الخطأ. 2. تحديد مدى مشتقة الخطأ بـ [-10, 10]. 3. رفع زمن العينة لـ 0.25s. 4. تطبيق حد سماحية (ANGLE_TOLERANCE=2°) بحيث لا يتم تحديث حركة السيرفو إلا إذا تغيرت القراءة بأكثر من درجتين."
        },
        {
            title: "بطء استجابة النظام للحركة",
            type: "Performance tuning",
            desc: "النظام يستجيب ببطء شديد وبشكل خامل عند نقل الضوء. سببه استخدام تمليس عالي جداً (ALPHA=0.05) مما يعطي ثابتاً زمنياً طويلاً يقارب 9.5 ثوانٍ، بالإضافة إلى زمن عينة مشتقة طويل (DT=0.5s).",
            sol: "رفع قيمة معامل التصفية ALPHA إلى 0.15 لتقليل الثابت الزمني إلى 3 ثوانٍ تقريباً، وخفض زمن المشتقة DT إلى 0.25s لتسريع تحديث الاستجابة بمقدار الضعف."
        },
        {
            title: "ضعف حساسية النظام لمصدر الضوء البعيد",
            type: "Sensor calibration",
            desc: "النظام لا يظهر أي استجابة أو حركة عندما يكون مصدر الضوء على بعد أكثر من 30 سم. سببه صغر قيمة الكسب (Gain) الافتراضية والتي كانت (180/1023 ≈ 0.176) مما يتطلب فرق قراءة ضخم بين الحساسين لإحداث حركة.",
            sol: "رفع قيمة الكسب (Gain) لفرق إشارات LDRs من 0.176 إلى 0.45 لتعزيز الحساسية للأضواء الخافتة والبعيدة."
        },
        {
            title: "عدم المزامنة بين Simulink وكود Arduino",
            type: "Model-to-Code Alignment",
            desc: "اختلاف استجابة وسلوك النظام الفعلي المرفوع على الأردوينو عما تظهره محاكاة Simulink رغم استخدام نفس خوارزمية FIS بسبب اختلافات في الكسب، اتجاه الخطأ، إدراج التمليس، زوايا التعويض، وتوجيه القواعد.",
            sol: "قمنا بعملية مواءمة دقيقة شملت: توحيد الكسب (0.45)، تعديل صيغة الخطأ، توحيد زمن العينة (0.25s)."
        },
        {
            title: "امتلاء ذاكرة RAM بسبب Mamdani",
            type: "Memory Optimization",
            desc: "تجمّد متحكم Arduino Uno أو فشل عملية بناء الكود (Out of memory) عند محاولة تشغيل نموذج استدلال ضبابي من نوع Mamdani. والسبب أن Arduino Uno يمتلك ذاكرة عشوائية (SRAM) محدودة جداً حجمها 2 كيلوبايت فقط، بينما يتطلب محرك Mamdani مساحة ذاكرة كبيرة لحساب مركز الثقل (Centroid Defuzzification) وتخزين مصفوفات التكامل العددي.",
            sol: "تم حل هذه المشكلة بالكامل عن طريق التحول إلى نموذج الاستدلال Sugeno zero-order، والذي يتميز بمخرجات ثابتة (Singletons) وحساب المعدل الموزون (Weighted Average) بدلاً من مركز الثقل، مما وفر في استهلاك الذاكرة بشكل هائل ودون أي خسارة في دقة التحكم."
        }
    ];

    function setupChallenges() {
        const navContainer = document.getElementById('challengesNav');
        navContainer.innerHTML = '';

        const data = currentLang === 'ar' ? challengesDataAr : challengesDataEn;

        data.forEach((item, index) => {
            const btn = document.createElement('div');
            btn.classList.add('chal-nav-item');
            if (index === 0) btn.classList.add('active');
            
            btn.innerHTML = `
                <span>${item.title}</span>
                <span class="nav-id">#0${index + 1}</span>
            `;
            
            btn.addEventListener('click', () => {
                // Remove active classes
                document.querySelectorAll('.chal-nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update challenge content
                displayChallenge(index);
            });
            
            navContainer.appendChild(btn);
        });

        // Display first challenge initially
        displayChallenge(0);
    }

    function displayChallenge(index) {
        const data = currentLang === 'ar' ? challengesDataAr : challengesDataEn;
        const labels = currentLang === 'ar' ? challengeLabelsAr : challengeLabelsEn;
        const item = data[index];
        document.getElementById('chalTitle').textContent = item.title;
        document.getElementById('chalType').textContent = item.type;
        document.getElementById('chalDesc').textContent = item.desc;
        document.getElementById('chalSol').textContent = item.sol;
    }

    // ===== BILINGUAL TOGGLE =====
    let currentLang = localStorage.getItem('solar-lang') || 'ar';

    window.toggleLang = function() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('solar-lang', currentLang);
        applyLanguage();
    };

    function applyLanguage() {
        const html = document.documentElement;
        html.setAttribute('lang', currentLang === 'ar' ? 'ar' : 'en');
        html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

        document.title = document.querySelector('title').getAttribute('data-' + currentLang);
        document.getElementById('langLabel').textContent = currentLang === 'ar' ? 'EN' : 'AR';

        // Static elements
        document.querySelectorAll('[data-ar][data-en]').forEach(el => {
            const val = el.getAttribute('data-' + currentLang);
            if (val !== null) {
                if (val.includes('<') && val.includes('>')) {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            }
        });

        document.querySelectorAll('[data-ar-aria][data-en-aria]').forEach(el => {
            el.setAttribute('aria-label', el.getAttribute('data-' + currentLang + '-aria'));
        });

        document.querySelectorAll('[data-ar-title][data-en-title]').forEach(el => {
            el.setAttribute('title', el.getAttribute('data-' + currentLang + '-title'));
        });

        // Dynamic elements
        buildSidebarMenu();
        setupChallenges();
        if (typeof setupArchitectureHovers === 'function') setupArchitectureHovers();
        if (typeof setupRulesHovers === 'function') setupRulesHovers();

        // MathJax re-render
        if (window.MathJax && window.MathJax.typesetPromise) {
            setTimeout(() => window.MathJax.typesetPromise(), 50);
        }
    }

    // Run initialization
    applyLanguage();
    init();
});

// Image fullscreen viewer
function openFullscreen(img) {
    const overlay = document.createElement('div');
    overlay.className = 'img-fullscreen-overlay';
    overlay.innerHTML = `<span class="img-fullscreen-close">&times;</span><img src="${img.src}" class="img-fullscreen-content">`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
}

// FIS tabs switching
function switchFisTab(tab) {
    const errorTab = document.getElementById('errorSvg');
    const derrorTab = document.getElementById('derrorSvg');
    const errorDetails = document.getElementById('errorDetails');
    const derrorDetails = document.getElementById('derrorDetails');
    const plotTitle = document.getElementById('fisPlotTitle');
    const buttons = document.querySelectorAll('.tab-btn');

    const currentLang = localStorage.getItem('solar-lang') || 'ar';

    buttons.forEach(btn => btn.classList.remove('active'));

    if (tab === 'error') {
        errorTab.classList.remove('hidden');
        derrorTab.classList.add('hidden');
        errorDetails.classList.remove('hidden');
        derrorDetails.classList.add('hidden');
        plotTitle.textContent = fisPlotTitles.error[currentLang];
        buttons[0].classList.add('active');
    } else {
        errorTab.classList.add('hidden');
        derrorTab.classList.remove('hidden');
        errorDetails.classList.add('hidden');
        derrorDetails.classList.remove('hidden');
        plotTitle.textContent = fisPlotTitles.derror[currentLang];
        buttons[1].classList.add('active');
    }
}
