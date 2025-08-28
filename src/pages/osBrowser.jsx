import React, { useMemo } from 'react';
import Layout from '../components/Layout';
import '../styles/homePage.css';

const getBrowserInfo = () => {
  const ua = navigator.userAgent;

  let name = 'Unknown';
  let version = 'Unknown';

  if (/Edg\//.test(ua)) name = 'Microsoft Edge';
  else if (/OPR\//.test(ua) || /Opera/.test(ua)) name = 'Opera';
  else if (/Chrome\//.test(ua)) name = 'Chrome';
  else if (/Safari\//.test(ua) && /Version\//.test(ua)) name = 'Safari';
  else if (/Firefox\//.test(ua)) name = 'Firefox';
  else if (/MSIE|Trident\//.test(ua)) name = 'Internet Explorer';

  const versionMatch = ua.match(/(Edg|OPR|Chrome|Version|Firefox|MSIE|rv):?\/?([\d\.]+)/);
  if (versionMatch && versionMatch[2]) version = versionMatch[2];

  // Optionally refine using userAgentData.brands when available
  const brand = navigator.userAgentData?.brands?.[0]?.brand;
  if (brand) name = name === 'Unknown' ? brand : name;

  return { name, version };
};

const getOSInfo = () => {
  const ua = navigator.userAgent;
  // Prefer userAgentData.platform when available; otherwise, infer from UA
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

  return { name, platform };
};

const OsBrowser = () => {
  const browser = useMemo(getBrowserInfo, []);
  const os = useMemo(getOSInfo, []);

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
