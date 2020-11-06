export class NewsApi {
  constructor(config) {
    this.url = config.url;
    this.apiKey = config.apiKey;
    this.from = config.from;
    this.to = config.to;
    this.lang = config.lang;
    this.pageSize = config.pageSize;
  }
  getNews(inputValue) {
    return fetch(
      `${this.url}q=${inputValue}&pageSize=${this.pageSize}&language=${this.lang}&from=${this.from}&to=${this.to}&apiKey=${this.apiKey}`,
      {
        method: 'GET',
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
