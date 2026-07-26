import { CalendarDays, ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useGetLicenseUserReportQuery } from '../../../../../features/api/licenseUserApi';
import { CHART_PERIOD_MAP } from '../../../../../features/api/licenseUserMappers';
import { getRtkErrorMessage } from '../../../../../features/api/utils';
import Loading from '../../../../../components/ui/Utilities/Loading';

const CHART_WIDTH = 860;
const CHART_HEIGHT = 350;
const PADDING = { top: 22, right: 18, bottom: 42, left: 74 };
const GRAPH_WIDTH = CHART_WIDTH - PADDING.left - PADDING.right;
const GRAPH_HEIGHT = CHART_HEIGHT - PADDING.top - PADDING.bottom;
const MAX_Y = 700;
const MIN_Y = 0;
const GRID_TICKS = [0, 100, 200, 300, 400, 500, 600, 700];
const Y_LABEL_TICKS = [0, 300, 400, 500, 600, 700];

const getVisibleLabelIndices = (length) => {
  if (length <= 7) {
    return Array.from({ length }, (_, index) => index);
  }

  const indices = new Set([0, length - 1]);
  const step = Math.max(1, Math.floor((length - 1) / 6));

  for (let index = step; index < length - 1; index += step) {
    indices.add(index);
  }

  return Array.from(indices).sort((a, b) => a - b);
};

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

const LicenReports = () => {
  const [dateRange, setDateRange] = useState('ultimi7');
  const chartDays = CHART_PERIOD_MAP[dateRange] ?? 7;

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetLicenseUserReportQuery({
      chartDays,
      series: 'both',
    });

  const days = data?.labels ?? ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const currentData = data?.currentData ?? [0, 0, 0, 0, 0, 0, 0];
  const previousData = data?.previousData ?? [0, 0, 0, 0, 0, 0, 0];

  const pointCount = Math.max(days.length, currentData.length, previousData.length, 1);
  const visibleLabelIndices = useMemo(
    () => getVisibleLabelIndices(pointCount),
    [pointCount],
  );

  const getX = (index) =>
    PADDING.left + (index / Math.max(pointCount - 1, 1)) * GRAPH_WIDTH;

  const getY = (value) =>
    PADDING.top + GRAPH_HEIGHT - ((value - MIN_Y) / (MAX_Y - MIN_Y)) * GRAPH_HEIGHT;

  const currentPoints = useMemo(
    () =>
      Array.from({ length: pointCount }, (_, index) => ({
        x: getX(index),
        y: getY(currentData[index] ?? 0),
      })),
    [pointCount, currentData],
  );

  const previousPoints = useMemo(
    () =>
      Array.from({ length: pointCount }, (_, index) => ({
        x: getX(index),
        y: getY(previousData[index] ?? 0),
      })),
    [pointCount, previousData],
  );

  const currentPath = buildSmoothPath(currentPoints);
  const previousPath = buildSmoothPath(previousPoints);
  const areaPath = currentPoints.length
    ? `${currentPath} L ${currentPoints[currentPoints.length - 1].x} ${PADDING.top + GRAPH_HEIGHT} L ${currentPoints[0].x} ${PADDING.top + GRAPH_HEIGHT} Z`
    : '';

  const showLoading = isLoading || isFetching;

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
            onChange={(event) => setDateRange(event.target.value)}
            className="h-9 appearance-none rounded-md border border-[#e5e7eb] bg-white pr-9 pl-10 text-[12px] font-medium text-[#5b5b5b] outline-none"
          >
            <option value="ultimi7">Ultimi 7 giorni</option>
            <option value="ultimi30">Ultimi 30 giorni</option>
            <option value="ultimi90">Ultimi 90 giorni</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 text-[#888888]"
          />
        </label>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {getRtkErrorMessage(error)}
          <button type="button" onClick={refetch} className="ml-3 font-semibold underline">
            Riprova
          </button>
        </div>
      )}

      <div className="rounded-xl border border-[#e6e6e6] bg-white px-4 py-5 shadow-[0_1px_1px_rgba(0,0,0,0.02)] md:px-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[18px] font-semibold text-[#242424]">Grafico Vendite</h2>

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

        {showLoading ? (
          <Loading size="md" className="min-h-[350px]" />
        ) : (
          <div className="overflow-x-auto">
            <svg
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              className="min-w-[860px]"
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            >
              {GRID_TICKS.map((val) => {
                const y = getY(val);
                return (
                  <g key={`grid-${val}`}>
                    <line
                      x1={PADDING.left}
                      y1={y}
                      x2={PADDING.left + GRAPH_WIDTH}
                      y2={y}
                      stroke="#ececec"
                      strokeWidth={1}
                    />
                  </g>
                );
              })}

              {Array.from({ length: pointCount }).map((_, index) => (
                <line
                  key={`vgrid-${index}`}
                  x1={getX(index)}
                  y1={PADDING.top}
                  x2={getX(index)}
                  y2={PADDING.top + GRAPH_HEIGHT}
                  stroke="#efefef"
                  strokeWidth={1}
                />
              ))}

              {Y_LABEL_TICKS.map((val) => (
                <text
                  key={`ylabel-${val}`}
                  x={PADDING.left - 14}
                  y={getY(val) + 5}
                  textAnchor="end"
                  fontSize="13"
                  fill="#2f2f2f"
                  fontWeight="600"
                >
                  €{val === 0 ? '00' : val}
                </text>
              ))}

              {visibleLabelIndices.map((index) => (
                <text
                  key={`xlabel-${days[index]}-${index}`}
                  x={getX(index)}
                  y={PADDING.top + GRAPH_HEIGHT + 23}
                  textAnchor="middle"
                  fontSize="13"
                  fill="#3c3c3c"
                  fontWeight="500"
                >
                  {days[index]}
                </text>
              ))}

              <rect
                x={PADDING.left}
                y={PADDING.top}
                width={GRAPH_WIDTH}
                height={GRAPH_HEIGHT}
                fill="url(#chartGradient)"
                opacity="0"
              />

              {areaPath ? <path d={areaPath} fill="url(#chartGradient)" opacity="0.85" /> : null}
              {previousPath ? (
                <path d={previousPath} fill="none" stroke="#c8c8c8" strokeWidth="1.2" />
              ) : null}
              {currentPath ? (
                <path d={currentPath} fill="none" stroke="#6f63ff" strokeWidth="1.4" />
              ) : null}
              <line
                x1={PADDING.left}
                y1={PADDING.top + GRAPH_HEIGHT}
                x2={PADDING.left + GRAPH_WIDTH}
                y2={PADDING.top + GRAPH_HEIGHT}
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
        )}
      </div>
    </section>
  );
};

export default LicenReports;
