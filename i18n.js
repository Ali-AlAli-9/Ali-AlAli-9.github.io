/* Simple EN / AR switcher for the static portfolio.
   Arabic values may contain HTML so inline markup and links are preserved. */
(function () {
  const ar = {
    "Skip to content": "تخطَّ إلى المحتوى",
    "Project screenshot gallery": "معرض لقطات المشروع",
    "Ali Al-Ali": "علي العلي",
    "Work": "العمل",
    "About": "نبذة",
    "Skills": "المهارات",
    "Process": "المنهجية",
    "Let's talk": "لنتواصل",
    "Main navigation": "التنقل الرئيسي",

    "Hello, I'm Ali Al-Ali": "مرحباً، أنا علي العلي",
    "AI Engineer & Python Backend Developer.": "مهندس ذكاء اصطناعي ومطوّر خلفية بلغة Python.",
    "AI Engineer | Backend Engineer (Python) | Django & IoT": `مهندس ذكاء اصطناعي <span class="separator">|</span> مهندس خلفية (Python) <span class="separator">|</span> Django وإنترنت الأشياء`,
    "I design AI features and the Python services behind them — RAG assistants, computer-vision pipelines, Django APIs, and real-time integrations with embedded and IoT systems.": "أصمم ميزات الذكاء الاصطناعي وخدمات Python التي تدعمها — مساعدات RAG، مسارات الرؤية الحاسوبية، واجهات Django، وتكاملات فورية مع الأنظمة المدمجة وإنترنت الأشياء.",
    "View selected work": "شاهد أعمالي",
    "Start a project": "ابدأ مشروعاً",
    "At a glance": "نظرة سريعة",
    "Portfolio at a glance": "نظرة سريعة على البورتوفوليو",
    "Featured projects": "مشاريع مختارة",
    "Technical domains": "مجالات تقنية",
    "Projects in production": "مشروعين في البرودكشن",
    "Tested projects": "مشاريع مزوّدة بالاختبارات",

    "01 Selected work": `<span>01</span> أعمال مختارة`,
    "Featured projects, with the details.": "مشاريع مختارة، مع كل التفاصيل.",
    "A selection of web platforms, AI systems, and embedded projects from my portfolio — with screenshots, notes on the approach, and links to the source where available.": "مجموعة من منصات الويب وأنظمة الذكاء الاصطناعي والمشاريع المدمجة من بورتوفوليوي — مع لقطات شاشة وملاحظات عن المنهجية وروابط للمصدر حيث تتوفر.",
    "Admin": "الإدارة",
    "User": "المستخدم",
    "Basic": "أساسي",
    "9 photos": "9 صور",
    "8 photos": "8 صور",
    "4 photos": "4 صور",
    "2 photos": "صورتان",
    "10 photos": "10 صور",

    "Web / Full-stack": "ويب / متكامل",
    "Full-featured e-commerce platform built with Django REST API and React. Features include product catalog with advanced search and filtering, complete cart management, order lifecycle (pending → confirmed → shipped → delivered), admin dashboard with sales analytics and low-stock alerts. JWT authentication with token rotation, email verification, and Dockerized deployment. 98+ tests across the entire stack.": `منصة تجارة إلكترونية متكاملة مبنية بـ Django REST API و React. تشمل كتالوج منتجات مع بحث وتصفية متقدمين، إدارة سلة كاملة، دورة حياة الطلبات (قيد الانتظار → مؤكد → تم الشحن → تم التسليم)، لوحة إدارة بتحليلات المبيعات وتنبيهات انخفاض المخزون. مصادقة JWT مع تدوير الرموز، تحقق عبر البريد الإلكتروني، ونشر عبر Docker. <strong>أكثر من 98 اختباراً</strong> تغطي كامل الحزمة.`,
    "Disclaimer: Demo application for portfolio purposes only. All products, prices, and transactions shown are fictional. No real payments are processed.": `تنويه: تطبيق تجريبي لأغراض البورتوفوليو فقط. جميع المنتجات والأسعار والمعاملات المعروضة خيالية، ولا تتم معالجة مدفوعات حقيقية.`,

    "Eye AI Surveillance": "مراقبة العين بالذكاء الاصطناعي",
    "AI / Real-time": "ذكاء اصطناعي / في الوقت الفعلي",
    "Real-time AI surveillance system running on Uvicorn ASGI server with Django Channels WebSockets. YOLOv8 object detection + ByteTrack tracking + facenet-pytorch face recognition (MTCNN + InceptionResnetV1). Camera feed → motion detection → YOLOv8 → face recognition → WebSocket live stream → Django dashboard with automatic alerts. DB resilience (graceful degradation on connection loss), Supabase cloud support, auto-cleanup (48h data retention), brute force protection (5 attempts → 15 min lockout), CSP headers, audit logging. Manual engine start/stop from admin dashboard.": "نظام مراقبة بالذكاء الاصطناعي يعمل في الوقت الفعلي على خادم Uvicorn ASGI مع Django Channels و WebSockets. كشف الأجسام بـ YOLOv8 + تتبع ByteTrack + التعرف على الوجوه بـ facenet-pytorch (MTCNN + InceptionResnetV1). بث الكاميرا → كشف الحركة → YOLOv8 → التعرف على الوجوه → بث مباشر عبر WebSocket → لوحة Django مع تنبيهات تلقائية. مرونة قاعدة البيانات (تعامل رشيق عند انقطاع الاتصال)، دعم Supabase السحابي، تنظيف تلقائي (احتفاظ بالبيانات 48 ساعة)، حماية من التخمين (5 محاولات → قفل 15 دقيقة)، ترويسات CSP، وتسجيل تدقيق. تشغيل وإيقاف المحرك يدوياً من لوحة الإدارة.",
    "Closed system — only accounts created by the admin (staff) can access the dashboard.": `<strong>نظام مغلق</strong> — يمكن فقط للحسابات التي ينشئها المسؤول (الفريق) الوصول إلى لوحة التحكم.`,

    "Document Assistant": "مساعد المستندات",
    "AI / RAG": "ذكاء اصطناعي / RAG",
    "Upload PDF, DOCX, or TXT and ask questions in Arabic — get answers grounded in your documents. The system extracts text, creates embeddings, and uses an LLM to answer. Multi-document RAG with per-document retrieval for diverse coverage. Supports Ollama (fully offline, privacy-first) and Gemini (cloud). Real-time streaming responses via SSE. Clean Architecture with dependency injection, Arabic-first UI with full RTL support, prompt injection protection, and corruption recovery. Docker-ready.": `ارفع ملف PDF أو DOCX أو TXT واطرح أسئلة بالعربية — احصل على إجابات مستندة إلى مستنداتك. يستخرج النظام النصوص، ينشئ تضمينات، ويستخدم نموذجاً لغوياً للإجابة. توليد معزز بالاسترجاع (RAG) متعدد المستندات مع استرجاع لكل مستند لتغطية أوسع. يدعم Ollama (محلي بالكامل وصريح الخصوصية) و Gemini (سحابي). إجابات متدفقة في الوقت الفعلي عبر SSE. معمارية نظيفة مع حقن التبعيات، واجهة عربية بالكامل مع دعم RTL، حماية من حقن الأوامر، وتعافٍ من التلف. <strong>جاهز لـ Docker.</strong>`,

    "Clinic Agent — AI Voice Appointment System": "عميل العيادة — نظام حجوزات صوتي بالذكاء الاصطناعي",
    "AI / Messaging": "ذكاء اصطناعي / المراسلة",
    "Try it live on Telegram: @clinic33bot": `<span>جرّبه مباشرة على تيليجرام:</span> <strong>@clinic33bot</strong>`,
    "Note: after your first message, please allow about a minute while the free hosting wakes up.": "ملاحظة: بعد رسالتك الأولى، انتظر نحو دقيقة حتى يستيقظ الاستضافة المجانية.",
    "Multichannel AI booking agent for medical clinics that lets patients book, cancel, and manage appointments by texting or speaking in natural language — all through the messaging apps they already use. The patient sends *\"Book me with Dr. Sara tomorrow at 10\"* and the assistant handles the rest.": `<strong>وكيل حجوزات ذكي متعدد القنوات للعيادات الطبية</strong> يتيح للمرضى الحجز والإلغاء وإدارة المواعيد بالكتابة <em>أو التحدث</em> بلغة طبيعية — عبر تطبيقات المراسلة التي يستخدمونها بالفعل. يرسل المريض مثلاً "احجز لي مع د. سارة غداً الساعة 10" ويتولى المساعد الباقي.`,
    "Key Features & Services": "الميزات والخدمات الرئيسية",
    "Natural-language booking: full three-part name, doctor conflict checks, per-doctor working hours, past dates rejected, and a forward booking window — at most 2 upcoming appointments per account inside the next 30 days, so expired bookings never block a new one (admins exempt).": `<strong>حجز بلغة طبيعية:</strong> اسم كامل من ثلاثة أجزاء، فحص تعارض الطبيب، ساعات عمل لكل طبيب، رفض التواريخ الماضية، ونافذة حجز للأمام — بحد أقصى موعدان قادمان لكل حساب خلال 30 يوماً، حتى لا تحجب الحجوزات المنتهية حجزاً جديداً (المسؤولون مستثنون).`,
    "Voice-first support: patients send a voice note → transcribed by Google's newest Gemini, the same model the agent itself runs on → the reply comes back as a clear audio message (free Edge TTS, Jordanian female Fusha voice) or as text. Text is the default; once the patient asks for voice, every later reply stays voice until they switch back, and the TTS client retries transient network failures instead of dropping the audio.": `<strong>دعم صوتي أولاً:</strong> يرسل المريض رسالة صوتية → تُفرَّغ بواسطة أحدث نماذج Gemini من Google، وهو نفسه النموذج الذي يشغّل الوكيل → تصدر الإجابة رسالة صوتية واضحة (Edge TTS مجاني، صوت فصحى نسائي أردني) أو نصاً. النص هو الافتراضي؛ وإذا طلب المريض الصوت تستمر الردود الصوتية حتى يرجع للنص، ويعيد عميل TTS المحاولات عند أعطال الشبكة بدل إسقاط الصوت.`,
    "Multichannel: Telegram and WhatsApp through one unified gateway — switch with a single .env line.": `<strong>متعدد القنوات:</strong> تيليجرام وواتساب عبر بوابة موحدة — التبديل بسطر واحد في ملف <code>.env</code>.`,
    "Full lifecycle: cancel by description with explicit confirmation, upcoming list, and a searchable archive.": "<strong>دورة حياة كاملة:</strong> إلغاء بالوصف مع تأكيد صريح، قائمة المواعيد القادمة، وأرشيف قابل للبحث.",
    "Tasks & reminders: add, list, and complete user tasks.": "<strong>المهام والتذكيرات:</strong> إضافة وعرض وإكمال مهام المستخدم.",
    "Admin toolkit (via chat): view any doctor's bookings, delete (day / hour-range / single / per account), block & unblock users, and broadcast or message specific accounts.": "<strong>أدوات المسؤول (عبر الدردشة):</strong> عرض حجوزات أي طبيب، حذف (يوم / نطاق ساعات / موعد واحد / لكل حساب)، حظر وإلغاء حظر المستخدمين، وإرسال رسائل جماعية أو لمستخدمين بعينهم.",
    "Human hand-off: when the patient asks for a person, every admin receives an instant notification with the patient's name and a tap-to-open link to the chat — raw account numbers are never exposed.": "<strong>تحويل إلى بشر:</strong> عندما يطلب المريض شخصاً، يتلقى كل مسؤول إشعاراً فورياً باسم المريض ورابط لفتح المحادثة — دون كشف أرقام الحسابات الخام.",
    "Security & Privacy": "الأمان والخصوصية",
    "Medical notes encrypted with Fernet at rest — private data never appears in plaintext.": "<strong>ملاحظات طبية مشفرة</strong> بـ Fernet أثناء التخزين — لا تظهر البيانات الخاصة كنص عادي.",
    "Admin identity is server-side and un-spoofable, plus a server-side per-account daily cap to protect the AI quota.": "<strong>هوية المسؤول من جهة الخادم</strong> ولا يمكن انتحالها، مع حد يومي لكل حساب على الخادم لحماية حصة الذكاء الاصطناعي.",
    "Signed Telegram webhook (secret in the URL path) and HMAC-verified WhatsApp webhook — unauthenticated requests are rejected before touching the system.": "<strong>webhook تيليجرام موقّع</strong> (السر في مسار الرابط) و<strong>webhook واتساب موثّق بـ HMAC</strong> — تُرفض الطلبات غير المصرح بها قبل لمس النظام.",
    "Brute-force protection on the admin panel (5 failed logins → 30-minute lockout) via django-axes.": "<strong>حماية من التخمين</strong> على لوحة الإدارة (5 محاولات فاشلة → قفل 30 دقيقة) عبر django-axes.",
    "Rate limiting + message dedup on every message through the unified gateway; media handled fully in-memory (never written to disk).": "<strong>تحديد معدل الطلبات وإزالة التكرار</strong> لكل رسالة عبر البوابة الموحدة؛ تُعالج الوسائط في الذاكرة بالكامل (دون كتابتها على القرص).",
    "Demo project for portfolio purposes — all patient names and appointments shown are fictional.": `<i class="fas fa-info-circle"></i> مشروع تجريبي لأغراض البورتوفوليو — جميع أسماء المرضى والمواعيد المعروضة خيالية.`,

    "IoT Home Control via Telegram": "تحكم المنزل عبر تيليجرام",
    "IoT / Embedded": "إنترنت الأشياء / أنظمة مدمجة",
    "ESP8266 (NodeMCU) based system for remote control of home appliances through Telegram Bot API. Controls relays for lights and fans, integrates flame sensor for fire detection with real-time alerts. Secure HTTPS communication with SSL/TLS, interactive inline keyboards, periodic polling for commands. Cost-effective and expandable smart home solution.": "نظام قائم على ESP8266 (NodeMCU) للتحكم عن بُعد في أجهزة المنزل عبر Telegram Bot API. يتحكم في مرحلات الإضاءة والمراوح، ويتكامل مع مستشعر لهب للكشف عن الحريق بتنبيهات في الوقت الفعلي. اتصال HTTPS آمن مع SSL/TLS، لوحات مفاتيح تفاعلية، واستطلاع دوري للأوامر. حل ذكي اقتصادي قابل للتوسع.",
    "A detailed presentation with circuit diagrams, component explanations, and the complete Arduino source code is available. View Presentation": `<i class="fas fa-info-circle"></i> تتوفر عرض تقديمي مفصل يتضمن مخططات الدائرة وشرح المكونات والكود الكامل لـ Arduino. <a href="iot-presentation/index.html" target="_blank" rel="noopener noreferrer" style="color:var(--accent-text);font-weight:600;text-decoration:underline;">عرض العرض التقديمي</a>`,
    "A detailed academic presentation for this project is available — includes methodology, Simulink model, circuit design, and results. Click on Presentation": `<i class="fas fa-info-circle"></i> يتوفر عرض أكاديمي مفصل لهذا المشروع — يشمل المنهجية ونموذج Simulink وتصميم الدائرة والنتائج. <a href="assets/pictures_solar_tracking/presentation/index.html" target="_blank" rel="noopener noreferrer" style="color:var(--accent-text);font-weight:600;text-decoration:underline;">اطّلع على العرض</a>`,

    "Smart Solar Tracker": "متعقب شمسي ذكي",
    "Embedded / Control": "مدمج / تحكم",
    "Sugeno fuzzy logic-based solar panel tracking system. Designed and modeled in MATLAB/Simulink with a custom 15-rule fuzzy inference engine, then auto-generated to C via Embedded Coder and deployed on Arduino Uno. Hand-optimized Arduino sketch with no external libraries featuring LDR-based light sensing, low-pass filtering, and smooth-step servo control — reducing response time from 9.5s to 3s.": "نظام تتبع للألواح الشمسية قائم على المنطق الضبابي من نوع Sugeno. صُمم ونُمذج في MATLAB/Simulink بمحرك استدلال ضبابي مخصص بـ 15 قاعدة، ثم وُلّد الكود تلقائياً إلى C عبر Embedded Coder ونُشر على Arduino Uno. رسم Arduino مُحسَّن يدوياً دون مكتبات خارجية، مع استشعار الضوء عبر LDR وترشيح تمرير منخفض وتحكم سلس بالمحرك — خفض زمن الاستجابة من 9.5 ثانية إلى 3 ثوانٍ.",

    "Employee AI Search": "البحث الذكي للموظفين",
    "AI / Internal Search": "ذكاء اصطناعي / بحث داخلي",
    "An internal, Arabic-first search engine for employee documents: upload PDF, DOCX, Markdown or TXT files, index them locally, and get answers with source-and-page citations in Arabic and English. Hybrid BM25 + vector retrieval gives every document its own top-K slot before results are merged, then reranks and expands sections; the query cache is invalidated on each upload or delete. When the evidence is weak, it says it couldn't find an answer instead of inventing one.": "محرك بحث داخلي للمستندات يولي العربية أولويته: ارفع ملفات PDF أو DOCX أو Markdown أو TXT، وفهرسها محلياً، واحصل على إجابات مع مراجع تذكر الملف والصفحة بالعربية والإنجليزية. استرجاع هجين (BM25 + متجهات) يمنح كل مستند حصته من أفضل النتائج قبل دمجها، ثم يعيد ترتيبها ويوسّع الأقسام؛ ويُبطل التخزين المؤقت مع كل رفع أو حذف. وعند ضعف الأدلة يقول إنه لم يجد إجابة بدل اختلاق واحدة.",
    "FastAPI backend behind a Next.js 14 RTL interface with a same-origin proxy. Workspaces isolate every document, chunk, query and user list, with invite-code registration, owner/admin/member/viewer roles, Supabase Auth, encrypted per-workspace AI keys and bring-your-own-key support. Files above 4 MB are uploaded in checksum-verified chunks, and citations use real PDF page labels rather than numbers guessed from the text. 230 backend tests + 40 frontend tests.": "خلفية FastAPI مع واجهة Next.js 14 عربية RTL ووكيل من نفس المصدر. تعزل مساحات العمل كل مستند ومقطع واستعلام وقائمة مستخدمين، مع تسجيل برمز دعوة وأدوار المالك العام والمسؤول والعضو والمشاهد ومصادقة Supabase ومفاتيح ذكاء اصطناعي مشفرة لكل مساحة عمل ودعم مفاتيح المستخدم الخاصة. الملفات الأكبر من 4 ميجابايت تُرفع على دفعات متحقق من مجموعها الاختباري، وتستند المراجع إلى تسميات صفحات PDF الحقيقية لا إلى أرقام مستنتجة من النص. 230 اختباراً للخلفية + 40 اختباراً للواجهة.",
    "Live app": "التطبيق المباشر",

    "View on GitHub": "عرض على GitHub",
    "Presentation": "العرض التقديمي",
    "Source Code": "الكود المصدري",

    "02 About me": `<span>02</span> نبذة عني`,
    "AI engineer and Python backend developer.": "مهندس ذكاء اصطناعي ومطوّر خلفية بلغة Python.",
    "I'm Ali Al-Ali, an AI engineer and Python backend developer with a Computer Engineering background.": "أنا علي العلي، مهندس ذكاء اصطناعي ومطوّر خلفية بلغة Python، بخلفية في هندسة الحاسوب.",
    "My work connects intelligent features with reliable services: RAG assistants and computer vision on one side, Django APIs, streaming services, and microcontroller-based systems on the other. I handle the backend, the integration, and the interfaces that make the work easy to review.": "يربط عملي بين الميزات الذكية والخدمات الموثوقة: مساعدات RAG والرؤية الحاسوبية من جهة، وواجهات Django وخدمات البث الفوري والأنظمة المعتمدة على المتحكمات الدقيقة من جهة أخرى. أتعامل مع الخلفية والتكامل والواجهات التي تجعل العمل سهل المراجعة.",
    "Focus": "التركيز",
    "AI web apps & IoT systems": "تطبيقات ذكية وإنترنت الأشياء",
    "Background": "الخلفية",
    "Computer Engineering": "هندسة الحاسوب",
    "Stack": "الأدوات",

    "03 Toolkit": `<span>03</span> الأدوات`,
    "The tools I reach for.": "الأدوات التي أستخدمها.",
    "Selected around the problem and the team that will maintain it — not stacked for keywords.": "اختيرت بحسب المشكلة والفريق الذي سيحافظ عليها — لا تراكمًا للكلمات المفتاحية.",
    "Software Development": "تطوير البرمجيات",
    "AI & Computer Vision": "الذكاء الاصطناعي والرؤية الحاسوبية",
    "Databases & DevOps": "قواعد البيانات و DevOps",
    "Embedded Systems & IoT": "الأنظمة المدمجة وإنترنت الأشياء",
    "Fuzzy Logic": "المنطق الضبابي",
    "Embedded C": "C المدمجة",

    "04 How I approach projects": `<span>04</span> منهجيتي في المشاريع`,
    "Understand, build, document.": "أفهم، أبني، وأوثّق.",
    "Understand the problem": "افهم المشكلة",
    "I start from the users, the workflow, and the constraints, then decide what the first working version needs to prove.": "أبدأ من المستخدمين وسير العمل والقيود، ثم أحدد ما يحتاج إليه الإصدار الأول الفعلي لإثباته.",
    "Build and test": "ابنَ واختبر",
    "I implement the backend, integrations, and interfaces in stages, checking each part with tests or a working demo.": "أنفّذ الخلفية والتكاملات والواجهات على مراحل، وأتحقق من كل جزء باختبارات أو نسخة تجريبية تعمل.",
    "Document the result": "وثّق النتيجة",
    "Screenshots, setup notes, and source code are collected with each project so the work is easy to review.": "تُجمع لقطات الشاشة وملاحظات الإعداد والكود المصدري مع كل مشروع ليسهل مراجعة العمل.",
    "Django & DRF APIs": "واجهات Django و DRF",
    "Real-time WebSockets / SSE": "WebSockets و SSE في الوقت الفعلي",
    "Computer vision pipelines": "مسارات الرؤية الحاسوبية",
    "RAG & LLM agents": "وكلاء RAG والنماذج اللغوية",
    "IoT firmware & dashboards": "برمجة إنترنت الأشياء ولوحات التحكم",
    "Docker setup": "إعداد Docker",
    "Areas covered in these projects": "المجالات التي تغطيها هذه المشاريع",

    "05 Get in touch": `<span>05</span> تواصل معي`,
    "Let's Connect": `<span class="highlight">لنتواصل</span>`,
    "Interested in collaborating or have a project in mind? Reach out on GitHub.": "هل لديك فكرة تعاون أو مشروع؟ تواصل معي عبر GitHub.",
    "Browse the work again": "تصفّح الأعمال مجدداً",
    "© 2026 Ali Al-Ali. Built with": `© 2026 علي العلي. صُنع بـ <i class="fas fa-heart" style="color: var(--accent);" aria-hidden="true"></i>`
  };

  const ariaAr = {
    "Toggle color theme": "تبديل وضع الألوان",
    "Main navigation": "التنقل الرئيسي",
    "Portfolio at a glance": "نظرة سريعة على البورتوفوليو",
    "Close gallery": "إغلاق المعرض",
    "Previous screenshot": "اللقطة السابقة",
    "Next screenshot": "اللقطة التالية",
    "GitHub profile": "ملف GitHub",
    "Open menu": "فتح القائمة",
    "Close menu": "إغلاق القائمة"
  };

  const saved = localStorage.getItem('portfolio-lang');
  let lang = saved === 'ar' ? 'ar' : 'en';
  const originals = new Map();

  const norm = (s) => s.replace(/\s+/g, ' ').trim();

  window.i18nText = function (text) {
    return lang === 'ar' ? (ar[text] || text) : text;
  };

  function setAriaAttributes(toAr) {
    document.querySelectorAll('[aria-label]').forEach(el => {
      const key = el.getAttribute('aria-label');
      const clean = norm(key);
      if (toAr && ariaAr[clean]) {
        if (!el.dataset.ariaOriginal) el.dataset.ariaOriginal = key;
        el.setAttribute('aria-label', ariaAr[clean]);
      } else if (!toAr && el.dataset.ariaOriginal) {
        el.setAttribute('aria-label', el.dataset.ariaOriginal);
        delete el.dataset.ariaOriginal;
      }
    });
  }

  function apply(target) {
    lang = target;
    if (target === 'ar') {
      const skip = '.project-gallery, .gallery-tab-content, .gallery-main';
      document.querySelectorAll('body *').forEach(el => {
        if (el.matches(skip) || el.matches('.logo') || el.closest('.logo') || el.closest('[data-tr-done]')) return;
        const key = norm(el.textContent);
        let value = ar[key];
        if (key === 'Work' && el.matches('.about-facts span')) value = 'نوع العمل';
        if (!key || !value) return;
        if (!originals.has(el)) originals.set(el, el.innerHTML);
        el.innerHTML = value;
        el.setAttribute('data-tr-done', '');
      });
      const logo = document.querySelector('.logo');
      if (logo) logo.textContent = 'علي العلي';
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.title = 'علي العلي — مهندس ذكاء اصطناعي وهندسة خلفية بـ Python';
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', 'مهندس ذكاء اصطناعي ومطوّر خلفية بلغة Python، أبني مساعدات RAG وأنظمة رؤية حاسوبية وواجهات Django وتكاملات إنترنت الأشياء. تصفّح مشاريع علي العلي.');
    } else {
      originals.forEach((html, el) => {
        if (el.isConnected) el.innerHTML = html;
      });
      originals.clear();
      document.querySelectorAll('[data-tr-done]').forEach(el => el.removeAttribute('data-tr-done'));
      const logo = document.querySelector('.logo');
      if (logo) logo.innerHTML = 'Ali <span>Al-Ali</span>';
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      document.title = 'Ali Al-Ali — AI & Python Backend Engineer';
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', 'AI engineer and Python backend developer building RAG assistants, computer-vision systems, Django APIs, and IoT integrations. Explore portfolio projects by Ali Al-Ali.');
    }

    setAriaAttributes(target === 'ar');
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      const label = btn.querySelector('span');
      if (label) label.textContent = target === 'ar' ? 'EN' : 'عربي';
      btn.setAttribute('aria-label', target === 'ar' ? 'Switch to English' : 'Switch to Arabic');
      btn.setAttribute('title', target === 'ar' ? 'English' : 'العربية');
    }
    const mobile = document.getElementById('mobileMenu');
    if (mobile && lang === 'en') {
      mobile.setAttribute('aria-label', 'Open menu');
    }
    localStorage.setItem('portfolio-lang', target);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', () => apply(lang === 'en' ? 'ar' : 'en'));
    }
    apply(lang);
  });
})();
