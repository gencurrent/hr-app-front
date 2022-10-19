class CloudStorageClient {
  static reduceFileName(filename) {
    let re = /^(?<name>.*?)\.?(?<ext>\w*)$/g;
    const match = re.exec(filename);
    const name = match.groups["name"];
    const ext = match.groups["ext"];
    const newName =
      filename < 70 ? filename : `${name.slice(0, 50)}..._.${ext.slice(0, 10)}`;
    return newName;
  }
};

export default CloudStorageClient;