import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconSettings,
  IconBell,
  IconClock,
  IconApps,
  IconDatabase,
  IconLock,
  IconUser,
  IconX,
  IconPlayerPlay,
  IconChevronDown,
  IconMoon,
  IconLanguage,
  IconVolume,
  IconMicrophone
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "General", icon: IconSettings },
  { id: "notifications", label: "Notifications", icon: IconBell },
  { id: "personalization", label: "Personalization", icon: IconClock },
  { id: "apps", label: "Apps", icon: IconApps },
  { id: "data_controls", label: "Data controls", icon: IconDatabase },
  { id: "security", label: "Security", icon: IconLock },
  { id: "parental_controls", label: "Parental controls", icon: IconUser },
  { id: "account", label: "Account", icon: IconUser },
];

export function SettingsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("general");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-4xl bg-[#1e1e1e] dark:bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden flex h-[600px] border border-neutral-800"
          >
             <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <IconX className="h-5 w-5" />
              </button>

            {/* Sidebar */}
            <div className="w-64 bg-[#171717] flex flex-col p-2 border-r border-neutral-800 overflow-y-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
                    activeTab === tab.id
                      ? "bg-[#2f2f2f] text-white"
                      : "text-neutral-400 hover:bg-[#2f2f2f] hover:text-white"
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[#1e1e1e] p-8 overflow-y-auto text-neutral-200">
              <h2 className="text-xl font-semibold text-white mb-6">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h2>
              
              {activeTab === "general" && <GeneralSettings />}
              {activeTab === "notifications" && <NotificationSettings />}
              {activeTab !== "general" && activeTab !== "notifications" && (
                <div className="flex items-center justify-center h-64 text-neutral-500">
                  <p>Settings for {tabs.find((t) => t.id === activeTab)?.label} are coming soon.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <SettingRow label="Appearance">
        <Select defaultValue="Dark">
          <option>Dark</option>
          <option>Light</option>
          <option>System</option>
        </Select>
      </SettingRow>
      <div className="border-b border-neutral-800" />
      
      <SettingRow label="Accent color">
        <Select defaultValue="Default">
          <option>Default</option>
          <option>Blue</option>
          <option>Green</option>
        </Select>
      </SettingRow>
      <div className="border-b border-neutral-800" />

      <SettingRow label="Language">
        <Select defaultValue="Auto-detect">
          <option>Auto-detect</option>
          <option>English</option>
          <option>Spanish</option>
        </Select>
      </SettingRow>
      <div className="border-b border-neutral-800" />

      <SettingRow label="Spoken language" description="For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.">
        <Select defaultValue="Auto-detect">
          <option>Auto-detect</option>
          <option>English</option>
          <option>Spanish</option>
        </Select>
      </SettingRow>
      <div className="border-b border-neutral-800" />

      <SettingRow label="Voice">
        <div className="flex items-center gap-2">
            <button className="flex items-center justify-center h-10 w-10 rounded-full bg-[#2f2f2f] hover:bg-[#3f3f3f] text-white transition-colors">
                <IconPlayerPlay className="h-4 w-4 fill-current" />
            </button>
            <Select defaultValue="Juniper" className="min-w-[120px]">
                <option>Juniper</option>
                <option>Sky</option>
                <option>Ember</option>
                <option>Cove</option>
            </Select>
        </div>
      </SettingRow>
      <div className="border-b border-neutral-800" />

      <SettingRow label="Separate voice mode" description="Keep ChatGPT Voice in a separate full screen, without real time transcripts and visuals.">
        <Switch />
      </SettingRow>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <SettingRow label="Responses" description="Get notified when ChatGPT responds to requests that take time, like research or image generation.">
         <Select defaultValue="Push">
          <option>Push</option>
          <option>Email</option>
          <option>None</option>
        </Select>
      </SettingRow>
      <div className="border-b border-neutral-800" />

      <SettingRow label="Group chats" description="You'll receive notifications for new messages from group chats.">
         <Select defaultValue="Push">
          <option>Push</option>
          <option>Email</option>
          <option>None</option>
        </Select>
      </SettingRow>
      <div className="border-b border-neutral-800" />

      <SettingRow label="Tasks" description="Get notified when tasks you've created have updates. Manage tasks">
         <Select defaultValue="Push, Email">
          <option>Push, Email</option>
          <option>Push</option>
          <option>Email</option>
          <option>None</option>
        </Select>
      </SettingRow>
      <div className="border-b border-neutral-800" />

      <SettingRow label="Projects" description="Get notified when you receive an email invitation to a shared project.">
         <Select defaultValue="Email">
          <option>Email</option>
          <option>Push</option>
          <option>None</option>
        </Select>
      </SettingRow>
      <div className="border-b border-neutral-800" />
      
      <SettingRow label="Recommendations" description="Stay in the loop on new tools, tips, and features from ChatGPT.">
         <Select defaultValue="Push, Email">
          <option>Push, Email</option>
          <option>Push</option>
          <option>Email</option>
          <option>None</option>
        </Select>
      </SettingRow>
    </div>
  );
}

// Helper Components

function SettingRow({ label, description, children }) {
  return (
    <div className="flex flex-row justify-between items-center py-2">
      <div className="flex flex-col gap-1 pr-8 max-w-[70%]">
        <span className="text-base text-neutral-200">{label}</span>
        {description && <span className="text-sm text-neutral-500">{description}</span>}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
}

function Select({ children, className, ...props }) {
  return (
    <div className="relative">
        <select 
            className={cn(
                "appearance-none bg-transparent text-neutral-200 text-sm focus:outline-none cursor-pointer pr-6 py-1 text-right dir-rtl",
                className
            )}
            style={{ direction: 'rtl' }}
            {...props}
        >
            {children}
        </select>
        <IconChevronDown className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
    </div>
  );
}

function Switch() {
    const [checked, setChecked] = useState(false);
    return (
        <button
            onClick={() => setChecked(!checked)}
            className={cn(
                "w-11 h-6 rounded-full relative transition-colors focus:outline-none",
                checked ? "bg-white" : "bg-[#3f3f3f]"
            )}
        >
            <div
                className={cn(
                    "absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-transform",
                    checked ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    );
}
