
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Volume2, Copy, RotateCcw } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface TranslationFormProps {
  sourceText: string;
  setSourceText: (text: string) => void;
  translatedText: string;
  sourceLanguage: string;
  setSourceLanguage: (lang: string) => void;
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  languages: Language[];
  isListening: boolean;
  isSpeaking: boolean;
  onTranslate: () => void;
  onSwapLanguages: () => void;
  onSpeechToText: () => void;
  onTextToSpeech: (text: string, language: string) => void;
  onCopyText: (text: string) => void;
}

export const TranslationForm = ({
  sourceText,
  setSourceText,
  translatedText,
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
  languages,
  isListening,
  isSpeaking,
  onTranslate,
  onSwapLanguages,
  onSpeechToText,
  onTextToSpeech,
  onCopyText
}: TranslationFormProps) => {
  const getLanguageByCode = (code: string) => {
    return languages.find(lang => lang.code === code);
  };

  return (
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
              onClick={onSwapLanguages}
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
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onSpeechToText}
                  className={isListening ? 'bg-red-50 border-red-300' : ''}
                >
                  🎤 {isListening ? 'Listening...' : 'Speak'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onTextToSpeech(sourceText, sourceLanguage)}
                  disabled={!sourceText.trim() || isSpeaking}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onTextToSpeech(translatedText, targetLanguage)}
                  disabled={!translatedText.trim() || isSpeaking}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCopyText(translatedText)}
                  disabled={!translatedText.trim()}
                >
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
            onClick={onTranslate}
            disabled={!sourceText.trim()}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Translate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
