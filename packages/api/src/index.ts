import './common/env';
import Server from './common/server';

const port = parseInt(process.env.PORT ?? '3000');
export default new Server().router().listen(port);
