import React, { Component } from 'react'
import api from 'services/api'

// import like from 'like.svg'
import './Tweet.css'

export default class Vm extends Component {
  handleLike = async () => {
    const { _id } = this.props.tweet
    if (!_id) return
    await api.post(`likes/${_id}`)
  }

  render() {
    const { vm } = this.props
    console.log(vm)
    return (
      <li className="tweet">
        <strong>{vm.name}</strong>
        <p>{vm.content}</p>
        <button type="button" onClick={this.handleLike} />
      </li>
    )
  }
}
