import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => { //при вводе записываем новые данные в state
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name.length < 3 || !this.state.salary) return; //остановим
        this.props.onAdd(this.state.name, this.state.salary); //передаем новые данные
        this.setState({ //обнуляем state
            name: '',
            salary: ''
        })
    }

    render() {
        const {name, salary} = this.state; //деструктурируем, чтоб использовать ниже

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text" 
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name" //[e.target.name]
                        value={name} //e.target.value (управляемый элемент, записывается value из state)
                        // (неуправляемый элемент - если нигде эти данные не сохраняются после ввода)
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary" //[e.target.name]
                        value={salary} //e.target.value
                        onChange={this.onValueChange}/>

                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;