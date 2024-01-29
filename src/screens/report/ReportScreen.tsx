import React from 'react';
import {Text, View} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
import {BarChart, PieChart, stackDataItem} from 'react-native-gifted-charts';
type Props = {};

const ReportScreen = (props: Props) => {
  const stackData:Array<stackDataItem> = [
    {
      stacks: [
        {value: 10, color: 'orange'},
        {value: 20, color: '#4ABFF4', marginBottom: 2},
      ],
      label: 'Jan',
    },
    {
      stacks: [
        {value: 10, color: '#4ABFF4'},
        {value: -15, color: '#28B2B3', marginBottom: 2},
      ],
      label: 'Mar',
    },
    {
      stacks: [
        {value: 14, color: 'orange'},
        {value: 18, color: '#4ABFF4', marginBottom: 2},
      ],
      label: '01/01-07/01',
    },
    {
      stacks: [
        {value: 7, color: '#4ABFF4'},
        {value: -10, color: '#28B2B3', marginBottom: 2},
      ],
      label: 'Mar',
    },
  ];
  const xAxisLabelTextStyle = {
    fontSize: 7, 
    marginBottom: 10
  };
  return (
    <>
      <Text>ReportScreen</Text>
      <View>
        <BarChart
          width={340}
          rotateLabel
          noOfSections={5}
          stackData={stackData}
          xAxisLabelTextStyle={xAxisLabelTextStyle}
          renderTooltip={(item:Array<stackDataItem>, index:number) => {
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
                  width:30
                }}>
                <Text>{item.stacks[0].value}</Text>
              </View>
            );
          }}
        />
      </View>

    </>
  );
};

export default ReportScreen;
