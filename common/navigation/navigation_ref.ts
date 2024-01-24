import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import { RootStackParamList } from '../@types/type_navigation';

export const navigation_ref =
  createRef<NavigationContainerRef<RootStackParamList>>();
