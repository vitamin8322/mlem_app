import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

export interface InputProps extends TextInputProps {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  classNameContainerInput?: string;
  placeholderColor?: string;
  isPasswordField?: boolean;
  multiline?:boolean;
  numberOfLines?:number;
  isRef?:boolean
}

const Input = ({
  errorMessage,
  classNameError,
  classNameInput,
  classNameContainerInput,
  placeholderColor,
  isPasswordField,
  multiline,
  numberOfLines,
  isRef,
  ...rest
}: InputProps) => {
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

  const handleShowingPassword = () => {
    setIsShowingPassword(!isShowingPassword);
  };
  const formatNumber = (value: any) => {
    return new Intl.NumberFormat().format(100000);
  };
  
  return (
    <View className={classNameContainerInput}>
      <TextInput
        {...rest}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`text-[16px] ${classNameInput}  ${errorMessage ?'' :'mb-4' }`}
        placeholderTextColor={placeholderColor ? placeholderColor : "#eee"}
        secureTextEntry={isPasswordField && !isShowingPassword}
      />
      {isPasswordField && (
        <View className="absolute right-4 top-[20%]">
          <TouchableWithoutFeedback onPress={handleShowingPassword}>
            {isShowingPassword ? (
              <Icon type={IconType.Feather} name={"eye"} color="#9BA4B5" />
            ) : (
              <Icon type={IconType.Feather} name={"eye-off"} color="#9BA4B5" />
            )}
          </TouchableWithoutFeedback>
        </View>
      )}

     {errorMessage && <Text className={classNameError}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;
