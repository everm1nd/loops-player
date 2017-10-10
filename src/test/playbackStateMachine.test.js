import togglePlayback from 'playbackStateMachine'

describe("playbackStateMachine", () => {
  describe('onClick', () => {
    describe('transition', () => {
      it('transition stopped clip to starting', () => {
        expect(togglePlayback.onClick('stopped')).toEqual({
          result: 'starting',
          dependentStates: ["stopping"]
        })
      })

      it('transition started clip to stopping', () => {
        expect(togglePlayback.onClick('started')).toEqual({
          result: 'stopping',
          dependentStates: ["starting"]
        })
      })
    })

    describe('cancel transition', () => {
      it('transition starting clip to stopped', () => {
        expect(togglePlayback.onClick('starting')).toEqual({
          result: 'stopped',
          dependentStates: ["started", "starting"]
        })
      })

      it('transition stopping clip to started', () => {
        expect(togglePlayback.onClick('stopping')).toEqual({
          result: 'started'
        })
      })
    })

    it('returns original state if transition is unknown', () => {
      expect(togglePlayback.onClick('foo')).toEqual('foo')
    });
  });

  describe('onTick', () => {
    describe('finalize transition of', () => {
      it('starting clip to started', () => {
        expect(togglePlayback.onTick('starting')).toEqual('started')
      });

      it('stopping clip to stopped', () => {
        expect(togglePlayback.onTick('stopping')).toEqual('stopped')
      });
    });

    it('returns original state if transition is unknown', () => {
      expect(togglePlayback.onTick('foo')).toEqual('foo')
    });
  });
})
