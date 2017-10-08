import React from 'react';
import Clip from 'components/Clip'

const Track = ({ id, name, clips, onClick }) => <div className="track">
  <h4 className="title">{ name }</h4>
  { clips.map( (clip, index) => <Clip id={index} key={clip.name} {...clip} onClick={onClick.bind(null, id)} /> ) }
</div>

export default Track;
