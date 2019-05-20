var PASSWORD = "conduit";
var EMAIL = "conduit@realworld.io";

/*test('loads conduit frontent', async () => {

    connectUserIfNeeded(EMAIL, PASSWORD);

    await driver.wait(until.elementLocated(By.partialLinkText('New Post')), 4000);
    const newPostLink = await driver.findElement(By.partialLinkText('New Post'));
    expect(newPostLink).toBePresent();

});*/

test('create article with connected user', async () => {

    const rndId = getRandomInt(1000);
    const testArticleTitle = "My article title" + rndId;
    const testArticleAbout = "My article about field value" + rndId;
    const testArticleContent = "#my title" + rndId;
    const testArticleTags = "mytag" + rndId;

    await driver.get('http://localhost:4100/');

    //  Connect user first
    connectUserIfNeeded(EMAIL, PASSWORD);

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

async function connectUserIfNeeded(email, password) {
    homeClick();

    const signInLink = await driver.findElement(By.linkText('Sign in'));

    //check if an user is connected 
    if (signInLink === undefined || signInLink === null) {
        //check if it's the correct user
        settingsClick();
        const currentConnectedEmail = await driver.findElement(By.css('input[placeholder="Email"]'));
        if (currentConnectedEmail !== email) {
            await LogOff();
            await connectUser(email, password);
        }
    } else {
        //connect the user   
        await connectUser(email, password);
    }
}

async function connectUser(email, mdp) {

    const signInLink = await driver.findElement(By.linkText('Sign in'));
    //expect(signInLink).toBePresent();

    await signInLink.click();
    const emailField = await driver.findElement(By.css('input[placeholder="Email"]'));
    emailField.sendKeys(email);
    const password = await driver.findElement(
        By.css('input[placeholder="Password"]')
    );
    password.sendKeys(mdp);
    const signInButton = await driver.findElement(
        By.css('button[type="submit"]')
    );
    //expect(signInButton).toBePresent();

    signInButton.click();
}

async function homeClick() {
    const homeBtn = await driver.findElement(By.css('a[href="/"]'));
    expect(homeBtn).toBePresent();
    homeBtn.click();
}
async function settingsClick() {
    const settingsBtn = await driver.findElement(By.css('a[href="/settings"]'));
    expect(settingsBtn).toBePresent();
    settingsBtn.click();
}

async function LogOff() {
    const btnLogOff = await driver.findElement(By.css('button[class="btn btn-outline-danger"]'));
    expect(btnLogOff).toBePresent();
    btnLogOff.click();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

afterEach(async () => cleanup());
