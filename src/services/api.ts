import { API_URL } from "../config";
import { Jot } from "../models/jot";
import StorageService from "./storage";


interface IGetJotsResponse {
  message: string;
  jots: Jot[];
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
      body: JSON.stringify(data),
    });
    return res.json()
  }

  static async getJots(): Promise<Jot[]> {
    const data = await this.get<IGetJotsResponse>("/jots");
    return data.jots;
  }

  static async createJot(text: string): Promise<void> {
    return this.post("/jot", { text });
  }

  static async setTag(jotId: string, tag: string): Promise<void> {
    return this.post(`/jot/${jotId}/tag`, { tag });
  }

  static async getJot(jotId: string): Promise<Jot> {
    return this.get(`/jot/${jotId}`);
  }
}
