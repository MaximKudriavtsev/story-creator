import React from 'react';
import { Link } from "gatsby"
import { dispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import Tooltip from '@material-ui/core/Tooltip';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import PreviewPart from './preview-part';
import EditablePart from './editable-part';
import StoryName from './story-name';
import UploadMenu from './upload-menu';
import SEO from "./seo";
import Export from './export'

function App() {
  const openDialog = React.useCallback(() => dispatch({ type: 'setDialog', value: true }), [dispatch]);
  const resetData = React.useCallback(() => dispatch({ type: 'resetData' }), [dispatch]);
  
  return (
    <div className="App" style={{ width: '100vw', height: '100vh', backgroundColor: '#ECEFF1' }}>
      <SEO title="Create User Story" />
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'rgb(96, 96, 96)' }}>
              Story Creator
            </Link>
          </Typography>
          <StoryName />
          <Tooltip title="Upload a markdown file">
            <IconButton
              onClick={openDialog}
            >
              <PublishIcon />
            </IconButton>
          </Tooltip>
          <Export />
          <Tooltip title="Reset data">
            <IconButton
              onClick={resetData}
            >
              <RotateLeftIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '55%', padding: '16px' }}>
          <EditablePart />
        </div>
        <div style={{ width: '45%', padding: '16px', paddingLeft: '0px' }}>
          <PreviewPart />
        </div>
      </div>

      <UploadMenu />
    </div>
  );
}

export default App;
