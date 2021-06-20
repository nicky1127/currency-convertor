'use strict';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import SwapIcon from '../public/images/convert.svg';
import ChartContainer from 'components/ChartContainer';
import CurrencyWrapper from './CurrencyWrapper';
import IconButton from './IconButton';
import * as S from './styles';

import { useFetch } from 'hooks/index';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
	100% {
    opacity: 1;
  }
`;

const growHeight = keyframes`
  0% {
    /* height: 0; */
    visibility: hidden;
  }
  100% {
    /* height: auto; */
    visibility: visible;
  }
`;

const Label = styled.label`
  display: inline-block;
  align-self: flex-start;
  margin: 24px 0 4px;
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(20, 30, 55);
  &::selection {
    background-color: rgb(181, 215, 253);
  }
  &:first-child {
    margin-top: 0;
  }
  @media (min-width: 576px) {
    margin: 0;
  }
`;

const ErrorMsg = styled.div`
  font-size: 1.2rem;
  color: rgb(179, 0, 33);
`;
type JSONResponse = {
  data?: {
    ['Realtime Currency Exchange Rate']: Omit<{ [name: string]: string }, 'fetchedAt'>;
  };
  errors?: Array<{ message: string }>;
};

const getRateData = async (
  from: string = '',
  to: string = '',
  options = null
): Promise<{ string: string }> => {
  const url: string = `https://www.alphavantage.co/query?
				function=CURRENCY_EXCHANGE_RATE&
				from_currency=${from.toUpperCase()}&
				to_currency=${to.toUpperCase()}&
				apikey=${process.env.API_KEY}`;
  try {
    const response = await fetch(url, options).then((res) => res.json());

    if (response['Error Message']) throw Error(response['Error Message']);
    const data = await response?.['Realtime Currency Exchange Rate'];
    return data;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const ChartsPanel = () => {
  // console.log('%c ChartsPanel', 'background: #222; color: yellow');

  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(null);
  const [currencyArr, setCurrencyArr] = useState(['GBP', 'TWD']);
  const [fullNameArr, setFullNameArr] = useState(['', '']);
  const [lastUpdated, setLastUpdated] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [hideButton, setHideButton] = useState(true);
  const [animeOnResult, setAnimeOnResult] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [containerVisibility, setContainerVisibility] = useState('hidden');
  // const [containerOpacity, setContainerOpacity] = useState(0);

  console.log(`loading`, loading);

  useEffect(() => {
    if (isNaN(+amount)) {
      return setErrMsg('Please enter a valid amount');
    }
    return setErrMsg('');
  }, [amount]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.name) {
      setAmount(evt.target.value);
      setAnimeOnResult(true);
      // setContainerOpacity(0);
      // setTimeout(() => {
      //   setContainerOpacity(1);
      // }, 200);
    }
  };

  const destructureRes = (obj: { string: string }): void => {
    const rate = obj['5. Exchange Rate'];
    const fromCurrency = obj['2. From_Currency Name'];
    const toCurrency = obj['4. To_Currency Name'];
    const time = obj['6. Last Refreshed'];
    setTimeout(() => {
      setRate([1, +rate]);
    }, 200);
    setFullNameArr([fromCurrency, toCurrency]);
    setLastUpdated(time);
    setAnimeOnResult(true);
  };

  const handleChangeFromCurrency = async (currency: string): Promise<any> => {
    if (hideButton) {
      try {
        setLoading(true);
        const rateObj: { string: string } = await getRateData(currency, currencyArr[1]);
        rateObj && destructureRes(rateObj);
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
    setCurrencyArr([currency, currencyArr[1]]);
  };

  const handleChangeToCurrency = async (currency: string): Promise<any> => {
    if (hideButton) {
      try {
        setLoading(true);
        const rateObj: { string: string } = await getRateData(currencyArr[0], currency);
        rateObj && destructureRes(rateObj);
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
    setCurrencyArr([currencyArr[0], currency]);
  };

  const handleClickSwapButton = async (evt: React.MouseEvent<HTMLButtonElement>): Promise<any> => {
    evt.preventDefault();
    evt.stopPropagation();

    if (hideButton) {
      try {
        setLoading(true);
        const rateObj: { string: string } = await getRateData(currencyArr[1], currencyArr[0]);
        rateObj && destructureRes(rateObj);
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
    setCurrencyArr(([a, b]) => [b, a]);
    // rate && setRate(([a, b]) => [b, a]);
    // setFullNameArr(([a, b]) => [b, a]);
  };

  const handleClickConvertButton = async (
    evt: React.MouseEvent<HTMLButtonElement>
  ): Promise<any> => {
    evt.preventDefault();
    evt.stopPropagation();

    try {
      setLoading(true);
      // const rateObj: { string: string } = await getRateData(currencyArr[0], currencyArr[1]);
      // rateObj && destructureRes(rateObj);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setHideButton(true);
  };

  return (
    <div
      css={`
        flex: 1 1 0;
        /* background-color: #fff; */
        padding: 24px;
        box-sizing: border-box;
        width: 100%;

        @media (min-width: 768px) {
          padding: 48px;
        }
      `}
    >
      {/* <form> */}
      <S.ChartsPanelGridContainer>
        {/* <Label htmlFor="input_amount">Amount</Label>
        <InputWrapper id="input_amount" name="amount" amount={amount} handleChange={handleChange} />
        <ErrorMsg aria-live="assertive">{errMsg}</ErrorMsg> */}

        <Label htmlFor="input_fromCurrency">From</Label>
        <CurrencyWrapper
          id="input_fromCurrency"
          inputActivated={false}
          currency={currencyArr[0]}
          handleChangeInput={handleChangeFromCurrency}
        />

        <div></div>
        <S.SwapButtonContainer>
          <IconButton icon={<SwapIcon />} handleClick={handleClickSwapButton} />
        </S.SwapButtonContainer>

        <Label htmlFor="input-toCurrency">To</Label>
        <CurrencyWrapper
          id="input_toCurrency"
          inputActivated={false}
          currency={currencyArr[1]}
          handleChangeInput={handleChangeToCurrency}
        />
      </S.ChartsPanelGridContainer>
      {hideButton ? (
        <div
          id="chartContainer"
          className="chartContainer"
          // onAnimationEnd={() => {
          //   setAnimeOnResult(false);
          // }}
          css={`
            margin-top: 24px;
            /* animation: ${animeOnResult && fadeIn} ease 1s;
            opacity: ${loading ? 0 : 1}; */
          `}
        >
          <ChartContainer fromCurrency={currencyArr[0]} toCurrency={currencyArr[1]} />
        </div>
      ) : (
        <S.SubmitContainer
          className="submitContainer"
          css={`
            margin-top: 24px;
          `}
        >
          <S.ConvertButton onClick={handleClickConvertButton}>View Chart</S.ConvertButton>
        </S.SubmitContainer>
      )}
    </div>
  );
};

export default ChartsPanel;
