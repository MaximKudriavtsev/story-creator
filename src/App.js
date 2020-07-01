import React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SaveAlt from '@material-ui/icons/SaveAlt';
import { saveAs } from 'file-saver';
import Export from './export';
import Table from './table';
import { generateMD } from './export';
import StoryName from './story-name';

function App() {
  const { stories, storyName, goals } = useSelector(state => ({
    stories: state.stories,
    storyName: state.storyName,
    goals: state.goals,
  }));
  const exportMD = React.useCallback(() => {
    const filename = "data.md";

    const blob = new Blob([generateMD(stories, storyName, goals)], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, filename);
  }, [stories, storyName, goals]);

  return (
    <div className="App" style={{ width: '100vw', height: '100vh', backgroundColor: '#ECEFF1' }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Story Creator
          </Typography>
          <StoryName />
          <Tooltip title="Download a markdown file">
            <IconButton
              onClick={exportMD}
            >
              <SaveAlt />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {/* <h3 style={{ textAlign: 'center' }}>
        Make stories by adding data into the table. Just click on any cell to enable editing mode.
      </h3> */}
      <div style={{ display: 'flex' }}>
        <div style={{ width: '55%', padding: '16px' }}>
          <Table />
        </div>
        <div style={{ width: '45%', padding: '16px', paddingLeft: '0px' }}>
          <Export />
        </div>
      </div>
    </div>
  );
}

export default App;
