import React from 'react';
import Tone from "tone";
import 'components/Clip/play-icon.svg'

const Clip = ({ url }) => {
  const player = new Tone.Player(process.env.PUBLIC_URL + url).toMaster();
  const play = () => { player.start() }
  return <button className="button clip" onClick={play} />
}

export default Clip;
