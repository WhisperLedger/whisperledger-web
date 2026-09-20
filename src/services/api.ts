const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  role: 'user' | 'household_admin' | 'platform_admin';
  is_active: boolean;
  household_id?: string;
  created_at: string;
}

export interface AdminMetrics {
  total_users: number;
  total_households: number;
  total_expenses_tracked: number;
  total_volume_tracked: number;
  total_receivables_pending: number;
  active_users_7_days: number;
  generated_at: string;
}

export interface OutflowSummary {
  total_outflow: number;
  true_personal_total: number;
  household_share_total: number;
  recoverable_total: number;
  category_breakdown: Record<string, number>;
}

export interface DebtResolution {
  from_user_id: string;
  from_user_name: string;
  to_user_id: string;
  to_user_name: string;
  amount: number;
}

class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('whisperledger_access_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  }

  async register(email: string, password: string, fullName: string) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: fullName }),
    });
    return res.json();
  }

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getHeaders(),
    });
    return res.json();
  }

  async getAdminMetrics(): Promise<{ success: boolean; data: AdminMetrics }> {
    const res = await fetch(`${API_BASE_URL}/admin/metrics`, {
      headers: this.getHeaders(),
    });
    return res.json();
  }

  async getAdminUsers(limit = 20, offset = 0): Promise<{ success: boolean; data: User[]; meta: { total: number } }> {
    const res = await fetch(`${API_BASE_URL}/admin/users?limit=${limit}&offset=${offset}`, {
      headers: this.getHeaders(),
    });
    return res.json();
  }

  async getMoneyLeaks() {
    const res = await fetch(`${API_BASE_URL}/detective/leaks`, {
      headers: this.getHeaders(),
    });
    return res.json();
  }

  async getSafeToSpend(budget = 50000) {
    const res = await fetch(`${API_BASE_URL}/detective/safe-to-spend?budget=${budget}`, {
      headers: this.getHeaders(),
    });
    return res.json();
  }
}

export const api = new ApiService();
