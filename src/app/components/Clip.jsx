import React from 'react';
import Tone from "tone";
import 'components/Clip/play-icon.svg'

const assetPath = url => process.env.PUBLIC_URL + url;

const Clip = ({ url }) => {
  const player = new Tone.Player(assetPath(url)).toMaster();
  const play = () => { player.start() }
  return <button className="button clip" onClick={play} />
}

export default Clip;
