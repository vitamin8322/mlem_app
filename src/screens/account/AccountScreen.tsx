import {Language} from 'assets';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
// import c from '@theme'

type Props = {};

const AccountScreen = (props: Props) => {
  return (
    <>
      <ScrollView>
        <View className="p-2">
          <View className="flex justify-center items-center bg-white border border-gray-400 rounded-md h-24 mb-2">
            <Text>Tên name</Text>
            <Text>Tên Email</Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white border-b border-b-gray-400 p-2 pl-4">
          <Language height={25} width={25} />
          <Text className="ml-2 font-semibold text-[16px]">
            Thay đổi ngôn ngữ
          </Text>
        </View>
        <View className="flex flex-row items-center bg-white border-b border-b-gray-400 p-2 pl-4">
          <Language height={25} width={25} />
          <Text className="ml-2 font-semibold text-[16px]">
            Thay đổi ngôn ngữ
          </Text>
        </View>
      </ScrollView>
    </>
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
