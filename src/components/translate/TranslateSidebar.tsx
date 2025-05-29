
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const TranslateSidebar = () => {
  return (
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
  );
};
