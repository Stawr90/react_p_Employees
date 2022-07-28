import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '' //эту строку (это состояние) поднимаем наверх в app и взаимодействуем onUpdateSearch(term)
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value; //записываем введенное в строке значение
        this.setState({term}); //перезаписываем его здесь в локальном состоянии this.state.term
        this.props.onUpdateSearch(term); //поднимаем наверх в app
    }

    render() {
        return (
            <input
                type='text'
                className='form-control search-input'
                placeholder='Найти сотрудников'
                value={this.state.term}
                onChange={this.onUpdateSearch}/> //используем метод выше
        )
    }
}

export default SearchPanel;