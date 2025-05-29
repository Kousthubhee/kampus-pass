import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Upload, Share2 } from 'lucide-react';

export const ReelsPage = () => {
  const [reels, setReels] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Arrival');

  const handleUpload = () => {
    if (file && title) {
      const newReel = {
        id: Date.now(),
        fileURL: URL.createObjectURL(file),
        title,
        description,
        category,
      };
      setReels([newReel, ...reels]);
      setFile(null);
      setTitle('');
      setDescription('');
      setCategory('Arrival');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center mb-2">
          <Video className="h-8 w-8 mr-3 text-pink-600" />
          Share a Reel
        </h1>
        <p className="text-gray-600">Upload short clips to share your student life in France</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-4">
          <input 
            type="file" 
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
          <input 
            type="text" 
            placeholder="Reel Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded"
          />
          <textarea 
            placeholder="Write a short description or story..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded resize-none"
            rows={3}
          />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded"
          >
            <option value="Arrival">Arrival</option>
            <option value="Campus Life">Campus Life</option>
            <option value="Food & Culture">Food & Culture</option>
            <option value="Housing">Housing</option>
            <option value="Visa & Docs">Visa & Docs</option>
          </select>

          <Button onClick={handleUpload} className="w-full bg-pink-600 hover:bg-pink-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Reel
          </Button>
        </CardContent>
      </Card>

      {reels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reels.map((reel) => (
            <Card key={reel.id} className="overflow-hidden">
              <video controls className="w-full h-64 object-cover bg-black">
                <source src={reel.fileURL} type="video/mp4" />
                Your browser does not support video.
              </video>
              <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{reel.title}</h3>
                <p className="text-sm text-gray-600">{reel.description}</p>
                <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">{reel.category}</span>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
