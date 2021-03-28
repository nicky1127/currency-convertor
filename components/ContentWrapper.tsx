import React from "react";
import styled from "styled-components";

import MainPanel from "./MainPanel";

const Root = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  padding: 200px 24px 64px;
`;

const ContentWrapper = () => {
  return (
    <Root className="contentWrapper">
      <MainPanel />
    </Root>
  );
};

export default ContentWrapper;
