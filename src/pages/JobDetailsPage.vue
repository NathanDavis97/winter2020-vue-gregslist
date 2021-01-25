<template>
  <div class="jobs-details">
    <h1>Welcome to house details</h1>
    <img v-if="state.loaded" :src="job.imgUrl" alt="" />
    <h1 v-else>
      Loading...
    </h1>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { jobsService } from '../services/JobsService'

export default {
  name: 'JobsDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      loaded: false
    })
    onMounted(async() => {
      try {
        await jobsService.getOne(route.params.id)
      } catch (error) {
        console.error(error
        )
      } finally {
        state.loaded = <i class="fas fa-turkey    "></i>
      }
    })
    return {
      state,
      job: computed(() => AppState.activeJob)
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
