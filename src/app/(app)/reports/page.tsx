import { getReports } from '@/actions/reports';
import { ReportsList } from '@/features/reports/list';
import { REPORTS_PAGE_SIZE } from '@/shared/constants/pagination';
import { OrderReportStatus } from '@prisma/client';

type ReportsPageProps = {
  searchParams: Promise<{
    status?: OrderReportStatus;
    search?: string;
    from?: string;
    to?: string;
  }>;
};

export default async function ReportsPage(props: ReportsPageProps) {
  const { searchParams } = props;
  const query = await searchParams;
  const status = Object.values(OrderReportStatus).find((value) => value === query.status);
  const { items, hasMore, now } = await getReports({
    offset: 0,
    take: REPORTS_PAGE_SIZE,
    status,
    search: query.search,
    from: query.from,
    to: query.to,
  });
  const listKey = [
    status ?? '',
    query.search ?? '',
    query.from ?? '',
    query.to ?? '',
    items[0]?.id ?? 'empty',
  ].join('-');

  return (
    <div className="page-stack flex-1">
      <ReportsList key={listKey} initialItems={items} initialHasMore={hasMore} initialNow={now} />
    </div>
  );
}
