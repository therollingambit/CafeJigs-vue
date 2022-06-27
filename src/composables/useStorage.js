import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import {
  ref as fref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    // const storageRef = projectStorage.ref(filePath.value);
    const storageRef = fref(projectStorage, filePath.value);

    try {
      // const res = await storageRef.put(file);
      const res = await uploadBytes(storageRef, file);
      // url.value = await res.ref.getDownloadURL();
      url.value = await getDownloadURL(res.ref);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
      console.log(storageRef);
    }
  };

  const deleteImage = async (path) => {
    // const storageRef = projectStorage.ref(path);
    const storageRef = fref(projectStorage, path);

    try {
      // await storageRef.delete();
      await deleteObject(storageRef);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
