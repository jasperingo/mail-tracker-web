const HttpService = {
  async get(path: string, accessToken?: string) {
    const headers = new Headers();

    if (accessToken !== undefined) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const res = await fetch(`${process.env.API_URL}${path}`, {
      headers,
      method: 'GET',
    });

    if (!res.ok) {
      throw await this.error(res);
    }
  
    return res.json();
  },

  async getFile(path: string, accessToken?: string) {
    const headers = new Headers();

    if (accessToken !== undefined) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const res = await fetch(`${process.env.API_URL}${path}`, {
      headers,
      method: 'GET',
    });

    if (!res.ok) {
      throw await this.error(res);
    }
  
    return {
      headers: res.headers,
      body: await res.blob(),
    }
  },

  async mutate(
    path: string, 
    method: 'PUT' | 'POST' | 'DELETE', 
    form: any, 
    accessToken?: string,
    json = true,
  ) {
    const headers = new Headers();

    if (json) {
      headers.append('Content-Type', 'application/json');
    }

    if (accessToken !== undefined) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const res = await fetch(`${process.env.API_URL}${path}`, { 
      method, 
      headers,
      body: json ? JSON.stringify(form) : form,
    });

    if (!res.ok) {
      throw await this.error(res);
    }
  
    return res.json();
  },

  async error(res: Response) {
    return {
      status: res.status,
      body: await res.json(),
    }
  }
};

export default HttpService;
