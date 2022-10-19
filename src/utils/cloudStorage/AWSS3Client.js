/**
 * Client to upload files with AWS S3 service
 */
import CloudStorageClient from "./BaseCloudStorageClient";
import { pureApolloClient, MUTATIONS } from "utils/apollo";

class AWSS3Client extends CloudStorageClient {
  uploadFile(vacancyId, file, onSuccess, onError) {
    const filename = this.reduceFileName(file.path);
    pureApolloClient
      .mutate({
        mutation: MUTATIONS.CREATE_S3_UPLOAD_REQUEST,
        variables: {
          filename: filename,
          vacancyId: vacancyId,
        },
      })
      .then((response) => {
        let signature = JSON.parse(
          response.data.createS3UploadRequest.signature
        );
        let { url, key } = signature;
        // Push the validated file to the Cloud Storage
        fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "x-amz-acl": "public-read",
          },
        })
          .then((e) => {
            if (!e.ok) {
              throw new Error("Could not upload the file");
            }
            // valueUpdatedCallBackWrapper(key);
            // setStateFiles([file]);
            // setFieldError(undefined);
            onSuccess(key, [file]);
          })
          .catch((error) => {
            // setStateFiles([]);
            // setFieldError(error.message);
            onError(error.message);
          });
      });
    return null;
  }
}

export default AWSS3Client;
