export default {
  tracks: [
    {
      name: "Drums",
      color: 'blue',
      clips: [
        { name: "Electronic Drums", url: '/media/drums-electronic-1-4m.ogg', duration: '4m' },
        { name: "Acoustic Drums", url: '/media/drums-acoustic-2-4m.ogg', duration: '4m' },
        { name: "Electronic Drums - Vermona", url: '/media/drums-vermona-3-4m.ogg', duration: '4m' }
      ]
    },
    {
      name: "Melody",
      clips: [
        { name: "Synth Melody", url: '/media/melody-synth-1-4m.ogg', duration: '2m' },
        { name: "Guitar Melody", url: '/media/melody-guitar-2-4m.ogg', duration: '2m' },
        { name: "Synth Pulse Melody", url: '/media/melody-pulse-3-8m.ogg', duration: '2m' }
      ]
    },
    {
      name: "Bass",
      color: "Orange",
      clips: [
        { name: "Synth Bassline", url: '/media/bass-synth-1-4m.ogg', duration: '4m' },
        { name: "Guitar Bassline", url: '/media/bass-guitar-2-2m.ogg', duration: '2m' },
        { name: "Synth Drone Bassline", url: '/media/bass-drone-3-16m.ogg', duration: '16m' }
      ]
    }
  ]
}
