export type GameType = {
  id: number;
  name: string;
  category: string;
  popularity: string;
  releaseDate: Date;
  rating: string;
  link: string;
  genre: string;
  build: string;
  dev: string;
  about: string;
  controls: string[];
  thumb: string;
  featured?: boolean;
  download?: boolean;
  new?: boolean;
  trending?: number;
};

export type CommentType = {
  content: string;
  createdAt: Date;
  id: string;
  likes: string[];
  updatedAt: Date;
  userID: string;
  userName: string;
  _id: string;
};
