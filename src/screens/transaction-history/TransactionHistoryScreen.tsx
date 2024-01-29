import {EyeClose} from 'assets';
import React from 'react';
import {Text, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
type Props = {};

const TransactionHistoryScreen = (props: Props) => {
  const icon = EyeClose;
  const pieData = [
    {
      value: 4,
      icon: <EyeClose height={20} width={20} />,
      color: '#177AD5',
      text: `54% ${React.createElement(icon)}`,
    },
    {value: 40, color: '#79D2DE', text: '30%'},
    {value: 20, color: '#ED6665', text: '26%'},
  ];
  return (
    <>
      <Text>TransactionHistoryScreen</Text>

      <View className="ml-4">
        <PieChart
          showText
          textColor="black"
          radius={100}
          textSize={10}
          showTextBackground
          textBackgroundRadius={15}
          data={pieData}
          
        />
      </View>
    </>
  );
};

export default TransactionHistoryScreen;
