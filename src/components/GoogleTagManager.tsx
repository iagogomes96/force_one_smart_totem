import Script from 'next/script';
import { siteConfig } from '@/lib/site-config';

export function GoogleTagManager() {
  const containerId = siteConfig.analytics.gtmContainerId.trim();
  if (!/^GTM-[A-Z0-9]+$/i.test(containerId)) return null;

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          className="gtm-noscript"
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
