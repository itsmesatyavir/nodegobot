import axios from 'axios';
import fs from 'fs';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { HttpProxyAgent } from 'http-proxy-agent';
import chalk from 'chalk';

const tokens = fs.readFileSync('tokens.txt', 'utf-8').trim().split('\n');
const proxies = fs.existsSync('proxy.txt')
  ? fs.readFileSync('proxy.txt', 'utf-8').trim().split('\n')
  : [];

const userAgents = fs.existsSync('useragents.txt')
  ? fs.readFileSync('useragents.txt', 'utf-8').trim().split('\n')
  : ['Mozilla/5.0']; // Fallback

const getProxyAgent = (proxy) => {
  if (!proxy) return null;
  const url = proxy.startsWith('http') ? proxy : `http://${proxy}`;
  return {
    httpAgent: new HttpProxyAgent(url),
    httpsAgent: new HttpsProxyAgent(url)
  };
};

const makeRequest = async (method, url, token, proxy, data = null) => {
  try {
    const agent = getProxyAgent(proxy);
    const config = {
      method,
      url,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept': '*/*'
      },
      timeout: 30000,
      ...(data && { data }),
      ...(agent || {})
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    throw err.response?.statusText || err.message;
  }
};

const pingAccount = async (token, proxy) => {
  try {
    await makeRequest(
      'POST',
      'https://nodego.ai/api/user/nodes/ping',
      token,
      proxy,
      { type: 'extension' }
    );
    console.log(chalk.green(`[✓] Ping OK - Token: ${token.slice(0, 10)}...`));
  } catch (err) {
    console.log(chalk.red(`[✗] Token: ${token.slice(0, 10)}... Failed - ${err}`));
  }
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const runLoop = async () => {
  while (true) {
    console.log(chalk.yellow(`\n[${new Date().toLocaleTimeString()}] AirdropScriptFA Starting ping cycle`));
    for (let i = 0; i < tokens.length; i++) {
      await pingAccount(tokens[i], proxies[i]);
    }

    const waitTime = Math.floor(Math.random() * 120000) + 240000;
    console.log(chalk.cyan(`\nWaiting ${Math.floor(waitTime / 1000)}s before next cycle...`));
    await delay(waitTime);
  }
};

runLoop();
