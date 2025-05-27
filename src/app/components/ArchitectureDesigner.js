'use client';

import { useState } from 'react';

export default function ArchitectureDesigner({ project, onClose }) {
  const [currentStep, setCurrentStep] = useState('analyze');
  const [isGenerating, setIsGenerating] = useState(false);
  const [architectureData, setArchitectureData] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);

  const steps = {
    analyze: 'Project Analysis',
    design: 'Architecture Design',
    review: 'Review & Export'
  };

  const generateArchitecture = async () => {
    setIsGenerating(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const architecture = {
      overview: {
        type: project.type === 'web' ? 'Web Application' : project.type === 'mobile' ? 'Mobile Application' : 'Software Application',
        complexity: 'Medium',
        recommendedStack: project.type === 'web' ? 'React + Node.js + PostgreSQL' : 'React Native + Express + MongoDB',
        estimatedDevelopment: '12-16 weeks'
      },
      frontend: {
        framework: project.type === 'web' ? 'React.js' : 'React Native',
        stateManagement: 'Redux Toolkit',
        styling: 'Tailwind CSS',
        components: ['Authentication', 'Dashboard', 'User Management', 'Data Tables', 'Forms']
      },
      backend: {
        runtime: 'Node.js',
        framework: 'Express.js',
        database: project.type === 'web' ? 'PostgreSQL' : 'MongoDB',
        authentication: 'JWT + Passport.js',
        apis: ['User API', 'Authentication API', 'Data API', 'File Upload API']
      },
      infrastructure: {
        hosting: 'AWS / Vercel',
        database: 'AWS RDS / MongoDB Atlas',
        cdn: 'CloudFront',
        monitoring: 'DataDog / New Relic'
      },
      security: {
        authentication: 'Multi-factor Authentication',
        authorization: 'Role-based Access Control',
        dataEncryption: 'AES-256',
        https: 'SSL/TLS Certificate'
      },
      integrations: {
        payments: 'Stripe',
        email: 'SendGrid',
        storage: 'AWS S3',
        analytics: 'Google Analytics'
      }
    };

    setArchitectureData(architecture);
    setIsGenerating(false);
    setCurrentStep('design');
  };

  const componentCategories = [
    {
      name: 'Frontend Components',
      items: architectureData?.frontend?.components || [],
      color: 'bg-blue-100 border-blue-300'
    },
    {
      name: 'Backend APIs',
      items: architectureData?.backend?.apis || [],
      color: 'bg-green-100 border-green-300'
    },
    {
      name: 'Security Features',
      items: Object.values(architectureData?.security || {}),
      color: 'bg-red-100 border-red-300'
    },
    {
      name: 'Third-party Integrations',
      items: Object.values(architectureData?.integrations || {}),
      color: 'bg-purple-100 border-purple-300'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold navy-text mb-2">AI Architecture Designer</h2>
              <p className="text-gray-600">Project: {project.name}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 space-x-8">
            {Object.entries(steps).map(([key, label], index) => (
              <div key={key} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep === key ? 'bg-blue-500 text-white' :
                  Object.keys(steps).indexOf(currentStep) > index ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  currentStep === key ? 'text-blue-600 font-medium' : 'text-gray-600'
                }`}>
                  {label}
                </span>
                {index < Object.keys(steps).length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    Object.keys(steps).indexOf(currentStep) > index ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
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
                {currentStep === 'analyze' && "I'll analyze your project requirements and generate a comprehensive system architecture. This includes frontend, backend, database design, and deployment recommendations."}
                {currentStep === 'design' && "Here's your custom architecture design! I've analyzed best practices and created a scalable, secure solution tailored to your project needs."}
                {currentStep === 'review' && "Perfect! Your architecture is ready. You can export this as documentation or use it as a blueprint for development."}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Analysis Step */}
          {currentStep === 'analyze' && (
            <div className="text-center py-12">
              {isGenerating ? (
                <div>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 mb-2">Analyzing your project architecture...</p>
                  <p className="text-sm text-gray-500">Determining optimal tech stack, security requirements, and scalability needs</p>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">🏗️</div>
                  <h3 className="text-xl font-semibold navy-text mb-2">Ready to Design Your Architecture</h3>
                  <p className="text-gray-600 mb-6">
                    I'll analyze your {project.type} project and create a comprehensive system architecture
                    with technology recommendations, security considerations, and deployment strategies.
                  </p>
                  <button 
                    onClick={generateArchitecture}
                    className="copilot-button px-8 py-3 text-lg"
                  >
                    Generate Architecture with AI
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Design Step */}
          {currentStep === 'design' && architectureData && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Overview */}
                <div className="copilot-card">
                  <h3 className="text-lg font-semibold navy-text mb-4 flex items-center gap-2">
                    📊 Project Overview
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{architectureData.overview.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Complexity:</span>
                      <span className="font-medium">{architectureData.overview.complexity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tech Stack:</span>
                      <span className="font-medium text-sm">{architectureData.overview.recommendedStack}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-medium">{architectureData.overview.estimatedDevelopment}</span>
                    </div>
                  </div>
                </div>

                {/* Frontend */}
                <div className="copilot-card">
                  <h3 className="text-lg font-semibold navy-text mb-4 flex items-center gap-2">
                    🎨 Frontend Architecture
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Framework:</span>
                      <span className="font-medium">{architectureData.frontend.framework}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">State Management:</span>
                      <span className="font-medium">{architectureData.frontend.stateManagement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Styling:</span>
                      <span className="font-medium">{architectureData.frontend.styling}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Components:</span>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {architectureData.frontend.components.map(comp => (
                          <span key={comp} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backend */}
                <div className="copilot-card">
                  <h3 className="text-lg font-semibold navy-text mb-4 flex items-center gap-2">
                    ⚙️ Backend Architecture
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Runtime:</span>
                      <span className="font-medium">{architectureData.backend.runtime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Framework:</span>
                      <span className="font-medium">{architectureData.backend.framework}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Database:</span>
                      <span className="font-medium">{architectureData.backend.database}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">APIs:</span>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {architectureData.backend.apis.map(api => (
                          <span key={api} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            {api}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Infrastructure */}
                <div className="copilot-card">
                  <h3 className="text-lg font-semibold navy-text mb-4 flex items-center gap-2">
                    ☁️ Infrastructure & Deployment
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hosting:</span>
                      <span className="font-medium">{architectureData.infrastructure.hosting}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Database:</span>
                      <span className="font-medium">{architectureData.infrastructure.database}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CDN:</span>
                      <span className="font-medium">{architectureData.infrastructure.cdn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monitoring:</span>
                      <span className="font-medium">{architectureData.infrastructure.monitoring}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold navy-text mb-4">Architecture Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {componentCategories.map(category => (
                    <div key={category.name} className={`border-2 rounded-lg p-4 ${category.color}`}>
                      <h4 className="font-semibold text-gray-800 mb-3">{category.name}</h4>
                      <div className="space-y-2">
                        {category.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setCurrentStep('review')}
                  className="copilot-button px-8 py-3"
                >
                  Review Architecture →
                </button>
              </div>
            </div>
          )}

          {/* Review Step */}
          {currentStep === 'review' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold navy-text mb-2">Architecture Complete!</h3>
              <p className="text-gray-600 mb-8">
                Your comprehensive system architecture is ready. This includes all technical specifications,
                security considerations, and deployment recommendations.
              </p>
              
              <div className="flex justify-center gap-4">
                <button className="copilot-button px-6 py-3">
                  📄 Export Documentation
                </button>
                <button className="copilot-button px-6 py-3">
                  📧 Email Architecture
                </button>
                <button 
                  onClick={() => setCurrentStep('design')}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  ← Back to Design
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}