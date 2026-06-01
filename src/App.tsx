import React, { useState, useEffect, useRef, FormEvent } from "react";
import {
  BookOpen,
  Mic,
  Award,
  TrendingUp,
  Settings,
  Flame,
  User,
  Plus,
  Trash2,
  Lock,
  Calendar,
  Download,
  Wifi,
  WifiOff,
  Volume2,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  GraduationCap,
  Save,
  CheckCircle2,
  Share2,
  RefreshCw,
  Bell,
  Heart,
  Grid,
  FileText,
  Clock,
  Check,
  X,
  Info
} from "lucide-react";
import { UserProfile, Lesson, Tutor, Achievement, ScheduledSession, Message, SavedSession } from "./types";
import { TUTORS, INITIAL_ACHIEVEMENTS, LESSONS, DAILY_WORDS } from "./data";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import LessonsTab from "./components/LessonsTab";

// Web Audio API Award Chime Helper
const playXPSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Quick ascending scale (C5 -> E5 -> G5 -> C6)
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.1);
    osc.frequency.setValueAtTime(783.99, now + 0.2);
    osc.frequency.setValueAtTime(1046.50, now + 0.3);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    
    osc.start();
    osc.stop(now + 0.55);
  } catch (e) {
    console.warn("Audio Context not supported or allowed yet.");
  }
};

// Fail-safe buzzer sound
const playFailSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.3);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.start();
    osc.stop(now + 0.35);
  } catch (e) {
    console.warn("Audio context error.");
  }
};

const FLASHCARDS_DATA = [
  {
    id: 1,
    category: "Constitución • الدستور",
    question: "¿Cuál es el valor superior del ordenamiento jurídico español según la Constitución?",
    questionAr: "ما هي القيمة العليا للنظام القانوني الإسباني وفقاً للدستور؟",
    answer: "La libertad, la justicia, la igualdad y el pluralismo político.",
    answerAr: "الحرية، والعدل، والمساواة، والتعددية السياسية (المادة 1.1 من الدستور).",
    hint: "Artículo 1.1.",
    hintAr: "المادة الأولى."
  },
  {
    id: 2,
    category: "Geografía • الجغرافيا",
    question: "¿Cuáles son las dos ciudades autónomas españolas en el norte de África?",
    questionAr: "ما هما المدينتان المستقلتان اللتان تتبعان إسبانيا في شمال إفريقيا؟",
    answer: "Ceuta y Melilla.",
    answerAr: "سبتة ومليلية المحاذيتان للمغرب.",
    hint: "Ciudades fronterizas independientes.",
    hintAr: "مدن حدودية مستقلة."
  },
  {
    id: 3,
    category: "Arabismos • الكلمات المعربة",
    question: "¿De qué palabra árabe procede la palabra española 'Alquiler'?",
    questionAr: "من أي كلمة عربية تأتي الكلمة الإسبانية Alquiler (إيجار)؟",
    answer: "Procede del árabe andalusí 'al-kira' (الكراء o el alquiler).",
    answerAr: "تأتي من الكلمة العربية الأندلسية 'الكراء' التي تعني دفع البدل للاستئجار.",
    hint: "Empieza por 'al-' y tiene que ver con transacciones.",
    hintAr: "تبدأ بالـ التعريف وتتعلق بالمعاملات التجارية."
  },
  {
    id: 4,
    category: "Cultura • الثقافة",
    question: "¿Quién escribió la obra universal 'Don Quijote de la Mancha'?",
    questionAr: "من الذي كَتَبَ رواية 'دون كيخوتي دي لا مانشا' العالمية؟",
    answer: "Fue escrita por Miguel de Cervantes Saavedra en 1605.",
    answerAr: "كتبها الأديب ميغيل دي سيرفانتس في عام 1605 وتعد أول رواية حديثة.",
    hint: "El autor que da nombre al Instituto Cervantes.",
    hintAr: "الكاتب العبقري الذي يحمل المعهد اسمه."
  },
  {
    id: 5,
    category: "Derechos • الحقوق",
    question: "¿Tienen los extranjeros derecho al sufragio en las elecciones municipales en España?",
    questionAr: "هل يحق للأجانب التصويت في الانتخابات البلدية داخل إسبانيا؟",
    answer: "Sí, siempre que exista un acuerdo de reciprocidad o tratado bilateral con su país de origen.",
    answerAr: "نعم، بشرط وجود اتفاقية معاملة بالمثل أو معاهدة سلام ثنائية مع بلدهم الأصلي.",
    hint: "Depende del tratado de reciprocidad.",
    hintAr: "يعتمد على مبدأ المعاملة بالمثل بين الدولتين."
  },
  {
    id: 6,
    category: "Léxico Cervantes • مصطلحات سيرفانتس",
    question: "¿Qué significa el concepto de 'Convocatoria' en los exámenes DELE o CCSE?",
    questionAr: "ماذا يعني مصطلح 'Convocatoria' في اختبارات معهد سيرفانتس؟",
    answer: "Se refiere a la campaña oficial de examen fijada para un mes específico.",
    answerAr: "يشير إلى الدورة الرسمية المحددة للامتحانات في شهر معين من السنة.",
    hint: "Es el periodo elegido para examinarse.",
    hintAr: "الفترة الزمنية المختارة لتقديم الامتحان."
  }
];

export default function App() {
  // Navigation Tabs: 'lessons' | 'voice' | 'misiones' | 'progreso' | 'ajustes'
  const [activeTab, setActiveTab] = useState<"lessons" | "voice" | "misiones" | "progreso" | "ajustes">("lessons");

  // User Profile with standard key-value local state cached in LocalStorage
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("andalus_profile");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      username: "Ahmad Al-Khatib",
      level: "B1",
      xp: 2450,
      points: 180,
      streak: 18,
      lastPracticeDate: new Date().toISOString().split("T")[0],
      completedLessons: ["l1"],
      completedTests: [],
      achievements: INITIAL_ACHIEVEMENTS,
      scheduledSessions: [
        { id: "s1", date: "2026-06-02", time: "18:30", topic: "Clase de Gramática con Sofía", notifyBefore: true }
      ],
      dailyGoalMins: 20,
      practiceDuration: {
        "2026-05-22": 15,
        "2026-05-23": 25,
        "2026-05-24": 30,
        "2026-05-25": 10,
        "2026-05-26": 22,
        "2026-05-27": 18,
        "2026-05-28": 15
      },
      notificationsEnabled: true,
      widgetSetting: {
        showStreak: true,
        showDailyWord: false,
        showNextClass: false,
        selectedWordId: "w1"
      }
    };
  });

  // Save profile helper
  const updateProfile = (updater: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setProfile(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem("andalus_profile", JSON.stringify(next));
      return next;
    });
  };

  // State definitions
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isBiometricLocked, setIsBiometricLocked] = useState<boolean>(false);
  const [biometricAuthenticated, setBiometricAuthenticated] = useState<boolean>(true);
  const [currentNotification, setCurrentNotification] = useState<{ title: string; body: string } | null>(null);

  // Widget settings simulator State
  const [activeWidgetWordIdx, setActiveWidgetWordIdx] = useState<number>(0);

  // AI Avatar Generator State
  const [aiAvatarPrompt, setAiAvatarPrompt] = useState<string>("");
  const [aiAvatarPreview, setAiAvatarPreview] = useState<string | null>(null);
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState<boolean>(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  // Scheduling State
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<string>("");
  const [scheduleTopic, setScheduleTopic] = useState<string>("Gramática Comparada");

  // Voice Lab state
  const [selectedVoicePhraseIdx, setSelectedVoicePhraseIdx] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [microphoneAllowed, setMicrophoneAllowed] = useState<boolean | null>(null);
  const [waveformBars, setWaveformBars] = useState<number[]>(Array(18).fill(10));
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [voiceFeedback, setVoiceFeedback] = useState<string>("");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const voiceTimerRef = useRef<any>(null);

  // Chat integration State
  const [selectedTutor, setSelectedTutor] = useState<Tutor>(TUTORS[0]);
  const [chatMessages, setChatMessages] = useState<{ [tutorId: string]: Message[] }>(() => {
    const saved = localStorage.getItem("andalus_active_chats");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      sofia: [
        { role: "model", text: "¡Hola! السلام عليكم. Soy la Dra. Sofía. ¿Qué tal tu día? Estoy aquí para resolver tus dudas gramaticales comparando el español con el árabe en todo momento. ¡Pregúntame lo que quieras!", timestamp: "10:30" }
      ],
      carlos: [
        { role: "model", text: "¡Ahlan! Me apasiona la conexión histórica entre el español y el árabe. ¿Sabías que cuando comes 'Arroz' o te reclinas sobre una 'Almohada' estás hablando árabe con acento hispanico? ¡Cuéntame qué quieres descubrir hoy!", timestamp: "10:31" }
      ],
      amira: [
        { role: "model", text: "¡Hola, futuro bilingüe! Pronunciar la 'P' y la 'CH' puede ser un reto para nosotros por asimilaciones acústicas cotidianas. Hagamos unos ejercicios prácticos de fonética. ¡Escríbeme una frase para ensayar hoy!", timestamp: "10:32" }
      ]
    };
  });
  const [currentInputText, setCurrentInputText] = useState<string>("");
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);

  // Past conversations history stored in LocalStorage
  const [pastSessions, setPastSessions] = useState<SavedSession[]>(() => {
    const saved = localStorage.getItem("andalus_past_sessions");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });
  const [showHistoryView, setShowHistoryView] = useState<boolean>(false);
  const [inspectingSession, setInspectingSession] = useState<SavedSession | null>(null);

  // Sync active chats and past sessions to local storage
  useEffect(() => {
    localStorage.setItem("andalus_active_chats", JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem("andalus_past_sessions", JSON.stringify(pastSessions));
  }, [pastSessions]);

  // Monthly test State
  const [activeTestLevel, setActiveTestLevel] = useState<"A1" | "A2" | "B1" | "CCSE" | "DELE_A2" | null>(null);
  const [testQuestionIdx, setTestQuestionIdx] = useState<number>(0);
  const [testAnswers, setTestAnswers] = useState<string[]>([]);
  const [testScore, setTestScore] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // CCSE / DELE A2 Citizenship simulation addition state
  const [testTimeLeft, setTestTimeLeft] = useState<number>(180); // 180 seconds = 3 minutes of practice countdown
  const [testTimerActive, setTestTimerActive] = useState<boolean>(false);
  const [testReviewMode, setTestReviewMode] = useState<boolean>(false);

  // Cervantes and CCSE interactive flashcards
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState<number>(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState<boolean>(false);
  const [learnedFlashcards, setLearnedFlashcards] = useState<number[]>([]);

  // Active testing countdown timer (3 minutes = 180 seconds)
  useEffect(() => {
    let timerId: any = null;
    if (activeTestLevel && !testReviewMode && !showCertificate && testScore === null) {
      timerId = setInterval(() => {
        setTestTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            // Auto finish test on timeout
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [activeTestLevel, testReviewMode, showCertificate, testScore]);

  // Keyboard Accessibility for Flashcards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside a form input or chat box
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        return;
      }

      if (activeTab === "lessons") {
        if (e.code === "Space") {
          e.preventDefault();
          setFlashcardFlipped(prev => !prev);
        } else if (e.code === "ArrowRight") {
          e.preventDefault();
          setFlashcardFlipped(false);
          setCurrentFlashcardIdx(prev => prev === FLASHCARDS_DATA.length - 1 ? 0 : prev + 1);
        } else if (e.code === "ArrowLeft") {
          e.preventDefault();
          setFlashcardFlipped(false);
          setCurrentFlashcardIdx(prev => prev === 0 ? FLASHCARDS_DATA.length - 1 : prev - 1);
        } else if (e.code === "KeyM") {
          e.preventDefault();
          const cardId = FLASHCARDS_DATA[currentFlashcardIdx].id;
          if (learnedFlashcards.includes(cardId)) {
            setLearnedFlashcards(prev => prev.filter(id => id !== cardId));
            triggerNotification("ℹ️ Tarjeta de Repaso", "Tarjeta devuelta a la pila de estudio.");
          } else {
            setLearnedFlashcards(prev => [...prev, cardId]);
            playXPSound();
            updateProfile(prev => ({
              ...prev,
              xp: prev.xp + 15,
              points: prev.points + 5
            }));
            triggerNotification("💡 +15 XP Recibidos", "¡Tarjeta memorizada con éxito! Sigue sumando.");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTab, currentFlashcardIdx, learnedFlashcards]);

  const handleTimeOut = () => {
    playFailSound();
    // Calculate final score with whatever answered so far
    const list = TEST_QUESTIONS[activeTestLevel!];
    const currentFilled = [...testAnswers];
    while (currentFilled.length < 5) {
      currentFilled.push("");
    }
    let correctCount = 0;
    currentFilled.forEach((ans, idx) => {
      if (ans === list[idx].correct) correctCount++;
    });
    const percent = (correctCount / 5) * 100;
    setTestAnswers(currentFilled);
    setTestScore(percent);
    setTestReviewMode(true);
    triggerNotification("⚠️ Tiempo Agotado", `El simulador de examen finalizó por tiempo límite de 3 minutos. Puntuación: ${percent}%.`);
  };

  // Calendar View state (init to May 2026 based on the system local time 2026-05-31)
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [calendarMonth, setCalendarMonth] = useState<number>(4); // 4 = May (0-indexed)
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<string | null>(null); // "YYYY-MM-DD" or null
  const [quickSchTime, setQuickSchTime] = useState<string>("18:30");
  const [quickSchTopic, setQuickSchTopic] = useState<string>("Clase de Repaso con Tutor");

  // Custom daily goal minutes slider helper
  const [sliderMins, setSliderMins] = useState<number>(profile.dailyGoalMins);

  // Dynamic system notifications triggering
  const triggerNotification = (title: string, body: string) => {
    if (!profile.notificationsEnabled) return;
    setCurrentNotification({ title, body });
    setTimeout(() => {
      setCurrentNotification(null);
    }, 4500);
  };

  // Speaks spanish phrases dynamically
  const speakSpanishPhrase = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      // Filter out bracket explanations or Arabic additions
      const cleanText = text.replace(/[\u0600-\u06FF]/g, "").replace(/\(.*?\)/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "es-ES";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("La síntesis de voz no es compatible con este navegador.");
    }
  };

  // Simulated live voice analysis & microphone permission request
  const startRecording = async () => {
    try {
      if (isListening) return;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneAllowed(true);
      setIsListening(true);
      setPronunciationScore(null);
      setVoiceFeedback("");

      // Start simulating waveform movement
      let steps = 0;
      const interval = setInterval(() => {
        setWaveformBars(() =>
          Array(18).fill(0).map(() => Math.floor(Math.random() * 60) + 12)
        );
        steps++;
        if (steps > 20) {
          clearInterval(interval);
          finishRecording();
        }
      }, 150);
      voiceTimerRef.current = interval;
    } catch (e) {
      // Fallback if mic permission is denied or frame blocks it
      setMicrophoneAllowed(false);
      setIsListening(true);
      setPronunciationScore(null);
      setVoiceFeedback("");

      let steps = 0;
      const interval = setInterval(() => {
        setWaveformBars(() =>
          Array(18).fill(0).map(() => Math.floor(Math.random() * 40) + 8)
        );
        steps++;
        if (steps > 15) {
          clearInterval(interval);
          finishRecording();
        }
      }, 150);
      voiceTimerRef.current = interval;
    }
  };

  const finishRecording = () => {
    setIsListening(false);
    // Calculated mock score with personalized grammar correction and tips based on selected phrase
    const scores = [88, 92, 95, 76, 82];
    const finalScore = scores[Math.floor(Math.random() * scores.length)];
    setWaveformBars(Array(18).fill(10));
    setPronunciationScore(finalScore);

    const phrase = VOICE_PHRASES[selectedVoicePhraseIdx];
    let tip = "";
    if (phrase.word.toLowerCase().includes("perro")) {
      tip = "Consejo para hablantes árabes: La 'rr' múltiple inexistente en la dárija y el fusha requiere vibrar el ápice en el paladar sin forzar la glotis.";
    } else if (phrase.word.toLowerCase().includes("computadora") || phrase.word.toLowerCase().includes("padre")) {
      tip = "Consejo: Evita sonorizar la pronunciación de la 'P'. Asegura la eyección de aire colocándote un trozo de papel frente a los labios.";
    } else if (phrase.word.toLowerCase().includes("choque") || phrase.word.toLowerCase().includes("leche")) {
      tip = "Consejo para la 'ch': No la asimiles simplemente con la 'sh' (ش). En español es oclusiva sorda, suena como 't' + 'sh' unidas.";
    } else {
      tip = "¡Increíble melodía acústica! Tu cadencia respeta el compás de las sílabas agudas españolas.";
    }

    setVoiceFeedback(tip);

    if (finalScore >= 80) {
      playXPSound();
      updateProfile(prev => ({
        ...prev,
        xp: prev.xp + 15,
        points: prev.points + 5
      }));
      triggerNotification("🎤 ¡Buena Pronunciación!", `Obtuviste un ${finalScore}% en tu práctica diaria vocálica.`);
    } else {
      playFailSound();
    }
  };

  // Call API for Gemini chat tutoring
  const handleSendChatMessage = async () => {
    if (!currentInputText.trim() || isLoadingChat) return;

    const userMsgText = currentInputText.trim();
    const newMsg: Message = { role: "user", text: userMsgText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    // Add User message synchronously
    setChatMessages(prev => ({
      ...prev,
      [selectedTutor.id]: [...(prev[selectedTutor.id] || []), newMsg]
    }));
    setCurrentInputText("");
    setIsLoadingChat(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...(chatMessages[selectedTutor.id] || []), newMsg],
          tutorInfo: {
            name: selectedTutor.name,
            style: `${selectedTutor.specialty}. Estilo: ${selectedTutor.style}. ${selectedTutor.styleEn}`,
            level: selectedTutor.level
          }
        })
      });

      if (!response.ok) {
        throw new Error("Server communication fault");
      }

      const resData = await response.json();
      const rawText = resData.text || "Disculpa, no he podido asimilar tu frase correctamente. ¿Podrías repetirla de otra manera?";

      setChatMessages(prev => ({
        ...prev,
        [selectedTutor.id]: [
          ...(prev[selectedTutor.id] || []),
          { role: "model", text: rawText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]
      }));
    } catch (e) {
      console.error(e);
      // Beautiful high fidelity localized fallback offline responses
      let fallbackText = "";
      if (selectedTutor.id === "sofia") {
        fallbackText = `¡Excelente intento! Como estamos operando en modo asíncrono o fuera de línea temporalmente, te aclaro: recuerda que 'el mapa' es masculino (mientras que 'casa' es femenino). ¡Pregúntame en línea para análisis sintácticos complejos en tiempo real!`;
      } else if (selectedTutor.id === "carlos") {
        fallbackText = `Soberbia observación. Te recuerdo un dato clave: de la palabra árabe 'al-matrah' (المطرح) sacamos la hermosa palabra española 'colchón' medieval. ¡Los arabismos son infinitos!`;
      } else {
        fallbackText = `¡Suena fantástico! Sigue insistiendo en la asimilación vibratoria de la doble 'r' y la sutil expulsión de aire en la 'p'. ¡Sigue ensayando diariamente!`;
      }

      setTimeout(() => {
        setChatMessages(prev => ({
          ...prev,
          [selectedTutor.id]: [
            ...(prev[selectedTutor.id] || []),
            { role: "model", text: fallbackText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]
        }));
      }, 1200);
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Mini test database
  const TEST_QUESTIONS = {
    A1: [
      {
        question: "¿Cuál frase usa correctamente la diferencia de géneros gramaticales?",
        questionAr: "أي جملة تستخدم الفروقات الجنسية الثقافية للكلمات بطريقة صحيحة؟",
        options: ["Me gusta el leche frío", "La leche está fría y el sol está alto", "El luna es muy brillante hoy"],
        correct: "La leche está fría y el sol está alto",
        explanation: "En español, 'leche' es femenino ('la leche') y 'sol' es masculino ('el sol'). Los géneros gramaticales difieren de la regla general del árabe, donde leche (حليب) es masculino y sol (شمس) es femenino.",
        explanationAr: "في الإسبانية، كلمة Leche (الحليب) مؤنثة وتأخذ La، وSol (الشمس) مذكر ويأخذ El. هذا معاكس تماماً للتذكير والتأنيث في اللغة العربية."
      },
      {
        question: "En español, a diferencia de la oración nominal árabe, es obligatorio usar:",
        questionAr: "في الإسبانية، على عكس الجملة الاسمية العربية بدون أفعال، من الضروري استخدام:",
        options: ["Los pronombres dobles", "Los verbos Ser o Estar en presente", "El infinitivo directo sin enlaces"],
        correct: "Los verbos Ser o Estar en presente",
        explanation: "La oración nominal árabe (ej. 'Ahmad tabib') no es admisible en español; siempre es obligatorio usar un verbo copulativo 'ser' o 'estar' ('Ahmad es médico').",
        explanationAr: "الجملة الاسمية في العربية لا تتطلب فعلاً رابطاً (مثال: أحمد طبيب)، بينما في الإسبانية يجب بالضرورة استخدام أفعال الكينونة Ser أو Estar دائماً."
      },
      {
        question: "¿Cómo se traduce 'Yo soy médico' (profesión permanente)?",
        questionAr: "كيف تترجم عبارة 'أنا طبيب' كمهنة ثابتة ومستقرة؟",
        options: ["Yo soy médico", "Yo estoy médico", "Yo tengo médico"],
        correct: "Yo soy médico",
        explanation: "Para referirse a profesiones, cargos estables, nacionalidad u origen, se usa de forma obligatoria el verbo 'Ser' ('Yo soy médico'), nunca 'Estar'.",
        explanationAr: "للتعبير عن المهن الدائمة والوظائف الثابتة أو المصدر والجنسية، نستخدم فعل الكينونة المستمر Ser وليس Estar."
      },
      {
        question: "¿Cómo se dice 'La almohada es suave' recordando su etimología árabe?",
        questionAr: "كيف نقول 'المخدة ناعمة' مستحضرين أصلها العربي؟",
        options: ["El almohada es suave", "La almohada es suave", "Un almohado es suave"],
        correct: "La almohada es suave",
        explanation: "A pesar de provenir del arabismo 'al-mukhaddah', la palabra 'almohada' empieza por 'a-' átona, por lo que lleva el artículo femenino normal: 'la almohada'.",
        explanationAr: "رغم أن كلمة Almohada مشتقة من الكلمة العربية 'المخدة'، إلا أنها في الإسبانية تبدأ بحرف a غير مشدد، وتأخذ أداة التأنيث العادية La."
      },
      {
        question: "La palabra 'Ojalá' deriva exactamente de la frase árabe:",
        questionAr: "كلمة 'Ojalá' مشتقة أساساً من العبارة العربية تمني القضاء:",
        options: ["Al-Mukhaddah (المخدة)", "In Sha Allah / Law Sha' Allah (لو شاء الله)", "As-Sukkar (السكر)"],
        correct: "In Sha Allah / Law Sha' Allah (لو شاء الله)",
        explanation: "La palabra 'Ojalá' es uno de los legados hispanoárabes más extendidos, surgiendo de la expresión de deseo 'Law sha'a Allah' o 'In sha'a Alá' (si Dios quiere).",
        explanationAr: "كلمة التمني الإسبانية 'Ojalá' (يا ليت / عسى) مشتقة تاريخياً من العبارة العربية الإسلامية 'لو شاء الله' أو 'إن شاء الله'."
      }
    ],
    A2: [
      {
        question: "¿Cuál de estos alimentos es un arabismo célebre en España?",
        questionAr: "أي من هذه الأطعمة يعتبر من الكلمات الأندلسية المستعارة الشهيرة بالإسبانية؟",
        options: ["La manzana", "El aceite que viene de 'az-zayt'", "La patata andina"],
        correct: "El aceite que viene de 'az-zayt'",
        explanation: "La palabra 'aceite' deriva del árabe hispánico 'az-zayt' (el jugo del olivo). Es un claro ejemplo de arabismo léxico y gastronómico de la época de Al-Andalus.",
        explanationAr: "تأتي كلمة Aceite (الزيت) من الكلمة العربية 'الزيت' (أصلها الأندلسي az-zayt)، وهي مثال واضح على تأثير الثقافة والطبخ الأندلسي."
      },
      {
        question: "Diga la frase correcta sobre ubicación temporal o espacial:",
        options: ["Yo soy en Al-Andalus", "Yo estoy en Al-Andalus", "Yo tengo en Al-Andalus"],
        correct: "Yo estoy en Al-Andalus",
        explanation: "Para expresar localización geográfica o ubicación espacial (ya sea permanente o temporal) es mandatorio emplear el verbo 'Estar' ('Yo estoy en Al-Andalus').",
        explanationAr: "للتعبير عن التواجد في مكان أو موقع جغرافي، نستخدم دائماً فعل Estar (أنا متواجد في) وليس Ser."
      },
      {
        question: "En español la letra 'P' es:",
        options: ["Sonora como la B árabe", "Sorda y requiere expulsar un soplo de aire", "Nasalizada profunda"],
        correct: "Sorda y requiere expulsar un soplo de aire",
        explanation: "La letra 'P' es un fonema oclusivo bilabial sordo en español, lo que significa que no vibran las cuerdas vocales, produciendo una expulsión súbita de aire que no existe en el árabe estándar.",
        explanationAr: "حرف P هو صوت شفتي انفجاري مهمس (لا تهتز فيه الحبال الصوتية) ويحتاج لإخراج هواء، وهو غير موجود في اللغة العربية الفصحى مما يسبب خلطه مع حرف B."
      },
      {
        question: "'El coche' en español es de género regulado:",
        options: ["Femenino como la palabra 'السيارة'", "Masculino a la inversa del árabe", "Neutro"],
        correct: "Masculino a la inversa del árabe",
        explanation: "La palabra 'coche' en español es de género masculino ('el coche'), a diferencia del idioma árabe donde el término homólogo 'السَّيَّارَة' es femenino.",
        explanationAr: "كلمة السيارة (Coche) مذكرة في الإسبانية (El coche)، على عكس نظيرتها في اللغة العربية التي تكون مؤنثة."
      },
      {
        question: "El artículo 'al-' al principio de palabras españolas como 'alberca' representa:",
        options: ["La preposición de origen", "El artículo definido árabe 'الـ'", "Una redundancia moderna"],
        correct: "El artículo definido árabe 'الـ'",
        explanation: "El prefijo 'al-' o 'a-' en vocablos de influencia morisca ('alberca', 'alfombra', 'alcoba') absorbió el antiguo artículo definido árabe 'الـ' de forma permanente en el lexema español.",
        explanationAr: "البادئة Al- أو A- في الكثير من الكلمات الإسبانية مثل (Alberca - بركة) تمثل أداة التعريف العربية 'الـ' التي اندمجت في بنيتها اللغوية."
      }
    ],
    B1: [
      {
        question: "El subjuntivo en oraciones que expresan deseos como '¡Ojalá tengas buen viaje!' equivale al:",
        options: ["Modo imperativo estricto", "Modo condicional de expectativa", "Modo subjuntivo para situaciones hipotéticas o de fe"],
        correct: "Modo subjuntivo para situaciones hipotéticas o de fe",
        explanation: "El subjuntivo expresa deseos, esperanzas o hipótesis, equivalente a la intención del futuro optativo tras peticiones de ruego o inclinaciones de fe en árabe.",
        explanationAr: "صيغة Subjuntivo تُستخدم للتعبير عن التمني والأمور الاحتمالية والرجاء، وهي تطابق أسلوب التمني والطلب في اللسان العربي."
      },
      {
        question: "La palabra 'Alquiler' deriva de la expresión islámica:",
        options: ["Al-kira (الإيجار/الكراء)", "Al-ghalla (الغلّة)", "Al-birkah (البركة)"],
        correct: "Al-kira (الإيجار/الكراء)",
        explanation: "El término 'alquiler' procede directamente del vocablo árabe 'al-kirā’', empleado para transacciones y arrendamientos en la península ibérica.",
        explanationAr: "كلمة Alquiler (الإيجار) مشتقة مباشرة من المصطلح العربي الأندلسي 'الكراء' أو 'الإيجار'."
      },
      {
        question: "¿Cuál de ellas se asocia a un género gramatical idéntico en árabe y español?",
        options: ["El sol", "La casa (الدار / البيت coincidente en sentido femenino)", "La leche"],
        correct: "La casa (الدار / البيت coincidente en sentido femenino)",
        explanation: "Tanto 'la casa' (femenino en español) como 'الدار' (femenino en árabe) comparten la misma clasificación de género gramatical en el uso diario.",
        explanationAr: "كلمة Casa (المنزل/الدار) مؤنثة في الإسبانية وفي العربية (الدار) تطابقها في معيار التأنيث."
      },
      {
        question: "La pronunciación correcta de la 'CH' se describe fonéticamente como:",
        options: ["Africada postalveolar sorda", "Fricativa velar sorda", "Fricativa alveolar sonora"],
        correct: "Africada postalveolar sorda",
        explanation: "La unión gráfica de la C y la H se denomina fonema africado postalveolar sordo, similar al sonido de la letra 'ج' en dialectos del Magreb o la 'TCH' inglesa.",
        explanationAr: "صوت CH هو صوت انفجاري احتكاكي مهمس (أفريكادو)، يشبه حرف 'ج' في بعض اللهجات العربية أو صوت الشين المشددة المسبوقة بتاء."
      },
      {
        question: "La oracion nominal árabe 'Hua muhandis' requiere en su paso al español:",
        options: ["Omitir el verbo de enlace", "El uso de la cópula obligatoria 'Él es ingeniero'", "Invertir el pronombre directo"],
        correct: "El uso de la cópula obligatoria 'Él es ingeniero'",
        explanation: "En español las oraciones obligatoriamente deben llevar un núcleo verbal (cópula 'es') para predicar, no existiendo la yuxtaposición nominal directa sin verbo.",
        explanationAr: "الجملة الاسمية العربية (هو مهندس) عند نقلها للإسبانية تتطلب إدخال فعل الرابطة 'Ser' لتصبح 'Él es ingeniero'."
      }
    ],
    CCSE: [
      {
        question: "Según la Constitución española, ¿cuál es la forma política del Estado español?",
        questionAr: "وفقاً للدستور الإسباني، ما هو الشكل السياسي للدولة الإسبانية؟",
        options: ["Monarquía parlamentaria (ملكِيّة برلمانيّة)", "República federal (جمهوريّة اتحاديّة)", "Monarquía absoluta (ملكيّة مطلقة)"],
        correct: "Monarquía parlamentaria (ملكِيّة برلمانيّة)",
        explanation: "El artículo 1.3 de la Constitución española establece expresamente que la forma política del Estado es la Monarquía parlamentaria, donde el rey reina pero no gobierna.",
        explanationAr: "تنص المادة 1.3 من الدستور الإسباني بأن الشكل السياسي للدولة هو الملكية البرلمانية، حيث يمارس الملك دوراً رمزياً بينما تحكم الحكومة المنتخبة."
      },
      {
        question: "¿Quién es el jefe del Estado en España?",
        questionAr: "من هو رئيس الدولة في إسبانيا؟",
        options: ["El Presidente del Gobierno (رئيس الحكومة)", "El Rey (الملك)", "El Presidente del Senado (رئيس مجلس الشيوخ)"],
        correct: "El Rey (الملك)",
        explanation: "El Rey es el Jefe del Estado y ejerce la más alta representación en las relaciones internacionales, asumiendo funciones principalmente institucionales y arbitrales.",
        explanationAr: "الملك هو رئيس الدولة الإسبانية، ويمثلها في العلاقات الدولية، ويمارس مهاماً بروتوكولية دستورية لا تشمل اتخاذ قرارات سياسية مباشرة."
      },
      {
        question: "¿Cuántas comunidades autónomas tiene España?",
        questionAr: "كم عدد المجتمعات ذات الحكم الذاتي في إسبانيا؟",
        options: ["15 comunidades autónomas", "17 comunidades autónomas", "19 comunidades autónomas"],
        correct: "17 comunidades autónomas",
        explanation: "El Estado español se organiza territorialmente en municipios, provincias y en 17 Comunidades Autónomas, además de dos ciudades autónomas (Ceuta y Melilla) en el norte de África.",
        explanationAr: "تنقسم إسبانيا إدارياً إلى 17 إقليماً ذا حكم ذاتي (Comunidades Autónomas) بالإضافة إلى مدينتي سبتة ومليلية المستقلتين ذاتياً."
      },
      {
        question: "¿Qué famosa obra literaria de Miguel de Cervantes se considera la primera novela moderna?",
        questionAr: "ما هو العمل الأدبي الشهير لميغيل دي سيرفانتس والذي يعتبر أول رواية حديثة؟",
        options: ["El Cantar de mio Cid", "La Celestina", "Don Quijote de la Mancha"],
        correct: "Don Quijote de la Mancha",
        explanation: "El Quijote, escrito por Miguel de Cervantes en 1605, constituye la obra cumbre de la lengua castellana y es un emblema literario mundial del que toma nombre el Instituto Cervantes.",
        explanationAr: "رواية 'دون كيخوتي دي لا مانشا' للأديب ميغيل دي سيرفانتس (1605) هي أهم رواية في الأدب الإسباني والعالمي وتُعتبر أول رواية حديثة بالتاريخ."
      },
      {
        question: "¿A qué edad se adquiere la mayoría de edad en España según la Constitución?",
        questionAr: "في أي عمر يتم الحصول على سن الرشد في إسبانيا وفقاً للدستور؟",
        options: ["A los 16 años", "A los 18 años", "A los 21 años"],
        correct: "A los 18 años",
        explanation: "El artículo 12 de la Constitución de 1978 dictamina que los españoles son mayores de edad a los 18 años, obteniendo el pleno derecho a votar en elecciones generales.",
        explanationAr: "تنص المادة 12 من الدستور الإسباني لعام 1978 على أن السن القانوني للرشد والحصول على كامل الحقوق المدنية والسياسية هو 18 عاماً."
      }
    ],
    DELE_A2: [
      {
        question: "En una carta oficial del Instituto Cervantes se lee: 'La prueba DELE A2 se iniciará puntualmente a las 9:00 h, debiendo acudir con pasaporte original y NIE'. ¿Qué documento es obligatorio llevar?",
        questionAr: "تذكر وثيقة معهد سيرفانتس: يجب الحضور مع جواز السفر الأصلي وبطاقة الإقامة NIE. ما هي الوثيقة الإلزامية؟",
        options: ["Cualquier fotocopia compulsada del pasaporte", "El pasaporte original y el documento de identidad NIE original", "Solamente el justificante de la inscripción impreso"],
        correct: "El pasaporte original y el documento de identidad NIE original",
        explanation: "Para realizar los exámenes del Instituto Cervantes (DELE o CCSE) es un requisito estricto y eliminatorio presentarse con el pasaporte original en vigor y el NIE original.",
        explanationAr: "لأداء اختبار معهد سيرفانتس DELE أو CCSE، من الضروري وبشدة الحضور بجواز السفر الأصلي الساري وبطاقة هوية الأجانب (NIE) الأصلية."
      },
      {
        question: "Complete con el pretérito indefinido: 'El mes pasado, mi familia y yo ______ los papeles de nacionalidad española en el registro'.",
        questionAr: "أكمل بالماضي البسيط: 'الشهر الماضي، قدمتُ أنا وعائلتي أوراق الجنسية الإسبانية في السجل'.",
        options: ["presentamos", "presentábamos", "presentaremos"],
        correct: "presentamos",
        explanation: "La palabra clave 'El mes pasado' (tiempo cerrado) exige el pretérito indefinido de indicativo. El sujeto 'mi familia y yo' (nosotros) se conjuga como 'presentamos'.",
        explanationAr: "الكلمة المفتاحية 'El mes pasado' تعبر عن زمن ماضي منتهي ومغلق، ولذلك تتطلب استخدام الماضي البسيط (Indefinido) وتصريفه مع الضمير 'نحن'."
      },
      {
        question: "Un aviso en el centro de examen indica: 'Los teléfonos móviles deben permanecer apagados durante toda la prueba'. Esto quiere decir que:",
        questionAr: "إشعار في مركز الامتحانات: يجب أن تظل الهواتف المحمولة مغلقة طوال فترة الاختبار. يعني ذلك أن:",
        options: ["Se pueden usar teléfonos con auriculares durante el examen de comprensión auditiva", "No se permite encender el móvil bajo ningún concepto en el aula de examen", "Se puede tener el móvil sobre la mesa en modo de silencio o avión"],
        correct: "No se permite encender el móvil bajo ningún concepto en el aula de examen",
        explanation: "Las normas disciplinarias del Instituto Cervantes prohíben encender dispositivos electrónicos en las aulas bajo riesgo de expulsión directa y anulación del examen.",
        explanationAr: "تمنع كلياً لوائح معهد سيرفانتس الصارمة تشغيل أي أجهزة إلكترونية أو وضعها على الطاولة طوال الامتحان، وحمل الهاتف مشغلاً يعرضك للاستبعاد."
      },
      {
        question: "¿Cuál es el saludo formal adecuado para iniciar una carta dirigida al tribunal del Instituto Cervantes?",
        questionAr: "ما هي التحية الرسمية المناسبة لبدء رسالة موجهة إلى لجنة معهد سيرفانتس؟",
        options: ["¡Hola, qué tal estáis todos!", "Estimados miembros del Tribunal del Instituto Cervantes:", "Querido tribunal de examen de España,"],
        correct: "Estimados miembros del Tribunal del Instituto Cervantes:",
        explanation: "En la expresión escrita (Carta Formal) requerida por el examen DELE A2, la fórmula 'Estimados miembros...' con dos puntos es el inicio estándar de alta cortesía formal.",
        explanationAr: "في قسم الكتابة (النموذج الرسمي)، تعتبر صيغة 'Estimados miembros...' المتبوعة بنقطتين هي طريقة التحية الأكثر ملاءمة ورسمية."
      },
      {
        question: "Complete la respuesta gramaticalmente correcta para el trámite: '—¿Tienes ya el diploma DELE A2 aprobado? —Sí, ya _________ enviaron por correo'.",
        questionAr: "أكمل الإجابة بمراعاة قواعد اللغة: 'هل لديك بالفعل دبلوم DELE A2؟ نعم، أرسلوه لي بالفعل عبر البريد'.",
        options: ["me lo", "lo me", "se le"],
        correct: "me lo",
        explanation: "En español, los pronombres de complemento van en orden 'Indirecto + Directo' (me + lo = me lo). El pronombre 'me' representa a mí y 'lo' representa el diploma.",
        explanationAr: "في قواعد الإملاء الإسبانية، يسبق ضمير المفعول به غير المباشر ضمير المفعول المباشر دائماً، لتكون الصيغة (أرسلوه لي) هي 'me lo'."
      }
    ]
  };

  // Launch Monthly level test
  const startMonthlyTest = (lvl: "A1" | "A2" | "B1" | "CCSE" | "DELE_A2") => {
    setActiveTestLevel(lvl);
    setTestQuestionIdx(0);
    setTestAnswers([]);
    setTestScore(null);
    setShowCertificate(false);
    setTestTimeLeft(180);
    setTestReviewMode(false);
  };

  const submitTestAnswer = (opt: string) => {
    const updated = [...testAnswers, opt];
    setTestAnswers(updated);
    
    if (testQuestionIdx < 4) {
      setTestQuestionIdx(prev => prev + 1);
    } else {
      // Calculate final score
      const list = TEST_QUESTIONS[activeTestLevel!];
      let correctCount = 0;
      updated.forEach((ans, idx) => {
        if (ans === list[idx].correct) correctCount++;
      });
      const percent = (correctCount / 5) * 100;
      setTestScore(percent);

      if (percent >= 80) {
        playXPSound();
        updateProfile(prev => {
          const passedTests = prev.completedTests.includes(activeTestLevel!)
            ? prev.completedTests
            : [...prev.completedTests, activeTestLevel!];
          
          // Unlock test achievement
          const updatedAchievements = [...prev.achievements];
          const testAch = updatedAchievements.find(a => a.id === "perfect_score");
          if (testAch && !testAch.unlockedAt) {
            testAch.unlockedAt = new Date().toISOString().split("T")[0];
          }

          return {
            ...prev,
            xp: prev.xp + 300,
            points: prev.points + 50,
            completedTests: passedTests,
            achievements: updatedAchievements
          };
        });
        setTestReviewMode(true);
        triggerNotification("🎉 ¡Felicidades! Examen Aprobado", `Aprobaste el nivel ${activeTestLevel === "DELE_A2" ? "A2 DELE" : activeTestLevel} con un ${percent}%. Revisa la corrección.`);
      } else {
        playFailSound();
        setTestReviewMode(true);
        triggerNotification("⚠️ Examen No Superado", `Obtuviste un ${percent}%. Se requiere 80% para certificar. ¡Estudia la revisión bilingüe!`);
      }
    }
  };

  // Mini-Calendar Scheduling Helper
  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleDate || !scheduleTime) return;

    const newSess: ScheduledSession = {
      id: Math.random().toString(),
      date: scheduleDate,
      time: scheduleTime,
      topic: scheduleTopic,
      notifyBefore: true
    };

    updateProfile(prev => ({
      ...prev,
      scheduledSessions: [...prev.scheduledSessions, newSess]
    }));

    triggerNotification("📅 Sesión Agendada", `Tu clase de "${scheduleTopic}" quedó registrada para el día ${scheduleDate} a las ${scheduleTime}.`);
    setScheduleDate("");
    setScheduleTime("");
  };

  const handleRemoveSchedule = (id: string) => {
    updateProfile(prev => ({
      ...prev,
      scheduledSessions: prev.scheduledSessions.filter(s => s.id !== id)
    }));
  };

  const handleAddQuickSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCalendarDay || !quickSchTime) return;

    const newSess: ScheduledSession = {
      id: Math.random().toString(),
      date: selectedCalendarDay,
      time: quickSchTime,
      topic: quickSchTopic,
      notifyBefore: true
    };

    updateProfile(prev => ({
      ...prev,
      scheduledSessions: [...prev.scheduledSessions, newSess]
    }));

    triggerNotification("📅 Sesión Agendada", `Tu clase de "${quickSchTopic}" quedó registrada para el día ${selectedCalendarDay} a las ${quickSchTime}.`);
  };

  const MONTH_NAMES_ES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const getCalendarDays = () => {
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const startDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();

    const monthWeeks: (number | null)[] = [];
    for (let i = 0; i < startDayIndex; i++) {
      monthWeeks.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      monthWeeks.push(d);
    }
    return monthWeeks;
  };

  const getFormattedDateString = (day: number) => {
    const mm = String(calendarMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${calendarYear}-${mm}-${dd}`;
  };

  const handlePrevMonth = () => {
    setCalendarMonth(prev => {
      if (prev === 0) {
        setCalendarYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
    setSelectedCalendarDay(null);
  };

  const handleNextMonth = () => {
    setCalendarMonth(prev => {
      if (prev === 11) {
        setCalendarYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
    setSelectedCalendarDay(null);
  };

  // Simulated Cloud Sync
  const [syncingCloud, setSyncingCloud] = useState<boolean>(false);
  const handleCloudSync = () => {
    setSyncingCloud(true);
    setTimeout(() => {
      setSyncingCloud(false);
      triggerNotification("☁️ Sincronización Exitosa", "Toda tu bitácora de progreso, logros y audios ha sido guardada en la nube de Al-Jamal.");
    }, 1800);
  };

  // Change sliders variables
  const handleSavePreferences = () => {
    updateProfile(prev => ({
      ...prev,
      dailyGoalMins: sliderMins
    }));
    triggerNotification("⚙️ Preferencias Guardadas", "Tu meta de práctica diaria se ajustó con éxito.");
  };

  // Generate Avatar action with Gemini image generation
  const handleGenerateAiAvatar = async (promptToSend: string) => {
    if (!promptToSend.trim() || isGeneratingAvatar) return;
    setIsGeneratingAvatar(true);
    setAvatarError(null);
    try {
      const response = await fetch("/api/generate-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToSend })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || "No se pudo generar la imagen");
      }
      if (data.imageUrl) {
        setAiAvatarPreview(data.imageUrl);
        triggerNotification(
          "✨ ¡Avatar Diseñado!",
          "Tu nueva foto de perfil ha sido generada con Inteligencia Artificial. Haz clic en 'Establecer como Foto de Perfil' para aplicarla."
        );
      } else {
        throw new Error("No se devolvió ninguna dirección de imagen válida");
      }
    } catch (err: any) {
      console.error(err);
      setAvatarError(err.message || "Error al conectar con el servidor de diseño de IA.");
      triggerNotification(
        "⚠️ Error de Generación",
        err.message || "No pudimos crear tu foto de perfil. Verifica que la clave API esté configurada."
      );
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  const handleApplyGeneratedAvatar = () => {
    if (!aiAvatarPreview) return;
    updateProfile(prev => ({
      ...prev,
      avatarUrl: aiAvatarPreview
    }));
    triggerNotification("🧑‍🎨 Foto de Perfil Actualizada", "¡Tu nuevo avatar generado por Inteligencia Artificial ha sido guardado!");
  };

  // Archive the current active conversation for the selected tutor
  const handleArchiveCurrentSession = () => {
    const currentMsgs = chatMessages[selectedTutor.id] || [];
    const userMsgs = currentMsgs.filter(m => m.role === "user");
    
    if (userMsgs.length === 0) {
      triggerNotification("⚠️ Historial Vacío", "No puedes archivar una conversación que no tiene mensajes enviados por ti.");
      return;
    }

    const firstUserMsg = userMsgs[0].text;
    const sessionPreview = firstUserMsg.length > 40 ? firstUserMsg.substring(0, 40) + "..." : firstUserMsg;

    const newSession: SavedSession = {
      id: Math.random().toString(36).substring(2, 9),
      tutorId: selectedTutor.id,
      tutorName: selectedTutor.name,
      avatar: selectedTutor.avatar,
      date: new Date().toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      messages: [...currentMsgs],
      preview: sessionPreview
    };

    setPastSessions(prev => [newSession, ...prev]);

    // Reset current active chat for this tutor to the base model intro message
    const defaultMsgText = selectedTutor.id === "sofia" 
      ? "¡Hola! السلام عليكم. Soy la Dra. Sofía. ¿Qué tal tu día? Estoy aquí para resolver tus dudas gramaticales comparando el español con el árabe en todo momento. ¡Pregúntame lo que quieras!"
      : selectedTutor.id === "carlos"
        ? "¡Ahlan! Me apasiona la conexión histórica entre el español y el árabe. ¿Sabías que cuando comes 'Arroz' o te reclinas sobre una 'Almohada' estás hablando árabe con acento hispanico? ¡Cuéntame qué quieres descubrir hoy!"
        : "¡Hola, futuro bilingüe! Pronunciar la 'P' y la 'CH' puede ser un reto para nosotros por asimilaciones acústicas cotidianas. Hagamos unos ejercicios prácticos de fonética. ¡Escríbeme una frase para ensayar hoy!";

    const defaultMsg: Message = {
      role: "model",
      text: defaultMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedTutor.id]: [defaultMsg]
    }));

    triggerNotification("💾 Conversación Archivada", "Guardada correctamente en el historial de LocalStorage.");
  };

  // Delete a historic session
  const handleDeletePastSession = (sessionId: string) => {
    setPastSessions(prev => prev.filter(s => s.id !== sessionId));
    if (inspectingSession && inspectingSession.id === sessionId) {
      setInspectingSession(null);
    }
    triggerNotification("🗑️ Conversación Eliminada", "Se removió la sesión del almacenamiento local.");
  };

  // Resume / Restore a past session as the active chat
  const handleResumePastSession = (session: SavedSession) => {
    setChatMessages(prev => ({
      ...prev,
      [session.tutorId]: [...session.messages]
    }));
    setShowHistoryView(false);
    setInspectingSession(null);
    triggerNotification("✨ Conversación Restaurada", `Has cargado el historial con ${session.tutorName} en el chat activo.`);
  };

  // CSV Report Generator
  const exportProgressCSV = () => {
    const headers = "Fecha (التاريخ),Minutos Practicados (دقائق التدريب)\n";
    const rows = Object.entries(profile.practiceDuration)
      .map(([date, duration]) => `${date},${duration}`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Andalus_Progreso_${profile.username.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification("📥 CSV Exportado", "Se generó tu reporte detallado de minutos semanales.");
  };

  // Recharts metric data formatting
  const chartData = Object.entries(profile.practiceDuration).map(([date, mins]) => ({
    name: date.slice(5), // Keep MM-DD
    meta: profile.dailyGoalMins,
    minutos: mins,
    xpGained: Number(mins) * 5
  }));

  // Home widget target values selector
  const activeWidgetWord = DAILY_WORDS[activeWidgetWordIdx];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans flex flex-col relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Dynamic Push Notification Notification toast */}
      {currentNotification && (
        <div id="smart_toast" className="fixed top-4 right-4 z-50 max-w-sm bg-[#121212] border-l-4 border-amber-500 rounded-xl p-4 shadow-2xl flex items-start gap-3 animate-slide-in border border-[#333]">
          <div className="bg-amber-500/10 p-2 rounded text-amber-500">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{currentNotification.title}</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentNotification.body}</p>
          </div>
        </div>
      )}

      {/* Simulated Biometric Authentication Screen lock overlay */}
      {isBiometricLocked && (
        <div id="biometric_screen_lock" className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="max-w-md w-full bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8 space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-amber-500/10 border-2 border-dashed border-amber-500 rounded-full flex items-center justify-center mx-auto text-amber-500 animate-pulse">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-light text-white tracking-widest">AUTENTICACIÓN REQUERIDA</h2>
              <p className="text-slate-400 text-xs mt-2">Seguridad biométrica activa para resguardo de bitácora y certificados de {profile.username}.</p>
            </div>

            {/* Simulated interactive fingerprint scan option */}
            <div className="border border-[#222] bg-[#1A1A1A]/80 p-5 rounded-xl space-y-4">
              <p className="text-xs text-amber-500 font-mono">Simulador de Sensor Biométrico Activo</p>
              <button
                id="sim_fingerprint_btn"
                onClick={() => {
                  setBiometricAuthenticated(true);
                  setIsBiometricLocked(false);
                  triggerNotification("🔓 Acceso Concedido", "Tu pase biométrico ha desbloqueado la academia.");
                }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black text-sm font-extrabold rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>Colocar Huella / Rostro</span>
              </button>
              <p className="text-[10px] text-slate-500">Haz clic para emular la lectura biómetra certificada por dispositivo.</p>
            </div>
          </div>
        </div>
      )}

      {/* Connection Indicator Band */}
      {isOffline && (
        <div id="offline_state_banner" className="bg-amber-600 text-black text-xs font-bold py-1.5 px-4 text-center tracking-wider flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span>MODO DE APRENDIZAJE SIN CONEXIÓN ACTIVO • Todos los módulos se guardarán de forma local</span>
        </div>
      )}

      {/* Brand Header Navigation */}
      <header className="h-20 flex items-center justify-between px-4 lg:px-8 border-b border-[#2A2A2A] bg-[#121212] sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FF4500] rounded-xl flex items-center justify-center font-black text-black text-lg shadow-md animate-pulse">
            AL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg lg:text-xl font-light tracking-widest text-white">AL-JAMAL</span>
              <span className="text-xs bg-[#FFD700] text-black font-extrabold px-1.5 py-0.5 rounded">SPANISH</span>
            </div>
            <p className="text-[10px] text-amber-500/80 tracking-widest uppercase">التعليم التفاعلي للأوساط العربية</p>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          {/* Level Indicator Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-[#1A1A1A] px-3.5 py-1.5 rounded-full border border-[#333] text-xs">
            <span className="text-[#FFD700] font-bold">NIVEL</span>
            <span className="text-white font-extrabold font-mono">{profile.level}</span>
          </div>

          {/* Counters row */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-[#1A1A1A]/80 px-2.5 py-1.5 rounded-lg border border-[#222]" title="Racha activa">
              <span className="text-orange-500 animate-bounce">🔥</span>
              <span className="font-mono text-white text-xs whitespace-nowrap">{profile.streak} DÍAS</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1A1A1A]/80 px-2.5 py-1.5 rounded-lg border border-[#222]" title="Puntos de experiencia">
              <span className="text-amber-400">🪙</span>
              <span className="font-mono text-amber-400 text-xs whitespace-nowrap">{profile.xp} XP</span>
            </div>
          </div>

          {/* Toggle connection simulation */}
          <button
            id="toggle_connection_btn"
            onClick={() => {
              setIsOffline(!isOffline);
              triggerNotification(
                !isOffline ? "🔌 Modo Desconectado" : "🌐 Conexión Restablecida",
                !isOffline 
                  ? "Se ha simulado la pérdida de señal de red. Puedes seguir operando sin cortes."
                  : "Se ha sincronizado de nuevo el progreso automáticamente en el servidor."
              );
            }}
            className={`p-2 rounded-lg border transition ${
              isOffline 
                ? "bg-amber-600/10 border-amber-500 text-amber-500" 
                : "bg-[#1A1A1A] border-[#333] text-slate-400 hover:text-white"
            }`}
            title={isOffline ? "Habilitar Conexión" : "Simular Pérdida de Conexión"}
          >
            {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          </button>

          {/* Biometric trigger lock lock-simulate screen */}
          <button
            id="test_fingerprint_lock_btn"
            onClick={() => {
              setIsBiometricLocked(true);
              setBiometricAuthenticated(false);
            }}
            className="p-2 rounded-lg bg-[#1A1A1A] border border-[#333] text-slate-400 hover:text-white hover:border-[#444] transition"
            title="Bloquear con Biometría"
          >
            <Lock className="w-4 h-4 text-slate-400" />
          </button>

          {/* Little avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#333] to-[#222] border border-[#FFD700] overflow-hidden flex items-center justify-center font-bold text-[#FFD700] text-sm">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.username}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              profile.username[0]
            )}
          </div>
        </div>
      </header>

      {/* APP WORKSPACE CONTAINER GRID: 12 Cols */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
        
        {/* LEFT COLUMN: PROGRESS, GOALS & CERTIFICATES (3 Cols) */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Daily Goal card with relative progress SVG circle */}
          <div className="bg-[#121212] rounded-2xl p-5 border border-[#222] flex flex-col items-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 self-start">
              Meta Diaria • الهدف اليومي
            </h3>
            
            <div className="relative w-36 h-36 my-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="64" stroke="#1A1A1A" strokeWidth="8" fill="transparent" />
                {/* 75% display progress */}
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="#FFD700"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="402"
                  strokeDashoffset="100.5"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-light text-white font-mono">75%</span>
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mt-0.5">Completado</span>
              </div>
            </div>

            <div className="text-center mt-3 space-y-1">
              <p className="text-sm font-semibold text-white">Práctica de Hoy</p>
              <p className="text-xs text-slate-400 font-mono">15 min de {profile.dailyGoalMins} min planeados</p>
            </div>

            <div className="w-full space-y-3 mt-5 pt-4 border-t border-[#1F1F1F]">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-pulse"></div>
                <span>Vocales y Transición Genérica</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700]"></div>
                <span>Uso de 'Ser/Estar' Comparado</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]"></div>
                <span>Grabación de Audio • Pendiente</span>
              </div>
            </div>
          </div>

          {/* Certifications status card */}
          <div className="bg-[#121212] rounded-2xl p-5 border border-[#222] space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Certificaciones • الشهادات</span>
            </h3>

            <div className="bg-[#1A1A1A] p-4 rounded-xl border-l-4 border-[#FFD700] space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide">Nivel de Pruebas</h4>
                  <p className="text-[10px] text-amber-500/80 mt-1">Examen de evaluación mensual</p>
                </div>
                <span className="text-[11px] bg-amber-500/20 text-[#FFD700] font-mono px-1.5 py-0.5 rounded font-extrabold">B1</span>
              </div>

              <div className="space-y-2 pt-1.5">
                <p className="text-[10px] text-slate-400">Aprueba el examen de 5 reactivos gramaticales para descargar la certificación con firma de la academia.</p>
                
                {profile.completedTests.length > 0 ? (
                  <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-center text-xs text-emerald-400 font-semibold">
                    Certificado {profile.completedTests.join(", ")} Adquirido
                  </div>
                ) : (
                  <p className="text-[10px] text-amber-500 font-medium">No has emitido certificados este mes.</p>
                )}
              </div>

              <button
                id="exam_tab_shortcut_btn"
                onClick={() => {
                  setActiveTab("misiones");
                  startMonthlyTest("B1");
                }}
                className="w-full py-2 bg-[#262626] hover:bg-[#333] rounded-lg transition text-xs font-bold text-white uppercase tracking-wider"
              >
                Hacer Test Mensual (B1)
              </button>
            </div>
          </div>

          {/* Dynamic interactive Study Schedule Planner */}
          <div className="bg-[#121212] rounded-2xl p-5 border border-[#222] space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>Calendario y Tutorías • الحصص</span>
            </h3>

            <form onSubmit={handleAddSchedule} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-slate-400 block mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-2 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 block mb-1">Hora</label>
                  <input
                    type="time"
                    required
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-2 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] text-slate-400 block mb-1">Materia / Enfoque</label>
                <select
                  value={scheduleTopic}
                  onChange={(e) => setScheduleTopic(e.target.value)}
                  className="w-full px-2 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Gramática: Ser vs Estar">Gramática: Ser vs Estar</option>
                  <option value="Vocabulario de Arabismos">Vocabulario de Arabismos</option>
                  <option value="Práctica Fonológica (P / CH)">Práctica Fonológica (P / CH)</option>
                  <option value="Revisión de Textos Literarios">Revisión de Textos Literarios</option>
                </select>
              </div>

              <button
                type="submit"
                id="add_class_schedule_btn"
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-black font-extrabold rounded text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Programar Práctica</span>
              </button>
            </form>

            {/* List of study schedule items */}
            <div className="space-y-2 pt-2 border-t border-[#1F1F1F]">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">Próximos Recordatorios:</span>
              {profile.scheduledSessions.length === 0 ? (
                <p className="text-[10px] text-slate-500 italic">No tienes sesiones reservadas.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {profile.scheduledSessions.map((session) => (
                    <div key={session.id} className="p-2.5 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] flex justify-between items-center text-xs gap-2">
                      <div>
                        <p className="font-bold text-white line-clamp-1">{session.topic}</p>
                        <p className="text-[10px] text-[#FFD700] whitespace-nowrap mt-0.5">📅 {session.date} • 🕒 {session.time}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveSchedule(session.id)}
                        className="text-slate-500 hover:text-rose-500 p-1"
                        title="Eliminar sesión"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CENTER COLUMN: LESSON STUDY MODULE & AUDIO LAB (6 Cols) */}
        <section className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Main dynamic Tabs View Navigation bar */}
          <div className="bg-[#121212] p-2 rounded-xl border border-[#222] flex items-center justify-between gap-1">
            <button
              id="tab_lessons_btn"
              onClick={() => setActiveTab("lessons")}
              className={`flex-1 flex flex-col items-center py-2.5 rounded-lg transition-all ${
                activeTab === "lessons"
                  ? "bg-[#1A1A1A] text-[#FFD700] border border-[#333] shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Lecciones</span>
            </button>

            <button
              id="tab_voice_btn"
              onClick={() => setActiveTab("voice")}
              className={`flex-1 flex flex-col items-center py-2.5 rounded-lg transition-all ${
                activeTab === "voice"
                  ? "bg-[#1A1A1A] text-[#FFD700] border border-[#333] shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Mic className="w-4 h-4 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Laboratorio</span>
            </button>

            <button
              id="tab_misiones_btn"
              onClick={() => setActiveTab("misiones")}
              className={`flex-1 flex flex-col items-center py-2.5 rounded-lg transition-all ${
                activeTab === "misiones"
                  ? "bg-[#1A1A1A] text-[#FFD700] border border-[#333] shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Award className="w-4 h-4 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Evaluación</span>
            </button>

            <button
              id="tab_progreso_btn"
              onClick={() => setActiveTab("progreso")}
              className={`flex-1 flex flex-col items-center py-2.5 rounded-lg transition-all ${
                activeTab === "progreso"
                  ? "bg-[#1A1A1A] text-[#FFD700] border border-[#333] shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Rendimiento</span>
            </button>

            <button
              id="tab_ajustes_btn"
              onClick={() => setActiveTab("ajustes")}
              className={`flex-1 flex flex-col items-center py-2.5 rounded-lg transition-all ${
                activeTab === "ajustes"
                  ? "bg-[#1A1A1A] text-[#FFD700] border border-[#333] shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Preferencias</span>
            </button>
          </div>

          {/* DYNAMIC CONTENT SWITCHBOARD */}
          <div className="flex-1 bg-[#121212] rounded-2xl p-6 border border-[#222] min-h-[460px] flex flex-col">
            
            {/* TAB 1: LESSONS & GRAMMAR */}
            {activeTab === "lessons" && (
              <LessonsTab
                profile={profile}
                updateProfile={updateProfile}
                playXPSound={playXPSound}
                triggerNotification={triggerNotification}
              />
            )}

            {/* TAB 2: PRONUNCIATION VOICE LAB */}
            {activeTab === "voice" && (
              <div id="voice_lab_module" className="space-y-5 animate-fade-in flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Mic className="w-5 h-5 text-amber-500" />
                      <span>Laboratorio de Pronunciación • نطق الحروف</span>
                    </h3>
                    <span className="text-[11px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold">FONÉTICA</span>
                  </div>
                  
                  <p className="text-xs text-slate-400">
                    Muchos sonidos españoles (como la P, la CH o la doble R) no existen idénticamente en árabe estándar. Practica con oraciones modelo y recibe ayuda fonética del tutor de inmediato.
                  </p>
                </div>

                {/* Phrase Select slider */}
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] space-y-3">
                  <span className="text-[10px] text-amber-500 font-bold block uppercase tracking-wider">Selecciona frase de entrenamiento:</span>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {VOICE_PHRASES.map((phrase, idx) => (
                      <button
                        key={idx}
                        id={`phrase_btn_${idx}`}
                        onClick={() => {
                          setSelectedVoicePhraseIdx(idx);
                          setPronunciationScore(null);
                          setVoiceFeedback("");
                        }}
                        className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                          selectedVoicePhraseIdx === idx
                            ? "bg-amber-500 text-black border-amber-400 font-extrabold"
                            : "bg-[#121212] text-slate-300 border-[#222] hover:bg-[#1C1C1C]"
                        }`}
                      >
                        <p className="font-sans line-clamp-1">{phrase.word}</p>
                        <p className="text-[10px] opacity-80 line-clamp-1 mt-0.5">{phrase.trans}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main active phrase player and checker board */}
                <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-[#2A2A2A] space-y-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] text-[#FFD700] font-bold block uppercase mb-1">FRASE EN ESPAÑOL</span>
                      <p className="text-xl font-bold text-white tracking-wide">
                        "{VOICE_PHRASES[selectedVoicePhraseIdx].word}"
                      </p>
                    </div>
                    
                    <button
                      id="play_phrase_tts_btn"
                      onClick={() => speakSpanishPhrase(VOICE_PHRASES[selectedVoicePhraseIdx].word)}
                      className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl transition flex items-center justify-center gap-1.5 text-xs font-bold"
                      title="Escuchar audio modelo"
                    >
                      <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>Escuchar Modelo</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#1C1C1C] text-right">
                    <span className="text-[9px] text-slate-500 font-bold block uppercase mb-1">الترجمة التقريبية</span>
                    <p className="text-sm font-semibold text-slate-300 dir-rtl font-serif">
                      {VOICE_PHRASES[selectedVoicePhraseIdx].trans}
                    </p>
                  </div>

                  {/* Audio wave dynamic visualization */}
                  <div className="bg-[#121212] px-4 py-6 rounded-xl border border-[#222] flex flex-col items-center justify-center space-y-4">
                    <div className="flex justify-center items-end gap-1.5 h-16 w-full max-w-xs mx-auto">
                      {waveformBars.map((val, idx) => (
                        <div
                          key={idx}
                          className="bg-amber-500 rounded-sm w-2 transition-all duration-150"
                          style={{
                            height: `${val}%`,
                            opacity: isListening ? 1 : 0.35,
                            backgroundColor: isListening ? "#FFD700" : "#E0E0E0"
                          }}
                        />
                      ))}
                    </div>
                    
                    <button
                      id="toggle_record_microphone_btn"
                      disabled={isListening}
                      onClick={startRecording}
                      className={`px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all shadow-lg flex items-center gap-2 ${
                        isListening
                          ? "bg-[#2A1010] border border-rose-600/40 text-rose-500 animate-pulse"
                          : "bg-white hover:bg-slate-200 text-black active:scale-95"
                      }`}
                    >
                      <span>{isListening ? "Escuchando Voz..." : "Iniciar Grabación 🎙️"}</span>
                    </button>

                    <p className="text-[10px] text-slate-500">
                      Pulse el botón y pronuncie la frase en alta voz. Se requiere acceso al micrófono.
                    </p>
                  </div>

                  {/* Pronunciation score indicator */}
                  {pronunciationScore !== null && (
                    <div className="p-4 bg-[#121212] border border-[#222] rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold font-mono ${
                          pronunciationScore >= 80 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-orange-500/10 text-orange-400 border border-orange-500/30"
                        }`}>
                          {pronunciationScore}%
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Precisión de Vocales</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Frecuencia y retención vocal analizadas.</p>
                        </div>
                      </div>

                      <div className="flex-1 text-xs text-slate-300 bg-[#1A1A1A] p-2.5 rounded-lg border border-[#2C2C2C] dir-rtl text-right leading-loose font-medium">
                        {voiceFeedback}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: MONTHLY TESTS & DIGITAL CERTIFICATE */}
            {activeTab === "misiones" && (
              <div id="misiones_level_tests" className="space-y-6 animate-fade-in flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-500" />
                    <span>Evaluación Mensual y Certificación • اختبارات المستوى</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Pon a prueba tus habilidades resolviendo preguntas de interferencias gramaticales y vocabulario histórico para obtener tu pergamino digital con firma de Al-Jamal.
                  </p>
                </div>

                {!activeTestLevel && !showCertificate && (
                  <>
                    {/* Select level screen */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pt-4">
                      {["A1", "A2", "B1", "DELE_A2", "CCSE"].map((lvl) => {
                        const completed = profile.completedTests.includes(lvl);
                        return (
                          <div key={lvl} className="bg-[#1A1A1A] rounded-xl border border-[#2B2B2B] p-5 space-y-4 hover:border-amber-500 transition flex flex-col justify-between">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xl font-black text-amber-500 tracking-wider font-mono">
                                  {lvl === "DELE_A2" ? "A2 DELE" : lvl}
                                </span>
                                {completed && (
                                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">Aprobado</span>
                                )}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                                  {lvl === "A1" && "Iniciación de Género"}
                                  {lvl === "A2" && "Estudio de Arabismos"}
                                  {lvl === "B1" && "Habilidades Sintácticas"}
                                  {lvl === "DELE_A2" && "DELE A2 Nacionalidad"}
                                  {lvl === "CCSE" && "Prueba CCSE"}
                                </h4>
                                <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                                  {lvl === "A1" && "5 preguntas de género gramatical y teoría inicial."}
                                  {lvl === "A2" && "Estudio comparativo y léxico de arabismos de nivel plataforma."}
                                  {lvl === "B1" && "Habilidades sintácticas avanzadas y estructuras de enlace."}
                                  {lvl === "DELE_A2" && "Modelo oficial del Instituto Cervantes para la residencia y nacionalidad."}
                                  {lvl === "CCSE" && "Simulacro constitucional y sociocultural oficial para la obtención de la nacionalidad."}
                                </p>
                              </div>
                            </div>
                            <button
                              id={`start_test_${lvl.toLowerCase()}`}
                              onClick={() => startMonthlyTest(lvl as any)}
                              className="w-full mt-4 py-2 bg-[#2D2D2D] hover:bg-amber-500 hover:text-black text-white text-xs font-bold rounded-lg transition"
                            >
                              {completed ? "Repetir Test" : "Comenzar Test"}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* BILINGUAL CITIZENSHIP & CERVANTES FLASHCARDS */}
                    <div className="bg-[#121212] rounded-2xl border border-[#222] p-5 sm:p-6 mt-6 space-y-4 shadow-xl">
                      <div className="flex flex-col sm:flex-row border-b border-[#222] pb-4 items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[#FFD700]">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                          </div>
                          <div className="text-left">
                            <h4 className="text-base font-bold text-white flex items-center gap-2">
                              <span>Tarjetas de Memorización • فلاش كاردز</span>
                              <span className="text-[10px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">Cervantes CCSE</span>
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-sans">Domina la Constitución y vocabulario del Instituto Cervantes con tarjetas interactivas.</p>
                          </div>
                        </div>

                        {/* Flashcards progress counter */}
                        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2B2B2B] px-3 py-1.5 rounded-lg text-xs">
                          <span className="text-slate-400">Progreso:</span>
                          <strong className="text-amber-400 font-mono">
                            {learnedFlashcards.length} / {FLASHCARDS_DATA.length}
                          </strong>
                          <span className="text-slate-500">Memorizadas</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                        {/* THE ACTIVE FLASHCARD VIEW WITH PREMIUM 3D FLIP */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                          <div className="perspective-1000 w-full min-h-[220px]">
                            <div
                              id="interactive_flashcard_card"
                              onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                              className={`w-full h-full relative cursor-pointer duration-500 preserve-3d transition-all ${
                                flashcardFlipped ? "rotate-y-180" : ""
                              }`}
                              style={{ height: '220px' }}
                            >
                              {/* FRONT SIDE OF CARD */}
                              <div className="absolute inset-0 w-full h-full bg-[#1A1A1A] border border-[#2B2B2B] hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-md overflow-hidden backface-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-3xl pointer-events-none"></div>
                                
                                <div className="flex justify-between items-center text-[10px] text-slate-500 font-extrabold tracking-wider uppercase">
                                  <span>{FLASHCARDS_DATA[currentFlashcardIdx].category}</span>
                                  <span className="bg-[#262626] text-amber-500 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                                    <span>Pregunta • السؤال</span>
                                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                  </span>
                                </div>

                                <div className="py-4 space-y-3 flex-1 flex flex-col justify-center">
                                  <h5 className="text-sm sm:text-base font-bold text-white leading-relaxed text-center">
                                    {FLASHCARDS_DATA[currentFlashcardIdx].question}
                                  </h5>
                                  {FLASHCARDS_DATA[currentFlashcardIdx].questionAr && (
                                    <p className="text-center text-xs sm:text-sm text-yellow-500/80 dir-rtl font-serif leading-relaxed">
                                      {FLASHCARDS_DATA[currentFlashcardIdx].questionAr}
                                    </p>
                                  )}
                                </div>

                                <div className="text-center text-[9px] text-slate-500 font-bold uppercase tracking-widest pt-2 border-t border-[#222]">
                                  Haz clic o Spacebar para voltear • انقر للقلب
                                </div>
                              </div>

                              {/* BACK SIDE OF CARD */}
                              <div className="absolute inset-0 w-full h-full bg-[#1E1C15] border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-2xl overflow-hidden backface-hidden rotate-y-180 bg-gradient-to-b from-[#1C1912] to-[#121212]">
                                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-br-3xl pointer-events-none"></div>
                                
                                <div className="flex justify-between items-center text-[10px] text-slate-500 font-extrabold tracking-wider uppercase">
                                  <span>{FLASHCARDS_DATA[currentFlashcardIdx].category}</span>
                                  <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                                    Respuesta • الإجابة
                                  </span>
                                </div>

                                <div className="py-4 space-y-3 flex-1 flex flex-col justify-center">
                                  <h5 className="text-sm sm:text-base font-bold text-emerald-400 leading-relaxed text-center">
                                    {FLASHCARDS_DATA[currentFlashcardIdx].answer}
                                  </h5>
                                  {FLASHCARDS_DATA[currentFlashcardIdx].answerAr && (
                                    <p className="text-center text-xs sm:text-sm text-slate-300 dir-rtl font-serif leading-relaxed">
                                      {FLASHCARDS_DATA[currentFlashcardIdx].answerAr}
                                    </p>
                                  )}
                                  {FLASHCARDS_DATA[currentFlashcardIdx].hint && (
                                    <p className="text-[10px] text-amber-500 italic text-center mt-1">
                                      💡 Nota: {FLASHCARDS_DATA[currentFlashcardIdx].hint}
                                    </p>
                                  )}
                                </div>

                                <div className="text-center text-[9px] text-slate-500 font-bold uppercase tracking-widest pt-2 border-t border-[#222]">
                                  Haz clic para volver • انقر للعودة
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Flashcard Action and navigation buttons */}
                          <div className="flex justify-between items-center gap-4 text-left">
                            <div className="flex items-center gap-2">
                              <button
                                id="btn_flash_prev"
                                onClick={() => {
                                  setFlashcardFlipped(false);
                                  setCurrentFlashcardIdx(prev => prev === 0 ? FLASHCARDS_DATA.length - 1 : prev - 1);
                                }}
                                className="p-2 bg-[#1A1A1A] hover:bg-amber-500 hover:text-black border border-[#2B2B2B] text-white rounded-lg transition-all cursor-pointer"
                              >
                                ←
                              </button>
                              <span className="text-xs text-slate-400 font-mono">
                                {currentFlashcardIdx + 1} de {FLASHCARDS_DATA.length}
                              </span>
                              <button
                                id="btn_flash_next"
                                onClick={() => {
                                  setFlashcardFlipped(false);
                                  setCurrentFlashcardIdx(prev => prev === FLASHCARDS_DATA.length - 1 ? 0 : prev + 1);
                                }}
                                className="p-2 bg-[#1A1A1A] hover:bg-amber-500 hover:text-black border border-[#2B2B2B] text-white rounded-lg transition-all cursor-pointer"
                              >
                                →
                              </button>
                            </div>

                            {/* Mark as Learned Button */}
                            <button
                              id="btn_flash_learned"
                              onClick={() => {
                                const cardId = FLASHCARDS_DATA[currentFlashcardIdx].id;
                                if (learnedFlashcards.includes(cardId)) {
                                  // Already marked, toggle remove
                                  setLearnedFlashcards(prev => prev.filter(id => id !== cardId));
                                  triggerNotification("ℹ️ Tarjeta de Repaso", "Tarjeta devuelta a la pila de estudio.");
                                } else {
                                  setLearnedFlashcards(prev => [...prev, cardId]);
                                  playXPSound();
                                  updateProfile(prev => ({
                                    ...prev,
                                    xp: prev.xp + 15,
                                    points: prev.points + 5
                                  }));
                                  triggerNotification("💡 +15 XP Recibidos", "¡Tarjeta memorizada con éxito! Sigue sumando.");
                                }
                              }}
                              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                learnedFlashcards.includes(FLASHCARDS_DATA[currentFlashcardIdx].id)
                                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                  : "bg-[#2A2A2A] text-slate-300 hover:bg-emerald-600 hover:text-white border border-transparent"
                              }`}
                            >
                              {learnedFlashcards.includes(FLASHCARDS_DATA[currentFlashcardIdx].id)
                                ? "✓ Memorizada"
                                : "Marcar como Aprendida • تم الحفظ"}
                            </button>
                          </div>
                        </div>

                        {/* LIST VIEW GLOSARIO INTERACTIVO (Right panel) */}
                        <div className="lg:col-span-5 bg-[#1A1A1A] border border-[#2B2B2B] rounded-xl p-4 flex flex-col justify-between space-y-4 text-left">
                          <div>
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                              <span>Glosario de Términos de Nacionalidad</span>
                            </h5>
                            <p className="text-[10px] text-slate-400 leading-relaxed mb-3">Haz clic en cualquier palabra para seleccionarla en el visor de estudio interactivo:</p>
                          </div>

                          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-500">
                            {FLASHCARDS_DATA.map((card, idx) => {
                              const isCurrent = idx === currentFlashcardIdx;
                              const isLearned = learnedFlashcards.includes(card.id);
                              return (
                                <button
                                  key={card.id}
                                  id={`glossary_item_${card.id}`}
                                  onClick={() => {
                                    setFlashcardFlipped(false);
                                    setCurrentFlashcardIdx(idx);
                                  }}
                                  className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center justify-between border ${
                                    isCurrent
                                      ? "bg-amber-500/10 border-amber-500/40 text-white font-bold"
                                      : "bg-[#121212] border-transparent hover:border-[#333] text-slate-300"
                                  }`}
                                >
                                  <div className="truncate flex-1">
                                    <span className="font-mono text-[9px] text-[#FFD700]/70 mr-1.5 font-bold uppercase">{idx + 1}</span>
                                    <span className="truncate">{card.question}</span>
                                  </div>
                                  <span className="text-[10px] ml-2">
                                    {isLearned ? "🟢" : "⚪"}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="p-2.5 rounded-lg bg-[#121212] border border-[#222]">
                            <p className="text-[9px] text-[#FFD700] uppercase font-bold tracking-widest flex items-center gap-1 text-left">
                              <span>💡 Tip de estudio</span>
                            </p>
                            <p className="text-[10px] text-slate-400 leading-normal mt-1 text-left">Memorizar los arabismos más habituales y principios de la Constitución garantiza una alta puntuación en los exámenes oficiales del Cervantes de nacionalidad.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CALENDARIO DE SESIONES DE ESTUDIO */}
                    <div className="bg-[#121212] rounded-2xl border border-[#222] p-5 sm:p-6 mt-6 space-y-4 shadow-xl">
                      <div className="flex border-b border-[#222] pb-4 items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[#FFD700]">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white flex items-center gap-2">
                              <span>Calendario Mensual de Estudio</span>
                              <span className="text-[10px] bg-red-500/10 text-red-400 font-extrabold px-1.5 py-0.5 rounded font-mono uppercase tracking-wider animate-pulse">En Directo</span>
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-sans">Controla tus tutorías y programa sesiones de repaso personalizadas</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                        {/* CALENDAR BODY COLUMN */}
                        <div className="lg:col-span-7 bg-[#1A1A1A] border border-[#2B2B2B] rounded-xl p-4 flex flex-col justify-between">
                          {/* MONTH & YEAR HEADER */}
                          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#242424]">
                            <button
                              id="btn_cal_prev_month"
                              type="button"
                              onClick={handlePrevMonth}
                              className="p-1 px-3 bg-[#242424] hover:bg-amber-500 hover:text-black border border-[#2F2F2F] text-slate-300 font-bold text-xs rounded transition flex items-center gap-1 cursor-pointer"
                            >
                              <span>←</span>
                              <span className="hidden sm:inline">Anterior</span>
                            </button>
                            <span id="calendar_month_year_lbl" className="text-sm font-semibold text-white tracking-wide uppercase font-serif">
                              {MONTH_NAMES_ES[calendarMonth]} {calendarYear}
                            </span>
                            <button
                              id="btn_cal_next_month"
                              type="button"
                              onClick={handleNextMonth}
                              className="p-1 px-3 bg-[#242424] hover:bg-amber-500 hover:text-black border border-[#2F2F2F] text-slate-300 font-bold text-xs rounded transition flex items-center gap-1 cursor-pointer"
                            >
                              <span className="hidden sm:inline">Siguiente</span>
                              <span>→</span>
                            </button>
                          </div>

                          {/* WEEKDAYS HEADERS */}
                          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-500 uppercase tracking-wider mb-2">
                            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dayName, idx) => (
                              <div key={idx}>{dayName}</div>
                            ))}
                          </div>

                          {/* DAYS GRID */}
                          <div className="grid grid-cols-7 gap-1.5">
                            {getCalendarDays().map((day, dIdx) => {
                              if (day === null) {
                                return <div key={`empty-${dIdx}`} className="aspect-square bg-transparent rounded" />;
                              }

                              const dayDateStr = getFormattedDateString(day);
                              const daySessions = profile.scheduledSessions.filter(s => s.date === dayDateStr);
                              const hasSess = daySessions.length > 0;
                              const isSelected = selectedCalendarDay === dayDateStr;

                              return (
                                <button
                                  key={`day-${day}`}
                                  id={`cal_day_${day}`}
                                  type="button"
                                  onClick={() => setSelectedCalendarDay(dayDateStr)}
                                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs relative transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-[#FFD700] text-black font-extrabold hover:bg-amber-400"
                                      : hasSess
                                      ? "border-2 border-amber-500 bg-amber-500/10 text-[#FFD700] hover:bg-amber-500/20 font-bold animate-pulse"
                                      : "bg-[#1F1F1F] text-slate-300 hover:bg-[#2F2F2F]"
                                  }`}
                                >
                                  <span>{day}</span>
                                  {hasSess && (
                                    <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${isSelected ? "bg-black" : "bg-[#FFD700] animate-bounce"}`} />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* SESSION DETAILS & QUICK SCHEDULER COLUMN */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                          <div className="bg-[#1A1A1A] border border-[#2B2B2B] rounded-xl p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-1 border-b border-[#2C2C2C] flex items-center justify-between">
                                <span>Sesión: {selectedCalendarDay ? selectedCalendarDay : "Selecciona día"}</span>
                                <span className="text-[9px] text-[#FFD700] font-mono">Detalle</span>
                              </h5>

                              {/* Day session list */}
                              {selectedCalendarDay ? (
                                (() => {
                                  const filteredSess = profile.scheduledSessions.filter(s => s.date === selectedCalendarDay);
                                  return (
                                    <div className="space-y-2">
                                      {filteredSess.length === 0 ? (
                                        <div className="text-center py-4 bg-[#121212] rounded-lg border border-[#222]">
                                          <p className="text-[11px] text-slate-500">No hay sesiones este día.</p>
                                        </div>
                                      ) : (
                                        <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                                          {filteredSess.map((sess) => (
                                            <div key={sess.id} className="p-2.5 bg-[#121212] rounded-lg border border-[#2B2B2B] flex justify-between items-center gap-1">
                                              <div className="min-w-0">
                                                <p className="text-xs font-extrabold text-white truncate">{sess.topic}</p>
                                                <p className="text-[10px] text-[#FFD700] font-mono mt-0.5">🕚 {sess.time}</p>
                                              </div>
                                              <button
                                                onClick={() => handleRemoveSchedule(sess.id)}
                                                className="p-1 px-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/20 rounded transition shrink-0 cursor-pointer text-[10px]"
                                                title="Eliminar esta tutoría"
                                              >
                                                Eliminar
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()
                              ) : (
                                <div className="text-center py-10 bg-[#121212] rounded-lg border border-[#222]">
                                  <span className="text-2xl block mb-2">📅</span>
                                  <p className="text-xs text-slate-400 font-semibold">Toca un día en el calendario</p>
                                  <p className="text-[10px] text-slate-500 max-w-[200px] leading-normal mx-auto mt-1">Verás las sesiones marcadas o podrás programar una para esa fecha.</p>
                                </div>
                              )}
                            </div>

                            {/* Program sessions form (inline quick-scheduler) */}
                            {selectedCalendarDay && (
                              <form onSubmit={handleAddQuickSchedule} className="space-y-2.5 pt-4 border-t border-[#2C2C2C] mt-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">⚡ Programar Clase Rápida</p>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="col-span-1">
                                    <label className="text-[9px] text-slate-500 block mb-1">Hora</label>
                                    <input
                                      type="time"
                                      required
                                      value={quickSchTime}
                                      onChange={(e) => setQuickSchTime(e.target.value)}
                                      className="w-full px-2 py-1.5 bg-[#121212] border border-[#2A2A2A] rounded text-xs text-white focus:outline-none focus:border-amber-500"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-[9px] text-slate-500 block mb-1">Tema / Clase</label>
                                    <select
                                      value={quickSchTopic}
                                      onChange={(e) => setQuickSchTopic(e.target.value)}
                                      className="w-full px-2 py-1.5 bg-[#121212] border border-[#2A2A2A] rounded text-xs text-white focus:outline-none focus:border-amber-500"
                                    >
                                      <option value="Clase de Repaso con Tutor">Clase de Repaso con Tutor</option>
                                      <option value="Gramática Comparada">Gramática Comparada</option>
                                      <option value="Práctica Fonética">Práctica Fonética</option>
                                      <option value="Vocabulario Histórico Andalusí">Vocabulario Andalusí</option>
                                      <option value="Simulacro de Nacionalidad CCSE">Simulacro Nacionalidad CCSE</option>
                                    </select>
                                  </div>
                                </div>
                                <button
                                  type="submit"
                                  className="w-full py-2 bg-[#FFD700] hover:bg-amber-400 text-black text-xs font-black rounded-lg transition-all cursor-pointer shadow flex items-center justify-center gap-1"
                                >
                                  <span>📅 Agendar en {selectedCalendarDay}</span>
                                </button>
                              </form>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTestLevel && !showCertificate && (
                  <>
                    {!testReviewMode ? (
                      // Active test view (Timer & Questions)
                      <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#2A2A2A] space-y-6 animate-fade-in text-left">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-[#2C2C2C]">
                          <span className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                            <GraduationCap className="w-4 h-4 text-amber-500" />
                            {activeTestLevel === "CCSE" || activeTestLevel === "DELE_A2" ? "Examen de Nacionalidad • " : "Test de Nivel "}
                            <strong className="text-[#FFD700]">
                              {activeTestLevel === "DELE_A2" ? "DELE A2 (Cervantes)" : activeTestLevel}
                            </strong>
                          </span>
                          <div className="flex justify-between sm:justify-end items-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-[#2B2B2B]">
                              <Clock className={`w-3.5 h-3.5 ${testTimeLeft <= 30 ? "text-red-500 animate-pulse" : "text-amber-500"}`} />
                              <span className={`font-mono text-xs font-bold leading-none ${testTimeLeft <= 30 ? "text-red-400" : "text-white"}`}>
                                {Math.floor(testTimeLeft / 60)}:{(testTimeLeft % 60).toString().padStart(2, '0')}
                              </span>
                            </span>
                            <span>Pregunta {testQuestionIdx + 1} de 5</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white leading-relaxed">
                            {TEST_QUESTIONS[activeTestLevel][testQuestionIdx].question}
                          </h4>
                          {TEST_QUESTIONS[activeTestLevel][testQuestionIdx].questionAr && (
                            <p className="text-right text-xs text-amber-500/80 dir-rtl font-serif pt-1.5 leading-relaxed">
                              {TEST_QUESTIONS[activeTestLevel][testQuestionIdx].questionAr}
                            </p>
                          )}
                        </div>

                        <div className="space-y-3 pt-2">
                          {TEST_QUESTIONS[activeTestLevel][testQuestionIdx].options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              id={`test_option_${oIdx}`}
                              onClick={() => submitTestAnswer(opt)}
                              className="w-full text-left p-4 rounded-xl border border-[#2C2C2C] bg-[#121212] hover:bg-amber-500/10 hover:border-amber-500/30 text-xs text-slate-300 transition-all font-sans cursor-pointer"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <button
                            id="cancel_test_btn"
                            onClick={() => {
                              setActiveTestLevel(null);
                              setTestScore(null);
                              setTestReviewMode(false);
                            }}
                            className="text-xs text-slate-500 hover:text-white cursor-pointer"
                          >
                            Cancelar Examen
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Corrections / Mistakes Review Screen
                      <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#2A2A2A] space-y-6 animate-fade-in text-left">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-[#2C2C2C]">
                          <div>
                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <span>Revisión del Examen • corrección</span>
                            </h4>
                            <p className="text-xs text-slate-400">Revisa tus respuestas y asimila las explicaciones lingüísticas bilingües.</p>
                          </div>
                          <div className="flex items-center gap-2 bg-[#2D2D2D] px-4 py-2 rounded-xl border border-[#3D3D3D] self-start sm:self-auto">
                            <span className="text-xs text-slate-400">Puntuación:</span>
                            <span className={`text-base font-black font-mono ${testScore! >= 80 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {testScore}%
                            </span>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ml-2 ${testScore! >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                              {testScore! >= 85 || testScore === 80 ? 'APTO / مؤهل' : 'NO APTO / غير مؤهل'}
                            </span>
                          </div>
                        </div>

                        {/* Question details list */}
                        <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                          {TEST_QUESTIONS[activeTestLevel!].map((q, idx) => {
                            const userAnswer = testAnswers[idx];
                            const isCorrect = userAnswer === q.correct;
                            return (
                              <div key={idx} className="bg-[#121212] border border-[#2B2B2B] p-4 rounded-xl space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <span className="text-xs font-mono font-bold bg-[#222] text-[#FFD700] px-2 py-0.5 rounded-md min-w-[24px] text-center mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <div className="space-y-1 flex-1">
                                    <h5 className="text-xs font-bold text-white leading-relaxed">{q.question}</h5>
                                    {q.questionAr && (
                                      <p className="text-right text-[11px] text-slate-400 dir-rtl font-serif pb-1 leading-relaxed">{q.questionAr}</p>
                                    )}
                                  </div>
                                  <span className="self-start">
                                    {isCorrect ? (
                                      <Check className="w-5 h-5 text-emerald-500" />
                                    ) : (
                                      <X className="w-5 h-5 text-red-500" />
                                    )}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-[#222]">
                                  <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Tu Respuesta</p>
                                    <p className={`mt-0.5 font-sans ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                                      {userAnswer || "(No contestada / Tiempo agotado)"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Respuesta Correcta</p>
                                    <p className="mt-0.5 text-emerald-400 font-sans">{q.correct}</p>
                                  </div>
                                </div>

                                {/* Explanations */}
                                <div className="mt-2.5 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 text-[11px] leading-relaxed text-slate-300">
                                  <p className="font-semibold text-amber-500 mb-1 flex items-center gap-1.5">
                                    <Info className="w-3.5 h-3.5" />
                                    <span>Análisis y Contexto • الشرح والتعليق</span>
                                  </p>
                                  <p className="font-sans text-slate-300">{q.explanation}</p>
                                  {q.explanationAr && (
                                    <p className="text-right text-[11px] text-slate-400 dir-rtl font-serif mt-1.5 pt-1.5 border-t border-amber-500/5 leading-relaxed">
                                      {q.explanationAr}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-[#2C2C2C]">
                          <button
                            id="back_to_list_btn"
                            onClick={() => {
                              setActiveTestLevel(null);
                              setTestScore(null);
                              setTestReviewMode(false);
                            }}
                            className="w-full sm:w-auto px-4 py-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white text-xs font-semibold rounded-lg transition cursor-pointer text-center"
                          >
                            Volver al Listado / القائمة
                          </button>

                          <div className="flex w-full sm:w-auto gap-3">
                            <button
                              id="review_retry_btn"
                              onClick={() => startMonthlyTest(activeTestLevel!)}
                              className="flex-1 sm:flex-none px-4 py-2 bg-[#2D2D2D] hover:bg-amber-500 hover:text-black text-white text-xs font-semibold rounded-lg transition cursor-pointer text-center"
                            >
                              Volver a Intentar / إعادة
                            </button>

                            {testScore! >= 80 && (
                              <button
                                id="review_see_certificate_btn"
                                onClick={() => setShowCertificate(true)}
                                className="flex-1 sm:flex-none px-5 py-2 bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-yellow-300 text-black text-xs font-black rounded-lg transition shadow-md flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Award className="w-4 h-4" />
                                <span>Ver mi Certificado</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {showCertificate && (
                  // Beautiful Golden digital certificate template 
                  <div id="issued_certificate" className="bg-[#121212] p-5 rounded-2xl border border-[#222] space-y-5 animate-scale-up">
                    <div className="bg-gradient-to-br from-[#1F1D17] to-[#121212] border-2 border-[#FFD700] rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4">
                      
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-24 h-24 border-r border-b border-amber-500/10 rounded-br-3xl pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-24 h-24 border-l border-b border-amber-500/10 rounded-bl-3xl pointer-events-none"></div>

                      <div className="w-12 h-12 bg-amber-500/10 border border-[#FFD700]/30 rounded-full flex items-center justify-center text-amber-500">
                        <Award className="w-6 h-6 animate-pulse" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-serif text-[#FFD700] tracking-widest uppercase">Academia de Español Al-Jamal</h4>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Documento acreditado de proficiencia</p>
                      </div>

                      <div className="py-2.5">
                        <p className="text-[10px] text-slate-400">
                          {activeTestLevel === "CCSE" || activeTestLevel === "DELE_A2"
                            ? "Por cuanto este candidato ha superado con éxito el simulacro de examen oficial de:"
                            : "Por cuanto este estudiante ha superado con mención de honor las pruebas mensuales:"}
                        </p>
                        <h2 className="text-xl font-extrabold text-[#E0E0E0] mt-1.5 uppercase tracking-wide">{profile.username}</h2>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {activeTestLevel === "CCSE"
                            ? "Preparación constitucional, histórica, geográfica y sociocultural de España."
                            : activeTestLevel === "DELE_A2"
                            ? "Acreditación de dominio de la Lengua Española nivel A2 (Examen DELE - Instituto Cervantes)."
                            : "Bajo dictamen e interferencias lingüísticas hispano-árabes bilingües."}
                        </p>
                      </div>

                      <div className="px-4 py-1.5 bg-[#FFD700]/10 rounded border border-[#FFD700]/30">
                        <span className="font-mono text-xs font-bold text-[#FFD700]">
                          {activeTestLevel === "CCSE"
                            ? "CONOCIMIENTOS CONSTITUCIONALES Y SOCIOCULTURALES (CCSE)"
                            : activeTestLevel === "DELE_A2"
                            ? "DIPLOMA DE ESPAÑOL COMO LENGUA EXTRANJERA (DELE A2)"
                            : `GRADO COMPROBADO: ${activeTestLevel}`}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-8 w-full max-w-sm pt-4 border-t border-[#2C2A24] text-center text-[9px] text-slate-500 font-mono">
                        <div>
                          <p className="text-[#E0E0E0] opacity-80 italic">Dirección Académica</p>
                          <p className="mt-1">Dra. S. Al-Haddad</p>
                        </div>
                        <div>
                          <p className="text-[#E0E0E0] opacity-80">Código Verificación</p>
                          <p className="mt-1">
                            {activeTestLevel === "CCSE"
                              ? "AND-2026-CCSE-OK"
                              : activeTestLevel === "DELE_A2"
                              ? "AND-2026-DELEA2-OK"
                              : "AND-2026-B1-99"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        id="download_certificate_pdf_btn"
                        onClick={() => {
                          triggerNotification("📥 Certificado Guardado", "Se ha simulado la descarga del pdf del certificado oficial.");
                        }}
                        className="flex-1 py-3 bg-white text-black text-xs font-extrabold rounded-xl hover:bg-slate-200 transition uppercase tracking-widest flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>Exportar PDF</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowCertificate(false);
                          setActiveTestLevel(null);
                        }}
                        className="py-3 px-5 bg-[#222] border border-[#333] hover:bg-[#2F2F2F] text-slate-300 rounded-xl text-xs font-bold"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: PERFORMANCE GRAPH AND REPORT (D3/Recharts) */}
            {activeTab === "progreso" && (
              <div id="performance_analytics" className="space-y-6 animate-fade-in flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                      <span>Analíticas de Rendimiento Personal • لوحة التحليلات</span>
                    </h3>
                    <button
                      id="export_csv_btn"
                      onClick={exportProgressCSV}
                      className="px-2.5 py-1.5 bg-[#1A1A1A] hover:bg-[#262626] border border-[#333] rounded text-xs text-amber-500 font-bold flex items-center gap-1"
                      title="Descargar historial"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Estudio longitudinal de los minutos empleados diariamente y su comparación con la meta configurada para mantener tu constancia de racha activa.
                  </p>
                </div>

                {/* Simulated metrics highlights boxes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#282828] text-center">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Práctica Total</span>
                    <span className="text-lg font-bold text-white font-mono">153 min</span>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#282828] text-center">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Meta Promedio</span>
                    <span className="text-lg font-bold text-white font-mono">{profile.dailyGoalMins} min</span>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#282828] text-center">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Eficiencia Global</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">92%</span>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#282828] text-center">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">XP Clave</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">+765 XP</span>
                  </div>
                </div>

                {/* Recharts Area Chart */}
                <div className="bg-[#151515] p-3 rounded-xl border border-[#222] h-60">
                  <span className="text-[10px] text-slate-400 font-bold block mb-2 uppercase tracking-wide">Minutos por Día (Últimos 7 Días)</span>
                  <div className="w-full h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorMins" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFD700" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#666" fontSize={10} />
                        <YAxis stroke="#666" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: 8 }} labelStyle={{ color: "#FFF" }} />
                        <Area type="monotone" dataKey="minutos" stroke="#FFD700" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMins)" name="Minutos" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* CONSISTENCY CONTRIBUIDAS (HEATMAP) WIDGET */}
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#282828] space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-500 animate-bounce" />
                        <span>Historial de Consistencia • تقويم المتابعة</span>
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Calendario continuo de estudio en los últimos 28 días de racha activa.</p>
                    </div>
                    <span className="text-[9px] bg-amber-500/15 text-[#FFD700] border border-amber-500/25 px-2 py-0.5 rounded font-bold uppercase">Racha: {profile.streak} DÍAS</span>
                  </div>

                  <div className="flex flex-col items-center p-3.5 bg-[#0D0D0D] rounded-lg border border-[#222]">
                    {/* Days of Week Headers */}
                    <div className="grid grid-cols-7 gap-1.5 w-full text-center text-[9px] text-slate-500 font-bold mb-1.5 font-mono">
                      <span>Dom</span>
                      <span>Lun</span>
                      <span>Mar</span>
                      <span>Mié</span>
                      <span>Jue</span>
                      <span>Vie</span>
                      <span>Sáb</span>
                    </div>

                    {/* Contribution Squares */}
                    <div className="grid grid-cols-7 gap-1.5 w-full">
                      {Array.from({ length: 28 }, (_, idx) => {
                        // Generate mock dynamic values consistent with racha
                        let mins = 0;
                        if (idx % 4 === 0) mins = 25;
                        else if (idx % 3 === 0) mins = 15;
                        else if (idx % 5 === 0) mins = 35;
                        else if (idx % 7 === 0) mins = 0;
                        else mins = ((idx * 3) % 28) + 5;

                        // Last 7 days are fully active to conform with Ahmad'sactive streak
                        if (idx >= 21) {
                          mins = [20, 25, 30, 22, 15, 30, 25][idx - 21];
                        }

                        let bgClass = "bg-[#141414] border border-[#222]/50 hover:bg-[#1E1E1E]";
                        let textStyle = "text-slate-500";
                        if (mins > 0 && mins <= 10) {
                          bgClass = "bg-amber-950/30 border border-amber-900/60 text-amber-400 hover:bg-amber-900/40";
                          textStyle = "text-amber-500";
                        } else if (mins > 10 && mins <= 21) {
                          bgClass = "bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30";
                          textStyle = "text-amber-400";
                        } else if (mins > 21) {
                          bgClass = "bg-[#FFD700] border border-amber-400 text-black font-extrabold hover:opacity-90";
                          textStyle = "text-black";
                        }

                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              triggerNotification(
                                `Progreso del Día ${idx + 1} 📆`,
                                `Completaste exitosamente ${mins} minutos de práctica bilingüe en esta fecha.`
                              );
                            }}
                            className={`aspect-square rounded-md cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center text-[7.5px] font-mono select-none ${bgClass}`}
                            title={`Día ${idx + 1}: ${mins} min`}
                          >
                            {mins > 0 ? `${mins}m` : ""}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center w-full mt-3 pt-2 border-t border-[#1F1F1F] text-[9px] text-slate-500">
                      <span>Inactivo</span>
                      <div className="flex gap-1.5 p-0.5 rounded">
                        <span className="w-2.5 h-2.5 rounded bg-[#141414] border border-[#222]" title="0 mins" />
                        <span className="w-2.5 h-2.5 rounded bg-amber-950/30 border border-amber-900/60" title="1-10 mins" />
                        <span className="w-2.5 h-2.5 rounded bg-amber-500/15 border border-amber-500/30" title="11-20 mins" />
                        <span className="w-2.5 h-2.5 rounded bg-[#FFD700]" title="21+ mins" />
                      </div>
                      <span>Excelente</span>
                    </div>
                  </div>
                </div>

                {/* Bar chart of Daily XP accumulated */}
                <div className="bg-[#151515] p-3 rounded-xl border border-[#222]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Bitácora de Sincronización</span>
                    <span className="text-[9px] text-slate-500 font-mono">Última subida: Hace un instante</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Todos tus informes semanales se guardan localmente para operar sin conexión y se sincronizan instantáneamente cuando detectan una red estable.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 5: SYSTEM PREFERENCES & WIDGET CONFIGURATION */}
            {activeTab === "ajustes" && (
              <div id="settings_module" className="space-y-6 animate-fade-in flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-amber-500" />
                    <span>Configuración de Academia • الضبط</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Gestiona tus recordatorios diarios, ajusta tus metas de estudio, sincroniza tus datos en la nube y configura tu widget educativo interactivo para pantalla de inicio.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Goal and notification controls form */}
                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2B2B2B] space-y-4">
                    <span className="text-[10px] text-amber-500 font-bold block uppercase tracking-wider">Objetivos de Práctica</span>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Minutos Diarios</span>
                        <strong className="text-amber-400 font-mono">{sliderMins} min</strong>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="60"
                        step="5"
                        value={sliderMins}
                        onChange={(e) => setSliderMins(Number(e.target.value))}
                        className="w-full h-1.5 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#2C2C2C]">
                      <div>
                        <span className="text-xs font-bold block">Recordatorios Inteligentes</span>
                        <span className="text-[9px] text-slate-400">Notificaciones push diarias</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.notificationsEnabled}
                        onChange={(e) => updateProfile(prev => ({ ...prev, notificationsEnabled: e.target.checked }))}
                        className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 bg-black border-[#333]"
                      />
                    </div>

                    <button
                      id="save_pref_btn"
                      onClick={handleSavePreferences}
                      className="w-full py-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-[#FFD700] text-xs font-bold rounded-lg transition text-center uppercase tracking-widest mt-2"
                    >
                      Aplicar Cambios
                    </button>
                  </div>

                  {/* Offline Widget configuration preview block */}
                  <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2B2B2B] space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-orange-500 font-bold block uppercase tracking-wider">Simulador de Widget (Pantalla Inicio)</span>
                      <p className="text-[10px] text-slate-400 mt-1">Configura el widget que verás en tu pantalla principal sin necesidad de abrir la aplicación.</p>
                    </div>

                    {/* Widget simulator render box */}
                    <div className="p-3.5 bg-[#121212] rounded-xl border border-dashed border-amber-500/30 space-y-2 relative">
                      <span className="absolute top-1.5 right-2 text-[8px] text-[#FFD700]/70 uppercase tracking-widest font-bold">WIDGET</span>
                      
                      {profile.widgetSetting.showStreak ? (
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🔥</span>
                          <div>
                            <p className="text-xs font-bold text-white">Al-Jamal Academia</p>
                            <p className="text-[9px] text-slate-400">Racha Diaria: <strong className="text-amber-500 font-mono">{profile.streak} días</strong></p>
                          </div>
                        </div>
                      ) : profile.widgetSetting.showDailyWord ? (
                        <div>
                          <p className="text-[8px] text-slate-500">PALABRA DEL DÍA</p>
                          <p className="text-sm font-bold text-amber-500">{activeWidgetWord.word}</p>
                          <p className="text-[9px] text-slate-300">Sentido: {activeWidgetWord.meaning} • <span className="italic text-slate-400 text-[8px]">{activeWidgetWord.etymology}</span></p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[8px] text-slate-500">PRÓXIMA CLASE</p>
                          <p className="text-xs font-bold text-white truncate">{profile.scheduledSessions[0]?.topic || "Sin tutorías agendadas"}</p>
                          {profile.scheduledSessions[0] && (
                            <p className="text-[9px] text-amber-500">📅 {profile.scheduledSessions[0].date} • {profile.scheduledSessions[0].time}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Selector triggers */}
                    <div className="grid grid-cols-3 gap-1 pt-1 text-center">
                      <button
                        onClick={() => updateProfile(p => ({ ...p, widgetSetting: { ...p.widgetSetting, showStreak: true, showDailyWord: false, showNextClass: false } }))}
                        className={`py-1 text-[8px] rounded uppercase font-bold border ${profile.widgetSetting.showStreak ? "bg-amber-500 text-black border-amber-400" : "bg-[#121212] text-slate-400 border-[#222]"}`}
                      >
                        Racha
                      </button>
                      <button
                        onClick={() => {
                          updateProfile(p => ({ ...p, widgetSetting: { ...p.widgetSetting, showStreak: false, showDailyWord: true, showNextClass: false } }));
                          setActiveWidgetWordIdx((activeWidgetWordIdx + 1) % DAILY_WORDS.length);
                        }}
                        className={`py-1 text-[8px] rounded uppercase font-bold border ${profile.widgetSetting.showDailyWord ? "bg-amber-500 text-black border-amber-400" : "bg-[#121212] text-slate-400 border-[#222]"}`}
                      >
                        Palabra
                      </button>
                      <button
                        onClick={() => updateProfile(p => ({ ...p, widgetSetting: { ...p.widgetSetting, showStreak: false, showDailyWord: false, showNextClass: true } }))}
                        className={`py-1 text-[8px] rounded uppercase font-bold border ${profile.widgetSetting.showNextClass ? "bg-amber-500 text-black border-amber-400" : "bg-[#121212] text-slate-400 border-[#222]"}`}
                      >
                        Clase
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Profile Avatar Generator Block */}
                <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2B2B2B] space-y-4 col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 border-b border-[#2C2C2C] pb-3">
                    <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white uppercase tracking-wider">Diseñador de Avatar con IA • طاقة تصميم الرمز الشخصي</span>
                      <span className="text-[10px] text-slate-400">Actualiza tu foto de perfil usando el modelo generativo de imagen de Gemini</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Left side: Input prompt & Presets */}
                    <div className="md:col-span-7 space-y-3">
                      <label className="text-xs font-semibold text-slate-300 block">Estilo artístico sugerido o escribe tu idea:</label>
                      
                      {/* Quick Presets Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "Calígrafo Andalusí ✒️", prompt: "A minimalist flat vector icon of a medieval Andalusian calligrapher sitting at a wooden desk with paper scroll, inkwell and quill, clean design, circular framing" },
                          { label: "Caballero de Córdoba 🏰", prompt: "A 3D stylized character portrait avatar of an ancient knight in rich armor with gold geometric patterns inspired by Cordoba mosque columns, dark modern slate background, circular avatar, centered" },
                          { label: "Tutora de Español 📖", prompt: "A friendly academic digital art portrait of a female tutor in gold dress holding a book, warm lighting, flat cartoon vector shape, clean style, circular framing" },
                          { label: "Estudiante Bilingüe 🎓", prompt: "A modern line art sticker visual illustration of a young smart student wearing glasses, holding a coffee cup, cute, smiling, soft orange aesthetic, high-contrast dark circular background" }
                        ].map((preset, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setAiAvatarPrompt(preset.prompt);
                              handleGenerateAiAvatar(preset.prompt);
                            }}
                            disabled={isGeneratingAvatar}
                            className="p-2 text-left bg-[#121212] hover:bg-amber-500/10 border border-[#242424] hover:border-amber-500/30 rounded-lg transition text-[10px] text-slate-300 hover:text-[#FFD700] cursor-pointer font-medium disabled:opacity-50"
                          >
                            <p className="font-bold mb-0.5">{preset.label}</p>
                            <p className="text-[8px] text-slate-500 truncate">{preset.prompt}</p>
                          </button>
                        ))}
                      </div>

                      {/* Custom Input prompt */}
                      <div className="space-y-1.5 pt-1">
                        <textarea
                          value={aiAvatarPrompt}
                          onChange={(e) => setAiAvatarPrompt(e.target.value)}
                          placeholder="Ejemplos: Un león con turbante medieval leyendo un libro en Córdoba, ilustración vectorial, fondo oscuro..."
                          disabled={isGeneratingAvatar}
                          className="w-full h-16 p-2 bg-[#121212] border border-[#2B2B2B] focus:border-amber-500/50 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none resize-none"
                        />
                        <div className="flex justify-between items-center text-[9px] text-slate-500">
                          <span>Admite español e inglés técnico para mejores detalles</span>
                          <span className="font-mono">{aiAvatarPrompt.length} caracteres</span>
                        </div>
                      </div>

                      {/* Generate button */}
                      <button
                        type="button"
                        onClick={() => handleGenerateAiAvatar(aiAvatarPrompt)}
                        disabled={isGeneratingAvatar || !aiAvatarPrompt.trim()}
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/10 disabled:text-slate-500 disabled:border-transparent text-black text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 uppercase tracking-widest cursor-pointer shadow-md shadow-amber-500/5"
                      >
                        <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAvatar ? 'animate-spin' : ''}`} />
                        {isGeneratingAvatar ? "Diseñando tu avatar..." : "Generar con IA"}
                      </button>
                    </div>

                    {/* Right side: Preview and Apply */}
                    <div className="md:col-span-5 bg-[#121212] p-4 rounded-xl border border-[#242424] flex flex-col justify-between items-center text-center space-y-3 min-h-[220px]">
                      <span className="text-[10px] text-[#FFD700] font-bold uppercase tracking-wider block">Vista Previa del Avatar</span>
                      
                      <div className="relative">
                        {/* Image frame */}
                        <div className="w-28 h-28 rounded-full bg-[#1A1A1A] border-2 border-amber-500 p-1 flex items-center justify-center overflow-hidden font-mono text-3xl text-amber-500 relative">
                          {isGeneratingAvatar ? (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2">
                              <RefreshCw className="w-6 h-6 text-amber-500 animate-spin mb-1" />
                              <span className="text-[7px] text-amber-500 font-sans animate-pulse uppercase tracking-wider font-bold">Generando...</span>
                            </div>
                          ) : null}
                          
                          {aiAvatarPreview ? (
                            <img
                              src={aiAvatarPreview}
                              alt="Previsualización de IA"
                              className="w-full h-full object-cover rounded-full"
                              referrerPolicy="no-referrer"
                            />
                          ) : profile.avatarUrl ? (
                            <img
                              src={profile.avatarUrl}
                              alt="Avatar actual"
                              className="w-full h-full object-cover rounded-full"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span className="text-white font-extrabold">{profile.username[0]}</span>
                          )}
                        </div>

                        {aiAvatarPreview && (
                          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-95 border border-[#121212]">
                            ¡Listo!
                          </span>
                        )}
                      </div>

                      {/* Controls for newly generated avatar */}
                      <div className="w-full space-y-2">
                        {aiAvatarPreview ? (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleApplyGeneratedAvatar}
                              className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition uppercase tracking-wide cursor-pointer"
                            >
                              Aplicar Avatar
                            </button>
                            <button
                              type="button"
                              onClick={() => setAiAvatarPreview(null)}
                              className="px-3 py-1.5 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-slate-300 text-[10px] font-semibold rounded-lg transition cursor-pointer"
                            >
                              Descartar
                            </button>
                          </div>
                        ) : (
                          <p className="text-[9px] text-slate-500 max-w-[180px] mx-auto leading-normal">
                            {profile.avatarUrl ? "Tu foto de perfil actual ha sido cargada con éxito." : "Selecciona un estilo rápido o escribe un prompt personalizado arriba."}
                          </p>
                        )}
                      </div>

                      {/* Error log if any */}
                      {avatarError && (
                        <div className="p-2 bg-red-950/20 border border-red-500/20 rounded-md text-[9px] text-red-400 mt-2 text-left leading-normal">
                          <span className="font-bold">Aviso: </span>{avatarError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Secure cloud sync module */}
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2B2B2B] flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/10 rounded-full text-amber-500">
                      <RefreshCw className={`w-5 h-5 ${syncingCloud ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Sincronización en la Nube de Al-Jamal</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Mantiene tus datos e informes unificados entre dispositivos móviles y la web de forma automática.</p>
                    </div>
                  </div>
                  <button
                    id="trigger_cloud_sync_btn"
                    disabled={syncingCloud}
                    onClick={handleCloudSync}
                    className="px-5 py-2.5 bg-amber-500 text-black text-xs font-extrabold rounded-lg hover:bg-amber-600 transition tracking-wider uppercase whitespace-nowrap"
                  >
                    {syncingCloud ? "Guardando..." : "Sincronizar Ahora"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: AI NATIVE SPEAKERS TUTOR CHAT (3 Cols) */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Chat con Nativos Certified card */}
          <div className="bg-[#121212] rounded-2xl p-4 border border-[#222] flex-1 flex flex-col justify-between min-h-[460px]">
            
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#222]">
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Chat del Profesor Jamal • الدردشة مع المعلم
                  </h3>
                  <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">Hablantes Certificados por Al-Jamal</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setShowHistoryView(!showHistoryView);
                      setInspectingSession(null);
                    }}
                    className={`text-[9px] px-2 py-1 rounded font-bold uppercase transition flex items-center gap-1 cursor-pointer ${
                      showHistoryView
                        ? "bg-amber-500 text-black shadow"
                        : "bg-[#1A1A1A] text-[#FFD700] hover:bg-amber-500/10 border border-amber-500/20"
                    }`}
                    title="Ver Historial de Conversaciones en LocalStorage"
                  >
                    <span>📜</span>
                    <span>Historial ({pastSessions.filter(s => s.tutorId === selectedTutor.id).length})</span>
                  </button>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-1 rounded font-extrabold font-mono">En Línea</span>
                </div>
              </div>

              {/* Tutor Selector tabs */}
              <div className="grid grid-cols-3 gap-1 mb-3 bg-[#1A1A1A] p-1 rounded-lg">
                {TUTORS.map((tutor) => (
                  <button
                    key={tutor.id}
                    id={`tutor_tab_${tutor.id}`}
                    onClick={() => {
                      setSelectedTutor(tutor);
                      // Reset inspect if we switch tutors while viewing history
                      setInspectingSession(null);
                    }}
                    className={`py-1.5 rounded text-center transition-all flex flex-col items-center justify-center ${
                      selectedTutor.id === tutor.id
                        ? "bg-amber-500 text-black font-extrabold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="text-sm">{tutor.avatar}</span>
                    <span className="text-[8px] font-bold block mt-0.5 truncate max-w-[50px]">{tutor.name.split(" ")[1]}</span>
                  </button>
                ))}
              </div>

              {showHistoryView ? (
                /* HISTORY VIEW PANEL */
                <div className="space-y-3 animate-fade-in min-h-[350px]">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() => {
                        setShowHistoryView(false);
                        setInspectingSession(null);
                      }}
                      className="text-xs text-amber-500 hover:text-amber-400 font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                    >
                      <span>← Chatear en Vivo</span>
                    </button>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                      {inspectingSession ? "Detalle" : "Historial"} con {selectedTutor.name.split(" ")[0]}
                    </span>
                  </div>

                  {inspectingSession ? (
                    /* VIEWING/INSPECTING HISTORIC CHAT */
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center bg-[#1A1A1A] p-2 rounded-lg border border-[#2B2B2B]">
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] text-white font-bold">{inspectingSession.date}</p>
                          <p className="text-[8px] text-slate-500 truncate">Sincronizado con LocalStorage</p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleResumePastSession(inspectingSession)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] px-2.5 py-1 rounded transition uppercase cursor-pointer"
                          >
                            Reanudar
                          </button>
                          <button
                            onClick={() => setInspectingSession(null)}
                            className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-slate-300 font-semibold text-[9px] px-2 py-1 rounded transition cursor-pointer"
                          >
                            Lista
                          </button>
                        </div>
                      </div>

                      {/* Historic bubble messages scroll */}
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-[#222] h-60 overflow-y-auto space-y-3 pr-1 text-xs">
                        {inspectingSession.messages.map((msg, mIdx) => {
                          const isUser = msg.role === "user";
                          return (
                            <div
                              key={mIdx}
                              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                            >
                              <div
                                className={`p-2.5 rounded-xl max-w-[90%] leading-relaxed ${
                                  isUser
                                    ? "bg-amber-500/20 border border-amber-500/30 text-[#FFD700] rounded-tr-none font-sans"
                                    : "bg-[#1A1A1A] border border-[#2B2B2B] text-slate-200 rounded-tl-none font-sans"
                                }`}
                              >
                                <p>{msg.text}</p>
                              </div>
                              <span className="text-[8px] text-slate-500 mt-0.5 px-1 font-mono">{msg.timestamp}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* LIST OF CORRESPONDING SAVED CHATS */
                    <div className="space-y-2">
                      {pastSessions.filter(s => s.tutorId === selectedTutor.id).length === 0 ? (
                        <div className="bg-[#0A0A0A] rounded-xl border border-[#222] p-8 text-center flex flex-col items-center justify-center space-y-2 min-h-[250px]">
                          <span className="text-3xl">📭</span>
                          <p className="text-xs font-bold text-white">Sin historial de chats</p>
                          <p className="text-[10px] text-slate-500 max-w-[200px] leading-normal mx-auto">
                            Las conversaciones que tengas con {selectedTutor.name.split(" ")[0]} se pueden guardar aquí tocando el botón <strong className="text-amber-500">Archivar</strong>.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                          {pastSessions
                            .filter(s => s.tutorId === selectedTutor.id)
                            .map((session) => (
                              <div
                                key={session.id}
                                className="bg-[#1A1A1A] hover:bg-[#202020] border border-[#252525] hover:border-amber-500/30 rounded-lg p-2 transition flex justify-between items-center gap-2"
                              >
                                <div
                                  className="flex-1 min-w-0 cursor-pointer text-left"
                                  onClick={() => setInspectingSession(session)}
                                  title="Ver esta conversación"
                                >
                                  <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-[9px] font-bold text-slate-400 font-mono">{session.date}</span>
                                    <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1 rounded font-bold">{session.messages.length} msgs</span>
                                  </div>
                                  <p className="text-[10px] text-white truncate font-medium">{session.preview}</p>
                                </div>

                                <div className="flex gap-1 shrink-0">
                                  <button
                                    onClick={() => setInspectingSession(session)}
                                    className="p-1 px-1.5 bg-[#252525] hover:bg-amber-500/20 border border-[#333] hover:border-amber-500/40 rounded text-[9px] text-[#FFD700] hover:text-white transition cursor-pointer font-bold"
                                    title="Inspeccionar conversación"
                                  >
                                    Ver
                                  </button>
                                  <button
                                    onClick={() => handleResumePastSession(session)}
                                    className="p-1 px-1.5 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/10 rounded text-[9px] font-bold transition cursor-pointer"
                                    title="Cargar conversación en chat activo"
                                  >
                                    Cargar
                                  </button>
                                  <button
                                    onClick={() => handleDeletePastSession(session.id)}
                                    className="p-1 bg-[#121212]/50 hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-slate-800 rounded transition cursor-pointer"
                                    title="Eliminar del historial"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="text-[9px] bg-amber-500/5 p-2 rounded border border-amber-500/10 text-slate-400 text-center leading-normal">
                    💡 Las sesiones archivadas se almacenan permanentemente en tu dispositivo mediante <strong>LocalStorage</strong>.
                  </div>
                </div>
              ) : (
                /* LIVE ACTIVE CHAT VIEW */
                <div className="space-y-3">
                  {/* Selected Tutor mini-intro */}
                  <div className="bg-[#1A1A1A] p-2.5 rounded-lg border border-[#2A2A2A] text-[10px] leading-relaxed relative flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <span className="bg-amber-500/10 text-[#FFD700] text-[7px] font-bold px-1 rounded uppercase mr-1">{selectedTutor.level}</span>
                      <p className="font-bold text-white text-[11px] truncate inline">{selectedTutor.name}</p>
                      <p className="text-[#FFD700] font-medium mt-0.5">{selectedTutor.specialty}</p>
                      <p className="text-slate-400 font-serif dir-rtl text-right mt-1 leading-normal italic text-[9px]">{selectedTutor.style}</p>
                    </div>
                    
                    <button
                      onClick={handleArchiveCurrentSession}
                      className="shrink-0 bg-[#242424] hover:bg-amber-500/10 border border-[#2D2D2D] hover:border-amber-500/30 text-slate-300 hover:text-[#FFD700] px-2 py-1 rounded text-[8px] font-extrabold uppercase transition flex items-center gap-1 cursor-pointer"
                      title="Archivar conversación actual e iniciar una nueva"
                    >
                      <Save className="w-2.5 h-2.5" />
                      <span>Archivar</span>
                    </button>
                  </div>

                  {/* Chat Speech bubble box */}
                  <div className="bg-[#0A0A0A] p-3 rounded-xl border border-[#222] h-60 overflow-y-auto space-y-3 pr-1 text-xs">
                    {(chatMessages[selectedTutor.id] || []).map((msg, mIdx) => {
                      const isUser = msg.role === "user";
                      return (
                        <div
                          key={mIdx}
                          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                        >
                          <div className={`flex items-end gap-1.5 w-full ${isUser ? "justify-end-reverse flex-row-reverse" : "justify-start flex-row"}`}>
                            <div
                              className={`p-2.5 rounded-xl max-w-[80%] leading-relaxed ${
                                isUser
                                  ? "bg-amber-500 text-black font-medium rounded-tr-none"
                                  : "bg-[#1A1A1A] border border-[#2B2B2B] text-slate-200 rounded-tl-none font-sans"
                              }`}
                            >
                              <p>{msg.text}</p>
                            </div>
                            {!isUser && (
                              <button
                                onClick={() => speakSpanishPhrase(msg.text)}
                                className="shrink-0 p-1.5 rounded-full bg-[#181818] border border-[#2B2B2B] text-amber-500 hover:text-white hover:bg-amber-500 hover:scale-105 active:scale-95 transition cursor-pointer self-center"
                                title="Escuchar pronunciación"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <span className="text-[8px] text-slate-500 mt-0.5 px-1 font-mono">{msg.timestamp}</span>
                        </div>
                      );
                    })}

                    {isLoadingChat && (
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 italic px-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                        <span>{selectedTutor.name.split(" ")[0]} está respondiendo en bilingüe...</span>
                      </div>
                    )}
                  </div>

                  {/* Suggested quick conversation starters */}
                  <div className="flex flex-wrap gap-1.5 pt-2 pb-1 bg-[#0A0A0A] px-2 rounded-lg border border-[#222]/30">
                    {[
                      { label: "Sol vs Luna ☀️", text: "Explícame la regla del género gramatical opuesto entre Sol y Luna" },
                      { label: "Ser vs Estar ⚖️", text: "Dame un ejemplo práctico de cómo diferenciar Ser y Estar comparado con el árabe" },
                      { label: "Hospitalidad 🤝", text: "¿Qué origen etimológico tiene la frase de hospitalidad de mi casa es tu casa?" }
                    ].map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => {
                          setCurrentInputText(chip.text);
                        }}
                        className="px-2 py-1 text-[8.5px] font-semibold text-[#FFD700] hover:text-black bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 rounded-md transition duration-250 cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Message input area */}
                  <div className="flex gap-1.5 pt-3 border-t border-[#1F1F1F]">
                    <input
                      type="text"
                      id="tutor_chat_input"
                      placeholder="Escribe en español... (Escríbele algo)"
                      value={currentInputText}
                      onChange={(e) => setCurrentInputText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                      className="flex-1 px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-sans"
                    />
                    <button
                      id="send_tutor_msg_btn"
                      onClick={handleSendChatMessage}
                      className="bg-amber-500 hover:bg-amber-600 font-extrabold text-black text-xs px-3 py-2 rounded-xl"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gamified Leaderboard card: Liga de Al-Andalus */}
          <div className="bg-[#121212] rounded-2xl p-5 border border-[#222] space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Liga Diamante Al-Jamal • قائمة الصدارة</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="text-[#FFD700] font-bold">1</span>
                  <span className="text-slate-200">Omar Al-Fatah</span>
                </span>
                <span className="font-mono text-slate-400">3,840 XP</span>
              </div>

              <div className="flex items-center justify-between text-xs bg-[#1A1A1A]/80 p-2 border.5 border-[#333] rounded-lg">
                <span className="flex items-center gap-2">
                  <span className="text-[#CD7F32] font-extrabold animate-bounce">2</span>
                  <span className="text-white font-extrabold">Tú ({profile.username.split(" ")[0]})</span>
                </span>
                <span className="font-mono text-[#FFD700] font-extrabold">{profile.xp} XP</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="text-[#C0C0C0] font-bold">3</span>
                  <span className="text-slate-200">Fatima Zahra</span>
                </span>
                <span className="font-mono text-slate-400">2,100 XP</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <span>4</span>
                  <span>Yussef Al-M.</span>
                </span>
                <span className="font-mono">1,950 XP</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER TAB NAV BAR */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-[#121212] border-t border-[#2A2A2A] z-40 flex items-center justify-around px-2 text-center shadow-2xl">
        <button
          id="footer_tab_lessons"
          onClick={() => {
            setActiveTab("lessons");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            activeTab === "lessons" ? "text-[#FFD700] font-bold" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <span className="text-lg">📚</span>
          <span className="text-[9px] uppercase tracking-wider font-extrabold">LECCIONES</span>
        </button>

        <button
          id="footer_tab_voice"
          onClick={() => {
            setActiveTab("voice");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            activeTab === "voice" ? "text-[#FFD700] font-bold" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <span className="text-lg">🗣️</span>
          <span className="text-[9px] uppercase tracking-wider font-extrabold">HABLAR</span>
        </button>

        <button
          id="footer_tab_misiones"
          onClick={() => {
            setActiveTab("misiones");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            activeTab === "misiones" ? "text-[#FFD700] font-bold" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <span className="text-lg">🏆</span>
          <span className="text-[9px] uppercase tracking-wider font-extrabold">MISIONES</span>
        </button>

        <button
          id="footer_tab_progreso"
          onClick={() => {
            setActiveTab("progreso");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            activeTab === "progreso" ? "text-[#FFD700] font-bold" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <span className="text-lg">📊</span>
          <span className="text-[9px] uppercase tracking-wider font-extrabold">PROGRESO</span>
        </button>

        <button
          id="footer_tab_ajustes"
          onClick={() => {
            setActiveTab("ajustes");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            activeTab === "ajustes" ? "text-[#FFD700] font-bold" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <span className="text-lg">⚙️</span>
          <span className="text-[9px] uppercase tracking-wider font-extrabold">AJUSTES</span>
        </button>
      </footer>
    </div>
  );
}

// Fixed constant data list for Voice PHRASES with detailed pronunciation feedback targets
const VOICE_PHRASES = [
  {
    word: "La almohada está en la cama.",
    trans: "المخدة على السرير. (تركيز على أصل الكلمة وتصريف أداة التأنيث 'la')"
  },
  {
    word: "Me gustaría tomar café con azúcar.",
    trans: "أود شرب القهوة مع السكر. (تمثيل نطق صوت الـ 'P' والـ 'z' والـ 'c' اللغوي)"
  },
  {
    word: "El coche arranca rápido por la mañana.",
    trans: "السيارة تنطلق بسرعة في الصباح. (تذكير: كلمة coche مذكر بالإسبانية ومؤنث بالعربية)"
  },
  {
    word: "Ojalá mi padre venga hoy temprano.",
    trans: "إن شاء الله يأتي والدي مبكراً اليوم. (مطبقة النطق السليم للـ 'P' ومفهوم التمني)"
  },
  {
    word: "El perro corre mucho en el jardín.",
    trans: "الكلب يجري كثيراً في الحديقة. (تدريب على حرف الـ 'rr' المزدوج الصعب)"
  }
];
