export function dynamicPropertyFallback(params: { typeTransaction: string; typeProperty: string; city: string; area: string }) {
  const { typeTransaction, typeProperty, city, area } = params;

  const City = capitalize(city.replace(/-/g, " "));
  const Area = area ? capitalize(area.replace(/-/g, " ")) + "," : "";
  const Property = capitalize(typeProperty.replace(/-/g, " "));
  const Transaction = capitalize(typeTransaction);

  return {
    MetaTitle: `${Property} ${Transaction} di ${Area} ${City} | Brighton.co.id`,
    MetaDescription: `${Property} ${Transaction} di ${Area} ${City}. Pencarian Mudah ✓ Lokasi Strategis ✓ Harga Terbaik ✓ Foto & Video ✓ Brighton.co.id`,
    MetaKeyword: `${Property} ${Transaction} di ${Area} ${City}, brighton.co.id`,
    Content: "",
  };
}

export function dynamicAgentFallback(slug: string) {
  const name = capitalize(slug.replace(/-/g, " "));

  return {
    MetaTitle: `${name} | Agen Properti Brighton`,
    MetaDescription: `Profil agen properti ${name}. Temukan daftar properti terbaik dari agen Brighton.`,
    MetaKeyword: `${name}, agen brighton, agen properti brighton`,
    Content: "",
  };
}

function capitalize(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}
