import {Language} from 'assets';
import React, { useContext } from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
// import c from '@theme'
import {AppContext, useTheme} from 'contexts/app.context';
import {LIST_ACCOUNT_SCREEN, SCREENS} from '@shared-constants';
import {navigate} from 'react-navigation-helpers';
import { asyncStorageService } from 'utils/storage';
import { useTranslation } from 'react-i18next';
type Props = {};

const AccountScreen = (props: Props) => {
  const {theme} = useTheme();  
  const {t} = useTranslation('home');

  const { setIsAuthenticated, setProfile, profile } = useContext(AppContext);
  console.log(profile);

  
  return (
    <View style={{backgroundColor: theme.backgroundApp }} className='h-full'>
      {/* <ScrollView> */}
        <View style={{backgroundColor: theme.backgroundApp}}  className="p-2">
          <View style={{backgroundColor: theme.backgroundColor}} className="flex justify-center items-center border border-gray-400 rounded-md h-24 mb-2">
            <Text style={{color: theme.textColor}}>{t("name")}: {profile?.name} </Text>
            <Text style={{color: theme.textColor}}>Email: {profile?.email}</Text>
          </View>
        </View>
        <FlatList
          data={LIST_ACCOUNT_SCREEN}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={async() => {
                if (item.navigate) {
                  navigate(item?.navigate);
                }
                if (item.id === '03') {
                  
                  await asyncStorageService.removeValue('access_token')
                  await asyncStorageService.removeValue('profile')
                  setIsAuthenticated(false)
                  setProfile(null)
                  navigate(SCREENS.LOGIN_SCREEN)
                }
              }}>
              <View style={{backgroundColor: theme.backgroundColor}} className="flex flex-row items-center border-b border-b-gray-400 p-2 pl-4 h-10">
                {React.createElement(item.icon, {height: 20, width: 20, fill: theme.textColor})}
                <Text style={{color: theme.textColor}} className="ml-2 font-semibold text-[16px]">
                  {t(`${item.title}`)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      {/* </ScrollView> */}
    </View>
  );
};

export default AccountScreen;
// const styles = StyleSheet.create({
//   btnContainer: {
//     height: '100%',
//     alignItems: 'center',
//     borderRadius: 5,
//     justifyContent: 'center',
//   },
//   btnRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   btnText: {
//     fontSize: 16,
//   },
//   row: {
//     padding: 10,
//     alignItems: 'center',
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     margin: 9,
//   },
// });

// const {t, i18n} = useTranslation('home');
// const [selectedTheme, setSelectedTheme] = useState('green');

// const changeLanguage = (lng: any) => {
//   i18n.changeLanguage(lng);
//   // SETTINGS.THEMES
//   // console.log(12321,c.SETTINGS.THEMES);
// };
{
  /* <View>
<TouchableOpacity onPress={() => changeLanguage('vi')}>
  <Text className='text-[#d54080]'>{t('helloUser', {name: 'Doanh'})}</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => changeLanguage('en')}>
  <Text>{t('helloUser', {name: 'Doanh'})}</Text>
</TouchableOpacity>
</View>
{c.SETTINGS.THEMES.map((data:any, i:any) => {
console.log(c.THEMES[selectedTheme].darkerPrimaryColor);
return (
  <TouchableOpacity
    key={`${data}-${i}`}
    onPress={() => {
      setSelectedTheme(data);
    }}>
    <View
      style={[
        {
          backgroundColor:
          data === selectedTheme
              ? c.THEMES[selectedTheme].primaryColor
              : c.THEMES[selectedTheme].darkerPrimaryColor,
        },
      ]}
      >
      <Text
        className={`text-[${c.THEMES[selectedTheme].primaryColor}]`}
        >
        {data}
      </Text>
    </View>
  </TouchableOpacity>
);
})} */
}
