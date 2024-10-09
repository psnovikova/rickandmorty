<script setup lang="ts">
import {onMounted, ref} from "vue";

const lightEffect = ref<HTMLElement | null>(null);

const updateLightPosition = (e: MouseEvent) => {
  if (lightEffect.value) {
    const x = e.clientX;
    const y = e.clientY;
    lightEffect.value.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 0, 0.3), transparent 300px)`;
  }
};

onMounted(() => {
  window.addEventListener('mousemove', updateLightPosition);
})
</script>

<template>
  <div ref="lightEffect" class="fixed top-0 left-0 w-full h-full bg-gradient-radial" />
</template>

<style scoped>
.bg-gradient-radial {
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 0, 0.3), transparent 300px);
  transition: background 0.1s ease;
}
</style>