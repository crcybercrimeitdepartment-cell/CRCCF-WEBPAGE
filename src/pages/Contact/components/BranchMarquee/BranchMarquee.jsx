import { useCallback, useEffect, useRef, useState } from "react";
import { branchMarqueeData } from "./BranchMarqueeData";

const SWIPE_THRESHOLD = 6;
const MARQUEE_COPIES = 3;
const AUTO_RESUME_DELAY = 900;

const getTranslateX = (element) => {
  const transform = window.getComputedStyle(element).transform;
  if (!transform || transform === "none") return 0;

  return new DOMMatrixReadOnly(transform).m41;
};

const BranchMarquee = ({
  branches,
  activeBranch,
  startNumber = 1,
  onSelect,
  onActiveInView,
  ariaLabel = branchMarqueeData.defaults.ariaLabel,
  showUniqueOnly = false,
  autoStepMs = 5000,
}) => {
  const [isTouching, setIsTouching] = useState(false);
  const [isAutoStopped, setIsAutoStopped] = useState(false);
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);
  const cycleDistanceRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const previewTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const suppressClickRef = useRef(false);
  const activePreviewIndexRef = useRef(0);
  const gestureRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    baseOffset: 0,
    isDragging: false,
  });

  const shouldAnimateMarquee = !showUniqueOnly;
  const animationDuration = Math.max(branches.length * autoStepMs, 1000);
  const visibleItems = showUniqueOnly
    ? branches
    : Array.from({ length: MARQUEE_COPIES }, () => branches).flat();

  const updateCycleDistance = useCallback(() => {
    const track = trackRef.current;
    if (!track || !branches.length) return;

    const firstItem = track.querySelector('[data-branch-marquee-index="0"]');
    const firstDuplicate = track.querySelector(
      `[data-branch-marquee-index="${branches.length}"]`,
    );
    const cycleDistance =
      firstItem && firstDuplicate
        ? firstDuplicate.offsetLeft - firstItem.offsetLeft
        : track.scrollWidth / MARQUEE_COPIES;

    cycleDistanceRef.current = cycleDistance;
    track.style.setProperty("--branch-marquee-cycle-distance", `${cycleDistance}px`);
    track.style.setProperty("--branch-marquee-duration", `${animationDuration}ms`);
  }, [animationDuration, branches.length]);

  const normalizeOffset = useCallback((offset) => {
    const cycleDistance = cycleDistanceRef.current;
    if (!cycleDistance) return offset;

    let nextOffset = offset;
    while (nextOffset <= -cycleDistance) nextOffset += cycleDistance;
    while (nextOffset > 0) nextOffset -= cycleDistance;
    return nextOffset;
  }, []);

  const applyDragOffset = useCallback(
    (offset) => {
      const track = trackRef.current;
      if (!track) return;

      const nextOffset = normalizeOffset(offset);
      dragOffsetRef.current = nextOffset;
      track.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
    },
    [normalizeOffset],
  );

  const pauseMarquee = useCallback(() => {
    const track = trackRef.current;
    if (!track || showUniqueOnly) return;

    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }

    const currentOffset = normalizeOffset(getTranslateX(track));
    dragOffsetRef.current = currentOffset;
    track.style.animation = "none";
    track.style.animationDelay = "0ms";
    track.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
  }, [normalizeOffset, showUniqueOnly]);

  const resumeMarquee = useCallback(
    (delay = AUTO_RESUME_DELAY) => {
      const resume = () => {
        const track = trackRef.current;
        const cycleDistance = cycleDistanceRef.current;
        if (!track || !cycleDistance || showUniqueOnly || isAutoStopped) {
          setIsTouching(false);
          resumeTimerRef.current = null;
          return;
        }

        const offset = normalizeOffset(dragOffsetRef.current);
        const progress = Math.abs(offset) / cycleDistance;
        track.style.animation = "";
        track.style.animationDelay = `${-progress * animationDuration}ms`;
        track.style.transform = "";
        setIsTouching(false);
        resumeTimerRef.current = null;
      };

      if (delay > 0) {
        resumeTimerRef.current = window.setTimeout(resume, delay);
        return;
      }

      resume();
    },
    [animationDuration, isAutoStopped, normalizeOffset, showUniqueOnly],
  );

  useEffect(() => {
    if (!shouldAnimateMarquee || isAutoStopped) return undefined;

    window.requestAnimationFrame(() => {
      updateCycleDistance();
      activePreviewIndexRef.current = 0;
      onActiveInView?.(branches[0]);
      resumeMarquee(0);
    });
    window.addEventListener("resize", updateCycleDistance);

    return () => {
      window.removeEventListener("resize", updateCycleDistance);
    };
  }, [
    branches,
    isAutoStopped,
    onActiveInView,
    resumeMarquee,
    shouldAnimateMarquee,
    updateCycleDistance,
  ]);

  useEffect(() => {
    if (
      !shouldAnimateMarquee ||
      !onActiveInView ||
      !branches.length ||
      isAutoStopped
    ) {
      return undefined;
    }

    previewTimerRef.current = window.setInterval(() => {
      activePreviewIndexRef.current =
        (activePreviewIndexRef.current + 1) % branches.length;
      onActiveInView(branches[activePreviewIndexRef.current]);
    }, autoStepMs);

    return () => {
      if (previewTimerRef.current) {
        window.clearInterval(previewTimerRef.current);
        previewTimerRef.current = null;
      }
    };
  }, [
    autoStepMs,
    branches,
    isAutoStopped,
    onActiveInView,
    shouldAnimateMarquee,
  ]);

  useEffect(() => {
    const track = trackRef.current;
    const container = marqueeRef.current;
    if (showUniqueOnly) {
      // Reset any frozen animation/transform from the marquee mode so cards
      // don't appear shifted or cut off when search results are displayed.
      if (track) {
        track.style.animation = "";
        track.style.animationDelay = "";
        track.style.transform = "";
      }
      if (container) {
        container.scrollLeft = 0;
      }
      dragOffsetRef.current = 0;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAutoStopped(false);
    }
  }, [showUniqueOnly, branches]);

  useEffect(
    () => () => {
      if (previewTimerRef.current) {
        window.clearInterval(previewTimerRef.current);
      }
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    },
    [],
  );

  const handlePointerDown = (event) => {
    if (showUniqueOnly) {
      dragOffsetRef.current = marqueeRef.current?.scrollLeft || 0;
    } else {
      pauseMarquee();
    }

    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseOffset: dragOffsetRef.current,
      isDragging: false,
    };
    setIsTouching(true);
  };

  const handlePointerMove = (event) => {
    const gesture = gestureRef.current;
    if (gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (!gesture.isDragging) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) return;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

      gesture.isDragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (event.cancelable) event.preventDefault();

    if (showUniqueOnly) {
      if (marqueeRef.current) {
        marqueeRef.current.scrollLeft = gesture.baseOffset - deltaX;
      }
      return;
    }

    applyDragOffset(gesture.baseOffset + deltaX);
  };

  const finishPointerGesture = (event) => {
    const gesture = gestureRef.current;
    if (gesture.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (gesture.isDragging) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    gestureRef.current = {
      ...gesture,
      pointerId: null,
      isDragging: false,
    };
    if (!showUniqueOnly) {
      resumeMarquee();
    } else {
      setIsTouching(false);
    }
  };

  const handleWheel = (event) => {
    const hasHorizontalIntent =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
    if (!hasHorizontalIntent) return;
    if (showUniqueOnly) {
      if (marqueeRef.current) {
        marqueeRef.current.scrollLeft += event.shiftKey
          ? event.deltaY
          : event.deltaX;
      }
      return;
    }

    pauseMarquee();
    setIsTouching(true);
    applyDragOffset(
      dragOffsetRef.current - (event.shiftKey ? event.deltaY : event.deltaX),
    );
    resumeMarquee();
  };

  const handleClickCapture = (event) => {
    if (!suppressClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  const handleSelectBranch = useCallback(
    (branch) => {
      if (!showUniqueOnly) {
        pauseMarquee();
        setIsAutoStopped(true);
        setIsTouching(false);

        if (previewTimerRef.current) {
          window.clearInterval(previewTimerRef.current);
          previewTimerRef.current = null;
        }
      }

      onSelect(branch);
    },
    [onSelect, pauseMarquee, showUniqueOnly],
  );

  if (!branches.length) return null;

  return (
    <section
      ref={marqueeRef}
      aria-label={ariaLabel}
      className={`branch-marquee branch-marquee--full-bleed relative py-1 ${
        showUniqueOnly
          ? `branch-marquee--unique cursor-grab overflow-x-auto ${
              isTouching ? "branch-marquee--touching cursor-grabbing" : ""
            }`
          : `branch-marquee--auto cursor-grab overflow-hidden ${
              isTouching ? "branch-marquee--touching cursor-grabbing" : ""
            }`
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerGesture}
      onPointerCancel={finishPointerGesture}
      onWheel={handleWheel}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={handleClickCapture}
    >
      <div
        ref={trackRef}
        className={`branch-marquee-track flex w-max select-none gap-3 ${
          showUniqueOnly
            ? "min-w-full px-3"
            : "px-3"
        }`}
      >
        {visibleItems.map((branch, index) => {
          const sourceIndex = index % branches.length;
          const copyIndex = Math.floor(index / branches.length);
          const isDuplicate = !showUniqueOnly && copyIndex > 0;

          return (
            <MarqueeBranchCard
              key={`${copyIndex}-${branch.id}`}
              branch={branch}
              number={startNumber + sourceIndex}
              isActive={branch.id === activeBranch?.id}
              onSelect={handleSelectBranch}
              isDuplicate={isDuplicate}
              trackIndex={index}
              sourceIndex={sourceIndex}
            />
          );
        })}
      </div>
    </section>
  );
};

const MarqueeBranchCard = ({
  branch,
  number,
  isActive,
  onSelect,
  isDuplicate = false,
  trackIndex,
  sourceIndex,
}) => (
  <button
    type="button"
    data-branch-marquee-index={trackIndex}
    data-branch-source-index={sourceIndex}
    onClick={() => onSelect(branch)}
    aria-hidden={isDuplicate ? "true" : undefined}
    aria-pressed={isDuplicate ? undefined : isActive}
    aria-label={
      isDuplicate
        ? undefined
        : branchMarqueeData.card.selectAriaLabel(branch.displayCity, branch.branchId)
    }
    tabIndex={isDuplicate ? -1 : 0}
    className={`group relative w-[218px] shrink-0 touch-manipulation overflow-hidden rounded-[1.2rem] border p-3 text-left transition-[transform,border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/30 sm:w-[250px] sm:p-3.5 ${
      isActive
        ? "border-[rgba(0,158,235,0.68)] bg-[linear-gradient(135deg,#101828_0%,#0B3B7A_56%,#009EEB_100%)] text-white shadow-[0_12px_34px_rgba(11,111,244,0.25),0_0_22px_rgba(0,184,217,0.2)]"
        : "border-white/90 bg-white/85 text-slate-950 shadow-[0_10px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
    }`}
  >
    <span
        className={`pointer-events-none absolute -right-8 -top-9 h-24 w-24 rounded-full blur-2xl ${
        isActive ? "bg-[#00B8D9]/20" : "bg-cyan-100/60"
      }`}
    />

    <span className="relative flex items-center justify-between gap-3">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-xl text-[10px] font-black sm:h-9 sm:w-9 ${
          isActive
            ? "bg-[#0B6FF4] text-white"
            : "border border-slate-200 bg-slate-50 text-slate-500 group-hover:border-cyan-200 group-hover:text-cyan-700"
        }`}
      >
        {String(number).padStart(2, "0")}
      </span>

      {isActive ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,184,217,0.38)] bg-[rgba(11,111,244,0.16)] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#7DD3FC]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00B8D9] shadow-[0_0_8px_currentColor]" />
          {branchMarqueeData.card.activeText}
        </span>
      ) : (
        <span className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-400">
          {branchMarqueeData.card.inactiveText}
        </span>
      )}
    </span>

    <span className="relative mt-2.5 block min-w-0 sm:mt-3">
      <strong className="block truncate text-[15px] font-black tracking-[-0.02em] sm:text-base">
        {branch.displayCity}
      </strong>
      <span
        className={`mt-0.5 block truncate text-[10px] font-bold ${
          isActive ? "text-[#C7E9FF]" : "text-slate-500"
        }`}
      >
        {branch.displayState}, {branch.country}
      </span>
    </span>

    <span
      className={`relative mt-2.5 flex items-center justify-between gap-3 border-t pt-2.5 sm:mt-3 ${
        isActive ? "border-white/10" : "border-slate-100"
      }`}
    >
      <span
        className={`truncate text-[9px] font-black uppercase tracking-[0.08em] ${
          isActive ? "text-[#C7E9FF]" : "text-cyan-700"
        }`}
      >
        {branch.branchId}
      </span>
      <span className="shrink-0 text-[8px] font-bold text-slate-400">
        {branch.serialNo}
      </span>
    </span>
  </button>
);

export { BranchMarquee, MarqueeBranchCard };
export default BranchMarquee;
