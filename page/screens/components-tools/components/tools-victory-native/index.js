import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaView
} from 'react-native';

import styled from 'styled-components/native';

import { Circle } from 'react-native-svg';

import { VictoryChart, VictoryLine, VictoryScatter } from 'victory-native';

const StyledPoint = styled(Circle).attrs(({ color }) => ({
  fill: color
}))`
`;

const colors = ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"];

const ScatterPoint = ({ x, y, datum, min, max }) => {
  const i = React.useMemo(() => {
    return Math.floor(((datum.y - min) / (max - min)) * (colors.length - 1));
  }, [datum, min, max]);

  return <StyledPoint color={colors[i]} cx={x} cy={y} r={8} />;
};

const Chart = () => {
  const data = [
    { x: "Jan", y: 43 },
    { x: "Feb", y: 44 },
    { x: "Mar", y: 47 },
    { x: "Apr", y: 51 },
    { x: "May", y: 57 },
    { x: "Jun", y: 62 },
    { x: "Jul", y: 67 },
    { x: "Aug", y: 68 },
    { x: "Sep", y: 63 },
    { x: "Oct", y: 54 },
    { x: "Nov", y: 47 },
    { x: "Dec", y: 42 }
  ];

  const temperatures = data.map(({ y }) => y);
  console.log(temperatures);
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);

  return (
    <VictoryChart>
      <VictoryLine data={data} animate={{
        duration: 2000,
        onLoad: { duration: 1000 }
      }} />
      <VictoryScatter
        data={data}
        dataComponent={<ScatterPoint min={min} max={max} />}
      />
    </VictoryChart>
  );
}

export default Chart;