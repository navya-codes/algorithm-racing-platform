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




