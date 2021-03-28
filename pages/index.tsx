import Head from "next/head";
import styles from "../styles/Home.module.css";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const BgContainer = styled.div`
  width: 100%;
  height: 60vh;
  background-color: ${({ colour }) => colour};
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>TWD Convertor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <BgContainer colour="#0a2239" />
        <BgContainer colour="#F1DEDE" />
      </Wrapper>
    </div>
  );
}
