const IIIF_BASE = import.meta.env.VITE_IIIF_BASE_URL || 'http://localhost:8182/iiif/2';

export function buildIiifUrl(identifier, options = {}) {
    const {
        region = 'full',
        size = 'max',
        rotation = '0',
        quality = 'default',
        format = 'jpg',
    } = options;

    return `${IIIF_BASE}/${encodeURIComponent(identifier)}/${region}/${size}/${rotation}/${quality}.${format}`;
}

export function getIiifThumbnail(identifier, width = 300) {
    return buildIiifUrl(identifier, { size: `${width},` });
}

export function getIiifImage(identifier, width = 1200) {
    return buildIiifUrl(identifier, { size: `${width},` });
}

export function getIiifRegion(identifier, x, y, w, h, size = 'max') {
    return buildIiifUrl(identifier, { region: `${x},${y},${w},${h}`, size });
}
