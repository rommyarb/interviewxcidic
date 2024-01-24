import React from 'react-native';
import {
  Text,
  View,
  Button,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { AppScreenProps } from '../@types/type_navigation';
import { MyNote, NoteResponse } from '../@types/type_note';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../features/api_notes';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import Spacer from '../components/Spacer';

function Screen2(props: AppScreenProps<'Screen2'>) {
  const { navigation } = props;
  const firstTimeRef = useRef(true);

  const { data, isPending, refetch } = useQuery<NoteResponse>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const onItemPress = (note: MyNote) => {
    const { id, body } = note;
    navigation.navigate('Screen3', { id, body });
  };

  const onAddNewNote = () => {
    navigation.navigate('Screen3');
  };

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch]),
  );

  return (
    <View style={s.container}>
      <Text style={s.h1}>My Notes:</Text>
      <Spacer />
      <Button title="+ Add Note" onPress={onAddNewNote} />
      <ScrollView contentContainerStyle={s.container_scroll}>
        {isPending ? <ActivityIndicator animating /> : null}
        {data &&
          data.items.map(n => (
            <Pressable
              key={n.id}
              android_ripple={{
                color: 'cyan',
              }}
              style={s.item_note}
              onPress={() => onItemPress(n)}>
              <Text>{n.body.substring(0, 16)}</Text>
            </Pressable>
          ))}
        {!isPending && !data?.items.length ? (
          <Text>No notes, press "+ Add Note" to create one.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 16,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  container_scroll: {
    paddingVertical: 16,
  },
  item_note: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    elevation: 2,
  },
});

export default Screen2;
