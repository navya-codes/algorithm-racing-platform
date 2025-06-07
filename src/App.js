import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy, Users, MessageCircle, Timer } from 'lucide-react';

const AlgorithmRacingPlatform = () => {
  const [raceState, setRaceState] = useState('setup');
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [raceData, setRaceData] = useState([]);
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

    










