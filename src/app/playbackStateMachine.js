export default (playbackState) => {
  // simple playback state machine
  switch (playbackState) {
    case "stopped":
      return "starting"  // start transition
    case "starting":
      return "stopped" // cancel transition
    case "started":
      return "stopping" // start transition
    case "stopping":
      return "started" // cancel transition
    default:
      return playbackState
  }
}
