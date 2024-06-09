import Input from '@shared-components/Input';
import {Background, ChevronLeft, StartApp} from 'assets';
import {Image} from 'native-base';
import React, {useContext} from 'react';
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
import {goBack, navigate} from 'react-navigation-helpers';
import {SCREENS} from '@shared-constants';
import {login} from '@services/apis/auth.api';
import {useMutation} from '@tanstack/react-query';
import {AppContext} from 'contexts/app.context';
import Spinner from 'react-native-loading-spinner-overlay';
import useToastNotifications from 'shared/hooks/useToastNotifications'

const ForgotPasswordScreen = () => {
  const {setIsAuthenticated, setProfile} = useContext(AppContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const showToast = useToastNotifications();

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const submitLogin = () => {
    showToast("Hãy kiểm tra email", "success", "top");
  }
//   handleSubmit(data => {
//     const body = {
//       email: data.email,
//       password: data.password,
//     };
//     // console.log(body);

//     loginMutation.mutate(body, {
//       onSuccess(response) {
//         setProfile(response.data.data);
//         setIsAuthenticated(true);
//       },
//       onError(error) {
//         showToast("Email hoặc mật khẩu không đúng", "err", "top");
//         // console.log(error);
//       },
//     });
//   });

  return (
    <View style={{height: '100%'}} className="h-full w-full">
      <Spinner visible={loginMutation.isLoading} textContent={''} />
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
        <Controller
          control={control}
          name="email"
          render={({field}) => (
            <Input
              classNameInput="w-full border border-slate-200 rounded-md h-12 px-2 text-black"
              errorMessage={errors.email?.message}
              classNameError="text-red-500"
              placeholderColor="#ACA3A3"
              placeholder="Email"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <View className="bg-orange h-12 rounded-2xl ">
          <TouchableOpacity onPress={submitLogin}>
            <Text className="text-center font-semibold text-white text-[16px] mt-3">
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
