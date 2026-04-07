const DEFAULT_API_BASE_URL = "https://hmc-holding-mail.vercel.app/api";

function normalizeApiBaseUrl(value) {
  const trimmedValue = String(value || "").trim().replace(/\/$/, "");

  if (!trimmedValue) {
    return DEFAULT_API_BASE_URL;
  }

  return trimmedValue.endsWith("/api")
    ? trimmedValue
    : `${trimmedValue}/api`;
}

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

function buildUrl(path) {
  return `${API_BASE_URL}${path}`;
}

async function postJson(path, payload) {
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}

export function submitServiceInquiry(payload) {
  return postJson("/inquiries/service", payload);
}

export function submitContactInquiry(payload) {
  return postJson("/inquiries/contact", payload);
}

export function submitCalculatorInquiry(payload) {
  return postJson("/inquiries/calculator", payload);
}

export function submitLegalInquiry(payload) {
  return postJson("/inquiries/legal", payload);
}

export function submitProjectsMapInquiry(payload) {
  return postJson("/inquiries/projects-map", payload);
}
