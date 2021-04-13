import React from "react";

type props = {
  icon: JSX.Element;
};

const IconButton = ({ icon }: props) => {
  return (
    <button
      css={`
        display: inline-flex;
        background: none;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 50%;
        padding: 16px;
        &:focus {
          outline: none;
        }
      `}
    >
      {icon}
    </button>
  );
};

export default IconButton;