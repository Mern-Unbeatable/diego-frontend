import React, { useMemo, useState } from 'react';
import { Eye, Trash2, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Loading from '../../../../../components/ui/Utilities/Loading';
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

function ServicesTable({ rows, onView, onDelete, deleting, t, translateRowStatus }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.service')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.contact')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.company')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.status')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.date')}
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.actions')}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.serviceName}</td>
            <td className="px-6 py-4 text-sm text-gray-900">
              <div>{row.fullName}</div>
              <div className="text-xs text-gray-500">{row.email}</div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">{row.companyName}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(row.rawStatus)}`}
              >
                {translateRowStatus(row)}
              </span>
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
              {row.createdAtFormatted}
            </td>
            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
              <ActionButtons row={row} onView={onView} onDelete={onDelete} deleting={deleting} t={t} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ContactsTable({ rows, onView, onDelete, deleting, t, translateRowStatus }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.name')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.agency')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.contacts')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.status')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.date')}
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.actions')}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.fullName}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{row.agencyName}</td>
            <td className="px-6 py-4 text-sm text-gray-900">
              <div>{row.email}</div>
              <div className="text-xs text-gray-500">{row.phone}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(row.rawStatus)}`}
              >
                {translateRowStatus(row)}
              </span>
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
              {row.createdAtFormatted}
            </td>
            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
              <ActionButtons row={row} onView={onView} onDelete={onDelete} deleting={deleting} t={t} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CollaborationsTable({ rows, onView, onDelete, deleting, t, translateRowStatus }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.company')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.contact')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.type')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.status')}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.date')}
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
            {t('platformAdmin.inquiries.columns.actions')}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.companyName}</td>
            <td className="px-6 py-4 text-sm text-gray-900">
              <div>{row.contactName}</div>
              <div className="text-xs text-gray-500">{row.email}</div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">{row.collaborationType}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(row.rawStatus)}`}
              >
                {translateRowStatus(row)}
              </span>
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
              {row.createdAtFormatted}
            </td>
            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
              <ActionButtons row={row} onView={onView} onDelete={onDelete} deleting={deleting} t={t} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ActionButtons({ row, onView, onDelete, deleting, t }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        className="text-gray-400 hover:text-gray-600"
        title={t('platformAdmin.inquiries.actions.view')}
        onClick={() => onView(row)}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="text-gray-400 hover:text-red-600 disabled:opacity-50"
        title={t('platformAdmin.inquiries.actions.delete')}
        disabled={deleting}
        onClick={() => onDelete(row)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
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
      { key: 'status', label: fields.status, value: translateStatus(t, item.rawStatus, item.status) },
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
      { key: 'status', label: fields.status, value: translateStatus(t, item.rawStatus, item.status) },
      { key: 'message', label: fields.message, value: item.message },
      { key: 'date', label: fields.date, value: item.createdAtFormatted },
    ];
  }

  return [
    { key: 'company', label: fields.company, value: item.companyName },
    { key: 'contact', label: fields.contact, value: item.contactName },
    { key: 'email', label: fields.email, value: item.email },
    { key: 'phone', label: fields.phone, value: item.telephone },
    { key: 'collaborationType', label: fields.collaborationType, value: item.collaborationType },
    { key: 'companySize', label: fields.companySize, value: item.companySize },
    { key: 'status', label: fields.status, value: translateStatus(t, item.rawStatus, item.status) },
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
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const queryArgs = useMemo(
    () => ({
      page: 1,
      limit: 50,
      search: search.trim() || undefined,
    }),
    [search],
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

  const { rows, listLoading, deleting, deleteMutation } = useMemo(() => {
    if (activeTab === 'contacts') {
      return {
        rows: contactsQuery.data?.contacts ?? [],
        listLoading: contactsQuery.isLoading || contactsQuery.isFetching,
        deleting: deletingContact,
        deleteMutation: deleteContact,
      };
    }

    if (activeTab === 'collaborations') {
      return {
        rows: collaborationsQuery.data?.collaborations ?? [],
        listLoading: collaborationsQuery.isLoading || collaborationsQuery.isFetching,
        deleting: deletingCollaboration,
        deleteMutation: deleteCollaboration,
      };
    }

    return {
      rows: servicesQuery.data?.serviceRequests ?? [],
      listLoading: servicesQuery.isLoading || servicesQuery.isFetching,
      deleting: deletingService,
      deleteMutation: deleteServiceRequest,
    };
  }, [
    activeTab,
    contactsQuery.data?.contacts,
    contactsQuery.isFetching,
    contactsQuery.isLoading,
    collaborationsQuery.data?.collaborations,
    collaborationsQuery.isFetching,
    collaborationsQuery.isLoading,
    servicesQuery.data?.serviceRequests,
    servicesQuery.isFetching,
    servicesQuery.isLoading,
    deletingContact,
    deletingCollaboration,
    deletingService,
    deleteContact,
    deleteCollaboration,
    deleteServiceRequest,
  ]);

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

  const tableProps = {
    rows,
    onView: openDetail,
    onDelete: setDeleteTarget,
    deleting,
    t,
    translateRowStatus,
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-gray-900">
          {t(`${tabKey}.title`)} ({rows.length})
        </h2>
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder={t('platformAdmin.inquiries.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[180px] bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        {listLoading ? (
          <Loading size="md" className="min-h-48" />
        ) : rows.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-lg font-medium text-gray-900">{t(`${tabKey}.emptyTitle`)}</h3>
            <p className="mt-2 text-sm text-gray-500">{t(`${tabKey}.emptyDescription`)}</p>
          </div>
        ) : activeTab === 'services' ? (
          <ServicesTable {...tableProps} />
        ) : activeTab === 'contacts' ? (
          <ContactsTable {...tableProps} />
        ) : (
          <CollaborationsTable {...tableProps} />
        )}
      </div>

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
