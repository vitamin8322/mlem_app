import {defaultWallet, deleteWallet} from '@services/apis/wallet.api';
import {
  LIST_WALLET,
  REACT_QUERY_KEY,
  SCREENS,
  formatNumberWithCommas,
} from '@shared-constants';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Option, WouldInternet} from 'assets';
import {useTheme} from 'contexts/app.context';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {navigate} from 'react-navigation-helpers';
import useToastNotifications from 'shared/hooks/useToastNotifications';
import {Wallet} from 'types/wallet.type';

type Props = {
  name?: string;
  money?: string | number;
  icon?: any;
  item?: Wallet;
};

const CardWallet = (props: Props) => {
  const {theme} = useTheme();
  const {name, money, icon, item} = props;
  const {t} = useTranslation('home');
  const queryClient = useQueryClient();
  const showToast = useToastNotifications();

  const handleNavigateEdit = () => {
    navigate(SCREENS.FORM_WALLET_SCREEN, {
      money: item?.money,
      idWallet: item?.idWallet,
      name: item?.name,
      id: item?._id,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteWallet,
  });
  const defaultWalletMutation = useMutation({
    mutationFn: defaultWallet,
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess(response) {
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.ALL_WALLET_USER],
        });
        showToast("Xoá thành công", "err", "top");
      },
    });
  };

  const handleDefaultWallet = (id: string) => {
    defaultWalletMutation.mutate(id, {
      onSuccess(response) {
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.ALL_WALLET_USER],
        });
        showToast("Thay đổi thành công", "err", "top");
      },
    });
  };
  
  let asd =
    LIST_WALLET.find(wallet => wallet.id === item?.idWallet)?.icon || icon;
  return (
    <View
      style={{backgroundColor: theme.backgroundColor}}
      className="flex flex-row justify-between items-center h-14 bg-white mt-1 px-3">
      <View className="flex flex-row items-center gap-x-2 ">
        {asd && React.createElement(asd, {height: 40, width: 40})}
        <View>
          <Text style={{color: theme.textColor}} className="text-[16px]">
            {item?.name || name}
          </Text>
          <Text
            style={{color: theme.textColorBland}}
            className="text-[14px] text-gray-500">
            {formatNumberWithCommas(String(money === 0 || money ? money : item?.money))}đ
          </Text>
        </View>
      </View>
      {item && (
        <Menu>
          <MenuTrigger>
            <Option height={20} width={20} fill={theme.textColor} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => handleNavigateEdit()}
              text={String(t('edit'))}
            />
            <MenuOption
              onSelect={() => handleDefaultWallet(item._id)}
              disabled={item.isDefault}
              text={'Ví mặc định'}
            />
            <MenuOption onSelect={() => handleDelete(item._id)}>
              <Text style={{color: 'red'}}>{t('delete')}</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      )}
    </View>
  );
};

export default CardWallet;
