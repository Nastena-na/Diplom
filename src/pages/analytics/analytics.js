import './analytics.css';
import { START_DAY, DAYS_IN_WEEK } from '../../js/constants/constants';
import { DataStorage } from '../../js/modules/DataStorage';

const dataStorage = new DataStorage();
const word = dataStorage.getInputWord();
const allArticles = dataStorage.getArticles();

class AnaliticsData {
  getNumbers() {
    document.querySelector(
      '.survey__title'
    ).textContent = `Вы спросили: «${word}»`;
    document.querySelector(
      '.survey__paragraph'
    ).textContent = `Новостей за неделю: ${allArticles.length}`;
    let count = 0; //счётчик упоминаний в заголовках новостей
    const regex = new RegExp(word, 'i');
    return allArticles.filter((article) => {
      if (regex.test(article.title)) {
        count++;
      }
      document.querySelector(
        '.survey__paragraph_two'
      ).textContent = `Упоминаний в заголовках: ${count}`;
    });
  }

  getDaysWeek() {
    //заполняем дни недели в графике
    for (let i = 0; i < 7; i++) {
      const oneDay = i * 24 * 60 * 60 * 1000; // количество дней (i) умножаем на миллисекунды
      const date = new Date(START_DAY.getTime() + oneDay); // увеличиваем дату на один день
      const day = date.getDate(); // получаем день цифрой
      const num = date.getDay(); // получаем порядковый номер дня недели
      const daysWeeks = DAYS_IN_WEEK[num]; // получаем нужный день недели из массива
      document.querySelector(
        `.analitics__day_${i}`
      ).textContent = `${day}, ${daysWeeks}`; // вставляем в разметку для каждой строчки
    }
  }

  getMonth() {
    // заполняем месяц сегодняшней даты
    const a = new Date().getMonth();
    const array = [
      'январь',
      'февраль',
      'март',
      'апрель',
      'май',
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь',
    ];
    const analiticsDate = document.querySelector('.analitics__date');
    analiticsDate.textContent = `Дата (${array[a]})`;
  }

  _getArtFromTitleAndDesc() {
    // получаем только статьи, где есть упоминание ключевого слова и в заголовках и в тексте
    const regex = new RegExp(word, 'i');
    return allArticles.filter(
      (article) => regex.test(article.title) || regex.test(article.description)
    );
  }

  _getDateArticles() {
    // метод, в котором мы получим даты новостей по порядку
    const artReg = this._getArtFromTitleAndDesc();
    const data = artReg.map((elem) => {
      // получаем даты статей
      const elemData = new Date(elem.publishedAt);
      return elemData;
    });
    const dataSort = data.sort(function (a, b) {
      // сортируем даты
      return a - b;
    });
    const dataNum = dataSort.map((elem) => {
      // получаем даты статей цифрами по порядку
      return elem.getDate();
    });
    return dataNum;
  }

  getProcents() {
    // считаем количество повторений дат
    const dates = this._getDateArticles();
    const object = {}; // заводим пустой объект, где дата будет ключём, а кол-во повторений-значением
    dates.map((data) => {
      if (data in object) {
        // если дата уже есть в объекте, то увеличиваем её количество повторений
        object[data]++;
      } else object[data] = 1; // если даты нет в объекте-будет 1 повтор
    });
    for (let i = 0; i < 7; i++) {
      const oneDay = i * 24 * 60 * 60 * 1000; // количество дней (i) умножаем на миллисекунды
      const date = new Date(START_DAY.getTime() + oneDay); // увеличиваем дату на один день
      const day = date.getDate(); // получаем день цифрой
      const articlesTitDes = this._getArtFromTitleAndDesc(); // получаем только статьи, где есть упоминание ключевого слова и в заголовках и в тексте
      if (day in object) {
        // если день содержится в объекте
        const percent = (object[`${day}`] * 100) / articlesTitDes.length; // по ключу(день) получаем значение(кол-во повторений)*100/кол-во новостей
        const roundPercent = Math.round(percent); // округляем результат процентов
        document.querySelector(
          `.analitics__num_${i}`
        ).textContent = roundPercent; //записываем результат в каждую строку
        document
          .querySelector(`.analitics__percent_${i}`)
          .setAttribute('style', `width: ${roundPercent}%;`); // устанавливаем ширину
      } else {
        document.querySelector(`.analitics__num_${i}`).textContent = 0; // если такого дня нет- записываем "0" в каждую строку
        document
          .querySelector(`.analitics__percent_${i}`)
          .setAttribute('style', `width: ${0}%;`); // устанавливаем ширину- "0"
      }
    }
  }
}

const analitics = new AnaliticsData();
analitics.getNumbers();
analitics.getDaysWeek();
analitics.getMonth();
analitics.getProcents();
