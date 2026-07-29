import EnrolledStudentsPanel from '../../../../components/admin/enrollment/EnrolledStudentsPanel';

export default function AdminReportView() {
  return (
    <EnrolledStudentsPanel
      title="Studenti iscritti"
      emptyMessage="Nessuno studente iscritto ai corsi della piattaforma."
    />
  );
}
