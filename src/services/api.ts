import { API_URL } from "../config";
import { IJot } from "../models/jot";
import StorageService from "./storage";


interface IGetJotsResponse {
  message: string;
  jots: IJot[];
}

export class API {
  static async get<T>(path: string): Promise<T> {
    const url = `${API_URL}${path}?pwd=${StorageService.getPassword()}`;
    const res = await fetch(url);
    return res.json()
  }

  static async post<T>(path: string, data: {}): Promise<T> {
    const url = `${API_URL}${path}?pwd=${StorageService.getPassword()}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json()
  }

  static async getJots(): Promise<IJot[]> {
    return this.get<IJot[]>("/jots");
  }

  static async createJot(text: string): Promise<void> {
    return this.post("/jot", { text });
  }

  static async addTag(jotId: string, tag: string): Promise<void> {
    return this.post(`/jot/${jotId}/tag`, { tag });
  }

  static async removeTag(jotId: string, tag: string): Promise<void> {
    return this.post(`/jot/${jotId}/tag/delete`, { tag });
  }

  static async getJot(jotId: string): Promise<IJot> {
    return this.get(`/jot/${jotId}`);
  }
}
