import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyEnrollmentsAPI,
  getMyTicketsAPI,
  createTicketAPI,
  getTicketByIdAPI,
  getNotificationsAPI,
  markNotificationsReadAPI,
  markAllNotificationsReadAPI,
  getMyCertificatesAPI,
  getMyProfileAPI,
  updateMyProfileAPI,
  updateMyAvatarAPI,
} from './privateAPI';
import { resetTicketDetail } from './privateSlice';
import { selectPrivate } from './privateSelectors';

export const usePrivate = () => {
  const dispatch = useDispatch();
  const privateState = useSelector(selectPrivate);

  const fetchMyEnrollments = useCallback(async () => {
    const result = await dispatch(getMyEnrollmentsAPI()).unwrap();
    return result;
  }, [dispatch]);

  const fetchMyTickets = useCallback(async (params = {}) => {
    const result = await dispatch(getMyTicketsAPI(params)).unwrap();
    return result;
  }, [dispatch]);

  const createTicket = useCallback(
    async ({ subject, message, attachment }) => {
      const result = await dispatch(
        createTicketAPI({ subject, message, attachment }),
      ).unwrap();
      return result;
    },
    [dispatch],
  );

  const fetchTicketById = useCallback(
    async (ticketId) => {
      const result = await dispatch(getTicketByIdAPI(ticketId)).unwrap();
      return result;
    },
    [dispatch],
  );

  const clearTicketDetail = useCallback(() => {
    dispatch(resetTicketDetail());
  }, [dispatch]);

  const fetchNotifications = useCallback(async () => {
    const result = await dispatch(getNotificationsAPI()).unwrap();
    return result;
  }, [dispatch]);

  const markNotificationsAsRead = useCallback(
    async (notificationIds) => {
      const ids = (Array.isArray(notificationIds)
        ? notificationIds
        : [notificationIds]
      ).filter(Boolean);

      if (ids.length === 0) {
        throw new Error('Nessuna notifica selezionata');
      }

      const result = await dispatch(
        markNotificationsReadAPI({ notificationIds: ids }),
      ).unwrap();
      return result;
    },
    [dispatch],
  );

  const markAllNotificationsAsRead = useCallback(async () => {
    const result = await dispatch(markAllNotificationsReadAPI()).unwrap();
    return result;
  }, [dispatch]);

  const fetchMyCertificates = useCallback(
    async ({ page = 1, limit = 20 } = {}) => {
      const result = await dispatch(
        getMyCertificatesAPI({ page, limit }),
      ).unwrap();
      return result;
    },
    [dispatch],
  );

  const fetchMyProfile = useCallback(async () => {
    const result = await dispatch(getMyProfileAPI()).unwrap();
    return result;
  }, [dispatch]);

  const updateMyProfile = useCallback(
    async (payload) => {
      const result = await dispatch(updateMyProfileAPI(payload)).unwrap();
      return result;
    },
    [dispatch],
  );

  const updateMyAvatar = useCallback(
    async (avatar) => {
      const result = await dispatch(updateMyAvatarAPI(avatar)).unwrap();
      return result;
    },
    [dispatch],
  );

  return {
    fetchMyEnrollments,
    fetchMyTickets,
    createTicket,
    fetchTicketById,
    clearTicketDetail,
    fetchNotifications,
    markNotificationsAsRead,
    markAllNotificationsAsRead,
    fetchMyCertificates,
    fetchMyProfile,
    updateMyProfile,
    updateMyAvatar,
    ...privateState,
  };
};
