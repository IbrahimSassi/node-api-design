import { User } from './user.model';
import merge from 'lodash.merge';

const getMe = (_, __, { user }) => {
	return user;
};

const getAll = () => User.find({}).exec();

export const userResolvers = {
	Query: {
		getMe,
		getAll
	},
	User: {
		friends: user => ['joey']
	}
};
