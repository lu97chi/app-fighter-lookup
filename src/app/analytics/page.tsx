"use client";

import * as React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Trophy,
  Users,
  DollarSign,
  Calendar,
  Download,
} from "lucide-react";
import {
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data
interface ManagerStats {
  fighters: {
    total: number;
    active: number;
    prospective: number;
    injuredCount: number;
  };
  organization: {
    totalRevenue: number;
    monthlyGrowth: number;
    activeContracts: number;
    pendingNegotiations: number;
  };
  performance: {
    winRate: number;
    fighterRetention: number;
    contractSuccess: number;
    avgFighterEarnings: number;
  };
  fighterPerformance: { name: string; wins: number; earnings: number; potential: number }[];
  revenueByFighter: { name: string; amount: number }[];
  upcomingEvents: { date: string; fighters: string[]; event: string; status: string }[];
}

const mockManagerStats: ManagerStats = {
  fighters: {
    total: 25,
    active: 18,
    prospective: 5,
    injuredCount: 2,
  },
  organization: {
    totalRevenue: 5000000,
    monthlyGrowth: 12.5,
    activeContracts: 15,
    pendingNegotiations: 3,
  },
  performance: {
    winRate: 72.5,
    fighterRetention: 85,
    contractSuccess: 90,
    avgFighterEarnings: 175000,
  },
  fighterPerformance: [
    { name: "John Smith", wins: 12, earnings: 800000, potential: 85 },
    { name: "Sarah Jones", wins: 8, earnings: 600000, potential: 90 },
    { name: "Mike Johnson", wins: 15, earnings: 1200000, potential: 95 },
    { name: "Lisa Brown", wins: 6, earnings: 400000, potential: 80 },
  ],
  revenueByFighter: [
    { name: "John Smith", amount: 800000 },
    { name: "Sarah Jones", amount: 600000 },
    { name: "Mike Johnson", amount: 1200000 },
    { name: "Lisa Brown", amount: 400000 },
  ],
  upcomingEvents: [
    {
      date: "2024-06-15",
      fighters: ["John Smith", "Sarah Jones"],
      event: "UFC 305",
      status: "Confirmed",
    },
    {
      date: "2024-09-22",
      fighters: ["Mike Johnson"],
      event: "UFC Fight Night",
      status: "In Negotiation",
    },
  ],
};

const mockManagerChartData = {
  monthlyRevenue: [
    { name: "Jan", revenue: 350000, contracts: 2 },
    { name: "Feb", revenue: 425000, contracts: 3 },
    { name: "Mar", revenue: 380000, contracts: 1 },
    { name: "Apr", revenue: 550000, contracts: 4 },
    { name: "May", revenue: 600000, contracts: 3 },
    { name: "Jun", revenue: 520000, contracts: 2 },
  ],
  fighterMetrics: [
    { name: "Q1", wins: 8, negotiations: 3, signed: 2 },
    { name: "Q2", wins: 6, negotiations: 4, signed: 4 },
    { name: "Q3", wins: 10, negotiations: 5, signed: 3 },
    { name: "Q4", wins: 7, negotiations: 3, signed: 2 },
  ],
  organizationSplit: [
    { name: "UFC", value: 12 },
    { name: "Bellator", value: 5 },
    { name: "ONE", value: 3 },
    { name: "PFL", value: 5 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("year");
  const [selectedView, setSelectedView] = useState("overview");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Manager Analytics</h1>
        <div className="flex gap-2">
          <Select
            value={selectedView}
            onValueChange={setSelectedView}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="fighters">Fighters</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="contracts">Contracts</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Fighters</p>
              <h2 className="text-2xl font-bold">{mockManagerStats.fighters.active}</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {mockManagerStats.fighters.prospective} prospective
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h2 className="text-2xl font-bold">${(mockManagerStats.organization.totalRevenue / 1000000).toFixed(1)}M</h2>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{mockManagerStats.organization.monthlyGrowth}% growth
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Trophy className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <h2 className="text-2xl font-bold">{mockManagerStats.performance.winRate}%</h2>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5.2% from last period
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Calendar className="h-6 w-6 text-orange-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Contracts</p>
              <h2 className="text-2xl font-bold">{mockManagerStats.organization.activeContracts}</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {mockManagerStats.organization.pendingNegotiations} pending
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue and Contracts Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue & Contract Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockManagerChartData.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value: number, name: string) => [
                name === "revenue" ? `$${value.toLocaleString()}` : value,
                name === "revenue" ? "Revenue" : "Contracts"
              ]}
            />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
              name="Revenue"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="contracts"
              stroke="#82ca9d"
              name="Contracts"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance and Organization Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Fighter Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Fighter Performance by Quarter</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockManagerChartData.fighterMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="wins" fill="#10B981" name="Wins" />
              <Bar dataKey="negotiations" fill="#6366F1" name="Negotiations" />
              <Bar dataKey="signed" fill="#F59E0B" name="Signed Contracts" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Organization Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Fighters by Organization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockManagerChartData.organizationSplit}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {mockManagerChartData.organizationSplit.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Fighters */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Fighters</h3>
          <div className="space-y-4">
            {mockManagerStats.fighterPerformance.map((fighter, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{fighter.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {fighter.wins} wins | Potential: {fighter.potential}%
                  </p>
                </div>
                <p className="font-semibold">${(fighter.earnings / 1000).toFixed(0)}k</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {mockManagerStats.upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{event.event}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.fighters.join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
                  <p className={`text-sm ${
                    event.status === "Confirmed" ? "text-green-600" : "text-yellow-600"
                  }`}>
                    {event.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 