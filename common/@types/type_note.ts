export interface NoteResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: MyNote[];
}

export interface MyNote {
  body: string;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  updated: string;
  user_id: string;
}
