import { useEffect} from "react";
// uppy
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import Dashboard from "@uppy/dashboard";
// Uppy css
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/status-bar/dist/style.css";
import "@uppy/progress-bar/dist/style.css";

const UppyDashboard = ({setImageUrl,closeModal}) => {

  useEffect(() => {
    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"], 
      },
      autoProceed: false, 
    })
      .use(Dashboard, {
        inline: true,
        target: ".file-uploader",
        replaceTargetContent: true,
        showProgressDetails: true,
        height: 470,
        metaFields: [
          { id: "name", name: "Name", placeholder: "File name" },
          {
            id: "description",
            name: "Description",
            placeholder: "Add a description",
          },
        ],
      })
      .use(XHRUpload, {
        endpoint: `${process.env.REACT_APP_DEV_STAGE_URL}/api/uploadURLs/upload-image`,
        fieldName: "file",
        formData: true,
      });

    uppy.on("upload-success", (file, response) => {
      setImageUrl(response.body.result.variants[0]);
      closeModal()
    });

    return () => {
      uppy.close();
    };
  }, [closeModal, setImageUrl]);

  return (
      <div className="file-uploader"></div>
  );
};

export default UppyDashboard;
