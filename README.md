# blog-ui

Clean up.


## I18n memo

Language files are putting in the `\public\locales` folder.

`I18next` use `i18next-xhr-backend` as a backend to load locale files.

There was no way to put locale files in src folder because no option can handle that copy .json file as static assets to build folder(project created by Create-React-App). But I think it's OK, the `public` folder in react is just for do this.

There is another question, the `i18next-browser-languagedetector` module is use to detect user language, but how do it work? Would it return 'zh' when user language is Chinese?

## Web Font memo

Loading a large size font should not let users to be waiting too much.

This css attribute can be help!

`font-display` has few enable values.

- `auto` the user agent will determines how to display font
- `block` block display for a short period, if downloading is not finished, use the default font until it is downloaded
- `swap` block for an extremely small period, and display use default font, swap to web font while download is done
- `fallback` similar to `swap` but only a short swap period, if web font can not be downloaded within swap period, font would not be swapped even download is done after swap period
- `optional` only an extremely small block period, no swap period

This blog use web font as icon, so `swap` is enough, don't let waiting be too long, and ensure the font must be displayed finally.
