"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  PlayCircle,
  Settings2,
  Share,
  Terminal,
  User,
  Triangle,
  Battery,
  Cat,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Table from "@/components/chat/table";
import ChatBox from "@/components/chat/Chatbox";

export default function Chat() {
  const [activeFieldset, setActiveFieldset] = useState("playground");

  const [aiTextColor, setAiTextColor] = useState("gray-200");
  const [userTextColor, setUserTextColor] = useState("primary");
  const [maxTokens, setMaxTokens] = useState(200);

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[53px] pt-6">
        <aside className="inset-y fixed left-0 z-20 flex h-5/6 flex-col border-r">
          <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${activeFieldset === "playground" ? "bg-muted" : ""}`}
                  aria-label="Playground"
                  onClick={() => setActiveFieldset("playground")}
                >
                  <Terminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playground
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${activeFieldset === "design" ? "bg-muted" : ""}`}
                  aria-label="Design"
                  onClick={() => setActiveFieldset("design")}
                >
                  <Cat className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Design
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${activeFieldset === "role-settings" ? "bg-muted" : ""}`}
                  aria-label="Role"
                  onClick={() => setActiveFieldset("role-settings")}
                >
                  <Bot className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Role
              </TooltipContent>
            </Tooltip>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${activeFieldset === "api" ? "bg-muted" : ""}`}
                  aria-label="API"
                  onClick={() => setActiveFieldset("api")}
                >
                  <Code2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                API
              </TooltipContent>
            </Tooltip> */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${activeFieldset === "documentation" ? "bg-muted" : ""}`}
                  aria-label="Documentation"
                  onClick={() => setActiveFieldset("documentation")}
                >
                  <Book className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentation
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${activeFieldset === "advanced-settings" ? "bg-muted" : ""}`}
                  aria-label="Settings"
                  onClick={() => setActiveFieldset("advanced-settings")}
                >
                  <Settings2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto grid gap-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/learn/faq">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`mt-auto rounded-lg `}
                    aria-label="Help"
                    onClick={() => setActiveFieldset("help")}
                  >
                    <LifeBuoy className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/profil">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`mt-auto rounded-lg `}
                    aria-label="Account"
                    onClick={() => setActiveFieldset("account")}
                  >
                    <User className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        {/* - - - MAIN - - - */}

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Chat</h1>
            {/* <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
            >
              <Share className="size-3.5" />
              Share
            </Button> */}
          </header>
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="relative hidden flex-col items-start gap-8 md:flex"
              x-chunk="dashboard-03-chunk-0"
            >
              <form className="grid w-full items-start gap-6">
                {activeFieldset === "playground" && (
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Playground
                    </legend>
                    <Table />
                  </fieldset>
                )}
                {/* APPEARANCE ----- */}

                {activeFieldset === "design" && (
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Chat Customization
                    </legend>

                    <div className="grid gap-3">
                      <Label htmlFor="max-tokens">AI Reply Length</Label>
                      <Select
                        onValueChange={(value) => setMaxTokens(Number(value))}
                      >
                        <SelectTrigger id="max-tokens" className="items-start">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="200">
                            Small (200 tokens)
                          </SelectItem>
                          <SelectItem value="1000">
                            Medium (1000 tokens)
                          </SelectItem>
                          <SelectItem value="2000">
                            Large (2000 tokens)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="ai-text-color">AI Text Color</Label>
                      <Select onValueChange={(value) => setAiTextColor(value)}>
                        <SelectTrigger
                          id="ai-text-color"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gray-200">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <div className="h-5 w-5 bg-gray-200" />
                              <div className="grid gap-0.5">
                                <p className="font-medium text-foreground">
                                  Gray
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="blue-200">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <div className="h-5 w-5 bg-blue-200" />
                              <div className="grid gap-0.5">
                                <p className="font-medium text-foreground">
                                  Blue
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="green-400">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <div className="h-5 w-5 bg-green-400" />
                              <div className="grid gap-0.5">
                                <p className="font-medium text-foreground">
                                  Green
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="orange-400">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <div className="h-5 w-5 bg-orange-400" />
                              <div className="grid gap-0.5">
                                <p className="font-medium text-foreground">
                                  Orange
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="yellow-200">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <div className="h-5 w-5 bg-yellow-200" />
                              <div className="grid gap-0.5">
                                <p className="font-medium text-foreground">
                                  Yellow
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="user-text-color">User Text Color</Label>
                      <Select
                        onValueChange={(value) => setUserTextColor(value)}
                      >
                        <SelectTrigger
                          id="user-text-color"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <div className="h-5 w-5 bg-primary" />
                              <div className="grid gap-0.5">
                                <p className="font-medium text-foreground">
                                  Primary
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="blue-500">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <div className="h-5 w-5 bg-blue-500" />
                              <div className="grid gap-0.5">
                                <p className="font-medium text-foreground">
                                  Blue
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="green-900">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <div className="h-5 w-5 bg-green-900" />
                              <div className="grid gap-0.5">
                                <p className="font-medium text-foreground">
                                  Green
                                </p>
                              </div>
                            </div>
                          </SelectItem>

                          <SelectItem value="yellow-900">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <div className="h-5 w-5 bg-yellow-900" />
                              <div className="grid gap-0.5">
                                <p className="font-medium text-foreground">
                                  Brown
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </fieldset>
                )}

                {/* ------------------ */}

                {activeFieldset === "role-settings" && (
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Define Chatbot Role
                    </legend>
                    <div className="grid gap-3">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">System</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="assistant">Assistant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="You are a..."
                        className="min-h-[9.5rem]"
                      />
                    </div>
                  </fieldset>
                )}
                {activeFieldset === "advanced-settings" && (
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Advanced Settings
                    </legend>
                    <div className="grid gap-3">
                      <Label htmlFor="model">Model</Label>
                      <Select>
                        <SelectTrigger
                          id="model"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="genesis">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <PlayCircle className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural{" "}
                                  <span className="font-medium text-foreground">
                                    Genesis
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Our fastest model for general use cases.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="explorer">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Bird className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural{" "}
                                  <span className="font-medium text-foreground">
                                    Explorer
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Performance and speed for efficiency.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="quantum">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Battery className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural{" "}
                                  <span className="font-medium text-foreground">
                                    Quantum
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  The most powerful model for complex
                                  computations.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input id="temperature" type="number" placeholder="0.4" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="top-p">Top P</Label>
                        <Input id="top-p" type="number" placeholder="0.7" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="top-k">Top K</Label>
                        <Input id="top-k" type="number" placeholder="0.0" />
                      </div>
                    </div>
                  </fieldset>
                )}
              </form>
            </div>

            <ChatBox
              activeFieldset={activeFieldset}
              aiTextColor={aiTextColor}
              userTextColor={userTextColor}
              maxTokens={maxTokens}
            />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
