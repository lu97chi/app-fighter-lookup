"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filter,
  MoreVertical,
  Plus,
  Search,
  Trophy,
  UserPlus,
} from "lucide-react";

interface Fighter {
  id: string;
  name: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  weightClass: string;
  status: "active" | "injured" | "suspended" | "retired";
  nextFight?: {
    date: string;
    opponent: string;
    event: string;
  };
  lastFight?: {
    date: string;
    opponent: string;
    result: "win" | "loss" | "draw" | "no contest";
  };
  contractStatus: "signed" | "negotiating" | "expired" | "none";
  ranking?: number;
}

const mockFighters: Fighter[] = [
  {
    id: "1",
    name: "John Smith",
    record: { wins: 15, losses: 2, draws: 0 },
    weightClass: "Lightweight",
    status: "active",
    nextFight: {
      date: "2024-06-15",
      opponent: "Mike Johnson",
      event: "UFC 305",
    },
    lastFight: {
      date: "2024-01-20",
      opponent: "Tom Wilson",
      result: "win",
    },
    contractStatus: "signed",
    ranking: 5,
  },
  {
    id: "2",
    name: "Sarah Jones",
    record: { wins: 12, losses: 1, draws: 1 },
    weightClass: "Strawweight",
    status: "active",
    nextFight: {
      date: "2024-05-22",
      opponent: "Maria Rodriguez",
      event: "UFC Fight Night",
    },
    lastFight: {
      date: "2024-02-10",
      opponent: "Lisa Chen",
      result: "win",
    },
    contractStatus: "signed",
    ranking: 3,
  },
  {
    id: "3",
    name: "Mike Johnson",
    record: { wins: 18, losses: 4, draws: 0 },
    weightClass: "Welterweight",
    status: "injured",
    lastFight: {
      date: "2024-01-05",
      opponent: "James Brown",
      result: "loss",
    },
    contractStatus: "signed",
    ranking: 8,
  },
  {
    id: "4",
    name: "Lisa Brown",
    record: { wins: 8, losses: 2, draws: 0 },
    weightClass: "Flyweight",
    status: "active",
    contractStatus: "negotiating",
    ranking: 12,
  },
  {
    id: "5",
    name: "Tom Wilson",
    record: { wins: 10, losses: 5, draws: 1 },
    weightClass: "Middleweight",
    status: "suspended",
    lastFight: {
      date: "2024-01-20",
      opponent: "John Smith",
      result: "loss",
    },
    contractStatus: "expired",
    ranking: 15,
  },
];

export default function ManageFightersPage() {
  const [fighters] = useState<Fighter[]>(mockFighters);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getStatusColor = (status: Fighter["status"]) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "injured":
        return "text-yellow-600";
      case "suspended":
        return "text-red-600";
      case "retired":
        return "text-gray-600";
    }
  };

  const getContractStatusColor = (status: Fighter["contractStatus"]) => {
    switch (status) {
      case "signed":
        return "text-green-600";
      case "negotiating":
        return "text-yellow-600";
      case "expired":
        return "text-red-600";
      case "none":
        return "text-gray-600";
    }
  };

  const filteredFighters = fighters
    .filter((fighter) => {
      if (filter === "all") return true;
      if (filter === "active") return fighter.status === "active";
      if (filter === "injured") return fighter.status === "injured";
      if (filter === "negotiating") return fighter.contractStatus === "negotiating";
      return true;
    })
    .filter((fighter) =>
      searchQuery
        ? fighter.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Manage Fighters</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your roster of fighters
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Fighter
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Match
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search fighters..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fighters</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="injured">Injured</SelectItem>
            <SelectItem value="negotiating">In Negotiation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fighter</TableHead>
              <TableHead>Record</TableHead>
              <TableHead>Weight Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Fight</TableHead>
              <TableHead>Contract Status</TableHead>
              <TableHead>Ranking</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFighters.map((fighter) => (
              <TableRow key={fighter.id}>
                <TableCell className="font-medium">{fighter.name}</TableCell>
                <TableCell>
                  {fighter.record.wins}-{fighter.record.losses}
                  {fighter.record.draws > 0 ? `-${fighter.record.draws}` : ""}
                </TableCell>
                <TableCell>{fighter.weightClass}</TableCell>
                <TableCell>
                  <span className={getStatusColor(fighter.status)}>
                    {fighter.status.charAt(0).toUpperCase() + fighter.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  {fighter.nextFight ? (
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        vs. {fighter.nextFight.opponent}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(fighter.nextFight.date).toLocaleDateString()} -{" "}
                        {fighter.nextFight.event}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No fight scheduled</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={getContractStatusColor(fighter.contractStatus)}>
                    {fighter.contractStatus.charAt(0).toUpperCase() +
                      fighter.contractStatus.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  {fighter.ranking ? (
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span>#{fighter.ranking}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Unranked</span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Fight</DropdownMenuItem>
                      <DropdownMenuItem>Manage Contract</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Remove Fighter
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 