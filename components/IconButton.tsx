import React from 'react';

type props = {
  icon: JSX.Element;
  handleClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

const IconButton = ({ icon, handleClick }: props) => {
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
        @media (max-width: 576px) {
          transform: rotate(90deg);
        }
      `}
      onClick={handleClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
