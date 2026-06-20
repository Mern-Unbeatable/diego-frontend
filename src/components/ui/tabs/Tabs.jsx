import { useState } from 'react';

const Tabs = ({ tabs = [], orientation = 'horizontal' }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={`mx-auto flex w-full max-w-3xl ${
        isVertical ? 'flex-row' : 'flex-col'
      }`}
    >
      {/* ====== TAB BUTTONS ====== */}
      <div
        className={`relative flex ${
          isVertical ? 'w-1/3 flex-col' : 'w-full flex-row'
        } rounded-xl bg-gray-100 p-1`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative z-10 flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* ====== ANIMATED BACKGROUND ====== */}
        <div
          className={`absolute rounded-lg bg-blue-500 transition-all duration-300`}
          style={{
            ...(isVertical
              ? {
                  top: `${
                    tabs.findIndex((t) => t.id === activeTab) *
                    (100 / tabs.length)
                  }%`,
                  height: `${100 / tabs.length}%`,
                  left: '0.25rem',
                  right: '0.25rem',
                }
              : {
                  left: `${
                    tabs.findIndex((t) => t.id === activeTab) *
                    (100 / tabs.length)
                  }%`,
                  width: `${100 / tabs.length}%`,
                  top: '0.25rem',
                  bottom: '0.25rem',
                }),
          }}
        ></div>
      </div>

      {/* ====== TAB CONTENT ====== */}
      <div
        className={`mt-4 rounded-xl bg-white p-6 shadow-md ${
          isVertical ? 'mt-0 ml-4 flex-1' : ''
        }`}
      >
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="animate-fadeIn">
                {tab.content}
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default Tabs;
