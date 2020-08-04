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

export const ImageLoader = React.memo(({ storyId, imgUrl, loading }) => {
  const dispatch = useDispatch();
  const deleteImage = React.useCallback(() => {
    deletePhoto(dispatch)({ storyId: storyId, imgUrl });
  }, [storyId, imgUrl, dispatch]);
  const onChangeHandler = React.useCallback((event) => {
    const file = event.target.files[0];
    updatePhoto(dispatch)({ storyId: storyId, file });
  }, [storyId, dispatch]);
  const inputId = `input_${storyId}`;
  
  if (loading) {
    return <CircularProgress color="secondary" size={30} />;
  }

  return (
    <div>
      {imgUrl ? (
        <Tooltip title="Delete image">
          <img
            src={imgUrl}
            style={imageStyle}
            onClick={deleteImage}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Upload image">
          <label htmlFor={inputId}>
            <input
              id={inputId}
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
});