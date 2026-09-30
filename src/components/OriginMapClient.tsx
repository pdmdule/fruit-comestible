'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { ProductOriginInfo } from '@/lib/productOrigins';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  Navigation,
  Layers,
  Mountain,
} from 'lucide-react';

interface OriginMapClientProps {
  origin: ProductOriginInfo;
  isSwissOrigin: boolean;
}

export default function OriginMapClient({
  origin,
  isSwissOrigin,
}: OriginMapClientProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const [activeView, setActiveView] = useState<'origin' | 'switzerland' | 'route'>('origin');
  const [mapLayer, setMapLayer] = useState<'osm' | 'topo'>('osm');

  const swissGps: [number, number] = [47.3769, 8.5417];

  // Initialize Leaflet Map on mount or origin update
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

      // Initialize Leaflet map centered directly on currently loaded product's origin country
      const map = L.map(mapContainerRef.current, {
        center: origin.gps,
        zoom: origin.zoomLevel || 7,
        scrollWheelZoom: false, // Prevent accidental scrolling when page scrolls
        zoomControl: false, // We render custom modern zoom controls
      });

      mapInstanceRef.current = map;

      // 100% Free & Open-Source OpenStreetMap Tile Layer (QGIS standard layer, zero API keys, zero cost)
      const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const tileLayer = L.tileLayer(osmUrl, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> (QGIS Open-Source)',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19,
        className: 'osm-custom-tiles',
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Custom pulsing HTML Pin Marker for Fruit Origin
      const pulseIcon = L.divIcon({
        className: 'origin-marker-container',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;">
            <div style="position: absolute; width: 46px; height: 46px; border-radius: 50%; background-color: rgba(225, 29, 72, 0.35); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background-color: rgba(225, 29, 72, 0.18);"></div>
            <div style="position: relative; width: 34px; height: 34px; border-radius: 50%; background-color: #ffffff; border: 2.5px solid #be123c; box-shadow: 0 4px 12px rgba(0,0,0,0.18); display: flex; align-items: center; justify-content: center; font-size: 16px;">
              ${origin.flag}
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22],
      });

      const originMarker = L.marker(origin.gps, { icon: pulseIcon }).addTo(map);

      originMarker
        .bindPopup(
          `
          <div style="font-family: inherit; padding: 4px 6px; min-width: 170px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="font-size: 17px;">${origin.flag}</span>
              <strong style="color: #1c1917; font-size: 13px; font-weight: 800;">${origin.region}</strong>
            </div>
            <div style="font-size: 11px; color: #57534e; line-height: 1.4;">
              ${origin.harvestMethod}
            </div>
            <div style="font-size: 10px; color: #be123c; font-weight: 700; margin-top: 4px;">
              📍 ${origin.country}
            </div>
          </div>
        `,
          { closeButton: false }
        )
        .openPopup();

      // Ensure view is explicitly centered and zoomed on currently loaded product's country
      map.setView(origin.gps, origin.zoomLevel || 7);
      setActiveView('origin');

      // Destination in Switzerland & Transport Polyline (ready for route inspection)
      if (!isSwissOrigin) {
        const swissIcon = L.divIcon({
          className: 'swiss-marker-container',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px;">
              <div style="width: 30px; height: 30px; border-radius: 50%; background-color: #ffffff; border: 2px solid #1c1917; box-shadow: 0 3px 10px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; font-size: 14px;">
                🇨🇭
              </div>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -16],
        });

        const swissMarker = L.marker(swissGps, { icon: swissIcon }).addTo(map);
        swissMarker.bindPopup(`
          <div style="font-family: inherit; padding: 4px 6px;">
            <strong style="color: #1c1917; font-size: 12px; font-weight: 800;">🇨🇭 Fruit Comestible Suisse</strong>
            <div style="font-size: 11px; color: #57534e;">Zentrale Veredelung & Postversand</div>
          </div>
        `);

        // Dashed connection polyline
        L.polyline([origin.gps, swissGps], {
          color: '#e11d48',
          weight: 2.5,
          dashArray: '6, 8',
          opacity: 0.85,
        }).addTo(map);
      }

      // Invalidate map size after rendering to prevent grey tiles or misalignments
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 100);
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 400);

      // Observe container resize
      if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
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
  }, [origin, isSwissOrigin]);

  // Handle Layer Toggle: OpenStreetMap vs OpenTopoMap (Both 100% Free & Open-Source)
  const handleToggleLayer = async (layerType: 'osm' | 'topo') => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const L = (await import('leaflet')).default;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    if (layerType === 'topo') {
      const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://opentopomap.org" target="_blank" rel="noreferrer">OpenTopoMap</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 17,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = topoLayer;
    } else {
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> (QGIS Open-Source)',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = osmLayer;
    }

    setMapLayer(layerType);
  };

  // Map Navigation Actions
  const handleFlyToOrigin = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(origin.gps, origin.zoomLevel || 8, {
      duration: 1.2,
    });
    setActiveView('origin');
  };

  const handleFlyToSwitzerland = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([46.8182, 8.2275], 8, {
      duration: 1.2,
    });
    setActiveView('switzerland');
  };

  const handleFitRoute = () => {
    if (!mapInstanceRef.current) return;
    if (mapInstanceRef.current.fitBounds) {
      mapInstanceRef.current.fitBounds([origin.gps, swissGps], {
        padding: [50, 50],
        maxZoom: 7,
      });
      setActiveView('route');
    }
  };

  const handleZoomIn = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.zoomOut();
  };

  return (
    <div className="relative w-full aspect-16/11 sm:aspect-16/10 rounded-2xl overflow-hidden border border-stone-200/80 shadow-inner bg-stone-100">
      {/* Real Leaflet Map Container with 100% Free OpenStreetMap / OpenTopoMap tiles */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={handleFlyToOrigin}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
              activeView === 'origin'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white/95 text-stone-800 hover:bg-white border border-stone-200/80'
            }`}
          >
            <span>{origin.flag}</span>
            <span>{origin.country}</span>
          </button>

          {!isSwissOrigin && (
            <button
              type="button"
              onClick={handleFitRoute}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
                activeView === 'route'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'bg-white/95 text-stone-800 hover:bg-white border border-stone-200/80'
              }`}
            >
              <Navigation className="w-3 h-3 text-rose-500" />
              <span>Route nach CH</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleFlyToSwitzerland}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
              activeView === 'switzerland'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white/95 text-stone-800 hover:bg-white border border-stone-200/80'
            }`}
          >
            <span>🇨🇭</span>
            <span>Schweiz</span>
          </button>
        </div>

        {/* Layer Selector (OSM Standard vs OpenTopoMap Relief) & Zoom */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Layer switcher: OSM vs Topo */}
          <div className="flex items-center bg-white/95 backdrop-blur-md p-1 rounded-xl border border-stone-200/80 shadow-xs">
            <button
              type="button"
              onClick={() => handleToggleLayer('osm')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                mapLayer === 'osm'
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Standard OpenStreetMap (QGIS-Standard)"
            >
              <Layers className="w-3 h-3" />
              <span>OSM</span>
            </button>
            <button
              type="button"
              onClick={() => handleToggleLayer('topo')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                mapLayer === 'topo'
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="OpenTopoMap Reliefterrain (QGIS-Topografie)"
            >
              <Mountain className="w-3 h-3" />
              <span>Topo</span>
            </button>
          </div>

          {/* Zoom In/Out */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-stone-200/80 shadow-xs">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Vergrössern"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-700 hover:bg-stone-100 transition cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-3.5 bg-stone-200" />
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Verkleinern"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-700 hover:bg-stone-100 transition cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Indicator: 100% Free Open-Source */}
      <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/95 text-stone-700 backdrop-blur-md border border-stone-200/70 shadow-2xs">
          🌿 100% Free & Open-Source Geodaten (OpenStreetMap / QGIS)
        </span>
      </div>
    </div>
  );
}
