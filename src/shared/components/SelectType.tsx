import classNames from 'classnames';
import {useTheme} from 'contexts/app.context';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import LayoutBase from 'shared/layout';

type Props = {
  setSelectTransaction: React.Dispatch<React.SetStateAction<number>>;
  selectTransaction: number;
  handleSelectExp: () => void;
  handleSelectRev: () => void;
};

const SelectType = (props: Props) => {
  const {t} = useTranslation('home');
  const {theme} = useTheme();
  const {
    setSelectTransaction,
    selectTransaction,
    handleSelectExp,
    handleSelectRev,
  } = props;

  return (
    <View className="flex flex-row justify-center items-center w-full bg-gray-400 h-10 my-3 rounded-md">
      <TouchableOpacity
        onPress={() => {
          setSelectTransaction(0);
          handleSelectExp();
        }}
        style={{
          backgroundColor:
            selectTransaction === 0 ? theme.backgroundColor : 'transparent',
        }}
        className={classNames(
          'w-[49%] h-9 flex flex-row justify-center items-center rounded-md',
        )}>
        <View>
          <Text style={{color: theme.textColor}} className="text-center">
            Tiền chi
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectTransaction(1);
          handleSelectRev();
        }}
        style={{
          backgroundColor:
            selectTransaction === 1 ? theme.backgroundColor : 'transparent',
        }}
        className={classNames(
          'w-[49%] h-9 flex flex-row justify-center items-center rounded-md',
        )}>
        <View className="w-[48%]">
          <Text style={{color: theme.textColor}} className="text-center">
            Tiền thu
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectType;
