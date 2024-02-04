'use strict'

import { ItemComperator } from './comparator'

type Values<T> = Array<T | Iterable<T> | undefined | null>

export class SuperchargedSet<T> implements Iterable<T> {
  /**
   * Contains the items in the set.
   */
  private set: Set<T>

  /**
   * Create a new set instance.
   */
  constructor (...items: Values<T>) {
    this.set = new Set()

    this.add(...items)
  }

  /**
   * Create a new set instance of the given `values`.
   */
  static from<T> (...values: Values<T>): SuperchargedSet<T> {
    return new this<T>(...values)
  }

  /**
   * Returns an iterable of the values in the set.
   */
  [Symbol.iterator] (): IterableIterator<T> {
    return this.values()
  }

  /**
   * Adds the given `values` to the set.
   */
  add (...values: Values<T>): this {
    for (const value of this.resolveValues(...values)) {
      if (this.isMissing(value)) {
        this.set.add(value)
      }
    }

    return this
  }

  /**
   * Returns a flat array of items removing `undefined` and `null` values.
   */
  private resolveValues (...values: Values<T>): T[] {
    return values
      .filter(value => {
        return value !== undefined && value !== null
      })
      .flatMap(value => {
        if (Array.isArray(value)) {
          return value
        }

        if (typeof value === 'string') {
          return value
        }

        if (this.isIterable(value)) {
          return Array.from(value)
        }

        return ([] as T[]).concat(value ?? [])
      })
  }

  /**
   * Determine whether the given `value` is iterable.
   */
  private isIterable (value: any): value is Iterable<T> {
    return Array.from(value).length > 0
  }

  /**
   * Determine whether all items in the set match the given `predicate` function.
   */
  all (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): boolean {
    return this.toArray().every((value, index) => {
      return predicate(value, index, this)
    })
  }

  /**
   * Determine whether at least one item in the set matches the given `predicate` function.
   */
  any (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): boolean {
    return this.findIndex(predicate) !== -1
  }

  /**
   * Returns the value at the given `index` or undefined if the index exceeds the set’s size.
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
   */
  clear (): this {
    this.set.clear()

    return this
  }

  /**
   * Appends values to the end of the array.
   */
  concat (...values: Array<T | T[]>): SuperchargedSet<T> {
    return SuperchargedSet.from(
      this.toArray().concat(...values)
    )
  }

  /**
   * Returns the number of items matching the given `predicate`. Returns the
   * set’s `size` if you don’t provide a predicate function.
   */
  count<S extends T> (predicate?: (item: T, index: number, set: SuperchargedSet<T>) => item is S): number {
    return typeof predicate === 'function'
      ? this.filter(predicate).size()
      : this.size()
  }

  /**
   * Delete the given `value` from the set.
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
   */
  findIndex (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): number
  findIndex<S extends T> (predicate: (item: T, index: number, set: SuperchargedSet<T>) => item is S): number
  findIndex (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): number {
    return this.toArray().findIndex((value, index) => {
      return predicate(value, index, this)
    })
  }

  /**
   * Returns the last item in the set matching the given `predicate`
   * function. Returns `undefined` if no item was found in the set.
   */
  findLast<S extends T> (predicate: (item: T, index: number, set: SuperchargedSet<T>) => item is S): S | undefined
  findLast (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): T | undefined
  findLast (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): T | undefined {
    for (let index = this.size() - 1; index >= 0; index--) {
      const item = this.at(index) as T

      if (predicate(item, index, this)) {
        return item
      }
    }

    return undefined
  }

  /**
   * Returns the index of the last item in the set that matches the
   * given `predicate` function. Returns -1 otherwise.
   */
  findLastIndex<S extends T> (predicate: (item: T, index: number, set: SuperchargedSet<T>) => item is S): number
  findLastIndex (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): number
  findLastIndex (predicate: (item: T, index: number, set: SuperchargedSet<T>) => unknown): number {
    for (let index = this.size() - 1; index >= 0; --index) {
      const item = this.at(index) as T

      if (predicate(item, index, this)) {
        return index
      }
    }

    return -1
  }

  /**
   * Returns the first element of the set or returns the first item in
   * the set matching the given `predicate` function. Returns
   * `undefined` if no matching item is found or available.
   */
  first (predicate?: (item: T, index: number, set: SuperchargedSet<T>) => unknown): T | undefined {
    return predicate
      ? this.find(predicate)
      : this.at(0)
  }

  /**
   * Returns the last element of the set or returns the last item in
   * the set matching the given `predicate` function. Returns
   * `undefined` if no matching item is found or available. If no predicate
   * is given then the last item in the set is returned.
   */
  last (predicate?: (item: T, index: number, set: SuperchargedSet<T>) => unknown): T | undefined {
    return predicate
      ? this.findLast(predicate)
      : this.at(-1)
  }

  /**
   * Returns a new set instance containing the results of applying the
   * given `transform` function to each item in the set. Ultimately,
   * it flattens the mapped results one level deep.
   */
  flatMap<R> (transform: (item: T, index: number, set: SuperchargedSet<T>) => R): SuperchargedSet<R> {
    return this.map<R>((item, index) => {
      return transform(item, index, this)
    }).flatten()
  }

  /**
   * Flattens the items in the set one level deep.
   */
  flatten (): SuperchargedSet<T> {
    return SuperchargedSet.from(
      ([] as T[]).concat(...this.toArray())
    )
  }

  /**
   * Runs the given `action` on each item in the set.
   */
  forEach (action: (item: T, index: number, set: SuperchargedSet<T>) => void): void {
    this.toArray().forEach((item, index) => {
      action(item, index, this)
    })
  }

  /**
   * Determine whether the set contains the given `value`.
   */
  has (value: T): boolean {
    return !!this.find((item: T) => {
      return new ItemComperator(item).equals(value)
    })
  }

  /**
   * Returns true if an item in the set matches
   * the given `value` or `predicate`
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
   * Returns a set containing all items that are contained in all collections, this set and and the given `sets`.
   */
  intersect (...sets: Array<Iterable<T>>): SuperchargedSet<T> {
    return this.filter((value) => {
      return sets.every((set) => {
        for (const item of set) {
          if (new ItemComperator(item).equals(value)) {
            return true
          }
        }

        return false
      })
    })
  }

  /**
   * Determine whether the set is empty (contains no entries).
   */
  isEmpty (): boolean {
    return this.size() === 0
  }

  /**
   * Determine whether the set does not contain the given `value`.
   */
  isMissing (value: T): boolean {
    return !this.has(value)
  }

  /**
   * Determine whether the set is not empty (contains entries).
   */
  isNotEmpty (): boolean {
    return !this.isEmpty()
  }

  /**
   * Returns a string by concatenating all of the items using the given `separator`.
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
   */
  reduce<U>(operation: (previous: U, current: T, index: number, set: SuperchargedSet<T>) => U, initial: U): U {
    return this.toArray().reduce((carry, value, index) => {
      return operation(carry, value, index, this)
    }, initial)
  }

  /**
   * Returns a set containing the items in reversed order.
   */
  reverse (): SuperchargedSet<T> {
    return SuperchargedSet.from(
      this.toArray().reverse()
    )
  }

  /**
   * Returns the size of the set.
   */
  size (): number {
    return this.set.size
  }

  /**
   * Sort the set using a given `compareFn`. The compare function determines
   * the order by it’s return value:
   *   - a negative value if the first argument is less than second argument
   *   - zero if they're equal
   *   - a positive value if the second argument is larger than the first argument
   *
   * If the `compareFn` is omitted, the elements are sorted in ascending order.
   */
  sort (compareFn?: (a: T, b: T) => number): SuperchargedSet<T> {
    return SuperchargedSet.from(
      this.toArray().sort(compareFn)
    )
  }

  /**
   * Transforms this set into an array.
   */
  toArray (): T[] {
    return Array.from(this)
  }

  /**
   * Returns an iterable of values in the set.
   */
  values (): IterableIterator<T> {
    return this.set.values()
  }
}
