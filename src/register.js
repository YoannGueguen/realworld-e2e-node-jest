 const USERNAME = "conduit1",
     EMAIL = "conduit1@realworld.io",
     PWD = "conduit1";

test('create account register', async => {
    registerUser(USERNAME, EMAIL, PWD);

});

async function registerUser(username, email, pwd){
    await driver.get('http://localhost:4100/');

    const signUpLink = await driver.findElement(By.linkText('Sign up'));
    expect(signUpLink).toBesPresent();
    
    await signUpLink.click();

    const usernameField = await driver.findElement(By.css('input[placeholder="Username"'));
    usernameField.sendKeys(username);

    const emailField = await driver.findElement(By.css('input[placeholder="Email"'));
    emailField.sendKeys(email);
    const password = await driver.findElement(
        By.css('input[placeholder="Password"')
    );
    password.sendKeys(pwd);
    const signUpButton = await driver.findElement(
        By.css('button[type="submit"]')
    );
    expect(signUpButton).toBePresent();

    signUpButton.click();
}
test('Like article if it exists', async => {
    expect(likesArticles()).toBePresent();
});
async function likesArticles(){
    const favBtn = await driver.findElement(By.css('ion-heart'));
    expect(favBtn).toBePresent();
    favBtn.click();
}
test('Create new article', async => {

});
