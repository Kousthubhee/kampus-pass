import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Languages } from 'lucide-react';
import { TranslationForm } from './translate/TranslationForm';
import { CommonPhrases } from './translate/CommonPhrases';
import { TranslateSidebar } from './translate/TranslateSidebar';

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleSpeechToText = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setSourceText('Hello, how are you?');
        setIsListening(false);
      }, 2000);
    }
  };

  const handleTextToSpeech = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = {
        fr: 'fr-FR',
        es: 'es-ES',
        de: 'de-DE',
        it: 'it-IT',
        en: 'en-US'
      }[language] || 'en-US';

      utterance.rate = 0.8;
      utterance.pitch = 1;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        console.error('Speech synthesis error');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported in your browser');
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    });
  };

  const handlePhraseSelect = (phrase: any) => {
    setSourceText(phrase.english);
    setTranslatedText(phrase.french);
  };

  // Auto-translate on input/language change
  useEffect(() => {
    const translate = () => {
      if (sourceText.trim()) {
        setTranslatedText(`[Translated] ${sourceText}`);
      } else {
        setTranslatedText('');
      }
    };

    translate();
  }, [sourceText, sourceLanguage, targetLanguage]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Languages className="h-8 w-8 mr-3 text-cyan-600" />
          Translate
        </h1>
        <p className="text-lg text-gray-600">
          Real-time translation to help you communicate in French
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TranslationForm
            sourceText={sourceText}
            setSourceText={setSourceText}
            translatedText={translatedText}
            sourceLanguage={sourceLanguage}
            setSourceLanguage={setSourceLanguage}
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
            languages={languages}
            isListening={isListening}
            isSpeaking={isSpeaking}
            onTranslate={() => {}}
            onSwapLanguages={handleSwapLanguages}
            onSpeechToText={handleSpeechToText}
            onTextToSpeech={handleTextToSpeech}
            onCopyText={handleCopyText}
          />

          <CommonPhrases
            phrases={commonPhrases}
            onPhraseSelect={handlePhraseSelect}
          />
        </div>

        <TranslateSidebar />
      </div>
    </div>
  );
};
