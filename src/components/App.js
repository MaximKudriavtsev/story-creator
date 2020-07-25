import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "gatsby"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { saveAs } from 'file-saver';
import PreviewPart from './preview-part';
import EditablePart from './editable-part';
import convertToMD from '../utils/convert-to-md';
import StoryName from './story-name';
import UploadMenu from './upload-menu';
import SEO from "./seo";

function App() {
  const dispatch = useDispatch();
  const { stories, storyName, goals, additional } = useSelector(state => ({
    stories: state.stories,
    storyName: state.storyName,
    goals: state.goals,
    additional: state.additional,
  }));
  const exportMD = React.useCallback(() => {
    const filename = "data.md";

    const blob = new Blob([convertToMD(stories, storyName, goals, additional)], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, filename);
  }, [stories, storyName, goals, additional]);
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
          <Tooltip title="Download a markdown file">
            <IconButton
              onClick={exportMD}
            >
              <GetAppIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset data">
            <IconButton
              onClick={resetData}
            >
              <RotateLeftIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {/* <h3 style={{ textAlign: 'center' }}>
        Make stories by adding data into the table. Just click on any cell to enable editing mode.
      </h3> */}
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
