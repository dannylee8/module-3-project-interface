const userBetAmount = document.getElementById('bet-amount')
const URL = 'https://module-3-project-api.herokuapp.com/api/v1'
const USERS_URL = `${URL}/users`
const COMMENTS_URL = `${URL}/comments`
const apiAdapter = new Adapter(URL)

let user

EventListener.addListener(document, 'click')

const signInUser = (userName) => {
  userName = userName.charAt(0).toUpperCase() + userName.slice(1)
  // console.log(userName)
  window.fetch(USERS_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      name: userName
    })
  })
    .then(resp => resp.json())
    .then(json => {
      // console.log(json)
      user = new User(json.id, json.name, json.balance, json.total_profit)
      document.querySelectorAll('.user-info')[0].hidden = false
      document.querySelectorAll('.user-info')[0].innerText += ` ${user.name}`
      document.querySelectorAll('.user-info')[1].hidden = false
      document.querySelectorAll('.user-info')[1].innerText += ` ${Number(user.balance.toFixed(2))}`
      console.log(user)
    })
}

function loginUser () {
  const userName = document.getElementById('username').value
  signInUser(userName)
  document.querySelector('.login').hidden = true
  document.getElementById('top-left').hidden = false
  document.getElementById('top-right').hidden = false
  document.getElementById('bottom-left').hidden = false
  document.getElementById('bottom-right').hidden = false
  // document.getElementsByTagName('marquee')[0].style.display = "block";
  // Check out grid.js for more on this function
  // drawGrid(800, 800, "grid");
  // buildChart(45);
}
const loginButton = document.getElementById('login-button')

EventListener.addListener(loginButton, 'click')

const userNameField = document.getElementById('username')

EventListener.addListener(userNameField, 'keyup')

EventListener.addListener(userBetAmount, 'input')

const fetchUsers = (url) => {
  window.fetch(url).then(resp => resp.json()).then(json => console.log(json))
}

fetchUsers(USERS_URL)

// ================= chat function =====================================

function chat () {
  const chatWindow = document.getElementById('chat-window')
  const chatLine = document.getElementById('chat-line')
  const chatButton = document.getElementById('chat-button')

  const chatInput = document.createElement('input')

  chatInput.type = 'text'
  chatInput.id = 'chat-input'
  chatLine.appendChild(chatInput)

  chatButton.addEventListener('click', event => {
    sendMessage(event)
  })

  chatInput.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
      event.preventDefault()
      sendMessage(event)
    }
  })

  function sendMessage (event) {
    // console.log(event)
    if (chatInput.value == '') {
      return
    }
    const newMsg = document.createElement('li')
    newMsg.className = 'chat_message'
    newMsg.innerHTML = `<span class='message-time'>${Date().slice(16, 21)}</span> (${user.name}) ${chatInput.value}`
    chatWindow.appendChild(newMsg)
    chatWindow.scrollTop = chatWindow.scrollHeight
    // fetch call to db to save chat
    fetch(COMMENTS_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        comment: chatInput.value,
        user_id: user.id
      })
    }).then(resp => resp.json()).then(json => console.log(json))
    chatInput.value = ''
  }
}

chat()

// ================= chat history =====================================
function getChatMessages () {
  fetch(COMMENTS_URL)
    .then(resp => resp.json())
    .then(json => json.comments.forEach(obj => addChatMessageHistory(obj)))
}

function addChatMessageHistory (msgObj) {
  const historyUL = document.getElementById('chat-window')

  const historyMsg = document.createElement('li')
  historyMsg.className = 'chat_message'
  historyMsg.innerHTML = `<span class='message-time'>${msgObj.created_at.slice(11, 16)}</span> (${msgObj.name}) ${msgObj.comment}`
  historyUL.appendChild(historyMsg)
  historyUL.scrollTop = historyUL.scrollHeight
}

getChatMessages()

// ================= highest user =====================================

function getUsers () {
  fetch(USERS_URL)
    .then(resp => resp.json())
    .then(json => {
      const sorted_users = json.all_users.sort(function (a, b) { return b.total_profit - a.total_profit })

      sorted_users.forEach(function (u) {
        const nameLi = document.createElement('li')
        nameLi.innerHTML = u.name
        nameLi.className = 'top-score-line'
        const scoreLi = document.createElement('li')
        scoreLi.innerHTML = Number(u.total_profit).toFixed(2)
        nameLi.className = 'top-score-line'
        const nameColumn = document.getElementById('top-list-column-2')
        const scoreColumn = document.getElementById('top-list-column-3')
        nameColumn.appendChild(nameLi)
        scoreColumn.appendChild(scoreLi)
      })
    })
}

getUsers()
