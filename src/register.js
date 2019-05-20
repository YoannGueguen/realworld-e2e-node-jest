 
test('loads conduit frontend with register', async => {
    registerUser("conduit1", "conduit1@realworld.io", "conduit1");
    expect(newPostLink).toBePresent();
});

async function registerUser(username, email, pwd){
    await driver.get('http://localhost:4100/');

    const signUpLink = await driver.findElement(By.linkText('Sign up'));
    expect(signUpLink).toBesPresent();
    
    await signUpLink.click();

    const usernameField = await driver.findElement(By.css('input[placeholder="Username"'));
    emailField.sendKeys(username);

    const emailField = await driver.findElement(By.css('input[placeholder="Email"'));
    emailField.sendKeys(email);
    const password = await driver.findElement(
        By.css('input[placeholder="Password"')
    );
    password.sendKeys(mdp);
    const signUpButton = await driver.findElement(
        By.css('button[type="submit"]')
    );
    expect(signUpButton).toBePresent();

    signUpButton.click();
}
test('verify likes article', async =>{

});
