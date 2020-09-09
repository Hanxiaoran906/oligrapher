import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

import Confirm from './Confirm'
import { Annotation } from '../util/annotations'

export default function RemoveAnnotationButton({ annotation }: RemoveAnnotationButtonProps) {
  const dispatch = useDispatch()
  const { id, text } = annotation
  const mustConfirm = text && text.length > 30
  const [showConfirm, setShowConfirm] = useState(false)
  const openConfirm = useCallback(() => setShowConfirm(true), [])
  const closeConfirm = useCallback(() => setShowConfirm(false), [])
  const remove = useCallback(
    () => dispatch({ type: 'REMOVE_ANNOTATION', id }), 
    [dispatch, id]
  )
  const confirmRemove = useCallback(() => {
    remove()
    setShowConfirm(false)
  }, [remove])

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={mustConfirm ? openConfirm : remove}>
        Remove
      </Button>

      <Confirm
        open={showConfirm}
        message={'Are you sure you want to remove this annotation?'}
        cancel={{ label: 'Cancel', onClick: closeConfirm }}
        confirm={{ label: 'Remove', onClick: confirmRemove }}
        />
    </>
  )
}

interface RemoveAnnotationButtonProps {
  annotation: Annotation,
}