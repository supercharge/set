# Changelog


## [2.2.0](https://github.com/supercharge/set/compare/v2.1.0...v2.2.0) - 2021-11-08

### Added
- `all(predicate)`: determine whether all of the values in the set matches the given predicate function
- `any(predicate)`: determine whether at least one of the values in the set matches the given predicate function
- `findLast(predicate)`: returns the last item in the set matching the given predicate function
- `findLastIndex(predicate)`: returns the index of the last item in the set that matches the given `predicate` function, -1 otherwise
- `intersect(...collections)`: returns a set containing all items that are contained in all collections, this set and and the given `collections`

### Updated
- bump dependencies
- use `uvu` and `c8` instead of `jest` for testing
- `add(...values)` method now supports adding multiple values


## [2.1.0](https://github.com/supercharge/set/compare/v2.0.0...v2.1.0) - 2021-08-28

### Added
- `Set.from()` method to create a new set. This method aligns with JavaScript’s `Array.from` method

### Updated
- bump dependencies


## [2.0.0](https://github.com/supercharge/set/compare/v1.9.0...v2.0.0) - 2021-06-18

### Added
- `isMissing(value)` method determining whether the given `value` is missing in the set
- `findIndex(predicate)` method determining the index of a given item. Returns `-1` if the item is not present in the set

### Updated
- bump dependencies

### Breaking Changes
Starting in `2.x` we use a new comparison to determine whether an item exists in the Set. In contrast, in version `1.x` we relied on the native JavaScript `Set` class to ensure unique values in the set. But that didn’t work properly, for example when adding an object with the same values twice.

- a `set` contains only items that are **not deeply equal** to each other
  ```js
  // 2.x
  const set = Set.of([{ name: 'Marcus' }])
  set.size() // 1

  set.add({ name: 'Marcus' })
  set.size() // 1 (because the objects are "deeply equal")


  // 1.x
  const set = Set.of([{ name: 'Marcus' }])
  set.size() // 1

  set.add({ name: 'Marcus' })
  set.size() // 2 (because the objects are "not the same" reference)
  ```

- signature changes for a handful of methods: added `index` as the second argument of `find`, `map`, `flatMap`, `filter`, `forEach`, `first`, `last`, `count`, `includes`, `join`, `reduce`
  ```js
  // 2.x
  const set = Set.of(['Marcus', 'Norman', 'Christian'])
  set.map((name, index, set) => {}) // "index" is the second argument, "set" becomes the third

  // 1.x
  const set = Set.of(['Marcus', 'Norman', 'Christian'])
  set.map((name, set) => {}) // "set" was the second argument
  ```


## [1.9.0](https://github.com/supercharge/set/compare/v1.8.0...v1.9.0) - 2021-05-13

### Added
- allow callback method as a seperator for `join(separator?)`
  - Example:
  ```js
    Set.of(['name', 'title']).join(item => {
      return `<${item}> `
    })
    // '<name> <title> '
  ```

### Updated
- bump dependencies


## [1.8.0](https://github.com/supercharge/set/compare/v1.7.0...v1.8.0) - 2021-05-06

### Added
- `join(separator?)` method: returns a string of all items concatenated using the given `separator`.

### Updated
- bump dependencies


## [1.7.0](https://github.com/supercharge/set/compare/v1.6.0...v1.7.0) - 2021-05-03

### Added
- `at(index)` method: returns the item at the given `index`
- `first(predicate?)` method: returns the first item in the set or the first item matching the given `predicate` function

### Updated
- bump dependencies


## [1.6.0](https://github.com/supercharge/set/compare/v1.5.0...v1.6.0) - 2020-10-27

### Added
- `reduce()` method: works the same way as in arrays :)

### Updated
- bump dependencies
- improve typings of the `.filter()` method


## [1.5.0](https://github.com/supercharge/set/compare/v1.4.0...v1.5.0) - 2020-10-17

### Added
- `includes(value|predicate)` method: determine whether the set includes a given `value` or check if it includes a value by using a `predicate` function

### Updated
- bump dependencies
- improve typings of the `.find()` method


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
