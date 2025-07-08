"use client";

import {useEffect, useState} from "react";
import { StatisticsBlock } from "@/components/blocks/statistics-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RevinueBarChart from "@/components/revenue-bar-chart";
import DashboardDropdown from "@/components/dashboard-dropdown";
import OverviewChart from "./components/overview-chart";
import CompanyTable from "./components/company-table";
import RecentActivity from "./components/recent-activity";
import MostSales from "./components/most-sales";
import OverviewRadialChart from "./components/overview-radial";
import { useTranslations } from "next-intl";
import useSummaryReports from "@/services/Reports/summary/summaryReports";
import { Loader2 } from "lucide-react";

const DashboardPage = () => {
  const t = useTranslations("AnalyticsDashboard");

  const {
    loading: loadingSummaryReports,
    fetchSummaryReports,
    summaryReports,
    error: errorSummaryReports,
  } = useSummaryReports();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);

    setStartDate(start);
    setEndDate(end);

    const params = new URLSearchParams();
    params.set("StartDate", start.toISOString());
    params.set("EndDate", end.toISOString());

    fetchSummaryReports(params.toString());
  }, []);

  return (
      <div>
        <div className="grid grid-cols-12 items-center gap-5 mb-5">
          <div className="col-span-12">
            {loadingSummaryReports ? (
                <div className="w-full h-full flex justify-center items-center">
                  <Loader2 className="text-blue-500 mx-auto animate-spin" />
                </div>
            ) : (
                <Card>
                  <CardHeader className="flex flex-row justify-between space-x-1">
                    <CardTitle className="text-lg font-semibold text-default-900">
                      {"Weekly Overview"}
                    </CardTitle>
                    {startDate && endDate && (
                        <div className="text-sm text-default-500 font-normal">
                          {`${startDate.toLocaleDateString()} — ${endDate.toLocaleDateString()}`}
                        </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <StatisticsBlock
                          title={"Total Orders"}
                          total={summaryReports?.totalOrders ?? "--"}
                          className="bg-info/10 border-none shadow-none"
                      />
                      <StatisticsBlock
                          title={"Total Sales"}
                          total={summaryReports?.totalSales ?? "--"}
                          className="bg-warning/10 border-none shadow-none"
                      />
                      <StatisticsBlock
                          title={"Total Invoices"}
                          total={summaryReports?.totalInvoices ?? "--"}
                          className="bg-primary/10 border-none shadow-none"
                      />
                    </div>
                  </CardContent>
                </Card>
            )}
          </div>
        </div>

        {/* Rest of the dashboard */}
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-8 col-span-12">
            <Card>
              <CardContent className="p-4">
                <RevinueBarChart />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="flex-1">{t("overview_circle_chart_title")}</CardTitle>
                <DashboardDropdown />
              </CardHeader>
              <CardContent>
                <OverviewChart />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="flex-1">{t("company_table_title")}</CardTitle>
                <DashboardDropdown />
              </CardHeader>
              <CardContent className="p-0">
                <CompanyTable />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="flex-1">{t("recent_activity_table_title")}</CardTitle>
                <DashboardDropdown />
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <MostSales />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="flex-1">{t("overview_circle_chart_title")}</CardTitle>
                <DashboardDropdown />
              </CardHeader>
              <CardContent>
                <OverviewRadialChart />
                <div className="bg-default-50 rounded p-4 mt-8 flex justify-between flex-wrap">
                  {/* Sample static values */}
                  <div className="space-y-1">
                    <h4 className="text-default-600 text-xs font-normal">
                      {t("invested_amount")}
                    </h4>
                    <div className="text-sm font-medium text-default-900">
                      $8264.35
                    </div>
                    <div className="text-default-500 text-xs font-normal">
                      +0.001.23 (0.2%)
                    </div>
                  </div>

                  {/* Repeat as needed */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;