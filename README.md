# Node.js RTSP Stream Server

Proof-of-concept project that uses `ffmpeg` as a bridge to stream video directly to an HTTP endpoint, bypassing clients that cannot consume RTSP natively. The server repeatedly pulls from a hard-coded source, transcodes it with `libx264`/`aac`, and exposes the result over HTTP (`http://127.0.0.1:8003`).

## How it works
- A minimal Node.js HTTP server answers incoming requests.
- `ffmpeg` runs as a child process, reads the source URL, and outputs Matroska (`.mkv`) packets to `stdout`.
- The HTTP response pipes that output straight to the client.

## Requirements
- [Node.js](https://nodejs.org/) >= 16
- [`ffmpeg`](https://ffmpeg.org/) installed and available in the `PATH`

Check that `ffmpeg` is present:

```bash
ffmpeg -version
```

## Run
1. (Optional) Install dependencies to set up the environment:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```
3. Open `http://127.0.0.1:8003` in an HTTP-capable player (e.g., `ffplay`, VLC, or even the browser) to validate the stream.

## Customize the video source
In `index.js`, update the `video` constant to point to your desired stream (local file, RTSP, HTTP, etc.):

```js
const video = 'rtsp://user:password@your-host/stream';
```
Restart the server after saving for the changes to take effect.
