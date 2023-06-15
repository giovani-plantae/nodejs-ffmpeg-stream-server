import http from 'http';
import { spawn } from 'child_process';

const port = 8003;
const video = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


function handleRequest(request, response) {

    const args = [
        '-i', video,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-f', 'matroska',
        'pipe:1'
    ];
    
    const ffmpeg = spawn('ffmpeg', args);

    response.setHeader('Content-Type', 'video/mp4');
    ffmpeg.stdout.pipe(response);
}

const server = http.createServer(handleRequest);

server.listen(port, () => {
    console.log(`Server started: http://127.0.0.1:${port}`);
});
