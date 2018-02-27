import { Song } from './song.model';

const getOneSong = (_, { id }) => {
	const song = Song.findById(id).exec();
	if (!song) {
		throw new Error('Cannot find that song');
	}
	return song;
};

const getAllSongs = () => {
	const songs = Song.find({}).exec();

	if (!songs.length) {
		throw new Error('Cannot find those songs');
	}
	return songs;
};

export const songResolvers = {
	Query: {
		Song: getOneSong,
		Songs: getAllSongs
	}
};
