import { setTotalPrice } from '../context/index';
import { ICost } from '../types';

export const countTotalPrice = (costs: ICost[]) => {
    if (costs === undefined) return;
    setTotalPrice(
        costs.reduce((defaultCount, item) => item.type==='Income' ? defaultCount + item.price : defaultCount - item.price, 0)
    );
}

export const formatDate = (date: string) => {
    const newDate = new Date(date);

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };

    return newDate.toLocaleString('uk-UA', options as Intl.DateTimeFormatOptions);
}