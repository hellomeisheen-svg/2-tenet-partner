import { createFileRoute, redirect } from '@tanstack/react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const MOCK_LEADS = [
  { id: 1, name: 'Александр Иванов', phone: '+7 (900) 123-45-67', status: 'new', date: '2026-08-18 10:15', model: 'TENET T8' },
  { id: 2, name: 'Мария Петрова', phone: '+7 (911) 222-33-44', status: 'processed', date: '2026-08-17 18:30', model: 'TENET T7' },
];

export const Route = createFileRoute('/admin/')({
  loader: () => {
    throw redirect({
      to: '/admin/content',
    });
  },
});
