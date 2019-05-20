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

    await createArticle(testArticleTitle, testArticleAbout, testArticleContent, testArticleTags);

    //  see header show with title equal to previous enter title
    const articlePage = await driver.findElement(By.css('div.article-page'));
    expect(articlePage).toBePresent();

});

test('create article and delete it', async () => {

    await driver.get('http://localhost:4100/');

    //  Connect user first
    await connectUserIfNeeded(EMAIL, PASSWORD, USERNAME);
    
    await createArticle( "coucou","coucou","coucou","coucou");

    const removeArticleBtn = await driver.findElement(By.css('button[class="btn btn-outline-danger btn-sm"]'));
    removeArticleBtn.click();

    await driver.wait(until.elementLocated(By.css('div.article-preview')), 4000);

    const yourFeedBnt = await driver.findElement(By.partialLinkText('Your Feed'));

    expect(yourFeedBnt).toBePresent();

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

async function createArticle(testArticleTitle, testArticleAbout, testArticleContent, testArticleTags) {
    
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

    await driver.wait(until.elementLocated(By.css('div.article-page')), 4000);

}

async function registerUser(username, email, pwd){

    const signUpLink = await driver.findElement(By.linkText('Sign up'));   
    await signUpLink.click();

    await driver.wait(until.elementLocated(By.css('input[placeholder="Username"]')), 4000);

    const usernameField = await driver.findElement(By.css('input[placeholder="Username"]'));
    usernameField.sendKeys(username);

    const emailField = await driver.findElement(By.css('input[placeholder="Email"]'));
    emailField.sendKeys(email);

    const password = await driver.findElement(By.css('input[placeholder="Password"]'));
    password.sendKeys(pwd);

    const signUpButton = await driver.findElement(By.css('button[type="submit"]'));
    signUpButton.click();

    await driver.wait(until.elementLocated(By.linkText('Home')), 4000);

}

test('like article if it exists then create article', async () => {

    await driver.get('http://localhost:4100');

    await connectUserIfNeeded(EMAIL, PASSWORD, USERNAME);

    await likesArticlesIfExists();

    const rnd = getRandomInt(10000);
    const fakeVal = "fakeArticle" + rnd;
    await createArticle(
        fakeVal,
        fakeVal, 
        fakeVal, 
        fakeVal
    );

    await homeClick();

    await globalFeedClick();

    const newArticleTitle = await driver.findElement(By.xpath("//h1[text() = '" + fakeVal + "']"));

    expect(newArticleTitle).toBePresent();

});

async function likesArticlesIfExists() {

    await globalFeedClick();

    //  click on fav button
    
    const ionHearts = await driver.findElements(By.xpath("//button[contains(@class, 'btn btn-sm btn-outline-primary')]"));
    if (ionHearts.length > 0) {
        await ionHearts[0].click();
    }

}

/*test('Create new article', async => {

});*/

async function connectUserIfNeeded(email, password, username) {
    
    await homeClick();

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

async function globalFeedClick() {

    //  wait page
    await driver.wait(until.elementLocated(By.partialLinkText('Global Feed')), 4000);

    //  go to global feed
    const globalFeedBnt = await driver.findElement(By.partialLinkText('Global Feed'));
    await globalFeedBnt.click();

    //  wait sub-page
    await driver.wait(until.elementLocated(By.css('div.article-preview')), 4000);

}

async function homeClick() {
    const homeBtn = await driver.findElement(By.linkText("Home"));
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
