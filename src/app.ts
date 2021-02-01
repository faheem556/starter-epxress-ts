import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import cookieParser from 'cookie-parser';
import morga from 'morgan';
import helmet from 'helmet';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import apiRouter from './routes/api';

const { BAD_REQUEST } = StatusCodes;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

if(process.env.NODE_ENV !== "development") {
  app.use(morga('dev'));
}

if(process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  if(req.path.startsWith('/api')) {
    res.status(BAD_REQUEST).json({
      message: err.message
    });
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err. || 500);
    res.render('error');
  }
});

export default app;
