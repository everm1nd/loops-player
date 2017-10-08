import React from 'react';
import Clip from 'components/Clip'

const Track = ({ name, clips }) => <div className="track">
  <h4 className="title">{ name }</h4>
  { clips.map( clip => <Clip key={clip.name} {...clip} onClick={() => {}} /> ) }
</div>

export default Track;
