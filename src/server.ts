import { Server } from 'http';
import app from './app';

let server: Server;
const main = async () => {
  server = app.listen(5000, () => {
    console.log(`Example app listening on port ${5000}`);
  });
};

main();
