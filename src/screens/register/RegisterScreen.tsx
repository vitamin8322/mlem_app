import {yupResolver} from '@hookform/resolvers/yup';
import { register } from '@services/apis/auth.api';
import Input from '@shared-components/Input';
import { useMutation } from '@tanstack/react-query';
import {Background, ChevronLeft} from 'assets';
import React, { useContext } from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {goBack} from 'react-navigation-helpers';
import useToastNotifications from 'shared/hooks/useToastNotifications';
import { ResponseApiError } from 'types/utils.type';
import {RegisterSchema, registerSchema} from 'utils/schema';
import {handleInputChange, isAxiosError} from 'utils/utils';
import {navigate} from 'react-navigation-helpers';
import { SCREENS } from '@shared-constants';
import {AppContext} from 'contexts/app.context';

const RegisterSceen = () => {
  const showToast = useToastNotifications();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<RegisterSchema>({
    resolver: yupResolver(registerSchema),
  });

  const {setIsAuthenticated, setProfile} = useContext(AppContext);

  const registerMutation = useMutation({
    mutationFn: register,
  });

  const handleSubmitRegister = handleSubmit((data) => {
    console.log('data', data);
    
    registerMutation.mutate(data, {
      onSuccess(response) {
        navigate(SCREENS.HOME_SCREEN)
        console.log('response.data.data', response.data.data);
        
        setProfile(response.data.data);
        setIsAuthenticated(true);
        // changePasswordReset();
        console.log('ddđ');
        
      },
      onError(error) {
        if (isAxiosError<ResponseApiError<RegisterSchema>>(error)) {
          const formError = error.response?.data.message as string;
          showToast(formError, "danger", "bottom");
        }
      },
    });
  });

  return (
    <View style={{height: '100%'}} className="h-full w-full">
      {/* <Spinner visible={loginMutation.isLoading} textContent={''} /> */}
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
          Tạo Tài Khoản Mới
        </Text>
        <Controller
          control={control}
          name="name"
          render={({field}) => (
            <Input
              classNameInput="w-full border border-slate-200 rounded-md h-12 px-2 text-black"
              errorMessage={errors.name?.message}
              classNameError="text-red-500"
              placeholderColor="#ACA3A3"
              placeholder="Tên"
              value={field.value}
              onChangeText={field.onChange}
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
          <TouchableOpacity onPress={handleSubmitRegister}>
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
