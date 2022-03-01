export interface News {
  createdAt: Date;
  id: number;
  title: string;
  body: string;
  photo: string;
  likesNumber: number;
  commentSize: number;
}
