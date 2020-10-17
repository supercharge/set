'use strict'

const Set = require('../dist')

describe('Sets', () => {
  test('of', () => {
    expect(Set.of().isEmpty()).toBe(true)
    expect(Set.of([]).isEmpty()).toBe(true)
    expect(Set.of(null).isEmpty()).toBe(true)
    expect(Set.of(undefined).isEmpty()).toBe(true)

    expect(Set.of([1, 2, 3]).isEmpty()).toBe(false)
    expect(Set.of([1, 2, 3]).toArray()).toEqual([1, 2, 3])
  })

  test('clear', () => {
    const set = Set.of([1, 2])

    expect(set.size()).toEqual(2)
    expect(set.has(2)).toBe(true)

    set.clear()

    expect(set.size()).toEqual(0)
    expect(set.has(2)).toBe(false)
  })

  test('delete', () => {
    const set = Set.of([1, 2, 3])

    expect(set.has(1)).toBe(true)
    expect(set.size()).toEqual(3)

    set.delete(1)

    expect(set.has(1)).toBe(false)
    expect(set.size()).toEqual(2)
  })

  test('flatten', () => {
    const set = Set.of([[1], 1, 22, true, [{}, 'Marcus', true], [22]]).flatten()

    expect(set.toArray()).toEqual(
      [1, 22, true, {}, 'Marcus']
    )
  })

  test('has', () => {
    const set = Set.of([1])

    expect(set.has(1)).toBe(true)

    expect(set.has()).toBe(false)
    expect(set.has(2)).toBe(false)
    expect(set.has(null)).toBe(false)
    expect(set.has(undefined)).toBe(false)
  })

  test('includes', () => {
    const set = Set.of([1, 2, 3, 4, 5])

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
    const set = Set.of([
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
    const iterable = Set.of([1, 1, 2, 2, 3, 3])
    const array = []

    for (const value of iterable) {
      array.push(value)
    }

    expect(array).toEqual([1, 2, 3])
  })

  test('Symbol.iterator', () => {
    const set = Set.of([1, 1, 2, 2, 3, 3])

    const iterable = set[Symbol.iterator]()
    expect(iterable.next).toBeInstanceOf(Function)

    const array = []

    for (const value of iterable) {
      array.push(value)
    }

    expect(array).toEqual([1, 2, 3])
  })

  test('concat', () => {
    expect(
      Set.of([1, 2, 3]).concat([4, 5]).toArray()
    ).toEqual([1, 2, 3, 4, 5])

    expect(
      Set.of([1, 2, 3]).concat([4, 5], [6, 7]).toArray()
    ).toEqual([1, 2, 3, 4, 5, 6, 7])

    expect(
      Set.of([1, 2, 3]).concat(4, 5).toArray()
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
})
