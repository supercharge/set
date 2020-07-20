'use strict'

export class SuperchargedSet<T> extends Set<T> {
  /**
   * Determine whether the set is empty (contains no entries).
   *
   * @returns {Boolean}
   */
  isEmpty (): boolean {
    return this.size === 0
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
   * Transforms this set into an array.
   *
   * @returns Array
   */
  toArray (): T[] {
    return Array.from(this)
  }

  /**
   * Returns the first item in the set matching the given `predicate`
   * function, or `undefined` if no such item was found.
   *
   * @param predicate
   *
   * @returns {*}
   */
  find (predicate: (item: T) => T | undefined): T | undefined {
    return this.toArray().find(predicate)
  }

  /**
   * Returns an array containing the results of applying the
   * given `transform` function to each item in the set.
   *
   * @param {Function} transform
   *
   * @returns {Array}
   */
  map<R> (transform: (item: T) => R): R[] {
    const results: R[] = []

    this.forEach((item) => {
      results.push(transform(item))
    })

    return results
  }
}
