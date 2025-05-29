import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, User, Calendar, MessageCircle,
  ThumbsUp, Send, Camera
} from 'lucide-react';
import Button from '../../components/ui/Button';

interface Discussion {
  id: number;
  category: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const initialDiscussions: Discussion[] = [
  {
    id: 1,
    category: 'askSeniors',
    author: 'Priya Sharma',
    title: 'How is the student life at NEOMA Reims?',
    content: 'I got admitted to NEOMA Business School at Reims campus. Can seniors share their experiences about accommodation, social life, and academics there?',
    timestamp: '2 hours ago',
    likes: 12,
    comments: 8,
  },
  {
    id: 2,
    category: 'experiences',
    author: 'Rahul Jain',
    title: 'My first month in Paris - The ups and downs',
    content: 'It\'s been a month since I arrived in Paris to study at ESSEC. Here\'s what I\'ve learned about finding accommodation, dealing with paperwork, and making friends.',
    timestamp: '1 day ago',
    likes: 45,
    comments: 22,
  },
  {
    id: 3,
    category: 'resources',
    author: 'Ananya Patel',
    title: 'List of useful apps for Indian students in France',
    content: 'I\'ve compiled a list of essential apps that helped me navigate life in France - from transportation to food delivery to language learning.',
    timestamp: '3 days ago',
    likes: 78,
    comments: 14,
  },
  {
    id: 4,
    category: 'askSeniors',
    author: 'Vikram Singh',
    title: 'Job opportunities after MSc Finance in France',
    content: 'I\'m considering applying for MSc Finance programs in France. Can anyone share insights about job prospects for international students after graduation?',
    timestamp: '5 days ago',
    likes: 32,
    comments: 18,
  },
  {
    id: 5,
    category: 'experiences',
    author: 'Neha Gupta',
    title: 'Weekend trips from Lyon - My adventures',
    content: 'Since starting my studies at emlyon in Lyon, I\'ve been exploring nearby cities on weekends. Here are some affordable and amazing places to visit!',
    timestamp: '1 week ago',
    likes: 61,
    comments: 26,
  },
];

const HubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [discussionList, setDiscussionList] = useState<Discussion[]>(initialDiscussions);
  const [showReelModal, setShowReelModal] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [reels, setReels] = useState<{ id: number, url: string }[]>([]);

  const filteredDiscussions = activeTab === 'all'
    ? discussionList
    : discussionList.filter(disc => disc.category === activeTab);

  const handlePostDiscussion = () => {
    if (inputValue.trim()) {
      const newPost: Discussion = {
        id: Date.now(),
        category: activeTab === 'all' ? 'experiences' : activeTab,
        author: 'You',
        title: 'New Discussion',
        content: inputValue.trim(),
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
      };
      setDiscussionList([newPost, ...discussionList]);
      setInputValue('');
    }
  };

  const handleLikeToggle = (id: number) => {
    setDiscussionList(prev =>
      prev.map(d =>
        d.id === id ? { ...d, likes: d.likes + 1 } : d
      )
    );
  };

  const handleCreateReel = () => {
    setShowReelModal(true);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    }
  };

  const handleSaveReel = () => {
    if (videoFile) {
      const videoURL = URL.createObjectURL(videoFile);
      setReels([{ id: Date.now(), url: videoURL }, ...reels]);
      setVideoFile(null);
      setShowReelModal(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      <div className="section-title">
        <Users size={24} />
        Student Community Hub
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Categories */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {['all', 'askSeniors', 'experiences', 'resources'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab === 'all' ? 'All Discussions' :
                 tab === 'askSeniors' ? 'Ask Seniors' :
                 tab === 'experiences' ? 'Share Experiences' : 'Resources'}
              </button>
            ))}
          </div>
        </div>

        {/* New Discussion Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <User size={20} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Share your question or experience..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent min-h-[100px]"
              />
              <div className="flex justify-between mt-2">
                {activeTab === 'experiences' && (
                  <Button
                    onClick={handleCreateReel}
                    variant="outline"
                    leftIcon={<Camera size={16} />}
                  >
                    Create Reel
                  </Button>
                )}
                <Button
                  onClick={handlePostDiscussion}
                  rightIcon={<Send size={16} />}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion List */}
        <div className="divide-y divide-gray-200">
          {filteredDiscussions.map((discussion) => (
            <div key={discussion.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{discussion.author}</span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {discussion.timestamp}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{discussion.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{discussion.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button
                      onClick={() => handleLikeToggle(discussion.id)}
                      className="flex items-center gap-1 hover:text-primary-600"
                    >
                      <ThumbsUp size={16} />
                      <span>{discussion.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary-600">
                      <MessageCircle size={16} />
                      <span>{discussion.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reel Modal */}
      {showReelModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Upload a Reel</h2>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="mb-4"
            />
            {videoFile && (
              <video
                src={URL.createObjectURL(videoFile)}
                controls
                className="w-full mb-4 rounded-md"
              />
            )}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowReelModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveReel} disabled={!videoFile}>
                Save Reel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reel Gallery */}
      {reels.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Reels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reels.map(reel => (
              <video key={reel.id} src={reel.url} controls className="rounded-lg w-full" />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HubPage;
