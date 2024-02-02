import {Dinner} from 'assets';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  isExpenses?: boolean;
  isTransactionRecent?: boolean;
  isTransactionHistory?: boolean;
};

const CardTransaction = (props: Props) => {
  const {isExpenses, isTransactionRecent, isTransactionHistory} = props;
  return (
    <View className="flex flex-row justify-between items-center px-2 py-2">
      <View className="flex flex-row items-center">
        <Dinner height={35} width={35} />
        <View className="ml-3">
          <Text className="font-semibold">Bữa tối</Text>
          {isExpenses && <Text className="text-gray-500">40,000 đ</Text>}
        </View>
      </View>
      {isExpenses && <Text className="font-semibold text-red-500">2%</Text>}
      {(isTransactionRecent || isTransactionHistory) && <Text>50,000</Text>}
    </View>
  );
};

export default CardTransaction;
