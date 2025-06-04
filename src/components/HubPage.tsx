
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Share2, Heart, Calendar, Video, Edit, Award } from 'lucide-react';

interface Post {
  id: number;
  type: 'post' | 'reel' | 'poll';
  author: string;
  avatar: string;
  time: string;
  content?: string;
  videoUrl?: string;
  caption?: string;
  question?: string;
  options?: { text: string; votes: number; }[];
  likes: number;
  comments: Comment[];
  category: string;
}

interface Blog {
  id: number;
  author: string;
  avatar?: string;
  title: string;
  time: string;
  content: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: number;
  author: string;
  content: string;
  likes: number;
}

export const HubPage = () => {
  const [activeTab, setActiveTab] = useState('qa');
  const [newPost, setNewPost] = useState('');
  const [newReel, setNewReel] = useState<string | null>(null);
  const [newReelCaption, setNewReelCaption] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      type: 'post',
      author: 'Sarah M.',
      avatar: '👩‍🎓',
      time: '2 hours ago',
      content: 'Just arrived in Lyon! The campus is amazing and everyone is so helpful. Any tips for opening a bank account here?',
      likes: 12,
      comments: [],
      category: 'Arrival'
    },
    {
      id: 2,
      type: 'reel',
      author: 'John D.',
      avatar: '👨‍🎓',
      time: '3 hours ago',
      videoUrl: 'https://example.com/reel1.mp4',
      caption: 'Exploring Paris on a budget! 🗼',
      likes: 20,
      comments: [],
      category: 'Travel'
    },
    {
      id: 3,
      type: 'poll',
      author: 'Maria L.',
      avatar: '👩‍🔬',
      time: '1 day ago',
      question: 'Best city to study in France?',
      options: [{ text: 'Paris', votes: 10 }, { text: 'Lyon', votes: 5 }],
      likes: 8,
      comments: [],
      category: 'Poll'
    }
  ]);
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      author: 'Alex K.',
      avatar: '👨‍💼',
      title: 'My First Month in France: A Journey',
      time: '5 hours ago',
      content: 'Sharing my experience with the CAF application process and how I navigated the French bureaucracy...',
      likes: 28,
      comments: []
    }
  ]);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});

  const upcomingEvents = [
    { id: 1, title: 'Virtual Networking Event', date: 'Dec 15, 2024', time: '7:00 PM CET', attendees: 45 },
    { id: 2, title: 'French Language Exchange', date: 'Dec 18, 2024', time: '6:30 PM CET', attendees: 23 },
    { id: 3, title: 'Live Q&A: Visa Tips', date: 'Dec 20, 2024', time: '5:00 PM CET', attendees: 30 }
  ];

  const handleLike = (itemId: number, type: string) => {
    if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId ? { ...blog, likes: blog.likes + 1 } : blog
      ));
    } else {
      setPosts(posts.map(item =>
        item.id === itemId ? { ...item, likes: item.likes + 1 } : item
      ));
    }
  };

  const handleComment = (itemId: number, type: string) => {
    const commentText = newComment[`${type}-${itemId}`] || '';
    if (!commentText) return;

    const newCommentObj: Comment = {
      id: Date.now(),
      author: 'You',
      content: commentText,
      likes: 0,
      replies: []
    };

    if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId ? { ...blog, comments: [...blog.comments, newCommentObj] } : blog
      ));
    } else {
      setPosts(posts.map(item =>
        item.id === itemId ? { ...item, comments: [...item.comments, newCommentObj] } : item
      ));
    }

    setNewComment({ ...newComment, [`${type}-${itemId}`]: '' });
  };

  const handlePublishPost = () => {
    if (!newPost) return;
    const newPostObj: Post = {
      id: Date.now(),
      type: 'post',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: [],
      category: 'General'
    };
    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setActiveTab('qa');
  };

  const handleReelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setNewReel(URL.createObjectURL(file));
  };

  const handlePublishReel = () => {
    if (!newReel || !newReelCaption) return;
    const newReelObj: Post = {
      id: Date.now(),
      type: 'reel',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      videoUrl: newReel,
      caption: newReelCaption,
      likes: 0,
      comments: [],
      category: 'Travel'
    };
    setPosts([newReelObj, ...posts]);
    setNewReel(null);
    setNewReelCaption('');
    setActiveTab('reels');
  };

  const handlePublishBlog = () => {
    if (!blogTitle || !blogContent) return;
    const newBlog: Blog = {
      id: Date.now(),
      author: 'You',
      avatar: '🧑‍🎓',
      title: blogTitle,
      time: 'Just now',
      content: blogContent,
      likes: 0,
      comments: []
    };
    setBlogs([newBlog, ...blogs]);
    setBlogTitle('');
    setBlogContent('');
    setActiveTab('blogs');
  };

  const addPollOption = () => setPollOptions([...pollOptions, '']);
  const updatePollOption = (index: number, value: string) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handlePublishPoll = () => {
    if (!pollQuestion || pollOptions.some(opt => !opt)) return;
    const newPoll: Post = {
      id: Date.now(),
      type: 'poll',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      question: pollQuestion,
      options: pollOptions.map(opt => ({ text: opt, votes: 0 })),
      likes: 0,
      comments: [],
      category: 'Poll'
    };
    setPosts([newPoll, ...posts]);
    setPollQuestion('');
    setPollOptions(['', '']);
    setActiveTab('polls');
  };

  const handleVotePoll = (pollId: number, optionIndex: number) => {
    setPosts(posts.map(post =>
      post.id === pollId && post.type === 'poll' && post.options ? {
        ...post,
        options: post.options.map((opt, idx) =>
          idx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
        )
      } : post
    ));
  };

  const qaPosts = posts.filter(p => p.type === 'post');
  const reels = posts.filter(p => p.type === 'reel');
  const polls = posts.filter(p => p.type === 'poll');

  const renderPostContent = (item: Post) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">{item.avatar}</div>
            <div>
              <div className="font-semibold text-gray-900">{item.author}</div>
              <div className="text-sm text-gray-500">{item.time}</div>
            </div>
          </div>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">{item.category}</span>
        </div>
        
        {item.type === 'post' && <p className="text-gray-700 mb-4">{item.content}</p>}
        {item.type === 'reel' && (
          <>
            <video src={item.videoUrl} controls className="w-full rounded-lg mb-4" />
            <p className="text-gray-700 mt-2">{item.caption}</p>
          </>
        )}
        {item.type === 'poll' && (
          <>
            <h4 className="text-lg font-semibold mb-4">{item.question}</h4>
            <div className="space-y-2 mb-4">
              {item.options?.map((option, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <span>{option.text}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{option.votes} votes</span>
                    <Button size="sm" variant="outline" onClick={() => handleVotePoll(item.id, idx)}>
                      Vote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <button
            className="flex items-center hover:text-red-500 transition-colors"
            onClick={() => handleLike(item.id, item.type)}
          >
            <Heart className="h-4 w-4 mr-1" />
            {item.likes}
          </button>
          <span className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            {item.comments.length}
          </span>
        </div>

        <div className="mt-4">
          <Textarea
            placeholder="Write a comment..."
            className="mb-2 h-16"
            value={newComment[`${item.type}-${item.id}`] || ''}
            onChange={(e) =>
              setNewComment({
                ...newComment,
                [`${item.type}-${item.id}`]: e.target.value
              })
            }
          />
          <Button
            size="sm"
            onClick={() => handleComment(item.id, item.type)}
            disabled={!newComment[`${item.type}-${item.id}`]}
          >
            Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
        <div className="mt-4 flex justify-center space-x-4">
          {[
            { id: 'qa', label: 'Q&A' },
            { id: 'blogs', label: 'Blogs' },
            { id: 'reels', label: 'Reels' },
            { id: 'polls', label: 'Polls' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === tab.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'qa' && (
            <>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Ask a Question</h3>
                  <Textarea
                    placeholder="What's on your mind? Ask a question or share an experience..."
                    className="mb-4 h-20"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <Button size="sm" onClick={handlePublishPost}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </CardContent>
              </Card>
              {qaPosts.map(renderPostContent)}
            </>
          )}

          {activeTab === 'blogs' && (
            <>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Edit className="h-5 w-5 mr-2 text-blue-600" />
                    Write a Blog
                  </h3>
                  <Input
                    placeholder="Blog title"
                    className="mb-4"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                  />
                  <Textarea
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Write your blog post here..."
                    className="mb-4 h-40"
                  />
                  <Button size="sm" onClick={handlePublishBlog}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                </CardContent>
              </Card>
              {blogs.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{item.avatar || '🧑‍🎓'}</div>
                        <div>
                          <div className="font-semibold text-gray-900">{item.author}</div>
                          <div className="text-sm text-gray-500">{item.time}</div>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-blue-900">{item.title}</h4>
                    <p className="text-gray-700 whitespace-pre-wrap mb-4">{item.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <button
                        className="flex items-center hover:text-red-500 transition-colors"
                        onClick={() => handleLike(item.id, 'blog')}
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {item.likes}
                      </button>
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {item.comments.length}
                      </span>
                    </div>
                    <div className="mt-4">
                      <Textarea
                        placeholder="Write a comment..."
                        className="mb-2 h-16"
                        value={newComment[`blog-${item.id}`] || ''}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            [`blog-${item.id}`]: e.target.value
                          })
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() => handleComment(item.id, 'blog')}
                        disabled={!newComment[`blog-${item.id}`]}
                      >
                        Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {activeTab === 'reels' && (
            <>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Video className="h-5 w-5 mr-2 text-red-600" />
                    Upload a Reel
                  </h3>
                  <Input type="file" accept="video/*" onChange={handleReelUpload} className="mb-4" />
                  {newReel && <video src={newReel} controls className="w-full rounded-lg mb-4" />}
                  <Textarea
                    placeholder="Add a caption..."
                    className="mb-4"
                    value={newReelCaption}
                    onChange={(e) => setNewReelCaption(e.target.value)}
                  />
                  <Button size="sm" onClick={handlePublishReel}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Reel
                  </Button>
                </CardContent>
              </Card>
              {reels.map(renderPostContent)}
            </>
          )}

          {activeTab === 'polls' && (
            <>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Create a Poll</h3>
                  <Input
                    placeholder="Poll question"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    className="mb-4"
                  />
                  {pollOptions.map((option, index) => (
                    <Input
                      key={index}
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updatePollOption(index, e.target.value)}
                      className="mb-2"
                    />
                  ))}
                  <Button variant="outline" size="sm" onClick={addPollOption} className="mb-4">
                    Add Option
                  </Button>
                  <Button size="sm" onClick={handlePublishPoll}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Poll
                  </Button>
                </CardContent>
              </Card>
              {polls.map(renderPostContent)}
            </>
          )}
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
                  <div key={event.id} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="font-semibold text-blue-900">{event.title}</div>
                    <div className="text-sm text-blue-700 mt-1">{event.date} at {event.time}</div>
                    <div className="text-xs text-blue-600 mt-1">{event.attendees} attending</div>
                    <Button size="sm" className="mt-3 w-full bg-blue-600 hover:bg-blue-700">
                      Join Event
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                Community Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts This Week</span>
                  <span className="font-semibold">{posts.length + 89}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Answered</span>
                  <span className="font-semibold">{posts.reduce((acc, post) => acc + post.comments.length, 0) + 156}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('qa')}>
                  📋 Ask Question
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('blogs')}>
                  📝 Write Blog
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('reels')}>
                  🎥 Share Reel
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('polls')}>
                  📊 Create Poll
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
