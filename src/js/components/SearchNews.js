import { NewsApi } from '../modules/NewsApi';
import { configNews } from '../constants/constants';
import { DataStorage } from '../modules/DataStorage';
import { NewsCard } from '../components/NewsCard';
import { CardList } from '../components/CardList';
import { renderLoading } from '../utils/utils';
import { ERROR_MESSAGE } from '../constants/constants';
import { buttonNews } from '../../pages/index/index';

const resultSearch = document.querySelector('.resultSearch');
const newsCards = document.querySelector('.resultSearch__cards');
const nothingFound = document.querySelector('.nothingFound');
const newsApi = new NewsApi(configNews);
const createCard = (...args) => new NewsCard(...args);
const cardNews = new CardList(newsCards, createCard);
const dataStorage = new DataStorage();
let countMin = 0;
const countMax = 3;
const localWord = dataStorage.getInputWord();
const localArticles = dataStorage.getArticles();

export class SearchNews {
  clearNews() {
    newsCards.innerHTML = ''; // очищаю блок со старыми новостными карточками перед новой отправки формы
  }

  getStart() {
    resultSearch.classList.remove('resultSearch_active'); // блок с результатами скрыт
    nothingFound.classList.remove('nothingFound_active'); // блок "ничего не найдено" скрыт
    buttonNews.setAttribute('style', 'display:none'); // кнопки нет
    localStorage.clear(); // очищаю localStorage
    renderLoading(true); // запускаю спиннер
    document
      .querySelector('.worldNews__button')
      .setAttribute('disabled', 'true'); // блокирую кнопку на время выполнения запроса по ключевому слову
  }

  _getCounter(arg) {
    // смотрим сколько пришло статей
    let counter = countMin + countMax;

    if (arg.length === 0) {
      // результатов нет
      nothingFound.classList.add('nothingFound_active');
      resultSearch.classList.remove('resultSearch_active');
    }

    if (arg.length >= 1 && arg.length <= 3) {
      // пришли 1,2 или 3 статьи
      resultSearch.classList.add('resultSearch_active');
      cardNews.render(arg);
    }

    if (arg.length > 3) {
      // пришло больше трёх статей
      resultSearch.classList.add('resultSearch_active');
      cardNews.render(arg.slice(countMin, counter));
      buttonNews.removeAttribute('style', 'display:none');
      countMin = counter;
      if (counter >= arg.length) {
        buttonNews.setAttribute('style', 'display:none');
      }
    }
  }

  addNews(data) {
    if (data === localWord) {
      // если введённое слово = ключу из локального хранилища, то выводим уже имеющиеся в хранилище новости
      buttonNews.setAttribute('style', 'display:none');
      renderLoading(false);
      this._getCounter(localArticles);
    } // отправляем запрос к серверу
    else
      newsApi
        .getNews(data)
        .then((res) => {
          const articles = Array.from(res.articles);
          this._getCounter(articles);
          dataStorage.setArticles(articles);
          dataStorage.setInputWord(data);
        })
        .catch((err) => {
          // обработка ошибок
          console.log(err);
          alert(ERROR_MESSAGE);
        })
        .finally(() => {
          renderLoading(false);
        });
  }
}
