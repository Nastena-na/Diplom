export class DataStorage {
  setInputWord(input) {
    localStorage.setItem('keyInputWord', JSON.stringify(input));
  }
  setArticles(res) {
    localStorage.setItem('keyArticles', JSON.stringify(res));
  }
  getInputWord() {
    return JSON.parse(localStorage.getItem('keyInputWord'));
  }
  getArticles() {
    return JSON.parse(localStorage.getItem('keyArticles'));
  }
}
