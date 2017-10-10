import update from 'immutability-helper';
import transformCollection from 'utils/collectionTransformer'
import togglePlayback from 'playbackStateMachine'

const _mapClipsState = (appState, transformation) => (
  transformCollection(appState, 'tracks', (track) => (
    transformCollection(track, 'clips', clip => ({ playbackState: transformation(track, clip) }))
  ))
)

const _nextStateAfterClick = (playbackState) => togglePlayback.onClick(playbackState).result

const _transitionClip = ( appState, { trackId, clipId }) => (
  update(appState, {
    tracks: {
      [trackId]: {
        clips: { [clipId]: { playbackState: {$apply: _nextStateAfterClick } } }
      }
    }
  })
)

const _transitionOtherClips = ( playbackStates, appState, { trackId, clipId } ) => (
  _mapClipsState( appState, (track, clip) =>
    playbackStates.includes(clip.playbackState) && track.id === trackId && clip.id !== clipId ?
      _nextStateAfterClick(clip.playbackState) : clip.playbackState
  )
)

const _transitionDependentStates = ( appState, { trackId, clipId } ) => {
  const clip = appState.tracks[trackId].clips[clipId]
  const dependentStates = togglePlayback.onClick(clip.playbackState).dependentStates || []
  return _transitionOtherClips( dependentStates, appState, { trackId, clipId } )
}

const initPlaybackState = appState => _mapClipsState(appState, (track, clip) => "stopped")
const tickPlaybackState = appState => _mapClipsState(appState, (track, clip) => togglePlayback.onTick(clip.playbackState))
const clickPlaybackState = ( appState, { trackId, clipId } ) => {
  let state = _transitionClip(appState, { trackId, clipId })
  state = _transitionDependentStates(state, { trackId, clipId })
  return state
}

export {
  initPlaybackState,
  tickPlaybackState,
  clickPlaybackState
}
