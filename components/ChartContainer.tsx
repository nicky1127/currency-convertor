import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  Legend,
  ResponsiveContainer
} from 'recharts';

const getRateData = async (
  from: string = '',
  to: string = '',
  chartTime: string = '1D',
  options = null
): Promise<{ string: string }> => {
  let url;

  switch (chartTime) {
    case '1H':
      url = `https://www.alphavantage.co/query?
				function=FX_INTRADAY&
				interval=60min&
				from_symbol=${from.toUpperCase()}&
				to_symbol=${to.toUpperCase()}&
				apikey=${process.env.API_KEY}`;
      break;
    case '1D':
      url = `https://www.alphavantage.co/query?
				function=FX_DAILY&
				from_symbol=${from.toUpperCase()}&
				to_symbol=${to.toUpperCase()}&
				apikey=${process.env.API_KEY}`;
      break;
    case '1W':
      url = `https://www.alphavantage.co/query?
				function=FX_WEEKLY&
				from_symbol=${from.toUpperCase()}&
				to_symbol=${to.toUpperCase()}&
				apikey=${process.env.API_KEY}`;
      break;
    case '1M':
      url = `https://www.alphavantage.co/query?
				function=FX_MONTHLY&
				from_symbol=${from.toUpperCase()}&
				to_symbol=${to.toUpperCase()}&
				apikey=${process.env.API_KEY}`;
      break;

    default:
      break;
  }
  try {
    const response = await fetch(url, options).then((res) => res.json());
    if (response['Error Message']) throw Error(response['Error Message']);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};

type props = {
  fromCurrency: string;
  toCurrency: string;
};

const ChartContainer = (props: props) => {
  // console.log('%c ChartContainer', 'background: #222; color: yellow');
  const { fromCurrency, toCurrency } = props;
  const [metaData, setMetaData] = useState(null);
  const [dataObj, setDataObj] = useState(null);
  const [chartTime, setChartTime] = useState('1D');
  console.log(`metaObj`, metaData);
  console.log(`dataObdj`, dataObj);
  console.log(`chartTime`, chartTime);

  useEffect(() => {
    getRateData(fromCurrency, toCurrency, chartTime)
      .then((response) => {
        if (response?.['Meta Data']) {
          setMetaData(response['Meta Data']);
          // setDataObj(response['Time Series FX (Daily)']);

          const arr = [];
          // for (const [key, value] of Object.entries(response['Time Series FX (Daily)'])) {
          //   console.log(`value`, key, value);
          //   arr.push({ time: key, price: +value['2. high'] });
          // }
          if (chartTime === '1H') {
            for (const key in response['Time Series FX (60min)']) {
              arr.unshift({
                time: key,
                price: +response['Time Series FX (60min)'][key]['2. high']
              });
            }
          } else if (chartTime === '1D') {
            for (const key in response['Time Series FX (Daily)']) {
              arr.unshift({
                time: key,
                price: +response['Time Series FX (Daily)'][key]['2. high']
              });
            }
          } else if (chartTime === '1W') {
            console.log(`response['Time Series FX (Weekly)']`, response['Time Series FX (Weekly)']);
            for (const key in response['Time Series FX (Weekly)']) {
              arr.unshift({
                time: key,
                price: +response['Time Series FX (Weekly)'][key]['2. high']
              });
            }
          } else if (chartTime === '1M') {
            console.log(
              `response['Time Series FX (Monthly)']`,
              response['Time Series FX (Monthly)']
            );
            for (const key in response['Time Series FX (Monthly)']) {
              arr.unshift({
                time: key,
                price: +response['Time Series FX (Monthly)'][key]['2. high']
              });
            }
          }
          setDataObj(arr);
        }
      })
      .catch((err) => console.error(err.message));
  }, [fromCurrency, toCurrency, chartTime]);

  const chartTimeArr = ['1H', '1D', '1W', '1M'];

  const onClickChartTime = (chartTime) => {
    setChartTime(chartTime);
  };

  return (
    <div
    // css={`
    //   height: 350px;
    // `}
    >
      <hr
        css={`
          border-right: none;
          border-bottom: none;
          border-left: none;
          border-image: initial;
          border-top: 1px solid rgb(240, 245, 250);
        `}
      />
      <div
        css={`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin: 20px auto 5px;
        `}
      >
        {chartTimeArr.map((time, idx) => (
          <ChartTimeButton
            key={`${time}_${idx}`}
            selected={time === chartTime}
            onClick={() => onClickChartTime(time)}
          >
            {time}
          </ChartTimeButton>
        ))}
      </div>
      <ResponsiveContainer className="chartWrapper" width="100%" height={350}>
        <LineChart
          width={500}
          height={300}
          data={dataObj}
          margin={{
            top: 10,
            right: 5,
            left: 5,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="5" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            orientation="right"
            tick={{ fontSize: '1.3rem' }}
            // ticks={[10, 20, 30]}
            domain={['dataMin', 'dataMax']}
            width={10}
            axisLine={false}
            tickLine={false}
            mirror={true}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#0071eb"
            activeDot={{ r: 4 }}
            dot={false}
            strokeWidth={1}
          />
          <Brush dataKey="time" travellerWidth={5} height={30} stroke="#8884d8"></Brush>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;

const ChartTimeButton = styled.button<{ selected: boolean }>`
  border-radius: 16px;
  background: ${(props) => (props.selected ? '#267e78' : 'rgb(255, 255, 255)')};
  color: ${(props) => (props.selected ? 'rgb(255,255,255)' : 'rgb(92, 102, 123)')};
  border: 0px;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 15px;
  margin: 0px 2px;
`;
