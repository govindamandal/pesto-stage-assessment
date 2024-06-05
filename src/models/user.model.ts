import { Schema, model } from 'mongoose';
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
      contentId: {
        type: Schema.Types.ObjectId,
        refPath: 'myList.contentType',
        required: true
      },
      contentType: {
        type: String,
        required: true,
        enum: ['movie', 'tvshow']
      }
    }
  ],
});

const UserModel = model<User>('user', userSchema);

export default UserModel;
