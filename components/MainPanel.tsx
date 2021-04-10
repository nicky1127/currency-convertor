import React, { useState } from "react";
import styled from "styled-components";
import Convert from "../public/images/convert.svg";
import InputWrapper from "./InputWrapper";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
`;

const TabContainer = styled.div`
  display: flex;
  flex-basis: 58px;
  width: 100%;
`;

const Tab = styled.a`
  flex: 1 1 0px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

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

const MainPanel = () => {
  const [amount, setAmount] = useState("");

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.value) {
      setAmount(evt.target.value);
    }
  };
  return (
    <Root className="converterWrapper">
      <TabContainer>
        <Tab>
          <span>Convert</span>
        </Tab>
        <Tab>
          <span>Charts</span>
        </Tab>
      </TabContainer>
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
            <InputWrapper id="input_fromCurrency" />
            <ErrorMsg>Please enter a valid value</ErrorMsg>
            <div></div>
            <div
              css={`
                margin: 0;
                place-self: center;
                display: flex;
              `}
            >
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
                <Convert
                // height={20}
                // width={20}
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </Root>
  );
};

export default MainPanel;
