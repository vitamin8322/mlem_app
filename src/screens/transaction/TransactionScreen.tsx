import classNames from 'classnames';
import React, {useEffect, useRef, useState} from 'react';
import {
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
import {LIST_ITEM_EXPENSES, LIST_ITEM_REVENUE} from '@shared-constants';
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

const TransactionScreen = (props: Props) => {
  const inputRef = useRef(null);

  const [selectTransaction, setSelectTransaction] = useState<number>(0);
  const [selected, setSelected] = useState<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [valueMoney, setValueMoney] = useState<string>('0');
  const [cardActive, setCardActive] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const markedDates = {
    '2024-01-01': {marked: true, dotColor: 'red'},
    '2024-01-05': {marked: true, dotColor: 'green'},
    '2024-01-10': {marked: true, dotColor: 'blue'},
  };
  // useEffect(() => {
  //   if (inputRef && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  return (
    <>
      <View className="px-3">
        <View className="flex flex-row justify-center items-center w-full bg-gray-400 h-10 my-3 rounded-md">
          <TouchableOpacity
            onPress={() => {
              setSelectTransaction(0);
              setCardActive(0)
            }}
            className={classNames(
              'w-[49%] h-9 flex flex-row justify-center items-center rounded-md',
              {
                'bg-white ': selectTransaction === 0,
              },
            )}>
            <View>
              <Text className="text-center">Tiền chi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCardActive(0)
              setSelectTransaction(1);
            }}
            className={classNames(
              'w-[49%] h-9 flex flex-row justify-center items-center rounded-md',
              {
                'bg-white ': selectTransaction === 1,
              },
            )}>
            <View className="w-[48%]">
              <Text className="text-center">Tiền thu</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex gap-y-2">
          <View className="flex flex-row justify-center items-center h-12 ">
            <View className="w-3/12">
              <Text>Ngày</Text>
            </View>
            <View className="w-9/12">
              <TouchableOpacity
                onPress={toggleModal}
                className="w-full bg-slate-300 h-12 rounded-md">
                <Text className="text-center mt-3 font-semibold text-[18px]">
                  {moment(selected).format('DD/MM/YYYY (dd)')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row justify-center items-center ">
            <View className="w-3/12">
              <Text>Ghi chú</Text>
            </View>
            <View className="w-9/12">
              <Input
                classNameInput="w-full border border-slate-200 rounded-md h-20 px-2"
                multiline
              />
            </View>
          </View>
          <View className="flex flex-row justify-center items-center ">
            <View className="w-3/12">
              <Text>Tiền chi</Text>
            </View>
            <View className="w-9/12">
              <TextInput
                ref={inputRef}
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
            <Text className="">Danh mục:</Text>
            <ScrollView nestedScrollEnabled={true}>
              <View className="flex flex-row items-center gap-2 flex-wrap px-2 mt-1">
                {selectTransaction === 0
                  ? LIST_ITEM_EXPENSES.map((item, index) => {
                      return (
                        <CardCategory
                          key={index}
                          cardActive={cardActive}
                          setCardActive={setCardActive}
                          index={index}
                          item={item}
                        />
                      );
                    })
                  : LIST_ITEM_REVENUE.map((item, index) => {
                      return (
                        <CardCategory
                          key={index}
                          cardActive={cardActive}
                          setCardActive={setCardActive}
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
            })}>
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
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {selected: true, disableTouchEvent: true},
            }}
          />
          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
          <View className="bg-white w-full flex flex-row justify-end">
            <TouchableOpacity className="w-16 h-10" onPress={toggleModal}>
              <Text className="text-blue-400 font-semibold text-[18px] mr-3">
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-16 h-10" onPress={toggleModal}>
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
