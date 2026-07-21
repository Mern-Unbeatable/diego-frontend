import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyEnrollmentsAPI,
  getMyTicketsAPI,
  createTicketAPI,
  getTicketByIdAPI,
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

  const fetchMyTickets = useCallback(async () => {
    const result = await dispatch(getMyTicketsAPI()).unwrap();
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

  return {
    fetchMyEnrollments,
    fetchMyTickets,
    createTicket,
    fetchTicketById,
    clearTicketDetail,
    ...privateState,
  };
};
