'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Heart, RotateCw } from 'lucide-react';
import type { TarotCard } from '../tarotCards';
import CardImage from './CardImage';

interface FlashcardModeProps {
  cards: TarotCard[];
  userStats: any;
  updateProgress: (cardId: number, progress: any) => void;
  addXP: (amount: number) => void;
  favorites: number[];
  toggleFavorite: (cardId: number) => void;
}

export default function FlashcardMode({
  cards,
  userStats,
  updateProgress,
  addXP,
  favorites,
  toggleFavorite,
}: FlashcardModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardFilter, setCardFilter] = useState('all');
  const [filteredCards, setFilteredCards] = useState(cards);

  useEffect(() => {
    if (cardFilter === 'major') {
      setFilteredCards(cards.filter(c => c.arcana === 'Major'));
    } else if (cardFilter === 'minor') {
      setFilteredCards(cards.filter(c => c.arcana === 'Minor'));
    } else {
      setFilteredCards(cards);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cardFilter, cards]);

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      addXP(5);
      updateProgress(currentCard.id, { reviewed: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setFilteredCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">📚 Flashcard</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCardFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${cardFilter === 'all' ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setCardFilter('major')}
            className={`px-4 py-2 rounded-lg transition ${cardFilter === 'major' ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'}`}
          >
            Major
          </button>
          <button
            onClick={() => setCardFilter('minor')}
            className={`px-4 py-2 rounded-lg transition ${cardFilter === 'minor' ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'}`}
          >
            Minor
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{currentIndex + 1} / {filteredCards.length}</span>
          <span>{Math.round((currentIndex + 1) / filteredCards.length * 100)}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-amber-400 to-pink-400 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="perspective cursor-pointer h-96"
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform ${
            isFlipped ? 'scale-x-[-1]' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 border border-purple-500/50 rounded-2xl p-6 flex flex-col items-center justify-center backdrop-blur-md overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-40 h-56 rounded-xl overflow-hidden border border-purple-400/40 shadow-lg mb-4 bg-slate-900/40">
              <CardImage card={currentCard} className="w-full h-full" emojiSizeClassName="text-7xl" priority />
            </div>
            <h3 className="text-2xl font-bold text-center text-amber-400 mb-1">
              {currentCard.name}
            </h3>
            <p className="text-gray-300 text-center text-base">
              {currentCard.arcana} • {currentCard.suit || 'N/A'}
            </p>
            <p className="text-gray-400 text-center mt-2 text-sm">Nhấn để xem ý nghĩa</p>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/50 rounded-2xl p-8 flex flex-col justify-center backdrop-blur-md overflow-y-auto"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <h3 className="text-2xl font-bold text-amber-400 mb-4">{currentCard.name}</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <p className="text-purple-400 font-semibold">Ý nghĩa chung:</p>
                <p>{currentCard.generalMeaning}</p>
              </div>
              <div>
                <p className="text-purple-400 font-semibold">Từ khóa:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {currentCard.keywords.slice(0, 4).map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-500/30 rounded text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-purple-500/20">
                <p className="text-amber-400 font-semibold text-xs mb-1">📖 Ý nghĩa truyền thống (Waite)</p>
                <p className="text-xs"><span className="text-gray-400">Xuôi:</span> {currentCard.waiteUpright}</p>
                <p className="text-xs mt-1"><span className="text-gray-400">Ngược:</span> {currentCard.waiteReversed}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center items-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 disabled:opacity-30 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => speak(currentCard.name)}
          className="p-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition"
          title="Phát âm"
        >
          <Volume2 size={24} />
        </button>
        <button
          onClick={() => toggleFavorite(currentCard.id)}
          className={`p-3 rounded-lg transition ${
            favorites.includes(currentCard.id)
              ? 'bg-red-500/30 text-red-400'
              : 'bg-gray-500/20 hover:bg-gray-500/30'
          }`}
        >
          <Heart size={24} fill={favorites.includes(currentCard.id) ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={handleShuffle}
          className="p-3 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition"
          title="Trộn"
        >
          <RotateCw size={24} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === filteredCards.length - 1}
          className="p-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 disabled:opacity-30 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <InfoCard label="Tình yêu" value={currentCard.loveMeaning} />
        <InfoCard label="Công việc" value={currentCard.careerMeaning} />
        <InfoCard label="Sức khỏe" value={currentCard.healthMeaning} />
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 cursor-pointer hover:from-purple-500/20 hover:to-pink-500/20 transition"
      onClick={() => setExpanded(!expanded)}
    >
      <p className="text-sm font-semibold text-purple-400 mb-2">{label}</p>
      <p className={`text-xs text-gray-300 ${!expanded && 'line-clamp-2'}`}>{value}</p>
    </div>
  );
}
