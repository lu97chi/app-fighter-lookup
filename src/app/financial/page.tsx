"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  ArrowUpRight,
  DollarSign,
  Download,
  Filter,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  X
} from "lucide-react";
import { useState } from "react";

// Mock data
interface Transaction {
  id: number;
  date: Date;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
}

interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  recentTransactions: Transaction[];
  monthlyRevenue: { month: string; amount: number }[];
  topExpenseCategories: { category: string; amount: number }[];
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    date: new Date(2024, 1, 15),
    type: "income",
    category: "Fight Purse",
    description: "UFC 300 Main Event",
    amount: 150000,
    status: "completed",
  },
  {
    id: 2,
    date: new Date(2024, 1, 10),
    type: "expense",
    category: "Training",
    description: "Monthly Gym Fees",
    amount: 2000,
    status: "completed",
  },
  {
    id: 3,
    date: new Date(2024, 1, 5),
    type: "expense",
    category: "Equipment",
    description: "New Training Gear",
    amount: 500,
    status: "completed",
  },
  {
    id: 4,
    date: new Date(2024, 1, 1),
    type: "income",
    category: "Sponsorship",
    description: "Nike Quarterly Payment",
    amount: 25000,
    status: "pending",
  },
];

const mockSummary: FinancialSummary = {
  totalRevenue: 175000,
  totalExpenses: 2500,
  netIncome: 172500,
  recentTransactions: mockTransactions,
  monthlyRevenue: [
    { month: "Jan", amount: 120000 },
    { month: "Feb", amount: 175000 },
    { month: "Mar", amount: 90000 },
    { month: "Apr", amount: 150000 },
  ],
  topExpenseCategories: [
    { category: "Training", amount: 8000 },
    { category: "Equipment", amount: 3000 },
    { category: "Travel", amount: 2000 },
    { category: "Medical", amount: 1500 },
  ],
};

const transactionCategories = {
  income: ["Fight Purse", "Sponsorship", "Merchandise", "Appearance", "Other"],
  expense: ["Training", "Equipment", "Travel", "Medical", "Management", "Other"],
};

export default function FinancialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    status: "all",
  });
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      filters.type === "all" || transaction.type === filters.type;
    const matchesCategory =
      filters.category === "all" || transaction.category === filters.category;
    const matchesStatus =
      filters.status === "all" || transaction.status === filters.status;

    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Financials</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h2 className="text-2xl font-bold">${mockSummary.totalRevenue.toLocaleString()}</h2>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.5% from last month
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <h2 className="text-2xl font-bold">${mockSummary.totalExpenses.toLocaleString()}</h2>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5.2% from last month
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
              <p className="text-sm text-muted-foreground">Net Income</p>
              <h2 className="text-2xl font-bold">${mockSummary.netIncome.toLocaleString()}</h2>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15.3% from last month
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Transactions List */}
        <div className="col-span-2">
          <Card>
            <div className="p-4 border-b">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? "bg-accent" : ""}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {showFilters && (
                <div className="flex gap-4 mt-4">
                  <Select
                    value={filters.type}
                    onValueChange={(value) => setFilters({ ...filters, type: value })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters({ ...filters, category: value })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {[...transactionCategories.income, ...transactionCategories.expense].map(
                        (category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters({ ...filters, status: value })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFilters({ type: "all", category: "all", status: "all" })
                    }
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            <ScrollArea className="h-[calc(100vh-25rem)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{format(transaction.date, "MMM d, yyyy")}</TableCell>
                      <TableCell className="font-medium">
                        {transaction.description}
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell
                        className={
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </div>

        {/* Analytics */}
        <div className="space-y-6">
          {/* Period Selector */}
          <Card className="p-4">
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>

          {/* Top Expense Categories */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Top Expense Categories</h3>
            <div className="space-y-4">
              {mockSummary.topExpenseCategories.map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm">{category.category}</span>
                  </div>
                  <span className="text-sm font-medium">
                    ${category.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Monthly Revenue */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Monthly Revenue</h3>
            <div className="space-y-4">
              {mockSummary.monthlyRevenue.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm">{month.month}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      ${month.amount.toLocaleString()}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 