export class Comment {
  date: string;
  post_id: string;
  poster_id: string;
  text: string;
  user_id: string;
  username: string;
}

export class CommentRsp {
  data: Array<Comment>;
}
