import { useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import PostForm from './components/PostForm';
import { Post } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'likes' | 'likedBy' | 'createdAt'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      likes: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
    setShowForm(false);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const userId = 'current-user'; // In MVP, we use a static user ID
        const isLiked = post.likedBy.includes(userId);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? post.likedBy.filter(id => id !== userId)
            : [...post.likedBy, userId],
        };
      }
      return post;
    }));
  };

  const handleDelete = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="min-h-screen bg-dark-1 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-2 border-b border-dark-4">
        <div className="max-w-screen-sm mx-auto px-5 py-4 flex-between">
          <h1 className="h3-bold">Simple Social</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="shad-button_primary px-4 py-2 rounded-lg"
          >
            {showForm ? 'Cancel' : 'Create Post'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-container">
        <div className="home-posts">
          {/* Post Form */}
          {showForm && (
            <div className="post-card">
              <PostForm onSubmit={handleCreatePost} />
            </div>
          )}

          {/* Posts Feed */}
          {posts.length === 0 && !showForm ? (
            <div className="flex-center flex-col gap-4 py-10">
              <p className="body-medium text-light-4">No posts yet</p>
              <p className="small-regular text-light-4">Create your first post to get started!</p>
            </div>
          ) : (
            posts.map(post => {
              const isLiked = post.likedBy.includes('current-user');
              return (
                <div key={post.id} className="post-card">
                  {/* Post Header */}
                  <div className="flex-between mb-5">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-full bg-primary-500 flex-center">
                        <span className="base-medium">{post.creator.name.charAt(0)}</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="base-medium">{post.creator.name}</p>
                        <p className="subtle-semibold text-light-3">{formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="hover:text-red transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Post Image */}
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="post-card_img"
                    />
                  )}

                  {/* Post Content */}
                  <div className="space-y-3">
                    <p className="small-medium">{post.caption}</p>
                    {post.tags && (
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.split(',').map((tag, index) => (
                          <span key={index} className="text-light-3 small-regular">
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex gap-4 mt-5 pt-5 border-t border-dark-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex gap-2 items-center hover:text-primary-500 transition"
                    >
                      <Heart
                        size={20}
                        fill={isLiked ? 'currentColor' : 'none'}
                        className={isLiked ? 'text-red' : ''}
                      />
                      <span className="small-medium">{post.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

export default App;