import dayjs from 'dayjs'

export interface IForm {
    from: string;
    to: string;
    order_number: string;
    order_date: dayjs.Dayjs | null;
}