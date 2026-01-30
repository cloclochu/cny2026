'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MenuPage() {
  const [currentUser, setCurrentUser] = useState('');
  const [dishProposal, setDishProposal] = useState('');
  const [dishOption, setDishOption] = useState('apporter'); // 'apporter' or 'liste'
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setCurrentUser(username);
    }
  }, []);

  const dishes = [
    {
      id: 'lion',
      emoji: '🦁',
      nameCN: '红烧狮子头',
      nameFR: 'Boulettes de viande braisées',
      description: 'Grosses boulettes de porc mijotées dans une sauce rouge'
    },
    {
      id: 'eggplant',
      emoji: '🍆',
      nameCN: '酱茄子',
      nameFR: 'Aubergines à la sauce',
      description: 'Aubergines sautées avec une sauce savoureuse'
    },
    {
      id: 'fish',
      emoji: '🐟',
      nameCN: '清蒸鱼',
      nameFR: 'Poisson vapeur',
      description: 'Poisson entier cuit à la vapeur (symbole de prospérité)'
    },
    {
      id: 'dumplings',
      emoji: '🥟',
      nameCN: '韭菜猪肉饺子',
      nameFR: 'Raviolis poireaux et porc',
      description: 'Raviolis faits maison farcis de poireaux et porc'
    },
    {
      id: 'spring-rolls',
      emoji: '🌯',
      nameCN: '春卷',
      nameFR: 'Rouleaux de printemps',
      description: 'Rouleaux de printemps croustillants faits maison'
    }
  ];

  const handleSubmitProposal = async () => {
    if (!dishProposal.trim()) {
      alert('请先写下你想分享的菜～');
      return;
    }

    const optionText = dishOption === 'apporter' 
      ? '我会自己准备并带来' 
      : '请加入 Chloe 的采购清单';

    try {
      const response = await fetch('/api/menu/propose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUser || '匿名',
          dish: dishProposal,
          option: optionText,
        }),
      });

      if (!response.ok) {
        throw new Error('Email send failed');
      }

      setShowSuccess(true);
      setDishProposal('');
      setDishOption('apporter');

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('发送失败，请稍后再试～');
    }
  };

  return (
    <div className="min-h-screen relative bg-black overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-amber-950 opacity-95" />
      
      <div className="absolute inset-0 opacity-25 mix-blend-overlay">
        <Image src="/FullSizeRender.webp" alt="Background" fill className="object-cover" priority />
      </div>

      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl lg:text-6xl opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            {i % 4 === 0 ? '🏮' : i % 4 === 1 ? '🧧' : i % 4 === 2 ? '🎐' : '🎋'}
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60 z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 z-10" />

      {/* Back button */}
      <div className="fixed top-4 left-4 lg:top-8 lg:left-8 z-50 animate-fadeIn">
        <Link href="/">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-br from-red-900/90 to-amber-900/90 backdrop-blur-sm border-2 border-yellow-500/60 rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg flex items-center gap-2">
              <span className="text-xl">←</span>
              <span className="text-yellow-100 font-bold text-sm lg:text-base hidden sm:inline">Retour</span>
            </div>
          </div>
        </Link>
      </div>

      {/* User badge */}
      {currentUser && (
        <div className="fixed top-4 right-4 lg:top-8 lg:right-8 z-50 animate-fadeIn cursor-horse">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-br from-red-900/90 to-amber-900/90 backdrop-blur-sm border-2 border-yellow-500/60 rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg flex items-center gap-2 lg:gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-red-950 font-black text-sm">
                {currentUser.charAt(0).toUpperCase()}
              </div>
              <span className="text-yellow-100 font-bold text-base lg:text-lg hidden sm:inline">{currentUser}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          
          {/* Title */}
          <div className="text-center mb-12 lg:mb-16 animate-fadeIn">
            <div className="inline-flex items-center gap-4 mb-6 flex-wrap justify-center">
              <span className="text-5xl lg:text-6xl">🍽️</span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-200 via-amber-100 to-red-200 bg-clip-text text-transparent drop-shadow-2xl">
                年夜菜
              </h1>
              <span className="text-5xl lg:text-6xl">🥘</span>
            </div>
            <p className="text-xl lg:text-2xl text-yellow-100 font-light">Le Menu du Réveillon</p>
          </div>

          {/* Dishes Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {dishes.map((dish, index) => (
              <div
                key={dish.id}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-950/70 to-amber-950/70 backdrop-blur-md border-2 border-yellow-500/40 p-6 lg:p-8 shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl lg:text-6xl">{dish.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-black text-yellow-200 mb-1">
                      {dish.nameFR}
                    </h3>
                    <p className="text-lg lg:text-xl text-amber-200 font-medium mb-2">
                      {dish.nameCN}
                    </p>
                  </div>
                </div>
                <p className="text-sm lg:text-base text-red-100 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            ))}
          </div>

          {/* Proposal Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/50 to-red-900/50 backdrop-blur-md border-2 border-yellow-500/40 p-8 lg:p-12 shadow-2xl animate-fadeIn" style={{ animationDelay: '0.7s' }}>
            <div className="absolute top-0 right-0 text-7xl lg:text-9xl opacity-10 -rotate-12">🎊</div>
            
            <div className="relative">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-black text-yellow-200 mb-3">
                  分享一道菜吧
                </h2>
                <p className="text-lg text-amber-100">
                  如果你有想带来的菜，欢迎告诉我～🍜
                </p>
              </div>

              <div className="space-y-6">
                {/* Dish input */}
                <div>
                  <label className="block text-yellow-200 font-semibold mb-3 text-lg">
                    你想分享的菜
                  </label>
                  <textarea
                    value={dishProposal}
                    onChange={(e) => setDishProposal(e.target.value)}
                    placeholder="例：凉拌黄瓜、宫保鸡丁、红烧狮子头..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border-2 border-yellow-600/40 text-yellow-100 placeholder-yellow-600/50 focus:border-yellow-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Options */}
                <div>
                  <label className="block text-yellow-200 font-semibold mb-3 text-lg">
                    你打算怎么准备？
                  </label>
                  <div className="space-y-3">
                    <button
                      onClick={() => setDishOption('apporter')}
                      className={`w-full text-left rounded-xl p-4 transition-all duration-300 border-2 ${
                        dishOption === 'apporter'
                          ? 'bg-gradient-to-br from-yellow-500 to-amber-600 border-yellow-500 shadow-lg scale-105'
                          : 'bg-black/30 border-yellow-600/30 hover:border-yellow-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🎒</span>
                        <div className="flex-1">
                          <p className={`font-bold text-lg ${dishOption === 'apporter' ? 'text-red-950' : 'text-yellow-200'}`}>
                            我自己准备并带来
                          </p>
                          <p className={`text-sm ${dishOption === 'apporter' ? 'text-red-900' : 'text-amber-200'}`}>
                            我会准备好并带到现场
                          </p>
                        </div>
                        {dishOption === 'apporter' && <span className="text-2xl">✓</span>}
                      </div>
                    </button>

                    <button
                      onClick={() => setDishOption('liste')}
                      className={`w-full text-left rounded-xl p-4 transition-all duration-300 border-2 ${
                        dishOption === 'liste'
                          ? 'bg-gradient-to-br from-yellow-500 to-amber-600 border-yellow-500 shadow-lg scale-105'
                          : 'bg-black/30 border-yellow-600/30 hover:border-yellow-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🛒</span>
                        <div className="flex-1">
                          <p className={`font-bold text-lg ${dishOption === 'liste' ? 'text-red-950' : 'text-yellow-200'}`}>
                            加入 Chloe 的采购清单
                          </p>
                          <p className={`text-sm ${dishOption === 'liste' ? 'text-red-900' : 'text-amber-200'}`}>
                            Chloe 会采购食材
                          </p>
                        </div>
                        {dishOption === 'liste' && <span className="text-2xl">✓</span>}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmitProposal}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-xl py-4 px-6 rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  ✅ 提交我的提议
                </button>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white px-8 py-6 rounded-2xl shadow-2xl animate-fadeIn">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">✅</span>
                  <div>
                    <p className="text-xl font-black">已通知 Chloe ✅</p>
                    <p className="text-sm">她会尽快回复你的提议</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-yellow-200/60 text-sm mt-12">
            <p>Plus on est de plats, plus c&apos;est festif ! 🎉</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float linear infinite; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
