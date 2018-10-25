# Divine Engine

Master: [![Build Status](https://travis-ci.org/srepollock/divine-engine.svg?branch=master)](https://travis-ci.org/srepollock/divine-engine)
Develop: [![Build Status](https://travis-ci.org/srepollock/divine-engine.svg?branch=develop)](https://travis-ci.org/srepollock/divine-engine)

The Divine Engine is a Typescript-based JavaScript game engine. Built on latest technologies, it allows users to develop and deploy lightweight games in a modern development standard environment. The engine is focused to be modular and lightweight, all while allowing developers to quickly build projects and applications and reuse previous assets swiftly.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Documentation

Before you begin with the project, check out the Divine Engine's [API documentation](http://spollock.ca/divine-engine/docs) and learn what the engine has that you don't have to write. Also be sure to checkout the [wiki](https://github.com/srepollock/divine-engine/wiki) for additional information on the engine.

### Prerequisites

**Install NodeJS and npm**
Check out my tutorial on setting up a Typescript library, the first part of the tutorial goes over how to install NodeJS and npm [here](https://github.com/srepollock/ts-lib-tutorial).

### Installing

To use the Divine Engine, first setup a new NodeJS project

`mkdir temp-project && cd temp-project && npm init`

> Note: (use `npm init -y` for a basic setup).

Next install Typescript and the Divine Engine

`npm i -D typescript divine-engine`

Next, choose your platform you wish to deploy on: Angular2, Electron or setup a basic Webpage with a canvas.

Now you're all set and ready to go!

## Running the tests

Running the unit tests is simple when using node! All you need to call inside the project folder is:

```sh
npm test
```

> Note: each test must be passing before submitting a pull-request. Travis-CI will check unit tests before allowing admins to merge. More in [contributing](https://github.com/srepollock/divine-engine/blob/master/.github/CONTRIBUTING.md)

### Break down into end to end tests

The engine runs these unit tests on all core components. Through the methodology described in the [proposal](https://github.com/Goodgoodies/divine-engine/wiki/proposal), unit tests are crucial to the development of this project. Test cases are written before development, then functionality is written and tests are run to debug. This will ensure rigorous testing of the engines components and structure for a complete product.

### And coding style tests

Coding styles must be followed in this project. To ensure that users are following the standards, all pull requests will be run with the linting standards described in the [tslint.json](https://github.com/srepollock/divine-engine/blob/master/tslint.json) file.

### Built With

* [NodeJS](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [TypeScript](https://www.typescriptlang.org/)

## Contributing

Please read [CONTRIBUTING](https://github.com/srepollock/divine-engine/blob/master/.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/srepollock/divine-engine/tags). 

## Authors

[**Spencer Pollock**](https://github.com/srepollock)

See also the list of [contributors](https://github.com/Goodgoodies/divine-engine/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](https://github.com/srepollock/divine-engine/blob/master/LICENSE.md) file for details
