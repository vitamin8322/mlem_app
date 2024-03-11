import {LIST_LANGUAGE} from '@shared-constants';
import {Check} from 'assets';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import LayoutBase from 'shared/layout';
import {asyncStorageService} from 'utils/storage';

type Props = {};

const LanguageScreen = (props: Props) => {
  const {t, i18n} = useTranslation('home');

  const [currentLang, setCurrentLang] = useState<any>();

  useEffect(() => {
    const initializeLanguage = async () => {
      const lang = await asyncStorageService.getValue('lang');

      setCurrentLang(String(lang));
    };

    initializeLanguage();
  }, []);

  const changeLanguage = async (lng: any) => {
    i18n.changeLanguage(lng);
    const lang = await asyncStorageService.setValue('lang', lng);
    setCurrentLang(lng);
  };

  return (
    <LayoutBase name={t('selectLanguage')}>
      <FlatList
        data={LIST_LANGUAGE}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => changeLanguage(item.id)}>
            <View className="flex flex-row justify-between items-center w-full bg-white border-b border-b-gray-400 p-2 pl-4">
              <View className="flex flex-row items-center ">
                {React.createElement(item.icon, {height: 20, width: 20})}
                <Text className="ml-2 font-semibold text-[16px]">
                  {item.title}
                </Text>
              </View>
              {currentLang === item.id && <Check height={20} width={20} />}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </LayoutBase>
  );
};

export default LanguageScreen;
