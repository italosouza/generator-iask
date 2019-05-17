import React, { Component } from 'react'
import api from 'services/api'

export default class Vm extends Component {
  state = {
    vm: []
  }

  async componentDidMount() {
    const vms = await api.get('/vm').catch(response => {
      console.warn(response)
    })

    this.setState({ vm: vms.data.docs })
  }

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value })
  }

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return

    // await api.post('mv', { content, author })
    this.setState({ data: '' })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <strong>Maquinas Virtuais</strong>
        <div className="vm">
          {this.state.vm.map((vm, i) => (
            <div
              key={i}
              className={vm.available ? '' : 'ocupado'}
              onClick={() => this.handleVmJoin(vm)}
            >
              <img src="vm.png" alt="imagem vm" />
              <strong>{vm.name}</strong>
              <span className="ip">{vm.ip}</span>
            </div>
          ))}
        </div>

        <ul className="providers" />
      </div>
    )
  }
}
