import {formatNumberWithCommas} from '@shared-constants';
import { useTheme } from 'contexts/app.context';
import moment from 'moment';
import React from 'react';
import {Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

type Props = {
  data: any;
};

const BarchartHome = (props: Props) => {
  const {theme} = useTheme();
  
  const {data} = props;
  
  const barData = [
    {
      value: data[data.length - 2].totalMoney,
      label: 'Tháng trước',
      frontColor: '#4ABFF4',
      labelTextStyle: {color: theme.textColor},
    },
    {
      value: data[data.length -1 ].totalMoney,
      label: 'Tháng này',
      frontColor: '#79C3DB',
      labelTextStyle: {color: theme.textColor},
    },
  ];
  let maxValue = Math.max(
    data[data.length - 2].totalMoney,
    data[data.length-1].totalMoney,
  );

  return (
    <View>
      <BarChart
        // showFractionalValues
        // showYAxisIndices
        noOfSections={2}
        // showGradient={false}
        maxValue={
          Math.max(
            data[data.length - 2].totalMoney,
            data[data.length - 1].totalMoney,
          ) +
          maxValue / 3
        }
        barWidth={60}
        data={barData}
        isAnimated
        spacing={50}
        hideYAxisText
        yAxisColor={'transparent'}
        xAxisColor={theme.textColor}
        renderTooltip={(item: any, index: number) => {
          // console.log(item);
          return (
            <View
              style={{
                marginBottom: 20,
                marginLeft: -6,
                backgroundColor: '#ffcefe',
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 4,
                width: 100,
              }}>
              <Text>{formatNumberWithCommas(String(item.value))} đ</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default BarchartHome;
