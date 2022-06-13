interface IPost {
  id: string;
  title: string;
  contents: string;
  startingPrice: number;
  currentPrice: number;
  winnerId: number;
  image: string;
  user_id: number;
}

export default IPost;
