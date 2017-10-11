import React from 'react';
import PropTypes from "prop-types"
import styled from 'styled-components'
import Tone from "tone";
import Loader from 'react-loader-advanced';
import Spinner from 'react-spinkit'
import 'components/Clip/play-icon.svg'
import 'components/Clip/stop-icon.svg'

const assetPath = url => process.env.PUBLIC_URL + url;

const Progress = styled.div`
  animation-duration: ${props => props.duration}s !important
`

class Clip extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
    this.player = new Tone.Player(
      assetPath(props.url),
      this._whenLoaded
    ).toMaster();
    this.player.loop = true;

    this.handleClick = this.props.onClick.bind(null, this.props.id)
  }

  _whenLoaded = () => {
    this.setState({ loading: false })
  }

  _togglePlayback = () => {
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
    const animationDuration = Tone.Time(this.props.duration).toSeconds()
    const spinner = <Spinner name="line-scale" color="white" fadeIn="none" />
    return <Loader show={this.state.loading} hideContentOnLoad message={spinner}>
      <button className={`button clip ${this.props.playbackState}`} onClick={this.handleClick}>
        <Progress duration={animationDuration} className="progress" />
      </button>
    </Loader>
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
