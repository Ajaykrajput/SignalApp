// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MessageStatus = {
  "READ": "READ",
  "DELIVERED": "DELIVERED",
  "SENT": "SENT"
};

const { Message, User, ChatRoomUser, ChatRoom } = initSchema(schema);

export {
  Message,
  User,
  ChatRoomUser,
  ChatRoom,
  MessageStatus
};