import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import range from 'lodash/range'
import toString from 'lodash/toString'

import { useSelector } from '../util/helpers'
import EditorHotKeys from './EditorHotKeys'
import EditorHeader from './EditorHeader'
import EditorButtons from './EditorButtons'
import CaptionEditorSelect from './CaptionEditorSelect'
import { callWithTargetValue } from '../util/helpers'

const FONT_FAMILY_OPTIONS = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Monospace', label: 'Monospace'},
  { value: 'Times New Roman', label: 'Times New Roman' }
]

const FONT_WEIGHT_OPTIONS = [
  { value: '400', label: 'Normal'},
  { value: '700', label: 'Bold' }
]

const FONT_SIZE_OPTIONS = range(8, 31, 2).map(toString).map(i => ({ value: i, label: i }))

export default function CaptionEditor({ id }: CaptionEditorProps) {  
  const dispatch = useDispatch()
  const caption = useSelector(state => state.graph.captions[id])

  const removeCaption = useCallback(() => dispatch({ type: 'REMOVE_CAPTION', id }), [dispatch, id])

  const onChange = useCallback((type: string) => { 
    return callWithTargetValue<unknown, React.ChangeEvent<{ value: unknown }>>(value => dispatch({ type: 'UPDATE_CAPTION', id, attributes: { [type]: value } }))
  }, [dispatch, id])

  return (
    <EditorHotKeys remove={removeCaption}>
      <div className="oligrapher-caption-editor">
        <EditorHeader title="Customize Caption" />
        <main>
          <label>Font</label>
          <br />
          <CaptionEditorSelect name='font' value={caption.font} onChange={onChange} options={FONT_FAMILY_OPTIONS} width={150} />
          <br />
          <CaptionEditorSelect name='weight' value={caption.weight} onChange={onChange} options={FONT_WEIGHT_OPTIONS} width={100} />
          <CaptionEditorSelect name='size' value={caption.size} onChange={onChange} options={FONT_SIZE_OPTIONS} width={55} />
        </main>

        <footer>
          <EditorButtons handleDelete={removeCaption} />
        </footer>
      </div>
    </EditorHotKeys>
  )
}

interface CaptionEditorProps {
  id: string,
}