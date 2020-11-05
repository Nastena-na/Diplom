export class DataStorage {
  setInputWord(input) {
    localStorage.setItem('keyInputWord', JSON.stringify(input));
  }
  setArticles(res) {
    localStorage.setItem('keyArticles', JSON.stringify(res));
  }
}
