import DashboardLayout from '../components/Layout/DashboardLayout';
import AdmissionsTable from './../components/Admissionstable/Admissionstable';

export default function AdmissionsPage() {
  return (
    <DashboardLayout active="Admissions">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.8rem', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 style={{ margin: 0 }}>Admissions</h1>
          <p style={{ marginTop: '0.4rem', color: '#636363', fontSize: '0.9rem' }}>
            View and manage all student applications.
          </p>
        </div>
      </div>
      <AdmissionsTable />
    </DashboardLayout>
  );
}