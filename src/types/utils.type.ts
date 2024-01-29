import { RouteProp, ParamListBase } from "@react-navigation/native";

export interface ResponseApiSuccess<Data> {
  message: string;
  data: Data;
  success: boolean;
}

export interface ResponseApiError<Data> {
  message: string;
  data?: Data;
  success: boolean;
}

export type ScreenNavigationProps = {
  route: RouteProp<ParamListBase, string>,
  navigation: any
}