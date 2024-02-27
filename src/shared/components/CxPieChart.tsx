import {LIST_ITEM_EXPENSES} from '@shared-constants';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {PieChart, pieDataItem} from 'react-native-gifted-charts';
import {G, Line, Text as TextSvg} from 'react-native-svg';

type Props = {};
export const CxPieChart = (props: Props) => {
  const [valueCenterLabel, setValueCenterLabel] = useState();

  const pieData = [
    {
      // _id: null,
      idCategory: 'exp02',
      value: 20000,
      percentage: 3.6363636363636362,
    },
    {
      _id: null,
      idCategory: 'exp04',
      value: 40000,
      percentage: 7.2727272727272725,
    },
    {
      _id: null,
      idCategory: 'exp05',
      value: 160000,
      percentage: 29.09090909090909,
    },
    {
      // _id: null,
      idCategory: 'exp06',
      value: 90000,
      percentage: 16.363636363636363,
    },
    {
      // _id: null,
      idCategory: 'exp01',
      value: 10000,
      percentage: 1.8181818181818181,
    },
    {
      // _id: null,
      idCategory: 'exp08',
      value: 50000,
      percentage: 9.090909090909092,
    },
    {
      // _id: null,
      idCategory: 'exp07',
      value: 100000,
      percentage: 18.181818181818183,
    },
    {
      // _id: null,
      idCategory: 'exp03',
      value: 80000,
      percentage: 14.545454545454545,
    },
  ];
  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };
  return (
    <View>
      <View>
        <Text>Performance</Text>
        <View style={{padding: 20, alignItems: 'center'}}>
          <PieChart
            data={pieData}
            donut
            showGradient
            radius={90}
            innerRadius={60}
            showText={true}
            focusOnPress
            onPress={(value: any, index: any) => {
              setValueCenterLabel(value);
            }}
            centerLabelComponent={() => {
              return (
                valueCenterLabel && (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{Math.floor(valueCenterLabel?.percentage)}%</Text>
                    <Text>
                      {LIST_ITEM_EXPENSES.filter(itemExpenses => {
                        return itemExpenses.id === valueCenterLabel?.idCategory;
                      }).map((filteredItem, index) => (
                        <View
                          key={index}
                          className="flex flex-row items-center">
                          {React.createElement(filteredItem?.icon, {
                            height: 30,
                            width: 30,
                            fill: 'blue',
                          })}
                          <View className="ml-3">
                            <Text className="font-semibold">
                            {filteredItem.title}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </Text>
                  </View>
                )
              );
            }}
          />
        </View>
        {/* {renderLegendComponent()} */}
      </View>
    </View>
  );
};

export default CxPieChart;
