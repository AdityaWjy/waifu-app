<template>
  <div>
    <h1>Daftar Waifu</h1>
    <input type="file" @change="onFileChange" />
    <input v-model="waifuName" placeholder="Nama Waifu" />
    <button @click="createWaifu">Tambah Waifu</button>

    <ul>
      <li v-for="waifu in waifus" :key="waifu.id">
        <img :src="waifu.imageUrl" alt="Waifu" width="100" />
        <span>{{ waifu.name }}</span>
        <button @click="deleteWaifu(waifu.id)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default {
  setup() {
    const waifus = ref([]);
    const waifuName = ref("");
    const file = ref(null);

    const fetchWaifus = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "waifus"));
        waifus.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching waifus: ", error);
      }
    };

    const onFileChange = (event) => {
      file.value = event.target.files[0];
    };

    const createWaifu = async () => {
      if (!file.value || !waifuName.value) return;

      try {
        const fileRef = storageRef(storage, `waifus/${file.value.name}`);
        await uploadBytes(fileRef, file.value);
        const imageUrl = await getDownloadURL(fileRef);

        await addDoc(collection(db, "waifus"), {
          name: waifuName.value,
          imageUrl: imageUrl,
        });

        waifuName.value = "";
        file.value = null;
        fetchWaifus();
      } catch (error) {
        console.error("Error creating waifu: ", error);
      }
    };

    const deleteWaifu = async (id) => {
      try {
        await deleteDoc(doc(db, "waifus", id));
        fetchWaifus();
      } catch (error) {
        console.error("Error deleting waifu: ", error);
      }
    };

    fetchWaifus();

    return {
      waifus,
      waifuName,
      onFileChange,
      createWaifu,
      deleteWaifu,
    };
  },
};
</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan */
</style>
