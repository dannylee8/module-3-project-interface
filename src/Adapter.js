class Adapter {
  constructor (api) {
    this.api = api
  }

  postBet (bet, user) {
    return window.fetch(`${this.api}/bets`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(bet)
    })
  }

  updateUser (user) {
    return window.fetch(`${this.api}/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(user)
    })
  }
}

