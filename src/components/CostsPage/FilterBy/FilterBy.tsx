import { IFilter } from '../../../types';
import './style.css'

const months = [
	{
		id: 1,
		name: 'Січень'
	},
	{
		id: 2,
		name: 'Лютий'
	},
	{
		id: 3,
		name: 'Березень'
	},
	{
		id: 4,
		name: 'Квітень'
	},
	{
		id: 5,
		name: 'Травень'
	},
	{
		id: 6,
		name: 'Червень'
	},
	{
		id: 7,
		name: 'Липень'
	},
	{
		id: 8,
		name: 'Серпень'
	},
	{
		id: 9,
		name: 'Вересень'
	},
	{
		id: 10,
		name: 'Жовтень'
	},
	{
		id: 11,
		name: 'Листопад'
	},
	{
		id: 12,
		name: 'Грудень'
	},
];

export const FilterBy = ({ monthActive, yearActive, handleChangeDate } : IFilter) => {
	return (
		<>
			<select
				id="month"
				defaultValue={monthActive}
				onChange={handleChangeDate}
				className='btn btn-primary'
				style={{marginRight: 20}}
			>
				{months.map(month =>
					<option key={month.id} value={month.id}>{month.name}</option>
				)}
			</select>

			<select
				id="year"
				defaultValue={yearActive}
				onChange={handleChangeDate}
				className='btn btn-primary'
			>
				<option value="2021">2021</option>
				<option value="2022">2022</option>
				<option value="2023">2023</option>
				<option value="2024">2024</option>
			</select>
		</>
	);
}