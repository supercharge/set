# Changelog


## [1.4.0](https://github.com/supercharge/set/compare/v1.3.0...v1.4.0) - 2020-10-12

### Added
- `concat(...values)` method: add an array or individual values to a set
- `count(predicate)` method: returns the number of items matching the given `predicate` function

### Updated
- bump dependencies
- refine package description in README


## [1.3.0](https://github.com/supercharge/set/compare/v1.2.0...v1.3.0) - 2020-08-31

### Added
- `flatten()` method: flatten the set one level deep
- `flatMap(transform)` method: returns a new set instance from applying the given `transform` function on each item in the source set and ultimately collapsing the result
- generate HTML coverage report from jest


## [1.2.0](https://github.com/supercharge/set/compare/v1.1.0...v1.2.0) - 2020-08-21

### Updated
- bump dependencies
- change `main` entrypoint in `package.json` to `dist` folder
- devDependencies: move test runner from `@hapi/lab` to `jest`

### Removed
- remove `index.js` file which acted as a middleman to export from `dist` folder


## [1.1.0](https://github.com/supercharge/set/compare/v1.0.0...v1.1.0) - 2020-08-05

### Added
- implement the `Iterable` interface via `[Symbol.iterator]` to allow iterators and `for..of` loops

### Updated
- bump dependencies


## 1.0.0 - 2020-07-23

### Added
- `1.0.0` release 🚀 🎉
