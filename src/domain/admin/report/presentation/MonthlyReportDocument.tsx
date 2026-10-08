import React from 'react';
import {
    Document,
    Image,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from '@react-pdf/renderer';

import { MonthlyReportData } from '../model/types';

// 1. BẮT BUỘC ĐĂNG KÝ FONT (Nếu không tên tiếng Việt sẽ lỗi 100%)
Font.register({
    family: 'Roboto',
    fonts: [
        { src: '/fonts/Roboto-Regular.ttf' },
        { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' }
    ]
});

// 2. HỆ THỐNG MÀU SẮC CHUYÊN NGHIỆP (Minimalist Corporate)
const colors = {
    primary: '#0ea5e9',
    textDark: '#0f172a',
    textMuted: '#64748b',
    border: '#e2e8f0',
    bgLight: '#f8fafc',
    statusActive: '#16a34a',
    statusInactive: '#dc2626'
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        paddingBottom: 60,
        fontFamily: 'Roboto', // Phải gọi font đã đăng ký
        fontSize: 10,
        color: colors.textDark,
        backgroundColor: '#ffffff'
    },

    // --- HEADER ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: colors.textDark,
        paddingBottom: 20,
        marginBottom: 30,
    },
    logo: {
        width: 50,
        height: 'auto',
    },
    headerTextRight: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 9,
        color: colors.textMuted,
        marginTop: 4,
    },

    // --- METRICS KHỐI TỔNG QUAN ---
    metricsContainer: {
        flexDirection: 'row',
        backgroundColor: colors.bgLight,
        borderRadius: 4,
        padding: 15,
        marginBottom: 30,
    },
    metricBox: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: colors.border,
        paddingHorizontal: 10,
    },
    metricBoxLast: {
        flex: 1,
        paddingHorizontal: 10,
    },
    metricLabel: {
        fontSize: 8,
        color: colors.textMuted,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    // --- BẢNG DỮ LIỆU ---
    tableTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    tableHeaderRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.textMuted,
        paddingBottom: 8,
        marginBottom: 4,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    // CHIA CỘT (Tổng = 100%)
    colSTT: { width: '5%', textAlign: 'center' },
    colEmployee: { width: '35%', paddingRight: 10 },
    colPosition: { width: '30%', paddingRight: 10 },
    colRole: { width: '15%' },
    colStatus: { width: '15%', textAlign: 'right' },

    headerText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: colors.textMuted,
        textTransform: 'uppercase',
    },
    textMain: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    textSub: {
        fontSize: 9,
        color: colors.textMuted,
    }
});

interface MonthlyReportDocumentProps {
    report: MonthlyReportData;
}

const MonthlyReportDocument = ({ report }: MonthlyReportDocumentProps) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* KHỐI 1: HEADER & LOGO */}
            <View style={styles.header}>
                <Image src="/logo.png"

                    style={styles.logo} />
                <View style={styles.headerTextRight}>
                    <Text style={styles.title}>Staff & Activity Report</Text>
                    <Text style={styles.subtitle}>Exported: {report.reportDate}</Text>
                </View>
            </View>

            {/* KHỐI 2: METRICS BỌC TRONG BOX XÁM */}
            <View style={styles.metricsContainer}>
                <View style={styles.metricBox}>
                    <Text style={styles.metricLabel}>Total Staff</Text>
                    <Text style={styles.metricValue}>{report.metrics.totalStaff}</Text>
                </View>
                <View style={styles.metricBox}>
                    <Text style={styles.metricLabel}>Active Staff</Text>
                    <Text style={[styles.metricValue, { color: colors.primary }]}>{report.metrics.activeStaff}</Text>
                </View>
                <View style={styles.metricBoxLast}>
                    <Text style={styles.metricLabel}>Inactive Staff</Text>
                    <Text style={[styles.metricValue, { color: colors.statusInactive }]}>{report.metrics.inactiveStaff}</Text>
                </View>
            </View>

            {/* KHỐI 3: BẢNG CHI TIẾT */}
            <Text style={styles.tableTitle}>Staff Directory</Text>

            {/* Dòng Header Bảng */}
            <View style={styles.tableHeaderRow}>
                <View style={styles.colSTT}><Text style={styles.headerText}>#</Text></View>
                <View style={styles.colEmployee}><Text style={styles.headerText}>Employee Info</Text></View>
                <View style={styles.colPosition}><Text style={styles.headerText}>Department / Title</Text></View>
                <View style={styles.colRole}><Text style={styles.headerText}>Role</Text></View>
                <View style={styles.colStatus}><Text style={styles.headerText}>Status</Text></View>
            </View>

            {/* Render Dữ liệu */}
            {report.staffList.map((staff, index) => (
                <View style={styles.tableRow} key={staff.id} wrap={false}>
                    <View style={styles.colSTT}>
                        <Text style={styles.textSub}>{index + 1}</Text>
                    </View>

                    {/* Gom nhóm Tên + Email */}
                    <View style={styles.colEmployee}>
                        <Text style={styles.textMain}>{staff.fullName}</Text>
                        <Text style={styles.textSub}>{staff.email}</Text>
                    </View>

                    {/* Gom nhóm Phòng ban + Chức danh */}
                    <View style={styles.colPosition}>
                        <Text style={styles.textMain}>{staff.department}</Text>
                        <Text style={styles.textSub}>{staff.title}</Text>
                    </View>

                    <View style={styles.colRole}>
                        <Text style={[styles.textMain, { fontWeight: 'normal' }]}>{staff.role}</Text>
                    </View>

                    <View style={styles.colStatus}>
                        <Text style={[
                            styles.textMain,
                            { color: staff.status.toLowerCase() === 'active' ? colors.statusActive : colors.statusInactive }
                        ]}>
                            {staff.status}
                        </Text>
                    </View>
                </View>
            ))}

            {/* Render Dữ liệu */}
            <Text style={styles.tableTitle}>Title Statistics</Text>

            <View style={styles.metricsContainer}>
                {report.titleStatistics.map((title, index) => (
                    <View style={styles.metricBox} key={index}>
                        <Text style={styles.metricLabel}>{title.title}</Text>
                        <Text style={styles.metricValue}>{title.count}</Text>
                    </View>
                ))}
            </View>

        </Page>
    </Document >
);

export default MonthlyReportDocument;