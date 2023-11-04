import Vimeo from '@vimeo/player';
import throttle from 'lodash/throttle';

const vimeoPlayer = new Vimeo('vimeo-player');
const currentTimeKey = 'videoplayer-current-time';

vimeoPlayer.on('timeupdate', throttle(updateCurrentTime, 1000));

function updateCurrentTime(event) {
  const currentTime = event.seconds;
  localStorage.setItem(currentTimeKey, currentTime);
}

window.addEventListener('load', () => {
  const storedCurrentTime = localStorage.getItem(currentTimeKey);
  if (storedCurrentTime) {
    vimeoPlayer.setCurrentTime(parseFloat(storedCurrentTime));
  }
});
