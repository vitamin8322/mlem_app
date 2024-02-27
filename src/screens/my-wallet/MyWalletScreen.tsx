import CardWallet from '@shared-components/CardWallet';
import { WouldInternet } from 'assets';
import { useTheme } from 'contexts/app.context';
import React, { useState } from 'react';
import {ScrollView, Text} from 'react-native';
import LayoutBase from 'shared/layout';

type Props = {};

const MyWalletScreen = (props: Props) => {
  const { theme } = useTheme();
  const [checkIsBack, setCheckIsBack] = useState<boolean>(false);
  return (
    <LayoutBase 
    name="Ví của bạn"
    isBack
    setCheckIsBack={setCheckIsBack}
    checkIsBack={checkIsBack}>

    <ScrollView>
      <CardWallet name='Tổng cộng' value='8,000,000' icon={WouldInternet} />
      <Text style={{color: theme.textColorBland}} className='px-3 font-semibold mt-2'>Danh sách các ví</Text>
      <CardWallet name='Tổng cộng' value='8,000,000' icon={WouldInternet} />
    </ScrollView>
    </LayoutBase>
  );
};

export default MyWalletScreen;
