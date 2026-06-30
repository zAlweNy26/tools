/**
 * Interface for data structures.
 * @group Interfaces
 */
export interface Structure {
  /**
   * Clears the structure.
   */
  clear: () => void
  /**
   * The current number of elements in the structure.
   */
  size: () => number
}
