# gulp-typescript-teamcity
A Gulp plugin used with [Gulp-TypeScript](https://github.com/ivogabe/gulp-typescript) to provide a reporter for [TeamCity] build server.

[![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]


Installation
-------
```
$ npm install gulp-typescript-teamcity --save-dev
```

Usage
-----


```js
var gulp = require('gulp');
var ts = require('gulp-typescript');
var reporter = require('gulp-typescript-teamcity');

gulp.task('default', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }, undefined, reporter()))
        .pipe(gulp.dest('build/'));
});
```

### Running Gulp with TeamCity

The plugin looks for the presence of a "--teamcity" argument (passed to Gulp) in order to show TeamCity messages. Otherwise it will produce standard colored console output.

Requiring this argument allows the same Gulp commands to be used by developers and build scripts.

I recommend using the [TeamCity.Node] plugin for TeamCity to run Gulp within builds, as it not only passes the "--teamcity" argument to Gulp, but also gives you access to your build variables.

#### Sample Output -- TeamCity

```sh
$ gulp --teamcity
[22:23:00] Starting 'default'...
##teamcity[buildProblem description='[31msrc/greeter.ts(5,2): [39merror TS7027: Unreachable code detected.' flowId='9946972597' timestamp='2016-07-28T03:23:01.274']
##teamcity[message text='TypeScript: 1 semantic error' flowId='9946972597' timestamp='2016-07-28T03:23:01.277']
[22:23:01] TypeScript: 1 semantic error
##teamcity[buildProblem description='TypeScript: emit succeeded (with errors)' flowId='9946972597' timestamp='2016-07-28T03:23:01.281']
[22:23:01] TypeScript: emit succeeded (with errors)
[22:23:01] Finished 'default' after 861 ms

```

#### Sample Output -- No TeamCity
Here is the same command, but without the --teamcity argument. It will display typical Gulp-TypeScript output to developers without the TeamCity notifications.
```sh
$ gulp
[22:23:05] Starting 'default'...
src/greeter.ts(5,2): error TS7027: Unreachable code detected.
[22:23:06] TypeScript: 1 semantic error
[22:23:06] TypeScript: emit succeeded (with errors)
[22:23:06] Finished 'default' after 903 ms
```


License
-----

gulp-typescript-teamcity is licensed under the MIT license.

[TeamCity]: https://www.jetbrains.com/teamcity/
[TeamCity.Node]: https://github.com/jonnyzzz/TeamCity.Node

[travis-url]: https://travis-ci.org/NewFireGroup/gulp-typescript-teamcity
[travis-image]: https://travis-ci.org/NewFireGroup/gulp-typescript-teamcity.svg
[npm-url]: https://npmjs.com/package/gulp-typescript-teamcity
[npm-image]: https://badge.fury.io/js/gulp-typescript-teamcity.svg