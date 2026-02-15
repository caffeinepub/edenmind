import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertTriangle, Leaf, RefreshCw, Lightbulb, Heart } from 'lucide-react';
import { COPY } from '@/lib/edenmindCopy';
import type { Diagnosis } from '../backend';

interface DiagnosisResultsProps {
  diagnosis: Diagnosis;
  onStartOver: () => void;
}

export default function DiagnosisResults({ diagnosis, onStartOver }: DiagnosisResultsProps) {
  // Parse treatment steps (split by periods or newlines)
  const treatmentSteps = diagnosis.treatment
    .split(/[.\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Parse care recommendations (split by periods or newlines)
  const careItems = diagnosis.careRecommendations
    .split(/[.,\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Determine severity based on issue keywords
  const isSerious = diagnosis.issue.toLowerCase().includes('infection') || 
                    diagnosis.issue.toLowerCase().includes('rot') ||
                    diagnosis.issue.toLowerCase().includes('pest');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Diagnosis Header */}
      <Card className="shadow-xl border-emerald-200 dark:border-emerald-800 overflow-hidden">
        <div className={`${isSerious ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30' : 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30'}`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl text-emerald-900 dark:text-emerald-100 flex items-center gap-2 mb-2">
                  {isSerious ? (
                    <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {COPY.results.diagnosisTitle}
                </CardTitle>
                <CardDescription className="text-emerald-700 dark:text-emerald-300 text-base">
                  {COPY.results.diagnosisSubtitle}
                </CardDescription>
              </div>
              <Badge 
                variant={isSerious ? "destructive" : "default"}
                className={`${isSerious ? '' : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700'} text-sm px-3 py-1`}
              >
                {diagnosis.issue}
              </Badge>
            </div>
          </CardHeader>
        </div>
        
        <CardContent className="pt-6 space-y-6">
          {/* Issue Explanation */}
          <Alert className="border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/20">
            <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <AlertTitle className="text-emerald-900 dark:text-emerald-100 font-semibold">
              {COPY.results.whyTitle}
            </AlertTitle>
            <AlertDescription className="text-emerald-800 dark:text-emerald-200 mt-2">
              {COPY.results.whyDescription(diagnosis.issue)}
            </AlertDescription>
          </Alert>

          <Separator className="bg-emerald-200 dark:bg-emerald-800" />

          {/* Treatment Plan */}
          <div>
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              {COPY.results.treatmentTitle}
            </h3>
            <ol className="space-y-3">
              {treatmentSteps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-600 dark:bg-emerald-700 text-white flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-emerald-900 dark:text-emerald-100 pt-0.5">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <Separator className="bg-emerald-200 dark:bg-emerald-800" />

          {/* Ongoing Care */}
          <div>
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              {COPY.results.careTitle}
            </h3>
            <div className="space-y-2">
              {careItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-emerald-900 dark:text-emerald-100">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Over Button */}
      <div className="flex justify-center">
        <Button 
          onClick={onStartOver}
          variant="outline"
          size="lg"
          className="border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          {COPY.results.startOver}
        </Button>
      </div>
    </div>
  );
}
