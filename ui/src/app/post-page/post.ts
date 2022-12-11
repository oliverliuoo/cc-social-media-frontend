export class Post {
  photo_url: string;
  post_id: string;
  post_text: string;
  user_id: string;
  user_name: string;
  time_stamp: string;
}

export class PostRsp {
  data: Array<Post>;
}
