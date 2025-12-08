import { GlossaryItem } from "../../../types/glossaries-types";
import { Glossaries } from "./Glossaries";

interface GlossariesWrapperProps {
  glossaryData?: GlossaryItem[];
}

export default function GlossariesWrapper({ glossaryData }: GlossariesWrapperProps) {
  return <Glossaries data={glossaryData ?? []} />;
}
