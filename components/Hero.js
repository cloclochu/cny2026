'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [selectedAteliers, setSelectedAteliers] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  
  const [showAtelierForm, setShowAtelierForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showGameForm, setShowGameForm] = useState(false);
  
  const [atelierProposal, setAtelierProposal] = useState('');
  const [activityProposal, setActivityProposal] = useState('');
  const [gameProposal, setGameProposal] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    if (loggedIn === 'true' && username) {
      setIsLoggedIn(true);
      setCurrentUser(username);
    }
  }, []);

  const hosts = [
    { id: 'host1', name: 'Ludovic', image: '/images/ludovic.jpg' },
    { id: 'host2', name: 'Chloe', image: '/images/chloe.jpg' },
    { id: 'host3', name: 'Estelle', image: '/images/estelle.jpg' }
  ];

  const invites = [
    { id: '1', name: 'Julie', image: '/images/julie.jpg' },
    { id: '2', name: 'Pierre', image: '/images/pierre.jpg' },
    { id: '3', name: 'Jessica', image: '/images/jessica.jpg' },
    { id: '4', name: 'Mia', image: '/images/mia.jpg' },
    { id: '5', name: 'Thibault', image: '/images/thibault.jpg' },
    { id: '6', name: 'Roza', image: '/images/roza.jpg' },
    { id: '7', name: 'Benjamin', image: '/images/benjamin.jpg' },
    { id: '8', name: 'Lilia', image: '/images/lilia.jpg' },
    { id: '9', name: 'Diliana', image: '/images/diliana.jpg' },
    { id: '10', name: 'Michael', image: '/images/michael.jpg' },
  ];

  const ateliers = [
    { id: 'dumplings', emoji: '🥟', titleFr: 'Raviolis', time: '14h00 - 16h00', description: 'Apprenons ensemble à faire des raviolis traditionnels.' },
    { id: 'spring-rolls', emoji: '🌯', titleFr: 'Rouleaux de printemps', time: '15h00 - 17h00', description: 'Maîtrise l\'art du rouleau parfait.' },
    { id: 'prep', emoji: '🔪', titleFr: 'Préparation', time: '13h00 - 15h00', description: 'Préparation des ingrédients.' },
    { id: 'dessert', emoji: '🍡', titleFr: 'Desserts', time: '16h00 - 18h00', description: 'Tangyuan et douceurs.' }
  ];

  const activities = [
    { id: 'zoo', emoji: '🦁', titleFr: 'Zoo de Thoiry', description: 'Balade digestive au zoo !', price: '~20€/personne' },
    { id: 'walk', emoji: '🌳', titleFr: 'Balade en forêt', description: 'Promenade tranquille.', price: 'Gratuit' }
  ];

  const games = [
    { id: 'mahjong', emoji: '🀄', titleFr: 'Mahjong', description: 'Mahjong classique.', difficulty: 'Tous niveaux' },
    { id: 'boardgames', emoji: '🎲', titleFr: 'Jeux de société', description: 'Loup-garou, etc.', difficulty: 'Facile' },
    { id: 'karaoke', emoji: '🎤', titleFr: 'Karaoké', description: 'Chansons...', difficulty: 'Courage requis 😂' },
    { id: 'cards', emoji: '🃏', titleFr: 'Jeux de cartes', description: 'Jeux de cartes.', difficulty: 'Tous niveaux' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginForm.username, password: loginForm.password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoggedIn(true);
        setCurrentUser(loginForm.username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', loginForm.username);
        setLoginError('');
      } else {
        setLoginError(data.error || 'Erreur de connexion');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Erreur de connexion au serveur');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Es-tu sûr(e) de vouloir te déconnecter ?')) {
      setIsLoggedIn(false);
      setCurrentUser('');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      setSelectedAteliers([]);
      setSelectedActivities([]);
      setSelectedGames([]);
    }
  };

  const toggleSelection = (id, array, setArray) => {
    if (array.includes(id)) {
      setArray(array.filter(item => item !== id));
    } else {
      setArray([...array, id]);
    }
  };

  const handleProposalSubmit = async (type, proposal, setProposal, setShowForm) => {
    if (!proposal) {
      alert('Merci de remplir le champ !');
      return;
    }
    const subject = `Nouvelle proposition ${type} - ${currentUser}`;
    const body = `Nom: ${currentUser}\n${type}: ${proposal}`;
    window.location.href = `mailto:yiching.uhc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setProposal('');
    setShowForm(false);
    alert('Merci ! Votre proposition a été envoyée.');
  };

  const handleValidateSelections = (type) => {
    let selections = [];
    let typeName = '';
    
    if (type === 'ateliers') {
      selections = selectedAteliers.map(id => ateliers.find(a => a.id === id)?.titleFr);
      typeName = 'Ateliers';
    } else if (type === 'activities') {
      selections = selectedActivities.map(id => activities.find(a => a.id === id)?.titleFr);
      typeName = 'Activités';
    } else if (type === 'games') {
      selections = selectedGames.map(id => games.find(g => g.id === id)?.titleFr);
      typeName = 'Jeux';
    }
    
    if (selections.length === 0) {
      alert('Tu n\'as rien sélectionné !');
      return;
    }
    
    const subject = `${typeName} sélectionné(s) - ${currentUser}`;
    const body = `Nom: ${currentUser}\n\n${typeName}:\n${selections.join('\n')}`;
    window.location.href = `mailto:yiching.uhc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    alert(`Merci ! Tes ${typeName.toLowerCase()} ont été envoyé(s) ! 🎊`);
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

      {/* Login Modal - Semi-transparent, can see and scroll content */}
      {!isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" style={{ pointerEvents: 'none' }} />
          
          <div className="relative my-auto">
            <div className="relative bg-gradient-to-br from-red-900/95 to-amber-900/95 backdrop-blur-xl border-2 border-yellow-500/60 rounded-3xl p-8 lg:p-12 max-w-md w-full shadow-2xl animate-fadeIn">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-3xl blur-2xl -z-10" />
              
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-bounce">🧧</div>
                <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-200 to-amber-300 bg-clip-text text-transparent mb-2">
                  春节聚会
                </h2>
                <p className="text-yellow-100 text-lg">Connecte-toi pour continuer</p>
                <p className="text-yellow-200/60 text-sm mt-2">Tu peux voir le contenu en arrière-plan 👀</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-yellow-200 font-semibold mb-2">Nom d&apos;utilisateur</label>
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border-2 border-yellow-600/40 text-yellow-100 placeholder-yellow-600/50 focus:border-yellow-500 focus:outline-none transition-all"
                    placeholder="Entre ton nom"
                    required
                    disabled={isLoggingIn}
                  />
                </div>

                <div>
                  <label className="block text-yellow-200 font-semibold mb-2">Mot de passe</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border-2 border-yellow-600/40 text-yellow-100 placeholder-yellow-600/50 focus:border-yellow-500 focus:outline-none transition-all"
                    placeholder="Mot de passe"
                    required
                    disabled={isLoggingIn}
                  />
                </div>

                {loginError && (
                  <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-red-950 font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? '⏳ Connexion...' : '🎊 Entrer'}
                </button>
              </form>

              <div className="mt-6 text-center text-yellow-200/60 text-sm">
                <p>Mot de passe fourni dans l&apos;invitation</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User badge - only when logged in */}
      {isLoggedIn && (
        <div className="fixed top-4 right-4 lg:top-8 lg:right-8 z-50 animate-fadeIn">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-br from-red-900/90 to-amber-900/90 backdrop-blur-sm border-2 border-yellow-500/60 rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg flex items-center gap-2 lg:gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-red-950 font-black text-sm">
                {currentUser.charAt(0).toUpperCase()}
              </div>
              <span className="text-yellow-100 font-bold text-base lg:text-lg hidden sm:inline">{currentUser}</span>
              <button
                onClick={handleLogout}
                className="ml-1 lg:ml-2 text-red-300 hover:text-red-100 transition-colors text-lg lg:text-xl"
                title="Se déconnecter"
              >
                🚪
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-12 lg:py-20 ${!isLoggedIn ? 'pointer-events-none select-none' : ''}`}>
        <div className="max-w-7xl mx-auto">
          
          {/* Hero section */}
          <div className="text-center mb-16 lg:mb-24 animate-fadeIn">
            <div className="mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-4 lg:gap-8 mb-8 lg:mb-10 flex-wrap justify-center">
                <span className="text-4xl lg:text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🎏</span>
                <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black bg-gradient-to-r from-yellow-200 via-amber-100 to-red-200 bg-clip-text text-transparent drop-shadow-2xl tracking-tight leading-tight">
                  春节聚会
                </h1>
                <span className="text-4xl lg:text-6xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎏</span>
              </div>
              
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-red-600 blur-2xl opacity-30" />
                <p className="relative text-2xl sm:text-3xl lg:text-4xl font-light text-yellow-100 tracking-wide px-4">
                  Célébrons ensemble le Nouvel An Chinois
                </p>
              </div>
            </div>

            {/* Date and Location */}
            <div className="max-w-5xl mx-auto mb-12 lg:mb-16">
              <div className="relative">
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent -translate-y-1/2" />
                
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 relative">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-gradient-to-br from-red-900/50 to-amber-900/50 backdrop-blur-sm border border-yellow-500/40 rounded-3xl p-8 lg:p-10 hover:border-yellow-400/60 transition-all duration-300">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 mb-6 shadow-lg shadow-yellow-500/50">
                          <span className="text-3xl lg:text-4xl">📅</span>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-yellow-200 mb-4 tracking-wide">QUAND ?</h3>
                        <div className="space-y-2 mb-6">
                          <p className="text-2xl lg:text-3xl font-black text-yellow-50">Samedi 14 Février</p>
                          <p className="text-lg lg:text-xl text-yellow-200/80">2026</p>
                          <div className="inline-block px-4 py-2 rounded-full bg-red-900/40 border border-yellow-500/30 mt-2">
                            <p className="text-sm lg:text-base text-amber-200">农历正月十八</p>
                          </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-red-950 font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 active:scale-95 text-sm lg:text-base">
                          📲 Ajouter au calendrier
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-gradient-to-br from-red-900/50 to-amber-900/50 backdrop-blur-sm border border-red-500/40 rounded-3xl p-8 lg:p-10 hover:border-red-400/60 transition-all duration-300">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-red-600 to-red-700 mb-6 shadow-lg shadow-red-500/50">
                          <span className="text-3xl lg:text-4xl">📍</span>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-yellow-200 mb-4 tracking-wide">OÙ ?</h3>
                        <div className="space-y-2 mb-6">
                          <p className="text-xl lg:text-2xl font-bold text-yellow-50">20 rue de la Haie Boulland</p>
                          <p className="text-lg lg:text-xl text-yellow-200/80">78930 Guerville</p>
                          <div className="inline-block px-4 py-2 rounded-full bg-red-900/40 border border-red-500/30 mt-2">
                            <p className="text-sm lg:text-base text-amber-200">🚗 30 min de Paris</p>
                          </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-yellow-100 font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 active:scale-95 text-sm lg:text-base">
                          🗺️ Voir l&apos;itinéraire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main invitation */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/50 to-red-900/50 backdrop-blur-md border-2 border-yellow-500/40 p-6 lg:p-12 shadow-2xl max-w-4xl mx-auto">
              <div className="absolute top-0 right-0 text-7xl lg:text-9xl opacity-10 -rotate-12">🧧</div>
              <div className="relative">
                <div className="flex items-start gap-3 lg:gap-4 mb-6">
                  <span className="text-3xl lg:text-5xl animate-pulse">✨</span>
                  <div className="text-left">
                    <h2 className="text-2xl lg:text-4xl font-black text-yellow-200 mb-2 lg:mb-3 leading-tight">
                      Préparons le dîner ensemble !
                    </h2>
                    <p className="text-lg lg:text-xl text-amber-100 font-medium">或者不一起也行 😆</p>
                  </div>
                </div>
                <div className="bg-black/30 rounded-2xl p-4 lg:p-6 mb-6 border border-yellow-600/20">
                  <p className="text-sm lg:text-lg text-red-50 leading-relaxed space-y-1 lg:space-y-2">
                    <span className="block">一个人备菜真的会累到怀疑人生 😭</span>
                    <span className="block font-bold text-yellow-200">所以今年决定:</span>
                    <span className="block text-base lg:text-xl">🎊 开放春节厨房合伙人席位!</span>
                    <span className="block mt-2 lg:mt-4">欢迎提前来一起:</span>
                    <span className="block">🥬 洗菜切菜 | 🥟 包饺子 | 🍜 做春卷</span>
                    <span className="block">😋 偷吃 | 💬 聊天 | 🍵 喝茶</span>
                    <span className="block mt-2 lg:mt-4 text-amber-200">也欢迎自带你最爱的食材或秘密武器!</span>
                    <span className="block font-bold text-yellow-300 text-base lg:text-xl mt-2 lg:mt-4">一起分担,一起热闹,年味直接翻倍 🏮🧨</span>
                  </p>
                </div>
                <button className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-red-950 font-black text-lg lg:text-xl py-3 lg:py-4 px-6 lg:px-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 active:scale-95 hover:scale-105">
                  🍽️ 看看准备了啥菜 | Voir le menu
                </button>
              </div>
            </div>
          </div>

          {/* Three sections */}
          <div className="max-w-4xl mx-auto space-y-8 mb-12 lg:mb-20">
            
            {/* ATELIERS */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950/70 to-amber-950/70 backdrop-blur-md border-2 border-red-500/40 shadow-2xl">
              <div className="p-6 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl lg:text-5xl">👨‍🍳</span>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-black text-yellow-200">Ateliers</h3>
                    <p className="text-base lg:text-lg text-amber-200">工作坊 • Choisis tes préférés !</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {ateliers.map((atelier) => {
                    const isSelected = selectedAteliers.includes(atelier.id);
                    return (
                      <button
                        key={atelier.id}
                        onClick={() => toggleSelection(atelier.id, selectedAteliers, setSelectedAteliers)}
                        className={`text-left rounded-xl p-4 transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-yellow-500 to-amber-600 scale-105 shadow-lg'
                            : 'bg-black/40 border border-yellow-600/30 hover:border-yellow-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{atelier.emoji}</span>
                            <div>
                              <h4 className={`text-lg font-bold ${isSelected ? 'text-red-950' : 'text-yellow-200'}`}>
                                {atelier.titleFr}
                              </h4>
                              <p className={`text-sm ${isSelected ? 'text-red-900' : 'text-amber-200'}`}>
                                {atelier.time}
                              </p>
                            </div>
                          </div>
                          {isSelected && <span className="text-2xl">✓</span>}
                        </div>
                        <p className={`text-sm ${isSelected ? 'text-red-950/90' : 'text-red-100'}`}>
                          {atelier.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Validate button ABOVE propose */}
                {selectedAteliers.length > 0 && (
                  <button
                    onClick={() => handleValidateSelections('ateliers')}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95 mb-3"
                  >
                    ✅ Valider mes ateliers ({selectedAteliers.length})
                  </button>
                )}

                {!showAtelierForm && (
                  <button
                    onClick={() => setShowAtelierForm(true)}
                    className="w-full bg-gradient-to-r from-amber-700 to-orange-700 text-yellow-100 font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95"
                  >
                    💡 Proposer un autre atelier
                  </button>
                )}

                {showAtelierForm && (
                  <div className="bg-black/50 rounded-xl p-6 border border-yellow-500/40 animate-fadeIn">
                    <h4 className="text-xl font-bold text-yellow-300 mb-4">Propose ton atelier !</h4>
                    <div className="space-y-4">
                      <textarea
                        placeholder="Décris ton atelier..."
                        value={atelierProposal}
                        onChange={(e) => setAtelierProposal(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-yellow-600/30 text-yellow-100 placeholder-yellow-600/50 focus:border-yellow-500 focus:outline-none resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleProposalSubmit('Atelier', atelierProposal, setAtelierProposal, setShowAtelierForm)}
                          className="flex-1 bg-gradient-to-r from-yellow-600 to-amber-600 text-red-950 font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          ✉️ Envoyer
                        </button>
                        <button
                          onClick={() => setShowAtelierForm(false)}
                          className="px-6 py-3 rounded-lg bg-red-900/50 text-red-200 hover:bg-red-900/70 transition-all duration-300"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ACTIVITIES */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950/70 to-amber-950/70 backdrop-blur-md border-2 border-red-500/40 shadow-2xl">
              <div className="p-6 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl lg:text-5xl">🎯</span>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-black text-yellow-200">Activités</h3>
                    <p className="text-base lg:text-lg text-amber-200">活动 • Que faire le lendemain ?</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {activities.map((activity) => {
                    const isSelected = selectedActivities.includes(activity.id);
                    return (
                      <button
                        key={activity.id}
                        onClick={() => toggleSelection(activity.id, selectedActivities, setSelectedActivities)}
                        className={`text-left rounded-xl p-4 transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-yellow-500 to-amber-600 scale-105 shadow-lg'
                            : 'bg-black/40 border border-yellow-600/30 hover:border-yellow-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{activity.emoji}</span>
                            <div>
                              <h4 className={`text-lg font-bold ${isSelected ? 'text-red-950' : 'text-yellow-200'}`}>
                                {activity.titleFr}
                              </h4>
                              <p className={`text-sm ${isSelected ? 'text-red-900' : 'text-amber-200'}`}>
                                {activity.price}
                              </p>
                            </div>
                          </div>
                          {isSelected && <span className="text-2xl">✓</span>}
                        </div>
                        <p className={`text-sm ${isSelected ? 'text-red-950/90' : 'text-red-100'}`}>
                          {activity.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {selectedActivities.length > 0 && (
                  <button
                    onClick={() => handleValidateSelections('activities')}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95 mb-3"
                  >
                    ✅ Valider mes activités ({selectedActivities.length})
                  </button>
                )}

                {!showActivityForm && (
                  <button
                    onClick={() => setShowActivityForm(true)}
                    className="w-full bg-gradient-to-r from-amber-700 to-orange-700 text-yellow-100 font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95"
                  >
                    💡 Proposer une autre activité
                  </button>
                )}

                {showActivityForm && (
                  <div className="bg-black/50 rounded-xl p-6 border border-yellow-500/40 animate-fadeIn">
                    <h4 className="text-xl font-bold text-yellow-300 mb-4">Propose ton activité !</h4>
                    <div className="space-y-4">
                      <textarea
                        placeholder="Décris ton activité..."
                        value={activityProposal}
                        onChange={(e) => setActivityProposal(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-yellow-600/30 text-yellow-100 placeholder-yellow-600/50 focus:border-yellow-500 focus:outline-none resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleProposalSubmit('Activité', activityProposal, setActivityProposal, setShowActivityForm)}
                          className="flex-1 bg-gradient-to-r from-yellow-600 to-amber-600 text-red-950 font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          ✉️ Envoyer
                        </button>
                        <button
                          onClick={() => setShowActivityForm(false)}
                          className="px-6 py-3 rounded-lg bg-red-900/50 text-red-200 hover:bg-red-900/70 transition-all duration-300"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* GAMES */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950/70 to-amber-950/70 backdrop-blur-md border-2 border-red-500/40 shadow-2xl">
              <div className="p-6 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl lg:text-5xl">🎮</span>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-black text-yellow-200">Jeux</h3>
                    <p className="text-base lg:text-lg text-amber-200">游戏 • On joue à quoi ?</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {games.map((game) => {
                    const isSelected = selectedGames.includes(game.id);
                    return (
                      <button
                        key={game.id}
                        onClick={() => toggleSelection(game.id, selectedGames, setSelectedGames)}
                        className={`text-left rounded-xl p-4 transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-yellow-500 to-amber-600 scale-105 shadow-lg'
                            : 'bg-black/40 border border-yellow-600/30 hover:border-yellow-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{game.emoji}</span>
                            <div>
                              <h4 className={`text-lg font-bold ${isSelected ? 'text-red-950' : 'text-yellow-200'}`}>
                                {game.titleFr}
                              </h4>
                              <p className={`text-sm ${isSelected ? 'text-red-900' : 'text-amber-200'}`}>
                                {game.difficulty}
                              </p>
                            </div>
                          </div>
                          {isSelected && <span className="text-2xl">✓</span>}
                        </div>
                        <p className={`text-sm ${isSelected ? 'text-red-950/90' : 'text-red-100'}`}>
                          {game.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {selectedGames.length > 0 && (
                  <button
                    onClick={() => handleValidateSelections('games')}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95 mb-3"
                  >
                    ✅ Valider mes jeux ({selectedGames.length})
                  </button>
                )}

                {!showGameForm && (
                  <button
                    onClick={() => setShowGameForm(true)}
                    className="w-full bg-gradient-to-r from-amber-700 to-orange-700 text-yellow-100 font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95"
                  >
                    💡 Proposer un autre jeu
                  </button>
                )}

                {showGameForm && (
                  <div className="bg-black/50 rounded-xl p-6 border border-yellow-500/40 animate-fadeIn">
                    <h4 className="text-xl font-bold text-yellow-300 mb-4">Propose ton jeu !</h4>
                    <div className="space-y-4">
                      <textarea
                        placeholder="Décris ton jeu..."
                        value={gameProposal}
                        onChange={(e) => setGameProposal(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-yellow-600/30 text-yellow-100 placeholder-yellow-600/50 focus:border-yellow-500 focus:outline-none resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleProposalSubmit('Jeu', gameProposal, setGameProposal, setShowGameForm)}
                          className="flex-1 bg-gradient-to-r from-yellow-600 to-amber-600 text-red-950 font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          ✉️ Envoyer
                        </button>
                        <button
                          onClick={() => setShowGameForm(false)}
                          className="px-6 py-3 rounded-lg bg-red-900/50 text-red-200 hover:bg-red-900/70 transition-all duration-300"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* HOSTS SECTION */}
          <div className="mb-12 lg:mb-20 max-w-5xl mx-auto">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-4xl font-black inline-flex items-center gap-3 flex-wrap justify-center">
                <span className="text-3xl lg:text-4xl">👨‍🍳</span>
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  Nos Hôtes ({hosts.length})
                </span>
              </h2>
            </div>

            <div className="flex justify-center gap-8 lg:gap-12 flex-wrap">
              {hosts.map((host, index) => (
                <div 
                  key={host.id}
                  className="text-center animate-fadeIn group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-3 rounded-full border-4 border-orange-500/60 overflow-hidden group-hover:border-orange-400 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Image src={host.image} alt={host.name} fill className="object-cover" />
                  </div>
                  <p className="text-lg lg:text-xl font-bold text-orange-300">{host.name}</p>
                  <p className="text-sm lg:text-base text-amber-200/80">Hôte</p>
                </div>
              ))}
            </div>
          </div>

          {/* INVITES SECTION */}
          <div className="mb-12 lg:mb-20 max-w-5xl mx-auto">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-4xl font-black inline-flex items-center gap-3 flex-wrap justify-center">
                <span className="text-3xl lg:text-4xl">👥</span>
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Nos Invités ({invites.length})
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 lg:gap-6">
              {invites.map((invite, index) => (
                <div 
                  key={invite.id}
                  className="text-center animate-fadeIn group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-2 rounded-full border-3 border-yellow-500/60 overflow-hidden group-hover:border-yellow-400 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Image src={invite.image} alt={invite.name} fill className="object-cover" />
                  </div>
                  <p className="text-xs lg:text-sm font-bold text-yellow-300">{invite.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-yellow-200/60 text-xs lg:text-sm max-w-2xl mx-auto">
            <p className="mb-2">🧧 新年快乐 🧧 Bonne Année Chinoise 🧧</p>
            <p>Questions ? Envoie-moi un message !</p>
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