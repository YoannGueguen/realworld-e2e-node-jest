### Realworld E2E Tests

- Use `yarn install` or `npm install`to install this projects dependencies
- Use `yarn test` or `npm test` to run the initial test

### Exercise 

- Add a new test which signs in with `conduit@realworld.io/conduit` and creates a new article. 
- Add a new test which creates a new account, likes the first article if it exists then creates a new article
- Add a new test which signs in with `conduit@realworld.io/conduit` and creates a new article and deletes the first previously posted one if it exists.


Try to cleanup your test code by factorizing repeated calls and using custom jest assertions

### API documentation 

- [jest](https://jestjs.io/docs/en/api)
- [selenium](https://seleniumhq.github.io/selenium/docs/api/javascript/)