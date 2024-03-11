import classNames from 'classnames';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
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
import {Dinner} from 'assets';
import CardCategory from '@shared-components/CardCategory';
import {
  LIST_ITEM_EXPENSES,
  LIST_ITEM_REVENUE,
  REACT_QUERY_KEY,
} from '@shared-constants';
import {useTheme} from 'contexts/app.context';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createTransaction, deleteTransaction} from '@services/apis/transaction.api';
type Props = {};
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};

const TransactionScreen = ({ navigation, route }: any) => {
  const { params } = route;
  const {theme} = useTheme();
  const inputRef = useRef(null);

  const queryClient = useQueryClient();

  const [selectTransaction, setSelectTransaction] = useState<number>(0);
  const [selectedDateModal, setSelectedDateModal] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<any>(String(params?.props.item.money) !== 'undefined'? new Date(params?.props.item.date) :new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [valueMoney, setValueMoney] = useState<string>(String(params?.props.item.money) !== 'undefined'? String(params?.props.item.money) : '0');
  const [idCategory, setIdCategory] = useState('');
  const [note, setNote] = useState('');
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const transactionMutation = useMutation({
    mutationFn: createTransaction,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleTransaction = () => {
    if (valueMoney === '0') {
      return;
    }
    const body = {
      money: Number(valueMoney),
      note: note,
      type: selectTransaction === 0 ? 'exp' : 'rev',
      date: selectedDate,
      idCategory: idCategory,
      wallet: '65cdde71b2d1e4c3c205eeab',
    };

    transactionMutation.mutate(body, {
      onSuccess(response) {
        // console.log(response.data);
        setValueMoney('0');
        setNote('')
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
      onError(error) {
        console.log(error);
      },
    });
  };

  return (
    <>
      <View
        style={{backgroundColor: theme.backgroundApp, height: '100%'}}
        className="px-3">
        <View className="flex flex-row justify-center items-center w-full bg-gray-400 h-10 my-3 rounded-md">
          <TouchableOpacity
            onPress={() => {
              setSelectTransaction(0);
              setIdCategory('exp01');
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
              setIdCategory('rev01');
              setSelectTransaction(1);
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
              <Input
                style={{color: theme.textColor, borderColor: theme.textColor}}
                classNameInput="w-full border border-slate-200 rounded-md h-20 px-2 "
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
                ref={inputRef}
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
          <View className=" h-[350px]">
            <Text style={{color: theme.textColor}} className="">
              Danh mục:
            </Text>
            <ScrollView nestedScrollEnabled={true}>
              <View className="flex flex-row items-center gap-2 flex-wrap px-2 mt-1">
                {selectTransaction === 0
                  ? LIST_ITEM_EXPENSES.map((item, index) => {
                      return (
                        <CardCategory
                          key={index}
                          idCategory={idCategory}
                          setIdCategory={setIdCategory}
                          index={index}
                          item={item}
                        />
                      );
                    })
                  : LIST_ITEM_REVENUE.map((item, index) => {
                      return (
                        <CardCategory
                          key={index}
                          idCategory={idCategory}
                          setIdCategory={setIdCategory}
                          index={index}
                          item={item}
                        />
                      );
                    })}
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
          {params  && <TouchableOpacity
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
                {text: 'OK', onPress: () =>handleDelete(params?.props.item._id)},
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
          </TouchableOpacity>}
        </View>
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
