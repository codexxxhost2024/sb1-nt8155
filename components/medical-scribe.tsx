"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Stop, Upload, FileUp, Download, Copy, Send } from "lucide-react";
import { noteTypes } from "@/lib/note-types";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { firebaseConfig } from "@/lib/firebase-config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function MedicalScribe() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedNoteType, setSelectedNoteType] = useState("");
  const [generatedTemplate, setGeneratedTemplate] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Recording logic here
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Stop recording logic here
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // File upload logic here
    }
  };

  const generateTemplate = async () => {
    // Template generation logic here
  };

  const handleChatSubmit = async () => {
    // Chat submission logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-full items-center">
          <h1 className="text-xl font-bold">Daisy Medic</h1>
        </div>
      </header>

      <main className="container mx-auto pt-24 pb-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Medical Scribe Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Note Type</label>
              <Select value={selectedNoteType} onValueChange={setSelectedNoteType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select note type" />
                </SelectTrigger>
                <SelectContent>
                  {noteTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="icon"
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? <Stop className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={() => document.getElementById("file-upload")?.click()}>
                <Upload className="h-4 w-4" />
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Transcript</label>
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Transcribed text will appear here..."
                rows={4}
              />
            </div>

            <Button className="w-full" onClick={generateTemplate}>
              <FileUp className="mr-2 h-4 w-4" /> Generate Template
            </Button>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Generated Template</label>
                <div className="space-x-2">
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={generatedTemplate}
                readOnly
                placeholder="Generated template will appear here..."
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Chat with Daisy</label>
              <div className="flex space-x-2">
                <Textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message here..."
                  rows={3}
                />
                <Button onClick={handleChatSubmit}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={chatResponse}
                readOnly
                placeholder="Daisy's response will appear here..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}