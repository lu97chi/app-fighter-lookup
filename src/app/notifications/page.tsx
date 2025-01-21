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
  Bell,
  DollarSign,
  FileText,
  Filter,
  Search,
  Trophy,
  User,
  X,
} from "lucide-react";

interface Notification {
  id: string;
  type: "contract" | "fight" | "fighter" | "financial" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "contract",
    title: "New Contract Opportunity",
    message: "UFC has proposed a new contract for John Smith",
    timestamp: "2024-03-10T10:30:00Z",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "fight",
    title: "Upcoming Fight Reminder",
    message: "Sarah Jones vs. Maria Rodriguez - UFC 305 in 2 weeks",
    timestamp: "2024-03-09T15:45:00Z",
    read: false,
    priority: "high",
  },
  {
    id: "3",
    type: "fighter",
    title: "Fighter Status Update",
    message: "Mike Johnson has completed medical clearance",
    timestamp: "2024-03-09T09:20:00Z",
    read: true,
    priority: "medium",
  },
  {
    id: "4",
    type: "financial",
    title: "Payment Received",
    message: "Fight purse payment received for UFC 304",
    timestamp: "2024-03-08T16:15:00Z",
    read: true,
    priority: "medium",
  },
  {
    id: "5",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance in 24 hours",
    timestamp: "2024-03-08T11:00:00Z",
    read: true,
    priority: "low",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "contract":
        return <FileText className="h-5 w-5" />;
      case "fight":
        return <Trophy className="h-5 w-5" />;
      case "fighter":
        return <User className="h-5 w-5" />;
      case "financial":
        return <DollarSign className="h-5 w-5" />;
      case "system":
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "contract":
        return "bg-blue-100 text-blue-700";
      case "fight":
        return "bg-purple-100 text-purple-700";
      case "fighter":
        return "bg-green-100 text-green-700";
      case "financial":
        return "bg-yellow-100 text-yellow-700";
      case "system":
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredNotifications = notifications
    .filter((notification) => {
      if (filter === "all") return true;
      if (filter === "unread") return !notification.read;
      return notification.type === filter;
    })
    .filter((notification) =>
      searchQuery
        ? notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
        <Button variant="outline" onClick={clearAll}>
          Clear All
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Notifications</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="contract">Contracts</SelectItem>
            <SelectItem value="fight">Fights</SelectItem>
            <SelectItem value="fighter">Fighters</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            No notifications found
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 transition-colors ${
                !notification.read ? "bg-muted/50" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-full ${getNotificationColor(
                    notification.type
                  )}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {notification.priority === "high" && (
                    <div className="mt-2">
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        High Priority
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 