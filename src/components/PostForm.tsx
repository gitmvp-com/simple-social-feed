import { useState } from 'react';
import { ImagePlus } from 'lucide-react';

interface PostFormProps {
  onSubmit: (post: {
    creator: { name: string };
    caption: string;
    imageUrl?: string;
    tags?: string;
  }) => void;
}

const PostForm = ({ onSubmit }: PostFormProps) => {
  const [name, setName] = useState('John Doe');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    onSubmit({
      creator: { name },
      caption,
      imageUrl: imageUrl || undefined,
      tags: tags || undefined,
    });

    // Reset form
    setCaption('');
    setImageUrl('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="h3-bold">Create Post</h2>

      {/* Name Input */}
      <div className="space-y-2">
        <label className="shad-form_label">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shad-input w-full px-4 rounded-lg text-white"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Caption Input */}
      <div className="space-y-2">
        <label className="shad-form_label">Caption</label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="shad-textarea w-full px-4 py-3 rounded-lg text-white resize-none"
          placeholder="What's on your mind?"
          required
        />
      </div>

      {/* Image URL Input */}
      <div className="space-y-2">
        <label className="shad-form_label">Image URL (Optional)</label>
        <div className="relative">
          <ImagePlus className="absolute left-3 top-1/2 -translate-y-1/2 text-light-4" size={20} />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="shad-input w-full pl-12 pr-4 rounded-lg text-white"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Tags Input */}
      <div className="space-y-2">
        <label className="shad-form_label">Tags (Optional)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="shad-input w-full px-4 rounded-lg text-white"
          placeholder="travel, photography, nature"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="shad-button_primary w-full py-3 rounded-lg font-semibold"
      >
        Create Post
      </button>
    </form>
  );
};

export default PostForm;