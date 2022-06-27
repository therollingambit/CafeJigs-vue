import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const useDocument = (cols, id) => {
  let error = ref(null);
  let isPending = ref(false);
  // let docRef = projectFirestore.collection(cols).doc(id);
  let docRef = doc(projectFirestore, cols, id);

  const deleteDocument = async () => {
    isPending.value = true;
    error.value = null;

    try {
      // const res = await docRef.delete();
      const res = await deleteDoc(docRef);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "could not delete the document";
    }
  };

  const updateDocument = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      // const res = await docRef.update(updates);
      const res = await updateDoc(docRef, updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "could not update the document";
    }
  };

  return { error, isPending, deleteDocument, updateDocument };
};

export default useDocument;
