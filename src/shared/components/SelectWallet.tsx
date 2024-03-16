import {getAllWalletUser} from '@services/apis/wallet.api';
import {REACT_QUERY_KEY} from '@shared-constants';
import {useQuery} from '@tanstack/react-query';
import React, {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';

type Props = {
  isAgree?: boolean;
  idWallet?: any;
  setIdWallet?: any;
};

const SelectWallet = (props: Props) => {
  const {isAgree, idWallet, setIdWallet} = props;
  const modalizeRef = useRef<Modalize>(null);

  const {isLoading: isWalletUserDataLoading, data: walletUserMonthData} =
    useQuery({
      queryKey: [REACT_QUERY_KEY.ALL_WALLET_USER],
      queryFn: () => getAllWalletUser(),
      onSuccess(response) {},
    });
  console.log(isAgree, isWalletUserDataLoading);
  const onOpenModalize = () => {
    modalizeRef.current?.open();
  };

  return (
    <TouchableOpacity onPress={onOpenModalize}>
      <Text>SelectWallet</Text>
    </TouchableOpacity>
  );
};

export default SelectWallet;
