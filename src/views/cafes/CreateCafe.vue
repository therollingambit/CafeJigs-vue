<template>
  <div class="flex items-center justify-center p-12 text-gray-600">
    <div class="mx-auto w-full max-w-[550px]">
      <form @submit.prevent="handleSubmit">
        <div class="mb-5 flex items-center justify-center text-xl">
          <h4 class="border-b-4">Add a Cafe</h4>
        </div>
        <div class="mb-5">
          <input
            type="text"
            required
            placeholder="Cafe title"
            v-model="title"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div class="mb-5 flex items-center">
          <p class="mr-3">Rating: </p>
          <star-rating
            v-model:rating="rating"
            increment="0.5"
            star-size="28"
            text-class="mt-2"
          />
        </div>

        <div class="mb-5">
          <textarea
            required
            placeholder="Cafe description (max 200 characters)"
            v-model.trim="description"
            @change="descChange"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          ></textarea>
        </div>
        <p v-if="descError" class="text-red-900 mb-5">
          Description must be less than 200 characters!
        </p>

        <div class="flex flex-col mb-7">
          <label for="country" class="mt-2 mb-3 text-lg">
            Select location:
          </label>
          <select
            id="location"
            v-model="location"
            class="rounded-md w-48 border border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          >
            <option value="Johor Bahru">Johor Bahru</option>
            <option value="Singapore">Singapore</option>
          </select>
        </div>

        <div class="mb-8">
          <label class="mb-3 block text-base font-medium text-[#01353F]">
            Upload cafe cover image
          </label>
          <input type="file" @change="handleChange" />
          <div class="error" v-if="fileError">{{ fileError }}</div>

          <div class="error"></div>
        </div>
        <button
          v-if="!isPending"
          class="hover:shadow-form rounded-md bg-[#430B05] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Create
        </button>
        <button
          v-else
          disabled
          class="rounded-md bg-[#430B05] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Saving...
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "../../composables/useCollection";
import StarRating from "vue-star-rating";
import getUser from "../../composables/getUser";
import { timestamp } from "../../firebase/config";
import { useRouter } from "vue-router";

const { filePath, url, uploadImage } = useStorage();
const { error, addDoc } = useCollection("cafes");
const { user } = getUser();

const router = useRouter();

const title = ref("");
const rating = ref(0);
const description = ref("");
const location = ref("");
const file = ref(null);
const fileError = ref(null);
const isPending = ref(false);
const descError = ref(false);

const handleSubmit = async () => {
  if (description.value.length > 200) {
    descError.value = true;
    return;
  }
  if (file.value) {
    descError.value = false;
    isPending.value = true;
    await uploadImage(file.value);
    const res = await addDoc({
      title: title.value,
      description: description.value,
      rating: rating.value,
      location: location.value,
      userId: user.value.uid,
      userName: user.value.displayName,
      coverUrl: url.value,
      filePath: filePath.value, // so we can delete it later
      createdAt: timestamp(),
    });
    isPending.value = false;

    if (!error.value) {
      router.push({ name: "CafeDetail", params: { id: res.id } });
    }
  }
};

const descChange = (e) => {
  let desc = e.target.value;
  if (desc.length > 200) {
    descError.value = true;
  } else {
    descError.value = false;
  }
};

// allowed file types
const types = ["image/png", "image/jpeg"];

const handleChange = (e) => {
  const selected = e.target.files[0];
  if (selected && types.includes(selected.type)) {
    file.value = selected;
    fileError.value = null;
  } else {
    console.log(selected);
    file.value = null;
    fileError.value = "Please select an image file (png or jpg)";
  }
};
</script>

<style scoped></style>
