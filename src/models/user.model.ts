import { Schema, model, Types } from 'mongoose';
import { User } from '../interface/all.interface';
import { Genres } from '../interface/genre';

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [{type: String, enum: Genres}],
    dislikedGenres: [{type: String, enum: Genres}],
  },
  watchHistory: [
    {
      contentId: { type: String, required: true },
      watchedOn: { type: Date, required: true },
      rating: Number,
    },
  ],
  myList: [
    {
      item: {
        type: Schema.Types.ObjectId,
        refPath: 'myList.kind',
        required: true
      },
      kind: {
        type: String,
        required: true,
        enum: ['Movie', 'TVShow']
      }
    }
  ],
});

const UserModel = model<User>('user', userSchema);

export default UserModel;
