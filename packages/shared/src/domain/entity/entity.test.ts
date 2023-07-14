import { describe, it } from 'node:test';
import { isValid as isValidUlid } from 'ulidx';
import assert from 'node:assert';
import Entity from './entity.js';
import type UlidUniqueID from '../value-objects/ulid-unique-id.js';

class MockEntity extends Entity<{ name: string }> {
  constructor(name: string, id?: UlidUniqueID) {
    super({ name }, id);
  }

  public get name(): string {
    return this._dataModel.name;
  }

  public set name(name: string) {
    this._dataModel.name = name;
  }
}

describe('Entity', () => {
  describe('constructor', () => {
    it('should create an entity with an id', () => {
      const entity = new MockEntity('test');

      assert.strictEqual(entity.name, 'test');
      const { id } = entity.id;
      assert(isValidUlid(id), 'should be a valid ulid');
      assert(entity.dataModel.name, 'test');
    });
  });

  describe('equals', () => {
    it('should return true if two entities have the same id', () => {
      const entity = new MockEntity('test');
      const other = new MockEntity('test', entity.id);

      console.log(entity.id, other.id);
      assert.ok(entity.equals(other));
    });

    it('should return false if two entities have different id', () => {
      const entity = new MockEntity('test');
      const other = new MockEntity('test');

      assert.ok(!entity.equals(other));
    });
  });

  it('should be able to alter name', () => {
    const entity = new MockEntity('test');
    entity.name = 'test2';
    assert.strictEqual(entity.name, 'test2');
  });
});
