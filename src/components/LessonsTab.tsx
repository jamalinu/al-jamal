import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Lesson, LessonStep, UserProfile } from "../types";
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
      // Trigger a beautiful visual award burst of confetti if they did amazing (4 or 5 correct)
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
      // If pool has less than 2 words, backfill with top standard root words
      if (pool.length < 2) {
        const additional = ARABISMS_DATABASE.filter(w => !savedWords.includes(w.spanish)).slice(0, 4 - pool.length);
        pool = [...pool, ...additional];
      }
    } else {
      pool = [...ARABISMS_DATABASE];
    }
    
    // Sort & shuffle pool randomly
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    setVocabPracticePool(shuffledPool);
    setVocabPracticeFilter(filterType);
    setVocabPracticeIdx(0);
    setVocabSubView("practice");
    setVocabPracticeStreak(0);
    
    // Generate options for the first round
    generatePracticeOptions(shuffledPool[0]);
  };

  const generatePracticeOptions = (target: ArabismWord) => {
    if (!target) return;
    // Get 3 random distractors from original ARABISMS_DATABASE
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
      // Reached the end
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
    
    // Shuffle other words & select 3 distractors
    const shuffledOthers = [...otherWords].sort(() => Math.random() - 0.5);
    const distractors = shuffledOthers.slice(0, 3).map(w => w.spanish);
    
    // Combine with correct answer & shuffle
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
      utterance.lang = "es-ES";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
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

  // Helper for filtering matching terms
  const filteredWords = ARABISMS_DATABASE.filter(w => {
    const matchesSearch = w.spanish.toLowerCase().includes(dictionarySearch.toLowerCase()) || 
                          w.arabic.includes(dictionarySearch) ||
                          w.meaning.toLowerCase().includes(dictionarySearch.toLowerCase()) ||
                          w.etymology.toLowerCase().includes(dictionarySearch.toLowerCase());
    
    if (dictionaryCategory === "Todos") return matchesSearch;
    return matchesSearch && w.category === dictionaryCategory;
  });

  // Helpers for filtering vocabulary terms in real-time
  const vocabSearchLower = vocabSearch.trim().toLowerCase();
  
  const matchesVocabSearch = (w: ArabismWord) => {
    if (!vocabSearchLower) return true;
    return (
      w.spanish.toLowerCase().includes(vocabSearchLower) ||
      w.arabic.toLowerCase().includes(vocabSearchLower) ||
      w.meaning.toLowerCase().includes(vocabSearchLower) ||
      w.etymology.toLowerCase().includes(vocabSearchLower)
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
              <ArrowLeft className="w-4 h-4" /> Anterior
            </button>

            {currentStep?.type === "exercise" && !isAnswered ? (
              <button
                id="verify_ans_btn"
                disabled={!selectedOption}
                onClick={handleVerifyAnswer}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold rounded-lg hover:from-amber-600 transition disabled:opacity-45 text-[10px] text-center tracking-wider"
              >
                Verificar (تحقق)
              </button>
            ) : (
              <button
                id="next_step_btn"
                onClick={handleNextStep}
                className="px-6 py-2 bg-white hover:bg-slate-200 text-black font-extrabold rounded-lg transition flex items-center gap-1 text-[10px] tracking-wider"
              >
                <span>
                  {currentStepIdx < selectedLesson.steps.length - 1
                    ? "Continuar (متابعة)"
                    : "Finalizar (إتمام)"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Answer correction banner */}
          {isAnswered && (
            <div
              className={`px-6 py-4 flex items-center gap-3 border-t text-xs ${
                isCorrect
                  ? "bg-emerald-950/20 text-emerald-400 border-emerald-900/40"
                  : "bg-rose-950/20 text-rose-400 border-rose-900/40"
              }`}
            >
              <div>
                <strong className="block text-[10px] font-bold uppercase tracking-wider">
                  {isCorrect ? "¡Excelente! / ممتاز !" : "Corrección Gramatical (تعديل لغوي):"}
                </strong>
                <p className="mt-1 font-sans">
                  {isCorrect
                    ? "Has asimilado perfectamente la excepción gramatical."
                    : `La respuesta correcta es: "${currentStep?.exercise?.correctAnswer}".`}
                </p>
                {!isCorrect && currentStep?.exercise?.arabicGrammarTip && (
                  <p className="text-right dir-rtl mt-2 text-[10px] opacity-90 leading-loose border-t border-rose-900/35 pt-2 font-serif">
                    {currentStep.exercise.arabicGrammarTip}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : moduleView === "lessons" ? (
        // LESSON DIRECTORY
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pt-2">
            <div>
              <h2 className="text-xl font-light text-white flex items-center gap-2 tracking-wide">
                <BookOpen className="w-5 h-5 text-[#FFD700]" />
                <span>Lecciones Interactivas • الدروس التفاعلية</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Conectando el español con el árabe para acelerar tu asimilación de la transición cultural y lingüística.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex gap-1.5 bg-[#1A1A1A] p-1 rounded-lg self-start border border-[#222]">
              {["All", "Grammar", "Culture"].map((cat) => (
                <button
                  key={cat}
                  id={`filter_tab_${cat.toLowerCase()}`}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                    categoryFilter === cat
                      ? "bg-amber-500 text-black shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {cat === "All" && "Todos (الكل)"}
                  {cat === "Grammar" && "Gramática (القواعد)"}
                  {cat === "Culture" && "Cultura (الثقافة)"}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC RETO DEL DÍA - EXPERIENCIA INTERACTIVA PREMIUM */}
          <div className="bg-gradient-to-r from-[#201c12] via-[#161616] to-[#121212] border border-amber-500/25 p-5 rounded-2xl mb-8 space-y-4 shadow-xl relative overflow-hidden animate-fade-in text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/5 to-transparent pointer-events-none rounded-bl-full"></div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/30 text-amber-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-[#FFD700] uppercase tracking-widest">Reto Diario de Al-Jamal • التحدي اليومي</h3>
                  <p className="text-[10px] text-slate-400">Descubre orígenes de la herencia lingüística con recompensas dobles</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md font-bold font-mono border border-amber-500/20">
                <span>+20 XP</span>
                <span className="text-slate-500">•</span>
                <span>+5 Ptos</span>
              </div>
            </div>

            <div className="space-y-2 py-1 border-t border-[#262626] pt-3">
              <p className="text-sm font-semibold text-white leading-relaxed">
                {DAILY_RETO.question}
              </p>
              <p className="text-xs text-yellow-500/80 dir-rtl font-serif pb-1.5">
                {DAILY_RETO.questionAr}
              </p>
            </div>

            {/* Answer option buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-1.5">
              {DAILY_RETO.options.map((option) => {
                const isSelected = selectedRetoAnswer === option;
                const isCorrectAnswer = option === DAILY_RETO.correct;
                let btnStyle = "bg-[#161616] border-[#2B2B2B] text-slate-300 hover:border-amber-500/40 hover:bg-[#1E1E1E]";
                
                if (isSelected) {
                  btnStyle = isCorrectAnswer 
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-extrabold"
                    : "bg-rose-500/15 border-rose-500/40 text-rose-400 font-extrabold";
                }

                return (
                  <button
                    key={option}
                    disabled={dailyRetoComplete && !isSelected}
                    onClick={() => handleAnswerReto(option)}
                    className={`p-3 rounded-xl border text-xs transition duration-200 outline-none flex items-center justify-between text-left ${btnStyle} ${
                      dailyRetoComplete && !isSelected ? "opacity-35 cursor-not-allowed" : "cursor-pointer active:scale-[0.98]"
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <span className="text-xs font-bold">
                        {isCorrectAnswer ? "✓" : "✗"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Reto Feedback/Etymology reveal */}
            {retoFeedback && (
              <div className={`p-3.5 rounded-xl text-xs leading-relaxed border animate-fade-in ${
                selectedRetoAnswer === DAILY_RETO.correct
                  ? "bg-emerald-950/20 border-emerald-900/30 text-slate-200 font-sans"
                  : "bg-rose-950/20 border-rose-900/30 text-rose-300 font-sans"
              }`}>
                {retoFeedback}
                {dailyRetoComplete && (
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => {
                        setSelectedRetoAnswer(null);
                        setRetoFeedback(null);
                        setDailyRetoComplete(false);
                        localStorage.removeItem("aljamal_daily_reto_complete");
                      }}
                      className="px-2.5 py-1 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-slate-400 hover:text-white rounded border border-[#2D2D2D] font-mono text-[9px] uppercase tracking-wider"
                    >
                      Intentar de Nuevo 🔄
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredLessons.map((lesson) => {
              const completed = profile.completedLessons.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  id={`lesson_card_${lesson.id}`}
                  className="bg-[#1A1A1A] rounded-xl border border-[#262626] p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-amber-500/10 text-[#FFD700] rounded">
                        {lesson.category === "Grammar" ? "Gramática" : "Cultura"} • {lesson.level}
                      </span>
                      {completed && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                          <CheckCircle className="w-4 h-4" /> Completada
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {lesson.title}
                      </h3>
                      <p className="text-right text-[10px] text-amber-500/80 dir-rtl mt-1 leading-normal font-serif">
                        {lesson.titleAr}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {lesson.description}
                    </p>
                    <p className="text-right text-[10px] text-slate-500 dir-rtl">
                      {lesson.descriptionAr}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#262626] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#FFD700]/90">
                      +{lesson.xpReward} XP Recompensa
                    </span>
                    <button
                      id={`start_lesson_btn_${lesson.id}`}
                      onClick={() => startLesson(lesson)}
                      className="px-4 py-2 text-[10px] font-bold bg-[#222] hover:bg-[#333] hover:text-white text-slate-300 border border-[#333] rounded-lg transition"
                    >
                      {completed ? "Repasar" : "Aprender"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : moduleView === "dictionary" ? (
        // BILINGUAL ETYMOLOGICAL DICTIONARY EXPLORER
        <div className="space-y-6 pt-2 animate-fade-in">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-light text-white flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-amber-500 animate-pulse" />
                <span>Legado de Al-Ándalus (Más de 4,000 Palabras) • عِلم الجذور</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Explora vocablos españoles con raíces árabes históricas y haz el desafío gamificado para poner a prueba tu retención.
              </p>
            </div>

            {/* Sub views: Explorer vs Quiz */}
            <div className="flex bg-[#1A1A1A] p-1 border border-[#222] rounded-lg self-start">
              <button
                id="dict_explorer_tab_btn"
                onClick={() => setActiveSubView("explorer")}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  activeSubView === "explorer"
                    ? "bg-amber-500 text-black font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Glosario (المصطلحات)
              </button>
              <button
                id="dict_quiz_tab_btn"
                onClick={() => setActiveSubView("quiz")}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeSubView === "quiz"
                    ? "bg-amber-500 text-black font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Juego de Desafío (التحدي)</span>
              </button>
            </div>
          </div>

          {activeSubView === "explorer" ? (
            /* GLOSSARY DICTIONARY EXPLORER VIEW */
            <div className="space-y-4">
              
              {/* Search bar and Category Filter */}
              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#222] space-y-3.5">
                <div className="relative">
                  <input
                    type="text"
                    id="dictionary_search_input"
                    placeholder="Buscar por palabra española o árabe (ej: Almohada, الزيت)..."
                    value={dictionarySearch}
                    onChange={(e) => setDictionarySearch(e.target.value)}
                    className="w-full bg-[#121212] border border-[#2B2B2B] pl-10 pr-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-sans"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Todos", "Hogar", "Alimentos", "Arquitectura", "Comercio", "Sociedad"].map((cat) => (
                    <button
                      key={cat}
                      id={`dict_category_tab_${cat.toLowerCase()}`}
                      onClick={() => setDictionaryCategory(cat)}
                      className={`px-2.5 py-1 text-[9px] font-bold rounded-md border transition-all cursor-pointer ${
                        dictionaryCategory === cat
                          ? "bg-amber-500/10 text-[#FFD700] border-amber-500/40"
                          : "bg-[#121212] text-slate-400 border-[#222] hover:bg-[#1C1C1C]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Dictionary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWords.length === 0 ? (
                  <div className="col-span-2 text-center py-10 bg-[#1A1A1A] rounded-xl border border-[#222] text-slate-400 text-xs">
                    <p className="font-semibold text-slate-300">Ningún arabismo coincide con tu búsqueda.</p>
                    <p className="text-[10px] text-slate-500 mt-1">Busca con términos alternativos o cambia la categoría de filtro.</p>
                  </div>
                ) : (
                  filteredWords.map((word, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl border p-5 flex flex-col justify-between transition-all duration-500 ${
                        learnedWords.includes(word.spanish)
                          ? "bg-[#10B981]/5 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:border-emerald-500/50"
                          : "bg-[#1A1A1A] border-[#242424] hover:border-amber-500/30"
                      }`}
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-bold uppercase py-0.5 px-2 bg-amber-500/10 text-[#FFD700] border border-amber-500/20 rounded font-sans">
                            {word.category}
                          </span>
                          <button
                            onClick={() => speakSpanishPhrase(word.spanish)}
                            className="p-1.5 bg-[#121212] hover:bg-[#222] text-amber-500 border border-[#2C2C2C] rounded-lg transition cursor-pointer"
                            title="Escuchar Pronunciación"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <div className="flex items-baseline justify-between">
                            <h3 className="text-base font-black text-white tracking-wide font-sans">
                              {word.spanish}
                            </h3>
                            <span className="text-base font-extrabold text-[#FFD700] dir-rtl font-serif">
                              {word.arabic}
                            </span>
                          </div>
                          <p className="text-[10px] text-amber-500/90 font-bold bg-[#121212] px-2.5 py-1.5 rounded border border-[#222] mt-2 font-mono text-left">
                            🌱 {word.etymology}
                          </p>
                        </div>

                        <div className="space-y-1.5 pt-1 text-xs">
                          <p className="text-slate-300 leading-relaxed font-sans text-left">{word.meaning}</p>
                          
                          {/* Examples panel */}
                          <div className="bg-[#121212]/80 p-3 rounded-lg border border-[#222] mt-3 space-y-2 text-left">
                            <div>
                              <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">Ejemplo en Español</span>
                              <p className="text-[11px] text-slate-300 italic">"{word.example}"</p>
                            </div>
                            <div className="text-right border-t border-[#1C1C1C] pt-1.5">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">المثال بالعربية</span>
                              <p className="text-[11px] text-slate-400 font-serif dir-rtl mt-0.5">"{word.exampleAr}"</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Interactive Save and Learned Actions */}
                      <div className="mt-4 pt-3.5 border-t border-[#1F1F1F] flex items-center justify-between gap-3">
                        <button
                          onClick={() => toggleSaved(word.spanish)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border text-[10px] uppercase font-extrabold transition-all cursor-pointer ${
                            savedWords.includes(word.spanish)
                              ? "bg-amber-500/10 text-[#FFD700] border-amber-500/30"
                              : "bg-[#121212] text-slate-400 border-[#222] hover:border-amber-500/30 hover:text-white"
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${savedWords.includes(word.spanish) ? "fill-amber-500 text-amber-500" : ""}`} />
                          <span>{savedWords.includes(word.spanish) ? "Guardada" : "Guardar"}</span>
                        </button>

                        <button
                          onClick={() => toggleLearned(word.spanish)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border text-[10px] uppercase font-extrabold transition-all cursor-pointer ${
                            learnedWords.includes(word.spanish)
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-[#121212] text-slate-400 border-[#222] hover:border-emerald-500/30 hover:text-white"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{learnedWords.includes(word.spanish) ? "Aprendida ✓" : "Pendiente"}</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* INTERACTIVE FLASHCARD QUIZ MINIGAME */
            <div className="bg-[#1A1A1A] rounded-2xl border border-[#282828] p-6 space-y-6 animate-fade-in relative overflow-hidden text-left">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>

              <div className="flex items-center justify-between pb-3 border-b border-[#2C2C2C]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 rounded-lg text-[#FFD700]">
                    <Layers className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Desafío de Orígenes Árabes</h3>
                    <p className="text-[10px] text-slate-400">Adivina la herencia lingüística en el español</p>
                  </div>
                </div>

                {/* Streak and XP values panel */}
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-[#121212] px-2.5 py-1 rounded-lg border border-[#2C2C2C]">
                    <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                    <span>{quizStreak} SEGÚN</span>
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-[#FFD700] font-bold px-2 py-1 rounded">
                    +15 XP / acierto
                  </span>
                </div>
              </div>

              {/* Main question box */}
              <div className="bg-[#111] p-5 rounded-xl border border-[#222] space-y-3">
                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono font-bold block">Definición lingüística:</span>
                
                <div className="space-y-1.5">
                  <h4 className="text-base font-extrabold text-[#E0E0E0] leading-relaxed">
                    "¿Cuál palabra española de origen árabe corresponde a: '{ARABISMS_DATABASE[activeQuizIdx].meaning}'?"
                  </h4>
                  <div className="text-right pt-2 border-t border-[#1C1C1C]">
                    <span className="text-[8px] text-slate-500 uppercase font-mono font-bold block mb-1">المعنى المقابل:</span>
                    <span className="text-lg font-serif font-extrabold text-amber-500 dir-rtl">
                      {ARABISMS_DATABASE[activeQuizIdx].arabic}
                    </span>
                  </div>
                </div>
              </div>

              {/* Options buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {quizOptions.map((opt, oIdx) => {
                  const selected = quizSelected === opt;
                  const correctAndDone = quizAnswered && opt === ARABISMS_DATABASE[activeQuizIdx].spanish;
                  const incorrectAndDone = quizAnswered && selected && opt !== ARABISMS_DATABASE[activeQuizIdx].spanish;

                  let optBg = "bg-[#121212] text-slate-300 border-[#222] hover:bg-[#1C1C1C]";
                  if (selected && !quizAnswered) {
                    optBg = "bg-amber-500/10 border-amber-500 text-white ring-2 ring-amber-500/10";
                  } else if (correctAndDone) {
                    optBg = "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold";
                  } else if (incorrectAndDone) {
                    optBg = "bg-rose-500/10 border-rose-500 text-rose-400";
                  }

                  return (
                    <button
                      key={oIdx}
                      id={`quiz_opt_btn_${oIdx}`}
                      disabled={quizAnswered}
                      onClick={() => setQuizSelected(opt)}
                      className={`text-left p-4 rounded-xl border-2 transition-all text-xs flex items-center justify-between cursor-pointer ${optBg}`}
                    >
                      <span className="font-sans">{opt}</span>
                      {correctAndDone && <span className="text-[9px] text-emerald-400 font-mono font-extrabold">✓ ¡COMPENSADO!</span>}
                      {incorrectAndDone && <span className="text-[9px] text-rose-400 font-mono font-bold">✗ INCORRECTO</span>}
                    </button>
                  );
                })}
              </div>

              {/* Quiz submission and actions */}
              <div className="flex justify-between items-center pt-4 border-t border-[#262626]">
                <span className="text-[10px] text-slate-500">Haz clic en verificar para ver tu resultado.</span>

                {!quizAnswered ? (
                  <button
                    id="submit_quiz_answer_btn"
                    disabled={quizSelected === null}
                    onClick={handleVerifyQuiz}
                    className="px-6 py-2.5 bg-amber-500 text-black hover:bg-amber-600 border border-amber-400 transition font-extrabold text-xs rounded-xl disabled:opacity-45 uppercase tracking-wider cursor-pointer"
                  >
                    Verificar respuesta
                  </button>
                ) : (
                  <button
                    id="next_quiz_card_btn"
                    onClick={handleNextQuiz}
                    className="px-6 py-2.5 bg-white text-black hover:bg-slate-200 transition font-extrabold text-xs rounded-xl uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <span>Siguiente palabra</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Explanation note when answered */}
              {quizAnswered && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                  quizIsCorrect
                    ? "bg-emerald-950/20 text-emerald-400 border-emerald-900/40"
                    : "bg-rose-950/20 text-rose-400 border-rose-900/40"
                }`}>
                  <div>
                    <h5 className="font-bold text-[10px] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{quizIsCorrect ? "Respuesta Correcta" : "Intento Fallido"}</span>
                    </h5>
                    <p className="font-sans">
                      {quizIsCorrect
                        ? `¡Excelente! El origen de la palabra es precisamente: ${ARABISMS_DATABASE[activeQuizIdx].etymology}.`
                        : `La respuesta correcta era "${ARABISMS_DATABASE[activeQuizIdx].spanish}". ${ARABISMS_DATABASE[activeQuizIdx].etymology}.`}
                    </p>
                    <p className="text-[10px] opacity-80 mt-1.5">
                      Definición: {ARABISMS_DATABASE[activeQuizIdx].meaning}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // VOCABULARY VIEW
        <div className="space-y-6 pt-2 animate-fade-in text-left">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-light text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500 animate-pulse" />
                <span>Mazo de Vocabulario y Repaso • الحفظ والمراجعة</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Guarda palabras con raíces árabes históricas de Al-Ándalus, crea tu mazo de estudio personalizado y practícalas a tu ritmo.
              </p>
            </div>

            {vocabSubView === "practice" && (
              <button
                onClick={() => setVocabSubView("overview")}
                className="px-4 py-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white text-xs font-semibold rounded-lg transition text-center cursor-pointer"
              >
                ← Volver al Mazo
              </button>
            )}
          </div>

          {vocabSubView === "overview" ? (
            /* VOCAB OVERVIEW DECK AND MANAGEMENT */
            <div className="space-y-6">
              
              {/* Search input filtering both review deck and pending words */}
              <div className="relative">
                <input
                  id="vocab_realtime_search_input"
                  type="text"
                  placeholder="Buscar por palabra en español, árabe, significado o raíz (ej: Almohada, Aceite, az-zayt)..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2B2B2B] pl-10 pr-10 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-sans transition-all placeholder:text-slate-500 shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                {vocabSearch && (
                  <button
                    onClick={() => setVocabSearch("")}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition cursor-pointer"
                    title="Limpiar búsqueda"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Stat Cards - Bento Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Progression Tracker ring/bar */}
                <div className="bg-[#1A1A1A] rounded-xl border border-[#242424] p-5 flex flex-col justify-between space-y-3 shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-mono">Progreso de Dominio</span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-bold px-2 py-0.5 rounded font-mono">
                      {Math.round((learnedWords.length / ARABISMS_DATABASE.length) * 100)}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-white font-mono flex items-baseline gap-1.5">
                      <span>{learnedWords.length}</span>
                      <span className="text-xs text-slate-500 font-sans font-normal">de {ARABISMS_DATABASE.length} palabras</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">Palabras del legado de Al-Ándalus que has memorizado y dominas.</p>
                  </div>
                  {/* Visual gauge */}
                  <div className="w-full bg-[#121212] h-2 rounded-full overflow-hidden border border-[#262626]">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(learnedWords.length / ARABISMS_DATABASE.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Personal Review Deck size card */}
                <div className="bg-[#1A1A1A] rounded-xl border border-[#242424] p-5 flex flex-col justify-between space-y-3 shadow-md">
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-mono block mb-1">Mazo Personalizado</span>
                    <h3 className="text-2xl font-black text-amber-400 font-mono flex items-baseline gap-1.5">
                      <span>{savedWords.length}</span>
                      <span className="text-xs text-slate-500 font-sans font-normal">guardadas</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 leading-normal mt-1 font-sans">Vocablos seleccionados para repasar con sus raíces lingüísticas.</p>
                  </div>

                  <button
                    onClick={() => startVocabPractice("saved")}
                    disabled={savedWords.length === 0}
                    className="w-full py-2 bg-[#2A2A2A] hover:bg-amber-500 hover:text-black text-white disabled:opacity-45 disabled:hover:bg-[#2A2A2A] disabled:hover:text-white rounded-lg text-xs font-bold font-sans transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Practicar mi Mazo</span>
                  </button>
                </div>

                {/* General vocabulary quick practice launch card */}
                <div className="bg-[#1A1A1A] rounded-xl border border-[#242424] p-5 flex flex-col justify-between space-y-3 shadow-md">
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-mono block mb-1">Entrenamiento General</span>
                    <h3 className="text-2xl font-black text-white font-mono">
                      <span>{ARABISMS_DATABASE.length}</span>
                      <span className="text-xs text-slate-500 font-sans font-normal ml-1.5">raíces disponibles</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 leading-normal mt-1 font-sans">Practica de forma interactiva con todo el corpus lingüístico andalusí.</p>
                  </div>

                  <button
                    onClick={() => startVocabPractice("all")}
                    className="w-full py-2 bg-[#2D2D2D] hover:bg-amber-500 hover:text-black text-white rounded-lg text-xs font-bold font-sans transition cursor-pointer flex items-center justify-center gap-1.5 border border-[#3E3E3E]"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Estudiar Raíces (+15 XP)</span>
                  </button>
                </div>

              </div>

              {/* REVIEW DECK MANAGER LIST */}
              <div className="bg-[#121212] rounded-2xl border border-[#222] p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex border-b border-[#222] pb-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[#FFD700]">
                      <Bookmark className="w-4 h-4 fill-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Mi Lista de Repaso de Raíces</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Estudia y evalúa de forma específica las palabras que has guardado.</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400 bg-[#1A1A1A] border border-[#262626] px-3 py-1.5 rounded-lg">
                    {vocabSearch ? `${filteredSavedWords.length} de ${savedWords.length} filtradas` : `${savedWords.length} Palabras en mazo`}
                  </span>
                </div>

                {savedWords.length === 0 ? (
                  // BEAUTIFUL BLANK STATE WITH QUICK SUGGESTIONS DECK SEEDER
                  <div className="text-center py-10 bg-[#1A1A1A] rounded-xl border border-[#242424] p-6 max-w-xl mx-auto space-y-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto text-amber-500 border border-amber-500/20">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Tu mazo de repaso está vacío</h4>
                      <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                        ¡Añade arabismos al mazo de repaso haciendo clic en <strong>"Guardar"</strong> dentro del Diccionario, o añade estas sugerencias de herencia andalusí de alta frecuencia:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-left">
                      {[
                        { esp: "Almohada", ar: "المخدة", ety: "al-mukhaddah" },
                        { esp: "Aceite", ar: "الزيت", ety: "az-zayt" },
                        { esp: "Azúcar", ar: "السكر", ety: "as-sukkar" },
                        { esp: "Alberca", ar: "البركة", ety: "al-birkah" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#121212] border border-[#242424] p-3 rounded-lg flex items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-white font-sans">{item.esp}</span>
                              <span className="text-[11px] text-amber-500 font-serif leading-none">{item.ar}</span>
                            </div>
                            <span className="text-[9px] text-slate-500 font-mono block">raíz: {item.ety}</span>
                          </div>
                          <button
                            onClick={() => toggleSaved(item.esp)}
                            className="bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/30 text-amber-400 hover:border-amber-500 font-bold px-2 py-1 rounded text-[10px] uppercase cursor-pointer transition-all flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Guardar</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : filteredSavedWords.length === 0 ? (
                  <div className="text-center py-10 bg-[#1A1A1A] rounded-xl border border-[#242424] p-6 text-slate-400 text-xs">
                    <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="font-sans">No se encontraron palabras guardadas que coincidan con la búsqueda "{vocabSearch}".</p>
                  </div>
                ) : (
                  // SAVED WORDS GRID
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSavedWords.map((word, idx) => (
                      <div
                        key={idx}
                        className={`rounded-xl border p-5 flex flex-col justify-between transition-all duration-500 ${
                          learnedWords.includes(word.spanish)
                            ? "bg-[#10B981]/5 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:border-emerald-500/40"
                            : "bg-[#1A1A1A] border-[#242424] hover:border-amber-500/20"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-[#222] pb-2">
                            <span className="text-[8px] font-bold uppercase py-0.5 px-2 bg-amber-500/10 text-[#FFD700] border border-amber-500/20 rounded font-sans">
                              {word.category}
                            </span>
                            
                            <div className="flex items-center gap-2">
                              {/* Audio Speak */}
                              <button
                                onClick={() => speakSpanishPhrase(word.spanish)}
                                className="p-1 px-2 bg-[#121212] hover:bg-[#222] text-amber-500 border border-[#2C2C2C] rounded text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                                title="Escuchar Pronunciación"
                              >
                                <Volume2 className="w-3.5 h-3.5" /> Pronunciar
                              </button>

                              {/* Toggle Learned state badge */}
                              <button
                                onClick={() => toggleLearned(word.spanish)}
                                className={`p-1 px-2 rounded border transition text-[10px] font-bold cursor-pointer ${
                                  learnedWords.includes(word.spanish)
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                    : "bg-[#121212] text-slate-400 border-[#262626] hover:text-white"
                                }`}
                              >
                                {learnedWords.includes(word.spanish) ? "✓ Aprendida" : "Marcar Aprendida"}
                              </button>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-baseline justify-between">
                              <h3 className="text-base font-black text-white tracking-wide font-sans">
                                {word.spanish}
                              </h3>
                              <span className="text-base font-extrabold text-[#FFD700] dir-rtl font-serif">
                                {word.arabic}
                              </span>
                            </div>
                            <p className="text-[10px] text-amber-500/90 font-bold bg-[#121212] px-2.5 py-1.5 rounded border border-[#222] mt-2 font-mono text-left">
                              🌱 Origen Andalusí: {word.etymology}
                            </p>
                          </div>

                          <div className="space-y-1.5 pt-1 text-xs">
                            <p className="text-slate-300 leading-relaxed font-sans text-left">{word.meaning}</p>
                            
                            <div className="bg-[#121212]/85 p-3 rounded-lg border border-[#222] text-[11px] leading-relaxed italic space-y-1 text-left">
                              <p className="text-slate-400">"{word.example}"</p>
                              <p className="text-right text-slate-500 font-serif dir-rtl mt-1 select-all">"{word.exampleAr}"</p>
                            </div>
                          </div>
                        </div>

                        {/* Card controller toolbar footer */}
                        <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-end">
                          <button
                            onClick={() => toggleSaved(word.spanish)}
                            className="bg-transparent hover:bg-red-500/10 text-slate-500 hover:text-red-400 py-1.5 px-2.5 rounded-lg border border-transparent hover:border-red-500/20 text-[10px] font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Quitar de mazo</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PENDING TO LEARN WORDS SECTION */}
              <div className="bg-[#121212] rounded-2xl border border-[#222] p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex border-b border-[#222] pb-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Voces Pendientes de Aprender</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Explora arabismos que aún no dominas y márcalos rápidamente para sumar XP.</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#FFD700] bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                    {vocabSearch ? `${filteredPendingWords.length} de ${ARABISMS_DATABASE.length - learnedWords.length} filtradas` : `${ARABISMS_DATABASE.length - learnedWords.length} Pendientes`}
                  </span>
                </div>

                {ARABISMS_DATABASE.length === learnedWords.length ? (
                  <div className="text-center py-8 bg-[#1A1A1A] rounded-xl border border-[#242424] p-6 max-w-xl mx-auto space-y-3">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/20">
                      <Award className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">¡Enhorabuena! Has dominado todo el glosario</h4>
                      <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Has memorizado y aprendido con éxito todas las palabras raíces andalusíes disponibles. ¡Eres un maestro de la etimología de Al-Ándalus!
                      </p>
                    </div>
                  </div>
                ) : filteredPendingWords.length === 0 ? (
                  <div className="text-center py-10 bg-[#1A1A1A] rounded-xl border border-dashed border-[#242424] p-6 text-slate-400 text-xs">
                    <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="font-sans">No se encontraron palabras pendientes que coincidan con la búsqueda "{vocabSearch}".</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredPendingWords.map((word, idx) => (
                      <div 
                        key={idx}
                        className="bg-[#1A1A1A] rounded-xl border border-[#242424] p-4 flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300 relative group overflow-hidden"
                      >
                        {/* Background subtle indicator */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/30 group-hover:bg-amber-500 transition-colors"></div>
                        
                        <div className="space-y-2.5 pl-2">
                          <div className="flex justify-between items-start">
                            <span className="text-[7.5px] font-bold uppercase py-0.5 px-1.5 bg-[#121212] text-slate-400 border border-[#222] rounded font-sans">
                              {word.category}
                            </span>
                            <span className="text-[11px] font-extrabold text-amber-500/80 font-serif leading-none">
                              {word.arabic}
                            </span>
                          </div>

                          <div>
                            <h5 className="text-sm font-extrabold text-white font-sans">{word.spanish}</h5>
                            <p className="text-[9px] text-[#FFD700] font-mono mt-0.5">raíz: {word.etymology}</p>
                            <p className="text-[11px] text-slate-400 leading-normal mt-1 line-clamp-2" title={word.meaning}>
                              {word.meaning}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-[#222] flex items-center justify-between gap-2 pl-2">
                          <button
                            onClick={() => speakSpanishPhrase(word.spanish)}
                            className="p-1 px-1.5 bg-[#121212] hover:bg-[#222] text-slate-400 hover:text-white border border-[#222] rounded text-[9px] font-semibold flex items-center gap-1 cursor-pointer transition"
                            title="Pronunciación"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Escuchar
                          </button>

                          <button
                            onClick={() => toggleLearned(word.spanish)}
                            className="py-1 px-2 bg-[#222] hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 border border-[#333] hover:border-emerald-500/40 rounded text-[9px] font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            <span>Aprender (+10 XP)</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* VOCES APRENDIDAS (DOMINADAS) SECTION */}
              <div className="bg-[#121212] rounded-2xl border border-[#222] p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex border-b border-[#222] pb-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Voces ya Aprendidas</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Estudia los términos que ya dominas de tu recorrido andalusí.</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                    {vocabSearch ? `${filteredLearnedWords.length} de ${learnedWords.length} filtradas` : `${learnedWords.length} Aprendidas`}
                  </span>
                </div>

                {learnedWords.length === 0 ? (
                  <div className="text-center py-8 bg-[#1A1A1A] rounded-xl border border-[#242424] p-6 max-w-xl mx-auto space-y-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto text-amber-500 border border-amber-500/20">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-300">Aún no has aprendido vocablos</h4>
                      <p className="text-[10px] text-slate-500 leading-normal max-w-sm mx-auto">
                        Comienza a marcar términos como "Aprendida" en tu mazo de repaso o en el diccionario para verlos aquí.
                      </p>
                    </div>
                  </div>
                ) : filteredLearnedWords.length === 0 ? (
                  <div className="text-center py-8 bg-[#1A1A1A] rounded-xl border border-dashed border-[#242424] p-6 text-slate-400 text-xs text-center justify-center">
                    <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="font-sans">No se encontraron palabras aprendidas que coincidan con "{vocabSearch}".</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredLearnedWords.map((word, idx) => (
                      <div 
                        key={idx}
                        className="bg-[#1A1A1A] rounded-xl border border-[#242424] p-4 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300 relative group overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/30 group-hover:bg-emerald-500 transition-colors"></div>
                        
                        <div className="space-y-2 pl-2">
                          <div className="flex justify-between items-start">
                            <span className="text-[7.5px] font-bold uppercase py-0.5 px-1.5 bg-[#121212] text-slate-400 border border-[#222] rounded font-sans">
                              {word.category}
                            </span>
                            <span className="text-[11px] font-extrabold text-emerald-400/80 font-serif leading-none">
                              {word.arabic}
                            </span>
                          </div>

                          <div>
                            <h5 className="text-sm font-extrabold text-white font-sans">{word.spanish}</h5>
                            <p className="text-[9px] text-[#FFD700] font-mono mt-0.5">origen: {word.etymology}</p>
                            <p className="text-[11px] text-slate-400 leading-normal mt-1 line-clamp-2" title={word.meaning}>
                              {word.meaning}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-[#222] flex items-center justify-between gap-2 pl-2">
                          <button
                            onClick={() => speakSpanishPhrase(word.spanish)}
                            className="p-1 px-1.5 bg-[#121212] hover:bg-[#222] text-slate-400 hover:text-white border border-[#222] rounded text-[9px] font-semibold flex items-center gap-1 cursor-pointer transition"
                            title="Pronunciación"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Escuchar
                          </button>

                          <button
                            onClick={() => toggleLearned(word.spanish)}
                            className="py-1 px-2 bg-[#222] hover:bg-amber-500/10 text-amber-500 hover:text-amber-400 border border-[#333] hover:border-amber-500/40 rounded text-[9px] font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                            <span>Deshacer</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* DESAFÍO RÁPIDO INTERACTIVE CALL TO ACTION BOARD */}
                <div id="quick_challenge_seeder_box" className="pt-4 border-t border-[#222] mt-4">
                  <div className="bg-[#1A1A1A] hover:bg-[#1f1f1f] rounded-xl border border-amber-500/10 p-5 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
                    <div className="flex items-center gap-3.5 text-left w-full md:w-auto">
                      <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20 flex-shrink-0 animate-pulse">
                        <Flame className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white tracking-wide font-sans flex items-center gap-2">
                          <span>Desafío Rápido de Etnología</span>
                          <span className="text-[9px] bg-amber-500/20 text-[#FFD700] px-1.5 py-0.5 rounded uppercase tracking-widest font-mono font-bold">5 de 5 Quiz</span>
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed max-w-md font-sans">
                          Inicia una prueba rápida de 5 preguntas sobre arabismos andalusíes de tu lista personalizada. ¡Consigue racha impecable para duplicar tus recompensas!
                        </p>
                      </div>
                    </div>

                    <button
                      id="start_quick_challenge_btn"
                      onClick={startQuickChallenge}
                      className="w-full md:w-auto px-6 py-3 bg-amber-500 text-black hover:bg-amber-600 font-extrabold uppercase text-xs rounded-xl tracking-wider shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 font-sans"
                    >
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>Iniciar Desafío Rápido</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : vocabSubView === "challenge" ? (
            /* INTERACTIVE QUIZ DESAFÍO RÁPIDO VIEW */
            <div className="bg-[#1A1A1A] rounded-2xl border border-[#282828] p-6 space-y-6 animate-fade-in relative overflow-hidden text-left">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>

              {challengePool.length === 0 || !challengePool[challengeIdx] ? (
                <div className="text-center py-6 text-slate-400">
                  <p>Cargando Desafío Rápido...</p>
                </div>
              ) : (
                <>
                  {/* Challenge Header / Navigation */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2C2C2C]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                        <Flame className="w-5 h-5 text-amber-500 animate-bounce" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                          Desafío de Vocabulario Andalusí
                        </h3>
                        <p className="text-[10px] text-amber-500/80 font-mono">
                          ¡Consigue un 5 de 5 para demostrar tu maestría!
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setVocabSubView("overview")}
                      className="px-3 py-1.5 bg-black/40 hover:bg-black/60 border border-[#333] hover:border-slate-500/30 text-slate-400 hover:text-white rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1 cursor-pointer font-sans"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Volver al Resumen
                    </button>
                  </div>

                  {/* Streak & Question Progress Bars */}
                  <div className="bg-[#121212] p-4 rounded-xl border border-[#222] space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <span>Pregunta</span>
                        <span className="text-[#FFD700]">{challengeIdx + 1} de 5</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <span>Suma de Racha:</span>
                        <span className="text-white text-sm flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {challengeStreak} <Flame className="w-4 h-4 fill-amber-500 inline text-amber-500" />
                        </span>
                      </div>
                    </div>

                    {/* Continuous progress bar slider */}
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-all duration-300"
                        style={{ width: `${((challengeIdx + 1) / 5) * 100}%` }}
                      ></div>
                    </div>

                    {/* Segmented Streak/Answer History Tracker Nodes */}
                    <div className="grid grid-cols-5 gap-2 pt-1 font-sans">
                      {[0, 1, 2, 3, 4].map((step) => {
                        const answer = challengeHistory[step];
                        const isActive = step === challengeIdx;

                        let nodeBg = "bg-neutral-900 border-neutral-800 text-neutral-600";
                        let nodeText = `${step + 1}`;
                        let nodeIcon = null;

                        if (answer === true) {
                          nodeBg = "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-black";
                          nodeIcon = <Check className="w-3.5 h-3.5 mx-auto text-emerald-400" />;
                        } else if (answer === false) {
                          nodeBg = "bg-rose-500/20 border-rose-500 text-rose-400 font-black";
                          nodeIcon = <X className="w-3.5 h-3.5 mx-auto text-rose-400" />;
                        } else if (isActive) {
                          nodeBg = "bg-amber-500/10 border-amber-500 text-amber-400 font-extrabold shadow-[0_0_10px_rgba(245,158,11,0.2)] animate-pulse";
                        }

                        return (
                          <div
                            key={step}
                            className={`py-2 rounded-lg border text-center text-xs flex flex-col justify-center items-center h-10 transition-all duration-300 ${nodeBg}`}
                            title={answer === true ? "Acierto" : answer === false ? "Fallo" : isActive ? "Pregunta actual" : "Pendiente"}
                          >
                            {nodeIcon ? nodeIcon : <span className="font-mono text-[11px]">{nodeText}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ACTIVE QUESTION VOCABLE DISPLAY CARD */}
                  <div className="bg-[#121212] p-6 rounded-xl border border-[#222]/80 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-slate-500/50 uppercase select-none font-bold">
                      {challengePool[challengeIdx].category}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] text-amber-500 font-bold uppercase tracking-widest font-mono">IDENTIFICA EL VOCABLO</span>
                        <h2 className="text-3xl font-black text-white tracking-wide font-sans mt-2">
                          {challengePool[challengeIdx].spanish}
                        </h2>
                        <span className="text-2xl font-bold text-amber-500/90 tracking-wide font-serif block mt-1 dir-rtl">
                          {challengePool[challengeIdx].arabic}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2.5 justify-center items-center pt-2">
                        <button
                          onClick={() => speakSpanishPhrase(challengePool[challengeIdx].spanish)}
                          className="bg-zinc-900 hover:bg-zinc-800 text-slate-300 py-1.5 px-3 border border-zinc-800 hover:border-zinc-700 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer font-sans"
                        >
                          <Volume2 className="w-3.5 h-3.5 animate-pulse" /> Escuchar Pronunciación
                        </button>
                        
                        <div className="bg-[#1A1A1A] px-3 py-1.5 rounded-lg border border-[#2C2C2C] text-[10px] font-mono font-bold text-[#FFD700]">
                          Raíz: {challengePool[challengeIdx].etymology}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ANSWERS MULTIPLE CHOICE GRID */}
                  <div className="space-y-3 text-left">
                    <span className="text-[9px] text-slate-400 uppercase font-mono font-bold block">Selecciona la definición correcta:</span>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {challengeOptions.map((meaningOpt, oIdx) => {
                        const isSelectedOpt = challengeSelected === meaningOpt;
                        const correctAndDone = challengeAnswered && meaningOpt === challengePool[challengeIdx].meaning;
                        const incorrectAndDone = challengeAnswered && isSelectedOpt && meaningOpt !== challengePool[challengeIdx].meaning;

                        let optBg = "bg-[#121212] text-slate-300 border-[#222] hover:bg-[#1C1C1C]";
                        if (isSelectedOpt && !challengeAnswered) {
                          optBg = "bg-amber-500/10 border-amber-500 text-white ring-2 ring-amber-500/10";
                        } else if (correctAndDone) {
                          optBg = "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold";
                        } else if (incorrectAndDone) {
                          optBg = "bg-rose-500/10 border-rose-500 text-rose-400";
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={challengeAnswered}
                            onClick={() => setChallengeSelected(meaningOpt)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all text-xs flex items-center justify-between cursor-pointer font-sans leading-relaxed ${optBg}`}
                          >
                            <span>{meaningOpt}</span>
                            {correctAndDone && <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider flex items-center gap-1">¡Correcto! <Check className="w-3 h-3" /></span>}
                            {incorrectAndDone && <span className="text-[9px] text-rose-400 font-mono font-bold uppercase tracking-wider flex items-center gap-1">Error <X className="w-3 h-3" /></span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* SUBMISSION ACTION BUTTONS ROW */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-[#262626] gap-3">
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => toggleSaved(challengePool[challengeIdx].spanish)}
                        className="bg-[#121212] hover:bg-[#2C2C2C] border border-[#2B2B2B] text-slate-300 py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1.5 cursor-pointer font-sans"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>
                          {savedWords.includes(challengePool[challengeIdx].spanish) ? "★ Guardado" : "☆ Guardar"}
                        </span>
                      </button>

                      <button
                        onClick={() => toggleLearned(challengePool[challengeIdx].spanish)}
                        className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1.5 cursor-pointer font-sans ${
                          learnedWords.includes(challengePool[challengeIdx].spanish)
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-[#121212] hover:bg-[#2C2C2C] border border-[#2B2B2B] text-slate-300"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>
                          {learnedWords.includes(challengePool[challengeIdx].spanish) ? "✔ Aprendido" : "Pendiente"}
                        </span>
                      </button>
                    </div>

                    {!challengeAnswered ? (
                      <button
                        disabled={challengeSelected === null}
                        onClick={handleVerifyChallenge}
                        className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 text-black hover:bg-amber-600 border border-amber-400 transition font-extrabold text-xs rounded-xl disabled:opacity-45 uppercase tracking-wider cursor-pointer text-center font-sans"
                      >
                        Verificar Respuesta
                      </button>
                    ) : (
                      <button
                        onClick={handleNextChallenge}
                        className="w-full sm:w-auto px-6 py-2.5 bg-white text-black hover:bg-slate-200 transition font-extrabold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer font-sans"
                      >
                        <span>
                          {challengeIdx === 4 ? "Finalizar Desafío" : "Siguiente pregunta"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* ACTIVE FEEDBACK CONTEXT CARD */}
                  {challengeAnswered && (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in text-left ${
                      challengeIsCorrect
                        ? "bg-emerald-950/20 text-emerald-400 border-emerald-900/40"
                        : "bg-rose-950/20 text-rose-400 border-rose-900/40"
                    }`}>
                      <div>
                        <h5 className="font-bold text-[10px] uppercase tracking-wider mb-1.5 flex items-center gap-1 font-sans">
                          <Award className="w-4 h-4" />
                          <span>{challengeIsCorrect ? "Respuesta Correcta" : "Comentario Histórico"}</span>
                        </h5>
                        <p className="font-sans">
                          {challengeIsCorrect
                            ? `¡Gran trabajo lingüístico! Has acertado el valor semántico. El origen andalusí de "${challengePool[challengeIdx].spanish}" es: ${challengePool[challengeIdx].etymology}.`
                            : `El significado correcto de "${challengePool[challengeIdx].spanish}" es: "${challengePool[challengeIdx].meaning}".`}
                        </p>
                        <div className="bg-black/20 p-2.5 rounded border border-[#222]/10 mt-2 text-[10px] space-y-1 text-slate-300">
                          <p className="font-sans"><strong>Ejemplo de uso:</strong> "{challengePool[challengeIdx].example}"</p>
                          <p className="text-right text-slate-400 font-serif dir-rtl mt-0.5">"{challengePool[challengeIdx].exampleAr}"</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            /* VOCAB PRACTICE GAME DECK SIMULATOR */
            <div className="bg-[#1A1A1A] rounded-2xl border border-[#282828] p-6 space-y-6 animate-fade-in relative overflow-hidden text-left">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>

              {vocabPracticePool.length === 0 || !vocabPracticePool[vocabPracticeIdx] ? (
                // Safe recovery guard
                <div className="text-center py-6 text-slate-400">
                  <p>Iniciando práctica de vocabulario...</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2C2C2C]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-500/10 rounded-lg text-[#FFD700]">
                        <Layers className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                          {vocabPracticeFilter === "saved" ? "Práctica del Mazo Personalizado" : "Práctica General"}
                        </h3>
                        <p className="text-[10px] text-slate-400">
                          Identifica los significados y raíces de los vocablos árabes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      <span className="text-xs font-mono font-bold px-2 py-1 bg-[#121212] border border-[#2B2B2B] rounded text-slate-400 leading-none">
                        Palabra {vocabPracticeIdx + 1} de {vocabPracticePool.length}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-[#121212] px-2.5 py-1 rounded border border-[#2C2C2C]">
                        <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                        <span>Racha: {vocabPracticeStreak}</span>
                      </span>
                    </div>
                  </div>

                  {/* Visual Word study container with its Arabic root etymology */}
                  <div className="bg-[#111] p-6 rounded-xl border border-[#222] space-y-4">
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono font-bold block">Vocablo de estudio:</span>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-3">
                          <h4 className="text-2xl font-black text-white tracking-wide font-sans">{vocabPracticePool[vocabPracticeIdx].spanish}</h4>
                          <span className="text-xl font-serif font-extrabold text-amber-400 dir-rtl">{vocabPracticePool[vocabPracticeIdx].arabic}</span>
                        </div>
                        {/* Audio Speak inside practice */}
                        <button
                          onClick={() => speakSpanishPhrase(vocabPracticePool[vocabPracticeIdx].spanish)}
                          className="mt-1.5 p-1 px-3 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-amber-400 border border-[#2B2B2B] rounded text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Escuchar Pronunciación
                        </button>
                      </div>

                      {/* Linguistic Root highlight */}
                      <div className="bg-[#1A1A1A] p-3 rounded-lg border border-[#2C2C2C] self-start sm:self-auto min-w-[200px]">
                        <span className="text-[8px] text-amber-500 block uppercase font-bold tracking-wider">Raíz Lingüística • أصل الكلمة</span>
                        <p className="text-xs font-mono font-bold text-[#FFD700] mt-1">{vocabPracticePool[vocabPracticeIdx].etymology}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 text-left">
                    <span className="text-[9px] text-slate-400 uppercase font-mono font-bold block">Selecciona la definición correspondiente:</span>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {vocabPracticeOptions.map((meaningOpt, oIdx) => {
                        const isSelectedOpt = vocabPracticeSelected === meaningOpt;
                        const correctAndDone = vocabPracticeAnswered && meaningOpt === vocabPracticePool[vocabPracticeIdx].meaning;
                        const incorrectAndDone = vocabPracticeAnswered && isSelectedOpt && meaningOpt !== vocabPracticePool[vocabPracticeIdx].meaning;

                        let optBg = "bg-[#121212] text-slate-300 border-[#222] hover:bg-[#1C1C1C]";
                        if (isSelectedOpt && !vocabPracticeAnswered) {
                          optBg = "bg-amber-500/10 border-amber-500 text-white ring-2 ring-amber-500/10";
                        } else if (correctAndDone) {
                          optBg = "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold";
                        } else if (incorrectAndDone) {
                          optBg = "bg-rose-500/10 border-rose-500 text-rose-400";
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={vocabPracticeAnswered}
                            onClick={() => setVocabPracticeSelected(meaningOpt)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all text-xs flex items-center justify-between cursor-pointer ${optBg}`}
                          >
                            <span className="font-sans leading-relaxed">{meaningOpt}</span>
                            {correctAndDone && <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">¡Acierto! ✓</span>}
                            {incorrectAndDone && <span className="text-[9px] text-rose-400 font-mono font-bold uppercase tracking-wider">Incorrecto</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submission and layout control */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-[#262626] gap-3">
                    <div className="flex gap-2 w-full sm:w-auto">
                      {/* Add study adjustments directly on card */}
                      <button
                        onClick={() => toggleSaved(vocabPracticePool[vocabPracticeIdx].spanish)}
                        className="bg-[#1A1A1A] hover:bg-[#2C2C2C] border border-[#2B2B2B] text-slate-300 py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>
                          {savedWords.includes(vocabPracticePool[vocabPracticeIdx].spanish) ? "★ Guardado" : "☆ Guardar"}
                        </span>
                      </button>

                      <button
                        onClick={() => toggleLearned(vocabPracticePool[vocabPracticeIdx].spanish)}
                        className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1.5 cursor-pointer ${
                          learnedWords.includes(vocabPracticePool[vocabPracticeIdx].spanish)
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-[#1A1A1A] hover:bg-[#2C2C2C] border border-[#2B2B2B] text-slate-300"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>
                          {learnedWords.includes(vocabPracticePool[vocabPracticeIdx].spanish) ? "✔ Aprendido" : "Pendiente"}
                        </span>
                      </button>
                    </div>

                    {!vocabPracticeAnswered ? (
                      <button
                        disabled={vocabPracticeSelected === null}
                        onClick={handleVerifyVocabPractice}
                        className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 text-black hover:bg-amber-600 border border-amber-400 transition font-extrabold text-xs rounded-xl disabled:opacity-45 uppercase tracking-wider cursor-pointer text-center"
                      >
                        Verificar Definición
                      </button>
                    ) : (
                      <button
                        onClick={handleNextVocabPractice}
                        className="w-full sm:w-auto px-6 py-2.5 bg-white text-black hover:bg-slate-200 transition font-extrabold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Siguiente Palabra</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Practice correct/incorrect explanations block */}
                  {vocabPracticeAnswered && (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in text-left ${
                      vocabPracticeIsCorrect
                        ? "bg-emerald-950/20 text-emerald-400 border-emerald-900/40"
                        : "bg-rose-950/20 text-rose-400 border-rose-900/40"
                    }`}>
                      <div>
                        <h5 className="font-bold text-[10px] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>{vocabPracticeIsCorrect ? "Respuesta Correcta" : "Inflexión Lingüística"}</span>
                        </h5>
                        <p className="font-sans">
                          {vocabPracticeIsCorrect
                            ? `¡Perfecto! Has asimilado la conexión de la raíz. El origen de "${vocabPracticePool[vocabPracticeIdx].spanish}" es: ${vocabPracticePool[vocabPracticeIdx].etymology}.`
                            : `El significado correcto de "${vocabPracticePool[vocabPracticeIdx].spanish}" es: "${vocabPracticePool[vocabPracticeIdx].meaning}".`}
                        </p>
                        <div className="bg-black/20 p-2.5 rounded border border-[#222]/10 mt-2 text-[10px] space-y-1 text-slate-300">
                          <p><strong>Ejemplo contextual:</strong> "{vocabPracticePool[vocabPracticeIdx].example}"</p>
                          <p className="text-right text-slate-400 font-serif dir-rtl mt-0.5">"{vocabPracticePool[vocabPracticeIdx].exampleAr}"</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
