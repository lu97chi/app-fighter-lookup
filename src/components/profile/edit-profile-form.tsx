"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Save, User, Mail, Phone, MapPin, Flag, Calendar, X } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  nationality: string;
  dateOfBirth: string;
}

interface EditProfileFormProps {
  section: "personal" | "fighting" | "social";
  data: ProfileData;
  onSave: (data: ProfileData) => void;
}

export function EditProfileForm({ section, data, onSave }: EditProfileFormProps) {
  const [formData, setFormData] = useState(data);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsOpen(false);
  };

  const renderPersonalForm = () => (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="space-y-4 md:col-span-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              icon={<User className="h-4 w-4" />}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              icon={<Mail className="h-4 w-4" />}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            icon={<Phone className="h-4 w-4" />}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <Input
            id="location"
            icon={<MapPin className="h-4 w-4" />}
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="nationality" className="text-sm font-medium">
            Nationality
          </label>
          <Input
            id="nationality"
            icon={<Flag className="h-4 w-4" />}
            value={formData.nationality}
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="dateOfBirth" className="text-sm font-medium">
            Date of Birth
          </label>
          <Input
            id="dateOfBirth"
            icon={<Calendar className="h-4 w-4" />}
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="bg-background"
          />
        </div>
      </div>
    </form>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-6 top-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold">Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information. Changes will be reflected across the platform.
          </DialogDescription>
        </DialogHeader>
        {section === "personal" && renderPersonalForm()}
        <DialogFooter className="sm:justify-between border-t pt-4 mt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 