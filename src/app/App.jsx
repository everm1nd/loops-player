import React from 'react';
import 'App.css';
import Track from "components/Track";
import tracksData from "appData";
import { initPlaybackState, startTransition, finalizeTransition } from 'playbackStateTransformer'
import Tone from 'tone'

const QUANTIZATION = "2m"
const BPM = 110;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initPlaybackState(tracksData)

    Tone.Transport.bpm.value = BPM;
  }

  componentDidMount() {
    Tone.Transport.scheduleRepeat(this._tick, QUANTIZATION);
  }

  _tick = (time) => {
    console.log(Tone.Transport.seconds.toFixed(2))
    this.setState(
      finalizeTransition,
      this._stopTransportUnlessPlaying
    )
  }

  _allClipsStopped() {
    return this.state.tracks.every((track) => (
      track.clips.every(clip => clip.playbackState === "stopped")
    ))
  }

  _startTransport() {
    if (Tone.Transport.state === "stopped") Tone.Transport.start()
  }

  _stopTransportUnlessPlaying() {
    if (this._allClipsStopped()) {
      Tone.Transport.stop()
      Tone.Transport.cancel()
    }
  }

  _handleClipClick = (trackId, clipId) => {
    this.setState(prevState => startTransition(prevState, { trackId, clipId }),
      this._startTransport
    )
  }

  renderTracks() {
    return this.state.tracks.map(track =>
      <Track key={track.name} {...track} onClick={this._handleClipClick} />
    )
  }

  render() {
    return <div className="app">{this.renderTracks()}</div>
  }
}

export default App;
