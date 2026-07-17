'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import type { TarotCard } from '../tarotCards';

interface QuizDrillModeProps {
  cards: TarotCard[];
  userStats: any;
  updateProgress: (cardId: number, progress: any) => void;
  addXP: (amount: number) => void;
}

export default function QuizDrillMode({
  cards,
  userStats,
  updateProgress,
  addXP,
}: QuizDrillModeProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizMode, setQuizMode] = useState<'meaning' | 'keyword' | 'arcana'>('meaning');
  const [gameEnded, setGameEnded] = useState(false);

  const currentCard = cards[currentCardIndex];
  const options = generateOptions(currentCard, cards, quizMode);

  function generateOptions(card: TarotCard, allCards: TarotCard[], mode: string): TarotCard[] {
    if (mode === 'meaning') {
      // Lấy 3 cards random khác
      const others = allCards
        .filter(c => c.id !== card.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      return [card, ...others].sort(() => Math.random() - 0.5);
    }
    return [card, ...allCards.filter(c => c.id !== card.id).slice(0, 3)];
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    setTotalQuestions(totalQuestions + 1);

    if (options[index].id === currentCard.id) {
      setScore(score + 10);
      addXP(20);
      updateProgress(currentCard.id, { quizCorrect: (userStats.cardProgress[currentCard.id]?.quizCorrect || 0) + 1 });
    } else {
      updateProgress(currentCard.id, { quizIncorrect: (userStats.cardProgress[currentCard.id]?.quizIncorrect || 0) + 1 });
    }
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameEnded(true);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTotalQuestions(0);
    setGameEnded(false);
  };

  const getQuestionText = () => {
    if (quizMode === 'meaning') {
      return `Ý nghĩa "${currentCard.generalMeaning.substring(0, 30)}..." là lá bài nào?`;
    } else if (quizMode === 'keyword') {
      return `Lá bài nào có từ khóa "${currentCard.keywords[0]}"?`;
    } else {
      return `${currentCard.name} thuộc thứ tự nào trong bộ Tarot?`;
    }
  };

  if (gameEnded) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold mb-4">Quiz hoàn thành!</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <p className="text-gray-400 text-sm">Tổng câu hỏi</p>
              <p className="text-3xl font-bold text-green-400">{totalQuestions}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Điểm</p>
              <p className="text-3xl font-bold text-amber-400">{score}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Độ chính xác</p>
              <p className="text-3xl font-bold text-blue-400">{totalQuestions > 0 ? Math.round((score / (totalQuestions * 10)) * 100) : 0}%</p>
            </div>
          </div>
          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition"
          >
            Bắt đầu lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">🎯 Quiz Drill</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setQuizMode('meaning')}
            className={`px-3 py-1 text-sm rounded transition ${quizMode === 'meaning' ? 'bg-purple-500 text-white' : 'bg-purple-500/20'}`}
          >
            Ý nghĩa
          </button>
          <button
            onClick={() => setQuizMode('keyword')}
            className={`px-3 py-1 text-sm rounded transition ${quizMode === 'keyword' ? 'bg-purple-500 text-white' : 'bg-purple-500/20'}`}
          >
            Từ khóa
          </button>
          <button
            onClick={() => setQuizMode('arcana')}
            className={`px-3 py-1 text-sm rounded transition ${quizMode === 'arcana' ? 'bg-purple-500 text-white' : 'bg-purple-500/20'}`}
          >
            Arcana
          </button>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Câu {currentCardIndex + 1} / {cards.length}</span>
          <span>Điểm: {score}</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all"
            style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-amber-400 mb-8">
          {getQuestionText()}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showResult && handleAnswer(idx)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg transition border text-left ${
                selectedAnswer === idx
                  ? option.id === currentCard.id
                    ? 'bg-green-500/30 border-green-500 text-green-100'
                    : 'bg-red-500/30 border-red-500 text-red-100'
                  : showResult && option.id === currentCard.id
                  ? 'bg-green-500/20 border-green-500/50'
                  : 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500/50'
              } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{option.name}</p>
                  <p className="text-sm text-gray-400">{option.arcana} • {option.suit || 'N/A'}</p>
                </div>
                {showResult && selectedAnswer === idx && (
                  option.id === currentCard.id ? (
                    <CheckCircle className="text-green-400" />
                  ) : (
                    <XCircle className="text-red-400" />
                  )
                )}
                {showResult && option.id === currentCard.id && selectedAnswer !== idx && (
                  <CheckCircle className="text-green-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      {showResult && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center justify-center gap-2"
        >
          {currentCardIndex === cards.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'} <ChevronRight />
        </button>
      )}
    </div>
  );
}
