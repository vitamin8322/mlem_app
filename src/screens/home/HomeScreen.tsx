import {getUserInfo} from '@services/apis/auth.api';
import {
  percentTransaction,
  transactionExpMonth,
  transactionExpWeek,
  transactionType,
} from '@services/apis/transaction.api';
import {getAllWalletUser} from '@services/apis/wallet.api';
import BarchartHome from '@shared-components/BarchartHome';
import CardTransaction from '@shared-components/CardTransaction';
import {
  LIST_WALLET,
  REACT_QUERY_KEY,
  SCREENS,
  formatNumberWithCommas,
} from '@shared-constants';
import {useQuery} from '@tanstack/react-query';
import {Eye, EyeClose} from 'assets';
import classNames from 'classnames';
import {AppContext, useTheme} from 'contexts/app.context';
import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {navigate} from 'react-navigation-helpers';

const HomeScreen = () => {
  const {t} = useTranslation('home');
  const {theme} = useTheme();
  const {setIsAuthenticated, setProfile} = useContext(AppContext);

  const [isEyeClose, setIsEyeClose] = useState(false);
  const [selectViewReport, setSelectViewReport] = useState(0);
  const [dataMostExp, setDataMostExp] = useState();
  const [dataBarChart, setDataBarChart] = useState();
  const [totalWallet, setTotalWallet] = useState(0);

  const {data: dateUserInfo} = useQuery({
    queryKey: [REACT_QUERY_KEY.USER_INFO],
    queryFn: getUserInfo,
    onSuccess: response => {
      setProfile(response.data?.user);
      setIsAuthenticated(true);
    },
  });

  const {isLoading: isTransactionDataLoading, data: transactionData} = useQuery(
    {
      queryKey: [REACT_QUERY_KEY.TRANSACTION],
      queryFn: () => transactionType(''),
    },
  );

  const {isLoading: isWalletUserDataLoading, data: walletUserData} = useQuery({
    queryKey: [REACT_QUERY_KEY.ALL_WALLET_USER],
    queryFn: () => getAllWalletUser(),
    onSuccess(response) {
      const totalMoney = response.data.data.reduce(
        (accumulator: any, currentValue: any) =>
          accumulator + currentValue.money,
        0,
      );
      console.log(totalMoney);
      setTotalWallet(totalMoney);
    },
  });

  const {
    isLoading: ispercentTransactionDataLoading,
    data: percentTransactionData,
  } = useQuery({
    queryKey: [REACT_QUERY_KEY.PERCENT_TRANSACTION, 'isoWeek'],
    queryFn: () => percentTransaction('isoWeek'),
    onSuccess(response) {
      setDataMostExp(response?.data.data);
    },
  });

  const {
    isLoading: ispercentTransactionMonthDataLoading,
    data: percentTransactionMonthData,
  } = useQuery({
    queryKey: [REACT_QUERY_KEY.PERCENT_TRANSACTION, 'month'],
    queryFn: () => percentTransaction('month'),
  });

  const {
    isLoading: istransactionExpWeekDataLoading,
    data: transactionExpWeekData,
  } = useQuery({
    queryKey: [REACT_QUERY_KEY.TRANSACTION_EXP_WEEK],
    queryFn: () => transactionExpWeek(),
    onSuccess(response) {
      setDataBarChart(response?.data.data);
    },
  });

  const {
    isLoading: istransactionExpMonthDataLoading,
    data: transactionExpMonthData,
  } = useQuery({
    queryKey: [REACT_QUERY_KEY.TRANSACTION_EXP_MONTH],
    queryFn: () => transactionExpMonth(),
  });

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={{backgroundColor: theme.backgroundApp}} className={`p-5`}>
        {/* <Text className='text-red-500'>
        {t("helloUser", {name:'Doanh'})}
      </Text> */}
        <View>
          <Text className={`text-[18px] text-${theme.textColor}`}>
            Tổng số dư
          </Text>
          <View className="flex flex-row items-center mb-5">
            <Text
              style={{color: theme.textColor}}
              className="text-[24px] font-semibold mr-2">
              {isEyeClose
                ? '********'
                : formatNumberWithCommas(String(totalWallet))}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsEyeClose(!isEyeClose);
              }}>
              {isEyeClose ? (
                <EyeClose height={20} width={20} fill={`${theme.textColor}`} />
              ) : (
                <Eye height={20} width={20} fill={`${theme.textColor}`} />
              )}
            </TouchableOpacity>
          </View>
          {/* My wallet  */}
          <View
            style={{backgroundColor: theme.backgroundColor}}
            className=" rounded-md px-3 py-3 ">
            <View className="flex flex-row justify-between items-center h-10 ">
              <Text
                className={`font-semibold text-[16px] text-${theme.textColor}`}>
                Ví của tôi
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigate(SCREENS.MY_WALLET_SCREEN);
                }}>
                <Text className="text-green-500 font-semibold text-[16px]">
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>
            <View className="border-b border-gray-300 mx-1 text-center"></View>
            {walletUserData && (
              <View>
                {walletUserData.data.data.map(wallet => {
                  if (wallet.isDefault === true) {
                    return (
                      <View className="flex flex-row justify-between items-center">
                        <View className="flex flex-row items-center my-2">
                          {LIST_WALLET.find(
                            wallet1 => wallet1.id === wallet.idWallet,
                          )?.icon({height: 30, width: 30})}
                          <Text
                            className={`ml-1 font-semibold text-${theme.textColor}`}>
                            {wallet.name}
                          </Text>
                        </View>
                        <Text
                          className={`ml-1 font-semibold text-[18px] text-${theme.textColor}`}>
                          {formatNumberWithCommas(String(wallet.money))}
                        </Text>
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            )}
          </View>

          {/* expense report */}
          <View className="flex flex-row justify-between items-center mt-4 mb-1">
            <Text style={{color: theme.textColor}} className="font-semibold ">
              Báo cáo chi tiêu
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigate(SCREENS.LOGIN_SCREEN);
              }}>
              <Text className="font-semibold text-green-500">Xem báo cáo</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{backgroundColor: theme.backgroundColor}}
            className="bg-white px-3 rounded-md">
            <View className="flex flex-row justify-center items-center w-full bg-gray-400 h-10 my-3 rounded-md">
              <TouchableOpacity
                onPress={() => {
                  setSelectViewReport(0);
                  setDataMostExp(percentTransactionData?.data.data);
                  setDataBarChart(transactionExpWeekData?.data.data);
                }}
                style={{
                  backgroundColor:
                    selectViewReport === 0
                      ? theme.backgroundColor
                      : 'transparent',
                }}
                className={classNames(
                  'w-[49%] h-9 flex flex-row justify-center items-center rounded-md',
                )}>
                <View>
                  <Text
                    style={{color: theme.textColor}}
                    className="text-center">
                    Tuần
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectViewReport(1);
                  setDataMostExp(percentTransactionMonthData?.data.data);
                  setDataBarChart(transactionExpMonthData?.data.data);
                }}
                style={{
                  backgroundColor:
                    selectViewReport === 1
                      ? theme.backgroundColor
                      : 'transparent',
                }}
                className={classNames(
                  'w-[49%] h-9 flex flex-row justify-center items-center rounded-md',
                )}>
                <View className="w-[48%]">
                  <Text
                    style={{color: theme.textColor}}
                    className="text-center">
                    Tháng
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text
              style={{color: theme.textColor}}
              className="text-[22px] font-semibold">
              {selectViewReport === 0
                ? `${formatNumberWithCommas(
                    String(percentTransactionData?.data?.totalSpending),
                  )}đ`
                : `${formatNumberWithCommas(
                    String(percentTransactionMonthData?.data?.totalSpending),
                  )}đ`}
            </Text>
            <View>
              <Text style={{color: theme.textColorBland}}>{`Tổng chi ${
                selectViewReport === 0 ? 'tuần' : 'tháng'
              } này`}</Text>
            </View>

            <View className="ml-3 my-2">
              {
                dataBarChart && <BarchartHome data={dataBarChart} />
                // <CxPieChart />
              }
            </View>
            <Text
              style={{color: theme.textColorBland}}
              className="text-[16px] font-semibold">
              Chi tiêu nhiều nhất
            </Text>
            {dataMostExp && (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={dataMostExp.slice(0, 3)}
                renderItem={({item}) => (
                  <CardTransaction isExpenses item={item} />
                )}
                keyExtractor={item => item.id}
              />
            )}
          </View>
          {/* err */}
          {/* Transaction history  */}
          <View className="flex flex-row justify-between items-center mt-4 mb-1">
            <Text style={{color: theme.textColor}} className="font-semibold ">
              Giao dịch gần đây
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigate(t(SCREENS.TRANSACTION_HISTORY));
              }}>
              <Text className="font-semibold text-green-500">Xem báo cáo</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{backgroundColor: theme.backgroundColor}}
            className="px-3 rounded-md">
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={transactionData?.data?.transactions.slice(0, 4)}
              renderItem={({item}) => (
                <CardTransaction isTransactionRecent item={item} isNavigate />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
