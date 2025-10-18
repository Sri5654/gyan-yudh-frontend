import React, { useState, useEffect } from 'react';
import { Play, Clock, Trophy, Sword, Code, Users } from 'lucide-react';
import './CodingArena.css';

const CodingArena = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const problemOfTheDay = {
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ]
  };

  const languages = [
    { value: 'python', label: 'Python', template: 'def two_sum(nums, target):\n    # Your code here\n    pass' },
    { value: 'javascript', label: 'JavaScript', template: 'function twoSum(nums, target) {\n    // Your code here\n}' },
    { value: 'java', label: 'Java', template: 'public int[] twoSum(int[] nums, int target) {\n    // Your code here\n    return new int[]{};\n}' },
    { value: 'cpp', label: 'C++', template: '#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}' },
    { value: 'c', label: 'C', template: '#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Your code here\n    *returnSize = 2;\n    return NULL;\n}' }
  ];

  const headToHeadDuels = [
    {
      id: 1,
      challenger: "Anusha",
      challenge: "Graph Traversal Race",
      language: "C++",
      prize: 150,
      difficulty: "Medium",
      timeLimit: "45 min"
    },
    {
      id: 2,
      challenger: "Vikram",
      challenge: "Dynamic Programming Showdown",
      language: "Python",
      prize: 200,
      difficulty: "Hard",
      timeLimit: "60 min"
    },
    {
      id: 3,
      challenger: "Priya",
      challenge: "String Manipulation Battle",
      language: "Java",
      prize: 100,
      difficulty: "Easy",
      timeLimit: "30 min"
    }
  ];

  useEffect(() => {
    const selectedLang = languages.find(lang => lang.value === selectedLanguage);
    if (selectedLang && !code) {
      setCode(selectedLang.template);
    }
  }, [selectedLanguage]);

  const handleLanguageChange = (langValue) => {
    setSelectedLanguage(langValue);
    const selectedLang = languages.find(lang => lang.value === langValue);
    setCode(selectedLang.template);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Test Case 1: ✅ Passed
Input: nums = [2,7,11,15], target = 9
Expected: [0,1]
Your Output: [0,1]

Test Case 2: ✅ Passed
Input: nums = [3,2,4], target = 6
Expected: [1,2]
Your Output: [1,2]

All test cases passed! 🎉
Time: 0.05s | Memory: 14.2 MB`);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    alert('Solution submitted! +75 XP earned 🎉');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#39ff14';
      case 'medium': return '#ffc107';
      case 'hard': return '#ff6b35';
      default: return '#00d2ff';
    }
  };

  return (
    <div className="coding-arena">
      <div className="arena-container">
        <div className="arena-header">
          <h1 className="arena-title">
            <Sword className="title-icon" />
            Coding Arena
          </h1>
          <p className="arena-subtitle">Sharpen your skills in the heat of battle</p>
        </div>

        <div className="arena-layout">
          {/* Problem Section */}
          <div className="problem-section">
            <div className="problem-header">
              <h2>Problem of the Day</h2>
              <div className="problem-meta">
                <span 
                  className="difficulty-tag"
                  style={{ backgroundColor: getDifficultyColor(problemOfTheDay.difficulty) }}
                >
                  {problemOfTheDay.difficulty}
                </span>
                <span className="xp-reward">+75 XP</span>
              </div>
            </div>

            <div className="problem-content">
              <h3 className="problem-title">{problemOfTheDay.title}</h3>
              <div className="problem-description">
                <p>{problemOfTheDay.description}</p>
              </div>

              <div className="examples-section">
                <h4>Examples:</h4>
                {problemOfTheDay.examples.map((example, index) => (
                  <div key={index} className="example">
                    <div className="example-header">Example {index + 1}:</div>
                    <div className="example-content">
                      <div><strong>Input:</strong> {example.input}</div>
                      <div><strong>Output:</strong> {example.output}</div>
                      <div><strong>Explanation:</strong> {example.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="constraints-section">
                <h4>Constraints:</h4>
                <ul>
                  {problemOfTheDay.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="editor-section">
            <div className="editor-header">
              <div className="language-selector">
                <label>Language:</label>
                <select 
                  value={selectedLanguage} 
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="language-dropdown"
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="editor-actions">
                <button 
                  className="run-btn"
                  onClick={handleRunCode}
                  disabled={isRunning}
                >
                  <Play size={16} />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit Solution
                </button>
              </div>
            </div>

            <div className="code-editor">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="code-textarea"
                placeholder="Write your code here..."
                spellCheck={false}
              />
            </div>

            <div className="output-section">
              <h4>Output:</h4>
              <div className="output-content">
                <pre>{output || 'Run your code to see the output...'}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Head-to-Head Duels */}
        <div className="duels-section">
          <div className="duels-header">
            <h2>
              <Trophy className="section-icon" />
              Head-to-Head Duels
            </h2>
            <button className="create-duel-btn">
              <Sword size={16} />
              Create a Duel
            </button>
          </div>

          <div className="duels-grid">
            {headToHeadDuels.map(duel => (
              <div key={duel.id} className="duel-card">
                <div className="duel-header">
                  <div className="challenger-info">
                    <Users className="challenger-icon" />
                    <span className="challenger-name">{duel.challenger}</span>
                  </div>
                  <span 
                    className="duel-difficulty"
                    style={{ color: getDifficultyColor(duel.difficulty) }}
                  >
                    {duel.difficulty}
                  </span>
                </div>

                <div className="duel-content">
                  <h4 className="duel-title">{duel.challenge}</h4>
                  <div className="duel-meta">
                    <div className="meta-item">
                      <Code size={16} />
                      <span>{duel.language}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{duel.timeLimit}</span>
                    </div>
                    <div className="meta-item prize">
                      <Trophy size={16} />
                      <span>{duel.prize} XP</span>
                    </div>
                  </div>
                </div>

                <div className="duel-actions">
                  <button className="accept-duel-btn">
                    Accept Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingArena;