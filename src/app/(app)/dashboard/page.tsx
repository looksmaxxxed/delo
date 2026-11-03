import { getDashboardData } from '@/actions/dashboard';
import { Dashboard } from '@/features/dashboard';

type DashboardPageProps = {
  searchParams: Promise<{
    period?: string | string[];
    from?: string | string[];
    to?: string | string[];
  }>;
};

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DashboardPage(props: DashboardPageProps) {
  const { searchParams } = props;
  const query = await searchParams;
  const data = await getDashboardData({
    period: getSearchParam(query.period),
    from: getSearchParam(query.from),
    to: getSearchParam(query.to),
  });

  return <Dashboard data={data} />;
}
