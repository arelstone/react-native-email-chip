# Changelog

## Version 2.3.0
- ♻️ Convert all components from class components to functional components
- 👷 Workflows has been updated to require gitmoji
- ⬆️ Upgrade all dependencies to latest versions
- ➖ Remove the use of husky
- 🔨 Use yarn instead of npm

## Version 2.2.1
- Switch from tslint to eslint
- Move jest config from package.json to jest.config.js

## Version 2.2.0
- Fixing issue [#263](https://github.com/arelstone/react-native-email-chip/issues/263) onSubmit even if email is invalid [[57ccc7e](https://github.com/arelstone/react-native-email-chip/commit/57ccc7eaacc53ef1aa9cb2bf8dde1ade7515e2f2)] by [FrikkieSnyman](https://github.com/FrikkieSnyman) 

## Version 2.1.3
- An issue with post install script has been fixed

## Version 2.1.2
- An issue has been fixed that occured when you tapped the backspace-key if the input field fas empty

## Version 2.1.0

### Delimiters
- The delimiters is now exported as `DELIMITERS`.
- Added space as a delimiter.

### Example
- The `./example`-folder has has a mayor cleanup to keep the size of the package small.

