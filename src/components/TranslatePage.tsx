
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TranslationForm } from './translate/TranslationForm';
import { CommonPhrases } from './translate/CommonPhrases';
import { TranslateSidebar } from './translate/TranslateSidebar';
import { Globe, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  }[];
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
    SpeechRecognition: new () => SpeechRecognition;
  }
}

export const TranslatePage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Globe className="h-8 w-8 mr-3 text-blue-600" />
          Translation Hub
        </h1>
        <p className="text-lg text-gray-600">
          Translate text, learn common phrases, and practice pronunciation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="translate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="translate">Translate</TabsTrigger>
              <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
            </TabsList>
            
            <TabsContent value="translate" className="space-y-4">
              <TranslationForm />
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Voice Input</h3>
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      variant={isListening ? "destructive" : "default"}
                      size="sm"
                    >
                      {isListening ? (
                        <>
                          <MicOff className="h-4 w-4 mr-2" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Start Recording
                        </>
                      )}
                    </Button>
                  </div>
                  {isListening && (
                    <p className="text-sm text-red-600 mt-2">
                      Listening... Speak now
                    </p>
                  )}
                  {transcript && (
                    <p className="text-sm text-gray-700 mt-2">
                      Transcript: {transcript}
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="phrases">
              <CommonPhrases />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <TranslateSidebar />
        </div>
      </div>
    </div>
  );
};
