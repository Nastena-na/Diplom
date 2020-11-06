export class NewsCard {
  constructor(data) {
    this._card = null;
    this.data = data;
  }

  _template() {
    const templateString = `<div class="resultSearch__card">
        <img class="resultSearch__image" alt="изображение новости"/>
        <div class="resultSearch__container">
          <time class="resultSearch__cardData"></time>
          <h4 class="resultSearch__cardTitle"></h4>
          <p class="resultSearch__cardDescription"></p>
          <a class="resultSearch__cardLink" target="blank"></a>
        </div>
      </div>`;
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', templateString.trim());
    return element.firstChild;
  }

  _getDate(date) {
    const a = date.slice(0, 10);
    const numMonths = a.slice(5, 7);
    const nameMonths = {
      '01': 'января',
      '02': 'февраля',
      '03': 'марта',
      '04': 'апреля',
      '05': 'мая',
      '06': 'июня',
      '07': 'июля',
      '08': 'августа',
      '09': 'сентября',
      10: 'октября',
      11: 'ноября',
      12: 'декабря',
    };
    const newDate = `${a.slice(8, 10)} ${nameMonths[numMonths]}, ${a.slice(
      0,
      4
    )}`;
    return newDate;
  }

  create() {
    this._card = this._template();
    if (!this.data.urlToImage) {
      this.data.urlToImage =
        'https://images.unsplash.com/photo-1603662954036-405209c34f00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80';
    }
    this._card
      .querySelector('.resultSearch__image')
      .setAttribute('src', `${this.data.urlToImage}`);
    this._card.querySelector(
      '.resultSearch__cardData'
    ).textContent = this._getDate(this.data.publishedAt);
    this._card.querySelector(
      '.resultSearch__cardTitle'
    ).textContent = this.data.title;
    this._card.querySelector(
      '.resultSearch__cardDescription'
    ).textContent = this.data.description;
    this._card.querySelector(
      '.resultSearch__cardLink'
    ).textContent = this.data.source.name;
    this._card
      .querySelector('.resultSearch__cardLink')
      .setAttribute('href', `https://${this.data.source.name}`);
    return this._card;
  }
}
