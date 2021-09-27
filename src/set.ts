'use strict'

import { ItemComperator } from './comparator'

type ItemType<T> = T | T[] | null | undefined

export class SuperchargedSet<T> implements Iterable<T> {
  /**
   * Contains the items in the set.
   */
  private set: Set<T>

  /**
   * Create a new set instance.
   *
   * @param items
   */
  constructor (...items: Array<ItemType<T>>) {
    this.set = new Set()

    this.add(...items)
  }

  /**
   * Create a new set instance of the given `values`.
   *
   * @param {Iterable} values
   *
   * @returns {SuperchargedSet}
   *
   * @deprecated use `Set.from()` instead
   */
  static of<T> (...values: Array<ItemType<T>>): SuperchargedSet<T> {
    return this.from(...values)
  }

  /**
   * Create a new set instance of the given `values`.
   *
   * @param {Iterable} values
   *
   * @returns {SuperchargedSet}
   */
  static from<T> (...values: Array<ItemType<T>>): SuperchargedSet<T> {
    return new this<T>(...values)
  }

  /**
   * Returns an iterable of the values in the set.
   *
   * @returns {IterableIterator}
   */
  [Symbol.iterator] (): IterableIterator<T> {
    return this.values()
  }

  /**
   * Adds the given `values` to the set.
   *
   * @param {*} values
   *
   * @returns {SuperchargedSet}
   */
  add (...values: Array<ItemType<T>>): this {
    for (const value of this.resolveValues(...values)) {
      if (this.isMissing(value)) {
        this.set.add(value)
      }
    }

    return this
  }

  /**
   * Returns a flat array of items removing `undefined` and `null` values.
   *
   * @param values
   *
   * @returns {T[]}
   */
  private resolveValues (...values: Array<ItemType<T>>): T[] {
    return values
      .filter((value): value is T | T[] => {
        return value !== undefined && value !== null
      })
      .flatMap(value => {
        return Array.isArray(value)
          ? value
          : [value]
      })
  }

  /**
   * Returns the value at the given `index` or undefined if the index exceeds the set’s size.
   *
   * @param {Number} index
   *
   * @returns {T|undefined}
   */
  at (index: number): T | undefined {
    index = Math.trunc(index) || 0

    if (index < 0) {
      index += this.size()
    }

    if (index < 0 || index >= this.size()) {
      return undefined
    }

    return this.toArray()[index]
  }

  /**
   * Clears the set by removing all items.
   *
   * @returns {SuperchargedSet}
   */
  clear (): this {
    this.set.clear()

    return this
  }

  /**
   * Appends values to the end of the array.
   *
   * @param {*} values
   *
   * @returns {SuperchargedSet}
   */
  concat (...values: Array<T | T[]>): SuperchargedSet<T> {
    return SuperchargedSet.from(
      this.toArray().concat(...values)
    )
  }

  /**
   * Returns the number of items matching the given `predicate`.
   *
   * @param {Function} predicate
   *
   * @returns {Number}
   */
  count<S extends T> (predicate: (item: T, index: number, set: SuperchargedSet<T>) => item is S): number {
    return this.filter(predicate).size()
  }

  /**
   * Delete the given `value` from the set.
   *
   * @param {*} value
   *
   * @returns {SuperchargedSet}
   */
  delete (value: T): SuperchargedSet<T> {
    this.set = new Set(
      this.filter(item => {
        return new ItemComperator(item).notEquals(value)
      }).toArray()
    )

    return this
  }

  /**
   * Returns a set containing only items matching the given `predicate`.
   *
   * @param {Function} predicate
   *
   * @returns {SuperchargedSet}
   */
  filter (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): SuperchargedSet<T>
  filter<S extends T> (predicate: (item: T, index: number, set: SuperchargedSet<T>) => item is S): SuperchargedSet<T>
  filter (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): SuperchargedSet<T> {
    return SuperchargedSet.from(
      this.toArray().filter((value, index) => {
        return predicate(value, index, this)
      })
    )
  }

  /**
   * Returns the first item in the set matching the given `predicate`
   * function, or `undefined` if no such item was found.
   *
   * @param {Function} predicate
   *
   * @returns {*}
   */
  find (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): T | undefined
  find<S extends T> (predicate: (item: T, index: number, set: SuperchargedSet<T>) => item is S): S | undefined
  find (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): T | undefined {
    return this.toArray().find((value, index) => {
      return predicate(value, index, this)
    })
  }

  /**
   * Returns the index of the first element in the set where the
   * given `predicate` function is `true`. Returns -1 otherwise.
   *
   * @param {Function} predicate
   *
   * @returns {Number}
   */
  findIndex (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): number
  findIndex<S extends T> (predicate: (item: T, index: number, set: SuperchargedSet<T>) => item is S): number
  findIndex (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): number {
    return this.toArray().findIndex((value, index) => {
      return predicate(value, index, this)
    })
  }

  /**
   * Returns the first element of the set or returns the first item in
   * the set matching the given `predicate` function. Returns
   * `undefined` if no matching item is found or available.
   *
   * @param {Function} predicate
   *
   * @returns {*}
   */
  first (predicate?: (item: T, index: number, set: SuperchargedSet<T>) => unknown): T | undefined {
    return predicate
      ? this.find(predicate)
      : this.at(0)
  }

  /**
   * Returns the last element of the set or returns the last item in
   * the set matching the given `predicate` function. Returns
   * `undefined` if no matching item is found or available.
   *
   * @param {Function} predicate
   *
   * @returns {*}
   */
  last (predicate?: (item: T, index: number, set: SuperchargedSet<T>) => unknown): T | undefined {
    return predicate
      ? this.reverse().find(predicate)
      : this.at(-1)
  }

  /**
   * Returns a new set instance containing the results of applying the
   * given `transform` function to each item in the set. Ultimately,
   * it flattens the mapped results one level deep.
   *
   * @param {Function} transform
   *
   * @returns {Array}
   */
  flatMap<R> (transform: (item: T, index: number, set: SuperchargedSet<T>) => R): SuperchargedSet<R> {
    return this.map<R>((item, index) => {
      return transform(item, index, this)
    }).flatten()
  }

  /**
   * Flattens the items in the set one level deep.
   *
   * @returns {SuperchargedSet}
   */
  flatten (): SuperchargedSet<T> {
    return SuperchargedSet.from(
      ([] as T[]).concat(...this.toArray())
    )
  }

  /**
   * Runs the given `action` on each item in the set.
   *
   * @param {Function} action
   */
  forEach (action: (item: T, index: number, set: SuperchargedSet<T>) => void): void {
    this.toArray().forEach((item, index) => {
      action(item, index, this)
    })
  }

  /**
   * Determine whether the set contains the given `value`.
   *
   * @param {*} value
   *
   * @returns {Boolean}
   */
  has (value: T): boolean {
    return !!this.find((item: T) => {
      return new ItemComperator(item).equals(value)
    })
  }

  /**
   * Returns true if an item in the set matches
   * the given `value` or `predicate`
   *
   * @param {Function|T} valueOrPredicate
   *
   * @returns {boolean}
   */
  includes (value: T): boolean
  includes (predicate: (item: T, index: number) => boolean): boolean
  includes (valueOrPredicate: T | ((item: T, index: number) => boolean)): boolean {
    if (typeof valueOrPredicate !== 'function') {
      return this.has(valueOrPredicate)
    }

    return !!this.find((item, index) => {
      return (valueOrPredicate as ((item: T, index: number) => boolean))(item, index)
    })
  }

  /**
   * Determine whether the set is empty (contains no entries).
   *
   * @returns {Boolean}
   */
  isEmpty (): boolean {
    return this.size() === 0
  }

  /**
   * Determine whether the set does not contain the given `value`.
   *
   * @param {*} value
   *
   * @returns {Boolean}
   */
  isMissing (value: T): boolean {
    return !this.has(value)
  }

  /**
   * Determine whether the set is not empty (contains entries).
   *
   * @returns {Boolean}
   */
  isNotEmpty (): boolean {
    return !this.isEmpty()
  }

  /**
   * Returns a string by concatenating all of the items using the given `separator`.
   *
   * @param {String} separator
   *
   * @returns {String}
   */
  join (separator?: string): string
  join (separator?: (item: T, index: number, set: SuperchargedSet<T>) => string): string
  join (separator?: any): string {
    return typeof separator === 'function'
      ? this.map(separator).toArray().join('')
      : this.toArray().join(separator)
  }

  /**
   * Returns a new set instance containing the results of applying the
   * given `transform` function to each item in the set.
   *
   * @param {Function} transform
   *
   * @returns {Array}
   */
  map<R> (transform: (item: T, index: number, set: SuperchargedSet<T>) => R): SuperchargedSet<R> {
    return SuperchargedSet.from(
      this.toArray().map((value, index) => {
        return transform(value, index, this)
      })
    )
  }

  /**
   * Invokes the `operation` function on each item in the set. The return value
   * of the operation function is the accumulated result, and is provided as
   * an argument in the next call to the operation function.
   *
   * @param operation
   * @param initial
   *
   * @returns {*}
   */
  reduce<U>(operation: (previous: U, current: T, index: number, set: SuperchargedSet<T>) => U, initial: U): U {
    return this.toArray().reduce((carry, value, index) => {
      return operation(carry, value, index, this)
    }, initial)
  }

  /**
   * Returns a set containing the items in reversed order.
   *
   * @returns {SuperchargedSet}
   */
  reverse (): SuperchargedSet<T> {
    return SuperchargedSet.from(
      this.toArray().reverse()
    )
  }

  /**
   * Returns the size of the set.
   *
   * @returns {Number}
   */
  size (): number {
    return this.set.size
  }

  /**
   * Transforms this set into an array.
   *
   * @returns {Array}
   */
  toArray (): T[] {
    return Array.from(this.set)
  }

  /**
   * Returns an iterable of values in the set.
   *
   * @returns {IterableIterator}
   */
  values (): IterableIterator<T> {
    return this.set.values()
  }
}
