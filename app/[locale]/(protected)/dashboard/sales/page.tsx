import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import ColumnNegativeValues
    from "@/app/[locale]/(protected)/charts/appex-charts/charts-appex-column/column-negative-values";
import DistributedChart from "@/app/[locale]/(protected)/charts/appex-charts/charts-appex-column/distributed-chart";
import BasicBar from "@/app/[locale]/(protected)/charts/appex-charts/charts-appex-bar/basic-bar";
import BasicDonut from "@/app/[locale]/(protected)/charts/appex-charts/charts-appex-pie/basic-donut";

function Sales() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Card>
                <CardHeader>
                    Sales Statistics
                </CardHeader>
                <CardContent>
                    <ColumnNegativeValues/>
                </CardContent>

            </Card>

            <Card>
                <CardHeader>
                    Sales Representative
                </CardHeader>
                <CardContent>
                    <DistributedChart/>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    Best Selling
                </CardHeader>
                <CardContent>
                    <BasicBar/>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    Highest return rate
                </CardHeader>
                <CardContent>
                    <BasicDonut/>
                </CardContent>
            </Card>
        </div>
    );
}

export default Sales;