import { expect } from 'chai';
import createApiSpec from '~/apiSpecs';
import { Song, schema } from './song.model';
import { dropDb, runQuery } from '../../../../test/helpers';
import { User } from '../user/user.model';

describe('Song model', () => {
	it('should have tilte', () => {
		expect(schema.title).to.exist;
		expect(schema.title.required).to.be.an('array');
	});

	it('should have url', () => {
		expect(schema.url).to.exist;
		expect(schema.url.unique).to.equal(true);
		expect(schema.url.required).to.be.an('array');
	});

	it('should have album', () => {
		expect(schema.album).to.exist;
	});

	it('should have artist', () => {
		expect(schema.artist).to.exist;
	});

	it('should have rating', () => {
		expect(schema.rating).to.exist;
		expect(schema.rating.type).to.eql(Number);
	});

	it('should have favorite', () => {
		expect(schema.favorite).to.exist;
		expect(schema.favorite.type).to.eql(Boolean);
	});
});

createApiSpec(Song, 'song', {
	title: 'downtown jamming',
	url: 'http://music.mp3'
});

// testing graphql

describe.only('Song graph', () => {
	let user;
	beforeEach(async () => {
		await dropDb();
		user = await User.create({ username: 'stu1', passwordHash: '123' });
	});

	afterEach(async () => {
		await dropDb();
	});

	it('should create a song', async () => {
		const result = await runQuery(
			`
      mutation createNewSong($input: NewSong!){
       newSong(input: $input) {
          id
          title
        }
      }
    `,
			{
				input: {
					title: 'MY Testing song',
					url: 'some url',
					artist: 'JJ'
				}
			},
			user
		);

		expect(result.errors).to.not.exist;
		expect(result.data.newSong).to.be.an('object');
		expect(result.data.newSong.title).to.equals('MY Testing song');
	});
});
