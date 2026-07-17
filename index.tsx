'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Zap } from 'lucide-react';
import type { TarotCard } from '../tarotCards';
import CardImage from './CardImage';

// SPREAD PRACTICE MODE
export function SpreadPracticeMode({ cards, userStats, updateProgress, addXP }: any) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [spreadType, setSpreadType] = useState('three');

  const spreads = {
    three: { name: 'Three Card Spread', count: 3, positions: ['Quá khứ', 'Hiện tại', 'Tương lai'] },
    celtic: { name: 'Celtic Cross', count: 10, positions: ['Bản thân', 'Thách thức', 'Mục tiêu', 'Nền tảng', 'Quá khứ', 'Tương lai gần', 'Bạn', 'Tác động bên ngoài', 'Hy vọng/Sợ hãi', 'Kết quả'] },
  };

  const currentSpread = spreads[spreadType as keyof typeof spreads];

  const drawCards = () => {
    const drawn: number[] = [];
    while (drawn.length < currentSpread.count) {
      const idx = Math.floor(Math.random() * cards.length);
      if (!drawn.includes(cards[idx].id)) {
        drawn.push(cards[idx].id);
      }
    }
    setSelectedCards(drawn);
    addXP(50);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">🔮 Spread Practice</h2>
        <select
          value={spreadType}
          onChange={(e) => { setSpreadType(e.target.value); setSelectedCards([]); }}
          className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-white"
        >
          <option value="three">Three Card</option>
          <option value="celtic">Celtic Cross</option>
        </select>
      </div>

      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-6">{currentSpread.name}</h3>
        
        {selectedCards.length === 0 ? (
          <button
            onClick={drawCards}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:shadow-lg transition"
          >
            Rút {currentSpread.count} lá bài
          </button>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {selectedCards.map((cardId, idx) => {
                const card = cards.find((c: TarotCard) => c.id === cardId);
                return (
                  <div key={idx} className="bg-slate-800/50 border border-purple-500/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-2">{currentSpread.positions[idx]}</p>
                    <div className="w-full aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-slate-900/50">
                      <CardImage card={card} className="w-full h-full" emojiSizeClassName="text-4xl" />
                    </div>
                    <p className="font-bold text-sm text-amber-400">{card.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{card.generalMeaning.substring(0, 50)}...</p>
                  </div>
                );
              })}
            </div>
            <button
              onClick={drawCards}
              className="w-full py-3 bg-purple-500/20 border border-purple-500/50 rounded-lg font-bold hover:bg-purple-500/30 transition"
            >
              Rút lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// CONTEXT MATCHING MODE
export function ContextMatchingMode({ cards, userStats, updateProgress, addXP }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const contexts = [
    { scenario: 'Bạn cảm thấy hy vọng và inspirational trong tình huống khó khăn', keywords: 'hope faith renewal' },
    { scenario: 'Có sự thay đổi lớn đang xảy ra trong cuộc sống', keywords: 'transformation change ending beginning' },
    { scenario: 'Cần có sự cân bằng và điều hòa trong cuộc sống', keywords: 'balance moderation harmony' },
  ];

  const currentContext = contexts[currentIndex];
  const relevantCards = cards.filter((c: TarotCard) => 
    currentContext.keywords.split(' ').some(kw => c.keywords.join(' ').includes(kw))
  );

  const handleSelectCard = (cardId: number) => {
    if (!selectedCards.includes(cardId)) {
      const newSelected = [...selectedCards, cardId];
      setSelectedCards(newSelected);
      addXP(15);
    }
  };

  const handleNext = () => {
    if (currentIndex < contexts.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedCards([]);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl">✨</div>
        <h2 className="text-3xl font-bold">Hoàn thành!</h2>
        <p className="text-gray-400">Bạn đã học được cách ghép ý nghĩa với tình huống</p>
        <button
          onClick={() => { setCurrentIndex(0); setCompleted(false); setSelectedCards([]); }}
          className="px-6 py-3 bg-purple-500 rounded-lg font-bold hover:bg-purple-600 transition"
        >
          Bắt đầu lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">🧠 Context Matching</h2>
      
      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-2xl p-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Tình huống {currentIndex + 1} / {contexts.length}</h3>
          <div className="text-sm text-gray-400">{selectedCards.length} lá được chọn</div>
        </div>
        <p className="text-lg text-blue-100">{currentContext.scenario}</p>
      </div>

      <div>
        <p className="text-gray-400 text-sm mb-4">Chọn những lá bài phù hợp với tình huống này:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relevantCards.slice(0, 8).map((card: TarotCard) => (
            <button
              key={card.id}
              onClick={() => handleSelectCard(card.id)}
              className={`p-4 rounded-lg border transition ${
                selectedCards.includes(card.id)
                  ? 'bg-green-500/30 border-green-500'
                  : 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20'
              }`}
            >
              <p className="text-3xl mb-2">{card.imageEmoji}</p>
              <p className="font-bold text-sm text-center">{card.name}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold hover:shadow-lg transition"
      >
        Tiếp tục
      </button>
    </div>
  );
}

// STATISTICS DASHBOARD
export function StatisticsDashboard({ cards, userStats }: any) {
  const majorCards = cards.filter((c: TarotCard) => c.arcana === 'Major');
  const minorCards = cards.filter((c: TarotCard) => c.arcana === 'Minor');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">📊 Thống kê học tập</h2>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox icon={<Zap className="text-amber-400" />} label="XP" value={userStats.xp} />
        <StatBox icon={<TrendingUp className="text-green-400" />} label="Đã học" value={`${Object.keys(userStats.cardProgress).length}/${cards.length}`} />
        <StatBox icon={<Calendar className="text-blue-400" />} label="Streak" value={userStats.streak} />
        <StatBox icon={<BarChart3 className="text-purple-400" />} label="Độ chính xác" value={`${Math.round(userStats.reviewAccuracy)}%`} />
      </div>

      {/* Card Progress */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Tiến độ học lá bài</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-2">
            <span>Major Arcana: {majorCards.filter((c: TarotCard) => userStats.cardProgress[c.id]).length}/{majorCards.length}</span>
            <span>{Math.round((majorCards.filter((c: TarotCard) => userStats.cardProgress[c.id]).length / majorCards.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full"
              style={{ width: `${(majorCards.filter((c: TarotCard) => userStats.cardProgress[c.id]).length / majorCards.length) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-sm mb-2 mt-4">
            <span>Minor Arcana: {minorCards.filter((c: TarotCard) => userStats.cardProgress[c.id]).length}/{minorCards.length}</span>
            <span>{Math.round((minorCards.filter((c: TarotCard) => userStats.cardProgress[c.id]).length / minorCards.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
              style={{ width: `${(minorCards.filter((c: TarotCard) => userStats.cardProgress[c.id]).length / minorCards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Learning Streak */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>🔥 Learning Streak: {userStats.streak} ngày</span>
        </h3>
        <p className="text-gray-300">Tiếp tục học hàng ngày để duy trì streak của bạn!</p>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value }: any) {
  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// CARD LIBRARY
export function CardLibrary({ cards, favorites, toggleFavorite, onSelectCard, selectedCardId }: any) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredCards = cards.filter((c: TarotCard) => {
    const matchFilter = filter === 'all' || c.arcana === filter || (filter === 'favorite' && favorites.includes(c.id));
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                       c.keywords.some(kw => kw.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">📚 Thư viện lá bài</h2>

      <div className="flex gap-2 flex-wrap">
        {['all', 'Major', 'Minor', 'favorite'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg transition ${
              filter === f
                ? 'bg-purple-500 text-white'
                : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'
            }`}
          >
            {f === 'all' ? 'Tất cả' : f === 'Major' ? 'Major Arcana' : f === 'Minor' ? 'Minor Arcana' : '❤️ Yêu thích'}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm lá bài..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-500"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCards.map((card: TarotCard) => (
          <CardItem
            key={card.id}
            card={card}
            isFavorite={favorites.includes(card.id)}
            toggleFavorite={toggleFavorite}
            onSelect={onSelectCard}
            isSelected={selectedCardId === card.id}
          />
        ))}
      </div>
    </div>
  );
}

function CardItem({ card, isFavorite, toggleFavorite, onSelect, isSelected }: any) {
  return (
    <div
      onClick={() => onSelect(card.id)}
      className={`p-3 rounded-lg border cursor-pointer transition ${
        isSelected
          ? 'bg-purple-500/40 border-purple-500'
          : 'bg-slate-800 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500/50'
      }`}
    >
      <div className="w-full aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-slate-900/50 relative">
        <CardImage card={card} className="w-full h-full" emojiSizeClassName="text-4xl" />
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(card.id); }}
          className="absolute top-1 right-1 text-lg drop-shadow"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <p className="font-bold text-sm text-amber-400">{card.name}</p>
      <p className="text-xs text-gray-400 mt-1">{card.arcana} • {card.suit || 'N/A'}</p>
    </div>
  );
}

// CARD DETAIL
export function CardDetail({ cardId, cards, onBack, favorites, toggleFavorite }: any) {
  const card = cards.find((c: TarotCard) => c.id === cardId);

  if (!card) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-gray-400 hover:text-white transition"
      >
        ← Quay lại
      </button>

      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-4xl font-bold text-amber-400 mb-2">{card.name}</h2>
            <p className="text-gray-400">
              {card.arcana} • {card.suit || 'N/A'} • Số {card.number}
            </p>
          </div>
          <button
            onClick={() => toggleFavorite(card.id)}
            className="text-4xl"
          >
            {favorites.includes(card.id) ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="w-48 h-72 mx-auto rounded-xl overflow-hidden border border-purple-500/40 shadow-xl bg-slate-900/40">
            <CardImage card={card} className="w-full h-full" emojiSizeClassName="text-7xl" priority />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailSection title="Ý nghĩa chung" content={card.generalMeaning} />
          <DetailSection title="Tình yêu" content={card.loveMeaning} />
          <DetailSection title="Công việc" content={card.careerMeaning} />
          <DetailSection title="Gia đình" content={card.familyMeaning} />
          <DetailSection title="Sức khỏe" content={card.healthMeaning} />
          <DetailSection title="Tương lai" content={card.futureMeaning} />
          <DetailSection title="Tâm linh" content={card.spiritualMeaning} />
          <DetailSection title="Lời khuyên" content={card.advice} />
        </div>

        <div className="mt-6 p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-sm font-semibold text-amber-400 mb-3">📖 Ý nghĩa truyền thống theo A.E. Waite</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-green-400 mb-1">Xuôi (Upright)</p>
              <p className="text-sm text-gray-300">{card.waiteUpright}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-400 mb-1">Ngược (Reversed)</p>
              <p className="text-sm text-gray-300">{card.waiteReversed}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
          <p className="text-sm font-semibold text-purple-400 mb-2">Từ khóa:</p>
          <div className="flex flex-wrap gap-2">
            {card.keywords.map((kw: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-purple-500/30 rounded text-xs text-purple-200">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailSection({ title, content }: any) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-purple-400 mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{content}</p>
    </div>
  );
}

// ACHIEVEMENTS
export function Achievements({ userStats }: any) {
  const achievements = [
    { id: 1, name: 'First Card', description: 'Học xong lá bài đầu tiên', icon: '🎓', unlocked: userStats.cardsLearned > 0 },
    { id: 2, name: 'Quiz Master', description: 'Hoàn thành 10 câu quiz', icon: '🎯', unlocked: userStats.totalReviews >= 10 },
    { id: 3, name: 'Major Expert', description: 'Học xong tất cả Major Arcana', icon: '👑', unlocked: false },
    { id: 4, name: 'Fire Starter', description: 'Duy trì streak 7 ngày', icon: '🔥', unlocked: userStats.streak >= 7 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">🏆 Thành tích</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map(ach => (
          <div
            key={ach.id}
            className={`p-6 rounded-lg border transition ${
              ach.unlocked
                ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50'
                : 'bg-slate-800/50 border-slate-700/50 opacity-50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{ach.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{ach.name}</h3>
                <p className="text-sm text-gray-400">{ach.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
