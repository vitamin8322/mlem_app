import { Dinner } from 'assets';
import {useTheme} from 'contexts/app.context';
import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Modalize } from 'react-native-modalize';
import LayoutBase from 'shared/layout';

type Props = {};

const FormWalletScreen = (props: Props) => {
  const {theme} = useTheme();
  
  const modalizeRef = useRef<Modalize>(null);
  const [checkIsBack, setCheckIsBack] = useState<boolean>(false);
  const [valueMoney, setValueMoney] = useState<string>('0');

  const onOpenListIcon = () => {
    console.log(12321,modalizeRef.current?.open());
    
    // modalizeRef.current?.open();
  };

  return (
    <LayoutBase
      name={`${props ? 'Thêm ví' : 'Sửa ví'}`}
      isBack
      setCheckIsBack={setCheckIsBack}
      checkIsBack={checkIsBack}
      >
      <View className='flex justify-center items-center gap-y-2 px-3 mt-2'>
        <View className="flex flex-row justify-center items-center ">
          <View className="w-3/12">
            <Text style={{color: theme.textColor}}>Tên ví</Text>
          </View>
          <View className="w-9/12">
            <TextInput
              style={{color: theme.textColor, borderColor: theme.textColor}}
              className="w-full border border-slate-200 rounded-md h-12 px-2 text-[18px] font-semibold"
            />
          </View>
        </View>
        <View className="flex flex-row justify-center items-center ">
          <View className="w-3/12">
            <Text style={{color: theme.textColor}}>Icon</Text>
          </View>
          <View className="w-9/12">
            <TouchableOpacity onPress={onOpenListIcon}>
              <Dinner height={40} width={40} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row justify-center items-center ">
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
                setValueMoney((newValue));
              }}
            />
          </View>
        </View>
      </View>
      <Modalize ref={modalizeRef} handlePosition={'inside'}>
        <View className='p-3'>
          
        </View>
      </Modalize>
    </LayoutBase>
  );
};

export default FormWalletScreen;
