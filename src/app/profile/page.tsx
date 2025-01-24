"use client";

import { useState } from "react";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Instagram, Twitter, Facebook, Youtube, Globe, MapPin, Dumbbell, Calendar } from "lucide-react";
import Image from "next/image";

// Mock data - replace with real data from your backend
const initialProfileData = {
  name: "John 'The Beast' Doe",
  email: "john.doe@fighter.com",
  phone: "+1 234 567 890",
  location: "Los Angeles, CA",
  nationality: "United States",
  dateOfBirth: "1990-01-01",
  stats: {
    wins: 15,
    losses: 2,
    draws: 1,
    knockouts: 10,
  },
  achievements: [
    "UFC Heavyweight Champion (2020-2021)",
    "Fight of the Night (3 times)",
    "Performance of the Night (2 times)",
  ],
  social: {
    instagram: "@johnthebeast",
    twitter: "@johnthebeast",
    facebook: "johnthebeastdoe",
    youtube: "TheBeastFights",
  },
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(initialProfileData);

  const handleSave = (newData: Partial<typeof initialProfileData>) => {
    setProfileData({ ...profileData, ...newData });
    // Here you would typically make an API call to update the backend
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative mb-16">
          <div className="absolute inset-x-0 -top-40 -bottom-40 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          <div className="flex flex-col md:flex-row items-start gap-12 relative">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden border border-border bg-card">
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 shadow-sm opacity-0 hover:opacity-100 transition-all duration-300"
              >
                Update Photo
              </Button>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-semibold tracking-tight">{profileData.name}</h1>
                  <EditProfileForm
                    section="personal"
                    data={profileData}
                    onSave={handleSave}
                  />
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Member since 2020</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Dumbbell className="w-4 h-4" />
                    <span className="text-sm">Heavyweight Division</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 border-y py-6">
                <div>
                  <div className="text-2xl font-semibold">{profileData.stats.wins}</div>
                  <div className="text-sm text-muted-foreground">Career Wins</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">{profileData.stats.knockouts}</div>
                  <div className="text-sm text-muted-foreground">Knockouts</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">{profileData.achievements.length}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {Object.entries({
                  instagram: { icon: Instagram, handle: profileData.social.instagram },
                  twitter: { icon: Twitter, handle: profileData.social.twitter },
                  facebook: { icon: Facebook, handle: profileData.social.facebook },
                  youtube: { icon: Youtube, handle: profileData.social.youtube },
                }).map(([platform, { icon: Icon, handle }]) => (
                  <a
                    key={platform}
                    href={`https://${platform}.com/${handle.replace('@', '')}`}
                    className="p-2 rounded-md hover:bg-muted transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={handle}
                  >
                    <Icon className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Fight Statistics */}
          <Card className="border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-muted-foreground" />
                  Fight Record
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-y-6">
                {[
                  { label: "Wins", value: profileData.stats.wins },
                  { label: "Losses", value: profileData.stats.losses },
                  { label: "Draws", value: profileData.stats.draws },
                  { label: "KOs", value: profileData.stats.knockouts },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-2xl font-semibold">{value}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <Medal className="w-5 h-5 text-muted-foreground" />
                  Achievements
                </h2>
              </div>
              <ul className="space-y-3">
                {profileData.achievements.map((achievement, index) => (
                  <li key={index} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Social Media */}
          <Card className="border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  Social Media
                </h2>
              </div>
              <div className="space-y-4">
                {Object.entries({
                  instagram: { icon: Instagram, handle: profileData.social.instagram },
                  twitter: { icon: Twitter, handle: profileData.social.twitter },
                  facebook: { icon: Facebook, handle: profileData.social.facebook },
                  youtube: { icon: Youtube, handle: profileData.social.youtube },
                }).map(([platform, { icon: Icon, handle }]) => (
                  <a
                    key={platform}
                    href={`https://${platform}.com/${handle.replace('@', '')}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 