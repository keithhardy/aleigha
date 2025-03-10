import { z } from "zod";

export const UpdateSupplyCharacteristicsAndEarthingArrangementsSchema =
  z.object({
    id: z.string().cuid(),
    systemTypeAndEarthingArrangements: z.string().optional(),
    supplyProtectiveDeviceBSNumber: z.string().optional(),
    supplyProtectiveDeviceType: z.string().optional(),
    supplyProtectiveDeviceRatedCurrent: z.string().optional(),
    numberAndTypeOfLiveConductors: z.string().optional(),
    confirmationOfSupplyPolarity: z.boolean().optional(),
    otherSourcesOfSupply: z.string().optional(),
    nominalVoltageBetweenLines: z.string().optional(),
    nominalLineVoltageToEarth: z.string().optional(),
    nominalFrequency: z.string().optional(),
    prospectiveFaultCurrent: z.string().optional(),
    externalEarthFaultLoopImpedance: z.string().optional(),
  });
