import type { ProductInput } from "@/lib/products/schema";

/**
 * BatSoft product catalog.
 *
 * IMPORTANT — data provenance rules enforced across the site:
 * - No version numbers, release dates, download URLs, file sizes or checksums
 *   are written here because none have been provided yet. Every release field
 *   is omitted and the UI renders honest "Not yet available" states.
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
      "A modern media player for Windows, currently in active development.",
    description: [
      "BatPlayer is BatSoft's first application: a media player for Windows built around a simple goal — playback that starts fast, stays out of the way, and keeps the essentials within reach.",
      "BatPlayer is in active development. The information on this page describes the project's direction, not a shipped release. Version details, system requirements and download links will be published here as soon as the first release is finalized.",
    ],
    privacyFocus: [
      "BatPlayer is being built to play media files that already live on your device. Playback is intended to stay between you and the app: no account system, no sign-in and no usage statistics are part of the plan.",
      "Library browsing is intended to read only the media you point the player at. Nothing is planned to run in the background, and nothing about your files or playback is planned to leave the machine.",
    ],
    category: "Media",
    status: "in-development",
    featured: true,
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
        question: "When will BatPlayer be released?",
        answer:
          "BatPlayer is in active development and no release date has been announced yet. This page and the release history will be updated as soon as an official build is published.",
      },
      {
        question: "How much will BatPlayer cost?",
        answer:
          "Licensing and pricing have not been finalized. Any decision will be announced on this page before the first release.",
      },
      {
        question: "Which Windows versions will be supported?",
        answer:
          "System requirements will be published alongside the first release, once they have been properly tested. Until then, no compatibility claims are made.",
      },
    ],
    seoTitle: "BatPlayer — Media player for Windows (in development)",
    seoDescription:
      "BatPlayer is BatSoft's media player for Windows, currently in active development. Follow the project for release details, requirements and downloads.",
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
