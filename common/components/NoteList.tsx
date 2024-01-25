import React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { MyNote } from '../@types/type_note';
import { navigation_ref } from '../navigation/navigation_ref';

function NoteList({ data }: { data: MyNote[] }) {
  const onItemPress = (note: MyNote) => {
    const { id, body } = note;
    navigation_ref.current?.navigate('Screen3', { id, body });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item: n }) => (
        <Pressable
          key={n.id}
          android_ripple={{
            color: 'cyan',
          }}
          style={s.item_note}
          onPress={() => onItemPress(n)}>
          <Text>{n.body.substring(0, 16)}</Text>
        </Pressable>
      )}
      testID="list_note"
    />
  );
}

const s = StyleSheet.create({
  item_note: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    elevation: 2,
  },
});

export default NoteList;
