export function getOrderReportStorageKey(input: {
  userId: string;
  orderId: string;
  reportId: string;
  version: number;
}) {
  const { userId, orderId, reportId, version } = input;

  return `orders/${userId}/${orderId}/reports/terms-v${version}-${reportId}.pdf`;
}

export function getOrderReportFileName(orderId: string, version: number) {
  return `order-${orderId}-terms-v${version}.pdf`;
}
