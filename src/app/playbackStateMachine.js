// simple playback state machine
export default {
  onClick(playbackState) {
    switch (playbackState) {
      case "stopped":
        return {
          result: "starting",
          dependentStates: ["stopping"]
        }
      case "starting":
        return {
          result: "stopped",
          dependentStates: ["started", "starting"]
        }
      case "started":
        return {
          result: "stopping"
        }
      case "stopping":
        return {
          result: "started",
          dependentStates: ["starting"]
        }
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
