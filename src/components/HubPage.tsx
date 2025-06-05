import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, Clock, Users, Calendar, Play, Pause, ChevronRight, ChevronLeft, Plus } from 'lucide-react';

// Define proper types for posts
interface BasePost {
  id: number;
  type: string;
  author: string;
  avatar: string;
  time: string;
  likes: number;
  comments: any[];
  category: string;
}

interface TextPost extends BasePost {
  type: 'text';
  content: string;
}

interface VideoPost extends BasePost {
  type: 'video';
  content: string;
  videoUrl: string;
  caption: string;
}

interface PollPost extends BasePost {
  type: 'poll';
  content: string;
  question: string;
  options: { text: string; votes: number; }[];
}

type Post = TextPost | VideoPost | PollPost;

// Define proper types for events
interface Event {
  id: number;
  author: string;
  title: string;
  time: string;
  content: string;
  likes: number;
  comments: any[];
  avatar: string;
}

const HubPage = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      type: 'text',
      author: 'Marie Dubois',
      avatar: '/placeholder.svg',
      time: '2 hours ago',
      content: 'Just finished my first week at Université de Paris! The campus is amazing and everyone has been so welcoming. Any tips for navigating the library system? 📚',
      likes: 24,
      comments: [],
      category: 'Academic'
    },
    {
      id: 2,
      type: 'video',
      author: 'International Student Services',
      avatar: '/placeholder.svg',
      time: '4 hours ago',
      content: 'Check out this virtual tour of our campus facilities!',
      videoUrl: '/placeholder-video.mp4',
      caption: 'Virtual Campus Tour - Student Services',
      likes: 89,
      comments: [],
      category: 'Campus Life'
    },
    {
      id: 3,
      type: 'poll',
      author: 'Student Council',
      avatar: '/placeholder.svg',
      time: '6 hours ago',
      content: 'We\'re planning social events for international students!',
      question: 'What type of event would you most like to attend?',
      options: [
        { text: 'Cultural exchange dinner', votes: 45 },
        { text: 'City walking tour', votes: 32 },
        { text: 'Language practice meetup', votes: 28 },
        { text: 'Sports activities', votes: 19 }
      ],
      likes: 156,
      comments: [],
      category: 'Social'
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      author: 'International Office',
      avatar: '/placeholder.svg',
      title: 'Orientation Week Activities',
      time: 'Tomorrow at 9:00 AM',
      content: 'Join us for a comprehensive orientation covering academic procedures, campus resources, and social integration opportunities.',
      likes: 67,
      comments: []
    },
    {
      id: 2,
      author: 'French Language Center',
      avatar: '/placeholder.svg', 
      title: 'French Conversation Practice',
      time: 'Friday at 2:00 PM',
      content: 'Weekly conversation practice sessions for international students. All levels welcome!',
      likes: 43,
      comments: []
    }
  ]);

  const handleNextEvent = () => {
    setCurrentEventIndex((prevIndex) => 
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevEvent = () => {
    setCurrentEventIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleVote = (postId: number, optionIndex: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.type === 'poll') {
        const updatedOptions = [...post.options];
        updatedOptions[optionIndex] = {
          ...updatedOptions[optionIndex],
          votes: updatedOptions[optionIndex].votes + 1
        };
        return { ...post, options: updatedOptions };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: TextPost = {
        id: posts.length + 1,
        type: 'text',
        author: 'You',
        avatar: '/placeholder.svg',
        time: 'Just now',
        content: newPostContent,
        likes: 0,
        comments: [],
        category: 'Personal'
      };
      
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsCreatingPost(false);
    }
  };

  const renderPost = (post: Post) => {
    return (
      <Card key={post.id} className="mb-6 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.avatar} />
                <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{post.author}</p>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="mb-4 text-sm leading-relaxed">{post.content}</p>
          
          {post.type === 'video' && (
            <div className="mb-4 relative bg-gray-100 rounded-lg overflow-hidden">
              <div className="aspect-video flex items-center justify-center">
                <Play className="h-12 w-12 text-gray-400" />
              </div>
              <p className="p-3 text-sm text-gray-600">{post.caption}</p>
            </div>
          )}
          
          {post.type === 'poll' && (
            <div className="mb-4 space-y-3">
              <p className="font-medium text-sm">{post.question}</p>
              {post.options.map((option, index) => (
                <div key={index} className="relative">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between text-left h-auto p-3"
                    onClick={() => handleVote(post.id, index)}
                  >
                    <span className="text-sm">{option.text}</span>
                    <Badge variant="secondary">{option.votes}</Badge>
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                onClick={() => handleLike(post.id)}
              >
                <Heart className="h-4 w-4" />
                <span className="text-xs">{post.likes}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{post.comments.length}</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-500">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-yellow-500">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border bg-card p-1">
          <Button
            variant={activeTab === 'feed' ? 'default' : 'ghost'}
            className="rounded-md px-4"
            onClick={() => setActiveTab('feed')}
          >
            Feed
          </Button>
          <Button
            variant={activeTab === 'events' ? 'default' : 'ghost'}
            className="rounded-md px-4"
            onClick={() => setActiveTab('events')}
          >
            Events
          </Button>
          <Button
            variant={activeTab === 'resources' ? 'default' : 'ghost'}
            className="rounded-md px-4"
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </Button>
        </div>
      </div>

      {activeTab === 'feed' && (
        <>
          <Card className="mb-6">
            <CardContent className="p-4">
              {isCreatingPost ? (
                <div className="space-y-4">
                  <textarea
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreatingPost(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreatePost}>
                      Post
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-gray-500"
                  onClick={() => setIsCreatingPost(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create a post...
                </Button>
              )}
            </CardContent>
          </Card>

          {posts.map(renderPost)}
        </>
      )}

      {activeTab === 'events' && (
        <div className="space-y-6">
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
                  onClick={handlePrevEvent}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
                  onClick={handleNextEvent}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                
                <div className="w-full px-8">
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={events[currentEventIndex].avatar} />
                      <AvatarFallback>{events[currentEventIndex].author.split(' ')[0][0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{events[currentEventIndex].author}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{events[currentEventIndex].title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{events[currentEventIndex].time}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{events[currentEventIndex].content}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Interested
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{events[currentEventIndex].likes} interested</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h3 className="text-xl font-bold mt-8 mb-4">Upcoming Events</h3>
          
          {events.map((event) => (
            <Card key={event.id} className="mb-4 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{event.title}</h4>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="text-xs">{event.time}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Campus Map</h3>
              <p className="text-gray-600 mb-4 text-sm">Navigate the university campus with our interactive map</p>
              <div className="bg-gray-100 rounded-md h-32 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-gray-400" />
              </div>
              <Button className="w-full">Open Map</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Academic Calendar</h3>
              <p className="text-gray-600 mb-4 text-sm">Important dates, deadlines and academic schedules</p>
              <div className="bg-gray-100 rounded-md h-32 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <Button className="w-full">View Calendar</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Student Services</h3>
              <p className="text-gray-600 mb-4 text-sm">Access health services, counseling, and administrative support</p>
              <div className="bg-gray-100 rounded-md h-32 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <Button className="w-full">Explore Services</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Language Resources</h3>
              <p className="text-gray-600 mb-4 text-sm">Tools and materials to improve your French language skills</p>
              <div className="bg-gray-100 rounded-md h-32 flex items-center justify-center mb-4">
                <div className="text-4xl font-bold text-gray-400">A+</div>
              </div>
              <Button className="w-full">Access Resources</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HubPage;
