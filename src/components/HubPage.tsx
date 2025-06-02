import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Share2, Heart, Calendar, Video, Edit, Search, Award, Pin } from 'lucide-react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

const QAPage = ({ posts, onLike, onComment, onReply, onPublishPost }) => {
  const qaPosts = posts.filter(p => p.type === 'post');
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ask a Question</h3>
          <Textarea
            placeholder="What's on your mind? Ask a question or share an experience..."
            className="mb-4 h-20"
            onChange={(e) => onPublishPost(e.target.value)}
          />
          <Button size="sm" onClick={() => onPublishPost()}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardContent>
      </Card>
      {qaPosts.map((item) => (
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
            <p className="text-gray-700 mb-4">{item.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <button
                className="flex items-center hover:text-red-500"
                onClick={() => onLike(item.id, item.type)}
              >
                <Heart className="h-4 w-4 mr-1" />
                {item.likes}
              </button>
              <button className="flex items-center hover:text-blue-500">
                <MessageSquare className="h-4 w-4 mr-1" />
                {item.comments.length}
              </button>
            </div>
            {/* Comments and Reply logic here (simplified for brevity) */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const BlogPage = ({ blogs, onLike, onComment, onPublishBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Edit className="h-5 w-5 mr-2 text-blue-600" />
            Write a Blog
          </h3>
          <Input
            placeholder="Blog title"
            className="mb-4"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your blog post here..."
            className="mb-4 h-40"
          />
          <Button size="sm" onClick={() => onPublishBlog(newTitle, newContent)}>
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
            <h4 className="text-lg font-semibold">{item.title}</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <button
                className="flex items-center hover:text-red-500"
                onClick={() => onLike(item.id, 'blog')}
              >
                <Heart className="h-4 w-4 mr-1" />
                {item.likes}
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ReelPage = ({ posts, onLike, onComment, onPublishReel }) => {
  const reels = posts.filter(p => p.type === 'reel');
  const [newReel, setNewReel] = useState(null);
  const [newCaption, setNewCaption] = useState('');
  const handleReelUpload = (e) => {
    const file = e.target.files[0];
    if (file) setNewReel(URL.createObjectURL(file));
  };
  return (
    <div className="space-y-4">
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
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
          />
          <Button size="sm" onClick={() => onPublishReel(newReel, newCaption)}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Reel
          </Button>
        </CardContent>
      </Card>
      {reels.map((item) => (
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
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">{item.category}</span>
            </div>
            <video src={item.videoUrl} controls className="w-full rounded-lg mb-4" />
            <p className="text-gray-700 mt-2">{item.caption}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <button
                className="flex items-center hover:text-red-500"
                onClick={() => onLike(item.id, item.type)}
              >
                <Heart className="h-4 w-4 mr-1" />
                {item.likes}
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const PollPage = ({ posts, onLike, onVotePoll }) => {
  const polls = posts.filter(p => p.type === 'poll');
  return (
    <div className="space-y-4">
      {polls.map((item) => (
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
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{item.category}</span>
            </div>
            <h4 className="text-lg font-semibold">{item.question}</h4>
            <div className="space-y-2 mt-2">
              {item.options.map((option, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span>{option.text}</span>
                  <div className="flex items-center space-x-2">
                    <span>{option.votes} votes</span>
                    <Button size="sm" onClick={() => onVotePoll(item.id, idx)}>
                      Vote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4">
              <button
                className="flex items-center hover:text-red-500"
                onClick={() => onLike(item.id, item.type)}
              >
                <Heart className="h-4 w-4 mr-1" />
                {item.likes}
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const HubPage = () => {
  const [newPost, setNewPost] = useState('');
  const [newReel, setNewReel] = useState(null);
  const [newReelCaption, setNewReelCaption] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [posts, setPosts] = useState([
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
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      author: 'Alex K.',
      title: 'My First Month in France: A Journey',
      time: '5 hours ago',
      content: 'Sharing my experience with the CAF application...',
      likes: 28,
      comments: []
    }
  ]);
  const [newComment, setNewComment] = useState({});
  const navigate = useNavigate();

  const handleLike = (itemId, type) => {
    if (type === 'post' || type === 'reel' || type === 'poll') {
      setPosts(posts.map(item =>
        item.id === itemId && item.type === type ? { ...item, likes: item.likes + 1 } : item
      ));
    } else if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId ? { ...blog, likes: blog.likes + 1 } : blog
      ));
    }
  };

  const handleComment = (itemId, type) => {
    const commentText = newComment[`${type}-${itemId}`] || '';
    if (!commentText) return;

    const newCommentObj = {
      id: Date.now(),
      author: 'You',
      content: commentText,
      likes: 0,
      replies: []
    };

    if (type === 'post' || type === 'reel' || type === 'poll') {
      setPosts(posts.map(item =>
        item.id === itemId && item.type === type ? { ...item, comments: [...item.comments, newCommentObj] } : item
      ));
    } else if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId ? { ...blog, comments: [...blog.comments, newCommentObj] } : blog
      ));
    }

    setNewComment({ ...newComment, [`${type}-${itemId}`]: '' });
  };

  const handleReply = (postId, commentId) => {
    const replyText = newComment[`reply-${postId}-${commentId}`] || '';
    if (!replyText) return;

    const newReply = {
      id: Date.now(),
      author: 'You',
      content: replyText,
      likes: 0
    };

    setPosts(posts.map(post =>
      post.id === postId ? {
        ...post,
        comments: post.comments.map(comment =>
          comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
        )
      } : post
    ));

    setNewComment({ ...newComment, [`reply-${postId}-${commentId}`]: '' });
  };

  const handlePublishPost = (content) => {
    if (!content) return;
    const newPostObj = {
      id: Date.now(),
      type: 'post',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      content,
      likes: 0,
      comments: [],
      category: 'General'
    };
    setPosts([newPostObj, ...posts]);
    navigate('/qa');
  };

  const handleReelUpload = (e) => {
    const file = e.target.files[0];
    if (file) setNewReel(URL.createObjectURL(file));
  };

  const handlePublishReel = (videoUrl, caption) => {
    if (!videoUrl || !caption) return;
    const newReelObj = {
      id: Date.now(),
      type: 'reel',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      videoUrl,
      caption,
      likes: 0,
      comments: [],
      category: 'Travel'
    };
    setPosts([newReelObj, ...posts]);
    setNewReel(null);
    setNewReelCaption('');
    navigate('/reels');
  };

  const handlePublishBlog = (title, content) => {
    if (!title || !content) return;
    const newBlog = {
      id: Date.now(),
      author: 'You',
      title,
      time: 'Just now',
      content,
      likes: 0,
      comments: []
    };
    setBlogs([newBlog, ...blogs]);
    setBlogTitle('');
    setBlogContent('');
    navigate('/blogs');
  };

  const addPollOption = () => setPollOptions([...pollOptions, '']);
  const updatePollOption = (index, value) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handlePublishPoll = () => {
    if (!pollQuestion || pollOptions.some(opt => !opt)) return;
    const newPoll = {
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
    navigate('/polls');
  };

  const handleVotePoll = (pollId, optionIndex) => {
    setPosts(posts.map(post =>
      post.id === pollId && post.type === 'poll' ? {
        ...post,
        options: post.options.map((opt, idx) =>
          idx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
        )
      } : post
    ));
  };

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
          <NavLink
            to="/qa"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${isActive ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`
            }
          >
            Q&A
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${isActive ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/reels"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${isActive ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`
            }
          >
            Reels
          </NavLink>
          <NavLink
            to="/polls"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${isActive ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`
            }
          >
            Polls
          </NavLink>
        </div>
      </div>

      <Routes>
        <Route path="/qa" element={<QAPage posts={posts} onLike={handleLike} onComment={handleComment} onReply={handleReply} onPublishPost={handlePublishPost} />} />
        <Route path="/blogs" element={<BlogPage blogs={blogs} onLike={handleLike} onComment={handleComment} onPublishBlog={handlePublishBlog} />} />
        <Route path="/reels" element={<ReelPage posts={posts} onLike={handleLike} onComment={handleComment} onPublishReel={handlePublishReel} />} />
        <Route path="/polls" element={<PollPage posts={posts} onLike={handleLike} onVotePoll={handleVotePoll} />} />
        <Route path="/" element={<QAPage posts={posts} onLike={handleLike} onComment={handleComment} onReply={handleReply} onPublishPost={handlePublishPost} />} />
      </Routes>
    </div>
  );
};