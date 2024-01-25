import React, { useCallback, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { KEY_STORE_AUTH, store_auth } from '../stores/store_auth';
import { AppScreenProps } from '../@types/type_navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from '../@types/type_auth';

// CHECK AUTH SCREEN

function Screen0(props: AppScreenProps<'Screen0'>) {
  const init = useCallback(async () => {
    AsyncStorage.getItem(KEY_STORE_AUTH).then(r => {
      if (r) {
        const authRes = JSON.parse(r) as AuthResponse;
        store_auth.record = { ...authRes.record };
        store_auth.token = authRes.token;
        props.navigation.replace('Screen2'); // Note List
      } else {
        props.navigation.replace('Screen1'); // Login
      }
    });
  }, [props.navigation]);

  useEffect(() => {
    setTimeout(init, 500); // For demo purpose
  }, [init]);

  return (
    <View style={s.container}>
      <Text>Authenticating...</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Screen0;
