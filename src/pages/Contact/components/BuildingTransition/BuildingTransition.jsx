import Cloudinary from '../../../../constants/Cloudinary';
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BellRing,
  Building2,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./building-transition.css";
import { buildingTransitionData } from "./BuildingTransitionData";

/*
 * SOUND FILES
 *
 * Keep both files inside:
 * public/sounds/
 */
const BELL_SOUND_FILE = Cloudinary.officeBell;
const DOOR_SOUND_FILE = Cloudinary.gate1Open;

/*
 * INTERACTION TIMING
 *
 * Change only these two constants when you want to sync
 * the sliding-door movement with your gate opening audio.
 *
 * BELL_TO_DOOR_DELAY_MS: time after bell click before door starts.
 * DOOR_OPEN_DURATION_MS: door visual duration; keep it close to
 * the actual gate1_open.mp3 duration.
 */
const BELL_TO_DOOR_DELAY_MS = 1400;
const DOOR_OPEN_DURATION_MS = 2000;
const FULLY_OPEN_PAUSE_MS = 350;
const PROFILE_REVEAL_DELAY_MS = 650;
const EXIT_FADE_DELAY_MS = 200;
const COMPLETE_DELAY_MS = 650;

const ENTRANCE_TIMELINE = {
  verifying: 350,
  granted: 1050,
  opening: BELL_TO_DOOR_DELAY_MS,
  open: BELL_TO_DOOR_DELAY_MS + DOOR_OPEN_DURATION_MS,
  entering: BELL_TO_DOOR_DELAY_MS + DOOR_OPEN_DURATION_MS + FULLY_OPEN_PAUSE_MS,
  profileReady:
    BELL_TO_DOOR_DELAY_MS +
    DOOR_OPEN_DURATION_MS +
    FULLY_OPEN_PAUSE_MS +
    PROFILE_REVEAL_DELAY_MS,
  exiting:
    BELL_TO_DOOR_DELAY_MS +
    DOOR_OPEN_DURATION_MS +
    FULLY_OPEN_PAUSE_MS +
    PROFILE_REVEAL_DELAY_MS +
    EXIT_FADE_DELAY_MS,
  complete:
    BELL_TO_DOOR_DELAY_MS +
    DOOR_OPEN_DURATION_MS +
    FULLY_OPEN_PAUSE_MS +
    PROFILE_REVEAL_DELAY_MS +
    EXIT_FADE_DELAY_MS +
    COMPLETE_DELAY_MS,
};

const NORMAL_REVEAL_DELAY = 850;
const REDUCED_REVEAL_DELAY = 100;

const STAGE_COPY = buildingTransitionData.stageCopy;

const getBranchBuildingTheme = (branch) => {
  const branchText = `${branch?.id || ""} ${branch?.name || ""} ${
    branch?.city || ""
  } ${branch?.state || ""} ${branch?.branchId || ""} ${
    branch?.address || ""
  }`.toLowerCase();

  if (branch?.id === 1 || branchText.includes("bhubaneswar")) {
    return "bbsr-luxury-hq";
  }

  if (
    branch?.id === 2 ||
    branchText.includes("new delhi") ||
    branchText.includes("delhi")
  ) {
    return "delhi-command";
  }

  if (branchText.includes("hyd") || branchText.includes("hyderabad")) {
    return "hyderabad-data-hub";
  }

  if (
    branch?.id === 4 ||
    branchText.includes("blr") ||
    branchText.includes("bengaluru") ||
    branchText.includes("bangalore")
  ) {
    return "bengaluru-tech-campus";
  }

  if (
    branchText.includes("bishakhapatnam") ||
    branchText.includes("visakhapatnam") ||
    branchText.includes("vizag")
  ) {
    return "vizag-coastal";
  }

  if (branchText.includes("switzerland")) {
    return "swiss-alpine";
  }

  if (branchText.includes("malaysia") || branchText.includes("malasia")) {
    return "malaysia-tropical";
  }

  if (branchText.includes("indonesia")) {
    return "indonesia-archipelago";
  }

  if (branchText.includes("bhutan")) {
    return "bhutan-himalayan";
  }

  return "default-luxury";
};

const BuildingTransition = ({ branch, onProfileReady, onComplete }) => {
  const [stage, setStage] = useState("revealing");
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const bellAudioRef = useRef(null);
  const doorAudioRef = useRef(null);
  const bellButtonRef = useRef(null);
  const timersRef = useRef([]);

  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const profileReadyRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const doorSoundStartedRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timerId) => {
      window.clearTimeout(timerId);
    });

    timersRef.current = [];
  }, []);

  const resetAudioElement = useCallback((audio) => {
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }, []);

  const stopAllSounds = useCallback(() => {
    resetAudioElement(bellAudioRef.current);
    resetAudioElement(doorAudioRef.current);
  }, [resetAudioElement]);

  const showProfile = useCallback(() => {
    if (profileReadyRef.current) return;

    profileReadyRef.current = true;
    onProfileReady(branch);
  }, [branch, onProfileReady]);

  const finishTransition = useCallback(() => {
    if (completedRef.current) return;

    completedRef.current = true;

    clearTimers();
    stopAllSounds();
    showProfile();
    onComplete();
  }, [clearTimers, onComplete, showProfile, stopAllSounds]);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealDelay = reduceMotionRef.current
      ? REDUCED_REVEAL_DELAY
      : NORMAL_REVEAL_DELAY;

    const revealTimer = window.setTimeout(() => {
      setStage("waiting");
    }, revealDelay);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(revealTimer);
      clearTimers();
      stopAllSounds();

      document.body.style.overflow = previousOverflow;
    };
  }, [clearTimers, stopAllSounds]);

  useEffect(() => {
    if (stage === "waiting") {
      bellButtonRef.current?.focus();
    }
  }, [stage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        finishTransition();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishTransition]);

  const playAudio = useCallback((audio, volume, label) => {
    if (!audio || audio.muted) return;

    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;

    const playPromise = audio.play();

    if (playPromise) {
      playPromise.catch((error) => {
        console.warn(`${label} sound could not play:`, error);
        setAudioError(true);
      });
    }
  }, []);

  /*
   * Door sound is started from the `opening` stage effect.
   * This keeps the CSS class change and the audio start aligned.
   */
  useEffect(() => {
    if (stage !== "opening" || doorSoundStartedRef.current) return;

    doorSoundStartedRef.current = true;

    window.requestAnimationFrame(() => {
      playAudio(doorAudioRef.current, 0.9, "Door opening");
    });
  }, [playAudio, stage]);

  /*
   * The door audio is silently prepared during the direct user click.
   * This makes the delayed door sound more reliable in Chrome,
   * Edge, Firefox and mobile browsers.
   */
  const prepareDoorAudio = useCallback(() => {
    const doorAudio = doorAudioRef.current;

    if (!doorAudio || isMuted) return;

    doorAudio.pause();
    doorAudio.currentTime = 0;
    doorAudio.muted = true;
    doorAudio.volume = 0;

    const unlockPromise = doorAudio.play();

    if (unlockPromise) {
      unlockPromise
        .then(() => {
          doorAudio.pause();
          doorAudio.currentTime = 0;
          doorAudio.volume = 0.9;
          doorAudio.muted = false;
        })
        .catch(() => {
          /*
           * Do not show an error here.
           * The normal door-play attempt will run when the door opens.
           */
          doorAudio.pause();
          doorAudio.currentTime = 0;
          doorAudio.volume = 0.9;
          doorAudio.muted = false;
        });
    }
  }, [isMuted]);

  const startEntranceSequence = () => {
    if (startedRef.current || stage !== "waiting") {
      return;
    }

    startedRef.current = true;
    doorSoundStartedRef.current = false;
    setAudioError(false);
    setStage("ringing");

    const bellAudio = bellAudioRef.current;
    const doorAudio = doorAudioRef.current;

    if (bellAudio) {
      bellAudio.muted = isMuted;
    }

    if (doorAudio) {
      doorAudio.muted = isMuted;
    }

    /*
     * Bell starts immediately from the visitor's click.
     */
    playAudio(bellAudio, 0.78, "Bell");

    /*
     * Prepare the second sound while browser user activation is active.
     */
    prepareDoorAudio();

    timersRef.current = [
      window.setTimeout(
        () => setStage("verifying"),
        ENTRANCE_TIMELINE.verifying,
      ),

      window.setTimeout(() => setStage("granted"), ENTRANCE_TIMELINE.granted),

      window.setTimeout(() => {
        setStage("opening");
      }, ENTRANCE_TIMELINE.opening),

      window.setTimeout(() => setStage("open"), ENTRANCE_TIMELINE.open),

      window.setTimeout(() => setStage("entering"), ENTRANCE_TIMELINE.entering),

      window.setTimeout(showProfile, ENTRANCE_TIMELINE.profileReady),

      window.setTimeout(() => setStage("exiting"), ENTRANCE_TIMELINE.exiting),

      window.setTimeout(finishTransition, ENTRANCE_TIMELINE.complete),
    ];
  };

  const toggleSound = () => {
    setIsMuted((currentMuted) => {
      const nextMuted = !currentMuted;

      if (bellAudioRef.current) {
        bellAudioRef.current.muted = nextMuted;
      }

      if (doorAudioRef.current) {
        doorAudioRef.current.muted = nextMuted;
      }

      return nextMuted;
    });
  };

  const bellSoundUrl = BELL_SOUND_FILE;

  const doorSoundUrl = DOOR_SOUND_FILE;

  const branchBuildingTheme = getBranchBuildingTheme(branch);

  return (
    <div
      className={`building-transition building-transition--${stage} building-theme--${branchBuildingTheme}`}
      role="dialog"
      aria-label={`Opening ${branch.city} branch profile`}
      aria-modal="true"
      style={{
        "--door-open-duration": `${DOOR_OPEN_DURATION_MS}ms`,
      }}
    >
      <audio
        ref={bellAudioRef}
        src={bellSoundUrl}
        preload="auto"
        muted={isMuted}
        onError={() => setAudioError(true)}
      />

      <audio
        ref={doorAudioRef}
        src={doorSoundUrl}
        preload="auto"
        muted={isMuted}
        onError={() => setAudioError(true)}
      />

      <div className="building-transition__controls">
        <button
          type="button"
          className="building-transition__control"
          onClick={toggleSound}
          aria-label={
            isMuted ? buildingTransitionData.controls.turnSoundOnAria : buildingTransitionData.controls.muteSoundAria
          }
        >
          {isMuted ? (
            <VolumeX size={16} aria-hidden="true" />
          ) : (
            <Volume2 size={16} aria-hidden="true" />
          )}

          <span>{isMuted ? buildingTransitionData.controls.soundOff : buildingTransitionData.controls.soundOn}</span>
        </button>

        <button
          type="button"
          className="building-transition__control"
          onClick={finishTransition}
          aria-label={buildingTransitionData.controls.enterInstantlyAria}
        >
          <span>{buildingTransitionData.controls.enterInstantly}</span>
          <SkipForward size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="building-transition__atmosphere" aria-hidden="true">
        <div className="building-transition__light-beam building-transition__light-beam--left" />
        <div className="building-transition__light-beam building-transition__light-beam--right" />
        <div className="building-transition__particles" />
        <div className="building-transition__vignette" />
      </div>

      <div className="building-transition__camera">
        <div className="hq-building">
          <div className="hq-building__roof-line" />

          <div className="hq-building__upper-sign">
            <div className="hq-building__emblem">
              <Building2 size={27} aria-hidden="true" />
            </div>

            <div className="hq-building__brand-copy">
              <strong>{buildingTransitionData.building.organizationName}</strong>
              <span>{branch.city} {buildingTransitionData.building.branchSuffix}</span>
            </div>
          </div>

          <div className="hq-building__floor hq-building__floor--top">
            {Array.from({ length: 9 }, (_, index) => (
              <span className="hq-window" key={`top-${index}`} />
            ))}
          </div>

          <div className="hq-building__floor hq-building__floor--middle">
            {Array.from({ length: 9 }, (_, index) => (
              <span className="hq-window" key={`middle-${index}`} />
            ))}
          </div>

          <div className="hq-building__ground-floor">
            <div className="hq-building__wing hq-building__wing--left">
              <span className="hq-building__wing-window" />
              <span className="hq-building__wing-window" />
              <span className="hq-building__wing-window" />
            </div>

            <div className="hq-entrance">
              <div className="hq-entrance__canopy">
                <span />
              </div>

              <div className="hq-entrance__branch-display">
                <span>{buildingTransitionData.building.welcomePrefix}</span>
                <strong>{branch.city.toUpperCase()} {buildingTransitionData.building.branchUpperSuffix}</strong>
              </div>

              <div className="hq-entrance__columns" aria-hidden="true">
                <span className="hq-column hq-column--left" />
                <span className="hq-column hq-column--right" />
              </div>

              <div className="hq-entrance__door-frame">
                <div className="hq-door-track" aria-hidden="true" />

                <div className="hq-lobby">
                  <div className="hq-lobby__ceiling-light" />
                  <div className="hq-lobby__side-light hq-lobby__side-light--left" />
                  <div className="hq-lobby__side-light hq-lobby__side-light--right" />

                  <div className="hq-lobby__logo">
                    <Building2 size={21} aria-hidden="true" />
                    <span>{buildingTransitionData.building.organizationAcronym}</span>
                  </div>

                  <div className="hq-lobby__branch-card">
                    <strong>{branch.city} {buildingTransitionData.building.branchSuffix}</strong>
                    <span>{branch.branchId}</span>
                  </div>

                  <div className="hq-lobby__desk">
                    <span className="hq-lobby__desk-light" />
                  </div>

                  <div className="hq-lobby__floor-lines" />
                </div>

                <div className="hq-door-pocket hq-door-pocket--left" />
                <div className="hq-door-pocket hq-door-pocket--right" />

                <div className="hq-door hq-door--left">
                  <span className="hq-door__inner-frame" />
                  <span className="hq-door__reflection" />
                  <span className="hq-door__handle hq-door__handle--left" />
                </div>

                <div className="hq-door hq-door--right">
                  <span className="hq-door__inner-frame" />
                  <span className="hq-door__reflection" />
                  <span className="hq-door__handle hq-door__handle--right" />
                </div>

                <div className="hq-door-threshold" aria-hidden="true" />
              </div>

              <button
                ref={bellButtonRef}
                type="button"
                className="hq-access-panel"
                onClick={startEntranceSequence}
                disabled={stage !== "waiting"}
                aria-label={`Ring the bell for ${branch.city} branch`}
                title={
                  stage === "waiting"
                    ? buildingTransitionData.stageCopy.waiting
                    : STAGE_COPY[stage]
                }
              >
                <span className="hq-access-panel__light" />
                <BellRing size={15} aria-hidden="true" />
              </button>

              {stage === "waiting" && (
                <button
                  type="button"
                  className="hq-access-hint"
                  onClick={startEntranceSequence}
                >
                  <BellRing size={13} aria-hidden="true" />
                  {buildingTransitionData.building.clickBellHint}
                </button>
              )}

              {audioError && !isMuted && (
                <span className="hq-audio-error" role="status">
                  {buildingTransitionData.building.soundUnavailable}
                </span>
              )}

              <div className="hq-entrance__steps">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="hq-building__wing hq-building__wing--right">
              <span className="hq-building__wing-window" />
              <span className="hq-building__wing-window" />
              <span className="hq-building__wing-window" />
            </div>
          </div>

          <div className="hq-landscape" aria-hidden="true">
            <div className="hq-planter hq-planter--left">
              <i />
              <i />
              <i />
            </div>

            <div className="hq-walkway" />

            <div className="hq-planter hq-planter--right">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>

      <div className="building-transition__profile-cover" aria-hidden="true" />
    </div>
  );
};

export default BuildingTransition;
