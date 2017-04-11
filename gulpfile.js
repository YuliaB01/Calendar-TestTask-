var gulp = require("gulp"),
    less = require("gulp-less"),
    nano = require("gulp-cssnano"),
    sourcemaps = require ("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    autoprefixer = require ("gulp-autoprefixer"),
    sync = require ("browser-sync").create();


gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});

gulp.task("css", function() {
    return gulp.src("src/css/main.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer("last 2 versions"))
        .pipe(nano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(sync.stream());
});

gulp.task("js", function() {
    return gulp.src("src/js/main.js")
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", ["build"], function() {
    sync.init({
        server: "dist"
    });
    gulp.watch("src/css/**/*.less", ["css"]);
    gulp.watch("dist/css/**/*.less", ["css"]).on("change", sync.reload);

    gulp.watch("src/js/*.js", ["js"]);
    gulp.watch("dist/js/*.js", ["js"]).on("change", sync.reload);

    gulp.watch("src/*.html", ["html"]);
    gulp.watch("dist/*.html", ["html"]).on("change", sync.reload);
});

gulp.task("build", ["html", "css", "js"]);
gulp.task("default", ["build", "watch"]);

