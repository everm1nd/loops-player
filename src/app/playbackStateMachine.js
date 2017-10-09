// simple playback state machine
export default {
  onClick(playbackState) {
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
  },
  onTick(playbackState) {
    switch (playbackState) {
      case "starting":
        return "started"
      case "stopping":
        return "stopped"
      default:
        return playbackState
    }
  }
}
