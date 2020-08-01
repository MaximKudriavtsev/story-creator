import React from 'react';
import { useSelector } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { saveAs } from 'file-saver';
import convertToMD from '../utils/convert-to-md';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { convertToPdfMeta } from '../utils/convert-to-pdf-meta';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DescriptionIcon from '@material-ui/icons/Description';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { stories, storyName, goals, additional } = useSelector(state => ({
    stories: state.stories,
    storyName: state.storyName,
    goals: state.goals,
    additional: state.additional,
  }));

  const handleClick = React.useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const exportPDF = React.useCallback(() => {
    const filename = `${storyName}.pdf`;
    const docDefinition = convertToPdfMeta(storyName, goals, additional, stories);

    pdfMake.createPdf(docDefinition).download(filename);
  }, [stories, storyName, goals, additional]);
  
  const exportMD = React.useCallback(() => {
    const filename = `${storyName}.md`;

    const blob = new Blob([convertToMD(stories, storyName, goals, additional)], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, filename);
  }, [stories, storyName, goals, additional]);

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Export">
        <IconButton
          onClick={handleClick}
        >
          <GetAppIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List component="nav">
          <ListItem button onClick={exportMD}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="MD Document" />
          </ListItem>

          <ListItem button onClick={exportPDF}>
            <ListItemIcon>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText primary="PDF Document" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
}
