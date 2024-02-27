import CxPieChart from '@shared-components/CxPieChart';
import {Dinner, StartApp, Test} from 'assets';
import React from 'react';
import {View, Text, Image} from 'react-native';
import Svg, {Circle, G, Line, Text as TextSvg} from 'react-native-svg';
import {PieChart} from 'react-native-svg-charts';
const ReportScreen = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91];

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {fill: randomColor()},
      key: `pie-${index}`,
    }));

  const Labels = ({slices, height, width}: any) => {
    return slices.map((slice: any, index: any) => {
      const {labelCentroid, pieCentroid, data} = slice;
      
      return (
        <G key={index}>
          <Line
            x1={labelCentroid[0]}
            y1={labelCentroid[1]}
            x2={pieCentroid[0]}
            y2={pieCentroid[1]}
            stroke={data.svg.fill}
          />
            <TextSvg
              x={labelCentroid[0] - 15}
              y={labelCentroid[1] +5}>
              12312
            </TextSvg>
        </G>
      );
    });
  };

  return (
    // <PieChart
    //   style={{height: 400, marginTop: 10}}
    //   data={pieData}
    //   innerRadius={50}
    //   outerRadius={75}
    //   labelRadius={100}
    //   onPress={(event:any, slices:any) => {
    //     if (slices.length > 0) {
    //       const { index } = slices[0];
    //       // onSlicePress(slices[0], index);
    //       console.log(index);
          
    //     }
    //   }}>
    //   <Labels />
    // </PieChart>
    <CxPieChart />
  );
};

export default ReportScreen;
