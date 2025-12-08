import { Check } from "lucide-react";

interface DataItem {
  label: string;
}

interface Section {
  title: string;
  items: DataItem[];
}

interface DataChecklistProps {
  title: string;
  sections: Section[];
}

export default function DataChecklist({ title, sections }: DataChecklistProps) {
  const renderCheckItem = (item: DataItem) => (
    <div key={item.label} className="flex items-start gap-3 mb-3">
      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <span className="text-gray-800">{item.label}</span>
    </div>
  );

  const renderSection = (section: Section) => (
    <div key={section.title}>
      <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>{section.items.slice(0, Math.ceil(section.items.length / 2)).map(renderCheckItem)}</div>
        <div>{section.items.slice(Math.ceil(section.items.length / 2)).map(renderCheckItem)}</div>
      </div>
    </div>
  );

  return (
    <div className="container w-full max-w-7xl mx-auto p-6 bg-white">
      <div className="text-2xl font-bold text-gray-900 mb-6">{title}</div>
      <div className="bg-gray-50 rounded-lg p-6 space-y-8">{sections.map(renderSection)}</div>
    </div>
  );
}
