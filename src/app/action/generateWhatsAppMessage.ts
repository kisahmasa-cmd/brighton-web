"use server";

import { generateCodeWA } from "./generateCodeWA";

interface GenerateWAProps {
  IDCode?: string;
  Title?: string;
  Link?: string;
  CustomMessage?: string;
  isAgent?: boolean;
  agentName?: string;
}

export async function generateWhatsAppMessage({ IDCode = "", Title = "", Link = "", CustomMessage, isAgent = false, agentName = "" }: GenerateWAProps) {
  // generate persistent code (from cookies)
  const code = await generateCodeWA();
  const fullID = `${IDCode}-${code}`;

  // =======================
  // 1. If custom message → replace placeholders
  // =======================
  if (CustomMessage) {
    return CustomMessage.replace("{IDCode}", fullID).replace("{Title}", Title).replace("{Link}", Link).replace("{AgentName}", agentName).trim();
  }

  // =======================
  // 2. Default AGEN message
  // =======================
  if (isAgent) {
    return `
Halo, Saya ${agentName} Brighton Real Estate, ingin menanyakan info mengenai properti ini: ${Link}. 
Apakah masih ada? Apa ada update terbaru? Terimakasih
    `.trim();
  }

  // =======================
  // 3. Default customer template
  // =======================
  return `
Hi, saya tertarik mengetahui informasi mengenai [${fullID}] ${Title}. 
Mohon informasinya terkait unit tersebut : ${Link}

_Hati-Hati Penipuan, Demi Keamanan Anda, Pastikan bertransaksi di kantor 
Brighton & menggunakan Perjanjian Resmi Brighton_
  `.trim();
}
