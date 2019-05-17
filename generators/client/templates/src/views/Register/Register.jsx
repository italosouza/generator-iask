import React, { Component } from 'react'
import api from 'services/api'
import { isAuthenticated } from 'services/auth'

import 'assets/styles/main.css'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)

    if (isAuthenticated()) {
      this.props.history.push('/')
    }
  }

  handleChange(files: FileList) {
    const img = document.querySelector('label[for=avatar] img')
    img.classList.add('preview')
    img.src = URL.createObjectURL(files[0])
    this.setState({ file: files[0] })
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
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const { file } = this.state
    if (!file) {
      this.setState({
        error: 'Escolha um Avatar.'
      })
      return
    }

    let formData = new FormData()
    formData.append('name', dados.name)
    formData.append('email', dados.email)
    formData.append('password', dados.password)
    formData.append('avatar', file)

    api
      .post('/user', formData, config)
      .then(res => {
        this.props.history.push('/')
      })
      .catch(response => {
        console.log(response)
        this.setState({
          error: 'Não foi possível criar o usuário.'
        })
        // this.setState(response.data)
      })
  }

  render() {
    const { error } = this.state

    return (
      <div className="auth-wrapper">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="avatar">
            <img src="images/avatar.svg" height="24" alt="Avatar" />
          </label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            onChange={e => this.handleChange(e.target.files)}
          />
          <input
            onChange={this.handleInputChange}
            name="name"
            placeholder="Nome"
            required
          />
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
