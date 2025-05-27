'use client';

import { useState } from 'react';
import NewProjectForm from './NewProjectForm';
import CoPilotSidebar from './CoPilotSidebar';
import OnboardingFlow from './OnboardingFlow';
import AgileWorkspace from './AgileWorkspace';
import UserStoryGenerator from './UserStoryGenerator';
import ArchitectureDesigner from './ArchitectureDesigner';
import HarveyAvatar from './HarveyAvatar';
import { ThemeProvider, useTheme } from './ThemeProvider';

function DashboardContent() {
  const { theme, toggleTheme } = useTheme();
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [showAgileWorkspace, setShowAgileWorkspace] = useState(false);
  const [showUserStoryGenerator, setShowUserStoryGenerator] = useState(false);
  const [showArchitectureDesigner, setShowArchitectureDesigner] = useState(false);
  const [projectUserStories, setProjectUserStories] = useState({});

  const handleSaveProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setProjects([...projects, newProject]);
  };

  const handleViewBacklog = () => {
    if (projects.length === 0) {
      const sampleProject = {
        id: 'sample-1',
        name: 'Sample Project',
        type: 'web',
        description: 'A sample project to demonstrate the Agile Workspace',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      setProjects([sampleProject]);
      setSelectedProject(sampleProject);
    } else {
      setSelectedProject(projects[0]);
    }
    setShowAgileWorkspace(true);
  };

  const handleGenerateUserStories = () => {
    if (projects.length === 0) {
      const sampleProject = {
        id: 'sample-1',
        name: 'Sample Project',
        type: 'web',
        description: 'A sample project to demonstrate User Story Generation',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      setProjects([sampleProject]);
      setSelectedProject(sampleProject);
    } else if (!selectedProject) {
      setSelectedProject(projects[0]);
    }
    setShowUserStoryGenerator(true);
  };

  const handleCreateArchitecture = () => {
    if (projects.length === 0) {
      const sampleProject = {
        id: 'sample-1',
        name: 'Sample Project',
        type: 'web',
        description: 'A sample project to demonstrate Architecture Design',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      setProjects([sampleProject]);
      setSelectedProject(sampleProject);
    } else if (!selectedProject) {
      setSelectedProject(projects[0]);
    }
    setShowArchitectureDesigner(true);
  };

  const handleSaveUserStories = (stories) => {
    if (selectedProject) {
      setProjectUserStories(prev => ({
        ...prev,
        [selectedProject.id]: [
          ...(prev[selectedProject.id] || []),
          ...stories
        ]
      }));
    }
  };

  return (
    <div className="min-h-screen p-8 animate-theme-switch">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        {theme === 'light' ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>

      <CoPilotSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      {showOnboarding && (
        <OnboardingFlow
          onComplete={(data) => {
            setUserProfile(data);
            setShowOnboarding(false);
          }}
          onSkip={() => setShowOnboarding(false)}
        />
      )}

      {showUserStoryGenerator && selectedProject && (
        <UserStoryGenerator
          project={selectedProject}
          onClose={() => setShowUserStoryGenerator(false)}
          onSaveStories={handleSaveUserStories}
        />
      )}

      {showArchitectureDesigner && selectedProject && (
        <ArchitectureDesigner
          project={selectedProject}
          onClose={() => setShowArchitectureDesigner(false)}
        />
      )}

      {showAgileWorkspace && selectedProject ? (
        <AgileWorkspace
          project={selectedProject}
          userStories={projectUserStories[selectedProject.id] || []}
          onBack={() => {
            setShowAgileWorkspace(false);
            setSelectedProject(null);
          }}
        />
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header with Professional Logo & Harvey Avatar */}
          <div className="copilot-container mb-8 p-8 text-center animate-fade-in-up">
            {/* Professional Logo */}
            <div className="devflow-logo justify-center mb-6">
              <div className="logo-mark">
                D
              </div>
              <div className="logo-text">
                <div className="logo-primary">
                  DevFlow <span className="gold-accent">CoPilot</span>
                </div>
                <div className="logo-secondary">
                  AI Co-Founder for Software Development
                </div>
              </div>
            </div>

            <p className="text-xl mb-4 brand-subtitle">
              Your sophisticated AI co-founder for enterprise software development
            </p>
            
            {/* Enhanced Harvey Specter Quote with better visibility */}
            <div className="mt-6 px-6 py-3 copilot-quote rounded-2xl inline-block">
              <p className="text-sm italic font-medium">
                "Deadlines don't scare me. Poor planning does." 💼
              </p>
            </div>
            
            {userProfile && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <HarveyAvatar size="lg" interactive={true} />
                <div className="text-left">
                  <p className="text-lg font-semibold">Welcome back, {userProfile.name}!</p>
                  <p className="text-sm opacity-70">{userProfile.role} • {userProfile.experience} Experience</p>
                  <p className="text-xs opacity-60 mt-1">Your AI Senior Partner is ready</p>
                </div>
              </div>
            )}

            {/* Theme Indicator */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs opacity-60">
              <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
              <span className="capitalize">{theme} Theme Active</span>
            </div>
          </div>

          {showNewProjectForm ? (
            <div className="copilot-container p-8 animate-fade-in-up">
              <NewProjectForm
                onClose={() => setShowNewProjectForm(false)}
                onSave={handleSaveProject}
              />
            </div>
          ) : selectedProject && !showAgileWorkspace ? (
            <div className="copilot-container p-8 animate-fade-in-up">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <HarveyAvatar size="md" />
                  <div>
                    <h2 className="text-4xl font-bold mb-2 brand-title">{selectedProject.name}</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-lg capitalize">{selectedProject.type} project</span>
                      <span className="status-badge status-active">{selectedProject.status}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="copilot-button"
                >
                  ← Back to Dashboard
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="copilot-card">
                  <h3 className="text-xl font-semibold mb-4 brand-title">📋 Project Overview</h3>
                  <p className="leading-relaxed mb-4">{selectedProject.description}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Project Type:</span>
                      <span className="font-semibold capitalize">{selectedProject.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Created:</span>
                      <span className="font-semibold">
                        {new Date(selectedProject.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="copilot-card">
                  <div className="flex items-center gap-3 mb-4">
                    <HarveyAvatar size="sm" />
                    <h3 className="text-xl font-semibold brand-title">🎯 Harvey's Insights</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">User Stories Generated:</span>
                      <span className="font-bold soft-blue text-lg">
                        {projectUserStories[selectedProject.id]?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Completion Estimate:</span>
                      <span className="font-semibold">12-16 weeks</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Complexity Level:</span>
                      <span className="status-badge status-pending">Medium</span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm italic opacity-80">
                        "This project has solid fundamentals. Let's execute flawlessly."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowUserStoryGenerator(true)}
                  className="copilot-button"
                >
                  🎯 Generate User Stories
                </button>
                <button 
                  onClick={() => setShowAgileWorkspace(true)}
                  className="copilot-button"
                >
                  📋 Open Agile Workspace
                </button>
                <button 
                  onClick={() => setShowArchitectureDesigner(true)}
                  className="copilot-button"
                >
                  🏗️ Create Architecture
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Enhanced Main Dashboard Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="copilot-card animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🚀</div>
                    <HarveyAvatar size="sm" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 brand-title">
                    Project Management
                  </h2>
                  <p className="mb-6 leading-relaxed">
                    Create and manage your software projects with AI assistance.
                    Let me handle the heavy lifting while you focus on the vision.
                  </p>
                  <button
                    className="copilot-button w-full"
                    onClick={() => setShowNewProjectForm(true)}
                  >
                    Start New Project
                  </button>
                </div>

                <div className="copilot-card animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">⚡</div>
                    <HarveyAvatar size="sm" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 brand-title">
                    Agile Planning
                  </h2>
                  <p className="mb-6 leading-relaxed">
                    Let AI help you create user stories and plan sprints.
                    I don't break under pressure—I break problems down.
                  </p>
                  <button 
                    className="copilot-button w-full"
                    onClick={handleViewBacklog}
                  >
                    View Agile Workspace
                  </button>
                </div>
              </div>

              {/* Enhanced Quick Actions with Harvey */}
              <div className="copilot-container p-8 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center gap-3 mb-6">
                  <HarveyAvatar size="md" interactive={true} />
                  <h2 className="text-2xl font-semibold brand-title">Harvey's AI-Powered Solutions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button 
                    onClick={handleGenerateUserStories}
                    className="copilot-card text-left p-6 hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">🎯</div>
                      <HarveyAvatar size="sm" />
                    </div>
                    <h3 className="font-semibold mb-2 brand-title">Generate User Stories</h3>
                    <p className="text-sm opacity-70">AI-powered user story creation with detailed acceptance criteria</p>
                  </button>

                  <button 
                    onClick={handleViewBacklog}
                    className="copilot-card text-left p-6 hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">📋</div>
                      <HarveyAvatar size="sm" />
                    </div>
                    <h3 className="font-semibold mb-2 brand-title">Agile Workspace</h3>
                    <p className="text-sm opacity-70">Kanban board with sprint planning and intelligent task management</p>
                  </button>

                  <button 
                    onClick={handleCreateArchitecture}
                    className="copilot-card text-left p-6 hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">🏗️</div>
                      <HarveyAvatar size="sm" />
                    </div>
                    <h3 className="font-semibold mb-2 brand-title">Architecture Design</h3>
                    <p className="text-sm opacity-70">AI-assisted system architecture and enterprise technical planning</p>
                  </button>
                </div>
              </div>

              {/* Enhanced Projects Table */}
              {projects.length > 0 && (
                <div className="copilot-container p-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  <div className="flex items-center gap-3 mb-6">
                    <HarveyAvatar size="sm" />
                    <h2 className="text-2xl font-semibold brand-title">Your Portfolio</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2">
                          <th className="text-left py-4 px-6 font-semibold">Project Name</th>
                          <th className="text-left py-4 px-6 font-semibold">Type</th>
                          <th className="text-left py-4 px-6 font-semibold">Stories</th>
                          <th className="text-left py-4 px-6 font-semibold">Status</th>
                          <th className="text-left py-4 px-6 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map(project => (
                          <tr key={project.id} className="border-b hover:bg-opacity-5 transition-colors">
                            <td className="py-4 px-6 font-medium">{project.name}</td>
                            <td className="py-4 px-6 capitalize">{project.type}</td>
                            <td className="py-4 px-6">
                              <span className="soft-blue font-semibold">
                                {projectUserStories[project.id]?.length || 0} stories
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="status-badge status-active">
                                {project.status}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex gap-3">
                                <button
                                  onClick={() => setSelectedProject(project)}
                                  className="text-sm font-medium soft-blue hover:opacity-80 transition-opacity"
                                >
                                  View Details →
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedProject(project);
                                    setShowAgileWorkspace(true);
                                  }}
                                  className="text-sm font-medium text-green-600 hover:opacity-80 transition-opacity"
                                >
                                  Workspace
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}