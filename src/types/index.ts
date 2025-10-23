export interface Post {
  id: string;
  creator: {
    name: string;
    imageUrl?: string;
  };
  caption: string;
  imageUrl?: string;
  tags?: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
}