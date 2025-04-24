import React, { useEffect, useRef } from 'react';
import Layout from '../components/Layout';

const ShadowDOM = () => {
  const shadowHostRef = useRef(null);
  const templateShadowRef = useRef(null);
  const nestedTemplateShadowRef = useRef(null);

  useEffect(() => {
    // First button functionality
    const firstButton = document.querySelector(".first-button");
    if (firstButton) {
      firstButton.addEventListener('click', () => {
        firstButton.textContent = 'First button';
      });
    }

    // Programmatic Shadow DOM creation
    if (shadowHostRef.current && !shadowHostRef.current.shadowRoot) {
      const shadow = shadowHostRef.current.attachShadow({ mode: 'open' });
      
      shadow.innerHTML = `
        <p>And this text is present inside a shadow DOM created with javascript.</p>
        <p>The page CSS also does not work here.</p>
        <button>No CSS here either</button>
      `;
      
      const button = shadow.querySelector('button');
      button.addEventListener('click', () => {
        button.textContent = 'Third button';
      });
    }

    // Create shadow DOM for template sections
    if (templateShadowRef.current && !templateShadowRef.current.shadowRoot) {
      const shadow = templateShadowRef.current.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <p>This text, however, is present inside a shadow DOM.</p>
        <p>As you can see, the page CSS does not work here, check the following button:</p>
        <button>But no CSS here :(</button>
      `;
      
      const button = shadow.querySelector('button');
      button.addEventListener('click', () => {
        button.textContent = 'Second button';
      });
    }

    // Create nested shadow DOM
    if (nestedTemplateShadowRef.current && !nestedTemplateShadowRef.current.shadowRoot) {
      const shadowRoot1 = nestedTemplateShadowRef.current.attachShadow({ mode: 'open' });
      shadowRoot1.innerHTML = `
        <p>This text is inside a different template shadow DOM.</p>
        <div id="nested-level-1"></div>
      `;
      
      const nested1 = shadowRoot1.getElementById('nested-level-1');
      const shadowRoot2 = nested1.attachShadow({ mode: 'open' });
      shadowRoot2.innerHTML = `
        <p>This one is a second level shadow DOM: inside a template that's inside the before mentioned template.</p>
        <div id="nested-level-2"></div>
      `;
      
      const nested2 = shadowRoot2.getElementById('nested-level-2');
      const shadowRoot3 = nested2.attachShadow({ mode: 'open' });
      shadowRoot3.innerHTML = `
        <p>And this one is third level shadow DOM.</p>
      `;
    }
  }, []);

  return (
    <Layout
      title="Shadow DOM"
      description="There are multiple different implementations of shadow DOMs with buttons that can be interacted with."
    >
      <div className="container text-center p-5">
        {/* Regular DOM section */}
        <div className="row m-4">
          <div className="col border p-3">
            <p>This text is present on the page outside of any shadow DOM.</p>
            <button type="button" className="btn btn-primary btn-modern first-button">
              We have CSS here!
            </button>
          </div>
        </div>

        {/* Template Shadow DOM */}
        <div className="row m-4">
          <div className="col border p-3" ref={templateShadowRef}></div>
        </div>

        {/* Programmatic Shadow DOM */}
        <div className="row m-4">
          <div className="col border p-3" ref={shadowHostRef}></div>
        </div>

        {/* Nested Shadow DOM */}
        <div className="row m-4">
          <div className="col border p-3" ref={nestedTemplateShadowRef}></div>
        </div>
      </div>
    </Layout>
  );
};

export default ShadowDOM;