import { useRef, useCallback } from 'react';
import { gsap } from "gsap";

export function useStampAnimation() {
  const animationRef = useRef(null);

  const get3DPos = (element) => {
    const rect = element.getBoundingClientRect();
    const wrapper = document.querySelector('.stamp-wrapper');
    if (wrapper) {
      const wrapperRect = wrapper.getBoundingClientRect();
      return {
        x: (rect.left + rect.width / 2) - (wrapperRect.left + wrapperRect.width / 2),
        y: -((rect.top + rect.height / 2) - (wrapperRect.top + wrapperRect.height / 2)),
      };
    }
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    return {
      x: rect.left + rect.width / 2 - viewportWidth / 2,
      y: -(rect.top + rect.height / 2 - viewportHeight / 2),
    };
  };

  const resetStamp = useCallback(({ stamp3DRef, inkSurfaceRef }) => {
    if (!stamp3DRef?.current || !inkSurfaceRef?.current) return;
    const stamp = stamp3DRef.current;
    const inkPad = inkSurfaceRef.current;
    const inkPadPos = get3DPos(inkPad);
    gsap.set(stamp.position, { x: inkPadPos.x, y: inkPadPos.y, z: 0 });
    gsap.set(stamp.rotation, { x: 0, y: 0, z: 0 });
    gsap.set(stamp.scale, { x: 1, y: 1, z: 1 });
  }, []);

  const triggerStamp = useCallback(
    ({
      stamp3DRef,
      inkSurfaceRef,
      cardRef,
      onStamped,
      onComplete,
    }) => {
      if (!stamp3DRef?.current || !cardRef?.current || !inkSurfaceRef?.current) return;

      if (animationRef.current) animationRef.current.kill();

      const stamp = stamp3DRef.current;
      const card = cardRef.current;
      const inkPad = inkSurfaceRef.current;

      const cardPos = get3DPos(card);
      const inkPadPos = get3DPos(inkPad);

      const CRUISE_Z = 250;
      const STRIKE_Z = 0;
      const IMPACT_ROT_X = Math.PI / 4;

      gsap.set(stamp.position, { x: inkPadPos.x, y: inkPadPos.y, z: STRIKE_Z });
      gsap.set(stamp.rotation, { x: 0, y: 0, z: 0 });
      gsap.set(stamp.scale, { x: 1, y: 1, z: 1 });

      const tl = gsap.timeline({ onComplete: () => {
        setTimeout(() => {
          onComplete?.();
          gsap.set(stamp.position, { x: inkPadPos.x, y: inkPadPos.y, z: STRIKE_Z });
          gsap.set(stamp.rotation, { x: 0, y: 0, z: 0 });
        }, 400);
      }});
      animationRef.current = tl;

      tl.to(stamp.position, {
        z: CRUISE_Z,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(stamp.position, {
        x: cardPos.x,
        y: cardPos.y + 30,
        z: CRUISE_Z,
        duration: 0.3,
        ease: "power2.inOut",
      }, "+=0.05")
      .to(stamp.rotation, {
        x: IMPACT_ROT_X,
        z: 0,
        duration: 0.3,
        ease: "power2.inOut",
      }, "<")
      .to(stamp.position, {
        y: cardPos.y,
        z: STRIKE_Z,
        duration: 0.12,
        ease: "expo.in",
      })
      .to(stamp.scale, { y: 0.8, duration: 0.12, ease: "expo.in" }, "<")
      .call(() => onStamped?.())
      .to(
        card,
        {
          scale: 0.88,
          boxShadow: "0 0px 1px rgba(0,0,0,0.18)",
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        },
        "<"
      )
      .to(stamp.scale, { y: 1, duration: 0.15 })
      .to(stamp.position, {
        z: CRUISE_Z - 50,
        y: cardPos.y + 80,
        duration: 0.35,
        ease: "back.out(1.2)",
      }, "<")
      .to(stamp.rotation, { x: 0, z: 0.1, duration: 0.35 }, "<");
    },
    [],
  );

  return { triggerStamp, resetStamp };
}
