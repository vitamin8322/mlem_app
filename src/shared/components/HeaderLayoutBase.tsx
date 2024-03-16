import { ArrowLeft } from 'assets';
import classNames from 'classnames';
import { useTheme } from 'contexts/app.context';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {goBack} from 'react-navigation-helpers';

type Props = {};

type HeaderLayoutBaseType = {
  isBack?: boolean;
  nameScreen: string;
  checkIsBack?: boolean | undefined;
  setCheckIsBack?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

const HeaderLayoutBase = (props: HeaderLayoutBaseType) => {
  const { theme } = useTheme();
  const {isBack, nameScreen, checkIsBack, setCheckIsBack} = props;

  return (
    <View style={[styles.shadow, {backgroundColor: theme.backgroundColor}]} className='flex flex-row items-center border-gray-200 rounded h-16 px-3'>
      <View>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
            <ArrowLeft height={30} width={30} fill={theme.textColor}/>
        </TouchableOpacity>
      </View>
      <Text style={{color: theme.textColor}} className={classNames('text-[18px] font-semibold ml-2')}>
        {nameScreen}
      </Text>
    </View>
  );
};

export default HeaderLayoutBase;

const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
  });