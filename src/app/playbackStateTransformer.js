import update from 'immutability-helper';
import transformCollection from 'utils/collectionTransformer'
import togglePlayback from 'playbackStateMachine'

const _mapClipsState = (appState, transformation) => (
  transformCollection(appState, 'tracks', (track) => (
    transformCollection(track, 'clips', clip => ({ playbackState: transformation(clip.playbackState) }))
  ))
)

const initPlaybackState = appState => _mapClipsState(appState, state => "stopped")
const tickPlaybackState = appState => _mapClipsState(appState, togglePlayback.onTick)
const clickPlaybackState = ( appState, event ) => (
  update(appState, {
    tracks: {
      [event.trackId]: {
        clips: { [event.clipId]: { playbackState: {$apply: togglePlayback.onClick} } }
      }
    }
  })
)

export {
  initPlaybackState,
  tickPlaybackState,
  clickPlaybackState
}
