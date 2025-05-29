import { useState, useEffect, useRef } from 'react';
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
  const recognitionRef = useRef<any>(null);

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

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        setSourceText(transcript);
        simulateTranslation(transcript);
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

  const simulateTranslation = (text: string) => {
    const frenchPhrases: Record<string, string> = {
      'hello': 'Bonjour',
      'good morning': 'Bon matin',
      'how are you': 'Comment allez-vous',
      'thank you': 'Merci',
      'goodbye': 'Au revoir',
      'my name is': 'Je m\'appelle',
      'where is': 'Où est',
      'how much': 'Combien',
      'help': 'Aidez-moi',
      'please': 's\'il vous plaît',
      'excuse me': 'Excusez-moi',
      'sorry': 'Désolé',
      'yes': 'Oui',
      'no': 'Non',
      'i would like': 'Je voudrais',
      'restaurant': 'restaurant',
      'food': 'nourriture',
      'water': 'eau',
      'toilet': 'toilettes'
    };

    let translated = text.toLowerCase();

    Object.entries(frenchPhrases).forEach(([english, french]) => {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      translated = translated.replace(regex, french);
    });

    setTranslatedText(translated);
  };

  const handleTranslate = () => {
    if (sourceText.trim()) {
      simulateTranslation(sourceText);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleSpeechToText = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
      }
    }
  };

  const handleTextToSpeech = (text: string, language: string) => {
    if (!text.trim()) return;

    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = {
        fr: 'fr-FR',
        es: 'es-ES',
        de: 'de-DE',
        it: 'it-IT',
        en: 'en-US'
      }[language] || 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const match = voices.find(v => v.lang.startsWith(utterance.lang));
      if (match) utterance.voice = match;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e.error);
        setIsSpeaking(false);
      };

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 150);
    } else {
      alert('Speech synthesis not supported in this browser.');
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Languages className="h-8 w-8 mr-3 text-cyan-600" />
          Translate
        </h1>
        <p className="text-lg text-gray-600">
          Real-time voice and text translation from English to French
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
            onTranslate={handleTranslate}
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
