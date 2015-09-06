var gulp = require("gulp"),
	//sass = require('gulp-ruby-sass'),
	sass = require('gulp-sass'),
	please = require('gulp-pleeease'),
	autoprefixer = require("gulp-autoprefixer"),
	uglify = require("gulp-uglify"),
	browser = require("browser-sync"),
	plumber = require("gulp-plumber"),
	concat = require('gulp-concat'),
	runSequence = require('run-sequence'),
	reload = browser.reload,
	connect = require('gulp-connect-php'),
	header = require('gulp-header'),
	eslint = require('gulp-eslint'),
	babel = require('gulp-babel'),
	sourcemaps = require('gulp-sourcemaps'),
	imagemin = require("gulp-imagemin"),
	imageminPngquant = require('imagemin-pngquant'),
	del = require('del');
var DevDir = './src/',
	ReleaseDir = './release/',
	SassDir = './src/**/*.scss',
	CssDir = './src/assets/css',
	JsDir = './src/assets/js',
	Es6Dir = './src/**/*.es6',
	HtmlWatchdir = './src/**/*.html',
	CssWatchdir = './src/**/*.css',
	SassWatchdir = './src/**/*.scss',
	Es6Watchdir = './src/**/*.es6';
var paths = {
	commonDir : 'src/assets/img',
	miniDir : 'release/assets/img'
}
//---default task---
gulp.task('sass', function() {
    gulp.src(SassDir)
		.pipe(plumber())
    	.pipe(sass()) //出力形式の種類　#nested, compact, compressed, expanded.
		//.pipe(concat('concat.css'))
		.pipe(please({
			fallbacks: {
				autoprefixer: ['last 4 versions']
			},
			optimizers: {
				minifier: false
			}
		}))
    	.pipe(gulp.dest(DevDir))
		.pipe(browser.reload({stream:true}));
});
gulp.task('eslint', function () {
	return gulp.src([Es6Dir])
		.pipe(eslint({
			globals: {
				$: true,
				'jQuery':true
			}
		}))
		.pipe(eslint.format())
});
gulp.task("babel",['eslint'], function() {
    return gulp.src([Es6Dir])
		//.pipe(sourcemaps.init())
		.pipe(babel({ loose: "all" }))
		//.pipe(concat('concat.js'))
		//.pipe(uglify())
		.pipe(gulp.dest(DevDir))
		.pipe(browser.reload({stream:true}));
});
gulp.task("js",function() {
	gulp.src(["src/assets/js/src/**/*.js"])
		.pipe(plumber())
		.pipe(concat('main.js'))
		//.pipe(uglify())
		.pipe(gulp.dest(JsDir))

	gulp.src(["src/assets/js/libs/**/*.js"])
		.pipe(plumber())
		.pipe(concat('libs.js'))
		//.pipe(uglify())
		.pipe(gulp.dest(JsDir))
		.pipe(browser.reload({stream:true}));
});
gulp.task("reload",function() {
	gulp.src().pipe(browser.reload({stream:true}));
});
gulp.task("watch",['server'], function() {
	gulp.watch(Es6Watchdir,["babel"]);
	gulp.watch(SassWatchdir,["sass"]);
});
gulp.task("server", function() {
	browser({
		server: {
			baseDir: DevDir
		}
	});
	gulp.watch(HtmlWatchdir, reload);
	//gulp.watch(CssWatchdir, reload);
});
gulp.task('default', function(callback) {
	return runSequence(['sass','babel'],'js','watch',callback);
});
//---release task---
gulp.task('sass_release', function() {
    gulp.src(SassDir)
		.pipe(plumber())
    	.pipe(sass()) //出力形式の種類　#nested, compact, compressed, expanded.
		//.pipe(concat('concat.css'))
		.pipe(please({
			fallbacks: {
				autoprefixer: ['last 4 versions']
			},
			optimizers: {
				minifier: false
			}
		}))
    	.pipe(gulp.dest(DevDir))
});
gulp.task('eslint_release', function () {
	return gulp.src([Es6Dir])
		.pipe(eslint({
			globals: {
				$: true,
				'jQuery':true
			}
		}))
		.pipe(eslint.format())
});
gulp.task("babel_release",['eslint_release'], function() {
    return gulp.src([Es6Dir])
		.pipe(babel())
		//.pipe(concat('concat.js'))
		//.pipe(uglify())
		.pipe(gulp.dest(DevDir))
		.pipe(browser.reload({stream:true}));
});
gulp.task("js_release",function() {
	gulp.src(["src/assets/js/src/**/*.js"])
		.pipe(plumber())
		.pipe(concat('main.js'))
		//.pipe(uglify())
		.pipe(gulp.dest(JsDir))

	gulp.src(["src/assets/js/libs/**/*.js"])
		.pipe(plumber())
		.pipe(concat('libs.js'))
		//.pipe(uglify())
		.pipe(gulp.dest(JsDir))
		.pipe(browser.reload({stream:true}));
});
gulp.task('imagemin', function(){
	var srcGlob = paths.commonDir + '/**/*.+(jpg|jpeg|gif|svg)';
	var srcGlobPng = paths.commonDir + '/**/*.png';
	var dstGlob = paths.miniDir;
	var imageminOptions = {
		optimizationLevel: 7
	};
	gulp.src(srcGlob)
		.pipe(imagemin(imageminOptions))
		.pipe(gulp.dest( dstGlob ));
	gulp.src(srcGlobPng)
		.pipe(imageminPngquant({quality: '70', speed: 1})())
		.pipe(gulp.dest( dstGlob ));
});
gulp.task('deploy',function() {
	gulp.src(['./src/**','!./src/assets/js/libs/*.js','!./src/**/*.scss','!./src/**/*.es6'],
		{base:'src'})
		.pipe(gulp.dest('release'))
});
gulp.task('clean', function(cb) {
	del(['./release/assets/js/','tmp','**/*.log'], cb);
});
gulp.task('release', function(callback) {
	return runSequence(['sass_release','babel_release'],'js_release','deploy','imagemin','clean',callback);
});

