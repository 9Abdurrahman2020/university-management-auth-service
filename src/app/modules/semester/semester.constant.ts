import {
  ISemesterCodes,
  ISemesterMonths,
  ISemesterTitles,
} from './semester.interface';

export const semesterTitles: ISemesterTitles[] = ['Autumn', 'Summer', 'Fall'];
export const semesterCodes: ISemesterCodes[] = ['01', '02', '03'];
export const semesterMonths: ISemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const semesterTitleAndCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
