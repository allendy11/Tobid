interface IPost {
  id: string;
  title: string;
  contents: string;
  startingPrice: number;
  currentPrice: number;
  winner: number;
  image: string;
  user_id: number;
}

export default IPost;
