import React, { useEffect, useMemo, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Alert } from 'react-native';
import { AppScreenProps } from '../@types/type_navigation';
import { useMutation } from '@tanstack/react-query';
import { createNote, deleteNote, updateNote } from '../../features/api_notes';
import { isAxiosError } from 'axios';
import Spacer from '../components/Spacer';

function Screen3(props: AppScreenProps<'Screen3'>) {
  const [body, setBody] = useState('');

  const note_id = useMemo(() => {
    if (props.route.params) {
      return props.route.params.id;
    }
    return '';
  }, [props.route.params]);

  const note_body = useMemo(() => {
    if (props.route.params) {
      return props.route.params?.body;
    }
    return '';
  }, [props.route.params]);

  const title = useMemo(() => {
    if (note_id) {
      return 'Edit Note';
    }
    return 'New Note';
  }, [note_id]);

  useEffect(() => {
    if (note_body) {
      setBody(note_body);
    }
  }, [note_body]);

  // MUTATIONS

  const update = useMutation({
    mutationFn: () => updateNote(note_id, body),
    onError: e => {
      let msg = e + '';
      if (isAxiosError(e)) {
        msg = e.response?.data.message;
      }
      Alert.alert('Error', msg);
    },
    onSuccess: () => {
      props.navigation.goBack();
    },
  });

  const create = useMutation({
    mutationFn: () => createNote(body),
    onError: e => {
      let msg = e + '';
      if (isAxiosError(e)) {
        msg = e.response?.data.message;
      }
      Alert.alert('Error', msg);
    },
    onSuccess: () => {
      props.navigation.goBack();
    },
  });

  const del = useMutation({
    mutationFn: () => deleteNote(note_id),
    onError: e => {
      let msg = e + '';
      if (isAxiosError(e)) {
        msg = e.response?.data.message;
      }
      Alert.alert('Error', msg);
    },
    onSuccess: () => {
      props.navigation.goBack();
    },
  });

  // end | MUTATIONS

  const onSave = () => {
    if (note_id) {
      update.mutate();
    } else {
      create.mutate();
    }
  };

  const onDel = () => {
    Alert.alert('Confirmation', 'Delete this note?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => del.mutate(),
      },
    ]);
  };

  const btn_title = useMemo(() => {
    if (update.isPending || create.isPending) {
      return 'Saving...';
    }
    return '💾 Save';
  }, [create.isPending, update.isPending]);

  const btn_title_del = useMemo(() => {
    if (update.isPending || create.isPending) {
      return 'Deleting...';
    }
    return 'Delete';
  }, [create.isPending, update.isPending]);

  const is_processing = useMemo(() => {
    if (create.isPending || update.isPending || del.isPending) {
      return true;
    }
    return false;
  }, [create.isPending, del.isPending, update.isPending]);

  return (
    <View style={s.container}>
      <Text>{title}</Text>
      <TextInput
        multiline
        autoFocus
        editable={!is_processing}
        value={body}
        onChangeText={v => setBody(v)}
        style={s.text_input}
        numberOfLines={10}
      />
      <Spacer />
      <Button
        disabled={is_processing || !body}
        title={btn_title}
        onPress={onSave}
      />
      <Spacer />
      {note_id && (
        <Button
          disabled={is_processing}
          title={btn_title_del}
          onPress={onDel}
          color="red"
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 16,
  },
  text_input: {
    textAlignVertical: 'top',
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#FFFFDD',
    borderWidth: 1,
    borderColor: '#ccc',
    height: 150,
  },
});

export default Screen3;
