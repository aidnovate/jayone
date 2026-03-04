import DashboardLayout from '../components/Layout/DashboardLayout';
import BlogTable from '../components/BlogTable/BlogTable';

export default function BlogsPage() { 
  return (
    <DashboardLayout active="Blogs">
      <BlogTable />
    </DashboardLayout>
  );
}