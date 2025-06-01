export class ApiHelper {
    static baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337/api';
    static baseMediaUrl = process.env.NEXT_PUBLIC_UPLOAD_URL ?? 'http://localhost:1337/api';
    /**
     * Выполняет GET-запрос к API
     * @param path относительный путь, например: `/events`
     * @returns JSON-ответ
     */
    static async get<T>(path: string): Promise<T | null> {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      if (res.status === 404) return null;
  
      if (!res.ok) {
        throw new Error(`GET ${path} failed: ${res.status}`);
      }
  
      return res.json();
    }
  
    /**
     * Выполняет PUT-запрос к API
     * @param path относительный путь, например: `/events/1`
     * @param data объект, который будет отправлен как JSON
     * @returns JSON-ответ
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async put<T>(path: string, data: any): Promise<T> {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        throw new Error(`PUT ${path} failed: ${res.status}`);
      }
  
      return res.json();
    }
  
    /**
     * При необходимости можно расширить:
     * static post<T>(...), static delete(...)
     */
  }
  