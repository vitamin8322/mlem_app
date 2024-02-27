import {Cloth, Dinner, Medical} from 'assets';
import classNames from 'classnames';
import { useTheme } from 'contexts/app.context';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { SvgProps } from 'react-native-svg';

type Props = {
  idCategory: string;
  setIdCategory: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  icon?: React.FC<SvgProps>
  item: any
};

const CardCategory = (props: Props) => {
  const { theme } = useTheme();
  const {idCategory, setIdCategory, index, icon, item} = props;
  const handlePress = () => {
    setIdCategory(item.id); // Set the active card when pressed
  };
  const title = 'Dinner'
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{borderColor:theme.textColor}}
      className={classNames(
        'flex justify-center items-center h-16 w-16 border border-gray-500 rounded-md m-1',
        {'border-2': item.id === idCategory},
      )}>
      {item?.icon && <View className='w-8 h-8'>
        { React.createElement(item?.icon,  { height: 30, width: 30, fill:'blue' })}
      {/* <Medical fill={'red'} height={30} width={30} /> */}
        
      </View>}
      <Text style={{color: theme.textColor}} className="text-[12px]" numberOfLines={1}>
        {item?.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CardCategory;
