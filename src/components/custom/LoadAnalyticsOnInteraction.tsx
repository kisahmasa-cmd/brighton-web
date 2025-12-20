"use client";

import { useEffect, useState } from "react";

export default function LoadAnalyticsOnInteraction({
  gtmId,
  gaId,
}: {
  gtmId: string;
  gaId: string;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const load = () => {
      if (loaded) return;
      setLoaded(true);

      /* =========================
         1. Inject GTM Script
         ========================= */
      const gtm = document.createElement("script");
      gtm.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtm);

      /* =========================
         2. Inject GA4 Script
         ========================= */
      const ga = document.createElement("script");
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      ga.async = true;
      document.head.appendChild(ga);

      const gaInit = document.createElement("script");
      gaInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          send_page_view: true
        });
      `;
      document.head.appendChild(gaInit);

      /* =========================
         3. Inject <noscript> GTM
         ========================= */
      const noscript = document.createElement("noscript");
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.appendChild(noscript);
    };

    /* ===================================
       EVENT LISTENER PALING LENGKAP
       =================================== */
    window.addEventListener("scroll", load, { once: true });
    window.addEventListener("click", load, { once: true });
    window.addEventListener("mousemove", load, { once: true });
    window.addEventListener("touchstart", load, { once: true });

    /* OPTIONAL: fallback force load after 5 seconds 
    */
    // const timeout = setTimeout(() => {
    //   if (!loaded) load();
    // }, 5000);

    return () => {
      window.removeEventListener("scroll", load);
      window.removeEventListener("click", load);
      window.removeEventListener("mousemove", load);
      window.removeEventListener("touchstart", load);
    //   clearTimeout(timeout);
    };
  }, [loaded, gtmId, gaId]);

  return null;
}
