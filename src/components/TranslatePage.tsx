import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Volume2, ArrowLeft } from 'lucide-react';

interface TranslationFormProps {
  sourceText: string;
  setSourceText: (text: string) => void;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  onTranslate: () => void;
  isLoading: boolean;
}

interface CommonPhrasesProps {
  phrases: Array<{ english: string; french: string; category: string }>;
  onPhraseSelect: (phrase: { english: string; french: string }) => void;
}

const TranslationForm = ({ sourceText, setSourceText, translatedText, sourceLanguage, targetLanguage, setSourceLanguage, setTargetLanguage, onTranslate, isLoading }: TranslationFormProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Translate</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <select
              className="border rounded px-4 py-2"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
            <select
              className="border rounded px-4 py-2"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="fr">French</option>
              <option value="en">English</option>
            </select>
          </div>
          <textarea
            className="border rounded px-4 py-2"
            placeholder="Enter text to translate"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          />
          <textarea
            className="border rounded px-4 py-2"
            placeholder="Translated text"
            value={translatedText}
            readOnly
          />
          <Button onClick={onTranslate} disabled={isLoading}>
            {isLoading ? "Translating..." : "Translate"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CommonPhrases = ({ phrases, onPhraseSelect }: CommonPhrasesProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Common Phrases</h2>
        <div className="grid gap-4">
          {phrases.map((phrase, index) => (
            <Button key={index} onClick={() => onPhraseSelect(phrase)}>
              {phrase.english} - {phrase.french} ({phrase.category})
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);

  const commonPhrases = [
    { english: "Hello", french: "Bonjour", category: "Greetings" },
    { english: "Thank you", french: "Merci", category: "Greetings" },
    { english: "Excuse me", french: "Excusez-moi", category: "Polite" },
  ];

  const handleTranslate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTranslatedText(`Translated: ${sourceText}`);
      setIsLoading(false);
    }, 1000);
  };

  const handlePhraseSelect = (phrase: { english: string; french: string }) => {
    setSourceText(phrase.english);
    setTranslatedText(phrase.french);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">🌐 Translation Hub</h1>
        <p className="text-lg text-gray-600">Translate between English and French instantly</p>
      </div>

      <Tabs defaultValue="translate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="translate">Translate</TabsTrigger>
          <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
        </TabsList>

        <TabsContent value="translate">
          <TranslationForm
            sourceText={sourceText}
            setSourceText={setSourceText}
            translatedText={translatedText}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            setSourceLanguage={setSourceLanguage}
            setTargetLanguage={setTargetLanguage}
            onTranslate={handleTranslate}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="phrases">
          <CommonPhrases
            phrases={commonPhrases}
            onPhraseSelect={handlePhraseSelect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
