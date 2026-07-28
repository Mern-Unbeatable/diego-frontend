import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Bell, CheckCheck } from 'lucide-react';
import { FaChevronLeft } from 'react-icons/fa';
import Loading from '../../../../components/ui/Utilities/Loading';
import { usePrivate } from '../../../../features/private/privateHooks';

const getSuccessMessage = (response, fallback) =>
  response?.message || fallback;

const NotificationItem = ({ item, onMarkAsRead, isMarking }) => (
  <div className="relative flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-all hover:bg-gray-50/50">
    <div className="flex items-center gap-4">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${item.unread ? 'bg-[#F1F9F6]' : 'bg-white'}`}
      >
        <Bell className="text-[#73BFA1]" size={20} />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg text-[#252525]">{item.title}</h2>
        <p className="text-base text-gray-400">{item.message}</p>
        {item.pdfUrl && (
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-[#73BFA1] hover:underline"
          >
            Scarica attestato
          </a>
        )}
      </div>
    </div>

    <div className="ml-4 flex shrink-0 flex-col items-end justify-center gap-2">
      <span className="text-xs whitespace-nowrap text-gray-400">
        {item.sentAt}
      </span>

      {item.unread ? (
        <button
          type="button"
          disabled={isMarking}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onMarkAsRead(item.id);
          }}
          className="group flex items-center gap-1.5 text-sm font-medium text-[#73BFA1] transition-colors hover:text-[#5fa88d] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isMarking ? 'Aggiornamento...' : 'Mark as read'}
          {!isMarking && (
            <CheckCheck
              size={16}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          )}
        </button>
      ) : null}
    </div>
  </div>
);

const NotificationsView = () => {
  const navigate = useNavigate();
  const [markingId, setMarkingId] = useState(null);
  const [markingAll, setMarkingAll] = useState(false);
  const {
    fetchNotifications,
    markNotificationsAsRead,
    markAllNotificationsAsRead,
    notifications,
    notificationsMeta,
    notificationsLoading,
    notificationsError,
  } = usePrivate();

  useEffect(() => {
    fetchNotifications().catch(() => {});
  }, [fetchNotifications]);

  const handleMarkAsRead = async (notificationId) => {
    if (!notificationId) return;

    try {
      setMarkingId(notificationId);
      const response = await markNotificationsAsRead([notificationId]);
      toast.success(
        getSuccessMessage(response, 'Notifica segnata come letta'),
      );
    } catch (error) {
      toast.error(error || 'Impossibile segnare la notifica come letta');
    } finally {
      setMarkingId(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (notificationsMeta.unreadCount === 0) return;

    try {
      setMarkingAll(true);
      const response = await markAllNotificationsAsRead();
      toast.success(
        getSuccessMessage(response, 'Tutte le notifiche segnate come lette'),
      );
    } catch (error) {
      toast.error(error || 'Impossibile segnare le notifiche come lette');
    } finally {
      setMarkingAll(false);
    }
  };

  if (notificationsLoading && notifications.length === 0) {
    return <Loading size="md" className="min-h-60" />;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        {/* <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F9F6] shadow-sm"
        >
          <FaChevronLeft className="text-gray-600" />
        </button> */}

        <button
          type="button"
          onClick={handleMarkAllAsRead}
          className="text-xl font-semibold text-[#73BFA1] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={notificationsMeta.unreadCount === 0 || markingAll}
        >
          {markingAll
            ? 'Aggiornamento...'
            : `Segna tutti come già letti${
                notificationsMeta.unreadCount > 0
                  ? ` (${notificationsMeta.unreadCount})`
                  : ''
              }`}
        </button>
      </div>

      {notificationsError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {notificationsError}
        </div>
      )}

      {!notificationsError && notifications.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-gray-500">
          Nessuna notifica disponibile
        </div>
      )}

      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            item={notification}
            onMarkAsRead={handleMarkAsRead}
            isMarking={markingId === notification.id || markingAll}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
