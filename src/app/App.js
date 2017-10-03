import React from 'react';
import 'App.css';
import Track from "components/Track";

const App = () => {
  const tracks = ["Track 1", "Track 2"].map( name =>
    <Track key={name} name={name} />
  )
  return <div className="app">{tracks}</div>
}

export default App;
