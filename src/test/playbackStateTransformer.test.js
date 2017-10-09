jest.mock('playbackStateMachine', () => (
  {
    onTick: jest.fn().mockReturnValue('foo'),
    onClick: jest.fn().mockReturnValue('bar')
  }
))

import { initPlaybackState, clickPlaybackState, tickPlaybackState } from 'playbackStateTransformer'

describe('playbackStateTransformer', () => {
  const state = {
    tracks: [
      { clips: [{}] },
      { clips: [{}] }
    ]
  }

  describe('.initPlaybackState', () => {
    it("set playbackState of all clips to stopped", () => {
      expect(initPlaybackState(state)).toEqual({
        tracks: [
          { clips: [{ playbackState: "stopped" }] },
          { clips: [{ playbackState: "stopped" }] }
        ]
      })
    });
  });

  describe('.tickPlaybackState', () => {
    it('update state of all clips with value from state machine', () => {
      expect(tickPlaybackState(state)).toEqual({
        tracks: [
          { clips: [{ playbackState: "foo" }] },
          { clips: [{ playbackState: "foo" }] }
        ]
      })
    });
  })

  describe('.clickPlaybackState', () => {
    it('updates state of selected clip with value from state machine', () => {
      expect(clickPlaybackState(state, { trackId: 0, clipId: 0 })).toEqual({
        tracks: [
          { clips: [{ playbackState: "bar" }] },
          { clips: [{}] }
        ]
      })
    });
  })
});
