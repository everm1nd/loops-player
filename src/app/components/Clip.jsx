import React from 'react';
import PropTypes from "prop-types"
import Tone from "tone";
import 'components/Clip/play-icon.svg'

const assetPath = url => process.env.PUBLIC_URL + url;

class Clip extends React.Component {
  constructor(props) {
    super(props)
    this.player = new Tone.Player(assetPath(props.url)).toMaster();
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.player.state === "started" ? this.player.stop() : this.player.start()
  }

  render() {
    return <button className="button clip" onClick={this.toggle} />
  }
}

Clip.propTypes = {
  url: PropTypes.string.isRequired
}

export default Clip;
