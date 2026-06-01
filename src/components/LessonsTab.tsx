import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Lesson, LessonStep, UserProfile, ArabismWord } from "../types";
import { LESSONS, DAILY_WORDS as ARABISMS_DATABASE } from "../data";
import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Search,
  Volume2,
  Sparkles,
  HelpCircle,
  XCircle,
  Award,
  BookMarked,
  Layers,
  Flame,
  CheckCircle2,
  Bookmark,
  Trash2,
  Plus,
  Check,
  X
} from "lucide-react";

interface LessonsTabProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  playXPSound: () => void;
  triggerNotification: (title: string, body: string) => void;
}

export default function LessonsTab({
  profile,
  updateProfile,
  playXPSound,
  triggerNotification
}: LessonsTabProps) {
  // Module View: 'lessons' | 'dictionary' | 'vocabulary'
  const [moduleView, setModuleView] = useState<"lessons" | "dictionary" | "vocabulary">("lessons");

  // Saved and learned state persistence for Vocabulary view
  const [savedWords, setSavedWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("andalus_saved_vocab");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [learnedWords, setLearnedWords] = useState<string[]>(() => {
    try {
      const learned = localStorage.getItem("andalus_learned_vocab");
      return learned ? JSON.parse(learned) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("andalus_saved_vocab", JSON.stringify(savedWords));
  }, [savedWords]);

  useEffect(() => {
    localStorage.setItem("andalus_learned_vocab", JSON.stringify(learnedWords));
  }, [learnedWords]);

  const toggleSaved = (wordSpanish: string) => {
    const isSaved = savedWords.includes(wordSpanish);
    if (!isSaved) {
      setSavedWords(prev => [...prev, wordSpanish]);
      triggerNotification(
        "Añadido al Repaso 📌",
        `"${wordSpanish}" se ha guardado en tu lista personalizada de Vocabulario.`
      );
    } else {
      setSavedWords(prev => prev.filter(w => w !== wordSpanish));
      triggerNotification(
        "Eliminado de Repaso 🗑️",
        `"${wordSpanish}" se quitó de tu lista personalizada.`
      );
    }
  };

  const toggleLearned = (wordSpanish: string) => {
    const isLearned = learnedWords.includes(wordSpanish);
    if (!isLearned) {
      setLearnedWords(prev => [...prev, wordSpanish]);
      playXPSound();
      updateProfile(prev => ({
        ...prev,
        xp: prev.xp + 10,
        points: prev.points + 2
      }));
      triggerNotification(
        "¡Palabra Dominada! 🏆",
        `Has marcado "${wordSpanish}" como aprendida. ¡Obtienes +10 XP y +2 puntos!`
      );

      // Celebrate with custom Al-Ándalus themed burst (Gold, Emerald, Amber, Teal)
      try {
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 1000 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 40 * (timeLeft / duration);
          confetti({ 
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ["#FFD700", "#10B981", "#F59E0B", "#14B8A6"]
          });
          confetti({ 
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ["#FFD700", "#10B981", "#F59E0B", "#14B8A6"]
          });
        }, 200);
      } catch (err) {
        console.error("Confetti error", err);
      }
    } else {
      setLearnedWords(prev => prev.filter(w => w !== wordSpanish));
      triggerNotification(
        "Palabra en repaso 📖",
        `"${wordSpanish}" ha regresado a tu lista de estudio activo.`
      );
    }
  };

  const [vocabSearch, setVocabSearch] = useState("");

  // State for the interactive Vocabulary study and practice simulator
  const [vocabSubView, setVocabSubView] = useState<"overview" | "practice" | "challenge">("overview");
  const [vocabPracticeFilter, setVocabPracticeFilter] = useState<"all" | "saved">("all");
  const [vocabPracticeIdx, setVocabPracticeIdx] = useState<number>(0);
  const [vocabPracticeOptions, setVocabPracticeOptions] = useState<string[]>([]);
  const [vocabPracticeSelected, setVocabPracticeSelected] = useState<string | null>(null);
  const [vocabPracticeAnswered, setVocabPracticeAnswered] = useState<boolean>(false);
  const [vocabPracticeIsCorrect, setVocabPracticeIsCorrect] = useState<boolean>(false);
  const [vocabPracticeStreak, setVocabPracticeStreak] = useState<number>(0);
  const [vocabPracticePool, setVocabPracticePool] = useState<ArabismWord[]>([]);

  // Challenge states
  const [challengePool, setChallengePool] = useState<ArabismWord[]>([]);
  
  // Daily Al-Jamal Challenge states
  const [dailyRetoComplete, setDailyRetoComplete] = useState<boolean>(() => {
    return localStorage.getItem("aljamal_daily_reto_complete") === "true";
  });
  const [selectedRetoAnswer, setSelectedRetoAnswer] = useState<string | null>(null);
  const [retoFeedback, setRetoFeedback] = useState<string | null>(null);
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [challengeOptions, setChallengeOptions] = useState<string[]>([]);
  const [challengeSelected, setChallengeSelected] = useState<string | null>(null);
  const [challengeAnswered, setChallengeAnswered] = useState<boolean>(false);
  const [challengeIsCorrect, setChallengeIsCorrect] = useState<boolean>(false);
  const [challengeStreak, setChallengeStreak] = useState<number>(0);
  const [challengeMaxStreak, setChallengeMaxStreak] = useState<number>(0);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeHistory, setChallengeHistory] = useState<(boolean | null)[]>([null, null, null, null, null]);

  const DAILY_RETO = {
    question: "¿Qué palabra española de origen árabe significa 'el jugo de la fruta de la oliva'?",
    questionAr: "أي كلمة إسبانية مشتقة من أصل عربي تعني 'عصير ثمرة الزيتون'؟",
    options: ["Almíbar (الميثار)", "Aceite (الزيت)", "Azúcar (السكر)", "Albaricoque (المشمش)"],
    correct: "Aceite (الزيت)",
    etymology: "Aceite deriva del árabe andalusí 'az-zayt' (الزيت), que a su vez proviene del arameo 'zaytā'. ¡Una herencia agrícola andalusí fundamental!",
    rewardXp: 20,
    rewardPoints: 5
  };

  const handleAnswerReto = (option: string) => {
    if (dailyRetoComplete) return;
    setSelectedRetoAnswer(option);
    if (option === DAILY_RETO.correct) {
      setRetoFeedback(`¡Excelente trabajo! 🎉 ${DAILY_RETO.etymology}`);
      setDailyRetoComplete(true);
      localStorage.setItem("aljamal_daily_reto_complete", "true");
      playXPSound();
      updateProfile((prev) => ({
        ...prev,
        xp: prev.xp + DAILY_RETO.rewardXp,
        points: prev.points + DAILY_RETO.rewardPoints
      }));
      
      // Dynamic celebration
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#10B981", "#F59E0B"]
        });
      } catch (e) {}

      triggerNotification("🔥 +20 XP • Reto Superado", "¡Has completado con éxito el Desafío Diario de Al-Jamal!");
    } else {
      setRetoFeedback("Oh, respuesta incorrecta. ❌ Inténtalo de nuevo para aprender la etimología.");
    }
  };

  const startQuickChallenge = () => {
    // 5 random questions pulled primarily from savedWords
    let pool: ArabismWord[] = ARABISMS_DATABASE.filter(w => savedWords.includes(w.spanish));
    
    // If we have fewer than 5 saved words, backfill with random arabisms so user is never blocked
    if (pool.length < 5) {
      const remainingCount = 5 - pool.length;
      const candidates = ARABISMS_DATABASE.filter(w => !savedWords.includes(w.spanish));
      const additional = candidates.sort(() => Math.random() - 0.5).slice(0, remainingCount);
      pool = [...pool, ...additional];
    }
    
    // Shuffle the final 5 words randomly
    const finalPool = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
    
    setChallengePool(finalPool);
    setChallengeIdx(0);
    setChallengeStreak(0);
    setChallengeMaxStreak(0);
    setChallengeScore(0);
    setChallengeHistory([null, null, null, null, null]);
    setVocabSubView("challenge");
    
    generateChallengeOptions(finalPool[0]);
  };

  const generateChallengeOptions = (target: ArabismWord) => {
    if (!target) return;
    // Get 3 random distractors from original ARABISMS_DATABASE
    const distractors = ARABISMS_DATABASE
      .filter(w => w.spanish !== target.spanish)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.meaning);

    const merged = [target.meaning, ...distractors].sort(() => Math.random() - 0.5);
    setChallengeOptions(merged);
    setChallengeSelected(null);
    setChallengeAnswered(false);
    setChallengeIsCorrect(false);
  };

  const handleVerifyChallenge = () => {
    if (challengeSelected === null || challengeAnswered) return;
    const currentTarget = challengePool[challengeIdx];
    const correct = challengeSelected === currentTarget.meaning;
    setChallengeIsCorrect(correct);
    setChallengeAnswered(true);

    // Update history tracker
    setChallengeHistory(prev => {
      const copy = [...prev];
      copy[challengeIdx] = correct;
      return copy;
    });

    if (correct) {
      playXPSound();
      setChallengeScore(prev => prev + 1);
      setChallengeStreak(prev => {
        const nextStreak = prev + 1;
        if (nextStreak > challengeMaxStreak) {
          setChallengeMaxStreak(nextStreak);
        }
        return nextStreak;
      });
      
      updateProfile(prev => ({
        ...prev,
        xp: prev.xp + 20, // Special bonus 20 XP for challenge success!
        points: prev.points + 4
      }));
      
      triggerNotification(
        "¡Respuesta Correcta! 🌟",
        `Has acertado con "${currentTarget.spanish}". ¡Vas por buen camino!`
      );
    } else {
      setChallengeStreak(0);
      triggerNotification(
        "¡Intento incorrecto! 💡",
        `La respuesta correcta era: "${currentTarget.meaning}".`
      );
    }
  };

  const handleNextChallenge = () => {
    if (challengeIdx < challengePool.length - 1) {
      const nextIdx = challengeIdx + 1;
      setChallengeIdx(nextIdx);
      generateChallengeOptions(challengePool[nextIdx]);
    } else {
      // Reached the end of the 5 questions!
      if (challengeScore >= 4) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFD700", "#10B981", "#F59E0B", "#14B8A6"]
          });
        } catch (e) {
          console.error(e);
        }
      }
      
      triggerNotification(
        "¡Desafío Rápido Completado! 🏁",
        `Has acertado ${challengeScore} de 5 preguntas. ¡Racha máxima de aciertos consecutivos: ${challengeMaxStreak}!`
      );
      setVocabSubView("overview");
    }
  };

  // Function to initialize the vocabulary practice session
  const startVocabPractice = (filterType: "all" | "saved") => {
    let pool: ArabismWord[] = [];
    if (filterType === "saved") {
      pool = ARABISMS_DATABASE.filter(w => savedWords.includes(w.spanish));
      if (pool.length < 2) {
        const additional = ARABISMS_DATABASE.filter(w => !savedWords.includes(w.spanish)).slice(0, 4 - pool.length);
        pool = [...pool, ...additional];
      }
    } else {
      pool = [...ARABISMS_DATABASE];
    }
    
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    setVocabPracticePool(shuffledPool);
    setVocabPracticeFilter(filterType);
    setVocabPracticeIdx(0);
    setVocabSubView("practice");
    setVocabPracticeStreak(0);
    
    generatePracticeOptions(shuffledPool[0]);
  };

  const generatePracticeOptions = (target: ArabismWord) => {
    if (!target) return;
    const distractors = ARABISMS_DATABASE
      .filter(w => w.spanish !== target.spanish)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.meaning);

    const merged = [target.meaning, ...distractors].sort(() => Math.random() - 0.5);
    setVocabPracticeOptions(merged);
    setVocabPracticeSelected(null);
    setVocabPracticeAnswered(false);
    setVocabPracticeIsCorrect(false);
  };

  const handleVerifyVocabPractice = () => {
    if (vocabPracticeSelected === null || vocabPracticeAnswered) return;
    const currentTarget = vocabPracticePool[vocabPracticeIdx];
    const correct = vocabPracticeSelected === currentTarget.meaning;
    setVocabPracticeIsCorrect(correct);
    setVocabPracticeAnswered(true);

    if (correct) {
      playXPSound();
      setVocabPracticeStreak(prev => prev + 1);
      
      updateProfile(prev => ({
        ...prev,
        xp: prev.xp + 15,
        points: prev.points + 5
      }));
      
      triggerNotification(
        "¡Excelente práctica! 🎯",
        `Has identificado el significado de "${currentTarget.spanish}". ¡Suma +15 XP!`
      );
    } else {
      setVocabPracticeStreak(0);
      triggerNotification(
        "Respuesta incorrecta 💡",
        `"${currentTarget.spanish}" significa: ${currentTarget.meaning}`
      );
    }
  };

  const handleNextVocabPractice = () => {
    if (vocabPracticeIdx < vocabPracticePool.length - 1) {
      const nextIdx = vocabPracticeIdx + 1;
      setVocabPracticeIdx(nextIdx);
      generatePracticeOptions(vocabPracticePool[nextIdx]);
    } else {
      triggerNotification(
        "¡Práctica Finalizada! 🌟",
        `Has completado la tanda con una racha de ${vocabPracticeStreak} aciertos.`
      );
      setVocabSubView("overview");
    }
  };

  // Lesson state
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Dictionary state
  const [dictionarySearch, setDictionarySearch] = useState<string>("");
  const [dictionaryCategory, setDictionaryCategory] = useState<string>("Todos");
  const [activeSubView, setActiveSubView] = useState<"explorer" | "quiz">("explorer");

  // Quiz state
  const [activeQuizIdx, setActiveQuizIdx] = useState<number>(0);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState<boolean>(false);
  const [quizStreak, setQuizStreak] = useState<number>(0);

  // Generate 4 randomized options for the quiz
  useEffect(() => {
    if (ARABISMS_DATABASE.length === 0) return;
    const targetWord = ARABISMS_DATABASE[activeQuizIdx];
    const otherWords = ARABISMS_DATABASE.filter((_, i) => i !== activeQuizIdx);
    
    const shuffledOthers = [...otherWords].sort(() => Math.random() - 0.5);
    const distractors = shuffledOthers.slice(0, 3).map(w => w.spanish);
    
    const combined = [targetWord.spanish, ...distractors].sort(() => Math.random() - 0.5);
    setQuizOptions(combined);
    setQuizSelected(null);
    setQuizAnswered(false);
    setQuizIsCorrect(false);
  }, [activeQuizIdx]);

  const filteredLessons = categoryFilter === "All"
    ? LESSONS
    : LESSONS.filter(l => l.category === categoryFilter);

  const startLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentStepIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const currentStep: LessonStep | undefined = selectedLesson?.steps[currentStepIdx];

  const handleOptionSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
  };

  const handleVerifyAnswer = () => {
    if (!currentStep?.exercise || !selectedOption) return;
    const correct = selectedOption === currentStep.exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      playXPSound();
    }
  };

  const speakSpanishPhrase = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[\u0600-\u06FF]/g, "").replace(/\(.*?\)/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const utr = utterance as any;
      utr.lang = "es-ES";
      utr.rate = 0.85;
      window.speechSynthesis.speak(utr);
    } else {
      alert("La síntesis de voz no es compatible con este navegador.");
    }
  };

  const handleVerifyQuiz = () => {
    if (quizSelected === null || quizAnswered) return;
    const correctWord = ARABISMS_DATABASE[activeQuizIdx];
    const correct = quizSelected === correctWord.spanish;
    setQuizIsCorrect(correct);
    setQuizAnswered(true);

    if (correct) {
      playXPSound();
      setQuizStreak(prev => prev + 1);
      
      updateProfile(prev => ({
        ...prev,
        xp: prev.xp + 15,
        points: prev.points + 5
      }));
      
      triggerNotification(
        "¡Excelente! 🎉",
        `Adivinaste el arabismo "${correctWord.spanish}". ¡Sumas +15 XP!`
      );
    } else {
      setQuizStreak(0);
      triggerNotification(
        "Sigue intentando 💡",
        `El arabismo correcto era: "${correctWord.spanish}"`
      );
    }
  };

  const handleNextQuiz = () => {
    let nextIdx = activeQuizIdx;
    if (ARABISMS_DATABASE.length > 1) {
      while (nextIdx === activeQuizIdx) {
        nextIdx = Math.floor(Math.random() * ARABISMS_DATABASE.length);
      }
    }
    setActiveQuizIdx(nextIdx);
  };

  const handleNextStep = () => {
    if (!selectedLesson) return;
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);

    if (currentStepIdx < selectedLesson.steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      const lessonAlreadyDone = profile.completedLessons.includes(selectedLesson.id);
      
      updateProfile((prev) => {
        const xpGained = lessonAlreadyDone ? 10 : selectedLesson.xpReward;
        const ptsGained = lessonAlreadyDone ? 5 : 20;
        
        const newCompleted = lessonAlreadyDone
          ? prev.completedLessons
          : [...prev.completedLessons, selectedLesson.id];

        const updatedAchievements = [...prev.achievements];
        const stepCount = newCompleted.length;
        
        if (stepCount >= 1) {
          const ach = updatedAchievements.find(a => a.id === "primeros_pasos");
          if (ach && !ach.unlockedAt) {
            ach.unlockedAt = new Date().toISOString().split("T")[0];
          }
        }
        if (selectedLesson.id === "l3") {
          const ach = updatedAchievements.find(a => a.id === "transicion_cultural");
          if (ach && !ach.unlockedAt) {
            ach.unlockedAt = new Date().toISOString().split("T")[0];
          }
        }

        return {
          ...prev,
          xp: prev.xp + xpGained,
          points: prev.points + ptsGained,
          completedLessons: newCompleted,
          achievements: updatedAchievements
        };
      });

      triggerNotification(
        "¡Lección Completada! 🎉",
        `Has aprendido sobre "${selectedLesson.title}". ¡Suma puntos a tu perfil!`
      );
      setSelectedLesson(null);
    }
  };

  // Helper for filtering matching terms (FIXED: added safe optional chaining)
  const filteredWords = ARABISMS_DATABASE.filter(w => {
    const matchesSearch = 
      (w.spanish?.toLowerCase().includes(dictionarySearch.toLowerCase()) || false) || 
      (w.arabic?.includes(dictionarySearch) || false) ||
      (w.meaning?.toLowerCase().includes(dictionarySearch.toLowerCase()) || false) ||
      (w.etymology?.toLowerCase().includes(dictionarySearch.toLowerCase()) || false);
    
    if (dictionaryCategory === "Todos") return matchesSearch;
    return matchesSearch && w.category === dictionaryCategory;
  });

  // Helpers for filtering vocabulary terms in real-time
  const vocabSearchLower = vocabSearch.trim().toLowerCase();
  
  const matchesVocabSearch = (w: ArabismWord) => {
    if (!vocabSearchLower) return true;
    return (
      (w.spanish?.toLowerCase().includes(vocabSearchLower) || false) ||
      (w.arabic?.toLowerCase().includes(vocabSearchLower) || false) ||
      (w.meaning?.toLowerCase().includes(vocabSearchLower) || false) ||
      (w.etymology?.toLowerCase().includes(vocabSearchLower) || false)
    );
  };

  const filteredSavedWords = ARABISMS_DATABASE.filter(
    word => savedWords.includes(word.spanish) && matchesVocabSearch(word)
  );

  const filteredPendingWords = ARABISMS_DATABASE.filter(
    word => !learnedWords.includes(word.spanish) && matchesVocabSearch(word)
  );

  const filteredLearnedWords = ARABISMS_DATABASE.filter(
    word => learnedWords.includes(word.spanish) && matchesVocabSearch(word)
  );

  return (
    <div id="lessons_module" className="space-y-6">
      
      {/* MODULE SEPARATOR BAR (Rendered only when not actively inside a lesson) */}
      {!selectedLesson && (
        <div className="flex border-b border-[#2A2A2A] pb-1 gap-6 mb-2">
          <button
            id="view_subtab_lessons_btn"
            onClick={() => setModuleView("lessons")}
            className={`pb-3 text-xs uppercase tracking-wider font-extrabold transition-all border-b-2 flex items-center gap-2 ${
              moduleView === "lessons"
                ? "border-amber-500 text-[#FFD700]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curso de Nivel</span>
          </button>

          <button
            id="view_subtab_dictionary_btn"
            onClick={() => setModuleView("dictionary")}
            className={`pb-3 text-xs uppercase tracking-wider font-extrabold transition-all border-b-2 flex items-center gap-2 ${
              moduleView === "dictionary"
                ? "border-amber-500 text-[#FFD700]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>Diccionario de Arabismos</span>
          </button>

          <button
            id="view_subtab_vocabulary_btn"
            onClick={() => {
              setModuleView("vocabulary");
              setVocabSubView("overview");
            }}
            className={`pb-3 text-xs uppercase tracking-wider font-extrabold transition-all border-b-2 flex items-center gap-2 ${
              moduleView === "vocabulary"
                ? "border-amber-500 text-[#FFD700]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Vocabulario de Repaso</span>
          </button>
        </div>
      )}

      {/* RENDER CURRENT CHOSEN VIEW */}
      {selectedLesson ? (
        // ACTIVE LESSON STEP VIEW
        <div className="w-full bg-[#1A1A1A] rounded-2xl border border-[#262626] shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#121212] border-b border-[#262626] px-6 py-4 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-amber-500 uppercase tracking-widest font-bold">
                Curso Español-Árabe • {selectedLesson.level}
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">{selectedLesson.title}</h3>
            </div>
            <button
              id="exit_lesson_btn"
              onClick={() => setSelectedLesson(null)}
              className="text-slate-400 hover:text-white font-bold text-[10px] bg-[#222] border border-[#333] px-3 py-1.5 rounded-lg transition"
            >
              Salir (خروج)
            </button>
          </div>

          {/* Progress gauge */}
          <div className="w-full bg-[#121212] h-1">
            <div
              className="bg-[#FFD700] h-full transition-all duration-300"
              style={{
                width: `${((currentStepIdx + (isAnswered ? 1 : 0.5)) / selectedLesson.steps.length) * 100}%`,
              }}
            />
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 space-y-6">
            {currentStep?.type === "theory" ? (
              // THEORY
              <div className="space-y-5 animate-fade-in">
                <h4 className="text-sm font-bold text-white border-l-3 border-[#FFD700] pl-3">
                  {currentStep.title}
                </h4>

                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-[#0E0E0E] p-4 rounded-xl border border-[#222]">
                  {currentStep.content}
                </div>

                {currentStep.contentAr && (
                  <div className="bg-[#121212] p-4.5 rounded-xl border border-[#222]">
                    <span className="text-[10px] font-bold text-amber-500 block mb-2">
                      💡 Explicación Gramatical (شرح قواعدي):
                    </span>
                    <p className="text-right text-xs text-slate-300 dir-rtl font-serif leading-loose">
                      {currentStep.contentAr}
                    </p>
                  </div>
                )}

                {/* Comparative Card */}
                {currentStep.comparativeCard && (
                  <div className="border border-[#2A2A2A] bg-[#121212] rounded-xl p-5">
                    <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block mb-3">
                      Lupa Interlingüística • مقارنة لغوية
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#1A1A1A] p-3.5 rounded-lg border border-[#2C2C2C] text-center">
                        <span className="text-[8px] text-slate-500 block mb-1">Español</span>
                        <span className="text-base font-extrabold text-white">
                          {currentStep.comparativeCard.spanish}
                        </span>
                      </div>
                      <div className="bg-[#1A1A1A] p-3.5 rounded-lg border border-[#2C2C2C] text-center">
                        <span className="text-[8px] text-slate-500 block mb-1">العربية</span>
                        <span className="text-base font-extrabold text-[#E0E0E0] dir-rtl font-serif">
                          {currentStep.comparativeCard.arabic}
                        </span>
                      </div>
                    </div>

                    {currentStep.comparativeCard.etymology && (
                      <p className="text-[9px] text-[#FFD700] font-bold mt-3.5 bg-amber-500/10 px-3 py-2 rounded border border-amber-500/20">
                        🌱 Origen Árabe: {currentStep.comparativeCard.etymology}
                      </p>
                    )}

                    <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
                      {currentStep.comparativeCard.explanation}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // EXERCISE
              <div className="space-y-5 animate-fade-in">
                <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-[#FFD700] rounded-full text-[9px] font-extrabold uppercase">
                  Prueba Interactiva • تمرين تفاعلي
                </span>

                <div>
                  <h4 className="text-sm font-bold text-white leading-relaxed">
                    {currentStep.exercise?.question}
                  </h4>
                  {currentStep.exercise?.questionAr && (
                    <p className="text-right text-xs text-[#FFD700]/80 dir-rtl mt-1.5 leading-relaxed font-serif">
                      {currentStep.exercise.questionAr}
                    </p>
                  )}
                </div>

                {/* Arabic assist tip block */}
                {currentStep.exercise?.arabicGrammarTip && (
                  <div className="bg-[#121212] p-3.5 rounded-lg border border-[#242424]">
                    <p className="text-right text-[10px] text-slate-300 dir-rtl leading-relaxed font-serif">
                      💡 <strong>تلميح:</strong> {currentStep.exercise.arabicGrammarTip}
                    </p>
                  </div>
                )}

                {/* Options list */}
                <div className="space-y-3 pt-2">
                  {currentStep.exercise?.options.map((opt, oIdx) => {
                    const selected = selectedOption === opt;
                    const correctAndDone = isAnswered && opt === currentStep.exercise?.correctAnswer;
                    const incorrectAndDone = isAnswered && selected && opt !== currentStep.exercise?.correctAnswer;

                    let optBg = "bg-[#121212] text-slate-300 border-[#222] hover:bg-[#1C1C1C]";
                    if (selected && !isAnswered) {
                      optBg = "bg-amber-500/10 border-amber-500 text-white ring-2 ring-amber-500/10";
                    } else if (correctAndDone) {
                      optBg = "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold";
                    } else if (incorrectAndDone) {
                      optBg = "bg-rose-500/10 border-rose-500 text-rose-400";
                    }

                    return (
                      <button
                        key={oIdx}
                        id={`option_btn_${oIdx}`}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(opt)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all text-xs flex items-center justify-between ${optBg}`}
                      >
                        <span className="font-sans">{opt}</span>
                        {correctAndDone && <span className="text-emerald-400 font-extrabold text-[10px]"> أحسنت ✓ Ahsánta</span>}
                        {incorrectAndDone && <span className="text-rose-400 font-extrabold text-[10px]"> انتبه ✗ Intabih</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer of Active steps */}
          <div className="bg-[#121212] border-t border-[#262626] px-6 py-5 flex items-center justify-between gap-4">
            <button
              id="prev_step_btn"
              disabled={currentStepIdx === 0}
              onClick={() => {
                setCurrentStepIdx(prev => prev - 1);
                setSelectedOption(null);
                setIsAnswered(false);
              }}
              className="px-4 py-2 bg-[#222] border border-[#333] text-[10px] text-slate-400 rounded-lg hover:bg-[#2C2C2C] font-semibold disabled:opacity-30 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            {!isAnswered && currentStep?.type === "exercise" ? (
              <button
                id="verify_answer_btn"
                disabled={!selectedOption}
                onClick={handleVerifyAnswer}
                className="px-6 py-2 bg-amber-500 text-black text-[10px] font-bold rounded-lg hover:bg-amber-400 transition disabled:opacity-40"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <button
                id="next_step_btn"
                onClick={handleNextStep}
                className="px-5 py-2 bg-emerald-600 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-500 transition flex items-center gap-1"
              >
                <span>{currentStepIdx === selectedLesson.steps.length - 1 ? "Finalizar" : "Continuar"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* OTHERWISE RENDER STANDARD LIST OVERVIEWS */
        <div>
          {/* Aquí se renderizarían las listas normales según el valor de `moduleView` */}
          <p className="text-xs text-slate-400">Selecciona una pestaña superior para explorar el contenido.</p>
        </div>
      )}
    </div>
  );
}
