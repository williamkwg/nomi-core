import { join } from 'path';
export const port = 3000;
export const serviceDir = "/service/"
export const controllerDir = "/controller/"
export const middlewareDir = "middleware"
export const defaultLog = {
  system: {
    path: join(process.cwd(), 'log', 'system'),
    level: 'DEBUG'
  },
  user: {
    path: join(process.cwd(), 'log', 'user'),
    level: 'WARN',
    requestLog: true,
    requestPath: join(process.cwd(), 'log', 'request')
  },
  error: {
    path: join(process.cwd(), 'log', 'error'),
    level: 'ERROR'
  }
}
