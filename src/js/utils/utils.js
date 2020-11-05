import { preloader } from '../../pages/index/index';

export function renderLoading(isLoading) {
  // во время загрузки новостей появляется спиннер
  if (isLoading) {
    preloader.classList.add('preloader_active');
  } else {
    preloader.classList.remove('preloader_active');
  }
}
