import {LIST_COLOR, LIST_LANGUAGE} from '@shared-constants';
import {Check} from 'assets';
import {AppContext, THEMES, useTheme} from 'contexts/app.context';
import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import LayoutBase from 'shared/layout';
import {asyncStorageService} from 'utils/storage';

type Props = {};

const ChangeColorScreen = (props: Props) => {
  const {t, i18n} = useTranslation('home');
  const {setTheme} = useContext(AppContext);
  const {theme} = useTheme();
  
  const [currentTheme, setCurrentTheme] = useState<any>();

  useEffect(() => {
    const initializeTheme = async () => {
      const lang = await asyncStorageService.getValue('theme');

      setCurrentTheme(String(lang));
    };

    initializeTheme();
  }, []);

  const changeTheme = async (theme: any) => {
    const lang = await asyncStorageService.setValue('theme', theme);
    setCurrentTheme(theme);
    setTheme(THEMES[theme]);
  };

  return (
    <LayoutBase name={t('changeColor')}>
      <FlatList
        data={LIST_COLOR}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              console.log(1231,item.id);
              changeTheme(item.id)
              setTheme(THEMES[item.id]);
            }}>
            <View className="flex flex-row justify-between items-center w-full bg-white border-b border-b-gray-400 p-2 pl-4">
              <View className="flex flex-row items-center ">
                <View
                  style={{backgroundColor: item.rgb}}
                  className="h-5 w-7 border "></View>
                <Text className="ml-2 font-semibold text-[16px]">
                  {item.title}
                </Text>
              </View>
              {currentTheme === item.id && <Check height={20} width={20} />}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </LayoutBase>
  );
};

export default ChangeColorScreen;
