const counter = document.getElementById('counter')
const finalValue = document.getElementById('final-value')
const betAmount = document.getElementById('bet-amount')
const highestNumber = 1000
let roundNumber = 0
let timer
let bet

const getRandomDecimal = (max) => {
  return Math.floor(Math.random() * (max - 0) + 100) / 100
}

let maxDecimal = getRandomDecimal(highestNumber)

const countDown = () => {
  if (Number(counter.innerText) > 0) {
    counter.innerText = Number(counter.innerText) - 1
  } else {
    window.clearInterval(timer)
    startGame()
  }
}

const countDownTimer = () => {
  counter.innerText = 10
  document.getElementById('place-bet-button').disabled = true
  timer = window.setInterval(countDown, 1000)
}

const incrementCounter = () => {
  if (Number(counter.innerText) <= maxDecimal) {
    counter.innerText = (Number(counter.innerText) + 0.01).toFixed(2)
  } else {
    window.clearInterval(timer)
    if (bet.result === false) {
      user.balance -= bet.amount.toFixed(2)
      document.getElementById('top-bar-balance').innerText = `Balance: ${Number(user.balance).toFixed(2)}`
      user.totalProfit -= bet.amount
      apiAdapter.postBet(bet).then(() => apiAdapter.updateUser(user))
      bet.amount = 0
    }
    finalValue.hidden = false
    finalValue.innerText = `Crashed at: ${Number(counter.innerText)}x`
    document.getElementById('place-bet-button').hidden = false
    document.getElementById('pull-out-button').hidden = true
    betAmount.disabled = false
    countDownTimer()
  }
}

function placeBet () {
  bet = new Bet(user.id, Number(betAmount.value), false)
  betAmount.value = ''
  console.log(bet)
}

function startGame () {
  if (roundNumber < 5) {
    document.getElementById('place-bet-button').hidden = true
        document.getElementById('start-button').disabled = true
        betAmount.disabled = true
        finalValue.hidden = true
        roundNumber++
        counter.innerText = 0.00
        maxDecimal = getRandomDecimal(highestNumber)
        timer = window.setInterval(incrementCounter, 10)
        buildChart(maxDecimal)
    } else {
    betAmount.disabled = false
        document.getElementById('start-button').disabled = false
        finalValue.hidden = true
        counter.innerText = 0.00
        roundNumber = 0
        finalValue.hidden = false
        finalValue.innerText = 'Round Over!'
  }
}
