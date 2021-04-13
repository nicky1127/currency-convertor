"use strict";
import React from "react";
import styled from "styled-components";

import * as S from "./styles";

const currencyMap = {
  gbp: {
    code: "GBP",
    name: "British Pound",
    src: "/images/gbp.svg",
  },
  twd: {
    code: "TWD",
    name: "Taiwan New Dollar",
    src: "/images/twd.svg",
  },
};

const CurrencySelection = styled.div.attrs((props) => ({
  id: "fromCurrency-selection",
  className: "currency-wrapper",
}))<{ inputActivated: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  visibility: ${({ inputActivated }) =>
    inputActivated ? "hidden" : "visible"};
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

const InputWrapper = styled.div.attrs((props) => ({
  className: "inputWrapper",
}))`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Input = styled.input<{ inputActivated: boolean }>`
  width: 100%;
  height: 100%;
  color: ${({ inputActivated }) => !inputActivated && "transparant"};
  border-color: transparent;
  box-shadow: none;
  padding-right: 40px;
  cursor: pointer;
  background: none;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 6px;
  padding: 12px;

  &:focus {
    border-color: #2f9c95;
    box-shadow: rgb(0 17 51 / 5%) 0px 3px 15px;
    outline: none;
  }
`;

type props = {
  id: string;
  currency: string;
  amount?: string;
  inputActivated?: boolean;
  handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const CurrencyWrapper = ({ id, currency, inputActivated }: props) => {
  return (
    <div
      css={`
        display: inline-block;
        position: relative;
      `}
    >
      <CurrencySelection inputActivated={inputActivated}>
        <div
          css={`
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
          `}
        >
          <div
            className="flag-wrapper"
            css={`
              display: inline-flex;
              position: relative;
              overflow: hidden;
              horder-radius: 2px;
              width: 24px;
              height: auto;
              flex-shrunk: 0;
              margin-right: 8px;
            `}
          >
            <img
              src={currencyMap[currency].src}
              alt={currencyMap[currency].name}
              css={`
                object-fit: contain;
                height: 100%;
                width: 100%;
              `}
            />
          </div>
          <div
            className="faceplate-text"
            css={`
              flex-grow: 1;
              text-align: left;
              color: rgb(92, 102, 123);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            <span
              css={`
                color: rgb(20, 30, 55);
              `}
            >
              {`${currencyMap[currency].code} - `}
            </span>
            {currencyMap[currency].name}
          </div>
        </div>
      </CurrencySelection>
      <InputWrapper id="input-fromCurrency">
        <Input id={id} inputActivated={inputActivated} />
      </InputWrapper>
    </div>
  );
};

export default CurrencyWrapper;
