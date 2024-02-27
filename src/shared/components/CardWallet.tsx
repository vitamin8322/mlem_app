import {Option, WouldInternet} from 'assets';
import { useTheme } from 'contexts/app.context';
import React from 'react';
import {Text, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

type Props = {
  name: string;
  value: string | number
  icon: any
};

const CardWallet = (props: Props) => {
  const { theme } = useTheme();
  const {name, value, icon} = props

  function alert(arg0: string): any {
  }

  return (
    <View style={{backgroundColor: theme.backgroundColor}} className="flex flex-row justify-between items-center h-14 bg-white mt-1 px-3">
      <View className="flex flex-row items-center gap-x-2 ">
      { React.createElement(icon,  { height: 40, width: 40 })}
        <View>
          <Text style={{color: theme.textColor}} className="text-[16px]">{name}</Text>
          <Text style={{color: theme.textColorBland}} className="text-[14px] text-gray-500">{value} đ</Text>
        </View>
      </View>
      <Menu>
        <MenuTrigger>
          <Option height={20} width={20} fill={theme.textColor} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text="Sửa" />
          <MenuOption onSelect={() => alert(`Save`)} text="Chuyển tiền đến ví khác" />
          <MenuOption onSelect={() => alert(`Delete`)}>
            <Text style={{color: 'red'}}>Xóa</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => alert(`Not called`)}
            disabled={true}
            text="Disabled"
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default CardWallet;
