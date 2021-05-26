'use strict'

export class ItemComperator {
  /**
   * Stores the item that is being compared to a `candidate`.
   */
  private readonly item: any

  /**
   * Stores the candidate value that may be equal to the given `item`.
   */
  private candidate: any

  /**
   * Create a new comparator instance.
   */
  constructor (item: any) {
    this.item = item
    this.candidate = null
  }

  /**
   * Determine whether the given `candidate` is not deep-equal to the comparable `item`.
   *
   * @param {*} candidate
   *
   * @returns {Boolean}
   */
  notEquals (candidate: any): boolean {
    return !this.equals(candidate)
  }

  /**
   * Determine whether the given `candidate` is deep-equal to the comparable `item`.
   *
   * @param {*} candidate
   *
   * @returns {Boolean}
   */
  equals (candidate: any): boolean {
    this.candidate = candidate

    switch (true) {
      case this.isDifferentType(this.type(this.candidate)):
        return false

      case this.isType('array'):
        return this.arraysAreEqual()

      case this.isType('object'):
        return this.areObjectsEqual()

      case this.isType('function'):
        return this.areFunctionsEqual()

      default:
        return this.arePrimativesEqual()
    }
  }

  /**
   * Determine whether the given `type` is different than the one from the base item.
   *
   * @param {String} type
   *
   * @returns {Boolean}
   */
  isDifferentType (type: string): boolean {
    return !this.isType(type)
  }

  /**
   * Determine whether the base item has the given `type`.
   *
   * @param {String} type
   *
   * @returns {Boolean}
   */
  isType (type: string): boolean {
    return this.type(this.item) === type
  }

  /**
   * Returns the type of the given `item`
   *
   * @param {*} item
   *
   * @returns {String}
   */
  type (item: any): string {
    return Object.prototype.toString.call(item).slice(8, -1).toLowerCase()
  }

  /**
   * Determine whether the base item and the candidate are deeply equal arrays.
   *
   * @returns {Boolean}
   */
  arraysAreEqual (): boolean {
    if (this.item.length !== this.candidate.length) {
      return false
    }

    return Array.from(this.item).every((item, index) => {
      return new ItemComperator(item).equals(this.candidate[index])
    })
  }

  /**
   * Determine whether the base item and the candidate are deeply equal functions.
   *
   * @returns {Boolean}
   */
  areFunctionsEqual (): boolean {
    return this.item.toString() === this.candidate.toString()
  }

  /**
   * Determine whether the base item and the candidate are deeply equal objects.
   *
   * @returns {Boolean}
   */
  areObjectsEqual (): boolean {
    if (Object.keys(this.item).length !== Object.keys(this.candidate).length) {
      return false
    }

    return Object.keys(this.item).every(key => {
      return new ItemComperator(this.item[key]).equals(this.candidate[key])
    })
  }

  /**
   * Determine whether the base item and the candidate are deeply equal primitives.
   *
   * @returns {Boolean}
   */
  arePrimativesEqual (): boolean {
    return this.item === this.candidate
  }
}
exports.ValueComperator = ItemComperator
