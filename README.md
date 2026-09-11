# OOP 26

Pemrograman Berorientasi Objek Gasal 2026 - S1 Kecerdasan Artifisial, Unesa. Built with Jekyll and the Just the Docs theme.

## Site structure

- `index.md` - course home page and weekly schedule
- `calendar.md` - full calendar view
- `course-info.md` - course overview
- `staff.md` - instructor and TA list
- `resources.md` - course resource index
- `_includes/course-schedule.md` - shared schedule table used by Home and Calendar
- `_sass/custom/custom.scss` - visual overrides for the academic course layout

All academic details are intentionally marked `TBA`. Replace the placeholders as the course plan is finalized.

## Local development

Install Ruby and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000` in a browser. The GitHub Pages workflow in `.github/workflows/` builds and deploys the site from the `main` branch.
