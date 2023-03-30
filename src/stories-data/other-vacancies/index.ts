import { VacancyData } from '../../interfaces/vacancy';
import { vacancyItems } from '../vacancies';

export const vacancies: VacancyData[] = [...vacancyItems[3].items.slice(0, 3)];
