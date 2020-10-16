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
   * Returns a set containing only items matching the given `predicate`.
   *
   * @param {Function} predicate
   *
   * @returns {SuperchargedSet}
   */
  filter<S extends T> (predicate: (item: T, set: SuperchargedSet<T>) => item is S): SuperchargedSet<T> {
    const results: SuperchargedSet<T> = new SuperchargedSet()

    for (const value of this.set.values()) {
      if (predicate(value, this)) {
        results.add(value)
      }
    }

    return results
  }

  /**
   * Returns the first item in the set matching the given `predicate`
   * function, or `undefined` if no such item was found.
   *
   * @param {Function} predicate
   *
   * @returns {*}
   */
  find (predicate: (item: T, set: SuperchargedSet<T>) => T | undefined): T | undefined {
    for (const value of this.set.values()) {
      if (predicate(value, this)) {
        return value
      }
    }
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
   * Returns a new set instance containing the results of applying the
   * given `transform` function to each item in the set.
   *
   * @param {Function} transform
   *
   * @returns {Array}
   */
  map<R> (transform: (item: T, set: SuperchargedSet<T>) => R): SuperchargedSet<R> {
    const results: SuperchargedSet<R> = new SuperchargedSet()

    this.forEach((item) => {
      results.add(
        transform(item, this)
      )
    })

    return results
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
   * Returns the size of the set.
   *
   * @returns {Number}
   */
  size (): number {
    return this.set.size
  }

  /**
   * Returns an iterable of values in the set.
   *
   * @returns {IterableIterator}
   */
  values (): IterableIterator<T> {
    return this.set.values()
  }

  /**
   * Transforms this set into an array.
   *
   * @returns {Array}
   */
  toArray (): T[] {
    return Array.from(this.set)
  }

  reduce (operation: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T {
    return this.toArray().reduce(operation, initialValue)
  }

  /**
   * Appends values to the end of the array.
   *
   * @param {*} values
   *
   * @returns {SuperchargedSet}
   */
  concat (...values: Array<T | T[]>): SuperchargedSet<T> {
    return new SuperchargedSet<T>(
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
}
