import http from "../main";

class UploadFilesService {
  upload(file) {
    let uploadData = new uploadData();

    uploadData.append("file", file);

    return http.post("/images/publication/", uploadData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  getFiles() {
    return http.get("/images/publication/");
  }
}

export default new UploadFilesService();
