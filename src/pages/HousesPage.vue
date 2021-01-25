<template>
  <div class="houses-page container-fluid">
    <div class="row">
      <div class="col text-center">
        <h1>House<img alt="Vue logo" src="../assets/logo.png" class="logo mb-4" />s</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="createHouse">
          <div class="row">
            <div class="col">
              <label for="levels"></label>
              <input
                type="number"
                name="levels"
                id="levels"
                v-model="state.newHouse.levels"
                class="form-control"
                placeholder="levels..."
                aria-describedby="helpId"
              />
            </div>
            <div class="col">
              <label for="bathrooms"></label>
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                v-model="state.newHouse.bathrooms"
                class="form-control"
                placeholder="bathrooms..."
                aria-describedby="helpId"
              />
              <div class="col">
                <label for="bedrooms"></label>
                <input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  v-model="state.newHouse.bedrooms"
                  class="form-control"
                  placeholder="bedrooms..."
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="year"></label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  v-model="state.newHouse.year"
                  class="form-control"
                  placeholder="year..."
                  aria-describedby="helpId"
                />
              </div>
              <div class="col">
                <label for="price"></label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  v-model="state.newHouse.price"
                  class="form-control"
                  placeholder="price..."
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="description"></label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  v-model="state.newHouse.description"
                  class="form-control"
                  placeholder="description..."
                  aria-describedby="helpId"
                />
              </div>
              <div class="col">
                <label for="imgUrl"></label>
                <input
                  type="text"
                  name="imgUrl"
                  id="imgUrl"
                  v-model="state.newHouse.imgUrl"
                  class="form-control"
                  placeholder="imgUrl..."
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <button type="submit" class="btn btn-success my-1">
              Add House
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <House v-for="house in houses" :key="house.id" :house="house" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { housesService } from '../services/HousesService'
import { AppState } from '../AppState'
import House from '../components/House.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HousesPage',
  setup() {
    const router = useRouter()
    const state = reactive({
      newHouse: {}
    })

    // NOTE on mounted gets called when the page is first mounted to the dom (similar to constructors)
    onMounted(() => {
      try {
        housesService.getHouses()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      state,
      // if data changes dynimcally in the appstate use a computed
      houses: computed(() => AppState.houses),

      async createHouse() {
        try {
          const id = await housesService.create(state.newHouse)
          state.newHouse = {}
          // change route in javascript using router.push()
          router.push({ name: 'HouseDetails', params: { id } })
        } catch (error) {
          console.error(error)
        }
      }

    }
  },
  components: {
    House
  }
}
</script>

<style lang="scss" scoped>
  .logo {
   height: .25em
  }
</style>
