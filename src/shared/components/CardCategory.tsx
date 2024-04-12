import {LIST_CATEGORY, SCREENS} from '@shared-constants';
import {Cloth, Dinner, Medical} from 'assets';
import classNames from 'classnames';
import {useTheme} from 'contexts/app.context';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import { navigate } from 'react-navigation-helpers';

type Props = {
  idCategory: string;
  setIdCategory: React.Dispatch<React.SetStateAction<string>>;
  setIcon?: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  icon?: React.FC<SvgProps>;
  item: any;
  selectTransaction?: number
};

const CardCategory = (props: Props) => {
  const {theme} = useTheme();
  const {idCategory, setIdCategory, index, setIcon, item, selectTransaction} = props;
  
  const handlePress = () => {
    if (item.navigate) {
        navigate(SCREENS.LIST_CATEGORY_SCREEN, {
          page: selectTransaction,
        });
    }
    setIdCategory(item._id);
    if (setIcon) {
      setIcon(item?.icon);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{borderColor: theme.textColor}}
      className={classNames(
        'flex justify-center items-center h-16 w-[22%] border border-gray-500 rounded-md m-1',
        {'border-2': item._id === idCategory},
      )}>
      {item?.icon && (
        <View className="w-8 h-8">
          {React.createElement(LIST_CATEGORY[item?.icon]?.icon, {
            height: 30,
            width: 30,
            fill:  item?.fill ? `#${item?.fill}` : '#000000' ,
            // fill:  '#1fc72b' ,
          })}
        </View>
      )}
      {item.name && (
        <Text
          style={{color: theme.textColor}}
          className="text-[12px]"
          numberOfLines={1}>
          {item.name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CardCategory;
