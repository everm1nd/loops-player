import togglePlayback from 'playbackStateMachine'

describe("playbackStateMachine", () => {
  describe('transition', () => {
    it('transition stopped clip to starting', () => {
      expect(togglePlayback('stopped')).toEqual('starting')
    })

    it('transition started clip to stopping', () => {
      expect(togglePlayback('started')).toEqual('stopping')
    })
  })

  describe('cancel transition', () => {
    it('transition starting clip to stopped', () => {
      expect(togglePlayback('starting')).toEqual('stopped')
    })

    it('transition stopping clip to started', () => {
      expect(togglePlayback('stopping')).toEqual('started')
    })
  })
})
