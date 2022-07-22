import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'moreThen1000', label: 'З/П больше 1000$'}
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name; //если true, то возвращаем в active (берем фильтр переданный из app)
        const clazz = active ? 'btn-light' : 'btn-outline-light'; //если true, то передаем активный класс, если нет, то...
        return (
            <button className={`btn ${clazz}`}
                    type="button"
                    key={name} //по алгоритму сравнения можно передать и неповторяющуюся строку как здесь
                    //ononFilterSelect передаем наверх в app c выбранным фильтром
                    onClick={() => props.onFilterSelect(name)}> 
                    {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;