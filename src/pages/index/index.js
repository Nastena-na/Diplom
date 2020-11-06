import './index.css';
import { FormValidator } from '../../js/components/FormValidator';
import { SearchNews } from '../../js/components/SearchNews';
export const buttonNews = document.querySelector('.resultSearch__button');
export const preloader = document.querySelector('.preloader');

(function () {
  const formWorldNews = document.forms.worldNews;
  const worldNewsValidator = new FormValidator(formWorldNews);
  const searchNews = new SearchNews();

  function searchFirstNews(evt) {
    evt.preventDefault(); // отмена действия браузера по умолчанию
    searchNews.clearNews();
    searchNews.getStart();
    searchNews.addNews();
  }

  function searchMoreNews(evt) {
    evt.preventDefault(); // отмена действия браузера по умолчанию
    searchNews.addNews();
  }

  worldNewsValidator.setEventListeners();
  formWorldNews.addEventListener('submit', searchFirstNews);
  buttonNews.addEventListener('click', searchMoreNews);
})();
