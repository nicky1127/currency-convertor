import React, { useState } from 'react';
import styled from 'styled-components';

import ConvertPanel from './ConvertPanel';
import ChartsPanel from 'components/ChartsPanel';

//> SVG images
import MoneyIcon from '../public/images/icon_money.svg';
import ChartIcon from '../public/images/icon_chart.svg';

const Root = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  width: 100%;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
`;

const TabContainer = styled.div`
  display: flex;
  height: 58px;
  width: 100%;
`;

const Tab = styled.a<{ active: boolean }>`
  flex: 1 1 0px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4px;
  font-size: 1.4rem;
  font-weight: bold;
  /* color: #267e78; */
  color: ${(props) => (props.active ? '#267e78' : 'rgb(55, 80, 110)')};
  background-color: ${(props) => (props.active ? '#fff' : ' rgb(240, 245, 250)')};

  & svg path {
    stroke: ${(props) => (props.active ? '#267e78' : 'rgb(55, 80, 110)')};
  }

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }

  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

const TabTitle = styled.span`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 480px) {
    margin-left: 8px;
  }
`;

const MainPanel = () => {
  // console.log('%c MainModal', 'background: #222; color: #00ccff');

  const [panel, setPanel] = useState(0);

  return (
    <Root className="mainPanelWrapper">
      <TabContainer>
        <Tab active={panel === 0} onClick={() => setPanel(0)}>
          <MoneyIcon />
          <TabTitle>Convert</TabTitle>
        </Tab>
        <Tab active={panel === 1} onClick={() => setPanel(1)}>
          <ChartIcon />
          <TabTitle>Charts</TabTitle>
        </Tab>
      </TabContainer>
      {panel === 0 && <ConvertPanel />}
      {panel === 1 && <ChartsPanel />}
    </Root>
  );
};

export default MainPanel;
