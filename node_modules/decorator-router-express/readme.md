# decorator-router-express [![Build Status](https://travis-ci.org/mastilver/decorator-router-express.svg?branch=master)](https://travis-ci.org/mastilver/decorator-router-express)

> Express strategy for [decorator-router](https://github.com/mastilver/decorator-router)


## Install

```
$ npm install --save decorator-router decorator-router-express
```


## Usage

Given a controller `controller/homeCtrl.js`
```js
import {httpGet, middlewareFactory} from 'decorator-router';

const isLoggedIn = middlewareFactory(function(res, req, next){
    /*   check if user is logged in   */
    next();
});

const isRole = middlewareFactory(role => function(res, req, next){
    /*   check if user have the right role   */
    next();
});

export default {
    @isLoggedIn
    @httpGet('/')
    getIndex(req, res){
        res.ok();
    },

    @isRole('admin')
    @httpGet('/admin')
    getAdminPortal(req, res){
        res.ok();
    }
}
```

You can register those routes by doing:
```js
import decoratorRouter = from 'decorator-router';
import decoratorRouterExpress = from 'decorator-router-express';
import express from 'express';

let app = express();

decoratorRouter('controller/*Ctrl.js', decoratorRouterExpress, app)
.then(x => {
    console.log('done');
});
```

## License

MIT © [Thomas Sileghem](http://mastilver.com)
