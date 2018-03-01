import { Song } from './song.model';

const getOneSong = (_, { id }) => {
	const song = Song.findById(id).exec();
	if (!song) {
		throw new Error('Cannot find that song');
	}
	return song;
};

const getAllSongs = async () => {
	const songs = await Song.find({}).exec();

	if (!songs.length) {
		throw new Error('Cannot find those songs');
	}
	return songs;
};

const newSong = async (_, { input }) => {
	return await Song.create(input);
};
const updateSong = async (_, { input }) => {
	const { id, ...update } = input;

	return await Song.findByIdAndUpdate(id, update, { new: true }).exec();
};

const removeSong = (_, { input }) => {
	return Song.findByIdAndRemove(input).exec();
};
export const songResolvers = {
	Query: {
		Song: getOneSong,
		Songs: getAllSongs
	},
	Mutation: {
		newSong,
		updateSong,
		removeSong
	}
};
