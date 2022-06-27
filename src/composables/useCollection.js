import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const useCollection = (cols) => {
  const error = ref(null);
  const isPending = ref(false);

  const colRef = collection(projectFirestore, cols);

  // add a new document
  const addDocument = async (doc) => {
    error.value = null;
    isPending.value = true;

    // try {
    //   const res = await projectFirestore.collection(cols).add(doc);
    //   isPending.value = false;
    //   return res;
    // } catch (err) {
    //   console.log(err.message);
    //   error.value = "could not send the message";
    //   isPending.value = false;
    // }

    try {
      const res = addDoc(colRef, doc);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
      isPending.value = false;
    }
  };

  return { error, addDocument, isPending };
};

export default useCollection;
