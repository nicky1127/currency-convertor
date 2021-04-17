"use strict";

import React, { useState } from "react";
import styled from "styled-components";

import SwapIcon from "../public/images/convert.svg";
import InputWrapper from "./InputWrapper";
import CurrencyWrapper from "./CurrencyWrapper";
import IconButton from "./IconButton";
import * as S from "./styles";

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(20, 30, 55);
  &::selection {
    background-color: rgb(181, 215, 253);
  }
`;

const ErrorMsg = styled.div`
  font-size: 1.2rem;
  color: rgb(179, 0, 33);
`;

const ConvertPanel = () => {
  console.log("%c MainModal", "background: #222; color: yellow");

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("gbp");
  const [toCurrency, setToCurrency] = useState("twd");

  console.log(`fromCurrency`, fromCurrency);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.value) {
      setAmount(evt.target.value);
    }
  };

  const handleClickSwapButton = (evt: React.MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    const arr = [fromCurrency, toCurrency];
    setFromCurrency(arr[1]);
    setToCurrency(arr[0]);
  };

  return (
    <div
      css={`
        flex: 1 1 0;
        background-color: #fff;
        padding: 48px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      `}
    >
      <form>
        <div
          css={`
            display: grid;
            gap: 4px 16px;
            grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) auto minmax(
                100px,
                1fr
              );
            grid-template-rows: auto [input-row-start] auto [input-row-end] auto;
            grid-auto-flow: column;
          `}
        >
          <Label htmlFor="input_amount">Amount</Label>
          <InputWrapper
            id="input_amount"
            amount={amount}
            handleChange={handleChange}
          />
          <ErrorMsg>Please enter a valid value</ErrorMsg>

          <Label htmlFor="input_fromCurrency">From</Label>
          <CurrencyWrapper
            id="input_fromCurrency"
            inputActivated={false}
            currency={fromCurrency}
          />
          <div></div>

          <div></div>
          <div
            css={`
              margin: 0;
              place-self: center;
              display: flex;
            `}
          >
            <IconButton
              icon={<SwapIcon />}
              handleClick={handleClickSwapButton}
            />
          </div>
          <div></div>

          <Label htmlFor="input-toCurrency">To</Label>
          <CurrencyWrapper
            id="input_toCurrency"
            inputActivated={false}
            currency={toCurrency}
          />
          <div></div>
        </div>

        <div
          className="submitContainer"
          css={`
            display: flex;
            margin-top: 24px;
            justify-content: flex-end;
          `}
        >
          <S.Button>Convert</S.Button>
        </div>
      </form>
    </div>
  );
};

export default ConvertPanel;
