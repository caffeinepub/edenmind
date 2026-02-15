import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PlantInfo, Diagnosis } from '../backend';

export function useSubmitPlantInfo() {
  const { actor } = useActor();

  return useMutation<Diagnosis, Error, PlantInfo>({
    mutationFn: async (plantInfo: PlantInfo) => {
      if (!actor) {
        throw new Error('Backend actor not initialized');
      }
      return await actor.submitPlantInfo(plantInfo);
    }
  });
}
