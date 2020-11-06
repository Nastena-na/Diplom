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
const input = document.querySelector('.worldNews__input');
const nothingFound = document.querySelector('.nothingFound');
const newsApi = new NewsApi(configNews);
const createCard = (...args) => new NewsCard(...args);
const cardNews = new CardList(newsCards, createCard);
const dataStorage = new DataStorage();
let countMin = 0;
const countMax = 3;

export class SearchNews {
  clearNews() {
    newsCards.innerHTML = ''; // очищаю блок со старыми новостными карточками перед новой отправки формы
  }

  getStart() {
    resultSearch.classList.remove('resultSearch_active'); // блок с результатами скрыт
    nothingFound.classList.remove('nothingFound_active'); // блок "ничего не найдено" скрыт
    buttonNews.setAttribute('style', 'display:none'); // кнопки нет
    renderLoading(true); // запускаю спиннер
    localStorage.clear(); // очищаю localStorage
  }

  addNews() {
    newsApi
      .getNews(input.value)
      .then((res) => {
        const articles = Array.from(res.articles);
        let counter = countMin + countMax;
        dataStorage.setArticles(articles);
        dataStorage.setInputWord(input.value);
        if (!input.value) {
          nothingFound.classList.add('nothingFound_active');
          return;
        }

        if (res.articles.length === 0) {
          // ответ от сервера не пришёл
          nothingFound.classList.add('nothingFound_active');
          resultSearch.classList.remove('resultSearch_active');
        }

        if (articles.length >= 1 && articles.length <= 3) {
          // пришли 1,2 или 3 статьи
          resultSearch.classList.add('resultSearch_active');
          cardNews.render(articles);
        }

        if (articles.length > 3) {
          // пришло больше трёх статей
          resultSearch.classList.add('resultSearch_active');
          cardNews.render(articles.slice(countMin, counter));
          buttonNews.removeAttribute('style', 'display:none');
          countMin = counter;
          if (counter >= articles.length) {
            buttonNews.setAttribute('style', 'display:none');
          }
        }
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
