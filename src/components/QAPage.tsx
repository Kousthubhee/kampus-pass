import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

export const QAPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m here to help you with any questions about studying in France. What would you like to know?'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const commonQuestions = [
    'How do I apply for a student visa?',
    'What are the living costs in France?',
    'How to open a bank account in France?',
    'What documents do I need for Campus France?',
    'How to find student accommodation?',
    'What is CAF and how to apply?'
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: newMessage
    };

    const botResponse = {
      id: messages.length + 2,
      type: 'bot',
      message: `Thanks for your question about "${newMessage}". This is a simulated response. In a real implementation, this would connect to an AI service to provide accurate answers about studying in France.`
    };

    setMessages([...messages, userMessage, botResponse]);
    setNewMessage('');
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <MessageSquare className="h-8 w-8 mr-3 text-blue-600" />
          Ask Me Anything
        </h1>
        <p className="text-lg text-gray-600">
          Get instant answers to your questions about studying in France
        </p>
      </div>

      <Card className="h-96 mb-6">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start max-w-xs lg:max-w-md ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-full ${msg.type === 'user' ? 'bg-blue-600 text-white ml-2' : 'bg-gray-200 text-gray-600 mr-2'}`}>
                    {msg.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your question here..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commonQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto p-3 text-left"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
