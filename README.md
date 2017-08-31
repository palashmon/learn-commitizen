# learn-commitizen

[![Greenkeeper badge](https://badges.greenkeeper.io/palashmon/learn-commitizen.svg)](https://greenkeeper.io/)

[![npm version](https://img.shields.io/npm/v/learn-commitizen.svg)](http://npm.im/learn-commitizen)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![MIT License](https://img.shields.io/npm/l/learn-commitizen.svg?colorB=0BD6D3)](http://opensource.org/licenses/MIT)

This is sample repo for learning more about [Commitizen](https://commitizen.github.io/cz-cli/) for practice.

Main focus:
- Semantic Release
- Commitizen
- cz-conventional-changelog

## Steps

1. Make new changes to repo (add/edit any file).
2. [Add](https://git-scm.com/docs/git-add) the changes next for staging:
   ```bash
   git add .
   ```
3. Run the following command and follow the Commitizen steps:
   ```bash
   npm run commit
   ```
   ![Commitizen](https://cdn.rawgit.com/commitizen/cz-cli/master/meta/screenshots/add-commit.png)
4. Finally
   ```bash
   git push
   ```	

## Default Commit Message Format

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject ([full explanation](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md)):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

## Contributing

Pull requests are always welcome.  
Feel free to fork and do as many commits as you want for practice.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## License

MIT © Palash Mondal