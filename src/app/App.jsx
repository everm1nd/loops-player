import React from 'react';
import 'App.css';
import Track from "components/Track";
import tracksData from "components/Track/data";

const handleClick = (trackId, clipId) => {
  console.log(trackId, clipId)
}

const App = () => {
  const tracks = tracksData.tracks.map( (track, index) =>
    <Track id={index} key={track.name} {...track} onClick={handleClick} />
  )
  return <div className="app">{tracks}</div>
}

export default App;
