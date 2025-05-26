import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import Breadcrumb from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
    title:
        "Dashboard - Admin"
};

export default function Dashboard() {
    return (
        <>
            <Breadcrumb items={[{ label: 'Dashboard', href: '' }]} />
        </>
    );
}