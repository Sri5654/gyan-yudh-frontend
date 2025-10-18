import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Clock, Code, TreePine, BarChart3, Zap, Star, Trophy } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 27 });

  // Mock data - no API calls
  const mockTopTeams = [
    { _id: '1', name: 'Code Crusaders', weeklyXP: 1200 },
    { _id: '2', name: 'The Segfault Squad', weeklyXP: 980 },
    { _id: '3', name: 'Binary Beasts', weeklyXP: 875 },
    { _id: '4', name: 'Null Pointers', weeklyXP: 756 },
    { _id: '5', name: 'Stack Overflow', weeklyXP: 689 }
  ];

  const mockDailyQuests = [
    {
      _id: '1',
      title: 'Mastering Pointers in C',
      subject: 'C Programming',
      difficulty: 'Medium',
      xpReward: 75,
      type: 'coding'
    },
    {
      _id: '2',
      title: 'Implementing a Binary Search Tree',
      subject: 'Data Structures',
      difficulty: 'Hard',
      xpReward: 100,
      type: 'coding'
    },
    {
      _id: '3',
      title: 'Cleaning the Titanic Dataset',
      subject: 'Data Science',
      difficulty: 'Easy',
      xpReward: 120,
      type: 'coding'
    }
  ];

  useEffect(() => {
    // Update timer every minute
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleStartQuest = (questId) => {
    alert(`Starting quest ${questId}! This would navigate to the quest page.`);
  };

  const progressPercentage = currentUser ? 
    Math.min((currentUser.dailyProgress / currentUser.dailyGoal) * 100, 100) : 0;

  const mockActivityFeed = [
    { user: 'Priya', action: 'solved the "Two Sum" problem', xp: 50, team: 'The Segfault Squad', time: '2 min ago' },
    { user: 'Rahul', action: 'completed "Binary Tree Traversal"', xp: 75, team: 'Code Warriors', time: '5 min ago' },
    { user: 'Ananya', action: 'debugged peer\'s sorting algorithm', xp: 30, team: 'The Segfault Squad', time: '8 min ago' },
    { user: 'Vikram', action: 'aced the "OS Concepts" quiz', xp: 60, team: 'Null Pointers', time: '12 min ago' }
  ];

  if (!currentUser) {
    return <div className="loading">Loading battleground...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* Left Column - User Profile */}
        <div className="left-column">
          <div className="profile-card">
            <div className="profile-header">
              <img src={currentUser.avatar} alt="Avatar" className="avatar" />
              <div className="profile-info">
                <h3>{currentUser.name}</h3>
                <p className="team-name text-secondary">{currentUser.teamId?.name}</p>
                <div className="xp-display">
                  <Star className="xp-icon" />
                  <span>{currentUser.xp} XP</span>
                </div>
              </div>
            </div>
            
            <div className="daily-progress">
              <h4>Daily Goal Progress</h4>
              <div className="progress-circle">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1a1a2e"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#00d2ff"
                    strokeWidth="8"
                    strokeDasharray={`${progressPercentage * 2.83} 283`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="progress-text">
                  <span className="progress-value">{Math.round(progressPercentage)}%</span>
                  <span className="progress-label">{currentUser.dailyProgress}/{currentUser.dailyGoal} XP</span>
                </div>
              </div>
            </div>

            <div className="power-ups">
              <h4>Active Power-Ups</h4>
              <div className="power-up-list">
                {currentUser.powerUps?.map((powerUp, index) => (
                  <div key={index} className="power-up">
                    <Zap className="power-up-icon" />
                    <span>{powerUp.name} (Active)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Main Content */}
        <div className="center-column">
          <div className="sprint-header">
            <h1 className="sprint-title">Weekly Sprint: The Algorithm Gauntlet!</h1>
            <div className="timer">
              <Clock className="timer-icon" />
              <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m left</span>
            </div>
          </div>

          <div className="team-rankings">
            <h3>Top 5 Teams This Week</h3>
            <div className="rankings-chart">
              {mockTopTeams.map((team, index) => (
                <div key={team._id} className={`team-bar ${team.name === currentUser.teamId?.name ? 'highlighted' : ''}`}>
                  <div className="team-info">
                    <span className="rank">#{index + 1}</span>
                    <span className="team-name">{team.name}</span>
                  </div>
                  <div className="xp-bar">
                    <div 
                      className="xp-fill" 
                      style={{ width: `${(team.weeklyXP / mockTopTeams[0].weeklyXP) * 100}%` }}
                    ></div>
                    <span className="xp-value">{team.weeklyXP} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="daily-quests">
            <h3>Today's Quests</h3>
            <div className="quest-list">
              {mockDailyQuests.map((quest) => (
                <div key={quest._id} className="quest-card">
                  <div className="quest-icon">
                    {quest.type === 'coding' && <Code />}
                    {quest.type === 'review' && <TreePine />}
                    {quest.type === 'quiz' && <BarChart3 />}
                  </div>
                  <div className="quest-content">
                    <h4>{quest.title}</h4>
                    <p className="quest-subject">{quest.subject}</p>
                    <div className="quest-meta">
                      <span className={`difficulty ${quest.difficulty.toLowerCase()}`}>
                        {quest.difficulty}
                      </span>
                      <span className="xp-reward">+{quest.xpReward} XP</span>
                    </div>
                  </div>
                  <button 
                    className="start-quest-btn"
                    onClick={() => handleStartQuest(quest._id)}
                  >
                    Start Quest
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Activity Feed */}
        <div className="right-column">
          <div className="activity-feed">
            <h3>Live Activity Feed</h3>
            <div className="feed-list">
              {mockActivityFeed.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-content">
                    <p>
                      <span className="user-name text-primary">{activity.user}</span>
                      {' '}{activity.action} and earned{' '}
                      <span className="xp-earned text-secondary">{activity.xp} XP</span>
                      {' '}for{' '}
                      <span className="team-name">{activity.team}</span>!
                    </p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;