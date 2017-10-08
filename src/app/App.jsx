import React from 'react';
import 'App.css';
import Track from "components/Track";
import tracksData from "appData";
import update from 'immutability-helper';
import togglePlayback from 'playbackStateMachine'
import transformCollection from 'utils/collectionTransformer'
import Tone from 'tone'

const mapClipsState = (tracksData, transformation) => (
  transformCollection(tracksData, 'tracks', (track) => (
    transformCollection(track, 'clips', clip => ({ playbackState: transformation(clip.playbackState) }))
  ))
)

const initPlaybackState = (tracksData) => mapClipsState(tracksData, state => "stopped")

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initPlaybackState(tracksData)
    this._handleClipClick = this._handleClipClick.bind(this)
    this._tick = this._tick.bind(this)
  }

  componentDidMount() {
    Tone.Transport.scheduleRepeat(this._tick, "1m");
    Tone.Transport.start()
  }

  _tick(time) {
    console.log(time)
    this.setState(mapClipsState(this.state, (playbackState) => {
      switch (playbackState) {
        case "starting":
          return "started"
        case "stopping":
          return "stopped"
        default:
          return playbackState
      }
    }))
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
