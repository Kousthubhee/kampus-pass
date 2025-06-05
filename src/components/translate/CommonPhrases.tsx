
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Phrase {
  english: string;
  french: string;
}

interface CommonPhrasesProps {
  phrases: Phrase[];
  onPhraseSelect: (phrase: Phrase) => void;
}

export const CommonPhrases = ({ phrases, onPhraseSelect }: CommonPhrasesProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Common Phrases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {phrases.map((phrase, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto p-3 text-left"
              onClick={() => onPhraseSelect(phrase)}
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
  );
};
