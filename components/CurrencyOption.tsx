import React from 'react';

type props = {
  id: string;
  imgSrc: string;
  code: string;
  name: string;
};

const CurrencyOption = (props: props) => {
  const { id, imgSrc, code, name } = props;
  return (
    <li
      id={id}
      role="option"
      aria-selected="true"
      css={`
        display: flex;
        align-items: center;
        padding: 10px 12px;
        cursor: pointer;
        font-size: 1.4rem;
        position: relative;
        overflow: hidden;

        &[aria-selected='true'] {
          background-color: rgb(250, 251, 253);
        }

        &:hover {
          background-color: #d9d9d9;
        }
      `}
    >
      <div
        css={`
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          margin-right: 8px;
        `}
      >
        <div
          css={`
            width: 24px;
            height: auto;
            display: inline-flex;
            position: relative;
            border-radius: 2px;
            overflow: hidden;
          `}
        >
          <img
            src={imgSrc}
            // alt={currencyMap[currency].name}
            css={`
              object-fit: contain;
              width: 100%;
              height: 100%;
            `}
          />
        </div>
      </div>
      <div>
        {code}&nbsp;-&nbsp;
        <span
          css={`
            color: rgb(92, 102, 123);
          `}
        >
          {name}
        </span>
      </div>
    </li>
  );
};

export default CurrencyOption;
