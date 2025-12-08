export default function SectionFallback({ title }: { title: string }) {
  return (
    <div className="w-full py-10 text-center text-gray-500">
      <p className="text-lg font-medium">{title} gagal ditampilkan.</p>
    </div>
  );
}
