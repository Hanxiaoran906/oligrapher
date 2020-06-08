import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import DraggableComponent from './DraggableComponent'
import CaptionTextbox from './CaptionTextbox'
import CaptionEditorTextarea from './CaptionEditorTextarea'

export default function Caption({ caption, currentlyEdited, highlighted }) {
  const { id, x, y, width, height } = caption
  const [foreignObjectSize, setForeignObjectSize] = useState({ width, height })

  const dispatch = useDispatch()
  const clickCaption = useCallback(() => dispatch({ type: 'CLICK_CAPTION', id }), [dispatch, id])
  const updateCaption = useCallback(attributes => dispatch({ type: 'UPDATE_CAPTION', attributes, id }), [dispatch, id])
  const moveCaption = useCallback(deltas => dispatch({ type: 'MOVE_CAPTION', deltas, id }), [dispatch, id])

  return (
    <DraggableComponent
      disabled={currentlyEdited}
      enableUserSelectHack={currentlyEdited}
      onStop={moveCaption}
      onClick={clickCaption}
      handle=".oligrapher-caption">
      <g className="oligrapher-caption" id={`caption-${id}`} >
        <foreignObject 
          x={Math.round(x)} 
          y={Math.round(y)} 
          width={foreignObjectSize.width} 
          height={foreignObjectSize.height}>
          { currentlyEdited &&
            <CaptionEditorTextarea
              caption={caption}
              updateCaption={updateCaption}
              setForeignObjectSize={setForeignObjectSize} />
          }
          { !currentlyEdited && <CaptionTextbox caption={caption} highlighted={highlighted} /> }
        </foreignObject>
      </g>
    </DraggableComponent>
  )
}

Caption.propTypes = {
  caption: PropTypes.object.isRequired,
  currentlyEdited: PropTypes.bool.isRequired,
  highlighted: PropTypes.bool.isRequired
}

Caption.defaultProps = {
  currentlyEdited: false
}