test('loads conduit frontent', async () => {
  await driver.get('http://localhost:4100/');
  const signInLink = await driver.findElement(By.linkText('Sign in'));
  expect(signInLink).toBePresent();
  await signInLink.click();
  const email = await driver.findElement(By.css('input[placeholder="Email"'));
  email.sendKeys('conduit@realworld.io');
  const password = await driver.findElement(
    By.css('input[placeholder="Password"')
  );
  password.sendKeys('conduit');
  const signInButton = await driver.findElement(
    By.css('button[type="submit"]')
  );
  expect(signInButton).toBePresent();
  signInButton.click();

  await driver.wait(until.elementLocated(By.partialLinkText('New Post')), 4000);
  const newPostLink = await driver.findElement(By.partialLinkText('New Post'));
  expect(newPostLink).toBePresent();
});

afterEach(async () => cleanup());
