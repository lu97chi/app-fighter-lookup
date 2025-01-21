"use client";

import * as React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Search,
  MessageSquare,
  MoreVertical,
  Send,
  Paperclip,
  Image as ImageIcon,
} from "lucide-react";
import { format } from "date-fns";

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: "Coach Mike",
    avatar: "/avatars/coach-mike.jpg",
    lastMessage: "Great session today! Keep up the good work.",
    timestamp: new Date(2024, 0, 21, 14, 30),
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Team Group",
    avatar: "/avatars/team.jpg",
    lastMessage: "Training schedule for next week is out",
    timestamp: new Date(2024, 0, 21, 12, 15),
    unread: 0,
    online: false,
    isGroup: true,
    participants: ["Coach Mike", "John Doe", "Jane Smith", "You"],
  },
  // Add more mock conversations
];

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    senderId: 1,
    content: "Hey! How's your training going?",
    timestamp: new Date(2024, 0, 21, 14, 25),
    status: "read",
  },
  {
    id: 2,
    senderId: "me",
    content: "Going great! Just finished my morning session.",
    timestamp: new Date(2024, 0, 21, 14, 27),
    status: "sent",
  },
  {
    id: 3,
    senderId: 1,
    content: "Great session today! Keep up the good work.",
    timestamp: new Date(2024, 0, 21, 14, 30),
    status: "read",
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <Card className="col-span-4 p-0 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {mockConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-accent/50 transition-colors text-left ${
                    selectedConversation?.id === conversation.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium truncate">{conversation.name}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(conversation.timestamp, "h:mm a")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </span>
                      {conversation.unread > 0 && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat View */}
        <Card className="col-span-8 p-0 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-medium">{selectedConversation.name}</h2>
                    {selectedConversation.isGroup && (
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.participants.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`text-xs mt-1 ${
                          message.senderId === "me" 
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}>
                          {format(message.timestamp, "h:mm a")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
} 