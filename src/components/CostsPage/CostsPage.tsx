import { useEffect, useState, useRef, useMemo } from 'react';
import { Spinner } from "../Spinner/Spinner";
import { Header } from "./Header/Header"
import { getAuthDataFromLS } from '../../utils/auth';
import { getCostsFx } from "../../api/costsClient";
import { $costs, setCosts } from '../../context/index';
import { useStore } from "effector-react";
import { CostsList } from './CostsList/CostsList';
import { FilterBy } from './FilterBy/FilterBy';

export const CostsPage = () => {
    const currentDate = {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1
	},
	[date, setDate] = useState(currentDate),

	handleChangeDate = (e: { target: { id: number; value: number; }; }) => {
		const { id, value } = e.target;
		setDate({ ...date, [id]: value });
	};

    const [spinner, setSpinner] = useState(false);
    const store = useStore($costs);
    store.sort((element1, element2) => new Date(element1.date).getTime() - new Date(element2.date).getTime());
    const filteredStore = store.filter((element) => new Date(element.date).getMonth() === (date.month-1) && new Date(element.date).getFullYear() === date.year);
    const incomeStore = filteredStore.filter(element => element.type === 'Income');
    const expenseStore = filteredStore.filter(element => element.type === 'Expense');
    const shouldLoadCosts = useRef(true);


    useEffect(() => {
        if (shouldLoadCosts.current) {
            shouldLoadCosts.current = false;
            handleGetCosts();
        }
    }, [])

    const handleGetCosts = async () => {
        setSpinner(true);
        const authData = getAuthDataFromLS();        

        const costs = await getCostsFx({
            url: '/cost',
            token: authData.access_token
        });

        setSpinner(false);
        setCosts(costs);
    }

    return (
        <div className="container costs-page">
            {useMemo(() => <Header costs={filteredStore} />, [filteredStore])}
            <FilterBy
					monthActive={date.month}
					yearActive={date.year}
					handleChangeDate={handleChangeDate}
			/>
            <div style={{ position: 'relative' }}>
                {spinner && <Spinner top={0} left={0} />}
                <h3 style={{ textAlign: 'center', marginBottom: 30, marginTop: 30, fontSize: 30 }}>Список доходів</h3>
                {useMemo(() => <CostsList costs={incomeStore} />, [incomeStore])}
                {(!spinner && !incomeStore.length) && <h2>Список доходів порожній</h2>}
                <h3 style={{ textAlign: 'center', marginBottom: 30, marginTop: 30, fontSize: 30 }}>Список видатків</h3>
                {useMemo(() => <CostsList costs={expenseStore} />, [expenseStore])}
                {(!spinner && !expenseStore.length) && <h2>Список видатків порожній</h2>}
            </div>
        </div>
    )
}