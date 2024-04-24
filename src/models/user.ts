export interface UserMinimalModel {
  id: string;
  username: string;
  email: string;
}

export interface UserModel extends UserMinimalModel {
  password: string;
}
