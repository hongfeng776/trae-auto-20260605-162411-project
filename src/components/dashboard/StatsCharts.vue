<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { trendData, typeDistribution, departmentEfficiency } from '@/mock'

Chart.register(...registerables)

const trendCanvas = ref<HTMLCanvasElement | null>(null)
const doughnutCanvas = ref<HTMLCanvasElement | null>(null)
const barCanvas = ref<HTMLCanvasElement | null>(null)

let trendChart: Chart | null = null
let doughnutChart: Chart | null = null
let barChart: Chart | null = null

onMounted(() => {
  if (trendCanvas.value) {
    trendChart = new Chart(trendCanvas.value, {
      type: 'line',
      data: {
        labels: trendData.map(d => d.date.slice(5)),
        datasets: [
          {
            label: '已通过',
            data: trendData.map(d => d.approved),
            borderColor: '#22c55e',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 2,
          },
          {
            label: '已驳回',
            data: trendData.map(d => d.rejected),
            borderColor: '#ef4444',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 2,
          },
          {
            label: '待审批',
            data: trendData.map(d => d.pending),
            borderColor: '#f59e0b',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#94a3b8', usePointStyle: true, pointStyle: 'circle', padding: 16 },
          },
        },
        scales: {
          x: {
            ticks: { color: '#94a3b8', maxRotation: 0 },
            grid: { color: '#334155' },
          },
          y: {
            ticks: { color: '#94a3b8' },
            grid: { color: '#334155' },
          },
        },
      },
    })
  }

  if (doughnutCanvas.value) {
    const total = typeDistribution.reduce((sum, d) => sum + d.count, 0)
    doughnutChart = new Chart(doughnutCanvas.value, {
      type: 'doughnut',
      data: {
        labels: typeDistribution.map(d => d.label),
        datasets: [
          {
            data: typeDistribution.map(d => d.count),
            backgroundColor: typeDistribution.map(d => d.color),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#94a3b8', usePointStyle: true, pointStyle: 'circle', padding: 12 },
          },
        },
      },
      plugins: [
        {
          id: 'centerText',
          beforeDraw(chart) {
            const { ctx, width, height } = chart
            ctx.save()
            ctx.font = "bold 24px 'JetBrains Mono', monospace"
            ctx.fillStyle = '#e2e8f0'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(String(total), width / 2, height / 2 - 8)
            ctx.font = "12px sans-serif"
            ctx.fillStyle = '#94a3b8'
            ctx.fillText('总计', width / 2, height / 2 + 14)
            ctx.restore()
          },
        },
      ],
    })
  }

  if (barCanvas.value) {
    const barColors = departmentEfficiency.map(d => {
      if (d.approvalRate > 80) return '#22c55e'
      if (d.approvalRate > 60) return '#f59e0b'
      return '#ef4444'
    })
    barChart = new Chart(barCanvas.value, {
      type: 'bar',
      data: {
        labels: departmentEfficiency.map(d => d.department),
        datasets: [
          {
            label: '审批率',
            data: departmentEfficiency.map(d => d.approvalRate),
            backgroundColor: barColors,
            borderRadius: 4,
            maxBarThickness: 24,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.parsed.x}%`,
            },
          },
        },
        scales: {
          x: {
            max: 100,
            ticks: { color: '#94a3b8', callback: (v) => `${v}%` },
            grid: { color: '#334155' },
          },
          y: {
            ticks: { color: '#94a3b8' },
            grid: { display: false },
          },
        },
      },
    })
  }
})

onUnmounted(() => {
  trendChart?.destroy()
  doughnutChart?.destroy()
  barChart?.destroy()
})
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
    <div class="bg-[#1e293b] rounded-xl p-4 border border-slate-700/50">
      <h3 class="text-sm font-medium text-slate-300 mb-3">审批趋势（近30天）</h3>
      <div class="h-64">
        <canvas ref="trendCanvas" />
      </div>
    </div>
    <div class="bg-[#1e293b] rounded-xl p-4 border border-slate-700/50">
      <h3 class="text-sm font-medium text-slate-300 mb-3">类型分布</h3>
      <div class="h-64">
        <canvas ref="doughnutCanvas" />
      </div>
    </div>
    <div class="bg-[#1e293b] rounded-xl p-4 border border-slate-700/50">
      <h3 class="text-sm font-medium text-slate-300 mb-3">部门审批效率</h3>
      <div class="h-64">
        <canvas ref="barCanvas" />
      </div>
    </div>
  </div>
</template>
