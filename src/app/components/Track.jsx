import React from 'react';
import Clip from 'components/Clip'

const Track = ({ name }) => <div className="track">
  <h4 className="title">{ name }</h4>
  <Clip key={1}/>
  <Clip key={2}/>
</div>

export default Track;
