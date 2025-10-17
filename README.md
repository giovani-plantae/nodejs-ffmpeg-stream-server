# 🎥 Node.js RTSP Stream Server

Minimal proof-of-concept server that uses [`ffmpeg`](https://ffmpeg.org/) as a bridge to expose RTSP or other video sources over a standard HTTP endpoint.
This allows clients that cannot natively consume RTSP streams (e.g. browsers) to receive live transcoded video through HTTP.

## ⚙️ How It Works

* A lightweight **Node.js HTTP server** handles incoming requests on port `8003`.
* On each request, the server spawns an `ffmpeg` process that:

  * Pulls the input stream from a configurable source (RTSP, HTTP, or local file).
  * Transcodes it using `libx264` for video and `aac` for audio.
  * Outputs a continuous **Matroska (MKV)** stream to `stdout`.
* The `stdout` is piped directly to the HTTP response, effectively streaming video to the client in real time.

## 🧩 Requirements

* [Node.js](https://nodejs.org/) **v16 or later**
* [`ffmpeg`](https://ffmpeg.org/) installed and accessible via system `PATH`

Verify your installation:

```bash
ffmpeg -version
```

## 🚀 Run the Server

1. (Optional) Prepare your environment:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node index.js
   ```

3. Access the stream using any HTTP-capable video player:
   ```
   http://127.0.0.1:8003
   ```

   Example clients:

   * **Browser** (simple playback)
   * **ffplay**
     ```bash
     ffplay http://127.0.0.1:8003
     ```

## 🎛 Customize the Source

You can override the video source dynamically or via code:

### 1. Using Query Parameter

```bash
http://127.0.0.1:8003?source=rtsp://user:password@your-host/stream
```

### 2. Using Hard-Coded Default

In `index.js`, adjust the fallback constant:

```js
const DEFAULT_SOURCE = 'rtsp://user:password@your-host/stream';
```

Restart the server to apply the change.

## ⚠️ Note

This project is **not intended for production use**. It omits buffering, reconnection, and error handling logic for the sake of simplicity.
