import { CalendarDays, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const LicenReportsView = () => {
  const [dateRange, setDateRange] = useState('ultimi7');

  const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const currentData = [380, 520, 460, 565, 490, 615, 590];
  const previousData = [260, 325, 305, 345, 312, 352, 338];

  const chartWidth = 860;
  const chartHeight = 350;
  const padding = { top: 22, right: 18, bottom: 42, left: 74 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;
  const maxY = 700;
  const minY = 0;

  const getX = (index) =>
    padding.left + (index / (days.length - 1)) * graphWidth;
  const getY = (value) =>
    padding.top + graphHeight - ((value - minY) / (maxY - minY)) * graphHeight;

  const toPoints = (dataset) =>
    dataset.map((value, index) => ({ x: getX(index), y: getY(value) }));

  const buildSmoothPath = (points) => {
    if (!points.length) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let index = 0; index < points.length - 1; index += 1) {
      const current = points[index];
      const next = points[index + 1];
      const controlX = (current.x + next.x) / 2;

      path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
    }

    return path;
  };

  const currentPoints = toPoints(currentData);
  const previousPoints = toPoints(previousData);
  const currentPath = buildSmoothPath(currentPoints);
  const previousPath = buildSmoothPath(previousPoints);
  const areaPath = `${currentPath} L ${currentPoints[currentPoints.length - 1].x} ${padding.top + graphHeight} L ${currentPoints[0].x} ${padding.top + graphHeight} Z`;

  return (
    <section className="mt-5 space-y-7">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-none font-bold text-[#232323] md:text-[32px]">
          Report & Statistiche
        </h1>
      </div>

      <div>
        <label className="relative inline-flex items-center">
          <CalendarDays
            size={15}
            className="pointer-events-none absolute left-4 text-[#727272]"
          />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-9 appearance-none rounded-md border border-[#e5e7eb] bg-white pr-9 pl-10 text-[12px] font-medium text-[#5b5b5b] outline-none"
          >
            <option value="ultimi7">Ultimi 7 giorni</option>
            <option value="ultimi30">Ultimi 30 giorni</option>
            <option value="ultimi90">Ultimi 90 giorni</option>
            <option value="custom">Personalizzato</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 text-[#888888]"
          />
        </label>
      </div>

      <div className="rounded-xl border border-[#e6e6e6] bg-white px-4 py-5 shadow-[0_1px_1px_rgba(0,0,0,0.02)] md:px-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[18px] font-semibold text-[#242424]">
            Grafico Vendite
          </h2>

          <div className="flex items-center gap-5 text-[11px] font-semibold text-[#242424] md:text-[12px]">
            <div className="flex items-center gap-2">
              <div className="h-[14px] w-[14px] rounded-full bg-[#73bfa1]" />
              <span>Attuale</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-[14px] w-[14px] rounded-full bg-[#a9a9a9]" />
              <span>Periodo Precedente</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <svg
            width={chartWidth}
            height={chartHeight}
            className="min-w-[860px]"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {[0, 100, 200, 300, 400, 500, 600, 700].map((val) => {
              const y = getY(val);
              return (
                <g key={`grid-${val}`}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={padding.left + graphWidth}
                    y2={y}
                    stroke="#ececec"
                    strokeWidth={1}
                  />
                </g>
              );
            })}

            {days.map((_, index) => (
              <line
                key={`vgrid-${index}`}
                x1={getX(index)}
                y1={padding.top}
                x2={getX(index)}
                y2={padding.top + graphHeight}
                stroke="#efefef"
                strokeWidth={1}
              />
            ))}

            {[0, 300, 400, 500, 600, 700].map((val) => (
              <text
                key={`ylabel-${val}`}
                x={padding.left - 14}
                y={getY(val) + 5}
                textAnchor="end"
                fontSize="13"
                fill="#2f2f2f"
                fontWeight="600"
              >
                €{val === 0 ? '00' : val}
              </text>
            ))}

            {days.map((day, i) => (
              <text
                key={`xlabel-${day}`}
                x={getX(i)}
                y={padding.top + graphHeight + 23}
                textAnchor="middle"
                fontSize="13"
                fill="#3c3c3c"
                fontWeight="500"
              >
                {day}
              </text>
            ))}

            <rect
              x={padding.left}
              y={padding.top}
              width={graphWidth}
              height={graphHeight}
              fill="url(#chartGradient)"
              opacity="0"
            />

            <path d={areaPath} fill="url(#chartGradient)" opacity="0.85" />
            <path
              d={previousPath}
              fill="none"
              stroke="#c8c8c8"
              strokeWidth="1.2"
            />
            <path
              d={currentPath}
              fill="none"
              stroke="#6f63ff"
              strokeWidth="1.4"
            />
            <line
              x1={padding.left}
              y1={padding.top + graphHeight}
              x2={padding.left + graphWidth}
              y2={padding.top + graphHeight}
              stroke="#d8dfdd"
              strokeWidth={1.4}
            />

            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bfead8" />
                <stop offset="100%" stopColor="#edf8f3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default LicenReportsView;
