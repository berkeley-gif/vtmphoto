/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js' ],
    jsunit: [ 'src/**/*.spec.js' ],

    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   */
  vendor_files: {
    js: [
      // Jquery
      'vendor/jquery/dist/jquery.min.js',    
      'vendor/jquery-ui/ui/minified/jquery-ui.min.js', 
      'vendor/jquery.ui.touch-punch.min.js', //enables touch support for jquery-ui widgets (slider)
      'vendor/jquery-throttle-debounce-plugin.js',
      'vendor/dragslider.js',
      // Bootstrap
      //'vendor/bootstrap/dist/js/bootstrap.js',

      // Angular
      'vendor/angular/angular.js',    

      //Other Angular modules
      //'vendor/angular-route/angular-route.js',
      //'vendor/angular-resource/angular-resource.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      //'vendor/angular-animate/angular-animate.js',
      'vendor/angular-ui-utils/ui-utils.js',
      'vendor/angular-ui-slider/src/slider.js',
      'vendor/angular-ui-bootstrap/ui-bootstrap-tpls-0.10.0.js',
      'vendor/angular-fullscreen/src/angular-fullscreen.js',
      'vendor/restangular/dist/restangular.js',
      'vendor/lodash/dist/lodash.js',

      // Leaflet
      'vendor/leaflet-dist/leaflet-src.js',     
      'vendor/leaflet.markercluster/dist/leaflet.markercluster-src.js',  
      'vendor/angular-leaflet-directive/dist/angular-leaflet-directive.js'
    ],
    css: [
      'vendor/leaflet-dist/leaflet.css',
      'vendor/flexslider/flexslider.css',
    ],
    assets: [

    ]
  },
};
