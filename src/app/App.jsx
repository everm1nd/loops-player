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
  }

  _tick(time) {
    console.log(Tone.Transport.seconds.toFixed(2))
    this.setState(mapClipsState(this.state, (playbackState) => {
      switch (playbackState) {
        case "starting":
          return "started"
        case "stopping":
          return "stopped"
        default:
          return playbackState
      }
    }), () => {
      if (this._allClipsStopped()) {
        Tone.Transport.stop()
        Tone.Transport.cancel()
      }
    })
  }

  _allClipsStopped() {
    return this.state.tracks.every((track) => (
      track.clips.every(clip => clip.playbackState === "stopped")
    ))
  }

  _startTransport() {
    if (Tone.Transport.state === "stopped") Tone.Transport.start()
  }

  _handleClipClick(trackId, clipId) {
    const state = update(this.state, {
      tracks: {
        [trackId]: {
          clips: { [clipId]: { playbackState: {$apply: togglePlayback} } }
        }
      }
    })
    this.setState(state, this._startTransport)
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
