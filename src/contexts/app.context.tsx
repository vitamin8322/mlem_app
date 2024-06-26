// import { THEMES, Theme } from '@theme/themes';
import { STORAGE_KEY } from '@shared-constants';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {User} from 'types/user.type';
import { asyncStorageService } from 'utils/storage';
import { Dispatch, SetStateAction } from 'react';

export enum ColorThemes {
  base = 'base',
  black = 'black',
}

export type Theme = {
  primaryColor: string;
  darkerPrimaryColor: string;
  secondaryColor: string;
  lightColor: string;
  textColor: string;
  textColorBland: string;
  backgroundColor: string;
  backgroundApp: string;
};

export const THEMES: {[key: string]: Theme} = {
  base: {
    primaryColor: '#FCDE89',
    darkerPrimaryColor: '#C9AB56',
    secondaryColor: '#424646',
    lightColor: 'white',
    textColor: 'black',
    textColorBland: '#6b7280',
    backgroundColor: '#fff',
    backgroundApp: '#e5e7eb',
  },
  black: {
    primaryColor: '#FCDE89',
    darkerPrimaryColor: '#C9AB56',
    secondaryColor: '#424646',
    lightColor: 'blue',
    textColor: 'white',
    textColorBland: '#c8cbcf',
    backgroundColor: '#424646',
    backgroundApp: 'black',
  },
};

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  profile: any;
  setProfile: Dispatch<SetStateAction<User | null>>;
  setTheme: Dispatch<SetStateAction<any>>;
  theme: Theme;
  category: {
    expCategory: any[];
    revCategory: any[];
  };
  setCategory: Dispatch<SetStateAction<{
    expCategory: any[];
    revCategory: any[];
  }>>;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(null),
  setIsAuthenticated: () => null,
  profile: null,
  setProfile: () => null,
  setTheme: () => null,
  theme: THEMES.base,
  category: {
    expCategory: [],
    revCategory: []
  },
  setCategory: () => null, 
};

export const AppContext = createContext(initialAppContext);
export const useTheme = () => useContext(AppContext);
export const AppProvider = ({children}: {children: React.ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated,
  );
  const [profile, setProfile] = useState<User | null>(
    initialAppContext.profile,
  );
  
  const [category, setCategory] = useState(
    initialAppContext.category,
  );
  const [theme, setTheme] = useState(initialAppContext.theme);


  const checkAuthentication = async () => {
    const accessToken = await asyncStorageService.getValue(
      STORAGE_KEY.ACCESS_TOKEN,
    );
    setIsAuthenticated(Boolean(accessToken));
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const a = 'base';

  // useEffect(() => {
  //   setTheme(THEMES[a]);
  // }, []);


  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        category,
        setCategory,
      }}>
      {children}
    </AppContext.Provider>
  );
};
