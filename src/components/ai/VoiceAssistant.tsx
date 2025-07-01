
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setResponse('');
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      processVoiceCommand(transcript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast({
        title: "Recognition Error",
        description: "Failed to recognize speech. Please try again.",
        variant: "destructive",
      });
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = generateVoiceResponse(command);
      setResponse(response);
      
      // Speak the response
      speakResponse(response);
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process voice command.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateVoiceResponse = (command: string): string => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('create') && cmd.includes('task')) {
      return 'I can help you create a task. Please use the New Task button in the dashboard to add details like title, description, and due date.';
    }
    
    if (cmd.includes('show') && (cmd.includes('task') || cmd.includes('todo'))) {
      return 'You can view all your tasks in the dashboard. Use the sidebar filters to see specific categories like Today, Overdue, or Completed tasks.';
    }
    
    if (cmd.includes('help')) {
      return 'I can help you with task management, creating new tasks, setting priorities, and answering productivity questions. What would you like to know?';
    }
    
    if (cmd.includes('priority')) {
      return 'You can set task priorities as High, Medium, or Low when creating or editing tasks. High priority tasks should be tackled first.';
    }
    
    if (cmd.includes('deadline') || cmd.includes('due date')) {
      return 'Set due dates for your tasks to stay organized. You can view overdue tasks using the sidebar filter.';
    }
    
    return 'I heard you say: ' + command + '. I can help with task management, productivity tips, and using TaskFlow features. Please be more specific about what you need help with.';
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
        size="icon"
      >
        <Mic className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="w-80 shadow-2xl z-50 animate-slide-up">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-5 w-5" />
            <CardTitle className="text-lg">Voice Assistant</CardTitle>
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
      
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`w-20 h-20 rounded-full ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            size="icon"
          >
            {isListening ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
          
          <p className="text-sm text-gray-600 mt-2">
            {isListening 
              ? 'Listening...' 
              : isProcessing 
                ? 'Processing...' 
                : 'Click to speak'
            }
          </p>
        </div>

        {transcript && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-blue-800">You said:</p>
            <p className="text-sm text-blue-700">{transcript}</p>
          </div>
        )}

        {response && (
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-purple-800">Assistant:</p>
            <p className="text-sm text-purple-700">{response}</p>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center">
          Try saying: "Create a task", "Show my tasks", "Help me with priorities"
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;
