export class Comment {
  comment_id: string;
  user_id: string;
  username: string;
  text: string;
  date: string;
  likes: string;
  post_id: string;
  poster_id: string;

}

export class CommentRsp {
  data: Comment;
}
