import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface messageDetails {
  id: number,
  sender_id: number,
  receiver_id: number,
  text: string,
  createdAt: string
}

interface userOnline {
  userId: number,
  name: string,
  socketId: string
}
interface state {
  view: string,
  receivedMessages: Array<messageDetails>,
  sentMessages: Array<messageDetails>,
  usersOnline: Array<userOnline>,
  recipientId: number,
  conversationId: number,
}

const initialState = <state>{
  view: 'usersOnline',
  receivedMessages: [],
  sentMessages: [],
  usersOnline: [],
  recipientId: 0,
  conversationId: 0,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    changeView: (state, action: PayloadAction<string>) => {
      state.view = action.payload; 
    },
    getReceivedMessages: (state, action: PayloadAction<Array<messageDetails>>) => {
      state.receivedMessages = action.payload;
    },
    getSentMessages: (state, action: PayloadAction<Array<messageDetails>>) => {
      state.sentMessages = action.payload;
    },
    getUsersOnline: (state, action: PayloadAction<Array<userOnline>>) => {
      state.usersOnline = action.payload;
      return state;
    },
    getRecipientId: (state, action: PayloadAction<number>) => {
      state.recipientId = action.payload;
      return state;
    },
    getConversationId: (state, action: PayloadAction<number>) => {
      state.conversationId = action.payload;
      return state;
    }
  }
});

export const { changeView, getReceivedMessages, getSentMessages, getUsersOnline, getRecipientId, getConversationId } = chatSlice.actions;

export default chatSlice.reducer;
