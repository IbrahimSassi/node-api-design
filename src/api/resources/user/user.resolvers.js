import { User } from './user.model';
import { Playlist } from '../playlist/playlist.model';
import merge from 'lodash.merge';

const getMe = (_, __, { user }) => {
	return user;
};

const getAll = () => User.find({}).exec();

const updateMe = (_, { input }, { user }) => {
	merge(user, input);
	return user.save();
};

export const userResolvers = {
	Query: {
		getMe,
		getAll
	},
	Mutation: {
		updateMe
	},
	User: {
		friends: user => ['joey'],
		playlists: async user => {
			return await Playlist.find({}).exec();
		}
	}
};
