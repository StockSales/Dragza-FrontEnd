"use client";
import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker } from 'react-map-gl/maplibre';
import { useState } from 'react';

export default function MapSelector({ lat, lang, onChange }: {
    lat: string;
    lang: string;
    onChange: (lat: string, lng: string) => void;
}) {
    const [viewport, setViewport] = useState({
        latitude: parseFloat(lat) || 26.8206,
        longitude: parseFloat(lang) || 30.8025,
        zoom: 6,
    });

    const handleClick = (e: any) => {
        const lngLat = e.lngLat;
        setViewport({ ...viewport, latitude: lngLat.lat, longitude: lngLat.lng });
        onChange(lngLat.lat.toString(), lngLat.lng.toString());
    };

    return (
        <div className="w-full max-w-6xl mx-auto rounded-md overflow-hidden border border-gray-200 shadow-sm h-[450px]">
            <Map
                mapLib={import('maplibre-gl')}
                initialViewState={viewport}
                style={{ width: '100%', height: '100%' }}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                onClick={handleClick}
            >
                <Marker latitude={viewport.latitude} longitude={viewport.longitude} />
            </Map>
        </div>
    );
}