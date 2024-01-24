import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Screen0: undefined;
  Screen1: undefined;
  Screen2: undefined;
  Screen3?: {id: string; body: string};
};

export type AppScreenProps<RouteName extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
};
