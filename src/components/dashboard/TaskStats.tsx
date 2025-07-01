
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Star, TrendingUp } from "lucide-react";
import { Task } from "@/types/task";

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = tasks.filter(task => {
    const today = new Date();
    return task.dueDate && task.dueDate < today && task.status !== 'completed';
  }).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: Clock,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.title === "Total Tasks" && (
              <p className="text-xs text-muted-foreground mt-1">
                {completionRate}% completion rate
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
