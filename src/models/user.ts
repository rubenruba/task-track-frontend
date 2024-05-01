export interface UserMinimalModel {
  id: string;
  username: string;
  email: string;
  admin: boolean;
}

export interface UserModel extends UserMinimalModel {
  password: string;
}
