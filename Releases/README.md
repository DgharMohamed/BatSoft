# Releases

Publishing contract for BatSoft applications, enforced by
`.github/workflows/publish-release.yml`:

- `Releases/<App>.exe` — the built Windows installer, named after the app
  (e.g. `BatPlayer.exe`).
- `Releases/<App>.json` — metadata sidecar, **committed in the same push**:

  ```json
  {
    "app": "BatPlayer",
    "version": "0.1.0",
    "file": "BatPlayer.exe",
    "sha256": "…lowercase hex…",
    "size": 12345678,
    "builtAt": "2026-10-24T21:00:00Z",
    "notes": ""
  }
  ```

- On a push to `main` touching `Releases/**`, CI verifies the exe's SHA-256
  against the metadata, then creates a GitHub Release with
  - tag `<app>-v<version>` (app name lowercased, e.g. `batplayer-v0.1.0`),
  - title `<App> v<version>`,
  - the exe as the release asset, checksum in the release notes.
- Releasing the same version twice fails CI on purpose; bump the app's
  version first, then rerun its release script.
- Installer binaries are committed here on purpose (this folder is the
  transport into GitHub Releases); the catalog pages on the site link to the
  GitHub release pages, never to files served by this website.
