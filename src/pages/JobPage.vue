<template>
  <div class="jobs-page container-fluid">
    <div class="row">
      <div class="col text-center">
        <h1>House<img alt="Vue logo" src="../assets/logo.png" class="logo mb-4" />s</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="createJob">
          <div class="row">
            <div class="col">
              <label for="jobTitle"></label>
              <input
                type="number"
                name="jobTitle"
                id="jobTitle"
                v-model="state.newJob.jobTitle"
                class="form-control"
                placeholder="jobTitle..."
                aria-describedby="helpId"
              />
            </div>
            <div class="col">
              <label for="company"></label>
              <input
                type="number"
                name="company"
                id="company"
                v-model="state.newHouse.company"
                class="form-control"
                placeholder="company..."
                aria-describedby="helpId"
              />
              <div class="col">
                <label for="hours"></label>
                <input
                  type="number"
                  name="hours"
                  id="hours"
                  v-model="state.newHouse.hours"
                  class="form-control"
                  placeholder="hours..."
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="rate"></label>
                <input
                  type="number"
                  name="rate"
                  id="rate"
                  v-model="state.newHouse.rate"
                  class="form-control"
                  placeholder="rate..."
                  aria-describedby="helpId"
                />
              </div>
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
        </form>
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
