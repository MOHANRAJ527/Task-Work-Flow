
import { Bell, Plus, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
  user: any;
  onSignOut: () => void;
  onCreateTask: () => void;
}

export function DashboardHeader({ user, onSignOut, onCreateTask }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm border-purple-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold text-purple-800">TaskFlow</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
            <Input
              placeholder="Search tasks..."
              className="pl-10 w-64 border-purple-200 focus:border-purple-400"
            />
          </div>

          {/* Create Task Button */}
          <Button onClick={onCreateTask} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="text-purple-600 hover:bg-purple-50">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name} />
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-50 bg-white border border-purple-200" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-purple-800">{user?.user_metadata?.full_name || user?.email}</p>
                  <p className="w-[200px] truncate text-sm text-purple-600">
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-purple-200" />
              <DropdownMenuItem className="text-purple-700 hover:bg-purple-50">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-purple-700 hover:bg-purple-50">Settings</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-purple-200" />
              <DropdownMenuItem onClick={onSignOut} className="text-purple-700 hover:bg-purple-50">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
