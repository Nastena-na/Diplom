export class CommitCard {
  constructor(data) {
    this._card = null;
    this.data = data;
  }

  _template() {
    const templateString = `<div class="swiper-slide">
    <time class="swiper__time"></time>
    <div class="swiper__group">
      <img
        class="swiper__avatar"/>
      <div class="swiper__information">
        <p class="swiper__name"></p>
        <p class="swiper__email"></p>
      </div>
    </div>
    <p class="swiper__commit"></p>
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
    this._card.querySelector('.swiper__time').textContent = this._getDate(
      this.data.commit.committer.date
    );
    this._card
      .querySelector('.swiper__time')
      .setAttribute(
        'datetime',
        `${this.data.commit.committer.date.slice(0, 10)}`
      );
    this._card
      .querySelector('.swiper__avatar')
      .setAttribute('src', `${this.data.author.avatar_url}`);
    this._card.querySelector('.swiper__avatar').setAttribute('alt', 'аватар');
    this._card.querySelector(
      '.swiper__name'
    ).textContent = this.data.commit.committer.name;
    this._card.querySelector(
      '.swiper__email'
    ).textContent = this.data.commit.committer.email;
    this._card.querySelector(
      '.swiper__commit'
    ).textContent = this.data.commit.message;
    this._card.querySelector('.swiper__commit').setAttribute('lang', 'en');
    return this._card;
  }
}
