var PASSWORD = "conduit";
var EMAIL = "conduit@realworld.io";

test('loads conduit frontent', async () => {

    connectUser(EMAIL, PASSWORD);

    await driver.wait(until.elementLocated(By.partialLinkText('New Post')), 4000);
    const newPostLink = await driver.findElement(By.partialLinkText('New Post'));
    expect(newPostLink).toBePresent();

});

async function connectUser(email , mdp ){
 
    const signInLink = await driver.findElement(By.linkText('Sign in'));
    expect(signInLink).toBePresent();

    await signInLink.click();
    const emailField = await driver.findElement(By.css('input[placeholder="Email"'));
    emailField.sendKeys(email);
    const password = await driver.findElement(
        By.css('input[placeholder="Password"')
    );
    password.sendKeys(mdp);
    const signInButton = await driver.findElement(
        By.css('button[type="submit"]')
    );
    expect(signInButton).toBePresent();

    signInButton.click();
}

test('create article with connected user', async () => {

    const testArticleTitle = "My article title";
    const testArticleAbout = "My article about field value";
    const testArticleContent = "#my title";
    const testArticleTags = "mytag";

    await driver.get('http://localhost:4100/');

    //  Connect user first
    connectUser(EMAIL, PASSWORD);

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

    //  press enter to validate
    console.log('press enter');
    tagsField.sendKeys("\n");

    //  click on  publish article
    const publishButton = await driver.findElement(By.css('button[type="button"]'));
    publishButton.click();

    //  see header show with title equal to previous enter title
    await driver.wait(until.elementLocated(By.css('div[class="article-page"]')), 4000);
    const articlePage = await driver.findElement(By.css('div[class="article-page"]'));
    except(articlePage).toBePresent();

});

async function connectUserIfNeeded(email, password) {
    
    const signInLink = await driver.findElement(By.linkText('Sign in'));
  
    //check if an user is connected 
    if(signInLink === undefined || signInLink === null){
        //check if it's the correct user
        await driver.get('http://localhost:4100/settings');
        const currentConnectedEmail = await driver.findElement(By.css('input[placeholder="Email"]'));
        if(currentConnectedEmail !==  email){
            await LogOff();
            await connectUser(email, password);
        }
    }else{
       //connect the user   
       await connectUser(email, password);
    }
}

async function LogOff() {
    const btnLogOff = await driver.findElement(By.css('button[class="btn btn-outline-danger"]'));
    expect(btnLogOff).toBePresent();
    btnLogOff.click();
}

afterEach(async () => cleanup());
