"use client"

import React from "react";
import AgentCardContact from "@/components/custom/AgentCardContact";
import CardPropertyPrimaryWithoutContact from "@/components/custom/CardPropertyPrimaryWithoutContact";
import {Agent} from "../../../types/agent-types";
import {Property} from "../../../types/property-types";
import {getFirstAgent} from "../../../utils/agentData";
import Link from "next/link";

interface PropertySidebarProps {
  agents: Agent | Agent[],
  relatedProperties?: Property[],
  property: Property
}

const renderSingleAgent = (data: Agent | Agent[], property: Property) => {
  const agent = getFirstAgent(data);

  if (agent) {
    return <AgentCardContact key={agent.ID} agent={agent} property={property}/>
  }

  return false;
}

const PropertySidebar = ({agents, relatedProperties, property}: PropertySidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Agents */}
      <div className="space-y-4">
        {Array.isArray(agents) ? (
          agents.map((agent: Agent) => (
            <AgentCardContact key={agent.ID} agent={agent} property={property}/>
          ))
        ) : (
          renderSingleAgent(agents, property)
        )}

        <p className="w-full p-4 text-xs border-2 border-gray-200 rounded-xl">
          <span>Dengan klik tombol kontak, Pengguna setuju dengan </span>
          <Link href={{
            pathname: '/syarat-dan-ketentuan',
            query: {locale: 'id_ID'}
          }} target="_blank" rel="noopener noreferrer" className="font-bold">Syarat Pengguna</Link>
          <span> dan </span>
          <Link href={{
            pathname: '/kebijakan-privasi',
            query: {locale: 'id_ID'}
          }} target="_blank" rel="noopener noreferrer" className="font-bold">Kebijakan Privasi</Link>
        </p>
      </div>

      {/* Related Properties */}
      {relatedProperties && relatedProperties.length > 0 && (
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Properti Lainnya
          </h2>
          <div className="space-y-4">
            {relatedProperties.map((item, index) => (
              <CardPropertyPrimaryWithoutContact key={index} data={item}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySidebar;
