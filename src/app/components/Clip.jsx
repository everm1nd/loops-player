import React from 'react';
import PropTypes from "prop-types"
import Tone from "tone";
import 'components/Clip/play-icon.svg'

const assetPath = url => process.env.PUBLIC_URL + url;

class Clip extends React.Component {
  constructor(props) {
    super(props)
    this.player = new Tone.Player(assetPath(props.url)).toMaster();
    this._togglePlayback = this._togglePlayback.bind(this)
  }

  _togglePlayback() {
    switch(this.props.playbackState) {
      case 'stopped':
        this.player.stop()
        break;
      case 'started':
        this.player.start()
        break;
      default:
        break;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.playbackState !== prevProps.playbackState) this._togglePlayback()
  }

  render() {
    return <button className="button clip" onClick={this.props.onClick} />
  }
}

Clip.defaultProps = {
  playbackState: 'stopped'
}

Clip.propTypes = {
  url: PropTypes.string.isRequired,
  playbackState: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default Clip;
