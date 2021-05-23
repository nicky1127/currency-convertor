import Head from 'next/head';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import ContentWrapper from '../components/ContentWrapper';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f1dede;
`;

const BgContainer = styled.div<{ colour: string }>`
  width: 100%;
  height: 48vh;
  position: absolute;
  background-color: ${({ colour }) => colour};
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>TWD Convertor</title>
        <link rel="icon" href="/favicon_2.png" />
      </Head>
      <Wrapper className="appWrapper">
        <BgContainer colour="#0a2239" />
        <ContentWrapper />
      </Wrapper>
    </div>
  );
}
