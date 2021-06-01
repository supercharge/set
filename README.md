<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Set</h3>
  </p>
  <p>
    An Array-aligned <code>Set</code> class and the one JavaScript should have shipped
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#Docs"><strong>Docs</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://www.npmjs.com/package/@supercharge/set"><img src="https://img.shields.io/npm/v/@supercharge/set.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/set"><img src="https://img.shields.io/npm/dm/@supercharge/set.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
The `@supercharge/set` package provides an improved [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) implementation.

- aligned with the `Array` class instead of `Map`
- provides helpful methods like `.map(callback)`, `.filter(callback)`, `.find(callback)`, `.isEmpty()`, and many more.
- compares values for `deep equality` and not `reference`
- it’s the `Set` class JavaScript should have shipped


## Installation

```
npm i @supercharge/set
```


## Resources

- [Documentation](https://superchargejs.com/docs/set).


## Usage
Using `@supercharge/set` is pretty straightforward. The package exports a `Set` class providing all methods to interact with the set.

```js
const Set = require('@supercharge/set')

const users = new Set()

users.isEmpty()
// true

users
  .add({ id: 1, name: 'Marcus' })
  .add({ id: 2, name: 'Norman' })
  .add({ id: 3, name: 'Christian' })
  .add({ id: 4, name: 'Marcus' })

users.isNotEmpty()
// true

const usernames = users.map(user => {
  return user.name
})
// [ 'Marcus', 'Norman', 'Christian' ]

const marcus = users.find(user => {
  return user.name === 'Marcus'
})
// { id: 1, name: 'Marcus' }
```


## Contributing
Do you miss a function? We very much appreciate your contribution! Please send in a pull request 😊

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License
MIT © [Supercharge](https://superchargejs.com)

---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@superchargejs](https://github.com/superchargejs/) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
