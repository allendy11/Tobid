interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  mobile: string;
  image: string;
  loginType: string;
  admin: boolean;
}

export default IUser;
