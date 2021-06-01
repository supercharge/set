# Changelog


## [2.0.0](https://github.com/supercharge/set/compare/v1.9.0...v2.0.0) - 2021-xx-xx

### Added
- `isMissing(value)` method determining whether the given `value` is missing in the set
- `findIndex(predicate)` method determining the index of a given item. Returns `-1` if the item is not present in the set

### Updated
- bump dependencies

### Breaking Changes
- adding only items that are **not** deeply equal to each other
  ```js
  // 1.x
  const set = Set.of([{ name: 'Marcus' }])
  set.size() // 1
  set.add({ name: 'Marcus' })
  set.size() // 2 (because the objects are "not the same")

  // 2.x
  const set = Set.of([{ name: 'Marcus' }])
  set.size() // 1
  set.add({ name: 'Marcus' })
  set.size() // 1 (because the objects are "deeply equal")
  ```

- added `index` as the second argument of `find`, `map`, `flatMap`, `filter`, `forEach`, `first`, `last`, `count`, `includes`, `join`, `reduce`
  ```js
  // 1.x
  const set = Set.of(['Marcus', 'Norman', 'Christian'])
  set.map((name, set) => {}) // set were the second argument

  // 2.x
  const set = Set.of([{ name: 'Marcus' }])
  set.map((name, index, set) => {}) // index is the second argument, set becomes the third
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
