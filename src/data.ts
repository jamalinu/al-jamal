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
];
