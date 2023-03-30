export interface ChronologyItem {
  eventItem: {
    parentId: number;
    text: string;
  };
  id: number;
  timelineItem: {
    id: number;
    selected: false;
    title: string;
  };
}
