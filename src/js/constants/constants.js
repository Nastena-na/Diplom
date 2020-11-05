const DATE = new Date();

const TODAY_DATE = DATE.toISOString(); // получаем дату в формате YYYY-MM-DDTHH:mm:ss.sssZ

export const WEEK = 6 * 24 * 60 * 60 * 1000; // получаем шесть дней в миллисекундах

export const START_DAY = new Date(new Date().getTime() - WEEK);

const FROM_DATE = START_DAY.toISOString();

export const DAYS_IN_WEEK = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const newsUrl =
  NODE_ENV === 'production' ? 'https://newsapi.org' : 'http://newsapi.org';

const gitUrl =
  NODE_ENV === 'production'
    ? 'https://api.github.com'
    : 'http://api.github.com';

// 'https://nomoreparties.co/news/v2/everything?'

export const configNews = {
  url: `${newsUrl}/v2/everything?`,
  apiKey: '39f338f78822418eb6b76fb9f08639f2',
  from: FROM_DATE,
  to: TODAY_DATE,
  pageSize: 100,
  lang: 'ru',
};

export const configGit = {
  url: `${gitUrl}/repos`,
  name: 'Nastena-na',
  repository: 'Diplom',
};

export const ERROR_MESSAGE =
  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
