"use strict";

import React, { useState, useEffect, useRef } from "react";
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
  console.log("%c ConvertPanel", "background: #222; color: yellow");

  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(null);
  const [currencyArr, setCurrencyArr] = useState(["gbp", "twd"]);
  const [fullNameArr, setFullNameArr] = useState(["", ""]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [fromCurrency, setFromCurrency] = useState("gbp");
  // const [toCurrency, setToCurrency] = useState("twd");

  // const value = useRef(1);

  console.log(`amount`, amount);
  console.log(`rate`, rate);
  console.log(`fullNameArr`, fullNameArr);

  useEffect(() => {
    if (isNaN(+amount)) {
      return setErrMsg("Please enter a valid amount");
    }
    return setErrMsg("");
  }, [amount]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.name) {
      setAmount(evt.target.value);
    }
  };

  const handleClickSwapButton = (
    evt: React.MouseEvent<HTMLButtonElement>
  ): void => {
    evt.preventDefault();
    evt.stopPropagation();
    // console.log("==============>function");
    // console.log(`value.current`, value.current);
    setCurrencyArr(([a, b]) => [b, a]);
    // value.current = value.current + 1;
  };

  const handleClickConvertButton = (
    evt: React.MouseEvent<HTMLButtonElement>
  ): void => {
    evt.preventDefault();
    evt.stopPropagation();

    fetch(
      `https://www.alphavantage.co/query?
			function=CURRENCY_EXCHANGE_RATE&
			from_currency=${currencyArr[0].toUpperCase()}&
			to_currency=${currencyArr[1].toUpperCase()}&
			apikey=CR78XFOMW0NKUEI7
			`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(`json`, json);
        const rateObj = json["Realtime Currency Exchange Rate"];
        if (rateObj) {
          const rate = rateObj["5. Exchange Rate"];
          const fromCurrency = rateObj["2. From_Currency Name"];
          const toCurrency = rateObj["4. To_Currency Name"];
          const time = rateObj["6. Last Refreshed"];
          setRate(rate);
          setFullNameArr([fromCurrency, toCurrency]);
          setLastUpdated(time);
        }
      });
  };

  return (
    <div
      css={`
        flex: 1 1 0;
        /* background-color: #fff; */
        padding: 48px;
        box-sizing: border-box;
        width: 100%;
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
            name="amount"
            amount={amount}
            handleChange={handleChange}
          />
          <ErrorMsg>{errMsg}</ErrorMsg>

          <Label htmlFor="input_fromCurrency">From</Label>
          <CurrencyWrapper
            id="input_fromCurrency"
            inputActivated={false}
            currency={currencyArr[0]}
          />
          <div></div>

          <div></div>
          <S.ButtonWrapper>
            <IconButton
              icon={<SwapIcon />}
              handleClick={handleClickSwapButton}
            />
          </S.ButtonWrapper>
          <div></div>

          <Label htmlFor="input-toCurrency">To</Label>
          <CurrencyWrapper
            id="input_toCurrency"
            inputActivated={false}
            currency={currencyArr[1]}
          />
          <div></div>
        </div>

        <div
          className="figureContainer"
          css={`
            margin-top: 24px;
          `}
        >
          <p
            css={`
              color: rgb(92, 102, 123);
              font-size: 1.6rem;
              font-weight: 600;
            `}
          >{`${(+amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} ${fullNameArr[0]} = `}</p>
          <p
            css={`
              color: rgb(46, 60, 87);
              font-size: 3rem;
              font-weight: 600;
              margin-bottom: 24px;
            `}
          >
            {`${(+amount * rate).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} ${fullNameArr[1]}`}
          </p>
        </div>
        <div
          className="unitRatesContainer"
          css={`
            color: rgb(92, 102, 123);
            font-size: 1.4rem;
            text-align: left;
            margin-bottom: 24px;
          `}
        >
          <p>{`1 ${currencyArr[0].toUpperCase()} = ${Number(
            rate
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          })} ${currencyArr[1].toUpperCase()}`}</p>
          <p>{`1 ${currencyArr[1].toUpperCase()} = ${Number(
            1 / rate
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          })} ${currencyArr[0].toUpperCase()}`}</p>

          <p
            css={`
              margin-top: 12px;
              font-size: 1.2rem;
            `}
          >{`Last updated ${lastUpdated}`}</p>
        </div>
        <div
          className="submitContainer"
          css={`
            display: flex;
            margin-top: 24px;
            justify-content: flex-end;
          `}
        >
          <S.Button onClick={handleClickConvertButton}>Convert</S.Button>
        </div>
      </form>
    </div>
  );
};

export default ConvertPanel;
