import './about.css';
import { configGit } from '../../js/constants/constants';
import { GithubApi } from '../../js/modules/GithubApi';
import { CommitCard } from '../../js/components/CommitCard';
import { CardList } from '../../js/components/CardList';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

(function () {
  Swiper.use([Navigation, Pagination]);
  const slider = document.querySelector('.swiper-container');
  const commitsCards = document.querySelector('.swiper-wrapper');
  const githubApi = new GithubApi(configGit);
  const createCommit = (...args) => new CommitCard(...args);
  const cardCommits = new CardList(commitsCards, createCommit);

  function getGitCommits() {
    githubApi
      .getCommits()
      .then((res) => {
        cardCommits.render(res);
        const swiper = new Swiper(slider, {
          slidesPerView: 1,
          spaceBetween: 8,
          loop: true,
          slidesPerGroup: 1,
          centerInsufficientSlides: false,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            768: {
              slidesPerView: 3,
              spaceBetween: 8,
              slidesPerGroup: 2,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 16,
              slidesPerGroup: 2,
            },
          },
        });
      })
      .catch((err) => {
        // обработка ошибок
        console.log(err);
      });
  }
  getGitCommits();
})();
