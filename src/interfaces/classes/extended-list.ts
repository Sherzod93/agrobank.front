export const extendedListKey = Symbol('extendedListKey');

interface AbstractItem {
  id: unknown;
}

type AbstractList = AbstractItem[];

type ListExtension<L> = L extends AbstractList
  ? L extends (infer I)[]
    ? I extends { id: infer K }
      ? Readonly<{
          byIds: ReadonlyMap<K, I>;
        }>
      : never
    : never
  : never;

export class ExtendedList<L extends AbstractItem[]> extends Array<L[number]> {
  private readonly extension: ListExtension<L>;

  constructor(list: L) {
    super();

    this.push(...list);

    this.extension = Object.freeze({
      byIds: new Map(this.map((item) => [item.id, item])),
    }) as ListExtension<L>;

    Object.freeze(this);
  }

  static get [Symbol.species]() {
    return Array;
  }

  get [extendedListKey](): ListExtension<L> {
    return this.extension;
  }

  get byIds(): ListExtension<L>['byIds'] {
    return this.extension.byIds;
  }
}
