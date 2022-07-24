import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
        {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
        {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3},
      ],
      term: '', //строка поиска (приходит из компонента, и перезаписывается)
      filter: 'all' //выбранная кнопка с фильтром (приходит из компонента, и перезаписывается)
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    });
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }

  searchEmp = (items, term) => { //фильтрует массив по введенному поиску строке (строка приходит из this.state.term)
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1 //ищет фрагмент строки name (совпадающий с term)
    })
  }

  onUpdateSearch = (term) => { //перезапишем в наше состояние главного компонента this.state.term
    this.setState({term}); //сокращенная запись от {term: term} (term приходит из search-panel)
  }

  filterPost = (items, filter) => { //фильтруем массив по выбранному фильтру (строка приходит из this.state.filter)
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise); //т.е. rise === true
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default: //если не выбран фильтр, будет выбрана первая кнопка
        return items
      }
  }

  onFilterSelect = (filter) => { //перезапишем в наше состояние главного компонента this.state.filter
    this.setState({filter}); //filter приходит из app-filter
  }

  render() {
    const {data, term, filter} = this.state; //используем свойства из state для взаимодействия
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter); //комбинированный результат (фильтр по поиску, фильтр по кнопкам)
    return (
      <div className="app">
          <AppInfo
          employees={employees}
          increased={increased}/>
  
          <div className="search-panel">
            <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
            <AppFilter filter={filter}
            onFilterSelect={this.onFilterSelect}/>
          </div>
  
          <EmployeesList 
            data={visibleData} //передаем уже новый отфильтрованный массив с данными
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;