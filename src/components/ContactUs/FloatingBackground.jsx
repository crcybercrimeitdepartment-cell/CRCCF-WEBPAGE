import React, { useMemo } from "react";
// We import default device icons to use on the main dashboard page
import {
  Smartphone,
  Tablet,
  MonitorSmartphone,
  Phone,
  Laptop,
} from "lucide-react";

// ✨ React.memo wrapping:
// This is a performance optimization. It tells React NOT to re-render this entire
// background of icons every time the user hovers over a card or clicks something,
// which keeps your app running fast and smoothly.
const FloatingBackground = React.memo(
  // We accept 'icons' and 'count' as props.
  // ✨ FIX 1: Added `count = 60` as the default fallback!
  ({
    icons = [Smartphone, Tablet, MonitorSmartphone, Phone, Laptop],
    count = 60,
  }) => {
    // ✨ useMemo Hook:
    // We use this to calculate the random positions, sizes, and speeds ONLY ONCE
    // when the component loads.
    const floatingIcons = useMemo(() => {
      // ✨ FIX 2: Replaced the hardcoded '60' with our dynamic 'count' variable!
      return Array.from({ length: count }).map((_, i) => {
        // Pick one random icon from whichever array of icons was passed to this page
        const RandomIcon = icons[Math.floor(Math.random() * icons.length)];

        return {
          id: i, // A unique ID for React's rendering engine
          Icon: RandomIcon, // The actual icon component to render

          // Randomize starting position across the full 100% width and height of the screen
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,

          // Randomize how fast they float (between 25s and 65s) so they don't move in a uniform block
          animationDuration: `${25 + Math.random() * 40}s`,

          // Randomize the start time so some are already moving when the page loads
          animationDelay: `-${Math.random() * 40}s`,

          // Randomize the icon size (between 16px and 46px) for a cool depth-of-field effect
          size: 16 + Math.random() * 30,
        };
      });
    }, [icons, count]); // ✨ FIX 3: Added 'count' to this array so it updates if the count changes!

    return (
      // The main background container:
      // fixed, full screen (w-screen h-screen), hidden overflow, and pushed to the very back (z-0)
      // pointer-events-none ensures you can't accidentally click or highlight the background icons!
      <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
        {/* Loop through our generated icon configurations and render them to the screen */}
        {floatingIcons.map((icon) => (
          <div
            key={icon.id}
            // text-blue-400 with 20% opacity gives that subtle, premium watermark look
            className="absolute text-blue-400 opacity-20 drop-shadow-sm"
            // We apply the randomly generated math values directly to the style attribute
            style={{
              left: icon.left,
              top: icon.top,
              // Triggers the custom CSS keyframe we made in index.css
              // 'alternate' makes them float back and forth smoothly instead of teleporting
              animation: `floatAmbient ${icon.animationDuration} ease-in-out infinite alternate`,
              animationDelay: icon.animationDelay,
            }}
          >
            {/* Render the actual Lucide icon component with its specific random size */}
            <icon.Icon size={icon.size} />
          </div>
        ))}
      </div>
    );
  },
);

export default FloatingBackground;
