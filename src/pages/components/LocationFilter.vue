<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {getLocations} from "../../api";
import {Location} from "../../types/api.ts";

const emit = defineEmits<{ (event: 'filter', value: string): void }>()
const locations = ref<Location[]>([]);
const selectedLocation = ref('');

const fetchLocations = async () => {
  try {
    locations.value = await getLocations();
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

const onLocationChange = () => {
  emit('filter', selectedLocation.value);
};

onMounted(fetchLocations);
</script>

<template>
  <div>
    <label for="location-select" class="block text-sm font-medium text-gray-700">Filter by Location</label>
    <select id="location-select" v-model="selectedLocation" @change="onLocationChange"
            class="h-10 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md">
      <option value="">Select a location</option>
      <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
    </select>
  </div>
</template>
