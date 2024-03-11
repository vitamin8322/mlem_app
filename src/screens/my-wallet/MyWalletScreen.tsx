import CardWallet from '@shared-components/CardWallet';
import {Add, WouldInternet} from 'assets';
import {useTheme} from 'contexts/app.context';
import React, {useRef, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LayoutBase from 'shared/layout';
import {Modalize} from 'react-native-modalize';
import { navigate } from 'react-navigation-helpers';
import { SCREENS } from '@shared-constants';

type Props = {};

const MyWalletScreen = ({ navigation, route }: any) => {
  const { params } = route;
  console.log(params);
  
  const {theme} = useTheme();
  const [checkIsBack, setCheckIsBack] = useState<boolean>(false);
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    console.log(modalizeRef.current?.open());
    
    // modalizeRef.current?.open();
  };
  return (
    <LayoutBase
      name="Ví của bạn"
      isBack
      setCheckIsBack={setCheckIsBack}
      checkIsBack={checkIsBack}>
      <ScrollView>
        <CardWallet name="Tổng cộng" value="8,000,000" icon={WouldInternet} />
        <Text
          style={{color: theme.textColorBland}}
          className="px-3 font-semibold mt-2">
          Danh sách các ví
        </Text>
        <CardWallet name="Tổng cộng" value="8,000,000" icon={WouldInternet} />
      </ScrollView>
      <TouchableOpacity onPress={()=> navigate(SCREENS.FORM_WALLET_SCREEN)}>
        <Add height={50} width={50} className=" bottom-5 left-[80%] z-30" />
      </TouchableOpacity>
      <Modalize ref={modalizeRef} handlePosition={'inside'}>
        <View className='p-3'>
          
        </View>
      </Modalize>
    </LayoutBase>
  );
};

export default MyWalletScreen;
