class EventListener {
  static addListener (element, action) {
    element.addEventListener(action, function (event) {
      event.stopPropagation()
      if (event.target.dataset.action === 'half') {
        userBetAmount.value = (Number(userBetAmount.value) / 2).toFixed(2)
      } else if (event.target.dataset.action === 'double') {
        userBetAmount.value = (Number(userBetAmount.value) * 2).toFixed(2)
      } else if (event.target.dataset.action === 'max') {
        userBetAmount.value = Number(user.balance).toFixed(2)
      } else if (event.target.dataset.action === 'start-round') {
        startGame()
        event.target.disabled = true
      } else if (event.target.id === 'login-button') {
        console.log('Visiting EventListener.js...')
        loginUser()
      } else if (event.keyCode === 13) {
        console.log('Visiting EventListener.js...')
        event.preventDefault()
        loginUser()
      } else if (event.target.id === 'bet-amount') {
        console.log(user.balance)
        if (Number(event.target.value) > user.balance || event.target.value === '') {
          event.target.style.color = 'red'
          // document.getElementById('start-button').disabled = true
          document.getElementById('place-bet-button').disabled = true
        } else {
          event.target.style.color = 'green'
          document.getElementById('start-button').disabled = false
          document.getElementById('place-bet-button').disabled = false
        }
      } else if (event.target.id === 'place-bet-button') {
        placeBet()
        event.target.hidden = true
        document.getElementById('pull-out-button').hidden = false
      } else if (event.target.id === 'pull-out-button') {
        console.log(Number(document.getElementById('counter').innerText), Number(document.getElementById('counter').innerText).toFixed(2))
        const multiplier = Number(document.getElementById('counter').innerText)
        bet.result = true
        user.balance += bet.amount * multiplier
        user.totalProfit = user.balance - 10
        document.getElementById('top-bar-balance').innerText = `Balance: ${user.balance.toFixed(2)}`
        var sound = document.getElementById('audio')
        sound.play()
        apiAdapter.postBet(bet).then(resp => resp.json()).then(() => apiAdapter.updateUser(user))
        event.target.hidden = true
        // document.getElementById('place-bet-button').hidden = false
      }
    })
  }
}
