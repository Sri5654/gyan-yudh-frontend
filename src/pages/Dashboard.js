import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Clock, Code, TreePine, BarChart3, Zap, Star, Trophy } from 'lucide-react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [topTeams, setTopTeams] = useState([]);
  const [dailyQuests, setDailyQuests] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 27 });

  useEffect(() => {
    fetchDashboardData();
    
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

  const fetchDashboardData = async () => {
    try {
      const [profileRes, teamsRes, questsRes] = await Promise.all([
        axios.get('/api/users/profile'),
        axios.get('/api/teams/top/5'),
        axios.get('/api/quests/daily')
      ]);

      setUserProfile(profileRes.data);
      setTopTeams(teamsRes.data);
      setDailyQuests(questsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleStartQuest = async (questId) => {
    // This would typically navigate to the quest page
    console.log('Starting quest:', questId);
  };

  const progressPercentage = userProfile ? 
    Math.min((userProfile.dailyProgress / userProfile.dailyGoal) * 100, 100) : 0;

  const mockActivityFeed = [
    { user: 'Priya', action: 'solved the "Two Sum" problem', xp: 50, team: 'The Segfault Squad', time: '2 min ago' },
    { user: 'Rahul', action: 'completed "Binary Tree Traversal"', xp: 75, team: 'Code Warriors', time: '5 min ago' },
    { user: 'Ananya', action: 'debugged peer\'s sorting algorithm', xp: 30, team: 'The Segfault Squad', time: '8 min ago' },
    { user: 'Vikram', action: 'aced the "OS Concepts" quiz', xp: 60, team: 'Null Pointers', time: '12 min ago' }
  ];

  if (!userProfile) {
    return <div className="loading">Loading battleground...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* Left Column - User Profile */}
        <div className="left-column">
          <div className="profile-card">
            <div className="profile-header">
              <img src={userProfile.avatar} alt="Avatar" className="avatar" />
              <div className="profile-info">
                <h3>{userProfile.name}</h3>
                <p className="team-name text-secondary">{userProfile.teamId?.name || 'The Segfault Squad'}</p>
                <div className="xp-display">
                  <Star className="xp-icon" />
                  <span>{userProfile.xp} XP</span>
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
                  <span className="progress-label">{userProfile.dailyProgress}/{userProfile.dailyGoal} XP</span>
                </div>
              </div>
            </div>

            <div className="power-ups">
              <h4>Active Power-Ups</h4>
              <div className="power-up-list">
                <div className="power-up">
                  <Zap className="power-up-icon" />
                  <span>Double XP (2h left)</span>
                </div>
                <div className="power-up">
                  <Trophy className="power-up-icon" />
                  <span>Streak Shield (Active)</span>
                </div>
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
              {topTeams.map((team, index) => (
                <div key={team._id} className={`team-bar ${index === 0 ? 'highlighted' : ''}`}>
                  <div className="team-info">
                    <span className="rank">#{index + 1}</span>
                    <span className="team-name">{team.name}</span>
                  </div>
                  <div className="xp-bar">
                    <div 
                      className="xp-fill" 
                      style={{ width: `${(team.weeklyXP / (topTeams[0]?.weeklyXP || 1)) * 100}%` }}
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
              {dailyQuests.map((quest) => (
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