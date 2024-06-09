import {formatNumberWithCommas} from '@shared-constants';
import { useTheme } from 'contexts/app.context';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

type Props = {
  data: any;
  selectViewReport: number;
};

const BarchartHome = (props: Props) => {
  const {theme} = useTheme();
  const {t} = useTranslation('home');
  
  const {data, selectViewReport} = props;
  const [numberMonthData, setNumberMonthData] = useState(moment().format('M'))
  const [numberWeekData, setNumberWeekData] = useState(moment().format('W'))
  console.log(111, data);
  // console.log(2222,data[Number(selectViewReport === 1 ?numberWeekData :numberMonthData)-2]);
  
  const barData = [
    {
      value: data.previous[0].total,
      label: selectViewReport === 0 ? t("lastWeek") : t("lastMonth"),
      frontColor: '#4ABFF4',
      labelTextStyle: {color: theme.textColor},
    },
    {
      value: data.current[0].total,
      label: selectViewReport === 0 ? t("thisWeek") : t("thisMonth"),
      frontColor: '#79C3DB',
      labelTextStyle: {color: theme.textColor},
    },
  ];
  let maxValue = Math.max(
    data.previous[0].total,
    data.current[0].total,
  );

  if (data.previous[0].total === 0 && data.current[0].total === 0) {
    return (
      <Text className="text-center">No data</Text>
    )
  }

  return (
    <View>
      <BarChart
        // showFractionalValues
        // showYAxisIndices
        noOfSections={2}
        // showGradient={false}
        maxValue={
          Math.max(
            data.previous[0].total,
            data.current[0].total,
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
