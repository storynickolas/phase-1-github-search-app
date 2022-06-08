document.addEventListener("DOMContentLoaded", () => {

  let count = 0

  function userSearch(user) {
    document.getElementById('user-list').innerHTML=''
    document.getElementById('repos-list').innerHTML=''
    fetch(`https://api.github.com/search/users?q=${user}`)
    .then(res => res.json())
    .then(users => users.items.forEach(user => renderUser(user)))
  }

  const bttn = document.getElementById('github-form')

  bttn[1].addEventListener('click', function (e) {
    e.preventDefault()
    userSearch(bttn[0].value)
  })


  function renderUser(user) {
    count++
    let newUse = document.createElement('li')
    newUse.id = count
    newUse.textContent = `${user.login}: `
    document.getElementById('user-list').append(newUse)
    let page = document.createElement('a')
    page.textContent = user.login
    page.href = user.html_url
    page.textContent = 'Profile'
    document.getElementById(newUse.id).append(page)
    document.getElementById(newUse.id).append(document.createElement('br'))

    let newBttn = document.createElement('button')
    newBttn.id = `bttn${count}`
    newBttn.addEventListener('click', function getRepos() {
      document.getElementById('repos-list').innerHTML=''
      fetch(`https://api.github.com/users/${user.login}/repos`)
      .then(res => res.json())
      .then(repos => repos.forEach(repo => displayRepos(repo)))
    })

    function displayRepos(repo) {
      let work = document.createElement('li')
      work.textContent = `${repo.name}: `
      work.id = repo.id
      document.getElementById('repos-list').append(work)
      let source = document.createElement('a')
      source.href = repo.html_url
      source.textContent = repo.html_url
      document.getElementById(work.id).append(source)
    }


    document.getElementById(newUse.id).append(newBttn)

    let avatar = document.createElement('img')
    avatar.src = user.avatar_url
    document.getElementById(`bttn${count}`).append(avatar)
  }



  let newUse = document.createElement('h2')
    newUse.id = count
    newUse.textContent = `Clicked on User`
    document.getElementById('repos-list').append(newUse)



})