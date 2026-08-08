const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

function compressVideo(inputPath, outputPath, options = {}) {
    const {
        resolution = '1280x720',
        videoBitrate = 1000,
        audioBitrate = 128,
        codec = 'libx264',
    } = options;

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .videoCodec(codec)
            .size(resolution)
            .videoBitrate(videoBitrate)
            .audioBitrate(audioBitrate)
            .outputOptions(['-preset fast', '-movflags +faststart'])
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(new Error(`FFmpeg compression failed: ${err.message}`)))
            .save(outputPath);
    });
}

function generateThumbnail(videoPath, outputDir, options = {}) {
    const {
        timestamp = '00:00:02',
        filename = 'thumbnail.jpg',
        size = '640x360',
    } = options;

    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .screenshots({
                timestamps: [timestamp],
                filename,
                folder: outputDir,
                size,
            })
            .on('end', () => resolve(path.join(outputDir, filename)))
            .on('error', (err) => reject(new Error(`Thumbnail generation failed: ${err.message}`)));
    });
}

function getMediaInfo(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) return reject(new Error(`FFprobe failed: ${err.message}`));

            const video = metadata.streams.find((s) => s.codec_type === 'video');
            const audio = metadata.streams.find((s) => s.codec_type === 'audio');

            resolve({
                duration: metadata.format.duration || 0,
                size: metadata.format.size || 0,
                bitrate: metadata.format.bit_rate || 0,
                format: metadata.format.format_name || '',
                video: video
                    ? {
                        codec: video.codec_name,
                        width: video.width,
                        height: video.height,
                        fps: eval(video.r_frame_rate) || 0,
                    }
                    : null,
                audio: audio
                    ? {
                        codec: audio.codec_name,
                        sampleRate: audio.sample_rate,
                        channels: audio.channels,
                    }
                    : null,
            });
        });
    });
}

module.exports = {
    compressVideo,
    generateThumbnail,
    getMediaInfo,
};
