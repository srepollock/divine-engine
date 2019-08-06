# Divine Engine

[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Build Status](https://travis-ci.com/srepollock/divine-engine.svg?branch=master)](https://travis-ci.com/srepollock/divine-engine) [![Codecov](https://codecov.io/gh/srepollock/divine-engine/branch/master/graph/badge.svg)](https://codecov.io/gh/srepollock/divine-engine/branch/master/graph/badge.svg)  

---
The Divine Engine is a Typescript game engine built for developers - first and formost - on some of the [latest web libraries and frameworks](#built-with). The Divine Engine allows users to develop and deploy lightweight games in a modern development environment. The engine focuses on being modular and lightweight, all while allowing developers to quickly build projects and applications and begin buidling right out of the box.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Documentation

Before you begin with the project, check out the Divine Engine's [API documentation](http://spollock.ca/divine-engine/docs) and learn what the engine has that you don't have to write. Also be sure to checkout the [wiki](https://github.com/srepollock/divine-engine/wiki) for additional information on the engine.

### Prerequisites

* Install NodeJS and NPM
  > If you've never worked with NodeJS or NPM before, check out my tutorial on setting up a Typescript library. The first part of the tutorial goes over how to install NodeJS and NPM [here](https://github.com/srepollock/ts-lib-tutorial).
* Install all project dependencies

### Installing

To use the Divine Engine in your own project, first setup a new NodeJS project:

```sh
Documents/projects/> mkdir temp-project && cd temp-project && npm init
```

> Note: (use `npm init -y` for a basic setup).

Next install Typescript and the Divine Engine from NPM as project dependencies:

```sh
Documents/projects/> npm install typescript divine-engine
```

Now you can begin working with the Divine Engine in a new TypeScript file.

## Running the library unit tests

Running the unit tests is simple when using NPM, all you need to call inside the project folder is:

```sh
npm test
# Or one of it's variations:
# `npm run test:` and tab the rest out
```

> Note: each test must be passing before submitting a pull-request. Travis-CI will check unit tests before allowing admins to merge. More can be found in [CONTRIBUTING](https://github.com/srepollock/divine-engine/blob/master/.github/CONTRIBUTING.md)

### Break down into end-to-end tests

The engine runs these unit tests on all core components. Through the methodology described in the [proposal](https://github.com/Goodgoodies/divine-engine/wiki/proposal), unit tests are crucial to the development of this project. Test cases are written before code development, then functionality is written and tests are run to debug. This will ensure rigorous testing of the engines components and structure for a complete product.

### Code Linting

Coding styles must be followed in this project. To ensure that users are following the standards, all pull requests will be run with the linting standards described in the [tslint.json](https://github.com/srepollock/divine-engine/blob/master/tslint.json) file.

## Built With

* [NodeJS](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Rollup](https://rollupjs.org/guide/en)
* [Jest](https://jestjs.io/en/)
* [ThreeJS](https://threejs.org/)
* [HowlerJS](https://howlerjs.com/)
* [TravisCI](https://travis-ci.com/)

## Contributing

Please read [CONTRIBUTING](https://github.com/srepollock/divine-engine/blob/master/.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/srepollock/divine-engine/tags).

## Authors

[**Spencer Pollock**](https://github.com/srepollock)

See also the list of [contributors](https://github.com/Goodgoodies/divine-engine/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](https://github.com/srepollock/divine-engine/blob/master/LICENSE) file for details
