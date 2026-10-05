import React from 'react';
import { Drawer } from '../ui/Drawer';
import { useAppStore } from '../../store';
import { Bell, CheckCircle2, AlertCircle, Package } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const { isNotificationsOpen, setNotificationsOpen, activities } = useAppStore();

  return (
    <Drawer
      isOpen={isNotificationsOpen}
      onClose={() => setNotificationsOpen(false)}
      title="Notifications & Activity"
      subtitle="Real-time events from code audits, build pipelines, and LG QA reviews"
      width="md"
    >
      <div className="space-y-4">
        {activities.map((act) => {
          const icon =
            act.category === 'Fixes' ? (
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
            ) : act.category === 'Builds' ? (
              <Package className="h-4 w-4 text-primary shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-info shrink-0" />
            );

          return (
            <div
              key={act.id}
              className="rounded-md border border-border bg-surface p-3.5 text-xs transition-colors hover:border-secondary"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 font-semibold text-app-text">
                  {icon}
                  <span>{act.title}</span>
                </div>
                <span className="font-mono text-[10px] text-muted shrink-0">{act.timeAgo}</span>
              </div>
              <p className="text-app-text-2 pl-6">{act.description}</p>
              <div className="mt-2 pl-6 text-[10px] font-mono text-muted">
                Actor: <span className="text-app-text">{act.user}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};
