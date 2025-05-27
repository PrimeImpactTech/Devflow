'use client';

import { useState } from 'react';

export default function OnboardingFlow({ onComplete, onSkip }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    name: '',
    role: '',
    experience: '',
    projectType: '',
    teamSize: '',
    timeline: ''
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to DevFlow CoPilot',
      subtitle: 'Let me introduce myself...',
      copilotMessage: "Hello there! I'm your DevFlow CoPilot - think of me as your sophisticated AI co-founder. I've graduated top of my class from Harvard's Computer Science program, and I'm here to make your software development journey effortless and impressive. Shall we get started?",
      action: 'Get Started'
    },
    {
      id: 'name',
      title: 'Nice to meet you!',
      subtitle: 'What should I call you?',
      copilotMessage: "Excellence starts with proper introductions. What's your name? I prefer to keep things professional yet personal.",
      field: 'name',
      placeholder: 'Enter your name',
      action: 'Continue'
    },
    {
      id: 'role',
      title: 'Tell me about yourself',
      subtitle: 'What\'s your primary role?',
      copilotMessage: "Understanding your role helps me tailor my assistance perfectly. Whether you're a seasoned CTO or a first-time founder, I adapt my approach to match your expertise.",
      field: 'role',
      options: [
        'Founder/CEO',
        'Product Manager',
        'Developer',
        'Designer',
        'Student/Learning',
        'Other'
      ],
      action: 'Next'
    },
    {
      id: 'experience',
      title: 'Your Experience Level',
      subtitle: 'How familiar are you with software development?',
      copilotMessage: "No judgment here - everyone starts somewhere. I've worked with Fortune 500 CTOs and brilliant first-time entrepreneurs. Your experience level just helps me calibrate my guidance.",
      field: 'experience',
      options: [
        'Complete beginner',
        'Some experience',
        'Intermediate',
        'Advanced',
        'Expert'
      ],
      action: 'Continue'
    },
    {
      id: 'project',
      title: 'Your Vision',
      subtitle: 'What type of project are you building?',
      copilotMessage: "Now we're talking! This is where the magic happens. Tell me about your vision - I excel at turning ambitious ideas into structured, executable plans.",
      field: 'projectType',
      options: [
        'Web Application',
        'Mobile App',
        'Desktop Software',
        'API/Backend Service',
        'E-commerce Platform',
        'SaaS Product',
        'Not sure yet'
      ],
      action: 'Almost Done'
    },
    {
      id: 'complete',
      title: 'Perfect! Let\'s make magic happen',
      subtitle: 'Ready to build something extraordinary?',
      copilotMessage: "Excellent! I now have everything I need to provide you with world-class guidance. Remember: I don't break under pressure - I break problems down. Let's build something that makes people stop and say 'wow'.",
      action: 'Launch DevFlow CoPilot'
    }
  ];

  const currentStepData = steps[currentStep];

  const handleInputChange = (value) => {
    if (currentStepData.field) {
      setOnboardingData(prev => ({
        ...prev,
        [currentStepData.field]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(onboardingData);
    }
  };

  const canProceed = () => {
    if (!currentStepData.field) return true;
    return onboardingData[currentStepData.field]?.trim() !== '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium navy-text">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button 
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Avatar and Message */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              DC
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-gray-800 leading-relaxed">
                  {currentStepData.copilotMessage}
                </p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold navy-text mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">{currentStepData.subtitle}</p>
          </div>

          {/* Input Field */}
          {currentStepData.field && (
            <div className="mb-8">
              {currentStepData.options ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentStepData.options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleInputChange(option)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        onboardingData[currentStepData.field] === option
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={onboardingData[currentStepData.field] || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentStepData.placeholder}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                  autoFocus
                />
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`copilot-button px-8 py-3 text-lg font-semibold ${
                !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {currentStepData.action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}