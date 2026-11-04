import { CalendarClock } from 'lucide-react';
import { AnimatedLink } from '@/shared/components/ui/actions/animated-link';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { EmptyList } from '@/shared/components/ui/feedback/empty-list';
import type { DashboardDeadline } from '@/shared/types/dashboard';
import { DeadlineItem } from './deadline-item';

type DeadlinesListProps = {
  deadlines: DashboardDeadline[];
};

export function DeadlinesList(props: DeadlinesListProps) {
  const { deadlines } = props;

  return (
    <SectionCard
      title="Ближайшие сроки"
      Icon={CalendarClock}
      action={
        <AnimatedLink href="/orders" className="text-muted-foreground text-xs">
          Все заказы
        </AnimatedLink>
      }
      className="p-4 sm:p-6"
    >
      <EmptyList items={deadlines} message="Срочных заказов сейчас нет">
        <ul>
          {deadlines.map((deadline) => (
            <DeadlineItem key={deadline.id} deadline={deadline} />
          ))}
        </ul>
      </EmptyList>
    </SectionCard>
  );
}
