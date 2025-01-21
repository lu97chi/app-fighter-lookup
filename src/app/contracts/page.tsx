"use client";

import * as React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Search,
  MoreVertical,
  Download,
  Eye,
  Edit,
  Trash,
  Filter,
  Plus,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";

type ContractType = "Professional" | "Amateur";
type ContractStatus = "Active" | "Pending" | "Expired" | "Terminated";

interface Contract {
  id: number;
  fighter: string;
  organization: string;
  type: ContractType;
  status: ContractStatus;
  startDate: Date;
  endDate: Date;
  value: number;
  fights: number;
  nextFightDate: Date;
}

// Mock data for contracts
const mockContracts: Contract[] = [
  {
    id: 1,
    fighter: "John Doe",
    organization: "UFC",
    type: "Professional",
    status: "Active",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 11, 31),
    value: 100000,
    fights: 4,
    nextFightDate: new Date(2024, 2, 15),
  },
  {
    id: 2,
    fighter: "Jane Smith",
    organization: "Bellator",
    type: "Amateur",
    status: "Pending",
    startDate: new Date(2024, 1, 1),
    endDate: new Date(2024, 6, 30),
    value: 50000,
    fights: 3,
    nextFightDate: new Date(2024, 3, 1),
  },
  // Add more mock contracts...
];

const statusColors = {
  Active: "text-green-600 bg-green-100",
  Pending: "text-yellow-600 bg-yellow-100",
  Expired: "text-red-600 bg-red-100",
  Terminated: "text-gray-600 bg-gray-100",
} as const;

const contractFormSchema = z.object({
  fighter: z.string().min(1, "Fighter name is required"),
  organization: z.string().min(1, "Organization is required"),
  type: z.enum(["Professional", "Amateur"]),
  status: z.enum(["Active", "Pending", "Expired", "Terminated"]),
  startDate: z.date(),
  endDate: z.date(),
  value: z.number().min(0, "Value must be positive"),
  fights: z.number().min(1, "Must have at least 1 fight"),
  nextFightDate: z.date(),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "All",
    type: "All",
    organization: "All",
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      fighter: "",
      organization: "",
      type: "Professional",
      status: "Pending",
      value: 0,
      fights: 1,
      startDate: new Date(),
      endDate: new Date(),
      nextFightDate: new Date(),
    },
  });

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = 
      contract.fighter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filters.status === "All" || contract.status === filters.status;
    const matchesType = filters.type === "All" || contract.type === filters.type;
    const matchesOrg = filters.organization === "All" || contract.organization === filters.organization;

    return matchesSearch && matchesStatus && matchesType && matchesOrg;
  });

  const organizations = Array.from(new Set(contracts.map(c => c.organization)));

  function onSubmit(data: ContractFormValues) {
    if (isEditMode && selectedContract) {
      setContracts(contracts.map(c => 
        c.id === selectedContract.id ? { ...data, id: c.id } : c
      ));
    } else {
      setContracts([...contracts, { ...data, id: contracts.length + 1 }]);
    }
    setIsCreateDialogOpen(false);
    setSelectedContract(null);
    setIsEditMode(false);
    form.reset();
  }

  function handleEdit(contract: Contract) {
    setIsEditMode(true);
    setSelectedContract(contract);
    form.reset(contract);
    setIsCreateDialogOpen(true);
  }

  function handleDelete(contractId: number) {
    setContracts(contracts.filter(c => c.id !== contractId));
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Contracts</h1>
        <Button onClick={() => {
          setIsEditMode(false);
          setIsCreateDialogOpen(true);
          form.reset();
        }}>
          <Plus className="h-4 w-4 mr-2" />
          New Contract
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contracts..."
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
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({ ...filters, type: value })}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Amateur">Amateur</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.organization}
                onValueChange={(value) => setFilters({ ...filters, organization: value })}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Organizations</SelectItem>
                  {organizations.map((org) => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setFilters({ status: "All", type: "All", organization: "All" })}
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fighter</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Fights</TableHead>
                <TableHead>Next Fight</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.fighter}</TableCell>
                  <TableCell>{contract.organization}</TableCell>
                  <TableCell>{contract.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[contract.status as keyof typeof statusColors]}`}>
                      {contract.status}
                    </span>
                  </TableCell>
                  <TableCell>{format(contract.startDate, "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(contract.endDate, "MMM d, yyyy")}</TableCell>
                  <TableCell>${contract.value.toLocaleString()}</TableCell>
                  <TableCell>{contract.fights}</TableCell>
                  <TableCell>{format(contract.nextFightDate, "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedContract(contract)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(contract)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Contract
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(contract.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Contract
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      {/* View Contract Dialog */}
      <Dialog open={!!selectedContract && !isCreateDialogOpen} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contract Details</DialogTitle>
            <DialogDescription>
              View complete contract information and terms
            </DialogDescription>
          </DialogHeader>

          {selectedContract && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Fighter Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> {selectedContract.fighter}</p>
                    <p><span className="text-muted-foreground">Organization:</span> {selectedContract.organization}</p>
                    <p><span className="text-muted-foreground">Contract Type:</span> {selectedContract.type}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Contract Terms</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Status:</span> {selectedContract.status}</p>
                    <p><span className="text-muted-foreground">Start Date:</span> {format(selectedContract.startDate, "MMMM d, yyyy")}</p>
                    <p><span className="text-muted-foreground">End Date:</span> {format(selectedContract.endDate, "MMMM d, yyyy")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Financial Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Contract Value:</span> ${selectedContract.value.toLocaleString()}</p>
                    <p><span className="text-muted-foreground">Number of Fights:</span> {selectedContract.fights}</p>
                    <p><span className="text-muted-foreground">Value per Fight:</span> ${(selectedContract.value / selectedContract.fights).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Next Fight</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Date:</span> {format(selectedContract.nextFightDate, "MMMM d, yyyy")}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-2 flex justify-end gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={() => {
                  setSelectedContract(null);
                  handleEdit(selectedContract);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Contract
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create/Edit Contract Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setIsEditMode(false);
          form.reset();
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Contract' : 'Create New Contract'}</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Modify the contract details below' : 'Fill in the contract details below'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fighter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fighter Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Professional">Professional</SelectItem>
                            <SelectItem value="Amateur">Amateur</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Expired">Expired</SelectItem>
                            <SelectItem value="Terminated">Terminated</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Value</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fights"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Fights</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            onChange={e => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < form.getValues("startDate")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nextFightDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Next Fight Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">
                  {isEditMode ? 'Save Changes' : 'Create Contract'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 