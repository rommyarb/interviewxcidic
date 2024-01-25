// import '@testing-library/jest-dom';

import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Screen1 from '../common/screens/Screen1';
import {} from '@jest/globals';
import { QueryClientProvider } from '@tanstack/react-query';
import { api } from '../features/api';

it('can input username & password', async () => {
  const testID_username = 'username';
  const testID_password = 'password';
  const expected_username = 'dev';
  const expected_password = '12345678';

  const { getByTestId } = render(
    <QueryClientProvider client={api}>
      <Screen1 navigation={{} as any} route={{} as any} />
    </QueryClientProvider>,
  );

  const input_username = getByTestId(testID_username);
  const input_password = getByTestId(testID_password);

  fireEvent.changeText(input_username, expected_username);
  fireEvent.changeText(input_password, expected_password);

  expect(input_username.props.value).toBe(expected_username);
  expect(input_password.props.value).toBe(expected_password);
});
