import {
  Dinner,
  Car,
  Cloth,
  Cosmetics,
  Education,
  House,
  Medical,
  Smartphone,
  Wallet,
  Pig,
  Gift,
  Invest,
  Language,
  Color,
  English,
  Vietnam,
  Logout,
  Card1,
  Card2,
  Card3,
  AccountSetting,
  BarChart,
  CircleChart,
} from 'assets';
import { Dimensions } from 'react-native';

export const SCREENS = {
  HOME: 'home',
  TRANSACTION_HISTORY: 'transaction',
  REPORT: 'report',
  ACCOUNT: 'account',
  ADD_TRANSACTION: 'addTransaction',
  LIST_CATEGORY_SCREEN: 'LIST_CATEGORY_SCREEN',
  CREATE_OR_EDIT_CATEGORY_SCREEN: 'CREATE_OR_EDIT_CATEGORY_SCREEN',

  LOGIN: 'Login',
  BOTTOM: 'Bottom',

  HOME_SCREEN: 'HomeScreen',
  CASHBACK_SCREEN: 'CashbackScreen',
  REPORT_SCREEN: 'reportScreen',
  POST_A_DEAL_SCREEN: 'PostADealScreen',
  BROWSE_SCREEN: 'BrowseScreen',
  ACCOUNT_SCREEN: 'AccountScreen',
  SALE_REPORT: 'SaleReport',
  MY_WALLET_SCREEN: 'MyWallet',
  FORM_WALLET_SCREEN: 'FORM_WALLET_SCREEN',

  LOGIN_SCREEN: 'LoginScreen',
  REGISTER_SCREEN: 'RegisterScreen',
  LANGUAGE_SCREEN: 'LANGUAGE_SCREEN',

  CHANGE_COLOR_SCREEN: 'CHANGE_COLOR_SCREEN',
  ACCOUNT_SETTING_SCREEN: 'ACCOUNT_SETTING_SCREEN',
  TOTAL_REPORT_SCREEN: 'TOTAL_REPORT_SCREEN',
  TOTAL_CATEGORY_SCREEN: 'TOTAL_CATEGORY_SCREEN ',
  ANNUAL_REPORT_SCREEN: 'ANNUAL_REPORT_SCREEN',
  REPORT_CATEGORY_SCREEN: 'REPORT_CATEGORY_SCREEN',
  FORGOT_PASSWORD_SCREEN: 'FORGOT_PASSWORD_SCREEN',

  test: 'home',
};

export const STORAGE_KEY = {
  ACCESS_TOKEN: 'access_token',
  PROFILE: 'profile',
};

export const REACT_QUERY_KEY = {
  USER_INFO: 'USER_INFO',
  TRANSACTION: 'TRANSACTION',
  PERCENT_TRANSACTION: 'PERCENT_TRANSACTION',
  TRANSACTION_EXP_WEEK: 'TRANSACTION_EXP_WEEK ',
  DAILY_TRANSACTION: 'DAILY_TRANSACTION',
  TRANSACTION_EXP_MONTH: 'TRANSACTION_EXP_MONTH',
  TRANSACTION_MONTH: 'TRANSACTION_MONTH',
  ALL_WALLET_USER: 'ALL_WALLET_USER',
  TOTAL_REPORT: 'TOTAL_REPORT',
  TOTAL_CATEGORY  : 'TOTAL_CATEGORY ',
  ALL_CATEGORY  :  'ALL_CATEGORY',
  
} 

export const LIST_ITEM_EXPENSES = [
  {
    icon: Dinner,
    title: 'Ăn uống',
    id: 'exp01',
  },
  {
    icon: Car,
    title: 'Đi lại',
    id: 'exp02',
  },
  {
    icon: Cloth,
    title: 'Quần áo',
    id: 'exp03',
  },
  {
    icon: Cosmetics,
    title: 'Mỹ phẩm',
    id: 'exp04',
  },
  {
    icon: Education,
    title: 'Giáo dục',
    id: 'exp05',
  },
  {
    icon: House,
    title: 'Tiền nhà',
    id: 'exp06',
  },
  {
    icon: Medical,
    title: 'Y tế',
    fill: 'red',
    id: 'exp07',
  },
  {
    icon: Smartphone,
    title: 'Phí liên lạc',
    id: 'exp08',
  },
];

export const LIST_ITEM_REVENUE = [
  {
    icon: Wallet,
    title: 'Tiền lương',
    id: 'rev01',
  },
  {
    icon: Pig,
    title: 'Tiền phụ cấp',
    id: 'rev02',
  },
  {
    icon: Gift,
    title: 'Tiền thưởng',
    id: 'rev03',
  },
  {
    icon: Invest,
    title: 'Đầu tư',
    id: 'rev04',
  },
];

export const LIST_ITEM_EXPENSES_UPDATE = [
  {
    icon: 'Dinner',
    name: 'Ăn uống',
    _id: '6616005d96c029429bf6cf8e',
    fill: 'e34646'
  },
  {
    icon: 'Car',
    name: 'Đi lại',
    _id: '661600b996c029429bf6cf9a',
    fill: 'de0a0a'
  },
  {
    icon: 'Cloth',
    name: 'Quần áo',
    _id: '6616010d96c029429bf6cf9e',
    fill: '000000'
  },
  {
    icon: 'Cosmetics',
    name: 'Mỹ phẩm',
    _id: '6616014096c029429bf6cfa0',
    fill: 'e523c4'
  },
  {
    icon: 'Education',
    name: 'Giáo dục',
    _id: '6616014e96c029429bf6cfa2',
    fill: '1fc72b'
  },
  {
    icon: 'House',
    name: 'Tiền nhà',
    _id: '6616015b96c029429bf6cfa4',
    fill: '000000'
  },
  {
    icon: 'Medical',
    name: 'Y tế',
    _id: '6616016f96c029429bf6cfa6',
    fill: '000000'
  },
  {
    icon: 'Smartphone',
    name: 'Phí liên lạc',
    _id: '6616017b96c029429bf6cfa8',
    fill: '000000'
  },
];

export const LIST_ITEM_REVENUE_UPDATE = [
  {
    icon: 'Wallet',
    name: 'Tiền lương',
    _id: '66164711514ba9288c92c7c0',
  },
  {
    icon: 'Pig',
    name: 'Tiền phụ cấp',
    _id: '66164722514ba9288c92c7c2',
  },
  {
    icon: 'Gift',
    name: 'Tiền thưởng',
    _id: '66164731514ba9288c92c7c4',
  },
  {
    icon: 'Invest',
    name: 'Đầu tư',
    _id: '66164740514ba9288c92c7c6',
  },
];

export const LIST_CATEGORY = {
  Invest: {
    icon: Invest,
    name: 'Invest'
  },
  Wallet: {
    icon: Wallet,
    name: 'Wallet'
  },
  Pig: {
    icon: Pig,
    name: 'Pig'
  },
  Gift: {
    icon: Gift,
    name: 'Gift'
  },
  Dinner: {
    icon: Dinner,
    name: 'Dinner'
  },
  Car: {
    icon: Car,
    name: 'Car'
  },
  Cloth: {
    icon: Cloth,
    name: 'Cloth'
  },
  Cosmetics: {
    icon: Cosmetics,
    name: 'Cosmetics'
  },
  Education: {
    icon: Education,
    name: 'Education'
  },
  House: {
    icon: House,
    name: 'House'
  },
  Medical: {
    icon: Medical,
    name: 'Medical'
  },
  Smartphone: {
    icon: Smartphone,
    name: 'Smartphone'
  },
  Card1: {
    icon: Card1,
    name: 'Card1'
  },
  Card2: {
    icon: Card2,
    name: 'Card2'
  },
  Card3: {
    icon: Card3,
    name: 'Card3'
  },
}

export const LIST_COLOR_CATEGORY = {
  'f5b342': 'f5b342',
  '314eb5': '314eb5',
  'e523c4': 'e523c4',
  '1fc72b': '1fc72b',
  '000000': '000000',
  'fff': 'fff',
  'e34646': 'e34646',
  'de0a0a': 'de0a0a',
};


export const LIST_ACCOUNT_SCREEN = [
  {
    icon: Language,
    title: 'language',
    id: '01',
    navigate: SCREENS.LANGUAGE_SCREEN
  },
  {
    icon: Color,
    title: 'theme',
    id: '02',
    navigate: SCREENS.CHANGE_COLOR_SCREEN
  },
  {
    icon: AccountSetting,
    title: 'accountSetting',
    id: '03',
    navigate: SCREENS.ACCOUNT_SETTING_SCREEN
  },
  {
    icon: BarChart,
    title: 'totalReport',
    id: '04',
    navigate: SCREENS.TOTAL_REPORT_SCREEN
  },
  {
    icon: CircleChart,
    title: 'totalCategory',
    id: '04',
    navigate: SCREENS.TOTAL_CATEGORY_SCREEN
  },
  {
    icon: BarChart,
    title: 'annualReport',
    id: '05',
    navigate: SCREENS.ANNUAL_REPORT_SCREEN
  },
  {
    icon: Logout,
    title: 'logout',
    id: '09',
    navigate: null
  },
];

export const LIST_LANGUAGE = [
  {
    icon: English,
    title: 'English',
    id: 'en',
  },
  {
    icon: Vietnam,
    title: 'Vietnam',
    id: 'vi',
  },
];

export const LIST_COLOR = [
  {
    title: 'Trắng',
    id: 'base',
    rgb: '#fff'
  },
  {
    title: 'Đen',
    id: 'black',
    rgb: '#000'
  },
];

export const LIST_WALLET = [
  {
    icon: Card1,
    id: 'wallet-01',
  },
  {
    icon: Card2,
    id: 'wallet-02',
  },
  {
    icon: Card3,
    id: 'wallet-03',
  }
];


export const formatNumberWithCommas = (number: string) => {
  // console.log(number);
  // /\B(?=(\d{3})+(?!\d))/g
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;