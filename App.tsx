import * as React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // ignore jest test
import Screen0 from './common/screens/Screen0';
import Screen1 from './common/screens/Screen1';
import Screen2 from './common/screens/Screen2';
import Screen3 from './common/screens/Screen3';
import { RootStackParamList } from './common/@types/type_navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { api } from './features/api';
import { navigation_ref } from './common/navigation/navigation_ref';
import { logout } from './features/api_auth';

const Stack = createNativeStackNavigator<RootStackParamList>();
const ButtonLogout = () => <Button title="Logout" onPress={logout} />;

function App() {
  return (
    <QueryClientProvider client={api}>
      <NavigationContainer ref={navigation_ref}>
        <Stack.Navigator initialRouteName="Screen0">
          <Stack.Screen name="Screen0" component={Screen0} />
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen
            name="Screen2"
            component={Screen2}
            options={{
              headerRight: ButtonLogout,
            }}
          />
          <Stack.Screen name="Screen3" component={Screen3} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
