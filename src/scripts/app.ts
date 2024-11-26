export default async function loadComponent(
  url: string,
  elementId: string,
): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
      console.log(`Component ${elementId} loaded successfully.`);
    } else {
      console.error(`Element with ID ${elementId} not found.`);
    }
  } catch (error) {
    console.error("Error loading component:", error);
  }
}