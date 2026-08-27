import { createSlice } from '@reduxjs/toolkit';
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
import {
  mapEnrollmentsResponse,
  mapTicketsResponse,
  mapTicketDetailResponse,
  mapNotificationsResponse,
  mapCertificatesResponse,
  mapProfileResponse,
} from './privateMappers';

const initialState = {
  enrollments: [],
  enrollmentsLoading: false,
  enrollmentsError: null,
  tickets: [],
  ticketsLoading: false,
  ticketsError: null,
  createTicketLoading: false,
  createTicketError: null,
  ticketDetail: null,
  ticketDetailLoading: false,
  ticketDetailError: null,
  notifications: [],
  notificationsMeta: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    unreadCount: 0,
  },
  notificationsLoading: false,
  notificationsError: null,
  certificates: [],
  certificatesMeta: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  certificatesArchive: {
    hasActiveSubscription: false,
    expiresAt: null,
    freeDownloadDays: 30,
    plan: null,
  },
  certificatesLoading: false,
  certificatesLoadingMore: false,
  certificatesError: null,
  profile: null,
  profileLoading: false,
  profileError: null,
  profileUpdateLoading: false,
  profileUpdateError: null,
  avatarUploadLoading: false,
  avatarUploadError: null,
};

const privateSlice = createSlice({
  name: 'private',
  initialState,
  reducers: {
    resetPrivateError: (state) => {
      state.enrollmentsError = null;
      state.ticketsError = null;
      state.createTicketError = null;
      state.ticketDetailError = null;
      state.notificationsError = null;
      state.certificatesError = null;
      state.profileError = null;
    },
    resetTicketDetail: (state) => {
      state.ticketDetail = null;
      state.ticketDetailLoading = false;
      state.ticketDetailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyEnrollmentsAPI.pending, (state) => {
        state.enrollmentsLoading = true;
        state.enrollmentsError = null;
      })
      .addCase(getMyEnrollmentsAPI.fulfilled, (state, action) => {
        state.enrollmentsLoading = false;
        state.enrollments = mapEnrollmentsResponse(action.payload);
      })
      .addCase(getMyEnrollmentsAPI.rejected, (state, action) => {
        state.enrollmentsLoading = false;
        state.enrollmentsError = action.payload;
      })
      .addCase(getMyTicketsAPI.pending, (state) => {
        state.ticketsLoading = true;
        state.ticketsError = null;
      })
      .addCase(getMyTicketsAPI.fulfilled, (state, action) => {
        state.ticketsLoading = false;
        state.tickets = mapTicketsResponse(action.payload);
      })
      .addCase(getMyTicketsAPI.rejected, (state, action) => {
        state.ticketsLoading = false;
        state.ticketsError = action.payload;
      })
      .addCase(createTicketAPI.pending, (state) => {
        state.createTicketLoading = true;
        state.createTicketError = null;
      })
      .addCase(createTicketAPI.fulfilled, (state) => {
        state.createTicketLoading = false;
      })
      .addCase(createTicketAPI.rejected, (state, action) => {
        state.createTicketLoading = false;
        state.createTicketError = action.payload;
      })
      .addCase(getTicketByIdAPI.pending, (state) => {
        state.ticketDetailLoading = true;
        state.ticketDetailError = null;
        state.ticketDetail = null;
      })
      .addCase(getTicketByIdAPI.fulfilled, (state, action) => {
        state.ticketDetailLoading = false;
        state.ticketDetail = mapTicketDetailResponse(action.payload);
      })
      .addCase(getTicketByIdAPI.rejected, (state, action) => {
        state.ticketDetailLoading = false;
        state.ticketDetailError = action.payload;
      })
      .addCase(getNotificationsAPI.pending, (state) => {
        state.notificationsLoading = true;
        state.notificationsError = null;
      })
      .addCase(getNotificationsAPI.fulfilled, (state, action) => {
        const { notifications, meta } = mapNotificationsResponse(action.payload);
        state.notificationsLoading = false;
        state.notifications = notifications;
        state.notificationsMeta = meta;
      })
      .addCase(getNotificationsAPI.rejected, (state, action) => {
        state.notificationsLoading = false;
        state.notificationsError = action.payload;
      })
      .addCase(markNotificationsReadAPI.fulfilled, (state, action) => {
        const notificationIds = action.meta.arg?.notificationIds ?? [];
        let markedCount = 0;

        state.notifications = state.notifications.map((item) => {
          if (notificationIds.includes(item.id) && item.unread) {
            markedCount += 1;
            return { ...item, unread: false, read: true };
          }

          return item;
        });

        state.notificationsMeta.unreadCount = Math.max(
          0,
          state.notificationsMeta.unreadCount - markedCount,
        );
      })
      .addCase(markAllNotificationsReadAPI.fulfilled, (state) => {
        state.notifications = state.notifications.map((item) => ({
          ...item,
          unread: false,
          read: true,
        }));
        state.notificationsMeta.unreadCount = 0;
      })
      .addCase(getMyCertificatesAPI.pending, (state, action) => {
        const isLoadMore = (action.meta.arg?.page ?? 1) > 1;

        if (isLoadMore) {
          state.certificatesLoadingMore = true;
        } else {
          state.certificatesLoading = true;
        }

        state.certificatesError = null;
      })
      .addCase(getMyCertificatesAPI.fulfilled, (state, action) => {
        const { certificates, meta, archive } = mapCertificatesResponse(
          action.payload,
        );
        const isLoadMore = (action.meta.arg?.page ?? 1) > 1;

        state.certificatesLoading = false;
        state.certificatesLoadingMore = false;
        state.certificatesMeta = meta;
        state.certificatesArchive = archive;
        state.certificates = isLoadMore
          ? [...state.certificates, ...certificates]
          : certificates;
      })
      .addCase(getMyCertificatesAPI.rejected, (state, action) => {
        state.certificatesLoading = false;
        state.certificatesLoadingMore = false;
        state.certificatesError = action.payload;
      })
      .addCase(getMyProfileAPI.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(getMyProfileAPI.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = mapProfileResponse(action.payload);
      })
      .addCase(getMyProfileAPI.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      })
      .addCase(updateMyProfileAPI.pending, (state) => {
        state.profileUpdateLoading = true;
        state.profileUpdateError = null;
      state.avatarUploadError = null;
      })
      .addCase(updateMyProfileAPI.fulfilled, (state, action) => {
        state.profileUpdateLoading = false;
        state.profile = mapProfileResponse(action.payload);
      })
      .addCase(updateMyProfileAPI.rejected, (state, action) => {
        state.profileUpdateLoading = false;
        state.profileUpdateError = action.payload;
      })
      .addCase(updateMyAvatarAPI.pending, (state) => {
        state.avatarUploadLoading = true;
        state.avatarUploadError = null;
      })
      .addCase(updateMyAvatarAPI.fulfilled, (state, action) => {
        state.avatarUploadLoading = false;
        const mappedProfile = mapProfileResponse(action.payload);

        if (mappedProfile) {
          state.profile = mappedProfile;
          return;
        }

        const avatar =
          action.payload?.data?.avatar ??
          action.payload?.avatar ??
          action.payload?.data?.user?.avatar ??
          action.payload?.user?.avatar;

        if (avatar && state.profile) {
          state.profile.avatar = avatar;
        }
      })
      .addCase(updateMyAvatarAPI.rejected, (state, action) => {
        state.avatarUploadLoading = false;
        state.avatarUploadError = action.payload;
      });
  },
});

export const { resetPrivateError, resetTicketDetail } = privateSlice.actions;
export default privateSlice.reducer;
