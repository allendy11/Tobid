interface IUser {
  userInfo: {
    id: number;
    username: string;
    email: string;
    mobile: string;
    image: string;
    admin: boolean;
  };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      id: number;
      username: string;
      email: string;
      mobile: string;
      image: string;
      admin: boolean;
    }>
  >;
}
export default IUser;
