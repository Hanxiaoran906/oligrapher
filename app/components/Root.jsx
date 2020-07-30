import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, Hidden } from '@material-ui/core'

import Header from './Header'
import CondensedHeader from './CondensedHeader'
import Graph from './Graph'
import Editor from './Editor'
import FloatingEditors from './FloatingEditors'
import ZoomControl from './ZoomControl'
import UserMessage from './UserMessage'
import Annotations from './Annotations'
import CondensedAnnotations from './CondensedAnnotations'
import AnnotationsToggler from './AnnotationsToggler'
import { muiTheme } from '../util/helpers'
import { showAnnotationsSelector, annotationsListSelector } from '../util/selectors'

export const ROOT_CONTAINER_ID = "oligrapher-container"

export function Root() {
  const showAnnotations = useSelector(showAnnotationsSelector)
  const hasAnnotations = useSelector(annotationsListSelector).length > 0

  // to pevent backspace form navigating away from page 
  // in firefox and possibly other browsers
  useEffect(() => {
    window.addEventListener('keydown', event => {
      const isBackspace = event.key === 'Backspace'
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)
  
      if (isBackspace && !isInput) {
        event.preventDefault()
      }
    })
  })

  return (
    <div id={ROOT_CONTAINER_ID}>
      <ThemeProvider theme={muiTheme}>
        <Hidden xsDown>
          <Header />
        </Hidden>
        <Hidden smUp>
          <CondensedHeader />
        </Hidden>

        <Grid container spacing={0}>
          <Grid item xs={12} md={showAnnotations ? 8 : 12}>
            <div id="oligrapher-graph-container">
              <Graph rootContainerId={ROOT_CONTAINER_ID} />
              <Hidden xsDown>
                <Editor />
              </Hidden>
              <ZoomControl />
              <FloatingEditors />
              <UserMessage />
            </div>
          </Grid>

          { showAnnotations &&
            <Hidden smDown>
              <Grid item xs={4}>
                <Annotations />
              </Grid>
            </Hidden>
          }
        </Grid>

        { showAnnotations &&
          <Hidden mdUp>
            <CondensedAnnotations />
          </Hidden>
        }

        { !showAnnotations && hasAnnotations && 
          <Hidden smUp>
            <div id="oligrapher-condensed-annotations-toggler">
              <AnnotationsToggler />
            </div>
          </Hidden>
        }
      </ThemeProvider>
    </div>
  )
}

export default hot(Root)