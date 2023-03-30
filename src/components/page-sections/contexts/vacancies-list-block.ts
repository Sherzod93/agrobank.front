import React, { useContext } from 'react';
import { FilterItemData } from '../../../interfaces';

export const VacanciesListBlockContext = React.createContext<{
  regionIdToRegionMap: Map<number, FilterItemData>;
}>({
  regionIdToRegionMap: new Map(),
});

export const useVacanciesListBlock = () => {
  return useContext(VacanciesListBlockContext);
};
