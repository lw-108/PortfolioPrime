import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from './firebase';

// ── Project shape (mirrors Firestore document fields) ──────────────────────
export interface Project {
  id?: string;
  name: string;
  category: string;
  tags: string[];
  image: string;       // local path e.g. "/works/ufaf.png" OR a Firebase Storage URL
  imageBg: string;
  url: string;
  year: string;
  description: string;
  order: number;       // controls display sort order (0, 1, 2…)
  published: boolean;  // dashboard toggle — false = hidden from portfolio
}

// ── Hook: fetches published projects ordered by `order` field ───────────────
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, 'projects'),
          where('published', '==', true),
          orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        if (cancelled) return;

        const data: Project[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, 'id'>),
        }));

        setProjects(data);
      } catch (err) {
        if (cancelled) return;
        console.error('[useProjects] Firestore fetch failed:', err);
        setError('Failed to load projects.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProjects();
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, error };
}

// Fallback legacy export to prevent build/reload failures on un-migrated code
export const projectsData: Project[] = [];

