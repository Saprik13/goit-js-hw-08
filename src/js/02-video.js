import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const STORAGE_KEY = 'videoplayer-current-time';

const player = new Player(iframe);

const onPlay = function (data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
};
player.on('timeupdate', throttle(onPlay, 1000));

let timeData = localStorage.getItem(STORAGE_KEY);

if (timeData) {
  player
    .setCurrentTime(timeData)
    .then(function (seconds) {
      seconds = 0;
    })
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
