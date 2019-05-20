const PASSWORD = "conduit";
const USERNAME = "conduit";
const EMAIL = "conduit@realworld.io";

test('loads conduit frontent', async () => {

    await driver.get('http://localhost:4100/');

    await connectUserIfNeeded(EMAIL, PASSWORD, USERNAME);

    await driver.wait(until.elementLocated(By.partialLinkText('New Post')), 4000);
    const newPostLink = await driver.findElement(By.partialLinkText('New Post'));
    expect(newPostLink).toBePresent();

});

test('create article with connected user', async () => {

    const rndId = getRandomInt(1000);
    const testArticleTitle = "My article title" + rndId;
    const testArticleAbout = "My article about field value" + rndId;
    const testArticleContent = "#my title" + rndId;
    const testArticleTags = "mytag" + rndId;

    await driver.get('http://localhost:4100/');

    //  Connect user first
    await connectUserIfNeeded(EMAIL, PASSWORD, USERNAME);

    await driver.wait(until.elementLocated(By.partialLinkText('New Post')), 4000);

    //  click on button 'new post's
    const newPostLink = await driver.findElement(By.linkText('New Post'));
    await newPostLink.click();

    //  fill article title
    const articleTitleField = await driver.findElement(By.css('input[placeholder="Article Title"]'));
    articleTitleField.sendKeys(testArticleTitle);

    //  fill about field
    const aboutField = await driver.findElement(By.css('input[placeholder="What\'s this article about?"]'));
    aboutField.sendKeys(testArticleAbout);

    //  fill article content markdown
    const contentField = await driver.findElement(By.css('textarea[placeholder="Write your article (in markdown)"]'));
    contentField.sendKeys(testArticleContent);

    //  fill tags
    const tagsField = await driver.findElement(By.css('input[placeholder="Enter tags"]'));
    tagsField.sendKeys(testArticleTags);

    //  press enter to validates
    tagsField.sendKeys("\n");

    //  click on  publish article
    const publishButton = await driver.findElement(By.css('button[type="button"]'));
    publishButton.click();

    //  see header show with title equal to previous enter title
    await driver.wait(until.elementLocated(By.css('div.article-page')), 4000);

    const articlePage = await driver.findElement(By.css('div.article-page'));
    expect(articlePage).toBePresent();

});

test('register user', async () => {

    await driver.get('http://localhost:4100');

    const rnd = getRandomInt(1000);
    await registerUser(
        USERNAME + rnd,
        EMAIL,
        PASSWORD + rnd
    );

    const homeBnt = await driver.findElement(By.linkText('Home'));
    expect(homeBnt).toBePresent();

})

async function registerUser(username, email, pwd){

    const signUpLink = await driver.findElement(By.linkText('Sign up'));   
    expect(signUpLink).toBePresent(); 
    await signUpLink.click();

    await driver.wait(until.elementLocated(By.css('input[placeholder="Username"]')), 4000);

    const usernameField = await driver.findElement(By.css('input[placeholder="Username"]'));
    expect(usernameField).toBePresent();
    usernameField.sendKeys(username);

    const emailField = await driver.findElement(By.css('input[placeholder="Email"]'));
    expect(emailField).toBePresent();
    emailField.sendKeys(email);

    const password = await driver.findElement(By.css('input[placeholder="Password"]'));
    expect(password).toBePresent();
    password.sendKeys(pwd);

    const signUpButton = await driver.findElement(By.css('button[type="submit"]'));
    expect(signUpButton).toBePresent();
    signUpButton.click();

    await driver.wait(until.elementLocated(By.linkText('Home')), 4000);

}

test('Like article if it exists', async () => {

    await driver.get('http://localhost:4100');

    await connectUserIfNeeded(EMAIL, PASSWORD, USERNAME);

    await likesArticles();

    expect(1).toBe(1);

});

async function likesArticles() {

    //  wait page
    await driver.wait(until.elementLocated(By.partialLinkText('Global Feed')), 4000);

    //  go to global feed
    const globalFeedBnt = await driver.findElement(By.partialLinkText('Global Feed'));
    await globalFeedBnt.click();

    const ionHearts = await driver.findElements(By.xpath("//*[contains(@class, 'btn btn-sm btn-outline-primary')]"));
    console.log('hearts', ionHearts);
    await ionHearts[0].click();

}

/*test('Create new article', async => {

});*/

async function connectUserIfNeeded(email, password, username) {
    
    await homeClick(username);

    const signInLink = await driver.findElement(By.linkText('Sign in'));

    //check if an user is connected 
    if (signInLink === undefined || signInLink === null) {
        //check if it's the correct user
        await settingsClick();
        const currentConnectedEmail = await driver.findElement(By.css('input[placeholder="Email"]'));
        if (currentConnectedEmail !== email) {
            await logOff();
            await connectUser(email, password);
        }
    } else {
        //connect the user   
        await connectUser(email, password);
    }

}

async function connectUser(email, mdp) {

    const signInLink = await driver.findElement(By.linkText('Sign in'));
    await signInLink.click();

    const emailField = await driver.findElement(By.css('input[placeholder="Email"]'));
    emailField.sendKeys(email);

    const password = await driver.findElement(By.css('input[placeholder="Password"]'));
    password.sendKeys(mdp);

    const signInButton = await driver.findElement(By.css('button[type="submit"]'));
    signInButton.click();

}

async function homeClick(username) {
    const homeBtn = await driver.findElement(By.linkText(username));
    homeBtn.click();
}

async function settingsClick() {
    const settingsBtn = await driver.findElement(By.css('a[href="/settings"]'));
    settingsBtn.click();
}

async function logOff() {
    const btnLogOff = await driver.findElement(By.css('button[class="btn btn-outline-danger"]'));
    btnLogOff.click();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

afterEach(async () => cleanup());
