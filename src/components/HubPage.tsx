
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Share2, Heart, Calendar } from 'lucide-react';

export const HubPage = () => {
  const posts = [
    {
      id: 1,
      author: 'Sarah M.',
      avatar: '👩‍🎓',
      time: '2 hours ago',
      content: 'Just arrived in Lyon! The campus is amazing and everyone is so helpful. Any tips for opening a bank account here?',
      likes: 12,
      comments: 5,
      category: 'Arrival'
    },
    {
      id: 2,
      author: 'Alex K.',
      avatar: '👨‍💼',
      time: '5 hours ago',
      content: 'Sharing my CAF application experience - it took 6 weeks but totally worth it! Happy to help anyone with questions.',
      likes: 28,
      comments: 15,
      category: 'Bureaucracy'
    },
    {
      id: 3,
      author: 'Maria L.',
      avatar: '👩‍🔬',
      time: '1 day ago',
      content: 'Looking for a study group for GMAT prep in Paris. Anyone interested in meeting weekly?',
      likes: 8,
      comments: 12,
      category: 'Study Group'
    }
  ];

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
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Users className="h-8 w-8 mr-3 text-purple-600" />
          Community Hub
        </h1>
        <p className="text-lg text-gray-600">
          Connect with fellow students, share experiences, and get support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <textarea 
                  placeholder="What's on your mind? Share your experiences, ask questions, or offer help..."
                  className="w-full h-20 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Arrival</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Study Tips</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Bureaucracy</span>
                </div>
                <Button size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{post.avatar}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{post.author}</div>
                        <div className="text-sm text-gray-500">{post.time}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      post.category === 'Arrival' ? 'bg-purple-100 text-purple-800' :
                      post.category === 'Bureaucracy' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {post.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button className="flex items-center hover:text-red-500">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </button>
                    <button className="flex items-center hover:text-blue-500">
                      <MessageSquare className="h-4 w-4 mr-1" />
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
                <Button variant="outline" className="w-full justify-start">
                  📋 Post a Question
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🤝 Find Study Partner
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🏠 Housing Exchange
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📚 Share Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
