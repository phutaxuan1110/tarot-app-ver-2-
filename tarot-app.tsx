'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Zap, Target, Brain, Home, BarChart3, Heart } from 'lucide-react';
import { tarotCards } from './tarotCards';
import FlashcardMode from './components/FlashcardMode';
import QuizDrillMode from './components/QuizDrillMode';
import {
  SpreadPracticeMode,
  ContextMatchingMode,
  StatisticsDashboard,
  CardLibrary,
  CardDetail,
  Achievements,
} from './components/index';

export default function TarotApp() {
  const [currentMode, setCurrentMode] = useState('home');
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [userStats, setUserStats] = useState<any>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem('tarotUserStats');
    return saved
      ? JSON.parse(saved)
      : {
          cardsLearned: 0,
          totalReviews: 0,
          quizAccuracy: 0,
          reviewAccuracy: 0,
          xp: 0,
          streak: 0,
          lastLoginDate: new Date().toISOString(),
          cardProgress: {},
          achievements: [],
        };
  });
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tarotFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [collections, setCollections] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tarotCollections');
    return saved ? JSON.parse(saved) : [];
  });
  const [cardOfDay, setCardOfDay] = useState(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('tarotCardOfDay');
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      if (data.date === today) return data.card;
    }
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    localStorage.setItem(
      'tarotCardOfDay',
      JSON.stringify({
        card: randomCard,
        date: new Date().toDateString(),
      })
    );
    return randomCard;
  });

  // Persist stats
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tarotUserStats', JSON.stringify(userStats));
    }
  }, [userStats]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tarotFavorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tarotCollections', JSON.stringify(collections));
    }
  }, [collections]);

  const toggleFavorite = useCallback((cardId: number) => {
    setFavorites((prev) =>
      prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
    );
  }, []);

  const addXP = useCallback((amount: number) => {
    setUserStats((prev: any) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  }, []);

  const updateCardProgress = useCallback((cardId: number, progress: any) => {
    setUserStats((prev: any) => ({
      ...prev,
      cardProgress: {
        ...prev.cardProgress,
        [cardId]: {
          ...(prev.cardProgress[cardId] || {}),
          ...progress,
          lastReviewed: new Date().toISOString(),
        },
      },
    }));
  }, []);

  const renderContent = () => {
    switch (currentMode) {
      case 'home':
        return <HomePage cardOfDay={cardOfDay} stats={userStats} onNavigate={setCurrentMode} />;
      case 'flashcard':
        return (
          <FlashcardMode
            cards={tarotCards}
            userStats={userStats}
            updateProgress={updateCardProgress}
            addXP={addXP}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        );
      case 'quiz':
        return (
          <QuizDrillMode
            cards={tarotCards}
            userStats={userStats}
            updateProgress={updateCardProgress}
            addXP={addXP}
          />
        );
      case 'spread':
        return (
          <SpreadPracticeMode
            cards={tarotCards}
            userStats={userStats}
            updateProgress={updateCardProgress}
            addXP={addXP}
          />
        );
      case 'context':
        return (
          <ContextMatchingMode
            cards={tarotCards}
            userStats={userStats}
            updateProgress={updateCardProgress}
            addXP={addXP}
          />
        );
      case 'stats':
        return <StatisticsDashboard cards={tarotCards} userStats={userStats} />;
      case 'library':
        return (
          <CardLibrary
            cards={tarotCards}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onSelectCard={setSelectedCardId}
            selectedCardId={selectedCardId}
          />
        );
      case 'card-detail':
        return selectedCardId ? (
          <CardDetail
            cardId={selectedCardId}
            cards={tarotCards}
            onBack={() => {
              setCurrentMode('library');
              setSelectedCardId(null);
            }}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ) : null;
      case 'achievements':
        return <Achievements userStats={userStats} />;
      default:
        return <HomePage cardOfDay={cardOfDay} stats={userStats} onNavigate={setCurrentMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white font-sans">
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-purple-500/20 bg-slate-950/80 backdrop-blur-xl z-50">
        <div className="flex justify-around items-center max-w-4xl mx-auto h-20 px-4 flex-wrap">
          {[
            { id: 'home', icon: Home, label: 'Trang chủ' },
            { id: 'library', icon: BookOpen, label: 'Thư viện' },
            { id: 'flashcard', icon: Brain, label: 'Flashcard' },
            { id: 'quiz', icon: Target, label: 'Quiz' },
            { id: 'spread', icon: Heart, label: 'Spread' },
            { id: 'stats', icon: BarChart3, label: 'Thống kê' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setCurrentMode(id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                currentMode === id ? 'text-amber-400 bg-purple-500/20' : 'text-gray-400 hover:text-white'
              }`}
              title={label}
            >
              <Icon size={20} />
              <span className="text-xs hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-24 pt-6">
        <div className="max-w-4xl mx-auto px-4">{renderContent()}</div>
      </main>
    </div>
  );
}

function HomePage({ cardOfDay, stats, onNavigate }: any) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          ✨ Tarot Học
        </h1>
        <p className="text-gray-400 text-lg">Khám phá 78 lá bài & chinh phục từng ý nghĩa</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Zap className="text-amber-400" />} label="XP" value={stats.xp} />
        <StatCard icon={<BookOpen className="text-purple-400" />} label="Đã học" value={stats.cardsLearned} />
        <StatCard icon={<Target className="text-pink-400" />} label="Streak" value={stats.streak} />
        <StatCard
          icon={<Brain className="text-blue-400" />}
          label="Độ chính xác"
          value={`${Math.round(stats.reviewAccuracy || 0)}%`}
        />
      </div>

      {/* Card of the Day */}
      {cardOfDay && (
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-md hover:from-purple-500/20 hover:to-pink-500/20 transition-all">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">🌙 Lá bài hôm nay</h2>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="w-32 h-48 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 flex items-center justify-center text-6xl overflow-hidden shadow-lg">
                {cardOfDay?.imageEmoji || '🎴'}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm mb-2">CARD OF THE DAY</p>
              <h3 className="text-3xl font-bold mb-2">{cardOfDay?.name}</h3>
              <p className="text-gray-300 mb-4">{cardOfDay?.generalMeaning}</p>
              <div className="flex flex-wrap gap-2">
                {cardOfDay?.keywords?.slice(0, 4).map((kw: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs text-purple-200">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Start */}
      <div className="grid md:grid-cols-2 gap-4">
        <QuickStartCard
          title="📚 Flashcard"
          description="Học từng lá bài một cách từng từ"
          onClick={() => onNavigate('flashcard')}
          color="from-blue-500/20 to-cyan-500/20"
        />
        <QuickStartCard
          title="🎯 Quiz Drill"
          description="Kiểm tra kiến thức của bạn"
          onClick={() => onNavigate('quiz')}
          color="from-pink-500/20 to-rose-500/20"
        />
        <QuickStartCard
          title="🔮 Spread Practice"
          description="Thực hành với layout thực tế"
          onClick={() => onNavigate('spread')}
          color="from-purple-500/20 to-indigo-500/20"
        />
        <QuickStartCard
          title="🧠 Context Matching"
          description="Ghép ý nghĩa với tình huống"
          onClick={() => onNavigate('context')}
          color="from-amber-500/20 to-orange-500/20"
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function QuickStartCard({ title, description, onClick, color }: any) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${color} border border-purple-500/30 rounded-xl p-6 backdrop-blur-md hover:from-purple-500/30 hover:to-pink-500/30 transition-all text-left group`}
    >
      <h3 className="text-lg font-bold mb-1 group-hover:text-amber-400 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </button>
  );
}
