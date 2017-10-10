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

const _cancelStarting = ( appState, { trackId, clipId } ) => (
  _mapClipsState( appState, (track, clip) =>
    clip.playbackState === "starting" && track.id === trackId && clip.id !== clipId ?
      togglePlayback.onClick(clip.playbackState) :
      clip.playbackState
  )
)

const _cancelStarted = ( appState, { trackId, clipId } ) => (
  _mapClipsState( appState, (track, clip) =>
    clip.playbackState === "started" && track.id === trackId && clip.id !== clipId ?
      togglePlayback.onClick(clip.playbackState) :
      clip.playbackState
  )
)

const _cancelStopping = ( appState, { trackId, clipId } ) => (
  _mapClipsState( appState, (track, clip) =>
    clip.playbackState === "stopping" && track.id === trackId && clip.id !== clipId ?
      togglePlayback.onClick(clip.playbackState) :
      clip.playbackState
  )
)

const initPlaybackState = appState => _mapClipsState(appState, (track, clip) => "stopped")
const tickPlaybackState = appState => _mapClipsState(appState, (track, clip) => togglePlayback.onTick(clip.playbackState))
const clickPlaybackState = ( appState, { trackId, clipId } ) => {
  let state = appState
  console.log(trackId, clipId)
  state = _cancelStarting(state, { trackId, clipId } )
  state = _cancelStarted(state, { trackId, clipId } )
  state = _transitionClip(state, { trackId, clipId } )
  console.log(trackId, clipId, state.tracks[trackId].clips[clipId])
  if (state.tracks[trackId].clips[clipId].playbackState === "stopped") {
    console.log('123')
    state = _cancelStopping(state, { trackId, clipId } )
  }
  return state
}

export {
  initPlaybackState,
  tickPlaybackState,
  clickPlaybackState
}
