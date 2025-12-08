import AgentPageBase from "@/components/custom/PageAgent";
import { AgentParams } from "../../../../../types/agent-types";

interface PageProps {
  params: Promise<{ city: string }>;
  searchParams?: Promise<AgentParams>;
}

export default async function Page(props: PageProps) {
  const { params, searchParams } = await props;
  const { city } = await params;
  return <AgentPageBase citySlug={city} searchParams={searchParams} />;
}
