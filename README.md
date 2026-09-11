# OOP Practicum

Course website for an Object-Oriented Programming practicum, built with Jekyll and the Just the Docs theme.

## Project structure

- `index.md` - course home page and weekly schedule
- `calendar.md` - full calendar view
- `course-info.md` - course overview
- `staff.md` - instructor and TA index
- `ta-1.md`, `ta-2.md`, `ta-3.md` - TA placeholders
- `labs.md`, `homeworks.md`, `projects.md`, `resources.md` - course material indexes
- `_includes/course-schedule.md` - shared schedule table used by Home and Calendar
- `_sass/custom/custom.scss` - visual overrides for the academic course layout

All academic details are intentionally marked `TBA`. Replace the placeholders as the practicum plan is finalized.

## Local development

Install Ruby and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000` in a browser. The GitHub Pages workflow in `.github/workflows/` builds and deploys the site from the `main` branch.
[GitHub Pages / Actions workflow]: https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/
[Bundler]: https://bundler.io
[use this template]: https://github.com/just-the-docs/just-the-docs-template/generate
[`jekyll-default-layout`]: https://github.com/benbalter/jekyll-default-layout
[`jekyll-seo-tag`]: https://jekyll.github.io/jekyll-seo-tag
[MIT License]: https://en.wikipedia.org/wiki/MIT_License
[starter workflows]: https://github.com/actions/starter-workflows/blob/main/pages/jekyll.yml
[actions/starter-workflows]: https://github.com/actions/starter-workflows/blob/main/LICENSE
