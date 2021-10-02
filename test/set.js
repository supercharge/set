'use strict'

const Set = require('../dist')
const { test } = require('uvu')
const expect = require('expect')

test('of', () => {
  expect(Set.of().toArray()).toEqual([])
  expect(Set.of([]).toArray()).toEqual([])
  expect(Set.of(null).toArray()).toEqual([])
  expect(Set.of(undefined).toArray()).toEqual([])

  expect(Set.of(1, 1, 2, 3).toArray()).toEqual([1, 2, 3])
  expect(Set.of([1, 1, 2, 3]).toArray()).toEqual([1, 2, 3])

  const users = [
    { name: 'Marcus' },
    { name: 'Norman' }
  ]

  expect(Set.of([
    { name: 'Marcus' },
    { name: 'Marcus' },
    { name: 'Norman' },
    { name: 'Norman' }
  ]).toArray()).toEqual(users)
})

test('from', () => {
  expect(Set.from().toArray()).toEqual([])
  expect(Set.from([]).toArray()).toEqual([])
  expect(Set.from(null).toArray()).toEqual([])
  expect(Set.from(undefined).toArray()).toEqual([])

  expect(Set.from(1, 1, 2, 3).toArray()).toEqual([1, 2, 3])
  expect(Set.from([1, 1, 2, 3]).toArray()).toEqual([1, 2, 3])

  const users = [
    { name: 'Marcus' },
    { name: 'Norman' }
  ]

  expect(Set.from([
    { name: 'Marcus' },
    { name: 'Marcus' },
    { name: 'Norman' },
    { name: 'Norman' }
  ]).toArray()).toEqual(users)
})

test('add', () => {
  const nums = Set.from(1, 2)
  expect(nums.add(1, 2, 3, 4).toArray()).toEqual([1, 2, 3, 4])

  const marcus = new User('Marcus')
  const norman = new User('Norman')

  const set = Set.from([marcus, marcus])
  expect(set.size()).toEqual(1)

  set.add(norman)
  expect(set.size()).toEqual(2)

  set.add(norman)
  expect(set.size()).toEqual(2)

  set.add(new User('Norman'))
  expect(set.size()).toEqual(2)

  set.add(new User('Norman').with('hair', 'long'))
  set.add(new User('Norman').with('hair', 'short'))
  expect(set.size()).toEqual(4)
})

test('clear', () => {
  const set = Set.from([1, 2])

  expect(set.size()).toEqual(2)
  expect(set.has(2)).toBe(true)

  set.clear()

  expect(set.size()).toEqual(0)
  expect(set.has(2)).toBe(false)
})

test('delete', () => {
  const marcus = { name: 'Marcus' }
  const norman = { name: 'Norman' }
  const set = Set.from([marcus, norman])

  expect(set.has(marcus)).toBe(true)
  expect(set.size()).toEqual(2)

  set.delete({ name: 'Marcus' })

  expect(set.has(marcus)).toBe(false)
  expect(set.size()).toEqual(1)
})

test('delete objects', () => {
  const marcus = new User('Marcus')
  const norman = new User('Norman')

  const set = Set.from([marcus, norman])

  expect(set.has(marcus)).toBe(true)
  expect(set.size()).toEqual(2)

  set.delete(marcus)

  expect(set.has(marcus)).toBe(false)
  expect(set.size()).toEqual(1)
})

test('flatten', () => {
  const set = Set.from([[1], 1, 22, true, [{}, 'Marcus', true], [22]]).flatten()

  expect(set.toArray()).toEqual(
    [1, 22, true, {}, 'Marcus']
  )
})

test('has', () => {
  const marcus = new User('Marcus')
  const norman = new User('Norman')
  const set = Set.from([1, marcus, norman])

  expect(set.has(1)).toBe(true)
  expect(set.has(marcus)).toBe(true)
  expect(set.has(norman)).toBe(true)

  expect(set.has()).toBe(false)
  expect(set.has(2)).toBe(false)
  expect(set.has(null)).toBe(false)
  expect(set.has(undefined)).toBe(false)
})

test('isMissing', () => {
  const marcus = new User('Marcus')
  const norman = new User('Norman')
  const set = Set.from([marcus, norman])

  expect(set.has(marcus)).toBe(true)
  expect(set.isMissing(marcus)).toBe(false)

  expect(set.isMissing()).toBe(true)
  expect(set.isMissing(2)).toBe(true)
  expect(set.isMissing(null)).toBe(true)
  expect(set.isMissing(undefined)).toBe(true)
})

test('includes', () => {
  const set = Set.from([1, 2, 3, 4, 5])

  expect(set.includes(1)).toBe(true)

  expect(set.includes()).toBe(false)
  expect(set.includes(6)).toBe(false)
  expect(set.includes(null)).toBe(false)
  expect(set.includes(undefined)).toBe(false)

  expect(
    set.includes(value => value > 3)
  ).toBe(true)
  expect(
    set
      .map(value => value * 2)
      .includes(value => value > 6)
  ).toBe(true)

  expect(
    set.includes(value => value === 0)
  ).toBe(false)
})

test('isEmpty', () => {
  const set = new Set()
  expect(set.isEmpty()).toBe(true)
})

test('isNotEmpty', () => {
  const set = new Set()
  expect(set.isEmpty()).toBe(true)

  set.add('Marcus')
  expect(set.isNotEmpty()).toBe(true)
})

test('toArray', () => {
  const set = new Set()
  set
    .add({ id: 1, name: 'Marcus' })
    .add({ id: 2, name: 'Norman' })
    .add({ id: 3, name: 'Christian' })

  expect(set.toArray).toBeInstanceOf(Function)

  const marcus = set
    .toArray()
    .find(user => {
      return user.id === 1
    })

  expect(marcus).toEqual({ id: 1, name: 'Marcus' })
})

test('filter', () => {
  const set = new Set()
  set
    .add({ id: 1, name: 'Marcus' })
    .add({ id: 2, name: 'Norman' })
    .add({ id: 3, name: 'Christian' })

  expect(
    set.filter((value) => {
      return value.id < 3
    }).toArray()
  ).toEqual([
    { id: 1, name: 'Marcus' },
    { id: 2, name: 'Norman' }
  ])

  expect(
    set.filter((value) => {
      return value.id > 3
    }).size()
  ).toEqual(0)
})

test('find', () => {
  const set = Set.from([
    { id: 1, name: 'Marcus' },
    { id: 2, name: 'Norman' },
    { id: 3, name: 'Christian' }
  ])

  expect(
    set.find((value) => value.name === 'Marcus')
  ).toEqual({ id: 1, name: 'Marcus' })

  expect(
    set.find((value) => value.name === 'Supercharge')
  ).toBeUndefined()
})

test('findIndex', () => {
  const set = Set.from([
    { id: 1, name: 'Marcus' },
    { id: 2, name: 'Norman' },
    { id: 3, name: 'Christian' }
  ])

  expect(
    set.findIndex((value) => value.name === 'Norman')
  ).toEqual(1)

  expect(
    set.findIndex((value) => value.name === 'Supercharge')
  ).toEqual(-1)
})

test('forEach', () => {
  const set = Set.from([1, 2, 3])

  const result = set.forEach((value, _index, originalSet) => {
    expect(originalSet).toBe(set)
    return value.name
  })

  expect(result).toBe(undefined)
})

test('map', () => {
  const set = new Set()
  set
    .add({ id: 1, name: 'Marcus' })
    .add({ id: 2, name: 'Norman' })
    .add({ id: 3, name: 'Christian' })

  const users = set.map((value) => {
    return value.name
  })

  expect(users.has('Marcus')).toBe(true)
  expect(users.toArray()).toEqual(['Marcus', 'Norman', 'Christian'])
})

test('flatMap', () => {
  const set = new Set()
  set
    .add({ id: 1, name: 'Marcus', tags: ['javascript', 'node', 'hapi', ['pm2', 'server']] })
    .add({ id: 2, name: 'Norman', tags: ['python', 'node', 'android'] })
    .add({ id: 3, name: 'Christian', tags: ['javascript', 'node'] })

  const tags = set.flatMap((value) => {
    return value.tags
  })

  expect(tags.toArray()).toEqual(['javascript', 'node', 'hapi', ['pm2', 'server'], 'python', 'android'])
})

test('values', () => {
  const set = new Set()
  set
    .add({ id: 1, name: 'Marcus' })
    .add({ id: 2, name: 'Norman' })
    .add({ id: 3, name: 'Christian' })

  const iterator = set.values()

  expect(iterator.next().value.id).toEqual(1)
  expect(iterator.next().value.id).toEqual(2)
  expect(iterator.next().value.id).toEqual(3)
  expect(iterator.next().value).toBeUndefined()
})

test('for..of', () => {
  const iterable = Set.from([1, 1, 2, 2, 3, 3])
  const array = []

  for (const value of iterable) {
    array.push(value)
  }

  expect(array).toEqual([1, 2, 3])
})

test('Symbol.iterator', () => {
  const set = Set.from([1, 1, 2, 2, 3, 3])

  const iterable = set[Symbol.iterator]()
  expect(iterable.next).toBeInstanceOf(Function)

  const array = []

  for (const value of iterable) {
    array.push(value)
  }

  expect(array).toEqual([1, 2, 3])
})

test('reduce', () => {
  const set = Set.from([1, 2, 3, 4, 5])
  expect(set.reduce((sum, value) => sum + value)).toBe(NaN)

  expect(set.reduce((sum, value) => sum + value, 0)).toBe(15)
  expect(set.reduce((sum, value) => sum + value, 5)).toBe(20)

  const emptySet = Set.from([])
  expect(emptySet.reduce((sum, value) => sum + value, 5)).toBe(5)

  expect(() => Set.from([1, 2, 3]).reduce((sum, value) => {
    if (value === 2) {
      throw new TypeError('failed')
    }

    return sum + value
  }, 5)).toThrow(TypeError)
})

test('concat', () => {
  expect(
    Set.from([1, 2, 3]).concat([4, 5]).toArray()
  ).toEqual([1, 2, 3, 4, 5])

  expect(
    Set.from([1, 2, 3]).concat([4, 5], [6, 7]).toArray()
  ).toEqual([1, 2, 3, 4, 5, 6, 7])

  expect(
    Set.from([1, 2, 3]).concat(4, 5).toArray()
  ).toEqual([1, 2, 3, 4, 5])
})

test('count', () => {
  expect(
    Set
      .of([1, 2, 3, 4, 5])
      .map(num => num * 2)
      .count(value => value > 6)
  ).toEqual(2)

  expect(
    Set
      .of([1, 2, 3, 4, 5])
      .count(num => num > 5)
  ).toEqual(0)
})

test('first', () => {
  expect(
    Set
      .of([1, 2, 3])
      .first()
  ).toEqual(1)

  expect(
    Set
      .of([1, 2, 3, 4, 5])
      .first(value => {
        return value > 3
      })
  ).toEqual(4)
})

test('last', () => {
  expect(
    Set
      .of([1, 2, 3])
      .last()
  ).toEqual(3)

  expect(
    Set
      .of([5, 4, 3, 2, 1])
      .last(value => {
        return value > 3
      })
  ).toEqual(4)
})

test('reverse', () => {
  const expectedSet = Set.from([3, 2, 1])

  expect(
    Set
      .of([1, 2, 3])
      .reverse()
  ).toEqual(expectedSet)
})

test('at', () => {
  expect(
    Set.from([1, 2, 3]).at(0)
  ).toEqual(1)

  expect(
    Set.from([1, 2, 3]).at(-1)
  ).toEqual(3)

  expect(
    Set.from([1, 2, 3]).at(10)
  ).toEqual(undefined)
})

test('join', () => {
  expect(
    Set.from([1, 2, 3]).join()
  ).toEqual('1,2,3')

  expect(
    Set.from([1, 2, 3]).join(', ')
  ).toEqual('1, 2, 3')

  expect(
    Set.from([1, 2, 3]).join('')
  ).toEqual('123')

  expect(
    Set.from([1, 2, 3]).map(value => value * 2).join('--')
  ).toEqual('2--4--6')

  expect(
    Set.from(['name', 'title']).join(item => {
      return `<${item}> `
    })
  ).toEqual('<name> <title> ')

  expect(
    Set.from([1, 2, 3]).join(num => {
      return num
    })
  ).toEqual('123')
})

test('handle objects', () => {
  const tutorial = { title: 'Supercharge is sweet!' }

  const marcus = {
    name: 'Marcus',
    setName (name) { this.name = name },
    tutorials: [tutorial]
  }

  const norman = {
    name: 'Norman',
    setName (name) { this.name = name },
    tutorials: [tutorial, tutorial],
    tutorialCount: 2
  }

  const set = Set.from([marcus, marcus])
  expect(set.size()).toEqual(1)

  set.add(marcus).add(norman)
  expect(set.size()).toEqual(2)

  set.add({
    name: 'Marcus',
    setName (name) { this.name = name },
    tutorials: [tutorial]
  })

  expect(set.size()).toEqual(2)
})

test('findLast', () => {
  const ids = Set.from(1, 2, 3, 4)
  expect(ids.findLast(id => id < 5)).toBe(4)
  expect(ids.findLast(id => id > 3)).toBe(4)
  expect(ids.findLast(id => id > 10)).toBeUndefined()

  const christian = { id: 3, name: 'Christian', subscribed: true }
  const set = Set.from([
    { id: 1, name: 'Marcus', subscribed: true },
    { id: 2, name: 'Norman', subscribed: true },
    christian
  ])

  expect(set.findLast((value) => value.subscribed)).toEqual(christian)
  expect(set.findLast((value) => value.name === 'Supercharge')).toBeUndefined()

})

test('intersect', () => {
  const ids = Set.from(1, 2, 3, 4)

  expect(
    ids.intersect(Set.from([5])).toArray()
  ).toEqual([])
  expect(
    ids.intersect(Set.from(2, 3)).toArray()
  ).toEqual([2, 3])
  expect(
    ids.intersect(Set.from([2, 3]), Set.from([1, 4, 5, 6])).toArray()
  ).toEqual([])
  expect(
    ids.intersect(Set.from([1, 2, 3]), Set.from([1, 3, 4, 5, 6])).toArray()
  ).toEqual([1, 3])

  const marcus = { id: 1, name: 'Marcus', subscribed: true }
  const norman = { id: 2, name: 'Norman', subscribed: true }
  const christian = { id: 3, name: 'Christian', subscribed: true }
  const supercharge = { id: 4, name: 'Supercharge', subscribed: true }

  const users = Set.from([marcus, norman, christian])

  expect(users.intersect(Set.from(christian)).toArray()).toEqual([christian])
  expect(users.intersect(Set.from(supercharge)).toArray()).toEqual([])
})

test.run()

class User {
  constructor (name) {
    this.meta = { name, characteristics: {} }
  }

  name () {
    return this.meta.name
  }

  with (characteristic, value) {
    this.meta.characteristics[characteristic] = value

    return this
  }
}
