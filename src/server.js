import express from 'express';
import setupMiddware from './middleware';
import { restRouter, graphQLRouter } from './api';
import { connect } from './db';
import { signin, protect } from './api/modules/auth';
import { graphiqlExpress } from 'apollo-server-express';
// Declare an app from express
const app = express();

setupMiddware(app);
connect();
app.use('/signin', signin);
app.use('/graphql', protect, graphQLRouter);
app.use('/api', protect, restRouter);
app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }));

app.all('*', (req, res) => {
	res.json({ ok: true });
});

export default app;
