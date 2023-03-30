import { BlockType } from '../../../interfaces';
import { AbstractBlockData, UtilityBlockType } from '../../../interfaces/classes/blocks';

const getNestedBlockSplice = (
  nestedBlocks: AbstractBlockData[],
  limit = 1,
  ignoredBlockTypes: (BlockType | UtilityBlockType)[] = [],
) => {
  const result: typeof nestedBlocks = [];

  while (limit > 0) {
    const nestedBlockSpliced = nestedBlocks.splice(0, 1);

    result.push(...nestedBlockSpliced);

    limit -= nestedBlockSpliced.reduce((result, nestedBlock) => {
      if (!ignoredBlockTypes.includes(nestedBlock.type)) {
        result += 1;
      }

      return result;
    }, 0);
  }

  return result;
};

export const generateGroupTuples = <T extends AbstractBlockData = AbstractBlockData>(
  items: T[],
  nestedBlocks: AbstractBlockData[],
  itemsCountPerStepPattern: number[],
  idPrefix: string,
) => {
  const itemsCopy = [...items];
  const nestedBlocksCopy = [...nestedBlocks];

  const result: [string, T[], AbstractBlockData[]][] = [];
  let lastItemsCountPerStep: number | null = null;

  while (itemsCopy.length > 0 && nestedBlocksCopy.length > 0) {
    lastItemsCountPerStep = itemsCountPerStepPattern.shift() ?? lastItemsCountPerStep!;

    const slicedItems = itemsCopy.splice(0, lastItemsCountPerStep);
    const nestedBlocksSplice = getNestedBlockSplice(nestedBlocksCopy, 1, [BlockType.header]);
    const id = `${idPrefix}-${slicedItems[0]!.id}`;

    result.push([id, slicedItems, nestedBlocksSplice]);
  }

  if (itemsCopy.length > 0 || nestedBlocksCopy.length > 0) {
    const id = `${idPrefix}-${itemsCopy[0]?.id ?? null}`;

    result.push([id, itemsCopy, nestedBlocksCopy]);
  }

  return result;
};
