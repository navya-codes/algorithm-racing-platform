import React, { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Trophy, MessageCircle, Timer } from 'lucide-react';
const AlgorithmRacingPlatform = () => {
  const [raceState, setRaceState] = useState('setup');
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [, setRaceData] = useState([]);
  const [raceProgress, setRaceProgress] = useState({});
  const [winners, setWinners] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { user: "RaceBot", message: "Welcome to Algorithm Racing! Pick your champions! 🏁" },
    { user: "SpeedCoder", message: "Quick Sort never lets me down!" },
    { user: "AlgoFan", message: "Merge Sort is so consistent though..." }
  ]);
  const [raceTime, setRaceTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const algorithms = [
    // Classic Sorting Algorithms
    { 
      name: 'Bubble Sort', 
      color: '#3B82F6', 
      speed: 0.3, 
      description: 'Slow but steady',
      emoji: '🐌',
      category: 'Sorting'
    },
    { 
      name: 'Quick Sort', 
      color: '#1E40AF', 
      speed: 0.95, 
      description: 'Lightning fast',
      emoji: '⚡',
      category: 'Sorting'
    },
    { 
      name: 'Merge Sort', 
      color: '#2563EB', 
      speed: 0.85, 
      description: 'Reliable performer',
      emoji: '🔄',
      category: 'Sorting'
    },
    { 
      name: 'Heap Sort', 
      color: '#1D4ED8', 
      speed: 0.75, 
      description: 'Steady climber',
      emoji: '🏔️',
      category: 'Sorting'
    },
    { 
      name: 'Selection Sort', 
      color: '#60A5FA', 
      speed: 0.4, 
      description: 'Methodical approach',
      emoji: '🎯',
      category: 'Sorting'
    },

    //advanced sorting
    { 
      name: 'Insertion Sort', 
      color: '#93C5FD', 
      speed: 0.5, 
      description: 'Good with small data',
      emoji: '📝',
      category: 'Sorting'
    },

    { 
      name: 'Heap Sort', 
      color: '#1D4ED8', 
      speed: 0.75, 
      description: 'Steady climber',
      emoji: '🏔️',
      category: 'Sorting'
    },
    { 
      name: 'Selection Sort', 
      color: '#60A5FA', 
      speed: 0.4, 
      description: 'Methodical approach',
      emoji: '🎯',
      category: 'Sorting'
    },
    { 
      name: 'Insertion Sort', 
      color: '#93C5FD', 
      speed: 0.5, 
      description: 'Good with small data',
      emoji: '📝',
      category: 'Sorting'
    },

    //search algorithms
    { 
      name: 'Binary Search', 
      color: '#059669', 
      speed: 0.95, 
      description: 'Divide and find',
      emoji: '🔍',
      category: 'Search'
    },
    { 
      name: 'Linear Search', 
      color: '#10B981', 
      speed: 0.35, 
      description: 'One by one explorer',
      emoji: '🔦',
      category: 'Search'
    },
    { 
      name: 'Hash Search', 
      color: '#047857', 
      speed: 0.98, 
      description: 'Instant access wizard',
      emoji: '#️⃣',
      category: 'Search'
    },
    { 
      name: 'Interpolation Search', 
      color: '#065F46',
      speed: 0.89, 
      description: 'Smart guesser',
      emoji: '🎯',
      category: 'Search'
    },

    //graph algorithms
    { 
      name: 'Dijkstra', 
      color: '#EA580C',
      speed: 0.78, 
      description: 'Shortest path finder',
      emoji: '🗺️',
      category: 'Graph'
    },
    { 
      name: 'A* Search', 
      color: '#DC2626' ,
      speed: 0.85, 
      description: 'Heuristic pathfinder',
      emoji: '🧭',
      category: 'Graph'
    },
    { 
      name: 'BFS', 
      color: '#F97316', 
      speed: 0.72, 
      description: 'Breadth-first explorer',
      emoji: '🌊',
      category: 'Graph'
    },
    { 
      name: 'DFS', 
      color: '#FB923C', 
      speed: 0.70, 
      description: 'Depth-first diver',
      emoji: '🕳️',
      category: 'Graph'
    },

    //tree algorithms
    { 
      name: 'AVL Tree', 
      color: '#92400E', 
      speed: 0.83, 
      description: 'Self-balancing master',
      emoji: '⚖️',
      category: 'Tree'
    },
    { 
      name: 'Red-Black Tree', 
      color: '#B91C1C',  
      speed: 0.81, 
      description: 'Color-coded balancer',
      emoji: '🔴',
      category: 'Tree'
    },
    { 
      name: 'B-Tree', 
      color: '#A16207',  
      speed: 0.79, 
      description: 'Multi-way organizer',
      emoji: '🌳',
      category: 'Tree'
    },
    // dynamic programming
    { 
      name: 'Fibonacci DP', 
       color: '#7C3AED',  
      speed: 0.77, 
      description: 'Memory master',
      emoji: '🧠',
      category: 'Dynamic'
    },
    { 
      name: 'Knapsack DP', 
      color: '#8B5CF6', 
      speed: 0.74, 
      description: 'Optimization expert',
      emoji: '🎒',
      category: 'Dynamic'
    },
    // String Algorithms
    { 
      name: 'KMP Search', 
      color: '#DB2777', 
      speed: 0.86, 
      description: 'Pattern matching pro',
      emoji: '🔤',
      category: 'String'
    },
    { 
      name: 'Boyer-Moore', 
      color: '#BE185D', 
      speed: 0.91, 
      description: 'Backward searcher',
      emoji: '⏪',
      category: 'String'
    }
  ];

  const raceTypes = [
    { name: 'Sorting Sprint', description: 'Sort 50 random numbers', emoji: '🏃‍♂️', category: 'Sorting' , color: '#3B82F6' },
    { name: 'Big Data Marathon', description: 'Sort 500 numbers', emoji: '🏃‍♀️', category: 'Sorting' , color: '#1E40AF' },
    { name: 'Reverse Challenge', description: 'Sort reverse-ordered data', emoji: '🔄', category: 'Sorting', color: '#2563EB' },
    { name: 'Search & Destroy', description: 'Find target in 100 numbers', emoji: '🔍', category: 'Search' , color: '#059669' },
    { name: 'Pathfinding Race', description: 'Navigate through maze', emoji: '🗺️', category: 'Graph' , color: '#EA580C' },
    { name: 'Tree Building Contest', description: 'Build balanced tree', emoji: '🌳', category: 'Tree' , color: '#92400E'},
    { name: 'String Match Challenge', description: 'Find pattern in text', emoji: '🔤', category: 'String' , color: '#DB2777' },
    { name: 'DP Optimization', description: 'Solve complex problem', emoji: '🧠', category: 'Dynamic' , color: '#7C3AED' }
  ];

  const [selectedRaceType, setSelectedRaceType] = useState(raceTypes[0]);

  // Category colors for better visual organization
  const categoryColors = {
    'All': '#6B7280',
    'Sorting': '#3B82F6',
    'Search': '#059669',
    'Graph': '#EA580C',
    'Tree': '#92400E',
    'Dynamic': '#7C3AED',
    'String': '#DB2777'
  };

  // Filter algorithms based on category and race type
  const filteredAlgorithms = algorithms.filter(algo => {
    if (filterCategory === 'All') return true;
    return algo.category === filterCategory;
  }).filter(algo => {
    // Show relevant algorithms for the race type
    if (selectedRaceType.category === 'All') return true;
    return algo.category === selectedRaceType.category;
  });

   // Generate race data based on type
  const generateRaceData = useCallback(() => {
    let size = selectedRaceType.name.includes('Big Data') ? 500 : 50;
    let newData = [];
    
    if (selectedRaceType.name.includes('Reverse')) {
      for (let i = size; i > 0; i--) {
        newData.push(i);
      }
    } else {
      for (let i = 0; i < size; i++) {
        newData.push(Math.floor(Math.random() * 100) + 1);
      }
    }
    
    setRaceData(newData);
  }, [selectedRaceType]);

  //timer effect

  useEffect(() => {
    let interval = null;
    if (isRunning && raceState === 'racing') {
      interval = setInterval(() => {
        setRaceTime(time => time + 0.1);
      }, 100);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, raceState]);

  // Algorithm selection
  const toggleAlgorithm = (algo) => {
    if (selectedAlgorithms.find(a => a.name === algo.name)) {
      setSelectedAlgorithms(selectedAlgorithms.filter(a => a.name !== algo.name));
    } else if (selectedAlgorithms.length < 6) {
      setSelectedAlgorithms([...selectedAlgorithms, algo]);
    }
  };
  // Start race
  const startRace = () => {
    if (selectedAlgorithms.length < 2) return;
    
    generateRaceData();
    setRaceState('racing');
    setIsRunning(true);
    setRaceTime(0);
    setWinners([]);
    
    // Initialize progress
    const initialProgress = {};
    selectedAlgorithms.forEach(algo => {
      initialProgress[algo.name] = 0;
    });
    setRaceProgress(initialProgress);

    // simulate race progress

    const raceInterval = setInterval(() => {
      setRaceProgress(prev => {
        const newProgress = { ...prev };
        let raceFinished = false;
        
        selectedAlgorithms.forEach(algo => {
          if (newProgress[algo.name] < 100) {
            // Add some randomness to make it exciting
            const speedVariation = 0.8 + Math.random() * 0.4;
            const progressIncrement = algo.speed * speedVariation * (2 + Math.random());
            newProgress[algo.name] = Math.min(100, newProgress[algo.name] + progressIncrement);
            
            // Check if this algorithm finished
            if (newProgress[algo.name] >= 100 && !winners.find(w => w.name === algo.name)) {
              setWinners(prev => [...prev, { ...algo, position: prev.length + 1 }]);
              
              // Add celebration message
              setChatMessages(prev => [...prev, {
                user: "RaceBot",
                message: `🏆 ${algo.name} ${algo.emoji} finished in position ${prev.length + 1}!`
              }]);
            }
          }
        });

// Check if race is finished
        if (Object.values(newProgress).every(progress => progress >= 100)) {
          raceFinished = true;
        }
        
        if (raceFinished) {
          clearInterval(raceInterval);
          setRaceState('finished');
          setIsRunning(false);
        }
        
        return newProgress;
      });
    }, 100);
  };


// Reset race
  const resetRace = () => {
    setRaceState('setup');
    setRaceProgress({});
    setWinners([]);
    setRaceTime(0);
    setIsRunning(false);
    setChatMessages(prev => [...prev, {
      user: "RaceBot",
      message: "Ready for another race! Choose your algorithms! 🏁"
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-4">
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Algorithm Racing Platform
          </span> 🏁
        </h1>
        <p className="text-xl text-blue-200">Where algorithms compete for glory!</p>
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <div className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            🎯 Choose up to 6 algorithms
          </div>
          <div className="bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
            🏁 Watch them race
          </div>
          <div className="bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-400/30">
            🏆 See who wins
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

         {/* Left Panel - Algorithm Selection & Race Setup */}
        <div className="lg:col-span-1 space-y-6">

       {/* Race Type Selection - Enhanced */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Timer className="mr-2 text-yellow-400" /> Race Type
            </h3>
            <div className="space-y-3">
              {raceTypes.map(type => (
                <button
                  key={type.name}
                  onClick={() => {
                    setSelectedRaceType(type);
                    setFilterCategory(type.category);
                    setSelectedAlgorithms([]);
                  }}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${
                    selectedRaceType.name === type.name
                      ? 'ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/20'
                      : 'hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: selectedRaceType.name === type.name 
                      ? `${type.color}20` 
                      : 'rgba(255,255,255,0.05)',
                    borderLeft: `4px solid ${type.color}`
                  }}
                >
                  <div className="font-semibold text-lg">{type.emoji} {type.name}</div>
                  <div className="text-sm text-gray-300 mt-1">{type.description}</div>
                  <div className="text-xs mt-2">
                    <span 
                      className="px-2 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: type.color }}
                    >
                      {type.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Algorithm Selection - Enhanced */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
              <span>Choose Your Racers</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                selectedAlgorithms.length >= 2 
                  ? 'bg-green-500/30 text-green-300 border border-green-400' 
                  : 'bg-red-500/30 text-red-300 border border-red-400'
              }`}>
                {selectedAlgorithms.length}/6
              </span>
            </h3>
            
            {/* Category Filter - Enhanced */}
            <div className="mb-4">
              <p className="text-sm text-gray-300 mb-2">Filter by category:</p>
              <div className="flex flex-wrap gap-2">
                {['All', 'Sorting', 'Search', 'Graph', 'Tree', 'Dynamic', 'String'].map(category => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 transform hover:scale-105 ${
                      filterCategory === category
                        ? 'text-white shadow-lg'
                        : 'text-gray-300 hover:text-white border border-white/20 hover:border-white/40'
                    }`}
                    style={{
                      backgroundColor: filterCategory === category 
                        ? categoryColors[category] 
                        : 'rgba(255,255,255,0.05)'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
              {filteredAlgorithms.map(algo => {
                const isSelected = selectedAlgorithms.find(a => a.name === algo.name);
                const isDisabled = !isSelected && selectedAlgorithms.length >= 6;
                
                return (
                  <button
                    key={algo.name}
                    onClick={() => toggleAlgorithm(algo)}
                    disabled={isDisabled}
                    className={`p-4 rounded-lg transition-all duration-200 text-left transform ${
                      isSelected
                        ? 'ring-2 shadow-lg scale-105'
                        : isDisabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:scale-102 hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: isSelected 
                        ? `${algo.color}25` 
                        : 'rgba(255,255,255,0.05)',
                      borderLeft: `4px solid ${algo.color}`,
                      ringColor: isSelected ? algo.color : 'transparent'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-bold text-sm flex items-center">
                          <span className="text-lg mr-2">{algo.emoji}</span>
                          {algo.name}
                        </div>
                        <div className="text-xs text-gray-300 mt-1">{algo.description}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span 
                            className="text-xs px-2 py-1 rounded-full text-white font-medium"
                            style={{ backgroundColor: categoryColors[algo.category] }}
                          >
                            {algo.category}
                          </span>
                          <div className="text-xs text-gray-400">
                            Speed: {Math.round(algo.speed * 100)}%
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl ml-3">
                        {isSelected ? '✅' : '⭕'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Race Controls - Enhanced */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex flex-col gap-4">
              {raceState === 'setup' && (
                <>
                  {selectedAlgorithms.length < 2 && (
                    <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-3 text-center">
                      <p className="text-yellow-300 text-sm">
                        ⚠️ Select at least 2 algorithms to start racing!
                      </p>
                    </div>
                  )}
                  <button
                    onClick={startRace}
                    disabled={selectedAlgorithms.length < 2}
                    className={`py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 transform ${
                      selectedAlgorithms.length >= 2
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 shadow-lg shadow-green-500/25'
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <Play className="inline-block mr-2" />
                    START RACE! 🏁
                  </button>
                </>
              )}
              
              {(raceState === 'racing' || raceState === 'finished') && (
                <button
                  onClick={resetRace}
                  className="py-4 px-6 rounded-lg font-bold text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/25"
                >
                  <RotateCcw className="inline-block mr-2" />
                  NEW RACE 🔄
                </button>
              )}
              
              <div className="text-center bg-gray-800/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">⏱️ {raceTime.toFixed(1)}s</div>
                <div className="text-sm text-gray-300">Race Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Race Track */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Race Track - Enhanced */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              🏁 Race Track 🏁
            </h3>
            
            {selectedAlgorithms.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-6xl mb-4">🏎️</div>
                <p className="text-xl">Select algorithms to start racing!</p>
                <p className="text-sm mt-2">Choose your champions from the left panel</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedAlgorithms.map((algo, index) => (
                  <div key={algo.name} className="relative">
                    {/* Track */}
                    <div 
                      className="h-20 rounded-lg border-2 relative overflow-hidden shadow-lg"
                      style={{
                        backgroundColor: '#1F2937',
                        borderColor: algo.color,
                        boxShadow: `0 4px 20px ${algo.color}20`
                      }}
                    >
                      {/* Track Lines */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent" 
                             style={{ clipPath: 'polygon(0 45%, 100% 45%, 100% 55%, 0 55%)' }}></div>
                      </div>
                      
                      {/* Finish Line */}
                      <div className="absolute right-0 top-0 h-full w-3 bg-gradient-to-b from-white via-gray-300 to-white shadow-lg"></div>
                      
                      {/* Algorithm Car */}
                      <div 
                        className="absolute top-2 h-16 w-16 rounded-lg flex items-center justify-center text-3xl transition-all duration-300 shadow-xl border-2 border-white/30"
                        style={{
                          backgroundColor: algo.color,
                          left: `${Math.min((raceProgress[algo.name] || 0) * 0.88, 88)}%`,
                          transform: raceProgress[algo.name] >= 100 ? 'scale(1.2) rotate(5deg)' : 'scale(1)',
                          boxShadow: `0 8px 25px ${algo.color}50`
                        }}
                      >
                        {algo.emoji}
                      </div>
                      
                      {/* Progress Bar */}
                      <div 
                        className="absolute bottom-0 h-2 transition-all duration-300 rounded-full"
                        style={{
                          backgroundColor: algo.color,
                          width: `${raceProgress[algo.name] || 0}%`,
                          boxShadow: `0 0 10px ${algo.color}`
                        }}
                      ></div>
                    </div>
                    
                    {/* Algorithm Info */}
                    <div className="flex justify-between items-center mt-3 px-2">
                      <span className="font-bold text-lg" style={{ color: algo.color }}>
                        {algo.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-300">
                          Speed: {Math.round(algo.speed * 100)}%
                        </span>
                        <span 
                          className="font-bold text-lg px-3 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${algo.color}30`,
                            color: algo.color,
                            border: `1px solid ${algo.color}`
                          }}
                        >
                          {Math.round(raceProgress[algo.name] || 0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Leaderboard - Enhanced */}
          {winners.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="mr-2 text-yellow-400" /> 🎉 Race Results 🎉
              </h3>
              <div className="space-y-3">
                {winners.map((winner, index) => (
                  <div 
                    key={winner.name}
                    className="flex items-center justify-between p-4 rounded-lg border-2 transform transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: `${winner.color}15`,
                      borderColor: winner.color,
                      boxShadow: `0 4px 15px ${winner.color}20`
                    }}
                  >
                    <div className="flex items-center">
                      <span className="text-3xl mr-4">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏆'}
                      </span>
                      <div>
                        <div className="font-bold text-lg" style={{ color: winner.color }}>
                          {winner.name} {winner.emoji}
                        </div>
                        <div className="text-sm text-gray-300">{winner.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">#{winner.position}</div>
                      <div className="text-sm text-gray-400">Position</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

         

        {/* Chat */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MessageCircle className="mr-2" /> Race Chat
            </h3>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {chatMessages.slice(-6).map((msg, index) => (
                <div key={index} className="flex gap-3">
                  <span className="font-bold text-blue-300">{msg.user}:</span>
                  <span className="text-gray-200">{msg.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmRacingPlatform;
       




