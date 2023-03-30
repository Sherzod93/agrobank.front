export type EntityType = string;

export interface BankCellSizeData {
  id: number;
  name: string;
  parameters: string;
  rentalPrice: Record<EntityType, string>;
  size: string;
  type: string;
}
