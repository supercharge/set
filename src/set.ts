'use strict'

import { tap } from '@supercharge/goodies'

export class SuperchargedSet<T> implements Iterable<T> {
  /**
   * Contains the items in the set.
   */
  private readonly set: Set<T>

  /**
   * Create a new set instance.
   *
   * @param values
   */
  constructor (values?: Iterable<T>) {
    this.set = new Set(values)
  }

  /**
   * Create a new set instance of the given `values`.
   *
   * @param {Iterable} values
   *
   * @returns {SuperchargedSet}
   */
  static of<T> (values?: Iterable<T>): SuperchargedSet<T> {
    return new this<T>(values)
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
   * Adds the given `value` to the set.
   *
   * @param {*} value
   *
   * @returns {SuperchargedSet}
   */
  add (value: T): this {
    return tap(this, () => {
      this.set.add(value)
    })
  }

  /**
   * Clears the set by removing all items.
   *
   * @returns {SuperchargedSet}
   */
  clear (): this {
    return tap(this, () => {
      this.set.clear()
    })
  }

  /**
   * Appends values to the end of the array.
   *
   * @param {*} values
   *
   * @returns {SuperchargedSet}
   */
  concat (...values: Array<T | T[]>): SuperchargedSet<T> {
    return SuperchargedSet.of(
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
  count<S extends T> (predicate: (item: T) => item is S): number {
    return this.filter(predicate).size()
  }

  /**
   * Delete the given `value` from the set.
   *
   * @param {*} value
   *
   * @returns {Boolean}
   */
  delete (value: T): boolean {
    return this.set.delete(value)
  }

  /**
   * Returns a set containing only items matching the given `predicate`.
   *
   * @param {Function} predicate
   *
   * @returns {SuperchargedSet}
   */
  filter (predicate: (item: T, set: SuperchargedSet<T>) => unknown): SuperchargedSet<T>
  filter<S extends T> (predicate: (item: T, set: SuperchargedSet<T>) => item is S): SuperchargedSet<T>
  filter (predicate: (item: T, set: SuperchargedSet<T>) => unknown): SuperchargedSet<T> {
    return SuperchargedSet.of(
      this.toArray().filter(value => {
        return predicate(value, this)
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
  find (predicate: (item: T, set: SuperchargedSet<T>) => unknown): T | undefined
  find<S extends T> (predicate: (item: T, set: SuperchargedSet<T>) => item is S): S | undefined
  find (predicate: (item: T, set: SuperchargedSet<T>) => unknown): T | undefined {
    return this.toArray().find(value => {
      return predicate(value, this)
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
  first (predicate?: (item: T, set: SuperchargedSet<T>) => unknown): T | undefined {
    return predicate
      ? this.find(predicate)
      : this.toArray()[0]
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
  last (predicate?: (item: T, set: SuperchargedSet<T>) => unknown): T | undefined {
    return predicate
      ? this.reverse().find(predicate)
      : this.toArray().reverse()[0]
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
  flatMap<R> (transform: (item: T, set: SuperchargedSet<T>) => R): SuperchargedSet<R> {
    return this.map<R>((item: T) => {
      return transform(item, this)
    }).flatten()
  }

  /**
   * Flattens the items in the set one level deep.
   *
   * @returns {SuperchargedSet}
   */
  flatten (): SuperchargedSet<T> {
    return SuperchargedSet.of(
      ([] as T[]).concat(...this.toArray())
    )
  }

  /**
   * Runs the given `action` on each item in the set.
   *
   * @param {Function} action
   */
  forEach (action: (item: T, set: SuperchargedSet<T>) => void): void {
    this.set.forEach((value: T) => {
      action(value, this)
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
    return this.set.has(value)
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
  includes (predicate: (item: T) => boolean): boolean
  includes (valueOrPredicate: T | ((item: T) => boolean)): boolean {
    if (typeof valueOrPredicate !== 'function') {
      return this.has(valueOrPredicate)
    }

    return !!this.find(item => {
      return (valueOrPredicate as ((item: T) => boolean))(item)
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
   * Determine whether the set is not empty (contains entries).
   *
   * @returns {Boolean}
   */
  isNotEmpty (): boolean {
    return !this.isEmpty()
  }

  /**
   * Returns a new set instance containing the results of applying the
   * given `transform` function to each item in the set.
   *
   * @param {Function} transform
   *
   * @returns {Array}
   */
  map<R> (transform: (item: T, set: SuperchargedSet<T>) => R): SuperchargedSet<R> {
    return SuperchargedSet.of(
      this.toArray().map(value => {
        return transform(value, this)
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
  reduce<U>(operation: (previous: U, current: T, set: SuperchargedSet<T>) => U, initial: U): U {
    return this.toArray().reduce((carry: U, value: T) => {
      return operation(carry, value, this)
    }, initial)
  }

  /**
   * Returns a set containing the items in reversed order.
   *
   * @returns {SuperchargedSet}
   */
  reverse (): SuperchargedSet<T> {
    return SuperchargedSet.of(
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
