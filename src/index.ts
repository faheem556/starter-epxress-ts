import http from 'http';
import app from './app';
import Logger from 'jet-logger';

const logger = new Logger();
const port = Number(process.env.PORT || 3000);
app.set('port', port);

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