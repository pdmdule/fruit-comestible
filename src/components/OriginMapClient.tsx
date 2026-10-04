'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import type { ProductOriginData } from '@/data/productOrigins';
import 'leaflet/dist/leaflet.css';
import { Navigation } from 'lucide-react';

interface OriginMapClientProps {
  origin: ProductOriginData;
  isSwissOrigin: boolean;
}

export default function OriginMapClient({
  origin,
  isSwissOrigin,
}: OriginMapClientProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Central processing & quality verification hub in Switzerland
  const swissGps: [number, number] = [46.8182, 8.2275];
  const startCoordinates: [number, number] =
    origin.coordinates || origin.gps || [46.8182, 8.2275];

  const fitRoute = useCallback(
    (animate = false) => {
      if (!mapInstanceRef.current) return;
      if (!isSwissOrigin) {
        mapInstanceRef.current.fitBounds([startCoordinates, swissGps], {
          padding: [45, 45],
          maxZoom: 6,
          animate,
        });
      } else {
        mapInstanceRef.current.setView(startCoordinates, origin.zoomLevel || 7.5, {
          animate,
        });
      }
    },
    [isSwissOrigin, startCoordinates, origin.zoomLevel, swissGps]
  );

  useEffect(() => {
    let isMounted = true;
    let resizeObserver: ResizeObserver | null = null;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current && (mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }

      // Initialize strictly static & stable Leaflet map (No drag, pan, pinch, or scroll zoom)
      const map = L.map(mapContainerRef.current, {
        center: isSwissOrigin ? startCoordinates : swissGps,
        zoom: isSwissOrigin ? origin.zoomLevel || 7.5 : 5,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Clean standard OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
      }).addTo(map);

      if (!isSwissOrigin) {
        // 1. Origin Marker with flag and pulse
        const originPulseIcon = L.divIcon({
          className: 'origin-marker-pulse',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;">
              <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background-color: rgba(225, 29, 72, 0.35); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background-color: rgba(225, 29, 72, 0.18);"></div>
              <div style="position: relative; width: 32px; height: 32px; border-radius: 50%; background-color: #ffffff; border: 2.5px solid #be123c; box-shadow: 0 4px 12px rgba(0,0,0,0.18); display: flex; align-items: center; justify-content: center; font-size: 15px;">
                ${origin.flag || '📍'}
              </div>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
          popupAnchor: [0, -20],
        });

        const originMarker = L.marker(startCoordinates, { icon: originPulseIcon }).addTo(map);
        originMarker.bindPopup(`
          <div style="font-family: inherit; padding: 4px 6px; min-width: 170px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
              <span style="font-size: 16px;">${origin.flag || '📍'}</span>
              <strong style="color: #1c1917; font-size: 12px; font-weight: 800;">${origin.region}</strong>
            </div>
            <div style="font-size: 11px; color: #57534e; line-height: 1.35;">
              ${origin.description || origin.harvestMethod || ''}
            </div>
            <div style="font-size: 10px; color: #be123c; font-weight: 700; margin-top: 3px;">
              📍 ${origin.country} · ${origin.harvestTime || origin.harvestSeason || ''}
            </div>
          </div>
        `, { closeButton: false });

        // 2. Fixed pulsing destination marker at Switzerland (fruit-comestible.ch)
        const swissPulseIcon = L.divIcon({
          className: 'swiss-marker-pulse',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;">
              <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background-color: rgba(225, 29, 72, 0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background-color: rgba(225, 29, 72, 0.2);"></div>
              <div style="position: relative; width: 32px; height: 32px; border-radius: 50%; background-color: #ffffff; border: 2.5px solid #be123c; box-shadow: 0 4px 12px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; font-size: 15px;">
                🇨🇭
              </div>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
          popupAnchor: [0, -20],
        });

        const swissMarker = L.marker(swissGps, { icon: swissPulseIcon }).addTo(map);
        swissMarker
          .bindPopup(
            `
            <div style="font-family: inherit; padding: 4px 6px; min-width: 190px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
                <span style="font-size: 16px;">🇨🇭</span>
                <strong style="color: #1c1917; font-size: 12px; font-weight: 800;">fruit-comestible.ch</strong>
              </div>
              <div style="font-size: 11px; color: #44403c; line-height: 1.35; font-weight: 600;">
                Qualitätskontrolle & Veredelung in der Schweiz
              </div>
            </div>
          `,
            { closeButton: false }
          )
          .openPopup();

        // 3. Animated dashed transport polyline to Switzerland
        L.polyline([startCoordinates, swissGps], {
          color: '#e11d48',
          weight: 2.5,
          dashArray: '7, 9',
          opacity: 0.85,
          className: 'route-animated-line',
          interactive: false,
        }).addTo(map);

        // Frame both harvest region and Switzerland
        map.fitBounds([startCoordinates, swissGps], {
          padding: [45, 45],
          maxZoom: 6,
          animate: false,
        });
      } else {
        // 100% Swiss Origin: Cultivation marker & Swiss focus
        const swissGrowerIcon = L.divIcon({
          className: 'swiss-grower-pulse',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;">
              <div style="position: absolute; width: 46px; height: 46px; border-radius: 50%; background-color: rgba(16, 185, 129, 0.35); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background-color: rgba(16, 185, 129, 0.2);"></div>
              <div style="position: relative; width: 34px; height: 34px; border-radius: 50%; background-color: #ffffff; border: 2.5px solid #059669; box-shadow: 0 4px 12px rgba(0,0,0,0.18); display: flex; align-items: center; justify-content: center; font-size: 16px;">
                🇨🇭
              </div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          popupAnchor: [0, -22],
        });

        const swissMarker = L.marker(startCoordinates, { icon: swissGrowerIcon }).addTo(map);
        swissMarker
          .bindPopup(
            `
            <div style="font-family: inherit; padding: 4px 6px; min-width: 180px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
                <span style="font-size: 16px;">🇨🇭</span>
                <strong style="color: #065f46; font-size: 12px; font-weight: 800;">100% Schweizer Anbau</strong>
              </div>
              <div style="font-size: 11px; color: #1c1917; font-weight: 700;">${origin.region}</div>
              <div style="font-size: 10px; color: #57534e; margin-top: 2px;">${origin.harvestMethod || 'Sorgfältige Handernte bei voller Reife'}</div>
            </div>
          `,
            { closeButton: false }
          )
          .openPopup();

        map.setView(startCoordinates, origin.zoomLevel || 7.5, { animate: false });
      }

      // Ensure proper sizing after DOM render
      const resizeAndFit = () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          if (!isSwissOrigin) {
            mapInstanceRef.current.fitBounds([startCoordinates, swissGps], {
              padding: [45, 45],
              maxZoom: 6,
              animate: false,
            });
          } else {
            mapInstanceRef.current.setView(startCoordinates, origin.zoomLevel || 7.5, {
              animate: false,
            });
          }
        }
      };

      setTimeout(resizeAndFit, 100);
      setTimeout(resizeAndFit, 400);

      // Handle container resizing
      if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          resizeAndFit();
        });
        resizeObserver.observe(mapContainerRef.current);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [origin, isSwissOrigin, fitRoute, swissGps, startCoordinates]);

  const handleRouteClick = () => {
    fitRoute(true);
  };

  return (
    <div className="relative w-full aspect-16/11 sm:aspect-16/10 rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm bg-stone-100">
      <style jsx global>{`
        @keyframes routeDash {
          to {
            stroke-dashoffset: -32;
          }
        }
        .route-animated-line {
          animation: routeDash 2.5s linear infinite !important;
        }
      `}</style>

      {/* Static Stable Map */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Sole Action Button / Badge: "Route nach CH" or "100% Schweizer Anbau" */}
      <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 pointer-events-none">
        {!isSwissOrigin ? (
          <button
            type="button"
            onClick={handleRouteClick}
            className="pointer-events-auto px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 text-stone-900 border border-stone-200/90 shadow-sm flex items-center gap-1.5 backdrop-blur-md hover:bg-stone-50 transition-all cursor-pointer group"
            title="Route nach Schweiz fokussieren"
          >
            <Navigation className="w-3.5 h-3.5 text-rose-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span>Route nach CH</span>
          </button>
        ) : (
          <div className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 text-emerald-800 border border-emerald-200/80 shadow-sm flex items-center gap-1.5 backdrop-blur-md">
            <span>🇨🇭</span>
            <span>100% Schweizer Anbau</span>
          </div>
        )}
      </div>

      {/* Clean Corner Indicator */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-stone-600 backdrop-blur-md border border-stone-200/70 shadow-2xs">
          {isSwissOrigin ? `🇨🇭 ${origin.region}` : `${origin.flag || '📍'} ${origin.region} → 🇨🇭 CH`}
        </span>
      </div>
    </div>
  );
}
