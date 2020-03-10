import './css/reset.css';
import './css/index.css';
import GithubImg from './images/github-octocat.png';

window.addEventListener("load", init);

function init() {
  let img = new Image();
  img.src = GithubImg;
  img.classList.add('githubImg');
  document.body.appendChild(img);
}
