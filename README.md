# gulp-typescript-teamcity
A Gulp plugin used with [Gulp-TypeScript](https://github.com/ivogabe/gulp-typescript) to provide a reporter for [TeamCity](https://www.jetbrains.com/teamcity/) build server.

Usage
-----

```
var gulp = require('gulp');
var ts = require('gulp-typescript');
var reporter = require('gulp-typescript-teamcity');

gulp.task('default', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }, {}, reporter))
        .pipe(gulp.dest('built/local'));
});
```

License
-----

gulp-typescript-teamcity is licensed under the MIT license.