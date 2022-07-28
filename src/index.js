import React from 'react'; //импортируем класс, для использования в проекте (только в главном файле)
import ReactDOM from 'react-dom'; //библиотека нужна для работы с дом-структурой на странице
import App from './components/app/app'; //импортируем главную функцию со всеми компонентами в файл

import './index.css'; //импорт стилей для файла index

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') //указываем, куда мы вставляем структуру всего приложения
);
