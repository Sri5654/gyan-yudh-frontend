import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Users, Flame, Star, Circle } from 'lucide-react';
import axios from 'axios';
import './Team.css';

const Team = () => {
  const { currentUser } = useAuth();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const userProfile = await axios.get('/api/users/profile');
      const teamId = userProfile.data.teamId._id;
      const teamResponse = await axios.get(`/api/teams/${teamId}`);
      setTeamData(teamResponse.data);
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Online': return '#39ff14';
      case 'In the Coding Arena': return '#00d2ff';
      case 'Offline': return '#666';
      default: return '#666';
    }
  };

  const getStatusIcon = (status) => {
    return <Circle size={12} fill={getStatusColor(status)} color={getStatusColor(status)} />;
  };

  if (loading) {
    return <div className="loading">Loading your squad...</div>;
  }

  if (!teamData) {
    return <div className="error">Failed to load team data</div>;
  }

  // Mock data for demonstration
  const mockTeamData = {
    name: "The Segfault Squad",
    logo: "https://via.placeholder.com/120x120/00d2ff/ffffff?text=TSS",
    rank: 2,
    totalXP: 2847,
    winningStreak: 5,
    projectsCompleted: 12,
    members: [
      {
        _id: '1',
        name: 'Arjun Sharma',
        avatar: 'https://via.placeholder.com/80x80/1a1a2e/00d2ff?text=AS',
        xp: 1250,
        status: 'Online',
        role: 'Team Lead'
      },
      {
        _id: '2',
        name: 'Priya Patel',
        avatar: 'https://via.placeholder.com/80x80/1a1a2e/39ff14?text=PP',
        xp: 987,
        status: 'In the Coding Arena',
        role: 'Frontend Specialist'
      },
      {
        _id: '3',
        name: 'Rahul Kumar',
        avatar: 'https://via.placeholder.com/80x80/1a1a2e/ff6b35?text=RK',
        xp: 610,
        status: 'Online',
        role: 'Backend Developer'
      },
      {
        _id: '4',
        name: 'Ananya Singh',
        avatar: 'https://via.placeholder.com/80x80/1a1a2e/ffc107?text=AS',
        xp: 0,
        status: 'Offline',
        role: 'Data Scientist'
      }
    ]
  };

  const team = { ...teamData, ...mockTeamData };

  return (
    <div className="team-page">
      <div className="team-container">
        {/* Team Header */}
        <div className="team-header">
          <div className="team-logo-section">
            <img src={team.logo} alt={team.name} className="team-logo" />
            <div className="team-info">
              <h1 className="team-name">{team.name}</h1>
              <p className="team-motto">"Debugging the world, one segfault at a time"</p>
            </div>
          </div>
          
          <div className="team-stats">
            <div className="stat-card rank-card">
              <Trophy className="stat-icon" />
              <div className="stat-content">
                <span className="stat-label">Global Rank</span>
                <span className="stat-value">#{team.rank}</span>
              </div>
            </div>
            
            <div className="stat-card xp-card">
              <Star className="stat-icon" />
              <div className="stat-content">
                <span className="stat-label">Total XP</span>
                <span className="stat-value">{team.totalXP.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="stat-card streak-card">
              <Flame className="stat-icon" />
              <div className="stat-content">
                <span className="stat-label">Win Streak</span>
                <span className="stat-value">{team.winningStreak}</span>
              </div>
            </div>
            
            <div className="stat-card projects-card">
              <Users className="stat-icon" />
              <div className="stat-content">
                <span className="stat-label">Projects</span>
                <span className="stat-value">{team.projectsCompleted}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="members-section">
          <h2 className="section-title">Squad Members</h2>
          <div className="members-grid">
            {team.members.map((member) => (
              <div key={member._id} className="member-card">
                <div className="member-header">
                  <img src={member.avatar} alt={member.name} className="member-avatar" />
                  <div className="member-status">
                    {getStatusIcon(member.status)}
                    <span className="status-text">{member.status}</span>
                  </div>
                </div>
                
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  
                  <div className="member-stats">
                    <div className="member-xp">
                      <Star size={16} />
                      <span>{member.xp.toLocaleString()} XP</span>
                    </div>
                    
                    <div className="contribution-bar">
                      <div className="contribution-label">Team Contribution</div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${(member.xp / Math.max(...team.members.map(m => m.xp))) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="contribution-percent">
                        {Math.round((member.xp / team.totalXP) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="member-actions">
                  <button className="action-btn challenge-btn">
                    Challenge
                  </button>
                  <button className="action-btn message-btn">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Achievements */}
        <div className="achievements-section">
          <h2 className="section-title">Team Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card earned">
              <div className="achievement-icon">🏆</div>
              <h4>Algorithm Masters</h4>
              <p>Solved 50+ algorithm problems</p>
            </div>
            
            <div className="achievement-card earned">
              <div className="achievement-icon">🔥</div>
              <h4>Hot Streak</h4>
              <p>5-day winning streak</p>
            </div>
            
            <div className="achievement-card earned">
              <div className="achievement-icon">👥</div>
              <h4>Team Player</h4>
              <p>Helped 20+ peers debug code</p>
            </div>
            
            <div className="achievement-card locked">
              <div className="achievement-icon">⚡</div>
              <h4>Speed Demons</h4>
              <p>Complete 10 challenges in under 1 hour</p>
            </div>
            
            <div className="achievement-card locked">
              <div className="achievement-icon">🎯</div>
              <h4>Perfect Score</h4>
              <p>Ace 5 consecutive quizzes</p>
            </div>
            
            <div className="achievement-card locked">
              <div className="achievement-icon">👑</div>
              <h4>Champions</h4>
              <p>Reach #1 on the leaderboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;