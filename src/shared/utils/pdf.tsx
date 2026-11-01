import 'server-only';

import path from 'node:path';
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from '@react-pdf/renderer';
import { PAYMENT_METHOD_OPTIONS_MAP } from '@/shared/constants/payments';
import type { OrderReportSnapshot } from '@/shared/types/order-reports';
import { formatDate, formatPrice } from '@/shared/utils/format';

const regularFontPath = path.join(process.cwd(), 'src/assets/fonts/roboto-regular.ttf');
const boldFontPath = path.join(process.cwd(), 'src/assets/fonts/roboto-bold.ttf');
const logoPath = path.join(process.cwd(), 'src/assets/images/delo-logo-light.png');

const PDF_COLORS = {
  foreground: '#111113',
  softForeground: '#343438',
  primary: '#7c3aed',
  primaryDark: '#4b2bf3',
  mutedForeground: '#73737c',
  border: '#dddde3',
  subtleBorder: '#ececf0',
  white: '#ffffff',
} as const;

Font.register({
  family: 'Roboto',
  fonts: [
    { src: regularFontPath, fontWeight: 400 },
    { src: boldFontPath, fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingRight: 44,
    paddingBottom: 58,
    paddingLeft: 44,
    backgroundColor: PDF_COLORS.white,
    color: PDF_COLORS.foreground,
    fontFamily: 'Roboto',
    fontSize: 9,
    lineHeight: 1.45,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 76,
    height: 26,
    objectFit: 'contain',
  },
  documentMeta: {
    alignItems: 'flex-end',
  },
  documentType: {
    color: PDF_COLORS.mutedForeground,
    fontSize: 6.8,
    letterSpacing: 0.8,
  },
  confirmationStatus: {
    marginTop: 3,
    color: PDF_COLORS.primaryDark,
    fontSize: 7.2,
    fontWeight: 700,
  },
  brandAccent: {
    width: 44,
    height: 3,
    marginTop: 29,
    marginBottom: 15,
    backgroundColor: PDF_COLORS.primary,
  },
  title: {
    maxWidth: 390,
    fontSize: 27,
    fontWeight: 700,
    lineHeight: 1.08,
  },
  description: {
    maxWidth: 390,
    marginTop: 10,
    color: PDF_COLORS.softForeground,
    fontSize: 10,
    lineHeight: 1.45,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 27,
    paddingTop: 13,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: PDF_COLORS.border,
  },
  orderMeta: {
    width: 155,
  },
  versionMeta: {
    width: 70,
  },
  confirmationMeta: {
    width: 170,
  },
  label: {
    color: PDF_COLORS.mutedForeground,
    fontSize: 7.2,
    letterSpacing: 0.45,
  },
  metaValue: {
    marginTop: 4,
    fontSize: 9.2,
  },
  detailsGrid: {
    flexDirection: 'row',
    marginTop: 27,
  },
  parametersColumn: {
    width: '50%',
    paddingRight: 24,
  },
  partiesColumn: {
    width: '50%',
    paddingLeft: 24,
    borderLeftWidth: 1,
    borderLeftColor: PDF_COLORS.border,
  },
  sectionKicker: {
    color: PDF_COLORS.mutedForeground,
    fontSize: 6.8,
    letterSpacing: 0.8,
  },
  detailGroup: {
    marginTop: 13,
  },
  detailGroupSpaced: {
    marginTop: 14,
  },
  detailValue: {
    marginTop: 4,
    fontSize: 9.4,
  },
  partyName: {
    marginTop: 4,
    fontSize: 9.4,
    fontWeight: 700,
  },
  partyDetail: {
    marginTop: 2,
    color: PDF_COLORS.mutedForeground,
    fontSize: 8,
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 9,
    fontSize: 13,
    fontWeight: 700,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingRight: 9,
    paddingBottom: 7,
    paddingLeft: 9,
    borderTopWidth: 1,
    borderColor: PDF_COLORS.border,
  },
  tableIndex: {
    width: 28,
  },
  tableHeaderText: {
    color: PDF_COLORS.mutedForeground,
    fontSize: 7,
  },
  tableContent: {
    flexGrow: 1,
  },
  tablePrice: {
    width: 82,
    textAlign: 'right',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 11,
    paddingRight: 9,
    paddingBottom: 11,
    paddingLeft: 9,
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.subtleBorder,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemIndex: {
    width: 28,
    color: PDF_COLORS.primary,
    fontSize: 8,
  },
  itemContent: {
    flexGrow: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 9.5,
    fontWeight: 700,
  },
  itemDescription: {
    marginTop: 3,
    color: PDF_COLORS.mutedForeground,
    fontSize: 8,
  },
  itemPrice: {
    width: 82,
    fontSize: 9.5,
    fontWeight: 700,
    textAlign: 'right',
  },
  total: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 13,
    borderTopWidth: 2,
    borderTopColor: PDF_COLORS.foreground,
  },
  workTerms: {
    width: 300,
  },
  workTermsValue: {
    marginTop: 4,
    color: PDF_COLORS.softForeground,
    fontSize: 8.5,
  },
  totalContent: {
    alignItems: 'flex-end',
  },
  totalValue: {
    marginTop: 3,
    color: PDF_COLORS.primaryDark,
    fontSize: 20,
    fontWeight: 700,
  },
  notice: {
    position: 'absolute',
    right: 44,
    bottom: 24,
    left: 44,
  },
  noticeText: {
    color: PDF_COLORS.mutedForeground,
    fontSize: 7.2,
    lineHeight: 1.45,
  },
});

function renderDate(value: string | null) {
  return value ? formatDate(new Date(value), 'd MMMM yyyy') : 'Не указана';
}

export async function renderOrderReportPdf(snapshot: OrderReportSnapshot, version: number) {
  const { order, executor, client, items, confirmedAt } = snapshot;
  const paymentMethod = order.paymentMethod
    ? PAYMENT_METHOD_OPTIONS_MAP[order.paymentMethod].label
    : 'Не указан';
  const confirmationDate = new Date(confirmedAt);

  return renderToBuffer(
    <Document
      title={`Сводка условий заказа ${order.id}, версия ${version}`}
      author={executor.name}
      subject="Подтверждённые условия заказа"
      creator="Delo"
      producer="Delo"
      language="ru-RU"
      creationDate={confirmationDate}
      modificationDate={confirmationDate}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.brandRow}>
          {/* React PDF Image does not support the web alt attribute. */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={logoPath} style={styles.logo} />
          <View style={styles.documentMeta}>
            <Text style={styles.documentType}>СВОДКА УСЛОВИЙ ЗАКАЗА</Text>
            <Text style={styles.confirmationStatus}>ПОДТВЕРЖДЕНО</Text>
          </View>
        </View>

        <View style={styles.brandAccent} />
        <Text style={styles.title}>{order.title}</Text>
        {order.description && <Text style={styles.description}>{order.description}</Text>}

        <View style={styles.metaGrid} wrap={false}>
          <View style={styles.orderMeta}>
            <Text style={styles.label}>ЗАКАЗ</Text>
            <Text style={styles.metaValue}>{order.id}</Text>
          </View>
          <View style={styles.versionMeta}>
            <Text style={styles.label}>ВЕРСИЯ</Text>
            <Text style={styles.metaValue}>{String(version).padStart(2, '0')}</Text>
          </View>
          <View style={styles.confirmationMeta}>
            <Text style={styles.label}>ПОДТВЕРЖДЕНО</Text>
            <Text style={styles.metaValue}>
              {formatDate(confirmationDate, 'd MMMM yyyy, HH:mm')}
            </Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.parametersColumn}>
            <Text style={styles.sectionKicker}>ПАРАМЕТРЫ</Text>
            <View style={styles.detailGroup}>
              <Text style={styles.label}>НАЧАЛО РАБОТ</Text>
              <Text style={styles.detailValue}>{renderDate(order.startDate)}</Text>
            </View>
            <View style={styles.detailGroupSpaced}>
              <Text style={styles.label}>СРОК ВЫПОЛНЕНИЯ</Text>
              <Text style={styles.detailValue}>{renderDate(order.deadline)}</Text>
            </View>
            <View style={styles.detailGroupSpaced}>
              <Text style={styles.label}>СПОСОБ ОПЛАТЫ</Text>
              <Text style={styles.detailValue}>{paymentMethod}</Text>
            </View>
          </View>

          <View style={styles.partiesColumn}>
            <Text style={styles.sectionKicker}>СТОРОНЫ</Text>
            <View style={styles.detailGroup}>
              <Text style={styles.label}>ИСПОЛНИТЕЛЬ</Text>
              <Text style={styles.partyName}>{executor.name}</Text>
              <Text style={styles.partyDetail}>{executor.email}</Text>
            </View>
            <View style={styles.detailGroupSpaced}>
              <Text style={styles.label}>ЗАКАЗЧИК</Text>
              <Text style={styles.partyName}>{client.name}</Text>
              {client.company && <Text style={styles.partyDetail}>{client.company}</Text>}
              {client.inn && <Text style={styles.partyDetail}>ИНН {client.inn}</Text>}
              {client.contact && <Text style={styles.partyDetail}>{client.contact}</Text>}
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Состав работ</Text>
        <View style={styles.tableHeader} wrap={false}>
          <Text style={[styles.tableIndex, styles.tableHeaderText]}>№</Text>
          <Text style={[styles.tableContent, styles.tableHeaderText]}>СОСТАВ РАБОТ</Text>
          <Text style={[styles.tablePrice, styles.tableHeaderText]}>СТОИМОСТЬ</Text>
        </View>
        {items.map((item, index) => (
          <View
            key={`${index}-${item.name}`}
            style={index === items.length - 1 ? [styles.item, styles.lastItem] : styles.item}
            wrap={false}
          >
            <Text style={styles.itemIndex}>{String(index + 1).padStart(2, '0')}</Text>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
            </View>
            <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
          </View>
        ))}

        <View style={styles.total} wrap={false}>
          <View style={styles.workTerms}>
            <Text style={styles.label}>УСЛОВИЯ РАБОТЫ</Text>
            <Text style={styles.workTermsValue}>{executor.workTerms || 'Не указаны'}</Text>
          </View>
          <View style={styles.totalContent}>
            <Text style={styles.label}>ИТОГОВАЯ СТОИМОСТЬ</Text>
            <Text style={styles.totalValue}>{formatPrice(order.price)}</Text>
          </View>
        </View>

        <View style={styles.notice} wrap={false}>
          <Text style={styles.noticeText}>
            Документ сформирован на основании информации, внесённой в сервис Delo, и фиксирует
            условия заказа на момент подтверждения. Документ носит информационный характер и не
            подписан электронной подписью.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
