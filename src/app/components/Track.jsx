import React from 'react';
import PropTypes from "prop-types"
import styled from 'styled-components';
import Clip from 'components/Clip'
import 'components/Track/Track.css'

const TrackWrapper = styled.div`
  .clip.started, .clip.starting, .clip.stopping {
    background-color: ${props => props.color};
  }
`

const Track = ({ id, name, color, clips, onClick }) => <TrackWrapper color={color} className="track">
  <h4 className="title">{ name }</h4>
  { clips.map(clip => <Clip key={clip.id} {...clip} onClick={onClick.bind(null, id)} /> )}
</TrackWrapper>

Track.defaultProps = {
  color: 'deeppink'
}

Track.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  clips: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string
}

export default Track;
