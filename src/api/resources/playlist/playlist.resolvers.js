import { Playlist } from './playlist.model';
import { Song } from '../song/song.model';

const getOneById = (_, { id }) => {
	return Playlist.findById(id).exec();
};

const getAll = () => {
	return Playlist.find({}).exec();
};

export const playlistResolvers = {
	Query: {
		Playlist: getOneById,
		Playlists: getAll
	},
	Playlist: {
		songs: playlists => {
			return playlists.songs.map(id => {
				return Song.findById(id);
			});
		}
	}
};
