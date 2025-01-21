"use client";

import * as React from "react";
import { CalendarDays, Clock, Users, X, Timer, FileText } from "lucide-react";
import { Calendar } from "@/components/ui/calendar/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date({
    required_error: "A date is required",
  }),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional(),
  participants: z.array(z.string()).min(1, "At least one participant is required"),
});

export function ScheduleMeetingDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      participants: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsOpen(false);
    form.reset();
  }

  // Generate time slots from 8 AM to 8 PM
  const timeSlots = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? "00" : "30";
    const time = `${hour.toString().padStart(2, "0")}:${minute}`;
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour > 12 ? hour - 12 : hour;
    return {
      value: time,
      label: `${hour12}:${minute} ${period}`,
    };
  });

  const durations = [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
  ];

  const participants = [
    { value: "john", label: "John Doe (Fighter)" },
    { value: "jane", label: "Jane Smith (Manager)" },
    { value: "mike", label: "Mike Johnson (Coach)" },
    { value: "sarah", label: "Sarah Wilson (Fighter)" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) form.reset();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 group transition-colors hover:border-primary">
          <CalendarDays className="h-4 w-4 transition-transform group-hover:scale-110" />
          Schedule Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Schedule a Meeting</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set up a meeting with fighters, managers, or team members.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Meeting Title
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter meeting title" 
                          {...field} 
                          className="transition-all focus-visible:ring-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        Date
                      </FormLabel>
                      <div className="rounded-md border shadow-sm bg-card">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          showOutsideDays={false}
                          fixedWeeks
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Time
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="transition-all focus:ring-2">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <ScrollArea className="h-[200px]">
                              <div className="grid grid-cols-3 gap-1 p-1">
                                {timeSlots.map((slot) => (
                                  <SelectItem
                                    key={slot.value}
                                    value={slot.value}
                                    className="cursor-pointer transition-colors hover:bg-accent rounded-sm px-3 py-2 text-sm"
                                  >
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </div>
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Timer className="h-4 w-4" />
                          Duration
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="transition-all focus:ring-2">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {durations.map((duration) => (
                              <SelectItem
                                key={duration.value}
                                value={duration.value}
                                className="cursor-pointer transition-colors hover:bg-accent"
                              >
                                {duration.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Description (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add meeting details..."
                          className="resize-none h-20 transition-all focus-visible:ring-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="participants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Participants
                      </FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange([...(field.value || []), value])
                        }
                      >
                        <FormControl>
                          <SelectTrigger className="transition-all focus:ring-2">
                            <SelectValue placeholder="Add participants" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {participants
                            .filter(
                              (p) => !field.value?.includes(p.value)
                            )
                            .map((participant) => (
                              <SelectItem
                                key={participant.value}
                                value={participant.value}
                                className="cursor-pointer transition-colors hover:bg-accent"
                              >
                                {participant.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      {field.value?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {field.value.map((participantValue) => {
                            const participant = participants.find(
                              (p) => p.value === participantValue
                            );
                            return (
                              <div
                                key={participantValue}
                                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm animate-in fade-in-0 zoom-in-95"
                              >
                                {participant?.label}
                                <button
                                  type="button"
                                  onClick={() =>
                                    field.onChange(
                                      field.value?.filter((p) => p !== participantValue)
                                    )
                                  }
                                  className="ml-1 rounded-full hover:bg-primary/20 p-1 transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="transition-colors hover:border-destructive hover:text-destructive"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="transition-transform hover:scale-105"
                  >
                    Schedule Meeting
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
} 