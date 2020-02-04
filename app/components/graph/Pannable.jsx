import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'

const defaultClassName = 'react-draggable pannable'

/* Allows for the maps to be panned */
export default function Pannable(props) {
  const scale = props.zoom * props.actualZoom

  return <Draggable handle='.pannable-handle' scale={scale} defaultClassName={defaultClassName}>
           <g>
             <rect className="pannable-handle"
                   x="-5000"
                   y="-5000"
                   width="10000"
                   height="10000"
                   fill="#fff" />
             {props.children}
           </g>
         </Draggable>
}

Pannable.propTypes = {
  children:    PropTypes.node.isRequired,
  zoom:        PropTypes.number.isRequired,
  actualZoom:  PropTypes.number
}

Pannable.defaultProps = {
  actualZoom: 1
}


// return <Draggable handle='.drag-handle' scale={scale} defaultClassName={defaultClassName}>
//            <g>
//              <rect className="drag-handle" x="-5000" y="-5000" width="10000" height="10000" fill="#fff" />
//              {props.children}
//            </g>
//          </Draggable>
