import React, { useState } from "react";
import styled from "styled-components";

import ConvertPanel from "./ConvertPanel";

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
      <ConvertPanel />
    </Root>
  );
};

export default MainPanel;
