"use client";

import { Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useRef, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "batsoft-theme";
const THEME_COLORS: Record<Theme, string> = {
  dark: "#121316",
  light: "#e5e4df",
};
/** Must stay in sync with the cross-fade duration in globals.css. */
const FALLBACK_MS = 340;

type ViewTransitionHandle = { finished: Promise<void> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransitionHandle;
};

/** Reads the theme the boot script (or a toggle) wrote onto <html>. */
function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/**
 * Where the reveal starts. The pointer when the button is clicked, the centre
 * of the button when it is activated from the keyboard, and the centre of the
 * viewport when there is no event at all.
 */
function getOrigin(event?: MouseEvent<HTMLButtonElement>) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (!event) {
    return { x: width / 2, y: height / 2 };
  }

  // Keyboard activation reports a (0, 0) click, so fall back to the control.
  if (event.clientX === 0 && event.clientY === 0) {
    const box = event.currentTarget.getBoundingClientRect();
    return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
  }

  return { x: event.clientX, y: event.clientY };
}

/**
 * Switches html[data-theme], which drives every colour token in globals.css.
 * The starting value comes from the inline boot script in the root layout, so
 * there is no flash of the wrong theme and no hydration mismatch — this button
 * only reflects and updates what the document already says.
 *
 * The switch is animated in one of two ways:
 *  1. Where the View Transitions API exists, the new theme is revealed through
 *     a circle that expands from the click point.
 *  2. Otherwise every theme-aware property cross-fades in place.
 * Both are skipped for visitors who ask for reduced motion.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeReveals = useRef(0);

  useEffect(
    () => () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    },
    [],
  );

  const applyTheme = (value: Theme) => {
    const root = document.documentElement;
    root.dataset.theme = value;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[value]);

    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Private mode or blocked storage — the choice just won't persist.
    }
  };

  const toggle = (event?: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const { x, y } = getOrigin(event);
    // Radius that reaches the furthest corner of the viewport from the origin.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.style.setProperty("--theme-origin-x", `${x}px`);
    root.style.setProperty("--theme-origin-y", `${y}px`);
    root.style.setProperty("--theme-radius", `${radius}px`);

    const startViewTransition = (document as ViewTransitionDocument)
      .startViewTransition;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (startViewTransition && !reduceMotion) {
      root.dataset.themeReveal = "expand";
      activeReveals.current += 1;
      // A second click while a reveal is running skips the first one; only the
      // last reveal standing may clear the marker.
      const clear = () => {
        activeReveals.current = Math.max(0, activeReveals.current - 1);
        if (activeReveals.current === 0) {
          delete root.dataset.themeReveal;
        }
      };
      try {
        const transition = startViewTransition.call(document, () => {
          applyTheme(nextTheme);
        });
        transition.finished.then(clear, clear);
      } catch {
        clear();
        applyTheme(nextTheme);
      }
      return;
    }

    // Fallback: cross-fade the theme-aware properties in place.
    root.dataset.themeTransition = "true";
    applyTheme(nextTheme);
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    fallbackTimer.current = setTimeout(() => {
      delete root.dataset.themeTransition;
    }, FALLBACK_MS);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className="grid size-10 place-items-center border border-line bg-surface-2 text-foreground transition-colors hover:border-line-strong"
    >
      <span className="theme-icon relative block size-4">
        <Sun aria-hidden="true" className="theme-icon-sun absolute inset-0 size-4" />
        <Moon aria-hidden="true" className="theme-icon-moon absolute inset-0 size-4" />
      </span>
    </button>
  );
}
