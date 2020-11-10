export class DataStorage {
  constructor() {
    this.getInputWord = this.getInputWord.bind(this);
    this.getArticles = this.getArticles.bind(this);
  }
  setInputWord(input) {
    localStorage.setItem('keyInputWord', JSON.stringify(input));
  }
  setArticles(res) {
    localStorage.setItem('keyArticles', JSON.stringify(res));
  }
  getInputWord() {
    JSON.parse(localStorage.getItem('keyInputWord'));
  }
  getArticles() {
    JSON.parse(localStorage.getItem('keyArticles'));
  }
}
