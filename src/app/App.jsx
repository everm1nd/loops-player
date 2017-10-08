import React from 'react';
import 'App.css';
import Track from "components/Track";
import tracksData from "components/Track/data";
import update from 'immutability-helper';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = tracksData
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(trackId, clipId) {
    const togglePlayback = (playbackState) => playbackState === "started" ? "stopped" : "started"
    const state = update(this.state, {
      tracks: {
        [trackId]: {
          clips: { [clipId]: { playbackState: {$apply: togglePlayback} } }
        }
      }
    })
    this.setState(state)
  }

  renderTracks() {
    return this.state.tracks.map( (track, index) =>
      <Track id={index} key={track.name} {...track} onClick={this._handleClick} />
    )
  }

  render() {
    return <div className="app">{this.renderTracks()}</div>
  }
}

export default App;
