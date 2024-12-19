async function injectContent() {
  // Create container for shadow DOM
  const hostElement = document.createElement("div");
  hostElement.id = "bsky-extension-root";
  document.body.appendChild(hostElement);

  // Create shadow DOM
  const shadow = hostElement.attachShadow({ mode: "open" });

  // Add Tailwind styles first
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = chrome.runtime.getURL("styles/tailwind.css");

  // Wait for styles to load before adding content
  await new Promise((resolve) => {
    style.onload = resolve;
    shadow.appendChild(style);
  });

  // Fetch and inject HTML content
  const response = await fetch(chrome.runtime.getURL("content/content.html"));
  const html = await response.text();

  // Create container for the content
  const container = document.createElement("div");
  container.innerHTML = html;
  shadow.appendChild(container);
}

injectContent();
