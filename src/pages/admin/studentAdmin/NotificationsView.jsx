import React from 'react';
import Card from '../../../components/ui/layouts/Card';
import { Heading, Paragraph } from '../../../components/ui';
import { Bell } from 'lucide-react';
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
  <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-xl">
    <div className="flex items-center gap-4">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${item.unread ? 'bg-[#F1F9F6]' : 'bg-white'}`}
      >
        <Bell className="text-[#73BFA1]" size={20} />
      </div>

      <div className="space-y-2">
        <Heading level={2} className="text-xl font-semibold text-[#252525]">
          {item.title}
        </Heading>
        <Paragraph className="text-gray-400">{item.message}</Paragraph>
      </div>
    </div>

    <div className="ml-4 flex flex-col items-end">
      <span className="text-xs text-gray-400">{item.time}</span>
      {item.unread && (
        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#73BFA1]" />
      )}
    </div>
  </div>
);

const NotificationsView = () => {
  return (
    <div className="p-6 md:p-10">
      <div className="relative mx-auto max-w-5xl">
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
    </div>
  );
};

export default NotificationsView;
