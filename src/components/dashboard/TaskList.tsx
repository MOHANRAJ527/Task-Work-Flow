
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreVertical, Users, Tag } from "lucide-react";
import { Task, TaskPriority, TaskStatus } from "@/types/task";
import { format } from "date-fns";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const handleStatusChange = (taskId: string, completed: boolean) => {
    onUpdateTask(taskId, {
      status: completed ? 'completed' : 'todo'
    });
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tasks found</h3>
            <p className="text-sm">Create your first task to get started!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Tasks</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id} className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={task.status === 'completed'}
                  onCheckedChange={(checked) => 
                    handleStatusChange(task.id, checked as boolean)
                  }
                  className="mt-1"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-sm font-medium ${
                        task.status === 'completed' 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border z-50">
                        <DropdownMenuItem 
                          onClick={() => onUpdateTask(task.id, { 
                            status: task.status === 'in-progress' ? 'todo' : 'in-progress' 
                          })}
                        >
                          {task.status === 'in-progress' ? 'Mark as To Do' : 'Mark In Progress'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteTask(task.id)}>
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                    
                    {task.dueDate && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(task.dueDate, 'MMM d')}
                      </div>
                    )}
                    
                    {task.tags.length > 0 && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Tag className="h-3 w-3 mr-1" />
                        {task.tags.slice(0, 2).join(', ')}
                        {task.tags.length > 2 && '...'}
                      </div>
                    )}
                    
                    {task.sharedWith.length > 0 && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="h-3 w-3 mr-1" />
                        Shared
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
