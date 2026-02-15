export const COPY = {
  form: {
    nameLabel: 'Plant Name',
    namePlaceholder: 'e.g., My Monstera, Kitchen Basil',
    nameHelper: 'Give your plant a name or describe its location',
    
    typeLabel: 'Plant Type',
    typePlaceholder: 'Select plant type',
    
    environmentLabel: 'Light Exposure',
    environmentPlaceholder: 'Select light conditions',
    
    wateringLabel: 'Watering Frequency',
    wateringPlaceholder: 'How often do you water?',
    
    symptomsLabel: 'Symptoms & Observations',
    symptomsPlaceholder: 'Describe what you\'re seeing...\n\nExamples:\n- Leaves turning yellow\n- Brown spots on leaves\n- Wilting despite watering\n- Drooping stems\n- White powdery substance',
    symptomsHelper: 'Be as detailed as possible. Separate multiple symptoms with commas or new lines.',
    
    submit: 'Get Diagnosis',
    submitting: 'Analyzing...',
    errorGeneric: 'Failed to analyze plant. Please try again.'
  },
  
  results: {
    diagnosisTitle: 'Diagnosis Complete',
    diagnosisSubtitle: 'Here\'s what we found and how to help your plant recover',
    
    whyTitle: 'Why This Is Likely',
    whyDescription: (issue: string) => `Based on the symptoms you described, your plant is showing signs of ${issue.toLowerCase()}. This is a common issue that can be addressed with proper care adjustments.`,
    
    treatmentTitle: 'Treatment Plan',
    careTitle: 'Ongoing Care Checklist',
    
    startOver: 'Diagnose Another Plant'
  }
} as const;
