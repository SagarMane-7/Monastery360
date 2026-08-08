const IIIF_BASE = process.env.IIIF_BASE_URL || 'https://iiif.example.com/iiif/2';

function buildImageUrl(identifier, options = {}) {
    const {
        region = 'full',
        size = 'max',
        rotation = '0',
        quality = 'default',
        format = 'jpg',
    } = options;

    return `${IIIF_BASE}/${encodeURIComponent(identifier)}/${region}/${size}/${rotation}/${quality}.${format}`;
}

function getThumbnail(identifier, width = 300) {
    return buildImageUrl(identifier, { size: `${width},` });
}

function buildManifest({ id, label, items = [] }) {
    return {
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        id,
        type: 'Manifest',
        label: { en: [label] },
        items: items.map((item, index) => ({
            id: `${id}/canvas/${index}`,
            type: 'Canvas',
            width: item.width || 1024,
            height: item.height || 768,
            items: [
                {
                    id: `${id}/canvas/${index}/page`,
                    type: 'AnnotationPage',
                    items: [
                        {
                            id: `${id}/canvas/${index}/page/annotation`,
                            type: 'Annotation',
                            motivation: 'painting',
                            body: {
                                id: buildImageUrl(item.identifier),
                                type: 'Image',
                                format: 'image/jpeg',
                                width: item.width || 1024,
                                height: item.height || 768,
                                service: [
                                    {
                                        id: `${IIIF_BASE}/${encodeURIComponent(item.identifier)}`,
                                        type: 'ImageService2',
                                        profile: 'level2',
                                    },
                                ],
                            },
                            target: `${id}/canvas/${index}`,
                        },
                    ],
                },
            ],
        })),
    };
}

function getRegionUrl(identifier, x, y, w, h, size = 'max') {
    return buildImageUrl(identifier, { region: `${x},${y},${w},${h}`, size });
}

function getSizedUrl(identifier, width) {
    return buildImageUrl(identifier, { size: `${width},` });
}

module.exports = {
    buildImageUrl,
    getThumbnail,
    getRegionUrl,
    getSizedUrl,
    buildManifest,
};
