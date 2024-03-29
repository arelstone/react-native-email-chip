# @arelstone/react-native-email-chip
A simple yet very customizable component to display a chip list of emails

![](https://flat.badgen.net/npm/dy/@arelstone/react-native-email-chip)
![](https://flat.badgen.net/npm/v/@arelstone/react-native-email-chip)
![](https://flat.badgen.net/npm/types/@arelstone/react-native-email-chip)
![](https://flat.badgen.net/github/open-issues/arelstone/react-native-email-chip)
![](https://flat.badgen.net/github/open-prs/arelstone/react-native-email-chip)

![@arelstone/react-native-email-chip](https://github.com/arelstone/react-native-email-chip/blob/master/docs/example.png?raw=true)

## Install
```js
npm install @arelstone/react-native-email-chip
// or
yarn add @arelstone/react-native-email-chip
```

## Usage
```jsx
import EmailChipInput from '@arelstone/react-native-email-chip';

<EmailChipInput
    entries={['john@doe.com', 'jane@doe.com']}
    onSubmit={(emails: string[])=> this.setState({emails})}
/>
```

## Props

| Name                            | Type                                            | Default                   |
| ------------------------------- | ----------------------------------------------- | ------------------------- |
| entries                         | string[]                                        | []                        |
| onSubmit                        | string[] => void                                |                           |
| label (optional)                | ReactElement                                    |                           |
| delimiters (optional)           | string[]                                        |  [',', ';', ' ']          |
| keyboardAppearance (optional)   | default, light, dark                            |  default                  |
| keyboardAppearance (optional)   | never, while-editing, unless-editing, always    |  while-editing            |
| placeholder (optional)          | string                                          | Start by typing an email  |
| autoCapitalize (optional)       | none, sentences, words, characters              | none                      |
| autoCorrect (optional)          | boolean                                         | true                      |
| autoFocus (optional)            | boolean                                         | true                      |
| blurOnSubmit (optional)         | boolean                                         | false                     |
| chipImage (optional)            | ReactElement                                    |                           |
| placeholderTextColor (optional) | ViewStyle                                       |                           |
| containerStyle (optional)       | ViewStyle                                       |                           |
| chipContainerStyle (optional)   | ViewStyle                                       |                           |
| chipTextStyle (optional)        | TextStyle                                       |                           |
| inputContainerStyle (optional)  | ViewStyle                                       |                           |
| inputStyle (optional)           | ViewStyle                                       |                           |
| TextInputProps (optional)       | TextInputProps                                  |                           |
| keyboardType (optional)         | KeyboardTypeOptions                             | email-address             |


## Contributing
If you find a feature missing or discover an issue pull requests are very very welcome.



