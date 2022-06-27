import { ref } from "vue";
import { projectAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;

  try {
    // const res = await projectAuth.createUserWithEmailAndPassword(
    //   email,
    //   password
    // );
    const res = await createUserWithEmailAndPassword(
      projectAuth,
      email,
      password
    );
    if (!res) {
      throw new Error("Could not complete signup");
    }
    // await res.user.updateProfile({ displayName });
    await updateProfile(res.user, { displayName });
    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
