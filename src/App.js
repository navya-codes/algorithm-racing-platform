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
    { 
      name: 'Insertion Sort', 
      color: '#FF9FF3', 
      speed: 0.5, 
      description: 'Good with small data',
      emoji: '📝',
      category: 'Sorting'
    },


