const Tone = {
  Player: jest.fn(() => ({
    toMaster: jest.fn().mockReturnThis(),
    start: jest.fn(),
    stop: jest.fn(),
    setLoopPoints: jest.fn()
  })),
  Transport: {
    scheduleRepeat: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    cancel: jest.fn(),
    seconds: 0,
    bpm: {}
  },
  Time: jest.fn(() => ({
    toSeconds: jest.fn()
  }))
}

export default Tone;
