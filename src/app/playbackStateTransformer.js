import update from 'immutability-helper';
import transformCollection from 'utils/collectionTransformer'
import togglePlayback from 'playbackStateMachine'

const _mapClipsState = (appState, transformation) => (
  transformCollection(appState, 'tracks', (track) => (
    transformCollection(track, 'clips', clip => ({ playbackState: transformation(track, clip) }))
  ))
)

const _transitionClip = ( appState, { trackId, clipId }) => (
  update(appState, {
    tracks: {
      [trackId]: {
        clips: { [clipId]: { playbackState: {$apply: togglePlayback.onClick} } }
      }
    }
  })
)

const _transitionOtherClips = ( playbackState, appState, { trackId, clipId } ) => (
  _mapClipsState( appState, (track, clip) =>
    clip.playbackState === playbackState && track.id === trackId && clip.id !== clipId ?
      togglePlayback.onClick(clip.playbackState) :
      clip.playbackState
  )
)

const _cancelStarting = _transitionOtherClips.bind(null, "starting")
const _cancelStarted = _transitionOtherClips.bind(null, "started")
const _cancelStopping = _transitionOtherClips.bind(null, "stopping")

const initPlaybackState = appState => _mapClipsState(appState, (track, clip) => "stopped")
const tickPlaybackState = appState => _mapClipsState(appState, (track, clip) => togglePlayback.onTick(clip.playbackState))
const clickPlaybackState = ( appState, { trackId, clipId } ) => {
  let state = appState
  // state = _cancelStarting(state, { trackId, clipId } )
  // state = _cancelStarted(state, { trackId, clipId } )
  state = _transitionClip(state, { trackId, clipId } )
  switch (state.tracks[trackId].clips[clipId].playbackState) {
    case "starting":
      // we starting a new clip
      // this means we need to stop others playing
      // and stop other transitions
      state = _cancelStarted(state, { trackId, clipId } )
      state = _cancelStarting(state, { trackId, clipId } )
      break;
    case "stopping":
      // we stopping a playing clip
      // nothing needs to be done here
      break;
    case "stopped":
      // we canceled starting transition
      // this means we need to cancel stop of playing clip
      state = _cancelStopping(state, { trackId, clipId } )
      break;
    case "started":
      // we canceled stopping transition
      // this means we need to do nothing
      break;
    default:
      break;
  }
  return state
}

export {
  initPlaybackState,
  tickPlaybackState,
  clickPlaybackState
}
