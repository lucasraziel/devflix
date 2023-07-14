import {describe, it} from 'node:test';
import assert from 'node:assert';
import UlidUniqueID from './ulid-unique-id.js';
import {isValid as isValidUlid, ulid} from 'ulidx'

describe('UlidUniqueID', () => {
    it('should create a new id', () => {
        const id = new UlidUniqueID();
        assert(isValidUlid(id.id), 'should be a valid ulid')
        assert(isValidUlid(id.toString()), 'should be a valid ulid')
    });

    it('should create a new id with a given id', () => {
        const id = ulid();
        const ulidUniqueID = new UlidUniqueID(id);
        assert.strictEqual(ulidUniqueID.id, id, 'should be the same id');
    });

    it('should compare equally ids with same id', () => {
        const id = ulid();
        const ulidUniqueID = new UlidUniqueID(id);
        const ulidUniqueID2 = new UlidUniqueID(id);
        assert(ulidUniqueID.equals(ulidUniqueID2), 'should be equal');
    });

    it('should compare different ids with different id', () => {
        const id = ulid();
        const id2 = ulid();
        const ulidUniqueID = new UlidUniqueID(id);
        const ulidUniqueID2 = new UlidUniqueID(id2);
        assert(!ulidUniqueID.equals(ulidUniqueID2), 'should not be equal');
    });
});