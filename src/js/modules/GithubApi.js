export class GithubApi {
  constructor(config) {
    this.url = config.url;
    this.name = config.name;
    this.repository = config.repository;
  }
  getCommits() {
    return fetch(`${this.url}/${this.name}/${this.repository}/commits`, {
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
