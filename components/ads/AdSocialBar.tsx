'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147408.profitablecpmratenetwork.com/99/ec/9a/99ec9a4e66ac810b9b27775961365290.js", "https://pl29147410.profitablecpmratenetwork.com/18/15/84/181584658413802fabdb36867ec695d2.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
