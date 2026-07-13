import React from 'react';

import { Bell, Check, Trash2 } from 'lucide-react';
import { FaChevronLeft } from 'react-icons/fa';

const sampleNotifications = [
  {
    id: 1,
    title: 'Hai un nuovo corso da frequentare',
    message: 'Inizia il tuo corso di formazione! Il team UnoSicurezza',
    time: '5 min ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Nessuna attività nelle ultime 48 ore',
    message: 'La crescita professionale non si ferma qui!',
    time: '10 min ago',
    unread: false,
  },
  {
    id: 3,
    title: 'Hai un nuovo corso da frequentare',
    message: 'Inizia il tuo corso di formazione! Il team UnoSicurezza',
    time: '5 min ago',
    unread: true,
  },
];

const NotificationItem = ({ item }) => (
  <div className="group relative flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-all hover:bg-gray-50/50">
    <div className="flex items-center gap-4">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${item.unread ? 'bg-[#F1F9F6]' : 'bg-white'}`}
      >
        <Bell className="text-[#73BFA1]" size={20} />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg text-[#252525]">{item.title}</h2>
        <p className="text-base text-gray-400">{item.message}</p>
      </div>
    </div>

    <div className="ml-4 flex min-w-[70px] items-center justify-end">
      {/* Time and Unread dot (hidden on hover) */}
      <div className="flex flex-col items-end transition-all duration-200 group-hover:hidden">
        <span className="text-xs whitespace-nowrap text-gray-400">
          {item.time}
        </span>
        {item.unread && (
          <span className="mt-2 h-2 w-2 rounded-full bg-[#73BFA1]" />
        )}
      </div>

      {/* Action buttons (shown on hover) */}
      <div className="hidden items-center gap-2 transition-all duration-200 group-hover:flex">
        {item.unread && (
          <button
            type="button"
            title="Segna come letto"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F9F6] text-[#73BFA1] shadow-sm transition-all hover:bg-[#73BFA1] hover:text-white"
          >
            <Check size={15} />
          </button>
        )}
        <button
          type="button"
          title="Elimina"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm transition-all hover:bg-red-500 hover:text-white"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  </div>
);

const NotificationsView = () => {
  return (
    <div className="">
      {/* top row: small back button left, action right */}
      <div className="mb-6 flex items-center justify-between">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F9F6] shadow-sm">
          <FaChevronLeft className="text-gray-600" />
        </button>

        <button className="text-xl font-semibold text-[#73BFA1]">
          Segna tutti come già letti
        </button>
      </div>

      <div className="space-y-4">
        {sampleNotifications.map((n) => (
          <NotificationItem key={n.id} item={n} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
