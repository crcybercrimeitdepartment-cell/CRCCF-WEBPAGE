import Cloudinary from '../constants/Cloudinary';
let pageAudio = null;

export const playPageTurnSound = () => {
  try {
    if (!pageAudio) {
      pageAudio = new Audio(Cloudinary.pageSound);
      pageAudio.preload = "auto";
      pageAudio.volume = 0.45;
    }

    pageAudio.pause();
    pageAudio.currentTime = 0;

    const p = pageAudio.play();

    if (p?.catch) {
      p.catch(() => {});
    }
  } catch {}
};
