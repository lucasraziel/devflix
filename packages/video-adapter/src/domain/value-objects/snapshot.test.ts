import { describe, it } from 'node:test';
import assert from 'node:assert';
import Snapshot from './snapshot.js';

describe('Snapshot', () => {
  it('should create a new snapshot', () => {
    const snapshot = new Snapshot('/path/to/snapshot', 5);
    assert.strictEqual(
      snapshot.duration,
      5,
      'should be the same snapshot time'
    );
    assert.strictEqual(
      snapshot.path,
      '/path/to/snapshot',
      'should be the same snapshot path'
    );
  });
  describe('equals', () => {
    it('should compare equally snapshots with same values', () => {
      const snapshot = new Snapshot('/path/to/snapshot', 5);
      const snapshot2 = new Snapshot('/path/to/snapshot', 5);
      assert(snapshot.equals(snapshot2), 'should be equal');
    });
    it('should compare different snapshots with different values', () => {
      const snapshot = new Snapshot('/path/to/snapshot', 5);
      const snapshot2 = new Snapshot('/path/to/snapshot2', 2);
      assert(!snapshot.equals(snapshot2), 'should not be equal');
    });
    it('should compare different snapshots with different paths', () => {
      const snapshot = new Snapshot('/path/to/snapshot', 5);
      const snapshot2 = new Snapshot('/path/to/snapshot2', 5);
      assert(!snapshot.equals(snapshot2), 'should not be equal');
    });
    it('should compare different snapshots with different durations', () => {
      const snapshot = new Snapshot('/path/to/snapshot', 5);
      const snapshot2 = new Snapshot('/path/to/snapshot', 2);
      assert(!snapshot.equals(snapshot2), 'should not be equal');
    });
  });
});
