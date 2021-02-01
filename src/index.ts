import http from 'http';
import app from './app';
import mongoose from 'mongoose';
import logger from './shared/logger';

const port = Number(process.env.PORT || 3000);
app.set('port', port);

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  logger.info("DB Connected");
});

const server = http.createServer(app);

server.listen(port);
server.on('error', (error: any) => {
    if (error.syscall !== 'listen') {
        throw error;
        }

        var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
        case 'EACCES':
            logger.err(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.err(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
        }
});

server.on('listening', () => {
    let addr: any = server.address();
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    logger.info('Listening on ' + bind);
  
})