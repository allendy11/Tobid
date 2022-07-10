import React from "react";
import "./ErrorModal.css";
const ErrorModal = ({
  message,
  setErrorModal,
}: {
  message: string;
  setErrorModal: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      message: string;
    }>
  >;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setErrorModal({
      status: false,
      message: "",
    });
  };
  return (
    <div id="ErrorModal">
      <div>{message}</div>
      <div onClick={(e) => handleClick(e)}>확인</div>
    </div>
  );
};

export default ErrorModal;
