import { Lesson, Tutor, Achievement } from "./types";

export const TUTORS: Tutor[] = [
  {
    id: "sofia",
    name: "Dra. Sofía Al-Haddad",
    avatar: "👩‍🏫",
    level: "Todos los niveles",
    specialty: "Gramática Comparada e Iniciación",
    style: "Explicativa, compara las estructuras árabes con el español, muy paciente.",
    styleEn: "De Madrid, con raíces mixtas. Se enfoca en la transición gramatical.",
    tagline: "¡La gramática española es más fácil si entiendes tu propio idioma!"
  },
  {
    id: "carlos",
    name: "Profesor Jamal",
    avatar: "👨‍🏫",
    level: "Nivel Intermedio (A2-B1)",
    specialty: "Cultura y Etimología Compartida",
    style: "Apasionado por la historia, resalta los arabismos en el español moderno.",
    styleEn: "Experto en el legado lingüístico de Al-Ándalus y la etimología árabe-española.",
    tagline: "¡Hablamos más árabe en español de lo que te imaginas!"
  },
  {
    id: "amira",
    name: "Amira Benzian",
    avatar: "👩‍🎓",
    level: "Pronunciación y Fonética",
    specialty: "Eliminación de la interferencia fonética árabe",
    style: "Dinámica y práctica, enseña cómo colocar la lengua para la 'CH' y 'P'.",
    styleEn: "Bilingüe nativa de Ceuta. Sabe exactamente dónde fallan los árabes.",
    tagline: "¡Domina el sonido de la P y la CH con técnicas sencillas!"
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "primeros_pasos",
    title: "Primeros Pasos (الخطوات الأولى)",
    description: "Completa tu primera lección interactiva.",
    unlockedAt: null,
    xpReward: 100,
    icon: "Compass"
  },
  {
    id: "transicion_cultural",
    title: "Enlace Cultural (الرابط الثقافي)",
    description: "Completa la lección de etimología árabe en el español.",
    unlockedAt: null,
    xpReward: 150,
    icon: "Heart"
  },
  {
    id: "maestro_copula",
    title: "Adiós a la Oración Nominal",
    description: "Supera el módulo de Ser y Estar con puntuación perfecta.",
    unlockedAt: null,
    xpReward: 200,
    icon: "Award"
  },
  {
    id: "perfect_score",
    title: "Políglota Certificado (دقة مثالية)",
    description: "Completa un test de nivel mensual y obtén un certificado digital.",
    unlockedAt: null,
    xpReward: 300,
    icon: "BookmarkCheck"
  },
  {
    id: "racha_fuego",
    title: "Fuego Andalusí (الحماس المستمر)",
    description: "Consigue una racha diaria de 3 días de práctica continua.",
    unlockedAt: null,
    xpReward: 250,
    icon: "Flame"
  }
];

export const DAILY_WORDS = [
  { id: "w1", word: "Almohada", meaning: "المخدة", etymology: "Del árabe 'al-mukhaddah'", example: "La almohada es muy suave.", category: "Arabismo" },
  { id: "w2", word: "Azúcar", meaning: "السكر", etymology: "Del árabe 'as-sukkar'", example: "Me gusta el café con azúcar.", category: "Arabismo" },
  { id: "w3", word: "Ojalá", meaning: "إن شاء الله / ليت", etymology: "Del árabe 'law sha Allah' (si Dios quiere)", example: "¡Ojalá apruebe el examen!", category: "Cultura" },
  { id: "w4", word: "Zanahoria", meaning: "الجزر", etymology: "Proviene de raíces hispanoárabes", example: "La zanahoria es buena para la vista.", category: "Vocabulario" },
  { id: "w5", word: "Taza", meaning: "كوب / طاسة", etymology: "Del árabe 'tassah'", example: "Una taza de té caliente.", category: "Arabismo" },
  { id: "w6", word: "Aceite", meaning: "الزيت", etymology: "Del árabe 'az-zayt'", example: "El aceite de oliva de España es famoso.", category: "Arabismo" }
];

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    title: "El Choque de Géneros Gramaticales (انعكas الجنس)",
    titleAr: "عكس الجنس بين الإسبانية والعربية",
    description: "Aprende cómo algunos sustantivos cambian de masculino a femenino entre árabe y español.",
    descriptionAr: "تعلم كيف ينعكس جنس الكلمات (الذكر والأنثى) بين اللغتين لتفادي الأخطاء الشائعة.",
    category: "Grammar",
    level: "A1",
    xpReward: 80,
    steps: [
      {
        type: "theory",
        title: "Géneros Opuestos (جنس متعاكس)",
        content: `En español, todo objeto tiene un género gramatical (masculino o femenino). Sin embargo, muchos objetos que en árabe son **masculinos**, en español son **femeninos**, y viceversa.
        
Esto suele causar mucha confusión al principio. Veamos dos ejemplos icónicos de la naturaleza: **La Luna** y **El Sol**.`,
        contentAr: `في اللغة العربية، كلمة "القمر" مذكر و"الشمس" مؤنث. لكن في الإسبانية، يحدث العكس تماماً!
كلمة القمر (Luna) تأخذ أداة التأنيث "La Luna"، وكلمة الشمس (Sol) تأخذ أداة التذكير "El Sol".`,
        comparativeCard: {
          spanish: "El Sol y La Luna",
          arabic: "الشمس والقمر",
          explanation: "El Sol es masculino en español mas femenino en árabe. La Luna es femenina en español mas masculina en árabe."
        }
      },
      {
        type: "theory",
        title: "Otros Sustantivos Invertidos",
        content: `Aquí tenemos más términos cotidianos que debes memorizar para evitar heredar el género árabe al hablar español:
        
1. **La leche** (femenino) vs **الحليب** (masculino en árabe).
2. **El coche** (masculino) vs **السيارة** (femenino en árabe).
3. **La flor** (femenino) vs **الزهرة** (masculino/femenino en árabe, generalmente se confunde con el plural).
4. **La nariz** (femenino) vs **الأنف** (masculino).`,
        contentAr: `انتبه للمشتقات اليومية الحيوية مثل:
الحليب (Leche): مؤنث بالإسبانية (La leche).
السيارة (Coche/Autómovil): مذكر بالإسبانية (El coche).
الأنف (Nariz): مؤنث بالإسبانية (La nariz).`
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se dice correctamente 'La leche' o 'El leche'?",
          questionAr: "كيف نقول 'الحليب' بالإسبانية بطريقة صحيحة مع مراعاة أداة التعريف؟",
          options: [
            "El leche (porque en árabe es masculino: الحليب)",
            "La leche (porque en español 'leche' es femenino)",
            "Un leche (género neutro)"
          ],
          correctAnswer: "La leche (porque en español 'leche' es femenino)",
          arabicGrammarTip: "تذكر: كلمة Leche مؤنثة دائماً في الإسبانية بغض النظر عن تذكيرها في اللغة العربية."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "Completa la frase con el artículo correcto: '___ sol brilla mucho' (الشمس تشرق كثيراً).",
          questionAr: "أكمل الجملة بأداة التعريف المناسبة لـ Sol (الشمس):",
          options: [
            "La",
            "El",
            "Lo"
          ],
          correctAnswer: "El",
          arabicGrammarTip: "الكلمة Sol مذكر في الإسبانية، لذا تأخذ أداة التعريف للمذكر المفرد: El."
        }
      }
    ]
  },
  {
    id: "l2",
    title: "Ser y Estar vs La Oración Nominal Árabe",
    titleAr: "أفعال الكينونة مقابل الجملة الاسمية",
    description: "Comprende la diferencia entre 'ser' (permanente) y 'estar' (temporal) frente a la oración nominal sin verbo.",
    descriptionAr: "افهم الفرق بين الفعلين Ser y Estar واللذين يقابلان الجملة الاسمية في العربية بدون فعل.",
    category: "Grammar",
    level: "A1",
    xpReward: 100,
    steps: [
      {
        type: "theory",
        title: "La Cópula Fantasma (الفعل المفقود)",
        content: `En árabe coloquial y estándar, existe la **oración nominal** (مبتدأ وخبر) donde no se necesita el verbo 'ser/estar' en presente.
        
Por ejemplo: 'Ana Yamil' (أنا جميل) simplemente se traduce literalmente como 'Yo hermoso'.
En español es **obligatorio** usar un verbo puente cobrando vida en dos variantes:
- **SER**: Para características permanentes, identidad, u origen.
- **ESTAR**: Para estados temporales, emociones, o localización física.`,
        contentAr: `في العربية نقول "أنا سعيد" أو "أنا مهندس" بدون فعل كينونة في المضارع. ولكن في الإسبانية، من المستحيل الاستغناء عن الفعل!
نستخدم الفعل Ser لتعريف الهوية والميزات الدائمة (أنا مهندس -> Yo **soy** ingeniero).
نستخدم الفعل Estar للتعبير عن الحالة المؤقتة أو المكان (أنا سعيد -> Yo **estoy** feliz).`,
        comparativeCard: {
          spanish: "Yo soy profesor / Yo estoy en la escuela",
          arabic: "أنا معلم / أنا في المدرسة",
          explanation: "El presente árabe no requiere verbo auxiliador en la oración nominal, mientras que el español distingue estrictamente entre características inherentes (Soy) y ubicación/estado (Estoy)."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "Si quieres decir 'Yo soy de Marruecos' (origen permanente), ¿cuál usas?",
          questionAr: "إذا أردت قول 'أنا من المغرب' (تعريف بالأصل والمنشأ)، أي فعل كينونة تستخدم؟",
          options: [
            "Yo estoy de Marruecos",
            "Yo soy de Marruecos",
            "Yo tener de Marruecos"
          ],
          correctAnswer: "Yo soy de Marruecos",
          arabicGrammarTip: "للأصل والجنسية نستخدم دائماً فعل SER (Soy)."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "Si quieres expresar tu estado actual 'Estoy cansado hoy' (حالة مؤقتة), ¿cuál usas?",
          questionAr: "للتعبير عن حالة مؤقتة مثل 'أنا متعب اليوم'، أي العبارات أصح؟",
          options: [
            "Soy cansado hoy",
            "Estoy cansado hoy",
            "Tengo cansado hoy"
          ],
          correctAnswer: "Estoy cansado hoy",
          arabicGrammarTip: "للحالات الجسدية والنفسية المؤقتة نستخدم فعل ESTAR (Estoy)."
        }
      }
    ]
  },
  {
    id: "l3",
    title: "Palabras Hermanas: Arabismos en el Español",
    titleAr: "الكلمات التوأم: الكلمات ذات الأصل العربي بالإسبانية",
    description: "Explora la increíble conexión de Al-Ándalus en más de 4000 vocablos españoles comunes.",
    descriptionAr: "اكتشف الرابط الأندلسi المذهل من خلال كلمات شائعة نستخدمها يومياً بلفظ مشابه جداً.",
    category: "Culture",
    level: "A2",
    xpReward: 90,
    steps: [
      {
        type: "theory",
        title: "La Influencia de Al-Ándalus (تأثير الأندلس)",
        content: `Casi el 8% de las palabras españolas tienen un origen árabe directo debido a los casi 800 años de convivencia en la península ibérica.
        
Muchas de estas palabras empiezan con **'al-'** (que corresponde al artículo árabe ال). Aprenderlas te dará un superpoder porque ya te sabes su significado en español sin realizar ningún esfuerzo extra.`,
        contentAr: `هل كنت تعلم أن هناك أكثر من 4000 كلمة إسبانية أصلها عربي مباشر؟ 
معظم هذه الكلمات تبدأ بالمقطع Al- وهو في الأصل (الـ) التعريفية العربية. بمجرد أن تسمع الكلمة، ستتعرف على معناها تلقائياً!`,
        comparativeCard: {
          spanish: "Alberca (البحيرة) / Alquiler (الكراء/الغلّة)",
          arabic: "بركة / إيجار (الغلّة)",
          explanation: "La influencia léxica del árabe andalusí estructuró palabras esenciales de la arquitectura, agricultura y vida civil."
        }
      },
      {
        type: "theory",
        title: "La gran lista culinaria",
        content: `En la comida y agricultura, la influencia es masiva:
        
- **Azúcar**: Proviene de *as-sukkar* (السكر).
- **Aceite**: Proviene de *az-zayt* (الزيت).
- **Arroz**: Proviene de *ar-ruzz* (الأرز).
- **Limón**: Proviene de *laymūn* (ليمون).
- **Naranja**: Proviene de *nāranj* (نارنج).`,
        contentAr: `في المطبخ والزراعة، يظهر التقارب بشكل مذهل:
الأرز (Arroz) -> الأرز
الليمون (Limón) -> ليمون
البرتقال/النارنج (Naranja) -> نارنج
الزيت (Aceite) -> الزيت`
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cuál es el origen de la palabra española 'Almohada'?",
          questionAr: "ما هو الأصل التاريخي لكلمة 'Almohada' في اللغة الإسبانية؟",
          options: [
            "Latín clásico",
            "Del árabe 'al-mukhaddah' (المخدة)",
            "origen celta medieval"
          ],
          correctAnswer: "Del árabe 'al-mukhaddah' (المخدة)",
          arabicGrammarTip: "تطور كلمة المخدة لتصبح Almohada في الإسبانية، مع الحفاظ على نفس الصوت الصامت تقريباً!"
        }
      }
    ]
  },
  {
    id: "l4",
    title: "Ojalá vs Insh'Allah y Cortesía",
    titleAr: "إن شاء الله والتعابير الثقافية المشتركة",
    description: "Conoce el origen de la expresión de deseo española más famosa y las fórmulas de hospitalidad cortesana.",
    descriptionAr: "تعرف على تعابير التمني والترحيب والروابط الثقافية العميقة التي تجعل الإسبان يتحدثون كالعرب.",
    category: "Culture",
    level: "A2",
    xpReward: 90,
    steps: [
      {
        type: "theory",
        title: "Ojalá: La herencia de la fe",
        content: `La palabra **Ojalá** es una de las palabras hispanas más cargadas de historia. Se utiliza de manera universal para expresar deseos vivos o anhelos y va siempre acompañada del modo subjuntivo.
        
Deriva directamente de la frase árabe **'law sha' Allah' (لَوْ شَاءَ اللَّهُ)**, que significa 'si Dios quiere' o 'ojalá que Dios quiera'. Su calco de significado y expresión es idéntico al 'Inshallah' árabe moderno.`,
        contentAr: `كلمة "Ojalá" الشهيرة التي يستخدمها متحدثو الإسبانية للتمني من قلوبهم ليست سوى النطق الأندلسي لـ "لو شاء الله". 
وتأتي دائماً متبوعة بصيغة المتكلم الغائب الملتزم Subjuntivo لتوضيح الأمل أو الرغبة الحارة.`,
        comparativeCard: {
          spanish: "¡Ojalá tengas un buen día!",
          arabic: "إن شاء الله يكون يومك جميلاً / ليت يومك جميل!",
          explanation: "Ambas expresiones canalizan la esperanza y el destino de manera profunda bajo el subjuntivo español."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Qué modo verbal debe seguir siempre a la palabra 'Ojalá' al expresar un deseo?",
          questionAr: "ما هي الصيغة الصرفية (الغطاء اللغوي) التي تدعم التمني دائماً بعد Ojalá؟",
          options: [
            "Modo Indicativo habitual (ej: vienes)",
            "Modo Subjuntivo (ej: vengas)",
            "Modo Imperativo directo (ej: ven)"
          ],
          correctAnswer: "Modo Subjuntivo (ej: vengas)",
          arabicGrammarTip: "دائماً ما يتبع 'Ojalá' صيغة Subjuntivo للتعبير عن الرغبة العاطفية والتطلعات."
        }
      }
    ]
  },
  {
    id: "l5",
    title: "El Enigma de la Letra P y la CH",
    titleAr: "لغز نطق الحروف P y CH بالإسبانية",
    description: "Aprende a dominar los sonidos de la P y la CH, ausentes en el árabe estándar, con trucos físicos prácticos.",
    descriptionAr: "تعلم كيفية إخراج صوتي حرف P وحرف CH غير المتواجدين بالفصحى، متفادياً دمجهما مع الباء والشين.",
    category: "Grammar",
    level: "B1",
    xpReward: 120,
    steps: [
      {
        type: "theory",
        title: "La letra P no es la B árabe",
        content: `En árabe habitual no existe la consonante /p/ (oclusiva bilabial sorda). Solo existe la /b/ (sonora). Al aprender español, se suele cometer el error de pronunciar todas las 'P' como 'B', por ejemplo diciendo 'badre' en lugar de 'padre' o 'bizza' por 'pizza'.

El truco físico: La 'P' es sorda y expulsiva. Coloca un trozo de papel frente a tus labios y di 'P'. El papel debe moverse por el soplo de aire. Repite con la B; el papel no debería moverse.`,
        contentAr: `في الفصحى واللهجات العربية, لا يوجد صوت الحرف P (باء مهموسة انفجارية)، بل يوجد فقط حرف الباء B (المجهور). هذا يجعل الطلاب يستبدلون الـ P بالـ B بشكل لا واعي.

تدريب بسيط: ضع ورقة صغيرة أمام شفتيك وانطق P، سوف تهتز الورقة وتتحرك من تيار الهواء الخارج عكس نطقه كـ B.`,
        comparativeCard: {
          spanish: "Papa (patata) vs Baba (saliva)",
          arabic: "بابا (الأب بالفصحى) / بـَـابـَـا",
          explanation: "En español, la diferencia acústica entre 'P' y 'B' distingue significados vitales, como Papa (patata) y Baba (saliva)."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Qué ocurre si pronuncias 'P' usando las cuerdas vocales de la 'B' en español?",
          questionAr: "ماذا يحدث إذا نطقت حرف P مع اهتزاز الحبال الصوتية كما نفعل في حرف الباء؟",
          options: [
            "Se entiende igual, no tiene importancia",
            "Cambias el significado de palabras importantes (ej: Papa se convierte en Baba)",
            "El sonido sale idéntico"
          ],
          correctAnswer: "Cambias el significado de palabras importantes (ej: Papa se convierte en Baba)",
          arabicGrammarTip: "تذكر دائماً أن الـ P مهموسة (تخرج مع هواء فقط وبدون اهتزاز حنجري)، والـ B مجهورة."
        }
      },
      {
        type: "theory",
        title: "La letra CH no es la SH árabe",
        content: `Un error común para hispanohablantes árabes es pronunciar la 'CH' (coche, leche) como 'SH' (es decir, la letra shin árabe (ش), diciendo 'coshe', 'leshe').

En español, la CH es una combinatoria oclusiva africada sorda: comienza como una 'T' y termina de inmediato como una 'SH' sin pausas. Es decir, es un sonido cerrado e interruptor, no un silbido sibilante continuo como la 'SH'.`,
        contentAr: `تأثير صوت الشين (ش) يقود لتنعيم الـ CH لتنطق 'leshe' بدلاً من 'leche' (حليب).

الصوت الإسباني CH هو صوت مركب يبدأ بـ T صامتة متبوعة بـ ش مباشرة (تـش)، فيكون مخرج الصوت مغلقاً انفجارياً وقطعياً وللمقارنة انتبه للفظ 'Coche' (كوتشي وليس كوشي).`,
        comparativeCard: {
          spanish: "Mucho (muy abundante) vs Muslo (muslo)",
          arabic: "موتشو (كثير) vs موشّح (أغنية أندلسية)",
          explanation: "Hacer la interrupción oclusiva es clave para pronunciar 'Mucho' con la firmeza del español nativo."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se compone fonéticamente el sonido de la CH en español?",
          questionAr: "كيف يتكون صوت الـ CH صوتياً ولفظياً بالإسبانية؟",
          options: [
            "Es una sibilante continua idéntica a la Shin árabe (ش)",
            "Es una africada sorda que combina una oclusión de 'T' y una fricación de 'SH' (t-sh)",
            "Suena exactamente como un sonido gutural del paladar trasero"
          ],
          correctAnswer: "Es una africada sorda que combina una oclusión de 'T' y una fricación de 'SH' (t-sh)",
          arabicGrammarTip: "انطق 'تـش' معاً بسرعة وقوة مخرجية لتقليد صوت CH السليم."
        }
      }
    ]
  },
  {
    id: "l6",
    title: "Expresiones de Hospitalidad y Mesa Compartida",
    titleAr: "تعابير الكرم وحفاوة الضيافة الأندلسية المشتركة",
    description: "Explora cómo las fórmulas sociales y de cortesía españolas tienen calcos de significado asombrosos en las costumbres árabes.",
    descriptionAr: "استكشف كيف تتشابه المجاملات الاجتماعية والترحيب بالإسبانية مع عادات الضيافة العربية بشكل مدهsh.",
    category: "Culture",
    level: "A2",
    xpReward: 110,
    steps: [
      {
        type: "theory",
        title: "Mi casa es tu casa y Al-Bayt baytuk",
        content: `Una de las grandes muestras de calidez del español es la famosa frase de bienvenida 'Mi casa es tu casa'. Se dice a visitas o huéspedes con total generosidad.

Esta expresión no abunda en el latín o en Europa del Norte, pero en el mundo árabe es de traducción literal: 'Al-bayt baytuk' (البيت بيتك). El legado andalusí impregnó este espíritu de hospitalidad en los hogares hispanohablantes.`,
        contentAr: `عبارة الترحيب الإسبانية الشهيرة 'Mi casa es tu casa' تطابق تماماً العبارة العربية الاصيلة للكرم والترحاب 'البيت بيتك'. هذا التماثل الثقافي العاطفي يبرز كرم الضيافة الأندلسي الذي تغلغل في النسيج الاجتماعي الإسباني.`,
        comparativeCard: {
          spanish: "Estás en tu casa. / Mi casa es tu casa.",
          arabic: "البيت بيتك تفضل / حللت أهلاً ونزلت سهلاً",
          explanation: "Ambas representan un sentido profundo del honor por el huésped que trasciende las fronteras geográficas."
        }
      },
      {
        type: "theory",
        title: "Buen provecho: Comer con bendiciones",
        content: `En los países de habla hispana, al pasar al lado de alguien que come, o al iniciar una comida, es norma de cortesía decir '¡Buen provecho!'.

Esto equivale con precisión absoluta al 'Bil-hana' wa-sh-shifa'' (بالهناء والشفاء) o 'Saha / Sahtein' (صحتين) de la cultura árabe. Expresa el deseo sincero de que los alimentos aporten alegría y salud.`,
        contentAr: `عبارة '¡Buen provecho!' تقال متمنين هضماً ممتعاً بالهناء والشفاء عندما ترى أحداً يتناول طعامه, وهي عادات عاطفية اجتماعية متطابقة للمجتمعات الإنسانية الحميمية بالشرق والغرب.`,
        comparativeCard: {
          spanish: "¡Buen provecho! (al servir o pasar por la mesa)",
          arabic: "بالهناء والشفاء / صحة على قلبك",
          explanation: "Intercambiar deseos de salud al comer es un pilar fraternal compartido entre hispanos y árabes."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Qué frase de bienvenida en español es un calco literal de 'Al-bayt baytuk' (البيت بيتك)?",
          questionAr: "أي من عبارات الترحيب تقابل حرفياً مقولة 'البيت بيتك' بالثقافة العربية؟",
          options: [
            "Bienvenidos a España",
            "Mi casa es tu casa",
            "Que tengas buen viaje"
          ],
          correctAnswer: "Mi casa es tu casa",
          arabicGrammarTip: "استخدمها عند استقبال الضيوف لشعور فوري بالراحة والترحيب الحار!"
        }
      }
    ]
  },
  {
    id: "l7",
    title: "El Sistema Vocálico Español vs Árabe",
    titleAr: "النظام الصوتي للحركات: الإسبانية مقابل العربية",
    description: "Domina el triángulo rígido de las 5 vocales hispanas y evita las confusiones comunes entre E/I y O/U.",
    descriptionAr: "تقن حركات التشكيل الخمس في الإسبانية متغلباً على الخلط الشائع بين الكسرة والياء والضمة والواو.",
    category: "Grammar",
    level: "B1",
    xpReward: 110,
    steps: [
      {
        type: "theory",
        title: "Las 5 Vocales Rígidas (الحركات الخمس الثابتة)",
        content: `El español tiene un sistema de exactamente **5 vocales** claras e invariables: **A, E, I, O, U**. 
        
El árabe estándar tiene solo **3 vocales principales** cortas (Fatha, Kasra, Damma) y sus respectivas largas (Alif, Ya, Waw). Esto genera dos fusiones erróneas típicas:
- Confundir la **E** con la **I** (pronunciar "mesa" como "misa").
- Confundir la **O** con la **U** (pronunciar "boca" como "buca").
        
En español, no existen las variaciones sutiles (alófonos); una 'E' siempre es 'E' y una 'O' siempre es 'O'.`,
        contentAr: `تحتوي اللغة الإسبانية على خمس حركات لفظية ثابتة تماماً (A, E, I, O, U).
في المقابل، النظام الصوتي العربي يعتمد على ثلاث حركات فقط (الفتحة، الكسرة، الضمة). هذا الاختلاف يسبب تداخلات شائعة للآتين من بيئة لغوية عربية:
- نطق حرف E كأنه ياء مكسورة I (مثل نطق Mesa كـ Misa).
- نطق حرف O كأنه واو مضمومة U (مثل نطق Boca كـ Buca).
الأمر حاسم، فالحركات تغير معاني الكلمات تماماً!`,
        comparativeCard: {
          spanish: "Mesa (طاولة) vs Misa (قداس) | Paso (خطوة) vs Piso (شقة)",
          arabic: "مِيزا vs مِيسّا | باسو vs بـِـيسو",
          explanation: "Cambiar solo una vocal en español altera por completo la semántica de la palabra, a diferencia de las variaciones dialectales árabes."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "Si dices 'Piro' en lugar de 'Pero', ¿qué error estás cometiendo?",
          questionAr: "إذا نطقت كلمة 'Piro' بدلاً من أداة الاستدراك 'Pero'، ما هو الخطأ الإدراكي الصوتي هنا؟",
          options: [
            "Estás sustituyendo la 'E' por la 'I' (típico cruce de Kasra)",
            "Estás hablando en un dialecto andaluz antiguo",
            "No hay ningún error, significan exactamente lo mismo"
          ],
          correctAnswer: "Estás sustituyendo la 'E' por la 'I' (típico cruce de Kasra)",
          arabicGrammarTip: "تذكر: حرف E بالإسبانية ينطق بفتح الفم أفقياً أكثر من الكسرة العربية الهابطة."
        }
      },
      {
        type: "theory",
        title: "Evitando el Cierre Vocálico: Trucos Visuales",
        content: `Para pronunciar correctamente la **E** y la **O** sin que suenen como la 'I' y la 'U':
        
1. **La E española:** Sonríe un poco. Tu lengua se apoya ligeramente detrás de los dientes inferiores, pero dejas suficiente espacio en la boca. Suena intermedia entre la Fatha y la Kasra.
2. **La O española:** Forma un círculo perfecto con tus labios. No los estires hacia adelante (como para besar), simplemente redondea. Tu lengua se retrae un poco.`,
        contentAr: `لتجنب إغلاق الحركات ونطقها خاطئاً:
١. لعلاج حرف E: افتح فمك بشكل عرضي يشبه الابتسامة الخفيفة. لا تدع لسانك يرتفع للأعلى كما في الياء الكسيرة.
٢. لعلاج حرف O: شكّل دائرة مستديرة مثالية بشفتيك بشكل متوسط دون دفعهما للأمام كما نفعل في الواو الضمية U.`
      },
      {
        type: "exercise",
        exercise: {
          question: "Completa correctamente: 'Quiero comprar este ___' (أريد شراء هذه الشقة).",
          questionAr: "اختر الكلمة المناسبة لإكمال الفراغ بمعنى شقة:",
          options: [
            "Peso",
            "Piso",
            "Puso"
          ],
          correctAnswer: "Piso",
          arabicGrammarTip: "كلمة Piso تعني شقة بكسر الباء الصامتة (I), mientras que Peso significa peso (de pesar o kilos)."
        }
      }
    ]
  },
  {
    id: "l8",
    title: "El Baile de la Letra J y la H muda",
    titleAr: "حرفا الـ J والـ H: بين الخاء الأندلسية والصمت التام",
    description: "Distingue la ruda consonante J (velar sorda) de los sonidos árabes, y domina la invisibilidad de la H.",
    descriptionAr: "ميز الصوت الاحتكاكي الخشن لحرف J (الخاء الإسبانية) واعرف كيف تتعامل مع حرف H الصامت تماماً.",
    category: "Grammar",
    level: "B1",
    xpReward: 130,
    steps: [
      {
        type: "theory",
        title: "La Jota Española y la Letra Kha (خ)",
        content: `La letra **J** (y la **G** ante 'e', 'i') en español ibérico suena muy similar a la consonante árabe **خ (Kha)**. Es un sonido sordo que se produce en la parte posterior de la garganta.
        
Sin embargo, algunos hispanohablantes árabes tienden a suavizarla demasiado, haciéndola sonar como la **هـ (Hā')** inglesa/árabe, o la **ح (Hhā')**. 
No temas raspar un poco la garganta: **Jefe** debe sonar con la potencia de la خ, nunca como una sutil H suave.`,
        contentAr: `حرفا J و G (إذا تبعها E أو I) بالنطق الإسباني يصدران صوتاً مطابقاً تقريباً لحرف (الخاء خ) بالعربية.
الخطأ الشائع هو تنعيم هذا الصوت ليصبح مثل الهاء هـ أو الحاء ح. قل "Jardín" (خاردين) بقوة حنجرية واثقة، ولا تقل "Hardín"!`,
        comparativeCard: {
          spanish: "Jardín (حديقة) / Gente (ناس)",
          arabic: "خاردين / خينتي",
          explanation: "La fricativa velar sorda se articuló históricamente en la península con un roce similar al de la Kha (خ) árabe."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Con cuál fonema árabe se equipara óptimamente el sonido de la 'J' o de la 'G' (ante 'e', 'i')?",
          questionAr: "أي الحروف العربية يكافئ بدقة مخرج الصوت لحرف J بالإسبانية؟",
          options: [
            "Hā' (هـ)",
            "Kha (خ)",
            "Gayn (غ)"
          ],
          correctAnswer: "Kha (خ)",
          arabicGrammarTip: "تدرب دائماً بلفظ الخاء الأندلسية القوية عند نطق كلمات مثل: Trabajo, Jugar o Gigante."
        }
      },
      {
        type: "theory",
        title: "La H es totalmente Invisible (الحرف الأخرس)",
        content: `En español, la letra **H** es completamente muda, nunca se pronuncia (salvo en el dígrafo 'Ch'). 
        
No debes aspirar ni pronunciar la H en absoluto. Por ejemplo:
- **Hola** se pronuncia exactamente igual que **Ola**.
- **Hijo** se pronuncia exactamente como **Ijo**.
- **Ahora** se pronuncia **Aora**.
        
Intentar pronunciarla como una 'هـ' (Hā') es un marcador de acento muy evidente. Deletrearla visualmente no debe afectar tu articulación oral.`,
        contentAr: `على عكس اللغات الإنكليزية أو الفرنسية، حرف الـ H في الإسبانية ميت تماماً وصامت لا يلفظ أبداً!
مقارنة نطقية:
كلمة "Hola" (مرحباً) تلفظ تماماً كـ "Ola" (موجة).
كلمة "Hijo" (ابن) تلفظ كأنها تبدأ بكسرة فقط "Ijo".
لا تقم بنفخ الهواء أو نطق صوت الهاء عند رؤية هذا الحرف الصامت.`
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Como se pronuncia de manera correcta la palabra 'Huevo' (بيض)?",
          questionAr: "كيف نلفظ كلمة 'Huevo' (بيض) بنسق سليم؟",
          options: [
            "Pronunciando una 'J' suave (Juevo)",
            "Aspirando fuertemente una 'H' (Huevo estilizado)",
            "Omitiendo la 'H' totalmente en la voz (Uevo)"
          ],
          correctAnswer: "Omitiendo la 'H' totalmente en la voz (Uevo)",
          arabicGrammarTip: "تذكر: ابدأ مباشرة بلفظ حرف الـ U، وتخيل أن الـ H غير مكتوبة إطلاقاً!"
        }
      }
    ]
  },
  {
    id: "l9",
    title: "El Comercio y el Arte del Regatear",
    titleAr: "التجارة وتراث المساومة الأندلسية المشتركة",
    description: "Explora la herencia andalusí en el lenguaje comercial, mercantil y las formas sociales de negociación.",
    descriptionAr: "اكتشف الإرث الأندلسي في لغة السوق والمعاملات الاقتصادية وعادات المساومة المشتركة بين الثقافتين.",
    category: "Culture",
    level: "B1",
    xpReward: 100,
    steps: [
      {
        type: "theory",
        title: "El Origen de los Términos del Zoco (أصول مفردات السوق)",
        content: `El legado mercantil de Al-Ándalus salpica el léxico comercial español cotidiano. Términos fundamentales provienen de las dinámicas de los bazares árabes:
        
1. **Quilate:** La medida de pureza del oro deriva del árabe **قیراط (Qirat)**.
2. **Alhaja:** Una joya valiosa viene de **الحاجة (Al-hajah)**, que originalmente significaba 'cosa necesaria' u 'objeto preciado'.
3. **Almoneda:** Significa subasta o venta pública de bienes, derivada de **المناداة (Al-munadah)** (el pregón o llamada del subastador).
4. **Arancel:** La tarifa aduanera, que proviene de **الرسم (Ar-rasm)** o la regulación de cobros.`,
        contentAr: `أثرت التجارة الأندلسية بشكل عميق في قوانين ومفردات الأسواق الإسبانية.
الكلمات التالية ناطقة بالرابط التاريخي:
- قيراط (Quilate): معيار نقاء الذهب مأخوذ مباشرة من الاسم العربي (قيراط).
- حلي / جوهرة (Alhaja): مأخوذ من كلمة (الحاجة) التي كانت تعني قديماً الشيء الثمين والصالح للحفظ.
- مزاد علني (Almoneda): من الفعل العربي (المناداة) تعبيراً عن مناداة الدلال لبيع السلع.`,
        comparativeCard: {
          spanish: "Comprar una alhaja de veinticuatro quilates.",
          arabic: "شراء حلي (حاجة) من أربع وعشرون قيراطاً.",
          explanation: "Los estándares de pesos, medidas y operaciones de comercio medievales luso-españolas se basaban en el sistema andalusí."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿De qué expresión de venta o llamada árabe procede el término 'Almoneda' (subasta)?",
          questionAr: "من أي الكلمات والمقاصد الصوتية المشتقة جاءت كلمة 'Almoneda'؟",
          options: [
            "De 'Al-madinah' (المدينة)",
            "De 'Al-munadah' (المناداة / النداء بالبيع)",
            "De 'Al-mizan' (الميزان)"
          ],
          correctAnswer: "De 'Al-munadah' (المناداة / النداء بالبيع)",
          arabicGrammarTip: "المناداة على البضائع في السوق الأندلسي صعدت بالفكرة لتصبح Almoneda."
        }
      },
      {
        type: "theory",
        title: "La Cortesía y el Regateo Social",
        content: `El regateo, o negociación de precios, no era visto simplemente como una transacción fría, sino como un **ritual de interacción social**.
        
Tanto en España como en Medio Oriente, el trato cercano y cálido con el tendero es primordial. Al cerrar un acuerdo comercial, se conserva este respeto recíproco. 
Por ejemplo, despedirse diciendo: **'Vaya con Dios'** o **'Que Dios le guarde'** es un calco directo de la cortesía árabe al comerciante: **'Fi amanillah' (في أمان الله)** o **'Allah yafazak' (الله يحفظك)**.`,
        contentAr: `المساومة (Regatear) في الأسواق التقليدية لم تكن مجرد مفاصلة مادية جافة، بل كانت طقساً للتواصل الاجتماعي وبناء مودة إنسانية.
يظهر التماثل اليوم بمقولات التمني بالبركة والخير مثل "Vaya con Dios" (اذهب مع الله) التي تقابلها تماماً تعابير التوديع والبركة العربية كـ "في أمان الله" أو "الله يبارك فيك".`
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cuál de estos vocablos españoles sobre metales preciosos proviene del término árabe 'Qirat' (قیراط)?",
          questionAr: "أي المفردات الإسبانية الشهيرة بالذهب والمعادن تعود لجذرها العربي 'قيراط'؟",
          options: [
            "Quilate",
            "Bronce",
            "Plata"
          ],
          correctAnswer: "Quilate",
          arabicGrammarTip: "تذكر دائماً أن عيار الذهب (Quilate) هو القياس التاريخي العربي المشترك."
        }
      }
    ]
  }
];

export interface ArabismWord {
  spanish: string;
  arabic: string;
  meaning: string;
  etymology: string;
  category: string;
  example: string;
  exampleAr: string;
}

export const ARABISMS_DATABASE: ArabismWord[] = [
  {
    spanish: "Almohada",
    arabic: "المخدة",
    meaning: "Cojín sobre el que se apoya la cabeza en la cama.",
    etymology: "Del árabe 'al-mukhaddah' (reclinatorio de mejilla).",
    category: "Hogar",
    example: "Prefiero dormir con una almohada baja.",
    exampleAr: "أفضل النوم بمخدة منخفضة."
  },
  {
    spanish: "Aceite",
    arabic: "الزيت",
    meaning: "Líquido graso que se obtiene de frutos o semillas, especialmente de oliva.",
    etymology: "Del árabe 'az-zayt' (jugo de aceituna o aceite).",
    category: "Alimentos",
    example: "El aceite de oliva andaluz es el mejor del mundo.",
    exampleAr: "زيت الزيتون الأندلسي هو الأفضل في العالم."
  },
  {
    spanish: "Azúcar",
    arabic: "السكر",
    meaning: "Sustancia cristalina dulce extraída de la caña o remolacha.",
    etymology: "Del árabe 'as-sukkar'.",
    category: "Alimentos",
    example: "No le pongas mucha azúcar al té.",
    exampleAr: "لا تضع الكثير من السكر في الشاي."
  },
  {
    spanish: "Alberca",
    arabic: "البركة",
    meaning: "Depósito de agua para riego o recreo, piscina o estanque antiguo.",
    etymology: "Del árabe 'al-birkah' (estanque de agua).",
    category: "Arquitectura",
    example: "Los niños nadan en la alberca del pueblo.",
    exampleAr: "يسبح الأطفال في بركة البلدة."
  },
  {
    spanish: "Almacén",
    arabic: "المخزن",
    meaning: "Edificio o local donde se guardan o venden mercancías.",
    etymology: "Del árabe 'al-makhzan' (depósito de provisiones).",
    category: "Comercio",
    example: "El almacén del puerto está lleno de trigo.",
    exampleAr: "مخزن الميناء مليء بالقمح."
  },
  {
    spanish: "Alcalde",
    arabic: "القاضي",
    meaning: "Autoridad ejecutiva de un municipio o ayuntamiento.",
    etymology: "Del árabe 'al-qadi' (el juez que decide).",
    category: "Sociedad",
    example: "El alcalde de Córdoba inauguró el centro cultural.",
    exampleAr: "افتتح قاضي (رئيس بلدية) قرطبة المركز الثقافي."
  },
  {
    spanish: "Tarifa",
    arabic: "تعريفة",
    meaning: "Tabla de precios o derechos de aduana regulados.",
    etymology: "Del árabe 'ta'rifah' (anuncio, definición).",
    category: "Comercio",
    example: "La tarifa móvil incluye llamadas ilimitadas.",
    exampleAr: "تتضمن تعريفة الجوال مكالمات غير محدودة."
  },
  {
    spanish: "Aduana",
    arabic: "الديوان",
    meaning: "Oficina pública encargada de registrar los bienes que entran y salen.",
    etymology: "Del árabe 'ad-diwan' (registro de cuentas o consejo).",
    category: "Sociedad",
    example: "Pasamos el control de maletas en la aduana.",
    exampleAr: "مررنا بفحص الحقائب في الديوان (الجمارك)."
  },
  {
    spanish: "Barrio",
    arabic: "برّي",
    meaning: "Cada una de las partes de un núcleo urbano.",
    etymology: "Del árabe 'barri' (exterior, afueras de la muralla).",
    category: "Arquitectura",
    example: "El barrio del Albaicín en Granada conserva su trazo morisco.",
    exampleAr: "حي البيازين في غرناطة يحافظ على تخطيطه العربي."
  },
  {
    spanish: "Azafrán",
    arabic: "زعفران",
    meaning: "Especia aromática de color rojo-anaranjado y sabor fuerte.",
    etymology: "Del árabe 'za'faran'.",
    category: "Alimentos",
    example: "La paella requiere unas hebras de azafrán.",
    exampleAr: "تتطلب الباييلا بعض خيوط الزعفران."
  },
  {
    spanish: "Jinete",
    arabic: "زناتي",
    meaning: "Persona experta en montar a caballo.",
    etymology: "De 'zenatis' (tribu bereber de Zenata, famosos caballeros).",
    category: "Sociedad",
    example: "El jinete cruzó el campo a galope.",
    exampleAr: "عبر الخيال (الزناتي) الحقل مستعرضاً ركوبه."
  },
  {
    spanish: "Ajedrez",
    arabic: "الشطرنج",
    meaning: "Juego de mesa táctico de 64 escaques y 32 piezas.",
    etymology: "Del árabe 'ash-shatranj'.",
    category: "Sociedad",
    example: "Él prefiere jugar ajedrez que ver televisión.",
    exampleAr: "هو يفضل لعب الشطرنج على مشاهدة التلفاز."
  },
  {
    spanish: "Zanahoria",
    arabic: "سفنارية / جزر",
    meaning: "Planta con raíz comestible de color naranja dulzona.",
    etymology: "Del hispanoárabe 'safunnariyah'.",
    category: "Alimentos",
    example: "Cocina las zanahorias al vapor para conservar nutrición.",
    exampleAr: "اطبخ الجزر بالبخار للاحتفاظ بقيمته الغذائية."
  },
  {
    spanish: "Taza",
    arabic: "طاسة",
    meaning: "Contenedor de líquidos con asa, de porcelana o barro.",
    etymology: "Del árabe 'tassah' (escudilla de beber).",
    category: "Hogar",
    example: "Me encanta beber una taza de chocolate caliente.",
    exampleAr: "أحب شرب كوب (طاسة) من الشوكولاتة الساخنة."
  }
  // NUEVAS LECCIONES — añadir al array LESSONS en data.ts (l10 a l30)

  {
    id: "l10",
    title: "Los Artículos: El, La, Los, Las",
    titleAr: "أدوات التعريف في الإسبانية",
    description: "Domina el sistema de artículos definidos e indefinidos y evita los errores más comunes de los arabófonos.",
    descriptionAr: "أتقن أدوات التعريف والتنكير وتجنب الأخطاء الشائعة للناطقين بالعربية.",
    category: "Grammar",
    level: "A1",
    xpReward: 80,
    steps: [
      {
        type: "theory",
        title: "El artículo definido (أداة التعريف)",
        content: `En español, todo sustantivo lleva un artículo que concuerda en género y número:\n\n- **El** (masculino singular): el libro, el sol\n- **La** (femenino singular): la luna, la casa\n- **Los** (masculino plural): los libros\n- **Las** (femenino plural): las casas\n\nEn árabe, existe solo una partícula de definición: **الـ** para todos los géneros y números. En español hay cuatro formas distintas.`,
        contentAr: `في العربية، نستخدم (الـ) للتعريف بصرف النظر عن الجنس أو العدد.\nلكن في الإسبانية يوجد أربعة أشكال مختلفة:\n- El: للمذكر المفرد\n- La: للمؤنث المفرد\n- Los: للمذكر الجمع\n- Las: للمؤنث الجمع\nيجب حفظها جيداً لأن كل اسم يطلب شكلاً محدداً!`,
        comparativeCard: {
          spanish: "El libro / La mesa / Los libros / Las mesas",
          arabic: "الكتاب / الطاولة / الكتب / الطاولات",
          explanation: "El árabe usa una sola partícula الـ para todo; el español distingue cuatro formas según género y número."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cuál es el artículo correcto para 'casa' (بيت/منزل)?",
          questionAr: "ما هي أداة التعريف الصحيحة لكلمة 'casa' (منزل)؟",
          options: ["El casa", "La casa", "Los casa"],
          correctAnswer: "La casa",
          arabicGrammarTip: "كلمة casa مؤنثة في الإسبانية، لذا تأخذ أداة التعريف La."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "Elige el artículo correcto: '___ estudiantes estudian mucho'",
          questionAr: "اختر أداة التعريف المناسبة: '___ الطلاب يدرسون كثيراً'",
          options: ["El", "La", "Los"],
          correctAnswer: "Los",
          arabicGrammarTip: "estudiantes جمع مذكر، لذا نستخدم Los للجمع المذكر."
        }
      }
    ]
  },
  {
    id: "l11",
    title: "Los Números: Del 1 al 100",
    titleAr: "الأرقام من 1 إلى 100",
    description: "Aprende los números en español y descubre las sorprendentes similitudes con el árabe.",
    descriptionAr: "تعلم الأرقام بالإسبانية واكتشف أوجه التشابه المدهشة مع العربية.",
    category: "Grammar",
    level: "A1",
    xpReward: 70,
    steps: [
      {
        type: "theory",
        title: "Los números del 1 al 20",
        content: `Los números en español tienen un origen mixto latino y árabe:\n\n1 uno, 2 dos, 3 tres, 4 cuatro, 5 cinco\n6 seis, 7 siete, 8 ocho, 9 nueve, 10 diez\n11 once, 12 doce, 13 trece, 14 catorce, 15 quince\n16 dieciséis, 17 diecisiete, 18 dieciocho, 19 diecinueve, 20 veinte\n\nCuriosidad: el sistema de **numeración arábiga** (1, 2, 3...) que usa España y todo el mundo occidental fue introducido por los árabes en la Edad Media.`,
        contentAr: `أرقام الإسبانية تمتزج فيها الأصول اللاتينية مع الإرث العربي.\nومن المثير للاهتمام أن نظام الترقيم المستخدم عالمياً (١، ٢، ٣...) هو نفسه الذي أدخله العرب إلى أوروبا في القرون الوسطى عبر الأندلس!\nكلمة Cero (صفر) نفسها مأخوذة من الكلمة العربية (صِفر).`,
        comparativeCard: {
          spanish: "Cero → del árabe Sifr (صفر)",
          arabic: "صِفر → إسبانيا → أوروبا كلها",
          explanation: "La palabra 'cero' en todos los idiomas europeos proviene del árabe 'sifr', introducido por los matemáticos árabes medievales."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿De qué palabra árabe proviene el término español 'cero'?",
          questionAr: "من أي كلمة عربية تأتي كلمة 'cero' (الصفر) في الإسبانية؟",
          options: ["Zara (زارا)", "Sifr (صفر)", "Zafir (زفير)"],
          correctAnswer: "Sifr (صفر)",
          arabicGrammarTip: "الصفر (Sifr) كانت من أعظم الهدايا الرياضية العربية لأوروبا في العصور الوسطى."
        }
      }
    ]
  },
  {
    id: "l12",
    title: "Presente de Indicativo: Verbos -AR",
    titleAr: "المضارع الإخباري: أفعال المجموعة الأولى",
    description: "Aprende a conjugar los verbos regulares en -AR en presente, el tiempo más usado del español.",
    descriptionAr: "تعلم تصريف أفعال المجموعة الأولى (-AR) في زمن المضارع الأكثر استخداماً.",
    category: "Grammar",
    level: "A1",
    xpReward: 90,
    steps: [
      {
        type: "theory",
        title: "Conjugación de verbos -AR",
        content: `Los verbos en -AR son los más numerosos en español. Para conjugarlos en presente, quita el -AR y añade estas terminaciones:\n\nYo → -o (hablo)\nTú → -as (hablas)\nÉl/Ella → -a (habla)\nNosotros → -amos (hablamos)\nVosotros → -áis (habláis)\nEllos → -an (hablan)\n\nEjemplos comunes: hablar, trabajar, estudiar, caminar, comprar, escuchar.`,
        contentAr: `أفعال المجموعة الأولى (-AR) هي الأكثر شيوعاً في الإسبانية.\nللتصريف في المضارع، نحذف (-AR) ونضيف نهايات محددة:\n- أنا (Yo): أضيف -o\n- أنت (Tú): أضيف -as\n- هو/هي (Él/Ella): أضيف -a\n- نحن (Nosotros): أضيف -amos\n- أنتم (Vosotros): أضيف -áis\n- هم (Ellos): أضيف -an`,
        comparativeCard: {
          spanish: "Yo hablo / Tú hablas / Él habla",
          arabic: "أنا أتكلم / أنت تتكلم / هو يتكلم",
          explanation: "Igual que en árabe, los pronombres personales en español cambian la forma del verbo. La diferencia es que en español los pronombres son opcionales pero las terminaciones son obligatorias."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se conjuga 'trabajar' para 'Yo'?",
          questionAr: "كيف نصرف فعل 'trabajar' (يعمل) مع ضمير 'Yo' (أنا)؟",
          options: ["Yo trabajas", "Yo trabajo", "Yo trabajar"],
          correctAnswer: "Yo trabajo",
          arabicGrammarTip: "مع ضمير Yo (أنا)، نحذف -AR ونضيف -o: trabaj + o = trabajo."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "Completa: 'Ellos ___ español todos los días'",
          questionAr: "أكمل الجملة: 'هم يدرسون الإسبانية كل يوم'",
          options: ["estudia", "estudiamos", "estudian"],
          correctAnswer: "estudian",
          arabicGrammarTip: "مع ضمير Ellos (هم)، نضيف النهاية -an: estudi + an = estudian."
        }
      }
    ]
  },
  {
    id: "l13",
    title: "Los Colores y sus Géneros",
    titleAr: "الألوان وتطابقها مع الجنس النحوي",
    description: "Aprende los colores en español y cómo concuerdan en género con el sustantivo que acompañan.",
    descriptionAr: "تعلم الألوان بالإسبانية وكيف تتطابق مع جنس الاسم الذي تصفه.",
    category: "Grammar",
    level: "A1",
    xpReward: 75,
    steps: [
      {
        type: "theory",
        title: "Los colores cambian de género",
        content: `En español, la mayoría de los colores tienen forma masculina y femenina:\n\n- Rojo / Roja (أحمر/حمراء)\n- Blanco / Blanca (أبيض/بيضاء)\n- Negro / Negra (أسود/سوداء)\n- Amarillo / Amarilla (أصفر/صفراء)\n\nAlgunos colores son invariables (no cambian):\n- Azul (أزرق) — igual para masculino y femenino\n- Verde (أخضر) — igual para ambos\n- Naranja (برتقالي) — invariable`,
        contentAr: `في الإسبانية، معظم الألوان تتغير حسب جنس الاسم الذي تصفه:\n- Rojo (أحمر للمذكر) → Roja (حمراء للمؤنث)\n- Blanco (أبيض) → Blanca (بيضاء)\nلكن بعض الألوان لا تتغير مثل Azul وVerde وNaranja.\nهذا يشبه نظام العربية حيث تتغير الألوان بين المذكر والمؤنث.`,
        comparativeCard: {
          spanish: "El coche rojo / La casa roja",
          arabic: "السيارة الحمراء / البيت الأحمر",
          explanation: "Como en árabe, los adjetivos de color en español concuerdan en género con el sustantivo. 'Rojo' se convierte en 'Roja' para sustantivos femeninos."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se dice 'la flor blanca' en español?",
          questionAr: "كيف نقول 'الزهرة البيضاء' بالإسبانية؟",
          options: ["La flor blanco", "La flor blanca", "El flor blanca"],
          correctAnswer: "La flor blanca",
          arabicGrammarTip: "كلمة flor (زهرة) مؤنثة، لذا نستخدم أداة التعريف La والصفة blanca المؤنثة."
        }
      }
    ]
  },
  {
    id: "l14",
    title: "La Familia: Vocabulario Esencial",
    titleAr: "العائلة: المفردات الأساسية",
    description: "Aprende el vocabulario de la familia en español y compara los términos con el árabe.",
    descriptionAr: "تعلم مفردات العائلة بالإسبانية وقارنها مع نظيراتها في العربية.",
    category: "Culture",
    level: "A1",
    xpReward: 70,
    steps: [
      {
        type: "theory",
        title: "Miembros de la familia (أفراد العائلة)",
        content: `El vocabulario familiar en español es bastante regular:\n\n- Padre (أب) / Madre (أم)\n- Hijo (ابن) / Hija (ابنة)\n- Hermano (أخ) / Hermana (أخت)\n- Abuelo (جد) / Abuela (جدة)\n- Tío (عم/خال) / Tía (عمة/خالة)\n- Primo (ابن عم/خال) / Prima (ابنة عم/خال)\n- Marido/Esposo (زوج) / Mujer/Esposa (زوجة)\n\nNota: en español no se distingue entre tío paterno y materno, a diferencia del árabe.`,
        contentAr: `مفردات العائلة في الإسبانية منتظمة وسهلة الحفظ.\nفرق مهم: في العربية نميز بين العم والخال والعمة والخالة، لكن في الإسبانية:\n- Tío = عم أو خال (لا فرق!)\n- Tía = عمة أو خالة (لا فرق!)\nهذا تبسيط كبير مقارنة بالعربية الغنية في وصف روابط القرابة.`,
        comparativeCard: {
          spanish: "Tío (عم أو خال) / Tía (عمة أو خالة)",
          arabic: "عم / خال / عمة / خالة",
          explanation: "El español simplifica los vínculos familiares usando un solo término donde el árabe distingue la línea paterna y materna."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se dice 'el hijo de mi tío' en español?",
          questionAr: "كيف نقول 'ابن عمي أو ابن خالي' في الإسبانية؟",
          options: ["Mi sobrino", "Mi primo", "Mi hermano"],
          correctAnswer: "Mi primo",
          arabicGrammarTip: "في الإسبانية، Primo يعني ابن العم أو ابن الخال بدون تمييز بين الجانبين."
        }
      }
    ]
  },
  {
    id: "l15",
    title: "El Tiempo y las Estaciones",
    titleAr: "الطقس والفصول الأربعة",
    description: "Aprende a hablar del tiempo meteorológico y las estaciones del año.",
    descriptionAr: "تعلم كيف تتحدث عن الطقس وفصول السنة الأربعة بالإسبانية.",
    category: "Culture",
    level: "A1",
    xpReward: 75,
    steps: [
      {
        type: "theory",
        title: "Hablar del tiempo (الحديث عن الطقس)",
        content: `Para hablar del tiempo en español se usa el verbo **hacer** (en lugar de 'ser' o 'estar'):\n\n- Hace calor (الجو حار)\n- Hace frío (الجو بارد)\n- Hace sol (الشمس مشرقة)\n- Hace viento (الهواء يهب)\n- Está nublado (الجو غائم)\n- Está lloviendo / Llueve (تمطر)\n- Nieva (يثلج)\n\nLas estaciones: Primavera (ربيع), Verano (صيف), Otoño (خريف), Invierno (شتاء).`,
        contentAr: `التعبير عن الطقس في الإسبانية يستخدم فعل Hacer (يفعل/يصنع) بطريقة غير متوقعة!\nنقول: Hace calor (الجو حار) حرفياً: "يصنع حرارة"\nهذا مختلف عن العربية التي تستخدم: الجو حار مباشرة.\nالاستثناء: للغيوم والمطر نستخدم Estar:\n- Está nublado (الجو غائم)\n- Está lloviendo (تمطر الآن)`,
        comparativeCard: {
          spanish: "Hace calor / Hace frío / Hace sol",
          arabic: "الجو حار / الجو بارد / الشمس مشرقة",
          explanation: "El español usa el verbo 'hacer' para el tiempo meteorológico — un uso único que no tiene equivalente literal en árabe."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se dice 'hace mucho calor hoy' en español?",
          questionAr: "كيف نقول 'الجو حار جداً اليوم' بالإسبانية؟",
          options: ["Está mucho calor hoy", "Hace mucho calor hoy", "Es mucho calor hoy"],
          correctAnswer: "Hace mucho calor hoy",
          arabicGrammarTip: "للتعبير عن درجة الحرارة والرياح والشمس نستخدم دائماً فعل Hacer."
        }
      }
    ]
  },
  {
    id: "l16",
    title: "La Comida y el Restaurante",
    titleAr: "الطعام والمطعم",
    description: "Vocabulario esencial para pedir comida, entender menús y hablar de gastronomía española.",
    descriptionAr: "مفردات أساسية لطلب الطعام وفهم القوائم والحديث عن المطبخ الإسباني.",
    category: "Culture",
    level: "A1",
    xpReward: 80,
    steps: [
      {
        type: "theory",
        title: "En el restaurante (في المطعم)",
        content: `Frases clave para el restaurante:\n\n- **¿Me puede traer la carta?** (هل يمكنك إحضار القائمة؟)\n- **Quiero pedir...** (أريد أن أطلب...)\n- **¿Qué recomienda?** (ماذا تنصح؟)\n- **La cuenta, por favor** (الحساب من فضلك)\n- **Está muy rico/delicioso** (إنه لذيذ جداً)\n\nVocabulario básico:\n- Desayuno (فطور) / Almuerzo (غداء) / Cena (عشاء)\n- Agua (ماء) / Pan (خبز) / Carne (لحم) / Pescado (سمك)\n- Verduras (خضروات) / Postre (حلوى)`,
        contentAr: `عند دخولك مطعماً إسبانياً، ستحتاج هذه العبارات الأساسية:\nطلب القائمة: ¿Me puede traer la carta?\nطلب الطعام: Quiero pedir + اسم الطبق\nطلب الحساب: La cuenta, por favor\n\nملاحظة ثقافية: في إسبانيا، الغداء (Almuerzo) هو الوجبة الرئيسية ويؤكل بين الساعة 2 و4 مساءً، والعشاء (Cena) يكون متأخراً بعد الساعة 9 ليلاً!`,
        comparativeCard: {
          spanish: "Almuerzo a las 2pm / Cena a las 10pm",
          arabic: "الغداء الساعة 1 / العشاء الساعة 8",
          explanation: "Los horarios de comida en España son notablemente más tardíos que en los países árabes — un choque cultural importante para los recién llegados."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Qué dices para pedir la cuenta en un restaurante?",
          questionAr: "ماذا تقول لطلب الحساب في مطعم إسباني؟",
          options: ["¿Me puede traer la carta?", "La cuenta, por favor", "¿Qué recomienda?"],
          correctAnswer: "La cuenta, por favor",
          arabicGrammarTip: "La cuenta = الحساب، وpor favor = من فضلك. عبارة مهمة جداً في المطاعم!"
        }
      }
    ]
  },
  {
    id: "l17",
    title: "Los Verbos Irregulares: Ser y Tener",
    titleAr: "الأفعال الشاذة: كون وامتلاك",
    description: "Domina los dos verbos irregulares más importantes del español: SER y TENER.",
    descriptionAr: "أتقن فعلي الكينونة والامتلاك الشاذين الأكثر أهمية في الإسبانية.",
    category: "Grammar",
    level: "A1",
    xpReward: 90,
    steps: [
      {
        type: "theory",
        title: "El verbo TENER (امتلاك)",
        content: `**TENER** (يملك/عنده) es irregular. Su conjugación:\n\nYo **tengo** (عندي)\nTú **tienes** (عندك)\nÉl/Ella **tiene** (عنده/عندها)\nNosotros **tenemos** (عندنا)\nVosotros **tenéis** (عندكم)\nEllos **tienen** (عندهم)\n\nUsos importantes:\n- Tener + edad: **Tengo 25 años** (عمري 25 سنة)\n- Tener + hambre/sed: **Tengo hambre** (أنا جائع)\n- Tener + razón: **Tienes razón** (أنت على حق)`,
        contentAr: `فعل TENER (يملك) من أكثر الأفعال الشاذة استخداماً.\nفرق مهم عن العربية:\nفي العربية نقول: "أنا جائع" (صفة مباشرة)\nفي الإسبانية نقول: "Tengo hambre" (أملك جوعاً) حرفياً!\nهذا استخدام غير مألوف للمتعلم العربي لأننا نستخدم TENER بدلاً من ESTAR للتعبير عن الحالات الجسدية مثل الجوع والعطش والنعاس.`,
        comparativeCard: {
          spanish: "Tengo hambre / Tengo sed / Tengo sueño",
          arabic: "أنا جائع / أنا عطشان / أنا نعسان",
          explanation: "El español usa TENER (tener hambre, sed, sueño) donde el árabe usa adjetivos directos. Es un calco estructural único del español."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se dice 'tengo 30 años' correctamente?",
          questionAr: "كيف نعبر عن العمر بالإسبانية: 'عمري 30 سنة'؟",
          options: ["Soy 30 años", "Estoy 30 años", "Tengo 30 años"],
          correctAnswer: "Tengo 30 años",
          arabicGrammarTip: "للتعبير عن العمر في الإسبانية، نستخدم TENER وليس SER أو ESTAR: Tengo + العمر + años."
        }
      }
    ]
  },
  {
    id: "l18",
    title: "Preguntar y Responder: Las Interrogativas",
    titleAr: "الاستفهام والإجابة: أدوات السؤال",
    description: "Aprende las palabras interrogativas del español y cómo formular preguntas correctamente.",
    descriptionAr: "تعلم أدوات الاستفهام الإسبانية وكيفية طرح الأسئلة بشكل صحيح.",
    category: "Grammar",
    level: "A1",
    xpReward: 80,
    steps: [
      {
        type: "theory",
        title: "Las palabras interrogativas (أدوات الاستفهام)",
        content: `Las palabras interrogativas en español siempre llevan tilde (acento):\n\n- **¿Qué?** (ماذا؟ / ما؟)\n- **¿Quién?** (من؟)\n- **¿Dónde?** (أين؟)\n- **¿Cuándo?** (متى؟)\n- **¿Cómo?** (كيف؟)\n- **¿Por qué?** (لماذا؟)\n- **¿Cuánto/a?** (كم؟)\n- **¿Cuál?** (أيّ؟)\n\nImportante: en español las preguntas se abren con **¿** y cierran con **?**`,
        contentAr: `أدوات الاستفهام الإسبانية تشبه كثيراً نظيراتها العربية:\n- ¿Qué? = ماذا؟ / ما؟\n- ¿Quién? = من؟\n- ¿Dónde? = أين؟\n- ¿Cuándo? = متى؟\n- ¿Cómo? = كيف؟\n- ¿Por qué? = لماذا؟\n\nملاحظة مكتوبة: الإسبانية تضع علامة استفهام مقلوبة ¿ في بداية الجملة الاستفهامية!`,
        comparativeCard: {
          spanish: "¿Por qué? (لماذا؟) / ¿Para qué? (لأي غرض؟)",
          arabic: "لماذا؟ / لأي غرض؟",
          explanation: "El español distingue entre '¿Por qué?' (causa, لماذا) y '¿Para qué?' (finalidad, لأي غرض). Una distinción que no existe en árabe con la misma claridad."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Qué palabra usas para preguntar 'dónde' vive alguien?",
          questionAr: "أي كلمة استفهامية تستخدم لسؤال شخص عن مكان إقامته؟",
          options: ["¿Cuándo vives?", "¿Dónde vives?", "¿Cómo vives?"],
          correctAnswer: "¿Dónde vives?",
          arabicGrammarTip: "¿Dónde? تعادل 'أين؟' في العربية، وتستخدم للسؤال عن المكان."
        }
      }
    ]
  },
  {
    id: "l19",
    title: "El Cuerpo Humano",
    titleAr: "جسم الإنسان",
    description: "Vocabulario del cuerpo humano en español con comparaciones gramaticales útiles.",
    descriptionAr: "مفردات أعضاء جسم الإنسان بالإسبانية مع مقارنات نحوية مفيدة.",
    category: "Grammar",
    level: "A1",
    xpReward: 75,
    steps: [
      {
        type: "theory",
        title: "Las partes del cuerpo (أعضاء الجسم)",
        content: `Vocabulario esencial del cuerpo humano:\n\n- Cabeza (رأس) / Cara (وجه)\n- Ojo (عين) / Ojos (عيون)\n- Nariz (أنف) — ¡femenino!\n- Boca (فم) / Dientes (أسنان)\n- Oreja (أذن) / Oído (السمع/الأذن الداخلية)\n- Cuello (رقبة) / Hombro (كتف)\n- Brazo (ذراع) / Mano (يد)\n- Pierna (ساق) / Pie (قدم)\n- Corazón (قلب) / Estómago (معدة)\n\nPara decir que algo te duele: **Me duele** + parte del cuerpo.`,
        contentAr: `تعلم أسماء أعضاء الجسم مهم جداً في المحادثات اليومية وعند زيارة الطبيب.\nللتعبير عن الألم نستخدم: Me duele (يؤلمني)\n- Me duele la cabeza = رأسي يؤلمني\n- Me duele el estómago = معدتي تؤلمني\n\nانتبه: Nariz (الأنف) مؤنث في الإسبانية رغم أن (الأنف) في العربية مذكر!`,
        comparativeCard: {
          spanish: "La nariz (مؤنث) / El brazo (مذكر)",
          arabic: "الأنف (مذكر) / الذراع (مؤنث في الفصحى)",
          explanation: "Varios nombres del cuerpo cambian de género entre árabe y español — otro ejemplo del fenómeno de inversión de género que vimos en la lección 1."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se dice 'me duele la cabeza' en español?",
          questionAr: "كيف نقول 'رأسي يؤلمني' بالإسبانية؟",
          options: ["Tengo dolor cabeza", "Me duele la cabeza", "La cabeza me hace mal"],
          correctAnswer: "Me duele la cabeza",
          arabicGrammarTip: "للتعبير عن الألم: Me duele + أداة التعريف + اسم العضو."
        }
      }
    ]
  },
  {
    id: "l20",
    title: "La Ciudad y los Transportes",
    titleAr: "المدينة ووسائل النقل",
    description: "Aprende a moverte por una ciudad española: preguntar direcciones y usar el transporte público.",
    descriptionAr: "تعلم كيف تتنقل في مدينة إسبانية: طلب الاتجاهات واستخدام وسائل النقل.",
    category: "Culture",
    level: "A2",
    xpReward: 85,
    steps: [
      {
        type: "theory",
        title: "Pedir y dar direcciones (طلب الاتجاهات وإعطاؤها)",
        content: `Frases esenciales para moverte por la ciudad:\n\n**Preguntar:**\n- ¿Dónde está la estación de metro? (أين محطة المترو؟)\n- ¿Cómo llego a...? (كيف أصل إلى...؟)\n- ¿Está lejos? (هل هو بعيد؟)\n\n**Indicar:**\n- Todo recto (على طول)\n- A la derecha (على اليمين)\n- A la izquierda (على اليسار)\n- Gira en la esquina (انعطف عند الزاوية)\n- Está cerca/lejos (إنه قريب/بعيد)\n\n**Transporte:**\n- Metro (مترو) / Autobús (حافلة) / Taxi (تاكسي) / Tren (قطار)`,
        contentAr: `للتنقل في المدن الإسبانية، ستحتاج هذه التعبيرات بشكل يومي.\nالكلمات المفيدة للاتجاهات:\n- Todo recto = على طول / مستقيماً\n- A la derecha = على اليمين\n- A la izquierda = على اليسار\n\nكلمة Metro (مترو) وTaxi (تاكسي) موجودتان في العربية أيضاً — هذا يسهل الأمر!`,
        comparativeCard: {
          spanish: "Metro / Taxi / Autobús",
          arabic: "مترو / تاكسي / أتوبيس",
          explanation: "Muchos términos de transporte urbano son préstamos internacionales que suenan casi idénticos en árabe y español, facilitando su aprendizaje."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo preguntas dónde está la estación de tren?",
          questionAr: "كيف تسأل عن مكان محطة القطار؟",
          options: ["¿Cómo es la estación de tren?", "¿Dónde está la estación de tren?", "¿Cuándo está la estación de tren?"],
          correctAnswer: "¿Dónde está la estación de tren?",
          arabicGrammarTip: "للسؤال عن مكان شيء ما نستخدم: ¿Dónde está + الشيء؟"
        }
      }
    ]
  },
  {
    id: "l21",
    title: "El Pretérito Indefinido: Acciones Pasadas",
    titleAr: "الماضي البسيط: الأحداث المنتهية",
    description: "Aprende a hablar de acciones completadas en el pasado con el pretérito indefinido.",
    descriptionAr: "تعلم كيف تتحدث عن الأحداث المنتهية في الماضي باستخدام الماضي البسيط.",
    category: "Grammar",
    level: "A2",
    xpReward: 95,
    steps: [
      {
        type: "theory",
        title: "Pretérito Indefinido de verbos -AR",
        content: `El pretérito indefinido se usa para acciones **completadas** en el pasado. Para verbos -AR:\n\nYo → **-é** (hablé)\nTú → **-aste** (hablaste)\nÉl → **-ó** (habló)\nNosotros → **-amos** (hablamos)\nVosotros → **-asteis** (hablasteis)\nEllos → **-aron** (hablaron)\n\nSeñales temporales: ayer (أمس), la semana pasada (الأسبوع الماضي), en 2020 (عام 2020), hace dos días (منذ يومين).`,
        contentAr: `الماضي البسيط (Pretérito Indefinido) يستخدم للأحداث المنتهية تماماً في الماضي.\nللأفعال المنتهية بـ -AR، نستبدل النهاية بما يلي:\n- أنا (Yo): -é مثال: hablé (تحدثت)\n- أنت (Tú): -aste مثال: hablaste (تحدثت أنت)\n- هو (Él): -ó مثال: habló (تحدث)\n\nكلمات مفيدة تشير لهذا الزمن:\n- Ayer (أمس)\n- La semana pasada (الأسبوع الماضي)`,
        comparativeCard: {
          spanish: "Ayer hablé con mi familia (أمس تحدثت مع عائلتي)",
          arabic: "تحدثت مع عائلتي أمس",
          explanation: "El pretérito indefinido equivale al الماضي البسيط árabe para acciones puntuales y completadas en el pasado."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se conjuga 'trabajar' en pretérito indefinido para 'Yo'?",
          questionAr: "كيف نصرف فعل 'trabajar' في الماضي البسيط مع ضمير 'Yo'؟",
          options: ["Yo trabajaba", "Yo trabajé", "Yo he trabajado"],
          correctAnswer: "Yo trabajé",
          arabicGrammarTip: "مع ضمير Yo في الماضي البسيط لأفعال -AR، نضيف -é: trabaj + é = trabajé."
        }
      }
    ]
  },
  {
    id: "l22",
    title: "Las Preposiciones: En, A, De, Con",
    titleAr: "حروف الجر الأساسية",
    description: "Domina las preposiciones más usadas del español y evita los errores típicos de traducción literal.",
    descriptionAr: "أتقن حروف الجر الأكثر استخداماً وتجنب أخطاء الترجمة الحرفية.",
    category: "Grammar",
    level: "A2",
    xpReward: 85,
    steps: [
      {
        type: "theory",
        title: "Las preposiciones principales",
        content: `Las preposiciones en español no siempre corresponden a las árabes:\n\n- **En** (في): Estoy **en** casa. Vivo **en** Madrid.\n- **A** (إلى / الـ): Voy **a** la tienda. Llego **a** las 3.\n- **De** (من / لـ): Soy **de** Marruecos. El libro **de** Juan.\n- **Con** (مع): Vivo **con** mi familia.\n- **Por** (بسبب / por): Gracias **por** todo.\n- **Para** (لـ / من أجل): Este regalo es **para** ti.\n\nAtención: **a + el = al** (a + el libro = **al** libro)\n**de + el = del** (de + el mercado = **del** mercado)`,
        contentAr: `حروف الجر الإسبانية تختلف أحياناً عن نظيراتها العربية وتحتاج حفظاً جيداً.\nأهم قاعدة: عندما تلتقي حرف الجر A مع أداة التعريف El، يتحدان:\nA + El = AL (وليس A el)\nوكذلك: De + El = DEL\nمثال: Voy al mercado (أذهب إلى السوق)\nمثال: Vengo del trabajo (أتيت من العمل)`,
        comparativeCard: {
          spanish: "Voy al mercado / Vengo del trabajo",
          arabic: "أذهب إلى السوق / أتيت من العمل",
          explanation: "Las contracciones al (a+el) y del (de+el) son obligatorias en español — no existe equivalente en árabe donde los elementos no se fusionan."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo se dice 'voy al mercado' correctamente?",
          questionAr: "ما هي الصيغة الصحيحة لعبارة 'أذهب إلى السوق'؟",
          options: ["Voy a el mercado", "Voy al mercado", "Voy del mercado"],
          correctAnswer: "Voy al mercado",
          arabicGrammarTip: "A + el = al (إجباري في الإسبانية). لا يجوز قول 'a el' أبداً، بل يجب دمجهما: al."
        }
      }
    ]
  },
  {
    id: "l23",
    title: "Saludos y Despedidas Formales e Informales",
    titleAr: "التحيات والوداع الرسمية وغير الرسمية",
    description: "Aprende cuándo usar saludos formales e informales y las fórmulas culturales españolas.",
    descriptionAr: "تعلم متى تستخدم التحيات الرسمية وغير الرسمية والأعراف الثقافية الإسبانية.",
    category: "Culture",
    level: "A1",
    xpReward: 70,
    steps: [
      {
        type: "theory",
        title: "Saludos formales e informales",
        content: `En español existe una distinción importante entre el trato formal e informal:\n\n**Informal (Tú) — con amigos y familia:**\n- ¡Hola! / ¿Qué tal? / ¿Cómo estás?\n- ¡Hasta luego! / ¡Adiós! / ¡Chao!\n\n**Formal (Usted) — con desconocidos, jefes, mayores:**\n- Buenos días / Buenas tardes / Buenas noches\n- ¿Cómo está usted?\n- Hasta luego / Un placer\n\n**Costumbre española:** los españoles se dan **dos besos** al saludarse (mejilla derecha primero), incluso con desconocidos.`,
        contentAr: `في الإسبانية، كما في العربية، هناك فرق بين الخطاب الرسمي وغير الرسمي:\n- مع الأصدقاء والعائلة: نستخدم Tú (أنت غير رسمي)\n- مع الغرباء والكبار والمسؤولين: نستخدم Usted (أنت رسمي)\n\nعادة اجتماعية مهمة: الإسبان يتبادلون قبلتين على الخد عند التحية (الخد الأيمن أولاً)، حتى مع من يلتقونهم لأول مرة!`,
        comparativeCard: {
          spanish: "Tú (غير رسمي) / Usted (رسمي)",
          arabic: "أنت مع الأصدقاء / حضرتك أو سيادتك مع الرسميين",
          explanation: "Ambas lenguas distinguen el trato formal del informal, aunque el español lo marca principalmente con el pronombre (tú/usted) mientras el árabe usa formas más variadas."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Qué saludo usas al conocer a tu nuevo jefe por primera vez?",
          questionAr: "ما هي التحية المناسبة عند مقابلة رئيسك الجديد لأول مرة؟",
          options: ["¡Hola! ¿Qué tal?", "Buenos días, ¿cómo está usted?", "¡Buenas! ¿Cómo estás?"],
          correctAnswer: "Buenos días, ¿cómo está usted?",
          arabicGrammarTip: "مع الرؤساء والغرباء، نستخدم الصيغة الرسمية Usted وليس Tú غير الرسمي."
        }
      }
    ]
  },
  {
    id: "l24",
    title: "El Diminutivo: -ito e -ita",
    titleAr: "صيغة التصغير: -ito و-ita",
    description: "Descubre el uso del diminutivo español, una forma de afecto y suavidad muy cultural.",
    descriptionAr: "اكتشف استخدام صيغة التصغير الإسبانية، أسلوب ثقافي للتعبير عن المودة.",
    category: "Culture",
    level: "A2",
    xpReward: 80,
    steps: [
      {
        type: "theory",
        title: "Los diminutivos en español",
        content: `El diminutivo se forma añadiendo **-ito** (masculino) o **-ita** (femenino) al sustantivo:\n\n- Casa → Casita (بيت صغير / حبيبي)\n- Café → Cafecito (قهوة صغيرة / قهوة بالمحبة)\n- Momento → Momentito (لحظة صغيرة / لحظيكة)\n- Perro → Perrito (كلب صغير)\n- Abuela → Abuelita (جدة عزيزة)\n\nEl diminutivo no solo indica tamaño pequeño — también expresa **cariño y afecto**. Una madre llama "hijito" a su hijo aunque sea adulto.`,
        contentAr: `صيغة التصغير في الإسبانية (-ito/-ita) تشبه إلى حد ما التصغير في العربية الفصحى.\nلكن الفرق الكبير: في الإسبانية التصغير يُستخدم كثيراً للتعبير عن المودة والحنان وليس فقط للدلالة على الحجم الصغير!\nمثال: Mamá, dame un besito (أماه، أعطيني قبلة صغيرة) = تعبير عن الحب والدلال\nEspérame un momentito (انتظرني لحظيكة) = تخفيف الطلب وإضفاء اللطف`,
        comparativeCard: {
          spanish: "Un momentito / Abuelita / Cafecito",
          arabic: "لحظيكة / جدتي الحبيبة / قهوة صغيرة",
          explanation: "El diminutivo español tiene una función afectiva similar a las formas de cariño árabe como استخدام 'حبيبي' o الاسم مع 'يا' — ambas culturas suavizan el lenguaje con el cariño."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Qué forma diminutiva de 'café' usarías para pedir amablemente un café pequeño?",
          questionAr: "ما هي صيغة التصغير لكلمة 'café' للطلب بطريقة لطيفة؟",
          options: ["Cafito", "Cafecito", "Cafésito"],
          correctAnswer: "Cafecito",
          arabicGrammarTip: "عندما تنتهي الكلمة بحرف متحرك، نضيف -cito/-cita: café → cafecito."
        }
      }
    ]
  },
  {
    id: "l25",
    title: "El Subjuntivo: Deseos y Emociones",
    titleAr: "صيغة الرغبة والأمنيات: المضارع المنصوب",
    description: "Introducción al subjuntivo español para expresar deseos, dudas y emociones.",
    descriptionAr: "مقدمة للمضارع المنصوب الإسباني للتعبير عن الرغبات والشك والمشاعر.",
    category: "Grammar",
    level: "A2",
    xpReward: 100,
    steps: [
      {
        type: "theory",
        title: "¿Qué es el subjuntivo?",
        content: `El subjuntivo es un modo verbal que expresa **subjetividad**: deseos, dudas, emociones y posibilidades. Se activa después de ciertas expresiones:\n\n- **Quiero que** + subjuntivo: Quiero que **vengas** (أريد أن تأتي)\n- **Espero que** + subjuntivo: Espero que **llegues** pronto\n- **Es importante que** + subjuntivo\n- **Ojalá** + subjuntivo: Ojalá **apruebe** (إن شاء الله أنجح)\n\nFormación básica para verbos -AR: quita el -o de la forma Yo y añade: -e, -es, -e, -emos, -éis, -en`,
        contentAr: `المضارع المنصوب (Subjuntivo) هو أحد أصعب جوانب الإسبانية للمتعلم العربي.\nيُستخدم للتعبير عن:\n- الرغبات: Quiero que vengas (أريد أن تأتي)\n- الأمنيات: Ojalá apruebe (إن شاء الله أنجح) ← لاحظ الرابط بـ"إن شاء الله"!\n- المشاعر: Me alegra que estés aquí (يسعدني أن تكون هنا)\n\nكلمة Ojalá التي تعلمناها في درس سابق تطلب دائماً هذه الصيغة!`,
        comparativeCard: {
          spanish: "Ojalá apruebe el examen",
          arabic: "إن شاء الله أنجح في الامتحان",
          explanation: "Ojalá (من 'لو شاء الله') siempre va seguido de subjuntivo — un lazo directo entre la herencia árabe y la gramática española moderna."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "Completa: 'Espero que tú ___ bien' (أتمنى أن تكون بخير)",
          questionAr: "أكمل الجملة باستخدام المضارع المنصوب الصحيح للفعل 'estar':",
          options: ["estás", "estés", "estabas"],
          correctAnswer: "estés",
          arabicGrammarTip: "بعد Espero que نستخدم المضارع المنصوب: estar → estés (للمخاطب)."
        }
      }
    ]
  },
  {
    id: "l26",
    title: "Las Profesiones y el Trabajo",
    titleAr: "المهن والعمل",
    description: "Vocabulario de profesiones y frases útiles para hablar de tu trabajo en español.",
    descriptionAr: "مفردات المهن وعبارات مفيدة للحديث عن عملك بالإسبانية.",
    category: "Culture",
    level: "A2",
    xpReward: 80,
    steps: [
      {
        type: "theory",
        title: "Profesiones comunes (المهن الشائعة)",
        content: `Las profesiones en español tienen forma masculina y femenina:\n\n- Médico / Médica (طبيب/طبيبة)\n- Profesor / Profesora (أستاذ/أستاذة)\n- Ingeniero / Ingeniera (مهندس/مهندسة)\n- Abogado / Abogada (محامي/محامية)\n- Enfermero / Enfermera (ممرض/ممرضة)\n- Cocinero / Cocinera (طباخ/طباخة)\n- Periodista (صحفي/ة) — ¡invariable!\n\n**Para decir tu profesión con SER:**\nSoy médico / Soy profesora\n¡Sin artículo! (no se dice "Soy un médico")`,
        contentAr: `المهن في الإسبانية تأخذ شكلين: مذكر ومؤنث، كما في العربية تماماً!\nلكن هناك فرق مهم: عند تعريف نفسك بمهنتك في الإسبانية، لا تستخدم أداة التعريف:\n- Soy médico (أنا طبيب) ← صح\n- Soy un médico (أنا طبيب) ← خطأ شائع!\n\nهذا عكس الإنكليزية التي تقول "I am a doctor" بأداة التنكير.`,
        comparativeCard: {
          spanish: "Soy médico (بدون أداة تعريف)",
          arabic: "أنا طبيب (بدون أداة تعريف كذلك)",
          explanation: "En este caso el español y el árabe coinciden: ambos omiten el artículo al declarar la profesión con el verbo ser/كان, a diferencia del inglés."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cuál es la forma correcta de decir tu profesión?",
          questionAr: "أي الجمل صحيحة للتعبير عن مهنتك؟",
          options: ["Soy un ingeniero", "Soy ingeniero", "Estoy ingeniero"],
          correctAnswer: "Soy ingeniero",
          arabicGrammarTip: "للتعبير عن المهنة نستخدم SER بدون أداة تعريف: Soy + المهنة مباشرة."
        }
      }
    ]
  },
  {
    id: "l27",
    title: "Al-Ándalus: Historia Compartida",
    titleAr: "الأندلس: التاريخ المشترك",
    description: "Conoce la fascinante historia de 800 años de convivencia árabe-española que moldea el idioma hasta hoy.",
    descriptionAr: "اكتشف التاريخ الرائع لـ800 عام من التعايش العربي الإسباني الذي يشكل اللغة حتى اليوم.",
    category: "Culture",
    level: "A2",
    xpReward: 110,
    steps: [
      {
        type: "theory",
        title: "El legado de Al-Ándalus (إرث الأندلس)",
        content: `Entre los años 711 y 1492, la mayor parte de la Península Ibérica estuvo bajo dominio árabe-bereber, en un período llamado **Al-Ándalus**.\n\nEste período dejó una huella enorme en España:\n- **Más de 4.000 palabras** españolas de origen árabe\n- **Arquitectura**: La Alhambra de Granada, la Mezquita de Córdoba\n- **Ciencia**: álgebra, algoritmo, alquimia, alambique\n- **Agricultura**: acequia, noria, alberca\n- **Gastronomía**: aceite, arroz, azúcar, azafrán\n\nCórdoba fue durante siglos la ciudad más avanzada de Europa occidental.`,
        contentAr: `من عام 711 إلى 1492م، حكم العرب والبربر معظم شبه الجزيرة الإيبيرية في عصر أطلق عليه "الأندلس".\nكانت قرطبة (Córdoba) عاصمة علمية وثقافية لا مثيل لها في أوروبا آنذاك، بمكتباتها التي تضم مئات الآلاف من المخطوطات.\nهذا التعايش الحضاري ترك بصمة لا تمحى في اللغة الإسبانية، والعمارة، والعلوم، والمطبخ.`,
        comparativeCard: {
          spanish: "La Alhambra = القلعة الحمراء (Al-Hamra)",
          arabic: "الحمراء → أجمل قصر في أوروبا",
          explanation: "El nombre 'Alhambra' proviene del árabe 'Al-Qal'a Al-Hamra' (القلعة الحمراء), la fortaleza roja — un monumento vivo al legado andalusí."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cuántos años aproximadamente duró la presencia árabe en Al-Ándalus?",
          questionAr: "كم سنة تقريباً استمر الوجود العربي في الأندلس؟",
          options: ["200 años", "500 años", "800 años"],
          correctAnswer: "800 años",
          arabicGrammarTip: "من 711 إلى 1492م = حوالي 800 عام من التعايش الحضاري الذي أثرى اللغة الإسبانية."
        }
      }
    ]
  },
  {
    id: "l28",
    title: "Los Conectores: Pero, Porque, Aunque",
    titleAr: "أدوات الربط: لكن، لأن، رغم أن",
    description: "Aprende a conectar ideas en español usando los conectores más frecuentes.",
    descriptionAr: "تعلم كيف تربط الأفكار في الإسبانية باستخدام أدوات الربط الأكثر شيوعاً.",
    category: "Grammar",
    level: "A2",
    xpReward: 85,
    steps: [
      {
        type: "theory",
        title: "Conectores esenciales",
        content: `Los conectores unen ideas y dan fluidez al discurso:\n\n**Contraste:**\n- **Pero** (لكن): Me gusta el café, **pero** prefiero el té.\n- **Sin embargo** (ومع ذلك): Es difícil; **sin embargo**, es posible.\n- **Aunque** (رغم أن / على الرغم): **Aunque** llueve, salgo.\n\n**Causa:**\n- **Porque** (لأن): No vine **porque** estaba enfermo.\n- **Como** (بما أن): **Como** no había bus, fui a pie.\n\n**Consecuencia:**\n- **Por eso** (لذلك): Estudié mucho, **por eso** aprobé.\n- **Entonces** (إذن): **Entonces**, ¿qué hacemos?`,
        contentAr: `أدوات الربط تجعل لغتك أكثر طلاقة وطبيعية.\nأهمها للمتعلم العربي:\n- Pero = لكن (للتعبير عن التناقض)\n- Porque = لأن (للتعبير عن السبب)\n- Aunque = رغم أن (للتعبير عن الاستدراك)\n- Por eso = لذلك (للتعبير عن النتيجة)\n\nلاحظ: Porque (لأن) يختلف عن ¿Por qué? (لماذا؟) في الكتابة والنطق!`,
        comparativeCard: {
          spanish: "Porque (لأن) / ¿Por qué? (لماذا؟)",
          arabic: "لأن (سبب) / لماذا؟ (سؤال)",
          explanation: "Porque y ¿Por qué? suenan similar pero son opuestos: uno es respuesta (causa) y el otro es pregunta. Como en árabe لأن/لماذا."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Qué conector usas para explicar una causa? 'No fui al trabajo ___ estaba enfermo'",
          questionAr: "أي أداة ربط تستخدم للتعبير عن السبب في هذه الجملة؟",
          options: ["pero", "aunque", "porque"],
          correctAnswer: "porque",
          arabicGrammarTip: "Porque = لأن، يُستخدم للتعبير عن السبب والتعليل في الجملة."
        }
      }
    ]
  },
  {
    id: "l29",
    title: "La Vivienda y el Hogar",
    titleAr: "السكن والمنزل",
    description: "Vocabulario esencial para hablar de tu casa, buscar piso y describir tu hogar en España.",
    descriptionAr: "مفردات أساسية للحديث عن منزلك والبحث عن شقة ووصف مسكنك في إسبانيا.",
    category: "Culture",
    level: "A2",
    xpReward: 80,
    steps: [
      {
        type: "theory",
        title: "Partes de la casa (أجزاء المنزل)",
        content: `Vocabulario clave de la vivienda:\n\n**Tipos de vivienda:**\n- Piso/Apartamento (شقة)\n- Casa (منزل/بيت)\n- Habitación (غرفة)\n\n**Partes:**\n- Salón/Sala de estar (غرفة المعيشة)\n- Cocina (مطبخ)\n- Dormitorio (غرفة النوم)\n- Baño (حمام)\n- Balcón (شرفة)\n\n**Buscar piso:**\n- ¿Cuánto es el alquiler? (كم الإيجار؟)\n- ¿Está amueblado? (هل هو مفروش؟)\n- ¿Hay calefacción? (هل يوجد تدفئة؟)\n\nCuriosidad: **Alquiler** viene del árabe **الكراء** — ¡ya lo aprendiste!`,
        contentAr: `مفردات المنزل مهمة جداً للحياة اليومية في إسبانيا.\nتذكر: كلمة Alquiler (إيجار) من الدرس السابق عن الأندلس!\n\nعند البحث عن شقة ستحتاج:\n- ¿Cuánto es el alquiler? (كم الإيجار؟)\n- ¿Está amueblado? (هل المنزل مفروش؟)\n- ¿Cuántas habitaciones tiene? (كم عدد الغرف؟)`,
        comparativeCard: {
          spanish: "Alquiler (إيجار) del árabe Al-kira (الكراء)",
          arabic: "الكراء / الإيجار",
          explanation: "Una de las palabras más prácticas para vivir en España — y tiene raíz árabe directa que ya conoces."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo preguntas el precio del alquiler de un piso?",
          questionAr: "كيف تسأل عن سعر إيجار الشقة؟",
          options: ["¿Cómo es el alquiler?", "¿Cuánto es el alquiler?", "¿Dónde es el alquiler?"],
          correctAnswer: "¿Cuánto es el alquiler?",
          arabicGrammarTip: "للسؤال عن السعر نستخدم ¿Cuánto? (كم؟) + es + الشيء."
        }
      }
    ]
  },
  {
    id: "l30",
    title: "La Salud y el Médico",
    titleAr: "الصحة والطبيب",
    description: "Vocabulario y frases esenciales para visitar al médico y hablar de salud en España.",
    descriptionAr: "مفردات وعبارات أساسية لزيارة الطبيب والحديث عن الصحة في إسبانيا.",
    category: "Culture",
    level: "A2",
    xpReward: 90,
    steps: [
      {
        type: "theory",
        title: "En la consulta médica (في عيادة الطبيب)",
        content: `Frases esenciales para el médico:\n\n**Síntomas:**\n- Me duele la cabeza/el estómago (رأسي/معدتي تؤلمني)\n- Tengo fiebre (عندي حمى)\n- Tengo tos (عندي سعال)\n- Me encuentro mal (أشعر بتعب)\n- Estoy mareado/a (أشعر بدوار)\n\n**En la consulta:**\n- Necesito ver al médico (أحتاج رؤية الطبيب)\n- ¿Tiene cita? (هل لديك موعد؟)\n- Abra la boca (افتح فمك)\n- Respire hondo (خذ نفساً عميقاً)\n- Le receto... (سأصف لك...)\n\n**Sistema sanitario:** En España existe la **Seguridad Social** — sanidad pública universal y gratuita.`,
        contentAr: `زيارة الطبيب من المواقف الأساسية في الحياة اليومية.\nعبارات مهمة يجب حفظها:\n- Tengo fiebre = عندي حمى (نستخدم TENER وليس SER)\n- Me duele + العضو = يؤلمني...\n- Me encuentro mal = أشعر بتعب (تعبير شائع جداً)\n\nمعلومة ثقافية مهمة: إسبانيا تمتلك نظام صحي عام مجاني (Seguridad Social) يمكن الوصول إليه بعد التسجيل في البلدية (empadronamiento).`,
        comparativeCard: {
          spanish: "Tengo fiebre / Me duele la garganta",
          arabic: "عندي حمى / حلقي يؤلمني",
          explanation: "Para síntomas físicos el español usa TENER (fiebre, tos) o el verbo DOLER (duele) — dos estructuras distintas que hay que memorizar para comunicarse con el médico."
        }
      },
      {
        type: "exercise",
        exercise: {
          question: "¿Cómo dices que tienes fiebre al médico?",
          questionAr: "كيف تخبر الطبيب بأن لديك حمى؟",
          options: ["Estoy fiebre", "Soy fiebre", "Tengo fiebre"],
          correctAnswer: "Tengo fiebre",
          arabicGrammarTip: "للأعراض الجسدية مثل الحمى والسعال نستخدم TENER: Tengo fiebre / Tengo tos."
        }
      }
    ]
  }
];
