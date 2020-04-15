import React, { useState } from "react";
import {Flex,Button} from 'rebass'; 
import {Input } from '@rebass/forms'
import { storage } from "./firebaseConfig";


export default function Uploader() {

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");



  const handChange = e => {

    const file = e.target.files[0];

    if (file) {

      const fileType = file["type"];

      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {

        setError("");

        setImage(file);

      } else {

        setError("Please select an image to upload");

      }

    }

  };



  const handleUpdate = () => {

    if (image) {

      const uploadTask = storage.ref(`images/${image.name}`).put(image);



      uploadTask.on(

        "state_changed",

        snapshot => {

          const progress = Math.round(

            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          );

          setProgress(progress);

        },

        error => {

          setError(error);

        },

        () => {

          storage

            .ref("images")

            .child(image.name)

            .getDownloadURL()

            .then(url => {

              setUrl(url);

              setProgress(0);

            });

        }

      );

    } else {

      setError("Error please choose an image to upload");

    }

  };



  return (

    <div>

          <Flex 
          mx={2}
          p={2}
          bg= "white"
          >
              <div className = "signupinput">
        <Input  type="file" onChange={handChange} />{" "}
        </div>
        {/* <Button marginTop = {3} height={35} backgroundColor='black' mx={2}  onClick={handleUpdate}> Upload</Button> */}
        </Flex>
     
      <div>

        {progress > 0 ? <progress value={progress} max="100" /> : ""}

        <p style={{ color: "red" }}>{error}</p>

      </div>

    </div>

  );

}
