const Tone = {
  Player: jest.fn(() => ({
    toMaster: jest.fn()
  }))
}

export default Tone;
