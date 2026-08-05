import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  downloadEmployeeCertificateService,
  getCompanyProgressReportService,
  sendEnrollmentReminderService,
} from '../companyService';
import { PROGRESS_PAGE_SIZE, resolveCertificateUrl } from '../companyProgressUtils';

export const useCompanyProgressReport = ({
  courseId,
  employeeName,
  userId,
  pageSize = PROGRESS_PAGE_SIZE,
  enabled = true,
} = {}) => {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(Boolean(enabled));
  const [actionId, setActionId] = useState(null);
  const [page, setPage] = useState(1);

  const loadReport = useCallback(
    async (targetPage = 1) => {
      if (!enabled) return;
      setLoading(true);
      try {
        const data = await getCompanyProgressReportService({
          page: targetPage,
          limit: pageSize,
          ...(courseId ? { courseId } : {}),
          ...(employeeName?.trim() ? { employeeName: employeeName.trim() } : {}),
          ...(userId ? { userId } : {}),
        });
        setRows(data?.report ?? []);
        setMeta(data?.meta ?? { page: targetPage, total: 0, totalPages: 1 });
      } catch (error) {
        toast.error(error?.message || 'Impossibile caricare il report');
        setRows([]);
      } finally {
        setLoading(false);
      }
    },
    [courseId, employeeName, userId, pageSize, enabled],
  );

  useEffect(() => {
    setPage(1);
  }, [courseId, employeeName, userId]);

  useEffect(() => {
    if (enabled) {
      loadReport(page);
    }
  }, [page, loadReport, enabled]);

  const handleReminder = async (row) => {
    try {
      setActionId(row.enrollmentId);
      await sendEnrollmentReminderService(row.enrollmentId);
      toast.success(`Promemoria inviato a ${row.employeeName}`);
    } catch (error) {
      toast.error(error?.message || 'Invio promemoria non riuscito');
    } finally {
      setActionId(null);
    }
  };

  const handleDownload = async (row) => {
    if (!row.certificateId) return;
    try {
      setActionId(row.enrollmentId);
      const data = await downloadEmployeeCertificateService(
        row.employeeUserId,
        row.certificateId,
      );
      const pdfUrl = resolveCertificateUrl(data?.pdfUrl);
      if (pdfUrl) {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      toast.error(error?.message || 'Download attestato non riuscito');
    } finally {
      setActionId(null);
    }
  };

  const from = meta.total === 0 ? 0 : (meta.page - 1) * pageSize + 1;
  const to = Math.min(meta.page * pageSize, meta.total);

  return {
    rows,
    meta,
    loading,
    actionId,
    page,
    setPage,
    loadReport,
    handleReminder,
    handleDownload,
    from,
    to,
  };
};
