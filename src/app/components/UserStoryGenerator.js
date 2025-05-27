'use client';

import { useState } from 'react';

export default function UserStoryGenerator({ project, onClose, onSaveStories }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStories, setGeneratedStories] = useState([]);
  const [selectedStories, setSelectedStories] = useState([]);

  const sampleStories = [
    {
      id: '1',
      title: 'User Registration',
      story: 'As a new user, I want to create an account so that I can access the platform features.',
      acceptanceCriteria: [
        'User can enter email and password',
        'Password must meet security requirements',
        'User receives confirmation email',
        'Account is created successfully'
      ],
      priority: 'High',
      estimate: '5 Story Points'
    },
    {
      id: '2',
      title: 'User Login',
      story: 'As a registered user, I want to log into my account so that I can access my personal dashboard.',
      acceptanceCriteria: [
        'User can enter credentials',
        'System validates credentials',
        'User is redirected to dashboard',
        'Session is maintained'
      ],
      priority: 'High',
      estimate: '3 Story Points'
    },
    {
      id: '3',
      title: 'Password Reset',
      story: 'As a user, I want to reset my password so that I can regain access if I forget it.',
      acceptanceCriteria: [
        'User can request password reset',
        'Reset email is sent',
        'User can set new password',
        'Old password is invalidated'
      ],
      priority: 'Medium',
      estimate: '3 Story Points'
    },
    {
      id: '4',
      title: 'Profile Management',
      story: 'As a user, I want to update my profile information so that I can keep my details current.',
      acceptanceCriteria: [
        'User can edit profile fields',
        'Changes are validated',
        'Profile is updated successfully',
        'User sees confirmation'
      ],
      priority: 'Medium',
      estimate: '2 Story Points'
    },
    {
      id: '5',
      title: 'Dashboard Overview',
      story: 'As a user, I want to see an overview of my activities so that I can track my progress.',
      acceptanceCriteria: [
        'Dashboard shows key metrics',
        'Data is up to date',
        'Interface is responsive',
        'Quick actions are available'
      ],
      priority: 'High',
      estimate: '5 Story Points'
    }
  ];

  const generateStories = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedStories(sampleStories);
    setIsGenerating(false);
  };

  const toggleStorySelection = (storyId) => {
    setSelectedStories(prev => 
      prev.includes(storyId) 
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    );
  };

  const handleSaveSelected = () => {
    const stories = generatedStories.filter(story => selectedStories.includes(story.id));
    onSaveStories(stories);
    onClose();
  };

  const priorityColors = {
    'High': 'bg-red-100 text-red-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold navy-text mb-2">AI User Story Generator</h2>
              <p className="text-gray-600">Project: {project.name}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* AI Message */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              DC
            </div>
            <div>
              <p className="text-gray-800 font-medium">DevFlow CoPilot</p>
              <p className="text-gray-700 text-sm mt-1">
                "Let me analyze your {project.type} project and generate comprehensive user stories. 
                I'll create stories that follow best practices and include detailed acceptance criteria."
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!generatedStories.length ? (
            <div className="text-center py-12">
              {isGenerating ? (
                <div>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 mb-2">Generating user stories with AI...</p>
                  <p className="text-sm text-gray-500">Analyzing your project requirements and creating comprehensive stories</p>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold navy-text mb-2">Ready to Generate User Stories</h3>
                  <p className="text-gray-600 mb-6">
                    I'll analyze your project and create detailed user stories with acceptance criteria.
                  </p>
                  <button 
                    onClick={generateStories}
                    className="copilot-button px-8 py-3 text-lg"
                  >
                    Generate Stories with AI
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold navy-text">
                  Generated User Stories ({generatedStories.length})
                </h3>
                <p className="text-sm text-gray-600">
                  Select stories to add to your backlog
                </p>
              </div>

              <div className="space-y-4">
                {generatedStories.map(story => (
                  <div 
                    key={story.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedStories.includes(story.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleStorySelection(story.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedStories.includes(story.id)}
                          onChange={() => toggleStorySelection(story.id)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <h4 className="font-semibold text-gray-800">{story.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[story.priority]}`}>
                          {story.priority}
                        </span>
                        <span className="text-sm text-gray-500">{story.estimate}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3 italic">"{story.story}"</p>

                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-2">Acceptance Criteria:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {story.acceptanceCriteria.map((criteria, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            {criteria}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {generatedStories.length > 0 && (
          <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {selectedStories.length} of {generatedStories.length} stories selected
            </p>
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveSelected}
                disabled={selectedStories.length === 0}
                className={`copilot-button px-6 py-2 ${
                  selectedStories.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Add Selected Stories ({selectedStories.length})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}