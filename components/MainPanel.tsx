import React from "react";
import styled from "styled-components";

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

const MainPanel = () => {
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
            <label
              htmlFor="amount"
              css={`
                font-weight: 600;
                color: rgb(20, 30, 55);
                &::selection {
                  background-color: rgb(181, 215, 253);
                }
              `}
            >
              Amount
            </label>
            <div
              className="inputWrapper"
              css={`
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
              `}
            >
              <span
                css={`
                  white-space: nowrap;
                  width: 100%;
                `}
              >
                <span>£</span>
                <input
                  css={`
                    border: 0px;
                    margin: 0px;
                    padding: 0px;
                    /* align-self: stretch; */
                    box-sizing: content-box;
                    &:focus {
                      outline: none;
                    }
                  `}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                />
              </span>
            </div>
          </div>
        </form>
      </div>
    </Root>
  );
};

export default MainPanel;
