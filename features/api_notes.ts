import axios from 'axios';
import {BASE_URL} from './api';
import {store_auth} from '../common/stores/store_auth';

const HEADERS_MUTATION = {
  Authorization: store_auth.token,
  'Content-Type': 'application/json',
};

export const fetchNotes = () =>
  axios
    .get(BASE_URL + '/api/collections/notes/records', {
      params: {
        sort: '-created',
      },
      headers: {
        Authorization: store_auth.token,
      },
    })
    .then(res => res.data);

export const createNote = (body: string) =>
  axios
    .post(
      BASE_URL + '/api/collections/notes/records',
      {body, user_id: store_auth.record.id},
      {
        headers: HEADERS_MUTATION,
      },
    )
    .then(res => res.data);

export const updateNote = (note_id: string, body: string) =>
  axios
    .patch(
      BASE_URL + '/api/collections/notes/records/' + note_id,
      {body},
      {
        headers: HEADERS_MUTATION,
      },
    )
    .then(res => res.data);

export const deleteNote = (note_id: string) =>
  axios
    .delete(BASE_URL + '/api/collections/notes/records/' + note_id, {
      headers: HEADERS_MUTATION,
    })
    .then(res => res.data);
