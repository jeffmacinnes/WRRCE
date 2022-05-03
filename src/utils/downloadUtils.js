import { csvFormat } from "d3";
import JSZip from "jszip";
import FileSaver from "file-saver";

export const csvDownload = (data) => {
  const content = `data:text/csv;charset=utf-8,${csvFormat(data)}`;
  return encodeURI(content);
};

export const zipFiles = (fileArray, zipFolder, zipName) => {
  /*
    e.g. 
    data = [{a: 123, b:234}, {a: 555, b: 666}];
    zipFiles([
      {fname: 'myDownload.csv, content: csvFormat(data)}
    ], 'myZip', 'myZip.zip);
  */

  const zip = new JSZip();
  const folder = zip.folder(zipFolder);

  fileArray.forEach((f) => {
    folder.file(f.fname, f.content);
  });

  // generate and download zip
  zip.generateAsync({ type: "blob" }).then((content) => {
    FileSaver.saveAs(content, zipName);
  });
};
