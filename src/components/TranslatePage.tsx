
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Volume2, Copy, RotateCcw, Translate } from 'lucide-react';

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [isListening, setIsListening] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' }
  ];

  const commonPhrases = [
    { english: 'Where is the bathroom?', french: 'Où sont les toilettes?' },
    { english: 'How much does this cost?', french: 'Combien ça coûte?' },
    { english: 'I don\'t speak French well', french: 'Je ne parle pas bien français' },
    { english: 'Can you help me?', french: 'Pouvez-vous m\'aider?' },
    { english: 'What time is it?', french: 'Quelle heure est-il?' },
    { english: 'I would like to order', french: 'Je voudrais commander' }
  ];

  const handleTranslate = () => {
    // Simulate translation (in real app, this would call a translation API)
    if (sourceText.trim()) {
      setTranslatedText(`[Translated] ${sourceText}`);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleSpeechToText = () => {
    setIsListening(!isListening);
    // In a real app, this would start speech recognition
    if (!isListening) {
      setTimeout(() => {
        setSourceText('Hello, how are you?');
        setIsListening(false);
      }, 2000);
    }
  };

  const handlePhraseSelect = (phrase: any) => {
    setSourceText(phrase.english);
    setTranslatedText(phrase.french);
  };

  const getLanguageByCode = (code: string) => {
    return languages.find(lang => lang.code === code);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Translate className="h-8 w-8 mr-3 text-cyan-600" />
          Translate
        </h1>
        <p className="text-lg text-gray-600">
          Real-time translation to help you communicate in French
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <select 
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSwapLanguages}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  
                  <select 
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {getLanguageByCode(sourceLanguage)?.flag} {getLanguageByCode(sourceLanguage)?.name}
                    </label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSpeechToText}
                      className={isListening ? 'bg-red-50 border-red-300' : ''}
                    >
                      🎤 {isListening ? 'Listening...' : 'Speak'}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Enter text to translate..."
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    className="h-32 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {getLanguageByCode(targetLanguage)?.flag} {getLanguageByCode(targetLanguage)?.name}
                    </label>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Translation will appear here..."
                    value={translatedText}
                    readOnly
                    className="h-32 resize-none bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <Button 
                  onClick={handleTranslate}
                  disabled={!sourceText.trim()}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Translate
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Common Phrases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commonPhrases.map((phrase, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => handlePhraseSelect(phrase)}
                  >
                    <div>
                      <div className="font-medium">{phrase.english}</div>
                      <div className="text-sm text-gray-500">{phrase.french}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="text-cyan-600 mr-2">🎤</div>
                  <span className="text-sm">Speech-to-Text</span>
                </div>
                <div className="flex items-center">
                  <div className="text-cyan-600 mr-2">🔊</div>
                  <span className="text-sm">Text-to-Speech</span>
                </div>
                <div className="flex items-center">
                  <div className="text-cyan-600 mr-2">📋</div>
                  <span className="text-sm">Copy Translation</span>
                </div>
                <div className="flex items-center">
                  <div className="text-cyan-600 mr-2">🔄</div>
                  <span className="text-sm">Swap Languages</span>
                </div>
                <div className="flex items-center">
                  <div className="text-cyan-600 mr-2">📝</div>
                  <span className="text-sm">Save Translations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Translation History</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm font-medium">Where is the library?</div>
                  <div className="text-xs text-gray-500">Où est la bibliothèque?</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm font-medium">Thank you very much</div>
                  <div className="text-xs text-gray-500">Merci beaucoup</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm font-medium">I need help</div>
                  <div className="text-xs text-gray-500">J'ai besoin d'aide</div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                View All History
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📍 Nearby Translator
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📚 Learn Phrases
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🔊 Pronunciation Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💾 Save Translation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
