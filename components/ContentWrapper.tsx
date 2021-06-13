import React from 'react';
import styled from 'styled-components';

import MainPanel from './MainPanel';

const Root = styled.div`
  width: 100%;
  margin: 0 auto;
  min-width: 300px;
  max-width: 1200px;
  padding: 200px 24px 0;
  @media (max-width: 576px) {
    padding-top: 150px;
  }
`;

const ContentWrapper = () => {
  return (
    <Root className="contentWrapper">
      <MainPanel />
    </Root>
  );
};

export default ContentWrapper;
