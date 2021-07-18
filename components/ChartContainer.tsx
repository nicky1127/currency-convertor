import React, { useEffect, useState } from 'react';
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

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const getRateData = async (
  from: string = '',
  to: string = '',
  options = null
): Promise<{ string: string }> => {
  const url: string = `https://www.alphavantage.co/query?
				function=FX_DAILY&
				from_symbol=${from.toUpperCase()}&
				to_symbol=${to.toUpperCase()}&
				apikey=${process.env.API_KEY}`;
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
  // console.log(`metaObj`, metaData);
  console.log(`dataObdj`, dataObj);

  useEffect(() => {
    getRateData(fromCurrency, toCurrency)
      .then((response) => {
        if (response?.['Meta Data']) {
          setMetaData(response['Meta Data']);
          // setDataObj(response['Time Series FX (Daily)']);
          console.log(
            `response['Time Series FX (Daily)']`,
            Object.entries(response['Time Series FX (Daily)'])
          );
          const arr = [];
          // for (const [key, value] of Object.entries(response['Time Series FX (Daily)'])) {
          //   console.log(`value`, key, value);
          //   arr.push({ time: key, price: +value['2. high'] });
          // }
          for (const key in response['Time Series FX (Daily)']) {
            arr.unshift({ time: key, price: +response['Time Series FX (Daily)'][key]['2. high'] });
          }
          setDataObj(arr);
        }
      })
      .catch((err) => console.error(err.message));
  }, [fromCurrency, toCurrency]);

  return (
    <div
    // css={`
    //   height: 350px;
    // `}
    >
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
          <XAxis dataKey="time" />
          <YAxis
            orientation="right"
            tick={{ fontSize: 11 }}
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
