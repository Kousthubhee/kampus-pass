import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, User, Calendar, MessageCircle,
  ThumbsUp, Send, Camera, Heart, Share2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    : discussionList.filter(d => d.category === activeTab);

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

  const upcomingEvents = [
    {
      id: 1,
      title: 'Virtual Networking Event',
      date: 'Dec 15, 2024',
      time: '7:00 PM CET',
      attendees: 45
    },
    {
      id: 2,
      title: 'French Language Exchange',
      date: 'Dec 18, 2024',
      time: '6:30 PM CET',
      attendees: 23
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Users className="h-8 w-8 mr-3 text-purple-600" />
          Community Hub
        </h1>
        <p className="text-lg text-gray-600">Connect with fellow students, share experiences, and get support</p>
      </div>

      {/* Category Tabs */}
      <div className="mb-6">
        <div className="flex space-x-4 justify-center">
          {['all', 'askSeniors', 'experiences', 'resources'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab === 'all' ? 'All Discussions' :
                tab === 'askSeniors' ? 'Ask Seniors' :
                tab === 'experiences' ? 'Share Experiences' : 'Resources'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Share your question or experience..."
                className="w-full h-20 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
              />
              <div className="flex justify-between">
                {activeTab === 'experiences' && (
                  <Button onClick={handleCreateReel} variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Create Reel
                  </Button>
                )}
                <Button onClick={handlePostDiscussion}>
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {filteredDiscussions.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">👤</div>
                    <div>
                      <div className="font-semibold text-gray-900">{post.author}</div>
                      <div className="text-sm text-gray-500">{post.timestamp}</div>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-bold mb-1 text-gray-800">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button onClick={() => handleLikeToggle(post.id)} className="flex items-center hover:text-red-500">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.likes}
                  </button>
                  <button className="flex items-center hover:text-blue-500">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </button>
                  <button className="flex items-center hover:text-purple-500">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-blue-50 p-4 rounded-lg">
                    <div className="font-semibold text-blue-900">{event.title}</div>
                    <div className="text-sm text-blue-700">{event.date} at {event.time}</div>
                    <div className="text-xs text-blue-600 mt-1">{event.attendees} attending</div>
                    <Button size="sm" className="mt-2 w-full">Join Event</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts This Week</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Answered</span>
                  <span className="font-semibold">156</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Help</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">📋 Post a Question</Button>
                <Button variant="outline" className="w-full justify-start">🤝 Find Study Partner</Button>
                <Button variant="outline" className="w-full justify-start">🏠 Housing Exchange</Button>
                <Button variant="outline" className="w-full justify-start">📚 Share Resources</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reel Modal */}
      {showReelModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Upload a Reel</h2>
            <input type="file" accept="video/*" onChange={handleVideoChange} className="mb-4" />
            {videoFile && (
              <video src={URL.createObjectURL(videoFile)} controls className="w-full mb-4 rounded-md" />
            )}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowReelModal(false)}>Cancel</Button>
              <Button onClick={handleSaveReel} disabled={!videoFile}>Save Reel</Button>
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
