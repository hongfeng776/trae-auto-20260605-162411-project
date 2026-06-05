<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import StatsCards from '@/components/dashboard/StatsCards.vue'
import AlertBanner from '@/components/dashboard/AlertBanner.vue'
import ApplicationList from '@/components/dashboard/ApplicationList.vue'
import StatsCharts from '@/components/dashboard/StatsCharts.vue'
</script>

<template>
  <AppLayout>
    <div class="p-6 space-y-6 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-100">审批工作台</h1>
          <p class="text-sm text-slate-400 mt-1">实时监控审批流程状态与异常</p>
        </div>
      </div>

      <AlertBanner />
      <StatsCards />
      <ApplicationList />
      <StatsCharts />
    </div>
  </AppLayout>
</template>
