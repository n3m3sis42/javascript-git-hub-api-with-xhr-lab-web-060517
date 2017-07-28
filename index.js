function stdUrl(link, text) {
  return `<a href="${link}">${text}</a>`
}

function commitUrl(repo) {
  return `<a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getCommits(this)">(commits)</a>`
}

function branchUrl(repo) {
  return `<a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getBranches(this)">(branches)</a>`
}

function repoListHtml(repos) {
  return `<ul>
    ${repos.map(repo => '<li>' + repo.name + ' ' + stdUrl(repo.html_url, '(link)') + ' ' + commitUrl(repo) + ' ' + branchUrl(repo) + '</li>').join('')}
  </ul>`
}

function commitListHtml(commits) {
  return `<ul>
    ${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> (' + commit.committer.login + ') - ' + commit.commit.message + '</li>').join('')}
  </ul>`
}

function branchListHtml(branches) {
  return `<ul>
    ${branches.map(branch => '<li>' + branch.name + '</li>').join('')}
  </ul>`
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  document.getElementById('repositories').innerHTML = repoListHtml(repos)
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  document.getElementById('details').innerHTML = commitListHtml(commits)
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  document.getElementById('details').innerHTML = branchListHtml(branches)
}

function getCommits(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function getBranches(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send()
}

function getRepositories() {
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}
