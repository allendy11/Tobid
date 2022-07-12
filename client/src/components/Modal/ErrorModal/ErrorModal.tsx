import React from "react";
import "./ErrorModal.css";
import IErrorModal from "../../../Interface/IErrorModal";
const ErrorModal = ({
  errorModal,
  setErrorModal,
}: {
  errorModal: IErrorModal["errorModal"];
  setErrorModal: IErrorModal["setErrorModal"];
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setErrorModal({
      status: false,
      message: "",
    });
  };
  return (
    <div id="ErrorModal">
      <div>
        <div>{errorModal.message}</div>
      </div>
      <div>
        <div onClick={(e) => handleClick(e)}>확인</div>
      </div>
    </div>
  );
};

export default ErrorModal;
