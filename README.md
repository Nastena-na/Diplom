# **Diplom**

## "Что в мире творится"

Проект на этапе разработки.

В работе есть три, связанных между собой страницы:

- страница, содержащая поисковую страницу новостей (форма с валидацией, прелоудер, запросы к Api, выгрузка новостей);
- страница, содержащая аналитику новостей (динамически меняющаяся аналитика по дням в зависимости от запросов пользователя);
- cтраница, содержащая информацию о проекте и авторе (есть подключение слайдера);

Сайт адаптирован под разные разрешения: для устройств с шириной до 768px, шириной до 1440px и более. Прописаны медиазапросы, стили разложены по блокам, подключены шрифты.
Проект собран Webpack-сборкой.

текущая версия - 0.0.1

## [Ссылка на проектную работу](https://Nastena-na.github.io/Diplom/)

## Стэк технологий:

ES6, Babel, OOP, CSS3, HTML5, Webpack, OOP, BEM

## Пакеты которые используются в сборках:

- [Babel CLI](https://babeljs.io/docs/en/babel-cli#docsNav)
- [Babel Core](https://babeljs.io/docs/en/babel-core)
- [Babel Preset Evnvironment](https://babeljs.io/docs/en/babel-preset-env#docsNav)
- [Сore JS](https://github.com/zloirock/core-js#readme)
- [PostCSS](https://postcss.org/)
- [Define plugin](https://webpack.js.org/plugins/define-plugin/)
- [Style loader](https://github.com/webpack-contrib/style-loader)
- [Optimize CSS assets](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)
- [File loader](https://github.com/webpack-contrib/file-loader)
- [Image Webpack loader](https://www.npmjs.com/package/image-webpack-loader)
- [Cross-Env](https://www.npmjs.com/package/cross-env)

## Инструкции по запуску:

- Скачать или склонировать репозитори
- Установить зависимости при помощи npm - `npm i`
- Запустить в development режиме - `npm run dev`
- Запустить сборку production-билда - `npm run build`
- Разместить production-билд на github pages - `npm run deploy`
