# The Ghost Word Game App
By Luis M Crosby R.

To run this app:
1. Please have the ghostwordapi app running at localhost:8083.
2. Run this angular app with $ng serve
3. Enjoy

Note:
A minimum of 3 letters has been configured for the evaluation to happen,
because there are some valid words with just 1 letter in the dictionary, like q, e, et al,
and this would not be a fun game if it ended so fast.

The computer player is not provided with any intelligence at this point.
It will only provide random letters.
For some intelligence, it would me feasible to implement with a local database to query and some tries
allowed for access.

Luis M Crosby Reategui.
30SET2019


# GhostWordGameApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

