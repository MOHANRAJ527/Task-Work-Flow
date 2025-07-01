
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TaskList } from "@/components/dashboard/TaskList";
import { TaskStats } from "@/components/dashboard/TaskStats";
import { CreateTaskDialog } from "@/components/dashboard/CreateTaskDialog";
import ChatBot from "@/components/ai/ChatBot";
import VoiceAssistant from "@/components/ai/VoiceAssistant";
import { Task, TaskFilter, TaskPriority, TaskStatus } from "@/types/task";

interface DashboardProps {
  user: any;
  onSignOut: () => void;
}

const Dashboard = ({ user, onSignOut }: DashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Initialize with sample tasks
  useEffect(() => {
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the TaskFlow project',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        tags: ['documentation', 'project'],
        sharedWith: []
      },
      {
        id: '2',
        title: 'Review pull requests',
        description: 'Review and merge pending pull requests',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date(Date.now() + 86400000), // 1 day from now
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        tags: ['code-review'],
        sharedWith: []
      },
      {
        id: '3',
        title: 'Implement real-time notifications',
        description: 'Add WebSocket support for real-time task updates',
        status: 'todo',
        priority: 'high',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        tags: ['feature', 'backend'],
        sharedWith: []
      },
      {
        id: '4',
        title: 'Design user onboarding flow',
        description: 'Create wireframes and mockups for user onboarding',
        status: 'completed',
        priority: 'low',
        createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
        updatedAt: new Date(Date.now() - 86400000), // 1 day ago
        userId: user.id,
        tags: ['design', 'ux'],
        sharedWith: []
      }
    ];
    setTasks(sampleTasks);
  }, [user.id]);

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'today') {
      const today = new Date();
      return task.dueDate && 
        task.dueDate.toDateString() === today.toDateString();
    }
    if (currentFilter === 'overdue') {
      const today = new Date();
      return task.dueDate && 
        task.dueDate < today && 
        task.status !== 'completed';
    }
    if (currentFilter === 'completed') {
      return task.status === 'completed';
    }
    return task.status === currentFilter;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          user={user}
        />
        
        <main className="flex-1 flex flex-col">
          <DashboardHeader 
            user={user}
            onSignOut={onSignOut}
            onCreateTask={() => setIsCreateDialogOpen(true)}
          />
          
          <div className="flex-1 p-6 space-y-6">
            <TaskStats tasks={tasks} />
            <TaskList 
              tasks={filteredTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </main>

        <CreateTaskDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateTask={handleCreateTask}
        />

        {/* AI Assistants */}
        <div className="fixed bottom-6 right-6 z-50 space-y-4">
          <ChatBot />
          <VoiceAssistant />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
