import HeaderLayoutBase from '@shared-components/HeaderLayoutBase';
import {useTheme} from 'contexts/app.context';
import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  children?: React.ReactNode;
  name: string;
  isBack?: boolean;
  checkIsBack?: boolean;
  setCheckIsBack?: React.Dispatch<React.SetStateAction<boolean>>;
  isDelete?: boolean;
  funcDelete?: () => void;
}
const LayoutBase = ({
  children,
  name,
  isBack,
  checkIsBack,
  setCheckIsBack,
  isDelete,
  funcDelete,
}: Props) => {
  const {theme} = useTheme();

  return (
    <View style={{backgroundColor: theme.backgroundApp, height: '100%'}}>
      <HeaderLayoutBase
        nameScreen={name}
        isBack={isBack}
        checkIsBack={checkIsBack}
        setCheckIsBack={setCheckIsBack}
        isDelete={isDelete}
        funcDelete={funcDelete}
      />
      {children}
    </View>
  );
};

export default LayoutBase;
