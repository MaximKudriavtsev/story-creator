import AWS from 'aws-sdk';

const ALBUM_NAME = 'test';
const bucketName = "user-story-creator";
const bucketRegion = "eu-central-1";
const IdentityPoolId = "eu-central-1:5786ef9b-b058-45e7-b698-aca2f1007fe9";

const DATABASE_URL = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/`;

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName }
});

export const updatePhoto =  dispatch => ({ file, storyId }) => {
  const fileName = file.name;
  const albumPhotosKey = encodeURIComponent(ALBUM_NAME) + "/";

  const photoKey = albumPhotosKey + fileName;

  // Use S3 ManagedUpload class as it supports multipart uploads
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: photoKey,
      Body: file,
      ACL: "public-read"
    }
  });

  const promise = upload.promise()
  // dispatch - start uploading

  promise.then(
    function(data) {
      alert("Successfully uploaded photo.");
      dispatch({
        type: 'changeStory',
        changed: {
          [storyId]: { imgUrl: data.Location },
        },
      });
    },
    function(err) {
      // dispatch - failure
      return alert("There was an error uploading your photo: ", err.message);
    }
  );
};

export const deletePhoto = dispatch => ({ storyId, imgUrl }) => {
  const photoKey = imgUrl.slice(DATABASE_URL.length);
  console.log(photoKey);
  s3.deleteObject({ Key: photoKey }, function(err, data) {
    if (err) {
      return alert("There was an error deleting your photo: ", err.message);
    }
    dispatch({
      type: 'changeStory',
      changed: {
        [storyId]: { imgUrl: null },
      },
    });
    alert("Successfully deleted photo.");
  });
}