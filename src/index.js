import http from 'http';
import { createServer } from 'http';
import config from './config';

import app from './server';

const server = http.createServer(app);
let currentApp = app;

app.listen(config.port, () => {
	console.log(`API ON PORT ${config.port}`);
});

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp);
		server.on('request', app);
		currentApp = app;
	});
}
