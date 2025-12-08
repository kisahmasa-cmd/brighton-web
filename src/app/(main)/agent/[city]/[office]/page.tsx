import AgentPageBase from "@/components/custom/PageAgent";
import { AgentParams } from "../../../../../../types/agent-types";

interface PageProps {
  params: Promise<{ city: string; office: string }>;
  searchParams?: Promise<AgentParams>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { city, office } = await params;
  return <AgentPageBase citySlug={city} officeSlug={office} searchParams={searchParams} />;
}
