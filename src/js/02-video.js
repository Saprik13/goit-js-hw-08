import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
};
player.on('timeupdate', throttle(onPlay, 1000));

let savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  player
    .setCurrentTime(savedData)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
