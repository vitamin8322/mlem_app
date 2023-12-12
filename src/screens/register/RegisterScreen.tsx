import {yupResolver} from '@hookform/resolvers/yup';
import Input from '@shared-components/Input';
import {Background, ChevronLeft} from 'assets';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {goBack} from 'react-navigation-helpers';
import {RegisterSchema, registerSchema} from 'utils/schema';
import {handleInputChange} from 'utils/utils';

const RegisterSceen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<RegisterSchema>({
    resolver: yupResolver(registerSchema),
  });

  const submitLogin = handleSubmit(data => {});

  return (
    <View style={{height: '100%'}} className="h-full w-full">
      <ImageBackground source={Background} resizeMode="cover">
        <View className="flex flex-row justify-between items-center h-40 px-4">
          <TouchableOpacity onPress={goBack}>
            <ChevronLeft height={25} width={25} />
          </TouchableOpacity>
          <Text className="font-bold text-[18px] text-white">Đăng Ký</Text>
          <Text></Text>
        </View>
      </ImageBackground>
      <View className="mt-[-15px] bg-white rounded-t-3xl h-full px-4 pt-8">
        <Text className="text-orange font-semibold text-[22px] mb-5">
          Tạo Tài Khoản Mời
        </Text>
        <Controller
          control={control}
          name="name_restaurant"
          render={({field}) => (
            <Input
              classNameInput="w-full border border-slate-200 rounded-md h-12 px-2 text-white"
              errorMessage={errors.name_restaurant?.message}
              classNameError="text-red-500"
              placeholderColor="#ACA3A3"
              placeholder="Tên nhà hàng"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({field}) => (
            <Input
              classNameError="text-red-500"
              classNameInput="w-full border border-slate-200 rounded-md  h-12 px-2 text-black"
              errorMessage={errors.address?.message}
              placeholderColor="#ACA3A3"
              placeholder="Địa chỉ nhà hàng"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="phone_number"
          render={({field}) => (
            <Input
              classNameError="text-red-500"
              classNameInput="w-full border border-slate-200 rounded-md  h-12 px-2 text-black"
              errorMessage={errors.phone_number?.message}
              placeholderColor="#ACA3A3"
              placeholder="Số điện thoại"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({field}) => (
            <Input
              classNameError="text-red-500"
              classNameInput="w-full border border-slate-200 rounded-md  h-12 px-2 text-black"
              errorMessage={errors.email?.message}
              placeholderColor="#ACA3A3"
              placeholder="Email"
              onChangeText={field.onChange}
              value={field.value}
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
        <View className="bg-orange h-12 rounded-2xl">
          <TouchableOpacity onPress={submitLogin}>
            <Text className="text-center font-semibold text-white text-[16px] mt-3">
              Đăng Ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterSceen;
