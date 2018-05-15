"use strict";
import 'babel-polyfill';
import * as config from './config/config.default';
import Server from 'lib/Server';
const server = new Server(Number(config.default.port));