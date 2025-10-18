import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Medal, Crown, Star, Filter, Calendar, Code } from 'lucide-react';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const { currentUser } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [userTeamId, setUserTeamId] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
    fetchUserProfile();
  }, [activeFilter]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/users/profile');
      setUserTeamId(response.data.teamId._id);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(`/api/leaderboard?filter=${activeFilter}`);
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Mock data for demonstration
      setTeams(mockLeaderboardData);
    } finally {
      setLoading(false);
    }
  };

  const mockLeaderboardData = [
    {
      _id: '1',
      name: 'Code Crusaders',
      totalXP: 4250,
      weeklyXP: 1200,
      projectsCompleted: 18,
      rank: 1
    },
    {
      _id: '2',
      name: 'The Segfault Squad',
      totalXP: 3890,
      weeklyXP: 980,
      projectsCompleted: 15,
      rank: 2
    },
    {
      _id: '3',
      name: 'Binary Beasts',
      totalXP: 3654,
      weeklyXP: 875,
      projectsCompleted: 14,
      rank: 3
    },
    {
      _id: '4',
      name: 'Null Pointers',
      totalXP: 3421,
      weeklyXP: 756,
      projectsCompleted: 13,
      rank: 4
    },
    {
      _id: '5',
      name: 'Stack Overflow',
      totalXP: 3198,
      weeklyXP: 689,
      projectsCompleted: 12,
      rank: 5
    },
    {
      _id: '6',
      name: 'Recursive Rebels',
      totalXP: 2987,
      weeklyXP: 634,
      projectsCompleted: 11,
      rank: 6
    },
    {
      _id: '7',
      name: 'Algorithm Assassins',
      totalXP: 2756,
      weeklyXP: 578,
      projectsCompleted: 10,
      rank: 7
    },
    {
      _id: '8',
      name: 'Debug Dynasty',
      totalXP: 2543,
      weeklyXP: 523,
      projectsCompleted: 9,
      rank: 8
    },
    {
      _id: '9',
      name: 'Syntax Samurai',
      totalXP: 2321,
      weeklyXP: 467,
      projectsCompleted: 8,
      rank: 9
    },
    {
      _id: '10',
      name: 'Loop Legends',
      totalXP: 2198,
      weeklyXP: 412,
      projectsCompleted: 7,
      rank: 10
    }
  ];

  const filters = [
    { value: 'all', label: 'All Time', icon: Trophy },
    { value: 'week', label: 'This Week', icon: Calendar },
    { value: 'c', label: 'C Language', icon: Code },
    { value: 'python', label: 'Python', icon: Code },
    { value: 'java', label: 'Java', icon: Code }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="rank-icon gold" />;
      case 2:
        return <Medal className="rank-icon silver" />;
      case 3:
        return <Medal className="rank-icon bronze" />;
      default:
        return <span className="rank-number">#{rank}</span>;
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'gold';
      case 2: return 'silver';
      case 3: return 'bronze';
      default: return '';
    }
  };

  const isUserTeam = (teamId) => {
    return teamId === userTeamId;
  };

  if (loading) {
    return <div className="loading">Loading Hall of Fame...</div>;
  }

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h1 className="leaderboard-title">
            <Trophy className="title-icon" />
            Hall of Fame
          </h1>
          <p className="leaderboard-subtitle">
            Where legends are born and glory is earned
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-section">
          <div className="filter-buttons">
            {filters.map(filter => {
              const IconComponent = filter.icon;
              return (
                <button
                  key={filter.value}
                  className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  <IconComponent size={20} />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="podium-section">
          <div className="podium">
            {teams.slice(0, 3).map((team, index) => (
              <div key={team._id} className={`podium-place place-${index + 1}`}>
                <div className="podium-team">
                  <div className="team-avatar">
                    {getRankIcon(team.rank)}
                  </div>
                  <h3 className="team-name">{team.name}</h3>
                  <div className="team-xp">
                    <Star className="xp-icon" />
                    <span>{team.totalXP.toLocaleString()} XP</span>
                  </div>
                  <div className="team-projects">
                    {team.projectsCompleted} projects
                  </div>
                </div>
                <div className={`podium-base ${getRankClass(team.rank)}`}>
                  <span className="podium-rank">#{team.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="leaderboard-table-section">
          <div className="table-header">
            <h2>Complete Rankings</h2>
            <div className="table-stats">
              <span>{teams.length} teams competing</span>
            </div>
          </div>

          <div className="leaderboard-table">
            <div className="table-header-row">
              <div className="col-rank">Rank</div>
              <div className="col-team">Team Name</div>
              <div className="col-xp">Total XP</div>
              <div className="col-weekly">Weekly XP</div>
              <div className="col-projects">Projects</div>
            </div>

            <div className="table-body">
              {teams.map((team) => (
                <div
                  key={team._id}
                  className={`table-row ${isUserTeam(team._id) ? 'user-team' : ''} ${getRankClass(team.rank)}`}
                >
                  <div className="col-rank">
                    <div className="rank-display">
                      {getRankIcon(team.rank)}
                    </div>
                  </div>
                  
                  <div className="col-team">
                    <div className="team-info">
                      <span className="team-name">{team.name}</span>
                      {isUserTeam(team._id) && (
                        <span className="your-team-badge">Your Team</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-xp">
                    <div className="xp-display">
                      <Star className="xp-icon" size={16} />
                      <span>{team.totalXP.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="col-weekly">
                    <span className="weekly-xp">
                      {team.weeklyXP.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="col-projects">
                    <span className="projects-count">
                      {team.projectsCompleted}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <h2>Competition Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Trophy />
              </div>
              <div className="stat-content">
                <span className="stat-value">10</span>
                <span className="stat-label">Active Teams</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Star />
              </div>
              <div className="stat-content">
                <span className="stat-value">28,547</span>
                <span className="stat-label">Total XP Earned</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Code />
              </div>
              <div className="stat-content">
                <span className="stat-value">117</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Filter />
              </div>
              <div className="stat-content">
                <span className="stat-value">7</span>
                <span className="stat-label">Days Remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;