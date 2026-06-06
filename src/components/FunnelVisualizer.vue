<script setup>
import { computed } from 'vue';
import { ArrowDown, TriangleAlert, Lightbulb } from "lucide-vue-next";

import { campaignService } from '../services/campaignService.js';
import { recommendationService } from "../services/recommendationService.js"


const props = defineProps({
  'campaign': {
    type: Object,
    required: true
  }
});

const stepsWithMetrics = computed(() => {
  return campaignService.processStepMetrics(props.campaign.steps);
});

const worstStep = computed(() => {
  return campaignService.findWorstStep(props.campaign.steps);
});

const overallConversionRate = computed(() => {
  return campaignService.getOverallConversion(props.campaign);
});

const totalViews = computed(() => props.campaign.steps[0]?.views || 0);
const totalConversions = computed(() => props.campaign.steps[props.campaign.steps.length - 1]?.proceeds || 0);

const getRecommendations = computed(() => {
  if (!worstStep.value) return [];

  const stepType = worstStep.value.type;
  const rate = worstStep.value.dropOffRate.toFixed(0);

  const rec = recommendationService.getCorrectRecommendation(stepType);
  return recommendationService.getRecommendationsWithValue(rec, rate);
});
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs font-medium text-slate-500 uppercase">Top of Funnel Views</p>
        <p class="text-2xl font-semibold text-slate-800 mt-1">{{ totalViews.toLocaleString() }}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs font-medium text-slate-500 uppercase">Total Completed Flows</p>
        <p class="text-2xl font-semibold text-slate-800 mt-1">{{ totalConversions.toLocaleString() }}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs font-medium text-slate-500 uppercase">Overall Conversion</p>
        <p class="text-2xl font-semibold text-indigo-600 mt-1">{{ overallConversionRate }}%</p>
      </div>
    </div>

    <div v-if="worstStep" class="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
      <div class="p-1 bg-rose-100 text-rose-600 rounded-lg shrink-0">
        <TriangleAlert />
      </div>
      <div>
        <h4 class="font-semibold text-rose-900 text-sm">Critical Drop-off Identified</h4>
        <p class="text-rose-700 text-xs mt-1">
          Your biggest bottleneck occurs on <strong class="underline">{{ worstStep.name }}</strong> (Step {{
            worstStep.index + 1 }}).
          <strong>{{ worstStep.dropOffRate.toFixed(1) }}%</strong> of the users who reach this step leave without
          converting (losing {{ worstStep.dropOffCount.toLocaleString() }} users).
        </p>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-8">
      <h3 class="font-semibold text-slate-800 text-base">Funnel Progress</h3>

      <div class="space-y-4">
        <div v-for="(step, idx) in stepsWithMetrics" :key="step.id" class="relative">

          <div class="space-y-2">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center justify-center w-5 h-5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                  {{ idx + 1 }}
                </span>
                <span class="font-medium text-slate-900"
                  :class="{ 'text-rose-400 font-[700] tracking-wider': worstStep && worstStep.id === step.id }">{{
                  step.name }}</span>
                <span class="text-xs text-slate-400 font-mono uppercase">({{ step.type }})</span>
              </div>
              <div class="text-slate-500 text-xs sm:text-right">
                <span class="font-semibold text-slate-700">{{ step.views.toLocaleString() }}</span> views
                <span class="mx-1">•</span>
                <span class="font-semibold text-slate-700">{{ step.proceeds.toLocaleString() }}</span> proceeds
                <span class="text-emerald-600 font-semibold ml-1">({{ step.conversionRate.toFixed(1) }}%)</span>
              </div>
            </div>

            <div class="h-6 bg-slate-100 rounded-md overflow-hidden relative w-full">
              <div class="h-full rounded-md transition-all duration-500 ease-out bg-rose-400 animate-pulse"
                :style="{ width: `${step.relativeWidth}%` }"></div>
              <div class="h-full rounded-md transition-all duration-500 ease-out absolute bg-indigo-500 z-50 top-0"
                :style="{ width: `${step.nextWidth}%` }"></div>
            </div>

            <p class="text-xs text-slate-400 italic px-7">{{ step.description }}</p>
          </div>

          <div v-if="idx < stepsWithMetrics.length - 1"
            class="my-3 pl-7 flex items-center gap-3 text-xs text-rose-500 font-medium">
            <ArrowDown />
            <span>Lost: {{ (step.views - step.proceeds).toLocaleString() }} users ({{ step.dropOffRate.toFixed(1) }}%
              drop-off)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 rounded-xl p-6">
      <div class="flex items-center gap-2 mb-4">
        <Lightbulb size="16" />
        <h3 class="font-semibold text-slate-800 text-base">Heuristic Insights & Recommendations</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(rec, idx) in getRecommendations" :key="idx"
          class="bg-white p-4 rounded-lg border border-indigo-100/50 shadow-xs">
          <h4 class="font-semibold text-slate-800 text-sm flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full bg-indigo-500"></span>
            {{ rec.title }}
          </h4>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">
            {{ rec.suggestion }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>