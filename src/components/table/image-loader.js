import * as React from 'react';
import { useDispatch } from 'react-redux';
import ImageIcon from '@material-ui/icons/Image';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { updatePhoto, deletePhoto } from '../../api/actions';

const style = {
  width: '0.1px',
  height: '0.1px',
  opacity: 0,
  overflow: 'hidden',
  position: 'absolute',
  zIndex: -1,
};

const imageStyle = {
  objectFit: 'contain',
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  verticalAlign: 'middle',
  margin: 0,
};

const iconStyle = {
  cursor: 'pointer'
};

export const ImageLoader = ({ row }) => {
  const dispatch = useDispatch();
  const addImage = React.useCallback(({ file }) => {
    updatePhoto(dispatch)({ storyId: row.id, file });
  }, [row, dispatch]);
  const deleteImage = React.useCallback(() => {
    deletePhoto(dispatch)({ storyId: row.id, imgUrl: row.imgUrl });
  }, [row, dispatch]);
  const onChangeHandler = React.useCallback((event) => {
    const file = event.target.files[0];
    addImage({ file });
  }, [addImage]);
  
  if (row.loading) {
    return <CircularProgress color="secondary" size={30} />;
  }

  return (
    <div>
      {row.imgUrl ? (
        <Tooltip title="Delete image">
          <img
            src={row.imgUrl}
            style={imageStyle}
            onClick={deleteImage}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Upload image">
          <label htmlFor="file">
            <input
              id="file"
              style={style}
              type="file"
              name="file"
              onChange={onChangeHandler}
            />
            <ImageIcon style={iconStyle} />
          </label>
        </Tooltip>
      )}
    </div>
  );
};