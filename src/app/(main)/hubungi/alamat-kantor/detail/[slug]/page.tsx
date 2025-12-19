import { Mail, Phone, MapPin } from "lucide-react";
import { getBusinessUnitBySlug } from "@/services/business-unit-service";

interface BusinessUnitDetailProps {
  params: Promise<{ slug: string }>;
}

// Main Server Component
export default async function LocationsPage({ params }: BusinessUnitDetailProps) {
  const businessUnitData = (await getBusinessUnitBySlug((await params).slug)).Data;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Location Card */}
        <section className="mb-12">
          <article className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{businessUnitData.Name}</h2>
              <address className="not-italic text-slate-600 mb-4">{businessUnitData.Address}</address>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <a href={`mailto:${businessUnitData.Email}`} className="flex items-center gap-2 text-slate-700 hover:text-yellow-600 transition-colors">
                  <Mail className="w-5 h-5" />
                  {businessUnitData.Email}
                </a>

                <a href={`tel:${businessUnitData?.Phone?.replace(/\s/g, "")}`} className="flex items-center gap-2 text-slate-700 hover:text-yellow-600 transition-colors btn-contact-phone">
                  <Phone className="w-5 h-5" />
                  {businessUnitData.Phone}
                </a>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessUnitData.Address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                Direction
              </a>
            </div>
          </article>
        </section>

        {/* Sub Units Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Sub Unit</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessUnitData?.Subs?.map((location) => (
              <article key={location.ID} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-yellow-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{location.Name}</h3>

                <address className="not-italic text-sm text-slate-600 mb-4 min-h-[3rem]">{location.Address}</address>

                <div className="space-y-2">
                  <a href={`mailto:${location.Email}`} className="flex items-center gap-2 text-sm text-slate-700 hover:text-yellow-600 transition-colors break-all">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    {location.Email}
                  </a>

                  <a href={`tel:${location?.Phone?.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-slate-700 hover:text-yellow-600 transition-colors btn-contact-phone">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    {location.Phone}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
