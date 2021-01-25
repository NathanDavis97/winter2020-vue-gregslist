<template>
  <div class="job col-4">
    <router-link :to="{name: 'JobDetails', params: {id: job.id}}">
      <div class="card">
        <img class="card-img-top" :src="job.imgUrl" alt="" />
        <div class="card-body">
          <h4 class="card-title">
            {{ job.title }} | {{ job.pay }}
          </h4>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Job',
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  setup(props) {
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
