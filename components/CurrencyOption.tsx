import React from 'react';
import styled from 'styled-components';

type props = {
  id: string;
  imgSrc: string;
  code: string;
  name: string;
};

const StyledImageWrapper = styled.div`
  width: 24px;
  height: auto;
  display: inline-flex;
  position: relative;
  /* border-radius: 2px; */
  overflow: hidden;
  &::after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 17, 51, 0.15);
    border-radius: 2px;
  }
`;

const StyledImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const CurrencyOption = (props: props) => {
  const { id, imgSrc, code, name } = props;
  return (
    <li
      id={id}
      role="option"
      aria-selected="true"
      css={`
        display: flex;
        align-items: center;
        padding: 10px 12px;
        cursor: pointer;
        font-size: 1.4rem;
        position: relative;
        overflow: hidden;

        &[aria-selected='true'] {
          background-color: rgb(250, 251, 253);
        }

        &:hover {
          background-color: #d9d9d9;
        }
      `}
    >
      <div
        css={`
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          margin-right: 8px;
        `}
      >
        <StyledImageWrapper>
          <StyledImage src={imgSrc} />
        </StyledImageWrapper>
      </div>
      <div>
        {code}&nbsp;-&nbsp;
        <span
          css={`
            color: rgb(92, 102, 123);
          `}
        >
          {name}
        </span>
      </div>
    </li>
  );
};

export default CurrencyOption;
