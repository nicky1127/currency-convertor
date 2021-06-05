'use strict';
import React, { useState } from 'react';
import styled from 'styled-components';

import CurrencyOption from 'components/CurrencyOption';

import ArrowIcon from 'public/images/select_arrow.svg';

import * as S from './styles';

interface currency {
  code: string;
  name: string;
  src: string;
}

interface currencyMap {
  [currencyName: string]: currency;
}

//! Three ways to denote the type of object
// const currencyMap: { [currencyName: string]: currency } = {
// const currencyMap: currencyMap = {
const currencyMap: Record<string, currency> = {
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    src: '/images/gbp.svg'
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    src: '/images/usd.svg'
  },
  TWD: {
    code: 'TWD',
    name: 'Taiwan New Dollar',
    src: '/images/twd.svg'
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    src: '/images/jpy.svg'
  }
};

const CurrencySelection = styled.div.attrs((props) => ({
  id: 'fromCurrency-selection',
  className: 'currency-wrapper'
}))<{ inputActivated: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  visibility: ${({ inputActivated }) => (inputActivated ? 'hidden' : 'visible')};
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
  className: 'inputWrapper'
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
  border: 1px solid rgb(221, 221, 221);
  color: ${({ inputActivated }) => !inputActivated && 'transparent'};
  border-color: transparent;
  box-shadow: none;
  padding-right: 40px;
  cursor: pointer;
  background: none;
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
  handleChangeInput?: (currency: string) => void;
};

const CurrencyWrapper = ({ id, currency, inputActivated, handleChangeInput }: props) => {
  const [selectOpen, setSelectOpen] = useState(false);
  return (
    <div
      css={`
        display: inline-block;
        position: relative;
        height: 100%;
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
              border-radius: 2px;
              width: 24px;
              height: auto;
              flex-shrink: 0;
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
          <button
            css={`
              position: absolute;
              right: 6px;

              display: inline-flex;
              -webkit-box-align: center;
              align-items: center;
              -webkit-box-pack: center;
              justify-content: center;
              appearance: none;
              border: 0px;
              border-radius: 50%;
              padding: 0px;
              margin: 0px;
              background: none;
              color: currentcolor;
            `}
          >
            <ArrowIcon
              css={`
                width: 1em;
                height: 0.6em;
                color: currentcolor;
                flex-shrink: 0;
              `}
            />
          </button>
        </div>
      </CurrencySelection>
      <InputWrapper
        id={`${id}_inputWrapper`}
        css={`
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          display: flex;
          align-items: center;
        `}
      >
        <Input id={`${id}_input`} inputActivated={inputActivated} />
      </InputWrapper>
      <ul
        id={`${id}_listbox`}
        role="listbox"
        css={`
          width: 100%;
          position: absolute;
          left: 0;
          top: 100%;
          z-index: 10;
          overflow: auto;
          max-height: 300px;
          margin-top: 8px;
          border-radius: 0 0 8px 8px;
          box-shadow: rgb(0 17 51 / 10%) 0px 10px 40px;
          background-color: rgb(255, 255, 255);
        `}
      >
        {Object.values(currencyMap).map((currency, idx) => (
          <CurrencyOption
            id={`${id}_option_${idx}`}
            key={`${id}_option_${idx}`}
            imgSrc={currency.src}
            code={currency.code}
            name={currency.name}
            handleClick={handleChangeInput}
          />
        ))}
      </ul>
    </div>
  );
};

export default CurrencyWrapper;
