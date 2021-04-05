import React from "react";
import styled from "styled-components";

const Root = styled.div.attrs((props) => ({
  className: "inputWrapper",
}))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 6px;
  box-shadow: rgb(0 17 51 / 5%) 0px 3px 15px;
  padding: 12px;
  overflow: hidden;
  &:focus,
  &:focus-within {
    border-color: #2f9c95;
    box-shadow: rgb(0 17 51 / 5%) 0px 3px 15px;
  }
`;

const Input = styled.input.attrs(() => ({
  type: "text",
  inputMode: "decimal",
  autoComplete: "off",
}))`
  border: 0px;
  margin: 0px;
  padding: 0px;
  /* align-self: stretch; */
  box-sizing: content-box;
  &:focus {
    outline: none;
  }
`;

interface props {
  id: string;
}

const InputWrapper = ({ id }: props) => {
  return (
    <Root>
      <span
        css={`
          font-size: 1.6rem;
          white-space: nowrap;
          width: 100%;
        `}
      >
        <span>£</span>
        <Input id={id} />
      </span>
    </Root>
  );
};

export default InputWrapper;