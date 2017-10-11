import React from 'react';
import PropTypes from "prop-types"
import styled from 'styled-components'
import Tone from "tone";
import 'components/Clip/play-icon.svg'
import 'components/Clip/stop-icon.svg'

const assetPath = url => process.env.PUBLIC_URL + url;

const Progress = styled.div`
  animation-duration: ${props => Tone.Time(props.duration).toSeconds()}s !important
`

class Clip extends React.Component {
  constructor(props) {
    super(props)
    this.player = new Tone.Player(assetPath(props.url)).toMaster();
    this.player.loop = true;

    this._togglePlayback = this._togglePlayback.bind(this)
    this.handleClick = this.props.onClick.bind(null, this.props.id)
  }

  _togglePlayback() {
    switch(this.props.playbackState) {
      case 'stopped':
        this.player.stop()
        break;
      case 'started':
        if (this.player.state !== "started") this.player.start('@0.01')
        break;
      default:
        break;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.playbackState !== prevProps.playbackState) this._togglePlayback()
  }

  render() {
    return <button className={`button clip ${this.props.playbackState}`} onClick={this.handleClick}>
      <Progress duration={this.props.duration} className="progress" />
    </button>
  }
}

Clip.defaultProps = {
  playbackState: 'stopped'
}

Clip.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  playbackState: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  duration: PropTypes.string.isRequired
}

export default Clip;
