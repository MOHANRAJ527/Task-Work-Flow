
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowDown, Loader2 } from "lucide-react";
import ChatBot from "@/components/ai/ChatBot";
import VoiceAssistant from "@/components/ai/VoiceAssistant";

const Index = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (user) {
    return <Dashboard user={user} onSignOut={signOut} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100">
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-emerald-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-emerald-800">TaskFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
              Productivity App
            </Badge>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-emerald-800 mb-6">
              Manage Tasks
              <span className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">
                {" "}Smarter
              </span>
            </h1>
            <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
              A modern task management application with Google authentication, 
              real-time updates, and AI-powered assistance.
            </p>
            <Button 
              onClick={() => window.location.href = '/auth'}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-3"
            >
              Start Managing Tasks
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 mb-12">
            <Card className="bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <CardTitle className="text-emerald-800">Google Authentication</CardTitle>
                <CardDescription className="text-emerald-600">
                  Secure sign-in with your Google account
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Check className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-emerald-800">Task Management</CardTitle>
                <CardDescription className="text-emerald-600">
                  Create, organize and track your tasks efficiently
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🤖</span>
                </div>
                <CardTitle className="text-emerald-800">AI Assistant</CardTitle>
                <CardDescription className="text-emerald-600">
                  Chat and voice assistant to help manage tasks
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-emerald-600/60" />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">
            Built with Modern Technologies
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚛️</span>
              </div>
              <h3 className="text-emerald-800 font-semibold">React</h3>
              <p className="text-emerald-600 text-sm">Frontend Framework</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-emerald-800 font-semibold">Supabase Auth</h3>
              <p className="text-emerald-600 text-sm">Authentication & Database</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗄️</span>
              </div>
              <h3 className="text-emerald-800 font-semibold">Real-time DB</h3>
              <p className="text-emerald-600 text-sm">Live Updates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-emerald-800 font-semibold">AI Assistant</h3>
              <p className="text-emerald-600 text-sm">Chat & Voice</p>
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
