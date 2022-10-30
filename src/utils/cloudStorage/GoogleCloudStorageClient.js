/**
 * Client to upload files with GCP Cloud Storage service
 */
import CloudStorageClient from "./BaseCloudStorageClient";
import { pureApolloClient, MUTATIONS } from "utils/apollo";

class GoogleCloudStorageClient extends CloudStorageClient {
  uploadFile(vacancyId, file, onSuccess, onError) {
    const filename = GoogleCloudStorageClient.reduceFileName(file.path);
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
        let { key, url } = signature;
        const formData = new FormData();
        formData.append(filename, file);
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((e) => {
            if (!e.ok) {
              throw new Error("Could not upload the file");
            }
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

  getFileUrl(fileName) {
    const fileUrlBase = "https://storage.googleapis.com";
    const bucketName = "hr-app";
    const fileUrl = `${fileUrlBase}/${bucketName}/${fileName}`;
    return fileUrl;
  }
}

export default GoogleCloudStorageClient;
