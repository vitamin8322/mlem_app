import {AccountActive, Eye, EyeClose} from 'assets';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import classNames from 'classnames';
import { navigate } from "react-navigation-helpers";
import { SCREENS } from '@shared-constants';

const HomeScreen = () => {
  // const {t, i18n} = useTranslation('home');
  const [isEyeClose, setIsEyeClose] = useState(false);
  const [selectViewReport, setSelectViewReport] = useState(0);

  const data = {
    labels: ['Tháng trước', 'Tháng này'],
    datasets: [
      {
        data: [40, 45],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF', // Màu trắng
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF', // Màu trắng
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `blue`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 2,
    useShadowColorFromDataset: false, // optional
    yAxisLabel: '',
  };

  return (
    <ScrollView>
    <View className="p-5 bg-gray-200">
      {/* <Text className='text-red-500'>
        {t("helloUser", {name:'Doanh'})}
      </Text> */}
      <View>
        <Text className="text-[18px]">Tổng số dư</Text>
        <View className="flex flex-row items-center mb-10">
          <Text className="text-[24px] font-semibold mr-2">
            {isEyeClose ? '********' : '10,000,000'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsEyeClose(!isEyeClose);
            }}>
            {isEyeClose ? (
              <EyeClose height={20} width={20} />
            ) : (
              <Eye height={20} width={20} />
            )}
          </TouchableOpacity>
        </View>
        {/* My wallet  */}
        <View className="bg-white rounded-md px-3 py-3">
          <View className="flex flex-row justify-between items-center h-10 ">
            <Text className="font-semibold text-[16px]">Ví của tôi</Text>
            <TouchableOpacity>
              <Text className="text-green-500 font-semibold text-[16px]">
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View className="border-b border-gray-300 mx-1 text-center"></View>
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center my-2">
              <EyeClose height={30} width={30} />
              <Text className="ml-1 font-semibold">Tiền mặt</Text>
            </View>
            <Text className="ml-1 font-semibold text-[18px]">10,000,000</Text>
          </View>
          <View></View>
        </View>

        {/* expense report */}
        <View className="flex flex-row justify-between items-center mt-4">
          <Text className="font-semibold ">Báo cáo chi tiêu</Text>
          <TouchableOpacity>
            <Text className="font-semibold text-green-500">Xem báo cáo</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white px-3 rounded-md">
          <View className="flex flex-row justify-center items-center w-full bg-gray-400 h-10 my-3 rounded-md">
            <TouchableOpacity
              onPress={() => {
                setSelectViewReport(0);
                navigate(SCREENS.ADD_TRANSACTION)
              }}
              className={classNames(
                'w-[49%] h-9 flex flex-row justify-center items-center rounded-md',
                {
                  'bg-white ': selectViewReport === 0,
                },
              )}>
              <View>
                <Text className="text-center">Tuần</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectViewReport(1);
              }}
              className={classNames(
                'w-[49%] h-9 flex flex-row justify-center items-center rounded-md',
                {
                  'bg-white ': selectViewReport === 1,
                },
              )}>
              <View className="w-[48%]">
                <Text className="text-center">Tháng</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text className='text-[22px] font-semibold'>9,000,000 đ</Text>
          <View>
            <Text className='text-gray-500'>{`Tổng chi ${selectViewReport === 0 ?'tuần': 'tháng'} này`}</Text>
          </View>

          <BarChart
            // style={graphStyle}
            data={data}
            width={300}
            fromZero={true}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            // yAxisLabel="$"
            chartConfig={chartConfig}
            withHorizontalLabels={false}
            withInnerLines={false}
            showBarTops={true}
            showValuesOnTopOfBars={true}
            // getTooltipTextX={}
            // verticalLabelRotation={30}
          />
        </View>
      </View>
    </View></ScrollView>
  );
};

export default HomeScreen;
