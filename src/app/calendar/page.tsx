"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, isSameDay, eachDayOfInterval, startOfWeek, endOfWeek, addHours, setHours, setMinutes, addDays, subDays, addWeeks, subWeeks } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for events (replace with real data later)
const mockEvents = [
  {
    id: 1,
    title: "Training Session with Coach Mike",
    description: "High-intensity training session focusing on striking techniques and footwork. Bring training gear and water.",
    date: new Date(),
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "Main Gym",
    participants: ["John Doe", "Coach Mike"],
    type: "training",
    priority: "high",
    notes: "Remember to bring: Boxing gloves, Hand wraps, Mouthguard",
    recurring: "weekly",
    category: "Striking",
    equipment: ["Boxing gloves", "Hand wraps", "Mouthguard", "Training gear"],
    status: "confirmed"
  },
  {
    id: 2,
    title: "Contract Review Meeting",
    date: new Date(),
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    location: "Conference Room A",
    participants: ["Jane Smith", "Legal Team"],
    type: "meeting",
    priority: "medium"
  },
  // Add more mock events for testing
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 3,
    title: `Test Event ${i + 1}`,
    date: addHours(new Date(), i * 2),
    startTime: format(setHours(setMinutes(new Date(), 0), 9 + i), "h:mm aa"),
    endTime: format(setHours(setMinutes(new Date(), 0), 10 + i), "h:mm aa"),
    location: "Various Locations",
    participants: ["Test User"],
    type: ["training", "meeting", "competition"][i % 3],
    priority: ["high", "medium", "low"][i % 3]
  }))
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const EVENT_TYPES = ["All Types", "training", "meeting", "competition"];
const PRIORITIES = ["All Priorities", "high", "medium", "low"];

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));
  const [eventType, setEventType] = useState("All Types");
  const [priority, setPriority] = useState("All Priorities");
  const [sortBy, setSortBy] = useState<"time" | "priority">("time");
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);

  const handlePrevious = useCallback(() => {
    if (view === "month") {
      const newDate = subMonths(date, 1);
      setDate(newDate);
      setCurrentMonth(startOfMonth(newDate));
    } else if (view === "week") {
      const newDate = subWeeks(date, 1);
      setDate(newDate);
      setCurrentMonth(startOfMonth(newDate));
    } else {
      const newDate = subDays(date, 1);
      setDate(newDate);
      setCurrentMonth(startOfMonth(newDate));
    }
  }, [view, date]);

  const handleNext = useCallback(() => {
    if (view === "month") {
      const newDate = addMonths(date, 1);
      setDate(newDate);
      setCurrentMonth(startOfMonth(newDate));
    } else if (view === "week") {
      const newDate = addWeeks(date, 1);
      setDate(newDate);
      setCurrentMonth(startOfMonth(newDate));
    } else {
      const newDate = addDays(date, 1);
      setDate(newDate);
      setCurrentMonth(startOfMonth(newDate));
    }
  }, [view, date]);

  const handleToday = useCallback(() => {
    const today = new Date();
    setDate(today);
    setCurrentMonth(startOfMonth(today));
  }, []);

  const getDateDisplay = useCallback(() => {
    if (view === "month") {
      return format(date, "MMMM yyyy");
    } else if (view === "week") {
      const weekStart = startOfWeek(date);
      const weekEnd = endOfWeek(date);
      return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
    } else {
      return format(date, "MMMM d, yyyy");
    }
  }, [view, date]);

  // Get events based on view and filters
  const getFilteredEvents = useCallback((targetDate: Date) => {
    let events = mockEvents.filter(event => {
      if (view === "month") {
        return isSameDay(event.date, targetDate);
      } else if (view === "week") {
        const weekStart = startOfWeek(targetDate);
        const weekEnd = endOfWeek(targetDate);
        return event.date >= weekStart && event.date <= weekEnd;
      } else {
        return isSameDay(event.date, targetDate);
      }
    });

    // Apply filters
    if (eventType !== "All Types") {
      events = events.filter(event => event.type === eventType);
    }
    if (priority !== "All Priorities") {
      events = events.filter(event => event.priority === priority);
    }

    // Apply sorting
    events.sort((a, b) => {
      if (sortBy === "time") {
        return a.date.getTime() - b.date.getTime();
      } else {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
      }
    });

    return events;
  }, [view, eventType, priority, sortBy]);

  const selectedDateEvents = getFilteredEvents(date);

  // Get week days for week view
  const weekDays = view === "week" ? eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date)
  }) : [];

  const renderDayViewTimeSlots = () => (
    <div className="grid grid-cols-[100px_1fr] gap-4">
      {HOURS.map((hour) => (
        <div key={hour} className="relative h-20">
          <div className="absolute top-0 -translate-y-1/2 text-sm text-muted-foreground">
            {format(setHours(new Date(), hour), "h aa")}
          </div>
          <div className="border-t h-full"></div>
        </div>
      ))}
    </div>
  );

  const renderWeekViewTimeSlots = () => (
    <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-4">
      <div className="sticky top-0 z-10 bg-background pt-4">Hour</div>
      {weekDays.map((day) => (
        <div key={day.toISOString()} className="text-center sticky top-0 z-10 bg-background pt-4">
          <div className="font-medium">{format(day, "EEE")}</div>
          <div className="text-sm text-muted-foreground">{format(day, "d")}</div>
        </div>
      ))}
      {HOURS.map((hour) => (
        <React.Fragment key={hour}>
          <div className="text-sm text-muted-foreground pt-4">
            {format(setHours(new Date(), hour), "h aa")}
          </div>
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="border h-20"></div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {getDateDisplay()}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center rounded-lg border">
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 ${view === "month" ? "bg-accent text-accent-foreground" : ""}`}
              onClick={() => setView("month")}
            >
              Month
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 ${view === "week" ? "bg-accent text-accent-foreground" : ""}`}
              onClick={() => setView("week")}
            >
              Week
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 ${view === "day" ? "bg-accent text-accent-foreground" : ""}`}
              onClick={() => setView("day")}
            >
              Day
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 md:grid-cols-12 gap-6">
        <Card className="col-span-7 p-4 h-[calc(100vh-12rem)] overflow-hidden">
          {view === "month" && (
            <div className="h-full flex flex-col">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="w-full h-full"
                showOutsideDays={true}
                fixedWeeks
                defaultMonth={currentMonth}
                fromDate={new Date(1970, 0, 1)}
                toDate={new Date(2100, 11, 31)}
                classNames={{
                  months: "w-full h-full",
                  month: "w-full h-full",
                  caption: "hidden",
                  table: "w-full h-full border-collapse border-t border-l",
                  head_row: "grid grid-cols-7 divide-x",
                  head_cell: "text-muted-foreground font-normal text-sm h-10 flex items-center justify-center border-r",
                  row: "grid grid-cols-7 divide-x divide-y",
                  cell: "min-h-[8rem] relative border-r p-0",
                  day: "h-full w-full",
                  day_range_start: "day-range-start",
                  day_range_end: "day-range-end",
                  day_selected: "bg-primary/10",
                  day_today: "bg-accent/10",
                  day_outside: "text-muted-foreground/50",
                  day_disabled: "text-muted-foreground/50",
                  day_hidden: "invisible",
                  day_range_middle: "day-range-middle",
                }}
                components={{
                  Day: ({ day, ...props }) => {
                    const dayEvents = getFilteredEvents(day.date);
                    const hasEvents = dayEvents.length > 0;
                    const priorities = new Set(dayEvents.map(e => e.priority));
                    
                    return (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <td {...props} className="relative h-full hover:bg-accent/50 transition-colors">
                              <div className="flex flex-col h-full p-2">
                                <span className={`text-sm ${hasEvents ? 'font-medium' : ''}`}>
                                  {format(day.date, "d")}
                                </span>
                                {hasEvents && (
                                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                    {priorities.has("high") && (
                                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    )}
                                    {priorities.has("medium") && (
                                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                    )}
                                    {priorities.has("low") && (
                                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                          </TooltipTrigger>
                          {hasEvents && (
                            <TooltipContent 
                              side="bottom" 
                              align="center" 
                              sideOffset={5}
                              className="p-2 w-48"
                            >
                              <div className="space-y-1">
                                {dayEvents.map((event) => (
                                  <button
                                    key={event.id}
                                    onClick={() => setSelectedEvent(event)}
                                    className="w-full flex items-center gap-2 hover:bg-accent/50 p-1 rounded text-left"
                                  >
                                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                      event.priority === "high"
                                        ? "bg-red-500"
                                        : event.priority === "medium"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    }`} />
                                    <span className="text-xs truncate flex-1">{event.title}</span>
                                    <span className="text-xs text-muted-foreground flex-shrink-0">
                                      {event.startTime}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    );
                  },
                }}
              />
            </div>
          )}
          {view === "week" && (
            <ScrollArea className="h-full">
              {renderWeekViewTimeSlots()}
            </ScrollArea>
          )}
          {view === "day" && (
            <ScrollArea className="h-full">
              {renderDayViewTimeSlots()}
            </ScrollArea>
          )}
        </Card>

        <Card className="col-span-7 md:col-span-5 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-semibold">
                Events for {format(date, "MMMM d, yyyy")}
              </h2>
              <div className="flex items-center gap-2">
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_TYPES.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map(p => (
                      <SelectItem key={p} value={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(value: "time" | "priority") => setSortBy(value)}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">Time</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm">
                + Add Event
              </Button>
            </div>

            <ScrollArea className="h-[500px]">
              {selectedDateEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                  <CalendarDays className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm">No events scheduled for this day</p>
                  <Button variant="link" size="sm" className="mt-2">
                    Create an event
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <Card 
                      key={event.id} 
                      className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium mb-2">{event.title}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          event.priority === "high" 
                            ? "bg-red-100 text-red-700" 
                            : event.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {event.priority}
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.participants.join(", ")}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </Card>
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-2">
              <div className={`px-2 py-1 rounded-full text-xs ${
                selectedEvent?.priority === "high" 
                  ? "bg-red-100 text-red-700" 
                  : selectedEvent?.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {selectedEvent?.priority}
              </div>
              <div className="px-2 py-1 bg-secondary rounded-full text-xs">
                {selectedEvent?.type}
              </div>
              <div className="px-2 py-1 bg-secondary rounded-full text-xs">
                {selectedEvent?.status}
              </div>
            </div>

            {selectedEvent?.description && (
              <div className="text-sm text-muted-foreground border-b pb-4">
                {selectedEvent.description}
              </div>
            )}

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-start gap-4">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Time & Date</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedEvent?.startTime} - {selectedEvent?.endTime}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {selectedEvent?.recurring && `Recurring: ${selectedEvent.recurring}`}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Location</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedEvent?.location}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Participants</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>{selectedEvent?.participants.join(", ")}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Category</h3>
                  <div className="text-sm text-muted-foreground">
                    {selectedEvent?.category}
                  </div>
                </div>
              </div>

              {selectedEvent?.equipment && (
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Required Equipment</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.equipment.map((item, index) => (
                      <div key={index} className="px-2 py-1 bg-secondary rounded-full text-xs">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent?.notes && (
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Notes</h3>
                  <div className="text-sm text-muted-foreground">
                    {selectedEvent.notes}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 