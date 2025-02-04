import { z } from "zod";

export const schema = z.object({
  contractorTradingName: z.string(),
  contractorAddress: z.string(),
  contractorPhone: z.string(),
  contractorEmail: z.string(),
  contractorGoverningBody: z.string(),
  contractorGoverningBodyNumber: z.string(),

  clientReferenceNumber: z.string(),
  clientTradingName: z.string(),
  clientAddress: z.string(),
  clientPostcode: z.string(),
  clientTelephone: z.string(),

  propertyReferenceNumber: z.string(),
  propertyOccupier: z.string(),
  propertyAddress: z.string(),
  propertyPostcode: z.string(),
  propertyTelephone: z.string(),

  purpose: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  recordsAvailable: z.boolean(),
  previousReportAvailable: z.boolean(),
  previousReportDate: z.date(),

  descriptionOfPremises: z.string(),
  estimatedAgeOfElectricalInstallation: z.string(),
  evidenceOfAlterations: z.boolean(),
  estimatedAgeOfAlterations: z.string(),

  generalConditionOfTheInstallation: z.string(),
  overallAssessmentOfTheInstallation: z.string(),

  regulationAccordance: z.string(),
  electricalInstalationCoveredByThisReport: z.string(),
  agreedLimitations: z.string(),
  agreedLimitationsWith: z.string(),
  operationalLimitations: z.string(),

  inspectorsName: z.string(),
  inspectorsSignature: z.string(),
  inspectorsSignatureDate: z.date(),
  retestDate: z.date(),
  reasonForRecommendation: z.string(),
  qualifiedSupervisorsName: z.string(),
  qualifiedSupervisorsSignature: z.string(),
  qualifiedSupervisorsSignatureDate: z.date(),

  observations: z.array(
    z.object({
      observationItemNumber: z.string(),
      observationDetails: z.string(),
      observationCode: z.string(),
      observationLocation: z.string(),
    })
  ),

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

  maximumDemand: z.string(),
  distributorsFacility: z.boolean(),
  installationEarthElectrodes: z.boolean(),
  earthElectrodeType: z.string(),
  earthElectrodeLocation: z.string(),
  electrodeResistanceToEarth: z.string(),
  earthingConductorMaterial: z.string(),
  earthingConductorCSA: z.string(),
  earthingConductorVerified: z.boolean(),
  mainProtectiveBondingConductorMaterial: z.string(),
  mainProtectiveBondingConductorCSA: z.string(),
  mainProtectiveBondingConductorVerified: z.boolean(),
  waterInstallationPipes: z.string(),
  gasInstallationPipes: z.string(),
  structuralSteel: z.string(),
  oilInstallationPipes: z.string(),
  lightningProtection: z.string(),
  other: z.string(),
  mainSwitchImage: z.string(),
  mainSwitchLocation: z.string(),
  mainSwitchBSNumber: z.string(),
  mainSwitchType: z.string(),
  mainSwitchRating: z.string(),
  mainSwitchPoles: z.string(),
  mainSwitchCurrentRating: z.string(),
  mainSwitchVoltageRating: z.string(),
  mainSwitchRCDOperatingCurrent: z.string(),
  mainSwitchRCDType: z.string(),
  mainSwitchRCDRatedTimeDelay: z.string(),
  mainSwitchRCDMeasuredOperatingTime: z.string(),

  item_1_1A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_1_1B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_1_1C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_1_1D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_1_1E: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_1_1F: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_1_2: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_1_3: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  item_2_1: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_2_2: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  item_3_1A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_1B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_1C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_1D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_1E: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_1F: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_1G: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_1H: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_1I: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_2: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_3A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_3B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_3C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_3D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_3E: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_3_3F: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  item_4_1: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_2: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_3: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_4: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_5: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_6: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_7: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_8: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_9: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_10: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_11: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_12: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_13: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_14: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_15: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_16: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_17: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_18: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_19: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_20: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_21: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_22: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_23: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_24: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_4_25: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  item_5_1: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_2: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_3: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_4: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_5: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_6: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_7: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_8: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_9: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_10: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_11: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_12: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_13: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_14A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_14B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_15: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_16: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_17: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_18: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_19: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_20: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_21: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_22: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_23: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_5_24: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  item_6_1: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_2: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_3: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_4: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_5: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_6: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_7: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_8: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_9: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_10: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_11: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_12A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_12B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_13A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_13B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_13C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_13D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_13E: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_14: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_15: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_16: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_17A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_17B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_17C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_17D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_18: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_19: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_6_20: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  item_7_1A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_1B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_1C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_1D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_1E: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_1F: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_2A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_2B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_2C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_2D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_3A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_3B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_3C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_3D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_4A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_7_4B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  item_8_1: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_8_2: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_8_3: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_8_4: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_8_5: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_8_6: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_8_7A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_8_7B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_8_7C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_8_7D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  item_9_1A: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_9_1B: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_9_1C: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_9_1D: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_9_1E: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_9_1F: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_9_1G: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_9_1H: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),
  item_9_2: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  item_10_0: z.enum(["ok", "c1", "c2", "c3", "na", "lim", "fi", "r"] as const),

  dbs: z.array(
    z.object({
      dbDesignation: z.string(),
      dbLocation: z.string(),
      dbZdb: z.string(),
      dbIpf: z.string(),
      dbConfirmationOfSupplyPolarity: z.boolean(),
      dbPhaseSequenceConfirmed: z.boolean(),
      dbSPDType: z.string(),
      dbSPDStatusIndicator: z.boolean(),
      dbSupplyFrom: z.string(),
      dbOCPDBSnumber: z.string(),
      dbOCPDType: z.string(),
      dbOCPDNominalVoltage: z.string(),
      dbOCPDRating: z.string(),
      dbOCPDNumberOfPhases: z.string(),
      dbRCDBSNumber: z.string(),
      dbRCDType: z.string(),
      dbRCDOperatingCurrent: z.string(),
      dbRCDNumberOfPoles: z.string(),
      dbRCDOperatingTime: z.string(),
      testedByName: z.string(),
      testedByPosition: z.string(),
      testedBySignature: z.string(),
      testedBySignatureDate: z.string(),
      testInstrumentMultiFunctionSerialNumber: z.string(),
      testInstrumentContinuitySerialNumber: z.string(),
      testInstrumentInsulationResistanceSerialNumber: z.string(),
      testInstrumentEarthFaultLoopImpedanceSerialNumber: z.string(),
      testInstrumentEarthElectrodeSerialNumber: z.string(),
      testInstrumentRCDSerialNumber: z.string(),
      dbCircuits: z.array(
        z.object({
          circuitNumber: z.string(),
          circuitDescription: z.string(),
          circuitTypeOfWiring: z.string(),
          circuitReferenceMethod: z.string(),
          circuitNumberOfPoints: z.string(),
          circuitConductorLiveCSA: z.string(),
          circuitConductorCPCCSA: z.string(),
          circuitMaxDisconnectionTime: z.string(),
          circuitOCPDBSNumber: z.string(),
          circuitOCPDType: z.string(),
          circuitOCPDRating: z.string(),
          circuitOCPDShortCircuitCapacity: z.string(),
          circuitOCPDMaxPermittedZs: z.string(),
          circuitRCDBSNumber: z.string(),
          circuitRCDType: z.string(),
          circuitRCDRating: z.string(),
          circuitRCDOperatingCurrent: z.string(),
          circuitContinuityr1: z.string(),
          circuitContinuityrn: z.string(),
          circuitContinuityr2: z.string(),
          circuitContinuityR1R2: z.string(),
          circuitContinuityR2: z.string(),
          circuitInsulationResistanceLiveLive: z.string(),
          circuitInsulationResistanceLiveEarth: z.string(),
          circuitInsulationResistanceTestVoltage: z.string(),
          circuitPolarity: z.boolean(),
          circuitMaximumZs: z.string(),
          circuitRCDOperatingTime: z.string(),
          circuitRCDOTestButton: z.boolean(),
          circuitAFDDOTestButton: z.boolean(),
          circuitComments: z.string(),
          circuitsEquipmentVunerableToDamage: z.string(),
        })
      ),
    })
  ),
});

export type Schema = z.infer<typeof schema>;
