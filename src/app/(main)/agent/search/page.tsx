import AgentPageBase from "@/components/custom/PageAgent";
import { AgentParams } from "../../../../../types/agent-types";

interface PageProps {
  params: { city: string };
  searchParams?: Promise<AgentParams>;
}
export default async function Page({ params, searchParams }: PageProps) {
  return <AgentPageBase searchParams={searchParams} citySlug={params.city} />;
}
