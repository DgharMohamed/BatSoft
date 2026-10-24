import Image from "next/image";
import {
  Heart,
  ListMusic,
  ListPlus,
  Minus,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Square,
  Volume2,
  X,
} from "lucide-react";

/**
 * Polished CSS-based product presentation for BatPlayer. This is a conceptual
 * composition, not a screenshot of a real application — every usage site must
 * keep the accompanying "concept preview" caption visible.
 */
export function AppWindowMockup() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border border-line bg-surface shadow-[var(--shadow-elevated)]"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <Image
            src="/batplayer-icon.png"
            alt=""
            width={24}
            height={24}
            className="size-6 object-contain"
          />
          <span className="text-xs text-muted">BatPlayer</span>
        </div>
        <div className="flex items-center gap-3 text-muted">
          <Minus className="size-3" />
          <Square className="size-2.5" />
          <X className="size-3.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[168px_1fr]">
        {/* Sidebar */}
        <div className="hidden border-r border-line p-3 sm:block">
          <p className="px-2 pb-2 text-[10px] font-semibold tracking-[0.18em] text-muted/70 uppercase">
            Library
          </p>
          <ul className="space-y-0.5 text-xs text-muted">
            {[
              { icon: Music, label: "All media", active: true },
              { icon: ListMusic, label: "Playlists" },
              { icon: Heart, label: "Favourites" },
              { icon: ListPlus, label: "Add folder" },
            ].map(({ icon: Icon, label, active }) => (
              <li
                key={label}
                className={`flex items-center gap-2.5 px-2 py-1.5 ${
                  active ? "bg-surface-2 text-foreground" : ""
                }`}
              >
                <Icon className="size-3.5" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Playback area */}
        <div className="relative flex flex-col">
          <div className="grid aspect-video place-items-center bg-gradient-to-b from-surface-2/80 to-surface">
            <span className="grid size-16 place-items-center rounded-full bg-brand text-brand-contrast shadow-lg shadow-black/25">
              <Play className="ml-0.5 size-6 fill-current" />
            </span>
          </div>

          {/* Player controls */}
          <div className="border-t border-line px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 text-xs">
                <p className="truncate font-medium text-foreground">
                  Now playing
                </p>
                <p className="truncate text-muted">Track title — Artist</p>
              </div>
              <div className="flex items-center gap-4 text-muted">
                <SkipBack className="size-4" />
                <Pause className="size-4" />
                <SkipForward className="size-4" />
                <Volume2 className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-mono text-[10px] text-muted">1:24</span>
              <div className="h-1 flex-1 rounded-full bg-line">
                <div className="h-1 w-1/3 rounded-full bg-brand" />
              </div>
              <span className="font-mono text-[10px] text-muted">3:56</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
