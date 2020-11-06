export class CardList {
  constructor(container, callback) {
    this._container = container;
    this._callback = callback;
  }

  _addCard(card) {
    const template = this._callback(card); //создаётся  новостная карточка
    this._container.append(template.create()); //новостная карточка добавляется в контейнер
  }

  render(cards) {
    cards.forEach((card) => {
      //каждая новостная карточка из массива добавляется в контейнер
      this._addCard(card);
    });
  }
}
