import { z } from "zod";

export const Schema = z.object({
  systemTypeAndEarthingArrangemets: z.string(),
  supplyProtectiveDeviceBSNumber: z.string(),
  supplyProtectiveDeviceType: z.string(),
  supplyProtectiveDeviceRatedCurrent: z.string(),
  numberAndTypeOfLiveConductors: z.string(),
  confirmationOfSupplyPolarity: z.boolean(),
  otherSourcesOfSupply: z.string(),
  nominalVoltageBetweenLines: z.string(),
  nominalLineVoltageToEarth: z.string(),
  nominalFrequency: z.string(),
  prospectiveFaultCurrent: z.string(),
  externalEarthFaultLoopImpedance: z.string(),
});
