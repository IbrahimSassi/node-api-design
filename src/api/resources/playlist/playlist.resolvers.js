import { Playlist } from './playlist.model';
import { Song } from '../song/song.model';

const getOneById = async (_, { id }) => {
	return await Playlist.findById(id).exec();
};

const getAll = async () => {
	return await Playlist.find({}).exec();
};

const newPlaylist = async (_, { input }) => {
	const playlist = {
		...input,
		songs: input.songs.map(song => ({ _id: song.id }))
	};
	const result = await Playlist.create(playlist);
	console.log(result);

	return result;
};

const updatePlaylist = (_, { input }) => {
	const { id, ...update } = input;

	return Playlist.findByIdAndUpdate(id, update, { new: true }).exec();
};

export const playlistResolvers = {
	Query: {
		Playlist: getOneById,
		Playlists: getAll
	},
	Mutation: {
		newPlaylist,
		updatePlaylist
	},
	Playlist: {
		songs: async playlist => {
			const populated = await playlist.populate('songs').execPopulate();
			return populated.songs;
			// return await playlist.songs.map(id => {
			// 	return await Song.findById(id);
			// });
		}
	}
};
