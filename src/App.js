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

