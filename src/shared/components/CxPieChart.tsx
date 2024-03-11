import {LIST_ITEM_EXPENSES, LIST_ITEM_REVENUE} from '@shared-constants';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {PieChart, pieDataItem} from 'react-native-gifted-charts';
import {G, Line, Text as TextSvg} from 'react-native-svg';

type Props = {
  data: any
};
export const CxPieChart = (props: Props) => {
  const {data} = props
  const [valueCenterLabel, setValueCenterLabel] = useState();
  
  return (
    <View>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={data}
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
              valueCenterLabel && valueCenterLabel.idCategory && (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>{Math.floor(valueCenterLabel?.percent)}%</Text>
                  <Text>
                    {LIST_ITEM_EXPENSES.filter(itemExpenses => {
                      return itemExpenses.id === valueCenterLabel?.idCategory;
                    }).map((filteredItem, index) => (
                      <View key={index} className="flex flex-row items-center">
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
                    {LIST_ITEM_REVENUE.filter(itemExpenses => {
                      return itemExpenses.id === valueCenterLabel?.idCategory;
                    }).map((filteredItem, index) => (
                      <View key={index} className="flex flex-row items-center">
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
    </View>
  );
};

export default CxPieChart;
