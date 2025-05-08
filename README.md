<p align="center">
  <img src="https://github.com/itsmesatyavir.png" alt="Logo" width="100" />
</p>

# NodeGoBot

NodeGoBot is a Node.js-based automation bot designed to work with NodeGo. It supports multiple tokens and optional proxy support for flexible usage.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/itsmesatyavir/nodegobot.git
   cd nodegobot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Configuration

### 1. Tokens
Create a file named `tokens.txt`:
```bash
nano tokens.txt
```
Add your tokens, one per line. Example:
```
ehy1
ehy2
ehy3
```

> **Need tokens?** Use the [NodeGo AccessToken Extractor](https://greasyfork.org/en/scripts/535331-nodego-accesstoken-extractor) Greasemonkey/Tampermonkey script to get them easily.

### 2. Proxies (Optional)
Create a file named `proxy.txt` if you want to use proxies:
```bash
nano proxy.txt
```
Add one proxy per line in one of the following formats:
```
http://host:port
http://user:pass@host:port
```

## Usage

Start the bot using:
```bash
npm start
```
or
```bash
node main
```

## License

This project is for educational purposes only.
