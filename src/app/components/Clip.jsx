import React from 'react';
import Tone from "tone";
import 'components/Clip/play-icon.svg'

const assetPath = url => process.env.PUBLIC_URL + url;

const Clip = ({ url }) => {
  const player = new Tone.Player(assetPath(url)).toMaster();
  const toggle = () => { player.state === "started" ? player.stop() : player.start() }
  return <button className="button clip" onClick={toggle} />
}

export default Clip;
