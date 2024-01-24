import React from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import { AppScreenProps } from '../@types/type_navigation';
import { isAxiosError } from 'axios';
import { store_auth } from '../stores/store_auth';
import { apiLogin } from '../../features/api_auth';
import Spacer from '../components/Spacer';

// LOGIN SCREEN

function Screen1({ navigation }: AppScreenProps<'Screen1'>) {
  const [username, setUsername] = useState('dev');
  const [password, setPassword] = useState('12345678');

  const login = useMutation({
    mutationFn: apiLogin,
    onSuccess: data => {
      store_auth.record = data.record;
      store_auth.token = data.token;
      navigation.replace('Screen2');
    },
    onError: e => {
      let msg = '';
      if (isAxiosError(e)) {
        msg = e.message;
      } else {
        msg = e + '';
      }
      Alert.alert('Error', msg);
    },
  });

  const btn_title = useMemo(
    () => (login.isPending ? 'Logging in...' : 'Login'),
    [login.isPending],
  );

  const onLogin = () => {
    login.mutate({ username, password });
  };

  return (
    <View style={s.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Text>Email:</Text>
        <TextInput
          editable={!login.isPending}
          value={username}
          style={s.input}
          onChangeText={v => setUsername(v)}
        />
        <Spacer />
        <Text>Password:</Text>
        <TextInput
          editable={!login.isPending}
          value={password}
          style={s.input}
          onChangeText={v => setPassword(v)}
          secureTextEntry
        />
        <Spacer />
        <Button
          disabled={login.isPending}
          title={btn_title}
          onPress={onLogin}
        />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});

export default Screen1;
