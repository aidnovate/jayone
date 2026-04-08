"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

export type DashboardFilter = 'Today' | 'Month' | 'Year';

export interface DashboardStats {
  events: number;
  forms: number;
  admissions: number;
  blogs: number;
  formsTrend: { labels: string[]; data: number[] };
}

const Base_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jayone-87f0a69e6159.herokuapp.com/api';

export default function useDashboardStats(filter: DashboardFilter) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      axios.get(Base_URL + '/events'),
      axios.get(Base_URL + '/payments'),
      axios.get(Base_URL + '/applications'),
      axios.get(Base_URL + '/blogs'),
    ])
      .then(([eventsRes, formsRes, admissionsRes, blogsRes]) => {
        const now = new Date();

        // Helper to check if date is today/month/year
        function matchDate(dateStr: string, filter: DashboardFilter) {
          const d = new Date(dateStr);
          if (filter === 'Today') {
            return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
          }
          if (filter === 'Month') {
            return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
          }
          if (filter === 'Year') {
            return d.getFullYear() === now.getFullYear();
          }
          return true;
        }

        // Events
        const events = Array.isArray(eventsRes.data.data) ? eventsRes.data.data : [];
        const eventsCount = events.filter((e: any) => matchDate(e.createdAt || e.date, filter)).length;

        // Forms (payments)
        const forms = Array.isArray(formsRes.data.data) ? formsRes.data.data : [];
        const formsCount = forms.filter((f: any) => matchDate(f.createdAt, filter)).length;

        // Admissions (applications)
        const admissions = Array.isArray(admissionsRes.data.data) ? admissionsRes.data.data : [];
        const admissionsCount = admissions.filter((a: any) => matchDate(a.createdAt, filter)).length;

        // Blogs
        const blogs = Array.isArray(blogsRes.data.data) ? blogsRes.data.data : blogsRes.data;
        const blogsCount = blogs.filter((b: any) => matchDate(b.createdAt, filter)).length;

        // Forms Trend (by year, last 5 years)
        const currentYear = now.getFullYear();
        const years = Array.from({ length: 5 }, (_, i) => currentYear - i).reverse();
        const trendLabels = years.map(String);
        const trendData = years.map((y: number) => forms.filter((f: any) => new Date(f.createdAt).getFullYear() === y).length);

        setStats({
          events: eventsCount,
          forms: formsCount,
          admissions: admissionsCount,
          blogs: blogsCount,
          formsTrend: { labels: trendLabels, data: trendData },
        });
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load dashboard stats');
        setLoading(false);
      });
  }, [filter]);

  return { stats, loading, error };
}