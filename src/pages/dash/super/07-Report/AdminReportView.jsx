import EnrolledStudentsPanel from '../../../../components/admin/enrollment/EnrolledStudentsPanel';

export default function AdminReportView() {
  return (
    <div className="min-w-0">
      <EnrolledStudentsPanel
        title="Studenti iscritti"
        emptyMessage="Nessuno studente iscritto ai corsi della piattaforma."
      />
    </div>
  );
}
