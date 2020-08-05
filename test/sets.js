'use strict'

const Set = require('..')
const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')

const { describe, it } = (exports.lab = Lab.script())

describe('Sets', () => {
  it('of', () => {
    expect(Set.of().isEmpty()).to.be.true()
    expect(Set.of([]).isEmpty()).to.be.true()
    expect(Set.of(null).isEmpty()).to.be.true()
    expect(Set.of(undefined).isEmpty()).to.be.true()

    expect(Set.of([1, 2, 3]).isEmpty()).to.be.false()
    expect(Set.of([1, 2, 3]).toArray()).to.equal([1, 2, 3])
  })

  it('clear', () => {
    const set = Set.of([1, 2])

    expect(set.size()).to.equal(2)
    expect(set.has(2)).to.be.true()

    set.clear()

    expect(set.size()).to.equal(0)
    expect(set.has(2)).to.be.false()
  })

  it('delete', () => {
    const set = Set.of([1, 2, 3])

    expect(set.has(1)).to.be.true()
    expect(set.size()).to.equal(3)

    set.delete(1)

    expect(set.has(1)).to.be.false()
    expect(set.size()).to.equal(2)
  })

  it('has', () => {
    const set = Set.of([1])

    expect(set.has(1)).to.be.true()

    expect(set.has()).to.be.false()
    expect(set.has(2)).to.be.false()
    expect(set.has(null)).to.be.false()
    expect(set.has(undefined)).to.be.false()
  })

  it('isEmpty', () => {
    const set = new Set()
    expect(set.isEmpty()).to.be.true()
  })

  it('isNotEmpty', () => {
    const set = new Set()
    expect(set.isEmpty()).to.be.true()

    set.add('Marcus')
    expect(set.isNotEmpty()).to.be.true()
  })

  it('toArray', () => {
    const set = new Set()
    set
      .add({ id: 1, name: 'Marcus' })
      .add({ id: 2, name: 'Norman' })
      .add({ id: 3, name: 'Christian' })

    expect(set.toArray).to.be.a.function()

    const marcus = set
      .toArray()
      .find(user => {
        return user.id === 1
      })

    expect(marcus).to.equal({ id: 1, name: 'Marcus' })
  })

  it('filter', () => {
    const set = new Set()
    set
      .add({ id: 1, name: 'Marcus' })
      .add({ id: 2, name: 'Norman' })
      .add({ id: 3, name: 'Christian' })

    expect(
      set.filter((value) => {
        return value.id < 3
      }).toArray()
    ).to.equal([
      { id: 1, name: 'Marcus' },
      { id: 2, name: 'Norman' }
    ])

    expect(
      set.filter((value) => {
        return value.id > 3
      }).size()
    ).to.equal(0)
  })

  it('find', () => {
    const set = new Set()
    set
      .add({ id: 1, name: 'Marcus' })
      .add({ id: 2, name: 'Norman' })
      .add({ id: 3, name: 'Christian' })

    expect(
      set.find((value) => value.name === 'Marcus')
    ).to.equal({ id: 1, name: 'Marcus' })

    expect(
      set.find((value) => value.name === 'Supercharge')
    ).to.be.undefined()
  })

  it('map', () => {
    const set = new Set()
    set
      .add({ id: 1, name: 'Marcus' })
      .add({ id: 2, name: 'Norman' })
      .add({ id: 3, name: 'Christian' })

    const users = set.map((value) => {
      return value.name
    })

    expect(users.has('Marcus')).be.true()
    expect(users.toArray()).to.equal(['Marcus', 'Norman', 'Christian'])
  })

  it('values', () => {
    const set = new Set()
    set
      .add({ id: 1, name: 'Marcus' })
      .add({ id: 2, name: 'Norman' })
      .add({ id: 3, name: 'Christian' })

    const iterator = set.values()

    expect(iterator.next().value.id).to.equal(1)
    expect(iterator.next().value.id).to.equal(2)
    expect(iterator.next().value.id).to.equal(3)
    expect(iterator.next().value).to.be.undefined()
  })

  it('for..of', () => {
    const iterable = Set.of([1, 1, 2, 2, 3, 3])
    const array = []

    for (const value of iterable) {
      array.push(value)
    }

    expect(array).to.equal([1, 2, 3])
  })

  it('Symbol.iterator', () => {
    const set = Set.of([1, 1, 2, 2, 3, 3])

    const iterable = set[Symbol.iterator]()
    expect(iterable.next).to.be.a.function()

    const array = []

    for (const value of iterable) {
      array.push(value)
    }

    expect(array).to.equal([1, 2, 3])
  })
})
