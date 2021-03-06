import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { Button } from '@material-ui/core'

export default function EditorSubmitButtons({ handleSubmit, handleDelete, hideDeleteButton, hideSubmitButton, page, setPage })  {
  return (
    <div className="editor-buttons">
      { !hideDeleteButton && page === 'main' && 
        <Button onClick={handleDelete} variant="contained" color="secondary" size="small" disableElevation={true}>Delete</Button> 
      }

      { page !== 'main' && 
        <Button onClick={() => setPage('main')} variant="contained" color="primary" size="small" disableElevation={true}>Back</Button> 
      }

      { !hideSubmitButton && 
        <Button onClick={handleSubmit} variant="contained" color="primary" size="small" disableElevation={true}>Apply</Button> 
      }
    </div>
  )
}

EditorSubmitButtons.propTypes = {
  handleSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
  hideSubmitButton: PropTypes.bool,
  hideDeleteButton: PropTypes.bool,
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func
}

EditorSubmitButtons.defaultProps = {
  setPage: noop,
  handleSubmit: noop,
  handleDelete: noop,
  hideSubmitButton: false,
  hideDeleteButton: false
}
