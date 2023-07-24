import UlidUniqueID from '../value-objects/ulid-unique-id.js';
import assert from 'node:assert';

export default abstract class Entity<
  DataModel extends Record<string, unknown>,
> {
  protected readonly _dataModel: DataModel;

  private readonly _id: UlidUniqueID;

  protected constructor(dataModel: DataModel, id?: UlidUniqueID) {
    this._dataModel = dataModel;
    this._id = id ?? new UlidUniqueID();
  }

  public get id(): UlidUniqueID {
    return this._id;
  }

  public get dataModel(): DataModel {
    return this._dataModel;
  }

  public equals(other: Entity<DataModel>): boolean {
    try {
      assert.strictEqual(this.id, other.id);
      return true;
    } catch {
      return false;
    }
  }
}
