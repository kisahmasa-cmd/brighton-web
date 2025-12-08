import React from "react";

interface NearbyLocation {
  Category: string;
  AverageDuration: string;
  Locations: Array<{ Name: string }>;
}

interface PropertyLocationProps {
  nearbyLocations?: NearbyLocation[];
  mapUrl?: string;
  gmapUrl?: string;
}

const PropertyLocation = ({
  nearbyLocations,
  mapUrl,
  gmapUrl,
}: PropertyLocationProps) => {
  if (!nearbyLocations && !mapUrl && !gmapUrl) return null;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Lokasi Sekitar</h2>

      {/* Nearby Locations List */}
      {nearbyLocations && nearbyLocations.length > 0 && (
        <div className="space-y-4 mb-6 p-4 border border-gray-200 rounded-2xl">
          {nearbyLocations.map((item, index) => (
            <div key={index}>
              <div className="w-full text-sm flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-500">{item.Category}</p>
                  <p className="flex-1 font-semibold text-gray-700">
                    {item.Locations.map((loc) => loc.Name).join(", ")}
                  </p>
                </div>
                <p className="text-gray-600">±{item.AverageDuration}</p>
              </div>

              {index !== nearbyLocations.length - 1 && (
                <div className="w-full h-1 border-b border-gray-200 my-2"></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Map */}
      {mapUrl && gmapUrl && (
        <a
          href={gmapUrl}
          target="_blank"
          rel="noindex nofollow"
          aria-label="Lihat lokasi di Google Maps"
        >
          <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md relative">
            <iframe
              src={process.env.NEXT_PUBLIC_OLD_URL + "/" + mapUrl}
              width="100%"
              height="400px"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full border-0"
              title="Brighton OpenStreetMap"
            ></iframe>
            <div className="absolute inset-0 bg-transparent"/>
          </div>
        </a>
      )}
    </div>
  );
};

export default PropertyLocation;