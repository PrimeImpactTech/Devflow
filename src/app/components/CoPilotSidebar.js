'use client';

import { useState } from 'react';

export default function CoPilotSidebar({ isOpen, onToggle }) {
  const [activeRole, setActiveRole] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'copilot',
      message: "Welcome! I'm your DevFlow CoPilot. Think of me as your sophisticated AI co-founder. What shall we build today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const roles = [
    {
      id: 'product-manager',
      name: 'Product Manager',
      icon: '🎯',
      description: 'Generate roadmaps, user personas, and epics'
    },
    {
      id: 'scrum-master',
      name: 'Scrum Master',
      icon: '⚡',
      description: 'Create sprint cycles and retrospectives'
    },
    {
      id: 'designer',
      name: 'UI/UX Designer',
      icon: '🎨',
      description: 'Wireframe logic and user journeys'
    },
    {
      id: 'engineer',
      name: 'Engineer',
      icon: '⚙️',
      description: 'Architecture and pseudo-code suggestions'
    },
    {
      id: 'qa-tester',
      name: 'QA Tester',
      icon: '🔍',
      description: 'Test cases and bug triage'
    }
  ];

  const copilotQuotes = [
    "I don't break under pressure—I break problems down.",
    "Shipping greatness? I'm your boarding pass.",
    "Excellence isn't a skill, it's an attitude.",
    "Let's make magic happen.",
    "Problems are just opportunities in disguise."
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage = {
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    // Simulate CoPilot response
    const randomQuote = copilotQuotes[Math.floor(Math.random() * copilotQuotes.length)];
    const copilotResponse = {
      type: 'copilot',
      message: `${randomQuote} Let me help you with that. ${activeRole ? `As your ${roles.find(r => r.id === activeRole)?.name}, ` : ''}I'd suggest we start by breaking this down into manageable pieces.`,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, newUserMessage, copilotResponse]);
    setInputMessage('');
  };

  const handleRoleSelect = (roleId) => {
    setActiveRole(roleId);
    const selectedRole = roles.find(r => r.id === roleId);
    const roleMessage = {
      type: 'copilot',
      message: `Perfect! I'm now acting as your ${selectedRole.name}. ${selectedRole.description}. What would you like to focus on?`,
      timestamp: new Date()
    };
    setChatMessages([...chatMessages, roleMessage]);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-6 right-6 z-50 copilot-button rounded-full w-14 h-14 flex items-center justify-center text-xl"
        title="Toggle DevFlow CoPilot"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-xl font-bold navy-text">DevFlow CoPilot</h2>
            <p className="text-sm text-gray-600 mt-1">Your AI Co-Founder</p>
            {activeRole && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm font-medium">Active Role:</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {roles.find(r => r.id === activeRole)?.icon} {roles.find(r => r.id === activeRole)?.name}
                </span>
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold navy-text mb-3">Role Simulation</h3>
            <div className="grid grid-cols-1 gap-2">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`text-left p-2 rounded-lg border transition-all duration-200 ${
                    activeRole === role.id 
                      ? 'bg-blue-50 border-blue-200 text-blue-800' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{role.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{role.name}</div>
                      <div className="text-xs text-gray-500">{role.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask your CoPilot anything..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="copilot-button px-4 py-2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}