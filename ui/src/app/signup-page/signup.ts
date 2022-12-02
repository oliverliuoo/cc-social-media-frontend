export class ColumbiaStudent {
  guid: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
  school_code;
}

export class ColumbiaStudentRsp {
  data: ColumbiaStudent
}

export class User {
  UserID: string;
}

export class UserRsp {
  data: User;
}
