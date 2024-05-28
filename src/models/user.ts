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

export interface UserEmail {
  userId: string;
  email: string;
}

export interface UserDecoded {
  user: UserMinimal;
  iat: number;
  exp: number;
}