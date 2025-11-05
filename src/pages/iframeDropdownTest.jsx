import React from "react";
import Layout from "../components/Layout";

const IframeDropdownTest = () => {
  const innerIframeSrc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inner Iframe</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      padding: 20px;
      background: white;
      min-height: 200px;
      margin: 0;
    }
    .form-group {
      margin: 10px 0;
    }
    .form-label {
      display: block;
      margin-bottom: 5px;
      font-weight: normal;
    }
    .input-with-dropdown {
      display: flex;
      width: 250px;
      border: 1px solid #ccc;
      background: white;
    }
    .input-with-dropdown input {
      flex: 1;
      border: none;
      padding: 6px 8px;
      outline: none;
    }
    .input-with-dropdown button {
      border: none;
      background: #f0f0f0;
      padding: 6px 10px;
      cursor: pointer;
      border-left: 1px solid #ccc;
    }
    .required::after {
      content: "*";
      color: red;
      margin-left: 3px;
    }
  </style>
</head>
<body 
  class="containerbody" 
  tabindex="-1" 
  scroll="auto" 
  onclick="console.log('Body onclick');"
  style="cursor: auto;">
  
  <div class="form-group">
    <label class="form-label required">Project type</label>
    <div class="input-with-dropdown">
      <input 
        type="text" 
        id="projectType" 
        name="projectType"
        placeholder=""
      />
      <button type="button" tabindex="-1" aria-label="Lookup">▼</button>
    </div>
  </div>
  
</body>
</html>`;

  const parentIframeSrc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Parent Iframe</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      padding: 20px;
      background: white;
      margin: 0;
    }
    label {
      display: block;
      margin: 10px 0 5px 0;
      font-weight: bold;
    }
    input, select {
      display: block;
      margin-bottom: 15px;
      padding: 8px;
      width: 250px;
    }
  </style>
</head>
<body 
  class="containerbody" 
  tabindex="-1" 
  scroll="auto" 
  onclick="console.log('Parent body onclick');"
  style="cursor: auto;">
  
  <label for="parentInput">Parent Input Label:</label>
  <input 
    id="parentInput" 
    name="parentInput" 
    type="text" 
    placeholder="Has a label" 
  />
  
  <label for="parentDropdown">Parent Dropdown Label:</label>
  <select id="parentDropdown" name="parentDropdown">
    <option value="">Choose...</option>
    <option value="a">Alpha</option>
    <option value="b">Beta</option>
    <option value="c">Gamma</option>
  </select>
  
  <iframe 
    srcdoc="${innerIframeSrc.replace(/"/g, '&quot;').replace(/\n/g, '')}" 
    style="width:100%; height:150px; border:1px solid #ccc;"
    title="inner-iframe"
  ></iframe>
  
</body>
</html>`;

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Iframe + Dropdown Test Page</h2>
        
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="outsideDropdown" style={{ fontWeight: "bold" }}>
            Outside Dropdown:
          </label>
          <select 
            id="outsideDropdown" 
            name="outsideDropdown"
            style={{ padding: "8px", marginTop: "5px", width: "250px" }}
          >
            <option value="">Select...</option>
            <option value="x">X Option</option>
            <option value="y">Y Option</option>
            <option value="z">Z Option</option>
          </select>
        </div>

        <div style={{ marginTop: "30px" }}>
          <iframe
            srcDoc={parentIframeSrc}
            style={{ 
              width: "100%", 
              height: "500px", 
              border: "2px solid #333",
              background: "white"
            }}
            title="parent-iframe"
          />
        </div>
      </div>
    </Layout>
  );
};

export default IframeDropdownTest;
