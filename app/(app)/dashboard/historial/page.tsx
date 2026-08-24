"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

Chart.register(
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

export default function HistorialPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const colors = {
      otros: "#e1e3e4",
      institucionales: "#bac9d3",
      banrural: "#6f88ad",
      anexos: "#2b83ff",
      esuram: "#001f3f",
      trend: "#ba1a1a",
    };

    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            type: "line",
            label: "Tendencia Global (Utilidad)",
            data: [120, 135, 125, 145, 150, 140, 160, 155, 145, 170, 185, 210],
            borderColor: colors.trend,
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: colors.trend,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: false,
            yAxisID: "y1",
          },
          {
            label: "ESURAM",
            data: [45, 50, 48, 55, 58, 52, 60, 58, 55, 65, 72, 85],
            backgroundColor: colors.esuram,
            stack: "Stack 0",
            yAxisID: "y",
          },
          {
            label: "Anexos",
            data: [15, 18, 16, 20, 22, 19, 25, 23, 20, 28, 32, 40],
            backgroundColor: colors.anexos,
            stack: "Stack 0",
            yAxisID: "y",
          },
          {
            label: "Banrural",
            data: [35, 38, 36, 42, 45, 40, 48, 45, 42, 52, 58, 65],
            backgroundColor: colors.banrural,
            stack: "Stack 0",
            yAxisID: "y",
          },
          {
            label: "Institucionales",
            data: [20, 22, 21, 25, 27, 24, 29, 27, 25, 30, 35, 42],
            backgroundColor: colors.institucionales,
            stack: "Stack 0",
            yAxisID: "y",
          },
          {
            label: "Otros Clientes",
            data: [10, 12, 11, 14, 15, 13, 16, 15, 14, 18, 22, 28],
            backgroundColor: colors.otros,
            stack: "Stack 0",
            yAxisID: "y",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#191c1d",
            titleFont: { family: "Inter", size: 14, weight: 600 },
            bodyFont: { family: "Inter", size: 13 },
            padding: 12,
            cornerRadius: 8,
            usePointStyle: true,
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { font: { family: "Inter", size: 12 }, color: "#43474e" },
          },
          y: {
            stacked: true,
            type: "linear",
            display: true,
            position: "left",
            grid: { color: "#e1e3e4" },
            ticks: { font: { family: "Inter", size: 12 }, color: "#43474e" },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: { drawOnChartArea: false },
            ticks: {
              font: { family: "Inter", size: 12 },
              color: "#ba1a1a",
              callback: (value: number | string) => `$${value}k`,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
      <div className="max-w-[1400px] mx-auto space-y-space-lg">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-space-md">
          <h3 className="text-headline-md font-headline-md text-on-surface">
            Historial de Movimientos
          </h3>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface bg-surface hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              Exportar CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-body-md font-body-md text-on-primary bg-primary-container hover:bg-on-primary-fixed-variant transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              Filtros
            </button>
          </div>
        </div>
        {/* Chart Card */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-space-md">
          <div className="flex justify-between items-center mb-space-md px-2">
            <h4 className="text-headline-sm font-headline-sm text-on-surface">
              Tendencia y Distribución Mensual
            </h4>
            <div className="flex items-center gap-4 text-label-sm font-label-sm text-on-surface-variant">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#001f3f]"></div>
                ESURAM
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#2b83ff]"></div>
                Anexos
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#6f88ad]"></div>
                Banrural
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#bac9d3]"></div>
                Institucionales
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#e1e3e4]"></div>
                Otros Clientes
              </span>
              <span className="flex items-center gap-1 ml-2">
                <div className="w-4 h-[2px] bg-[#ba1a1a]"></div>
                Tendencia Global
              </span>
            </div>
          </div>
          <div className="w-full h-[400px] relative">
            <canvas ref={canvasRef} />
          </div>
        </div>
        {/* Data Table Card */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          <div className="px-space-md py-space-sm bg-surface-bright border-b border-outline-variant flex justify-between items-center">
            <h4 className="text-body-lg font-body-lg font-semibold text-on-surface">
              Resumen Detallado por Segmento
            </h4>
          </div>
          <div className="table-container overflow-x-auto w-full">
            <table className="w-full min-w-[1200px] text-left border-collapse">
              <thead>
                {/* Top Header Row: Dark background per requirements */}
                <tr className="bg-primary-container text-on-primary border-b border-outline">
                  <th className="px-4 py-3 text-label-md font-label-md font-semibold align-middle border-r border-outline-variant/30" rowSpan={2}>
                    Mes
                  </th>
                  <th className="px-4 py-2 text-center text-label-md font-label-md font-semibold border-r border-outline-variant/30" colSpan={2}>
                    Otros Clientes
                  </th>
                  <th className="px-4 py-2 text-center text-label-md font-label-md font-semibold border-r border-outline-variant/30" colSpan={2}>
                    Institucionales
                  </th>
                  <th className="px-4 py-2 text-center text-label-md font-label-md font-semibold border-r border-outline-variant/30" colSpan={2}>
                    Banrural
                  </th>
                  <th className="px-4 py-2 text-center text-label-md font-label-md font-semibold border-r border-outline-variant/30" colSpan={2}>
                    Anexos
                  </th>
                  <th className="px-4 py-2 text-center text-label-md font-label-md font-semibold border-r border-outline-variant/30" colSpan={2}>
                    ESURAM
                  </th>
                  <th className="px-4 py-2 text-center text-label-md font-label-md font-bold bg-[#001a41]" colSpan={2}>
                    Totales Globales
                  </th>
                </tr>
                {/* Sub Header Row */}
                <tr className="bg-primary-container text-on-primary-container border-b border-outline">
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right">
                    AS
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right border-r border-outline-variant/30">
                    Utilidad
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right">
                    AS
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right border-r border-outline-variant/30">
                    Utilidad
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right">
                    AS
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right border-r border-outline-variant/30">
                    Utilidad
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right">
                    AS
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right border-r border-outline-variant/30">
                    Utilidad
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right">
                    AS
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-normal text-right border-r border-outline-variant/30">
                    Utilidad
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-semibold text-right bg-[#001a41] text-on-primary">
                    Total AS
                  </th>
                  <th className="px-3 py-2 text-label-sm font-label-sm font-semibold text-right bg-[#001a41] text-on-primary">
                    Total Utilidad
                  </th>
                </tr>
              </thead>
              <tbody className="text-body-md font-body-md text-on-surface divide-y divide-outline-variant/50">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-4 py-3 font-medium border-r border-outline-variant/30">
                    Octubre
                  </td>
                  <td className="px-3 py-3 text-right">
                    124
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $4,250
                  </td>
                  <td className="px-3 py-3 text-right">
                    86
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $12,400
                  </td>
                  <td className="px-3 py-3 text-right">
                    312
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $45,800
                  </td>
                  <td className="px-3 py-3 text-right">
                    45
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $8,900
                  </td>
                  <td className="px-3 py-3 text-right">
                    210
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $62,100
                  </td>
                  <td className="px-3 py-3 text-right font-semibold bg-surface-container-lowest border-l border-outline-variant/30">
                    777
                  </td>
                  <td className="px-3 py-3 text-right font-semibold bg-surface-container-lowest text-on-primary-fixed-variant">
                    $133,450
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-surface-container-low transition-colors bg-surface-bright">
                  <td className="px-4 py-3 font-medium border-r border-outline-variant/30">
                    Noviembre
                  </td>
                  <td className="px-3 py-3 text-right">
                    135
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $4,800
                  </td>
                  <td className="px-3 py-3 text-right">
                    92
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $13,500
                  </td>
                  <td className="px-3 py-3 text-right">
                    340
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $51,200
                  </td>
                  <td className="px-3 py-3 text-right">
                    50
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $10,100
                  </td>
                  <td className="px-3 py-3 text-right">
                    225
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $68,500
                  </td>
                  <td className="px-3 py-3 text-right font-semibold bg-surface-container-lowest border-l border-outline-variant/30">
                    842
                  </td>
                  <td className="px-3 py-3 text-right font-semibold bg-surface-container-lowest text-on-primary-fixed-variant">
                    $148,100
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-4 py-3 font-medium border-r border-outline-variant/30">
                    Diciembre
                  </td>
                  <td className="px-3 py-3 text-right">
                    150
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $5,600
                  </td>
                  <td className="px-3 py-3 text-right">
                    110
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $16,200
                  </td>
                  <td className="px-3 py-3 text-right">
                    385
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $60,500
                  </td>
                  <td className="px-3 py-3 text-right">
                    62
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $12,800
                  </td>
                  <td className="px-3 py-3 text-right">
                    255
                  </td>
                  <td className="px-3 py-3 text-right text-on-surface-variant border-r border-outline-variant/30">
                    $78,300
                  </td>
                  <td className="px-3 py-3 text-right font-semibold bg-surface-container-lowest border-l border-outline-variant/30">
                    962
                  </td>
                  <td className="px-3 py-3 text-right font-semibold bg-surface-container-lowest text-on-primary-fixed-variant">
                    $173,400
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
