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

    expect(users).to.equal(['Marcus', 'Norman', 'Christian'])
  })
})
