# nomi-core

the core package of nomi framework.

## Installation

``` bash
$ npm install nomi-core --save
```

Node.js >= 8.0.0  required.

## API

- match

## Usage

``` javascript

import Server from 'nomi-core';
const server = new Server('d:nomi-test/config/config.js');
const app = new require('koa');
app.use(server.match);

```
