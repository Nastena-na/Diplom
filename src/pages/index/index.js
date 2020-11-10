import './index.css';
import { FormValidator } from '../../js/components/FormValidator';
import { SearchNews } from '../../js/components/SearchNews';
export const buttonNews = document.querySelector('.resultSearch__button');
export const preloader = document.querySelector('.preloader');
const input = document.querySelector('.worldNews__input');

(function () {
  const formWorldNews = document.forms.worldNews;
  const worldNewsValidator = new FormValidator(formWorldNews);
  const searchNews = new SearchNews();

  function searchFirstNews(evt) {
    // отрисовка блока с новостями по запросу
    evt.preventDefault(); // отмена действия браузера по умолчанию
    searchNews.clearNews();
    searchNews.getStart();
    searchNews.addNews(input.value);
  }

  function searchMoreNews(evt) {
    // показать ещё новости
    evt.preventDefault(); // отмена действия браузера по умолчанию
    searchNews.addNews(input.value);
  }

  worldNewsValidator.setEventListeners();
  formWorldNews.addEventListener('submit', searchFirstNews);
  buttonNews.addEventListener('click', searchMoreNews);
})();
