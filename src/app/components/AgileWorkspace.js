'use client';

import { useState } from 'react';

export default function AgileWorkspace({ project, onBack }) {
  const [activeTab, setActiveTab] = useState('kanban');
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Set up development environment',
      description: 'Configure development tools and dependencies',
      status: 'todo',
      priority: 'high',
      assignee: 'You',
      createdBy: 'DevFlow CoPilot'
    },
    {
      id: '2',
      title: 'Design user authentication flow',
      description: 'Create wireframes and user stories for login/signup',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'You',
      createdBy: 'DevFlow CoPilot'
    },
    {
      id: '3',
      title: 'Implement database schema',
      description: 'Design and create the initial database structure',
      status: 'done',
      priority: 'high',
      assignee: 'You',
      createdBy: 'DevFlow CoPilot'
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ];

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task = {
        ...newTask,
        id: Date.now().toString(),
        status: 'todo',
        assignee: 'You',
        createdBy: 'DevFlow CoPilot'
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', priority: 'medium' });
      setShowAddTask(false);
    }
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const generateAITasks = () => {
    const aiTasks = [
      {
        id: Date.now().toString() + '1',
        title: 'Create user personas',
        description: 'AI-generated user personas based on your project requirements',
        status: 'todo',
        priority: 'medium',
        assignee: 'You',
        createdBy: 'DevFlow CoPilot AI'
      },
      {
        id: Date.now().toString() + '2',
        title: 'Set up CI/CD pipeline',
        description: 'Automated deployment and testing pipeline configuration',
        status: 'todo',
        priority: 'low',
        assignee: 'You',
        createdBy: 'DevFlow CoPilot AI'
      }
    ];
    setTasks([...tasks, ...aiTasks]);
  };

  return (
    <div className="copilot-container p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold navy-text mb-2">{project.name}</h1>
          <p className="text-gray-600">Agile Workspace</p>
        </div>
        <button onClick={onBack} className="copilot-button">
          ← Back to Dashboard
        </button>
      </div>

      {/* AI Assistant Message */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border-l-4 border-blue-500">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            DC
          </div>
          <div>
            <p className="text-gray-800 font-medium">DevFlow CoPilot suggests:</p>
            <p className="text-gray-700 text-sm mt-1">
              "Excellence is in the details. I've analyzed your project and created an initial backlog. 
              Let's break this down into manageable sprints and ship something impressive."
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {[
          { id: 'kanban', label: '📋 Kanban Board', icon: '📋' },
          { id: 'backlog', label: '📝 Backlog', icon: '📝' },
          { id: 'sprint', label: '⚡ Sprint Planning', icon: '⚡' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Kanban Board */}
      {activeTab === 'kanban' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold navy-text">Kanban Board</h2>
            <div className="flex gap-2">
              <button 
                onClick={generateAITasks}
                className="copilot-button text-sm"
              >
                🤖 Generate AI Tasks
              </button>
              <button 
                onClick={() => setShowAddTask(true)}
                className="copilot-button text-sm"
              >
                + Add Task
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {columns.map(column => (
              <div key={column.id} className={`${column.color} rounded-lg p-4`}>
                <h3 className="font-semibold navy-text mb-4 flex items-center justify-between">
                  {column.title}
                  <span className="text-sm text-gray-600">
                    {tasks.filter(task => task.status === column.id).length}
                  </span>
                </h3>
                
                <div className="space-y-3">
                  {tasks
                    .filter(task => task.status === column.id)
                    .map(task => (
                      <div
                        key={task.id}
                        className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const taskId = e.dataTransfer.getData('taskId');
                          moveTask(taskId, column.id);
                        }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2 text-sm">
                          {task.title}
                        </h4>
                        <p className="text-gray-600 text-xs mb-3">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            {task.assignee}
                          </span>
                        </div>
                        
                        {task.createdBy.includes('AI') && (
                          <div className="mt-2 text-xs text-blue-600 flex items-center gap-1">
                            🤖 AI Generated
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backlog Tab */}
      {activeTab === 'backlog' && (
        <div>
          <h2 className="text-xl font-semibold navy-text mb-6">Product Backlog</h2>
          <div className="bg-white rounded-lg border border-gray-200">
            {tasks.map(task => (
              <div key={task.id} className="p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">{task.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Status: {task.status}</span>
                      <span>Priority: {task.priority}</span>
                      <span>Assignee: {task.assignee}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sprint Planning Tab */}
      {activeTab === 'sprint' && (
        <div>
          <h2 className="text-xl font-semibold navy-text mb-6">Sprint Planning</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="copilot-card">
              <h3 className="text-lg font-semibold navy-text mb-4">Current Sprint</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sprint Duration:</span>
                  <span className="font-medium">2 weeks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks Completed:</span>
                  <span className="font-medium">{tasks.filter(t => t.status === 'done').length} / {tasks.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(tasks.filter(t => t.status === 'done').length / tasks.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="copilot-card">
              <h3 className="text-lg font-semibold navy-text mb-4">AI Recommendations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Focus on high-priority tasks first</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">💡</span>
                  <span>Consider breaking down large tasks</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span>Review tasks in progress for bottlenecks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold navy-text mb-4">Add New Task</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              
              <textarea
                placeholder="Task description"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg h-20"
              />
              
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAddTask(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTask}
                className="flex-1 copilot-button"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}