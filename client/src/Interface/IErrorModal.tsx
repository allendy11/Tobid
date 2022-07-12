interface IErrorModal {
  errorModal: {
    status: boolean;
    message: string;
  };
  setErrorModal: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      message: string;
    }>
  >;
}
export default IErrorModal;
