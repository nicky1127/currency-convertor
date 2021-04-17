
import styled from "styled-components";

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
  &:active {
    background: #267e78;
    border-color: #267e78;
    box-shadow: rgb(0 113 235 / 50%) 0px 0px 0px 4px;
  }
  &:focus {
    background: #38bcb4;
    border-color: #38bcb4;
    box-shadow: rgb(20 30 55 / 70%) 0px 2px 4px 0px;
    outline: none;
  }
`;


export const Input = styled.input.attrs(() => ({
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


export const ButtonWrapper = styled.div`
  margin: 0;
             place-self: center;
              display: flex;
`;