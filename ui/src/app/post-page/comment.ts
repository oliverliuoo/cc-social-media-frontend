export class Comment {
  datetime: string;
  post_id: string;
  comment: string;
  user_id: string;
  userName: string;
}

export class PostRsp {
  data: Array<Comment>;
}
