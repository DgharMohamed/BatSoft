import type { ProductInput } from "@/lib/products/schema";

/**
 * BatSoft product catalog.
 *
 * IMPORTANT — data provenance rules enforced across the site:
 * - Release fields are only written from real, verified GitHub Releases.
 *   BatPlayer's release fields come from the verified release
 *   batplayer-v0.1.1; other products still omit every release field and
 *   the UI renders honest "Not yet available" states for them.
 * - Descriptions, planned capabilities and FAQs below are initial brand copy
 *   for unreleased products; replace them with confirmed product information
 *   as it becomes available.
 * - `privacyFocus` paragraphs are initial data-handling direction copy for
 *   each product's privacy page; finalise them against the shipped build
 *   before the first release.
 * - Only add `downloadUrl` / `releasePageUrl` / `sha256` etc. once the values
 *   come from a real, verified GitHub Release (HTTPS links only).
 */
export const products: ProductInput[] = [
  {
    id: "batplayer",
    slug: "batplayer",
    name: "BatPlayer",
    icon: "/batplayer-icon.png",
    shortDescription:
      "A modern media player for Windows that starts fast and stays out of the way.",
    description: [
      "BatPlayer is BatSoft's first released application: a media player for Windows built around a simple goal — playback that starts fast, stays out of the way, and keeps the essentials within reach.",
      "The current release, v0.1.1 (October 24, 2026), is available now. The download button on this page links to the official release asset on GitHub, and the release page lists the notes plus the SHA-256 checksum published for verified downloads.",
    ],
    privacyFocus: [
      "BatPlayer plays media files that already live on your device. Playback stays between you and the app: no account system, no sign-in and no usage statistics.",
      "Library browsing reads only the media you point the player at. Nothing runs in the background, and nothing about your files or playback leaves the machine.",
    ],
    category: "Media",
    status: "available",
    featured: true,
    // Verified source: GitHub Release batplayer-v0.1.1 (published 2026-10-24).
    platforms: ["Windows 10 or later (64-bit)"],
    requirements: [
      { label: "Operating system", value: "Windows 10 or later (64-bit)" },
      { label: "Runtime", value: "WebView2 runtime (installed automatically by the setup when missing)" },
    ],
    latestVersion: "0.1.1",
    releaseDate: "2026-10-24",
    releasePageUrl: "https://github.com/DgharMohamed/BatSoft/releases/tag/batplayer-v0.1.1",
    downloadUrl: "https://github.com/DgharMohamed/BatSoft/releases/download/batplayer-v0.1.1/BatPlayer.exe",
    installerFilename: "BatPlayer.exe",
    fileSize: "34.8 MB",
    architecture: "x64 (64-bit)",
    sha256: "f2270bbf2448574bce80a844cbce110732ff766518d00d5a147c53d8de1c39dc",
    changelog: [
      {
        version: "0.1.1",
        date: "2026-10-24",
        summary: "Windows \"Open with\" integration: BatPlayer plays the file the system opens it with.",
        added: [
          "BatPlayer is registered with Windows \"Open with\" for the video and audio formats it plays.",
          "Files opened through \"Open with\" (or double-click association) load and play instead of opening the player empty.",
          "Opening another file while BatPlayer runs now loads it in the running window instead of launching a second player.",
        ],
        fixes: [
          "The context menu's mini player entry no longer fails when activated.",
        ],
      },
      {
        version: "0.1.0",
        date: "2026-10-24",
        summary: "First public release of BatPlayer for Windows.",
        added: [
          "Windows installer with a custom dark setup experience (English and Arabic).",
          "Playback for a wide range of video and audio formats via libmpv.",
          "Playlist with queue, shuffle and loop, folder queuing, drag-and-drop and Open Recent.",
          "Playback speed control, frame stepping, snapshots, fullscreen and a compact mini player.",
          "Audio track and subtitle switching.",
          "Resume playback from the last position of recently opened files.",
        ],
      },
    ],
    features: [
      {
        title: "Built for Windows",
        description:
          "Designed specifically for the Windows desktop, not ported from another platform.",
      },
      {
        title: "Lightweight by design",
        description:
          "Fast startup and a small footprint — a player that respects your machine.",
      },
      {
        title: "Focused experience",
        description:
          "The essentials done well: your library, your playback, nothing in the way.",
      },
    ],
    faq: [
      {
        question: "Is BatPlayer released?",
        answer:
          "Yes. The first official build shipped on October 24, 2026, and the current release (v0.1.1) adds Windows \"Open with\" integration. The download button on this page links to the official release asset, and the release page lists the notes and the published SHA-256 checksum.",
      },
      {
        question: "How much will BatPlayer cost?",
        answer:
          "Licensing and pricing have not been finalized. The current release is available as a direct download from this page, and any future decision will be announced here first.",
      },
      {
        question: "Which Windows versions does BatPlayer support?",
        answer:
          "BatPlayer requires Windows 10 or later on a 64-bit system. The installer has been installed and tested on Windows 11; support for older Windows builds continues to be verified.",
      },
    ],
    seoTitle: "BatPlayer — Media player for Windows (v0.1.1)",
    seoDescription:
      "BatPlayer is BatSoft's media player for Windows. The current release, v0.1.1, is available to download as an official installer with a published checksum.",
  },
  {
    id: "battools",
    slug: "battools",
    name: "BatTools",
    shortDescription:
      "A collection of small, practical utilities for everyday Windows tasks.",
    description: [
      "BatTools is planned as a suite of focused utilities — small tools that each do one everyday job well instead of one sprawling program that does everything badly.",
      "BatTools is in the early planning stages. Details about the individual tools, requirements and availability will be shared on this page as development progresses.",
    ],
    privacyFocus: [
      "BatTools is planned as a set of small, focused utilities that each do one job on files or settings already on your device. A tool runs when you use it, does its job on your machine and stops — with no service sitting in between.",
      "No account system and no telemetry service are part of the plan. If any future tool ever needs something outside the device, that change will be documented on this page before that tool's first release.",
    ],
    category: "Utilities",
    status: "coming-soon",
    faq: [
      {
        question: "What will be included in BatTools?",
        answer:
          "The exact set of tools has not been finalized. Details will be published on this page as the project takes shape.",
      },
      {
        question: "When will BatTools be available?",
        answer:
          "No release date has been set. BatTools will be marked as available on this site as soon as an official build is published.",
      },
    ],
    seoTitle: "BatTools — Windows utilities (coming soon)",
    seoDescription:
      "BatTools is a planned collection of practical Windows utilities from BatSoft. See the current project status and what is planned.",
  },
  {
    id: "batconvert",
    slug: "batconvert",
    name: "BatConvert",
    shortDescription:
      "A straightforward file conversion tool for Windows, planned but not yet started.",
    description: [
      "BatConvert is planned as a no-nonsense file conversion tool for Windows: pick a file, choose a target format, get the result — without upsells, watermarks or account requirements.",
      "BatConvert has not entered active development yet. Everything on this page reflects the current plan and will be updated as the project progresses.",
    ],
    privacyFocus: [
      "BatConvert is planned to convert files locally: pick a file, choose a target format and receive the result — without accounts, sign-ups or file uploads.",
      "No conversion history is planned beyond preferences stored on your device, and converted files are written only where you choose to save them.",
    ],
    category: "Conversion",
    status: "coming-soon",
    faq: [
      {
        question: "Which formats will BatConvert support?",
        answer:
          "Supported formats have not been decided yet. They will be announced on this page once development starts and the format list has been tested.",
      },
      {
        question: "When will BatConvert be available?",
        answer:
          "No release date has been set. BatConvert is a planned project and will be marked as available on this site only after an official build is published.",
      },
    ],
    seoTitle: "BatConvert — File conversion for Windows (coming soon)",
    seoDescription:
      "BatConvert is a planned file conversion tool for Windows from BatSoft. See the current project status.",
  },
];
