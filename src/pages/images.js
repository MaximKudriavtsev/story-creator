import React from "react"

import { listAlbums, addPhoto, viewAlbum } from '../api/database';

const ALBUM_NAME = 'test';

const SecondPage = () => {
  React.useEffect(() => {
    viewAlbum(ALBUM_NAME);
  });

  return (
    <>
      <h1>My Photo Albums App</h1>
      <div id="app"></div>
      <div>

      </div>
      <div>
        <input id="photoupload" type="file" accept="image/*" />
        <button id="addphoto" onClick={() => addPhoto(ALBUM_NAME)}>
          Upload
        </button>
      </div>
    </>
  );
};

export default SecondPage
