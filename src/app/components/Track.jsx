import React from 'react';
import Clip from 'components/Clip'

// TODO: it would be nice to use React 16 array rendering feature here,
// but it's not supported by new Enzyme adapter yet
const Track = () => <div>
  <Clip key={1}/>
  <Clip key={2}/>
</div>

export default Track;
