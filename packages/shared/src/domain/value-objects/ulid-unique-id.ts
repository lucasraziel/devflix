import { ulid } from "ulidx";

export default class UlidUniqueID {
    private readonly _id: string;

    constructor(id?: string) {
        this._id = id ?? ulid();
    }

    public toString(): string {
        return this._id;
    }

    public equals(other: UlidUniqueID): boolean {
        return this.id === other.id;
    }

    public get id(): string {
        return this._id;
    }

}