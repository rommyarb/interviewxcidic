import React from 'react';
import { render, screen } from '@testing-library/react-native';
import NoteList from '../common/components/NoteList';

const MOCK_NOTES = [
  {
    id: '1',
    body: 'Test note 1',
    collectionId: 'a',
    collectionName: 'b',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    user_id: '1',
  },
  {
    id: '2',
    body: 'Test note 2',
    collectionId: 'a',
    collectionName: 'b',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    user_id: '1',
  },
  {
    id: '3',
    body: 'Test note 3',
    collectionId: 'a',
    collectionName: 'b',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    user_id: '1',
  },
];

test('note data exists', async () => {
  render(<NoteList data={MOCK_NOTES} />);
  const flatList = await screen.findByTestId('list_note');
  const { data } = flatList.props;
  expect(data).toBeDefined();
  expect(data).toHaveLength(3);
});
test('data has 3 items', async () => {
  render(<NoteList data={MOCK_NOTES} />);
  const flatList = await screen.findByTestId('list_note');
  const { data } = flatList.props;
  expect(data).toHaveLength(3);
});
