
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TaskList } from "@/components/dashboard/TaskList";
import { TaskStats } from "@/components/dashboard/TaskStats";
import { CreateTaskDialog } from "@/components/dashboard/CreateTaskDialog";
import ChatBot from "@/components/ai/ChatBot";
import VoiceAssistant from "@/components/ai/VoiceAssistant";
import { Task, TaskFilter } from "@/types/task";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  user: any;
  onSignOut: () => void;
}

const Dashboard = ({ user, onSignOut }: DashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch tasks from Supabase
  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
        toast({
          title: "Error",
          description: "Failed to load tasks",
          variant: "destructive",
        });
      } else {
        const formattedTasks: Task[] = (data || []).map(task => ({
          ...task,
          dueDate: task.due_date ? new Date(task.due_date) : undefined,
          createdAt: new Date(task.created_at),
          updatedAt: new Date(task.updated_at),
          userId: task.user_id,
          tags: [],
          sharedWith: []
        }));
        setTasks(formattedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          user_id: user.id,
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          due_date: taskData.dueDate?.toISOString(),
        }])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create task",
          variant: "destructive",
        });
      } else {
        const newTask: Task = {
          ...data,
          dueDate: data.due_date ? new Date(data.due_date) : undefined,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          userId: data.user_id,
          tags: [],
          sharedWith: []
        };
        setTasks(prev => [newTask, ...prev]);
        toast({
          title: "Success",
          description: "Task created successfully",
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: updates.title,
          description: updates.description,
          status: updates.status,
          priority: updates.priority,
          due_date: updates.dueDate?.toISOString(),
        })
        .eq('id', taskId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update task",
          variant: "destructive",
        });
      } else {
        setTasks(prev => prev.map(task => 
          task.id === taskId 
            ? { ...task, ...updates, updatedAt: new Date() }
            : task
        ));
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete task",
          variant: "destructive",
        });
      } else {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        toast({
          title: "Success",
          description: "Task deleted successfully",
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-emerald-50 to-teal-50">
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
              loading={loading}
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
