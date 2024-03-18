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
} from 'assets';

export const SCREENS = {
  HOME: 'home',
  TRANSACTION_HISTORY: 'transaction',
  REPORT: 'report',
  ACCOUNT: 'account',
  ADD_TRANSACTION: 'addTransaction',

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
    icon: Logout,
    title: 'logout',
    id: '03',
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
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
