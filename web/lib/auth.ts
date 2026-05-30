import { apiFetch } from "./api";

export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

export function signup(input: { name: string; email: string; password: string }) {
  return apiFetch<User>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function login(input: { email: string; password: string }) {
  return apiFetch<User>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function logout() {
  return apiFetch<void>("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiFetch<User>("/auth/me");
}
