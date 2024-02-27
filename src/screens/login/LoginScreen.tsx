import Input from '@shared-components/Input';
import {Background, StartApp} from 'assets';
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
import {navigate} from 'react-navigation-helpers';
import {SCREENS} from '@shared-constants';
import {login} from '@services/apis/auth.api';
import {useMutation} from '@tanstack/react-query';
import {AppContext} from 'contexts/app.context';

const LoginScreen = () => {
  const {setIsAuthenticated, setProfile} = useContext(AppContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const submitLogin = handleSubmit((data) => {

    const body = {
      email: data.email,
      password: data.password
    }
    // console.log(body);

    loginMutation.mutate(body, {
      onSuccess(response) {
        setProfile(response.data.data);
        console.log(response.data);

        // queryClient.invalidateQueries({
        //   queryKey: [REACT_QUERY_KEY.WITHDRAW_MONEY],
        // });
        setIsAuthenticated(true);
      },
      onError(error) {
        // console.log(error);

      },
    });
  });

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
          <TouchableWithoutFeedback
            onPress={() => {
              navigate(SCREENS.REGISTER_SCREEN);
            }}>
            <Text className="text-orange"> Đăng ký </Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
