
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your TaskFlow AI assistant. I can help you manage your tasks, set priorities, and answer questions about productivity. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('task') || input.includes('todo')) {
      return 'I can help you manage your tasks! You can create new tasks using the "New Task" button in the header. Would you like me to guide you through creating a task or help you organize existing ones?';
    }
    
    if (input.includes('priority')) {
      return 'Task prioritization is key to productivity! I recommend using the Eisenhower Matrix: High priority for urgent + important tasks, Medium for important but not urgent, and Low for less critical items. Would you like help setting priorities for your current tasks?';
    }
    
    if (input.includes('deadline') || input.includes('due')) {
      return 'Setting realistic deadlines is crucial! I suggest breaking large tasks into smaller chunks and setting interim deadlines. You can set due dates when creating or editing tasks. Need help organizing your upcoming deadlines?';
    }
    
    if (input.includes('collaboration') || input.includes('share')) {
      return 'TaskFlow supports team collaboration! You can share tasks with colleagues by email or username. This helps with accountability and keeps everyone in the loop. Would you like tips on effective task delegation?';
    }
    
    if (input.includes('productivity') || input.includes('focus')) {
      return 'Here are some productivity tips: 1) Use the Pomodoro Technique (25min work + 5min break), 2) Batch similar tasks together, 3) Tackle your most important task first thing in the morning. What specific area would you like to improve?';
    }
    
    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! Great to see you using TaskFlow. I\'m here to help you stay organized and productive. What would you like to work on today?';
    }
    
    return 'That\'s an interesting question! I\'m specialized in helping with task management, productivity tips, and using TaskFlow features. Feel free to ask me about organizing tasks, setting priorities, meeting deadlines, or any productivity challenges you\'re facing.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 gradient-primary shadow-lg hover:shadow-xl transition-all duration-200"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-2xl z-50 animate-slide-up">
      <CardHeader className="gradient-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-lg">AI Assistant</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  {message.sender === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isTyping}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="icon"
              className="gradient-primary"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
