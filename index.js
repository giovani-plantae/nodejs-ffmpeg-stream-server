import http from 'http';
import { spawn } from 'child_process';
import { URL } from 'url';

const SERVER_PORT = 8000;
const DEFAULT_SOURCE = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    const source = requestUrl.searchParams.get('source') || DEFAULT_SOURCE;

    const ffmpeg = spawn('ffmpeg', [
        '-i', source,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-f', 'matroska',
        'pipe:1'
    ]);

    response.setHeader('Content-Type', 'video/mp4');
    ffmpeg.stdout.pipe(response);
});

server.listen(SERVER_PORT, () => {
    console.log(`Server running at http://127.0.0.1:${SERVER_PORT}`);
});
