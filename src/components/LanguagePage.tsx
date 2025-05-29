import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages, Play, Volume2, BookOpen, Award, Mic, MicOff } from 'lucide-react';

export const LanguagePage = () => {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const lessons = [/* your existing lessons array */];
  const tips = [/* your existing tips array */];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        // Log or handle transcript as needed
        console.log('User said:', transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = 'fr-FR';

      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'));
      if (frenchVoice) utterance.voice = frenchVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Languages className="h-8 w-8 mr-3 text-indigo-600" />
          Learn French
        </h1>
        <p className="text-lg text-gray-600">
          Essential French phrases for your studies and daily life in France
        </p>
      </div>

      {selectedLesson ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => setSelectedLesson(null)} className="mr-4">
              ← Back to Lessons
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedLesson.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span className="mr-4">{selectedLesson.level}</span>
                <span>{selectedLesson.duration}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <Button
              onClick={toggleListening}
              variant="outline"
              className={isListening ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4 mr-2" /> Stop Listening
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" /> Practice Speaking
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            {selectedLesson.phrases.map((phrase: any, index: number) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900 mb-1">
                        {phrase.french}
                      </div>
                      <div className="text-sm text-gray-500">
                        [{phrase.pronunciation}]
                      </div>
                    </div>
                    <div className="text-gray-700">
                      {phrase.english}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => speakText(phrase.french)}>
                        <Volume2 className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                      <Button size="sm" variant="outline" onClick={toggleListening}>
                        <Play className="h-4 w-4 mr-2" />
                        Speak
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Lesson Complete!
              </h3>
              <p className="text-green-700 mb-4">
                Great job! You've learned {selectedLesson.phrases.length} essential phrases.
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Mark as Complete
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <CardContent className="p-6">
                    <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {lesson.title}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        lesson.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        lesson.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lesson.level}
                      </span>
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                    </div>

                    <Button className="w-full" size="sm">
                      Start Lesson
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Learning Tips</h3>
                <div className="space-y-3">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-indigo-600 mr-2 mt-0.5">💡</div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons Completed</span>
                    <span className="font-semibold">0 / {lessons.length}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                  <div className="text-sm text-gray-500">
                    Complete lessons to track your progress
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Practice</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    🗣️ Pronunciation Practice
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📝 Writing Exercise
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    👂 Listening Comprehension
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🎯 Quick Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
