export interface UserToken {
  token: string;
  user: UserMinimal;
}

export interface UserMinimal {
  id: string;
  username: string;
  email: string;
  admin: boolean;
}

export interface UserModel extends UserMinimal {
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  username: string;
  password: string;
}