import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Bell, CheckCheck } from 'lucide-react';
import Loading from '../../../../components/ui/Utilities/Loading';
import { usePrivate } from '../../../../features/private/privateHooks';

const getSuccessMessage = (response, fallback) =>
  response?.message || fallback;

const NotificationItem = ({ item, onMarkAsRead, isMarking }) => (
  <article
    className={`rounded-xl border bg-white p-3 shadow-sm transition-colors sm:p-4 ${
      item.unread
        ? 'border-[#d7ebe4] bg-[#f8fcfa]'
        : 'border-[#ececec] hover:bg-gray-50/60'
    }`}
  >
    <div className="flex gap-3 sm:gap-4">
      <div
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${
          item.unread ? 'bg-[#E8F8F3]' : 'bg-[#f3f4f6]'
        }`}
      >
        <Bell className="text-[#73BFA1]" size={18} />
        {item.unread ? (
          <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-[#73BFA1] ring-2 ring-white" />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <h2 className="text-sm font-semibold text-[#252525] sm:text-base">
              {item.title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              {item.message}
            </p>
            {item.pdfUrl ? (
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-[#73BFA1] hover:underline"
              >
                Scarica attestato
              </a>
            ) : null}
          </div>

          <span className="shrink-0 text-xs text-gray-400 sm:pt-0.5 sm:text-right">
            {item.sentAt}
          </span>
        </div>

        {item.unread ? (
          <div className="mt-3 flex justify-start sm:justify-end">
            <button
              type="button"
              disabled={isMarking}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onMarkAsRead(item.id);
              }}
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-[#d7ebe4] bg-white px-3 text-sm font-medium text-[#73BFA1] transition hover:bg-[#F1F9F6] disabled:cursor-not-allowed disabled:opacity-50 sm:h-auto sm:w-auto sm:border-0 sm:bg-transparent sm:px-0 sm:hover:bg-transparent sm:hover:text-[#5fa88d]"
            >
              <CheckCheck size={15} className="shrink-0" />
              {isMarking ? 'Aggiornamento...' : 'Segna come letta'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  </article>
);

const NotificationsView = () => {
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

  const unreadCount = notificationsMeta?.unreadCount ?? 0;

  return (
    <div className="min-w-0 space-y-4 sm:space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs text-[#7a7a7a] sm:text-sm">Notifiche</p>
          <h1 className="text-base font-semibold text-[#202020] sm:text-lg">
            Le tue notifiche
            {unreadCount > 0 ? (
              <span className="ml-2 inline-flex rounded-full bg-[#E8F8F3] px-2 py-0.5 text-xs font-semibold text-[#2b7a64]">
                {unreadCount} non lett
                {unreadCount === 1 ? 'a' : 'e'}
              </span>
            ) : null}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0 || markingAll}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[#d7ebe4] bg-white px-4 text-sm font-semibold text-[#73BFA1] transition hover:bg-[#F1F9F6] disabled:cursor-not-allowed disabled:opacity-50 sm:h-auto sm:w-auto sm:border-0 sm:bg-transparent sm:px-0 sm:text-[#73BFA1] sm:hover:bg-transparent sm:hover:underline"
        >
          <CheckCheck size={16} className="shrink-0" />
          {markingAll
            ? 'Aggiornamento...'
            : `Segna tutte come lette${unreadCount > 0 ? ` (${unreadCount})` : ''}`}
        </button>
      </div>

      {notificationsError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {notificationsError}
        </div>
      ) : null}

      {!notificationsError && notifications.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-500">
          Nessuna notifica disponibile
        </div>
      ) : null}

      <div className="space-y-3 sm:space-y-4">
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
