import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Sparkles } from 'lucide-react';
import PlantInfoForm from '@/components/PlantInfoForm';
import DiagnosisResults from '@/components/DiagnosisResults';
import type { Diagnosis } from './backend';

function App() {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDiagnosisComplete = (result: Diagnosis) => {
    setDiagnosis(result);
    setIsSubmitting(false);
  };

  const handleStartOver = () => {
    setDiagnosis(null);
    setIsSubmitting(false);
  };

  const handleSubmitStart = () => {
    setIsSubmitting(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950">
      {/* Header */}
      <header className="border-b border-emerald-200/50 dark:border-emerald-800/50 bg-white/80 dark:bg-emerald-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/edenmind-logo.dim_512x512.png" 
              alt="EdenMind Logo" 
              className="h-10 w-10 rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                EdenMind
                <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </h1>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">AI Plant Health Advisor</p>
            </div>
          </div>
          <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        {!diagnosis && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-48 md:h-64">
              <img 
                src="/assets/generated/edenmind-hero.dim_1600x600.png" 
                alt="EdenMind Hero" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    Diagnose Your Plant's Health
                  </h2>
                  <p className="text-emerald-100 text-lg">
                    Get expert care recommendations powered by AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form or Results */}
        {!diagnosis ? (
          <Card className="shadow-xl border-emerald-200 dark:border-emerald-800">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30">
              <CardTitle className="text-2xl text-emerald-900 dark:text-emerald-100">
                Tell Us About Your Plant
              </CardTitle>
              <CardDescription className="text-emerald-700 dark:text-emerald-300">
                Provide details about your plant and its symptoms to receive a personalized diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <PlantInfoForm 
                onDiagnosisComplete={handleDiagnosisComplete}
                onSubmitStart={handleSubmitStart}
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        ) : (
          <DiagnosisResults 
            diagnosis={diagnosis} 
            onStartOver={handleStartOver}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-emerald-200/50 dark:border-emerald-800/50 bg-white/80 dark:bg-emerald-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-emerald-700 dark:text-emerald-300">
          <p>
            © {new Date().getFullYear()} EdenMind. Built with{' '}
            <span className="text-emerald-600 dark:text-emerald-400">♥</span> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-800 dark:text-emerald-200 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
