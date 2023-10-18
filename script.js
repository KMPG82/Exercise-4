// https://jsonplaceholder.typicode.com/guide/
async function downloadPosts(page = 1) {
  const postsURL = `https://jsonplaceholder.typicode.com/posts?_page=${page}`;
  const response = await fetch(postsURL);
  const articles = await response.json();
  return articles;
}

async function downloadComments(postId) {
  const commentsURL = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  const response = await fetch(commentsURL);
  const comments = await response.json();
  return comments;
}

async function getUserName(userId) {
  const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const response = await fetch(userURL);
  const user = await response.json();
  return user.name;
}

function getArticleId(comments) {
  const article = comments.previousElementSibling;
  const data = article.dataset;
  return data.postId;
}








const posts = await downloadPosts();
const comments = await downloadComments(1);
console.log(posts);
console.log(comments);



//setting the article tags in main tag
const main = document.querySelector('main')
function SetArticleInMain() {
  let articles = "";

  for (let i = 0; i < posts.length; i++) {
    articles = `<article data-post-id= ${posts[i].id}></article>`;
    main.innerHTML += articles;
    main.innerHTML += '<details> </details>'
  }

}
SetArticleInMain();

//set header tags in article tags
const article = document.querySelectorAll('article')
console.log(article)
function SetHeaderInArticle() {
  let headers = "<h2> </h2>";
  for (let i = 0; i < article.length; i++) {
    article[i].innerHTML += headers
  }
}
SetHeaderInArticle();

//set title from json in h2 tags
const h2 = document.querySelectorAll('h2');
console.log(h2);
function SetH2Content() {
  for (let i = 0; i < posts.length; i++) {
    h2[i].innerText += posts[i].title;
  }
}
SetH2Content();

//Create an <aside> and fill in the <span> by calling getUserName() and passing the userId field.
console.log(article);
function SetAsideInArticle() {
  let aside = '<aside> </aside';

  for (let i = 0; i < article.length; i++) {
    article[i].innerHTML += aside;
  }
}
SetAsideInArticle();

const aside = document.querySelectorAll('aside');
console.log(aside);
function SetSpanInAside() {
  let span = '<span class="author"> </span';

  for (let i = 0; i < aside.length; i++) {
    aside[i].innerHTML += span;
  }
}
SetSpanInAside();

const span = document.querySelectorAll('span');
console.log(span);
for (let i = 0; i < span.length; i++) {
  let username = await getUserName(posts[i].userId);

  span[i].innerText += username;
}

//Create the <p> tag by replacing "\n" characters with <br> tags.
function SetPInArticle() {
  for (let i = 0; i < article.length; i++) {
    article[i].innerHTML += '<p></p>';
  }
}
SetPInArticle()

const p = document.querySelectorAll('p');
console.log(p);

function SetContentInP() {
  let paragrah = '';
  for (let i = 1; i < p.length; i++) {
    paragrah = posts[i - 1].body;
    paragrah.replaceAll('\n', '<br/>')
    p[i].innerText += paragrah;
  }
}
SetContentInP()

const detailsTag = document.querySelectorAll('details');
console.log(detailsTag);
function AddSummaryInDetails() {
  for (let i = 0; i < detailsTag.length; i++) {
    detailsTag[i].innerHTML += '<summary>See what our readers had to say...</summary>';
  }
}
AddSummaryInDetails()

function AddSectionInDetails() {
  for (let i = 0; i < detailsTag.length; i++) {
    detailsTag[i].innerHTML += '<section> </section>';
  }
}
AddSectionInDetails();

const section = document.querySelectorAll('section');
console.log(section);
function SetHearderInSection() {
  for (let i = 0; i < section.length; i++) {
    section[i].innerHTML += '<header> </header>';
  }
}
SetHearderInSection()

const header = document.querySelectorAll('header');
console.log(header);
function SetH3InHeader() {
  for (let i = 1; i < header.length; i++) {
    header[i].innerHTML += '<h3>Comments</h3>';
  }
}
SetH3InHeader()

/* function AddAsidesInDetails() {
  for (let i = 0; i < section.length; i++) {
    for (let j = 0; j < 5; j++) {
      section[i].innerHTML += '<aside> </aside>';
    }
  }
}
AddAsidesInDetails() */

const details = document.getElementsByTagName("details");
console.log(details);
for (let detail of details) {
  detail.addEventListener("toggle", async (event) => {
    if (detail.open) {
      const asides = detail.getElementsByTagName("aside");
      console.log(asides);
      const commentsWereDownloaded = asides.length > 0;
      if (!commentsWereDownloaded) {
        const articleId = getArticleId(detail);
        const comments = await downloadComments(articleId);
        console.log(comments);

        for (let i = 0; i < section.length; i++) {
          for (let j = 0; j < comments.length; j++) {
            section[i].innerHTML += `<aside><p> ${comments[j].body.replaceAll('\n', '<br/>')} </p> <p><small> ${comments[j].name.replaceAll('\n', '<br/>')} </small></p></aside>`;
          }
          console.log(detail);
        }
      }
    }
  });
}

console.log(section);