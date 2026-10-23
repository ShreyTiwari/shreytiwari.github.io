---
name: add-profile-photo
description: Add a new photo to the homepage's random profile-photo rotation (crop, export, and register it in the inline array in index.html).
---

# Add a profile photo

`#about` in `index.html` shows one of `images/profile-*.jpg` at random per page load; the list is the inline array in the `<script>` directly after `<img id="profile-photo">`.

To add a photo: crop it **square**, framed wide enough that the setting reads and not just the face — subject roughly a third of the frame height, centered (the frame is a rounded square, 224px on desktop and 96px on mobile, with `object-fit: cover`, so the subject must still read at thumbnail size). Export ~800×800 JPEG, drop it in `images/`, and add the filename to that inline array. Full-resolution sources live in `images/originals/` (gitignored, not served) for re-cropping; HEIC files there are unusable in Chrome/Firefox, so anything from that folder must be converted to JPEG first.
