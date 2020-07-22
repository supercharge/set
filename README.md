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
    The <code>Set</code> class JavaScript should have shipped
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
The `@supercharge/set` package provides a `Set` class with helpful methods like `.isEmpty()`, `.map(callback)`, `.filter(callback)`, `.find(callback)`, and many more.

**Notice:** the `@supercharge/set` package is not a drop-in replacement for the native `Set` clas shipped by JavaScript. JavaScript aligned the `Set` and `Map` classes. Aligning sets and maps felt wrong for me. In my opinion, sets are more in line with arrays, not with maps. That’s why this package exists.

**It’s the `Set` class JavaScript should have shipped.**


## Installation

```
npm i @supercharge/set
```


## Docs
Find all the [details for `@supercharge/set` in the extensive Supercharge docs](https://superchargejs.com/docs/sets).


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

users.isNotEmpty()
// true

const asArray = users.map(user => {
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
