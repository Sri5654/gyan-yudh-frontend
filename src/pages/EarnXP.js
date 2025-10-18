import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Brain, GitBranch, Bug, Flame, BookOpen, Users, Trophy } from 'lucide-react';
import './EarnXP.css';

const EarnXP = () => {
  const navigate = useNavigate();

  const xpActivities = [
    {
      id: 'coding-challenge',
      title: 'Solve a Coding Challenge',
      subtitle: 'Enter the Coding Arena',
      description: 'Test your programming skills with algorithmic challenges',
      icon: Terminal,
      xpRange: '50-150 XP',
      difficulty: 'All Levels',
      color: '#00d2ff',
      route: '/coding-arena',
      stats: { completed: 47, available: 120 }
    },
    {
      id: 'technical-quiz',
      title: 'Ace a Technical Quiz',
      subtitle: 'MCQs on core concepts',
      description: 'Answer multiple choice questions on CS fundamentals',
      icon: Brain,
      xpRange: '30-100 XP',
      difficulty: 'Easy to Hard',
      color: '#39ff14',
      route: '/quiz',
      stats: { completed: 23, available: 85 }
    },
    {
      id: 'data-structures',
      title: 'Review Data Structures',
      subtitle: 'Flashcards for quick revision',
      description: 'Master DS concepts with interactive flashcards',
      icon: GitBranch,
      xpRange: '20-60 XP',
      difficulty: 'Beginner',
      color: '#ffc107',
      route: '/flashcards',
      stats: { completed: 156, available: 200 }
    },
    {
      id: 'debug-code',
      title: 'Debug a Peer\'s Code',
      subtitle: 'Earn XP by helping others in the forum',
      description: 'Find and fix bugs in community submitted code',
      icon: Bug,
      xpRange: '25-75 XP',
      difficulty: 'Medium',
      color: '#ff6b35',
      route: '/debug-forum',
      stats: { completed: 12, available: 34 }
    },
    {
      id: 'daily-streak',
      title: 'Maintain Daily Streak',
      subtitle: 'Commit to your learning',
      description: 'Complete at least one activity every day',
      icon: Flame,
      xpRange: '10-50 XP',
      difficulty: 'Ongoing',
      color: '#e74c3c',
      route: '/streak',
      stats: { current: 7, best: 23 }
    },
    {
      id: 'study-groups',
      title: 'Join Study Groups',
      subtitle: 'Collaborative learning sessions',
      description: 'Participate in peer-to-peer learning sessions',
      icon: Users,
      xpRange: '40-80 XP',
      difficulty: 'Social',
      color: '#9b59b6',
      route: '/study-groups',
      stats: { joined: 3, available: 12 }
    },
    {
      id: 'mini-projects',
      title: 'Complete Mini Projects',
      subtitle: 'Build real-world applications',
      description: 'Create small projects to apply your knowledge',
      icon: BookOpen,
      xpRange: '100-300 XP',
      difficulty: 'Advanced',
      color: '#1abc9c',
      route: '/projects',
      stats: { completed: 2, available: 15 }
    },
    {
      id: 'competitions',
      title: 'Enter Competitions',
      subtitle: 'Compete with other teams',
      description: 'Participate in coding competitions and hackathons',
      icon: Trophy,
      xpRange: '200-500 XP',
      difficulty: 'Expert',
      color: '#f39c12',
      route: '/competitions',
      stats: { entered: 1, upcoming: 3 }
    }
  ];

  const handleActivityClick = (activity) => {
    if (activity.route === '/coding-arena') {
      navigate('/coding-arena');
    } else {
      // For other activities, show coming soon or implement later
      alert(`${activity.title} - Coming Soon!`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
      case 'easy to hard':
      case 'all levels':
        return '#39ff14';
      case 'medium':
      case 'social':
        return '#ffc107';
      case 'advanced':
      case 'expert':
        return '#ff6b35';
      case 'ongoing':
        return '#e74c3c';
      default:
        return '#00d2ff';
    }
  };

  return (
    <div className="earn-xp-page">
      <div className="armory-container">
        <div className="armory-header">
          <h1 className="armory-title">
            <span className="title-main">The Armory</span>
            <span className="title-subtitle">Choose Your Path to Glory</span>
          </h1>
          <p className="armory-description">
            Select your preferred method to earn XP and climb the leaderboards. 
            Each activity offers unique challenges and rewards.
          </p>
        </div>

        <div className="activities-grid">
          {xpActivities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={activity.id}
                className="activity-card"
                onClick={() => handleActivityClick(activity)}
                style={{ '--activity-color': activity.color }}
              >
                <div className="activity-header">
                  <div className="activity-icon">
                    <IconComponent size={32} />
                  </div>
                  <div className="activity-meta">
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(activity.difficulty) }}
                    >
                      {activity.difficulty}
                    </span>
                    <span className="xp-range">{activity.xpRange}</span>
                  </div>
                </div>

                <div className="activity-content">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-subtitle">{activity.subtitle}</p>
                  <p className="activity-description">{activity.description}</p>
                </div>

                <div className="activity-stats">
                  {activity.stats.completed !== undefined && (
                    <div className="stat-item">
                      <span className="stat-label">Completed:</span>
                      <span className="stat-value">{activity.stats.completed}</span>
                    </div>
                  )}
                  {activity.stats.available !== undefined && (
                    <div className="stat-item">
                      <span className="stat-label">Available:</span>
                      <span className="stat-value">{activity.stats.available}</span>
                    </div>
                  )}
                  {activity.stats.current !== undefined && (
                    <div className="stat-item">
                      <span className="stat-label">Current:</span>
                      <span className="stat-value">{activity.stats.current} days</span>
                    </div>
                  )}
                  {activity.stats.best !== undefined && (
                    <div className="stat-item">
                      <span className="stat-label">Best:</span>
                      <span className="stat-value">{activity.stats.best} days</span>
                    </div>
                  )}
                  {activity.stats.joined !== undefined && (
                    <div className="stat-item">
                      <span className="stat-label">Joined:</span>
                      <span className="stat-value">{activity.stats.joined}</span>
                    </div>
                  )}
                  {activity.stats.entered !== undefined && (
                    <div className="stat-item">
                      <span className="stat-label">Entered:</span>
                      <span className="stat-value">{activity.stats.entered}</span>
                    </div>
                  )}
                  {activity.stats.upcoming !== undefined && (
                    <div className="stat-item">
                      <span className="stat-label">Upcoming:</span>
                      <span className="stat-value">{activity.stats.upcoming}</span>
                    </div>
                  )}
                </div>

                <div className="activity-footer">
                  <button className="start-activity-btn">
                    Start Activity
                  </button>
                </div>

                <div className="card-glow"></div>
              </div>
            );
          })}
        </div>

        <div className="daily-challenges">
          <h2 className="section-title">Today's Special Challenges</h2>
          <div className="special-challenges">
            <div className="special-challenge">
              <div className="challenge-icon">⚡</div>
              <div className="challenge-content">
                <h4>Speed Coding Challenge</h4>
                <p>Solve 3 problems in under 30 minutes</p>
                <span className="bonus-xp">Bonus: +100 XP</span>
              </div>
            </div>
            
            <div className="special-challenge">
              <div className="challenge-icon">🎯</div>
              <div className="challenge-content">
                <h4>Perfect Score Quiz</h4>
                <p>Get 100% on any technical quiz</p>
                <span className="bonus-xp">Bonus: +75 XP</span>
              </div>
            </div>
            
            <div className="special-challenge">
              <div className="challenge-icon">🤝</div>
              <div className="challenge-content">
                <h4>Helper Badge</h4>
                <p>Help 5 peers debug their code</p>
                <span className="bonus-xp">Bonus: +150 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnXP;