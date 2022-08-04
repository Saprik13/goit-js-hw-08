import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

function createGallery(galleryItems) {
  return galleryItems
    .map(
      image => `
          <a class="gallery__item" href="${image.original}">
          <img class="gallery__image"
          src="${image.preview}" 
          alt="${image.description}" />
</a>
  `
    )
    .join('');
}
const addImages = createGallery(galleryItems);
galleryList.insertAdjacentHTML('afterbegin', addImages);

let lightbox = new SimpleLightbox('.gallery__item', {
  captionsData: 'alt',
  captionDelay: 250,
});
