# OOP 26

Pemrograman Berorientasi Objek Gasal 2026 - S1 Kecerdasan Artifisial, Unesa. Built with Jekyll and the Just the Docs theme.

## Site structure

- `index.md` - course home page and weekly schedule
- `calendar.md` - full calendar view
- `course-info.md` - course overview
- `staff.md` - instructor and TA list
- `resources.md` - course resource index
- `assignment/live-study-case-2025c/` - standalone Live Study Case KampusPinjam page, matching the original portal layout and its seven team starter files
- `_includes/course-schedule.md` - shared schedule table used by Home and Calendar
- `_sass/custom/custom.scss` - visual overrides for the academic course layout

The schedule contains the Semester Gasal 2026 meeting dates, class groups, locations, and weekly topic outlines. The Live Study Case page is a public GitHub Pages version of the original KampusPinjam portal for class 2025C.

## Local development

Install Ruby and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000/Praktikum-Gasal-2026/assignment/live-study-case-2025c/` in a browser. The GitHub Pages workflow in `.github/workflows/` builds and deploys the site when changes are pushed to the `main` branch.
