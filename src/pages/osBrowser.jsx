import React, { useMemo, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/homePage.css';

const getBrowserInfo = () => {
  const ua = navigator.userAgent;

  let name = 'Unknown';
  let version = 'Unknown';

  if (/Edg\//.test(ua)) name = 'Microsoft Edge';
  else if (/Vivaldi/i.test(ua)) name = 'Vivaldi';
  else if (/OPR\//.test(ua) || /Opera/i.test(ua)) name = 'Opera';
  else if (/Chrome\//.test(ua)) name = 'Chrome';
  else if (/Safari\//.test(ua) && /Version\//.test(ua)) name = 'Safari';
  else if (/Firefox\//.test(ua)) name = 'Firefox';
  else if (/MSIE|Trident\//.test(ua)) name = 'Internet Explorer';

  const versionMatch = ua.match(/(Edg|OPR|Chrome|Version|Firefox|MSIE|rv):?\/?([\d\.]+)/);
  if (versionMatch && versionMatch[2]) version = versionMatch[2];

  const brand = navigator.userAgentData?.brands?.[0]?.brand;
  if (brand && name === 'Unknown') name = brand;

  return { name, version };
};

const parseOsVersionFromUA = (ua) => {
  // Android 13; Pixel 6 -> Android 13
  const android = ua.match(/Android\s([\d._]+)/);
  if (android) return android[1].replace(/_/g, '.');
  // iOS: like CPU iPhone OS 16_5 or CPU OS 15_7
  const ios = ua.match(/OS\s([\d_]+)\slike\sMac\sOS\sX|iPhone\sOS\s([\d_]+)/);
  if (ios) return (ios[1] || ios[2]).replace(/_/g, '.');
  return undefined;
};

const getOSInfo = () => {
  const ua = navigator.userAgent;
  const platform = navigator.userAgentData?.platform ||
    (/(Windows|Macintosh|Linux|Android|iPhone|iPad|iPod)/.exec(ua)?.[0]) || 'Unknown';

  let name = 'Unknown';
  if (/Windows NT 10\.0/.test(ua)) name = 'Windows 10/11';
  else if (/Windows NT 6\.3/.test(ua)) name = 'Windows 8.1';
  else if (/Windows NT 6\.2/.test(ua)) name = 'Windows 8';
  else if (/Windows NT 6\.1/.test(ua)) name = 'Windows 7';
  else if (/Mac OS X/.test(ua)) name = 'macOS';
  else if (/Android/.test(ua)) name = 'Android';
  else if (/(iPhone|iPad|iPod)/.test(ua)) name = 'iOS';
  else if (/Linux/.test(ua)) name = 'Linux';

  // Prefer platformVersion (UA-CH) over UA parsing
  const uaChVersion = navigator.userAgentData?.platformVersion; // ex: "14.0.0"
  const uaParsedVersion = (ua.match(/Android\s([\d._]+)/)?.[1] || ua.match(/OS\s([\d_]+)/)?.[1])?.replace(/_/g, '.');

  const version = uaChVersion || uaParsedVersion || 'Unknown';
  return { name, platform, version };
};

const OsBrowser = () => {
  const browser = useMemo(getBrowserInfo, []);
  const os = useMemo(getOSInfo, []);
  const [deviceModel, setDeviceModel] = useState('Unavailable');
  const [platformVersion, setPlatformVersion] = useState(os.version || 'Unknown');

  useEffect(() => {
    // Try high-entropy UA-CH for model and platformVersion on supporting browsers (Chromium on Android)
    const uad = navigator.userAgentData;
    if (uad?.getHighEntropyValues) {
      uad.getHighEntropyValues(['platform', 'platformVersion', 'model'])
        .then((hints) => {
          if (hints.model) setDeviceModel(hints.model);
          if (hints.platformVersion) setPlatformVersion(hints.platformVersion);
        })
        .catch(() => {});
    }
  }, [os.version]);

  return (
    <Layout
      title="OS & Browser Validation"
      description="Detect the operating system and browser details from the current client."
    >
      <div className="card-grid osb-grid">
        <div className="modern-card">
          <h2>Operating System</h2>
          <div className="info-block">
            <p><b>Name:</b> {os.name}</p>
            <p><b>Platform:</b> {os.platform}</p>
            <p><b>Version:</b> {platformVersion}</p>
            <p><b>Device model:</b> {deviceModel}</p>
          </div>
        </div>
        <div className="modern-card">
          <h2>Browser</h2>
          <div className="info-block">
            <p><b>Name:</b> {browser.name}</p>
            <p><b>Version:</b> {browser.version}</p>
            <details style={{marginTop: '1rem'}}>
              <summary>User Agent</summary>
              <pre style={{whiteSpace: 'pre-wrap'}}>{navigator.userAgent}</pre>
            </details>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OsBrowser;
