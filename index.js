"use strict";
//import 'babel-polyfill';
import { join } from 'path';
const config = require(join(process.cwd(), 'config', 'config.default'));
import Server from './src/lib/Server';
const server = new Server(config.default);