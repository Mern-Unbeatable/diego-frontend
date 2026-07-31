import React, { useEffect, useMemo, useState } from 'react';
import { Eye, Trash2, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Loading from '../../../../../components/ui/Utilities/Loading';
import Pagination from '../../../../../components/ui/Utilities/Pagination';
import { ConfirmModal } from '../../../../../components/ui';
import {
  useGetServiceRequestsQuery,
  useDeleteServiceRequestMutation,
  useGetContactsQuery,
  useDeleteContactMutation,
  useGetCollaborationsQuery,
  useDeleteCollaborationMutation,
} from '../../../../../features/api/inquiryApi';
import {
  showSuccessToast,
  showRtkErrorToast,
} from '../../../../../utils/toast/toastAlerts';
import InquiryDetailModal from './InquiryDetailModal';

const PAGE_SIZE = 10;

const getStatusBadgeClass = (rawStatus) => {
  switch (String(rawStatus).toUpperCase()) {
    case 'NEW':
    case 'PENDING':
      return 'bg-amber-100 text-amber-800';
    case 'CONTACTED':
    case 'IN_PROGRESS':
      return 'bg-blue-100 text-blue-800';
    case 'RESOLVED':
    case 'HANDLED':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const translateStatus = (t, rawStatus, fallback = '') => {
  if (!rawStatus) return fallback;
  const key = `platformAdmin.inquiries.status.${String(rawStatus).toUpperCase()}`;
  const translated = t(key);
  return translated === key ? fallback || rawStatus : translated;
};

function ActionButtons({ row, onView, onDelete, deleting, t }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        title={t('platformAdmin.inquiries.actions.view')}
        onClick={() => onView(row)}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="rounded-lg p-2 text-gray-400 hover:bg-rose-50 hover:text-red-600 disabled:opacity-50"
        title={t('platformAdmin.inquiries.actions.delete')}
        disabled={deleting}
        onClick={() => onDelete(row)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function StatusBadge({ row, translateRowStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(row.rawStatus)}`}
    >
      {translateRowStatus(row)}
    </span>
  );
}

function ServicesMobileCards({ rows, onView, onDelete, deleting, t, translateRowStatus }) {
  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <StatusBadge row={row} translateRowStatus={translateRowStatus} />
                <span className="text-xs text-gray-400">{row.createdAtFormatted}</span>
              </div>
              <p className="truncate text-sm font-semibold text-gray-900">
                {row.serviceName}
              </p>
              <p className="mt-1 truncate text-xs text-gray-600">
                {row.fullName}
                {row.email ? ` · ${row.email}` : ''}
              </p>
              {row.companyName ? (
                <p className="mt-1 truncate text-xs text-gray-500">{row.companyName}</p>
              ) : null}
            </div>
            <ActionButtons
              row={row}
              onView={onView}
              onDelete={onDelete}
              deleting={deleting}
              t={t}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactsMobileCards({ rows, onView, onDelete, deleting, t, translateRowStatus }) {
  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <StatusBadge row={row} translateRowStatus={translateRowStatus} />
                <span className="text-xs text-gray-400">{row.createdAtFormatted}</span>
              </div>
              <p className="truncate text-sm font-semibold text-gray-900">{row.fullName}</p>
              {row.agencyName ? (
                <p className="mt-1 truncate text-xs text-gray-600">{row.agencyName}</p>
              ) : null}
              <p className="mt-1 truncate text-xs text-gray-500">
                {row.email}
                {row.phone ? ` · ${row.phone}` : ''}
              </p>
            </div>
            <ActionButtons
              row={row}
              onView={onView}
              onDelete={onDelete}
              deleting={deleting}
              t={t}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CollaborationsMobileCards({
  rows,
  onView,
  onDelete,
  deleting,
  t,
  translateRowStatus,
}) {
  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <StatusBadge row={row} translateRowStatus={translateRowStatus} />
                <span className="text-xs text-gray-400">{row.createdAtFormatted}</span>
              </div>
              <p className="truncate text-sm font-semibold text-gray-900">
                {row.companyName}
              </p>
              <p className="mt-1 truncate text-xs text-gray-600">
                {row.contactName}
                {row.email ? ` · ${row.email}` : ''}
              </p>
              {row.collaborationType ? (
                <p className="mt-1 truncate text-xs text-gray-500">
                  {row.collaborationType}
                </p>
              ) : null}
            </div>
            <ActionButtons
              row={row}
              onView={onView}
              onDelete={onDelete}
              deleting={deleting}
              t={t}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ServicesTable({ rows, onView, onDelete, deleting, t, translateRowStatus }) {
  return (
    <table className="min-w-[800px] w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {[
            'service',
            'contact',
            'company',
            'status',
            'date',
            'actions',
          ].map((col) => (
            <th
              key={col}
              className={`px-4 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6 ${
                col === 'actions' ? 'text-right' : 'text-left'
              }`}
            >
              {t(`platformAdmin.inquiries.columns.${col}`)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="max-w-[160px] truncate px-4 py-4 text-sm font-medium text-gray-900 lg:px-6">
              {row.serviceName}
            </td>
            <td className="px-4 py-4 text-sm text-gray-900 lg:px-6">
              <div className="truncate">{row.fullName}</div>
              <div className="truncate text-xs text-gray-500">{row.email}</div>
            </td>
            <td className="max-w-[140px] truncate px-4 py-4 text-sm text-gray-700 lg:px-6">
              {row.companyName}
            </td>
            <td className="px-4 py-4 whitespace-nowrap lg:px-6">
              <StatusBadge row={row} translateRowStatus={translateRowStatus} />
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 lg:px-6">
              {row.createdAtFormatted}
            </td>
            <td className="px-4 py-4 text-right lg:px-6">
              <ActionButtons
                row={row}
                onView={onView}
                onDelete={onDelete}
                deleting={deleting}
                t={t}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ContactsTable({ rows, onView, onDelete, deleting, t, translateRowStatus }) {
  return (
    <table className="min-w-[800px] w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {['name', 'agency', 'contacts', 'status', 'date', 'actions'].map((col) => (
            <th
              key={col}
              className={`px-4 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6 ${
                col === 'actions' ? 'text-right' : 'text-left'
              }`}
            >
              {t(`platformAdmin.inquiries.columns.${col}`)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="max-w-[140px] truncate px-4 py-4 text-sm font-medium text-gray-900 lg:px-6">
              {row.fullName}
            </td>
            <td className="max-w-[140px] truncate px-4 py-4 text-sm text-gray-700 lg:px-6">
              {row.agencyName}
            </td>
            <td className="px-4 py-4 text-sm text-gray-900 lg:px-6">
              <div className="truncate">{row.email}</div>
              <div className="truncate text-xs text-gray-500">{row.phone}</div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap lg:px-6">
              <StatusBadge row={row} translateRowStatus={translateRowStatus} />
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 lg:px-6">
              {row.createdAtFormatted}
            </td>
            <td className="px-4 py-4 text-right lg:px-6">
              <ActionButtons
                row={row}
                onView={onView}
                onDelete={onDelete}
                deleting={deleting}
                t={t}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CollaborationsTable({
  rows,
  onView,
  onDelete,
  deleting,
  t,
  translateRowStatus,
}) {
  return (
    <table className="min-w-[800px] w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {['company', 'contact', 'type', 'status', 'date', 'actions'].map((col) => (
            <th
              key={col}
              className={`px-4 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase lg:px-6 ${
                col === 'actions' ? 'text-right' : 'text-left'
              }`}
            >
              {t(`platformAdmin.inquiries.columns.${col}`)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="max-w-[140px] truncate px-4 py-4 text-sm font-medium text-gray-900 lg:px-6">
              {row.companyName}
            </td>
            <td className="px-4 py-4 text-sm text-gray-900 lg:px-6">
              <div className="truncate">{row.contactName}</div>
              <div className="truncate text-xs text-gray-500">{row.email}</div>
            </td>
            <td className="max-w-[120px] truncate px-4 py-4 text-sm text-gray-700 lg:px-6">
              {row.collaborationType}
            </td>
            <td className="px-4 py-4 whitespace-nowrap lg:px-6">
              <StatusBadge row={row} translateRowStatus={translateRowStatus} />
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 lg:px-6">
              {row.createdAtFormatted}
            </td>
            <td className="px-4 py-4 text-right lg:px-6">
              <ActionButtons
                row={row}
                onView={onView}
                onDelete={onDelete}
                deleting={deleting}
                t={t}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const getDetailFields = (activeTab, item, t) => {
  if (!item) return [];

  const fields = t('platformAdmin.inquiries.fields', { returnObjects: true });

  if (activeTab === 'services') {
    return [
      { key: 'service', label: fields.service, value: item.serviceName },
      { key: 'name', label: fields.name, value: item.fullName },
      { key: 'company', label: fields.company, value: item.companyName },
      { key: 'vatNumber', label: fields.vatNumber, value: item.vatNumber },
      { key: 'phone', label: fields.phone, value: item.phone },
      { key: 'email', label: fields.email, value: item.email },
      {
        key: 'status',
        label: fields.status,
        value: translateStatus(t, item.rawStatus, item.status),
      },
      { key: 'message', label: fields.message, value: item.message },
      { key: 'date', label: fields.date, value: item.createdAtFormatted },
    ];
  }

  if (activeTab === 'contacts') {
    return [
      { key: 'name', label: fields.name, value: item.fullName },
      { key: 'agency', label: fields.agency, value: item.agencyName },
      { key: 'vatNumber', label: fields.vatNumber, value: item.vat },
      { key: 'phone', label: fields.phone, value: item.phone },
      { key: 'email', label: fields.email, value: item.email },
      {
        key: 'status',
        label: fields.status,
        value: translateStatus(t, item.rawStatus, item.status),
      },
      { key: 'message', label: fields.message, value: item.message },
      { key: 'date', label: fields.date, value: item.createdAtFormatted },
    ];
  }

  return [
    { key: 'company', label: fields.company, value: item.companyName },
    { key: 'contact', label: fields.contact, value: item.contactName },
    { key: 'email', label: fields.email, value: item.email },
    { key: 'phone', label: fields.phone, value: item.telephone },
    {
      key: 'collaborationType',
      label: fields.collaborationType,
      value: item.collaborationType,
    },
    { key: 'companySize', label: fields.companySize, value: item.companySize },
    {
      key: 'status',
      label: fields.status,
      value: translateStatus(t, item.rawStatus, item.status),
    },
    { key: 'description', label: fields.description, value: item.description },
    { key: 'goals', label: fields.goals, value: item.goals },
    { key: 'notes', label: fields.notes, value: item.notes },
    { key: 'date', label: fields.date, value: item.createdAtFormatted },
  ];
};

const getDeleteLabel = (item, t) =>
  item?.fullName ||
  item?.companyName ||
  item?.contactName ||
  item?.serviceName ||
  t('platformAdmin.inquiries.delete.fallbackLabel');

export default function InquiriesSection({ activeTab = 'services' }) {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
    setSearchInput('');
    setSearch('');
  }, [activeTab]);

  const queryArgs = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      search: search || undefined,
    }),
    [page, search],
  );

  const servicesQuery = useGetServiceRequestsQuery(queryArgs, {
    skip: activeTab !== 'services',
  });
  const contactsQuery = useGetContactsQuery(queryArgs, {
    skip: activeTab !== 'contacts',
  });
  const collaborationsQuery = useGetCollaborationsQuery(queryArgs, {
    skip: activeTab !== 'collaborations',
  });

  const [deleteServiceRequest, { isLoading: deletingService }] =
    useDeleteServiceRequestMutation();
  const [deleteContact, { isLoading: deletingContact }] = useDeleteContactMutation();
  const [deleteCollaboration, { isLoading: deletingCollaboration }] =
    useDeleteCollaborationMutation();

  const tabKey = `platformAdmin.inquiries.${activeTab}`;

  const { rows, meta, listLoading, deleting, deleteMutation } = useMemo(() => {
    if (activeTab === 'contacts') {
      return {
        rows: contactsQuery.data?.contacts ?? [],
        meta: contactsQuery.data?.meta,
        listLoading: contactsQuery.isLoading || contactsQuery.isFetching,
        deleting: deletingContact,
        deleteMutation: deleteContact,
      };
    }

    if (activeTab === 'collaborations') {
      return {
        rows: collaborationsQuery.data?.collaborations ?? [],
        meta: collaborationsQuery.data?.meta,
        listLoading:
          collaborationsQuery.isLoading || collaborationsQuery.isFetching,
        deleting: deletingCollaboration,
        deleteMutation: deleteCollaboration,
      };
    }

    return {
      rows: servicesQuery.data?.serviceRequests ?? [],
      meta: servicesQuery.data?.meta,
      listLoading: servicesQuery.isLoading || servicesQuery.isFetching,
      deleting: deletingService,
      deleteMutation: deleteServiceRequest,
    };
  }, [
    activeTab,
    contactsQuery.data?.contacts,
    contactsQuery.data?.meta,
    contactsQuery.isFetching,
    contactsQuery.isLoading,
    collaborationsQuery.data?.collaborations,
    collaborationsQuery.data?.meta,
    collaborationsQuery.isFetching,
    collaborationsQuery.isLoading,
    servicesQuery.data?.serviceRequests,
    servicesQuery.data?.meta,
    servicesQuery.isFetching,
    servicesQuery.isLoading,
    deletingContact,
    deletingCollaboration,
    deletingService,
    deleteContact,
    deleteCollaboration,
    deleteServiceRequest,
  ]);

  const total = meta?.total ?? rows.length;
  const totalPages = Math.max(
    1,
    meta?.totalPages ?? (Math.ceil(total / PAGE_SIZE) || 1),
  );

  const translateRowStatus = (row) => translateStatus(t, row.rawStatus, row.status);

  const openDetail = (item) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await deleteMutation(deleteTarget.id).unwrap();
      showSuccessToast(t(`${tabKey}.deleteSuccess`));
      if (selectedItem?.id === deleteTarget.id) {
        setIsDetailOpen(false);
        setSelectedItem(null);
      }
    } catch (error) {
      showRtkErrorToast(error);
    } finally {
      setDeleteTarget(null);
    }
  };

  const listProps = {
    rows,
    onView: openDetail,
    onDelete: setDeleteTarget,
    deleting,
    t,
    translateRowStatus,
  };

  return (
    <div className="min-w-0">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-medium text-gray-900 sm:text-lg">
          {t(`${tabKey}.title`)} ({total})
        </h2>
        <div className="flex w-full items-center gap-2 rounded-full bg-gray-100 px-3 py-2 sm:w-auto sm:min-w-[220px]">
          <Search className="h-4 w-4 shrink-0 text-gray-500" />
          <input
            type="search"
            placeholder={t('platformAdmin.inquiries.searchPlaceholder')}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {listLoading ? (
        <Loading size="md" className="min-h-48" />
      ) : rows.length === 0 ? (
        <div className="rounded-lg bg-white px-4 py-16 text-center shadow-sm sm:py-24">
          <h3 className="text-base font-medium text-gray-900 sm:text-lg">
            {t(`${tabKey}.emptyTitle`)}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {t(`${tabKey}.emptyDescription`)}
          </p>
        </div>
      ) : (
        <>
          {activeTab === 'services' ? (
            <ServicesMobileCards {...listProps} />
          ) : activeTab === 'contacts' ? (
            <ContactsMobileCards {...listProps} />
          ) : (
            <CollaborationsMobileCards {...listProps} />
          )}

          <div className="hidden overflow-hidden rounded-lg bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              {activeTab === 'services' ? (
                <ServicesTable {...listProps} />
              ) : activeTab === 'contacts' ? (
                <ContactsTable {...listProps} />
              ) : (
                <CollaborationsTable {...listProps} />
              )}
            </div>
          </div>

          <div className="mt-1 rounded-lg bg-white px-3 shadow-sm sm:px-4 md:mt-0 md:rounded-t-none">
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              limit={PAGE_SIZE}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      <InquiryDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedItem(null);
        }}
        title={t('platformAdmin.inquiries.detail.title')}
        fields={getDetailFields(activeTab, selectedItem, t)}
      />

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={t(`${tabKey}.deleteTitle`)}
        message={t('platformAdmin.inquiries.delete.message', {
          label: getDeleteLabel(deleteTarget, t),
        })}
        confirmLabel={t('platformAdmin.inquiries.delete.confirm')}
        cancelLabel={t('platformAdmin.inquiries.delete.cancel')}
        variant="danger"
        zIndex={100}
      />
    </div>
  );
}
