import CardWallet from '@shared-components/CardWallet';
import {Add, WouldInternet} from 'assets';
import {useTheme} from 'contexts/app.context';
import React, {useRef, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LayoutBase from 'shared/layout';
import {Modalize} from 'react-native-modalize';
import { navigate } from 'react-navigation-helpers';
import { REACT_QUERY_KEY, SCREENS } from '@shared-constants';
import { useQuery } from '@tanstack/react-query';
import { getAllWalletUser } from '@services/apis/wallet.api';

type Props = {};

const MyWalletScreen = ({ navigation, route }: any) => {
  const { params } = route;
  
  const {theme} = useTheme();
  const [checkIsBack, setCheckIsBack] = useState<boolean>(false);
  const [totalWallet, setTotalWallet] = useState(0)
  const modalizeRef = useRef<Modalize>(null);

  const {
    isLoading: isWalletUserDataLoading,
    data: walletUserMonthData,
  } = useQuery({
    queryKey: [REACT_QUERY_KEY.ALL_WALLET_USER],
    queryFn: () => getAllWalletUser(),
    onSuccess(response) {
      const totalMoney = response.data.data.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.money, 0);
      console.log(totalMoney);
      setTotalWallet(totalMoney)
    },
  });


  return (
    <LayoutBase
      name="Ví của bạn"
      isBack
      setCheckIsBack={setCheckIsBack}
      checkIsBack={checkIsBack}>
      <ScrollView>
        <CardWallet name="Tổng cộng" money={totalWallet} icon={WouldInternet} />
        <Text
          style={{color: theme.textColorBland}}
          className="px-3 font-semibold mt-2">
          Danh sách các ví
        </Text>
        {/* <CardWallet name="Tổng cộng" money="8,000,000" icon={WouldInternet} /> */}
            {walletUserMonthData?.data.data && (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={walletUserMonthData?.data.data}
                renderItem={({item}) => (
                  <CardWallet icon={WouldInternet} item={item} />
                )}
                keyExtractor={item => item.id}
              />
            )}
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
