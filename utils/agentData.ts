import { Agent } from "../types/agent-types";

export function getFirstAgent(agent: Agent | Agent[] | undefined) {
  if (!agent) return undefined;
  return Array.isArray(agent) ? agent[0] : agent;
}