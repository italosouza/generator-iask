import React, { Component, Fragment } from 'react'
import api from 'services/api'
import socket from 'socket.io-client'
import { getUserID, getUser } from 'services/auth'
import config from 'config'

import Moment from 'react-moment'
import 'moment-timezone'
import 'moment/locale/pt-br'

export default class Queue extends Component {
  state = {
    vm: [],
    queue: []
  }

  async componentDidMount() {
    this.subscribeToEvents()
    const vms = await api.get('/vm').catch(response => {
      this.setState(response.data)
      console.warn(response)
    })

    const queues = await api.get('/queue').catch(response => {
      this.setState(response.data)
      console.warn(response)
    })
    this.setState({ vm: vms.data.docs, queue: queues.data.docs })
  }

  async handleQueueLeave() {
    await api.post('/queue/leave').catch(response => {
      this.setState(response.data)
      console.warn(response)
    })
  }

  async handleQueueJoin() {
    await api.post('/queue/join').catch(response => {
      this.setState(response.data)
      console.warn(response)
    })
  }

  subscribeToEvents = () => {
    const io = socket(config.baseURL)

    io.on('vm leave', data => {
      const vm = this.state.vm.map(item =>
        item._id === data._id ? data : item
      )
      this.setState({ vm })
    })

    io.on('vm join', data => {
      const vm = this.state.vm.map(item =>
        item._id === data._id ? data : item
      )
      this.setState({ vm })
    })

    io.on('queue leave', data => {
      const queue = this.state.queue.filter(item => {
        return item._id !== data._id
      })
      this.setState({ queue })
    })

    io.on('queue join', data => {
      this.setState({ queue: [...this.state.queue, data] })
    })
  }

  async handleVmJoin(vm) {
    const rota = vm.available ? `/vm/join` : `/vm/leave`

    await api.post(`${rota}/${vm._id}`).catch(response => {
      this.setState(response.data)
      console.warn(response.data)
    })
  }

  getAmIQueued() {
    const userID = getUserID()
    const queue = this.state.queue.filter(item => {
      return item.user._id === userID
    })
    return queue.length !== 0
  }

  render() {
    const { error } = this.state
    const user = getUser()

    const queued = this.getAmIQueued()

    return (
      <Fragment>
        <ul className="providers">
          <li className="provider">
            <div>
              <img
                src={`${config.baseURL}/files/${user.avatar}`}
                alt="Avatar"
              />
              <strong>{user.name}</strong>
            </div>
          </li>
        </ul>
        <strong>Maquinas Virtuais</strong>
        <div className="vm">
          {this.state.vm.map((vm, i) => (
            <div
              key={i}
              className={vm.available ? 'disponivel' : 'ocupado'}
              onClick={() => this.handleVmJoin(vm)}
            >
              <img src="images/vm.png" alt="imagem vm" />
              <strong>{vm.name}</strong>
              <span className="ip">{vm.ip}</span>
              <span className="username">{vm.user ? vm.user.name : ''}</span>
            </div>
          ))}
          {error ? <div className="alert alert-login">{error}</div> : null}
        </div>

        <strong>Fila de espera</strong>
        {queued ? (
          <button onClick={this.handleQueueLeave}>Sair da fila</button>
        ) : (
          <button onClick={this.handleQueueJoin}>Entrar na fila</button>
        )}

        <ul className="providers">
          {this.state.queue.map((queue, i) => (
            <li className="provider" key={i}>
              <div>
                <img
                  src={`${config.baseURL}/files/${queue.user.avatar}`}
                  alt="Avatar"
                />
                <strong>
                  {queue.user.name}
                  <br />
                  <Moment fromNow locale="pt-br">
                    {queue.createdAt}
                  </Moment>
                </strong>
              </div>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}
