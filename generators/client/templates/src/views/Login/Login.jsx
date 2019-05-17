import React, { Component } from 'react'
import api from 'services/api'
import { login, isAuthenticated } from 'services/auth'

import 'assets/styles/main.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    if (isAuthenticated()) {
      this.props.history.push('/')
    }
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    const dados = { ...this.state.dados, [name]: value }
    this.setState({ dados })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dados } = this.state

    api
      .post('/session', dados)
      .then(res => {
        if (!res.data.token) return
        login(res.data)
        this.props.history.push('/queue')
      })
      .catch(response => {
        this.setState(response.data)
      })
  }

  render() {
    const { error } = this.state

    return (
      <div className="auth-wrapper">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            name="email"
            placeholder="Email"
            required
            type="email"
          />
          <input
            onChange={this.handleInputChange}
            name="password"
            placeholder="Senha"
            required
            type="password"
            autoComplete="off"
          />
          <button type="submit">Entrar</button>
          {error ? <div className="alert alert-login">{error}</div> : null}
        </form>
      </div>
    )
  }
}
