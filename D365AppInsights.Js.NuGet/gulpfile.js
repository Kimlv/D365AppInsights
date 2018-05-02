﻿/// <binding BeforeBuild='build:all' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    ts = require("gulp-typescript");

var paths = {
    root: ""
};

paths.jsDest = paths.root + "./content/D365AppInsightsJs";
paths.concatJsDest = paths.jsDest + "/lat_AiLogger.js";
paths.concatJsMinDest = paths.jsDest + "/lat_AiLogger.min.js";

gulp.task("build:ts", function () {
    var tsProject = ts.createProject("../D365AppInsights.Js/tsconfig.json");

    return tsProject.src().pipe(tsProject()).pipe(gulp.dest("../D365AppInsights.Js/js"));
});

gulp.task("move:js", ["build:ts"], function () {
    gulp.src([paths.root + "../D365AppInsights.Js/scripts/AiLogger.js", paths.root + "../D365AppInsights.Js/js/lat_AiLogger.js"])
        .pipe(concat(paths.concatJsDest))
        .pipe(gulp.dest(""));

    gulp.src("../D365AppInsights.Js/js/lat_AiLogger.d.ts").pipe(gulp.dest(paths.jsDest  + "/ts"));

    gulp.src("../D365AppInsights.Js/scripts/ai.1.0.15-build03916.d.ts").pipe(gulp.dest(paths.jsDest + "/ts"));
    gulp.src("../D365AppInsights.Js/scripts/ai.1.0.15-build03916.js").pipe(gulp.dest(paths.jsDest + "/scripts"));
    gulp.src("../D365AppInsights.Js/scripts/ai.1.0.15-build03916.min.js").pipe(gulp.dest(paths.jsDest + "/scripts"));
});

gulp.task("min:js", ["move:js"], function () {
    gulp.src([paths.root + "../D365AppInsights.Js/scripts/AiLogger.js", paths.root + "../D365AppInsights.Js/js/lat_AiLogger.js"])
        .pipe(sourcemaps.init())
        .pipe(concat(paths.concatJsMinDest))
        .pipe(gulp.dest(""))
        .pipe(uglify())
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest(""));
});

gulp.task("build:all", ["build:ts", "move:js", "min:js"]);