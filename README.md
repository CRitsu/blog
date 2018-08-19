# blog-ui

Clean up.


## I18n memo

Language files are putting in the `\public\locales` folder.

`I18next` use `i18next-xhr-backend` as a backend to load locale files.

There was no way to put locale files in src folder because no option can handle that copy .json file as static assets to build folder(project created by Create-React-App). But I think it's OK, the `public` folder in react is just for do this.

There is another question, the `i18next-browser-languagedetector` module is use to detect user language, but how do it work? Would it return 'zh' when user language is Chinese?
