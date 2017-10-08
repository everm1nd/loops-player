const Tone = {
  Player: jest.fn(() => ({
    toMaster: jest.fn().mockReturnThis(),
    start: jest.fn(),
    stop: jest.fn()
  })),
  Transport: {
    scheduleRepeat: jest.fn(),
    start: jest.fn()
  }
}

export default Tone;
