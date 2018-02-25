import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

export const connect = () => {
	return mongoose.connect('mongodb://localhost/api-design-node', {
		useMongoClient: true
	});
};
