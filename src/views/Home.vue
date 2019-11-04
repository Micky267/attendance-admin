<template>
  <div class="home">
    home
    <Navbar/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Navbar
  }
}
</script>
