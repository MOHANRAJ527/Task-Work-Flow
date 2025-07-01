
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Users, Check, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthSection from "@/components/auth/AuthSection";
import Dashboard from "@/components/dashboard/Dashboard";
import ChatBot from "@/components/ai/ChatBot";
import VoiceAssistant from "@/components/ai/VoiceAssistant";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const handleAuthSuccess = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    toast({
      title: "Welcome!",
      description: "Successfully signed in to TaskFlow",
    });
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Signed out",
      description: "Come back soon!",
    });
  };

  if (isAuthenticated) {
    return <Dashboard user={user} onSignOut={handleSignOut} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
          </div>
          <Badge variant="secondary" className="glass-effect text-white">
            Hackathon Project
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Manage Tasks
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Smarter
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              A full-stack todo management application with social authentication, 
              real-time collaboration, and AI-powered assistance.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 mb-12">
            <Card className="glass-effect border-white/10 hover-lift">
              <CardHeader>
                <Github className="w-8 h-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">Social Login</CardTitle>
                <CardDescription className="text-gray-300">
                  Sign in with Google, GitHub, or Facebook
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect border-white/10 hover-lift">
              <CardHeader>
                <Users className="w-8 h-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">Real-time Collaboration</CardTitle>
                <CardDescription className="text-gray-300">
                  Share tasks and collaborate with your team
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect border-white/10 hover-lift">
              <CardHeader>
                <Check className="w-8 h-8 text-green-400 mb-2" />
                <CardTitle className="text-white">AI Assistant</CardTitle>
                <CardDescription className="text-gray-300">
                  Chat and voice assistant to help manage tasks
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Auth Section */}
          <div className="max-w-md mx-auto">
            <AuthSection onAuthSuccess={handleAuthSuccess} />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-white/60" />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built with Modern Technologies
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚛️</span>
              </div>
              <h3 className="text-white font-semibold">React</h3>
              <p className="text-gray-400 text-sm">Frontend Framework</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-white font-semibold">OAuth 2.0</h3>
              <p className="text-gray-400 text-sm">Social Authentication</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗄️</span>
              </div>
              <h3 className="text-white font-semibold">Real-time DB</h3>
              <p className="text-gray-400 text-sm">Live Updates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-white font-semibold">AI Assistant</h3>
              <p className="text-gray-400 text-sm">Chat & Voice</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Preview */}
      <div className="fixed bottom-6 right-6 z-50 space-y-4">
        <ChatBot />
        <VoiceAssistant />
      </div>
    </div>
  );
};

export default Index;
