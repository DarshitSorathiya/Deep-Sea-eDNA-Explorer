'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Cpu,
  Database,
  BarChart3,
  FileText,
  Dna,
  Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Processing = () => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([
    "Starting eDNA analysis pipeline...",
    "Validating uploaded files...",
    "Files validated successfully ✓"
  ]);
  const router = useRouter();

  const processSteps = [
    {
      id: 'upload',
      title: 'Upload Complete',
      description: 'Files received and validated',
      status: 'completed',
      icon: CheckCircle
    },
    {
      id: 'blast',
      title: 'BLAST Search',
      description: 'Running sequence alignment against databases',
      status: 'processing',
      icon: Database
    },
    {
      id: 'taxonomy',
      title: 'Taxonomic Classification',
      description: 'Identifying species from sequence matches',
      status: 'pending',
      icon: Cpu
    },
    {
      id: 'analysis',
      title: 'Biodiversity Analysis',
      description: 'Computing diversity metrics and statistics',
      status: 'pending',
      icon: BarChart3
    },
    {
      id: 'report',
      title: 'Report Generation',
      description: 'Creating visualization and export files',
      status: 'pending',
      icon: FileText
    }
  ];

  const [steps, setSteps] = useState(processSteps);

  useEffect(() => {
    const TOTAL_DURATION_MS = 1.5 * 60 * 1000; // 1.5 minutes
    const INTERVAL_MS = 1000;
    const TOTAL_STEPS = TOTAL_DURATION_MS / INTERVAL_MS;
    const PROGRESS_PER_STEP = 100 / TOTAL_STEPS;

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }

        const newProgress = Math.min(prevProgress + PROGRESS_PER_STEP, 100);

        // Update logs and step status dynamically
        if (prevProgress < 20 && newProgress >= 20) {
          setLogs(prev => [...prev, "BLAST search initiated against NCBI database..."]);
        } else if (prevProgress < 40 && newProgress >= 40) {
          setLogs(prev => [...prev, "Found 1,247 sequence matches", "Processing taxonomic assignments..."]);
          setSteps(prev => prev.map((step, index) =>
            index === 1 ? { ...step, status: 'completed' } :
              index === 2 ? { ...step, status: 'processing' } : step
          ));
        } else if (prevProgress < 60 && newProgress >= 60) {
          setLogs(prev => [...prev, "Identified 34 unique species", "Computing biodiversity metrics..."]);
          setSteps(prev => prev.map((step, index) =>
            index === 2 ? { ...step, status: 'completed' } :
              index === 3 ? { ...step, status: 'processing' } : step
          ));
        } else if (prevProgress < 80 && newProgress >= 80) {
          setLogs(prev => [...prev, "Shannon diversity index: 2.41", "Generating visualizations..."]);
          setSteps(prev => prev.map((step, index) =>
            index === 3 ? { ...step, status: 'completed' } :
              index === 4 ? { ...step, status: 'processing' } : step
          ));
        } else if (prevProgress < 95 && newProgress >= 95) {
          setLogs(prev => [...prev, "Analysis complete ✓", "Report ready for download"]);
          setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
        }

        // Redirect when complete
        if (newProgress >= 100) {
          setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
          clearInterval(interval);
          router.push("/report");
        }

        return newProgress;
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [router]);

  // Step icon handler
  const getStepIcon = (step) => {
    if (step.status === 'completed') {
      return <CheckCircle className="h-6 w-6 text-green-400" />; // ✅ Green for completed
    } else if (step.status === 'processing') {
      return <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />; // 🔄 Blue for processing
    } else {
      return <Clock className="h-6 w-6 text-gray-400" />; // ⏳ Gray for pending
    }
  };

  const isComplete = progress >= 100;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg animate-pulse">
              <Dna className="h-8 w-8 text-white animate-bounce" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Processing Your <span className="text-cyan-400">Dataset</span>
          </h1>
          <p className="text-cyan-100 max-w-2xl mx-auto">
            Running advanced eDNA analysis pipeline to identify species and compute biodiversity metrics
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Bar */}
            <Card className="bg-black/30 p-6 rounded-xl backdrop-blur-lg border border-cyan-700/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Analysis Progress</h3>
                <span className="text-sm font-medium text-cyan-400">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Custom Progress Bar */}
              <div className="relative w-full h-4 bg-gray-800/50 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-500 ease-in-out shadow-[0_0_10px_rgba(0,212,255,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-cyan-100">
                {isComplete
                  ? "Analysis complete! Redirecting to report..."
                  : "Analyzing your eDNA sequences..."}
              </p>
            </Card>

            {/* Process Steps */}
            <Card className="bg-black/30 p-6 rounded-xl backdrop-blur-lg border border-cyan-700/30">
              <h3 className="text-lg font-semibold mb-6 text-white">Processing Steps</h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${step.status === 'processing'
                      ? 'bg-cyan-500/10 border border-cyan-500/30'
                      : step.status === 'completed'
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-gray-800/20'
                      }`}
                  >
                    <div className="flex-shrink-0">
                      {getStepIcon(step)}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm text-white">{step.title}</h4>
                      <p className="text-xs text-cyan-200">{step.description}</p>
                    </div>
                    {step.status === 'processing' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                        <span className="text-xs text-cyan-400">Processing...</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Logs Section */}
          <div className="space-y-6">
            <Card className="bg-black/30 p-6 rounded-xl backdrop-blur-lg border border-cyan-700/30">
              <h3 className="text-lg font-semibold mb-4 text-white">Processing Logs</h3>
              <div className="bg-black/60 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2 font-mono text-xs">
                  {logs.map((log, index) => (
                    <div key={index} className="text-green-400">
                      <span className="text-cyan-300 mr-2">
                        {new Date().toLocaleTimeString()}
                      </span>
                      {log}
                    </div>
                  ))}
                  {!isComplete && (
                    <div className="flex items-center space-x-2 text-cyan-400">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Stats Preview */}
            <Card className="bg-black/30 p-6 rounded-xl backdrop-blur-lg border border-cyan-700/30">
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Stats</h3>
              <div className="space-y-3 text-cyan-100">
                <div className="flex justify-between text-sm">
                  <span>Samples Processed</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sequences Analyzed</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Species Found</span>
                  <span className="font-medium text-cyan-400">34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shannon Index</span>
                  <span className="font-medium text-cyan-400">2.41</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Processing;
