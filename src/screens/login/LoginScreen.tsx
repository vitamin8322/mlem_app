import Input from '@shared-components/Input';
import {Background, StartApp} from 'assets';
import {Image} from 'native-base';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {LoginSchema, loginSchema} from 'utils/schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {handleInputChange} from 'utils/utils';
import { navigate } from 'react-navigation-helpers';
import { SCREENS } from '@shared-constants';

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const submitLogin = handleSubmit(data => {});

  return (
    <View style={{height: '100%'}} className="h-full w-full">
      <ImageBackground source={Background} resizeMode="cover">
        <View className="flex justify-center items-center h-40">
          <Text className="font-bold text-[18px] text-white">Đăng Nhập</Text>
        </View>
      </ImageBackground>
      <View className="mt-[-15px] bg-white rounded-t-3xl h-full px-4 pt-8">
        <Controller
          control={control}
          name="userName"
          render={({field}) => (
            <Input
              classNameInput="w-full border border-slate-200 rounded-md h-12 px-2 text-white"
              errorMessage={errors.userName?.message}
              classNameError="text-red-500"
              placeholderColor="#ACA3A3"
              placeholder="Tên đăng nhập"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field}) => (
            <Input
              classNameError="text-red-500"
              classNameInput="w-full border border-slate-200 rounded-md  h-12 px-2 text-black"
              errorMessage={errors.password?.message}
              placeholderColor="#ACA3A3"
              placeholder="Password"
              value={field.value}
              onChangeText={value => field.onChange(handleInputChange(value))}
              isPasswordField={true}
            />
          )}
        />
        <View className="flex flex-row justify-between items-center">
          <Text></Text>
          <Text className="text-orange">Quên mật khẩu?</Text>
        </View>
        <View className="bg-orange h-12 rounded-2xl mt-[90%]">
          <TouchableOpacity onPress={submitLogin}>
            <Text className="text-center font-semibold text-white text-[16px] mt-3">
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-center mt-2">
          Bạn có tài khoản chưa?
          <TouchableWithoutFeedback onPress={() => {navigate(SCREENS.HOME);}}>
            <Text className="text-orange"> Đăng ký </Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
