import { User } from "./User";

export interface Glide {
  id: string;
  content: string;
  user: User;
  likesCount: number;
  subGlidesCount: number;
  date: Date;
}
