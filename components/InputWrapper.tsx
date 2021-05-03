import React from 'react';
import styled from 'styled-components';

import * as S from './styles';

const Root = styled.div.attrs((props) => ({
  className: 'inputWrapper'
}))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
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

type props = {
  id: string;
  name: string;
  amount?: string;
  handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWrapper = ({ id, amount, name, handleChange }: props) => {
  return (
    <Root>
      <span
        css={`
          font-size: 1.6rem;
          white-space: nowrap;
          width: 100%;
          display: flex;
          justify-content: flex-start;
        `}
      >
        <span>£</span>
        <S.Input id={id} name={name} value={amount} onChange={handleChange} />
      </span>
    </Root>
  );
};

export default InputWrapper;
