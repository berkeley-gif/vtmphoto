# The `src` Directory

## Overview

The `src/` directory contains all code used in the application along with all
tests of such code.

```
src/
  |- app/
  |  |- about/
  |  |- home/
  |  |- app.js
  |  |- app.spec.js
  |- assets/
  |  |- font/
  |  |- css/
  |  |- img/
  |- common/
  |  |- directives/
  |  |- filters/
  |  |- services/
  |  |- resources/
  |- index.html
```

- `src/app/` - application-specific code, i.e. code not likely to be reused in
  another application. [Read more &raquo;](app/README.md)
- `src/assets/` - static files like fonts and images. 
  [Read more &raquo;](assets/README.md)
- `src/common/` - components likely to be reused in
  another application. [Read more &raquo;](common/README.md)
- `src/index.html` - this is the HTML document of the single-page application.
  See below.

See each directory for a detailed explanation.

## `index.html`

The `index.html` file is the HTML document of the single-page application (SPA)
that should contain all markup that applies to everything in the app, such as
the header and footer. It declares with `vtmPhotoApp` that this is `VTM Photos`,
specifies the main `AppCtrl` controller, and contains the `uiView` directive
into which route templates are placed.

Unlike any other HTML document (e.g. the templates), `index.html` is compiled as
a Grunt template, so variables from `Gruntfile.js` and `package.json` can be
referenced from within it. Changing `name` in `package.json` from
"ng-boilerplate" will rename the resultant CSS and JavaScript placed in `dist/`,
so this HTML references them by variable for convenience.
