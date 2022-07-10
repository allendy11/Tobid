interface IUser {
  userInfo: {
    username: string;
    email: string;
    mobile: string;
    image: string;
    admin: boolean;
  };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      mobile: string;
      image: string;
      admin: boolean;
    }>
  >;
}
export default IUser;
