import { WoodCategories } from '@/components/category/WoodCategories';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function WoodCategoriesPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Wood Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Manage wood categories, car numbers, and tag prices.</p>
        </div>
        <WoodCategories />
      </div>
    </DashboardLayout>
  );
}
