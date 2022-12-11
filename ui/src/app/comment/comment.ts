export class Comment {
  comment_id: string;
  user_id: string;
  text: string;
  date: string;
  likes: string;

}

export class CommentRsp {
  data: Comment;
}
