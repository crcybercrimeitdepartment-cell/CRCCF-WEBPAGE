let pageAudio = null;

export const playPageTurnSound = () => {
  try {
    if (!pageAudio) {
      pageAudio = new Audio("https://res.cloudinary.com/dlhmkbijh/video/upload/v1782471857/Page_Sound_igkonb.mp3");
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
