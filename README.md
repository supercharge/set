<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Sets</h3>
  </p>
  <p>
    An extended <code>Set</code> class for Node.js
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
    <a href="https://www.npmjs.com/package/@supercharge/sets"><img src="https://img.shields.io/npm/v/@supercharge/sets.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/sets"><img src="https://img.shields.io/npm/dm/@supercharge/sets.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
The `@supercharge/sets` package … tba.


## Installation

```
npm i @supercharge/sets
```


## Docs
Find all the [details for `@supercharge/sets` in the extensive Supercharge docs](https://superchargejs.com/docs/sets).


## Usage
Using `@supercharge/sets` is pretty straightforward

```js
const Set = require('@supercharge/sets')

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
