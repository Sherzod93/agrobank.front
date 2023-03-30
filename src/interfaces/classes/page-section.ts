import { nanoid } from 'nanoid';
import { BlockType } from '../enums';
import { PageSectionTitleAlignment, PageSectionTitleOptions, PageSectionTitleSize } from '../page-section';
import { ProductData } from '../product';
import {
  AbstractBlockData,
  pageSectionBlockTypeToDataClassMap,
  TerminatorBlockData,
  UtilityBlockType,
  utilityBlockTypeToDataClassMap,
} from './blocks';

export interface PageSectionData extends Partial<PageSectionTitleOptions> {
  blocks: Pick<AbstractBlockData, 'type'>[];
  title?: string;
}

const pageSectionBlockTypesSet = new Set(
  Object.entries(pageSectionBlockTypeToDataClassMap)
    .filter(([, dataClass]) => dataClass)
    .map(([type]) => type),
);
const utilityBlockTypesSet = new Set(Object.keys(utilityBlockTypeToDataClassMap));

interface PageSectionBuildingStackFrame {
  blockDataList: AbstractBlockData[];
  initiatorBlock: AbstractBlockData | null;
  state: PageSectionBuildingState;
}

enum PageSectionBuildingState {
  adviceList = 'advice-list',
  default = 'default',
  newsList = 'news-list',
  tab = 'tab',
  tabs = 'tabs',
  vacancyList = 'vacancy-list',
}

class PageSectionBuildingStack {
  onFramePush?: () => void;
  onFramePop?: () => void;
  private readonly framesStack: PageSectionBuildingStackFrame[] = [];

  peek(): PageSectionBuildingStackFrame {
    if (this.framesStack.length < 1) {
      throw new Error('trying to access frame on empty stack');
    }

    return this.framesStack[this.framesStack.length - 1];
  }

  pop() {
    if (this.peek().state === PageSectionBuildingState.default) {
      return;
    }

    const { initiatorBlock, blockDataList } = this.framesStack.pop()!;

    if (initiatorBlock) {
      initiatorBlock.nestedBlocks.push(...blockDataList);
      this.peek().blockDataList.push(initiatorBlock);
    }

    if (this.onFramePop) {
      this.onFramePop();
    }
  }

  push(state: PageSectionBuildingState, blockData: AbstractBlockData | null = null) {
    this.framesStack.push({
      blockDataList: [],
      initiatorBlock: blockData,
      state,
    });

    if (this.onFramePush) {
      this.onFramePush();
    }
  }
}

export class PageSection {
  readonly arrow?;
  readonly blocks;
  readonly id;
  readonly title?;
  readonly titleAlignment;
  readonly titleSize;

  constructor(sectionData: PageSectionData, contextProduct?: ProductData) {
    const buildingStack = new PageSectionBuildingStack();
    const blockDataList = sectionData.blocks
      .map((blockData): AbstractBlockData | null => {
        const { type } = blockData;

        try {
          if (pageSectionBlockTypesSet.has(type)) {
            return new pageSectionBlockTypeToDataClassMap[type as keyof typeof pageSectionBlockTypeToDataClassMap]!(
              blockData as any,
              contextProduct,
            );
          }

          if (utilityBlockTypesSet.has(type)) {
            return new utilityBlockTypeToDataClassMap[type as keyof typeof utilityBlockTypeToDataClassMap](
              blockData as any,
              contextProduct,
            );
          }

          console.warn(`Unsupported block type: ${blockData.type}`);
        } catch (e) {
          console.warn(`Block ${blockData.type}`, e);
        }

        return null;
      })
      .filter((block) => block) as AbstractBlockData[];

    buildingStack.onFramePop = () => {
      blockDataList.shift();
    };
    buildingStack.onFramePush = () => {
      blockDataList.unshift(new TerminatorBlockData({ type: UtilityBlockType.terminator }));
    };
    blockDataList.reverse();
    buildingStack.push(PageSectionBuildingState.default);

    blocks_loop: while (blockDataList.length) {
      const currentFrame = buildingStack.peek();
      const blockData = blockDataList.pop()!;

      switch (currentFrame.state) {
        case PageSectionBuildingState.adviceList:
          switch (blockData.type) {
            // unacceptable block types
            case BlockType.newsList:
            case UtilityBlockType.tab:
            case BlockType.tabs:
            case BlockType.vacancyList:
              PageSection.throwUnacceptableBlockTypeError(blockData, currentFrame.state);
              break blocks_loop;
            // acceptable block types
            case BlockType.adviceList:
              buildingStack.pop();
              buildingStack.push(PageSectionBuildingState.adviceList, blockData);
              break;
            case UtilityBlockType.terminator:
              buildingStack.pop();
              break;
            default:
              currentFrame.blockDataList.push(blockData);
              break;
          }

          break;
        case PageSectionBuildingState.default:
          switch (blockData.type) {
            // unacceptable block types
            case UtilityBlockType.tab:
              PageSection.throwUnacceptableBlockTypeError(blockData, currentFrame.state);
              break blocks_loop;
            // acceptable block types
            case BlockType.adviceList:
              buildingStack.push(PageSectionBuildingState.adviceList, blockData);
              break;
            case BlockType.newsList:
              buildingStack.push(PageSectionBuildingState.newsList, blockData);
              break;
            case BlockType.tabs:
              buildingStack.push(PageSectionBuildingState.tabs, blockData);
              break;
            case UtilityBlockType.terminator:
              buildingStack.pop();
              break;
            case BlockType.vacancyList:
              buildingStack.push(PageSectionBuildingState.vacancyList, blockData);
              break;
            default: {
              currentFrame.blockDataList.push(blockData);
              break;
            }
          }

          break;
        case PageSectionBuildingState.newsList:
          switch (blockData.type) {
            // unacceptable block types
            case BlockType.adviceList:
            case UtilityBlockType.tab:
            case BlockType.tabs:
            case BlockType.vacancyList:
              PageSection.throwUnacceptableBlockTypeError(blockData, currentFrame.state);
              break blocks_loop;
            // acceptable block types
            case BlockType.newsList:
              buildingStack.pop();
              buildingStack.push(PageSectionBuildingState.newsList, blockData);
              break;
            case UtilityBlockType.terminator:
              buildingStack.pop();
              break;
            default:
              currentFrame.blockDataList.push(blockData);
              break;
          }

          break;
        case PageSectionBuildingState.tabs:
          switch (blockData.type) {
            // unacceptable block types
            default:
              PageSection.throwUnacceptableBlockTypeError(blockData, currentFrame.state);
              break blocks_loop;
            // acceptable block types
            case UtilityBlockType.tab:
              buildingStack.push(PageSectionBuildingState.tab, blockData);
              break;
            case BlockType.tabs:
              buildingStack.pop();
              buildingStack.push(PageSectionBuildingState.tabs, blockData);
              break;
            case UtilityBlockType.terminator:
              buildingStack.pop();
              break;
          }

          break;
        case PageSectionBuildingState.tab:
          switch (blockData.type) {
            // unacceptable block types
            case BlockType.newsList:
            case BlockType.tabs:
            case BlockType.vacancyList:
              PageSection.throwUnacceptableBlockTypeError(blockData, currentFrame.state);
              break blocks_loop;
            // acceptable block type
            case UtilityBlockType.tab:
              buildingStack.pop();
              buildingStack.push(PageSectionBuildingState.tab, blockData);
              break;
            case UtilityBlockType.terminator:
              buildingStack.pop();
              blockDataList.push(blockData);
              break;
            case BlockType.adviceList:
              buildingStack.push(PageSectionBuildingState.adviceList, blockData);
              break;
            default:
              currentFrame.blockDataList.push(blockData);
              break;
          }

          break;
        case PageSectionBuildingState.vacancyList:
          switch (blockData.type) {
            // unacceptable block types
            case BlockType.adviceList:
            case BlockType.newsList:
            case UtilityBlockType.tab:
            case BlockType.tabs:
              PageSection.throwUnacceptableBlockTypeError(blockData, currentFrame.state);
              break blocks_loop;
            // acceptable block types
            case BlockType.vacancyList:
              buildingStack.pop();
              buildingStack.push(PageSectionBuildingState.vacancyList, blockData);
              break;
            case UtilityBlockType.terminator:
              buildingStack.pop();
              break;
            default:
              currentFrame.blockDataList.push(blockData);
              break;
          }

          break;
      }
    }

    if (buildingStack.peek().state !== PageSectionBuildingState.default) {
      throw new Error('Invalid page section builder state');
    }

    this.arrow = sectionData.arrow;
    this.blocks = buildingStack.peek().blockDataList;
    this.id = nanoid();
    this.title = sectionData.title ?? undefined;
    this.titleAlignment = sectionData.titleAlignment ?? PageSectionTitleAlignment.center;
    this.titleSize = sectionData.titleSize ?? PageSectionTitleSize.medium;
  }

  private static throwUnacceptableBlockTypeError(
    blockData: AbstractBlockData,
    buildingState: PageSectionBuildingState,
  ): never {
    throw new Error(`Invalid block type '${blockData.type}' for page section building state '${buildingState}'`);
  }
}
