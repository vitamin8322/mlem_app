import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AppContext, useTheme } from 'contexts/app.context'
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import LayoutBase from 'shared/layout'
import { ChangePasswordSchema, EditProfileSchema, changePasswordSchema, editProfileSchema } from 'utils/schema'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import { ResponseApiError } from 'types/utils.type'
import { isAxiosError } from 'axios'
import Input from '@shared-components/Input'
import useToastNotifications from 'shared/hooks/useToastNotifications'
import { REACT_QUERY_KEY } from '@shared-constants'
import { changePassword, updateProfile } from '@services/apis/auth.api'

type Props = {}

const AccountSettingScreen = (props: Props) => {
  const {theme} = useTheme();
  const {t, i18n} = useTranslation('home');
  const { profile, setProfile } = useContext(AppContext);
  // const showToast = useToastNotifications();
  const showToast = useToastNotifications();
  const queryClient = useQueryClient();

  const {
    control: editProfileControl,
    handleSubmit: editProfileHandleSubmit,
    setValue: editProfileSetValue,
    formState: { errors: editProfileErrors },
  } = useForm<EditProfileSchema>({
    resolver: yupResolver(editProfileSchema),
  });

  useEffect(() => {
    editProfileSetValue("email", profile.email);
    editProfileSetValue("fname", profile.fname);
    editProfileSetValue("lname", profile.lname);
    editProfileSetValue("phone_number", profile.phone_number);
    return () => {};
  }, [profile]);

  const {
    control: changePasswordControl,
    handleSubmit: changePasswordHandleSubmit,
    reset: changePasswordReset,
    formState: { errors: changePasswordErrors },
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema),
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
  });

  const handleSubmitUpdateProfile = editProfileHandleSubmit((data) => {
    updateProfileMutation.mutate(data, {
      onSuccess(response) {
        showToast("Profile updated successfully", "success", "top");
        queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEY.USER_INFO],
        });
      },
      onError(error) {
        if (isAxiosError<ResponseApiError<EditProfileSchema>>(error)) {
          const formError = error.response?.data.message as string;
          showToast(formError, "danger", "bottom");
        }
      },
    });
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
  });

  const handleSubmitChangePassword = changePasswordHandleSubmit((data) => {
    changePasswordMutation.mutate(data, {
      onSuccess(response) {
        showToast("Password Changed successfully", "success", "top");
        changePasswordReset();
      },
      onError(error) {
        if (isAxiosError<ResponseApiError<ChangePasswordSchema>>(error)) {
          const formError = error.response?.data.message as string;
          showToast(formError, "danger", "bottom");
        }
      },
    });
  });
  return (
    <LayoutBase name={t('accountSetting')}>
      <Spinner
        visible={
          changePasswordMutation.isLoading || updateProfileMutation.isLoading
        }
        textContent={""}
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <KeyboardAwareScrollView
          automaticallyAdjustContentInsets={false}
          // enableAutomaticScroll={isIOS}
          enableOnAndroid={true}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <View>
          {/* Edit profile */}
          <Text style={{color: theme.textColor}} className="mt-3 text-center font-semibold text-[16px]">
            Edit Profile
          </Text>
          <View className="px-4 pt-2">
            <Controller
              control={editProfileControl}
              name="email"
              render={({ field }) => (
                <Input
                  style={{color: theme.textColor, borderColor: theme.textColor}}
                  classNameInput="w-full border justify-start rounded-md px-3 h-12"
                  errorMessage={editProfileErrors.email?.message}
                  classNameError="text-red-500"
                  placeholderColor="#ACA3A3"
                  placeholder="Email"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />

            <Controller
              control={editProfileControl}
              name="fname"
              render={({ field }) => (
                <Input
                  style={{color: theme.textColor, borderColor: theme.textColor}}
                  classNameInput="w-full border justify-start rounded-md px-3 h-12"
                  errorMessage={editProfileErrors.fname?.message}
                  classNameError="text-red-500"
                  placeholderColor="#ACA3A3"
                  placeholder="First Name"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />

            <Controller
              control={editProfileControl}
              name="lname"
              render={({ field }) => (
                <Input
                  style={{color: theme.textColor, borderColor: theme.textColor}}
                  classNameInput="w-full border justify-start rounded-md px-3 h-12"
                  errorMessage={editProfileErrors.lname?.message}
                  classNameError="text-red-500"
                  placeholderColor="#ACA3A3"
                  placeholder="Last Name"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />

            <Controller
              control={editProfileControl}
              name="phone_number"
              render={({ field }) => (
                <Input
                  style={{color: theme.textColor, borderColor: theme.textColor}}
                  classNameInput="w-full border justify-start rounded-md px-3 h-12"
                  errorMessage={editProfileErrors.phone_number?.message}
                  classNameError="text-red-500"
                  placeholderColor="#ACA3A3"
                  placeholder="Phone Number"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />

            <View className="flex flex-row justify-center items-center mt-1 mb-5">
              <View className="flex items-center justify-center h-10 w-40 bg-purple">
                <TouchableOpacity onPress={handleSubmitUpdateProfile}>
                  <Text className="text-white text-[16px] font-semibold">
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Change password */}
          <Text  style={{color: theme.textColor}} className="text-center font-semibold text-[16px] pt-2">
            Change Password
          </Text>
          <View className="px-4 pt-2">
            <Controller
              control={changePasswordControl}
              name="password"
              render={({ field }) => (
                <Input
                  style={{color: theme.textColor, borderColor: theme.textColor}}
                  classNameInput="w-full border justify-start rounded-md px-3 h-12"
                  errorMessage={changePasswordErrors.password?.message}
                  classNameError="text-red-500"
                  placeholderColor="#ACA3A3"
                  placeholder="Current password"
                  value={field.value}
                  onChangeText={field.onChange}
                  isPasswordField={true}
                />
              )}
            />

            <Controller
              control={changePasswordControl}
              name="new_password"
              render={({ field }) => (
                <Input
                  style={{color: theme.textColor, borderColor: theme.textColor}}
                  classNameInput="w-full border justify-start rounded-md px-3 h-12"
                  errorMessage={changePasswordErrors.new_password?.message}
                  classNameError="text-red-500"
                  placeholderColor="#ACA3A3"
                  placeholder="New Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  isPasswordField={true}
                />
              )}
            />

            <Controller
              control={changePasswordControl}
              name="new_confirm_password"
              render={({ field }) => (
                <Input
                  style={{color: theme.textColor, borderColor: theme.textColor}}
                  classNameInput="w-full border justify-start rounded-md px-3 h-12"
                  errorMessage={
                    changePasswordErrors.new_confirm_password?.message
                  }
                  classNameError="text-red-500"
                  placeholderColor="#ACA3A3"
                  placeholder="Confirm Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  isPasswordField={true}
                />
              )}
            />

            <View className="flex flex-row justify-center items-center mt-1 mb-5">
              <View className="flex items-center justify-center h-10 w-40 bg-purple">
                <TouchableOpacity onPress={handleSubmitChangePassword}>
                  <Text className="text-white text-[16px] font-semibold">
                    Change Password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </LayoutBase>
  )
}

export default AccountSettingScreen