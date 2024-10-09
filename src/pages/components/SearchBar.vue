<script setup lang="ts">

const model = defineModel<string>({default: ''});

const emit = defineEmits<{ (event: 'search', value: string): void }>()
const onSearch = () => {
  emit('search', model.value);
};
</script>

<template>
  <div class="z-10 flex flex-col justify-center mb-6">
    <label for="location-select" class="block text-sm font-medium text-gray-700">Filter by Location</label>
    <input
        v-model="model"
        @input="onSearch"
        type="text"
        placeholder="Search by name"
        class="w-full h-10 mt-1 block pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:w-96"
    />
  </div>
</template>

<style scoped>
input {
  transition: all 0.2s ease-in-out;
}

input:focus {
  border-color: #facc15;
  box-shadow: 0 0 10px rgba(255, 225, 0, 0.5);
}
</style>
