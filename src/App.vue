<script setup>
import { ref, computed } from 'vue';
import { ChartBarDecreasing } from 'lucide-vue-next';

import campaignData from './data/campaigns.json';

import { campaignService } from './services/campaignService';

import CampaignList from './components/CampaignList.vue';
import FunnelVisualizer from './components/FunnelVisualizer.vue';

const campaigns = ref(campaignService.getCampaigns());

const selectedCampaignId = ref(campaignData.campaigns[0]?.id || '');
const selectedDeviceFilter = ref('all');

const filteredCampaigns = computed(() => {
  return campaignService.filterCampaigns(selectedDeviceFilter.value);
});

const selectedCampaign = computed(() => {
  return campaigns.value.find(c => c.id === selectedCampaignId.value);
});

const selectCampaign = (id) => {
  selectedCampaignId.value = id;
};

const handleFilterChange = () => {
  if (filteredCampaigns.value.length > 0) {
    const isSelectedStillVisible = filteredCampaigns.value.some(c => c.id === selectedCampaignId.value);
    if (!isSelectedStillVisible) {
      selectedCampaignId.value = filteredCampaigns.value[0].id;
    }
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-indigo-600 text-white rounded-lg">
            <ChartBarDecreasing />
          </div>
          <div>
            <h1 class="font-bold text-slate-900 text-lg leading-none">FlowAnalytics</h1>
            <p class="text-xs text-slate-500 mt-1">Popup Funnel Optimization Engine</p>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl w-full mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">

      <aside class="lg:col-span-4 space-y-4">
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Device Filter</label>
          <div class="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
            <button @click="selectedDeviceFilter = 'all'; handleFilterChange()"
              class="text-xs font-medium py-1.5 rounded-md transition-all text-center"
              :class="selectedDeviceFilter === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'">
              All
            </button>
            <button @click="selectedDeviceFilter = 'desktop'; handleFilterChange()"
              class="text-xs font-medium py-1.5 rounded-md transition-all text-center"
              :class="selectedDeviceFilter === 'desktop' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'">
              Desktop
            </button>
            <button @click="selectedDeviceFilter = 'mobile'; handleFilterChange()"
              class="text-xs font-medium py-1.5 rounded-md transition-all text-center"
              :class="selectedDeviceFilter === 'mobile' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'">
              Mobile
            </button>
          </div>
        </div>

        <CampaignList :campaigns="filteredCampaigns" :selected_id="selectedCampaignId" @select="selectCampaign" />
      </aside>

      <section class="lg:col-span-8">
        <div v-if="selectedCampaign">
          <div class="mb-6">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-medium text-slate-400">ID: {{ selectedCampaign.id }}</span>
            </div>
            <h2 class="text-2xl font-bold text-slate-900 mt-1">{{ selectedCampaign.name }}</h2>
          </div>

          <FunnelVisualizer :campaign="selectedCampaign" />
        </div>

        <div v-else
          class="h-64 flex flex-col items-center justify-center bg-white border border-dashed border-slate-300 rounded-xl">
          <p class="text-slate-400 text-sm">No campaigns match current filtering rules.</p>
        </div>
      </section>
    </main>
  </div>
</template>