import React from 'react';
import PropTypes from "prop-types"
import Clip from 'components/Clip'

const Track = ({ id, name, clips, onClick }) => <div className="track">
  <h4 className="title">{ name }</h4>
  { clips.map( (clip, index) => <Clip id={index} key={clip.name} {...clip} onClick={onClick.bind(null, id)} /> ) }
</div>

Track.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  clips: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Track;
