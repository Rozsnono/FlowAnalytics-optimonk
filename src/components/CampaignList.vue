<script setup>
import { MonitorDot, TabletSmartphone, CircleAlert } from "lucide-vue-next";

import { campaignService } from '../services/campaignService.js';


const props = defineProps({
  'campaigns': {
    type: Array,
    required: true
  },
  'selected_id': {
    type: String,
    required: true
  }
});

defineEmits(['select']);

function getOverallConversion(campaign) {
  return campaignService.getOverallConversion(campaign);
}

</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="p-4 border-b border-slate-100 bg-slate-50/50">
      <h2 class="font-semibold text-slate-800 text-sm tracking-wide uppercase">Campaigns</h2>
    </div>
    <div class="divide-y divide-slate-100">
      <button v-for="campaign in campaigns" :key="campaign.id" @click="$emit('select', campaign.id)"
        class="w-full text-left p-4 hover:bg-slate-50 transition-colors flex flex-col gap-2 relative"
        :class="{ 'bg-indigo-50/50 border-l-4 border-indigo-600': selected_id === campaign.id }">
        <div class="flex items-start justify-between">
          <h3 class="font-medium text-slate-900 text-sm leading-tight pr-2">
            {{ campaign.name }}
          </h3>
          <span
            class="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
            <MonitorDot size="12" v-if="campaign.device == 'desktop'" />
            <TabletSmartphone size="12" v-else />
            {{ campaign.device }}
          </span>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-500 mt-1">
          <span>Overall Conv. Rate</span>
          <span class="font-semibold text-slate-700 flex items-center justify-center gap-1"
            :class="{ 'text-red-500': getOverallConversion(campaign) < 10 }">
            <CircleAlert size="12" v-if="getOverallConversion(campaign) < 10" />
            {{ getOverallConversion(campaign) }}%
          </span>
        </div>
      </button>
    </div>
  </div>
</template>