import classNames from 'classnames';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Input from '@shared-components/Input';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/vi';
import Modal from 'react-native-modal/dist/modal';
import {Card1, Check, Dinner} from 'assets';
import CardCategory from '@shared-components/CardCategory';
import {
  LIST_CATEGORY,
  LIST_ITEM_EXPENSES,
  LIST_ITEM_EXPENSES_UPDATE,
  LIST_ITEM_REVENUE,
  LIST_ITEM_REVENUE_UPDATE,
  LIST_WALLET,
  REACT_QUERY_KEY,
  SCREENS,
} from '@shared-constants';
import {AppContext, useTheme} from 'contexts/app.context';
import {
  MutateOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
} from '@services/apis/transaction.api';
import {getAllWalletUser} from '@services/apis/wallet.api';
import SelectWallet from '@shared-components/SelectWallet';
import {Modalize} from 'react-native-modalize';
import {Wallet} from 'types/wallet.type';
import {TransactionResponseApiSuccess} from 'types/transaction.type';
import {navigate} from 'react-navigation-helpers';
import {useTranslation} from 'react-i18next';
import SelectType from '@shared-components/SelectType';
import {allCategoryUser} from '@services/apis/category.api';
type Props = {};

const TransactionScreen = ({navigation, route}: any) => {
  const {params} = route;
  const {category} = useContext(AppContext);
  const {theme} = useTheme();
  const modalizeRef = useRef<Modalize>(null);
  const inputRef = useRef(null);
  const {t} = useTranslation('home');

  const queryClient = useQueryClient();

  const [selectTransaction, setSelectTransaction] = useState<number>(
    params?.props.item.type === 'rev' ? 1 : 0,
  );
  const [selectedDateModal, setSelectedDateModal] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<any>(
    String(params?.props.item.money) !== 'undefined'
      ? new Date(params?.props.item.date)
      : new Date(),
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [valueMoney, setValueMoney] = useState<string>(
    String(params?.props.item.money) !== 'undefined'
      ? String(params?.props.item.money)
      : '0',
  );
  const [idCategory, setIdCategory] = useState(
    String(params?.props.item.idCategory) !== 'undefined'
      ? String(params?.props.item.idCategory._id)
      : 'exp01',
  );

  const [note, setNote] = useState(
    String(params?.props.item.note) !== 'undefined'
      ? String(params?.props.item.note)
      : '',
  );

  const [icon, setIcon] = useState<any>();
  const [dataExp, setDataExp] = useState<any>();
  const [dataRev, setDataRev] = useState<any>();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const {isLoading: isWalletUserDataLoading, data: walletUserData} = useQuery({
    queryKey: [REACT_QUERY_KEY.ALL_WALLET_USER],
    queryFn: () => getAllWalletUser(),
    onSuccess(response) {},
  });

  const edit = [
    {
      name: 'Sửa',
      id: 'edit',
      navigate: 'LIST_CATEGORY_SCREEN',
    },
  ];

  const {isLoading: isCategoryDataLoading, data: categoryData} = useQuery({
    queryKey: [REACT_QUERY_KEY.ALL_CATEGORY],
    queryFn: () => allCategoryUser(),
    onSuccess(response) {
      setDataExp([]);
      setDataRev([]);
      const expItems = response.data.data.filter(item => item.type === 'exp');
      const revItems = response.data.data.filter(item => item.type === 'rev');

      setDataExp([...LIST_ITEM_EXPENSES_UPDATE, ...expItems, ...edit]);
      setDataRev([...LIST_ITEM_REVENUE_UPDATE, ...revItems, ...edit]);
    },
  });

  const [idWallet, setIdWallet] = useState<Wallet>(() => {
    return walletUserData?.data.data.find((wallet: Wallet) => {
      if (params) {
        return wallet._id === params.props.item.wallet;
      } else {
        return wallet.isDefault === true;
      }
    });
  });

  const transactionMutation = useMutation({
    mutationFn: createTransaction,
  });
  const editTransactionMutation = useMutation({
    mutationFn: editTransaction,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess(response) {
        setValueMoney('0');
        setNote('');
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.TRANSACTION],
        });
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.PERCENT_TRANSACTION],
        });
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.DAILY_TRANSACTION],
        });
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.PERCENT_TRANSACTION, 'isoWeek'],
        });
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.PERCENT_TRANSACTION, 'month'],
        });
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.TRANSACTION_EXP_WEEK],
        });
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.TRANSACTION_EXP_MONTH],
        });
      },
    });
  };

  const handleTransaction = () => {
    if (valueMoney === '0' && idWallet === undefined) {
      return;
    }

    const body = {
      money:  Number(valueMoney.replace(/,/g, '')),
      note: note,
      type: selectTransaction === 0 ? 'exp' : 'rev',
      date: selectedDate,
      idCategory: idCategory,
      wallet: idWallet && idWallet._id,
      icon: icon,
      ...(params && {id: params.props.item._id}),
    };
    console.log('body', body);

    const invalidateQueries = () => {
      [
        REACT_QUERY_KEY.TRANSACTION,
        REACT_QUERY_KEY.PERCENT_TRANSACTION,
        REACT_QUERY_KEY.DAILY_TRANSACTION,
        [REACT_QUERY_KEY.PERCENT_TRANSACTION, 'isoWeek'],
        [REACT_QUERY_KEY.PERCENT_TRANSACTION, 'month'],
        REACT_QUERY_KEY.TRANSACTION_EXP_WEEK,
        REACT_QUERY_KEY.TRANSACTION_EXP_MONTH,
        REACT_QUERY_KEY.ALL_WALLET_USER,
        REACT_QUERY_KEY.TOTAL_REPORT,
        REACT_QUERY_KEY.TOTAL_CATEGORY,
      ].forEach(queryKey => {
        queryClient.invalidateQueries({queryKey});
      });
    };
    setNote('');

    const mutationOptions: MutateOptions<
      TransactionResponseApiSuccess,
      any,
      {
        id?: string;
        money: number;
        note: string;
        type: string;
        date: string;
        idCategory: string;
        wallet: string;
      },
      unknown
    > = {
      onSuccess: (response: any) => {
        console.log(params ? 'edit' : 'add');
        setValueMoney('0');
        setNote('');
        invalidateQueries();
      },
      onError: (error: any) => {
        console.log(error);
      },
    };

    const mutationFunction = params
      ? editTransactionMutation
      : transactionMutation;
    // console.log('body', body);
    mutationFunction.mutate(body, mutationOptions);
  };

  const onOpenModalize = () => {
    modalizeRef.current?.open();
  };

  const formatMoney = (text: string) => {
    if (text.length === 0) return '0';
    const num = parseFloat(text.replace(/,/g, ''));
    return num.toLocaleString('en-US');
  };

  const handleSelectExp = () => {
    setIdCategory('6616005d96c029429bf6cf8e');
  };
  const handleSelectRev = () => {
    setIdCategory('66164711514ba9288c92c7c0');
  };
  return (
    <>
      <View
        style={{backgroundColor: theme.backgroundApp, height: '100%'}}
        className="px-3">
        <SelectType
          setSelectTransaction={setSelectTransaction}
          selectTransaction={selectTransaction}
          // setIdCategory={setIdCategory}
          handleSelectExp={handleSelectExp}
          handleSelectRev={handleSelectRev}
        />
        <View className="flex gap-y-2">
          <View className="flex flex-row justify-center items-center h-12 ">
            <View className="w-3/12">
              <Text style={{color: theme.textColor}}>Ngày</Text>
            </View>
            <View className="w-9/12">
              <TouchableOpacity
                onPress={toggleModal}
                className="w-full bg-slate-300 h-12 rounded-md">
                <Text className="text-center mt-3 font-semibold text-[18px]">
                  {moment(selectedDate).format('DD/MM/YYYY (dd)')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row justify-center items-center ">
            <View className="w-3/12">
              <Text style={{color: theme.textColor}}>Ghi chú</Text>
            </View>
            <View className="w-9/12">
              <TextInput
                style={{color: theme.textColor, borderColor: theme.textColor}}
                className="w-full border border-slate-200 rounded-md h-20 px-2 "
                value={note}
                multiline
                onChangeText={text => {
                  setNote(text);
                }}
              />
            </View>
          </View>
          <View className="flex flex-row justify-center items-center ">
            <View className="w-3/12">
              <Text style={{color: theme.textColor}}>Tiền chi</Text>
            </View>
            <View className="w-9/12">
              <TextInput
                // ref={inputRef}
                style={{color: theme.textColor, borderColor: theme.textColor}}
                className="w-full border border-slate-200 rounded-md h-12 px-2 text-[18px] font-semibold"
                keyboardType="numeric"
                value={valueMoney}
                onChangeText={text => {
                  if (text.length === 0) {
                    setValueMoney('0');
                    return;
                  }
                  const newValue = text.replace(/^0+(?=\d)/, '');
                  const formattedValue = formatMoney(newValue);
                  setValueMoney(formattedValue);
                }}
              />
            </View>
          </View>
          <View className="flex flex-row justify-center items-center ">
            <View className="w-3/12">
              <Text style={{color: theme.textColor}}>Ví</Text>
            </View>
            <View className="w-9/12 h-12">
              <TouchableOpacity onPress={onOpenModalize}>
                <View className=" flex flex-row justify-start items-center mt-1">
                  {idWallet &&
                    LIST_WALLET.find(
                      wallet => wallet.id === idWallet?.idWallet,
                    )?.icon({height: 30, width: 30})}
                  {idWallet && (
                    <Text className="ml-3 font-semibold text-[16px]">
                      {idWallet?.name}
                    </Text>
                  )}
                  {!idWallet && (
                    <Text className="font-semibold text-[16px] mt-2">
                      Ví đã bị xóa
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View className=" h-[300px]">
            <Text style={{color: theme.textColor}} className="">
              Danh mục:
            </Text>
            <ScrollView nestedScrollEnabled={true}>
              <View className="">
                {selectTransaction === 0 ? (
                  <FlatList
                    data={[...category.expCategory, ...edit]}
                    numColumns={4}
                    keyExtractor={item => {
                      return item.id;
                    }}
                    renderItem={({item, index}) => (
                      <CardCategory
                        key={item._id}
                        idCategory={idCategory}
                        setIdCategory={setIdCategory}
                        setIcon={setIcon}
                        index={index}
                        item={item}
                        selectTransaction={selectTransaction}
                      />
                    )}
                  />
                ) : (
                  <FlatList
                    data={[...category.revCategory, ...edit]}
                    numColumns={4}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => (
                      <CardCategory
                        key={index}
                        idCategory={idCategory}
                        setIdCategory={setIdCategory}
                        setIcon={setIcon}
                        index={index}
                        item={item}
                        selectTransaction={selectTransaction}
                      />
                    )}
                  />
                )}
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            disabled={valueMoney === '0'}
            className={classNames('bg-slate-300 mx-4 h-10 rounded-md', {
              'bg-green-600': valueMoney !== '0',
            })}
            onPress={handleTransaction}>
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
          {params && (
            <TouchableOpacity
              disabled={valueMoney === '0'}
              className={classNames('bg-slate-300 mx-4 h-10 rounded-md', {
                'bg-red-600': valueMoney !== '0',
              })}
              onPress={() => {
                Alert.alert('Xóa giao dịch này', 'Giao dịch này sẽ biến mất', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => handleDelete(params?.props.item._id),
                  },
                ]);
              }}>
              <Text
                className={classNames(
                  'text-center h-10 mt-2 font-semibold text-[18px]',
                  {
                    'text-white': valueMoney !== '0',
                  },
                )}>
                Xóa
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Modalize
          ref={modalizeRef}
          handlePosition={'inside'}
          modalTopOffset={400}>
          <ScrollView nestedScrollEnabled={true}>
            {walletUserData?.data.data.map((item: Wallet) => {
              const icon = LIST_WALLET.find(
                wallet => wallet.id === item?.idWallet,
              )?.icon;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setIdWallet(item);
                  }}>
                  <View className="flex flex-row justify-between items-item px-3 mt-3 border-b">
                    <View className="flex flex-row justify-start items-item gap-x-3">
                      {icon &&
                        React.createElement(icon, {height: 40, width: 40})}
                      <Text className="mt-2">{item?.name}</Text>
                    </View>
                    <View>
                      {idWallet?._id === item?._id && (
                        <Check height={35} width={35} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View className="p-3"></View>
        </Modalize>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View className="flex">
          <Calendar
            onDayPress={day => {
              setSelectedDateModal(day.dateString);
            }}
            markedDates={{
              [selectedDateModal]: {selected: true, disableTouchEvent: true},
            }}
          />
          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
          <View className="bg-white w-full flex flex-row justify-end">
            <TouchableOpacity className="w-16 h-10" onPress={toggleModal}>
              <Text className="text-blue-400 font-semibold text-[18px] mr-3">
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-16 h-10"
              onPress={() => {
                toggleModal();
                // console.log(selectedDateModal);

                setSelectedDate(selectedDateModal);
              }}>
              <Text className="text-blue-400 font-semibold text-[18px]">
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TransactionScreen;
