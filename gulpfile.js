const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css')
const gulppug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const image = require('gulp-image');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['docs', 'dev'])
 }

const pug =() => {
  return src('src/pug/*.pug')
    .pipe(gulppug({pretty:true}))
    .pipe(dest('dev'))
}

const pugBuild =() => {
  return src('src/pug/*.pug')
    .pipe(sourcemaps.init())
    .pipe(gulppug())
    .pipe(dest('docs'))
    .pipe(sourcemaps.write())
    .pipe(browserSync.stream())
}

const styles = () => {
  return src('src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dev/css/'))
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCSS({level: 2}))
    .pipe(sourcemaps.write())
    .pipe(dest('docs/css/'))
    .pipe(browserSync.stream())
}

const normalize = () => {
  return src('src/styles/normalize.css')
    .pipe(dest('dev/css/'))
    .pipe(dest('docs/css/'))
}

const scripts = () => {
  return src('src/js/main.js')
  .pipe(dest('dev/js'))
  .pipe(dest('docs/js'))
  .pipe(browserSync.stream())
}

const images = () => {
  return src([
   'src/img/**/*.jpg',
   'src/img/**/*.png',
   'src/img/svg/*.svg',
   'src/img/**/*.jpeg'
  ])
  .pipe(image())
  .pipe(dest('dev/images/'))
  .pipe(dest('docs/images/'))
 }

 const fonts = () => {
  return src([
    'src/fonts/**/*.woff',
    'src/fonts/**/*.woff2'
  ])
  .pipe(dest('dev/fonts/'))
  .pipe(dest('docs/fonts/'))
 }

const watchFiles = () => {
  browserSync.init({server: {baseDir: 'docs'}})
}

watch('src/pug/**/*.pug', pug)
watch('src/js/*.js', scripts)
watch('src/pug/**/*.pug', pugBuild)
watch('src/styles/**/*.scss', styles)
watch('src/styles/normalize.css', normalize)

exports.pug = pug
exports.clean = clean
exports.fonts = fonts
exports.styles = styles
exports.scripts = scripts
exports.pugBuild = pugBuild
exports.normalize = normalize
exports.default = series(clean, pug, pugBuild, images, fonts, styles, scripts, normalize, watchFiles)