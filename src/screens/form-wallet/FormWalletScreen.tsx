import {createWallet, editWallet} from '@services/apis/wallet.api';
import CardCategory from '@shared-components/CardCategory';
import {LIST_WALLET, REACT_QUERY_KEY, SCREENS} from '@shared-constants';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Dinner} from 'assets';
import classNames from 'classnames';
import {useTheme} from 'contexts/app.context';
import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import { navigate } from 'react-navigation-helpers';
import LayoutBase from 'shared/layout';

type Props = {};

const FormWalletScreen = ({navigation, route}: any) => {
  const {params} = route;
  const {theme} = useTheme();
  const queryClient = useQueryClient();

  const modalizeRef = useRef<Modalize>(null);
  const [checkIsBack, setCheckIsBack] = useState<boolean>(false);
  const [nameWallet, setNameWallet] = useState<string>(params?.name || '');
  const [valueMoney, setValueMoney] = useState<string>(
    params?.money === undefined ? '0' : String(params.money),
  );
  const [idWallet, setIdWallet] = useState(params?.idWallet || 'wallet-01');

  const onOpenListIcon = () => {
    console.log(12321, modalizeRef.current?.open());

    // modalizeRef.current?.open();
  };

  const walletMutation = useMutation({
    mutationFn: createWallet,
  });

  const editWalletMutation = useMutation({
    mutationFn: editWallet,
  });

  const handleWallet = () => {
    const body = {
      money: Number(valueMoney),
      name: nameWallet,
      idWallet: idWallet,
      ...(params && { id: params.id })
    };
    
    if (params) {
      console.log(params.id);
      editWalletMutation.mutate(body, {
        onSuccess(response) {
          console.log('edit');
          queryClient.invalidateQueries({
            queryKey: [REACT_QUERY_KEY.ALL_WALLET_USER],
          });
          navigate(SCREENS.MY_WALLET_SCREEN)
        },
      });
    } else {
    console.log(body);
    walletMutation.mutate(body, {
        onSuccess(response) {
          console.log('add');
          queryClient.invalidateQueries({
            queryKey: [REACT_QUERY_KEY.ALL_WALLET_USER],
          });
          navigate(SCREENS.MY_WALLET_SCREEN)
        },
      });
    }
  };

  return (
    <LayoutBase
      name={`${!params ? 'Thêm ví' : 'Sửa ví'}`}
      isBack
      setCheckIsBack={setCheckIsBack}
      checkIsBack={checkIsBack}>
      <View className="flex justify-center items-center gap-y-2 px-3 mt-2">
        <View className="flex flex-row justify-center items-center ">
          <View className="w-3/12">
            <Text style={{color: theme.textColor}}>Tên ví</Text>
          </View>
          <View className="w-9/12">
            <TextInput
              style={{color: theme.textColor, borderColor: theme.textColor}}
              className="w-full border border-slate-200 rounded-md h-12 px-2 text-[18px] font-semibold"
              value={nameWallet}
              onChangeText={text => {
                setNameWallet(text);
              }}
            />
          </View>
        </View>
        <View className="flex flex-row justify-center items-center">
          <View className="w-3/12">
            <Text style={{color: theme.textColor}}>Tiền</Text>
          </View>
          <View className="w-9/12">
            <TextInput
              style={{color: theme.textColor, borderColor: theme.textColor}}
              className="w-full border border-slate-200 rounded-md h-12 px-2 text-[18px] font-semibold"
              keyboardType="numeric"
              value={valueMoney}
              onChangeText={text => {
                if (text.length === 0) {
                  setValueMoney('0');
                  return;
                } else if (valueMoney === '0' && text === '00') {
                  setValueMoney('0');
                  return;
                }
                const newValue = text.replace(/^0+(?=\d)/, '');
                setValueMoney(newValue);
              }}
            />
          </View>
        </View>
        <View className="flex justify-start items-start w-full">
          <View>
            <Text style={{color: theme.textColor}}>Biểu tượng</Text>
          </View>
          <View className="flex flex-row items-center gap-2 flex-wrap px-2 mt-1">
            {LIST_WALLET.map((item, index) => {
              return (
                <CardCategory
                  key={index}
                  idCategory={idWallet}
                  setIdCategory={setIdWallet}
                  index={index}
                  item={item}
                />
              );
            })}
          </View>
        </View>
      </View>
      <TouchableOpacity
        disabled={valueMoney === '0' && nameWallet === ''}
        className={classNames('bg-slate-300 mx-4 h-10 rounded-md mt-5', {
          'bg-green-600': valueMoney !== '0' && nameWallet !== '',
        })}
        onPress={handleWallet}>
        <Text
          className={classNames(
            'text-center h-10 mt-2 font-semibold text-[18px]',
            {
              'text-white': valueMoney !== '0',
            },
          )}>
          Lưu
        </Text>
      </TouchableOpacity>
    </LayoutBase>
  );
};

export default FormWalletScreen;
