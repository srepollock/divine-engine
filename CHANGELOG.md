# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.4.0](https://github.com/srepollock/divine-engine/compare/v0.0.1...v0.4.0) (2019-09-10)


### ⚠ BREAKING CHANGES

* **iosystem:** The tests now hang or fail. Working on resolving this as it's waiting for the
message system in other files that is not running and doesn't exist currently
* **src/test:** Tests fail, but red/green testing is good
* Removing references of Babel, using tsc, changing from Mocha/Chai to Jest
* **rollup:** Cannot read from src/core
* Tests do not build currently
* Tests do not run
* **messagesystem:** Unit tests are currently not running
* - Tests currently aren't building
* **engine:** Currently the unit tests do not run as the requestAnimationFrame does not exist in
Node

### Bug Fixes

* 🐛 postinstall creates the library ([7222a04](https://github.com/srepollock/divine-engine/commit/7222a04))
* **aimovements:** Updated the aimovementbehaviour ([1bb87af](https://github.com/srepollock/divine-engine/commit/1bb87af))
* **engine:** Updated the game loop ([525535e](https://github.com/srepollock/divine-engine/commit/525535e))
* Updated collision, sprite origins and zones ([cc90b46](https://github.com/srepollock/divine-engine/commit/cc90b46))
* **fragment shader:** Issues loading the shaders have been fixed ([2295f2a](https://github.com/srepollock/divine-engine/commit/2295f2a))
* This is not a fix. There are too many bugs to count. Working on changes now. ([99939ac](https://github.com/srepollock/divine-engine/commit/99939ac))
* **build:** Fixes failing build ([aeb1f93](https://github.com/srepollock/divine-engine/commit/aeb1f93))
* **rollup:** Fixed up Rollup pipeline ([56cb407](https://github.com/srepollock/divine-engine/commit/56cb407))


### build

* Major changes to the project ([f336fc6](https://github.com/srepollock/divine-engine/commit/f336fc6))
* Updated the build back to the old system ([c2da0e5](https://github.com/srepollock/divine-engine/commit/c2da0e5))


### Features

* 🎸 Updating postinstall and testings ([99182d3](https://github.com/srepollock/divine-engine/commit/99182d3))
* Bugs ([da62099](https://github.com/srepollock/divine-engine/commit/da62099))
* Zones, Collisions, Messages, Alpha version ([60460e3](https://github.com/srepollock/divine-engine/commit/60460e3))
* **behaviours:** GUI Behaviours have been added into the engine ([0d468ee](https://github.com/srepollock/divine-engine/commit/0d468ee))
* Major engine update ([78ea40a](https://github.com/srepollock/divine-engine/commit/78ea40a))
* Updated engines streams, worked on implementing them into the engine's message system ([8c1b6d7](https://github.com/srepollock/divine-engine/commit/8c1b6d7))
* **iosystem:** Working on getting file loading from the IOSystem ([7a151f8](https://github.com/srepollock/divine-engine/commit/7a151f8))
* **rendersystem:** Updating textures and tests ([817a5d6](https://github.com/srepollock/divine-engine/commit/817a5d6))
* Rendering and Sprites ([89d3bf0](https://github.com/srepollock/divine-engine/commit/89d3bf0))
* **engine:** Began creating the engine main loop ([764ac9d](https://github.com/srepollock/divine-engine/commit/764ac9d))
* **Engine:** Main loop ([adf1830](https://github.com/srepollock/divine-engine/commit/adf1830))
* **matrix3/4:** Created an inner Matrix3 / Matrix4 class ([8646f39](https://github.com/srepollock/divine-engine/commit/8646f39))
* **rendersystem:** Personal implementation of WebGL and Rendering ([fab9489](https://github.com/srepollock/divine-engine/commit/fab9489))
* **rendersystem:** ThreeJS is implemented and working ([aeb7197](https://github.com/srepollock/divine-engine/commit/aeb7197))
* **rendersystem:** Updated to use ThreeJS scene objects ([2263384](https://github.com/srepollock/divine-engine/commit/2263384))
* **scenemanager:** Added saving methods ([11fa84a](https://github.com/srepollock/divine-engine/commit/11fa84a))
* Logging system and message system as submodules ([f2b4515](https://github.com/srepollock/divine-engine/commit/f2b4515))
* RenderSystem BabylonJS integration ([451c4d7](https://github.com/srepollock/divine-engine/commit/451c4d7))


* **messagesystem:** Working on integrating the new message system into the project. ([d733407](https://github.com/srepollock/divine-engine/commit/d733407))
* **src/test:** Refactored Engine code and Tests ([ed5ea92](https://github.com/srepollock/divine-engine/commit/ed5ea92))
