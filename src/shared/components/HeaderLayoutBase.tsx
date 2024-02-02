import { ArrowLeft } from 'assets';
import classNames from 'classnames';
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
  const {isBack, nameScreen, checkIsBack, setCheckIsBack} = props;
  console.log(isBack);

  return (
    <View style={styles.shadow} className='flex flex-row items-center border-gray-200 rounded bg-white h-16 px-3'>
      <View>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
            <ArrowLeft height={30} width={30} />
        </TouchableOpacity>
      </View>
      <Text className={classNames('text-[18px] font-semibold text-black ml-3')}>
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