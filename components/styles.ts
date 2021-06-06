import styled from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  outline-offset: 4px;
  text-align: center;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 1.6rem;
  color: #fff;
  background: #2f9c95;
  border: 2px solid #2f9c95;
  border-radius: 8px;
  transition-property: background-color, border-color;
  transition-duration: 0.3s;

  &:hover {
    background: #38bcb4;
    border-color: #38bcb4;
    box-shadow: rgb(20 30 55 / 70%) 0px 2px 4px 0px;
  }
  &:focus {
    background: #38bcb4;
    border-color: #38bcb4;
    box-shadow: rgb(20 30 55 / 70%) 0px 2px 4px 0px;
    outline: none;
  }
  &:active {
    background: #267e78;
    border-color: #267e78;
    box-shadow: rgb(0 113 235 / 50%) 0px 0px 0px 4px;
  }
`;

export const ConvertButton = styled(Button)`
  width: 100%;

  @media (min-width: 576px) {
    width: auto;
  }
`;

export const Input = styled.input.attrs(() => ({
  type: 'text',
  inputMode: 'decimal',
  autoComplete: 'off'
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

export const SwapButtonContainer = styled.div`
  @media (min-width: 576px) {
    margin: 0;
    place-self: center;
    justify-content: space-between;
  }
  display: flex;
  justify-content: center;
  margin: 16px 0 -8px;
`;

export const ConvertPanelGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 576px) {
    display: grid;
    gap: 4px 16px;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) auto minmax(100px, 1fr);
    grid-template-rows: auto[input-row-start] auto[input-row-end] auto;
    grid-auto-flow: column;
  }
`;

export const UnitRatesContainer = styled.div`
  color: rgb(92, 102, 123);
  font-size: 1.4rem;
  text-align: left;
  margin-bottom: 24px;
`;

export const SubmitContainer = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: flex-end;
`;
