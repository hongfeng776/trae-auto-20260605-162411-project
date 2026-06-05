<template>
  <div class="flex min-h-screen bg-slate-950">
    <Sidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <main
      class="flex-1 min-h-screen overflow-auto transition-all duration-300"
      :class="sidebarCollapsed ? 'ml-16' : 'ml-60'"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'

const sidebarCollapsed = ref(false)

const handleResize = () => {
  const width = window.innerWidth
  if (width < 768) {
    sidebarCollapsed.value = true
  } else if (width < 1280) {
    sidebarCollapsed.value = true
  } else {
    sidebarCollapsed.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
