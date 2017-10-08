import React from 'react';
import 'App.css';
import Track from "components/Track";
import tracksData from "appData";
import update from 'immutability-helper';
import togglePlayback from 'playbackStateMachine'

const initPlaybackState = (tracksData) => ({
    tracks: tracksData.tracks.map(track => (
      Object.assign({}, track, {
        clips: track.clips.map(clip => (
          Object.assign({}, clip, { playbackState: "stopped" })
        ))
      })
    ))
  }
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initPlaybackState(tracksData)
    this._handleClipClick = this._handleClipClick.bind(this)
  }

  _handleClipClick(trackId, clipId) {
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
      <Track id={index} key={track.name} {...track} onClick={this._handleClipClick} />
    )
  }

  render() {
    return <div className="app">{this.renderTracks()}</div>
  }
}

export default App;
