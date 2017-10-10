jest.mock('playbackStateMachine', () => (
  {
    onTick: jest.fn().mockReturnValue('foo'),
    onClick: jest.fn((state) => {
      switch (state) {
        case "foo":
          return {
            result: "bar"
          }
        case "bar":
          return {
            result: "foo"
          }
      }
    })
  }
))

import { initPlaybackState, startTransition, finalizeTransition } from 'playbackStateTransformer'

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
          { id: 0, clips: [{ id: 0, playbackState: "stopped" }] },
          { id: 1, clips: [{ id: 0, playbackState: "stopped" }] }
        ]
      })
    });
  });

  describe('.finalizeTransition', () => {
    it('update state of all clips with value from state machine', () => {
      expect(finalizeTransition(state)).toEqual({
        tracks: [
          { clips: [{ playbackState: "foo" }] },
          { clips: [{ playbackState: "foo" }] }
        ]
      })
    });
  })

  describe('.startTransition', () => {
    it('updates state of selected clip with value from state machine', () => {
      const beforeClickState = {
        tracks: [
          { clips: [{ playbackState: "foo" }] }
        ]
      }
      expect(startTransition(beforeClickState, { trackId: 0, clipId: 0 })).toEqual({
        tracks: [
          { clips: [{ playbackState: "bar" }] }
        ]
      })
    });
  })
});
