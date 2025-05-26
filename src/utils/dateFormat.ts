import moment from 'moment';

export function dateFormat(date: string, format: string = 'DD MMMM YYYY, HH:mm'): string {
  if (!date) {
    return '-';
  }else{
    return moment(date).format(format);
  }
}
