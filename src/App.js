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
      color: '#FF6B6B', 
      speed: 0.3, 
      description: 'Slow but steady',
      emoji: '🐌',
      category: 'Sorting'
    },
    { 
      name: 'Quick Sort', 
      color: '#4ECDC4', 
      speed: 0.95, 
      description: 'Lightning fast',
      emoji: '⚡',
      category: 'Sorting'
    },
    { 
      name: 'Merge Sort', 
      color: '#45B7D1', 
      speed: 0.85, 
      description: 'Reliable performer',
      emoji: '🔄',
      category: 'Sorting'
    },
    { 
      name: 'Heap Sort', 
      color: '#96CEB4', 
      speed: 0.75, 
      description: 'Steady climber',
      emoji: '🏔️',
      category: 'Sorting'
    },
    { 
      name: 'Selection Sort', 
      color: '#FECA57', 
      speed: 0.4, 
      description: 'Methodical approach',
      emoji: '🎯',
      category: 'Sorting'
    },

    //advanced sorting
    { 
      name: 'Insertion Sort', 
      color: '#FF9FF3', 
      speed: 0.5, 
      description: 'Good with small data',
      emoji: '📝',
      category: 'Sorting'
    },

    { 
      name: 'Heap Sort', 
      color: '#96CEB4', 
      speed: 0.75, 
      description: 'Steady climber',
      emoji: '🏔️',
      category: 'Sorting'
    },
    { 
      name: 'Selection Sort', 
      color: '#FECA57', 
      speed: 0.4, 
      description: 'Methodical approach',
      emoji: '🎯',
      category: 'Sorting'
    },
    { 
      name: 'Insertion Sort', 
      color: '#FF9FF3', 
      speed: 0.5, 
      description: 'Good with small data',
      emoji: '📝',
      category: 'Sorting'
    },

    //search algorithms
    { 
      name: 'Binary Search', 
      color: '#DDA0DD', 
      speed: 0.95, 
      description: 'Divide and find',
      emoji: '🔍',
      category: 'Search'
    },
    { 
      name: 'Linear Search', 
      color: '#F0E68C', 
      speed: 0.35, 
      description: 'One by one explorer',
      emoji: '🔦',
      category: 'Search'
    },
    { 
      name: 'Hash Search', 
      color: '#FFA07A', 
      speed: 0.98, 
      description: 'Instant access wizard',
      emoji: '#️⃣',
      category: 'Search'
    },
    { 
      name: 'Interpolation Search', 
      color: '#98FB98', 
      speed: 0.89, 
      description: 'Smart guesser',
      emoji: '🎯',
      category: 'Search'
    },

    //graph algorithms
    { 
      name: 'Dijkstra', 
      color: '#87CEEB', 
      speed: 0.78, 
      description: 'Shortest path finder',
      emoji: '🗺️',
      category: 'Graph'
    },
    { 
      name: 'A* Search', 
      color: '#DEB887', 
      speed: 0.85, 
      description: 'Heuristic pathfinder',
      emoji: '🧭',
      category: 'Graph'
    },
    { 
      name: 'BFS', 
      color: '#F5DEB3', 
      speed: 0.72, 
      description: 'Breadth-first explorer',
      emoji: '🌊',
      category: 'Graph'
    },
    { 
      name: 'DFS', 
      color: '#FFE4E1', 
      speed: 0.70, 
      description: 'Depth-first diver',
      emoji: '🕳️',
      category: 'Graph'
    },

    //tree algorithms
    { 
      name: 'AVL Tree', 
      color: '#E6E6FA', 
      speed: 0.83, 
      description: 'Self-balancing master',
      emoji: '⚖️',
      category: 'Tree'
    },
    { 
      name: 'Red-Black Tree', 
      color: '#CD5C5C', 
      speed: 0.81, 
      description: 'Color-coded balancer',
      emoji: '🔴',
      category: 'Tree'
    },
    { 
      name: 'B-Tree', 
      color: '#32CD32', 
      speed: 0.79, 
      description: 'Multi-way organizer',
      emoji: '🌳',
      category: 'Tree'
    },
    // dynamic programming
    { 
      name: 'Fibonacci DP', 
      color: '#FFD700', 
      speed: 0.77, 
      description: 'Memory master',
      emoji: '🧠',
      category: 'Dynamic'
    },
    { 
      name: 'Knapsack DP', 
      color: '#FF69B4', 
      speed: 0.74, 
      description: 'Optimization expert',
      emoji: '🎒',
      category: 'Dynamic'
    },
    // String Algorithms
    { 
      name: 'KMP Search', 
      color: '#40E0D0', 
      speed: 0.86, 
      description: 'Pattern matching pro',
      emoji: '🔤',
      category: 'String'
    },
    { 
      name: 'Boyer-Moore', 
      color: '#EE82EE', 
      speed: 0.91, 
      description: 'Backward searcher',
      emoji: '⏪',
      category: 'String'
    }
  ];

  const raceTypes = [
    { name: 'Sorting Sprint', description: 'Sort 50 random numbers', emoji: '🏃‍♂️', category: 'Sorting' },
    { name: 'Big Data Marathon', description: 'Sort 500 numbers', emoji: '🏃‍♀️', category: 'Sorting' },
    { name: 'Reverse Challenge', description: 'Sort reverse-ordered data', emoji: '🔄', category: 'Sorting' },
    { name: 'Search & Destroy', description: 'Find target in 100 numbers', emoji: '🔍', category: 'Search' },
    { name: 'Pathfinding Race', description: 'Navigate through maze', emoji: '🗺️', category: 'Graph' },
    { name: 'Tree Building Contest', description: 'Build balanced tree', emoji: '🌳', category: 'Tree' },
    { name: 'String Match Challenge', description: 'Find pattern in text', emoji: '🔤', category: 'String' },
    { name: 'DP Optimization', description: 'Solve complex problem', emoji: '🧠', category: 'Dynamic' }
  ];

  const [selectedRaceType, setSelectedRaceType] = useState(raceTypes[0]);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">
          <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            Algorithm Racing Platform
          </span> 🏁
        </h1>
        <p className="text-xl text-blue-200">Mario Kart but for algorithms!</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

         {/* Left Panel - Algorithm Selection & Race Setup */}
        <div className="lg:col-span-1 space-y-6">

       {/* Race Type Selection */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Timer className="mr-2" /> Race Type
            </h3>
            <div className="space-y-3">
              {raceTypes.map(type => (
                <button
                  key={type.name}
                  onClick={() => {
                    setSelectedRaceType(type);
                    setFilterCategory(type.category);
                    setSelectedAlgorithms([]); // Clear selection when changing race type
                  }}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedRaceType.name === type.name
                      ? 'bg-yellow-500/30 border border-yellow-400'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold">{type.emoji} {type.name}</div>
                  <div className="text-sm text-gray-300">{type.description}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    <span className="bg-white/20 px-2 py-1 rounded">{type.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

{/* Algorithm Selection */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">
              Choose Your Racers ({selectedAlgorithms.length}/6)
            </h3>
            
            {/* Category Filter */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {['All', 'Sorting', 'Search', 'Graph', 'Tree', 'Dynamic', 'String'].map(category => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      filterCategory === category
                        ? 'bg-yellow-500 text-black'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

          <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
              {filteredAlgorithms.map(algo => (
                <button
                  key={algo.name}
                  onClick={() => toggleAlgorithm(algo)}
                  disabled={!selectedAlgorithms.find(a => a.name === algo.name) && selectedAlgorithms.length >= 6}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedAlgorithms.find(a => a.name === algo.name)
                      ? `border-2 shadow-lg shadow-${algo.color}/50`
                      : !selectedAlgorithms.find(a => a.name === algo.name) && selectedAlgorithms.length >= 6
                      ? 'border-white/10 opacity-50 cursor-not-allowed'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  style={{
                    backgroundColor: selectedAlgorithms.find(a => a.name === algo.name) 
                      ? `${algo.color}30` 
                      : 'rgba(255,255,255,0.05)'
                  }}
                >
                  
                   <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-bold text-sm">{algo.emoji} {algo.name}</div>
                      <div className="text-xs text-gray-300">{algo.description}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        <span className="bg-white/20 px-2 py-1 rounded">{algo.category}</span>
                      </div>
                    </div>
                    <div className="text-lg ml-2">
                      {selectedAlgorithms.find(a => a.name === algo.name) ? '✅' : '⭕'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

         {/* Race Controls */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex flex-col gap-4">
              {raceState === 'setup' && (
                <button
                  onClick={startRace}
                  disabled={selectedAlgorithms.length < 2}
                  className={`py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                    selectedAlgorithms.length >= 2
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg'
                      : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  <Play className="inline-block mr-2" />
                  START RACE!
                </button>
              )}

              {(raceState === 'racing' || raceState === 'finished') && (
                <button
                  onClick={resetRace}
                  className="py-4 px-6 rounded-lg font-bold text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                >
                  <RotateCcw className="inline-block mr-2" />
                  NEW RACE
                </button>
              )}
              
              <div className="text-center">
                <div className="text-2xl font-bold">⏱️ {raceTime.toFixed(1)}s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Race Track */}
        <div className="lg:col-span-2 space-y-6">

          {/* Race Track */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-center">🏁 Race Track 🏁</h3>
            
            {selectedAlgorithms.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-4xl mb-4">🏎️</div>
                <p>Select algorithms to start racing!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedAlgorithms.map((algo, index) => (
                  <div key={algo.name} className="relative">
                    {/* Track */}
                    <div className="h-16 bg-gray-800 rounded-lg border-2 border-white/20 relative overflow-hidden">
                      {/* Finish Line */}
                      <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-white to-gray-300"></div>
                      
                      {/* Algorithm Car */}
                      <div 
                        className="absolute top-2 h-12 w-12 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 shadow-lg"
                        style={{
                          backgroundColor: algo.color,
                          left: `${(raceProgress[algo.name] || 0) * 0.9}%`,
                          transform: raceProgress[algo.name] >= 100 ? 'scale(1.2)' : 'scale(1)'
                        }}
                
                      
                    >
                        {algo.emoji}
                      </div>
                      
                      {/* Progress Bar */}
                      <div 
                        className="absolute bottom-0 h-1 transition-all duration-300"
                        style={{
                          backgroundColor: algo.color,
                          width: `${raceProgress[algo.name] || 0}%`
                        }}
                      ></div>
                    </div>


                  {/* Algorithm Info */}
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold" style={{ color: algo.color }}>
                        {algo.name}
                      </span>
                      <span className="text-sm">
                        {Math.round(raceProgress[algo.name] || 0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Leaderboard */}
          {winners.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="mr-2 text-yellow-400" /> Race Results
              </h3>
              <div className="space-y-3">
                {winners.map((winner, index) => (
                  <div 
                    key={winner.name}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: `${winner.color}20` }}

                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏆'}
                      </span>
                      <span className="font-bold">{winner.name} {winner.emoji}</span>
                    </div>
                    <span className="text-sm">Position {winner.position}</span>
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
       




