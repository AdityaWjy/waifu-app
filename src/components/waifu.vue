<template>
  <div>
    <!-- navbar start -->
    <div class="navbar-component">
      <div class="container">
        <nav class="navbar navbar-expand-lg bg-white">
          <div class="container-fluid">
            <img
              src="../assets/logo.png"
              alt="Waifu"
              class="Logo rounded-circle"
            />

            <button
              class="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <div class="d-flex ms-auto" role="navbar">
                <ul class="navbar-nav me-auto mb-2 md:px-5 mb-lg-0 gap-lg-4">
                  <li class="nav-item">
                    <a
                      href="#home"
                      class="nav-link fw-medium"
                      aria-current="page"
                      >Home</a
                    >
                  </li>

                  <li class="nav-item">
                    <a
                      href="#form"
                      class="nav-link fw-medium"
                      aria-current="page"
                      >Form</a
                    >
                  </li>

                  <li class="nav-item">
                    <a
                      href="#list"
                      class="nav-link fw-medium"
                      aria-current="page"
                      >List Waifu</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <!-- navbar end -->

    <!-- hero start -->
    <div
      class="container"
      style="margin-top: 20px; margin-bottom: 20px"
      id="home"
    >
      <div class="d-sm-block d-md-none">
        <!-- Div display mobile -->
        <div class="row row-mobile">
          <div
            class="col-md-6 mb-2 d-flex justify-content-center align-self-center mobile"
          >
            <img src="../assets/hero.png" width="310px" />
          </div>
          <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="justify-content-center align-self-center container">
                <h2 class="mt-3 fw-bold">
                  Waifu

                  <span class="blueOcean">Wonderland</span>
                </h2>

                <p class="capitalize fw-normal" style="font-size: 14px">
                  Waifu Wonderland adalah
                  <span class="blueOcean fw-semibold">situs</span> untuk
                  mengunggah dan membagikan gambar
                  <span class="blueOcean fw-semibold">waifu</span> kesayangan
                  Anda!
                  <span class="blueOcean fw-semibold">Bergabunglah</span> dan
                  tunjukkan
                  <span class="blueOcean fw-semibold">waifu</span>
                  favorit Anda sekarang juga.
                </p>

                <a href="#form" class="btn-custom-mobile text-decoration-none"
                  >Ak jga maw</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- hero end -->

    <!-- input name and image -->
    <div class="check-status container" id="form">
      <div class="row">
        <div class="col-md-5">
          <div class="text-center text-md-start text-xl-start mt-4">
            <h1 class="capitalize">what is waifu?</h1>
            <p class="capitalize" style="font-size: 14px">
              Waifu adalah karakter perempuan fiksi dari anime, manga yang
              dianggap sebagai pasangan ideal.
            </p>
          </div>
        </div>

        <div
          class="col-md-4 ms-auto d-flex align-items-center justify-content-center"
        >
          <form class="form-control" @submit.prevent>
            <div class="form-input text-start mb-3">
              <label for="text" class="form-label capitalize fw-medium"
                >Show me your waifu:</label
              >
              <input
                type="text"
                class="form-control py-2 mb-2"
                id="text"
                placeholder="Your waifu name"
                v-model="waifuName"
              />
              <input
                type="file"
                class="form-control py-2"
                @change="onFileChange"
              />
            </div>
            <button
              type="submit"
              class="btn-custom-mobile"
              @click="createWaifu"
              style="width: 100%"
            >
              Submit my waifu
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- input name and image -->

    <!-- card waifu start-->

    <div class="container mt-4">
      <div class="row row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="waifu in waifus" :key="waifu.id">
          <div
            class="card h-100 p-2 border-dark d-flex justify-content-center align-items-center"
          >
            <img
              :src="waifu.imageUrl"
              class="card-img-top rounded"
              alt="Waifu"
            />
            <div class="mt-3">
              <h5 class="card-title text-center mb-3">{{ waifu.name }}</h5>
              <button
                @click="exploreWaifu()"
                class="btn btn-dark"
                style="width: 120px"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- card waifu end -->

    <footercomponent class="mt-5" />
  </div>
</template>

<script>
import footercomponent from "../components/footercomponent.vue";
import { useToast } from "vue-toastification";
// import firebase
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
  components: {
    footercomponent,
  },

  setup() {
    // set tipe data
    const toast = useToast();
    const waifus = ref([]);
    const waifuName = ref("");
    const file = ref(null);

    // function get data waifuu
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

    // create data waifu
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
        toast.success("Waifu berhasil ditambahkan!");
      } catch (error) {
        console.error("Error creating waifu: ", error);
        toast.error("Terjadi kesalahan saat menambahkan waifu!");
      }
    };

    // delete data waifu

    const exploreWaifu = () => {
      toast.info("there will be further updates hehe");
    };

    // const deleteWaifu = async (id) => {
    //   await deleteDoc(doc(db, "waifus", id));
    //   fetchWaifus();
    // };

    // call function fecth data waifu
    fetchWaifus();

    return {
      waifus,
      waifuName,
      onFileChange,
      createWaifu,
      exploreWaifu,
      toast,
    };
  },
};
</script>

<style scoped>
.Logo {
  width: 50px;
}

.nav-link.router-link-exact-active {
  color: #ff4191;
  font-weight: 500;
}

.custom-toggler {
  border-color: #ff4191; /* Red Border */
}

.custom-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 65,145,1)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.custom-toggler:focus,
.custom-toggler:active {
  outline: none;
  box-shadow: 0 0 5px #ff4191; /* Red Shadow */
}

@media (max-width: 500px) {
  .row-card {
    row-gap: 15px;
  }

  .card {
    width: fit-content;
  }

  img {
    width: 100%;
    height: 100%;
  }

  h5 {
    font-size: 15px;
  }

  .btn {
    font-size: 13px;
  }
}
</style>
