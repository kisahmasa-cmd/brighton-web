// app/visitor/dashboard/loading.tsx

import { Building2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function VisitorDashboardLoading() {
  return (
    <div>
      <div className="mb-6 md:mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-yellow-600" />
          Properti terakhir dilihat
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 rounded-xl overflow-hidden">
              <Skeleton className="w-full h-40 md:h-48" />
              <div className="p-3 md:p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}