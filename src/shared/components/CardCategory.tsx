import {Cloth, Dinner, Medical} from 'assets';
import classNames from 'classnames';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { SvgProps } from 'react-native-svg';

type Props = {
  cardActive: number;
  setCardActive: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  icon?: React.FC<SvgProps>
  item: any
};

const CardCategory = (props: Props) => {
  const {cardActive, setCardActive, index, icon, item} = props;
  const handlePress = () => {
    setCardActive(index); // Set the active card when pressed
  };
  const title = 'Dinner'
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={classNames(
        'flex justify-center items-center h-16 w-16 border border-gray-500 rounded-md m-1',
        {'border-2': index === cardActive},
      )}>
      {item?.icon && <View className='w-8 h-8'>
        { React.createElement(item?.icon,  { height: 30, width: 30, fill:'blue' })}
      {/* <Medical fill={'red'} height={30} width={30} /> */}
        
      </View>}
      <Text className="text-[12px]" numberOfLines={1}>
        {item?.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CardCategory;
