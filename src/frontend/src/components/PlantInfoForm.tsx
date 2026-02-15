import { useState } from 'react';
import { useSubmitPlantInfo } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Send } from 'lucide-react';
import { COPY } from '@/lib/edenmindCopy';
import type { Diagnosis } from '../backend';

interface PlantInfoFormProps {
  onDiagnosisComplete: (diagnosis: Diagnosis) => void;
  onSubmitStart: () => void;
  isSubmitting: boolean;
}

export default function PlantInfoForm({ onDiagnosisComplete, onSubmitStart, isSubmitting }: PlantInfoFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [environment, setEnvironment] = useState('');
  const [wateringHabits, setWateringHabits] = useState('');
  const [symptoms, setSymptoms] = useState('');
  
  const submitMutation = useSubmitPlantInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitStart();

    // Split symptoms by newlines or commas and filter empty strings
    const symptomsArray = symptoms
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    try {
      const result = await submitMutation.mutateAsync({
        name,
        type: type,
        environment,
        wateringHabits,
        symptoms: symptomsArray
      });
      onDiagnosisComplete(result);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const isFormValid = name && type && environment && wateringHabits && symptoms;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Plant Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-emerald-900 dark:text-emerald-100">
          {COPY.form.nameLabel}
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={COPY.form.namePlaceholder}
          required
          className="border-emerald-200 dark:border-emerald-800 focus:ring-emerald-500"
        />
        <p className="text-xs text-emerald-600 dark:text-emerald-400">{COPY.form.nameHelper}</p>
      </div>

      {/* Plant Type */}
      <div className="space-y-2">
        <Label htmlFor="type" className="text-emerald-900 dark:text-emerald-100">
          {COPY.form.typeLabel}
        </Label>
        <Select value={type} onValueChange={setType} required>
          <SelectTrigger className="border-emerald-200 dark:border-emerald-800">
            <SelectValue placeholder={COPY.form.typePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="succulent">Succulent</SelectItem>
            <SelectItem value="tropical">Tropical</SelectItem>
            <SelectItem value="fern">Fern</SelectItem>
            <SelectItem value="flowering">Flowering Plant</SelectItem>
            <SelectItem value="herb">Herb</SelectItem>
            <SelectItem value="vegetable">Vegetable</SelectItem>
            <SelectItem value="tree">Tree/Shrub</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Light Environment */}
      <div className="space-y-2">
        <Label htmlFor="environment" className="text-emerald-900 dark:text-emerald-100">
          {COPY.form.environmentLabel}
        </Label>
        <Select value={environment} onValueChange={setEnvironment} required>
          <SelectTrigger className="border-emerald-200 dark:border-emerald-800">
            <SelectValue placeholder={COPY.form.environmentPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-sun">Full Sun (6+ hours direct)</SelectItem>
            <SelectItem value="partial-sun">Partial Sun (3-6 hours)</SelectItem>
            <SelectItem value="bright-indirect">Bright Indirect Light</SelectItem>
            <SelectItem value="low-light">Low Light</SelectItem>
            <SelectItem value="shade">Shade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Watering Habits */}
      <div className="space-y-2">
        <Label htmlFor="watering" className="text-emerald-900 dark:text-emerald-100">
          {COPY.form.wateringLabel}
        </Label>
        <Select value={wateringHabits} onValueChange={setWateringHabits} required>
          <SelectTrigger className="border-emerald-200 dark:border-emerald-800">
            <SelectValue placeholder={COPY.form.wateringPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="every-2-3-days">Every 2-3 days</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="bi-weekly">Every 2 weeks</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="when-dry">When soil is dry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Symptoms */}
      <div className="space-y-2">
        <Label htmlFor="symptoms" className="text-emerald-900 dark:text-emerald-100">
          {COPY.form.symptomsLabel}
        </Label>
        <Textarea
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder={COPY.form.symptomsPlaceholder}
          required
          rows={5}
          className="border-emerald-200 dark:border-emerald-800 focus:ring-emerald-500 resize-none"
        />
        <p className="text-xs text-emerald-600 dark:text-emerald-400">{COPY.form.symptomsHelper}</p>
      </div>

      {/* Error Display */}
      {submitMutation.isError && (
        <Alert variant="destructive">
          <AlertDescription>
            {submitMutation.error instanceof Error 
              ? submitMutation.error.message 
              : COPY.form.errorGeneric}
          </AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={!isFormValid || isSubmitting}
        className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-medium py-6 text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {COPY.form.submitting}
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            {COPY.form.submit}
          </>
        )}
      </Button>
    </form>
  );
}
